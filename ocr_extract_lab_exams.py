"""
Script de OCR para extrair texto do PDF "Manual Prático de Exames Laboratoriais 01"
Requer: Tesseract OCR instalado no sistema
"""

import sys
import os
from pdf2image import convert_from_path
from PIL import Image
import pytesseract

# Configurar caminho do Tesseract (ajuste conforme sua instalação)
TESSERACT_PATH = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Verificar se Tesseract está instalado
if os.path.exists(TESSERACT_PATH):
    pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH
else:
    print("="*80, file=sys.stderr)
    print("ERRO: Tesseract OCR não encontrado!", file=sys.stderr)
    print(f"Procurado em: {TESSERACT_PATH}", file=sys.stderr)
    print("\nPor favor, instale o Tesseract OCR:", file=sys.stderr)
    print("https://github.com/UB-Mannheim/tesseract/wiki", file=sys.stderr)
    print("="*80, file=sys.stderr)
    sys.exit(1)

def extract_text_with_ocr(pdf_path, output_file):
    """
    Extrai texto de PDF usando OCR
    """
    print("="*80, file=sys.stderr)
    print("Iniciando OCR do PDF...", file=sys.stderr)
    print(f"PDF: {pdf_path}", file=sys.stderr)
    print("="*80, file=sys.stderr)
    
    try:
        # Converter PDF em imagens
        print("\n[1/3] Convertendo PDF em imagens...", file=sys.stderr)
        # Usar poppler_path se necessário (para Windows pode precisar instalar poppler)
        # poppler_path = r"C:\path\to\poppler\bin"
        images = convert_from_path(pdf_path, dpi=300)  # 300 DPI para boa qualidade OCR
        
        total_pages = len(images)
        print(f"Total de páginas convertidas: {total_pages}", file=sys.stderr)
        
        # Aplicar OCR em cada página
        print("\n[2/3] Aplicando OCR em cada página...", file=sys.stderr)
        full_text = ""
        
        for page_num, image in enumerate(images, 1):
            print(f"  Processando página {page_num}/{total_pages}...", end=" ", file=sys.stderr)
            
            # Aplicar OCR com suporte para português
            page_text = pytesseract.image_to_string(
                image, 
                lang='por+eng',  # Português + Inglês
                config='--psm 1'  # Page segmentation mode: Automatic page segmentation with OSD
            )
            
            if page_text.strip():
                full_text += f"\n\n{'='*80}\n=== PÁGINA {page_num} ===\n{'='*80}\n\n{page_text}"
                print(f"✓ {len(page_text)} caracteres extraídos", file=sys.stderr)
            else:
                print("⚠ Nenhum texto extraído", file=sys.stderr)
        
        # Salvar o texto extraído
        print(f"\n[3/3] Salvando texto extraído...", file=sys.stderr)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_text)
        
        print("="*80, file=sys.stderr)
        print(f"✓ Texto extraído salvo em: {output_file}", file=sys.stderr)
        print(f"✓ Total de caracteres: {len(full_text)}", file=sys.stderr)
        print("="*80, file=sys.stderr)
        
        return full_text
        
    except Exception as e:
        print(f"\n✗ ERRO durante OCR: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        return None

if __name__ == "__main__":
    # Caminhos
    pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\Do Manual Prático de Exames Laboratoriais 01.pdf"
    output_file = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\pdf_ocr_extracted_text.txt"
    
    # Executar OCR
    text = extract_text_with_ocr(pdf_path, output_file)
    
    if text:
        print("\n" + "="*80)
        print("OCR CONCLUÍDO COM SUCESSO!")
        print("="*80)
        print(f"\nPróximo passo: Execute o script de processamento para gerar JSON:")
        print(f"python process_lab_exams_to_json.py")
        print("="*80)
    else:
        print("\n✗ Falha na extração do texto")
        sys.exit(1)
