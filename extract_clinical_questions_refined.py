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

def is_valid_clinical_symptom(text):
    """Validação MUITO RIGOROSA para apenas sintomas/perguntas clínicas reais"""
    
    # Critérios de exclusão imediatos
    if len(text) < 20:  # Muito curto
        return False
    
    if len(text) > 300:  # Muito longo (provavelmente parágrafo)
        return False
    
    # Remove se for número ou contém muito número
    if re.search(r'\d{3,}', text):  # 3+ dígitos consecutivos
        return False
    
    # Remove se começar com número seguido de tab ou ponto
    if re.match(r'^\d+[\.\t]', text):
        return False
    
    text_lower = text.lower()
    
    # Lista de exclusão expandida
    exclude_keywords = [
        'página', 'índice', 'sumário', 'capítulo', 'parte', 'seção',
        'agradecimento', 'prefácio', 'introdução', 'conclusão', 'referência',
        'bibliografia', 'anexo', 'apêndice', 'dedicatória', 'dr.', 'dra.',
        'academia', 'universidade', 'instituição', 'site:', 'email:', 'telefone:',
        'linkedin', 'facebook', 'instagram', 'www.', '.com', '.br',
        'copyright', 'todos os direitos', 'isbn', 'edição', 'editora',
        'autor', 'organizador', 'coordenador', 'revisor', 'prefácio',
        'meus professores', 'minha família', 'aos meus', 'gostaria de agradecer',
        'preciso que você comece', 'leia essa parte', 'detalhes dos marcadores',
        'indicador de', 'tabela', 'figura', 'gráfico', 'fonte:',
        'continuação', 'ver página', 'conforme'
    ]
    
    if any(keyword in text_lower for keyword in exclude_keywords):
        return False
    
    # Sintomas e termos clínicos válidos
    valid_clinical_terms = [
        # Sintomas gerais
        'dor', 'dores', 'fadiga', 'cansaço', 'fraqueza', 'mal-estar', 'desconforto',
        'febre', 'calafrio', 'sudorese', 'suor', 'tontura', 'vertigem',
        
        # Digestivo
        'náusea', 'vômito', 'diarreia', 'constipação', 'intestino', 'estômago',
        'azia', 'refluxo', 'gases', 'distensão abdominal', 'cólica',
        
        # Cardiovascular
        'palpitação', 'taquicardia', 'hipertensão', 'hipotensão', 'pressão',
        'peito', 'torácica', 'coração',
        
        # Respiratório
        'tosse', 'falta de ar', 'dispneia', 'chiado', 'respiração',
        
        # Neurológico
        'cefaleia', 'enxaqueca', 'memória', 'concentração', 'atenção',
        'ansiedade', 'depressão', 'insônia', 'sono', 'tremor',
        
        # Musculoesquelético
        'articulação', 'articular', 'muscular', 'óssea', 'lombar', 'cervical',
        
        # Pele
        'pele seca', 'coceira', 'prurido', 'lesão', 'mancha', 'acne',
        
        # Urinário
        'urina', 'micção', 'disúria', 'poliúria',
        
        # Endócrino/Metabólico
        'peso', 'apetite', 'sede', 'glicose', 'tireoide',
        
        # Perguntas típicas de anamnese
        'sente', 'apresenta', 'tem tido', 'sofre', 'percebe',
        'nota', 'relata', 'queixa', 'história de'
    ]
    
    # Deve conter pelo menos um termo clínico válido
    has_clinical_term = any(term in text_lower for term in valid_clinical_terms)
    
    if not has_clinical_term:
        return False
    
    # Verifica estrutura de pergunta ou afirmação de sintoma
    question_patterns = [
        r'\?$',  # Termina com ?
        r'^(você|vc|o paciente|apresenta|tem|sente|nota|percebe|relata)',
        r'(apresenta|tem|sente|sofre de|relata|queixa de)',
    ]
    
    is_question_format = any(re.search(pattern, text_lower) for pattern in question_patterns)
    
    return is_question_format

def extract_related_conditions(text):
    """Extrai condições relacionadas mencionadas no texto"""
    conditions = []
    
    condition_patterns = [
        r'deficiência\s+de?\s+([a-záàâãéèêíïóôõöúçñ\s]+)',
        r'insuficiência\s+([a-záàâãéèêíïóôõöúçñ\s]+)',
        r'doença\s+([a-záàâãéèêíïóôõöúçñ\s]+)',
        r'síndrome\s+de?\s+([a-záàâãéèêíïóôõöúçñ\s]+)',
        r'transtorno\s+de?\s+([a-záàâãéèêíïóôõöúçñ\s]+)',
    ]
    
    for pattern in condition_patterns:
        matches = re.finditer(pattern, text.lower())
        for match in matches:
            condition = match.group(0).strip()
            if len(condition) > 10:  # Evita matches muito curtos
                conditions.append(condition.capitalize())
    
    return conditions[:3]  # Máximo 3 condições

