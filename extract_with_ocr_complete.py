"""
Script OCR Completo - Execute APÓS instalar Tesseract e Poppler
Extrai texto do PDF de exames laboratoriais usando OCR
"""

import os
import sys
import json
from pathlib import Path

def setup_paths():
    """Configura os caminhos das ferramentas"""
    # Diretório base do projeto
    base_dir = Path(__file__).parent
    tools_dir = base_dir / "tools"
    
    # Tesseract
    tesseract_paths = [
        tools_dir / "Tesseract-OCR" / "tesseract.exe",
        Path(r"C:\Program Files\Tesseract-OCR\tesseract.exe"),
        Path(r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe"),
    ]
    
    tesseract_exe = None
    for path in tesseract_paths:
        if path.exists():
            tesseract_exe = str(path)
            print(f"✅ Tesseract encontrado: {tesseract_exe}", file=sys.stderr)
            break
    
    if not tesseract_exe:
        print("❌ ERRO: Tesseract não encontrado!", file=sys.stderr)
        print("   Instale de: https://github.com/UB-Mannheim/tesseract/wiki", file=sys.stderr)
        print(f"   Instale em: {tools_dir / 'Tesseract-OCR'}", file=sys.stderr)
        return None, None
    
    # Poppler
    poppler_paths = [
        tools_dir / "poppler" / "Library" / "bin",
        tools_dir / "poppler" / "bin",
    ]
    
    poppler_path = None
    for path in poppler_paths:
        if path.exists():
            poppler_path = str(path)
            print(f"✅ Poppler encontrado: {poppler_path}", file=sys.stderr)
            break
    
    if not poppler_path:
        print("⚠️  Aviso: Poppler não encontrado (necessário para pdf2image)", file=sys.stderr)
        print("   Download: https://github.com/oschwartz10612/poppler-windows/releases/", file=sys.stderr)
        print(f"   Extrair em: {tools_dir / 'poppler'}", file=sys.stderr)
    
    return tesseract_exe, poppler_path

def extract_with_ocr(pdf_path, tesseract_exe, poppler_path):
    """Extrai texto usando OCR"""
    try:
        from pdf2image import convert_from_path
        import pytesseract
        from PIL import Image
        
        # Configurar Tesseract
        pytesseract.pytesseract.tesseract_cmd = tesseract_exe
        
        print("\n📄 Convertendo PDF em imagens (DPI 300)...", file=sys.stderr)
        
        # Converter PDF em imagens
        convert_kwargs = {'dpi': 300, 'fmt': 'png'}
        if poppler_path:
            convert_kwargs['poppler_path'] = poppler_path
        
        images = convert_from_path(pdf_path, **convert_kwargs)
        total = len(images)
        
        print(f"✅ {total} páginas convertidas", file=sys.stderr)
        print("\n🔍 Executando OCR (pode demorar 5-10 minutos)...", file=sys.stderr)
        
        full_text = ""
        for i, image in enumerate(images, 1):
            print(f"   Processando página {i}/{total}...", file=sys.stderr)
            
            # OCR com português
            text = pytesseract.image_to_string(image, lang='por')
            full_text += f"\n{'='*80}\n"
            full_text += f"PÁGINA {i}\n"
            full_text += f"{'='*80}\n"
            full_text += text
            
            # Salvar progresso a cada 5 páginas
            if i % 5 == 0:
                progress_file = Path(__file__).parent / f"extracted_progress_p{i}.txt"
                with open(progress_file, 'w', encoding='utf-8') as f:
                    f.write(full_text)
                print(f"   💾 Progresso salvo (página {i})", file=sys.stderr)
        
        return full_text
        
    except ImportError as e:
        print(f"❌ Erro de importação: {e}", file=sys.stderr)
        print("   Execute: pip install pdf2image pytesseract pillow", file=sys.stderr)
        return None
    except Exception as e:
        print(f"❌ Erro durante OCR: {e}", file=sys.stderr)
        return None

def parse_exams_from_text(text):
    """Extrai dados estruturados de exames"""
    import re
    
    print("\n🔍 Analisando texto para extrair exames...", file=sys.stderr)
    
    exames_encontrados = []
    lines = text.split('\n')
    
    # Padrões de exames comuns
    exam_keywords = [
        'hemoglobina', 'hematócrito', 'leucócitos', 'plaquetas',
        'glicose', 'glicemia', 'hemoglobina glicada', 'hba1c',
        'colesterol', 'hdl', 'ldl', 'triglicerídeos', 'triglicerideos',
        'creatinina', 'ureia', 'ácido úrico', 'acido urico',
        'tgo', 'ast', 'tgp', 'alt', 'gama gt', 'ggt',
        'bilirrubina', 'fosfatase alcalina',
        'tsh', 't4 livre', 't3 livre', 'tireoide',
        'ferritina', 'ferro sérico', 'ferro serico',
        'vitamina d', 'vitamina b12', 'ácido fólico', 'acido folico',
        'pcr', 'proteína c reativa', 'vhs',
        'insulina', 'cortisol', 'testosterona',
        'cálcio', 'calcio', 'potássio', 'potassio', 'sódio', 'sodio',
        'magnésio', 'magnesio', 'zinco'
    ]
    
    current_exam = {}
    
    for line in lines:
        line = line.strip()
        if not line or len(line) < 3:
            continue
        
        line_lower = line.lower()
        
        # Detectar nome de exame
        for keyword in exam_keywords:
            if keyword in line_lower:
                # Se já havia um exame sendo processado, salvar
                if current_exam and 'nome' in current_exam:
                    exames_encontrados.append(current_exam)
                
                current_exam = {'nome': line}
                break
        
        # Detectar valores de referência
        if any(word in line_lower for word in ['referência', 'referencia', 'normal:', 'valores normais']):
            # Buscar números no formato: 10-20, 10 a 20, 10 - 20 mg/dL, etc
            pattern = r'(\d+(?:[.,]\d+)?)\s*(?:a|à|-|até)\s*(\d+(?:[.,]\d+)?)\s*([a-zA-Zµ/%]+(?:/[a-zA-Z]+)?)?'
            match = re.search(pattern, line)
            if match:
                ref_value = f"{match.group(1)}-{match.group(2)}"
                if match.group(3):
                    ref_value += f" {match.group(3)}"
                current_exam['valoresReferencia'] = ref_value
        
        # Detectar valores ideais
        if any(word in line_lower for word in ['ideal', 'ideais', 'ótimo', 'otimo']):
            pattern = r'(\d+(?:[.,]\d+)?)\s*(?:a|à|-|até)\s*(\d+(?:[.,]\d+)?)\s*([a-zA-Zµ/%]+(?:/[a-zA-Z]+)?)?'
            match = re.search(pattern, line)
            if match:
                ideal_value = f"{match.group(1)}-{match.group(2)}"
                if match.group(3):
                    ideal_value += f" {match.group(3)}"
                current_exam['valoresIdeais'] = ideal_value
    
    # Adicionar último exame
    if current_exam and 'nome' in current_exam:
        exames_encontrados.append(current_exam)
    
    print(f"✅ {len(exames_encontrados)} exames identificados", file=sys.stderr)
    return exames_encontrados

def main():
    print("="*80, file=sys.stderr)
    print("🔬 EXTRAÇÃO OCR - MANUAL DE EXAMES LABORATORIAIS", file=sys.stderr)
    print("="*80, file=sys.stderr)
    
    # Setup paths
    tesseract_exe, poppler_path = setup_paths()
    if not tesseract_exe:
        sys.exit(1)
    
    # Caminhos dos arquivos
    base_dir = Path(__file__).parent
    pdf_path = base_dir / "src" / "assets" / "therapeutic-data" / "Do Manual Prático de Exames Laboratoriais 01.pdf"
    output_txt = base_dir / "extracted_text_ocr.txt"
    output_json = base_dir / "extracted_exams_ocr.json"
    
    if not pdf_path.exists():
        print(f"❌ PDF não encontrado: {pdf_path}", file=sys.stderr)
        sys.exit(1)
    
    print(f"📄 PDF: {pdf_path.name}", file=sys.stderr)
    
    # Extrair texto com OCR
    text = extract_with_ocr(str(pdf_path), tesseract_exe, poppler_path)
    
    if not text or len(text.strip()) < 100:
        print("\n❌ FALHA: Pouco ou nenhum texto extraído", file=sys.stderr)
        sys.exit(1)
    
    # Salvar texto completo
    print(f"\n💾 Salvando texto em: {output_txt}", file=sys.stderr)
    with open(output_txt, 'w', encoding='utf-8') as f:
        f.write(text)
    
    print(f"✅ Texto salvo: {len(text)} caracteres", file=sys.stderr)
    
    # Extrair dados estruturados
    exames = parse_exams_from_text(text)
    
    if exames:
        print(f"\n💾 Salvando JSON em: {output_json}", file=sys.stderr)
        data = {
            'total_exames': len(exames),
            'exames': exames,
            'observacao': 'Dados extraídos via OCR - podem conter erros'
        }
        
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print(f"✅ JSON salvo com {len(exames)} exames", file=sys.stderr)
    
    print("\n" + "="*80, file=sys.stderr)
    print("✅ EXTRAÇÃO CONCLUÍDA!", file=sys.stderr)
    print("="*80, file=sys.stderr)
    print(f"📁 Arquivos salvos em: {base_dir}", file=sys.stderr)
    print(f"   - {output_txt.name}", file=sys.stderr)
    if exames:
        print(f"   - {output_json.name}", file=sys.stderr)
    print("="*80, file=sys.stderr)

if __name__ == "__main__":
    main()
