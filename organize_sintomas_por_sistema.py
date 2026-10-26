#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reorganizador de sintomas por sistemas do corpo humano e ordem alfabética
"""

# Mapeamento de sintomas por sistema do corpo humano
sistemas = {
    "SISTEMA CARDIOVASCULAR": [
        "Alteração De Pressão / Hipertensão / Hipotensão",
        "Arritmias",
        "Edemas Nas Pernas",
        "Frio Nas Extremidades / Sensibilidade Ao Frio",
        "Hematomas Fáceis",
        "Hemorragias Gengivais",
        "Hipertensão",
    ],
    
    "SISTEMA NERVOSO E MENTAL": [
        "Alterações De Humor / Ansiedade",
        "Apatia",
        "Burnout",
        "Confusão Mental",
        "Depressão / Pessimismo / Apatia",
        "Depressão Pós-Parto",
        "Depressão Sazonal",
        "Distúrbio Bipolar",
        "Enxaqueca",
        "Episódios De Memória / Confusão",
        "Esclerose Múltipla",
        "Esquizofrenia",
        "Estresse Exacerbado / Burnout / Distress",
        "Formigamento",
        "Irritabilidade",
        "Má Memória / Confusão Mental",
        "Neuropatia Periférica",
        "Parkinson",
        "Tontura / Vertigem",
        "Tontura Ao Levantar",
    ],
    
    "SISTEMA DIGESTIVO": [
        "Alternância Intestinal",
        "Apetite Irregular",
        "Boca Seca",
        "Celiaco",
        "Cólicas Intestinais",
        "Desconforto Abdominal",
        "Diarreia",
        "Doença De Crohn",
        "Flatulências",
        "Gengivite",
        "Intestino Irritável",
        "Má Digestão",
        "Náuseas",
        "Perda De Apetite",
        "Sindrome Do Intestino Permeável",
    ],
    
    "SISTEMA MUSCULOESQUELÉTICO": [
        "Bruxismo",
        "Cãibras Noturnas",
        "Desmineralização Óssea",
        "Dificuldade De Ganho De Massa Muscular",
        "Dor Articular",
        "Dores Articulares",
        "Dores Musculares",
        "Dores Na Coluna",
        "Fraturas Frequentes",
        "Osteomalácia",
        "Osteoporose",
        "Perda De Massa Óssea",
        "Pernas Inquietas",
        "Tendinite",
    ],
    
    "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)": [
        "Acne",
        "Alterações Na Pele / Dermatites",
        "Caspa",
        "Dermatite",
        "Hiperpigmentação",
        "Pele Amarelada",
        "Pele Seca",
        "Problemas De Cicatrização",
        "Psoríase",
        "Queda De Cabelo",
        "Rachaduras No Canto Da Boca",
        "Rachaduras Nos Lábios / Cantos Da Boca",
        "Rosácea",
        "Unhas Fracas",
    ],
    
    "SISTEMA IMUNOLÓGICO": [
        "Alergias / Alergias Temporárias / Alimentares",
        "Alergias Alimentares",
        "Dor De Garganta Recorrente",
        "Herpes Recorrente",
        "Imunidade Baixa",
        "Infecção Urinária Recorrente",
        "Infecções De Repetição / Herpes / Vias Aéreas / Urinária",
        "Infecções De Vias Aéreas Frequentes",
        "Pielonefrite",
        "Sinusite Crônica",
    ],
    
    "SISTEMA ENDÓCRINO E METABÓLICO": [
        "Diabetes Tipo 2",
        "Hipoglicemia",
        "Hipoglicemia Reativa",
        "Hipotireoidismo",
        "Sensibilidade Ao Calor",
        "Sensibilidade Ao Frio",
        "Sindrome Metabólica",
        "Sudorese Excessiva",
    ],
    
    "SISTEMA REPRODUTOR": [
        "Baixa Libido",
        "Cólica Menstrual Intensa",
        "Endometriose",
        "Impotência / Baixa Libido",
        "Infertilidade Feminina",
        "Infertilidade Masculina / Esterilidade",
        "Menopausa / Alterações Hormonais",
        "Ovário Policistico (SOP)",
    ],
    
    "SISTEMA VISUAL": [
        "Alterações Na Visão / Visão Noturna",
        "Cansaço Ocular",
        "Olhos Secos",
        "Visão Noturna Ruim",
    ],
    
    "SISTEMA SANGUÍNEO": [
        "Anemia",
    ],
    
    "SISTEMA URINÁRIO": [
        "Enurese",
    ],
    
    "SONO E ENERGIA": [
        "Acorda Com Sono",
        "Desperta À Noite",
        "Fadiga / Fadiga Crônica / Sem Energia",
        "Sindrome Da Fadiga Crônica",
        "Sono Irregular / Demora A Dormir / Sonolência Diurna / Acorda Com Sono",
        "Sonolência Durante O Dia",
    ],
}

# Dicionário completo de sintomas e suas carências
sintomas_carencias = {
    "Neuropatia Periférica": "B1, B6, B12, Magnésio, Alfa-Lipoico, Omega-3",
    "Osteomalácia": "Vitamina D, Cálcio, Magnésio, K2, Boro, Silício",
    "Pielonefrite": "Vitamina C, D, A, Zinco, Nac",
    "Rosácea": "Vitamina B2, B6, C, Zinco, Omega-3, Quercetina",
    "Distúrbio Bipolar": "Omega-3, Inositol, B6, B12, Magnésio, Coenzima Q10, L-Triptofano",
    "Esquizofrenia": "B12, B6, B9, Omega-3, Inositol, Vitamina D, Zinco, Magnésio",
    "Queda De Cabelo": "Zinco, B1, B6, Magnésio, Potássio, Vitamina C, Proteinas, B7, Ferro, Vitamina D, Silício, Omega-3",
    "Unhas Fracas": "Zinco, Silício, Ferro, Vitamina A, B7",
    "Edemas Nas Pernas": "Magnésio, Potássio, Coenzima Q10, Vitamina D, B1, B6",
    "Alteração De Pressão / Hipertensão / Hipotensão": "Magnésio, Potássio, Coenzima Q10, B1, Vitamina D",
    "Acne": "Zinco, Vitamina A, B6, Omega-3, Vitamina E, Quercetina",
    "Alergias / Alergias Temporárias / Alimentares": "Quercetina, Vitamina C, D, A, B6, Magnésio, Omega-3, Nac",
    "Alterações Na Pele / Dermatites": "Zinco, Vitamina A, B2, B3, B6, B7, Omega-3, Vitamina C, Silício",
    "Infecções De Repetição / Herpes / Vias Aéreas / Urinária": "Vitamina C, D, A, Zinco, Selênio, Quercetina, Nac",
    "Imunidade Baixa": "Vitamina C, D, A, B6, B9, B12, Zinco, Selênio, Nac, Quercetina",
    "Sono Irregular / Demora A Dormir / Sonolência Diurna / Acorda Com Sono": "Melatonina, B6, Magnésio, L-Triptofano, Inositol, Coenzima Q10",
    "Má Digestão": "B1, B6, Magnésio, Glutamina, Zinco, Nac",
    "Alterações De Humor / Ansiedade": "L-Triptofano, B6, B9, Magnésio, Vitamina D, Inositol, Omega-3",
    "Náuseas": "B6, Magnésio, Zinco, Vitamina A",
    "Depressão / Pessimismo / Apatia": "Vitamina D, B6, B9, B12, Omega-3, L-Triptofano, Inositol, Magnésio",
    "Apetite Irregular": "Cromo, B1, B6, Inositol, Magnésio, L-Triptofano, Zinco",
    "Fadiga / Fadiga Crônica / Sem Energia": "Coenzima Q10, Ferro, B12, B6, B9, Vitamina C, Magnésio, Zinco, Omega-3",
    "Intestino Irritável": "Glutamina, Quercetina, Omega-3, Nac, Vitamina D, Zinco, L-Triptofano",
    "Má Memória / Confusão Mental": "Vitamina B12, B6, B9, Omega-3, Coenzima Q10, Inositol, L-Triptofano, Magnésio",
    "Flatulências": "Glutamina, Magnésio, B6, B1, Zinco, Quercetina",
    "Alterações Na Visão / Visão Noturna": "Vitamina A, B2, Luteina, Zeaxantina, Zinco",
    "Cólicas Intestinais": "Vitamina D, Magnésio, Omega-3, Cálcio, Quercetina",
    "Enxaqueca": "Magnésio, Coenzima Q10, B2, B6, B12, Vitamina D, Omega-3",
    "Diarreia": "Zinco, Magnésio, Vitamina B3, Vitamina A, Glutamina, Vitamina D, Quercetina",
    "Tontura / Vertigem": "Vitamina B12, B1, Magnésio, Ferro, Potássio",
    "Alternância Intestinal": "Zinco, Glutamina, Quercetina, Vitamina A, L-Triptofano, Omega-3, Nac, Vitamina D",
    "Sudorese Excessiva": "Magnésio, Vitamina D, B1",
    "Hematomas Fáceis": "Vitamina C, K2, B9, B12, Bioflavonoides",
    "Esclerose Múltipla": "Vitamina D, B12, B9, Omega-3, Magnésio, Nac, Coenzima Q10",
    "Parkinson": "Coenzima Q10, B6, B12, Vitamina D, Magnésio, Nac, Inositol",
    "Sindrome Da Fadiga Crônica": "Coenzima Q10, Magnésio, B12, B6, B9, Ferro, Vitamina D, Vitamina C, Omega-3",
    "Tendinite": "Vitamina C, Omega-3, Magnésio, Vitamina E, Silício",
    "Rachaduras No Canto Da Boca": "B2, B3, B6, Ferro, Zinco",
    "Problemas De Crescimento": "Zinco, Vitamina D, B12, A, Ferro, Iodo",
    "Sensibilidade Ao Calor": "Vitamina D, Magnésio, Selênio, Iodo, Luteína, Zeaxantina",
    "Hipoglicemia Reativa": "Cromo, Magnésio, B6, Inositol, B3",
    "Cólica Menstrual Intensa": "Vitamina D, B6, B12, L-Triptofano, Omega-3, Magnésio, Vitamina E",
    "Depressão Sazonal": "B9, B12, D, Magnésio, Omega-3, Melatonina",
    "Celiaco": "B12, Vitamina D, Ferro, Zinco, Magnésio, B9, Glutamina",
    "Sinusite Crônica": "Vitamina C, D, Zinco, Nac, Quercetina",
    "Doença De Crohn": "B12, Vitamina D, Zinco, Magnésio, Glutamina, Quercetina, Ferro",
    "Sindrome Do Intestino Permeável": "Glutamina, Zinco, Quercetina, Omega-3, Vitamina D, Nac, L-Triptofano",
    "Depressão Pós-Parto": "B9, B12, Vitamina D, Omega-3, Magnésio, L-Triptofano",
    "Perda De Massa Óssea": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício, Vitamina C",
    "Sindrome Metabólica": "Cromo, Inositol, Magnésio, Vitamina D, Coenzima Q10, Omega-3, B3",
    "Infecção Urinária Recorrente": "Vitamina C, D, A, Zinco, Nac, Omega-3",
    "Pernas Inquietas": "Ferro, Magnésio, Vitamina E, B1, B6, B12, Cálcio",
    "Pele Amarelada": "Vitamina B12, B9, Ferro, B2, B6",
    "Boca Seca": "Zinco, B1, B6, Cromo, Inositol, Vitamina A, B2, Magnésio",
    "Baixa Libido": "Zinco, B6, Vitamina E, D, Coenzima Q10, L-Arginina, Selênio",
    "Hipertensão": "Magnésio, Potássio, Coenzima Q10, B1, Vitamina D, Omega-3",
    "Fraturas Frequentes": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício",
    "Bruxismo": "Magnésio, Vitamina D, Cálcio, L-Triptofano",
    "Perda De Apetite": "Cromo, B1, B6, Inositol, Magnésio, L-Triptofano, Zinco",
    "Gengivite": "Vitamina C, K2, B9, Quercetina, A, Zinco",
    "Desmineralização Óssea": "Cálcio, Vitamina D, K2, Magnésio, Boro, Silício",
    "Hemorragias Gengivais": "Vitamina C, K2, B9, Quercetina",
    "Hiperpigmentação": "Vitamina B12, Ácido Fólico, C, E, Glutationa",
    "Problemas De Cicatrização": "Vitamina C, A, Zinco, B7, B5, Silício, Omega-3",
    "Caspa": "Vitamina B6, B2, Zinco, Omega-3, Selênio, Quercetina",
    "Apatia": "B12, B9, B6, Magnésio, L-Triptofano, Vitamina D",
    "Desconforto Abdominal": "Glutamina, Magnésio, B6, Zinco, Nac, Quercetina",
    "Sensibilidade Ao Frio": "Ferro, Iodo, B12, Magnésio, Coenzima Q10, B9",
    "Dermatite": "Vitamina B6, B2, B3, A, C, B7, Zinco, Omega-3",
    "Dor De Garganta Recorrente": "Vitamina C, D, A, Zinco, Nac, Quercetina",
    "Cansaço Ocular": "Luteina, Zeaxantina, Vitamina A, C, E, B2, Omega-3",
    "Dificuldade De Ganho De Massa Muscular": "B6, B12, Magnésio, Zinco, L-Alanina, Vitamina D, Coenzima Q10, Proteinas",
    "Alergias Alimentares": "Quercetina, Vitamina A, C, D, B6, Omega-3, Nac",
    "Pele Seca": "Vitamina A, E, C, B3, Omega-3, Zinco, Silício",
    "Endometriose": "Omega-3, Vitamina D, B6, Magnésio, Nac, Quercetina",
    "Ovário Policistico (SOP)": "Inositol, Cromo, Zinco, Vitamina D, B6, Omega-3",
    "Cãibras Noturnas": "Magnésio, Potássio, Cálcio, B1, B6, Vitamina D",
    "Diabetes Tipo 2": "Cromo, Magnésio, Vitamina D, Coenzima Q10, B1, B3, Inositol",
    "Olhos Secos": "Vitamina A, Vitamina E, Omega-3, B2",
    "Osteoporose": "Cálcio, Vitamina D, K2, Magnésio, Boro, Vitamina C, Silício",
    "Rachaduras Nos Lábios / Cantos Da Boca": "B2, B6, B3, B12, Ferro, Zinco",
    "Hipoglicemia": "Cromo, B3, B6, Magnésio, Inositol",
    "Episódios De Memória / Confusão": "B12, B9, B6, Omega-3, Coenzima Q10, Inositol, L-Triptofano, Magnésio",
    "Dor Articular": "Omega-3, Vitamina D, C, B6, Magnésio, Boro, Quercetina",
    "Tontura Ao Levantar": "B1, B12, Potássio, Magnésio, Coenzima Q10, Vitamina C",
    "Anemia": "Ferro, B9, B12, Vitamina C, Cobre, B6",
    "Visão Noturna Ruim": "Vitamina A, Zinco, Luteina, Zeaxantina, B2",
    "Infertilidade Feminina": "B9, B12, D, E, Zinco, Ferro, C, Inositol, Coenzima Q10",
    "Infertilidade Masculina / Esterilidade": "Zinco, Selênio, Vitamina E, Coenzima Q10, B12, B9, Omega-3, L-Arginina",
    "Dor De Cabeça Frequente": "B2, B6, Magnésio, Coenzima Q10, D, Inositol",
    "Psoríase": "Vitamina D, A, B6, Omega-3, Selênio, Zinco",
    "Hipotireoidismo": "Iodo, Selênio, Zinco, Vitamina D, Ferro, Tirosina, B12, Nac",
    "Artrite Reumatoide": "Omega-3, Vitamina D, C, B6, Quercetina, Nac, Magnésio",
    "Dores Musculares": "Magnésio, Vitamina D, C, B6, Quercetina, Boro",
    "Dores Articulares": "Omega-3, Vitamina D, C, B6, Magnésio, Boro, Zinco, Selênio, Nac",
    "Dores Na Coluna": "Vitamina D, Magnésio, Cálcio, B12, Coenzima Q10, Omega-3",
    "Formigamento": "B1, B6, B12, Magnésio, Ácido Alfa-Lipóico, Omega-3, Vitamina E",
    "Menopausa / Alterações Hormonais": "Vitamina D, E, B6, K2, Magnésio, Cálcio, Omega-3, Isoflavonas",
    "Impotência / Baixa Libido": "Zinco, B6, Vitamina E, D, Coenzima Q10, L-Arginina, Selênio, Omega-3",
    "Estresse Exacerbado / Burnout / Distress": "Magnésio, Vitamina C, B5, B6, Coenzima Q10, L-Triptofano, Inositol",
    "Irritabilidade": "B6, B1, B12, Magnésio, L-Triptofano, Vitamina D",
    "Arritmias": "Magnésio, Potássio, Cálcio, Coenzima Q10, Vitamina D, Omega-3",
    "Frio Nas Extremidades / Sensibilidade Ao Frio": "B12, Ferro, Magnésio, Vitamina E, Iodo",
    "Desperta À Noite": "Vitamina D, Magnésio, L-Triptofano, Melatonina",
    "Herpes Recorrente": "C, D, Zinco",
    "Sonolência Durante O Dia": "B1, B2, B3, B6, B12, D, Ferro, L-Triptofano",
    "Infecções De Vias Aéreas Frequentes": "C, D, E, Zinco, Magnésio, Selênio, Omega-3, Quercetina, Nac",
    "Enurese": "B12, D, Magnésio",
    "Burnout": "B6, B9, B12, C, D, Magnésio, Coenzima Q10, L-Triptofano",
    "Confusão Mental": "B9, B12, D, Omega-3, Zinco, Coenzima Q10, Glutamina",
    "Acorda Com Sono": "B12, D, Magnésio, L-Triptofano, Melatonina",
}

# Posologias padrão
posologias = {
    "Vitamina D": ("2000-5000 UI/dia", "10.000 UI/dia", "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."),
    "Vitamina C": ("1000-2000 mg/dia dividido em 2 doses", "3000 mg/dia", "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."),
    "Vitamina A": ("5000-10.000 UI/dia", "25.000 UI/dia", "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."),
    "Vitamina E": ("400-800 UI/dia", "1000 UI/dia", "Antioxidante lipossolúvel, protege membranas celulares."),
    "Vitamina K2": ("100-200 mcg/dia", "1000 mcg/dia", "Direciona cálcio para ossos, trabalha com vitamina D3."),
    "K2": ("100-200 mcg/dia", "1000 mcg/dia", "Direciona cálcio para ossos, trabalha com vitamina D3."),
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
    "Coenzima Q10": ("100-300 mg/dia", "600 mg/dia", "Essencial para produção de energia mitocondrial."),
    "Omega-3": ("1000-3000 mg/dia (EPA+DHA)", "4000 mg/dia", "Anti-inflamatório natural. Tomar com alimentos."),
    "L-Triptofano": ("500-2000 mg/dia", "6000 mg/dia", "Precursor de serotonina. Tomar à noite."),
    "L-Arginina": ("2000-6000 mg/dia", "10.000 mg/dia", "Precursor de óxido nítrico, melhora circulação."),
    "L-Alanina": ("500-1000 mg/dia", "3000 mg/dia", "Aminoácido para energia e massa muscular."),
    "Glutamina": ("5-15 g/dia", "40 g/dia", "Combustível intestinal, repara mucosa."),
    "Nac": ("600-1800 mg/dia", "2400 mg/dia", "Precursor de glutationa, antioxidante potente."),
    "Quercetina": ("500-1000 mg/dia", "2000 mg/dia", "Anti-inflamatório e anti-histamínico natural."),
    "Inositol": ("2000-4000 mg/dia", "18.000 mg/dia", "Melhora sensibilidade insulínica e SOP."),
    "Melatonina": ("1-5 mg/dia", "10 mg/dia", "Regulador do sono. Tomar 30min antes de dormir."),
    "Ácido Alfa-Lipóico": ("300-600 mg/dia", "1200 mg/dia", "Antioxidante universal, bom para neuropatia."),
    "Alfa-Lipoico": ("300-600 mg/dia", "1200 mg/dia", "Antioxidante universal, bom para neuropatia."),
    "Luteina": ("10-20 mg/dia", "20 mg/dia", "Protege visão e mácula."),
    "Luteína": ("10-20 mg/dia", "20 mg/dia", "Protege visão e mácula."),
    "Zeaxantina": ("2-4 mg/dia", "10 mg/dia", "Trabalha com luteína para saúde ocular."),
    "Bioflavonoides": ("500-1000 mg/dia", "2000 mg/dia", "Potencializam vitamina C."),
    "Glutationa": ("250-500 mg/dia", "1000 mg/dia", "Antioxidante mestre, melhor na forma lipossomal."),
    "Proteinas": ("1.2-2g por kg de peso/dia", "Conforme necessidade", "Essencial para músculos e recuperação."),
    "Tirosina": ("500-2000 mg/dia", "3000 mg/dia", "Precursor de dopamina e hormônios tireoidianos."),
    "Isoflavonas": ("40-80 mg/dia", "150 mg/dia", "Fitoestrógenos para sintomas de menopausa."),
    "Ácido Fólico": ("400-800 mcg/dia", "1000 mcg/dia", "Essencial para divisão celular. Preferir forma metilfolato."),
}

# Gerar arquivo organizado
output = """// Base de dados COMPLETA de Sintomas e Carências Nutricionais
// Extraído e processado do PDF "SINTOMAS E CARÊNCIAS NUTRICIONAIS"
// Organização: Por sistemas do corpo humano + ordem alfabética
// Atualização: Dezembro 2024
// Total de sintomas: {}

