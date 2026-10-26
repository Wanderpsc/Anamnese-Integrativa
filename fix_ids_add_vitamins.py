#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para renumerar IDs após adição de 5 novas vitaminas (B2, B3, B5, MMA, K)
IDs 66-68 já adicionados (B2, B3, B5)
IDs 69-73 precisam ser adicionados (MMA, C, D, E, K)
IDs 69+ precisam ser incrementados em 5
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Dicionário de mapeamento: ID antigo -> ID novo
# Incrementar todos os IDs de 69 em diante em 5 posições
id_mappings = {}
for old_id in range(108, 68, -1):  # De trás para frente para evitar conflitos
    new_id = old_id + 5
    id_mappings[old_id] = new_id

print("Mapeamento de IDs:")
print(f"Total de IDs a renumerar: {len(id_mappings)}")
print(f"Novo total de exames: 113")

# Substituir os IDs
count = 0
for old_id, new_id in sorted(id_mappings.items(), reverse=True):
    # Padrão para encontrar "id: 69," (com espaços e quebra de linha)
    pattern = rf'(\s+id:\s*){old_id}(\s*,)'
    replacement = rf'\g<1>{new_id}\2'
    
    old_content = content
    content = re.sub(pattern, replacement, content)
    
    if old_content != content:
        count += 1
        print(f"✓ Substituído ID {old_id} → {new_id}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Arquivo atualizado com sucesso!")
print(f"Total de IDs corrigidos: {count}")
print(f"IDs 66-68 já existem (B2, B3, B5)")
print(f"Necessário adicionar manualmente: IDs 69-73 (MMA, C, D, E, K)")
