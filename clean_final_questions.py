import json
import re

def clean_question_text(text):
    """Limpa e formata perguntas para qualidade máxima"""
    # Remove números e marcadores no início
    text = re.sub(r'^[\d\.\-•]+\s*', '', text)
    
    # Remove caracteres especiais malformados
    text = text.replace('†', '')
    text = text.replace('\t', ' ')
    
    # Remove espaços múltiplos
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Corrige encoding issues
    text = text.replace('vocé', 'você')
    text = text.replace('hó', 'há')
    text = text.replace('Ccmo', 'Como')
    text = text.replace('mail', 'mais')
    text = text.replace('ãlcool', 'álcool')
    text = text.replace('reiaçáo', 'relação')
    text = text.replace('enfie', 'entre')
    text = text.replace('esporâdicas', 'esporádicas')
    text = text.replace('estã', 'está')
    text = text.replace('nivel', 'nível')
    text = text.replace('c0mo', 'como')
    text = text.replace('magné5io', 'magnésio')
    text = text.replace('sáo', 'são')
    text = text.replace('e.stõmago', 'estômago')
    text = text.replace('âs', 'às')
    text = text.replace('Apôs', 'Após')
    text = text.replace('apôs', 'após')
    
    # Capitaliza primeira letra
    if text:
        text = text[0].upper() + text[1:]
    
    # Garante que termina com ?
    if text and not text.endswith('?') and not text.endswith('.'):
        # Se é claramente uma pergunta, adiciona ?
        if any(text.lower().startswith(word) for word in ['como', 'qual', 'quando', 'onde', 'quem', 'por que', 'você']):
            text += '?'
    
    return text

def is_quality_question(text):
    """Verifica se a pergunta tem qualidade suficiente"""
    # Muito curta ou muito longa
    if len(text) < 25 or len(text) > 250:
        return False
    
    # Não deve começar com "Você tem" seguido de texto técnico/descritivo longo
    if text.startswith('Você tem') and len(text) > 150:
        return False
    
    # Deve ter pelo menos uma palavra interrogativa OU estrutura de pergunta
    interrogatives = ['como', 'qual', 'quando', 'onde', 'você', 'existe', 'percebe', 'sente', 'apresenta', 'tem', 'há']
    has_interrogative = any(word in text.lower() for word in interrogatives)
    
    if not has_interrogative:
        return False
    
    # Não deve conter muitos termos técnicos consecutivos
    technical_overload = re.search(r'(neuroendócnno|mitocondrial|gênica|herxheimer)', text)
    if technical_overload and len(text) > 120:
        return False
    
    return True

def main():
    print("="*70)
    print("LIMPEZA E REFINAMENTO FINAL DAS PERGUNTAS")
    print("="*70)
    
    # Carrega o JSON refinado
    with open('clinical_questions_refined.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\nPerguntas originais: {data['metadata']['totalQuestions']}")
    
    # Processa todas as categorias
    cleaned_categories = []
    total_cleaned = 0
    
    for category in data['categories']:
        cleaned_questions = []
        
        for question in category['questions']:
            original_text = question['text']
            cleaned_text = clean_question_text(original_text)
            
            # Valida qualidade
            if is_quality_question(cleaned_text):
                question['text'] = cleaned_text
                # Também limpa o original
                question['original'] = clean_question_text(question['original'])
                cleaned_questions.append(question)
        
        if cleaned_questions:  # Só adiciona categoria se tem perguntas
            category['questions'] = cleaned_questions
            category['questionCount'] = len(cleaned_questions)
            cleaned_categories.append(category)
            total_cleaned += len(cleaned_questions)
    
    # Atualiza dados
    data['categories'] = cleaned_categories
    data['metadata']['totalQuestions'] = total_cleaned
    data['metadata']['version'] = '3.0-final'
    data['metadata']['description'] = 'Perguntas clínicas refinadas e limpas - qualidade máxima'
    
    # Reordena IDs sequencialmente
    question_id = 1
    for category in data['categories']:
        for question in category['questions']:
            question['id'] = f'q_{question_id}'
            question_id += 1
    
    # Salva resultado final
    output_file = 'clinical_questions_final.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Perguntas após limpeza: {total_cleaned}")
    print(f"Redução: {data['metadata']['totalQuestions'] - total_cleaned} perguntas removidas")
    print(f"\n{'='*70}")
    print("RESULTADO FINAL")
    print(f"{'='*70}")
    print(f"\nTotal de perguntas clínicas de alta qualidade: {total_cleaned}")
    print(f"Categorias: {len(cleaned_categories)}")
    print(f"\nDistribuição por sistema:")
    print(f"{'Sistema':<40} {'Perguntas':>10}")
    print("-"*70)
    for category in cleaned_categories:
        print(f"{category['name']:<40} {category['questionCount']:>10}")
    
    print(f"\n{'='*70}")
    print("EXEMPLOS DE PERGUNTAS FINAIS")
    print(f"{'='*70}")
    for category in cleaned_categories[:5]:
        print(f"\n{category['name']}:")
        for q in category['questions'][:5]:
            print(f"  • {q['text']}")
    
    print(f"\nArquivo salvo: {output_file}")

if __name__ == "__main__":
    main()
