#!/usr/bin/env python3
# Script para corrigir IDs dos exames após adição dos novos exames do hemograma

import re

# Caminho do arquivo
file_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\components\ExamesLaboratoriais.js"

# Ler o arquivo
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Mapeamento de IDs antigos para novos (a partir do ID 28)
id_mapping = {
    # Perfil Lipídico
    8: 28, 9: 29, 10: 30, 11: 31, 12: 32,
    # Função Tireoidiana  
    13: 33, 14: 34, 15: 35, 16: 36, 17: 37, 18: 38,
    # Função Hepática
    19: 39, 20: 40, 21: 41, 22: 42, 23: 43, 24: 44, 25: 45, 26: 46, 27: 47,
    # Função Renal
    28: 48, 29: 49, 30: 50, 31: 51,
    # Eletrólitos
    32: 52, 33: 53, 34: 54, 35: 55, 36: 56, 37: 57, 38: 58, 39: 59, 40: 60,
    # Vitaminas
    41: 61, 42: 62, 43: 63, 44: 64, 45: 65, 46: 66, 47: 67, 48: 68,
    # Proteínas
    49: 69, 50: 70,
    # Marcadores Cardíacos
    51: 71, 52: 72, 53: 73, 54: 74, 55: 75,
    # Marcadores Inflamatórios
    56: 76, 57: 77, 58: 78,
    # Coagulação
    59: 79, 60: 80, 61: 81,
    # Marcadores Tumorais
    62: 82, 63: 83, 64: 84, 65: 85, 66: 86, 67: 87, 68: 88,
    # Hormônios
    69: 89, 70: 90, 71: 91, 72: 92, 73: 93, 74: 94, 75: 95, 76: 96, 77: 97, 78: 98,
    # Urina
    79: 99, 80: 100, 81: 101, 82: 102,
    # Gasometria
    83: 103, 84: 104, 85: 105, 86: 106, 87: 107, 88: 108
}

# Substituir IDs (começar dos maiores para os menores para evitar substituições duplas)
for old_id in sorted(id_mapping.keys(), reverse=True):
    new_id = id_mapping[old_id]
    # Padrão: buscar "id: XX," onde XX é o old_id
    pattern = rf'(\s+id:\s*){old_id}(,\s*\n)'
    replacement = rf'\g<1>{new_id}\2'
    content = re.sub(pattern, replacement, content)
    print(f"Substituído ID {old_id} → {new_id}")

# Salvar o arquivo
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Arquivo atualizado com sucesso!")
print(f"Total de IDs corrigidos: {len(id_mapping)}")
