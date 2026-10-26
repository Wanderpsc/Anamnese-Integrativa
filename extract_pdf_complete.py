"""
Script completo para extrair dados do PDF de exames laboratoriais
Tenta múltiplos métodos e salva no formato JSON
"""

import os
import sys
import json
import re
from pathlib import Path

def try_pymupdf(pdf_path):
    """Tenta extrair com PyMuPDF"""
    try:
        import fitz  # PyMuPDF
        print("📄 Tentando PyMuPDF...", file=sys.stderr)
        
        doc = fitz.open(pdf_path)
        text = ""
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += f"\n--- Página {page_num + 1} ---\n"
            text += page.get_text()
        
        doc.close()
        
        if text.strip() and len(text.strip()) > 100:
            print(f"✅ PyMuPDF: {len(text)} caracteres extraídos", file=sys.stderr)
            return text
        else:
            print("❌ PyMuPDF: Pouco ou nenhum texto encontrado", file=sys.stderr)
            return None
    except Exception as e:
        print(f"❌ PyMuPDF erro: {e}", file=sys.stderr)
        return None

def try_pdfplumber(pdf_path):
    """Tenta extrair com pdfplumber"""
    try:
        import pdfplumber
        print("📄 Tentando pdfplumber...", file=sys.stderr)
        
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages):
                text += f"\n--- Página {page_num + 1} ---\n"
                page_text = page.extract_text()
                if page_text:
                    text += page_text
        
        if text.strip() and len(text.strip()) > 100:
            print(f"✅ pdfplumber: {len(text)} caracteres extraídos", file=sys.stderr)
            return text
        else:
            print("❌ pdfplumber: Pouco ou nenhum texto encontrado", file=sys.stderr)
            return None
    except Exception as e:
        print(f"❌ pdfplumber erro: {e}", file=sys.stderr)
        return None

def try_ocr(pdf_path):
    """Tenta extrair com OCR"""
    try:
        from pdf2image import convert_from_path
        import pytesseract
        
        # Verificar se Tesseract está instalado
        tesseract_paths = [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            r"E:\Tesseract-OCR\tesseract.exe",
        ]
        
        tesseract_found = False
        for path in tesseract_paths:
            if os.path.exists(path):
                pytesseract.pytesseract.tesseract_cmd = path
                tesseract_found = True
                print(f"✅ Tesseract encontrado: {path}", file=sys.stderr)
                break
        
        if not tesseract_found:
            print("❌ Tesseract OCR não instalado", file=sys.stderr)
            print("   Baixe em: https://github.com/UB-Mannheim/tesseract/wiki", file=sys.stderr)
            return None
        
        print("📄 Tentando OCR (pode demorar 2-5 minutos)...", file=sys.stderr)
        
        # Converter PDF em imagens
        images = convert_from_path(pdf_path, dpi=300, first_page=1, last_page=3)  # Apenas 3 primeiras páginas
        
        text = ""
        for i, image in enumerate(images):
            print(f"   Processando página {i+1}/{len(images)}...", file=sys.stderr)
            page_text = pytesseract.image_to_string(image, lang='por')
            text += f"\n--- Página {i + 1} ---\n{page_text}"
        
        if text.strip():
            print(f"✅ OCR: {len(text)} caracteres extraídos", file=sys.stderr)
            return text
        else:
            print("❌ OCR: Nenhum texto encontrado", file=sys.stderr)
            return None
            
    except Exception as e:
        print(f"❌ OCR erro: {e}", file=sys.stderr)
        return None