def categorize_symptom(text):
    """Categoriza sintoma por sistema com lógica aprimorada"""
    text_lower = text.lower()
    
    # Sistema cardiovascular
    if any(term in text_lower for term in [
        'coração', 'cardí', 'pressão arterial', 'hipertensão', 'hipotensão',
        'palpitação', 'taquicardia', 'bradicardia', 'arritmia', 'peito',
        'torácica', 'circulação', 'vascular', 'artéria', 'veia', 'angina'
    ]):
        return 'cardiovascular'
    
    # Sistema digestivo
    if any(term in text_lower for term in [
        'estômago', 'intestino', 'digestão', 'gastro', 'náusea', 'vômito',
        'diarreia', 'constipação', 'azia', 'refluxo', 'gases', 'flatulência',
        'distensão abdominal', 'cólica abdominal', 'abdomen', 'abdominal',
        'fígado', 'hepática', 'vesícula', 'pâncreas'
    ]):
        return 'digestivo'
    
    # Sistema respiratório
    if any(term in text_lower for term in [
        'pulmão', 'respiração', 'respiratória', 'tosse', 'falta de ar',
        'dispneia', 'asma', 'bronquite', 'chiado', 'expectoração', 'escarro'
    ]):
        return 'respiratorio'
    
    # Sistema nervoso
    if any(term in text_lower for term in [
        'cérebro', 'nervos', 'neural', 'cognitivo', 'memória', 'concentração',
        'atenção', 'ansiedade', 'depressão', 'cefaleia', 'enxaqueca',
        'tontura', 'vertigem', 'tremor', 'convulsão', 'epilepsia',
        'neuropatia', 'parestesia', 'formigamento'
    ]):
        return 'nervoso'
    
    # Sistema musculoesquelético
    if any(term in text_lower for term in [
        'músculo', 'muscular', 'osso', 'óssea', 'articulação', 'articular',
        'dor muscular', 'fraqueza muscular', 'lombar', 'cervical', 'dorsal',
        'artrite', 'artrose', 'tendinite', 'bursite', 'coluna'
    ]):
        return 'musculoesqueletico'
    
    # Sistema endócrino
    if any(term in text_lower for term in [
        'hormônio', 'hormonal', 'tireoide', 'tireoidiana', 'diabetes',
        'glicose', 'insulina', 'metabólico', 'metabolismo', 'adrenal',
        'cortisol', 'estrogênio', 'testosterona', 'progesterona'
    ]):
        return 'endocrino'
    
    # Sistema imunológico
    if any(term in text_lower for term in [
        'imune', 'imunidade', 'imunológico', 'alergia', 'alérgica', 'autoimune',
        'infecção', 'infecciosa', 'inflamação', 'inflamatória', 'linfócito',
        'anticorpo', 'leucócito'
    ]):
        return 'imunologico'
    
    # Pele e anexos
    if any(term in text_lower for term in [
        'pele', 'derme', 'cutânea', 'cabelo', 'unha', 'acne', 'eczema',
        'dermatite', 'psoríase', 'urticária', 'erupção', 'mancha', 'lesão cutânea'
    ]):
        return 'pele'
    
    # Sistema urinário
    if any(term in text_lower for term in [
        'rim', 'renal', 'urina', 'urinária', 'bexiga', 'micção',
        'disúria', 'poliúria', 'oligúria', 'hematúria', 'cistite'
    ]):
        return 'urinario'
    
    # Sistema reprodutivo
    if any(term in text_lower for term in [
        'menstrual', 'menstruação', 'ciclo menstrual', 'fertilidade',
        'sexual', 'libido', 'próstata', 'útero', 'ovário', 'testículo',
        'gestação', 'gravidez'
    ]):
        return 'reprodutivo'
    
    # Sistema oftalmológico
    if any(term in text_lower for term in [
        'olho', 'olhos', 'visão', 'ocular', 'vista', 'enxergar',
        'cegueira', 'conjuntivite', 'catarata'
    ]):
        return 'oftalmologico'
    
    # Sistema auditivo
    if any(term in text_lower for term in [
        'ouvido', 'audição', 'auditivo', 'surdez', 'zumbido', 'tinitus', 'otite'
    ]):
        return 'auditivo'
    
    # Aspectos nutricionais
    if any(term in text_lower for term in [
        'vitamina', 'mineral', 'deficiência nutricional', 'nutrição',
        'alimentação', 'dieta', 'suplemento', 'ferro', 'cálcio',
        'magnésio', 'zinco', 'b12', 'vitamina d'
    ]):
        return 'nutricional'
    
    return 'geral'

