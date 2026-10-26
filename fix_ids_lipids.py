#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para renumerar IDs após adição de 4 exames lip\u00eddicos
IDs 33-36 já adicionados (Apo A1, Apo B, Lp(a), Col não-HDL)
IDs 37+ precisam ser incrementados em 4
"""

import re

# Ler o arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Incrementar todos os IDs de 37 (Anti-Tireoglobulina) em diante em 4 posições
# Mas agora temos 113 exames, então vamos até 113
# Novo total será 117
id_mappings = {}
for old_id in range(113, 36, -1):  # De trás para frente
    new_id = old_id + 4
    id_mappings[old_id] = new_id

print("Mapeamento de IDs (amostra):")
print(f"37 → {id_mappings.get(37)}")
print(f"74 → {id_mappings.get(74)}")  # Proteínas
print(f"113 → {id_mappings.get(113)}")
print(f"Total de IDs a renumerar: {len(id_mappings)}")
print(f"Novo total de exames: 117")

# Substituir os IDs
count = 0
for old_id, new_id in sorted(id_mappings.items(), reverse=True):
    pattern = rf'(\s+id:\s*){old_id}(\s*,)'
    replacement = rf'\g<1>{new_id}\2'
    
    old_content = content
    content = re.sub(pattern, replacement, content)
    
    if old_content != content:
        count += 1
        if count <= 5 or count % 20 == 0:  # Mostrar primeiros 5 e a cada 20
            print(f"✓ Substituído ID {old_id} → {new_id}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Arquivo atualizado com sucesso!")
print(f"Total de IDs corrigidos: {count}")
