#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os
import io

# Forçar UTF-8
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\SINTOMAS E CARÊNCIAS NUTRICIONAIS.pdf"
output_file = "sintomas_completo_extraido.txt"

print("="*80)
print("EXTRAÇÃO COM PyMuPDF (fitz)")
print("="*80)

try:
    import fitz  # PyMuPDF
    
    print(f"\nAbrindo PDF: {os.path.basename(pdf_path)}")
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Total de páginas: {total_pages}")
    
    full_text = ""
    
    for page_num in range(total_pages):
        page = doc[page_num]
        
        # Tentar extrair texto
        text = page.get_text()
        
        if text and text.strip():
            full_text += f"\n{'='*60}\n"
            full_text += f"PÁGINA {page_num + 1}/{total_pages}\n"
            full_text += f"{'='*60}\n"
            full_text += text + "\n"
        
        if (page_num + 1) % 5 == 0:
            print(f"Processando... {page_num + 1}/{total_pages} páginas")
    
    doc.close()
    
    if full_text.strip():
        # Salvar arquivo
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("="*80 + "\n")
            f.write("SINTOMAS E CARÊNCIAS NUTRICIONAIS - EXTRAÇÃO COMPLETA\n")
            f.write("Método: PyMuPDF (fitz)\n")
            f.write(f"Total de páginas: {total_pages}\n")
            f.write("="*80 + "\n\n")
            f.write(full_text)
        
        print(f"\nSUCESSO! Extraído {len(full_text)} caracteres")
        print(f"Arquivo salvo: {output_file}\n")
        
        # Estatísticas
        lines = [l for l in full_text.split('\n') if l.strip()]
        words = full_text.split()
        
        print("\n" + "="*80)
        print("ESTATÍSTICAS")
        print("="*80)
        print(f"Total de caracteres: {len(full_text):,}")
        print(f"Total de linhas: {len(lines):,}")
        print(f"Total de palavras: {len(words):,}")
        
        # Palavras-chave
        print("\n" + "="*80)
        print("PALAVRAS-CHAVE ENCONTRADAS")
        print("="*80)
        
        keywords_groups = {
            'Sintomas Gerais': ['sintoma', 'carência', 'deficiência'],
            'Nutrientes': ['vitamina', 'mineral', 'nutriente', 'suplemento'],
            'Dosagem': ['posologia', 'dosagem', 'mg', 'mcg', 'ui', 'dose'],
            'Fadiga/Energia': ['fadiga', 'cansaço', 'fraqueza', 'energia', 'exaustão'],
            'Pele/Cabelo/Unha': ['queda de cabelo', 'cabelo', 'unha', 'pele', 'dermatite'],
            'Neurológico': ['formigamento', 'parestesia', 'neuropatia', 'tremor'],
            'Muscular': ['cãibra', 'espasmo', 'contração', 'músculo'],
            'Mental': ['insônia', 'ansiedade', 'depressão', 'memória', 'concentração'],
            'Digestivo': ['digestão', 'intestino', 'constipação', 'diarreia'],
            'Imunidade': ['imunidade', 'imune', 'infecção', 'resfriado'],
            'Sanguíneo': ['anemia', 'sangramento', 'hematoma', 'hemorragia'],
            'Ósseo': ['osso', 'osteoporose', 'fratura', 'dor óssea'],
            'Vitaminas': ['b1', 'b2', 'b3', 'b6', 'b12', 'c', 'd', 'e', 'k', 'folato'],
            'Minerais': ['ferro', 'cálcio', 'magnésio', 'zinco', 'potássio', 'sódio']
        }
        
        text_lower = full_text.lower()
        
        for group_name, keywords in keywords_groups.items():
            print(f"\n{group_name}:")
            counts = {}
            for keyword in keywords:
                count = text_lower.count(keyword)
                if count > 0:
                    counts[keyword] = count
            
            if counts:
                for keyword, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
                    print(f"  {keyword:25} : {count:4} vezes")
            else:
                print("  (nenhuma ocorrência)")
        
        # Mostrar início
        print("\n" + "="*80)
        print("PRIMEIROS 3000 CARACTERES:")
        print("="*80)
        print(full_text[:3000])
        
        # Mostrar fim (onde pode estar o resumo)
        print("\n" + "="*80)
        print("ÚLTIMOS 3000 CARACTERES (possível RESUMO):")
        print("="*80)
        print(full_text[-3000:])
        
        # Procurar por "resumo" no texto
        resumo_pos = text_lower.find('resumo')
        if resumo_pos != -1:
            print("\n" + "="*80)
            print("SEÇÃO 'RESUMO' ENCONTRADA!")
            print("="*80)
            # Pegar 5000 caracteres após "resumo"
            print(full_text[resumo_pos:min(len(full_text), resumo_pos + 5000)])
        
        sys.exit(0)
    else:
        print("\nERRO: Nenhum texto extraído")
        print("O PDF parece ser composto apenas por imagens.")
        print("Necessário OCR (Tesseract) para extrair texto.")
        sys.exit(1)
        
except ImportError:
    print("ERRO: PyMuPDF não instalado")
    print("Instale com: pip install PyMuPDF")
    sys.exit(1)
except Exception as e:
    print(f"\nERRO: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)
