import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Divider, Accordion, AccordionSummary, AccordionDetails, Chip, Alert, Autocomplete, TextField, Grid, Stack, Avatar, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import { loadSymptomIndex, loadMapping, computeScores, parseCsvToIndex } from '../lib/symptomIndex';
import SPREADSHEETS from '../config/spreadsheets';
import { generateSuggestions } from '../lib/suggestions';
import { generateTherapeuticReport, SPECIALIST_PROTOCOLS, getTherapeuticSuggestionsBySymptoms } from '../config/therapeuticDatabase';
import { DRUG_DEPLETIONS, NUTRIENT_DOSAGES } from '../data/drugDepletionsData';
import TherapeuticBoard from '../components/TherapeuticBoard';
import CompleteTreatmentBoard from '../components/CompleteTreatmentBoard';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import TherapeuticDataStatus from '../components/TherapeuticDataStatus';
import BoarimProtocol from '../components/BoarimProtocol';
import TreatmentProtocolsDisplay from '../components/TreatmentProtocolsDisplay';
import { getBoarimProtocolsBySymptoms } from '../config/boarimProtocols';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import SaveToPatientBar from '../components/SaveToPatientBar';

const therapistFullTitle = 'Wander Pires Silva Coelho, Terapeuta Integrativo Funcional, Naturopatia e Iridologia - CRTH-BR 17821';

/**
 * Consolida TODAS as indicações terapêuticas para o interagente
 * Remove duplicações e agrupa por tipo de terapia
 */
