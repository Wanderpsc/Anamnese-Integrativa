import sys
sys.stdout.reconfigure(encoding='utf-8')
from docx import Document
import json
import re

doc = Document(r'E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\4 da página 242 à 424.docx')

all_paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]

# Estrutura para armazenar exames
exames = {}
current_exam = None
current_category = "Geral"

# Categorias detectadas
categorias = {
    'hemograma': ['hemácia', 'hemoglobina', 'hematócrito', 'vcm', 'hcm', 'chcm', 'rdw', 'leucócito', 'plaqueta', 'neutrófilo', 'linfócito'],
    'coagulacao': ['coagulação', 'fibrinogênio', 'd-dímero', 'tap', 'ttpa', 'inr'],
    'metabolismo': ['glicose', 'insulina', 'hemoglobina glicada', 'hba1c', 'frutosamina'],
    'lipidico': ['colesterol', 'hdl', 'ldl', 'vldl', 'triglicerídeo', 'apolipoproteína'],
    'renal': ['ureia', 'creatinina', 'ácido úrico', 'clearance', 'tfg'],
    'hepatico': ['tgo', 'tgp', 'gama gt', 'fosfatase alcalina', 'bilirrubina', 'albumina'],
    'tireoide': ['tsh', 't3', 't4', 'anti-tpo', 'tireoglobulina'],
    'vitaminas': ['vitamina', 'folato', 'ácido fólico', 'cobalamina'],
    'minerais': ['ferro', 'ferritina', 'zinco', 'magnésio', 'cálcio', 'potássio', 'sódio'],
    'hormonios': ['testosterona', 'estrogênio', 'progesterona', 'cortisol', 'dhea'],
    'inflamatorios': ['pcr', 'proteína c reativa', 'vhs', 'procalcitonina'],
    'urina': ['densidade', 'ph urinário', 'proteinúria', 'glicosúria', 'cetonúria'],
    'fezes': ['parasitológico', 'sangue oculto', 'elastase', 'calprotectina']
}

def detectar_categoria(nome):
    nome_lower = nome.lower()
    for cat, keywords in categorias.items():
        for keyword in keywords:
            if keyword in nome_lower:
                return cat.capitalize()
    return "Outros"

# Processar parágrafos
i = 0
while i < len(all_paragraphs):
    text = all_paragraphs[i]
    
    # Detectar início de novo exame por padrões
    if any(marker in text.lower() for marker in ['valores de referência:', 'valores ideais:', 'valores normais:']):
        # Procurar nome do exame nos parágrafos anteriores
        exam_name = None
        for j in range(max(0, i-10), i):
            prev = all_paragraphs[j]
            # Filtros para identificar nome de exame
            if (5 < len(prev) < 100 and 
                not any(x in prev.lower() for x in ['página', 'capítulo', 'tabela', 'figura', 'fonte']) and
                not prev.startswith('•') and
                not prev.startswith('-') and
                ':' not in prev[:20]):
                
                # Limpar nome
                exam_name = prev.replace(':', '').strip()
                
                # Verificar se já não está na lista
                if exam_name and exam_name not in exames:
                    current_exam = exam_name
                    exames[current_exam] = {
                        'nome': exam_name,
                        'categoria': detectar_categoria(exam_name),
                        'unidade': '',
                        'referencia': {},
                        'ideal': {},
                        'funcao': '',
                        'valores_altos': [],
                        'valores_baixos': [],
                        'interpretacao': {}
                    }
                    break
    
    # Se temos um exame ativo, coletar informações
    if current_exam and current_exam in exames:
        text_lower = text.lower()
        
        # Capturar valores de referência
        if 'mulher' in text_lower or 'feminino' in text_lower:
            nums = re.findall(r'\d+[.,]\d+|\d+', text)
            if len(nums) >= 2:
                try:
                    exames[current_exam]['referencia']['mulher'] = {
                        'min': float(nums[0].replace(',', '.')),
                        'max': float(nums[1].replace(',', '.'))
                    }
                except:
                    pass
        
        if 'homem' in text_lower or 'masculino' in text_lower:
            nums = re.findall(r'\d+[.,]\d+|\d+', text)
            if len(nums) >= 2:
                try:
                    exames[current_exam]['referencia']['homem'] = {
                        'min': float(nums[0].replace(',', '.')),
                        'max': float(nums[1].replace(',', '.'))
                    }
                except:
                    pass
        
        if 'criança' in text_lower or 'infantil' in text_lower or 'pediátrico' in text_lower:
            nums = re.findall(r'\d+[.,]\d+|\d+', text)
            if len(nums) >= 2:
                try:
                    exames[current_exam]['referencia']['crianca'] = {
                        'min': float(nums[0].replace(',', '.')),
                        'max': float(nums[1].replace(',', '.'))
                    }
                except:
                    pass
        
        # Capturar valores ideais
        if 'ideal' in text_lower and 'valores ideais' not in text_lower:
            nums = re.findall(r'\d+[.,]\d+|\d+', text)
            if nums:
                try:
                    exames[current_exam]['ideal']['geral'] = float(nums[0].replace(',', '.'))
                except:
                    pass
        
        # Capturar função
        if any(x in text_lower for x in ['função:', 'serve para', 'utilizado para', 'indicado para', 'avalia', 'mede']):
            if len(text) > 20:
                exames[current_exam]['funcao'] = text
        
        # Capturar causas de valores altos
        if any(x in text_lower for x in ['elevado', 'alto', 'aumentado', 'elevação']) and len(text) > 30:
            if not any(x in text_lower for x in ['valores de referência', 'valores ideais']):
                exames[current_exam]['valores_altos'].append(text)
        
        # Capturar causas de valores baixos
        if any(x in text_lower for x in ['baixo', 'reduzido', 'diminuído', 'diminuição', 'deficiência']) and len(text) > 30:
            if not any(x in text_lower for x in ['valores de referência', 'valores ideais']):
                exames[current_exam]['valores_baixos'].append(text)
        
        # Capturar unidade
        if any(unit in text for unit in ['mg/dL', 'g/dL', 'mL', 'µg', 'ng', 'pg', 'mmol', '%', 'UI', 'mEq/L', '/mm³']):
            match = re.search(r'([a-zA-Zµ°]+/[a-zA-Z³]+|[a-zA-Zµ]+/[a-zA-Z]+|%|UI/[a-zA-Z]+)', text)
            if match and not exames[current_exam]['unidade']:
                exames[current_exam]['unidade'] = match.group(0)
    
    i += 1

# Filtrar exames válidos
exames_validos = {k: v for k, v in exames.items() if v['referencia'] or v['funcao']}

print(f'Total de exames válidos extraídos: {len(exames_validos)}')
print('\n=== EXAMES POR CATEGORIA ===')

# Agrupar por categoria
por_categoria = {}
for nome, dados in exames_validos.items():
    cat = dados['categoria']
    if cat not in por_categoria:
        por_categoria[cat] = []
    por_categoria[cat].append(nome)

for cat, lista in sorted(por_categoria.items()):
    print(f'\n{cat} ({len(lista)} exames):')
    for nome in sorted(lista)[:10]:  # Mostrar primeiros 10 de cada categoria
        print(f'  • {nome}')
    if len(lista) > 10:
        print(f'  ... e mais {len(lista) - 10} exames')

# Salvar JSON
with open('exames_extraidos.json', 'w', encoding='utf-8') as f:
    json.dump(exames_validos, f, ensure_ascii=False, indent=2)

print(f'\n✅ Arquivo exames_extraidos.json criado com {len(exames_validos)} exames')
