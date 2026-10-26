// Base de dados COMPLETA de Sintomas e Carências Nutricionais
// Extraído e processado do PDF "SINTOMAS E CARÊNCIAS NUTRICIONAIS"
// Organização: Por sistemas do corpo humano + ordem alfabética
// Atualização: Dezembro 2024
// Total de sintomas: 108

export const sintomasCarencias = [
  // ==========================================
  // SISTEMA CARDIOVASCULAR
  // ==========================================
  {
    id: 1,
    sintoma: "Alteração De Pressão / Hipertensão / Hipotensão",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
    ]
  },
  {
    id: 2,
    sintoma: "Arritmias",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 3,
    sintoma: "Edemas Nas Pernas",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
    ]
  },
  {
    id: 4,
    sintoma: "Frio Nas Extremidades / Sensibilidade Ao Frio",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "Iodo",
        posologia: "150-300 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Essencial para tireoide. Evitar excesso."
      },
    ]
  },
  {
    id: 5,
    sintoma: "Hematomas Fáceis",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Bioflavonoides",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Potencializam vitamina C."
      },
    ]
  },
  {
    id: 6,
    sintoma: "Hemorragias Gengivais",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 7,
    sintoma: "Hipertensão",
    sistema: "SISTEMA CARDIOVASCULAR",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  // ==========================================
  // SISTEMA NERVOSO E MENTAL
  // ==========================================
  {
    id: 8,
    sintoma: "Alterações De Humor / Ansiedade",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 9,
    sintoma: "Apatia",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
    ]
  },
  {
    id: 10,
    sintoma: "Burnout",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  {
    id: 11,
    sintoma: "Confusão Mental",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
    ]
  },
  {
    id: 12,
    sintoma: "Depressão / Pessimismo / Apatia",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  {
    id: 13,
    sintoma: "Depressão Pós-Parto",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  {
    id: 14,
    sintoma: "Depressão Sazonal",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Melatonina",
        posologia: "1-5 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Regulador do sono. Tomar 30min antes de dormir."
      },
    ]
  },
  {
    id: 15,
    sintoma: "Distúrbio Bipolar",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  {
    id: 16,
    sintoma: "Enxaqueca",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 17,
    sintoma: "Episódios De Memória / Confusão",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  {
    id: 18,
    sintoma: "Esclerose Múltipla",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
    ]
  },
  {
    id: 19,
    sintoma: "Esquizofrenia",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  {
    id: 20,
    sintoma: "Estresse Exacerbado / Burnout / Distress",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "B5",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Suporta função adrenal e metabolismo energético."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
    ]
  },
  {
    id: 21,
    sintoma: "Formigamento",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Ácido Alfa-Lipóico",
        posologia: "300-600 mg/dia",
        dosagem_maxima: "1200 mg/dia",
        observacoes: "Antioxidante universal, bom para neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
    ]
  },
  {
    id: 22,
    sintoma: "Irritabilidade",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
    ]
  },
  {
    id: 23,
    sintoma: "Má Memória / Confusão Mental",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Vitamina B12",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  {
    id: 24,
    sintoma: "Neuropatia Periférica",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Alfa-Lipoico",
        posologia: "300-600 mg/dia",
        dosagem_maxima: "1200 mg/dia",
        observacoes: "Antioxidante universal, bom para neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 25,
    sintoma: "Parkinson",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
    ]
  },
  {
    id: 26,
    sintoma: "Tontura / Vertigem",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "Vitamina B12",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
    ]
  },
  {
    id: 27,
    sintoma: "Tontura Ao Levantar",
    sistema: "SISTEMA NERVOSO E MENTAL",
    carencias: [
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
    ]
  },
  // ==========================================
  // SISTEMA DIGESTIVO
  // ==========================================
  {
    id: 28,
    sintoma: "Alternância Intestinal",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
    ]
  },
  {
    id: 29,
    sintoma: "Apetite Irregular",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 30,
    sintoma: "Boca Seca",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  {
    id: 31,
    sintoma: "Celiaco",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
    ]
  },
  {
    id: 32,
    sintoma: "Cólicas Intestinais",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 33,
    sintoma: "Desconforto Abdominal",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 34,
    sintoma: "Diarreia",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina B3",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 35,
    sintoma: "Doença De Crohn",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
    ]
  },
  {
    id: 36,
    sintoma: "Flatulências",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 37,
    sintoma: "Gengivite",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 38,
    sintoma: "Intestino Irritável",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  {
    id: 39,
    sintoma: "Má Digestão",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 40,
    sintoma: "Náuseas",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
    ]
  },
  {
    id: 41,
    sintoma: "Perda De Apetite",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 42,
    sintoma: "Sindrome Do Intestino Permeável",
    sistema: "SISTEMA DIGESTIVO",
    carencias: [
      {
        nutriente: "Glutamina",
        posologia: "5-15 g/dia",
        dosagem_maxima: "40 g/dia",
        observacoes: "Combustível intestinal, repara mucosa."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  // ==========================================
  // SISTEMA MUSCULOESQUELÉTICO
  // ==========================================
  {
    id: 43,
    sintoma: "Bruxismo",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
  {
    id: 44,
    sintoma: "Cãibras Noturnas",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
    ]
  },
  {
    id: 45,
    sintoma: "Desmineralização Óssea",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 46,
    sintoma: "Dificuldade De Ganho De Massa Muscular",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "L-Alanina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Aminoácido para energia e massa muscular."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Proteinas",
        posologia: "1.2-2g por kg de peso/dia",
        dosagem_maxima: "Conforme necessidade",
        observacoes: "Essencial para músculos e recuperação."
      },
    ]
  },
  {
    id: 47,
    sintoma: "Dor Articular",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 48,
    sintoma: "Dores Articulares",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 49,
    sintoma: "Dores Musculares",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
    ]
  },
  {
    id: 50,
    sintoma: "Dores Na Coluna",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 51,
    sintoma: "Fraturas Frequentes",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 52,
    sintoma: "Osteomalácia",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 53,
    sintoma: "Osteoporose",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 54,
    sintoma: "Perda De Massa Óssea",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Boro",
        posologia: "3-9 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Importante para metabolismo de cálcio e magnésio."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
    ]
  },
  {
    id: 55,
    sintoma: "Pernas Inquietas",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
    ]
  },
  {
    id: 56,
    sintoma: "Tendinite",
    sistema: "SISTEMA MUSCULOESQUELÉTICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  // ==========================================
  // SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)
  // ==========================================
  {
    id: 57,
    sintoma: "Acne",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 58,
    sintoma: "Alterações Na Pele / Dermatites",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B7",
        posologia: "5000-10.000 mcg/dia",
        dosagem_maxima: "10.000 mcg/dia",
        observacoes: "Biotina para cabelo, pele e unhas."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 59,
    sintoma: "Caspa",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina B6",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 60,
    sintoma: "Dermatite",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina B6",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B7",
        posologia: "5000-10.000 mcg/dia",
        dosagem_maxima: "10.000 mcg/dia",
        observacoes: "Biotina para cabelo, pele e unhas."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 61,
    sintoma: "Hiperpigmentação",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina B12",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Ácido Fólico",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Glutationa",
        posologia: "250-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Antioxidante mestre, melhor na forma lipossomal."
      },
    ]
  },
  {
    id: 62,
    sintoma: "Pele Amarelada",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina B12",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
    ]
  },
  {
    id: 63,
    sintoma: "Pele Seca",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
    ]
  },
  {
    id: 64,
    sintoma: "Problemas De Cicatrização",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "B7",
        posologia: "5000-10.000 mcg/dia",
        dosagem_maxima: "10.000 mcg/dia",
        observacoes: "Biotina para cabelo, pele e unhas."
      },
      {
        nutriente: "B5",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Suporta função adrenal e metabolismo energético."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 65,
    sintoma: "Psoríase",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 66,
    sintoma: "Queda De Cabelo",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Potássio",
        posologia: "2000-3000 mg/dia",
        dosagem_maxima: "3500 mg/dia via suplemento",
        observacoes: "Importante para pressão e função muscular. Fontes: banana, abacate."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Proteinas",
        posologia: "1.2-2g por kg de peso/dia",
        dosagem_maxima: "Conforme necessidade",
        observacoes: "Essencial para músculos e recuperação."
      },
      {
        nutriente: "B7",
        posologia: "5000-10.000 mcg/dia",
        dosagem_maxima: "10.000 mcg/dia",
        observacoes: "Biotina para cabelo, pele e unhas."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 67,
    sintoma: "Rachaduras No Canto Da Boca",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 68,
    sintoma: "Rachaduras Nos Lábios / Cantos Da Boca",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 69,
    sintoma: "Rosácea",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Vitamina B2",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 70,
    sintoma: "Unhas Fracas",
    sistema: "SISTEMA TEGUMENTAR (PELE, CABELO, UNHAS)",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Silício",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Fortalece tecido conjuntivo, cabelo, unhas."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "B7",
        posologia: "5000-10.000 mcg/dia",
        dosagem_maxima: "10.000 mcg/dia",
        observacoes: "Biotina para cabelo, pele e unhas."
      },
    ]
  },
  // ==========================================
  // SISTEMA IMUNOLÓGICO
  // ==========================================
  {
    id: 71,
    sintoma: "Alergias / Alergias Temporárias / Alimentares",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 72,
    sintoma: "Alergias Alimentares",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 73,
    sintoma: "Dor De Garganta Recorrente",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 74,
    sintoma: "Herpes Recorrente",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 75,
    sintoma: "Imunidade Baixa",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 76,
    sintoma: "Infecção Urinária Recorrente",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 77,
    sintoma: "Infecções De Repetição / Herpes / Vias Aéreas / Urinária",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 78,
    sintoma: "Infecções De Vias Aéreas Frequentes",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 79,
    sintoma: "Pielonefrite",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "A",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 80,
    sintoma: "Sinusite Crônica",
    sistema: "SISTEMA IMUNOLÓGICO",
    carencias: [
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  // ==========================================
  // SISTEMA ENDÓCRINO E METABÓLICO
  // ==========================================
  {
    id: 81,
    sintoma: "Diabetes Tipo 2",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
    ]
  },
  {
    id: 82,
    sintoma: "Hipoglicemia",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
    ]
  },
  {
    id: 83,
    sintoma: "Hipoglicemia Reativa",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
    ]
  },
  {
    id: 84,
    sintoma: "Hipotireoidismo",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Iodo",
        posologia: "150-300 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Essencial para tireoide. Evitar excesso."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Tirosina",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Precursor de dopamina e hormônios tireoidianos."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
    ]
  },
  {
    id: 85,
    sintoma: "Sensibilidade Ao Calor",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Iodo",
        posologia: "150-300 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Essencial para tireoide. Evitar excesso."
      },
      {
        nutriente: "Luteína",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Protege visão e mácula."
      },
      {
        nutriente: "Zeaxantina",
        posologia: "2-4 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Trabalha com luteína para saúde ocular."
      },
    ]
  },
  {
    id: 86,
    sintoma: "Sensibilidade Ao Frio",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Iodo",
        posologia: "150-300 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Essencial para tireoide. Evitar excesso."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
    ]
  },
  {
    id: 87,
    sintoma: "Sindrome Metabólica",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
    ]
  },
  {
    id: 88,
    sintoma: "Sudorese Excessiva",
    sistema: "SISTEMA ENDÓCRINO E METABÓLICO",
    carencias: [
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
    ]
  },
  // ==========================================
  // SISTEMA REPRODUTOR
  // ==========================================
  {
    id: 89,
    sintoma: "Baixa Libido",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "L-Arginina",
        posologia: "2000-6000 mg/dia",
        dosagem_maxima: "10.000 mg/dia",
        observacoes: "Precursor de óxido nítrico, melhora circulação."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
    ]
  },
  {
    id: 90,
    sintoma: "Cólica Menstrual Intensa",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
    ]
  },
  {
    id: 91,
    sintoma: "Endometriose",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Nac",
        posologia: "600-1800 mg/dia",
        dosagem_maxima: "2400 mg/dia",
        observacoes: "Precursor de glutationa, antioxidante potente."
      },
      {
        nutriente: "Quercetina",
        posologia: "500-1000 mg/dia",
        dosagem_maxima: "2000 mg/dia",
        observacoes: "Anti-inflamatório e anti-histamínico natural."
      },
    ]
  },
  {
    id: 92,
    sintoma: "Impotência / Baixa Libido",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "L-Arginina",
        posologia: "2000-6000 mg/dia",
        dosagem_maxima: "10.000 mg/dia",
        observacoes: "Precursor de óxido nítrico, melhora circulação."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 93,
    sintoma: "Infertilidade Feminina",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
    ]
  },
  {
    id: 94,
    sintoma: "Infertilidade Masculina / Esterilidade",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Selênio",
        posologia: "200 mcg/dia",
        dosagem_maxima: "400 mcg/dia",
        observacoes: "Antioxidante potente. 2 castanhas-do-pará = 200mcg."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "L-Arginina",
        posologia: "2000-6000 mg/dia",
        dosagem_maxima: "10.000 mg/dia",
        observacoes: "Precursor de óxido nítrico, melhora circulação."
      },
    ]
  },
  {
    id: 95,
    sintoma: "Menopausa / Alterações Hormonais",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "K2",
        posologia: "100-200 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Direciona cálcio para ossos, trabalha com vitamina D3."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Cálcio",
        posologia: "1000-1200 mg/dia",
        dosagem_maxima: "2500 mg/dia incluindo dieta",
        observacoes: "Dividir em doses de 500mg. Tomar separado do magnésio."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "Isoflavonas",
        posologia: "40-80 mg/dia",
        dosagem_maxima: "150 mg/dia",
        observacoes: "Fitoestrógenos para sintomas de menopausa."
      },
    ]
  },
  {
    id: 96,
    sintoma: "Ovário Policistico (SOP)",
    sistema: "SISTEMA REPRODUTOR",
    carencias: [
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Cromo",
        posologia: "200-400 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Melhora sensibilidade à insulina."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  // ==========================================
  // SISTEMA VISUAL
  // ==========================================
  {
    id: 97,
    sintoma: "Alterações Na Visão / Visão Noturna",
    sistema: "SISTEMA VISUAL",
    carencias: [
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "Luteina",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Protege visão e mácula."
      },
      {
        nutriente: "Zeaxantina",
        posologia: "2-4 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Trabalha com luteína para saúde ocular."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
    ]
  },
  {
    id: 98,
    sintoma: "Cansaço Ocular",
    sistema: "SISTEMA VISUAL",
    carencias: [
      {
        nutriente: "Luteina",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Protege visão e mácula."
      },
      {
        nutriente: "Zeaxantina",
        posologia: "2-4 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Trabalha com luteína para saúde ocular."
      },
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "C",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "E",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 99,
    sintoma: "Olhos Secos",
    sistema: "SISTEMA VISUAL",
    carencias: [
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "Vitamina E",
        posologia: "400-800 UI/dia",
        dosagem_maxima: "1000 UI/dia",
        observacoes: "Antioxidante lipossolúvel, protege membranas celulares."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
    ]
  },
  {
    id: 100,
    sintoma: "Visão Noturna Ruim",
    sistema: "SISTEMA VISUAL",
    carencias: [
      {
        nutriente: "Vitamina A",
        posologia: "5000-10.000 UI/dia",
        dosagem_maxima: "25.000 UI/dia",
        observacoes: "Essencial para pele, mucosas e visão. Evitar altas doses prolongadas."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Luteina",
        posologia: "10-20 mg/dia",
        dosagem_maxima: "20 mg/dia",
        observacoes: "Protege visão e mácula."
      },
      {
        nutriente: "Zeaxantina",
        posologia: "2-4 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Trabalha com luteína para saúde ocular."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
    ]
  },
  // ==========================================
  // SISTEMA SANGUÍNEO
  // ==========================================
  {
    id: 101,
    sintoma: "Anemia",
    sistema: "SISTEMA SANGUÍNEO",
    carencias: [
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Cobre",
        posologia: "2 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Necessário com suplementação de zinco prolongada."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
    ]
  },
  // ==========================================
  // SISTEMA URINÁRIO
  // ==========================================
  {
    id: 102,
    sintoma: "Enurese",
    sistema: "SISTEMA URINÁRIO",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
    ]
  },
  // ==========================================
  // SONO E ENERGIA
  // ==========================================
  {
    id: 103,
    sintoma: "Acorda Com Sono",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Melatonina",
        posologia: "1-5 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Regulador do sono. Tomar 30min antes de dormir."
      },
    ]
  },
  {
    id: 104,
    sintoma: "Desperta À Noite",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Melatonina",
        posologia: "1-5 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Regulador do sono. Tomar 30min antes de dormir."
      },
    ]
  },
  {
    id: 105,
    sintoma: "Fadiga / Fadiga Crônica / Sem Energia",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "Zinco",
        posologia: "15-30 mg/dia",
        dosagem_maxima: "50 mg/dia",
        observacoes: "Essencial para imunidade. Não exceder dose por período prolongado."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 106,
    sintoma: "Sindrome Da Fadiga Crônica",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B9",
        posologia: "400-800 mcg/dia",
        dosagem_maxima: "1000 mcg/dia",
        observacoes: "Ácido fólico, essencial para divisão celular. Preferir forma metilfolato."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "Vitamina D",
        posologia: "2000-5000 UI/dia",
        dosagem_maxima: "10.000 UI/dia",
        observacoes: "Essencial para imunidade, saúde óssea e modulação hormonal. Tomar com alimentos gordurosos."
      },
      {
        nutriente: "Vitamina C",
        posologia: "1000-2000 mg/dia dividido em 2 doses",
        dosagem_maxima: "3000 mg/dia",
        observacoes: "Antioxidante potente, melhora absorção de ferro. Dividir doses para melhor absorção."
      },
      {
        nutriente: "Omega-3",
        posologia: "1000-3000 mg/dia (EPA+DHA)",
        dosagem_maxima: "4000 mg/dia",
        observacoes: "Anti-inflamatório natural. Tomar com alimentos."
      },
    ]
  },
  {
    id: 107,
    sintoma: "Sono Irregular / Demora A Dormir / Sonolência Diurna / Acorda Com Sono",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "Melatonina",
        posologia: "1-5 mg/dia",
        dosagem_maxima: "10 mg/dia",
        observacoes: "Regulador do sono. Tomar 30min antes de dormir."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "Magnésio",
        posologia: "300-500 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Formas quelato ou glicinato melhor absorvidas. Relaxante natural."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
      {
        nutriente: "Inositol",
        posologia: "2000-4000 mg/dia",
        dosagem_maxima: "18.000 mg/dia",
        observacoes: "Melhora sensibilidade insulínica e SOP."
      },
      {
        nutriente: "Coenzima Q10",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "600 mg/dia",
        observacoes: "Essencial para produção de energia mitocondrial."
      },
    ]
  },
  {
    id: 108,
    sintoma: "Sonolência Durante O Dia",
    sistema: "SONO E ENERGIA",
    carencias: [
      {
        nutriente: "B1",
        posologia: "100-300 mg/dia",
        dosagem_maxima: "300 mg/dia",
        observacoes: "Essencial para metabolismo energético e função nervosa."
      },
      {
        nutriente: "B2",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "400 mg/dia",
        observacoes: "Importante para produção de energia e antioxidante."
      },
      {
        nutriente: "B3",
        posologia: "100-500 mg/dia",
        dosagem_maxima: "1000 mg/dia",
        observacoes: "Participa do metabolismo energético, pode causar flush em doses altas."
      },
      {
        nutriente: "B6",
        posologia: "50-100 mg/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Essencial para neurotransmissores. Doses muito altas podem causar neuropatia."
      },
      {
        nutriente: "B12",
        posologia: "1000-2000 mcg/dia sublingual",
        dosagem_maxima: "2000 mcg/dia",
        observacoes: "Essencial para energia e função nervosa. Forma metilcobalamina é melhor absorvida."
      },
      {
        nutriente: "D",
        posologia: "Conforme orientação profissional",
        dosagem_maxima: "Conforme orientação profissional",
        observacoes: "Consulte um profissional de saúde para dosagem adequada."
      },
      {
        nutriente: "Ferro",
        posologia: "60-100 mg de ferro elementar/dia",
        dosagem_maxima: "200 mg/dia",
        observacoes: "Tomar com vitamina C, evitar com café/chá. Pode causar constipação."
      },
      {
        nutriente: "L-Triptofano",
        posologia: "500-2000 mg/dia",
        dosagem_maxima: "6000 mg/dia",
        observacoes: "Precursor de serotonina. Tomar à noite."
      },
    ]
  },
];

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
