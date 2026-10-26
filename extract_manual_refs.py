import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
from docx import Document
import re

path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO 2\anamnese-app\src\assets\therapeutic-data\MANUAL PRÁTICO DA ANAMNESE INTEGRATIVA - LUCIANA CAXITO\4 da página 242 à 424.docx"
doc = Document(path)

text_blocks = []
for para in doc.paragraphs:
    if para.text.strip():
        text_blocks.append(para.text)

full = '\n'.join(text_blocks)

# Find all "Valor funcional ideal" and "Valor ideal" sections
for m in re.finditer(r'(Valor\s+(?:funcional\s+)?ideal|Valor\s+de\s+referência|Valor\s+ótimo|Valor\s+Ideal\s+F)', full, re.IGNORECASE):
    idx = m.start()
    # Get context: 200 chars before to find the biomarker name, 200 chars after for the value
    context_before = full[max(0,idx-200):idx]
    context_after = full[idx:idx+200]
    print(f'\n--- MATCH at {idx} ---')
    print('BEFORE:', context_before[-100:].replace('\n',' '))
    print('VALUE:', context_after[:150].replace('\n',' '))
