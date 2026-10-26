#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para extrair texto dos PDFs de exames laboratoriais
"""
import PyPDF2
import json
import os

def extract_pdf_text(pdf_path):
    """Extrai todo o texto de um PDF"""
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            print(f"Processando {os.path.basename(pdf_path)} - {len(pdf_reader.pages)} páginas")
            
            for page_num, page in enumerate(pdf_reader.pages, 1):
                try:
                    page_text = page.extract_text()
                    if page_text:
                        text += f"\n--- PÁGINA {page_num} ---\n"
                        text += page_text
                except Exception as e:
                    print(f"Erro na página {page_num}: {e}")
                    continue
                    
        return text
    except Exception as e:
        print(f"Erro ao processar {pdf_path}: {e}")
        return ""

def main():
    base_path = r"e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\CÓPIA DO LIVRO LEITURA DE EXAMES"
    pdfs = ['02.pdf', '03.pdf', '04.pdf']
    
    results = {}
    
    for pdf_name in pdfs:
        pdf_path = os.path.join(base_path, pdf_name)
        if os.path.exists(pdf_path):
            print(f"\n{'='*60}")
            print(f"Extraindo: {pdf_name}")
            print(f"{'='*60}")
            text = extract_pdf_text(pdf_path)
            results[pdf_name] = text
            
            # Salvar texto extraído em arquivo
            output_file = f"extracted_{pdf_name.replace('.pdf', '.txt')}"
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"✓ Salvo em: {output_file}")
            print(f"✓ Caracteres extraídos: {len(text)}")
        else:
            print(f"✗ Arquivo não encontrado: {pdf_path}")
    
    print(f"\n{'='*60}")
    print("Extração concluída!")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
