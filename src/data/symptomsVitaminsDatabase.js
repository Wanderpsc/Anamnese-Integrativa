/**
 * Base de Dados: Sintomas → Deficiências de Vitaminas/Minerais
 * Baseado em evidências científicas e correlações clínicas
 */

export const SINTOMAS_DEFICIENCIAS = {
  // PELE E ANEXOS
  'Pele seca': {
    deficiencias: ['Vitamina A', 'Vitamina E', 'Ômega-3', 'Zinco', 'Biotina'],
    severidade: 'moderada'
  },
  'Descamação da pele': {
    deficiencias: ['Vitamina A', 'Vitamina B3', 'Zinco', 'Ácidos graxos essenciais'],
    severidade: 'moderada'
  },
  'Pele áspera': {
    deficiencias: ['Vitamina A', 'Vitamina E', 'Ômega-3'],
    severidade: 'leve'
  },
  'Acne': {
    deficiencias: ['Vitamina A', 'Zinco', 'Vitamina E', 'Ômega-3'],
    severidade: 'moderada'
  },
  'Hiperqueratose folicular': {
    deficiencias: ['Vitamina A', 'Vitamina C', 'Ômega-3'],
    severidade: 'moderada'
  },
  'Queda de cabelo': {
    deficiencias: ['Ferro', 'Biotina', 'Zinco', 'Vitamina D', 'Proteínas'],
    severidade: 'alta'
  },
  'Cabelos quebradiços': {
    deficiencias: ['Biotina', 'Ferro', 'Proteínas', 'Zinco'],
    severidade: 'moderada'
  },
  'Cabelos secos': {
    deficiencias: ['Biotina', 'Ômega-3', 'Vitamina A'],
    severidade: 'leve'
  },
  'Unhas quebradiças': {
    deficiencias: ['Biotina', 'Ferro', 'Cálcio', 'Zinco', 'Proteínas'],
    severidade: 'moderada'
  },
  'Manchas brancas nas unhas': {
    deficiencias: ['Zinco', 'Cálcio'],
    severidade: 'leve'
  },
  'Dermatite seborreica': {
    deficiencias: ['Vitamina B2', 'Vitamina B6', 'Biotina', 'Zinco'],
    severidade: 'moderada'
  },
  'Eczema': {
    deficiencias: ['Ômega-3', 'Vitamina E', 'Vitamina D', 'Zinco'],
    severidade: 'alta'
  },

  // OLHOS
  'Cegueira noturna': {
    deficiencias: ['Vitamina A', 'Zinco'],
    severidade: 'alta'
  },
  'Olhos secos': {
    deficiencias: ['Vitamina A', 'Ômega-3', 'Vitamina D'],
    severidade: 'moderada'
  },
  'Fotofobia': {
    deficiencias: ['Vitamina A', 'Vitamina B2', 'Magnésio'],
    severidade: 'moderada'
  },
  'Conjuntivite recorrente': {
    deficiencias: ['Vitamina A', 'Vitamina C', 'Zinco'],
    severidade: 'moderada'
  },

  // BOCA E LÍNGUA
  'Queilite angular (rachaduras nos cantos da boca)': {
    deficiencias: ['Vitamina B2', 'Vitamina B6', 'Ferro', 'Zinco'],
    severidade: 'moderada'
  },
  'Língua lisa e brilhante': {
    deficiencias: ['Vitamina B12', 'Ferro', 'Ácido fólico'],
    severidade: 'alta'
  },
  'Língua inchada': {
    deficiencias: ['Vitamina B12', 'Vitamina B3'],
    severidade: 'alta'
  },
  'Glossite': {
    deficiencias: ['Vitamina B2', 'Vitamina B3', 'Vitamina B12', 'Ferro'],
    severidade: 'alta'
  },
  'Gengivite': {
    deficiencias: ['Vitamina C', 'Coenzima Q10'],
    severidade: 'moderada'
  },
  'Sangramento gengival': {
    deficiencias: ['Vitamina C', 'Vitamina K'],
    severidade: 'alta'
  },
  'Aftas recorrentes': {
    deficiencias: ['Vitamina B12', 'Ferro', 'Zinco', 'Ácido fólico'],
    severidade: 'moderada'
  },

  // SISTEMA NERVOSO
  'Fadiga crônica': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Vitamina D', 'Magnésio', 'Coenzima Q10'],
    severidade: 'alta'
  },
  'Fraqueza muscular': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Potássio', 'Vitamina B1'],
    severidade: 'alta'
  },
  'Cãibras musculares': {
    deficiencias: ['Magnésio', 'Cálcio', 'Potássio', 'Vitamina D'],
    severidade: 'moderada'
  },
  'Formigamento nas mãos e pés': {
    deficiencias: ['Vitamina B12', 'Vitamina B6', 'Magnésio', 'Cálcio'],
    severidade: 'alta'
  },
  'Dormência': {
    deficiencias: ['Vitamina B12', 'Vitamina B1', 'Magnésio'],
    severidade: 'alta'
  },
  'Tremores': {
    deficiencias: ['Vitamina B1', 'Magnésio', 'Vitamina B12'],
    severidade: 'alta'
  },
  'Dificuldade de concentração': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Ômega-3', 'Vitamina D'],
    severidade: 'alta'
  },
  'Perda de memória': {
    deficiencias: ['Vitamina B12', 'Ômega-3', 'Vitamina D', 'Ferro'],
    severidade: 'alta'
  },
  'Confusão mental': {
    deficiencias: ['Vitamina B1', 'Vitamina B12', 'Ferro'],
    severidade: 'alta'
  },
  'Tontura': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Vitamina D'],
    severidade: 'moderada'
  },

  // HUMOR E PSICOLÓGICO
  'Depressão': {
    deficiencias: ['Vitamina D', 'Vitamina B12', 'Ômega-3', 'Magnésio', 'Ferro'],
    severidade: 'alta'
  },
  'Ansiedade': {
    deficiencias: ['Magnésio', 'Vitamina B6', 'Vitamina D', 'Ômega-3'],
    severidade: 'alta'
  },
  'Irritabilidade': {
    deficiencias: ['Magnésio', 'Vitamina B6', 'Ferro', 'Vitamina D'],
    severidade: 'moderada'
  },
  'Mudanças de humor': {
    deficiencias: ['Vitamina B6', 'Ômega-3', 'Magnésio'],
    severidade: 'moderada'
  },
  'Insônia': {
    deficiencias: ['Magnésio', 'Vitamina D', 'Vitamina B6', 'Cálcio'],
    severidade: 'alta'
  },

  // SISTEMA IMUNOLÓGICO
  'Infecções frequentes': {
    deficiencias: ['Vitamina D', 'Vitamina C', 'Zinco', 'Vitamina A'],
    severidade: 'alta'
  },
  'Cicatrização lenta': {
    deficiencias: ['Vitamina C', 'Zinco', 'Proteínas', 'Vitamina A'],
    severidade: 'alta'
  },
  'Resfriados frequentes': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },

  // SISTEMA CARDIOVASCULAR
  'Palpitações': {
    deficiencias: ['Magnésio', 'Potássio', 'Coenzima Q10', 'Vitamina B1'],
    severidade: 'alta'
  },
  'Falta de ar': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Coenzima Q10'],
    severidade: 'alta'
  },

  // SISTEMA DIGESTIVO
  'Perda de apetite': {
    deficiencias: ['Zinco', 'Vitamina B1', 'Ferro'],
    severidade: 'moderada'
  },
  'Náuseas': {
    deficiencias: ['Vitamina B6', 'Magnésio'],
    severidade: 'moderada'
  },
  'Diarreia': {
    deficiencias: ['Zinco', 'Vitamina A', 'Niacina'],
    severidade: 'moderada'
  },
  'Constipação': {
    deficiencias: ['Magnésio', 'Vitamina D', 'Fibras'],
    severidade: 'moderada'
  },

  // SISTEMA ÓSSEO
  'Dor óssea': {
    deficiencias: ['Vitamina D', 'Cálcio', 'Magnésio'],
    severidade: 'alta'
  },
  'Osteoporose': {
    deficiencias: ['Vitamina D', 'Cálcio', 'Vitamina K2', 'Magnésio'],
    severidade: 'alta'
  },
  'Fraturas frequentes': {
    deficiencias: ['Vitamina D', 'Cálcio', 'Vitamina K2'],
    severidade: 'alta'
  },

  // SANGUE
  'Anemia': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Ácido fólico', 'Vitamina B6'],
    severidade: 'alta'
  },
  'Palidez': {
    deficiencias: ['Ferro', 'Vitamina B12', 'Ácido fólico'],
    severidade: 'alta'
  },
  'Hematomas fáceis': {
    deficiencias: ['Vitamina C', 'Vitamina K', 'Zinco'],
    severidade: 'moderada'
  },

  // OUTROS
  'Visão turva': {
    deficiencias: ['Vitamina A', 'Vitamina B2', 'Ômega-3'],
    severidade: 'alta'
  },
  'Perda de paladar': {
    deficiencias: ['Zinco', 'Vitamina A'],
    severidade: 'moderada'
  },
  'Perda de olfato': {
    deficiencias: ['Zinco', 'Vitamina A'],
    severidade: 'moderada'
  },
  'Crescimento lento (crianças)': {
    deficiencias: ['Zinco', 'Vitamina D', 'Proteínas', 'Ferro'],
    severidade: 'alta'
  },

  // SINTOMAS ADICIONAIS DA PLANILHA
  'Alternações intestinais': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Ferro', 'Magnésio', 'Glutamina'],
    severidade: 'moderada'
  },
  'Diarreia': {
    deficiencias: ['Zinco', 'Iodo', 'Glutamina'],
    severidade: 'moderada'
  },
  'Cólicas intestinais': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Cálcio'],
    severidade: 'moderada'
  },
  'Flatulências': {
    deficiencias: ['Glutamina'],
    severidade: 'leve'
  },
  'Intestino irritável': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Glutamina'],
    severidade: 'moderada'
  },
  'Apetite irregular': {
    deficiencias: ['Vitamina A', 'Vitamina B1', 'Vitamina B3', 'Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Ferro', 'Magnésio', 'Zinco', 'Cromo', 'Quercetina'],
    severidade: 'moderada'
  },
  'Náuseas': {
    deficiencias: ['Vitamina B6', 'Magnésio'],
    severidade: 'leve'
  },
  'Má digestão': {
    deficiencias: ['Magnésio', 'Zinco', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Imunidade baixa': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Manganês', 'Selênio', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Alterações de pele': {
    deficiencias: ['Vitamina A', 'Vitamina B3', 'Vitamina B5', 'Vitamina E', 'Zinco', 'Ômega-3', 'Manganês', 'Selênio', 'Iodo'],
    severidade: 'moderada'
  },
  'Unhas fracas': {
    deficiencias: ['Vitamina A', 'Vitamina B5', 'Biotina', 'Vitamina E', 'Ferro', 'Zinco', 'Ômega-3', 'Silício'],
    severidade: 'moderada'
  },
  'Hematomas fáceis': {
    deficiencias: ['Vitamina B5', 'Vitamina C', 'Vitamina K2'],
    severidade: 'moderada'
  },
  'Sudorese excessiva': {
    deficiencias: ['Vitamina D', 'Magnésio'],
    severidade: 'leve'
  },
  'Tontura / Vertigem': {
    deficiencias: ['Vitamina B2', 'Vitamina B3', 'Vitamina B5', 'Vitamina B6', 'Vitamina B12', 'Vitamina D', 'Ferro', 'Magnésio', 'Iodo'],
    severidade: 'alta'
  },
  'Enxaqueca': {
    deficiencias: ['Vitamina B5', 'Biotina', 'Magnésio', 'Zinco', 'Coenzima Q10', 'Quercetina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Alterações de visão': {
    deficiencias: ['Vitamina A', 'Vitamina B2'],
    severidade: 'alta'
  },
  'Má memória': {
    deficiencias: ['Vitamina A', 'Vitamina B1', 'Vitamina B3', 'Vitamina B5', 'Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Vitamina K2', 'Magnésio', 'Zinco', 'Ômega-3', 'Cromo'],
    severidade: 'alta'
  },
  'Má concentração': {
    deficiencias: ['Vitamina A', 'Vitamina B5', 'Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Vitamina E', 'Ferro', 'Magnésio', 'Zinco', 'Ômega-3', 'Cromo', 'Coenzima Q10', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Sem energia': {
    deficiencias: ['Vitamina B5', 'Vitamina B12', 'Vitamina C', 'Ferro', 'Magnésio', 'Iodo', 'Coenzima Q10', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Pessimismo / Depressão': {
    deficiencias: ['Vitamina B5', 'Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Iodo', 'L-triptofano'],
    severidade: 'alta'
  },
  'Alterações de humor': {
    deficiencias: ['Vitamina B1', 'Vitamina B3', 'Vitamina B5', 'Vitamina B6', 'Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Coenzima Q10', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Ansiedade': {
    deficiencias: ['Vitamina B5', 'Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Iodo', 'Quercetina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Sono irregular': {
    deficiencias: ['Biotina', 'Magnésio', 'L-triptofano', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Demora para dormir': {
    deficiencias: ['Vitamina A', 'Vitamina B1', 'Vitamina B3', 'Vitamina B9', 'Vitamina C', 'Vitamina D', 'Ferro', 'Magnésio', 'L-triptofano'],
    severidade: 'moderada'
  },
  'Desperta à noite': {
    deficiencias: ['Vitamina D', 'Magnésio', 'L-triptofano'],
    severidade: 'moderada'
  },
  'Sonolência no dia': {
    deficiencias: ['Vitamina B1', 'Vitamina B2', 'Vitamina B3', 'Vitamina B6', 'Vitamina B12', 'Vitamina D', 'Ferro', 'L-triptofano'],
    severidade: 'moderada'
  },
  'Acorda com sono': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio', 'L-triptofano'],
    severidade: 'leve'
  },
  'Enurese': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio'],
    severidade: 'moderada'
  },
  'Infecções de repetição': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Magnésio', 'Zinco', 'Quercetina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Infecções vias aéreas': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Vitamina E', 'Magnésio', 'Zinco', 'Ômega-3', 'Manganês', 'Selênio', 'Glutamina', 'Quercetina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Herpes': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },
  'Alergias': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Quercetina'],
    severidade: 'moderada'
  },
  'Alergias temporais': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Glutamina', 'Quercetina'],
    severidade: 'moderada'
  },
  'Alteração de pressão': {
    deficiencias: ['Magnésio', 'Iodo', 'Coenzima Q10'],
    severidade: 'alta'
  },
  'Edemas pernas': {
    deficiencias: ['Vitamina C', 'Vitamina E', 'Ferro', 'Magnésio', 'Iodo'],
    severidade: 'moderada'
  },
  'Pernas cansadas': {
    deficiencias: ['Vitamina B12', 'Vitamina E', 'Cromo', 'Coenzima Q10'],
    severidade: 'moderada'
  },
  'Cãibras': {
    deficiencias: ['Vitamina B1', 'Vitamina B5', 'Vitamina B6', 'Vitamina K2', 'Magnésio', 'Cálcio', 'Manganês', 'Iodo'],
    severidade: 'moderada'
  },
  'Frio nas extremidades': {
    deficiencias: ['Vitamina B12', 'Vitamina E', 'Ferro', 'Magnésio', 'Iodo'],
    severidade: 'moderada'
  },
  'Arritmias': {
    deficiencias: ['Magnésio', 'Coenzima Q10'],
    severidade: 'alta'
  },
  'Formigamento': {
    deficiencias: ['Vitamina B5', 'Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Magnésio', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Dores na coluna': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio', 'Cálcio', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Dores musculares': {
    deficiencias: ['Vitamina B1', 'Vitamina B3', 'Vitamina B6', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Selênio', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Dores articulares': {
    deficiencias: ['Vitamina B2', 'Vitamina B6', 'Vitamina C', 'Magnésio', 'Cálcio', 'Manganês'],
    severidade: 'moderada'
  },
  'Estresse exarcebado': {
    deficiencias: ['Vitamina B5', 'Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Magnésio', 'L-triptofano', 'Glutamina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Burnout': {
    deficiencias: ['Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Magnésio'],
    severidade: 'alta'
  },
  'Distress / Eustress': {
    deficiencias: ['Vitamina B6', 'Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Magnésio', 'Zinco'],
    severidade: 'alta'
  },
  'Impotência': {
    deficiencias: ['Vitamina B9', 'Vitamina D', 'Zinco'],
    severidade: 'alta'
  },
  'Menopausa': {
    deficiencias: ['Vitamina D', 'Vitamina K2', 'Magnésio', 'Cálcio'],
    severidade: 'moderada'
  },
  'Esterilidade': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina C', 'Vitamina D', 'Vitamina E', 'Zinco', 'Coenzima Q10', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Fadiga crônica': {
    deficiencias: ['Vitamina B5', 'Vitamina B12', 'Vitamina D', 'Ferro', 'Magnésio', 'Melatonina'],
    severidade: 'alta'
  },
  'Irritabilidade': {
    deficiencias: ['Vitamina B6', 'Magnésio', 'Zinco'],
    severidade: 'moderada'
  },
  'Hipotireoidismo': {
    deficiencias: ['Vitamina A', 'Vitamina D', 'Selênio', 'Iodo', 'N-acetilcisteína'],
    severidade: 'alta'
  },
  'Dor de cabeça frequente': {
    deficiencias: ['Vitamina B2', 'Magnésio', 'Coenzima Q10'],
    severidade: 'moderada'
  },
  'Infertilidade masculina': {
    deficiencias: ['Vitamina B9', 'Vitamina E', 'Zinco', 'Selênio', 'L-arginina'],
    severidade: 'alta'
  },
  'Infertilidade feminina': {
    deficiencias: ['Vitamina B9', 'Vitamina D', 'Vitamina E', 'Zinco'],
    severidade: 'alta'
  },
  'Artrite reumatoide': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Cálcio'],
    severidade: 'alta'
  },
  'Psoríase': {
    deficiencias: ['Vitamina D', 'Vitamina E', 'Ômega-3', 'Selênio'],
    severidade: 'moderada'
  },
  'Tontura ao levantar': {
    deficiencias: ['Vitamina B12', 'Ferro', 'Potássio'],
    severidade: 'moderada'
  },
  'Episódios de perda de memória': {
    deficiencias: ['Vitamina B12', 'Vitamina E', 'Ômega-3'],
    severidade: 'alta'
  },
  'Rachaduras nos lábios': {
    deficiencias: ['Vitamina B2', 'Vitamina B3', 'Ferro'],
    severidade: 'leve'
  },
  'Cãibras noturnas': {
    deficiencias: ['Vitamina B5', 'Magnésio', 'Cálcio', 'Potássio'],
    severidade: 'moderada'
  },
  'Confusão mental': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Ômega-3'],
    severidade: 'alta'
  },
  'Dificuldade ganho de massa': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio'],
    severidade: 'moderada'
  },
  'Dor de garganta recorrente': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },
  'Sensibilidade ao frio': {
    deficiencias: ['Vitamina B12', 'Ferro', 'Selênio', 'Iodo'],
    severidade: 'moderada'
  },
  'Apatia': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina D'],
    severidade: 'moderada'
  },
  'Problemas de cicatrização': {
    deficiencias: ['Vitamina A', 'Vitamina B5', 'Vitamina C', 'Zinco'],
    severidade: 'alta'
  },
  'Hemorragias gengivais': {
    deficiencias: ['Vitamina C', 'Vitamina K2', 'Coenzima Q10'],
    severidade: 'moderada'
  },
  'Visão noturna ruim': {
    deficiencias: ['Vitamina A', 'Vitamina E', 'Zinco', 'Luteína', 'Zeaxantina'],
    severidade: 'alta'
  },
  'Dor articular': {
    deficiencias: ['Vitamina D', 'Ômega-3', 'Glutamina', 'Ácido Alfa Lipóico'],
    severidade: 'moderada'
  },
  'Hipoglicemia': {
    deficiencias: ['Vitamina B6', 'Magnésio', 'Cromo'],
    severidade: 'moderada'
  },
  'Diabetes tipo 2': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Cromo'],
    severidade: 'alta'
  },
  'Ovário policístico': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Quercetina', 'Inositol'],
    severidade: 'alta'
  },
  'Endometriose': {
    deficiencias: ['Vitamina D', 'Vitamina E', 'Magnésio', 'Ômega-3'],
    severidade: 'alta'
  },
  'Alergias alimentares': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },
  'Cansaço ocular': {
    deficiencias: ['Vitamina A', 'Vitamina B2', 'Vitamina E', 'Magnésio', 'Selênio', 'Silício', 'Luteína', 'Zeaxantina'],
    severidade: 'moderada'
  },
  'Dermatite': {
    deficiencias: ['Vitamina B2', 'Vitamina B3', 'Vitamina B5', 'Zinco', 'Ômega-3', 'Glutamina'],
    severidade: 'moderada'
  },
  'Desconforto abdominal': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Magnésio', 'Glutamina'],
    severidade: 'moderada'
  },
  'Caspa': {
    deficiencias: ['Vitamina B6', 'Zinco', 'Ômega-3', 'Quercetina'],
    severidade: 'leve'
  },
  'Hiperpigmentação': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina E'],
    severidade: 'leve'
  },
  'Bruxismo': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Cálcio'],
    severidade: 'moderada'
  },
  'Hipertensão': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'L-arginina'],
    severidade: 'alta'
  },
  'Boca seca': {
    deficiencias: ['Vitamina A', 'Vitamina B2', 'Zinco'],
    severidade: 'leve'
  },
  'Pernas inquietas': {
    deficiencias: ['Vitamina B12', 'Ferro', 'Magnésio'],
    severidade: 'moderada'
  },
  'Síndrome metabólica': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Ômega-3', 'Cromo'],
    severidade: 'alta'
  },
  'Depressão pós-parto': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Ômega-3', 'Cromo', 'Glutamina', 'Ácido Alfa Lipóico'],
    severidade: 'alta'
  },
  'Doença de Crohn': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio', 'Zinco', 'Glutamina'],
    severidade: 'alta'
  },
  'Celíaco': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Ferro', 'Zinco'],
    severidade: 'alta'
  },
  'Cólica menstrual intensa': {
    deficiencias: ['Vitamina B6', 'Vitamina E', 'Magnésio', 'Ômega-3'],
    severidade: 'moderada'
  },
  'Sensibilidade ao calor': {
    deficiencias: ['Vitamina D', 'Magnésio', 'Selênio', 'Iodo', 'Luteína', 'Zeaxantina'],
    severidade: 'moderada'
  },
  'Rachaduras canto da boca': {
    deficiencias: ['Vitamina B2', 'Vitamina B6', 'Ferro', 'Zinco'],
    severidade: 'moderada'
  },
  'Síndrome fadiga crônica': {
    deficiencias: ['Vitamina B5', 'Vitamina B12', 'Vitamina D', 'Magnésio', 'Coenzima Q10'],
    severidade: 'alta'
  },
  'Esclerose múltipla': {
    deficiencias: ['Vitamina B12', 'Vitamina D', 'Magnésio', 'Ômega-3', 'N-acetilcisteína'],
    severidade: 'alta'
  },
  'Desmineralização óssea': {
    deficiencias: ['Vitamina D', 'Vitamina K2', 'Magnésio', 'Cálcio'],
    severidade: 'alta'
  },
  'Perda de apetite': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },
  'Fraturas frequentes': {
    deficiencias: ['Vitamina D', 'Vitamina K2', 'Magnésio', 'Cálcio'],
    severidade: 'alta'
  },
  'Baixa libido': {
    deficiencias: ['Vitamina B6', 'Vitamina D', 'Zinco', 'L-arginina'],
    severidade: 'moderada'
  },
  'Pele amarelada': {
    deficiencias: ['Vitamina A', 'Vitamina B12', 'Vitamina C'],
    severidade: 'moderada'
  },
  'Infecção urinária recorrente': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco'],
    severidade: 'moderada'
  },
  'Perda de massa óssea': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Vitamina K2', 'Magnésio', 'Cálcio'],
    severidade: 'alta'
  },
  'Síndrome intestino permeável': {
    deficiencias: ['Vitamina B9', 'Vitamina D', 'Zinco', 'Glutamina'],
    severidade: 'alta'
  },
  'Sinusite crônica': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco', 'Quercetina', 'N-acetilcisteína'],
    severidade: 'moderada'
  },
  'Depressão sazonal': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina D', 'Magnésio', 'Ômega-3', 'Melatonina'],
    severidade: 'alta'
  },
  'Hipoglicemia reativa': {
    deficiencias: ['Vitamina B3', 'Magnésio', 'Cromo'],
    severidade: 'moderada'
  },
  'Problemas de crescimento': {
    deficiencias: ['Vitamina A', 'Vitamina D', 'Zinco'],
    severidade: 'alta'
  },
  'Tendinite': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Magnésio', 'Ômega-3'],
    severidade: 'moderada'
  },
  'Parkinson': {
    deficiencias: ['Vitamina B6', 'Vitamina D', 'Coenzima Q10'],
    severidade: 'alta'
  },
  'Neuropatia periférica': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Vitamina E', 'Ômega-3', 'N-acetilcisteína'],
    severidade: 'alta'
  },
  'Osteomalacia': {
    deficiencias: ['Vitamina D', 'Vitamina K2', 'Magnésio', 'Cálcio'],
    severidade: 'alta'
  },
  'Pielonefrite': {
    deficiencias: ['Vitamina C', 'Vitamina D', 'Zinco', 'Ômega-3'],
    severidade: 'moderada'
  },
  'Rosácea': {
    deficiencias: ['Vitamina B2', 'Vitamina B5', 'Vitamina C', 'Zinco', 'Ômega-3', 'Silício'],
    severidade: 'moderada'
  },
  'Distúrbio bipolar': {
    deficiencias: ['Vitamina B9', 'Vitamina B12', 'Magnésio', 'Ômega-3', 'Melatonina', 'N-acetilcisteína'],
    severidade: 'alta'
  },
  'Esquizofrenia': {
    deficiencias: ['Vitamina B3', 'Vitamina D', 'Zinco', 'Ômega-3', 'Melatonina', 'N-acetilcisteína'],
    severidade: 'alta'
  }
};

