# Backend API para Anamnese Integrativa
# Estrutura Node.js + Express + PostgreSQL/MongoDB

## 📋 Stack Tecnológica

- **Runtime**: Node.js 18+ LTS
- **Framework**: Express.js 4.x
- **Banco de Dados**: PostgreSQL 15+ (principal) ou MongoDB 6+ (alternativa)
- **ORM**: Prisma (PostgreSQL) ou Mongoose (MongoDB)
- **Autenticação**: JWT + bcrypt
- **Validação**: Joi ou Zod
- **Upload**: Multer + AWS S3 ou Cloudinary
- **IA/ML**: OpenAI API, Google Vision API
- **Testes**: Jest + Supertest
- **Deploy**: Railway, Render ou Heroku

---

## 📁 Estrutura de Pastas

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # Configuração do banco
│   │   ├── jwt.js            # Config JWT
│   │   └── storage.js        # Config S3/Cloudinary
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── anamnese.controller.js
│   │   ├── patient.controller.js
│   │   ├── appointment.controller.js
│   │   └── analysis.controller.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Patient.js
│   │   ├── Anamnese.js
│   │   ├── Appointment.js
│   │   └── ClinicalAnalysis.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── anamnese.routes.js
│   │   ├── patient.routes.js
│   │   ├── appointment.routes.js
│   │   └── analysis.routes.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   └── upload.middleware.js
│   ├── services/
│   │   ├── ai.service.js     # Integrações IA
│   │   ├── email.service.js
│   │   └── notification.service.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── errors.js
│   └── server.js
├── prisma/
│   └── schema.prisma         # Schema do banco
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── package.json
└── README.md
```

---

## 🗄️ Schema do Banco de Dados (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(THERAPIST)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  patients     Patient[]
  anamneses    Anamnese[]
  appointments Appointment[]
}

enum Role {
  ADMIN
  THERAPIST
  ASSISTANT
}

model Patient {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  // Dados pessoais
  name      String
  birthDate DateTime
  gender    String
  email     String?
  phone     String?
  address   String?
  city      String?
  state     String?
  cpf       String?  @unique
  
  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  anamneses    Anamnese[]
  appointments Appointment[]
  analyses     ClinicalAnalysis[]
}

model Anamnese {
  id        String   @id @default(uuid())
  patientId String
  patient   Patient  @relation(fields: [patientId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  
  // Todos os campos do formulário (JSON ou campos individuais)
  formData  Json
  
  // Análises integradas
  iridologyAnalysis     Json?
  clinicalSignsAnalysis Json?
  vitalSignsAnalysis    Json?
  bloodTypeAnalysis     Json?
  
  // Metadata
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  clinicalAnalyses ClinicalAnalysis[]
}

model ClinicalAnalysis {
  id          String   @id @default(uuid())
  anamneseId  String
  anamnese    Anamnese @relation(fields: [anamneseId], references: [id])
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  
  type        AnalysisType
  images      String[] // URLs das imagens
  results     Json     // Resultados da análise
  aiAnalysis  Json?    // Análise por IA
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AnalysisType {
  IRIDOLOGY
  CLINICAL_SIGNS
  VITAL_SIGNS
  BLOOD_TYPE
}

model Appointment {
  id          String   @id @default(uuid())
  patientId   String
  patient     Patient  @relation(fields: [patientId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  date        DateTime
  duration    Int      // minutos
  type        String   // Consulta, Retorno, etc
  status      AppointmentStatus @default(SCHEDULED)
  notes       String?
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum AppointmentStatus {
  SCHEDULED
  CONFIRMED
  COMPLETED
  CANCELLED
  NO_SHOW
}
```

---

## 🔐 Autenticação (JWT)

### auth.controller.js

```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Register
exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Verificar se usuário existe
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }
    
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Criar usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'THERAPIST'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });
    
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuário
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    // Gerar token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
```

---

## 🚀 Rotas Principais

### anamnese.routes.js

```javascript
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const anamneseController = require('../controllers/anamnese.controller');
const upload = require('../middleware/upload.middleware');

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// CRUD Anamneses
router.post('/', anamneseController.create);
router.get('/', anamneseController.getAll);
router.get('/:id', anamneseController.getOne);
router.put('/:id', anamneseController.update);
router.delete('/:id', anamneseController.delete);

// Upload de imagens
router.post('/:id/images', upload.array('images', 10), anamneseController.uploadImages);

// Exportar relatório
router.get('/:id/report/pdf', anamneseController.exportPDF);

module.exports = router;
```

