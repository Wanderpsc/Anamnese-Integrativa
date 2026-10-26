#!/usr/bin/env python3
# Script para adicionar unidades de medida aos exames

# Mapeamento de exames e suas unidades disponíveis
exames_unidades = {
    # HEMOGRAMA
    "Hematócrito": {
        "unidade": "%",
        "disponiveis": ["%"]
    },
    "Hemoglobina": {
        "unidade": "g/dL",
        "disponiveis": ["g/dL", "g/L"]
    },
    "Hemoglobina Glicada (HbA1c)": {
        "unidade": "%",
        "disponiveis": ["%", "mmol/mol"]
    },
    "Leucócitos": {
        "unidade": "/mm³",
        "disponiveis": ["/mm³", "mil/mm³", "x10³/µL"]
    },
    "Plaquetas": {
        "unidade": "/mm³",
        "disponiveis": ["/mm³", "mil/mm³", "x10³/µL"]
    },
    
    # GLICEMIA
    "Glicemia em Jejum": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Insulina em Jejum": {
        "unidade": "μUI/mL",
        "disponiveis": ["μUI/mL", "pmol/L"]
    },
    
    # PERFIL LIPÍDICO
    "Colesterol Total": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "HDL Colesterol": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "LDL Colesterol": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Triglicerídeos": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "VLDL Colesterol": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    
    # TIREOIDE
    "Anti-Tireoglobulina": {
        "unidade": "UI/mL",
        "disponiveis": ["UI/mL", "IU/L"]
    },
    "Anti-TPO (Anti-Peroxidase)": {
        "unidade": "UI/mL",
        "disponiveis": ["UI/mL", "IU/L"]
    },
    "T3 Livre": {
        "unidade": "pg/mL",
        "disponiveis": ["pg/mL", "pmol/L"]
    },
    "T3 Total": {
        "unidade": "ng/dL",
        "disponiveis": ["ng/dL", "nmol/L"]
    },
    "T4 Livre": {
        "unidade": "ng/dL",
        "disponiveis": ["ng/dL", "pmol/L"]
    },
    "TSH": {
        "unidade": "mUI/L",
        "disponiveis": ["mUI/L", "μUI/mL"]
    },
    
    # FUNÇÃO HEPÁTICA
    "Amilase": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "Bilirrubina Direta": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "µmol/L"]
    },
    "Bilirrubina Total": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "µmol/L"]
    },
    "Fosfatase Alcalina (FA)": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "GGT (Gama GT)": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "LDH (Lactato Desidrogenase)": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "Lipase": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "TGO/AST": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "TGP/ALT": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    
    # FUNÇÃO RENAL
    "Creatinina": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "µmol/L"]
    },
    "Proteínas na Urina": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "g/L"]
    },
    "Ureia": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Ácido Úrico": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "µmol/L"]
    },
    
    # ELETRÓLITOS E MINERAIS
    "Cálcio Total": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Ferro Sérico": {
        "unidade": "μg/dL",
        "disponiveis": ["μg/dL", "µmol/L"]
    },
    "Ferritina": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L", "pmol/L"]
    },
    "Fósforo": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Magnésio (Mg²+)": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "mmol/L"]
    },
    "Potássio (K+)": {
        "unidade": "mEq/L",
        "disponiveis": ["mEq/L", "mmol/L"]
    },
    "Saturação de Transferrina": {
        "unidade": "%",
        "disponiveis": ["%"]
    },
    "Sódio (Na+)": {
        "unidade": "mEq/L",
        "disponiveis": ["mEq/L", "mmol/L"]
    },
    "Transferrina": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "g/L"]
    },
    
    # VITAMINAS
    "Ácido Fólico": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "nmol/L"]
    },
    "Vitamina A (Retinol)": {
        "unidade": "μg/dL",
        "disponiveis": ["μg/dL", "µmol/L"]
    },
    "Vitamina B1 (Tiamina)": {
        "unidade": "μg/dL",
        "disponiveis": ["μg/dL", "nmol/L"]
    },
    "Vitamina B6 (Piridoxina)": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "nmol/L"]
    },
    "Vitamina B12": {
        "unidade": "pg/mL",
        "disponiveis": ["pg/mL", "pmol/L"]
    },
    "Vitamina C (Ácido Ascórbico)": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "µmol/L"]
    },
    "Vitamina D (25-OH)": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "nmol/L"]
    },
    "Vitamina E (Tocoferol)": {
        "unidade": "mg/L",
        "disponiveis": ["mg/L", "µmol/L"]
    },
    
    # PROTEÍNAS
    "Albumina Sérica": {
        "unidade": "g/dL",
        "disponiveis": ["g/dL", "g/L"]
    },
    "Proteínas Totais": {
        "unidade": "g/dL",
        "disponiveis": ["g/dL", "g/L"]
    },
    
    # MARCADORES CARDÍACOS
    "BNP": {
        "unidade": "pg/mL",
        "disponiveis": ["pg/mL", "ng/L"]
    },
    "CK Total (Creatinoquinase)": {
        "unidade": "U/L",
        "disponiveis": ["U/L"]
    },
    "CK-MB": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "Homocisteína": {
        "unidade": "μmol/L",
        "disponiveis": ["μmol/L"]
    },
    "Troponina I Cardíaca": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    
    # MARCADORES INFLAMATÓRIOS
    "PCR (Proteína C Reativa)": {
        "unidade": "mg/L",
        "disponiveis": ["mg/L", "mg/dL"]
    },
    "Procalcitonina": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "VHS (Velocidade de Hemossedimentação)": {
        "unidade": "mm/h",
        "disponiveis": ["mm/h"]
    },
    
    # COAGULAÇÃO
    "D-dímero": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "Fibrinogênio": {
        "unidade": "mg/dL",
        "disponiveis": ["mg/dL", "g/L"]
    },
    "TTPa (Tempo de Tromboplastina)": {
        "unidade": "segundos",
        "disponiveis": ["segundos"]
    },
    
    # MARCADORES TUMORAIS
    "AFP (Alfafetoproteína)": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "Beta-HCG": {
        "unidade": "mUI/mL",
        "disponiveis": ["mUI/mL", "IU/L"]
    },
    "CA 125": {
        "unidade": "U/mL",
        "disponiveis": ["U/mL"]
    },
    "CA 15-3": {
        "unidade": "U/mL",
        "disponiveis": ["U/mL"]
    },
    "CA 19-9": {
        "unidade": "U/mL",
        "disponiveis": ["U/mL"]
    },
    "CEA (Antígeno Carcinoembrionário)": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "PSA Total": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    
    # HORMÔNIOS
    "Cortisol (8h)": {
        "unidade": "μg/dL",
        "disponiveis": ["μg/dL", "nmol/L"]
    },
    "DHEA-S": {
        "unidade": "μg/dL",
        "disponiveis": ["μg/dL", "µmol/L"]
    },
    "Estradiol": {
        "unidade": "pg/mL",
        "disponiveis": ["pg/mL", "pmol/L"]
    },
    "FSH (Hormônio Folículo Estimulante)": {
        "unidade": "mUI/mL",
        "disponiveis": ["mUI/mL", "IU/L"]
    },
    "IGF-1 (Fator de Crescimento)": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "LH (Hormônio Luteinizante)": {
        "unidade": "mUI/mL",
        "disponiveis": ["mUI/mL", "IU/L"]
    },
    "Progesterona": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "nmol/L"]
    },
    "Prolactina": {
        "unidade": "ng/mL",
        "disponiveis": ["ng/mL", "µg/L"]
    },
    "SHBG (Globulina Ligadora de Hormônios)": {
        "unidade": "nmol/L",
        "disponiveis": ["nmol/L"]
    },
    "Testosterona Total": {
        "unidade": "ng/dL",
        "disponiveis": ["ng/dL", "nmol/L"]
    },
    
    # URINA
    "Densidade Urinária": {
        "unidade": "",
        "disponiveis": [""]
    },
    "Hemácias na Urina": {
        "unidade": "células/campo",
        "disponiveis": ["células/campo"]
    },
    "Leucócitos na Urina": {
        "unidade": "células/campo",
        "disponiveis": ["células/campo"]
    },
    "pH Urinário": {
        "unidade": "",
        "disponiveis": [""]
    },
    
    # GASOMETRIA
    "HCO3 (Bicarbonato)": {
        "unidade": "mEq/L",
        "disponiveis": ["mEq/L", "mmol/L"]
    },
    "Lactato Arterial": {
        "unidade": "mmol/L",
        "disponiveis": ["mmol/L"]
    },
    "pCO2 (Pressão de CO2)": {
        "unidade": "mmHg",
        "disponiveis": ["mmHg", "kPa"]
    },
    "pH Arterial": {
        "unidade": "",
        "disponiveis": [""]
    },
    "pO2 (Pressão de O2)": {
        "unidade": "mmHg",
        "disponiveis": ["mmHg", "kPa"]
    },
    "SatO2 (Saturação de Oxigênio)": {
        "unidade": "%",
        "disponiveis": ["%"]
    }
}

# Gerar o código JavaScript formatado
print("// Código gerado automaticamente - Unidades de medida\n")
for exame, unidades in exames_unidades.items():
    print(f'"{exame}": {{')
    print(f'  unidade: "{unidades["unidade"]}",')
    print(f'  unidadesDisponiveis: {unidades["disponiveis"]},')
    print(f'  unidadeSelecionada: "{unidades["unidade"]}"')
    print('},')