function consolidateAllTherapies(entry, therapeuticData, boarimProtocols) {
  if (!entry) return null;

  const consolidated = {
    homeopathy: [],
    aromatherapy: [],
    essentialOils: [],
    phytotherapy: [],
    nutritional: [],
    hydrotherapy: [],
    lifestyle: [],
    symptoms: [] // Sintomas/doenças captados
  };

  // 1. EXTRAIR SINTOMAS DA ANAMNESE
  const symptoms = new Set();
  
  const integrativeData = entry.anamneseIntegrativaData || entry.anamnesisIntegrativa || {};
  const mainComplaint = entry.queixaPrincipal || entry.q05_queixa_principal || entry.q15_queixa_principal || entry.q02_queixa_principal || integrativeData.queixaPrincipal || integrativeData.b1q1;
  if (mainComplaint) symptoms.add(mainComplaint);
  if (entry.queixas && Array.isArray(entry.queixas)) {
    entry.queixas.forEach(q => symptoms.add(q));
  }
  if (Array.isArray(integrativeData.q17a_sintomas_selecionados)) {
    integrativeData.q17a_sintomas_selecionados.forEach(q => symptoms.add(q));
  }
  
  // NOVO: Extrair sintomas do questionário abrangente de saúde
  if (entry.comprehensiveHealthData) {
    const healthData = entry.comprehensiveHealthData;
    
    // Queixas principais marcadas
    if (healthData.queixaPrincipal && Array.isArray(healthData.queixaPrincipal)) {
      healthData.queixaPrincipal.forEach(q => symptoms.add(q));
    }
    
    // Doenças crônicas
    if (healthData.doencasCronicas && Array.isArray(healthData.doencasCronicas)) {
      healthData.doencasCronicas.forEach(d => symptoms.add(d));
    }
    
    // Sintomas digestivos
    if (healthData.funcionamentoIntestinal && healthData.funcionamentoIntestinal !== 'Normal (1x ao dia)') {
      symptoms.add(healthData.funcionamentoIntestinal);
    }
    if (healthData.gases === 'Frequentemente' || healthData.gases === 'Diariamente') {
      symptoms.add('Gases excessivos');
    }
    if (healthData.azia === 'Frequentemente' || healthData.azia === 'Diariamente') {
      symptoms.add('Azia/Refluxo');
    }
    
    // Problemas de sono
    if (healthData.qualidadeSono === 'Ruim' || healthData.qualidadeSono === 'Regular') {
      symptoms.add('Problemas de sono');
    }
    if (healthData.dificuldadeDormir && Array.isArray(healthData.dificuldadeDormir)) {
      healthData.dificuldadeDormir.forEach(d => symptoms.add(d));
    }
    
    // Dores
    if (healthData.dores && Array.isArray(healthData.dores)) {
      healthData.dores.forEach(d => {
        if (d !== 'Sem dores') symptoms.add(`Dor em ${d}`);
      });
    }
    
    // Níveis de estresse e ansiedade
    if (healthData.nivelEstresse === 'Alto' || healthData.nivelEstresse === 'Muito alto') {
      symptoms.add('Estresse elevado');
    }
    if (healthData.nivelAnsiedade === 'Moderada' || healthData.nivelAnsiedade === 'Intensa') {
      symptoms.add('Ansiedade');
    }
    
    // Humor
    if (healthData.humor === 'Deprimido' || healthData.humor === 'Baixo') {
      symptoms.add('Humor deprimido');
    }
    
    // Energia baixa
    if (healthData.nivelEnergia === 'Muito baixo' || healthData.nivelEnergia === 'Baixo') {
      symptoms.add('Fadiga/Cansaço');
    }
  }
  
  // Sintomas específicos dos sistemas
  const symptomFields = [
    'q46_dores', 'q47_cansaco', 'q48_estresse', 'q49_ansiedade',
    'q39_intestino', 'q40_gases', 'q41_azia', 'q42_nauseas',
    'q43_urina_frequencia', 'q45_ardor_urinar',
    'q29_doencas_previas', 'q30_medicamentos_uso'
  ];
  
  symptomFields.forEach(field => {
    if (entry[field] && entry[field] !== 'Não' && entry[field] !== 'Nenhum') {
      symptoms.add(entry[field]);
    }
  });

  consolidated.symptoms = Array.from(symptoms).filter(s => s && s.trim());

  // 2. CONSOLIDAR DADOS TERAPÊUTICOS (da AdvancedTherapies)
  if (therapeuticData && Array.isArray(therapeuticData)) {
    therapeuticData.forEach(item => {
      if (!item || !item.result) return;
      
      const type = item.type || (item.result.remedies ? 'homeopathy' : item.result.oils ? 'essentialOils' : 'aromatherapy');
      
      if (type === 'homeopathy' && item.result.remedies) {
        item.result.remedies.forEach(remedy => {
          if (!consolidated.homeopathy.find(r => r.name === remedy.name)) {
            consolidated.homeopathy.push({
              ...remedy,
              indication: item.condition || item.result.category || item.result.condition,
              references: item.result.references,
              safety: item.result.safety
            });
          }
        });
      }
      
      if ((type === 'essentialOils' || type === 'aromatherapy') && item.result.oils) {
        item.result.oils.forEach(oil => {
          const targetArray = type === 'essentialOils' ? consolidated.essentialOils : consolidated.aromatherapy;
          if (!targetArray.find(o => o.name === oil.name)) {
            targetArray.push({
              ...oil,
              indication: item.condition || item.result.title || item.result.category,
              references: item.result.references
            });
          }
        });
      }
    });
  }

  // 3. CONSOLIDAR INTERAÇÕES MEDICAMENTOSAS
  if (entry.drugInteractions && entry.drugInteractions.selectedDrugs) {
    // Processar medicamentos e suas depleções
    entry.drugInteractions.selectedDrugs.forEach(drug => {
      const drugData = DRUG_DEPLETIONS[drug];
      if (drugData && drugData.depletions) {
        drugData.depletions.forEach(nutrient => {
          const dosageInfo = NUTRIENT_DOSAGES[nutrient];
          if (dosageInfo && !consolidated.nutritional.find(n => n.nutrient === nutrient && n.drug === drug)) {
            consolidated.nutritional.push({
              nutrient: nutrient,
              drug: drug,
              recommendation: `${nutrient}: ${dosageInfo.dosage} - ${dosageInfo.posology}`,
              type: 'Reposição por depleção medicamentosa',
              indication: `${drug} depleta ${nutrient}`,
              dosage: dosageInfo.dosage,
              posology: dosageInfo.posology,
              duration: dosageInfo.duration,
              precautions: dosageInfo.precautions
            });
          }
        });
      }
    });
  }

  // 4. ADICIONAR RECOMENDAÇÕES BASEADAS EM HÁBITOS E FATORES DE RISCO
  if (entry.comprehensiveHealthData) {
    const healthData = entry.comprehensiveHealthData;
    
    // Recomendações nutricionais baseadas em hábitos alimentares
    if (healthData.qualidadeAlimentacao === 'Ruim' || healthData.qualidadeAlimentacao === 'Regular') {
      consolidated.nutritional.push({
        nutrient: 'Complexo Multivitamínico',
        recommendation: 'Suplementação multivitamínica devido à qualidade alimentar inadequada',
        type: 'Suplementação preventiva',
        indication: 'Alimentação de baixa qualidade nutricional',
        dosage: '1 cápsula',
        posology: '1x ao dia com refeição principal',
        duration: 'Uso contínuo'
      });
    }
    
    // Tabagismo
    if (healthData.tabagismo === 'Sim, fumo' || healthData.tabagismo === 'Ex-fumante') {
      consolidated.nutritional.push({
        nutrient: 'Vitamina C',
        recommendation: 'Vitamina C 1000mg - antioxidante para fumantes/ex-fumantes',
        type: 'Suplementação terapêutica',
        indication: healthData.tabagismo,
        dosage: '1000mg',
        posology: '1-2x ao dia',
        duration: 'Uso contínuo'
      });
    }
    
    // Consumo de álcool
    if (healthData.etilismo === 'Diariamente' || healthData.etilismo === 'Finais de semana') {
      consolidated.nutritional.push({
        nutrient: 'Complexo B + Magnésio',
        recommendation: 'Reposição de vitaminas B e magnésio (depletados pelo álcool)',
        type: 'Reposição por depleção',
        indication: `Consumo de álcool: ${healthData.etilismo}`,
        dosage: 'Complexo B 50mg + Magnésio 400mg',
        posology: '1x ao dia',
        duration: 'Uso contínuo'
      });
    }
    
    // Sedentarismo
    if (healthData.atividadeFisica === 'Não pratico') {
      symptoms.add('Sedentarismo');
    }
    
    // Consumo insuficiente de água
    if (healthData.consumoAgua === 'Menos de 1 litro' || healthData.consumoAgua === '1-1.5 litros') {
      symptoms.add('Hidratação insuficiente');
    }
    
    // Histórico familiar relevante
    if (healthData.doencasFamiliares && Array.isArray(healthData.doencasFamiliares)) {
      if (healthData.doencasFamiliares.includes('Diabetes')) {
        consolidated.nutritional.push({
          nutrient: 'Cromo + Ácido Alfa-lipóico',
          recommendation: 'Prevenção de diabetes (histórico familiar positivo)',
          type: 'Suplementação preventiva',
          indication: 'Histórico familiar de Diabetes',
          dosage: 'Cromo 200mcg + Ácido Alfa-lipóico 300mg',
          posology: '1x ao dia',
          duration: 'Uso contínuo'
        });
      }
      
      if (healthData.doencasFamiliares.includes('Hipertensão')) {
        consolidated.nutritional.push({
          nutrient: 'Magnésio + Ômega-3',
          recommendation: 'Prevenção cardiovascular (histórico familiar de hipertensão)',
          type: 'Suplementação preventiva',
          indication: 'Histórico familiar de Hipertensão',
          dosage: 'Magnésio 400mg + Ômega-3 1000mg',
          posology: '1-2x ao dia',
          duration: 'Uso contínuo'
        });
      }
    }
    
    // Atualizar array de sintomas
    consolidated.symptoms = Array.from(symptoms).filter(s => s && s.trim());
  }

  // 5. CONSOLIDAR PROTOCOLOS BOARIM
  if (boarimProtocols && Array.isArray(boarimProtocols)) {
    boarimProtocols.forEach(protocol => {
      // Fitoterapia
      if (protocol.phytotherapy && Array.isArray(protocol.phytotherapy)) {
        protocol.phytotherapy.forEach(item => {
          if (!consolidated.phytotherapy.find(p => p.name === item.name)) {
            consolidated.phytotherapy.push({
              name: item.name,
              usage: item.usage,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Hidroterapia
      if (protocol.hydrotherapy && Array.isArray(protocol.hydrotherapy)) {
        protocol.hydrotherapy.forEach(item => {
          if (!consolidated.hydrotherapy.find(h => h.treatment === item.treatment)) {
            consolidated.hydrotherapy.push({
              treatment: item.treatment,
              temperature: item.temperature,
              duration: item.duration,
              frequency: item.frequency,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Orientações nutricionais
      if (protocol.diet && Array.isArray(protocol.diet)) {
        protocol.diet.forEach(item => {
          if (!consolidated.nutritional.find(n => n.recommendation === item.recommendation)) {
            consolidated.nutritional.push({
              recommendation: item.recommendation,
              type: item.type,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Estilo de vida
      if (protocol.lifestyle && Array.isArray(protocol.lifestyle)) {
        protocol.lifestyle.forEach(item => {
          if (!consolidated.lifestyle.find(l => l === item)) {
            consolidated.lifestyle.push(item);
          }
        });
      }
    });
  }

  return consolidated;
}

// Informações clínicas detalhadas para cada sinal de unha
const getUnhaInfo = (codigo) => {
  const infos = {
    'manchas_brancas': {
      nome: 'Manchas brancas (Leuconíquia)',
      sintomas: 'Pontos ou manchas esbranquiçadas na lâmina ungueal',
      causas: 'Visão Integrativa: Deficiência de zinco (importante para imunidade e síntese proteica), cálcio (mineralização), trauma repetitivo na matriz. Medicina Chinesa: desequilíbrio do Qi do Baço-Pâncreas (má absorção). Ayurveda: desequilíbrio de Vata dosha, toxinas (ama) no sistema digestivo',
      diagnostico: 'Deficiência de zinco, cálcio ou albumina; trauma na matriz ungueal; leuconíquia punctata ou striata',
      tratamento: 'Zinco 30mg/dia, Cálcio 1000mg/dia, Biotina 2,5mg/dia. Alimentos: castanhas, sementes de abóbora, ostras, leite, queijo. Fitoterapia: cavalinha (silício), urtiga (minerais)'
    },
    'estrias_longitudinais': {
      nome: 'Estrias longitudinais',
      sintomas: 'Linhas verticais ao longo da unha, geralmente múltiplas',
      causas: 'Visão Holística: Envelhecimento (oxidação celular), deficiência de ferro (baixa oxigenação tecidual), desidratação crônica (falta de água estruturada). MTC: deficiência de Sangue do Fígado e Rim. Ayurveda: Vata aumentado, dhatus (tecidos) deficientes',
      diagnostico: 'Envelhecimento natural (>50 anos), deficiência de ferro, desidratação crônica, má absorção intestinal',
      tratamento: 'Ferro quelato 14-30mg/dia com vitamina C, hidratação 2-3L/dia, ômega-3 1000mg, vitamina E 400UI. Fontes de ferro: carnes, feijão, lentilha, espinafre. Chás: hibisco, folha de amora'
    },
    'unhas_quebradicas_secas': {
      nome: 'Unhas quebradiças e secas',
      sintomas: 'Unhas que quebram facilmente, descamam nas pontas, textura seca',
      causas: 'Abordagem Integrativa: Deficiência nutricional (biotina, colágeno, ômega-3), tireoide hipoativa (metabolismo lento), exposição química, estresse oxidativo. MTC: deficiência de Yin do Fígado e Rim. Ayurveda: Vata dosha excessivo (secura), baixo Ojas (vitalidade)',
      diagnostico: 'Deficiência de biotina, ferro, proteínas; hipotireoidismo; exposição a detergentes; oniscoxis',
      tratamento: 'Biotina 2,5-5mg/dia, ferro quelato, proteína 1-1,5g/kg/dia, ômega-3, avaliar TSH/T4. Óleo de coco tópico, evitar água quente prolongada. Fitoterapia: ashwagandha (tireoide), colágeno hidrolisado'
    },
    'unhas_amareladas': {
      nome: 'Unhas amareladas',
      sintomas: 'Coloração amarelada da lâmina ungueal, espessamento possível',
      causas: 'Medicina Integrativa: Infecção fúngica, linfedema (estagnação linfática), tabagismo (toxinas), doenças respiratórias (hipóxia crônica). MTC: Umidade-Calor no Pulmão, estagnação de Qi/Xue. Ayurveda: acúmulo de Kapha e ama (toxinas), sistema linfático congestionado',
      diagnostico: 'Síndrome das unhas amarelas (linfedema), onicomicose, tabagismo, bronquiectasias, sinusite crônica, artrite reumatoide',
      tratamento: 'Antifúngicos: óleo melaleuca 2x/dia, própolis. Vitamina E 400UI, selênio 200mcg. Detox: NAC 600mg, cardo mariano, drenagem linfática. Chás: cavalinha, chapéu-de-couro'
    },
    'unhas_azuladas': {
      nome: 'Unhas azuladas (Cianose)',
      sintomas: 'Cianose periférica, coloração azulada do leito ungueal',
      causas: 'Visão Holística: Hipóxia tecidual (baixa oxigenação), insuficiência cardiorrespiratória, circulação periférica comprometida, fenômeno de Raynaud (vasospasmo). MTC: deficiência grave de Yang do Coração/Pulmão, estase de Sangue. Ayurveda: Prana (força vital) bloqueado, Vata dosha aumentado',
      diagnostico: 'Hipóxia, insuficiência cardíaca, DPOC, embolia pulmonar, fenômeno de Raynaud, má circulação',
      tratamento: '⚠️ URGENTE: Avaliação médica. Suporte: Ginkgo biloba 120mg, CoQ10 100mg, magnésio 400mg, ômega-3. Exercícios respiratórios. Reiki, acupuntura para circulação'
    },
    'unhas_avermelhadas': {
      nome: 'Unhas avermelhadas',
      sintomas: 'Leito ungueal avermelhado, possível plétora',
      causas: 'Abordagem Integrativa: Policitemia (excesso de hemácias), hipertensão (pressão vascular aumentada), calor interno excessivo, inflamação sistêmica. MTC: Calor no Sangue, Fogo do Fígado. Ayurveda: Pitta dosha excessivo (calor, inflamação), Rakta dhatu (tecido sanguíneo) agravado',
      diagnostico: 'Policitemia vera, hipertensão arterial, doença cardíaca congênita, exposição a CO',
      tratamento: 'Controlar PA, anticoagulantes naturais: alho 600mg, gengibre, cúrcuma 500mg. Hidratação, ômega-3 2g/dia. Avaliar hemograma. Chás: hibisco, cavalinha. Meditação para reduzir calor interno'
    },
    'unhas_esverdeadas': {
      nome: 'Unhas esverdeadas',
      sintomas: 'Coloração verde-amarelada sob a unha ou na lâmina',
      causas: 'Visão Integrativa: Infecção bacteriana por Pseudomonas (ambiente úmido), imunidade baixa, trauma ungueal, exposição prolongada à água. MTC: Umidade-Calor tóxica, deficiência de Wei Qi (energia defensiva). Ayurveda: Kapha e ama acumulados, sistema imune (Ojas) enfraquecido',
      diagnostico: 'Infecção por Pseudomonas aeruginosa (síndrome da unha verde), trauma, umidade prolongada',
      tratamento: 'Vinagre maçã diluído 2x/dia, óleo melaleuca, manter seco. Prata coloidal tópica. Probióticos orais. Avaliar imunidade. Fitoterapia: equinácea, própolis, cogumelos medicinais (reishi, shiitake)'
    },
    'linhas_escuras': {
      nome: 'Linhas escuras (Melanoniquia)',
      sintomas: 'Estrias longitudinais escuras ou marrons, únicas ou múltiplas',
      causas: 'Atenção Holística: Possível melanoma (urgente!), hiperpigmentação pós-trauma, melanoniquia étnica (normal em pessoas negras/asiáticas), medicamentos, insuficiência adrenal. MTC: estase de Sangue profunda, deficiência de Qi do Rim. Ayurveda: desequilíbrio de Pitta, toxinas profundas',
      diagnostico: '⚠️ Melanoma subungueal, melanoniquia racial, trauma, medicamentos (zidovudina), síndrome de Addison',
      tratamento: '⚠️ AVALIAÇÃO DERMATOLÓGICA URGENTE para biópsia. Vitamina D 2000-5000UI, antioxidantes (C, E, selênio), betacaroteno. Oração, cura quântica, terapias vibracionais'
    },
    'unhas_onduladas': {
      nome: 'Unhas onduladas (Linhas de Beau)',
      sintomas: 'Depressões transversais, ondulações horizontais (linhas de Beau)',
      causas: 'Medicina Integrativa: Choque metabólico/nutricional que interrompeu crescimento celular, infecção grave (sepse), quimioterapia, desnutrição proteica, diabetes descompensado. MTC: deficiência severa de Qi/Sangue, interrupção do fluxo de Jing (essência). Ayurveda: perda de Ojas, trauma nos dhatus',
      diagnostico: 'Interrupção temporária do crescimento: infecção grave, quimioterapia, desnutrição severa, diabetes descompensado',
      tratamento: 'Biotina 5mg, zinco 30mg, proteína 1,5g/kg. Investigar causa: exames infecciosos, metabólicos. Complexo B, vitamina C. Ashwagandha, ginseng para recuperação'
    },
    'unhas_arredondadas': {
      nome: 'Unhas arredondadas (Baqueteamento digital/Hipocratismo)',
      sintomas: 'Unha em vidro de relógio, dedos em baqueta de tambor',
      causas: 'Visão Holística: Hipoxemia crônica (doenças pulmonares/cardíacas), inflamação sistêmica persistente, fator de crescimento endotelial ativado. MTC: deficiência profunda de Qi do Pulmão/Coração, fleuma obstruindo. Ayurveda: Prana vata bloqueado, Kapha acumulado nos pulmões, doença crônica grave',
      diagnostico: 'Hipocratismo digital: DPOC, fibrose pulmonar, cardiopatia cianótica, cirrose, doença de Crohn, câncer pulmonar',
      tratamento: '⚠️ INVESTIGAR causa urgente: RX tórax, ECG. CoQ10 200mg, ômega-3 2g, NAC 600mg. Oxigenoterapia se indicado. Acupuntura para Pulmão, Qi Gong respiratório'
    },
    'unhas_viradas_cima': {
      nome: 'Unhas viradas para cima (Coiloníquia)',
      sintomas: 'Unha em colher (coiloníquia), bordas viradas para cima, centro côncavo',
      causas: 'Abordagem Integrativa: Anemia ferropriva severa (hemácias microcíticas), deficiência de oxigênio celular, hipotireoidismo (metabolismo lento), má absorção de ferro. MTC: deficiência de Sangue do Fígado/Baço, Yang do Rim fraco. Ayurveda: Rasa dhatu (plasma) deficiente, agni (fogo digestivo) baixo',
      diagnostico: 'Anemia ferropriva severa (ferritina <15), hemocromatose, síndrome de Plummer-Vinson, hipotireoidismo',
      tratamento: 'Ferro quelato 30-60mg + vit C. Avaliar ferritina, Hb. B12 1000mcg, folato 400mcg. Investigar sangramento. TSH. Fitoterapia: urtiga, dente-de-leão, spirulina. Clorofila líquida'
    },
    'descolamento_unha': {
      nome: 'Descolamento da unha (Onicólise)',
      sintomas: 'Separação da unha do leito ungueal, espaço oco visível',
      causas: 'Medicina Integrativa: Infecção fúngica (dermatófitos), psoríase (hiperproliferação), hipertireoidismo (metabolismo acelerado), trauma repetitivo, reação medicamentosa. MTC: Umidade-Calor, Vento no Sangue. Ayurveda: Pitta e Vata elevados, baixa ligação dos dhatus',
      diagnostico: 'Onicólise: onicomicose, psoríase ungueal, trauma, hipertireoidismo, fotossensibilidade (tetraciclinas)',
      tratamento: 'Antifúngico: melaleuca, própolis. Biotina 5mg, zinco 30mg. Avaliar TSH. Manter seco. Probióticos. Evitar trauma. Chás: pau d\'arco, unha de gato. Cúrcuma anti-inflamatória'
    }
  };
  return infos[codigo];
};

// Informações para sinais de pele
const getPeleInfo = (codigo) => {
  const infos = {
    'ressecamento': {
      nome: 'Ressecamento/Descamação',
      sintomas: 'Pele seca, áspera, descamativa, sensação de repuxamento',
      causas: 'Medicina Integrativa: Desidratação, deficiência de ômega-3 e vitamina E, disfunção da barreira cutânea. MTC: deficiência de Yin, Sangue insuficiente. Ayurveda: Vata dosha elevado, rasa dhatu deficiente',
      diagnostico: 'Xerose cutânea, dermatite, desidratação, deficiências nutricionais',
      tratamento: 'Ômega-3 2g/dia, Vitamina E 400UI, Ácido hialurônico, hidratação 2-3L/dia. Óleo de coco, manteiga de karité tópicos. Chás: bardana, cavalinha'
    },
    'manchas': {
      nome: 'Manchas/Hiperpigmentação',
      sintomas: 'Manchas escuras, melasma, sardas excessivas',
      causas: 'Visão Integrativa: Exposição solar, alterações hormonais, envelhecimento, estresse oxidativo. MTC: estase de Qi do Fígado. Ayurveda: Pitta dosha agravado, bhrajaka pitta desequilibrado',
      diagnostico: 'Melasma, hiperpigmentação pós-inflamatória, fotoenvelhecimento',
      tratamento: 'Vitamina C 1g/dia, Ácido tranexâmico, Niacinamida tópica, Protetor solar FPS 50+. Fitoterapia: alcaçuz, uva-ursi, cúrcuma. Peeling natural com ácidos frutados'
    },
    'perda_elasticidade': {
      nome: 'Perda de Elasticidade',
      sintomas: 'Flacidez, rugas, pele sem firmeza',
      causas: 'Abordagem Integrativa: Envelhecimento, glicação proteica (açúcar), radicais livres, deficiência de colágeno. MTC: deficiência de Qi e Sangue. Ayurveda: Vata aumentado, dhatus empobrecidos',
      diagnostico: 'Envelhecimento cutâneo, glicação, estresse oxidativo',
      tratamento: 'Colágeno hidrolisado 10g/dia, Vitamina C 1g, Silício orgânico 10mg, Resveratrol 500mg. Gotu kola, centella asiática. Radiofrequência, massagem facial'
    },
    'acne_lesoes': {
      nome: 'Acne/Lesões',
      sintomas: 'Espinhas, cravos, pústulas, inflamação',
      causas: 'Medicina Integrativa: Desequilíbrio hormonal, disbiose intestinal, inflamação sistêmica, resistência insulínica. MTC: Calor-Umidade, Fogo do Estômago. Ayurveda: Pitta e Kapha elevados, rakta dhatu impuro',
      diagnostico: 'Acne vulgar, acne hormonal, rosácea, dermatite seborreica',
      tratamento: 'Zinco 30mg/dia, Probióticos, Ômega-3, Vitamina A. Chá verde, bardana, dente-de-leão. Óleo de melaleuca tópico. Dieta low glycemic, evitar laticínios'
    },
    'oleosidade': {
      nome: 'Oleosidade Excessiva',
      sintomas: 'Pele brilhante, poros dilatados, produção sebácea aumentada',
      causas: 'Visão Holística: Desequilíbrio hormonal (andrógenos), resistência insulínica, estresse. MTC: Calor-Umidade do Baço e Estômago. Ayurveda: Kapha e Pitta agravados',
      diagnostico: 'Seborreia, hiperandrogenismo, síndrome do ovário policístico',
      tratamento: 'Zinco 30mg, Vitamina B5 500mg, Saw palmetto 320mg. Chá de hortelã-pimenta, chá verde. Argila verde, ácido salicílico tópico. Reduzir açúcar e gorduras ruins'
    }
  };
  return infos[codigo];
};

// Informações para sinais de olhos
const getOlhosInfo = (codigo) => {
  const infos = {
    'escl_amarelada': {
      nome: 'Esclerótica Amarelada (Icterícia)',
      sintomas: 'Parte branca dos olhos com tom amarelado',
      causas: 'Medicina Integrativa: Sobrecarga hepática, bilirrubina elevada, hepatite, obstrução biliar, anemia hemolítica. MTC: Umidade-Calor no Fígado e Vesícula Biliar. Ayurveda: Pitta agravado, ranjaka pitta desequilibrado',
      diagnostico: 'Icterícia, disfunção hepática, colestase, hepatite, anemia hemolítica',
      tratamento: '⚠️ URGENTE: Avaliação médica! Suporte: Cardo mariano 300mg 3x/dia, Alcachofra 500mg 2x/dia, Boldo, Dente-de-leão. Dieta detox hepática. Evitar álcool, medicamentos hepatotóxicos'
    },
    'arcus_senilis': {
      nome: 'Arcus Senilis (Anel Branco/Cinza)',
      sintomas: 'Anel branco ou cinza ao redor da córnea',
      causas: 'Visão Integrativa: Depósito de colesterol e lipídios, dislipidemia, aterosclerose, envelhecimento. MTC: Fleuma e estase de Sangue. Ayurveda: Kapha e ama acumulados, medas dhatu (gordura) em excesso',
      diagnostico: 'Arco senil, hipercolesterolemia, risco cardiovascular aumentado',
      tratamento: 'Ômega-3 2g/dia, Coenzima Q10 100mg, Estatinas naturais (arroz vermelho fermentado), Alho 600mg, Chá verde. Dieta mediterrânea, exercícios aeróbicos. Avaliar perfil lipídico'
    },
    'olheiras': {
      nome: 'Olheiras Pronunciadas',
      sintomas: 'Escurecimento periorbital, sombras sob os olhos',
      causas: 'Abordagem Integrativa: Deficiência de ferro, má circulação, sono inadequado, alergias, estresse, genética. MTC: deficiência de Qi do Baço e Rim, estase de Sangue. Ayurveda: Vata aumentado, rakta dhatu deficiente',
      diagnostico: 'Anemia ferropriva, insônia, alergias, hiperpigmentação periorbital',
      tratamento: 'Ferro quelato 30mg + vitamina C, Vitamina K tópica, Retinol, Cafeína tópica. Dormir 7-8h, compressa fria. Chás: cavalinha, centella asiática. Drenagem linfática facial'
    },
    'ptose_palpebral': {
      nome: 'Ptose Palpebral (Queda da Pálpebra)',
      sintomas: 'Pálpebra superior caída, vista cansada',
      causas: 'Medicina Integrativa: Enfraquecimento muscular, envelhecimento, miastenia gravis, danos neurológicos. MTC: deficiência de Qi do Baço, Yang fraco. Ayurveda: Vata aumentado, mamsa dhatu (músculo) enfraquecido',
      diagnostico: 'Ptose senil, miastenia gravis, neuropatia, síndrome de Horner',
      tratamento: 'Avaliar causa neurológica! Coenzima Q10 200mg, Acetil-L-carnitina 500mg, Vitamina B12. Exercícios palpebrais, massagem. Acupuntura nos pontos ao redor dos olhos'
    },
    'vasos_dilatados': {
      nome: 'Vasos Sanguíneos Dilatados',
      sintomas: 'Olhos vermelhos, vasos visíveis na esclerótica',
      causas: 'Visão Holística: Hipertensão, alergias, olho seco, irritação, inflamação, fadiga ocular. MTC: Calor no Fígado, Fogo subindo. Ayurveda: Pitta dosha elevado, alochaka pitta desequilibrado',
      diagnostico: 'Conjuntivite, olho seco, hipertensão ocular, fadiga visual',
      tratamento: 'Ômega-3 1g/dia, Luteína 10mg, Zeaxantina, Colírio lubrificante. Compressas de camomila, água de rosas. Reduzir telas, exercícios visuais. Chá de crisântemo, euphrasia'
    }
  };
  return infos[codigo];
};

// Informações para sinais de cabelo
const getCabeloInfo = (codigo) => {
  const infos = {
    'queda_excessiva': {
      nome: 'Queda Excessiva',
      sintomas: 'Perda de cabelo aumentada, fios no travesseiro/escova',
      causas: 'Medicina Integrativa: Deficiências nutricionais (ferro, zinco, biotina), estresse, desequilíbrio hormonal (tireoide, andrógenos), má circulação. MTC: deficiência de Sangue do Fígado e Rim. Ayurveda: Vata e Pitta agravados, asthi dhatu fraco',
      diagnostico: 'Eflúvio telógeno, alopecia androgenética, hipotireoidismo, anemia',
      tratamento: 'Ferro quelato 30mg, Zinco 30mg, Biotina 5mg, Colágeno 10g/dia. Saw palmetto 320mg, Ginkgo biloba. Massagem capilar, óleos essenciais (alecrim, lavanda). Avaliar TSH, ferritina'
    },
    'ressecamento_cabelo': {
      nome: 'Ressecamento/Quebradiço',
      sintomas: 'Cabelos secos, sem brilho, pontas duplas, quebra fácil',
      causas: 'Abordagem Integrativa: Desidratação, deficiência de ácidos graxos essenciais, proteínas insuficientes, excesso químicos. MTC: Sangue e Yin deficientes. Ayurveda: Vata elevado, rasa dhatu inadequado',
      diagnostico: 'Tricoptose, deficiências nutricionais, danos químicos/térmicos',
      tratamento: 'Ômega-3 2g/dia, Biotina 5mg, Silício orgânico, Proteína 1,5g/kg/dia. Óleo de coco, argan, rícino. Máscara de abacate. Evitar calor excessivo, química agressiva'
    },
    'fios_finos': {
      nome: 'Fios Finos/Ralos',
      sintomas: 'Cabelo fino, sem volume, couro cabeludo visível',
      causas: 'Visão Integrativa: Genética, envelhecimento, deficiências nutricionais, miniaturização folicular. MTC: essência Jing do Rim fraca. Ayurveda: Vata excessivo, dhatus empobrecidos',
      diagnostico: 'Alopecia androgenética, envelhecimento capilar, deficiências',
      tratamento: 'Biotina 10mg, Metilsulfonilmetano (MSM) 1g, Aminoácidos sulfurados. Minoxidil tópico 5%, Microagulhamento. Saw palmetto, fo-ti (he shou wu). Terapia capilar a laser'
    },
    'caspa_seborreia': {
      nome: 'Caspa/Seborreia',
      sintomas: 'Descamação, coceira, oleosidade no couro cabeludo',
      causas: 'Medicina Integrativa: Fungo Malassezia, desequilíbrio sebáceo, inflamação, disbiose intestinal. MTC: Umidade-Calor. Ayurveda: Kapha e Pitta agravados',
      diagnostico: 'Dermatite seborreica, pitiríase, candidíase do couro cabeludo',
      tratamento: 'Zinco 30mg, Probióticos, Ômega-3. Shampoo com piritionato de zinco, cetoconazol, tea tree. Vinagre maçã diluído, óleo de melaleuca. Evitar açúcar, laticínios'
    },
    'branqueamento_precoce': {
      nome: 'Branqueamento Precoce',
      sintomas: 'Cabelos brancos antes dos 30-35 anos',
      causas: 'Visão Holística: Estresse oxidativo, deficiência de melanina, genética, deficiências (B12, cobre, cálcio), estresse crônico. MTC: deficiência de Sangue e essência Jing. Ayurveda: Pitta elevado, bhrajaka pitta desequilibrado',
      diagnostico: 'Canície precoce, deficiência de B12, vitiligo, estresse oxidativo',
      tratamento: 'Vitamina B12 1000mcg, Cobre 2mg, Ácido fólico 400mcg, Catalase, PABA. Amla (groselha indiana), fo-ti, ginkgo. Gerenciamento de estresse, meditação. Óleo de coco com curry'
    }
  };
  return infos[codigo];
};

// Informações para sinais de orelha
const getOrelhaInfo = (codigo) => {
  const infos = {
    'vinco_diagonal': {
      nome: 'Vinco Diagonal no Lóbulo (Sinal de Frank)',
      sintomas: 'Linha diagonal no lóbulo da orelha',
      causas: 'Medicina Integrativa: Marcador de doença cardiovascular, aterosclerose, envelhecimento vascular. MTC: estase de Sangue, deficiência de Qi. Ayurveda: Vata e Kapha agravados, srotas (canais) obstruídos',
      diagnostico: 'Sinal de Frank - risco cardiovascular aumentado, doença arterial coronariana',
      tratamento: '⚠️ Avaliação cardiológica! Ômega-3 2g/dia, CoQ10 100mg, Alho 600mg, Hawthorn (espinheiro). Dieta cardio-protetora, exercícios. Controlar PA, colesterol. Acupuntura para coração'
    },
    'aumento_pilosidade': {
      nome: 'Aumento de Pilosidade',
      sintomas: 'Pelos excessivos no pavilhão auricular',
      causas: 'Visão Integrativa: Envelhecimento, alterações hormonais (testosterona), genética. MTC: excesso de Yang. Ayurveda: Pitta dosha elevado',
      diagnostico: 'Hipertricose auricular, envelhecimento, hiperandrogenismo',
      tratamento: 'Remoção estética se desejado. Saw palmetto 320mg para equilíbrio hormonal. Avaliação hormonal (testosterona total/livre)'
    },
    'manchas_idade': {
      nome: 'Manchas de Idade/Queratose',
      sintomas: 'Manchas escuras, ásperas, elevadas',
      causas: 'Abordagem Integrativa: Fotoenvelhecimento, queratose seborreica, exposição solar crônica. MTC: estase de Sangue e Qi. Ayurveda: Pitta acumulado',
      diagnostico: 'Queratose seborreica, lentigo solar, fotoenvelhecimento',
      tratamento: 'Protetor solar, Vitamina C tópica, Retinóides. Criocirurgia se necessário. Antioxidantes orais: vitamina E, resveratrol, chá verde'
    },
    'vermelhidao_descamacao': {
      nome: 'Vermelhidão/Descamação',
      sintomas: 'Pele vermelha, descamativa, coceira nas orelhas',
      causas: 'Medicina Integrativa: Dermatite seborreica, psoríase, eczema, alergias. MTC: Calor-Vento, Umidade. Ayurveda: Pitta e Kapha agravados',
      diagnostico: 'Dermatite seborreica, psoríase, eczema atópico, dermatite de contato',
      tratamento: 'Zinco 30mg, Ômega-3, Probióticos. Óleo de melaleuca, calêndula. Evitar alérgenos (metais em brincos). Anti-inflamatórios naturais: cúrcuma, boswellia'
    }
  };
  return infos[codigo];
};

export default function TherapySuggestions({ defaultSection = null }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [entry, setEntry] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [therapeuticData, setTherapeuticData] = useState([]);
  const [boarimProtocols, setBoarimProtocols] = useState([]);
  const [consolidatedTherapies, setConsolidatedTherapies] = useState(null);
  
  // Estados para seleção de paciente e consulta
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAnamneses, setPatientAnamneses] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveHistorico = () => {
    const target = entry || (patientAnamneses && patientAnamneses[0]);
    if (!target) return;
    appendHistoricoEntry(target.id, {
      tipo: 'sugestoes',
      titulo: '📊 Resultados de Exames / Sugestões Terapêuticas',
      resumo: `Seção: ${section || 'geral'}`,
      pagina: `/therapy-suggestions${target.id ? `/${target.id}` : ''}`,
    });
    setSavedMsg('Salvo no histórico!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  // Get URL parameters for section navigation and actions
  const section = searchParams.get('section') || defaultSection;
  const shouldPrint = searchParams.get('print') === 'true';
  const shouldDownload = searchParams.get('download') === 'true';

  useEffect(() => {
    (async () => {
      const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const found = saved.find((x) => String(x.id) === String(id));
      setEntry(found || null);
      let indexData = loadSymptomIndex();
      // if no local index available, try to fetch from configured therapy-suggestions spreadsheets
      if (!indexData) {
        const sources = (SPREADSHEETS || []).filter((s) => s.targetPage === 'therapy-suggestions');
        for (const src of sources) {
          try {
            // attempt to fetch csv export URL and parse
            /* eslint-disable no-await-in-loop */
            // eslint-disable-next-line no-await-in-loop
            const r = await fetch(src.exportCsv);
            if (!r.ok) continue;
            const text = await r.text();
            const parsed = parseCsvToIndex(text);
            if (parsed && Array.isArray(parsed) && parsed.length) {
              indexData = parsed;
              break;
            }
          } catch (err) {
            // ignore and try next
          }
        }
      }
      const mapping = loadMapping();
      const merged = generateSuggestions(found || {}, indexData, mapping);
    // if computed indices already saved with the entry, use them; otherwise compute using the imported index if possible
    let computed = (found && found.computedIndices && Object.keys(found.computedIndices).length) ? found.computedIndices : null;
    if (!computed && indexData && found?.sintomas?.length) {
      try {
        computed = computeScores(found.sintomas, indexData, mapping);
      } catch (_) {
        computed = null;
      }
    }

    // build final suggestions list
    const summary = (computed && Object.keys(computed).length) ? [`Índices calculados: ${Object.entries(computed).map(([k, v]) => `${k}: ${v}`).join('; ')}`] : [];
    let finalSuggestions = [...summary, ...merged];

    // Add suggestion about WHR/cardio risk if high (use local found variable rather than React state)
    if (found && found.whrInfo && found.whrInfo.risk && /Risco aumentado|Risco substancialmente aumentado/i.test(found.whrInfo.risk)) {
      finalSuggestions.unshift('Alerta cardiometabólico: medida de cintura/quadril indica risco aumentado — considerar avaliação cardiovascular e medidas de redução de circunferência abdominal (dieta, atividade física, acompanhamento por profissional de saúde).');
    }

    setSuggestions(finalSuggestions);

    // Generate therapeutic report based on symptoms
    if (found && found.sintomas) {
      const report = generateTherapeuticReport(found.sintomas);
      setTherapeuticData(report);
      
      // Carregar também dados salvos do AdvancedTherapies (Protocolos Terapêuticos Avançados)
      if (found.advancedTherapiesData && Array.isArray(found.advancedTherapiesData)) {
        // Mesclar com report existente
        setTherapeuticData(prev => [...prev, ...found.advancedTherapiesData]);
      }
      
      // Buscar protocolos do Dr. Boarim relacionados aos sintomas
      const boarimProts = getBoarimProtocolsBySymptoms(found.sintomas);
      setBoarimProtocols(boarimProts);
    }
    })();
  }, [id]);

  // Carregar todos os pacientes
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    setAllAnamneses(saved);
    
    // Extrair lista única de pacientes
    const patientsMap = new Map();
    saved.forEach(anam => {
      if (anam.q01_nome && !patientsMap.has(anam.q01_nome)) {
        patientsMap.set(anam.q01_nome, {
          nome: anam.q01_nome,
          dataNascimento: anam.q02_data_nascimento
        });
      }
    });
    setUniquePatients(Array.from(patientsMap.values()));
    
    // Se veio ID na URL, carregar esse paciente
    if (id) {
      const found = saved.find((x) => String(x.id) === String(id));
      if (found) {
        const patient = { nome: found.q01_nome, dataNascimento: found.q02_data_nascimento };
        setSelectedPatient(patient);
      }
    }
  }, [id]);

  // Carregar dados dos exames laboratoriais exportados
  useEffect(() => {
    const examData = JSON.parse(localStorage.getItem('examData') || 'null');
    if (examData && examData.exames && Array.isArray(examData.exames)) {
      console.log('📊 Dados de exames carregados:', examData);
      
      // Extrair sintomas/condições dos exames alterados
      const examSymptoms = examData.exames
        .filter(ex => ex.interpretacao && ex.interpretacao.toLowerCase().includes('alto'))
        .map(ex => `${ex.exame} elevado`)
        .concat(
          examData.exames
            .filter(ex => ex.interpretacao && ex.interpretacao.toLowerCase().includes('baixo'))
            .map(ex => `${ex.exame} reduzido`)
        );
      
      // Adicionar aos sintomas existentes se houver paciente selecionado
      if (examSymptoms.length > 0) {
        console.log('📋 Sintomas detectados nos exames:', examSymptoms);
        // Aqui você pode integrar com o sistema de sugestões
      }
    }
  }, []);

  // Atualizar anamneses quando paciente for selecionado
  useEffect(() => {
    if (selectedPatient && allAnamneses.length > 0) {
      const anamList = allAnamneses
        .filter(a => a.q01_nome === selectedPatient.nome)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPatientAnamneses(anamList);
      
      // Se há ID na URL, usar essa anamnese específica
      if (id) {
        const found = allAnamneses.find((x) => String(x.id) === String(id));
        if (found) {
          setEntry(found);
        }
      } else if (anamList.length > 0) {
        // Senão, selecionar a mais recente
        setEntry(anamList[0]);
      }
    } else if (!selectedPatient) {
      setPatientAnamneses([]);
      if (!id) setEntry(null);
    }
  }, [selectedPatient, allAnamneses, id]);

  // Consolidar todas as terapias quando houver mudança nos dados
  useEffect(() => {
    if (entry && (therapeuticData.length > 0 || boarimProtocols.length > 0)) {
      const consolidated = consolidateAllTherapies(entry, therapeuticData, boarimProtocols);
      setConsolidatedTherapies(consolidated);
    }
  }, [entry, therapeuticData, boarimProtocols]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Não informado';
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Função para imprimir apenas sugestões terapêuticas consolidadas
  async function downloadConsolidatedTherapies() {
    const el = document.getElementById('consolidated-therapies-section');
    if (!el || !entry) {
      alert('Nenhuma sugestão terapêutica disponível para impressão.');
      return;
    }

    const patientName = entry.q01_nome ? entry.q01_nome.replace(/\s+/g, '-').toLowerCase() : 'interagente';
    try {
      const bodyHtml = `
        <div style="padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #2e7d32; margin-bottom: 10px;">SUGESTÕES TERAPÊUTICAS INTEGRATIVAS</h2>
            <p style="color: #666; font-size: 14px;">Protocolo Personalizado para ${entry.q01_nome || 'Interagente'}</p>
            <p style="color: #999; font-size: 12px;">Data: ${formatDate(entry.createdAt)}</p>
          </div>
          ${el.innerHTML}
        </div>
      `;
      const qr = `${window.location.origin}/therapy-suggestions/${id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `Sugestões Terapêuticas - ${patientName}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `sugestoes-terapeuticas-${patientName}-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  }

  async function downloadPdf(sectionId = null) {
    // Determine which element to convert based on section parameter
    let elementId = 'suggestions-print-area';
    let filename = 'anamnese-completa';
    
    if (sectionId === 'suggestions') {
      elementId = 'suggestions-section';
      filename = 'sugestoes-terapeuticas';
    } else if (sectionId === 'protocol') {
      elementId = 'protocol-section';
      filename = 'protocolo-tratamento';
    } else if (sectionId === 'report') {
      elementId = 'report-section';
      filename = 'relatorio-clinico';
    }

    const el = document.getElementById(elementId);
    if (!el) {
      console.error(`Element ${elementId} not found`);
      window.print();
      return;
    }

    const patientName = entry?.nome ? entry.nome.replace(/\s+/g, '-').toLowerCase() : 'paciente';
    try {
      const bodyHtml = el.innerHTML;
      const qr = `${window.location.origin}/anamnese/${id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const title = `${patientName}-${filename}`;
      const html = await buildLetterheadHtml({ title, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${title}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  }

  // Scroll to section if specified in URL
  useEffect(() => {
    if (section && entry) {
      setTimeout(() => {
        const sectionId = `${section}-section`;
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [section, entry]);

  // Handle print action if specified in URL
  useEffect(() => {
    if (shouldPrint && entry) {
      // Add class to body to hide non-relevant sections
      if (section) {
        document.body.classList.add(`print-${section}`);
      }
      
      setTimeout(() => {
        window.print();
        
        // Remove class after printing
        setTimeout(() => {
          if (section) {
            document.body.classList.remove(`print-${section}`);
          }
        }, 500);
      }, 1000);
    }
  }, [shouldPrint, entry, section]);

  // Handle download action if specified in URL
  useEffect(() => {
    if (shouldDownload && entry) {
      setTimeout(() => {
        downloadPdf(section);
      }, 1000);
    }
  }, [shouldDownload, entry, section]);

  // Determine what content to show based on section parameter
  // Se não há section (null), mostra apenas os resultados de exames
  // Se section === 'report', mostra o relatório clínico completo
  const showGeneralInfo = section === 'report' || section === 'all' || section === 'suggestions' || !section;
  const showSuggestions = section === 'report' || section === 'all' || section === 'suggestions';
  const showProtocol = section === 'report' || section === 'all' || section === 'protocol';
  const showReport = section === 'report' || section === 'all';
  const showSpecialistProtocols = section === 'all' || section === 'report'; // Show in complete view and report
  
  // Novo: mostrar apenas exames se não houver section (página de Resultados de Exames)
  const showOnlyExams = !section;

  return (
    <Container>
      <Paper id="suggestions-print-area" sx={{ 
        p: 4, 
        mt: 3,
        background: '#fff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '2px solid #e3f2fd',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '8px',
          background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%)'
        }
      }}>
        {/* Professional Prescription Header */}
        <PrescriptionHeader entry={entry} />
        
        {/* Seletor de Paciente e Consulta - hidden on print */}
        <Box className="no-print" sx={{ mb: 4, mt: 3 }}>
          <Box sx={{ 
            mb: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            borderRadius: 2,
            color: 'white'
          }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                <PersonIcon sx={{ fontSize: 32 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Sugestões Terapêuticas Integrativas
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
                  Selecione o interagente e a avaliação para gerar as sugestões terapêuticas
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={uniquePatients}
                getOptionLabel={(option) => option.nome}
                value={selectedPatient}
                onChange={(event, newValue) => {
                  setSelectedPatient(newValue);
                  if (newValue && !id) {
                    // Navegar para a primeira anamnese desse paciente
                    const anamList = allAnamneses.filter(a => a.q01_nome === newValue.nome);
                    if (anamList.length > 0) {
                      const sorted = anamList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                      navigate(`/therapy-suggestions/${sorted[0].id}?section=report`);
                    }
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="1️⃣ Selecione o Interagente"
                    variant="outlined"
                    placeholder="Digite o nome do interagente..."
                    helperText="Escolha qual interagente deseja ver as sugestões"
                  />
                )}
              />
            </Grid>

            {selectedPatient && patientAnamneses.length > 0 && (
              <Grid item xs={12} md={6}>
                <Autocomplete
                  options={patientAnamneses}
                  getOptionLabel={(option) => {
                    const date = formatDate(option.createdAt);
                    const queixa = option.queixaPrincipal || option.queixas?.join(', ') || 'Sem queixa registrada';
                    return `📅 ${date} - ${queixa.substring(0, 50)}${queixa.length > 50 ? '...' : ''}`;
                  }}
                  value={entry}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      navigate(`/therapy-suggestions/${newValue.id}?section=report`);
                    }
                  }}
                  renderOption={(props, option) => (
                    <Box component="li" {...props} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        📅 {formatDate(option.createdAt)}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666' }}>
                        {option.queixaPrincipal || option.queixas?.join(', ') || 'Sem queixa registrada'}
                      </Typography>
                      {option.sintomas && option.sintomas.length > 0 && (
                        <Typography variant="caption" sx={{ color: '#999', fontStyle: 'italic' }}>
                          {option.sintomas.slice(0, 3).join(', ')}
                          {option.sintomas.length > 3 ? '...' : ''}
                        </Typography>
                      )}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="2️⃣ Data da Avaliação"
                      variant="outlined"
                      placeholder="Escolha a data da avaliação..."
                      helperText={`${patientAnamneses.length} avaliação(ões) registrada(s) para este interagente`}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>

          {!selectedPatient && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                👆 Selecione um interagente acima para visualizar as sugestões terapêuticas personalizadas.
              </Typography>
            </Alert>
          )}

          {selectedPatient && patientAnamneses.length > 1 && entry && (
            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Este interagente possui <strong>{patientAnamneses.length} avaliações</strong> registradas. 
                Visualizando: {formatDate(entry?.createdAt)}.
              </Typography>
            </Alert>
          )}

          {/* Botões de Ação - Impressão */}
          {entry && consolidatedTherapies && (
            <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<DownloadIcon />}
                onClick={downloadConsolidatedTherapies}
                sx={{ 
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(46,125,50,0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(46,125,50,0.4)'
                  }
                }}
              >
                📄 Baixar Sugestões Terapêuticas
              </Button>

              <Button
                variant="outlined"
                color="success"
                size="large"
                startIcon={<PrintIcon />}
                onClick={() => window.print()}
                sx={{ fontWeight: 600 }}
              >
                🖨️ Imprimir
              </Button>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/dashboard')}
              >
                ↩️ Voltar
              </Button>
            </Box>
          )}
        </Box>
        
        {/* Legacy print header - kept for compatibility */}
        <Box sx={{ mb: 3, mt: 1, display: 'none' }}>
          {(() => {
            try {
              // eslint-disable-next-line global-require
              const PrintHeader = require('../components/PrintHeader').default;
              return <PrintHeader entry={entry} showMedicalStyle={true} />;
            } catch (err) {
              return null;
            }
          })()}
        </Box>

        {/* Action buttons - hidden on print */}
        <Box className="no-print" sx={{ display:'flex', justifyContent:'flex-end', gap:1, mb: 2, flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={() => navigate(`/anamnese/${id}`)}>Voltar</Button>
          <Button variant="outlined" onClick={() => window.print()}>Imprimir</Button>
          <Button variant="contained" onClick={downloadPdf}>Download PDF</Button>
          <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={handleSaveHistorico} disabled={!entry && !patientAnamneses?.length}>
            💾 Salvar no Histórico
          </Button>
          {savedMsg && <Chip label={savedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
        </Box>

        {/* Therapeutic Data Status - hidden on print */}
        <Box className="no-print">
          <TherapeuticDataStatus showDetails={false} />
        </Box>

        {/* Main Title */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 3,
          pb: 2,
          borderBottom: '2px solid #1976d2'
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 600, 
            color: '#1976d2',
            letterSpacing: 1,
            fontFamily: 'Georgia, serif'
          }}>
            {section === 'protocol' ? 'Protocolo de Tratamento Completo' : 
             section === 'report' ? 'Relatório Clínico Integrativo' :
             'Resultados de Exames Laboratoriais e Orientações Terapêuticas'}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', mt: 1, display: 'block' }}>
            Data de emissão: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
          </Typography>
        </Box>

        {/* SEÇÃO DE EXAMES LABORATORIAIS - Exibir APENAS os exames registrados */}
        {entry && entry.laboratoryExams && Object.keys(entry.laboratoryExams).length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ 
              mb: 3, 
              color: '#d32f2f', 
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <span>🩺</span> Resultados dos Exames Laboratoriais
            </Typography>

            {entry.laboratoryExamsDate && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Data da realização:</strong> {new Date(entry.laboratoryExamsDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Alert>
            )}

            {/* Exibir cada categoria de exames */}
            {Object.entries(entry.laboratoryExams).map(([categoria, exames]) => {
              // Pular se não houver exames nesta categoria
              if (!exames || Object.keys(exames).length === 0) return null;
              
              return (
                <Paper key={categoria} sx={{ p: 3, mb: 3, bgcolor: '#fff', border: '2px solid #1976d2', borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ 
                    mb: 2, 
                    color: '#1976d2', 
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #e3f2fd',
                    pb: 1
                  }}>
                    {(() => {
                      const categoriaNomes = {
                        hemograma: '🩸 Hemograma Completo',
                        perfilLipidico: '🫀 Perfil Lipídico',
                        funcaoHepatica: '🫁 Função Hepática',
                        funcaoRenal: '🔬 Função Renal',
                        funcaoTireoidiana: '🦋 Função Tireoidiana',
                        diabetesGlicemia: '🍬 Diabetes e Glicemia',
                        hormoniosSexuais: '💊 Hormônios Sexuais',
                        vitaminas: '💊 Vitaminas',
                        minerais: '⚡ Minerais e Eletrólitos',
                        marcadoresInflamatorios: '🔥 Marcadores Inflamatórios',
                        marcadoresTumorais: '🎗️ Marcadores Tumorais',
                        hormoniosEndocrinos: '🧬 Hormônios Endócrinos',
                        coagulacao: '🩸 Coagulação',
                        urinanalise: '💧 Urinálise',
                        outrosExames: '🔬 Outros Exames'
                      };
                      return categoriaNomes[categoria] || categoria;
                    })()}
                  </Typography>

                  {/* Exibir cada exame da categoria */}
                  <Grid container spacing={2}>
                    {Object.entries(exames).map(([exameId, valor]) => {
                      // Pular exames vazios
                      if (!valor || valor === '') return null;

                      // Buscar interpretação do exame
                      const interpretacao = entry.laboratoryExamsInterpretations?.[categoria]?.[exameId];
                      
                      // Definir cor baseada no status
                      let statusColor = '#2e7d32'; // verde para normal
                      let statusIcon = '✓';
                      if (interpretacao) {
                        if (interpretacao.status === 'baixo') {
                          statusColor = '#1976d2';
                          statusIcon = '▼';
                        } else if (interpretacao.status === 'alto') {
                          statusColor = '#d32f2f';
                          statusIcon = '▲';
                        } else if (interpretacao.status === 'borderline') {
                          statusColor = '#ed6c02';
                          statusIcon = '⚠';
                        }
                      }

                      return (
                        <Grid item xs={12} md={6} key={exameId}>
                          <Card sx={{ 
                            p: 2, 
                            bgcolor: interpretacao && interpretacao.status !== 'normal' ? `${statusColor}11` : '#f5f5f5',
                            border: `2px solid ${statusColor}`,
                            borderRadius: 1
                          }}>
                            {/* Nome do exame e valor */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#333' }}>
                                {(() => {
                                  // Formatar nome do exame
                                  return exameId.replace(/([A-Z])/g, ' $1').trim()
                                    .split(' ')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(' ');
                                })()}
                              </Typography>
                              <Chip 
                                label={statusIcon + ' ' + (interpretacao?.status || 'registrado').toUpperCase()}
                                sx={{ 
                                  bgcolor: statusColor, 
                                  color: '#fff',
                                  fontWeight: 700,
                                  fontSize: '0.75rem'
                                }}
                                size="small"
                              />
                            </Box>

                            <Typography variant="h6" sx={{ color: statusColor, fontWeight: 700, mb: 1 }}>
                              {valor}
                            </Typography>

                            {/* Interpretação detalhada */}
                            {interpretacao && interpretacao.interpretacao && (
                              <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                                {/* Significado */}
                                {interpretacao.interpretacao.significado && (
                                  <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#1976d2', display: 'block', mb: 0.5 }}>
                                      📊 Significado:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#555' }}>
                                      {interpretacao.interpretacao.significado}
                                    </Typography>
                                  </Box>
                                )}

                                {/* Causas */}
                                {interpretacao.interpretacao.causas && interpretacao.interpretacao.causas.length > 0 && (
                                  <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#7b1fa2', display: 'block', mb: 0.5 }}>
                                      🔍 Possíveis Causas:
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 3, mt: 0.5, mb: 0 }}>
                                      {interpretacao.interpretacao.causas.slice(0, 3).map((causa, idx) => (
                                        <li key={idx}>
                                          <Typography variant="caption" sx={{ color: '#666', lineHeight: 1.4 }}>
                                            {causa}
                                          </Typography>
                                        </li>
                                      ))}
                                    </Box>
                                  </Box>
                                )}

                                {/* Orientações Terapêuticas */}
                                {interpretacao.interpretacao.orientacoes && interpretacao.interpretacao.orientacoes.length > 0 && (
                                  <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: 1, border: '1px solid #66bb6a' }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#2e7d32', display: 'block', mb: 0.5 }}>
                                      💡 Orientações Terapêuticas:
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 3, mt: 0.5, mb: 0 }}>
                                      {interpretacao.interpretacao.orientacoes.map((orientacao, idx) => (
                                        <li key={idx}>
                                          <Typography variant="caption" sx={{ color: '#555', lineHeight: 1.4, fontWeight: 500 }}>
                                            {orientacao}
                                          </Typography>
                                        </li>
                                      ))}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              );
            })}

            {/* Resumo de Ações Prioritárias */}
            {(() => {
              // Coletar todos os exames alterados
              const examesAlterados = [];
              
              if (entry.laboratoryExamsInterpretations) {
                Object.entries(entry.laboratoryExamsInterpretations).forEach(([categoria, exames]) => {
                  Object.entries(exames).forEach(([exameId, interpretacao]) => {
                    if (interpretacao.status !== 'normal' && interpretacao.interpretacao) {
                      examesAlterados.push({
                        categoria,
                        exameId,
                        status: interpretacao.status,
                        interpretacao: interpretacao.interpretacao,
                        valor: entry.laboratoryExams[categoria]?.[exameId]
                      });
                    }
                  });
                });
              }

              if (examesAlterados.length === 0) {
                return (
                  <Alert severity="success" sx={{ mt: 3 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ✅ Todos os exames laboratoriais estão dentro dos valores de referência!
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Continue mantendo hábitos saudáveis para preservar esses resultados.
                    </Typography>
                  </Alert>
                );
              }

              return (
                <Paper sx={{ p: 3, bgcolor: '#fff3e0', border: '2px solid #ff9800', borderRadius: 2, mt: 3 }}>
                  <Typography variant="h6" sx={{ color: '#e65100', fontWeight: 700, mb: 2 }}>
                    🎯 Resumo de Ações Prioritárias
                  </Typography>

                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      <strong>{examesAlterados.length} exame(s)</strong> apresenta(m) valores fora da referência e requer(em) atenção.
                    </Typography>
                  </Alert>

                  {/* Agrupar orientações por prioridade */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d32f2f', mb: 1 }}>
                      📋 Suplementações e Terapias Recomendadas:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3 }}>
                      {examesAlterados
                        .filter(e => e.interpretacao.orientacoes && e.interpretacao.orientacoes.length > 0)
                        .map((exame, idx) => (
                          <li key={idx}>
                            <Typography variant="body2" sx={{ color: '#555', mb: 0.5 }}>
                              <strong>{exame.exameId.replace(/([A-Z])/g, ' $1').trim()}:</strong>{' '}
                              {exame.interpretacao.orientacoes[0]}
                            </Typography>
                          </li>
                        ))}
                    </Box>
                  </Box>

                  <Alert severity="info" sx={{ mt: 2 }}>
                    <Typography variant="caption">
                      <strong>Importante:</strong> Estas orientações são baseadas na Medicina Integrativa e devem ser ajustadas conforme a evolução do quadro. 
                      Recomenda-se reavaliação dos exames em 30-90 dias, conforme orientação profissional.
                    </Typography>
                  </Alert>
                </Paper>
              );
            })()}
          </Box>
        )}

        {/* Mensagem caso não haja exames registrados */}
        {(!entry || !entry.laboratoryExams || Object.keys(entry.laboratoryExams).length === 0) && (
          <Alert severity="info" sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
              📝 Nenhum exame laboratorial registrado
            </Typography>
            <Typography variant="body2">
              Para visualizar as sugestões terapêuticas baseadas em exames, é necessário primeiro registrar os resultados dos exames laboratoriais na página de{' '}
              <Button 
                size="small" 
                onClick={() => navigate(`/exames-laboratoriais/${id}`)}
                sx={{ textTransform: 'none', fontWeight: 600 }}
              >
                Exames Laboratoriais
              </Button>.
            </Typography>
          </Alert>
        )}

        {/* Health Indicators Section - IMC, WHR, Blood Type, Blood Pressure */}
        {showGeneralInfo && entry && (entry.bmiInfo || entry.whrInfo || entry.tipo_sanguineo || entry.pressao_arterial) && (
          <Box sx={{ 
            mb: 3,
            p: 3,
            background: '#e3f2fd',
            borderRadius: 2,
            border: '2px solid #1976d2'
          }}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              color: '#1976d2',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              📊 Indicadores de Saúde e Orientações
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              {/* IMC */}
              {entry.bmiInfo && (
                <Paper sx={{ p: 2, background: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Índice de Massa Corporal (IMC)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Valor:</strong> {entry.bmiInfo.bmi || entry.bmiInfo.value} kg/m² - {entry.bmiInfo.category}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#555', fontStyle: 'italic' }}>
                    <strong>Orientação:</strong> {(() => {
                      const cat = entry.bmiInfo.category;
                      if (cat === 'Baixo peso' || cat.includes('Baixo peso')) {
                        return 'Considerar suplementação nutricional, dieta hipercalórica saudável e acompanhamento nutricional.';
                      } else if (cat === 'Peso normal' || cat.includes('normal')) {
                        return 'Manter hábitos saudáveis com alimentação equilibrada e atividade física regular.';
                      } else if (cat === 'Sobrepeso' || cat.includes('Sobrepeso')) {
                        return 'Redução gradual de peso através de dieta balanceada, atividade física e fitoterapia termogênica (chá verde, hibisco).';
                      } else if (cat === 'Obesidade grau I' || cat.includes('grau I')) {
                        return 'Programa de emagrecimento com orientação profissional. Considerar fitoterapia (alcachofra, carqueja), jejum intermitente supervisionado.';
                      } else if (cat === 'Obesidade grau II' || cat.includes('grau II')) {
                        return 'Acompanhamento multidisciplinar urgente. Fitoterapia de suporte, avaliação hormonal, reeducação alimentar intensiva.';
                      } else if (cat === 'Obesidade grau III' || cat.includes('grau III')) {
                        return 'Acompanhamento por profissional de saúde e equipes multidisciplinares imediato. Risco cardiovascular elevado.';
                      }
                      return 'Orientação não disponível para esta categoria.';
                    })()}
                  </Typography>
                </Paper>
              )}

              {/* WHR */}
              {entry.whrInfo && (
                <Paper sx={{ p: 2, background: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Relação Cintura-Quadril (WHR)
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Valor:</strong> {entry.whrInfo.value} - {entry.whrInfo.risk}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#555', fontStyle: 'italic' }}>
                    <strong>Orientação:</strong> {
                      /baixo/i.test(entry.whrInfo.risk) ? 'Manter medidas corporais saudáveis com exercícios regulares e dieta equilibrada.' :
                      /moderado/i.test(entry.whrInfo.risk) ? 'Iniciar programa de redução de gordura abdominal: exercícios aeróbicos, chás termogênicos (gengibre, canela), redução de carboidratos refinados.' :
                      'Risco cardiometabólico elevado! Priorizar exercícios abdominais/aeróbicos, dieta anti-inflamatória, suplementação com ômega-3, avaliação cardiológica recomendada.'
                    }
                  </Typography>
                </Paper>
              )}

              {/* Tipo Sanguíneo */}
              {entry.tipo_sanguineo && (
                <Paper sx={{ p: 2, background: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Tipo Sanguíneo
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tipo:</strong> {entry.tipo_sanguineo}
                  </Typography>
                  
                  {/* Compatibilidade para Transfusões */}
                  <Typography variant="caption" sx={{ display: 'block', mt: 1, mb: 0.5, fontWeight: 600, color: '#c62828' }}>
                    🩸 Compatibilidade para Transfusão:
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#555', pl: 1 }}>
                    {(() => {
                      const tipo = entry.tipo_sanguineo.toUpperCase().replace(/\s/g, '');
                      const compatibilidades = {
                        'A+': { recebe: 'A+, A-, O+, O-', doa: 'A+, AB+' },
                        'A-': { recebe: 'A-, O-', doa: 'A+, A-, AB+, AB-' },
                        'B+': { recebe: 'B+, B-, O+, O-', doa: 'B+, AB+' },
                        'B-': { recebe: 'B-, O-', doa: 'B+, B-, AB+, AB-' },
                        'AB+': { recebe: 'Todos os tipos (receptor universal)', doa: 'AB+ apenas' },
                        'AB-': { recebe: 'AB-, A-, B-, O-', doa: 'AB+, AB-' },
                        'O+': { recebe: 'O+, O-', doa: 'A+, B+, AB+, O+ (maioria)' },
                        'O-': { recebe: 'O- apenas', doa: 'Todos os tipos (doador universal)' }
                      };
                      const comp = compatibilidades[tipo] || { recebe: 'Consultar tabela', doa: 'Consultar tabela' };
                      return `• Pode receber de: ${comp.recebe}\n• Pode doar para: ${comp.doa}`;
                    })()}
                  </Typography>

                  {/* Compatibilidade para Gestação */}
                  <Typography variant="caption" sx={{ display: 'block', mt: 1.5, mb: 0.5, fontWeight: 600, color: '#7b1fa2' }}>
                    👶 Compatibilidade para Gestação (Fator Rh):
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#555', pl: 1 }}>
                    {(() => {
                      const tipo = entry.tipo_sanguineo.toUpperCase();
                      if (tipo.includes('-')) {
                        return '⚠️ Mãe Rh negativo: Necessária atenção especial se pai for Rh positivo.\n• Risco de incompatibilidade Rh (eritroblastose fetal)\n• Administrar imunoglobulina anti-Rh (RhoGAM) na 28ª semana e após o parto\n• Acompanhamento pré-natal rigoroso com exames de Coombs indireto';
                      } else if (tipo.includes('+')) {
                        return '✓ Mãe Rh positivo: Sem risco de incompatibilidade Rh.\n• Compatível com pai Rh+ ou Rh-\n• Não há necessidade de imunoglobulina anti-Rh\n• Acompanhamento pré-natal padrão';
                      }
                      return 'Verificar fator Rh para orientação completa';
                    })()}
                  </Typography>

                  <Typography variant="caption" sx={{ display: 'block', mt: 1.5, color: '#555', fontStyle: 'italic' }}>
                    <strong>Dieta por Tipo Sanguíneo:</strong> Terapêutica pode ser ajustada conforme tipo sanguíneo (Dr. Peter D'Adamo). 
                    {entry.diagnostico_tipo_sanguineo && ` ${entry.diagnostico_tipo_sanguineo}`}
                  </Typography>
                </Paper>
              )}

              {/* Pressão Arterial */}
              {entry.pressao_arterial && (
                <Paper sx={{ p: 2, background: '#fff' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
                    Pressão Arterial
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Medida:</strong> {entry.pressao_arterial} mmHg
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', color: '#555', fontStyle: 'italic' }}>
                    <strong>Orientação:</strong> {(() => {
                      if (!entry.pressao_arterial || !entry.pressao_arterial.includes('/')) return 'Verificar medida correta (formato: 120/80).';
                      const [sys, dia] = entry.pressao_arterial.split('/').map(v => parseInt(v));
                      if (isNaN(sys) || isNaN(dia)) return 'Verificar medida correta.';
                      if (sys < 90 || dia < 60) return 'Hipotensão: Aumentar ingestão de água e sal moderadamente, chá de alecrim, gengibre. Avaliar causas (anemia, desidratação).';
                      if (sys >= 90 && sys <= 120 && dia >= 60 && dia <= 80) return 'Pressão normal! Manter hábitos saudáveis, dieta equilibrada, controle de estresse.';
                      if (sys > 120 && sys < 130) return 'Pressão elevada: Reduzir sódio, aumentar potássio (banana, abacate), chá de hibisco, exercícios regulares.';
                      if (sys >= 130 || dia >= 80) return 'Hipertensão: URGENTE - Dieta DASH, chá de hibisco (3x/dia), alho, redução de sal, acompanhamento por profissional de saúde obrigatório, suplementação com magnésio e ômega-3.';
                      if (sys > 180 || dia > 120) return 'CRISE HIPERTENSIVA - Encaminhar para assistência de saúde imediata!';
                      return 'Monitorar pressão regularmente.';
                    })()}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        )}

        {/* Resultados de Exames Complementares */}
        {showGeneralInfo && entry && (entry.iridologyAnalysis || entry.biorresonanciaBarraAnalysis || entry.biorresonanciaAuricularAnalysis || entry.vitalSignsAnalysis || entry.clinicalSignsChecklist) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#7b1fa2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>🔬</span> Resultados de Exames Complementares
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              {entry.iridologyAnalysis && (
                <Paper sx={{ p: 2, background: '#f3e5f5', border: '2px solid #9c27b0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7b1fa2', mb: 2 }}>
                    👁️ Análise de Iridologia
                  </Typography>
                  {typeof entry.iridologyAnalysis === 'object' ? (
                    <Box>
                      {entry.iridologyAnalysis.leftIrisImage && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                            Íris Esquerda:
                          </Typography>
                          <img 
                            src={entry.iridologyAnalysis.leftIrisImage} 
                            alt="Íris Esquerda" 
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }}
                          />
                        </Box>
                      )}
                      {entry.iridologyAnalysis.rightIrisImage && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
                            Íris Direita:
                          </Typography>
                          <img 
                            src={entry.iridologyAnalysis.rightIrisImage} 
                            alt="Íris Direita" 
                            style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '4px' }}
                          />
                        </Box>
                      )}
                      {entry.iridologyAnalysis.zones && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Zonas Analisadas:</strong> {entry.iridologyAnalysis.zones.length} regiões identificadas
                        </Typography>
                      )}
                      {entry.iridologyAnalysis.date && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          Data da análise: {new Date(entry.iridologyAnalysis.date).toLocaleString('pt-BR')}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {entry.iridologyAnalysis}
                    </Typography>
                  )}
                </Paper>
              )}
              {entry.biorresonanciaBarraAnalysis && (
                <Paper sx={{ p: 2, background: '#e1f5fe', border: '2px solid #0288d1' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0277bd', mb: 2 }}>
                    📊 Biorressonância I (BARRA)
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {entry.biorresonanciaBarraAnalysis}
                  </Typography>
                </Paper>
              )}
              {entry.biorresonanciaAuricularAnalysis && (
                <Paper sx={{ p: 2, background: '#fff3e0', border: '2px solid #f57c00' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#e65100', mb: 2 }}>
                    🎧 Biorressonância II (AURICULAR)
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {entry.biorresonanciaAuricularAnalysis}
                  </Typography>
                </Paper>
              )}
              {entry.vitalSignsAnalysis && (
                <Paper sx={{ p: 2, background: '#e8f5e9', border: '2px solid #4caf50' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32', mb: 2 }}>
                    💓 Análise de Sinais Vitais
                  </Typography>
                  {typeof entry.vitalSignsAnalysis === 'object' ? (
                    <Box>
                      {entry.vitalSignsAnalysis.vitalSigns && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" component="div">
                            {entry.vitalSignsAnalysis.vitalSigns.systolicBP && entry.vitalSignsAnalysis.vitalSigns.diastolicBP && (
                              <div>• <strong>Pressão Arterial:</strong> {entry.vitalSignsAnalysis.vitalSigns.systolicBP}/{entry.vitalSignsAnalysis.vitalSigns.diastolicBP} mmHg</div>
                            )}
                            {entry.vitalSignsAnalysis.vitalSigns.heartRate && (
                              <div>• <strong>Frequência Cardíaca:</strong> {entry.vitalSignsAnalysis.vitalSigns.heartRate} bpm</div>
                            )}
                            {entry.vitalSignsAnalysis.vitalSigns.oxygenSaturation && (
                              <div>• <strong>Saturação O₂:</strong> {entry.vitalSignsAnalysis.vitalSigns.oxygenSaturation}%</div>
                            )}
                            {entry.vitalSignsAnalysis.vitalSigns.temperature && (
                              <div>• <strong>Temperatura:</strong> {entry.vitalSignsAnalysis.vitalSigns.temperature}°C</div>
                            )}
                            {entry.vitalSignsAnalysis.vitalSigns.weight && (
                              <div>• <strong>Peso:</strong> {entry.vitalSignsAnalysis.vitalSigns.weight} kg</div>
                            )}
                            {entry.vitalSignsAnalysis.vitalSigns.height && (
                              <div>• <strong>Altura:</strong> {entry.vitalSignsAnalysis.vitalSigns.height} cm</div>
                            )}
                          </Typography>
                        </Box>
                      )}
                      {entry.vitalSignsAnalysis.calculatedValues && (
                        <Box>
                          {entry.vitalSignsAnalysis.calculatedValues.bmi && (
                            <Typography variant="body2">
                              • <strong>IMC:</strong> {entry.vitalSignsAnalysis.calculatedValues.bmi} - {entry.vitalSignsAnalysis.calculatedValues.bmiCategory}
                            </Typography>
                          )}
                          {entry.vitalSignsAnalysis.calculatedValues.whr && (
                            <Typography variant="body2">
                              • <strong>RCQ:</strong> {entry.vitalSignsAnalysis.calculatedValues.whr} - {entry.vitalSignsAnalysis.calculatedValues.whrCategory}
                            </Typography>
                          )}
                        </Box>
                      )}
                      {entry.vitalSignsAnalysis.timestamp && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          Data da análise: {new Date(entry.vitalSignsAnalysis.timestamp).toLocaleString('pt-BR')}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {entry.vitalSignsAnalysis}
                    </Typography>
                  )}
                </Paper>
              )}
              {entry.clinicalSignsChecklist && (
                <Paper sx={{ p: 2, background: '#fff8e1', border: '2px solid #ffa726' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f57c00', mb: 2 }}>
                    🩺 Sinais Clínicos Observados
                  </Typography>
                  {typeof entry.clinicalSignsChecklist === 'object' ? (
                    <Box>
                      {entry.clinicalSignsChecklist.selectedSigns && entry.clinicalSignsChecklist.selectedSigns.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                            Total de sinais: {entry.clinicalSignsChecklist.selectedSigns.length}
                          </Typography>
                          {Object.entries(
                            entry.clinicalSignsChecklist.selectedSigns.reduce((acc, sign) => {
                              const category = sign.category || 'Outros';
                              if (!acc[category]) acc[category] = [];
                              acc[category].push(sign);
                              return acc;
                            }, {})
                          ).map(([category, signs]) => (
                            <Box key={category} sx={{ mb: 1.5 }}>
                              <Typography variant="caption" sx={{ fontWeight: 600, color: '#e65100' }}>
                                {category}:
                              </Typography>
                              <Typography variant="body2" component="div" sx={{ ml: 2 }}>
                                {signs.map((sign, idx) => (
                                  <div key={idx}>• {sign.label}</div>
                                ))}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      )}
                      {entry.clinicalSignsChecklist.bloodType && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Tipo Sanguíneo:</strong> {entry.clinicalSignsChecklist.bloodType}
                        </Typography>
                      )}
                      {entry.clinicalSignsChecklist.timestamp && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
                          Data do checklist: {new Date(entry.clinicalSignsChecklist.timestamp).toLocaleString('pt-BR')}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {entry.clinicalSignsChecklist}
                    </Typography>
                  )}
                </Paper>
              )}
            </Box>
          </Box>
        )}

        {/* Exames de Sangue */}
        {showGeneralInfo && (() => {
          const bloodTests = JSON.parse(localStorage.getItem('bloodTests') || '[]');
          const patientTests = bloodTests.filter(test => test.patientName === entry?.q01_nome);
          return patientTests.length > 0 ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <span>🩸</span> Exames de Sangue
              </Typography>
              {patientTests.map((test, idx) => (
                <Paper key={idx} sx={{ p: 3, mb: 2, background: '#ffebee', border: '2px solid #d32f2f' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#c62828', mb: 2 }}>
                    Exame realizado em: {new Date(test.testDate).toLocaleDateString('pt-BR')}
                    {test.laboratory && ` - ${test.laboratory}`}
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                    {Object.keys(test).filter(key => 
                      !['id', 'patientId', 'patientName', 'testDate', 'laboratory', 'requestingDoctor', 'createdAt', 'updatedAt', 'observations'].includes(key) &&
                      !key.includes('_obs') && !key.includes('_causes') && !key.includes('_treatment') &&
                      !key.includes('Observations') && !key.includes('Causes') && !key.includes('Protocols') &&
                      test[key] && test[key] !== ''
                    ).map(key => (
                      <Box key={key} sx={{ p: 1.5, background: '#fff', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                        <Typography variant="caption" sx={{ display: 'block', fontWeight: 600, color: '#555', mb: 0.5 }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                          {test[key]}
                        </Typography>
                        {test[`${key}_obs`] && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#666', fontStyle: 'italic' }}>
                            📝 {test[`${key}_obs`]}
                          </Typography>
                        )}
                        {test[`${key}_causes`] && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#ff6f00' }}>
                            🔍 {test[`${key}_causes`]}
                          </Typography>
                        )}
                        {test[`${key}_treatment`] && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#2e7d32' }}>
                            💊 {test[`${key}_treatment`]}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : null;
        })()}

        {/* Observações Clínicas Section */}
        {showGeneralInfo && entry && (entry.sinais_unhas || entry.sinais_pele || entry.sinais_olhos || entry.sinais_cabelo || entry.sinais_orelha) && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#ed6c02', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>👁️</span> Observações Clínicas (Diagnóstico Visual)
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
              {entry.sinais_unhas && (Array.isArray(entry.sinais_unhas) ? entry.sinais_unhas.length > 0 : entry.sinais_unhas) && (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 2 }}>
                    💅 Análise das Unhas - Diagnóstico e Tratamento
                  </Typography>
                  <Typography variant="body2" component="div">
                    {Array.isArray(entry.sinais_unhas) ? (
                      <Box>
                        {entry.sinais_unhas.map((sinal, idx) => {
                          const info = getUnhaInfo(sinal);
                          if (!info) return null;
                          
                          return (
                            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < entry.sinais_unhas.length - 1 ? '1px solid #eee' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#c62828', mb: 0.5 }}>
                                {info.nome}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#555' }}>
                                <strong>Sintomas:</strong> {info.sintomas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#795548' }}>
                                <strong>Possíveis Causas:</strong> {info.causas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                <strong>Diagnóstico:</strong> {info.diagnostico}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: '#1976d2' }}>
                                <strong>Tratamento:</strong> {info.tratamento}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : <span>{entry.sinais_unhas}</span>}
                  </Typography>
                </Paper>
              )}
              {entry.sinais_pele && (Array.isArray(entry.sinais_pele) ? entry.sinais_pele.length > 0 : entry.sinais_pele) && (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 2 }}>
                    🧴 Análise da Pele - Diagnóstico e Tratamento
                  </Typography>
                  <Typography variant="body2" component="div">
                    {Array.isArray(entry.sinais_pele) ? (
                      <Box>
                        {entry.sinais_pele.map((sinal, idx) => {
                          const info = getPeleInfo(sinal);
                          if (!info) return null;
                          
                          return (
                            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < entry.sinais_pele.length - 1 ? '1px solid #eee' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#c62828', mb: 0.5 }}>
                                {info.nome}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#555' }}>
                                <strong>Sintomas:</strong> {info.sintomas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#795548' }}>
                                <strong>Possíveis Causas:</strong> {info.causas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                <strong>Diagnóstico:</strong> {info.diagnostico}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: '#1976d2' }}>
                                <strong>Tratamento:</strong> {info.tratamento}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : <span>{entry.sinais_pele}</span>}
                  </Typography>
                </Paper>
              )}
              {entry.sinais_olhos && (Array.isArray(entry.sinais_olhos) ? entry.sinais_olhos.length > 0 : entry.sinais_olhos) && (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 2 }}>
                    👁️ Análise dos Olhos - Diagnóstico e Tratamento
                  </Typography>
                  <Typography variant="body2" component="div">
                    {Array.isArray(entry.sinais_olhos) ? (
                      <Box>
                        {entry.sinais_olhos.map((sinal, idx) => {
                          const info = getOlhosInfo(sinal);
                          if (!info) return null;
                          
                          const isUrgent = sinal === 'escl_amarelada';
                          
                          return (
                            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < entry.sinais_olhos.length - 1 ? '1px solid #eee' : 'none', bgcolor: isUrgent ? '#ffebee' : 'transparent', p: isUrgent ? 1 : 0, borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: isUrgent ? '#c62828' : '#c62828', mb: 0.5 }}>
                                {info.nome}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#555' }}>
                                <strong>Sintomas:</strong> {info.sintomas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#795548' }}>
                                <strong>Possíveis Causas:</strong> {info.causas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                <strong>Diagnóstico:</strong> {info.diagnostico}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: '#1976d2' }}>
                                <strong>Tratamento:</strong> {info.tratamento}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : <span>{entry.sinais_olhos}</span>}
                  </Typography>
                </Paper>
              )}
              {entry.sinais_cabelo && (Array.isArray(entry.sinais_cabelo) ? entry.sinais_cabelo.length > 0 : entry.sinais_cabelo) && (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 2 }}>
                    💇 Análise do Cabelo - Diagnóstico e Tratamento
                  </Typography>
                  <Typography variant="body2" component="div">
                    {Array.isArray(entry.sinais_cabelo) ? (
                      <Box>
                        {entry.sinais_cabelo.map((sinal, idx) => {
                          const info = getCabeloInfo(sinal);
                          if (!info) return null;
                          
                          return (
                            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < entry.sinais_cabelo.length - 1 ? '1px solid #eee' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#c62828', mb: 0.5 }}>
                                {info.nome}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#555' }}>
                                <strong>Sintomas:</strong> {info.sintomas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#795548' }}>
                                <strong>Possíveis Causas:</strong> {info.causas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                <strong>Diagnóstico:</strong> {info.diagnostico}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: '#1976d2' }}>
                                <strong>Tratamento:</strong> {info.tratamento}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : <span>{entry.sinais_cabelo}</span>}
                  </Typography>
                </Paper>
              )}
              {entry.sinais_orelha && (Array.isArray(entry.sinais_orelha) ? entry.sinais_orelha.length > 0 : entry.sinais_orelha) && (
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f', mb: 2 }}>
                    👂 Análise da Orelha - Diagnóstico e Tratamento
                  </Typography>
                  <Typography variant="body2" component="div">
                    {Array.isArray(entry.sinais_orelha) ? (
                      <Box>
                        {entry.sinais_orelha.map((sinal, idx) => {
                          const info = getOrelhaInfo(sinal);
                          if (!info) return null;
                          
                          const isUrgent = sinal === 'vinco_diagonal';
                          
                          return (
                            <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < entry.sinais_orelha.length - 1 ? '1px solid #eee' : 'none', bgcolor: isUrgent ? '#ffebee' : 'transparent', p: isUrgent ? 1 : 0, borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: isUrgent ? '#c62828' : '#c62828', mb: 0.5 }}>
                                {info.nome}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#555' }}>
                                <strong>Sintomas:</strong> {info.sintomas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: '#795548' }}>
                                <strong>Possíveis Causas:</strong> {info.causas}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                                <strong>Diagnóstico:</strong> {info.diagnostico}
                              </Typography>
                              <Typography variant="caption" sx={{ display: 'block', color: '#1976d2' }}>
                                <strong>Tratamento:</strong> {info.tratamento}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    ) : <span>{entry.sinais_orelha}</span>}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        )}

        {/* Exames de Biorressonância */}
        {showGeneralInfo && (entry?.bioressonancia_pdf || entry?.bioressonancia_auricular_pdf) && (
          <Box sx={{ mb: 4 }}>
            <Divider sx={{ my: 4 }} />
            <Typography variant="h5" sx={{ mb: 3, color: '#c2185b', fontWeight: 600 }}>
              📊 Análise de Biorressonância
            </Typography>
            
            {/* Biorressonância Barra */}
            {(entry?.biorresonanciaBarraFile || entry?.biorresonanciaBarraAnalysis) && (
              <Paper sx={{ p: 3, mb: 3, bgcolor: '#fce4ec' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  📄 Exame de Biorressonância (Barra)
                </Typography>
                
                {entry?.biorresonanciaBarraFile && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Arquivo:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      ✓ {entry.biorresonanciaBarraFile.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Enviado em: {new Date(entry.biorresonanciaBarraFile.uploadDate || Date.now()).toLocaleDateString('pt-BR')}
                    </Typography>
                  </Box>
                )}
                
                {entry?.biorresonanciaBarraAnalysis && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Análise do Exame:
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, bgcolor: 'white', p: 2, borderRadius: 1 }}>
                      {entry.biorresonanciaBarraAnalysis}
                    </Typography>
                  </>
                )}

                {/* Protocolo de Tratamento Biorressonância Barra */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1, border: '1px solid #ffb74d' }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#e65100' }}>
                    📋 Protocolo de Tratamento - Biorressonância (Barra)
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Fitoterapia e Suplementação:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Detoxificação hepática: Cardo Mariano 300mg 3x/dia, Alcachofra 500mg 2x/dia</Typography></li>
                    <li><Typography variant="body2">Equilíbrio energético: Ginseng Siberiano 500mg 2x/dia</Typography></li>
                    <li><Typography variant="body2">Antioxidantes: Vitamina C 1g/dia, Selênio 200mcg/dia, Coenzima Q10 100mg/dia</Typography></li>
                    <li><Typography variant="body2">Suporte imunológico: Vitamina D3 2000UI/dia, Zinco 30mg/dia, Probióticos 10 bilhões UFC/dia</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Terapias Complementares:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Acupuntura: 2-3 sessões/semana focadas nos meridianos desequilibrados</Typography></li>
                    <li><Typography variant="body2">Auriculoterapia: Pontos relacionados aos órgãos afetados</Typography></li>
                    <li><Typography variant="body2">Reiki/Imposição de Mãos: 1-2 sessões/semana para harmonização energética</Typography></li>
                    <li><Typography variant="body2">Florais de Bach: Rescue Remedy + florais específicos conforme estado emocional</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Orientações Nutricionais:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Dieta anti-inflamatória: Reduzir açúcar, glúten, laticínios, alimentos processados</Typography></li>
                    <li><Typography variant="body2">Aumentar: Vegetais verdes escuros, frutas orgânicas, oleaginosas, peixes (ômega-3)</Typography></li>
                    <li><Typography variant="body2">Hidratação: Mínimo 2L água/dia, chás digestivos (hortelã, gengibre, camomila)</Typography></li>
                    <li><Typography variant="body2">Jejum intermitente: 12-16h diárias (conforme tolerância)</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Práticas Integrativas:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <li><Typography variant="body2">Meditação: 15-20 minutos diários, preferencialmente pela manhã</Typography></li>
                    <li><Typography variant="body2">Yoga ou Tai Chi Chuan: 3x/semana, 30-45 minutos</Typography></li>
                    <li><Typography variant="body2">Exercícios respiratórios (Pranayama): 10 minutos 2x/dia</Typography></li>
                    <li><Typography variant="body2">Banhos de sol: 15-20 minutos diários (horários adequados)</Typography></li>
                    <li><Typography variant="body2">Contato com natureza: Caminhadas em parques, terapia com plantas</Typography></li>
                  </Box>
                </Box>
              </Paper>
            )}
            
            {/* Biorressonância Auricular */}
            {(entry?.biorresonanciaAuricularFile || entry?.biorresonanciaAuricularAnalysis) && (
              <Paper sx={{ p: 3, mb: 3, bgcolor: '#f3e5f5' }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#7b1fa2', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  📄 Exame de Biorressonância (Auricular)
                </Typography>
                
                {entry?.biorresonanciaAuricularFile && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Arquivo:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'success.main' }}>
                      ✓ {entry.biorresonanciaAuricularFile.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Enviado em: {new Date(entry.biorresonanciaAuricularFile.uploadDate || Date.now()).toLocaleDateString('pt-BR')}
                    </Typography>
                  </Box>
                )}
                
                {entry?.biorresonanciaAuricularAnalysis && (
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      Análise do Exame:
                    </Typography>
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, bgcolor: 'white', p: 2, borderRadius: 1 }}>
                      {entry.biorresonanciaAuricularAnalysis}
                    </Typography>
                  </>
                )}

                {/* Protocolo de Tratamento Biorressonância Auricular */}
                <Box sx={{ mt: 3, p: 2, bgcolor: '#f3e5f5', borderRadius: 1, border: '1px solid #ba68c8' }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, color: '#6a1b9a' }}>
                    📋 Protocolo de Tratamento - Biorressonância (Auricular)
                  </Typography>
                  
                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Auriculoterapia Específica:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Pontos Shenmen: Ansiedade, estresse, equilíbrio emocional</Typography></li>
                    <li><Typography variant="body2">Pontos de Órgãos: Fígado, Rim, Baço-Pâncreas, Pulmão, Coração conforme mapeamento</Typography></li>
                    <li><Typography variant="body2">Pontos Endócrinos: Tireoide, suprarrenais, hipófise (equilíbrio hormonal)</Typography></li>
                    <li><Typography variant="body2">Protocolo: 2-3 sessões/semana, manter sementes/esferas por 5-7 dias</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Fitoterapia Chinesa e Ayurvédica:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Medicina Chinesa: Chá de Ginseng + Goji Berry + Astragalus para tonificar Qi</Typography></li>
                    <li><Typography variant="body2">Ayurveda: Ashwagandha 500mg 2x/dia (adaptógeno), Triphala à noite (detox)</Typography></li>
                    <li><Typography variant="body2">Equilíbrio Yin-Yang: Chá de Crisântemo + Alcaçuz (harmonização)</Typography></li>
                    <li><Typography variant="body2">Chá de Cavalinha + Chapéu-de-couro: Drenagem e eliminação de toxinas</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Terapia Vibracional e Energética:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Cristaloterapia: Ametista (3º olho), Quartzo Rosa (coração), Citrino (plexo solar)</Typography></li>
                    <li><Typography variant="body2">Aromaterapia: Lavanda (relaxamento), Alecrim (circulação), Tea Tree (purificação)</Typography></li>
                    <li><Typography variant="body2">Musicoterapia: Frequências 432Hz ou 528Hz, 20 minutos diários</Typography></li>
                    <li><Typography variant="body2">Cromterapia: Banhos de luz conforme desequilíbrio identificado</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Oligoelementos e Homeopatia:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <li><Typography variant="body2">Magnésio Dimalato: 400mg/dia (energia celular, relaxamento muscular)</Typography></li>
                    <li><Typography variant="body2">Colágeno Hidrolisado: 10g/dia (regeneração tecidual)</Typography></li>
                    <li><Typography variant="body2">Complexo B ativado: 1 cápsula/dia (sistema nervoso)</Typography></li>
                    <li><Typography variant="body2">Homeopatia: Conforme sintomas individuais (consultar homeopata)</Typography></li>
                  </Box>

                  <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                    Práticas de Harmonização:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <li><Typography variant="body2">Qi Gong: Movimentos suaves 20 minutos/dia, preferencialmente pela manhã</Typography></li>
                    <li><Typography variant="body2">Massagem de meridianos: Auto-massagem nos pontos de acupressão</Typography></li>
                    <li><Typography variant="body2">Banhos terapêuticos: Sal grosso + ervas (alecrim, arruda, guiné) 2x/semana</Typography></li>
                    <li><Typography variant="body2">Limpeza energética: Defumação com sálvia branca ou Palo Santo</Typography></li>
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>
        )}

        {/* Suggestions content with medical prescription style */}
        {!showOnlyExams && showSuggestions && (
        <Box sx={{ 
          minHeight: 300,
          p: 3,
          background: '#fafafa',
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ 
            mb: 2, 
            color: '#1976d2',
            fontWeight: 600,
            borderBottom: '1px solid #e0e0e0',
            pb: 1
          }}>
            Orientações Terapêuticas Gerais:
          </Typography>
          
          {suggestions.length > 0 ? (
            <Box component="ol" sx={{ pl: 2, m: 0 }}>
              {suggestions.map((s, idx) => (
                <Typography 
                  component="li" 
                  key={idx} 
                  sx={{ 
                    mt: 2,
                    mb: 2,
                    lineHeight: 1.8,
                    color: '#333',
                    fontSize: '0.95rem'
                  }}
                >
                  {s}
                </Typography>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
              Nenhuma sugestão disponível no momento.
            </Typography>
          )}
        </Box>
        )}

        {/* Therapeutic Board - Organized suggestions by health problem */}
        {!showOnlyExams && showSuggestions && therapeuticData && therapeuticData.length > 0 && (
          <Box id="suggestions-section" sx={{ mt: 3 }}>
            <TherapeuticBoard therapeuticData={therapeuticData} />
          </Box>
        )}

        {/* Complete Treatment Board - Full protocol with all categories */}
        {!showOnlyExams && showProtocol && therapeuticData && therapeuticData.length > 0 && (
          <Box id="protocol-section" sx={{ mt: 4 }}>
            {section === 'protocol' && <Divider sx={{ my: 4 }} />}
            <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 600 }}>
              📋 Protocolo Completo de Tratamento
            </Typography>
            <CompleteTreatmentBoard 
              patientData={entry} 
              therapeuticData={therapeuticData} 
            />
          </Box>
        )}

        {/* Relatório Clínico Completo - Quadro Imprimível */}
        {!showOnlyExams && showReport && (
        <Box id="report-section" sx={{ mt: 4, pageBreakBefore: section === 'report' ? 'avoid' : 'always' }}>
          {section !== 'report' && <Divider sx={{ my: 4 }} />}
          <Paper sx={{ 
            p: 4, 
            background: '#fff',
            border: '3px solid #1976d2',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            {/* Cabeçalho Completo */}
            <Box sx={{ 
              textAlign: 'center', 
              mb: 4, 
              pb: 3, 
              borderBottom: '3px double #1976d2',
              background: 'linear-gradient(135deg, #e3f2fd 0%, #f5f5f5 100%)',
              p: 3,
              borderRadius: 1
            }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 700, 
                color: '#1976d2',
                mb: 1,
                fontFamily: 'Georgia, serif',
                letterSpacing: 2
              }}>
                RELATÓRIO CLÍNICO INTEGRATIVO
              </Typography>
              <Typography variant="h6" sx={{ color: '#555', mb: 2 }}>
                {therapistFullTitle}
              </Typography>
              <Divider sx={{ my: 2, borderColor: '#1976d2' }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Paciente: {entry?.nome || 'Não informado'}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Data: {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                </Typography>
              </Box>
              {entry?.idade && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Idade: {entry.idade} anos {entry?.genero && `| Sexo: ${entry.genero}`}
                </Typography>
              )}
            </Box>

            {/* Resumo Clínico - Sintomas e Problemas */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                color: '#d32f2f', 
                fontWeight: 600,
                borderLeft: '4px solid #d32f2f',
                pl: 2
              }}>
                📋 QUADRO CLÍNICO APRESENTADO
              </Typography>
              
              {/* Sintomas Relatados */}
              {entry?.sintomas && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1, border: '1px solid #ffb74d' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#e65100' }}>
                    Sintomas Relatados pelo Paciente:
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
                    {entry.sintomas}
                  </Typography>
                </Box>
              )}

              {/* NOVO: Dados do Questionário Abrangente de Saúde */}
              {entry?.comprehensiveHealthData && (
                <Box sx={{ mb: 3, p: 3, bgcolor: '#e3f2fd', borderRadius: 1, border: '2px solid #1976d2' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2, color: '#0d47a1', fontSize: '1.1rem' }}>
                    📋 Questionário Abrangente de Saúde
                  </Typography>
                  
                  {(() => {
                    const health = entry.comprehensiveHealthData;
                    return (
                      <Grid container spacing={2}>
                        {/* Queixas Principais */}
                        {health.queixaPrincipal && health.queixaPrincipal.length > 0 && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1.5, bgcolor: '#ffebee', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#c62828', mb: 1 }}>
                                Queixas Principais:
                              </Typography>
                              <Typography variant="body2" sx={{ pl: 1 }}>
                                {health.queixaPrincipal.join(', ')}
                              </Typography>
                              {health.tempoQueixa && (
                                <Typography variant="body2" sx={{ pl: 1, mt: 0.5, fontStyle: 'italic' }}>
                                  Duração: {health.tempoQueixa}
                                </Typography>
                              )}
                            </Box>
                          </Grid>
                        )}
                        
                        {/* Histórico Familiar */}
                        {health.doencasFamiliares && health.doencasFamiliares.length > 0 && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1.5, bgcolor: '#f3e5f5', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#6a1b9a', mb: 1 }}>
                                Histórico Familiar:
                              </Typography>
                              <Typography variant="body2" sx={{ pl: 1 }}>
                                {health.doencasFamiliares.join(', ')}
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        
                        {/* Doenças Crônicas */}
                        {health.doencasCronicas && health.doencasCronicas.length > 0 && (
                          <Grid item xs={12}>
                            <Box sx={{ p: 1.5, bgcolor: '#fff3e0', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                                Doenças Crônicas:
                              </Typography>
                              <Typography variant="body2" sx={{ pl: 1 }}>
                                {health.doencasCronicas.join(', ')}
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        
                        {/* Medicamentos em Uso */}
                        {health.medicamentosUso && health.medicamentosUso.length > 0 && (
                          <Grid item xs={12}>
                            <Box sx={{ p: 1.5, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                                Medicamentos em Uso:
                              </Typography>
                              <Typography variant="body2" sx={{ pl: 1 }}>
                                {health.medicamentosUso.join(', ')}
                              </Typography>
                            </Box>
                          </Grid>
                        )}
                        
                        {/* Hábitos de Vida */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ p: 1.5, bgcolor: '#e0f2f1', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#00695c', mb: 1 }}>
                              Hábitos de Vida:
                            </Typography>
                            {health.tabagismo && health.tabagismo !== 'Nunca fumei' && (
                              <Typography variant="body2" sx={{ pl: 1 }}>• Tabagismo: {health.tabagismo}</Typography>
                            )}
                            {health.etilismo && health.etilismo !== 'Não consumo' && (
                              <Typography variant="body2" sx={{ pl: 1 }}>• Álcool: {health.etilismo}</Typography>
                            )}
                            {health.atividadeFisica && (
                              <Typography variant="body2" sx={{ pl: 1 }}>• Atividade Física: {health.atividadeFisica}</Typography>
                            )}
                          </Box>
                        </Grid>
                        
                        {/* Alimentação */}
                        <Grid item xs={12} md={6}>
                          <Box sx={{ p: 1.5, bgcolor: '#fff9c4', borderRadius: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#f57f17', mb: 1 }}>
                              Alimentação:
                            </Typography>
                            {health.qualidadeAlimentacao && (
                              <Typography variant="body2" sx={{ pl: 1 }}>• Qualidade: {health.qualidadeAlimentacao}</Typography>
                            )}
                            {health.consumoAgua && (
                              <Typography variant="body2" sx={{ pl: 1 }}>• Água: {health.consumoAgua}</Typography>
                            )}
                            {health.restricoesDietarias && health.restricoesDietarias.length > 0 && (
                              <Typography variant="body2" sx={{ pl: 1 }}>
                                • Restrições: {health.restricoesDietarias.join(', ')}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        
                        {/* Sono */}
                        {health.horasSono && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1.5, bgcolor: '#e8eaf6', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#283593', mb: 1 }}>
                                Sono e Repouso:
                              </Typography>
                              <Typography variant="body2" sx={{ pl: 1 }}>• Horas: {health.horasSono}</Typography>
                              {health.qualidadeSono && (
                                <Typography variant="body2" sx={{ pl: 1 }}>• Qualidade: {health.qualidadeSono}</Typography>
                              )}
                            </Box>
                          </Grid>
                        )}
                        
                        {/* Sistema Digestório */}
                        {(health.funcionamentoIntestinal || health.gases || health.azia) && (
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 1.5, bgcolor: '#fce4ec', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#880e4f', mb: 1 }}>
                                Sistema Digestório:
                              </Typography>
                              {health.funcionamentoIntestinal && (
                                <Typography variant="body2" sx={{ pl: 1 }}>• Intestino: {health.funcionamentoIntestinal}</Typography>
                              )}
                              {health.gases && health.gases !== 'Nunca' && (
                                <Typography variant="body2" sx={{ pl: 1 }}>• Gases: {health.gases}</Typography>
                              )}
                              {health.azia && health.azia !== 'Nunca' && (
                                <Typography variant="body2" sx={{ pl: 1 }}>• Azia: {health.azia}</Typography>
                              )}
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    );
                  })()}
                </Box>
              )}

              {/* PROTOCOLOS DE TRATAMENTO - Baseados em TODAS as condições marcadas */}
              {(() => {
                if (!entry?.comprehensiveHealthData) return null;
                
                const healthData = entry.comprehensiveHealthData;
                const allConditions = [];
                
                // 1. HISTÓRICO FAMILIAR - Doenças na família
                const familyMapping = {
                  'Hipertensão': 'Pressão alta',
                  'Diabetes': 'Diabetes',  
                  'Colesterol alto': 'Colesterol alto',
                  'Infarto': 'Infarto',
                  'AVC': 'AVC',
                  'Câncer': 'Câncer',
                  'Alzheimer': 'Alzheimer',
                  'Parkinson': 'Parkinson',
                  'Depressão': 'Ansiedade',
                  'Ansiedade': 'Ansiedade',
                  'Osteoporose': 'Osteoporose',
                  'Artrite': 'Artrite',
                  'Problemas de tireoide': 'Problemas de tireoide',
                  'Obesidade': 'Obesidade',
                  'Alergias': 'Alergias'
                };
                
                if (healthData.doencasFamiliares && Array.isArray(healthData.doencasFamiliares)) {
                  healthData.doencasFamiliares.forEach(doenca => {
                    if (familyMapping[doenca]) {
                      allConditions.push(familyMapping[doenca]);
                    }
                  });
                }
                
                // 2. DOENÇAS CRÔNICAS
                const diseaseMapping = {
                  'Hipertensão': 'Pressão alta',
                  'Diabetes tipo 1': 'Diabetes tipo 1',
                  'Diabetes tipo 2': 'Diabetes tipo 2',
                  'Hipotireoidismo': 'Problemas de tireoide',
                  'Hipertireoidismo': 'Problemas de tireoide',
                  'Asma': 'Alergias',
                  'DPOC': 'DPOC',
                  'Fibromialgia': 'Dores de cabeça',
                  'Artrite reumatoide': 'Artrite reumatoide',
                  'Lúpus': 'Lúpus',
                  'Psoríase': 'Psoríase',
                  'Doença de Crohn': 'Doença de Crohn',
                  'Colite ulcerativa': 'Colite ulcerativa',
                  'Endometriose': 'Endometriose',
                  'SOP': 'SOP'
                };
                
                if (healthData.doencasCronicas && Array.isArray(healthData.doencasCronicas)) {
                  healthData.doencasCronicas.forEach(doenca => {
                    if (diseaseMapping[doenca]) {
                      allConditions.push(diseaseMapping[doenca]);
                    }
                  });
                }
                
                // 3. HÁBITOS DE VIDA
                if (healthData.atividadeFisica === 'Sedentário') {
                  allConditions.push('Cansaço/Fadiga');
                }
                if (healthData.tabagismo === 'Fumante') {
                  allConditions.push('Ansiedade');
                }
                
                // 4. ALIMENTAÇÃO
                if (healthData.qualidadeAlimentacao === 'Ruim' || 
                    (healthData.consumoFrequente && 
                     (healthData.consumoFrequente.includes('Fast food') ||
                      healthData.consumoFrequente.includes('Frituras')))) {
                  allConditions.push('Gastrite');
                }
                if (healthData.consumoAgua === 'Menos de 1L') {
                  allConditions.push('Cansaço/Fadiga');
                }
                
                // 5. SONO E REPOUSO
                if (healthData.qualidadeSono === 'Ruim' || 
                    healthData.qualidadeSono === 'Regular' ||
                    (healthData.dificuldadeDormir && healthData.dificuldadeDormir.length > 0 && 
                     !healthData.dificuldadeDormir.includes('Nenhuma dificuldade'))) {
                  allConditions.push('Insônia');
                }
                if (healthData.horasSono === 'Menos de 5h' || healthData.horasSono === '5-6h') {
                  allConditions.push('Cansaço/Fadiga');
                }
                
                // 6. SISTEMA DIGESTÓRIO
                if (healthData.azia === 'Frequentemente' || 
                    healthData.azia === 'Diariamente' ||
                    healthData.nauseas === 'Frequentemente') {
                  allConditions.push('Gastrite');
                }
                
                // 7. SISTEMA URINÁRIO
                // Note: No specific urinary infection protocol available yet
                // Future: Add urinary tract infection protocol to database
                
                // 8. SINTOMAS GERAIS
                // Dores
                if (healthData.dores && Array.isArray(healthData.dores)) {
                  if (healthData.dores.includes('Cabeça')) {
                    allConditions.push('Dores de cabeça');
                    // Enxaqueca se dor de cabeça + estresse alto
                    if (healthData.nivelEstresse === 'Alto' || 
                        healthData.nivelEstresse === 'Muito alto') {
                      allConditions.push('Enxaqueca');
                    }
                  }
                }
                
                // Ansiedade
                if (healthData.nivelAnsiedade === 'Moderada' || 
                    healthData.nivelAnsiedade === 'Intensa' ||
                    healthData.nivelEstresse === 'Alto' ||
                    healthData.nivelEstresse === 'Muito alto') {
                  allConditions.push('Ansiedade');
                }
                
                // Cansaço/Fadiga
                if (healthData.nivelEnergia === 'Muito baixo' ||
                    healthData.nivelEnergia === 'Baixo') {
                  allConditions.push('Cansaço/Fadiga');
                }
                
                // Remover duplicatas
                const uniqueConditions = [...new Set(allConditions)];
                
                return uniqueConditions.length > 0 ? (
                  <Box sx={{ mb: 3, pageBreakInside: 'avoid' }}>
                    <TreatmentProtocolsDisplay 
                      selectedConditions={uniqueConditions}
                      patientId={entry ? String(entry.id || entry.patientId || '') : undefined}
                    />
                  </Box>
                ) : null;
              })()}

              {/* Observações Clínicas Visuais */}
              {entry && (entry.sinais_unhas || entry.sinais_pele || entry.sinais_olhos || entry.sinais_cabelo || entry.sinais_orelha) && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#e8f5e9', borderRadius: 1, border: '1px solid #66bb6a' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32' }}>
                    Sinais Clínicos Observados (Diagnóstico Visual):
                  </Typography>
                  {entry.sinais_unhas && Array.isArray(entry.sinais_unhas) && entry.sinais_unhas.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Unhas:</Typography>
                      {entry.sinais_unhas.map((sinal, idx) => {
                        const info = getUnhaInfo(sinal);
                        return info ? (
                          <Typography key={idx} variant="body2" sx={{ pl: 2, lineHeight: 1.6 }}>
                            • {info.nome || sinal}
                          </Typography>
                        ) : null;
                      })}
                    </Box>
                  )}
                  {entry.sinais_pele && Array.isArray(entry.sinais_pele) && entry.sinais_pele.length > 0 && (
                    <Typography variant="body2">Pele: {entry.sinais_pele.join(', ')}</Typography>
                  )}
                  {entry.sinais_olhos && Array.isArray(entry.sinais_olhos) && entry.sinais_olhos.length > 0 && (
                    <Typography variant="body2">Olhos: {entry.sinais_olhos.join(', ')}</Typography>
                  )}
                  {entry.sinais_cabelo && Array.isArray(entry.sinais_cabelo) && entry.sinais_cabelo.length > 0 && (
                    <Typography variant="body2">Cabelo: {entry.sinais_cabelo.join(', ')}</Typography>
                  )}
                  {entry.sinais_orelha && Array.isArray(entry.sinais_orelha) && entry.sinais_orelha.length > 0 && (
                    <Typography variant="body2">Orelha: {entry.sinais_orelha.join(', ')}</Typography>
                  )}
                </Box>
              )}

              {/* Indicadores de Saúde Alterados */}
              {(entry?.bmiInfo || entry?.whrInfo || entry?.pressao_arterial) && (
                <Box sx={{ mb: 3, p: 2, bgcolor: '#e1f5fe', borderRadius: 1, border: '1px solid #4fc3f7' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#0277bd' }}>
                    Indicadores de Saúde:
                  </Typography>
                  {entry.bmiInfo && (
                    <Typography variant="body2">
                      • IMC: {entry.bmiInfo.bmi || entry.bmiInfo.value} kg/m² - {entry.bmiInfo.category}
                    </Typography>
                  )}
                  {entry.whrInfo && (
                    <Typography variant="body2">
                      • Relação Cintura-Quadril: {entry.whrInfo.ratio || entry.whrInfo.value} - {entry.whrInfo.risk}
                    </Typography>
                  )}
                  {entry.pressao_arterial && (
                    <Typography variant="body2">
                      • Pressão Arterial: {entry.pressao_arterial} mmHg
                    </Typography>
                  )}
                </Box>
              )}
            </Box>

            {/* Possíveis Causas */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                color: '#7b1fa2', 
                fontWeight: 600,
                borderLeft: '4px solid #7b1fa2',
                pl: 2
              }}>
                🔍 POSSÍVEIS CAUSAS (Visão Integrativa)
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#f3e5f5', borderRadius: 1, border: '1px solid #ba68c8' }}>
                {entry && entry.sinais_unhas && Array.isArray(entry.sinais_unhas) && entry.sinais_unhas.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    {entry.sinais_unhas.map((sinal, idx) => {
                      const info = getUnhaInfo(sinal);
                      return info ? (
                        <Box key={idx} sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#6a1b9a' }}>
                            {info.nome}:
                          </Typography>
                          <Typography variant="body2" sx={{ pl: 2, lineHeight: 1.8, color: '#555' }}>
                            {info.causas}
                          </Typography>
                        </Box>
                      ) : null;
                    })}
                  </Box>
                )}
                <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                  Com base nos sintomas apresentados, sinais clínicos observados e indicadores de saúde avaliados, 
                  as possíveis causas incluem desequilíbrios nutricionais, deficiências vitamínicas e minerais, 
                  sobrecarga hepática, desequilíbrios hormonais, estresse oxidativo, má absorção intestinal, 
                  desequilíbrios energéticos (Medicina Tradicional Chinesa), doshas alterados (Ayurveda), 
                  e necessidade de detoxificação orgânica.
                </Typography>
              </Box>
            </Box>

            {/* Plano de Tratamento */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                color: '#2e7d32', 
                fontWeight: 600,
                borderLeft: '4px solid #2e7d32',
                pl: 2
              }}>
                💊 PLANO TERAPÊUTICO RECOMENDADO
              </Typography>
              
              {/* Tratamentos específicos baseados nos sinais */}
              {entry && entry.sinais_unhas && Array.isArray(entry.sinais_unhas) && entry.sinais_unhas.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  {entry.sinais_unhas.map((sinal, idx) => {
                    const info = getUnhaInfo(sinal);
                    return info ? (
                      <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: '#e8f5e9', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                          Para {info.nome}:
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                          {info.tratamento}
                        </Typography>
                      </Box>
                    ) : null;
                  })}
                </Box>
              )}

              {/* Orientações Gerais */}
              <Box sx={{ p: 2, bgcolor: '#fff8e1', borderRadius: 1, border: '1px solid #ffd54f' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Orientações Gerais de Tratamento:
                </Typography>
                <Typography component="div" variant="body2" sx={{ lineHeight: 1.8 }}>
                  • Suplementação nutricional conforme deficiências identificadas<br/>
                  • Fitoterapia personalizada para cada caso<br/>
                  • Dieta anti-inflamatória e detoxificante<br/>
                  • Terapias complementares (acupuntura, auriculoterapia, reiki)<br/>
                  • Práticas integrativas (meditação, yoga, respiração)<br/>
                  • Acompanhamento periódico com reavaliação em 30 dias<br/>
                  • Exames complementares se necessário
                </Typography>
              </Box>
            </Box>

            {/* Rodapé do Relatório */}
            <Box sx={{ 
              mt: 4, 
              pt: 3, 
              borderTop: '2px solid #1976d2',
              textAlign: 'center'
            }}>
              <Typography variant="caption" sx={{ display: 'block', mb: 2, color: '#666', fontStyle: 'italic' }}>
                Este relatório foi elaborado com base em avaliação integrativa e deve ser acompanhado por profissional qualificado.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                mt: 3
              }}>
                <Box sx={{ 
                  textAlign: 'center',
                  borderTop: '1px solid #333',
                  minWidth: 350,
                  pt: 1
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {therapistFullTitle.split(',')[0]}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    {therapistFullTitle.split(',').slice(1).join(',')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
        )}

        {/* Protocolos de Especialistas */}
        {!showOnlyExams && showSpecialistProtocols && entry?.sintomas && (
          <Box sx={{ mb: 4 }}>
            <Paper sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <Typography variant="h5" sx={{ 
                mb: 3, 
                fontWeight: 700,
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: 2,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                🎯 Protocolos de Especialistas Brasileiros e Internacionais
              </Typography>

              {/* Dr. Lair Ribeiro & Cinatra */}
              <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontWeight: 700, color: '#d32f2f', fontSize: '1.1rem' }}>
                      ❤️ Dr. Lair Ribeiro & Protocolos Cinatra
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Cardiologia" size="small" color="error" sx={{ mr: 1 }} />
                    <Chip label="Ortomolecular" size="small" color="primary" sx={{ mr: 1 }} />
                    <Chip label="Longevidade" size="small" color="success" />
                  </Box>
                  
                  {/* Cardiovascular */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d32f2f', mt: 2, mb: 1 }}>
                    💓 Protocolo Cardiovascular:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.cinatra.protocols.cardiovascular.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  {/* Metabólico */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1976d2', mt: 2, mb: 1 }}>
                    ⚡ Protocolo Metabólico (Diabetes, Obesidade):
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.cinatra.protocols.metabolic.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  {/* Detox */}
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mt: 2, mb: 1 }}>
                    🧪 Protocolo Detoxificação:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {SPECIALIST_PROTOCOLS.cinatra.protocols.detox.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Dra. Maria Rocha */}
              <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700, color: '#e91e63', fontSize: '1.1rem' }}>
                    🌸 Dra. Maria Rocha - Fitoterapia e Saúde Feminina
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Fitoterapia" size="small" color="success" sx={{ mr: 1 }} />
                    <Chip label="Ginecologia Natural" size="small" sx={{ mr: 1, bgcolor: '#e91e63', color: '#fff' }} />
                    <Chip label="Integrativa Feminina" size="small" color="secondary" />
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#e91e63', mt: 2, mb: 1 }}>
                    🌺 Equilíbrio Hormonal Feminino:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.mariaRocha.protocols.hormonal.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7b1fa2', mt: 2, mb: 1 }}>
                    🌿 Saúde Uterina e Menstrual:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.mariaRocha.protocols.uterine.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f06292', mt: 2, mb: 1 }}>
                    👶 Fertilidade Natural:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {SPECIALIST_PROTOCOLS.mariaRocha.protocols.fertility.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Dr. Daniel Forjaz */}
              <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700, color: '#7b1fa2', fontSize: '1.1rem' }}>
                    ⚗️ Dr. Daniel Forjaz - Homeopatia e Antroposofia
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Homeopatia Clássica" size="small" sx={{ mr: 1, bgcolor: '#7b1fa2', color: '#fff' }} />
                    <Chip label="Antroposofia" size="small" color="secondary" sx={{ mr: 1 }} />
                    <Chip label="Florais" size="small" sx={{ bgcolor: '#4caf50', color: '#fff' }} />
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7b1fa2', mt: 2, mb: 1 }}>
                    🔬 Tratamento Constitucional:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.danielForjaz.protocols.constitutional.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d32f2f', mt: 2, mb: 1 }}>
                    🚑 Protocolos Agudos:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.danielForjaz.protocols.acute.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ff6f00', mt: 2, mb: 1 }}>
                    🌟 Medicamentos Antroposóficos:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {SPECIALIST_PROTOCOLS.danielForjaz.protocols.anthroposophic.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Dra. Katia Haranaka */}
              <Accordion sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700, color: '#d84315', fontSize: '1.1rem' }}>
                    ☯️ Dra. Katia Haranaka - Acupuntura e MTC
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ mb: 2 }}>
                    <Chip label="Acupuntura" size="small" sx={{ mr: 1, bgcolor: '#d84315', color: '#fff' }} />
                    <Chip label="MTC" size="small" color="error" sx={{ mr: 1 }} />
                    <Chip label="Fitoterapia Chinesa" size="small" color="success" />
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d84315', mt: 2, mb: 1 }}>
                    🎯 Protocolos de Acupuntura:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.katiaHaranaka.protocols.acupuncture.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mt: 2, mb: 1 }}>
                    🌿 Fórmulas Herbais Chinesas:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.katiaHaranaka.protocols.herbalFormulas.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#ff6f00', mt: 2, mb: 1 }}>
                    🍲 Dietoterapia Chinesa:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {SPECIALIST_PROTOCOLS.katiaHaranaka.protocols.dietary.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              {/* Estudos Atualizados 2023-2025 */}
              <Accordion sx={{ bgcolor: 'rgba(255,255,255,0.95)' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700, color: '#0277bd', fontSize: '1.1rem' }}>
                    🔬 Estudos Científicos Atualizados (2023-2025)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Baseado nas últimas pesquisas científicas publicadas em periódicos indexados
                  </Alert>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1976d2', mt: 2, mb: 1 }}>
                    🦠 Microbioma e Eixo Intestino-Cérebro:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.updatedStudies.protocols.microbiome.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#7b1fa2', mt: 2, mb: 1 }}>
                    🧬 Longevidade e Anti-Aging:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.updatedStudies.protocols.longevity.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#d32f2f', mt: 2, mb: 1 }}>
                    🧠 Neuroproteção e Cognição:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.updatedStudies.protocols.neuroprotection.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57c00', mt: 2, mb: 1 }}>
                    ⚡ Saúde Mitocondrial:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                    {SPECIALIST_PROTOCOLS.updatedStudies.protocols.mitochondrial.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mt: 2, mb: 1 }}>
                    🛡️ Imunomodulação:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {SPECIALIST_PROTOCOLS.updatedStudies.protocols.immunomodulation.map((item, idx) => (
                      <li key={idx}>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{item}</Typography>
                      </li>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Alert severity="warning" sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ⚠️ IMPORTANTE: Todos os protocolos devem ser individualizados conforme o caso clínico. 
                  As dosagens são referencias gerais e devem ser ajustadas pelo profissional responsável.
                </Typography>
              </Alert>
            </Paper>
          </Box>
        )}

        {/* Protocolos do Manual Prático de Tratamentos Naturais - Dr. Daniel Boarim */}
        {!showOnlyExams && showSpecialistProtocols && boarimProtocols.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Paper sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #558b2f 0%, #33691e 100%)',
              color: '#fff',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  mb: 1
                }}>
                  🌿 Manual Prático de Tratamentos Naturais
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 500,
                  fontStyle: 'italic',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  Dr. Daniel S. F. Boarim - 15ª Edição, 2014
                </Typography>
              </Box>

              <Alert severity="info" sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  📖 Sobre o Manual:
                </Typography>
                <Typography variant="body2">
                  Protocolos de tratamentos naturais baseados em hidroterapia, fitoterapia, alimentação terapêutica 
                  e práticas integrativas. Cada protocolo integra técnicas naturais comprovadas para tratamento 
                  e prevenção de doenças.
                </Typography>
              </Alert>

              {boarimProtocols.map((protocol, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <BoarimProtocol protocol={protocol} />
                </Box>
              ))}

              <Alert severity="success" sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ✅ Os protocolos do Dr. Boarim foram selecionados com base nos sintomas relatados pelo paciente 
                  e representam abordagens integrativas e naturais complementares ao tratamento convencional.
                </Typography>
              </Alert>
            </Paper>
          </Box>
        )}

        {/* SEÇÃO DE SUGESTÕES TERAPÊUTICAS CONSOLIDADAS */}
        {consolidatedTherapies && entry && (
          <Box id="consolidated-therapies-section" sx={{ mb: 4, mt: 4 }}>
            <Paper sx={{ 
              p: 4, 
              background: 'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
              color: '#fff',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              position: 'relative'
            }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: 3,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  mb: 1
                }}>
                  🌿 SUGESTÕES TERAPÊUTICAS INTEGRAT

IVAS
                </Typography>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 500,
                  fontStyle: 'italic',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  Protocolo Personalizado para {entry.q01_nome || 'Interagente'}
                </Typography>
              </Box>

              {/* Sintomas/Condições Identificadas */}
              {consolidatedTherapies.symptoms.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 700, mb: 2 }}>
                    📋 Condições Identificadas na Avaliação:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {consolidatedTherapies.symptoms.map((symptom, idx) => (
                      <Chip 
                        key={idx} 
                        label={symptom} 
                        color="success" 
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* HOMEOPATIA */}
              {consolidatedTherapies.homeopathy.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 700, mb: 2 }}>
                    💊 Homeopatia:
                  </Typography>
                  {consolidatedTherapies.homeopathy.map((remedy, idx) => (
                    <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < consolidatedTherapies.homeopathy.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#1976d2' }}>
                        {remedy.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        <strong>Indicação:</strong> {remedy.indication}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        <strong>Dosagem:</strong> {remedy.dosage}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        <strong>Duração:</strong> {remedy.duration}
                      </Typography>
                      {remedy.contraindications && (
                        <Alert severity="warning" sx={{ mt: 1, py: 0.5 }}>
                          <Typography variant="caption">
                            <strong>⚠️ Contraindicações:</strong> {remedy.contraindications}
                          </Typography>
                        </Alert>
                      )}
                      {remedy.safety && (
                        <Typography variant="caption" sx={{ color: '#f57c00', display: 'block', mt: 0.5 }}>
                          <strong>🛡️ Segurança:</strong> {remedy.safety}
                        </Typography>
                      )}
                      {remedy.references && remedy.references.length > 0 && (
                        <Typography variant="caption" sx={{ color: '#757575', display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                          📚 Fontes: {remedy.references.slice(0, 2).join('; ')}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* ÓLEOS ESSENCIAIS */}
              {consolidatedTherapies.essentialOils.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#7b1fa2', fontWeight: 700, mb: 2 }}>
                    🌿 Óleos Essenciais:
                  </Typography>
                  {consolidatedTherapies.essentialOils.map((oil, idx) => (
                    <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < consolidatedTherapies.essentialOils.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                        {oil.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        <strong>Indicação:</strong> {oil.indication}
                      </Typography>
                      {oil.properties && (
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Propriedades:</strong> {oil.properties}
                        </Typography>
                      )}
                      {oil.usage && (
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Forma de Uso:</strong> {oil.usage}
                        </Typography>
                      )}
                      {oil.dosage && (
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Dosagem:</strong> {oil.dosage}
                        </Typography>
                      )}
                      {oil.duration && (
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Duração:</strong> {oil.duration}
                        </Typography>
                      )}
                      {oil.contraindications && (
                        <Alert severity="warning" sx={{ mt: 1, py: 0.5 }}>
                          <Typography variant="caption">
                            <strong>⚠️ Contraindicações:</strong> {oil.contraindications}
                          </Typography>
                        </Alert>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* AROMATERAPIA */}
              {consolidatedTherapies.aromatherapy.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 700, mb: 2 }}>
                    🌸 Aromaterapia:
                  </Typography>
                  {consolidatedTherapies.aromatherapy.map((oil, idx) => (
                    <Box key={idx} sx={{ mb: 2, pb: 2, borderBottom: idx < consolidatedTherapies.aromatherapy.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                        {oil.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        <strong>Indicação:</strong> {oil.indication}
                      </Typography>
                      {oil.properties && (
                        <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                          <strong>Propriedades:</strong> {oil.properties}
                        </Typography>
                      )}
                      {oil.uses && Array.isArray(oil.uses) && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>Formas de Uso:</Typography>
                          <Box component="ul" sx={{ pl: 3, mt: 0.5 }}>
                            {oil.uses.map((use, uIdx) => (
                              <li key={uIdx}>
                                <Typography variant="body2" sx={{ color: '#666' }}>{use}</Typography>
                              </li>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              {/* FITOTERAPIA */}
              {consolidatedTherapies.phytotherapy.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#558b2f', fontWeight: 700, mb: 2 }}>
                    🍃 Fitoterapia:
                  </Typography>
                  {consolidatedTherapies.phytotherapy.map((plant, idx) => (
                    <Box key={idx} sx={{ mb: 1.5 }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        • <strong>{plant.name}</strong>: {plant.usage} 
                        {plant.indication && <span style={{ fontStyle: 'italic', color: '#757575' }}> (Indicação: {plant.indication})</span>}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* HIDROTERAPIA */}
              {consolidatedTherapies.hydrotherapy.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#0277bd', fontWeight: 700, mb: 2 }}>
                    💧 Hidroterapia:
                  </Typography>
                  {consolidatedTherapies.hydrotherapy.map((hydro, idx) => (
                    <Box key={idx} sx={{ mb: 1.5 }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        • <strong>{hydro.treatment}</strong>
                        {hydro.temperature && ` - Temperatura: ${hydro.temperature}`}
                        {hydro.duration && ` - Duração: ${hydro.duration}`}
                        {hydro.frequency && ` - Frequência: ${hydro.frequency}`}
                        {hydro.indication && <span style={{ fontStyle: 'italic', color: '#757575' }}> (Indicação: {hydro.indication})</span>}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* INTERAÇÕES MEDICAMENTOSAS - Depleções Nutricionais */}
              {entry.drugInteractions && entry.drugInteractions.selectedDrugs && entry.drugInteractions.selectedDrugs.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: '#fff3e0', p: 3, borderRadius: 2, border: '2px solid #ff5722' }}>
                  <Typography variant="h6" sx={{ color: '#d84315', fontWeight: 700, mb: 2 }}>
                    💊 Interações Medicamentosas - Reposições Necessárias:
                  </Typography>
                  
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Medicamentos em uso: {entry.drugInteractions.selectedDrugs.join(', ')}
                    </Typography>
                  </Alert>

                  {consolidatedTherapies.nutritional
                    .filter(nutri => nutri.type === 'Reposição por depleção medicamentosa')
                    .reduce((acc, nutri) => {
                      const existing = acc.find(item => item.nutrient === nutri.nutrient);
                      if (!existing) {
                        acc.push({
                          ...nutri,
                          drugs: [nutri.drug]
                        });
                      } else if (!existing.drugs.includes(nutri.drug)) {
                        existing.drugs.push(nutri.drug);
                      }
                      return acc;
                    }, [])
                    .map((nutri, idx) => (
                      <Card key={idx} sx={{ mb: 2, bgcolor: 'white' }}>
                        <CardContent>
                          <Typography variant="subtitle1" sx={{ color: '#d84315', fontWeight: 600, mb: 1 }}>
                            {nutri.nutrient}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 1, fontSize: '0.7rem' }}>
                            Causado por: {nutri.drugs.join(', ')}
                          </Typography>
                          <Box sx={{ bgcolor: '#e8f5e9', p: 1.5, borderRadius: 1, mb: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.7rem' }}>
                                  📊 Dosagem:
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', color: '#555', fontSize: '0.7rem' }}>
                                  {nutri.dosage}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.7rem' }}>
                                  ⏰ Posologia:
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', color: '#555', fontSize: '0.7rem' }}>
                                  {nutri.posology}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#2e7d32', fontSize: '0.7rem' }}>
                                  ⏳ Duração:
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block', color: '#555', fontSize: '0.7rem' }}>
                                  {nutri.duration}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          {nutri.precautions && (
                            <Alert severity="info" sx={{ mt: 1, py: 0.5, fontSize: '0.65rem' }}>
                              <Typography variant="caption" sx={{ fontSize: '0.65rem' }}>
                                ⚠️ {nutri.precautions}
                              </Typography>
                            </Alert>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </Box>
              )}

              {/* NUTRIÇÃO */}
              {consolidatedTherapies.nutritional.filter(nutri => nutri.type !== 'Reposição por depleção medicamentosa').length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#f57c00', fontWeight: 700, mb: 2 }}>
                    🥗 Orientações Nutricionais:
                  </Typography>
                  {consolidatedTherapies.nutritional
                    .filter(nutri => nutri.type !== 'Reposição por depleção medicamentosa')
                    .map((nutri, idx) => (
                      <Box key={idx} sx={{ mb: 1.5 }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          • {nutri.type === 'evitar' ? '❌ Evitar' : '✅ Incluir'}: <strong>{nutri.recommendation}</strong>
                          {nutri.indication && <span style={{ fontStyle: 'italic', color: '#757575' }}> (para {nutri.indication})</span>}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              )}

              {/* ESTILO DE VIDA */}
              {consolidatedTherapies.lifestyle.length > 0 && (
                <Box sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.95)', p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" sx={{ color: '#6a1b9a', fontWeight: 700, mb: 2 }}>
                    🧘 Práticas Integrativas e Estilo de Vida:
                  </Typography>
                  {consolidatedTherapies.lifestyle.map((practice, idx) => (
                    <Box key={idx} sx={{ mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        • {practice}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* NOTA IMPORTANTE */}
              <Alert severity="info" sx={{ mt: 3, bgcolor: 'rgba(255,255,255,0.95)' }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  📌 OBSERVAÇÕES IMPORTANTES:
                </Typography>
                <Typography variant="body2" component="div">
                  • Estas sugestões foram personalizadas com base na avaliação integrativa realizada.<br/>
                  • O acompanhamento deve ser contínuo e ajustado conforme a evolução do interagente.<br/>
                  • Em caso de dúvidas ou reações adversas, entre em contato imediatamente.<br/>
                  • Todas as indicações são complementares e não substituem tratamento médico quando necessário.
                </Typography>
              </Alert>
            </Paper>
          </Box>
        )}

        {/* Professional Prescription Footer */}
        <PrescriptionFooter />
        
        {/* Legacy footer - hidden, kept for compatibility */}
        <Box sx={{ display: 'none' }}>
          <Box sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: '1px solid #e0e0e0',
            background: '#f8f9fa',
            p: 2,
            borderRadius: 1
          }}>
            <Typography variant="caption" sx={{ 
              color: '#555', 
              display: 'block',
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}>
              <strong>Observações Importantes:</strong><br/>
              • Estas são sugestões terapêuticas baseadas na avaliação integrativa realizada.<br/>
              • O acompanhamento deve ser realizado conforme orientação profissional.<br/>
              • Em caso de dúvidas, entre em contato para esclarecimentos.<br/>
              • Procedimentos, exames ou encaminhamentos devem ser avaliados individualmente.
            </Typography>
          </Box>

          <Box sx={{ 
            mt: 4, 
            pt: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ color: '#666' }}>
                Este documento é válido apenas com assinatura e carimbo do profissional.
              </Typography>
            </Box>
            <Box sx={{ 
              textAlign: 'center',
              borderTop: '1px solid #333',
              minWidth: 300,
              pt: 1
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {therapistFullTitle.split(',')[0]}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                CRTH-BR 17821
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Estilos de Impressão para Sugestões Terapêuticas */}
      <style>{`
        @media print {
          /* Ocultar elementos de navegação */
          .no-print {
            display: none !important;
          }

          /* Garantir quebras de página adequadas */
          #consolidated-therapies-section {
            page-break-inside: avoid;
          }

          /* Melhorar cores para impressão */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Remover sombras para economizar tinta */
          .MuiPaper-root {
            box-shadow: none !important;
          }

          /* Ajustar fontes para impressão */
          body {
            font-size: 11pt;
          }

          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid;
          }

          /* Garantir que alertas sejam visíveis */
          .MuiAlert-root {
            border: 1px solid #ddd !important;
          }
        }
      `}</style>

      <SaveToPatientBar
        moduleKey="therapySuggestions"
        getData={() => consolidatedTherapies && entry
          ? { consolidatedTherapies, patientId: entry.id, savedAt: new Date().toISOString() }
          : null}
        label="Salvar sugestões terapêuticas no interagente"
      />
    </Container>
  );
}
