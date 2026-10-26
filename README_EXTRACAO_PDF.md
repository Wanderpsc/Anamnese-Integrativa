# 🔬 Extração de Dados do PDF de Exames Laboratoriais

## ✅ Status Atual

- ✅ **Python 3.14.0** instalado
- ✅ **Bibliotecas instaladas**: PyPDF2, pdfplumber, PyMuPDF, pytesseract, pdf2image, Pillow
- ✅ **Componente React** criado: `ExamesLaboratoriais.js`
- ✅ **JSON inicial** criado: `examesLaboratoriais.json` (45 exames pré-configurados)
- ⚠️ **Tesseract OCR**: Necessário instalar manualmente (PDF é de imagens escaneadas)

## 📋 Próximos Passos para OCR

### 1️⃣ Instalar Tesseract OCR

**Download:** https://github.com/UB-Mannheim/tesseract/wiki

**Instalação:**
1. Baixe o instalador Windows (tesseract-ocr-w64-setup-*.exe)
2. Durante a instalação:
   - ⚠️ **IMPORTANTE:** Marque a opção "Portuguese" (português)
   - Opção 1: Instalar em `C:\Program Files\Tesseract-OCR`
   - Opção 2: Instalar em `E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\tools\Tesseract-OCR`

### 2️⃣ Instalar Poppler (para pdf2image)

**Download:** https://github.com/oschwartz10612/poppler-windows/releases/

**Instalação:**
1. Baixe o Release-*.zip mais recente
2. Extraia em: `E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\tools\poppler`
3. Estrutura esperada: `tools\poppler\Library\bin\pdftoppm.exe`

### 3️⃣ Executar Extração OCR

```powershell
cd "E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app"
python extract_with_ocr_complete.py
```

**Tempo estimado:** 5-10 minutos para processar 20 páginas

**Arquivos gerados:**
- `extracted_text_ocr.txt` - Texto completo extraído
- `extracted_exams_ocr.json` - Dados estruturados dos exames
- `extracted_progress_p5.txt`, `p10.txt`, etc. - Progresso parcial

## 📂 Estrutura de Arquivos

```
E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\
├── src/
│   ├── components/
│   │   └── ExamesLaboratoriais.js          ✅ Componente React pronto
│   ├── data/
│   │   └── examesLaboratoriais.json        ✅ 45 exames pré-configurados
│   └── assets/
│       └── therapeutic-data/
│           └── Do Manual Prático de Exames Laboratoriais 01.pdf
├── tools/                                   📁 Criar estas pastas
│   ├── Tesseract-OCR/                      ⚠️ Instalar Tesseract aqui
│   │   └── tesseract.exe
│   └── poppler/                             ⚠️ Extrair Poppler aqui
│       └── Library/bin/pdftoppm.exe
├── extract_pdf_complete.py                 ✅ Script básico (tentou PyMuPDF)
├── extract_with_ocr_complete.py            ✅ Script OCR completo
├── extracted_text.txt                      ✅ Resultado (vazio - PDF é imagem)
└── README_EXTRACAO_PDF.md                  📖 Este arquivo
```

## 🎯 Alternativa: Preenchimento Manual

Como você já tem **45 exames pré-configurados** no JSON, você pode:

1. **Abrir o PDF** visualmente
2. **Editar** `src/data/examesLaboratoriais.json`
3. **Adicionar** novos exames seguindo o formato existente

### Formato de cada exame:

```json
{
  "id": 46,
  "exame": "Nome do Exame",
  "valoresReferencia": "Valores de referência",
  "valoresIdeais": "Valores ideais",
  "resultadoPaciente": "",
  "alteracoesSignificados": "O que significa quando alto/baixo",
  "correlacoesFuncionais": "Relação com outros marcadores",
  "sugestoesTratamento": "Sugestões de tratamento completas"
}
```

## 🚀 Como Usar o Componente

1. **Acesse:** http://localhost:3001/exames-laboratoriais
2. **Preencha:** Nome do paciente e data
3. **Digite:** Resultados nos campos editáveis
4. **Exporte:** JSON ou CSV quando necessário
5. **Salve:** Os dados ficam no localStorage

## 📝 Scripts Disponíveis

### extract_pdf_complete.py
Tenta múltiplos métodos de extração:
1. PyMuPDF (rápido, mas não funciona com imagens)
2. pdfplumber (detalhado, mas não funciona com imagens)
3. OCR (funciona com imagens, mas precisa Tesseract)

### extract_with_ocr_complete.py
Extração completa com OCR:
- Busca automaticamente Tesseract e Poppler
- Salva progresso a cada 5 páginas
- Tenta extrair dados estruturados
- Gera JSON com exames encontrados

## ⚡ Verificação Rápida

```powershell
# Verificar Python
python --version  # Deve mostrar: Python 3.14.0

# Verificar bibliotecas
pip list | Select-String "pdf|tesseract|pillow"

# Verificar Tesseract (após instalação)
& "C:\Program Files\Tesseract-OCR\tesseract.exe" --version
```

## 🐛 Problemas Comuns

### "Tesseract não encontrado"
- Instale o Tesseract do link acima
- Marque "Portuguese" durante instalação

### "poppler not found"
- Instale o Poppler do link acima
- Extraia na pasta `tools/poppler`

### "Página em branco" no componente React
- Abra o console do navegador (F12)
- Verifique erros JavaScript
- O JSON pode estar malformado

### OCR muito lento
- Normal! OCR de 20 páginas leva 5-10 minutos
- O script salva progresso a cada 5 páginas

## 📞 Próximas Ações

1. **Instalar Tesseract** (se quiser usar OCR)
2. **OU continuar** editando o JSON manualmente
3. **Adicionar mais exames** conforme necessário
4. **Testar** o componente no navegador

---

**Tudo foi configurado no drive E:** ✅
- Python e bibliotecas instalados
- Scripts criados em E:
- Ferramentas serão instaladas em E:\tools\
- JSON e componente prontos para uso
