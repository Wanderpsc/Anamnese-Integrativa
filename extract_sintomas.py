#!/usr/bin/env python
# -*- coding: utf-8 -*-
import PyPDF2
import sys
import json

pdf_path = r'E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\SINTOMAS E CARÊNCIAS NUTRICIONAIS.pdf'

try:
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        
        full_text = ""
        for page_num, page in enumerate(reader.pages):
            text = page.extract_text()
            full_text += f"\n=== PÁGINA {page_num + 1} ===\n{text}\n"
        
        # Salvar em arquivo
        output_path = r'E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\sintomas_extracted.txt'
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_text)
        
        print(f"Texto extraído com sucesso! Total de páginas: {len(reader.pages)}")
        print(f"Arquivo salvo em: {output_path}")
        print("\n=== PRIMEIROS 3000 CARACTERES ===")
        print(full_text[:3000])
        
except Exception as e:
    print(f"ERRO: {str(e)}", file=sys.stderr)
    sys.exit(1)
