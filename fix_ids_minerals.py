#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para renumerar IDs após adição de 4 minerais
IDs 68-71 já adicionados (Zinco, Cobre, Selênio, Ceruloplasmina)
IDs 72+ (Ácido Fólico em diante) precisam ser incrementados em 4
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Incrementar todos os IDs de 68 (Ácido Fólico - vitaminas) em diante em 4 posições
# Novo total: 120 + 4 = 124
id_mappings = {}
for old_id in range(120, 67, -1):  # De trás para frente
    new_id = old_id + 4
    id_mappings[old_id] = new_id

print(f"Mapeamento de IDs:")
print(f"68 (Ácido Fólico) → {id_mappings.get(68)}")
print(f"81 (Proteínas) → {id_mappings.get(81)}")
print(f"120 → {id_mappings.get(120)}")
print(f"Total de IDs a renumerar: {len(id_mappings)}")
print(f"Novo total de exames: 124\n")

# Substituir os IDs
count = 0
for old_id, new_id in sorted(id_mappings.items(), reverse=True):
    pattern = rf'(\s+id:\s*){old_id}(\s*,)'
    replacement = rf'\g<1>{new_id}\2'
    
    old_content = content
    content = re.sub(pattern, replacement, content)
    
    if old_content != content:
        count += 1
        if count <= 3 or count % 15 == 0:
            print(f"✓ Substituído ID {old_id} → {new_id}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Arquivo atualizado com sucesso!")
print(f"Total de IDs corrigidos: {count}")
print(f"Exames finais: 124")
