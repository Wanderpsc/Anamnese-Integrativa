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

# Find specifically the VITAMIN D section (25-OH), Vitamin B12, PCR, Glicose basal, Insulina, Magnésio, Zinco serum
# These need more specific context
sections = [
    ('Vitamina D', '25-OH|25OH|vitamina D', 400),
    ('Vitamina B12', 'B12.*Fisiologia|Cobalamina|vitamina B12\nFisiologia', 600),
    ('PCR-us', 'PCR.*ultrassens|proteina C reativa ultrassens|PCR.{0,20}hs|prot.{0,10}C.*reativ', 500),
    ('Glicose basal', 'Glicose.*Fisiologia|Glicemia.*Fisiologia|glicose de jejum|glicemia de jejum', 500),
    ('Insulina basal', 'Insulina.*Fisiologia|Insulina basal', 500),
    ('Magnésio sérico', 'Magnésio.*Fisiologia|Magnesio serum|Magnesio Serico', 500),
    ('Zinco sérico', 'Zinco.*Fisiologia|Zinco.{0,5}Valor', 500),
    ('TGO AST', 'TGO.*Fisiologia|AST.*Fisiologia|TGO.*aminotransf', 400),
    ('GGT', 'GGT.*Fisiologia|Gama.*glutamil.*Fisiologia|Gamaglutamil', 400),
]

for label, pattern, length in sections:
    m = re.search(pattern, full, re.IGNORECASE | re.DOTALL)
    if m:
        idx = m.start()
        print(f'\n======= {label} =======')
        print(full[idx:idx+length])
    else:
        print(f'\n======= {label} NOT FOUND =======')
