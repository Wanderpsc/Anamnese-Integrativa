#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para encontrar exames sem propriedade unidade
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Encontrar todos os blocos de exames
exam_pattern = r'{\s+id:\s*(\d+),\s+exame:\s*"([^"]+)".*?observacoes:\s*"[^"]+"\s*}'

exams = re.findall(exam_pattern, content, re.DOTALL)

print(f"Total de exames encontrados: {len(exams)}")

# Verificar quais não têm unidade
exams_without_units = []
for exam_id, exam_name in exams:
    # Procurar se esse exame tem a propriedade unidade
    exam_block_pattern = rf'id:\s*{exam_id},\s+exame:\s*"{re.escape(exam_name)}".*?(?=\n\s+\}},|\n\s+\}})'
    exam_block = re.search(exam_block_pattern, content, re.DOTALL)
    
    if exam_block:
        block_text = exam_block.group(0)
        if 'unidade:' not in block_text:
            exams_without_units.append((exam_id, exam_name))

print(f"\nExames SEM unidade: {len(exams_without_units)}")
print("\nLista de exames sem unidade:")
for exam_id, exam_name in exams_without_units:
    print(f"  ID {exam_id}: {exam_name}")
