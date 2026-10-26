import pdfplumber
import sys

def extract_pdf_text_pdfplumber(pdf_path):
    """Extrai todo o texto de um PDF usando pdfplumber"""
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            print(f"Total de páginas: {total_pages}", file=sys.stderr)
            
            for page_num, page in enumerate(pdf.pages):
                page_text = page.extract_text()
                if page_text:
                    text += f"\n\n{'='*80}\n=== PÁGINA {page_num + 1} ===\n{'='*80}\n\n{page_text}"
                    print(f"Processada página {page_num + 1}/{total_pages} - {len(page_text)} caracteres", file=sys.stderr)
                else:
                    print(f"Página {page_num + 1}/{total_pages} - SEM TEXTO EXTRAÍVEL", file=sys.stderr)
    except Exception as e:
        print(f"Erro ao ler PDF: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        return None
    
    return text

# Caminho do PDF
pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\Do Manual Prático de Exames Laboratoriais 01.pdf"

print("Iniciando extração do PDF com pdfplumber...", file=sys.stderr)
full_text = extract_pdf_text_pdfplumber(pdf_path)

if full_text:
    # Salvar o texto extraído em um arquivo
    output_file = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\pdf_extracted_full_text.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    print(f"\n{'='*80}", file=sys.stderr)
    print(f"Texto extraído salvo em: {output_file}", file=sys.stderr)
    print(f"Total de caracteres: {len(full_text)}", file=sys.stderr)
    print(f"{'='*80}\n", file=sys.stderr)
    
    # Imprimir o texto também no stdout para visualização
    print(full_text)
else:
    print("Falha ao extrair texto do PDF", file=sys.stderr)
