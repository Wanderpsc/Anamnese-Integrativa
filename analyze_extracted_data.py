#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para analisar os dados extraídos do arquivo JSON
"""

import json
from pathlib import Path
from collections import Counter

# Carrega o JSON
json_path = Path(r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\anamnesis_complete_data.json")

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

print("="*80)
print("ANÁLISE DOS DADOS EXTRAÍDOS")
print("="*80)

# Metadados
print("\n📊 METADADOS:")
for key, value in data['metadata'].items():
    if isinstance(value, list):
        print(f"  • {key}:")
        for item in value:
            print(f"    - {item}")
    else:
        print(f"  • {key}: {value}")

# Categorias
print("\n📋 CATEGORIAS:")
for i, cat in enumerate(data['categories'], 1):
    count = len([q for q in data['questions'] if q['category'] == cat])
    print(f"  {i:2d}. {cat.capitalize():20s} ({count:4d} perguntas)")

# Exemplos de perguntas por categoria
print("\n" + "="*80)
print("EXEMPLOS DE PERGUNTAS POR CATEGORIA")
print("="*80)

for category in sorted(data['categories']):
    questions_in_cat = [q for q in data['questions'] if q['category'] == category]
    
    print(f"\n{'='*80}")
    print(f"{category.upper()} ({len(questions_in_cat)} perguntas)")
    print('='*80)
    
    # Mostra até 10 exemplos
    for i, q in enumerate(questions_in_cat[:10], 1):
        text = q['text']
        if len(text) > 100:
            text = text[:97] + "..."
        print(f"  {i:2d}. [{q['id']}] {text}")

# Estatísticas adicionais
print("\n" + "="*80)
print("ESTATÍSTICAS ADICIONAIS")
print("="*80)

# Perguntas por arquivo fonte
print("\n📁 PERGUNTAS POR ARQUIVO FONTE:")
source_counter = Counter([q['source'] for q in data['questions']])
for source, count in sorted(source_counter.items()):
    print(f"  • {source}: {count} perguntas")

# Perguntas com condições relacionadas
questions_with_conditions = [q for q in data['questions'] if q['relatedConditions']]
print(f"\n🔗 Perguntas com condições relacionadas: {len(questions_with_conditions)}")

# Condições únicas mencionadas
all_conditions = set()
for q in data['questions']:
    all_conditions.update(q['relatedConditions'])
print(f"🏥 Condições únicas identificadas: {len(all_conditions)}")

# Protocolos
print(f"\n💊 Total de protocolos identificados: {len(data['protocols'])}")
if data['protocols']:
    print("   Exemplos:")
    for i, protocol in enumerate(data['protocols'][:5], 1):
        name = protocol['name']
        if len(name) > 80:
            name = name[:77] + "..."
        print(f"     {i}. {name}")

print("\n" + "="*80)
print("✅ Análise concluída!")
print("="*80)
