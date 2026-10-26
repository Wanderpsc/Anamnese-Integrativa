import pdfplumber

pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\4 da página 242 à 424.pdf"

try:
    with pdfplumber.open(pdf_path) as pdf:
        text_content = ""
        
        print(f"Total de páginas: {len(pdf.pages)}")
        
        # Extrair texto de todas as páginas
        for page_num, page in enumerate(pdf.pages):
            text = page.extract_text()
            if text:  # Só adiciona se houver texto
                text_content += f"\n\n{'='*70}\n=== PÁGINA {page_num + 1} ===\n{'='*70}\n\n"
                text_content += text
        
        # Salvar o texto extraído
        with open("extracted_exams_pdf.txt", "w", encoding="utf-8") as output:
            output.write(text_content)
        
        print("Texto extraído com sucesso!")
        print(f"Tamanho do texto: {len(text_content)} caracteres")
        
        # Mostrar primeiros 8000 caracteres
        print("\n" + "="*70)
        print("PRIMEIRAS PÁGINAS DO CONTEÚDO:")
        print("="*70)
        print(text_content[:8000])
        
except Exception as e:
    print(f"Erro ao processar PDF: {str(e)}")
    import traceback
    traceback.print_exc()
