import json
from docx import Document
import re

def read_docx_content(file_path):
    """Lê todo o conteúdo de um arquivo DOCX"""
    try:
        doc = Document(file_path)
        content = []
        for para in doc.paragraphs:
            text = para.text.strip()
            if text:
                content.append(text)
        return content
    except Exception as e:
        print(f"Erro ao ler {file_path}: {e}")
        return []

def is_valid_clinical_question(text):
    """Verifica se o texto é uma pergunta/sintoma clínico válido"""
    # Ignora números isolados, índices, títulos curtos
    if len(text) < 15:
        return False
    
    # Ignora se for apenas número ou página
    if re.match(r'^\d+\.?\s*$', text):
        return False
    
    # Ignora índices tipo "1.2.3"
    if re.match(r'^[\d\.]+\s*$', text):
        return False
    
    # Ignora títulos genéricos
    skip_patterns = [
        r'^página\s+\d+',
        r'^índice',
        r'^sumário',
        r'^agradecimento',
        r'^prefácio',
        r'^introdução\s*$',
        r'^capítulo\s+\d+',
        r'^parte\s+\d+',
        r'^referências',
        r'^bibliografia',
        r'^anexo',
    ]
    
    for pattern in skip_patterns:
        if re.search(pattern, text.lower()):
            return False
    
    # Verifica se parece uma pergunta ou sintoma
    clinical_indicators = [
        'você', 'apresenta', 'sente', 'tem', 'possui',
        'dor', 'sintoma', 'problema', 'dificuldade', 'fadiga',
        'cansaço', 'fraqueza', 'mal-estar', 'desconforto',
        'alteração', 'mudança', 'perda', 'ganho', 'excesso',
        'falta', 'deficiência', 'insuficiência', 'inflamação',
        'infecção', 'alergia', 'intolerância', 'sensibilidade'
    ]
    
    text_lower = text.lower()
    has_clinical_term = any(indicator in text_lower for indicator in clinical_indicators)
    
    return has_clinical_term

def extract_clinical_context(lines, index, window=5):
    """Extrai contexto clínico ao redor de uma linha"""
    start = max(0, index - window)
    end = min(len(lines), index + window + 1)
    context_lines = lines[start:end]
    
    conditions = []
    recommendations = []
    
    for line in context_lines:
        line_lower = line.lower()
        
        # Identifica condições/diagnósticos
        if any(word in line_lower for word in ['deficiência', 'insuficiência', 'doença', 'síndrome', 'transtorno', 'distúrbio']):
            conditions.append(line)
        
        # Identifica recomendações
        if any(word in line_lower for word in ['suplementar', 'vitamina', 'mineral', 'exame', 'avaliar', 'verificar', 'dosagem']):
            recommendations.append(line)
    
    return conditions, recommendations

def categorize_by_system(text):
    """Categoriza sintoma por sistema corporal"""
    text_lower = text.lower()
    
    systems = {
        'cardiovascular': ['coração', 'cardí', 'pressão', 'circulação', 'vascular', 'artéria', 'veia'],
        'digestivo': ['estômago', 'intestino', 'digestão', 'gastro', 'náusea', 'vômito', 'diarreia', 'constipação', 'azia'],
        'respiratorio': ['pulmão', 'respiração', 'tosse', 'falta de ar', 'dispneia', 'asma', 'bronquite'],
        'nervoso': ['cérebro', 'nervos', 'neural', 'cognitivo', 'memória', 'concentração', 'ansiedade', 'depressão'],
        'musculoesqueletico': ['músculo', 'osso', 'articulação', 'dor muscular', 'fraqueza muscular', 'ósseo'],
        'endocrino': ['hormônio', 'tireoide', 'diabetes', 'glicose', 'insulina', 'metabólico'],
        'imunologico': ['imune', 'imunidade', 'alergia', 'autoimune', 'infecção', 'inflamação'],
        'pele': ['pele', 'derme', 'cutâneo', 'cabelo', 'unha', 'acne', 'eczema'],
        'urinario': ['rim', 'renal', 'urina', 'bexiga', 'urinário'],
        'reprodutivo': ['menstrual', 'menstruação', 'fertilidade', 'sexual', 'próstata', 'útero'],
        'oftalmologico': ['olho', 'visão', 'ocular', 'vista'],
        'auditivo': ['ouvido', 'audição', 'som', 'zumbido'],
        'nutricional': ['nutrição', 'vitamina', 'mineral', 'deficiência nutricional', 'alimentação']
    }
    
    for system, keywords in systems.items():
        if any(keyword in text_lower for keyword in keywords):
            return system
    
    return 'geral'

