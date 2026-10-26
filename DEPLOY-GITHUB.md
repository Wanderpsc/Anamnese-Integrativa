# 🚀 Deploy no GitHub Pages

## Passo a Passo para Hospedar o Site

### 1️⃣ Criar Repositório no GitHub
1. Acesse [github.com](https://github.com)
2. Clique em "New repository"
3. Nome: `anamnese-app`
4. Deixe como **público**
5. **NÃO** inicialize com README
6. Clique em "Create repository"

### 2️⃣ Instalar gh-pages e Fazer Deploy
Abra o terminal no VS Code e execute:

```bash
# Navegar para o projeto
cd "c:\Users\Wander Pires\meus-projetos\anamnese-app"

# Instalar gh-pages
npm install gh-pages --save-dev

# Inicializar Git (se ainda não inicializou)
git init

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Sistema de Anamnese Integrativa"

# Adicionar origem remota (SUBSTITUIR 'wanderpires' pelo seu usuário GitHub)
git remote add origin https://github.com/wanderpires/anamnese-app.git

# Enviar para GitHub
git branch -M main
git push -u origin main

# Fazer deploy para GitHub Pages
npm run deploy
```

### 3️⃣ Configurar GitHub Pages
1. Vá para o repositório no GitHub
2. Clique em **Settings**
3. No menu lateral, clique em **Pages**
4. Em "Source", selecione **gh-pages** branch
5. Clique em **Save**

### 4️⃣ Acessar o Site
Aguarde alguns minutos e acesse:
```
https://wanderpires.github.io/anamnese-app
```

## 📝 Comandos Úteis

### Atualizar o site após mudanças:
```bash
git add .
git commit -m "Descrição das mudanças"
git push
npm run deploy
```

### Ver o site localmente:
```bash
npm start
```
Acesse: http://localhost:3000

## ⚠️ Importante
- **Os dados dos pacientes ficam salvos no localStorage do navegador**
- Cada navegador/computador tem seus próprios dados
- Para backup, use a funcionalidade de exportação quando implementada
- O site funciona 100% no navegador (não precisa de servidor backend)

## 🌟 Funcionalidades
✅ Formulário de anamnese completo
✅ Dashboard com lista de pacientes
✅ Edição de anamneses
✅ Receita médica profissional
✅ Protocolo de tratamento (A-H)
✅ Análise de iridologia
✅ Termo de consentimento
✅ Campo de pressão arterial
✅ Diagnóstico por tipo sanguíneo
✅ Banco de dados terapêutico integrado
