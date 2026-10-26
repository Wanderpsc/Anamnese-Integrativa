import fitz  # pymupdf
import json

pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\4 da página 242 à 424.pdf"

try:
    doc = fitz.open(pdf_path)
    print(f"Total de páginas: {len(doc)}")
    print("\n" + "="*80)
    print("PRIMEIRAS 10 PÁGINAS DO PDF:")
    print("="*80 + "\n")
    
    # Extrair primeiras 10 páginas para análise
    for i in range(min(10, len(doc))):
        page = doc[i]
        text = page.get_text()
        print(f"\n{'='*80}")
        print(f"PÁGINA {i+1}:")
        print('='*80)
        print(text[:3000])  # Primeiros 3000 caracteres
        print("\n")
    
    doc.close()
            
except Exception as e:
    print(f"Erro ao ler PDF: {e}")
    import traceback
    traceback.print_exc()
