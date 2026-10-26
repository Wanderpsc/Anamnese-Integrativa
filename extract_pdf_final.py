#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys
import os

# Forçar UTF-8 no console do Windows
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\SINTOMAS E CARÊNCIAS NUTRICIONAIS.pdf"
output_file = "sintomas_completo_extraido.txt"

print("="*80)
print("EXTRAÇÃO DO PDF - SINTOMAS E CARÊNCIAS NUTRICIONAIS")
print("="*80)

# Tentar pdfplumber primeiro (melhor para PDFs complexos)
try:
    import pdfplumber
    print("\nUsando pdfplumber...")
    
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)
        print(f"Total de páginas: {total_pages}")
        
        for page_num in range(total_pages):
            try:
                page = pdf.pages[page_num]
                text = page.extract_text()
                
                if text and text.strip():
                    full_text += f"\n{'='*60}\n"
                    full_text += f"PÁGINA {page_num + 1}/{total_pages}\n"
                    full_text += f"{'='*60}\n"
                    full_text += text + "\n"
                    
                    if (page_num + 1) % 5 == 0:
                        print(f"Processando... {page_num + 1}/{total_pages} páginas")
            except Exception as e:
                print(f"ERRO na página {page_num + 1}: {str(e)}")
                continue
    
    if full_text.strip():
        # Salvar arquivo
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_text)
        
        print(f"\nSUCESSO! Extraído {len(full_text)} caracteres")
        print(f"Arquivo salvo: {output_file}\n")
        
        # Análise do conteúdo
        print("\n" + "="*80)
        print("ANÁLISE DO CONTEÚDO EXTRAÍDO")
        print("="*80)
        
        lines = [l for l in full_text.split('\n') if l.strip()]
        print(f"\nTotal de linhas com texto: {len(lines)}")
        
        # Contar palavras-chave
        keywords = {
            'sintoma': 0, 'carência': 0, 'deficiência': 0,
            'vitamina': 0, 'mineral': 0, 'nutriente': 0,
            'posologia': 0, 'dosagem': 0, 'tratamento': 0,
            'fadiga': 0, 'cansaço': 0, 'fraqueza': 0,
            'queda de cabelo': 0, 'unha': 0, 'pele': 0,
            'cãibra': 0, 'formigamento': 0, 'dor': 0,
            'insônia': 0, 'ansiedade': 0, 'depressão': 0,
            'memória': 0, 'concentração': 0,
            'imunidade': 0, 'infecção': 0,
            'digestão': 0, 'intestino': 0,
            'anemia': 0, 'sangramento': 0
        }
        
        text_lower = full_text.lower()
        for keyword in keywords:
            keywords[keyword] = text_lower.count(keyword)
        
        print("\nPALAVRAS-CHAVE ENCONTRADAS:")
        for keyword, count in sorted(keywords.items(), key=lambda x: x[1], reverse=True):
            if count > 0:
                print(f"  {keyword:20} : {count:4} vezes")
        
        # Mostrar amostra do início e fim
        print("\n" + "="*80)
        print("PRIMEIROS 2000 CARACTERES:")
        print("="*80)
        print(full_text[:2000])
        
        print("\n" + "="*80)
        print("ÚLTIMOS 2000 CARACTERES (possível resumo):")
        print("="*80)
        print(full_text[-2000:])
        
        sys.exit(0)
    else:
        print("ERRO: Nenhum texto extraído com pdfplumber")
        
except ImportError:
    print("ERRO: pdfplumber não instalado")
    print("Instale com: pip install pdfplumber")
    sys.exit(1)
except Exception as e:
    print(f"ERRO: {str(e)}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Se falhou, tentar PyPDF2
try:
    import PyPDF2
    print("\nTentando PyPDF2 como alternativa...")
    
    full_text = ""
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        total_pages = len(reader.pages)
        print(f"Total de páginas: {total_pages}")
        
        for page_num in range(total_pages):
            try:
                page = reader.pages[page_num]
                text = page.extract_text()
                if text and text.strip():
                    full_text += f"\nPAGINA {page_num + 1}\n{text}\n"
            except:
                continue
    
    if full_text.strip():
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_text)
        print(f"SUCESSO com PyPDF2! {len(full_text)} caracteres")
        print(full_text[:2000])
        sys.exit(0)
    else:
        print("ERRO: Nenhum texto extraído")
        
except Exception as e:
    print(f"ERRO: {str(e)}")

print("\nPDF provavelmente é composto por imagens. Necessita OCR.")
sys.exit(1)
