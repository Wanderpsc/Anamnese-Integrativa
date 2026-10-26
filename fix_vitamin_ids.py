#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir IDs duplicados após adição de vitaminas
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Substituir manualmente os IDs específicos que estão incorretos
# ID 74-78 (vitaminas) devem virar 69-73
# ID 74 em diante (proteínas+) devem virar 74 em diante

replacements = [
    # Corrigir as vitaminas MMA, C, D, E, K
    (r'id: 74,\s+exame: "Ácido Metilmalônico', 'id: 69,\n          exame: "Ácido Metilmalônico'),
    (r'id: 75,\s+exame: "Vitamina C', 'id: 70,\n          exame: "Vitamina C'),
    (r'id: 76,\s+exame: "Vitamina D', 'id: 71,\n          exame: "Vitamina D'),
    (r'id: 77,\s+exame: "Vitamina E', 'id: 72,\n          exame: "Vitamina E'),
    (r'id: 78,\s+exame: "Vitamina K', 'id: 73,\n          exame: "Vitamina K'),
]

count = 0
for pattern, replacement in replacements:
    old_content = content
    content = re.sub(pattern, replacement, content)
    if old_content != content:
        count += 1
        print(f"✓ Corrigido: {pattern[:30]}...")

print(f"\n✅ Total de correções: {count}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Arquivo salvo!")
