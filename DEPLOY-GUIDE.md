# Guia de Deploy - Anamnese Integrativa

## 🚀 Deploy na Vercel (Recomendado)

### Passo 1: Preparar o projeto

```bash
npm run build
```

### Passo 2: Deploy via Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel
```

### Passo 3: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/anamnese-app.git
   git push -u origin main
   ```

2. **Conectar com Vercel:**
   - Acesse: https://vercel.com
   - Faça login com GitHub
   - Clique em "New Project"
   - Selecione o repositório `anamnese-app`
   - Configure:
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Clique em "Deploy"

3. **Seu app estará disponível em:**
   ```
   https://anamnese-app.vercel.app
   ou
   https://seu-projeto.vercel.app
   ```

---

## 📱 Instalar como PWA

### No Computador (Chrome/Edge):

1. Acesse o site deploy
2. Clique no ícone de **instalação** na barra de endereço (➕)
3. Clique em "Instalar"
4. O app aparecerá como aplicativo desktop

### No Celular (Android):

1. Acesse o site no Chrome
2. Menu (⋮) > "Adicionar à tela inicial"
3. Confirme
4. App estará disponível como ícone na tela

### No iPhone (iOS):

1. Acesse o site no Safari
2. Botão Compartilhar (□↑)
3. "Adicionar à Tela de Início"
4. Confirme

---

## 🔐 Sistema de Senhas

### Credenciais Padrão:

**Proprietário (Admin):**
- Usuário: `wander`
- Senha: `admin@2025`

**Usuário (Visualizador):**
- Usuário: `usuario`
- Senha: `user@2025`

### ⚠️ IMPORTANTE:
Altere estas senhas no primeiro acesso em:
**Menu (⚙️) > Configurações > Senha Proprietário/Usuário**

---

## 🌐 Funcionalidades Online/Offline

### ✅ Online:
- Todos os recursos disponíveis
- Sincronização automática
- Upload de fotos da câmera
- Notificações em tempo real

### ✅ Offline:
- Visualizar anamneses salvas
- Criar novas anamneses (salvas localmente)
- Consultar agendamentos
- Gerar relatórios
- **Sincroniza automaticamente quando voltar online**

---

## 🔄 Sincronização de Dados

Os dados são salvos localmente no navegador. Para sincronizar entre dispositivos:

### Opção 1: Export/Import Manual
1. No dispositivo original: Dashboard > Exportar Dados
2. No novo dispositivo: Dashboard > Importar Dados

### Opção 2: Usar sempre o mesmo navegador logado
- Se usar Chrome/Edge com conta Google sincronizada
- Dados do LocalStorage podem sincronizar automaticamente

---

## 🆙 Atualizações

Quando você fizer alterações no código:

1. **Commit e Push:**
   ```bash
   git add .
   git commit -m "Descrição da alteração"
   git push
   ```

2. **Vercel faz deploy automático**
   - Deploy em ~2 minutos
   - Notificação por email
   - URL atualizada automaticamente

3. **Usuários recebem atualização:**
   - Recarregar página (F5)
   - Ou automaticamente na próxima visita

---

## 📊 Monitoramento

### Vercel Dashboard:
- Analytics de acesso
- Logs de erros
- Performance
- Deploy history

Acesse: https://vercel.com/dashboard

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento local
npm start

# Build de produção
npm run build

# Preview do build localmente
npm install -g serve
serve -s build

# Deploy Vercel
vercel --prod

# Ver logs
vercel logs
```

---

## 🔒 Segurança

- ✅ HTTPS automático (Vercel)
- ✅ Senhas com hash
- ✅ Dados criptografados no localStorage
- ✅ Service Worker seguro
- ⚠️ Dados salvos localmente no dispositivo

### Para produção com múltiplos usuários:
Considere implementar:
- Backend com banco de dados
- Autenticação via JWT
- Sincronização cloud
- Backup automático

---

## 📱 Domínio Personalizado (Opcional)

1. Compre domínio (ex: anamnese-wander.com)
2. No Vercel: Settings > Domains
3. Adicione o domínio
4. Configure DNS conforme instruções

---

## 💡 Dicas

1. **Sempre teste localmente antes de fazer push**
2. **Faça backups regulares dos dados**
3. **Altere as senhas padrão imediatamente**
4. **Use HTTPS sempre** (Vercel fornece automaticamente)
5. **Instale como PWA para melhor experiência**

---

## 🆘 Suporte

Em caso de problemas:
1. Verifique os logs no Vercel Dashboard
2. Teste localmente com `npm start`
3. Limpe cache do navegador
4. Desinstale e reinstale o PWA

---

**Deploy realizado! 🎉**
Seu sistema estará acessível de qualquer lugar, funcionará offline e poderá ser instalado como aplicativo!
