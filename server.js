const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for anamnesis records (replace with database in production)
let anamnesisRecords = [];
let nextId = 1;

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
app.post('/api/anamnesis', (req, res) => {
  const newRecord = {
    id: nextId++,
    ...req.body,
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
app.put('/api/anamnesis/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = anamnesisRecords.findIndex(r => r.id === id);
  
  if (index !== -1) {
    anamnesisRecords[index] = {
      ...anamnesisRecords[index],
      ...req.body,
      id: id,
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
app.delete('/api/anamnesis/:id', (req, res) => {
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
