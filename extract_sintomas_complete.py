#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para extrair TODO o texto do PDF de Sintomas e Carências Nutricionais
Tenta múltiplos métodos para garantir extração completa
"""

import sys
import os

# Caminho do PDF
pdf_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data\SINTOMAS E CARÊNCIAS NUTRICIONAIS.pdf"
output_file = "sintomas_completo_extraido.txt"

print("=" * 80)
print("EXTRAÇÃO COMPLETA DO PDF - SINTOMAS E CARÊNCIAS NUTRICIONAIS")
print("=" * 80)
print(f"\nPDF: {pdf_path}")
print(f"Tamanho: {os.path.getsize(pdf_path) / (1024*1024):.2f} MB\n")

# Método 1: PyPDF2
print("\n[MÉTODO 1] Tentando PyPDF2...")
try:
    import PyPDF2
    
    full_text = ""
    with open(pdf_path, 'rb') as pdf_file:
        reader = PyPDF2.PdfReader(pdf_file)
        total_pages = len(reader.pages)
        print(f"Total de páginas: {total_pages}")
        
        for page_num in range(total_pages):
            try:
                page = reader.pages[page_num]
                text = page.extract_text()
                if text:
                    full_text += f"\n{'='*60}\n"
                    full_text += f"PÁGINA {page_num + 1}/{total_pages}\n"
                    full_text += f"{'='*60}\n"
                    full_text += text + "\n"
                    
                # Mostrar progresso a cada 10 páginas
                if (page_num + 1) % 10 == 0:
                    print(f"  Processado: {page_num + 1}/{total_pages} páginas...")
            except Exception as e:
                print(f"  Erro na página {page_num + 1}: {str(e)}")
                continue
    
    if full_text.strip():
        print(f"\n✓ PyPDF2: Extraído {len(full_text)} caracteres")
        
        # Salvar arquivo
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SINTOMAS E CARÊNCIAS NUTRICIONAIS - EXTRAÇÃO COMPLETA\n")
            f.write("Método: PyPDF2\n")
            f.write("=" * 80 + "\n\n")
            f.write(full_text)
        
        print(f"✓ Arquivo salvo: {output_file}")
        print(f"\nPRIMEIROS 5000 CARACTERES:")
        print("-" * 80)
        print(full_text[:5000])
        print("-" * 80)
        
        # Procurar por seções específicas
        print("\n\n[ANÁLISE DO CONTEÚDO]")
        print("-" * 80)
        
        # Procurar palavras-chave
        keywords = [
            "SINTOMA", "sintoma", "Sintoma",
            "CARÊNCIA", "carência", "Carência",
            "RESUMO", "resumo", "Resumo",
            "VITAMINA", "vitamina", "Vitamina",
            "MINERAL", "mineral", "Mineral",
            "DEFICIÊNCIA", "deficiência", "Deficiência",
            "POSOLOGIA", "posologia", "Posologia",
            "DOSAGEM", "dosagem", "Dosagem"
        ]
        
        for keyword in keywords:
            count = full_text.count(keyword)
            if count > 0:
                print(f"  '{keyword}': {count} ocorrências")
        
        # Tentar identificar seções
        lines = full_text.split('\n')
        print(f"\n\nTotal de linhas: {len(lines)}")
        
        # Procurar linhas que parecem títulos (em maiúsculas)
        print("\n[POSSÍVEIS TÍTULOS/SEÇÕES ENCONTRADAS]:")
        titulo_count = 0
        for i, line in enumerate(lines):
            line_clean = line.strip()
            # Título: linha curta, maiúsculas, sem muitos números
            if (len(line_clean) > 5 and len(line_clean) < 100 and 
                line_clean.isupper() and 
                sum(c.isdigit() for c in line_clean) < len(line_clean) * 0.3):
                print(f"  Linha {i+1}: {line_clean}")
                titulo_count += 1
                if titulo_count > 50:  # Limitar exibição
                    print("  ... (mais títulos encontrados)")
                    break
        
        # Procurar por padrões de sintomas
        print("\n[PROCURANDO PADRÕES DE SINTOMAS]:")
        sintoma_patterns = [
            "fadiga", "cansaço", "fraqueza",
            "dor", "queda de cabelo", "unha",
            "pele", "cãibra", "formigamento",
            "insônia", "ansiedade", "depressão",
            "memória", "concentração",
            "digestão", "constipação", "diarreia",
            "imunidade", "infecção",
            "visão", "sangramento"
        ]
        
        text_lower = full_text.lower()
        for pattern in sintoma_patterns:
            if pattern in text_lower:
                # Encontrar contexto
                idx = text_lower.find(pattern)
                context = full_text[max(0, idx-100):min(len(full_text), idx+200)]
                print(f"\n  '{pattern.upper()}' encontrado:")
                print(f"    {context[:150]}...")
        
        print("\n" + "=" * 80)
        print("EXTRAÇÃO CONCLUÍDA COM SUCESSO!")
        print("=" * 80)
        
        sys.exit(0)
    else:
        print("✗ PyPDF2: Nenhum texto extraído")
        
except ImportError:
    print("✗ PyPDF2 não está instalado")
    print("  Instale com: pip install PyPDF2")
except Exception as e:
    print(f"✗ Erro no PyPDF2: {str(e)}")

# Método 2: pdfplumber (se disponível)
print("\n[MÉTODO 2] Tentando pdfplumber...")
try:
    import pdfplumber
    
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        total_pages = len(pdf.pages)
        print(f"Total de páginas: {total_pages}")
        
        for page_num, page in enumerate(pdf.pages):
            try:
                text = page.extract_text()
                if text:
                    full_text += f"\n{'='*60}\n"
                    full_text += f"PÁGINA {page_num + 1}/{total_pages}\n"
                    full_text += f"{'='*60}\n"
                    full_text += text + "\n"
                
                if (page_num + 1) % 10 == 0:
                    print(f"  Processado: {page_num + 1}/{total_pages} páginas...")
            except Exception as e:
                print(f"  Erro na página {page_num + 1}: {str(e)}")
                continue
    
    if full_text.strip():
        print(f"\n✓ pdfplumber: Extraído {len(full_text)} caracteres")
        
        # Salvar arquivo
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("=" * 80 + "\n")
            f.write("SINTOMAS E CARÊNCIAS NUTRICIONAIS - EXTRAÇÃO COMPLETA\n")
            f.write("Método: pdfplumber\n")
            f.write("=" * 80 + "\n\n")
            f.write(full_text)
        
        print(f"✓ Arquivo salvo: {output_file}")
        print(f"\nPRIMEIROS 3000 CARACTERES:")
        print("-" * 80)
        print(full_text[:3000])
        
        sys.exit(0)
    else:
        print("✗ pdfplumber: Nenhum texto extraído")
        
except ImportError:
    print("✗ pdfplumber não está instalado")
    print("  Instale com: pip install pdfplumber")
except Exception as e:
    print(f"✗ Erro no pdfplumber: {str(e)}")

# Se chegou aqui, nenhum método funcionou
print("\n" + "=" * 80)
print("ERRO: Não foi possível extrair texto do PDF")
print("=" * 80)
print("\nPossíveis causas:")
print("  1. PDF é composto por imagens (necessita OCR)")
print("  2. PDF tem proteção/criptografia")
print("  3. Bibliotecas não estão instaladas corretamente")
print("\nSoluções:")
print("  1. Instalar PyPDF2: pip install PyPDF2")
print("  2. Instalar pdfplumber: pip install pdfplumber")
print("  3. Para PDFs com imagens, usar OCR: pip install pytesseract pdf2image")

sys.exit(1)
