const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Muitas requisições deste IP, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for write operations
const writeApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 write requests per windowMs
  message: 'Muitas requisições de escrita deste IP, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// Serve static files with basic rate limiting
app.use(express.static('public'));

// In-memory storage for anamnesis records
// WARNING: This is for development/demonstration purposes only.
// In production, use a persistent database (MongoDB, PostgreSQL, MySQL, etc.)
// to ensure data is not lost when the server restarts and to support
// proper backup, scaling, and security features required for medical data.
let anamnesisRecords = [];
let nextId = 1;

// Validation helper functions
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().substring(0, 5000); // Limit length and trim whitespace
}

function validateAnamnesisData(data) {
  const errors = [];
  
  // Required fields validation
  if (!data.patientName || typeof data.patientName !== 'string' || data.patientName.trim().length === 0) {
    errors.push('Nome do paciente é obrigatório');
  }
  
  if (!data.age || typeof data.age === 'undefined') {
    errors.push('Idade é obrigatória');
  } else {
    const age = parseInt(data.age);
    if (isNaN(age) || age < 0 || age > 150) {
      errors.push('Idade deve estar entre 0 e 150');
    }
  }
  
  if (!data.gender || typeof data.gender !== 'string' || data.gender.trim().length === 0) {
    errors.push('Gênero é obrigatório');
  }
  
  if (!data.chiefComplaint || typeof data.chiefComplaint !== 'string' || data.chiefComplaint.trim().length === 0) {
    errors.push('Queixa principal é obrigatória');
  }
  
  return errors;
}

function sanitizeAnamnesisData(data) {
  return {
    patientName: sanitizeString(data.patientName),
    age: parseInt(data.age),
    gender: sanitizeString(data.gender),
    phone: data.phone ? sanitizeString(data.phone) : '',
    email: data.email ? sanitizeString(data.email) : '',
    chiefComplaint: sanitizeString(data.chiefComplaint),
    currentIllness: data.currentIllness ? sanitizeString(data.currentIllness) : '',
    pastMedicalHistory: data.pastMedicalHistory ? sanitizeString(data.pastMedicalHistory) : '',
    medications: data.medications ? sanitizeString(data.medications) : '',
    allergies: data.allergies ? sanitizeString(data.allergies) : '',
    lifestyle: data.lifestyle ? sanitizeString(data.lifestyle) : '',
    familyHistory: data.familyHistory ? sanitizeString(data.familyHistory) : '',
    additionalNotes: data.additionalNotes ? sanitizeString(data.additionalNotes) : ''
  };
}

// Routes

// Get all anamnesis records
app.get('/api/anamnesis', (req, res) => {
  res.json({
    success: true,
    data: anamnesisRecords,
    count: anamnesisRecords.length
  });
});

// Get a specific anamnesis record by ID
app.get('/api/anamnesis/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const record = anamnesisRecords.find(r => r.id === id);
  
  if (record) {
    res.json({
      success: true,
      data: record
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Registro não encontrado'
    });
  }
});

// Create a new anamnesis record
app.post('/api/anamnesis', writeApiLimiter, (req, res) => {
  // Validate input data
  const validationErrors = validateAnamnesisData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: validationErrors
    });
  }
  
  // Sanitize input data
  const sanitizedData = sanitizeAnamnesisData(req.body);
  
  const newRecord = {
    id: nextId++,
    ...sanitizedData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  anamnesisRecords.push(newRecord);
  
  res.status(201).json({
    success: true,
    message: 'Anamnese criada com sucesso',
    data: newRecord
  });
});

// Update an existing anamnesis record
app.put('/api/anamnesis/:id', writeApiLimiter, (req, res) => {
  const id = parseInt(req.params.id);
  const index = anamnesisRecords.findIndex(r => r.id === id);
  
  if (index !== -1) {
    // Validate input data
    const validationErrors = validateAnamnesisData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: validationErrors
      });
    }
    
    // Sanitize input data
    const sanitizedData = sanitizeAnamnesisData(req.body);
    
    // Preserve critical fields (id, createdAt) and update only allowed fields
    anamnesisRecords[index] = {
      ...anamnesisRecords[index],
      ...sanitizedData,
      id: anamnesisRecords[index].id, // Preserve original ID
      createdAt: anamnesisRecords[index].createdAt, // Preserve creation date
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Anamnese atualizada com sucesso',
      data: anamnesisRecords[index]
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Registro não encontrado'
    });
  }
});

// Delete an anamnesis record
app.delete('/api/anamnesis/:id', writeApiLimiter, (req, res) => {
  const id = parseInt(req.params.id);
  const index = anamnesisRecords.findIndex(r => r.id === id);
  
  if (index !== -1) {
    anamnesisRecords.splice(index, 1);
    res.json({
      success: true,
      message: 'Anamnese excluída com sucesso'
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Registro não encontrado'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse http://localhost:${PORT}`);
});
