"""
Extrator em Lote de Conteúdo dos PDFs Terapêuticos
Processa todos os 342 arquivos em therapeutic-data e salva em JSON estruturado.
"""

import os
import sys
import json
import time
from pathlib import Path
from datetime import datetime

# Adiciona path para imports
sys.path.append(os.path.dirname(__file__))

try:
    import fitz  # PyMuPDF
    import pdfplumber
    from PIL import Image
    import pytesseract
    from pdf2image import convert_from_path
except ImportError as e:
    print(f"❌ Erro: Biblioteca não encontrada: {e}")
    print("Execute: pip install PyMuPDF pdfplumber pytesseract pdf2image Pillow")
    sys.exit(1)

# Configurações
THERAPEUTIC_DATA_DIR = Path(r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\assets\therapeutic-data")
OUTPUT_DIR = Path(r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\data\therapeutic-extracted")
OUTPUT_JSON = OUTPUT_DIR / "therapeutic_content.json"
OUTPUT_METADATA = OUTPUT_DIR / "therapeutic_metadata.json"
LOG_FILE = OUTPUT_DIR / "extraction_log.txt"

# Criar diretório de saída
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

class TherapeuticExtractor:
    """Extrator de conteúdo terapêutico com múltiplos métodos"""
    
    def __init__(self):
        self.results = []
        self.metadata = []
        self.stats = {
            'total_files': 0,
            'processed': 0,
            'success': 0,
            'errors': 0,
            'skipped': 0,
            'start_time': None,
            'end_time': None
        }
        self.log_messages = []
    
    def log(self, message, level='INFO'):
        """Log com timestamp"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_msg = f"[{timestamp}] {level}: {message}"
        print(log_msg)
        self.log_messages.append(log_msg)
    
    def categorize_file(self, filename):
        """Categoriza arquivo baseado no nome"""
        name_lower = filename.lower()
        
        categories = {
            'fitoterapia': ['fitoterapia', 'fitoterápico', 'plantas-medicinais', 'memento'],
            'homeopatia': ['homeopatia', 'homeopático', 'repertorio'],
            'iridologia': ['iridologia', 'iris', 'rayid', 'mapa'],
            'nutricao': ['nutri', 'alimenta', 'dieta', 'trofoterapia'],
            'formulas': ['formula', 'prescri', 'manipula'],
            'protocolos': ['protocolo', 'tratamento'],
            'bioressonancia': ['biorresonancia', 'biorressonância', 'quantum'],
            'auriculoterapia': ['auriculo', 'auricular'],
            'florais': ['floral', 'essências'],
            'oligoterapia': ['oligoterapia', 'oligo'],
            'aromaterapia': ['aromater', 'óleo'],
            'geoterapia': ['geoterapia', 'argila'],
            'hidroterapia': ['hidroter'],
            'exames': ['exame', 'laboratorial'],
            'anamnese': ['anamnese', 'questionário', 'ficha'],
            'suplementacao': ['suplemento', 'suplementa', 'vitamina', 'mineral'],
            'artigos': ['artigo'],
            'guias': ['guia', 'apostila', 'manual']
        }
        
        for category, keywords in categories.items():
            if any(keyword in name_lower for keyword in keywords):
                return category
        
        return 'outros'
    
    def extract_text_pymupdf(self, pdf_path):
        """Método 1: PyMuPDF (rápido)"""
        try:
            doc = fitz.open(pdf_path)
            text = ""
            for page_num, page in enumerate(doc):
                text += f"\n--- Página {page_num + 1} ---\n"
                text += page.get_text()
            doc.close()
            return text.strip()
        except Exception as e:
            self.log(f"PyMuPDF falhou para {pdf_path.name}: {e}", 'WARNING')
            return None
    
    def extract_text_pdfplumber(self, pdf_path):
        """Método 2: pdfplumber (melhor formatação)"""
        try:
            text = ""
            with pdfplumber.open(pdf_path) as pdf:
                for page_num, page in enumerate(pdf.pages):
                    text += f"\n--- Página {page_num + 1} ---\n"
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text
            return text.strip()
        except Exception as e:
            self.log(f"pdfplumber falhou para {pdf_path.name}: {e}", 'WARNING')
            return None
    
    def extract_text_ocr(self, pdf_path, max_pages=10):
        """Método 3: OCR com Tesseract (lento, para PDFs escaneados)"""
        try:
            # Verifica se Tesseract está instalado
            if not self._check_tesseract():
                return None
            
            self.log(f"Tentando OCR para {pdf_path.name} (máx {max_pages} páginas)...", 'INFO')
            
            # Converte PDF em imagens
            images = convert_from_path(pdf_path, dpi=300, first_page=1, last_page=max_pages)
            
            text = ""
            for i, image in enumerate(images):
                text += f"\n--- Página {i + 1} (OCR) ---\n"
                page_text = pytesseract.image_to_string(image, lang='por')
                text += page_text
            
            return text.strip()
        except Exception as e:
            self.log(f"OCR falhou para {pdf_path.name}: {e}", 'WARNING')
            return None
    
    def _check_tesseract(self):
        """Verifica se Tesseract está instalado"""
        try:
            pytesseract.get_tesseract_version()
            return True
        except:
            return False
    
    def extract_file(self, file_path):
        """Extrai conteúdo de um arquivo (tenta múltiplos métodos)"""
        self.stats['processed'] += 1
        
        try:
            # Ignora arquivos não-PDF por enquanto
            if file_path.suffix.lower() not in ['.pdf']:
                self.log(f"Pulando {file_path.name} (não é PDF)", 'INFO')
                self.stats['skipped'] += 1
                return None
            
            self.log(f"Processando {file_path.name} ({self.stats['processed']}/{self.stats['total_files']})...", 'INFO')
            
            # Tenta PyMuPDF primeiro (mais rápido)
            text = self.extract_text_pymupdf(file_path)
            method = 'pymupdf'
            
            # Se falhou ou texto muito curto, tenta pdfplumber
            if not text or len(text) < 500:
                text = self.extract_text_pdfplumber(file_path)
                method = 'pdfplumber'
            
            # Se ainda falhou, tenta OCR (APENAS para arquivos pequenos)
            if not text or len(text) < 200:
                if file_path.stat().st_size < 5 * 1024 * 1024:  # Máximo 5MB para OCR
                    text = self.extract_text_ocr(file_path, max_pages=5)
                    method = 'ocr'
            
            if not text or len(text) < 50:
                self.log(f"❌ Falha ao extrair {file_path.name}", 'ERROR')
                self.stats['errors'] += 1
                return None
            
            # Metadata
            category = self.categorize_file(file_path.name)
            metadata = {
                'id': len(self.results) + 1,
                'fileName': file_path.name,
                'category': category,
                'fileSize': file_path.stat().st_size,
                'textLength': len(text),
                'extractionMethod': method,
                'extractedAt': datetime.now().isoformat()
            }
            
            # Resultado
            result = {
                'fileId': metadata['id'],
                'fileName': file_path.name,
                'category': category,
                'text': text,
                'method': method
            }
            
            self.results.append(result)
            self.metadata.append(metadata)
            self.stats['success'] += 1
            
            self.log(f"✅ Extraído {file_path.name}: {len(text)} caracteres ({method})", 'SUCCESS')
            return result
            
        except Exception as e:
            self.log(f"❌ Erro ao processar {file_path.name}: {e}", 'ERROR')
            self.stats['errors'] += 1
            return None
    
    def extract_all(self):
        """Extrai todos os arquivos da pasta therapeutic-data"""
        self.log("=" * 80, 'INFO')
        self.log("INICIANDO EXTRAÇÃO EM LOTE DE ARQUIVOS TERAPÊUTICOS", 'INFO')
        self.log("=" * 80, 'INFO')
        
        self.stats['start_time'] = datetime.now()
        
        # Lista todos os arquivos
        all_files = list(THERAPEUTIC_DATA_DIR.glob('*.*'))
        pdf_files = [f for f in all_files if f.suffix.lower() == '.pdf']
        
        self.stats['total_files'] = len(pdf_files)
        self.log(f"📁 Encontrados {len(all_files)} arquivos ({len(pdf_files)} PDFs)", 'INFO')
        
        # Processa cada arquivo
        for file_path in pdf_files:
            try:
                self.extract_file(file_path)
                
                # Salva progresso a cada 20 arquivos
                if self.stats['success'] % 20 == 0 and self.stats['success'] > 0:
                    self.save_intermediate()
                    
            except KeyboardInterrupt:
                self.log("⚠️ Interrompido pelo usuário", 'WARNING')
                break
            except Exception as e:
                self.log(f"❌ Erro crítico: {e}", 'ERROR')
                continue
        
        self.stats['end_time'] = datetime.now()
        
        # Salva resultados finais
        self.save_results()
        self.save_log()
        self.print_summary()
    
    def save_intermediate(self):
        """Salva progresso intermediário"""
        try:
            with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
                json.dump(self.results, f, ensure_ascii=False, indent=2)
            
            with open(OUTPUT_METADATA, 'w', encoding='utf-8') as f:
                json.dump(self.metadata, f, ensure_ascii=False, indent=2)
            
            self.log(f"💾 Progresso salvo: {self.stats['success']} arquivos", 'INFO')
        except Exception as e:
            self.log(f"❌ Erro ao salvar progresso: {e}", 'ERROR')
    
    def save_results(self):
        """Salva resultados finais"""
        try:
            # Salva conteúdo
            with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
                json.dump(self.results, f, ensure_ascii=False, indent=2)
            
            # Salva metadata
            with open(OUTPUT_METADATA, 'w', encoding='utf-8') as f:
                json.dump(self.metadata, f, ensure_ascii=False, indent=2)
            
            self.log(f"💾 Resultados salvos em {OUTPUT_JSON}", 'SUCCESS')
            self.log(f"💾 Metadata salvo em {OUTPUT_METADATA}", 'SUCCESS')
            
        except Exception as e:
            self.log(f"❌ Erro ao salvar resultados: {e}", 'ERROR')
    
    def save_log(self):
        """Salva log em arquivo"""
        try:
            with open(LOG_FILE, 'w', encoding='utf-8') as f:
                f.write('\n'.join(self.log_messages))
            self.log(f"📄 Log salvo em {LOG_FILE}", 'SUCCESS')
        except Exception as e:
            print(f"❌ Erro ao salvar log: {e}")
    
    def print_summary(self):
        """Imprime resumo da extração"""
        duration = (self.stats['end_time'] - self.stats['start_time']).total_seconds()
        
        print("\n" + "=" * 80)
        print("RESUMO DA EXTRAÇÃO")
        print("=" * 80)
        print(f"Total de arquivos: {self.stats['total_files']}")
        print(f"Processados: {self.stats['processed']}")
        print(f"✅ Sucesso: {self.stats['success']}")
        print(f"❌ Erros: {self.stats['errors']}")
        print(f"⏭️ Pulados: {self.stats['skipped']}")
        print(f"⏱️ Duração: {duration:.2f} segundos")
        print(f"📊 Taxa: {self.stats['success'] / duration if duration > 0 else 0:.2f} arquivos/segundo")
        print("=" * 80)
        
        # Estatísticas por categoria
        categories = {}
        for meta in self.metadata:
            cat = meta['category']
            categories[cat] = categories.get(cat, 0) + 1
        
        print("\n📚 Arquivos por Categoria:")
        for cat, count in sorted(categories.items(), key=lambda x: x[1], reverse=True):
            print(f"  {cat}: {count}")
        print("=" * 80)

def main():
    """Função principal"""
    extractor = TherapeuticExtractor()
    
    try:
        extractor.extract_all()
    except Exception as e:
        print(f"❌ Erro crítico na execução: {e}")
        import traceback
        traceback.print_exc()
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