def clean_and_format_question(text):
    """Limpa e formata a pergunta"""
    # Remove numeração no início
    text = re.sub(r'^\d+[\.\)]\s*', '', text)
    
    # Se não for uma pergunta, converte para formato de pergunta
    if not text.strip().endswith('?'):
        if text.lower().startswith(('dor', 'fadiga', 'cansaço', 'fraqueza', 'mal-estar')):
            text = f"Você apresenta {text.lower()}?"
        elif not any(text.lower().startswith(word) for word in ['você', 'tem', 'apresenta', 'sente']):
            text = f"Você tem {text.lower()}?"
    
    # Capitaliza primeira letra
    text = text[0].upper() + text[1:] if text else text
    
    return text

def main():
    base_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data"
    
    files = [
        "1 da página 001 à 128.docx",
        "2 da página 129 à 238.docx",
        "3 da página 239 à 240 - EXAMES.docx",
        "4 da página 242 à 424.docx"
    ]
    
    all_lines = []
    
    print("Lendo arquivos DOCX...")
    for file in files:
        file_path = f"{base_path}\\{file}"
        print(f"\nProcessando: {file}")
        lines = read_docx_content(file_path)
        print(f"  Total de linhas: {len(lines)}")
        all_lines.extend([(line, file) for line in lines])
    
    print(f"\nTotal de linhas de todos os arquivos: {len(all_lines)}")
    
    # Extrai questões clínicas válidas
    clinical_data = {}
    question_id = 1
    
    print("\nExtraindo perguntas clínicas...")
    for idx, (line, source_file) in enumerate(all_lines):
        if is_valid_clinical_question(line):
            formatted_question = clean_and_format_question(line)
            system = categorize_by_system(line)
            
            # Extrai contexto
            source_lines = [l for l, f in all_lines if f == source_file]
            source_idx = source_lines.index(line) if line in source_lines else 0
            conditions, recommendations = extract_clinical_context(source_lines, source_idx)
            
            if system not in clinical_data:
                clinical_data[system] = []
            
            clinical_data[system].append({
                'id': f'q_{question_id}',
                'text': formatted_question,
                'original': line,
                'source': source_file,
                'conditions': conditions[:3],  # Primeiras 3 condições relacionadas
                'recommendations': recommendations[:3]  # Primeiras 3 recomendações
            })
            
            question_id += 1
    
    # Organiza por categorias
    system_names = {
        'cardiovascular': 'Sistema Cardiovascular',
        'digestivo': 'Sistema Digestivo',
        'respiratorio': 'Sistema Respiratório',
        'nervoso': 'Sistema Nervoso',
        'musculoesqueletico': 'Sistema Musculoesquelético',
        'endocrino': 'Sistema Endócrino',
        'imunologico': 'Sistema Imunológico',
        'pele': 'Pele e Anexos',
        'urinario': 'Sistema Urinário',
        'reprodutivo': 'Sistema Reprodutivo',
        'oftalmologico': 'Sistema Oftalmológico',
        'auditivo': 'Sistema Auditivo',
        'nutricional': 'Aspectos Nutricionais',
        'geral': 'Sintomas Gerais'
    }
    
    categories = []
    for system, questions in clinical_data.items():
        categories.append({
            'id': system,
            'name': system_names.get(system, system.capitalize()),
            'questionCount': len(questions),
            'questions': questions
        })
    
    # Ordena categorias por número de questões (maior para menor)
    categories.sort(key=lambda x: x['questionCount'], reverse=True)
    
    result = {
        'extractionDate': '2026-02-03',
        'totalQuestions': question_id - 1,
        'categories': categories
    }
    
    # Salva resultado
    output_file = 'clinical_questions_extracted.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"EXTRAÇÃO CONCLUÍDA")
    print(f"{'='*60}")
    print(f"Total de perguntas clínicas extraídas: {result['totalQuestions']}")
    print(f"\nDistribuição por sistema:")
    for category in categories:
        print(f"  {category['name']}: {category['questionCount']} perguntas")
    print(f"\nArquivo salvo: {output_file}")

if __name__ == "__main__":
    main()
