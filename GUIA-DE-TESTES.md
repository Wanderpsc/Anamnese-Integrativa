# 🧪 Guia de Testes - Análise de Sinais Clínicos

## 📋 Checklist de Funcionalidades

### ✅ 1. Upload de Imagens

**Como testar:**
1. Acesse o formulário de anamnese
2. Role até a seção "Análise de Sinais Clínicos"
3. Clique em "Upload" em qualquer uma das 8 áreas
4. Selecione uma imagem do seu computador
5. Verifique se a miniatura aparece corretamente

**Resultado esperado:**
- ✅ Imagem aparece em miniatura
- ✅ Botões "Visualizar" e "Remover" disponíveis
- ✅ Ícone de upload desaparece

---

### ✅ 2. Captura por Câmera

**Como testar:**
1. Clique no botão "Foto" (ícone de câmera)
2. Permita acesso à câmera quando solicitado
3. Aguarde a câmera inicializar
4. Clique em "Capturar"
5. Verifique se a foto foi capturada

**Resultado esperado:**
- ✅ Dialog modal abre com visualização da câmera
- ✅ Imagem é capturada ao clicar
- ✅ Dialog fecha automaticamente
- ✅ Imagem aparece na miniatura

**Resolução de problemas:**
- Se a câmera não abrir, verifique permissões do navegador
- Chrome: `chrome://settings/content/camera`
- Edge: `edge://settings/content/camera`

---

### ✅ 3. Zoom de Imagens

**Como testar:**
1. Após fazer upload de uma imagem
2. Clique no ícone de "Visualizar" (olho)
3. Verifique se o dialog modal abre com a imagem em tamanho maior
4. Clique no X ou fora do dialog para fechar

**Resultado esperado:**
- ✅ Dialog abre com imagem ampliada
- ✅ Título mostra a área (ex: "Face/Pele")
- ✅ Imagem é exibida em alta qualidade

---

### ✅ 4. Remover Imagens

**Como testar:**
1. Clique no ícone de "Remover" (lixeira) em uma imagem
2. Verifique se a imagem é removida
3. Botão de upload deve reaparecer

**Resultado esperado:**
- ✅ Imagem removida imediatamente
- ✅ Interface volta ao estado inicial
- ✅ Sem erros no console

---

### ✅ 5. Análise de Sinais

**Como testar:**
1. Faça upload de pelo menos 1 imagem
2. Clique no botão "Analisar Sinais"
3. Aguarde o processamento (~3 segundos)
4. Verifique se o relatório aparece

**Resultado esperado:**
- ✅ Botão mostra "Analisando..." com spinner
- ✅ Após 3s, relatório completo é exibido
- ✅ Mensagem de sucesso: "✅ Análise completa de X imagens"
- ✅ Análise salva automaticamente no histórico

---

### ✅ 6. Visualização do Relatório

**Como testar:**
1. Após a análise, role para baixo
2. Verifique se o relatório está formatado
3. Confira as seções: Pele, Unhas, Orelhas, Olhos, Cabelo, Língua

**Resultado esperado:**
- ✅ Cabeçalho com nome do paciente e data
- ✅ Resumo da análise
- ✅ Principais achados destacados
- ✅ Recomendações organizadas por prioridade
- ✅ Alertas de urgência em vermelho

---

### ✅ 7. Impressão

**Como testar:**
1. Com o relatório exibido, clique em "Imprimir"
2. Verifique a visualização de impressão
3. Confira layout e formatação
4. Pode cancelar ou imprimir

**Resultado esperado:**
- ✅ Dialog de impressão do navegador abre
- ✅ Layout otimizado para A4
- ✅ Botões de ação não aparecem na impressão
- ✅ Cabeçalho e rodapé formatados

**Dica:** Use "Salvar como PDF" na impressão para testar sem gastar papel.

---

### ✅ 8. Exportação PDF

**Como testar:**
1. Clique no botão "Exportar PDF"
2. Aguarde o processamento (~2-3 segundos)
3. Verifique se o download inicia automaticamente
4. Abra o PDF gerado

**Resultado esperado:**
- ✅ PDF é gerado automaticamente
- ✅ Nome do arquivo: `relatorio-sinais-clinicos-[nome]-[timestamp].pdf`
- ✅ Conteúdo completo e legível
- ✅ Imagens de alta qualidade