def parse_exam_data(text):
    """Extrai dados estruturados do texto"""
    print("\n🔍 Analisando texto extraído...", file=sys.stderr)
    
    exames = []
    
    # Padrões para buscar exames
    patterns = {
        'nome': r'(?:Exame|Teste|Parâmetro)[:\s]+([A-Z][A-Za-zÀ-ú\s\-]+)',
        'referencia': r'(?:Valores?\s+de\s+)?[Rr]eferência[:\s]+([0-9\.,\-\s]+(?:mg|g|mL|dL|%|mmol|µg|UI|ng|pg)?[/\w\s]*)',
        'ideal': r'(?:Valores?\s+)?[Ii]deais?[:\s]+([0-9\.,\-\s]+(?:mg|g|mL|dL|%|mmol|µg|UI|ng|pg)?[/\w\s]*)',
    }
    
    # Tentar extrair blocos de exames
    lines = text.split('\n')
    current_exam = {}
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
        
        # Detectar nome de exame comum
        common_exams = [
            'Hemoglobina', 'Glicose', 'Colesterol', 'Triglicerídeos', 'HDL', 'LDL',
            'Creatinina', 'Ureia', 'TGO', 'TGP', 'TSH', 'T4', 'T3', 'Ferritina',
            'Vitamina D', 'Vitamina B12', 'Ácido Fólico', 'PCR', 'VHS'
        ]
        
        for exam_name in common_exams:
            if exam_name.lower() in line.lower():
                if current_exam and 'exame' in current_exam:
                    exames.append(current_exam)
                current_exam = {'exame': exam_name}
                break
        
        # Buscar valores de referência
        if 'referência' in line.lower() or 'normal' in line.lower():
            match = re.search(r'[\d\.,\-]+\s*(?:a|à|-)\s*[\d\.,]+\s*(?:mg|g|mL|dL|%|mmol|µg|UI|ng|pg)?', line)
            if match:
                current_exam['valoresReferencia'] = match.group(0)
    
    if current_exam and 'exame' in current_exam:
        exames.append(current_exam)
    
    print(f"✅ Encontrados {len(exames)} exames no texto", file=sys.stderr)
    return exames

def main():
    # Caminho do PDF
    pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\Do Manual Prático de Exames Laboratoriais 01.pdf"
    output_json = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\extracted_exams.json"
    output_txt = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\extracted_text.txt"
    
    print("="*80, file=sys.stderr)
    print("🔬 EXTRAÇÃO DE DADOS DO PDF DE EXAMES LABORATORIAIS", file=sys.stderr)
    print("="*80, file=sys.stderr)
    print(f"PDF: {pdf_path}", file=sys.stderr)
    print("="*80, file=sys.stderr)
    
    # Verificar se PDF existe
    if not os.path.exists(pdf_path):
        print(f"❌ ERRO: PDF não encontrado em {pdf_path}", file=sys.stderr)
        sys.exit(1)
    
    # Tentar múltiplos métodos
    text = None
    
    # 1. PyMuPDF
    text = try_pymupdf(pdf_path)
    
    # 2. pdfplumber
    if not text:
        text = try_pdfplumber(pdf_path)
    
    # 3. OCR (último recurso)
    if not text:
        print("\n⚠️  PDF parece ser de imagens. Tentando OCR...", file=sys.stderr)
        text = try_ocr(pdf_path)
    
    if not text:
        print("\n❌ FALHA: Não foi possível extrair texto do PDF", file=sys.stderr)
        print("   O PDF pode estar criptografado ou ser muito complexo", file=sys.stderr)
        sys.exit(1)
    
    # Salvar texto extraído
    print(f"\n💾 Salvando texto em: {output_txt}", file=sys.stderr)
    with open(output_txt, 'w', encoding='utf-8') as f:
        f.write(text)
    
    # Analisar e estruturar dados
    exames = parse_exam_data(text)
    
    if exames:
        # Salvar JSON
        print(f"💾 Salvando dados estruturados em: {output_json}", file=sys.stderr)
        with open(output_json, 'w', encoding='utf-8') as f:
            json.dump({'exames': exames, 'total': len(exames)}, f, ensure_ascii=False, indent=2)
        
        print("\n✅ SUCESSO!", file=sys.stderr)
        print(f"   Texto extraído: {len(text)} caracteres", file=sys.stderr)
        print(f"   Exames encontrados: {len(exames)}", file=sys.stderr)
        print(f"   Arquivos salvos em E:", file=sys.stderr)
    else:
        print("\n⚠️  Nenhum exame estruturado encontrado", file=sys.stderr)
        print("   Mas o texto foi salvo em extracted_text.txt", file=sys.stderr)
    
    print("="*80, file=sys.stderr)

if __name__ == "__main__":
    main()
