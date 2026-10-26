# 🏥 Anamnese Integrativa - Sistema Completo

Sistema profissional de anamnese integrativa com iridologia, agendamentos e prescrições terapêuticas.

**Desenvolvido para:** Wander Pires Silva Coelho - CRTH-BR 17821

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Proprietário (Admin):** Acesso total ao sistema
- **Usuário (Visualizador):** Acesso limitado para consultas
- Login seguro com senhas criptografadas
- Gerenciamento de permissões por função

### 📋 Gestão de Anamneses
- Formulário completo de anamnese integrativa
- Dados pessoais, histórico clínico, sintomas
- Sinais clínicos (língua, olhos, unhas, pele)
- Análise de IMC e medidas corporais
- Upload de documentos e PDFs de exames

### 👁️ Análise de Iridologia
- **Upload de fotos** das íris (esquerda e direita)
- **Captura direta pela câmera** do dispositivo
- Análise automática com mapeamento iridológico
- Relatórios detalhados por sistemas orgânicos
- Sugestões terapêuticas baseadas nos achados

### 📅 Sistema de Agendamentos
- Gerenciamento completo de consultas
- Status de agendamento (agendado/confirmado/concluído)
- Notificações automáticas por WhatsApp/Email/SMS
- Lembretes 24h e 3h antes da consulta
- Dashboard com estatísticas
- Sistema de aniversários de pacientes
- Controle de retornos e follow-ups

### 💊 Prescrições Terapêuticas
- Geração automática de protocolos terapêuticos
- Base de dados com 12+ condições clínicas
- Suplementos, fitoterápicos e dosagens
- Impressão em formato médico profissional
- Carimbo e assinatura digital

### 📱 Progressive Web App (PWA)
- **Instalável** como aplicativo no computador e celular
- **Funciona offline** após instalação
- Sincronização automática quando online
- Acesso de qualquer dispositivo
- Performance nativa

### 🌐 Deploy e Hospedagem
- Configurado para deploy na **Vercel**
- HTTPS automático
- Deploy contínuo via GitHub
- Acessível de qualquer lugar do mundo

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm start

# Acesse: http://localhost:3000
```

### Fazer Deploy

```bash
# Opção 1: Script PowerShell (Recomendado)
.\deploy.ps1

# Opção 2: Manual
npm run build
vercel --prod
```

### Instalar como App

1. Acesse o site publicado
2. No navegador, clique em "Instalar" (ícone ➕)
3. Confirme a instalação
4. App estará disponível como aplicativo nativo!

## 🔑 Credenciais Padrão

### Proprietário (Admin)
- **Usuário:** wander
- **Senha:** admin@2025

### Usuário (Visualizador)
- **Usuário:** usuario
- **Senha:** user@2025

⚠️ **IMPORTANTE:** Altere estas senhas no primeiro acesso!
Menu (⚙️) > Configurações > Alterar Senhas

## 📖 Documentação Completa

Consulte os arquivos:
- **DEPLOY-GUIDE.md** - Guia completo de deploy e configuração
- **DEPLOY-GITHUB.md** - Deploy via GitHub Pages (legado)

## 🛠️ Tecnologias Utilizadas

- **React 19** - Framework principal
- **Material-UI 7** - Design system
- **React Router 7** - Navegação
- **html2pdf.js** - Geração de PDFs
- **Service Worker** - Funcionamento offline
- **LocalStorage** - Persistência de dados
- **IndexedDB** - Armazenamento de arquivos grandes

## 🔒 Segurança

- ✅ HTTPS obrigatório
- ✅ Senhas com hash
- ✅ LocalStorage criptografado
- ✅ Service Worker com cache seguro
- ✅ Validação de entrada em formulários
- ✅ Controle de permissões por função

## 📞 Contato

**Wander Pires Silva Coelho**
- 📧 Email: wanderpsc@gmail.com
- 📱 Telefone: (89) 9 8139-8723
- 🏥 CRTH-BR: 17821

---

**Desenvolvido com ❤️ para terapia integrativa**
