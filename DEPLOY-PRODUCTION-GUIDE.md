# 🚀 Guia de Deploy Completo - Anamnese Integrativa

## 📋 Checklist Pré-Deploy

### 1. ✅ Verificações de Código
- [ ] Todos os testes passando
- [ ] Sem erros no console
- [ ] Sem warnings críticos
- [ ] Build local funcionando
- [ ] Performance otimizada

### 2. ✅ Configurações
- [ ] Variáveis de ambiente configuradas
- [ ] `.gitignore` atualizado
- [ ] `vercel.json` configurado
- [ ] Service Worker testado
- [ ] PWA manifest válido

### 3. ✅ Segurança
- [ ] Senhas com hash
- [ ] HTTPS habilitado
- [ ] CORS configurado
- [ ] Headers de segurança
- [ ] Dados sensíveis em .env

---

## 🌐 Deploy na Vercel (Recomendado)

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login

```bash
vercel login
```

### Passo 3: Deploy

```bash
# Deploy de teste
vercel

# Deploy em produção
vercel --prod
```

### Passo 4: Configurar Domínio Customizado

1. Acessar dashboard da Vercel
2. Settings > Domains
3. Adicionar domínio: `anamnese.seudominio.com`
4. Configurar DNS conforme instruções

### Variáveis de Ambiente na Vercel

```bash
vercel env add REACT_APP_AUTH_ENABLED
vercel env add REACT_APP_API_URL
vercel env add REACT_APP_GOOGLE_VISION_API_KEY
```

Ou pelo dashboard:
1. Settings > Environment Variables
2. Adicionar todas as variáveis do `.env.example`

---

## 📱 Deploy no GitHub Pages

### Passo 1: Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

### Passo 2: Adicionar ao package.json

```json
{
  "homepage": "https://seu-usuario.github.io/anamnese-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Passo 3: Deploy

```bash
npm run deploy
```

### Passo 4: Configurar GitHub

1. Settings > Pages
2. Source: Branch `gh-pages`
3. Aguardar deploy

---

## 🐳 Deploy com Docker

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=anamnese_db
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

### Deploy

```bash
docker-compose up -d
```

---

## ☁️ Deploy na AWS (Amplify)

### Passo 1: Instalar AWS CLI

```bash
npm install -g @aws-amplify/cli
amplify configure
```

### Passo 2: Inicializar Projeto

```bash
amplify init
```

### Passo 3: Adicionar Hosting

```bash
amplify add hosting
# Selecionar: Hosting with Amplify Console
```

### Passo 4: Deploy

```bash
amplify publish
```

---

## 🔧 Otimizações de Performance

### 1. Code Splitting

```javascript
// App.js
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const AnamneseForm = lazy(() => import('./pages/AnamneseForm'));

function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path="/" element={<AnamneseForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Compression

```javascript
// server.js (se usar backend)
const compression = require('compression');
app.use(compression());
```

### 3. Caching

```javascript
// service-worker.js
const CACHE_VERSION = 'v2.0.0';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
});
```

### 4. Image Optimization

```bash
# Instalar image optimizer
npm install --save-dev imagemin imagemin-mozjpeg imagemin-pngquant
```

---

## 🔒 Configurações de Segurança

### Headers de Segurança (nginx.conf)

```nginx
server {
    listen 80;
    server_name anamnese.example.com;

    # Security headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 📊 Monitoramento

### Google Analytics

```javascript
// index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Sentry (Error Tracking)

```bash
npm install --save @sentry/react
```

```javascript
// index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.REACT_APP_DEPLOY_ENV,
  tracesSampleRate: 1.0,
});
```

---

## 🔄 CI/CD com GitHub Actions

Ver arquivo `.github/workflows/ci-cd.yml`

### Secrets necessários:

```
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID
CODECOV_TOKEN (opcional)
```

---

## 📝 Comandos Úteis

```bash
# Build local
npm run build

# Preview do build
npm install -g serve
serve -s build

# Análise do bundle
npm install --save-dev webpack-bundle-analyzer
npm run build -- --stats
npx webpack-bundle-analyzer build/bundle-stats.json

# Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# Deploy Vercel (produção)
vercel --prod

# Deploy GitHub Pages
npm run deploy

# Docker build
docker build -t anamnese-app .
docker run -p 80:80 anamnese-app
```

---

## 🌍 Domínio Customizado

### Passo 1: Registrar Domínio
- Registro.br (Brasil)
- GoDaddy
- Namecheap

### Passo 2: Configurar DNS

**Para Vercel:**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**Para GitHub Pages:**
```
Type    Name    Value
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     seu-usuario.github.io
```

### Passo 3: SSL
- Vercel: Automático
- GitHub Pages: Automático (Let's Encrypt)
- Outros: Let's Encrypt + Certbot

---

## ✅ Checklist Pós-Deploy

- [ ] Site acessível via HTTPS
- [ ] Todas as páginas carregando
- [ ] Forms funcionando
- [ ] Upload de imagens OK
- [ ] LocalStorage persistindo
- [ ] PWA instalável
- [ ] Responsivo mobile
- [ ] Lighthouse score > 90
- [ ] Sem erros no console
- [ ] Analytics configurado

---

## 🆘 Troubleshooting

### Build Falha

```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Erro de Rota 404

Adicionar `_redirects` (Netlify) ou configurar `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Service Worker não atualiza

```javascript
// Forçar atualização
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
}
```

---

## 📞 Suporte

- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages**: https://docs.github.com/pages
- **AWS Amplify**: https://docs.amplify.aws

---

**Guia atualizado em:** 2 de Dezembro de 2025
**Status:** ✅ Pronto para deploy em produção