---

## 🤖 Integração com IA

### ai.service.js

```javascript
const { OpenAI } = require('openai');
const vision = require('@google-cloud/vision');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const visionClient = new vision.ImageAnnotatorClient();

// Análise de texto com GPT-4
exports.analyzeText = async (text, context) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      { role: 'system', content: 'Você é um especialista em medicina integrativa.' },
      { role: 'user', content: `Analise os seguintes sintomas: ${text}. Contexto: ${context}` }
    ],
    temperature: 0.7,
    max_tokens: 1000
  });
  
  return completion.choices[0].message.content;
};

// Análise de imagem com Google Vision
exports.analyzeImage = async (imageUrl) => {
  const [result] = await visionClient.labelDetection(imageUrl);
  const labels = result.labelAnnotations;
  
  return {
    labels: labels.map(label => ({
      description: label.description,
      score: label.score
    })),
    analysis: await openai.chat.completions.create({
      model: 'gpt-4-vision-preview',
      messages: [{
        role: 'user',
        content: [
          { type: 'text', text: 'Analise esta imagem de sinais clínicos:' },
          { type: 'image_url', image_url: { url: imageUrl } }
        ]
      }]
    })
  };
};
```

---

## 📧 Notificações

### email.service.js

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.sendAppointmentReminder = async (patient, appointment) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: patient.email,
    subject: 'Lembrete de Consulta - Anamnese Integrativa',
    html: `
      <h2>Olá, ${patient.name}!</h2>
      <p>Este é um lembrete da sua consulta:</p>
      <ul>
        <li><strong>Data:</strong> ${new Date(appointment.date).toLocaleString('pt-BR')}</li>
        <li><strong>Tipo:</strong> ${appointment.type}</li>
      </ul>
      <p>Aguardamos você!</p>
    `
  });
};
```

---

## 🔒 Variáveis de Ambiente

### .env.example

```env
# Servidor
PORT=5000
NODE_ENV=production

# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/anamnese_db"

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# OpenAI
OPENAI_API_KEY=sk-...

# Google Vision
GOOGLE_APPLICATION_CREDENTIALS=./google-vision-key.json

# AWS S3 (para imagens)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_BUCKET_NAME=anamnese-images
AWS_REGION=us-east-1

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your@email.com
SMTP_PASS=your_password
SMTP_FROM="Anamnese Integrativa <noreply@anamnese.com>"

# Frontend URL (CORS)
FRONTEND_URL=https://anamnese-app.vercel.app
```

---

## 📦 package.json

```json
{
  "name": "anamnese-backend",
  "version": "1.0.0",
  "description": "Backend API for Anamnese Integrativa",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "migrate": "prisma migrate dev",
    "generate": "prisma generate",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "@prisma/client": "^5.7.0",
    "joi": "^17.11.0",
    "multer": "^1.4.5-lts.1",
    "aws-sdk": "^2.1515.0",
    "cloudinary": "^1.41.0",
    "openai": "^4.20.0",
    "@google-cloud/vision": "^4.0.2",
    "nodemailer": "^6.9.7",
    "winston": "^3.11.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "prisma": "^5.7.0",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}
```

---

## 🚀 Deploy

### Railway

1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Adicionar PostgreSQL plugin
4. Deploy automático

### Render

1. Criar Web Service
2. Conectar GitHub
3. Adicionar PostgreSQL database
4. Configurar envs
5. Deploy

---

## 📝 Próximos Passos

1. ✅ Criar estrutura de pastas
2. ✅ Configurar Prisma
3. ✅ Implementar autenticação
4. ✅ Criar rotas principais
5. ⏳ Integrar IA (GPT-4 + Google Vision)
6. ⏳ Sistema de notificações
7. ⏳ Upload de imagens (S3)
8. ⏳ Testes unitários
9. ⏳ Deploy em produção

---

**Documentação criada em:** 2 de Dezembro de 2025
**Status:** Estrutura planejada - Pronto para implementação
