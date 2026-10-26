#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Visualizador de estatísticas da extração de anamnese
"""

import json
from pathlib import Path

def print_header(title, char="="):
    width = 80
    print(f"\n{char * width}")
    print(f"{title.center(width)}")
    print(f"{char * width}\n")

def print_section(title):
    print(f"\n{'─' * 80}")
    print(f"📋 {title}")
    print('─' * 80)

# Carrega o JSON
json_path = Path(r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\anamnesis_complete_data.json")

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

print_header("🏥 SISTEMA DE ANAMNESE INTEGRATIVA 🏥", "=")

# Metadados
print("📊 DADOS DA EXTRAÇÃO")
print(f"   Data: {data['metadata']['extractionDate']}")
print(f"   Versão: {data['metadata']['version']}")
print(f"   Total de perguntas: {data['metadata']['totalQuestions']:,}")
print(f"   Total de categorias: {data['metadata']['totalCategories']}")
print(f"   Total de protocolos: {data['metadata']['totalProtocols']}")

print_section("📁 ARQUIVOS PROCESSADOS")
for i, file in enumerate(data['metadata']['sourceFiles'], 1):
    questions_from_file = len([q for q in data['questions'] if q['source'] == file])
    print(f"   {i}. {file}")
    print(f"      └─ {questions_from_file:,} perguntas extraídas")

print_section("🎯 DISTRIBUIÇÃO POR CATEGORIA")

# Calcula estatísticas por categoria
category_stats = []
for category in data['categories']:
    questions_in_cat = [q for q in data['questions'] if q['category'] == category]
    percentage = (len(questions_in_cat) / len(data['questions'])) * 100
    category_stats.append({
        'name': category,
        'count': len(questions_in_cat),
        'percentage': percentage
    })

# Ordena por quantidade (decrescente)
category_stats.sort(key=lambda x: x['count'], reverse=True)

# Imprime com barras visuais
max_count = max(stat['count'] for stat in category_stats)
for i, stat in enumerate(category_stats, 1):
    bar_length = int((stat['count'] / max_count) * 40)
    bar = '█' * bar_length
    name = stat['name'].capitalize().ljust(20)
    count = str(stat['count']).rjust(4)
    percentage = f"{stat['percentage']:5.1f}%"
    print(f"   {i:2d}. {name} {count} {percentage} {bar}")

print_section("💡 EXEMPLOS DE PERGUNTAS DE QUALIDADE")

# Seleciona algumas perguntas boas de cada categoria
quality_questions = {
    'cardiovascular': [
        "Você sente variações na sua pressão ao longo do dia?",
        "Já percebeu sintomas como tontura ou palpitação?",
        "Percebe relação entre qualidade do sono e pressão arterial?"
    ],
    'digestivo': [
        "Como você percebe sua digestão hoje?",
        "Sente relação entre emoções e saúde do intestino?",
        "Você costuma consumir alimentos fermentados?"
    ],
    'nervoso': [
        "Como é a sua memória? Tem falhas esporádicas?",
        "Já percebeu se a alimentação influencia nos sintomas?",
        "Qual é sua relação emocional com a comida?"
    ],
    'geral': [
        "O que te trouxe à minha consulta? Qual sua queixa principal?",
        "Como é a sua disposição durante o dia?",
        "Faz atividade física regular?"
    ]
}

for category, questions in quality_questions.items():
    print(f"\n   🔹 {category.upper()}")
    for q in questions:
        print(f"      • {q}")

print_section("🎓 CATEGORIAS E SUAS DESCRIÇÕES")

for category in sorted(data['categories']):
    description = data['categoriesDescription'].get(category, 'Sem descrição')
    count = len([q for q in data['questions'] if q['category'] == category])
    print(f"   • {category.capitalize():20s} - {description:30s} ({count} perguntas)")

print_section("💊 PROTOCOLOS TERAPÊUTICOS IDENTIFICADOS")

if data['protocols']:
    for i, protocol in enumerate(data['protocols'][:10], 1):
        name = protocol['name']
        if len(name) > 70:
            name = name[:67] + "..."
        print(f"   {i:2d}. {name}")
    
    if len(data['protocols']) > 10:
        remaining = len(data['protocols']) - 10
        print(f"   ... e mais {remaining} protocolos")

print_section("📈 RESUMO EXECUTIVO")

total_questions = len(data['questions'])
avg_questions_per_category = total_questions / len(data['categories'])

print(f"""
   ✅ Total de perguntas extraídas: {total_questions:,}
   ✅ Categorias identificadas: {len(data['categories'])}
   ✅ Média de perguntas por categoria: {avg_questions_per_category:.1f}
   ✅ Protocolos terapêuticos: {len(data['protocols'])}
   ✅ Arquivos processados: {len(data['metadata']['sourceFiles'])}
   
   📁 Tamanho do arquivo JSON: {json_path.stat().st_size / 1024 / 1024:.2f} MB
   📄 Linhas no arquivo JSON: {sum(1 for _ in open(json_path, encoding='utf-8'))}
""")

print_section("🎯 PRÓXIMAS AÇÕES RECOMENDADAS")

print("""
   1. 📝 REVISÃO E REFINAMENTO
      • Revisar perguntas muito longas ou complexas
      • Remover duplicatas identificadas
      • Melhorar formulação de perguntas confusas
      
   2. 🔗 ENRIQUECIMENTO DE DADOS
      • Mapear relações entre sintomas e diagnósticos
      • Adicionar tratamentos específicos por condição
      • Incluir valores de referência para exames
      
   3. 💻 DESENVOLVIMENTO DA INTERFACE
      • Criar componente React para exibição
      • Implementar sistema de pontuação
      • Adicionar lógica condicional entre perguntas
      
   4. 🏥 INTEGRAÇÃO CLÍNICA
      • Conectar com sistema de prontuário
      • Implementar salvamento de respostas
      • Gerar relatórios automáticos
      
   5. ✅ VALIDAÇÃO
      • Revisão por profissional de saúde
      • Testes com casos reais
      • Ajustes baseados em feedback
""")

print_header("✨ EXTRAÇÃO CONCLUÍDA COM SUCESSO ✨", "=")

print(f"""
📦 Arquivo JSON disponível em:
   {json_path}

📄 Documentação disponível em:
   RESUMO-EXTRACAO-ANAMNESE.md

🔧 Scripts disponíveis:
   • extract_complete_anamnesis.py (extração)
   • analyze_extracted_data.py (análise)
   • view_stats.py (visualização)
""")

print("\n" + "=" * 80 + "\n")
