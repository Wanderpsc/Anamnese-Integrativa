from docx import Document

docx_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\4 da página 242 à 424.docx"

try:
    doc = Document(docx_path)
    text_content = ""
    
    print(f"Total de parágrafos: {len(doc.paragraphs)}")
    print(f"Total de tabelas: {len(doc.tables)}")
    
    # Extrair texto de todos os parágrafos
    for i, para in enumerate(doc.paragraphs):
        if para.text.strip():
            text_content += para.text + "\n"
    
    # Extrair texto das tabelas
    for table_idx, table in enumerate(doc.tables):
        text_content += f"\n\n{'='*70}\nTABELA {table_idx + 1}\n{'='*70}\n"
        for row in table.rows:
            row_text = " | ".join([cell.text.strip() for cell in row.cells])
            if row_text.strip():
                text_content += row_text + "\n"
    
    # Salvar o texto extraído
    with open("extracted_exams_docx.txt", "w", encoding="utf-8") as output:
        output.write(text_content)
    
    print(f"\nTexto extraído com sucesso!")
    print(f"Tamanho do texto: {len(text_content)} caracteres")
    
    # Mostrar primeiros 10000 caracteres
    print("\n" + "="*70)
    print("PRIMEIRAS PÁGINAS DO CONTEÚDO:")
    print("="*70)
    print(text_content[:15000])
    
except Exception as e:
    print(f"Erro ao processar DOCX: {str(e)}")
    import traceback
    traceback.print_exc()
