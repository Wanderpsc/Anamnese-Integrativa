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

# Search specifically for key markers
targets = [
    'Vitamina D', 'Vitamina B12', 'Proteina C reativa', 'PCR', 'Proteína C Reativa',
    'Hemoglobina Glicada', 'HbA1c', 'Glicose', 'Glicemia',
    'Insulina', 'Magnesio', 'Magnésio', 'Zinco', 'Calcio', 'Cálcio',
    'TGO', 'TGP', 'GGT', 'Albumina', 'HOMA', 'Acido Urico', 'Ácido Úrico',
    'Vitamina B9', 'Acido folico', 'Ácido fólico',
    'Creatinina', 'Ureia', 'Uréia'
]

seen = set()
for target in targets:
    for m in re.finditer(re.escape(target), full, re.IGNORECASE):
        idx = m.start()
        # Look for "Valor" within 600 chars after
        chunk = full[idx:idx+800]
        if 'Valor' in chunk or 'valor' in chunk:
            key = target.lower()
            if key not in seen:
                seen.add(key)
                print(f'\n======= {target} (pos {idx}) =======')
                print(chunk[:700])
                print()
            break
