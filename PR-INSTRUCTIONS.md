# 🎯 Instruções para Push e PR - Remoção de Arquivos Legacy de Fitoterapia

## ✅ Status Atual

**Branch criado:** `chore/remove-legacy-phytotherapy`

**Commits realizados:**
```
86aeb6c - test: fix PhytotherapyProtocols test assertion
60e7a99 - chore: remove legacy MedicinalPlants and IndicacaoFitoterapicos; update tests to use consolidated page
d639d89 - chore: stub legacy phytotherapy files and update routes/pages
```

**Arquivos removidos:**
- ❌ `src/pages/MedicinalPlants.js` (deletado)
- ❌ `src/components/IndicacaoFitoterapicos.js` (deletado)

**Arquivos atualizados:**
- ✅ `src/__tests__/MedicinalPlants.test.js` (teste atualizado para usar `PhytotherapyProtocols`)
- ✅ `src/pages/PhytotherapyProtocols.js` (página consolidada mantida)
- ✅ `src/pages/AnamneseForm.js` (blocos de UI removidos)
- ✅ `src/App.js` (rotas atualizadas)

**Build e testes:**
- ✅ Build de produção compilou com sucesso (`npm run build`)
- ✅ Teste atualizado passou (`npm test`)
- ✅ Bundle: 1.19 MB (produção, gzip)

---

## 🚀 Como Fazer Push e Criar PR

### Passo 1: Adicionar Remote (se ainda não existe)

Se você tem um repositório no GitHub/GitLab/Bitbucket:

```bash
# GitHub (HTTPS)
git remote add origin https://github.com/SEU-USUARIO/anamnese-app.git

# GitHub (SSH)
git remote add origin git@github.com:SEU-USUARIO/anamnese-app.git

# GitLab
git remote add origin https://gitlab.com/SEU-USUARIO/anamnese-app.git

# Bitbucket
git remote add origin https://bitbucket.org/SEU-USUARIO/anamnese-app.git
```

Verificar se adicionou corretamente:
```bash
git remote -v
```

### Passo 2: Push da Branch

```bash
git push -u origin chore/remove-legacy-phytotherapy
```

Se for a primeira vez que você faz push e pedir autenticação:
- **GitHub:** use Personal Access Token (não senha) ou configure SSH
- **GitLab/Bitbucket:** use suas credenciais normais ou token

### Passo 3: Criar Pull Request

#### Opção A: Via GitHub CLI (`gh`)

```bash
# Instale gh se não tiver: https://cli.github.com/
gh auth login

# Crie o PR
gh pr create \
  --base main \
  --head chore/remove-legacy-phytotherapy \
  --title "chore: remove legacy phytotherapy files and consolidate into PhytotherapyProtocols" \
  --body "## Objetivo

Remove os arquivos legados de fitoterapia e consolida toda a funcionalidade na página PhytotherapyProtocols.

## Mudanças

- ❌ Remove \`src/pages/MedicinalPlants.js\`
- ❌ Remove \`src/components/IndicacaoFitoterapicos.js\`
- ✅ Atualiza testes para usar página consolidada
- ✅ Remove blocos de UI de Biorressonância e Iridologia do AnamneseForm
- ✅ Atualiza rotas \`/plants\` e \`/indicacao-fitoterapicos\` para apontar para \`PhytotherapyProtocols\`

## Verificações

- ✅ Build de produção passa
- ✅ Testes atualizados e passando
- ✅ Sem imports quebrados

## Tipo de mudança

- [x] Chore (manutenção, remoção de código legacy)
- [x] Refactor (consolidação de páginas)
"
```

#### Opção B: Via Interface Web

1. Faça push da branch:
   ```bash
   git push -u origin chore/remove-legacy-phytotherapy
   ```

2. Acesse seu repositório no navegador:
   - GitHub: `https://github.com/SEU-USUARIO/anamnese-app`
   - GitLab: `https://gitlab.com/SEU-USUARIO/anamnese-app`

3. Clique no banner amarelo **"Compare & pull request"** ou vá em **Pull Requests → New**

4. Preencha:
   - **Base:** `main` (ou `master`)
   - **Compare:** `chore/remove-legacy-phytotherapy`
   - **Title:** `chore: remove legacy phytotherapy files and consolidate into PhytotherapyProtocols`
   - **Description:** (copie o texto do corpo acima)

5. Clique em **Create pull request**

---

## 📦 Bundle Git (Backup/Transferência)

Caso precise transferir para outra máquina ou repositório:

**Bundle criado:** `chore-remove-legacy-phytotherapy.bundle`

Para aplicar em outro repositório:
```bash
git fetch /caminho/para/chore-remove-legacy-phytotherapy.bundle chore/remove-legacy-phytotherapy
git checkout -b chore/remove-legacy-phytotherapy FETCH_HEAD
git push -u origin chore/remove-legacy-phytotherapy
```

---

## 🔍 Comandos de Verificação

Verificar status da branch:
```bash
git status
git log --oneline -5
```

Verificar diferenças:
```bash
git diff main..chore/remove-legacy-phytotherapy --stat
```

Ver arquivos deletados:
```bash
git diff main..chore/remove-legacy-phytotherapy --diff-filter=D --name-only
```

Rodar build localmente:
```bash
npm run build
```

Rodar testes:
```bash
npm test -- --watchAll=false
```

---

## 📝 Descrição da PR (Copy-Paste)

```markdown
## Objetivo

Remove os arquivos legados de fitoterapia e consolida toda a funcionalidade na página PhytotherapyProtocols.

## Mudanças

- ❌ Remove `src/pages/MedicinalPlants.js`
- ❌ Remove `src/components/IndicacaoFitoterapicos.js`
- ✅ Atualiza testes para usar página consolidada
- ✅ Remove blocos de UI de Biorressonância e Iridologia do AnamneseForm
- ✅ Atualiza rotas `/plants` e `/indicacao-fitoterapicos` para apontar para `PhytotherapyProtocols`

## Verificações

- ✅ Build de produção passa
- ✅ Testes atualizados e passando
- ✅ Sem imports quebrados

## Tipo de mudança

- [x] Chore (manutenção, remoção de código legacy)
- [x] Refactor (consolidação de páginas)

## Screenshots

_(Adicione prints da página PhytotherapyProtocols funcionando, se quiser)_

## Checklist

- [x] Build de produção compilou sem erros
- [x] Testes passando
- [x] Rotas atualizadas
- [x] Imports antigos removidos
- [ ] Revisão de código (aguardando)
- [ ] Merge aprovado
```

---

## ⚠️ Troubleshooting

### "fatal: 'origin' does not appear to be a git repository"
→ Você precisa adicionar o remote primeiro (Passo 1)

### "Permission denied (publickey)"
→ Configure SSH key ou use HTTPS com Personal Access Token

### "Updates were rejected because the remote contains work"
→ Faça `git pull origin main --rebase` antes do push

### Build falha
→ Verifique se `node_modules` está atualizado: `npm install`

---

## 📞 Próximos Passos

1. ✅ Adicionar remote (`git remote add origin <URL>`)
2. ✅ Fazer push (`git push -u origin chore/remove-legacy-phytotherapy`)
3. ✅ Criar PR (via `gh` CLI ou interface web)
4. ⏳ Aguardar revisão
5. ⏳ Merge na branch principal

**Tudo pronto para push! 🚀**