/**
 * Dosagens recomendadas para suplementação
 * Baseadas em evidências científicas e protocolos funcionais
 */
export const DOSAGENS_SUPLEMENTACAO = {
  'Vitamina A': {
    deficiencia: {
      dose: '10.000 - 25.000 UI/dia',
      duracao: '1-3 meses',
      forma: 'Retinol ou Beta-caroteno',
      observacao: 'Não ultrapassar 10.000 UI/dia em gestantes'
    },
    manutencao: {
      dose: '5.000 UI/dia',
      forma: 'Beta-caroteno preferencial'
    }
  },
  'Vitamina B1': {
    deficiencia: {
      dose: '100-300 mg/dia',
      duracao: '1-2 meses',
      forma: 'Tiamina',
      observacao: 'Casos graves: tiamina IM/IV'
    },
    manutencao: {
      dose: '25-50 mg/dia',
      forma: 'Complexo B'
    }
  },
  'Vitamina B2': {
    deficiencia: {
      dose: '50-100 mg/dia',
      duracao: '1-2 meses',
      forma: 'Riboflavina'
    },
    manutencao: {
      dose: '25 mg/dia',
      forma: 'Complexo B'
    }
  },
  'Vitamina B3': {
    deficiencia: {
      dose: '100-500 mg/dia',
      duracao: '1-2 meses',
      forma: 'Niacina ou Niacinamida',
      observacao: 'Niacina pode causar flush'
    },
    manutencao: {
      dose: '50 mg/dia',
      forma: 'Niacinamida'
    }
  },
  'Vitamina B6': {
    deficiencia: {
      dose: '50-100 mg/dia',
      duracao: '1-2 meses',
      forma: 'Piridoxina ou P5P',
      observacao: 'Não ultrapassar 200mg/dia (toxicidade)'
    },
    manutencao: {
      dose: '25-50 mg/dia',
      forma: 'P5P (forma ativa)'
    }
  },
  'Vitamina B12': {
    deficiencia: {
      dose: '1.000-2.000 mcg/dia (oral) ou 1.000 mcg IM semanal',
      duracao: '2-3 meses',
      forma: 'Metilcobalamina ou Cianocobalamina',
      observacao: 'Casos graves: IM preferencial'
    },
    manutencao: {
      dose: '500-1.000 mcg/dia',
      forma: 'Metilcobalamina sublingual'
    }
  },
  'Ácido fólico': {
    deficiencia: {
      dose: '1-5 mg/dia',
      duracao: '2-3 meses',
      forma: 'Ácido fólico ou Metilfolato',
      observacao: 'Gestantes: 400-800 mcg/dia'
    },
    manutencao: {
      dose: '400-800 mcg/dia',
      forma: 'Metilfolato (forma ativa)'
    }
  },
  'Biotina': {
    deficiencia: {
      dose: '5-10 mg/dia',
      duracao: '2-3 meses',
      forma: 'Biotina'
    },
    manutencao: {
      dose: '2.5-5 mg/dia',
      forma: 'Biotina'
    }
  },
  'Vitamina C': {
    deficiencia: {
      dose: '500-2.000 mg/dia',
      duracao: '1-2 meses',
      forma: 'Ácido ascórbico',
      observacao: 'Dividir em 2-3 tomadas'
    },
    manutencao: {
      dose: '500-1.000 mg/dia',
      forma: 'Ácido ascórbico ou Ester-C'
    }
  },
  'Vitamina D': {
    deficiencia: {
      dose: '5.000-10.000 UI/dia',
      duracao: '2-3 meses',
      forma: 'Colecalciferol (D3)',
      observacao: 'Dosar níveis após 3 meses'
    },
    manutencao: {
      dose: '2.000-4.000 UI/dia',
      forma: 'Colecalciferol (D3)'
    }
  },
  'Vitamina E': {
    deficiencia: {
      dose: '400-800 UI/dia',
      duracao: '2-3 meses',
      forma: 'Mixed tocoferóis',
      observacao: 'Preferir forma natural (d-alfa)'
    },
    manutencao: {
      dose: '200-400 UI/dia',
      forma: 'Mixed tocoferóis'
    }
  },
  'Vitamina K2': {
    deficiencia: {
      dose: '100-200 mcg/dia',
      duracao: '3-6 meses',
      forma: 'MK-7',
      observacao: 'Importante cofator da vitamina D'
    },
    manutencao: {
      dose: '100 mcg/dia',
      forma: 'MK-7'
    }
  },
  'Ferro': {
    deficiencia: {
      dose: '60-120 mg/dia',
      duracao: '3-6 meses',
      forma: 'Ferro quelato ou bisglicinato',
      observacao: 'Tomar com vitamina C, longe de café/chá'
    },
    manutencao: {
      dose: '30 mg/dia',
      forma: 'Ferro quelato'
    }
  },
  'Cálcio': {
    deficiencia: {
      dose: '1.000-1.500 mg/dia',
      duracao: '3-6 meses',
      forma: 'Citrato ou carbonato de cálcio',
      observacao: 'Dividir em 2-3 tomadas, máx 500mg/vez'
    },
    manutencao: {
      dose: '500-1.000 mg/dia',
      forma: 'Citrato de cálcio'
    }
  },
  'Magnésio': {
    deficiencia: {
      dose: '400-800 mg/dia',
      duracao: '2-3 meses',
      forma: 'Glicinato ou treonato de magnésio',
      observacao: 'Óxido causa diarreia, evitar'
    },
    manutencao: {
      dose: '300-400 mg/dia',
      forma: 'Glicinato ou treonato'
    }
  },
  'Zinco': {
    deficiencia: {
      dose: '30-50 mg/dia',
      duracao: '2-3 meses',
      forma: 'Picolinato ou glicinato de zinco',
      observacao: 'Tomar longe das refeições'
    },
    manutencao: {
      dose: '15-30 mg/dia',
      forma: 'Picolinato de zinco'
    }
  },
  'Potássio': {
    deficiencia: {
      dose: 'Via alimentação ou suplemento prescrito',
      duracao: 'Conforme orientação médica',
      forma: 'Citrato ou cloreto de potássio',
      observacao: 'ATENÇÃO: Suplementos >99mg requerem prescrição'
    },
    manutencao: {
      dose: 'Alimentação rica em potássio',
      forma: 'Banana, abacate, batata'
    }
  },
  'Ômega-3': {
    deficiencia: {
      dose: '2-4 g/dia (EPA+DHA)',
      duracao: '3-6 meses',
      forma: 'Óleo de peixe ou algas',
      observacao: 'Preferir EPA:DHA 2:1'
    },
    manutencao: {
      dose: '1-2 g/dia',
      forma: 'Óleo de peixe'
    }
  },
  'Coenzima Q10': {
    deficiencia: {
      dose: '100-300 mg/dia',
      duracao: '2-3 meses',
      forma: 'Ubiquinol (forma reduzida)',
      observacao: 'Tomar com gordura para melhor absorção'
    },
    manutencao: {
      dose: '100 mg/dia',
      forma: 'Ubiquinol'
    }
  },
  'Proteínas': {
    deficiencia: {
      dose: '1.2-1.5 g/kg peso/dia',
      duracao: 'Contínuo',
      forma: 'Alimentos ou whey protein',
      observacao: 'Distribuir ao longo do dia'
    },
    manutencao: {
      dose: '0.8-1.0 g/kg peso/dia',
      forma: 'Alimentos variados'
    }
  },
  'Fibras': {
    deficiencia: {
      dose: '25-35 g/dia',
      duracao: 'Contínuo',
      forma: 'Psyllium, linhaça, chia',
      observacao: 'Aumentar água simultaneamente'
    },
    manutencao: {
      dose: '25 g/dia',
      forma: 'Alimentação rica em vegetais'
    }
  },
  'L-triptofano': {
    deficiencia: {
      dose: '500-2.000 mg/dia',
      duracao: '2-3 meses',
      forma: 'L-triptofano',
      observacao: 'Tomar 30-60 min antes de dormir ou conforme orientação'
    },
    manutencao: {
      dose: '500-1.000 mg/dia',
      forma: 'L-triptofano'
    }
  },
  'Glutamina': {
    deficiencia: {
      dose: '5-15 g/dia',
      duracao: '2-6 meses',
      forma: 'L-glutamina',
      observacao: 'Dividir em 2-3 doses, tomar em jejum'
    },
    manutencao: {
      dose: '3-5 g/dia',
      forma: 'L-glutamina'
    }
  },
  'Quercetina': {
    deficiencia: {
      dose: '500-1.000 mg/dia',
      duracao: '2-3 meses',
      forma: 'Quercetina',
      observacao: 'Tomar com gordura para melhor absorção'
    },
    manutencao: {
      dose: '250-500 mg/dia',
      forma: 'Quercetina'
    }
  },
  'Ácido Alfa Lipóico': {
    deficiencia: {
      dose: '300-600 mg/dia',
      duracao: '2-3 meses',
      forma: 'Ácido alfa-lipóico',
      observacao: 'Tomar em jejum ou 30 min antes das refeições'
    },
    manutencao: {
      dose: '200-300 mg/dia',
      forma: 'Ácido alfa-lipóico'
    }
  },
  'Boro': {
    deficiencia: {
      dose: '3-6 mg/dia',
      duracao: '2-3 meses',
      forma: 'Borato de sódio',
      observacao: 'Importante para metabolismo ósseo e hormonal'
    },
    manutencao: {
      dose: '1-3 mg/dia',
      forma: 'Borato de sódio'
    }
  },
  'Luteína': {
    deficiencia: {
      dose: '10-20 mg/dia',
      duracao: '3-6 meses',
      forma: 'Luteína',
      observacao: 'Tomar com gordura para melhor absorção'
    },
    manutencao: {
      dose: '6-10 mg/dia',
      forma: 'Luteína'
    }
  },
  'Zeaxantina': {
    deficiencia: {
      dose: '4-10 mg/dia',
      duracao: '3-6 meses',
      forma: 'Zeaxantina',
      observacao: 'Geralmente combinada com luteína'
    },
    manutencao: {
      dose: '2-4 mg/dia',
      forma: 'Zeaxantina'
    }
  },
  'Inositol': {
    deficiencia: {
      dose: '2-4 g/dia',
      duracao: '3-6 meses',
      forma: 'Mio-inositol',
      observacao: 'Importante para ovário policístico e ansiedade'
    },
    manutencao: {
      dose: '1-2 g/dia',
      forma: 'Mio-inositol'
    }
  },
  'L-arginina': {
    deficiencia: {
      dose: '3-6 g/dia',
      duracao: '2-3 meses',
      forma: 'L-arginina',
      observacao: 'Dividir em 2-3 doses, tomar em jejum'
    },
    manutencao: {
      dose: '2-3 g/dia',
      forma: 'L-arginina'
    }
  },
  'Melatonina': {
    deficiencia: {
      dose: '1-10 mg/dia',
      duracao: 'Conforme necessário',
      forma: 'Melatonina',
      observacao: 'Tomar 30-60 min antes de dormir'
    },
    manutencao: {
      dose: '0,5-3 mg/dia',
      forma: 'Melatonina'
    }
  },
  'N-acetilcisteína': {
    deficiencia: {
      dose: '600-1.800 mg/dia',
      duracao: '2-3 meses',
      forma: 'N-acetilcisteína (NAC)',
      observacao: 'Precursor de glutationa, potente antioxidante'
    },
    manutencao: {
      dose: '600 mg/dia',
      forma: 'NAC'
    }
  },
  'Iodo': {
    deficiencia: {
      dose: '150-1.100 mcg/dia',
      duracao: '2-3 meses',
      forma: 'Iodeto de potássio',
      observacao: 'Monitorar função tireoidiana, evitar em hipertireoidismo'
    },
    manutencao: {
      dose: '150-300 mcg/dia',
      forma: 'Iodeto de potássio'
    }
  },
  'Silício': {
    deficiencia: {
      dose: '150-500 mg/dia',
      duracao: '3-6 meses',
      forma: 'Exsynutriment ou ácido ortossilícico',
      observacao: 'Importante para cabelo, pele, unhas e ossos'
    },
    manutencao: {
      dose: '100-200 mg/dia',
      forma: 'Exsynutriment'
    }
  },
  'Manganês': {
    deficiencia: {
      dose: '5-15 mg/dia',
      duracao: '2-3 meses',
      forma: 'Sulfato ou glicinato de manganês',
      observacao: 'Importante para ossos e metabolismo'
    },
    manutencao: {
      dose: '2-5 mg/dia',
      forma: 'Glicinato de manganês'
    }
  }
};