def format_clinical_question(text):
    """Formata texto como pergunta clínica padronizada"""
    # Remove numeração
    text = re.sub(r'^\d+[\.\)]\s*', '', text)
    
    # Remove tabs e espaços múltiplos
    text = re.sub(r'\t+', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Se já for pergunta, apenas limpa
    if text.endswith('?'):
        text = text[0].upper() + text[1:]
        return text
    
    # Converte para formato de pergunta
    text_lower = text.lower()
    
    # Se começa com "você", mantém
    if text_lower.startswith('você'):
        if not text.endswith('?'):
            text = text + '?'
        return text[0].upper() + text[1:]
    
    # Se descreve um sintoma diretamente, converte
    symptom_starters = ['dor', 'fadiga', 'cansaço', 'fraqueza', 'febre', 'tosse', 'náusea']
    if any(text_lower.startswith(starter) for starter in symptom_starters):
        return f"Você apresenta {text.lower()}?"
    
    # Para outros casos, adiciona "Você tem"
    if not any(text_lower.startswith(word) for word in ['você', 'tem', 'apresenta', 'sente']):
        return f"Você tem {text.lower()}?"
    
    return text[0].upper() + text[1:] + ('?' if not text.endswith('?') else '')

def main():
    base_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data"
    
    files = [
        "1 da página 001 à 128.docx",
        "2 da página 129 à 238.docx",
        "3 da página 239 à 240 - EXAMES.docx",
        "4 da página 242 à 424.docx"
    ]
    
    print("="*70)
    print("EXTRAÇÃO REFINADA DE PERGUNTAS CLÍNICAS")
    print("="*70)
    
    all_lines = []
    for file in files:
        file_path = f"{base_path}\\{file}"
        print(f"\nLendo: {file}")
        lines = read_docx_content(file_path)
        print(f"  Linhas totais: {len(lines)}")
        all_lines.extend([(line, file) for line in lines])
    
    print(f"\nTotal de linhas: {len(all_lines)}")
    print("\nAplicando filtros rigorosos...")
    
    # Extração refinada
    clinical_data = {}
    question_id = 1
    processed = 0
    
    for line, source_file in all_lines:
        processed += 1
        if processed % 1000 == 0:
            print(f"  Processadas: {processed}/{len(all_lines)} linhas...")
        
        if is_valid_clinical_symptom(line):
            formatted = format_clinical_question(line)
            system = categorize_symptom(line)
            conditions = extract_related_conditions(line)
            
            if system not in clinical_data:
                clinical_data[system] = []
            
            clinical_data[system].append({
                'id': f'q_{question_id}',
                'text': formatted,
                'original': line,
                'source': source_file,
                'relatedConditions': conditions
            })
            
            question_id += 1
    
    # Organiza resultado
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
    for system, questions in sorted(clinical_data.items(), key=lambda x: len(x[1]), reverse=True):
        if questions:  # Apenas categorias com perguntas
            categories.append({
                'id': system,
                'name': system_names.get(system, system.capitalize()),
                'questionCount': len(questions),
                'questions': questions
            })
    
    result = {
        'metadata': {
            'extractionDate': '2026-02-03',
            'version': '2.0-refined',
            'description': 'Perguntas clínicas extraídas com validação rigorosa',
            'totalQuestions': question_id - 1,
            'categoriesCount': len(categories)
        },
        'categories': categories
    }
    
    # Salva resultado
    output_file = 'clinical_questions_refined.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*70}")
    print("EXTRAÇÃO CONCLUÍDA COM SUCESSO")
    print(f"{'='*70}")
    print(f"\nTotal de perguntas clínicas válidas: {result['metadata']['totalQuestions']}")
    print(f"Categorias identificadas: {result['metadata']['categoriesCount']}")
    print(f"\nDistribuição por sistema:")
    print(f"{'Sistema':<35} {'Perguntas':>10}")
    print("-"*70)
    for category in categories:
        print(f"{category['name']:<35} {category['questionCount']:>10}")
    print(f"\nArquivo salvo: {output_file}")
    
    # Mostra exemplos
    print(f"\n{'='*70}")
    print("EXEMPLOS DE PERGUNTAS EXTRAÍDAS")
    print(f"{'='*70}")
    for category in categories[:5]:  # Primeiras 5 categorias
        print(f"\n{category['name']}:")
        for q in category['questions'][:3]:  # 3 primeiras perguntas
            print(f"  • {q['text']}")

if __name__ == "__main__":
    main()
