#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para corrigir IDs duplicados no Perfil Lipídico
Os IDs 29, 30, 31 que aparecem depois de Colesterol Total devem ser 56, 57, 58
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Encontrar e substituir HDL, LDL, Triglicerídeos com IDs incorretos
replacements = [
    # HDL Colesterol - mudar de 29 para 56
    (r'id: 29,\s+exame: "HDL Colesterol"', 'id: 56,\n          exame: "HDL Colesterol"'),
    # LDL Colesterol - mudar de 30 para 57
    (r'id: 30,\s+exame: "LDL Colesterol"', 'id: 57,\n          exame: "LDL Colesterol"'),
    # Triglicerídeos - mudar de 31 para 58
    (r'id: 31,\s+exame: "Triglicerídeos"', 'id: 58,\n          exame: "Triglicerídeos"'),
]

count = 0
for pattern, replacement in replacements:
    old_content = content
    content = re.sub(pattern, replacement, content)
    if old_content != content:
        count += 1
        print(f"✓ Corrigido: {pattern[:40]}...")

# Agora incrementar todos os IDs de 52 em diante (exceto os já corrigidos) em 3 posições
# IDs 52+ viram 59+ (mas 52-54 já foram criados, então começamos do 55)
# Total atual: 117, novo total será 120

id_mappings = {}
for old_id in range(117, 54, -1):  # De trás para frente, começando depois de Frutosamina
    new_id = old_id + 3
    id_mappings[old_id] = new_id

print(f"\nIncrementando IDs 55-117 em 3 posições...")
print(f"Total de IDs a renumerar: {len(id_mappings)}")

replaced_count = 0
for old_id, new_id in sorted(id_mappings.items(), reverse=True):
    pattern = rf'(\s+id:\s*){old_id}(\s*,)'
    replacement = rf'\g<1>{new_id}\2'
    
    old_content = content
    content = re.sub(pattern, replacement, content)
    
    if old_content != content:
        replaced_count += 1
        if replaced_count <= 3 or replaced_count % 20 == 0:
            print(f"✓ Substituído ID {old_id} → {new_id}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Arquivo atualizado!")
print(f"IDs duplicados corrigidos: {count}")
print(f"IDs incrementados: {replaced_count}")
print(f"Novo total de exames: 120")