/**
 * Agrupa sintomas por categoria
 */
export const CATEGORIAS_SINTOMAS = {
  'Pele, Cabelos e Unhas': [
    'Pele seca',
    'Descamação da pele',
    'Pele áspera',
    'Acne',
    'Hiperqueratose folicular',
    'Queda de cabelo',
    'Cabelos quebradiços',
    'Cabelos secos',
    'Unhas quebradiças',
    'Unhas fracas',
    'Manchas brancas nas unhas',
    'Dermatite seborreica',
    'Dermatite',
    'Eczema',
    'Alterações de pele',
    'Pele amarelada',
    'Psoríase',
    'Rosácea',
    'Caspa',
    'Hiperpigmentação',
    'Problemas de cicatrização'
  ],
  'Olhos': [
    'Cegueira noturna',
    'Olhos secos',
    'Fotofobia',
    'Conjuntivite recorrente',
    'Visão turva',
    'Alterações de visão',
    'Visão noturna ruim',
    'Cansaço ocular'
  ],
  'Boca e Língua': [
    'Queilite angular (rachaduras nos cantos da boca)',
    'Rachaduras nos lábios',
    'Rachaduras canto da boca',
    'Língua lisa e brilhante',
    'Língua inchada',
    'Glossite',
    'Gengivite',
    'Sangramento gengival',
    'Hemorragias gengivais',
    'Aftas recorrentes',
    'Boca seca',
    'Dor de garganta recorrente'
  ],
  'Sistema Nervoso e Cognitivo': [
    'Fadiga crônica',
    'Síndrome fadiga crônica',
    'Fraqueza muscular',
    'Cãibras musculares',
    'Cãibras',
    'Cãibras noturnas',
    'Formigamento nas mãos e pés',
    'Formigamento',
    'Dormência',
    'Tremores',
    'Dificuldade de concentração',
    'Má concentração',
    'Perda de memória',
    'Má memória',
    'Episódios de perda de memória',
    'Confusão mental',
    'Tontura',
    'Tontura / Vertigem',
    'Tontura ao levantar',
    'Dor de cabeça frequente',
    'Enxaqueca',
    'Neuropatia periférica',
    'Parkinson',
    'Esclerose múltipla'
  ],
  'Humor e Saúde Mental': [
    'Depressão',
    'Pessimismo / Depressão',
    'Depressão sazonal',
    'Depressão pós-parto',
    'Ansiedade',
    'Irritabilidade',
    'Mudanças de humor',
    'Alterações de humor',
    'Insônia',
    'Sono irregular',
    'Demora para dormir',
    'Desperta à noite',
    'Sonolência no dia',
    'Acorda com sono',
    'Apatia',
    'Estresse exarcebado',
    'Burnout',
    'Distress / Eustress',
    'Distúrbio bipolar',
    'Esquizofrenia'
  ],
  'Sistema Imunológico': [
    'Infecções frequentes',
    'Infecções de repetição',
    'Infecções vias aéreas',
    'Cicatrização lenta',
    'Resfriados frequentes',
    'Herpes',
    'Alergias',
    'Alergias temporais',
    'Alergias alimentares',
    'Imunidade baixa',
    'Sinusite crônica'
  ],
  'Sistema Cardiovascular': [
    'Palpitações',
    'Falta de ar',
    'Arritmias',
    'Alteração de pressão',
    'Hipertensão',
    'Edemas pernas',
    'Pernas cansadas',
    'Frio nas extremidades'
  ],
  'Sistema Digestivo': [
    'Perda de apetite',
    'Apetite irregular',
    'Náuseas',
    'Diarreia',
    'Constipação',
    'Alternações intestinais',
    'Cólicas intestinais',
    'Flatulências',
    'Intestino irritável',
    'Má digestão',
    'Desconforto abdominal',
    'Doença de Crohn',
    'Celíaco',
    'Síndrome intestino permeável'
  ],
  'Sistema Ósseo e Articulações': [
    'Dor óssea',
    'Osteoporose',
    'Osteomalacia',
    'Fraturas frequentes',
    'Desmineralização óssea',
    'Perda de massa óssea',
    'Dores na coluna',
    'Dores musculares',
    'Dores articulares',
    'Dor articular',
    'Artrite reumatoide',
    'Tendinite',
    'Bruxismo'
  ],
  'Sangue e Circulação': [
    'Anemia',
    'Palidez',
    'Hematomas fáceis'
  ],
  'Sistema Endócrino e Metabólico': [
    'Hipotireoidismo',
    'Diabetes tipo 2',
    'Síndrome metabólica',
    'Hipoglicemia',
    'Hipoglicemia reativa',
    'Menopausa',
    'Ovário policístico',
    'Sudorese excessiva',
    'Sensibilidade ao frio',
    'Sensibilidade ao calor',
    'Sem energia'
  ],
  'Sistema Reprodutivo': [
    'Impotência',
    'Baixa libido',
    'Esterilidade',
    'Infertilidade masculina',
    'Infertilidade feminina',
    'Cólica menstrual intensa',
    'Endometriose',
    'Enurese'
  ],
  'Sistema Urinário': [
    'Infecção urinária recorrente',
    'Pielonefrite',
    'Pernas inquietas'
  ],
  'Crescimento e Desenvolvimento': [
    'Perda de paladar',
    'Perda de olfato',
    'Crescimento lento (crianças)',
    'Problemas de crescimento',
    'Dificuldade ganho de massa'
  ]
};
