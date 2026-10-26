import PyPDF2
import json
import sys

def extract_pdf_text(pdf_path):
    """Extrai todo o texto de um PDF"""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            total_pages = len(pdf_reader.pages)
            print(f"Total de páginas: {total_pages}", file=sys.stderr)
            
            for page_num in range(total_pages):
                page = pdf_reader.pages[page_num]
                page_text = page.extract_text()
                text += f"\n\n=== PÁGINA {page_num + 1} ===\n\n{page_text}"
                print(f"Processada página {page_num + 1}/{total_pages}", file=sys.stderr)
    except Exception as e:
        print(f"Erro ao ler PDF: {e}", file=sys.stderr)
        return None
    
    return text

# Caminho do PDF
pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\Do Manual Prático de Exames Laboratoriais 01.pdf"

print("Iniciando extração do PDF...", file=sys.stderr)
full_text = extract_pdf_text(pdf_path)

if full_text:
    # Salvar o texto extraído em um arquivo
    output_file = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\pdf_extracted_text.txt"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(full_text)
    
    print(f"\nTexto extraído salvo em: {output_file}", file=sys.stderr)
    print(f"Total de caracteres: {len(full_text)}", file=sys.stderr)
    
    # Imprimir o texto também no stdout
    print(full_text)
else:
    print("Falha ao extrair texto do PDF", file=sys.stderr)
