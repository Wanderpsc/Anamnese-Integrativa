# 🚀 QUICK START GUIDE - Anamnese Integrativa v2.1.0

## ⚡ Início Rápido (3 passos)

### 1️⃣ Instalar Dependências
```bash
npm install --legacy-peer-deps
```

### 2️⃣ Iniciar Desenvolvimento
```bash
npm start
```

### 3️⃣ Abrir no Navegador
```
http://localhost:3000
```

---

## 🎯 O QUE HÁ DE NOVO NA v2.1.0

### ✨ Novidades Principais:

#### 1. 🌓 **MODO ESCURO**
- Toggle no canto superior direito
- Persistência automática
- Todos os componentes adaptados

#### 2. 💊 **HOMEOPATIA** (30 remédios)
- 8 categorias clínicas
- Dosagens e potências
- Contraindicações

#### 3. 🌸 **AROMATERAPIA** (31 óleos essenciais)
- 8 categorias de uso
- Métodos de aplicação
- Segurança detalhada

#### 4. 🔐 **VARIÁVEIS DE AMBIENTE**
- `.env.example` configurado
- Feature flags
- APIs configuráveis

#### 5. 🚀 **CI/CD AUTOMATIZADO**
- GitHub Actions
- Deploy automático
- Testes integrados

---

## 📱 FUNCIONALIDADES DISPONÍVEIS

### ✅ Funcionalidades Core:
- [x] **Formulário de Anamnese Completo**
  - Dados pessoais
  - Queixa principal
  - Histórico familiar/pessoal
  - Hábitos de vida
  - Alimentação
  - Sistemas corporais

- [x] **Dashboard de Pacientes**
  - Lista de anamneses
  - Busca e filtros
  - Visualização rápida

- [x] **Análise de Sinais Clínicos**
  - Upload de 8 áreas (face, unhas, orelhas, olhos, cabelo, língua, mãos, pele)
  - Captura por câmera
  - Análise automática
  - Relatórios formatados

- [x] **Iridologia**
  - Mapas do olho esquerdo/direito
  - Análise por zona
  - Correlação orgânica

- [x] **Bioressonância por Tipo Sanguíneo**
  - Análise O, A, B, AB (Rh+/-)
  - Recomendações personalizadas

- [x] **Sinais Vitais**
  - Peso, altura, IMC
  - Pressão arterial
  - Frequência cardíaca
  - Temperatura

- [x] **Agendamentos**
  - Calendário de consultas
  - Lembretes
  - Status (agendado, confirmado, concluído)

- [x] **Prescrições Terapêuticas**
  - Suplementação
  - Fitoterapia
  - Acupuntura
  - Alimentação

### 🆕 Funcionalidades Novas (v2.1.0):
- [x] **Protocolos de Homeopatia**
- [x] **Protocolos de Aromaterapia**
- [x] **Modo Escuro**
- [x] **Busca Avançada de Terapias**
- [x] **Instruções de Segurança**

---

## 🗂️ ESTRUTURA DE NAVEGAÇÃO

### Menu Principal:
1. **Nova Anamnese** - Criar nova ficha
2. **Dashboard** - Ver todas as anamneses
3. **Agendamentos** - Calendário
4. **Importar Dados** - Upload CSV
5. **Mais** ↓
   - Comparar Anamneses
   - Sintomas Apontados
   - Gestão de Dados Terapêuticos
   - Prescrição Terapêutica

### Dentro da Anamnese:
- **Abas do Formulário:**
  1. Identificação
  2. Queixa Principal
  3. Histórico
  4. Hábitos
  5. Alimentação
  6. Sistemas

- **Seções de Análise:**
  1. Iridologia
  2. Sinais Clínicos (fotos)
  3. Sinais Vitais
  4. Checklist Clínico
  5. Bioressonância

---

## 🎨 COMO USAR O MODO ESCURO

1. **Ativar:**
   - Clicar no ícone ☀️ no topo direito
   - Muda para 🌙

2. **Persistência:**
   - A escolha é salva automaticamente
   - Mantém ao recarregar a página

3. **Quando Usar:**
   - Noite/ambientes escuros
   - Conforto visual
   - Economia de bateria (OLED)

---

## 💊 COMO USAR HOMEOPATIA

### Acessar:
1. Criar/abrir uma anamnese
2. Rolar até "Protocolos Terapêuticos Avançados"
3. Tab **"💊 Homeopatia"**

### Buscar Remédio:
1. Digitar nome (ex: "Arnica")
2. Clicar "Buscar"
3. Ver informações completas

### Explorar por Categoria:
1. Expandir categoria (ex: "Dor e Inflamação")
2. Ver todos os remédios
3. Ler indicações, dosagens, contraindicações

### Informações Incluídas:
- Nome científico
- Potência (6CH, 30CH, 200CH)
- Indicações clínicas
- Dosagem recomendada
- Duração do tratamento
- Contraindicações

---

## 🌸 COMO USAR AROMATERAPIA

### Acessar:
1. Criar/abrir uma anamnese
2. Rolar até "Protocolos Terapêuticos Avançados"
3. Tab **"🌸 Aromaterapia"**