**Localização do download:**
- Windows: `C:\Users\[seu-usuario]\Downloads\`

---

### ✅ 9. Histórico - Salvamento

**Como testar:**
1. Realize uma análise completa
2. Verifique se o contador do botão "Histórico" aumentou
3. Clique em "Histórico"
4. Verifique se a análise aparece na lista

**Resultado esperado:**
- ✅ Contador atualiza: "Histórico (1)"
- ✅ Análise aparece no topo da lista
- ✅ Data/hora corretas
- ✅ Nome do paciente exibido
- ✅ Número de imagens mostrado

---

### ✅ 10. Histórico - Recuperação

**Como testar:**
1. Abra o histórico
2. Clique em "Carregar" em uma análise anterior
3. Verifique se o relatório é restaurado
4. Dialog deve fechar automaticamente

**Resultado esperado:**
- ✅ Relatório completo restaurado
- ✅ Todos os dados carregados
- ✅ Possível imprimir/exportar novamente

---

### ✅ 11. Histórico - Persistência

**Como testar:**
1. Realize algumas análises
2. Feche completamente o navegador
3. Abra novamente o sistema
4. Clique em "Histórico"
5. Verifique se as análises ainda estão lá

**Resultado esperado:**
- ✅ Todas as análises preservadas
- ✅ Sem perda de dados
- ✅ Ordem cronológica mantida

---

### ✅ 12. Histórico - Limpeza

**Como testar:**
1. Com análises no histórico, clique em "Limpar"
2. Confirme a ação no alert
3. Verifique se o histórico foi limpo

**Resultado esperado:**
- ✅ Alert de confirmação aparece
- ✅ Ao confirmar, histórico é limpo
- ✅ Contador volta para "Histórico (0)"
- ✅ Mensagem: "Nenhuma análise no histórico"

---

### ✅ 13. Múltiplas Imagens

**Como testar:**
1. Faça upload de imagens em várias áreas (face, unhas, língua, etc.)
2. Clique em "Analisar Sinais"
3. Verifique se todas as áreas são mencionadas no relatório

**Resultado esperado:**
- ✅ Análise considera todas as imagens
- ✅ Mensagem: "Análise completa de X imagens"
- ✅ Lista de áreas analisadas: "face, nails, tongue..."

---

### ✅ 14. Validação de Campos

**Como testar:**
1. Tente clicar em "Analisar Sinais" sem nenhuma imagem
2. Verifique a mensagem de erro

**Resultado esperado:**
- ✅ Alert: "Por favor, envie pelo menos uma imagem"
- ✅ Análise não prossegue
- ✅ Sem erros no console

---

### ✅ 15. Responsividade

**Como testar:**
1. Redimensione a janela do navegador
2. Teste em diferentes tamanhos:
   - Desktop (1920x1080)
   - Laptop (1366x768)
   - Tablet (768x1024)
   - Mobile (375x667)

**Resultado esperado:**
- ✅ Layout se adapta ao tamanho da tela
- ✅ Cards de upload reorganizam em grid
- ✅ Botões permanecem acessíveis
- ✅ Relatório legível em todos os tamanhos

**Ferramenta:** Use F12 → Device Toolbar (Ctrl+Shift+M)

---

### ✅ 16. Compatibilidade de Navegadores

**Testar em:**
- ✅ Google Chrome (recomendado)
- ✅ Microsoft Edge
- ✅ Firefox
- ✅ Safari (Mac)

**Resultado esperado:**
- Todas as funcionalidades operacionais
- Câmera funciona (com permissões)
- PDF é gerado corretamente
- LocalStorage funciona

---

### ✅ 17. Performance

**Como testar:**
1. Faça upload de imagens grandes (3-5 MB)
2. Verifique o tempo de processamento
3. Gere PDF de relatório completo
4. Monitore uso de memória (F12 → Memory)

**Resultado esperado:**
- ✅ Upload instantâneo
- ✅ Análise em ~3 segundos
- ✅ PDF gerado em 2-3 segundos
- ✅ Sem travamentos ou lentidão

---

### ✅ 18. Console do Navegador

**Como testar:**
1. Abra F12 (DevTools)
2. Vá para a aba Console
3. Realize todas as operações
4. Verifique se há erros

**Resultado esperado:**
- ✅ Sem erros em vermelho
- ✅ Apenas logs informativos (se houver)
- ✅ Sem warnings críticos

---

## 🐛 Resolução de Problemas Comuns

### Problema: Câmera não abre
**Solução:**
1. Verificar permissões do navegador
2. Usar HTTPS (não HTTP)
3. Testar outro navegador
4. Verificar se há outra aplicação usando a câmera

### Problema: PDF não gera
**Solução:**
1. Verificar se popup está bloqueado
2. Tentar novamente após alguns segundos
3. Verificar console para erros
4. Usar navegador Chrome/Edge

### Problema: Histórico não salva
**Solução:**
1. Verificar se localStorage está ativado
2. Modo anônimo pode bloquear localStorage
3. Verificar limite de armazenamento (5-10 MB)
4. Limpar dados antigos

### Problema: Imagens não carregam
**Solução:**
1. Usar formatos suportados: JPG, PNG, WEBP
2. Verificar tamanho (< 10 MB recomendado)
3. Testar com outra imagem
4. Verificar extensão do arquivo

---

## 📊 Métricas de Sucesso

- ✅ Upload: < 1 segundo
- ✅ Análise: ~3 segundos
- ✅ PDF: 2-3 segundos
- ✅ Histórico: instantâneo
- ✅ Impressão: < 1 segundo
- ✅ 0 erros no console
- ✅ 100% funcionalidades operacionais

---

## 📝 Checklist Final

Antes de considerar o teste completo, verifique:

- [ ] Todas as 8 áreas aceitam upload
- [ ] Câmera funciona em todas as áreas
- [ ] Análise gera relatório completo
- [ ] Impressão formata corretamente
- [ ] PDF é gerado e baixado
- [ ] Histórico salva automaticamente
- [ ] Histórico pode ser carregado
- [ ] Histórico persiste após reload
- [ ] Limpeza de histórico funciona
- [ ] Sem erros no console
- [ ] Responsivo em mobile
- [ ] Funciona em Chrome/Edge
- [ ] Performance adequada

---

## 🎯 Casos de Uso Reais

### Caso 1: Primeira Consulta
1. Paciente chega
2. Preencher anamnese completa
3. Fotografar: face, língua, unhas, orelhas
4. Analisar sinais
5. Imprimir relatório
6. Discutir achados com paciente

### Caso 2: Retorno
1. Abrir histórico
2. Carregar análise anterior
3. Comparar com novas fotos
4. Gerar novo relatório
5. Exportar PDF para envio

### Caso 3: Documentação
1. Realizar análise completa
2. Exportar PDF
3. Anexar ao prontuário
4. Manter histórico local
5. Backup periódico

---

**Data do Teste:** _______/_______/________
**Testador:** ___________________________
**Navegador:** __________________________
**Status:** [ ] Aprovado [ ] Com pendências

---

✅ **Sistema pronto para uso profissional!**