export const sintomasCarencias = [
""".format(sum(len(sintomas) for sintomas in sistemas.values()))

contador = 1

# Processar cada sistema
for sistema, lista_sintomas in sistemas.items():
    output += f"""  // ==========================================
  // {sistema}
  // ==========================================
"""
    
    # Ordenar sintomas alfabeticamente dentro do sistema
    lista_sintomas_ordenados = sorted(lista_sintomas)
    
    for sintoma in lista_sintomas_ordenados:
        if sintoma in sintomas_carencias:
            carencias_str = sintomas_carencias[sintoma]
            carencias_lista = [c.strip() for c in carencias_str.split(',')]
            
            output += f"""  {{
    id: {contador},
    sintoma: "{sintoma}",
    sistema: "{sistema}",
    carencias: [
"""
            
            for carencia in carencias_lista:
                # Normalizar
                carencia_norm = carencia.strip()
                
                # Buscar posologia
                pos_info = posologias.get(carencia_norm, 
                                           ("Conforme orientação profissional", 
                                            "Conforme orientação profissional", 
                                            "Consulte um profissional de saúde para dosagem adequada."))
                
                output += f"""      {{
        nutriente: "{carencia_norm}",
        posologia: "{pos_info[0]}",
        dosagem_maxima: "{pos_info[1]}",
        observacoes: "{pos_info[2]}"
      }},
"""
            
            output += """    ]
  },
"""
            contador += 1

output += """];

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

// Função para buscar sintomas por sistema
export const buscarSintomasPorSistema = (sistema) => {
  return sintomasCarencias.filter(s => s.sistema === sistema);
};

// Lista de sistemas disponíveis
export const getSistemasDisponiveis = () => {
  const sistemas = [...new Set(sintomasCarencias.map(s => s.sistema))];
  return sistemas.sort();
};

// Total de sintomas cadastrados
export const getTotalSintomas = () => sintomasCarencias.length;
"""

# Salvar arquivo
output_path = r"E:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO\anamnese-app\src\data\sintomasCarenciasData.js"
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f"✅ Arquivo reorganizado com sucesso!")
print(f"✅ Total de sintomas: {contador - 1}")
print(f"✅ Organização: Por sistemas + ordem alfabética")
print(f"✅ Localização: {output_path}")
print(f"\n📋 Sistemas organizados:")
for sistema, lista in sistemas.items():
    print(f"  • {sistema}: {len(lista)} sintomas")