### Buscar Óleo:
1. Digitar nome (ex: "Lavanda")
2. Clicar "Buscar"
3. Ver propriedades e usos

### Métodos de Aplicação:
1. **Difusão:** Difusor aromático
2. **Tópica:** Massagem (sempre diluir!)
3. **Inalação:** Direto ou a vapor
4. **Banho:** Adicionar à água

### ⚠️ Segurança:
- **SEMPRE diluir** antes de aplicar na pele
- Verificar contraindicações
- Especial atenção: gravidez, crianças
- Fotossensibilidade (cítricos)

---

## 📊 COMO GERAR RELATÓRIOS

### Relatório de Sinais Clínicos:
1. Fazer upload das fotos
2. Clicar "Analisar Sinais"
3. Ver resultados
4. **Imprimir:** Botão "🖨️ Imprimir"
5. **PDF:** Botão "📄 Exportar PDF"

### Relatório Completo do Paciente:
1. No Dashboard, selecionar paciente
2. Clicar "Ver"
3. Clicar "Relatório Completo"
4. Escolher:
   - Imprimir
   - Download PDF

### Prescrição Terapêutica:
1. Menu > "Prescrição Terapêutica"
2. Selecionar paciente
3. Personalizar protocolos
4. Imprimir ou baixar PDF

---

## 💾 DADOS E ARMAZENAMENTO

### LocalStorage:
- **Anamneses:** Até 50 registros
- **Histórico de Análises:** Últimas 50
- **Preferências:** Tema, configurações
- **Sessão:** Se auth habilitado

### Limpar Dados:
```javascript
// Console do navegador (F12)
localStorage.clear()
```

### Exportar Dados:
1. Dashboard > Selecionar anamneses
2. Menu > "Exportar Selecionadas"
3. Formato JSON

### Importar Dados:
1. Menu > "Importar Dados"
2. Upload arquivo JSON
3. Confirmar importação

---

## 🔧 CONFIGURAÇÕES AVANÇADAS

### Habilitar Autenticação:
```javascript
// App.js
const AUTH_ENABLED = true; // linha 30
```

### Configurar APIs:
```env
# Criar arquivo .env
REACT_APP_OPENAI_API_KEY=sk-...
REACT_APP_GOOGLE_VISION_API_KEY=AIza...
```

### Alterar Porta:
```env
PORT=3001
```

---

## 🐛 TROUBLESHOOTING

### Erro ao Instalar:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Porta já em uso:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou alterar porta
set PORT=3001 && npm start
```

### Build falha:
```bash
npm run build -- --verbose
```

### Limpar Cache:
```bash
npm cache clean --force
```

---

## 📚 ATALHOS DE TECLADO

| Atalho | Ação |
|--------|------|
| `Ctrl + S` | Salvar anamnese |
| `Ctrl + P` | Imprimir |
| `Esc` | Fechar dialog |
| `Tab` | Navegar campos |
| `Ctrl + K` | Busca rápida |

---

## 🎓 TREINAMENTO RECOMENDADO

### Dia 1: Básico
- [ ] Criar 3 anamneses de teste
- [ ] Preencher todos os campos
- [ ] Fazer upload de fotos
- [ ] Gerar relatórios

### Dia 2: Intermediário
- [ ] Testar modo escuro
- [ ] Explorar homeopatia
- [ ] Explorar aromaterapia
- [ ] Agendar consultas

### Dia 3: Avançado
- [ ] Comparar anamneses
- [ ] Criar prescrições
- [ ] Exportar dados
- [ ] Configurar preferências

---

## 📞 SUPORTE

### Documentação:
- `README.md` - Visão geral
- `RECURSOS-COMPLETOS.md` - Funcionalidades
- `GUIA-DE-TESTES.md` - Testes
- `MELHORIAS-V2.1.md` - Novidades
- `DEPLOY-PRODUCTION-GUIDE.md` - Deploy

### Comandos Úteis:
```bash
npm start          # Iniciar dev
npm test           # Testes
npm run build      # Build produção
npm run deploy     # Deploy (gh-pages)
vercel --prod      # Deploy Vercel
```

---

## ✅ CHECKLIST DE VERIFICAÇÃO

Antes de usar em produção:

- [ ] Testar todas as funcionalidades
- [ ] Verificar modo escuro
- [ ] Testar em mobile
- [ ] Verificar impressão/PDF
- [ ] Testar upload de fotos
- [ ] Verificar agendamentos
- [ ] Testar homeopatia/aromaterapia
- [ ] Fazer backup dos dados
- [ ] Configurar .env (se necessário)
- [ ] Ler documentação completa

---

## 🎉 SISTEMA PRONTO!

### Status: ✅ **OPERACIONAL**

**Versão:** 2.1.0  
**Data:** 2 de Dezembro de 2025  
**Desenvolvedor:** GitHub Copilot  
**Cliente:** Wander Pires Silva Coelho

---

**📖 Leia MELHORIAS-V2.1.md para detalhes completos!**

_Bom trabalho! 🚀_
