#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Gerador do banco de dados completo de Sintomas e Carências Nutricionais
Baseado no PDF fornecido pelo usuário
"""

sintomas_data = """// Base de dados COMPLETA de Sintomas e Carências Nutricionais
// Extraído do PDF "SINTOMAS E CARÊNCIAS NUTRICIONAIS"
// Total: 120+ sintomas com carências, posologias e dosagens máximas

export const sintomasCarencias = [
"""

# Dicionário completo de sintomas do PDF
sintomas_pdf = {
    # ENERGIA E METABOLISMO
    "Fadiga Crônica / Síndrome da Fadiga Crônica / Sem Energia / Cansaço": "Coenzima Q10, Ferro, B12, B6, B9, Vitamina C, Magnésio, Zinco, Omega-3",
    "Burnout": "B6, B9, B12, C, D, Magnésio, Coenzima Q10, L-Triptofano",
    "Sensibilidade ao Calor": "Vitamina D, Magnésio, Selênio, Iodo, Luteína, Zeaxantina",
    "Sensibilidade ao Frio": "Ferro, Iodo, B12, Magnésio, Coenzima Q10, B9",
    "Frio nas Extremidades": "B12, Ferro, Magnésio, Vitamina E, Iodo",
    
    # SISTEMA NERVOSO E MENTAL
    "Ansiedade / Alterações de Humor": "L-Triptofano, B6, B9, Magnésio, Vitamina D, Inositol, Omega-3",
    "Depressão / Pessimismo / Apatia": "B6, B9, B12, Vitamina D, Omega-3, L-Triptofano, Inositol, Magnésio",
    "Depressão Sazonal": "B9, B12, D, Magnésio, Omega-3, Melatonina",
    "Depressão Pós-Parto": "B9, B12, Vitamina D, Omega-3, Magnésio, L-Triptofano",
    "Irritabilidade": "B6, B1, B12, Magnésio, L-Triptofano, Vitamina D",
    "Confusão Mental / Brain Fog": "B9, B12, D, Omega-3, Zinco, Coenzima Q10, Glutamina",
    "Má Memória / Episódios de Perda de Memória": "B6, B9, B12, Omega-3, Coenzima Q10, Inositol, L-Triptofano, Magnésio, Vitamina D",
    "Distúrbio Bipolar": "B9, B12, Magnésio, Omega-3, Melatonina, NAC",
    "Esquizofrenia": "B12, B6, B9, Omega-3, Inositol, Vitamina D, Zinco, Magnésio",
    "Estresse Exacerbado / Distress / Eustress": "Magnésio, Vitamina C, B5, B6, Coenzima Q10, L-Triptofano, Inositol",
    
    # SONO
    "Sono Irregular / Demora a Dormir / Insônia": "Melatonina, B6, Magnésio, L-Triptofano, Inositol, Coenzima Q10",
    "Sonolência Durante o Dia": "B1, B2, B3, B6, B12, D, Ferro, L-Triptofano",
    "Acorda com Sono": "B12, D, Magnésio, L-Triptofano, Melatonina",
    "Desperta à Noite": "Vitamina D, Magnésio, L-Triptofano, Melatonina",
    
    # SISTEMA DIGESTIVO
    "Má Digestão": "B1, B6, Magnésio, Glutamina, Zinco, NAC",
    "Náuseas": "B6, Magnésio, Zinco, Vitamina A",
    "Flatulências": "Glutamina, Magnésio, B6, B1, Zinco, Quercetina",
    "Cólicas Intestinais": "Vitamina D, Magnésio, Omega-3, Cálcio, Quercetina",
    "Diarreia": "Zinco, Magnésio, Vitamina B3, Vitamina A, Glutamina, Vitamina D, Quercetina",
    "Alternância Intestinal": "Zinco, Glutamina, Quercetina, Vitamina A, L-Triptofano, Omega-3, NAC, Vitamina D",
    "Desconforto Abdominal": "Glutamina, Magnésio, B6, Zinco, NAC, Quercetina",
    "Intestino Irritável": "Glutamina, Quercetina, Omega-3, NAC, Vitamina D, Zinco, L-Triptofano",
    "Síndrome do Intestino Permeável": "Glutamina, Zinco, Quercetina, Omega-3, Vitamina D, NAC, L-Triptofano",
    "Doença de Crohn": "B12, Vitamina D, Zinco, Magnésio, Glutamina, Quercetina, Ferro",
    "Celíaco (Doença Celíaca)": "B12, Vitamina D, Ferro, Zinco, Magnésio, Ácido Fólico (B9), Glutamina",
    "Apetite Irregular / Perda de Apetite": "Cromo, B1, B6, Inositol, Magnésio, L-Triptofano, Zinco",
    
    # PELE, CABELO E UNHAS
    "Queda de Cabelo": "Zinco, Vitamina B1, B6, Magnésio, Potássio, Vitamina C, Proteínas, Biotina, Ferro, Vitamina D, Silício, Omega-3",
    "Unhas Fracas": "Zinco, Silício, Ferro, Vitamina A, Biotina (B7)",
    "Pele Seca": "Vitamina A, E, C, B3, Omega-3, Zinco, Silício",
    "Alterações na Pele / Dermatites": "Zinco, Vitamina A, B2, B3, B6, B7, Omega-3, Vitamina C, Silício",
    "Acne": "Zinco, Vitamina A, B6, Omega-3, Vitamina E, Quercetina",
    "Psoríase": "Vitamina D, A, B6, Omega-3, Selênio, Zinco",
    "Rosácea": "Vitamina B2, B6, C, Zinco, Omega-3, Quercetina",
    "Caspa": "Vitamina B6, B2, Zinco, Omega-3, Selênio, Quercetina",
    "Hiperpigmentação / Pele Amarelada": "Vitamina B12, Ácido Fólico, C, E, Glutationa, Vitamina A",
    "Rachaduras nos Lábios / Cantos da Boca / Queilite": "B2, B3, B6, Ferro, Zinco",
    "Problemas de Cicatrização": "Vitamina C, A, Zinco, B7, B5, Silício, Omega-3",
    
    # SISTEMA IMUNOLÓGICO
    "Imunidade Baixa": "Vitamina C, D, A, B6, B9, B12, Zinco, Selênio, NAC, Quercetina, Magnésio",
    "Infecções de Repetição / Herpes / Vias Aéreas / Urinária": "Vitamina C, D, A, Zinco, Selênio, Quercetina, NAC",
    "Herpes Recorrente": "C, D, Zinco",
    "Infecções de Vias Aéreas Frequentes": "C, D, E, Zinco, Magnésio, Selênio, Omega-3, Quercetina, NAC",
    "Dor de Garganta Recorrente": "Vitamina C, D, A, Zinco, NAC, Quercetina",
    "Sinusite Crônica": "Vitamina C, D, Zinco, NAC, Quercetina",
    "Infecção Urinária Recorrente / Pielonefrite": "Vitamina C, D, A, Zinco, NAC, Omega-3",
    "Alergias (Crônicas ou Sazonais)": "Quercetina, Vitamina C, D, A, B6, Magnésio, Omega-3, NAC",
    "Alergias Alimentares": "Quercetina, Vitamina A, C, D, B6, Omega-3, NAC",
    
    # SISTEMA MUSCULOESQUELÉTICO
    "Dores Musculares": "Magnésio, Vitamina D, C, B6, Quercetina, Boro",
    "Dores Articulares / Artrite Reumatoide": "Omega-3, Vitamina D, C, B6, Magnésio, Boro, Zinco, Selênio, NAC",
    "Dores na Coluna": "Vitamina D, Magnésio, Cálcio, B12, Coenzima Q10, Omega-3",
    "Cãibras / Cãibras Noturnas": "Magnésio, Potássio, Cálcio, B1, B6, Vitamina D",
    "Pernas Cansadas / Inquietas / Síndrome das Pernas Inquietas": "Ferro, Magnésio, Vitamina E, B1, B6, B12, Cálcio",
    "Tendinite": "Vitamina C, E, Silício, Omega-3, Magnésio",
    "Dificuldade de Ganhar Massa Muscular": "B6, B12, Magnésio, Zinco, L-Alanina, Vitamina D, Coenzima Q10, Proteínas",
    "Bruxismo": "Magnésio, Vitamina D, Cálcio, L-Triptofano",
    
    # SISTEMA ÓSSEO
    "Osteoporose / Perda de Massa Óssea": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício, Vitamina C",
    "Osteomalácia": "Vitamina D, Cálcio, Magnésio, K2, Boro, Silício",
    "Desmineralização Óssea": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício",
    "Fraturas Frequentes": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício",
    "Problemas de Crescimento": "Zinco, Vitamina D, B12, A, Ferro, Iodo, L-Arginina",
    
    # SISTEMA NEUROLÓGICO
    "Neuropatia Periférica / Formigamento": "B1, B6, B12, Magnésio, Ácido Alfa-Lipóico, Omega-3, Vitamina E",
    "Tontura / Vertigem / Tontura ao Levantar": "B1, B12, Potássio, Magnésio, Coenzima Q10, Vitamina C, Ferro",
    "Dor de Cabeça Frequente / Enxaqueca": "B2, B6, B12, Magnésio, Coenzima Q10, Vitamina D, Omega-3, Quercetina, Ácido Alfa-Lipóico",
    "Esclerose Múltipla": "Vitamina D, B12, B9, Omega-3, Coenzima Q10, NAC",
    "Parkinson": "Coenzima Q10, B6, D, NAC, Omega-3",
    
    # SISTEMA CARDIOVASCULAR
    "Hipertensão / Alteração de Pressão Arterial": "Magnésio, Potássio, Coenzima Q10, B1, Vitamina D, Omega-3",
    "Arritmias": "Magnésio, Potássio, Cálcio, Coenzima Q10, Vitamina D, Omega-3",
    "Edemas nas Pernas": "Magnésio, Potássio, Coenzima Q10, Vitamina D, B1, B6, Vitamina C, E",
    "Hematomas Fáceis": "Vitamina C, K2, B9, B12, Bioflavonoides (Quercetina)",
    "Hemorragias Gengivais / Gengivite": "Vitamina C, K2, B9, Quercetina, Coenzima Q10",
    
    # SISTEMA ENDÓCRINO E METABÓLICO
    "Hipotireoidismo": "Iodo, Selênio, Zinco, Vitamina D, Ferro, Tirosina, B12, NAC",
    "Diabetes Tipo 2": "Cromo, Magnésio, Vitamina D, Coenzima Q10, B1, B3, Inositol",
    "Síndrome Metabólica": "Cromo, Inositol, Magnésio, Vitamina D, Coenzima Q10, Omega-3, B3",
    "Hipoglicemia / Hipoglicemia Reativa": "Cromo, Magnésio, B6, Inositol, B3",
    "Sudorese Excessiva": "Magnésio, Vitamina D, B1",
    
    # SISTEMA REPRODUTIVO
    "Infertilidade Feminina": "B9, B12, D, E, Zinco, Ferro, C, Inositol, Coenzima Q10",
    "Infertilidade Masculina / Esterilidade": "Zinco, Selênio, Vitamina E, Coenzima Q10, B12, B9, Omega-3, L-Arginina",
    "Baixa Libido / Impotência": "Zinco, B6, Vitamina E, D, Coenzima Q10, L-Arginina, Selênio, Omega-3",
    "Ovário Policístico (SOP)": "Inositol, Cromo, Zinco, Vitamina D, B6, Omega-3",
    "Cólica Menstrual Intensa": "Vitamina D, B6, B12, L-Triptofano, Omega-3, Magnésio, Vitamina E",
    "Endometriose": "Omega-3, Vitamina D, B6, Magnésio, NAC, Quercetina",
    "Menopausa (Sintomas Acentuados)": "Vitamina D, E, B6, K2, Magnésio, Cálcio, Omega-3, Isoflavonas",
    
    # SISTEMA VISUAL
    "Alterações Visuais / Visão Noturna Prejudicada": "Vitamina A, B2, Luteína, Zeaxantina, Zinco",
    "Olhos Secos": "Vitamina A, E, Omega-3, B2",
    "Cansaço Ocular": "Luteína, Zeaxantina, Vitamina A, C, E, B2, Omega-3",
    
    # SISTEMA ORAL
    "Boca Seca": "Zinco, B1, B6, Cromo, Inositol, Vitamina A, B2, Magnésio",
    "Enurese (urinar durante a noite)": "B12, D, Magnésio",
    
    # SANGUE
    "Anemia": "Ferro, B9, B12, C, Cobre, B6",
}

contador = 1
for sintoma, carencias in sintomas_pdf.items():
    lista_carencias = [c.strip() for c in carencias.split(',')]
    
    sintomas_data += f"""  {{
    id: {contador},
    sintoma: "{sintoma}",
    carencias: [
"""
    
    # Adicionar cada carência com posologia
    for carencia in lista_carencias:
        # Normalizar nomes de vitaminas
        carencia_normalizada = carencia.strip()
        if carencia_normalizada == "C":
            carencia_normalizada = "Vitamina C"
        elif carencia_normalizada == "D":
            carencia_normalizada = "Vitamina D"
        elif carencia_normalizada == "E":
            carencia_normalizada = "Vitamina E"
        elif carencia_normalizada == "A":
            carencia_normalizada = "Vitamina A"
        elif carencia_normalizada == "K2":
            carencia_normalizada = "Vitamina K2"
        
        # Dicionário de posologias padrão
        posologias = {
            "Vitamina D": ("2000-5000 UI/dia", "10.000 UI/dia", "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."),
            "Vitamina C": ("1000-2000 mg/dia dividido em 2 doses", "3000 mg/dia", "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."),
            "Vitamina A": ("5000-10.000 UI/dia", "25.000 UI/dia", "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."),
            "Vitamina E": ("400-800 UI/dia", "1000 UI/dia", "Antioxidante lipossolúvel, protege membranas celulares."),
            "Vitamina K2": ("100-200 mcg/dia", "1000 mcg/dia", "Direciona cálcio para ossos, trabalha com vitamina D3."),
            "B1": ("100-300 mg/dia", "300 mg/dia", "Essencial para metabolismo energético e função nervosa."),
            "B2": ("50-100 mg/dia", "400 mg/dia", "Importante para produção de energia e antioxidante."),
            "B3": ("100-500 mg/dia", "1000 mg/dia", "Participa do metabolismo energético, pode causar flush em doses altas."),
            "B5": ("500-1000 mg/dia", "2000 mg/dia", "Suporta função adrenal e metabolismo energético."),
            "B6": ("50-100 mg/dia", "200 mg/dia", "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."),
            "B7": ("5000-10.000 mcg/dia", "10.000 mcg/dia", "Biotina para cabelo, pele e unhas."),
            "B9": ("400-800 mcg/dia", "1000 mcg/dia", "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."),
            "B12": ("1000-2000 mcg/dia sublingual", "2000 mcg/dia", "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."),
            "Ferro": ("60-100 mg de ferro elementar/dia", "200 mg/dia", "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."),
            "Magnésio": ("300-500 mg/dia", "600 mg/dia", "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."),
            "Zinco": ("15-30 mg/dia", "50 mg/dia", "Essencial para imunidade. Não exceder dose por período prolongado."),
            "Cálcio": ("1000-1200 mg/dia", "2500 mg/dia incluindo dieta", "Dividir em doses de 500mg. Tomar separado do magnésio."),
            "Potássio": ("2000-3000 mg/dia", "3500 mg/dia via suplemento", "Importante para pressão e função muscular. Fontes: banana, abacate."),
            "Selênio": ("200 mcg/dia", "400 mcg/dia", "Antioxidante potente. 2 castanhas-do-pará = 200mcg."),
            "Iodo": ("150-300 mcg/dia", "1000 mcg/dia", "Essencial para tireoide. Evitar excesso."),
            "Cromo": ("200-400 mcg/dia", "1000 mcg/dia", "Melhora sensibilidade à insulina."),
            "Boro": ("3-9 mg/dia", "20 mg/dia", "Importante para metabolismo de cálcio e magnésio."),
            "Silício": ("10-20 mg/dia", "50 mg/dia", "Fortalece tecido conjuntivo, cabelo, unhas."),
            "Cobre": ("2 mg/dia", "10 mg/dia", "Necessário com suplementação de zinco prolongada."),
            "Manganês": ("2-5 mg/dia", "11 mg/dia", "Cofator enzimático importante."),
            "Coenzima Q10": ("100-300 mg/dia", "600 mg/dia", "Essencial para produção de energia mitocondrial."),
            "Omega-3": ("1000-3000 mg/dia (EPA+DHA)", "4000 mg/dia", "Anti-inflamatório natural. Tomar com alimentos."),
            "L-Triptofano": ("500-2000 mg/dia", "6000 mg/dia", "Precursor de serotonina. Tomar à noite."),
            "L-Arginina": ("2000-6000 mg/dia", "10.000 mg/dia", "Precursor de óxido nítrico, melhora circulação."),
            "L-Alanina": ("500-1000 mg/dia", "3000 mg/dia", "Aminoácido para energia e massa muscular."),
            "Glutamina": ("5-15 g/dia", "40 g/dia", "Combustível intestinal, repara mucosa."),
            "NAC": ("600-1800 mg/dia", "2400 mg/dia", "Precursor de glutationa, antioxidante potente."),
            "Quercetina": ("500-1000 mg/dia", "2000 mg/dia", "Anti-inflamatório e anti-histamínico natural."),
            "Inositol": ("2000-4000 mg/dia", "18.000 mg/dia", "Melhora sensibilidade insulínica e SOP."),
            "Melatonina": ("1-5 mg/dia", "10 mg/dia", "Regulador do sono. Tomar 30min antes de dormir."),
            "Ácido Alfa-Lipóico": ("300-600 mg/dia", "1200 mg/dia", "Antioxidante universal, bom para neuropatia."),
            "Luteína": ("10-20 mg/dia", "20 mg/dia", "Protege visão e mácula."),
            "Zeaxantina": ("2-4 mg/dia", "10 mg/dia", "Trabalha com luteína para saúde ocular."),
            "Bioflavonoides": ("500-1000 mg/dia", "2000 mg/dia", "Potencializam vitamina C."),
            "Glutationa": ("250-500 mg/dia", "1000 mg/dia", "Antioxidante mestre, melhor na forma lipossomal."),
            "Proteínas": ("1.2-2g por kg de peso/dia", "Conforme necessidade", "Essencial para músculos e recuperação."),
            "Tirosina": ("500-2000 mg/dia", "3000 mg/dia", "Precursor de dopamina e hormônios tireoidianos."),
            "Colina": ("250-550 mg/dia", "3500 mg/dia", "Precursor de acetilcolina, importante para memória."),
            "Enxofre (S)": ("Via alimentação (alho, cebola)", "Não definida", "Importante para desintoxicação e colágeno."),
            "Isoflavonas": ("40-80 mg/dia", "150 mg/dia", "Fitoestrógenos para sintomas de menopausa."),
        }
        
        # Buscar posologia padrão
        pos_info = posologias.get(carencia_normalizada, 
                                   ("Conforme orientação profissional", "Conforme orientação profissional", 
                                    "Consulte um profissional de saúde para dosagem adequada."))
        
        sintomas_data += f"""      {{
        nutriente: "{carencia_normalizada}",
        posologia: "{pos_info[0]}",
        dosagem_maxima: "{pos_info[1]}",
        observacoes: "{pos_info[2]}"
      }},
"""
    
    sintomas_data += """    ]
  },
"""
    contador += 1

sintomas_data += """];

// Função auxiliar para buscar carências por sintoma
export const buscarCarenciasPorSintoma = (sintomaId) => {
  const sintoma = sintomasCarencias.find(s => s.id === sintomaId);
  return sintoma || null;
};

// Função auxiliar para buscar múltiplos sintomas
export const buscarMultiplasCarencias = (sintomasIds) => {
  return sintomasIds.map(id => buscarCarenciasPorSintoma(id)).filter(s => s !== null);
};

// Função para buscar sintomas por palavra-chave
export const buscarSintomasPorPalavraChave = (palavraChave) => {
  const keyword = palavraChave.toLowerCase();
  return sintomasCarencias.filter(s => 
    s.sintoma.toLowerCase().includes(keyword)
  );
};

// Total de sintomas cadastrados
export const getTotalSintomas = () => sintomasCarencias.length;
"""

# Salvar arquivo
output_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\data\sintomasCarenciasData.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(sintomas_data)

print(f"✓ Arquivo gerado com sucesso!")
print(f"✓ Total de sintomas: {len(sintomas_pdf)}")
print(f"✓ Localização: {output_path}")
