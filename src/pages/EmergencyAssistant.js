import { useState } from 'react';
import THERAPEUTIC_PROTOCOLS from '../lib/therapeuticProtocols';
import { useNavigate } from 'react-router-dom';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl, openPrintWindow } from '../components/PrintTemplate';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocalHospital as HospitalIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Phone as PhoneIcon,
  Emergency as EmergencyIcon,
  Info as InfoIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

// Base de conhecimento de emergências médicas
const EMERGENCY_DATABASE = {
  // Cardiovasculares
  'dor no peito': {
    severity: 'critical',
    possibleConditions: ['Infarto do miocárdio', 'Angina', 'Embolia pulmonar', 'Dissecção aórtica'],
    immediateActions: [
      'CHAMAR 192/SAMU IMEDIATAMENTE',
      'Sentar ou deitar a pessoa confortavelmente',
      'Afrouxar roupas apertadas',
      'Se consciente e sem alergia: dar 1 AAS 100mg mastigado',
      'NÃO dar comida ou bebida',
      'Monitorar sinais vitais',
    ],
    redFlags: ['Dor irradiando para braço/mandíbula/costas', 'Sudorese fria', 'Falta de ar', 'Náusea/vômito', 'Palidez'],
    timeWindow: 'Primeiros 60 minutos são CRÍTICOS',
  },
  
  'falta de ar': {
    severity: 'critical',
    possibleConditions: ['Crise asmática', 'Embolia pulmonar', 'Pneumotórax', 'Edema pulmonar', 'Anafilaxia'],
    immediateActions: [
      'CHAMAR 192/SAMU se dispneia grave',
      'Colocar pessoa sentada em posição confortável',
      'Abrir janelas para ventilação',
      'Se tiver bombinha de asma: usar',
      'Afrouxar roupas',
      'Acalmar a pessoa',
    ],
    redFlags: ['Lábios/unhas azulados (cianose)', 'Incapacidade de falar frases completas', 'Confusão mental', 'Batimentos muito rápidos'],
    timeWindow: 'Ação imediata necessária',
  },

  'avc': {
    severity: 'critical',
    possibleConditions: ['AVC isquêmico', 'AVC hemorrágico', 'AIT (ataque isquêmico transitório)'],
    immediateActions: [
      'CHAMAR 192/SAMU IMEDIATAMENTE',
      'Anotar HORA EXATA do início dos sintomas',
      'Deitar pessoa de lado se vomitando',
      'NÃO dar comida, bebida ou medicamentos',
      'Afrouxar roupas',
      'Manter vias aéreas desobstruídas',
    ],
    redFlags: ['Face assimétrica', 'Braço fraco/dormente', 'Fala arrastada/confusa', 'Perda súbita de visão', 'Dor de cabeça intensa súbita'],
    timeWindow: 'Janela terapêutica: 4,5 horas (quanto antes, melhor)',
    testFAST: {
      F: 'Face - pedir para sorrir (um lado cai?)',
      A: 'Arms (braços) - levantar os dois (um cai?)',
      S: 'Speech (fala) - repetir frase (fala arrastada?)',
      T: 'Time (tempo) - CHAMAR 192 IMEDIATAMENTE',
    },
  },

  'convulsão': {
    severity: 'high',
    possibleConditions: ['Epilepsia', 'Hipoglicemia', 'Febre alta', 'Traumatismo craniano', 'AVC'],
    immediateActions: [
      'Proteger a cabeça (colocar algo macio)',
      'Virar de lado para evitar asfixia',
      'Afastar objetos perigosos',
      'Cronometrar duração da convulsão',
      'NÃO segurar a pessoa',
      'NÃO colocar nada na boca',
      'Chamar 192 se durar mais de 5 minutos',
    ],
    redFlags: ['Convulsão > 5 minutos', 'Múltiplas convulsões seguidas', 'Primeira convulsão da vida', 'Gestante', 'Diabético'],
    timeWindow: 'Chamar emergência se > 5 minutos',
  },

  'desmaio': {
    severity: 'moderate',
    possibleConditions: ['Hipotensão', 'Hipoglicemia', 'Desidratação', 'Arritmia cardíaca', 'Vasovagal'],
    immediateActions: [
      'Deitar pessoa de costas',
      'Elevar as pernas (30-40cm)',
      'Afrouxar roupas apertadas',
      'Verificar se está respirando',
      'Se recuperou: oferecer água com açúcar',
      'NÃO dar nada se inconsciente',
    ],
    redFlags: ['Não recupera consciência em 1-2 minutos', 'Convulsão após desmaio', 'Dor no peito', 'Falta de ar'],
    timeWindow: 'Chamar 192 se não recuperar em 2 minutos',
  },

  'hipoglicemia': {
    severity: 'high',
    possibleConditions: ['Diabetes em uso de insulina/hipoglicemiante', 'Jejum prolongado'],
    immediateActions: [
      'Se CONSCIENTE: dar açúcar/mel/suco',
      'Regra 15-15: 15g carboidrato, aguardar 15min',
      'Se INCONSCIENTE: CHAMAR 192 - NÃO dar nada via oral',
      'Deitar de lado',
      'Verificar glicemia se possível',
    ],
    redFlags: ['Confusão mental', 'Sudorese fria', 'Tremores', 'Palpitações', 'Inconsciência'],
    timeWindow: 'Tratar imediatamente - pode evoluir para coma',
  },

  'hiperglicemia': {
    severity: 'high',
    possibleConditions: ['Diabetes descompensado', 'Cetoacidose diabética'],
    immediateActions: [
      'Oferecer água (hidratação)',
      'Se diabético: aplicar insulina conforme orientação médica',
      'Verificar glicemia',
      'Chamar 192 se glicemia > 400 ou sinais de cetoacidose',
    ],
    redFlags: ['Hálito cetônico (cheiro de acetona)', 'Náusea/vômito intenso', 'Dor abdominal', 'Confusão mental', 'Respiração rápida'],
    timeWindow: 'Cetoacidose é emergência - atendimento em horas',
  },

  'anafilaxia': {
    severity: 'critical',
    possibleConditions: ['Choque anafilático (alergia grave)'],
    immediateActions: [
      'CHAMAR 192 IMEDIATAMENTE',
      'Se tiver EpiPen/Adrenalina autoinjetável: APLICAR',
      'Deitar pessoa (elevar pernas se pressão baixa)',
      'Se vomitando: virar de lado',
      'Manter aquecido',
      'NÃO dar nada via oral se dificuldade para engolir',
    ],
    redFlags: ['Inchaço de língua/garganta', 'Dificuldade para respirar/falar', 'Urticária generalizada', 'Queda de pressão', 'Tontura severa'],
    timeWindow: 'Minutos podem ser fatais - AÇÃO IMEDIATA',
  },

  'queimadura grave': {
    severity: 'high',
    possibleConditions: ['Queimadura de 2º/3º grau', 'Queimadura química', 'Queimadura elétrica'],
    immediateActions: [
      'Resfriar com água corrente fria (10-20 minutos)',
      'NÃO aplicar gelo, pasta de dente, manteiga',
      'Cobrir com pano limpo úmido',
      'Remover joias/roupas (se não grudadas)',
      'Chamar 192 se > 10% do corpo ou face/mãos/genitais',
      'Oferecer água se pessoa consciente',
    ],
    redFlags: ['Face/pescoço queimado', 'Inalação de fumaça', '>10% corpo', 'Queimadura elétrica', 'Bolhas extensas'],
    timeWindow: 'Resfriamento imediato reduz dano',
  },

  'sangramento grave': {
    severity: 'critical',
    possibleConditions: ['Hemorragia arterial', 'Trauma', 'Laceração profunda'],
    immediateActions: [
      'CHAMAR 192',
      'Pressão direta no local (pano limpo/gaze)',
      'Elevar membro se possível',
      'NÃO remover objetos cravados',
      'Compressa por 10-15 minutos sem soltar',
      'Torniquete APENAS se sangramento incontrolável',
    ],
    redFlags: ['Sangue jorrando (arterial)', 'Não para com pressão', 'Palidez/sudorese', 'Confusão mental'],
    timeWindow: 'Hemorragia arterial: minutos são críticos',
  },

  'engasgo': {
    severity: 'critical',
    possibleConditions: ['Obstrução de vias aéreas'],
    immediateActions: [
      'Se pessoa TOSSE: encorajar a tossir (não interferir)',
      'Se NÃO consegue tossir/falar: Manobra de Heimlich',
      'Heimlich: abraçar por trás, punho acima umbigo, compressões para dentro e para cima',
      'Em bebês: 5 batidas nas costas + 5 compressões torácicas',
      'Chamar 192 se não resolver',
      'Se inconsciente: RCP',
    ],
    redFlags: ['Incapacidade de falar/tossir', 'Mão no pescoço (sinal universal)', 'Cianose (azulado)', 'Perda de consciência'],
    timeWindow: '4-6 minutos sem oxigênio = dano cerebral',
  },

  'intoxicação': {
    severity: 'high',
    possibleConditions: ['Intoxicação medicamentosa', 'Envenenamento', 'Overdose'],
    immediateActions: [
      'CHAMAR 192 e Centro de Intoxicações: 0800 722 6001',
      'Identificar substância ingerida (levar embalagem)',
      'NÃO provocar vômito (exceto se orientado)',
      'Se substância na pele: lavar com água corrente',
      'Manter pessoa consciente e aquecida',
      'Coletar vômito em saco (para análise)',
    ],
    redFlags: ['Inconsciência', 'Convulsões', 'Dificuldade respiratória', 'Queimadura oral'],
    timeWindow: 'Primeiras horas são críticas',
  },

  'crise hipertensiva': {
    severity: 'high',
    possibleConditions: ['Pressão muito alta (>180/120)', 'Emergência hipertensiva'],
    immediateActions: [
      'Chamar 192 se sintomas graves',
      'Sentar pessoa confortavelmente',
      'Ambiente calmo e tranquilo',
      'Se toma anti-hipertensivo: tomar dose',
      'NÃO dar medicamento de outra pessoa',
      'Monitorar pressão a cada 15 minutos',
    ],
    redFlags: ['Dor no peito', 'Falta de ar', 'Visão turva', 'Dor de cabeça intensa', 'Confusão mental', 'Convulsão'],
    timeWindow: 'Com sintomas graves: atendimento imediato',
  },

  'febre alta': {
    severity: 'moderate',
    possibleConditions: ['Infecção', 'Dengue', 'Meningite', 'Sepse'],
    immediateActions: [
      'Antitérmico (paracetamol/dipirona)',
      'Compressas frias (testa, axilas, virilhas)',
      'Hidratação constante',
      'Roupas leves',
      'Monitorar temperatura',
      'Chamar 192 se > 40°C ou sinais neurológicos',
    ],
    redFlags: ['Rigidez de nuca', 'Manchas roxas na pele', 'Convulsão', 'Confusão mental', 'Dificuldade para respirar', 'Bebê < 3 meses'],
    timeWindow: 'Febre > 40°C: atendimento urgente',
  },

  'traumatismo craniano': {
    severity: 'high',
    possibleConditions: ['Concussão', 'Hematoma intracraniano', 'Fratura de crânio'],
    immediateActions: [
      'CHAMAR 192 se perda de consciência ou sintomas graves',
      'Imobilizar pescoço (não movimentar)',
      'Controlar sangramento com pressão suave',
      'Monitorar consciência (nome, data, local)',
      'NÃO dar medicamentos',
      'Observar por 24-48 horas',
    ],
    redFlags: ['Perda de consciência', 'Vômitos repetidos', 'Confusão/sonolência crescente', 'Pupilas desiguais', 'Sangue/líquido no ouvido/nariz'],
    timeWindow: 'Sintomas podem surgir horas depois - monitorar',
  },
};

// Números de emergência
const EMERGENCY_CONTACTS = [
  { name: 'SAMU', number: '192', description: 'Emergências médicas' },
  { name: 'Bombeiros', number: '193', description: 'Resgates e emergências' },
  { name: 'Polícia', number: '190', description: 'Emergências policiais' },
  { name: 'Centro de Intoxicações', number: '0800 722 6001', description: 'Intoxicações e envenenamentos' },
  { name: 'CVV', number: '188', description: 'Prevenção ao suicídio' },
];

// Base COMPLETA de protocolos fitoterápicos (importada da base principal)
const COMPLETE_PHYTOTHERAPY_DATABASE = {
  // Sistema Digestivo
  'Gastrite': {
    category: 'Sistema Digestivo',
    indications: ['Gastrite aguda', 'Gastrite crônica', 'Úlcera péptica', 'Dispepsia', 'Hiperacidez', 'Azia', 'Queimação'],
    protocol: [
      {
        plant: 'Espinheira-santa',
        scientificName: 'Maytenus ilicifolia',
        dosage: '3g folhas/dia',
        posology: 'Infusão: 1 colher sopa (3g) para 150ml água. Tomar 3x ao dia, 30min antes das refeições',
        duration: '4-8 semanas',
        properties: 'Antiulcerogênica, gastroprotetora, cicatrizante',
        contraindications: ['Gestação', 'Lactação'],
        interactions: ['Não usar com antiácidos (aguardar 2h)'],
      },
      {
        plant: 'Camomila',
        scientificName: 'Matricaria chamomilla',
        dosage: '3-6g flores/dia',
        posology: 'Infusão: 1 colher sopa para 200ml água. Tomar 3-4x ao dia',
        duration: '2-4 semanas',
        properties: 'Anti-inflamatória, antiespasmódica, calmante',
        contraindications: ['Alergia a Asteraceae'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Alcaçuz',
        scientificName: 'Glycyrrhiza glabra',
        dosage: '5-15g raiz/dia',
        posology: 'Decocção: 1-3 colheres de chá para 200ml. Tomar 3x ao dia',
        duration: 'Máximo 4 semanas',
        properties: 'Antiulcerogênico, anti-inflamatório',
        contraindications: ['Hipertensão', 'Hipocalemia', 'Gestação', 'Hepatopatias'],
        interactions: ['Pode potencializar corticoides', 'Reduz efeito de anti-hipertensivos'],
      },
    ],
  },

  'Constipação': {
    category: 'Sistema Digestivo',
    indications: ['Constipação crônica', 'Intestino preso', 'Síndrome do intestino lento'],
    protocol: [
      {
        plant: 'Psyllium',
        scientificName: 'Plantago ovata',
        dosage: '10-30g/dia',
        posology: '1-2 colheres de sopa em 200-300ml água. Tomar 2-3x ao dia com bastante líquido',
        duration: 'Uso contínuo permitido',
        properties: 'Laxante formador de bolo, prebiótico',
        contraindications: ['Obstrução intestinal', 'Dificuldade de deglutição'],
        interactions: ['Pode interferir na absorção de minerais - tomar 2h de distância de medicamentos'],
      },
      {
        plant: 'Linhaça',
        scientificName: 'Linum usitatissimum',
        dosage: '10-30g sementes/dia',
        posology: '1-2 colheres de sopa moídas. Misturar em água, iogurte ou frutas. 2-3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Laxante, anti-inflamatório, fonte de ômega-3',
        contraindications: ['Obstrução intestinal'],
        interactions: ['Pode reduzir absorção de medicamentos'],
      },
    ],
  },

  'Diarreia': {
    category: 'Sistema Digestivo',
    indications: ['Diarreia aguda', 'Diarreia crônica', 'Gastroenterite'],
    protocol: [
      {
        plant: 'Goiabeira',
        scientificName: 'Psidium guajava',
        dosage: '6g folhas/dia',
        posology: 'Decocção: 2g para 150ml água. Tomar 3x ao dia',
        duration: '3-7 dias',
        properties: 'Antidiarreica, antimicrobiana, adstringente',
        contraindications: ['Constipação'],
        interactions: ['Pode reduzir absorção de ferro'],
      },
    ],
  },

  'Náusea': {
    category: 'Sistema Digestivo',
    indications: ['Náusea', 'Vômito', 'Enjoo', 'Mal-estar gástrico'],
    protocol: [
      {
        plant: 'Gengibre',
        scientificName: 'Zingiber officinale',
        dosage: '2-4g rizoma/dia',
        posology: 'Infusão: 1-2g para 200ml. Tomar 3-4x ao dia ou quando necessário',
        duration: 'Uso quando necessário',
        properties: 'Antiemético, digestivo, anti-inflamatório',
        contraindications: ['Cálculos biliares', 'Uso pré-operatório (suspender 7 dias antes)'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Hortelã-pimenta',
        scientificName: 'Mentha piperita',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1,5g para 150ml. Tomar após refeições',
        duration: 'Uso quando necessário',
        properties: 'Antiemética, digestiva, antiespasmódica',
        contraindications: ['DRGE', 'Gestação no 1º trimestre'],
        interactions: ['Pode potencializar sedativos'],
      },
    ],
  },

  // Sistema Cardiovascular
  'Hipertensão': {
    category: 'Sistema Cardiovascular',
    indications: ['Hipertensão leve a moderada', 'Pressão alta', 'Coadjuvante no tratamento da HAS'],
    protocol: [
      {
        plant: 'Alho',
        scientificName: 'Allium sativum',
        dosage: '600-1200mg extrato/dia (equivalente a 1-2 dentes)',
        posology: 'Extrato seco: 300-600mg 2x ao dia ou 1-2 dentes frescos/dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Anti-hipertensivo, vasodilatador, antiagregante',
        contraindications: ['Cirurgias (suspender 7 dias antes)', 'Uso de anticoagulantes'],
        interactions: ['POTENCIALIZA anticoagulantes e antiagregantes'],
      },
      {
        plant: 'Hibisco',
        scientificName: 'Hibiscus sabdariffa',
        dosage: '1,5-3g flores/dia',
        posology: 'Infusão: 1,5g para 200ml. Tomar 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Anti-hipertensivo, diurético, antioxidante',
        contraindications: ['Hipotensão'],
        interactions: ['Pode potencializar anti-hipertensivos'],
      },
      {
        plant: 'Oliveira',
        scientificName: 'Olea europaea',
        dosage: '500-1000mg extrato folhas/dia',
        posology: 'Extrato padronizado: 250-500mg 2x ao dia',
        duration: 'Uso prolongado',
        properties: 'Anti-hipertensivo, vasodilatador',
        contraindications: ['Hipotensão severa'],
        interactions: ['Pode potencializar anti-hipertensivos'],
      },
    ],
  },

  'Colesterol': {
    category: 'Sistema Cardiovascular',
    indications: ['Colesterol alto', 'Dislipidemia', 'Prevenção cardiovascular', 'Triglicerídeos elevados'],
    protocol: [
      {
        plant: 'Berberina',
        scientificName: 'Berberis vulgaris',
        dosage: '900-1500mg/dia',
        posology: '500mg 2-3x ao dia, antes das refeições',
        duration: '3-6 meses',
        properties: 'Hipolipemiante, hipoglicemiante',
        contraindications: ['Gestação', 'Lactação'],
        interactions: ['Pode potencializar metformina e estatinas'],
      },
      {
        plant: 'Alcachofra',
        scientificName: 'Cynara scolymus',
        dosage: '600-1800mg extrato/dia',
        posology: 'Extrato seco: 300-600mg 3x ao dia, antes das refeições',
        duration: '6-12 semanas',
        properties: 'Hipolipemiante, hepatoprotetor, colerético',
        contraindications: ['Obstrução biliar', 'Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Sistema Nervoso
  'Ansiedade': {
    category: 'Sistema Nervoso',
    indications: ['Ansiedade leve a moderada', 'Estresse', 'Tensão nervosa', 'Nervosismo', 'Pânico'],
    protocol: [
      {
        plant: 'Passiflora',
        scientificName: 'Passiflora incarnata',
        dosage: '4-8g planta seca/dia',
        posology: 'Infusão: 2-4g para 150ml. Tomar 2-3x ao dia. Tintura: 2-4ml 3x ao dia',
        duration: '4-8 semanas',
        properties: 'Ansiolítica, sedativa leve',
        contraindications: ['Gestação no 1º trimestre'],
        interactions: ['POTENCIALIZA sedativos e benzodiazepínicos', 'Não usar com álcool'],
      },
      {
        plant: 'Valeriana',
        scientificName: 'Valeriana officinalis',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato seco: 300-600mg à noite. Para ansiedade: 150-300mg 2-3x ao dia',
        duration: '2-4 semanas',
        properties: 'Ansiolítica, sedativa, miorrelaxante',
        contraindications: ['Gestação', 'Lactação', 'Uso com álcool', 'Hepatopatias graves'],
        interactions: ['POTENCIALIZA sedativos e benzodiazepínicos'],
      },
      {
        plant: 'Melissa',
        scientificName: 'Melissa officinalis',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1-2g para 150ml, 3x ao dia. Em crise: tomar imediatamente',
        duration: '4-12 semanas',
        properties: 'Ansiolítica, calmante, antiespasmódica',
        contraindications: ['Hipotireoidismo (monitorar)'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Camomila',
        scientificName: 'Matricaria chamomilla',
        dosage: '3-6g flores/dia',
        posology: 'Infusão: 2g para 200ml. Tomar 3-4x ao dia ou em crise',
        duration: 'Uso contínuo permitido',
        properties: 'Calmante, ansiolítica leve, digestiva',
        contraindications: ['Alergia a Asteraceae'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Ashwagandha',
        scientificName: 'Withania somnifera',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato padronizado: 300mg 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Adaptógena, ansiolítica, antistress',
        contraindications: ['Hipertireoidismo não controlado'],
        interactions: ['Pode potencializar sedativos'],
      },
    ],
  },

  'Insônia': {
    category: 'Sistema Nervoso',
    indications: ['Insônia inicial', 'Dificuldade para dormir', 'Sono não reparador', 'Despertar noturno'],
    protocol: [
      {
        plant: 'Valeriana',
        scientificName: 'Valeriana officinalis',
        dosage: '400-900mg extrato/dia',
        posology: 'Extrato seco: 400-900mg 30-60min antes de dormir',
        duration: '2-4 semanas',
        properties: 'Sedativa, indutora do sono',
        contraindications: ['Gestação', 'Hepatopatias graves'],
        interactions: ['Potencializa sedativos e álcool'],
      },
      {
        plant: 'Melissa',
        scientificName: 'Melissa officinalis',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato: 300mg 2x ao dia (última dose à noite)',
        duration: '4-8 semanas',
        properties: 'Sedativa leve, ansiolítica',
        contraindications: ['Hipotireoidismo'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Lavanda',
        scientificName: 'Lavandula angustifolia',
        dosage: '80-160mg óleo essencial/dia',
        posology: 'Cápsulas: 80mg 1-2x ao dia. Aromaterapia: difusor no quarto',
        duration: '2-6 semanas',
        properties: 'Sedativa, ansiolítica, relaxante',
        contraindications: ['Hipotensão severa'],
        interactions: ['Pode aumentar efeito de sedativos'],
      },
    ],
  },

  'Depressão': {
    category: 'Sistema Nervoso',
    indications: ['Depressão leve a moderada', 'Tristeza', 'Desânimo', 'Falta de motivação'],
    protocol: [
      {
        plant: 'Hipérico (Erva-de-São-João)',
        scientificName: 'Hypericum perforatum',
        dosage: '900mg extrato/dia',
        posology: 'Extrato padronizado: 300mg 3x ao dia',
        duration: 'Mínimo 4-6 semanas (efeito cumulativo)',
        properties: 'Antidepressiva, ansiolítica',
        contraindications: ['Uso com ISRS/antidepressivos', 'Gestação', 'Lactação'],
        interactions: ['IMPORTANTE: interage com MUITOS medicamentos (anticoagulantes, contraceptivos, antivirais)', 'Fotossensibilização'],
      },
      {
        plant: 'Açafrão',
        scientificName: 'Crocus sativus',
        dosage: '30mg/dia',
        posology: '15mg 2x ao dia',
        duration: '6-8 semanas',
        properties: 'Antidepressiva, neuroprotetora',
        contraindications: ['Gestação', 'Transtorno bipolar'],
        interactions: ['Pode potencializar antidepressivos'],
      },
    ],
  },

  // Sistema Respiratório
  'Gripe': {
    category: 'Sistema Respiratório',
    indications: ['Gripe', 'Resfriado', 'Sinusite', 'Rinite', 'Tosse', 'Falta de ar'],
    protocol: [
      {
        plant: 'Guaco',
        scientificName: 'Mikania glomerata',
        dosage: '1,5-4,5g folhas/dia',
        posology: 'Xarope: 5-15ml 3x ao dia. Infusão: 1,5g para 150ml, 3x ao dia',
        duration: '7-14 dias',
        properties: 'Expectorante, broncodilatador, antitussígeno',
        contraindications: ['Anticoagulantes (cumarina)'],
        interactions: ['ATENÇÃO com anticoagulantes'],
      },
      {
        plant: 'Gengibre',
        scientificName: 'Zingiber officinale',
        dosage: '2-4g rizoma/dia',
        posology: 'Infusão: 1-2g para 200ml. Tomar 3-4x ao dia',
        duration: '5-10 dias',
        properties: 'Anti-inflamatório, antiviral, expectorante',
        contraindications: ['Cálculos biliares', 'Uso pré-operatório'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Sabugueiro',
        scientificName: 'Sambucus nigra',
        dosage: '15-30ml xarope/dia',
        posology: 'Xarope: 5-10ml 3x ao dia',
        duration: '5-7 dias',
        properties: 'Antiviral, imunoestimulante',
        contraindications: ['Doenças autoimunes'],
        interactions: ['Pode potencializar imunossupressores'],
      },
      {
        plant: 'Eucalipto',
        scientificName: 'Eucalyptus globulus',
        dosage: '4-6g folhas/dia',
        posology: 'Inalação: 2-3 gotas óleo essencial em água quente. Infusão: 2g para 150ml, 2-3x ao dia',
        duration: '5-7 dias',
        properties: 'Expectorante, descongestionante, antimicrobiano',
        contraindications: ['Asma grave não controlada'],
        interactions: ['Pode reduzir eficácia de medicamentos (acelera metabolismo hepático)'],
      },
      {
        plant: 'Hortelã-pimenta',
        scientificName: 'Mentha piperita',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1,5g para 150ml. Tomar 3-4x ao dia. Inalação: 3-4 gotas óleo em água quente',
        duration: 'Durante crise respiratória',
        properties: 'Broncodilatador leve, descongestionante',
        contraindications: ['DRGE'],
        interactions: ['Pode potencializar sedativos'],
      },
    ],
  },

  'Bronquite': {
    category: 'Sistema Respiratório',
    indications: ['Bronquite aguda', 'Bronquite crônica', 'Tosse produtiva'],
    protocol: [
      {
        plant: 'Guaco',
        scientificName: 'Mikania glomerata',
        dosage: '1,5-4,5g folhas/dia',
        posology: 'Xarope: 5-15ml 3x ao dia',
        duration: '7-14 dias',
        properties: 'Broncodilatador, expectorante',
        contraindications: ['Anticoagulantes'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Própolis',
        scientificName: 'Própolis',
        dosage: '400-500mg extrato/dia',
        posology: 'Extrato: 200mg 2x ao dia ou 20-30 gotas tintura 3x ao dia',
        duration: '14-21 dias',
        properties: 'Antimicrobiano, anti-inflamatório',
        contraindications: ['Alergia a produtos da colmeia'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Sistema Imunológico
  'Imunidade': {
    category: 'Sistema Imunológico',
    indications: ['Imunodeficiência leve', 'Prevenção de infecções', 'Infecções recorrentes', 'Resfriados frequentes'],
    protocol: [
      {
        plant: 'Equinácea',
        scientificName: 'Echinacea purpurea',
        dosage: '900mg extrato/dia',
        posology: 'Extrato: 300mg 3x ao dia. Uso por 10 dias, pausa de 3 dias',
        duration: 'Ciclos de 8-12 semanas',
        properties: 'Imunoestimulante, antiviral, antibacteriana',
        contraindications: ['Doenças autoimunes', 'HIV', 'Tuberculose'],
        interactions: ['Pode interferir com imunossupressores'],
      },
      {
        plant: 'Própolis',
        scientificName: 'Própolis',
        dosage: '400-500mg extrato/dia',
        posology: 'Extrato padronizado: 200mg 2x ao dia ou 20-30 gotas tintura 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Imunomodulador, antimicrobiano, antioxidante',
        contraindications: ['Alergia a produtos da colmeia'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Unha-de-gato',
        scientificName: 'Uncaria tomentosa',
        dosage: '20-350mg extrato/dia',
        posology: 'Extrato padronizado: 20-60mg 2x ao dia',
        duration: '6-12 semanas',
        properties: 'Imunomoduladora, anti-inflamatória',
        contraindications: ['Transplantados', 'Doenças autoimunes'],
        interactions: ['Pode interferir com imunossupressores'],
      },
    ],
  },

  // Sistema Metabólico
  'Diabetes': {
    category: 'Sistema Metabólico',
    indications: ['Diabetes tipo 2 leve', 'Pré-diabetes', 'Resistência insulínica', 'Glicemia elevada'],
    protocol: [
      {
        plant: 'Pata-de-vaca',
        scientificName: 'Bauhinia forficata',
        dosage: '2-6g folhas/dia',
        posology: 'Infusão: 2g para 150ml. Tomar 3x ao dia, antes das refeições',
        duration: 'Uso prolongado com monitoramento',
        properties: 'Hipoglicemiante',
        contraindications: ['Hipoglicemia', 'Cirurgia (suspender 2 semanas antes)'],
        interactions: ['POTENCIALIZAM hipoglicemiantes orais e insulina - monitorar glicemia'],
      },
      {
        plant: 'Canela',
        scientificName: 'Cinnamomum verum',
        dosage: '1-6g/dia',
        posology: 'Pó: 1-3g 2x ao dia com alimentos',
        duration: 'Uso prolongado',
        properties: 'Hipoglicemiante, sensibilizador insulínico',
        contraindications: ['Hepatopatias (cumarina)'],
        interactions: ['Potencializa hipoglicemiantes'],
      },
      {
        plant: 'Jambolão',
        scientificName: 'Syzygium cumini',
        dosage: '2-4g sementes/dia',
        posology: 'Pó: 1-2g 2x ao dia antes das refeições',
        duration: 'Uso prolongado com acompanhamento',
        properties: 'Hipoglicemiante',
        contraindications: ['Hipoglicemia'],
        interactions: ['Potencializa hipoglicemiantes'],
      },
    ],
  },

  // Sistema Urinário
  'Infecção Urinária': {
    category: 'Sistema Urinário',
    indications: ['ITU de repetição (prevenção)', 'Cistite leve', 'Profilaxia', 'Ardência ao urinar'],
    protocol: [
      {
        plant: 'Cranberry',
        scientificName: 'Vaccinium macrocarpon',
        dosage: '500-1500mg extrato/dia',
        posology: 'Extrato: 500mg 2-3x ao dia ou 240-480ml suco/dia',
        duration: 'Uso prolongado (prevenção)',
        properties: 'Antiadesivo bacteriano, prevenção de ITU',
        contraindications: ['Cálculos renais de oxalato'],
        interactions: ['Pode potencializar varfarina (monitorar INR)'],
      },
      {
        plant: 'Cavalinha',
        scientificName: 'Equisetum arvense',
        dosage: '2-6g planta/dia',
        posology: 'Infusão: 2-3g para 150ml. Tomar 2-3x ao dia',
        duration: '2-3 semanas',
        properties: 'Diurética, remineralizante, anti-inflamatória',
        contraindications: ['Edema por ICC ou insuficiência renal'],
        interactions: ['Pode aumentar efeito de diuréticos'],
      },
    ],
  },

  // Saúde da Mulher
  'TPM': {
    category: 'Saúde da Mulher',
    indications: ['Tensão pré-menstrual', 'Dismenorreia', 'Sintomas pré-menstruais', 'Cólica menstrual'],
    protocol: [
      {
        plant: 'Vitex',
        scientificName: 'Vitex agnus-castus',
        dosage: '20-40mg extrato/dia',
        posology: 'Extrato seco: 20-40mg pela manhã, em jejum',
        duration: 'Mínimo 3 ciclos (3 meses)',
        properties: 'Regulador hormonal, dopaminérgico',
        contraindications: ['Gestação', 'Lactação', 'Uso de contraceptivos hormonais'],
        interactions: ['Pode interferir com dopaminérgicos e contraceptivos'],
      },
      {
        plant: 'Dong Quai',
        scientificName: 'Angelica sinensis',
        dosage: '3-6g raiz/dia',
        posology: 'Extrato: 500mg 3x ao dia',
        duration: '2-3 meses',
        properties: 'Regulador menstrual, antiespasmódico',
        contraindications: ['Anticoagulantes', 'Gestação'],
        interactions: ['POTENCIALIZA anticoagulantes'],
      },
    ],
  },

  'Menopausa': {
    category: 'Saúde da Mulher',
    indications: ['Fogachos', 'Ondas de calor', 'Sudorese noturna', 'Sintomas da menopausa'],
    protocol: [
      {
        plant: 'Cimicífuga',
        scientificName: 'Cimicifuga racemosa',
        dosage: '40-80mg extrato/dia',
        posology: 'Extrato padronizado: 20-40mg 2x ao dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Reduz fogachos, modulador estrogênico',
        contraindications: ['Câncer de mama', 'Hepatopatias'],
        interactions: ['Pode interferir com tamoxifeno'],
      },
      {
        plant: 'Soja (Isoflavonas)',
        scientificName: 'Glycine max',
        dosage: '40-80mg isoflavonas/dia',
        posology: '40mg 1-2x ao dia',
        duration: 'Uso prolongado',
        properties: 'Fitoestrógeno, reduz fogachos',
        contraindications: ['Câncer de mama hormônio-dependente'],
        interactions: ['Pode interferir com tamoxifeno'],
      },
    ],
  },

  // Dor e Inflamação
  'Dor': {
    category: 'Dor e Inflamação',
    indications: ['Dor crônica', 'Dor muscular', 'Dor articular', 'Inflamação', 'Artrite'],
    protocol: [
      {
        plant: 'Cúrcuma',
        scientificName: 'Curcuma longa',
        dosage: '1,5-3g/dia',
        posology: 'Extrato padronizado: 500mg 3x ao dia com alimentos gordurosos (aumenta absorção)',
        duration: 'Uso prolongado (mínimo 8 semanas)',
        properties: 'Anti-inflamatória potente, analgésica',
        contraindications: ['Obstrução biliar', 'Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Gengibre',
        scientificName: 'Zingiber officinale',
        dosage: '2-4g/dia',
        posology: 'Extrato: 250mg 3-4x ao dia ou chá 3x ao dia',
        duration: 'Uso quando necessário',
        properties: 'Anti-inflamatório, analgésico',
        contraindications: ['Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Garra-do-diabo',
        scientificName: 'Harpagophytum procumbens',
        dosage: '600-2400mg extrato/dia',
        posology: 'Extrato: 400-800mg 3x ao dia',
        duration: '2-3 meses',
        properties: 'Anti-inflamatória, analgésica',
        contraindications: ['Úlcera péptica', 'Gestação'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Pele
  'Dermatite': {
    category: 'Pele',
    indications: ['Dermatite', 'Eczema', 'Psoríase', 'Coceira', 'Inflamação cutânea'],
    protocol: [
      {
        plant: 'Calêndula',
        scientificName: 'Calendula officinalis',
        dosage: 'Uso tópico',
        posology: 'Pomada/creme: aplicar 2-3x ao dia na área afetada. Infusão para compressa: 2g para 100ml',
        duration: 'Até melhora dos sintomas',
        properties: 'Cicatrizante, anti-inflamatória, antimicrobiana',
        contraindications: ['Alergia a Asteraceae'],
        interactions: ['Nenhuma conhecida (uso tópico)'],
      },
      {
        plant: 'Bardana',
        scientificName: 'Arctium lappa',
        dosage: '2-6g raiz/dia',
        posology: 'Decocção: 2-4g para 150ml, 3x ao dia',
        duration: '4-8 semanas',
        properties: 'Depurativa, anti-inflamatória',
        contraindications: ['Gestação'],
        interactions: ['Pode potencializar hipoglicemiantes'],
      },
    ],
  },

  // Fígado
  'Fígado': {
    category: 'Sistema Hepático',
    indications: ['Esteatose hepática', 'Hepatopatia', 'Desintoxicação', 'Proteção hepática'],
    protocol: [
      {
        plant: 'Cardo-mariano',
        scientificName: 'Silybum marianum',
        dosage: '200-400mg silimarina/dia',
        posology: 'Extrato padronizado: 100-200mg 2x ao dia, com alimentos',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Hepatoprotetor potente, antioxidante, regenerador hepático',
        contraindications: ['Alergia a Asteraceae'],
        interactions: ['Pode interferir com metabolismo de alguns medicamentos'],
      },
      {
        plant: 'Alcachofra',
        scientificName: 'Cynara scolymus',
        dosage: '600-1800mg extrato/dia',
        posology: 'Extrato: 300-600mg 3x ao dia, antes das refeições',
        duration: '6-12 semanas',
        properties: 'Hepatoprotetor, colerético, hipolipemiante',
        contraindications: ['Obstrução biliar'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Boldo',
        scientificName: 'Peumus boldus',
        dosage: '3g folhas/dia',
        posology: 'Infusão: 1g para 150ml, 3x ao dia antes das refeições',
        duration: 'Máximo 4 semanas',
        properties: 'Colerético, digestivo, hepatoprotetor',
        contraindications: ['Obstrução biliar', 'Hepatopatia grave', 'Gestação'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Rins
  'Pedra nos Rins': {
    category: 'Sistema Urinário',
    indications: ['Cálculo renal', 'Litíase renal', 'Prevenção de pedras'],
    protocol: [
      {
        plant: 'Quebra-pedra',
        scientificName: 'Phyllanthus niruri',
        dosage: '2-3g planta/dia',
        posology: 'Infusão: 1g para 150ml, 2-3x ao dia. Cápsulas: 500mg 2-3x ao dia',
        duration: '4-12 semanas',
        properties: 'Litolítico, diurético, antiespasmódico',
        contraindications: ['Gestação', 'Hipotensão'],
        interactions: ['Pode potencializar anti-hipertensivos', 'Pode alterar glicemia'],
      },
      {
        plant: 'Cavalinha',
        scientificName: 'Equisetum arvense',
        dosage: '2-6g planta/dia',
        posology: 'Infusão: 2-3g para 150ml, 2-3x ao dia',
        duration: '2-4 semanas',
        properties: 'Diurética, remineralizante',
        contraindications: ['Insuficiência renal', 'ICC'],
        interactions: ['Pode aumentar eliminação de lítio'],
      },
    ],
  },

  // Próstata
  'Próstata': {
    category: 'Saúde do Homem',
    indications: ['Hiperplasia prostática benigna', 'HPB', 'Dificuldade para urinar'],
    protocol: [
      {
        plant: 'Saw Palmetto',
        scientificName: 'Serenoa repens',
        dosage: '320mg extrato/dia',
        posology: 'Extrato lipídico: 160mg 2x ao dia com alimentos',
        duration: 'Uso prolongado (mínimo 6-12 semanas)',
        properties: 'Anti-inflamatório prostático, 5-alfa-redutase inibidor',
        contraindications: ['Cirurgia (suspender 2 semanas antes)'],
        interactions: ['Pode interferir com hormônios'],
      },
      {
        plant: 'Pygeum',
        scientificName: 'Pygeum africanum',
        dosage: '100-200mg extrato/dia',
        posology: 'Extrato: 50-100mg 2x ao dia',
        duration: 'Uso prolongado',
        properties: 'Anti-inflamatório prostático, melhora fluxo urinário',
        contraindications: ['Distúrbios hemorrágicos'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Enxaqueca
  'Enxaqueca': {
    category: 'Sistema Nervoso',
    indications: ['Enxaqueca', 'Cefaleia tensional', 'Dor de cabeça crônica'],
    protocol: [
      {
        plant: 'Tanaceto',
        scientificName: 'Tanacetum parthenium',
        dosage: '50-150mg extrato/dia',
        posology: 'Extrato padronizado: 50-100mg 2x ao dia',
        duration: 'Uso preventivo contínuo (mínimo 3 meses)',
        properties: 'Preventivo de enxaqueca, anti-inflamatório',
        contraindications: ['Gestação', 'Lactação', 'Alergia a Asteraceae', 'Anticoagulantes'],
        interactions: ['POTENCIALIZA anticoagulantes'],
      },
      {
        plant: 'Gengibre',
        scientificName: 'Zingiber officinale',
        dosage: '500-2000mg/dia',
        posology: 'No início da crise: 500-1000mg. Preventivo: 250mg 3x ao dia',
        duration: 'Uso quando necessário ou preventivo',
        properties: 'Anti-inflamatório, antiemético, analgésico',
        contraindications: ['Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Petasites',
        scientificName: 'Petasites hybridus',
        dosage: '50-150mg extrato/dia',
        posology: 'Extrato livre de alcaloides pirrolizidínicos: 50-75mg 2x ao dia',
        duration: 'Uso preventivo (3-4 meses)',
        properties: 'Preventivo de enxaqueca, antiespasmódico',
        contraindications: ['Hepatopatias', 'Gestação'],
        interactions: ['Usar apenas extratos certificados livres de PA'],
      },
    ],
  },

  // Memória
  'Memória': {
    category: 'Sistema Nervoso',
    indications: ['Declínio cognitivo', 'Perda de memória', 'Concentração', 'Foco'],
    protocol: [
      {
        plant: 'Ginkgo biloba',
        scientificName: 'Ginkgo biloba',
        dosage: '120-240mg extrato/dia',
        posology: 'Extrato padronizado EGb 761: 40-80mg 3x ao dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Nootrópico, melhora circulação cerebral, antioxidante',
        contraindications: ['Distúrbios hemorrágicos', 'Cirurgia (suspender 2 semanas antes)'],
        interactions: ['POTENCIALIZA anticoagulantes'],
      },
      {
        plant: 'Bacopa',
        scientificName: 'Bacopa monnieri',
        dosage: '300-450mg extrato/dia',
        posology: 'Extrato padronizado: 150mg 2-3x ao dia com alimentos',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Nootrópico, melhora memória e aprendizado',
        contraindications: ['Hipotireoidismo', 'Bradicardia'],
        interactions: ['Pode interagir com hormônios tireoidianos'],
      },
      {
        plant: 'Ginseng',
        scientificName: 'Panax ginseng',
        dosage: '200-400mg extrato/dia',
        posology: 'Extrato padronizado: 100-200mg 2x ao dia pela manhã',
        duration: 'Ciclos de 3-4 semanas com pausa de 1-2 semanas',
        properties: 'Adaptógeno, melhora cognição e energia',
        contraindications: ['Hipertensão não controlada', 'Insônia', 'Gestação'],
        interactions: ['Pode interferir com anticoagulantes e hipoglicemiantes'],
      },
    ],
  },

  // Artrite
  'Artrite': {
    category: 'Dor e Inflamação',
    indications: ['Artrite reumatoide', 'Osteoartrite', 'Dor articular', 'Inflamação articular'],
    protocol: [
      {
        plant: 'Cúrcuma',
        scientificName: 'Curcuma longa',
        dosage: '1,5-3g/dia',
        posology: 'Extrato com piperina: 500mg 3x ao dia com alimentos gordurosos',
        duration: 'Uso prolongado (mínimo 8 semanas)',
        properties: 'Anti-inflamatória potente, analgésica',
        contraindications: ['Obstrução biliar', 'Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Boswellia',
        scientificName: 'Boswellia serrata',
        dosage: '300-500mg extrato/dia',
        posology: 'Extrato padronizado: 300-400mg 2-3x ao dia',
        duration: '8-12 semanas',
        properties: 'Anti-inflamatória, analgésica, protetor articular',
        contraindications: ['Gestação'],
        interactions: ['Pode potencializar anti-inflamatórios'],
      },
      {
        plant: 'Garra-do-diabo',
        scientificName: 'Harpagophytum procumbens',
        dosage: '600-2400mg extrato/dia',
        posology: 'Extrato: 400-800mg 3x ao dia',
        duration: '2-3 meses',
        properties: 'Anti-inflamatória, analgésica',
        contraindications: ['Úlcera péptica', 'Gestação'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Osteoporose
  'Osteoporose': {
    category: 'Sistema Ósseo',
    indications: ['Osteoporose', 'Osteopenia', 'Prevenção de fraturas', 'Saúde óssea'],
    protocol: [
      {
        plant: 'Cavalinha',
        scientificName: 'Equisetum arvense',
        dosage: '2-6g planta/dia',
        posology: 'Infusão: 2-3g para 150ml, 2-3x ao dia',
        duration: 'Uso prolongado (mínimo 3 meses)',
        properties: 'Remineralizante (rico em silício), fortalece ossos',
        contraindications: ['ICC', 'Insuficiência renal'],
        interactions: ['Pode aumentar eliminação de potássio'],
      },
      {
        plant: 'Alfafa',
        scientificName: 'Medicago sativa',
        dosage: '5-10g/dia',
        posology: 'Cápsulas: 500-1000mg 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Rica em vitamina K, cálcio e minerais',
        contraindications: ['Anticoagulantes', 'Lúpus', 'Doenças autoimunes'],
        interactions: ['CONTRAINDICA com varfarina (vitamina K)'],
      },
    ],
  },

  // Tireoide
  'Hipotireoidismo': {
    category: 'Sistema Endócrino',
    indications: ['Hipotireoidismo subclínico', 'Suporte tireoidiano', 'Baixa energia por tireoide'],
    protocol: [
      {
        plant: 'Ashwagandha',
        scientificName: 'Withania somnifera',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato padronizado: 300mg 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Adaptógena, estimula T3/T4, suporta tireoide',
        contraindications: ['Hipertireoidismo'],
        interactions: ['Pode potencializar hormônios tireoidianos'],
      },
      {
        plant: 'Fucus',
        scientificName: 'Fucus vesiculosus',
        dosage: '200-600mg/dia',
        posology: '150-200mg 2-3x ao dia',
        duration: 'Uso com acompanhamento por profissional de saúde',
        properties: 'Rico em iodo, estimula tireoide',
        contraindications: ['Hipertireoidismo', 'Tireoidite', 'Gestação'],
        interactions: ['Pode interferir com levotiroxina'],
      },
    ],
  },

  'Hipertireoidismo': {
    category: 'Sistema Endócrino',
    indications: ['Hipertireoidismo leve', 'Tireotoxicose'],
    protocol: [
      {
        plant: 'Melissa',
        scientificName: 'Melissa officinalis',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato: 300mg 2x ao dia',
        duration: 'Uso com acompanhamento por profissional de saúde',
        properties: 'Inibe TSH, reduz atividade tireoidiana',
        contraindications: ['Hipotireoidismo'],
        interactions: ['Pode interferir com hormônios tireoidianos'],
      },
    ],
  },

  // Varizes
  'Varizes': {
    category: 'Sistema Circulatório',
    indications: ['Varizes', 'Insuficiência venosa', 'Pernas pesadas', 'Edema de membros'],
    protocol: [
      {
        plant: 'Castanha-da-índia',
        scientificName: 'Aesculus hippocastanum',
        dosage: '300mg aescina/dia',
        posology: 'Extrato padronizado: 50mg aescina 2x ao dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Venotônico, anti-inflamatório, reduz edema',
        contraindications: ['Insuficiência renal/hepática', 'Anticoagulantes'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Centella asiática',
        scientificName: 'Centella asiatica',
        dosage: '60-120mg/dia',
        posology: 'Extrato padronizado: 30-60mg 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Venotônica, melhora circulação, cicatrizante',
        contraindications: ['Hepatopatias'],
        interactions: ['Pode potencializar sedativos'],
      },
    ],
  },

  // Hemorroidas
  'Hemorroidas': {
    category: 'Sistema Digestivo',
    indications: ['Hemorroidas', 'Sangramento anal', 'Dor anal'],
    protocol: [
      {
        plant: 'Castanha-da-índia',
        scientificName: 'Aesculus hippocastanum',
        dosage: '300mg aescina/dia',
        posology: 'Extrato: 50mg aescina 2x ao dia',
        duration: '4-8 semanas',
        properties: 'Venotônico, anti-inflamatório',
        contraindications: ['Anticoagulantes'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Hamamélis',
        scientificName: 'Hamamelis virginiana',
        dosage: 'Uso tópico',
        posology: 'Pomada/creme: aplicar 2-3x ao dia. Compressas: 5-10g para 250ml',
        duration: 'Até melhora',
        properties: 'Adstringente, anti-inflamatória, hemostática',
        contraindications: ['Nenhuma conhecida (uso tópico)'],
        interactions: ['Nenhuma (uso tópico)'],
      },
    ],
  },

  // Acne
  'Acne': {
    category: 'Pele',
    indications: ['Acne', 'Espinhas', 'Cravos', 'Pele oleosa'],
    protocol: [
      {
        plant: 'Tea Tree',
        scientificName: 'Melaleuca alternifolia',
        dosage: 'Uso tópico',
        posology: 'Óleo essencial 5%: aplicar localmente 1-2x ao dia',
        duration: 'Até melhora',
        properties: 'Antimicrobiano, anti-inflamatório',
        contraindications: ['Não ingerir', 'Evitar contato com olhos'],
        interactions: ['Nenhuma (uso tópico)'],
      },
      {
        plant: 'Bardana',
        scientificName: 'Arctium lappa',
        dosage: '2-6g raiz/dia',
        posology: 'Decocção: 2-4g para 150ml, 3x ao dia',
        duration: '6-8 semanas',
        properties: 'Depurativa, antibacteriana, anti-inflamatória',
        contraindications: ['Gestação'],
        interactions: ['Pode potencializar hipoglicemiantes'],
      },
    ],
  },

  // Candidíase
  'Candidíase': {
    category: 'Infecções',
    indications: ['Candidíase vaginal', 'Candidíase oral', 'Infecção fúngica'],
    protocol: [
      {
        plant: 'Alho',
        scientificName: 'Allium sativum',
        dosage: '600-1200mg extrato/dia',
        posology: 'Extrato: 300-600mg 2x ao dia ou 1-2 dentes frescos/dia',
        duration: '7-14 dias',
        properties: 'Antifúngico potente, antibacteriano',
        contraindications: ['Anticoagulantes', 'Cirurgia'],
        interactions: ['POTENCIALIZA anticoagulantes'],
      },
      {
        plant: 'Óleo de Orégano',
        scientificName: 'Origanum vulgare',
        dosage: '200-600mg extrato/dia',
        posology: 'Cápsulas: 150-200mg 3x ao dia com alimentos',
        duration: '7-14 dias',
        properties: 'Antifúngico, antibacteriano',
        contraindications: ['Gestação', 'Alergia a Lamiaceae'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Pau d\'arco',
        scientificName: 'Tabebuia impetiginosa',
        dosage: '2-4g casca/dia',
        posology: 'Decocção: 1-2g para 150ml, 2-3x ao dia. Cápsulas: 500mg 2-3x ao dia',
        duration: '7-14 dias',
        properties: 'Antifúngico, imunoestimulante',
        contraindications: ['Anticoagulantes', 'Gestação'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
    ],
  },

  // Vermes
  'Vermes': {
    category: 'Infecções',
    indications: ['Verminose', 'Parasitas intestinais', 'Oxiúros', 'Giárdia'],
    protocol: [
      {
        plant: 'Hortelã',
        scientificName: 'Mentha piperita',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1,5g para 150ml, 3x ao dia em jejum',
        duration: '7-10 dias',
        properties: 'Vermífuga, antiparasitária',
        contraindications: ['DRGE'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Semente de Abóbora',
        scientificName: 'Cucurbita pepo',
        dosage: '100-300g sementes/dia',
        posology: 'Sementes cruas descascadas: consumir em jejum',
        duration: '3-7 dias',
        properties: 'Vermífuga, especialmente para tênia',
        contraindications: ['Nenhuma conhecida'],
        interactions: ['Nenhuma conhecida'],
      },
    ],
  },

  // Herpes
  'Herpes': {
    category: 'Infecções',
    indications: ['Herpes labial', 'Herpes genital', 'Herpes zoster'],
    protocol: [
      {
        plant: 'Melaleuca (Tea Tree)',
        scientificName: 'Melaleuca alternifolia',
        dosage: 'Uso tópico',
        posology: 'Óleo essencial 100%: aplicar 3-4x ao dia na lesão',
        duration: 'Até cicatrização',
        properties: 'Antiviral, cicatrizante',
        contraindications: ['Não ingerir'],
        interactions: ['Nenhuma (uso tópico)'],
      },
      {
        plant: 'Própolis',
        scientificName: 'Própolis',
        dosage: 'Uso tópico e oral',
        posology: 'Tópico: aplicar 3x ao dia. Oral: 400-500mg 2x ao dia',
        duration: '7-14 dias',
        properties: 'Antiviral, cicatrizante, imunoestimulante',
        contraindications: ['Alergia a produtos da colmeia'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Melissa',
        scientificName: 'Melissa officinalis',
        dosage: 'Uso tópico',
        posology: 'Creme com extrato: aplicar 4-5x ao dia',
        duration: 'Até cicatrização',
        properties: 'Antiviral específico para herpes',
        contraindications: ['Nenhuma (uso tópico)'],
        interactions: ['Nenhuma (uso tópico)'],
      },
    ],
  },

  // Fibromialgia
  'Fibromialgia': {
    category: 'Dor e Inflamação',
    indications: ['Fibromialgia', 'Dor muscular crônica', 'Fadiga', 'Pontos dolorosos'],
    protocol: [
      {
        plant: 'Rhodiola',
        scientificName: 'Rhodiola rosea',
        dosage: '200-600mg extrato/dia',
        posology: 'Extrato padronizado: 200mg 2-3x ao dia pela manhã',
        duration: '8-12 semanas',
        properties: 'Adaptógena, reduz fadiga, melhora dor',
        contraindications: ['Transtorno bipolar', 'Gestação'],
        interactions: ['Pode interagir com antidepressivos'],
      },
      {
        plant: 'Curcuma',
        scientificName: 'Curcuma longa',
        dosage: '1,5-3g/dia',
        posology: 'Extrato com piperina: 500mg 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Anti-inflamatória, analgésica',
        contraindications: ['Cálculos biliares'],
        interactions: ['Pode potencializar anticoagulantes'],
      },
      {
        plant: 'Maracujá',
        scientificName: 'Passiflora incarnata',
        dosage: '4-8g/dia',
        posology: 'Infusão: 2-4g para 150ml, 2-3x ao dia',
        duration: 'Uso contínuo',
        properties: 'Ansiolítica, melhora sono, relaxante muscular',
        contraindications: ['Gestação 1º trimestre'],
        interactions: ['Potencializa sedativos'],
      },
    ],
  },

  // Obesidade
  'Obesidade': {
    category: 'Sistema Metabólico',
    indications: ['Obesidade', 'Sobrepeso', 'Emagrecimento', 'Controle de peso'],
    protocol: [
      {
        plant: 'Chá Verde',
        scientificName: 'Camellia sinensis',
        dosage: '2-3 xícaras/dia',
        posology: 'Infusão: 2g para 200ml, 2-3x ao dia ou extrato 300-500mg 2x ao dia',
        duration: 'Uso prolongado (mínimo 12 semanas)',
        properties: 'Termogênico, acelera metabolismo, antioxidante',
        contraindications: ['Insônia', 'Ansiedade', 'Hipertensão não controlada'],
        interactions: ['Pode interferir com betabloqueadores'],
      },
      {
        plant: 'Garcinia',
        scientificName: 'Garcinia cambogia',
        dosage: '1500-3000mg extrato/dia',
        posology: 'Extrato com 50-60% HCA: 500-1000mg 3x ao dia, 30min antes das refeições',
        duration: '12 semanas',
        properties: 'Inibidor de apetite, reduz lipogênese',
        contraindications: ['Gestação', 'Lactação', 'Demência', 'Diabetes'],
        interactions: ['Pode potencializar hipoglicemiantes'],
      },
    ],
  },

  // Estresse
  'Estresse': {
    category: 'Sistema Nervoso',
    indications: ['Estresse crônico', 'Burnout', 'Esgotamento', 'Fadiga mental'],
    protocol: [
      {
        plant: 'Rhodiola',
        scientificName: 'Rhodiola rosea',
        dosage: '200-600mg extrato/dia',
        posology: 'Extrato padronizado: 200mg 2-3x ao dia',
        duration: '6-12 semanas',
        properties: 'Adaptógena potente, antifadiga, melhora performance',
        contraindications: ['Transtorno bipolar'],
        interactions: ['Pode interagir com antidepressivos'],
      },
      {
        plant: 'Ashwagandha',
        scientificName: 'Withania somnifera',
        dosage: '300-600mg extrato/dia',
        posology: 'Extrato: 300mg 2x ao dia',
        duration: '8-12 semanas',
        properties: 'Adaptógena, antistress, ansiolítica',
        contraindications: ['Hipertireoidismo'],
        interactions: ['Pode potencializar sedativos'],
      },
      {
        plant: 'Ginseng',
        scientificName: 'Panax ginseng',
        dosage: '200-400mg extrato/dia',
        posology: 'Extrato: 100-200mg 2x ao dia',
        duration: 'Ciclos de 3-4 semanas',
        properties: 'Adaptógeno, energético, melhora resistência ao estresse',
        contraindications: ['Hipertensão', 'Insônia'],
        interactions: ['Pode interferir com anticoagulantes'],
      },
    ],
  },

  // Libido
  'Libido': {
    category: 'Saúde Sexual',
    indications: ['Baixa libido', 'Disfunção erétil leve', 'Desejo sexual baixo'],
    protocol: [
      {
        plant: 'Maca Peruana',
        scientificName: 'Lepidium meyenii',
        dosage: '1,5-3g/dia',
        posology: 'Pó ou cápsulas: 500-1000mg 3x ao dia',
        duration: '6-12 semanas',
        properties: 'Afrodisíaco, melhora libido, energético',
        contraindications: ['Hipertireoidismo'],
        interactions: ['Pode interferir com hormônios'],
      },
      {
        plant: 'Tribulus',
        scientificName: 'Tribulus terrestris',
        dosage: '750-1500mg extrato/dia',
        posology: 'Extrato: 250-500mg 3x ao dia',
        duration: '4-8 semanas',
        properties: 'Aumenta testosterona, melhora libido e performance',
        contraindications: ['Câncer de próstata', 'Gestação'],
        interactions: ['Pode interferir com diabetes e anti-hipertensivos'],
      },
      {
        plant: 'Ginkgo biloba',
        scientificName: 'Ginkgo biloba',
        dosage: '120-240mg extrato/dia',
        posology: 'Extrato: 40-80mg 3x ao dia',
        duration: '6-8 semanas',
        properties: 'Melhora circulação genital, vasodilatador',
        contraindications: ['Anticoagulantes'],
        interactions: ['POTENCIALIZA anticoagulantes'],
      },
    ],
  },
};

// Base de protocolos fitoterápicos para emergências (mantida para compatibilidade)
const PHYTOTHERAPY_EMERGENCY = {
  'dor no peito': {
    protocol: [
      {
        plant: 'Crataegus (Espinheiro-branco)',
        scientificName: 'Crataegus oxyacantha',
        dosage: '300-900mg extrato/dia',
        posology: 'Extrato seco: 300mg 3x ao dia, com alimentos',
        duration: 'Uso preventivo contínuo (mínimo 6 semanas)',
        properties: 'Cardiotônico, vasodilatador coronariano, antiarrítmico',
        note: '⚠️ USO PREVENTIVO - Em crise aguda: CHAMAR 192 PRIMEIRO',
      },
      {
        plant: 'Alho (Allium sativum)',
        scientificName: 'Allium sativum',
        dosage: '600-1200mg extrato/dia',
        posology: 'Extrato: 300-600mg 2x ao dia ou 1-2 dentes frescos/dia',
        duration: 'Uso preventivo contínuo',
        properties: 'Antiagregante plaquetário, vasodilatador, hipotensor',
        note: '⚠️ PREVENÇÃO CARDIOVASCULAR - não substitui orientação de profissional de saúde',
      },
    ],
    warning: 'ATENÇÃO: Dor no peito é EMERGÊNCIA. Chamar 192 IMEDIATAMENTE. Fitoterapia é apenas PREVENTIVA.',
  },

  'falta de ar': {
    protocol: [
      {
        plant: 'Guaco (Mikania glomerata)',
        scientificName: 'Mikania glomerata',
        dosage: '1,5-4,5g folhas/dia',
        posology: 'Xarope: 5-15ml 3x ao dia. Infusão: 1,5g para 150ml, 3x ao dia',
        duration: '7-14 dias',
        properties: 'Broncodilatador, expectorante, antitussígeno',
        note: '✓ Útil em crises leves de asma/bronquite',
      },
      {
        plant: 'Hortelã-pimenta (Mentha piperita)',
        scientificName: 'Mentha piperita',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1,5g para 150ml. Tomar 3-4x ao dia. Inalação: 3-4 gotas óleo em água quente',
        duration: 'Durante crise respiratória',
        properties: 'Broncodilatador leve, descongestionante',
        note: '✓ Inalação ajuda em congestão nasal',
      },
      {
        plant: 'Eucalipto (Eucalyptus globulus)',
        scientificName: 'Eucalyptus globulus',
        dosage: '4-6g folhas/dia',
        posology: 'Inalação: 2-3 gotas óleo essencial em água quente. Infusão: 2g para 150ml, 2-3x ao dia',
        duration: '5-7 dias',
        properties: 'Expectorante, descongestionante, antimicrobiano',
        note: '✓ Excelente para inalação',
      },
    ],
    warning: 'Se falta de ar grave, lábios azulados ou dificuldade para falar: CHAMAR 192 IMEDIATAMENTE.',
  },

  'crise hipertensiva': {
    protocol: [
      {
        plant: 'Hibisco (Hibiscus sabdariffa)',
        scientificName: 'Hibiscus sabdariffa',
        dosage: '1,5-3g flores/dia',
        posology: 'Infusão: 1,5g para 200ml. Tomar 2x ao dia',
        duration: 'Uso preventivo contínuo',
        properties: 'Anti-hipertensivo, diurético suave, antioxidante',
        note: '✓ Reduz PA em 7-13 mmHg (uso regular)',
      },
      {
        plant: 'Alho (Allium sativum)',
        scientificName: 'Allium sativum',
        dosage: '600-1200mg extrato/dia',
        posology: 'Extrato: 300-600mg 2x ao dia',
        duration: 'Uso preventivo (mínimo 12 semanas)',
        properties: 'Vasodilatador, anti-hipertensivo',
        note: '✓ Efeito cumulativo - não baixa PA agudamente',
      },
      {
        plant: 'Passiflora (Passiflora incarnata)',
        scientificName: 'Passiflora incarnata',
        dosage: '4-8g/dia',
        posology: 'Infusão: 2-4g para 150ml. Tomar 2-3x ao dia',
        duration: 'Durante estresse/ansiedade',
        properties: 'Ansiolítica, sedativa, hipotensora leve',
        note: '✓ Útil quando PA sobe por ansiedade',
      },
    ],
    warning: 'PA > 180/120 com sintomas (dor peito, visão turva, falta de ar): CHAMAR 192. Fitoterapia é PREVENTIVA.',
  },

  'ansiedade': {
    protocol: [
      {
        plant: 'Passiflora (Passiflora incarnata)',
        scientificName: 'Passiflora incarnata',
        dosage: '4-8g/dia',
        posology: 'Infusão: 2-4g para 150ml, 2-3x ao dia. Tintura: 2-4ml 3x ao dia',
        duration: '4-8 semanas',
        properties: 'Ansiolítica, sedativa leve',
        note: '✓ Efeito em 30-60 minutos',
      },
      {
        plant: 'Valeriana (Valeriana officinalis)',
        scientificName: 'Valeriana officinalis',
        dosage: '300-600mg extrato/dia',
        posology: 'Para ansiedade aguda: 150-300mg até 3x ao dia',
        duration: '2-4 semanas',
        properties: 'Ansiolítica, sedativa',
        note: '✓ Pode causar sonolência',
      },
      {
        plant: 'Melissa (Melissa officinalis)',
        scientificName: 'Melissa officinalis',
        dosage: '3-6g folhas/dia',
        posology: 'Infusão: 1-2g para 150ml, 3x ao dia. Em crise: tomar imediatamente',
        duration: '4-12 semanas',
        properties: 'Ansiolítica, calmante, antiespasmódica',
        note: '✓ Segura para uso frequente',
      },
      {
        plant: 'Camomila (Matricaria chamomilla)',
        scientificName: 'Matricaria chamomilla',
        dosage: '3-6g flores/dia',
        posology: 'Infusão: 2g para 200ml. Tomar 3-4x ao dia ou em crise',
        duration: 'Uso contínuo permitido',
        properties: 'Calmante, ansiolítica leve, digestiva',
        note: '✓ Muito segura, sem efeitos colaterais',
      },
    ],
    warning: 'Ataques de pânico graves ou pensamentos suicidas: CHAMAR 188 (CVV) ou 192.',
  },

  'desmaio': {
    protocol: [
      {
        plant: 'Gengibre (Zingiber officinale)',
        scientificName: 'Zingiber officinale',
        dosage: '2-4g/dia',
        posology: 'Infusão: 1-2g para 200ml, 3x ao dia. Preventivo para náusea/tontura',
        duration: 'Uso quando necessário',
        properties: 'Circulatório, antiemético, tônico',
        note: '✓ Ajuda em tonturas e náuseas',
      },
      {
        plant: 'Ginkgo biloba',
        scientificName: 'Ginkgo biloba',
        dosage: '120-240mg extrato/dia',
        posology: 'Extrato padronizado: 40-80mg 3x ao dia',
        duration: 'Uso preventivo (mínimo 6 semanas)',
        properties: 'Melhora circulação cerebral, vasodilatador',
        note: '✓ Previne tonturas e vertigens',
      },
      {
        plant: 'Alecrim (Rosmarinus officinalis)',
        scientificName: 'Rosmarinus officinalis',
        dosage: '4-6g folhas/dia',
        posology: 'Infusão: 2g para 150ml, 2-3x ao dia. Aromaterapia: inalar óleo',
        duration: 'Uso quando necessário',
        properties: 'Tônico circulatório, estimulante suave',
        note: '✓ Ajuda em hipotensão postural',
      },
    ],
    warning: 'Desmaio com convulsão, dor no peito ou que não recupera em 2 minutos: CHAMAR 192.',
  },

  'hipoglicemia': {
    protocol: [
      {
        plant: 'Pata-de-vaca (Bauhinia forficata)',
        scientificName: 'Bauhinia forficata',
        dosage: '2-6g folhas/dia',
        posology: 'Infusão: 2g para 150ml, 3x ao dia, antes das refeições',
        duration: 'Uso preventivo contínuo',
        properties: 'Regulador glicêmico (evita oscilações)',
        note: '⚠️ NÃO usar em hipoglicemia aguda - dar AÇÚCAR primeiro',
      },
      {
        plant: 'Canela (Cinnamomum verum)',
        scientificName: 'Cinnamomum verum',
        dosage: '1-6g/dia',
        posology: 'Pó: 1-3g 2x ao dia com alimentos',
        duration: 'Uso preventivo',
        properties: 'Sensibilizador insulínico, estabiliza glicemia',
        note: '✓ Previne hipoglicemia reativa',
      },
    ],
    warning: 'HIPOGLICEMIA AGUDA: 1º dar açúcar/mel. Se inconsciente: CHAMAR 192 - NÃO dar nada via oral.',
  },

  'febre alta': {
    protocol: [
      {
        plant: 'Sabugueiro (Sambucus nigra)',
        scientificName: 'Sambucus nigra',
        dosage: '15-30ml xarope/dia',
        posology: 'Xarope: 5-10ml 3x ao dia. Infusão flores: 3-5g para 150ml, 3-4x ao dia',
        duration: '3-5 dias',
        properties: 'Diaforético (induz suor), antiviral, imunoestimulante',
        note: '✓ Ajuda a baixar febre naturalmente',
      },
      {
        plant: 'Gengibre (Zingiber officinale)',
        scientificName: 'Zingiber officinale',
        dosage: '2-4g/dia',
        posology: 'Infusão: 1-2g para 200ml, 3-4x ao dia (quente)',
        duration: 'Durante quadro febril',
        properties: 'Diaforético, anti-inflamatório, imunoestimulante',
        note: '✓ Chá quente induz transpiração',
      },
      {
        plant: 'Equinácea (Echinacea purpurea)',
        scientificName: 'Echinacea purpurea',
        dosage: '900mg extrato/dia',
        posology: 'Extrato: 300mg 3x ao dia',
        duration: 'Máximo 10 dias',
        properties: 'Imunoestimulante, antiviral',
        note: '✓ Reduz duração de infecções',
      },
    ],
    warning: 'Febre > 40°C, rigidez de nuca, manchas roxas na pele ou convulsão: CHAMAR 192 IMEDIATAMENTE.',
  },

  'intoxicação': {
    protocol: [
      {
        plant: 'Carvão ativado (Carbo vegetabilis)',
        scientificName: 'Carvão vegetal ativado',
        dosage: '25-100g dose única',
        posology: 'APENAS se orientado por Centro de Intoxicações: 50-100g em água, dose única',
        duration: 'Dose única',
        properties: 'Adsorvente de toxinas',
        note: '⚠️ NUNCA usar sem orientação médica - pode piorar em alguns casos',
      },
      {
        plant: 'Leite de magnésia',
        scientificName: 'Hidróxido de magnésio',
        dosage: 'Conforme orientação médica',
        posology: 'APENAS se orientado - pode ser contraindicado',
        duration: 'Dose única',
        properties: 'Laxante (acelera eliminação)',
        note: '⚠️ NÃO usar sem orientação - algumas toxinas não devem ser eliminadas rapidamente',
      },
    ],
    warning: 'INTOXICAÇÃO: CHAMAR 192 e 0800 722 6001 (Centro Intoxicações) IMEDIATAMENTE. NÃO provocar vômito sem orientação.',
  },
};

export default function EmergencyAssistant() {
  const navigate = useNavigate();
  const [symptomInput, setSymptomInput] = useState('');
  const [symptomSpecific, setSymptomSpecific] = useState(''); // more detailed symptom description
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    // Require a more specific symptom description to reduce general answers
    if (!symptomInput.trim()) return;
    if (symptomSpecific.trim().length < 12) {
      alert('Por favor descreva o sintoma com mais detalhes (ex: local, intensidade, início, fatores associados).');
      return;
    }

    // Heuristic to ensure specificity: check for location, intensity or time/duration
    const specificityCheckRegex = /(peito|cabeça|abdomen|lombar|ombro|braço|perna|costas|face|olho|nariz|tórax|pulm(ão|ao)|estómago|estômago|joelho|pescoço|intensa|aguda|leve|forte|crônica|cronica|há\s*\d+\s*(h|min|horas|dias|semanas|mês|mes))/i;
    if (!specificityCheckRegex.test(symptomSpecific)) {
      const ok = window.confirm('Sua descrição parece genérica. Deseja prosseguir mesmo assim? Recomendamos incluir: local (ex: "direito do peito"), intensidade (ex: "forte"), início (ex: "há 2 horas").');
      if (!ok) return;
    }

    setIsSearching(true);
    
    // Buscar em TODAS as fontes
    setTimeout(() => {
      const query = symptomInput.toLowerCase();
      const detailed = symptomSpecific.toLowerCase();
      const results = [];

      // 1. Buscar em base de emergências médicas
      Object.entries(EMERGENCY_DATABASE).forEach(([key, data]) => {
        if (
          key.includes(query) ||
          data.possibleConditions.some(c => c.toLowerCase().includes(query)) ||
          query.includes(key)
        ) {
          results.push({ key, ...data, source: 'emergency' });
        }
      });

      // 2. Buscar em base COMPLETA de fitoterapia
      Object.entries(COMPLETE_PHYTOTHERAPY_DATABASE).forEach(([key, data]) => {
        const keyLower = key.toLowerCase();
        const matchesKey = keyLower.includes(query) || query.includes(keyLower);
        const matchesIndication = data.indications.some(ind => 
          ind.toLowerCase().includes(query) || query.includes(ind.toLowerCase())
        );
        const matchesCategory = data.category.toLowerCase().includes(query);
        
        if (matchesKey || matchesIndication || matchesCategory) {
          // Adicionar protocolo fitoterápico completo
          results.push({
            key: key,
            severity: 'moderate',
            possibleConditions: data.indications,
            immediateActions: [`Protocolo fitoterápico disponível para ${key}`],
            redFlags: data.protocol[0]?.contraindications || [],
            phytoProtocol: data,
            symptomSpecific: detailed,
            source: 'phytotherapy',
          });
        }
      });

      // 3. Busca ampla por palavras-chave em AMBAS as bases
      const keywords = {
        // Emergências médicas
        'coração': ['dor no peito', 'Hipertensão', 'Colesterol'],
        'infarto': ['dor no peito'],
        'peito': ['dor no peito'],
        'respirar': ['falta de ar', 'Gripe', 'Bronquite'],
        'asma': ['falta de ar'],
        'tosse': ['falta de ar', 'Gripe', 'Bronquite'],
        'derrame': ['avc'],
        'tontura': ['desmaio'],
        'desmaiou': ['desmaio'],
        'glicose': ['hipoglicemia', 'Diabetes'],
        'diabetes': ['hipoglicemia', 'Diabetes'],
        'açúcar': ['hipoglicemia', 'Diabetes'],
        'alergia': ['anafilaxia'],
        'choque': ['anafilaxia'],
        'pressão': ['crise hipertensiva', 'Hipertensão'],
        'hipertensão': ['crise hipertensiva', 'Hipertensão'],
        'cabeça': ['traumatismo craniano'],
        'veneno': ['intoxicação'],
        'remédio': ['intoxicação'],
        // Sintomas gerais
        'ansiedade': ['ansiedade', 'Ansiedade'],
        'nervoso': ['ansiedade', 'Ansiedade'],
        'pânico': ['ansiedade', 'Ansiedade'],
        'estresse': ['ansiedade', 'Ansiedade'],
        'insônia': ['Insônia'],
        'dormir': ['Insônia'],
        'sono': ['Insônia'],
        'febre': ['febre alta', 'Gripe'],
        'temperatura': ['febre alta'],
        'gripe': ['Gripe'],
        'resfriado': ['Gripe'],
        'sinusite': ['Gripe'],
        'rinite': ['Gripe'],
        // Digestivo
        'estômago': ['Gastrite', 'Náusea'],
        'gastrite': ['Gastrite'],
        'azia': ['Gastrite'],
        'queimação': ['Gastrite'],
        'úlcera': ['Gastrite'],
        'constipação': ['Constipação'],
        'intestino': ['Constipação', 'Diarreia'],
        'diarreia': ['Diarreia'],
        'náusea': ['Náusea'],
        'enjoo': ['Náusea'],
        'vômito': ['Náusea'],
        // Dor
        'dor': ['Dor'],
        'artrite': ['Dor'],
        'inflamação': ['Dor'],
        'muscular': ['Dor'],
        // Outros
        'colesterol': ['Colesterol'],
        'triglicerídeos': ['Colesterol'],
        'imunidade': ['Imunidade'],
        'infecção': ['Imunidade', 'Infecção Urinária'],
        'urina': ['Infecção Urinária'],
        'cistite': ['Infecção Urinária'],
        'tpm': ['TPM'],
        'menstruação': ['TPM'],
        'cólica': ['TPM'],
        'menopausa': ['Menopausa'],
        'fogacho': ['Menopausa'],
        'depressão': ['Depressão'],
        'tristeza': ['Depressão'],
        'pele': ['Dermatite', 'Acne'],
        'dermatite': ['Dermatite'],
        'eczema': ['Dermatite'],
        'coceira': ['Dermatite'],
        'fígado': ['Fígado'],
        'hepatite': ['Fígado'],
        'gordura': ['Fígado', 'Colesterol', 'Obesidade'],
        // Novos sintomas
        'pedra': ['Pedra nos Rins'],
        'cálculo': ['Pedra nos Rins'],
        'rim': ['Pedra nos Rins', 'Infecção Urinária'],
        'próstata': ['Próstata'],
        'urinar': ['Próstata', 'Infecção Urinária'],
        'enxaqueca': ['Enxaqueca'],
        'memória': ['Memória'],
        'esquecimento': ['Memória'],
        'concentração': ['Memória'],
        'artrite': ['Artrite', 'Dor'],
        'articulação': ['Artrite', 'Dor'],
        'osso': ['Osteoporose', 'Artrite'],
        'osteoporose': ['Osteoporose'],
        'fratura': ['Osteoporose'],
        'tireoide': ['Hipotireoidismo', 'Hipertireoidismo'],
        'cansaço': ['Hipotireoidismo', 'Estresse', 'Fibromialgia'],
        'fadiga': ['Hipotireoidismo', 'Estresse', 'Fibromialgia'],
        'varizes': ['Varizes'],
        'pernas': ['Varizes'],
        'hemorroida': ['Hemorroidas'],
        'sangramento': ['Hemorroidas', 'sangramento grave'],
        'acne': ['Acne'],
        'espinha': ['Acne'],
        'candidíase': ['Candidíase'],
        'fungo': ['Candidíase'],
        'sapinho': ['Candidíase'],
        'verme': ['Vermes'],
        'parasita': ['Vermes'],
        'herpes': ['Herpes'],
        'afta': ['Herpes'],
        'fibromialgia': ['Fibromialgia'],
        'peso': ['Obesidade'],
        'emagrecer': ['Obesidade'],
        'emagrecimento': ['Obesidade'],
        'gordura': ['Obesidade', 'Colesterol', 'Fígado'],
        'estresse': ['Estresse', 'Ansiedade'],
        'burnout': ['Estresse'],
        'esgotamento': ['Estresse'],
        'libido': ['Libido'],
        'sexual': ['Libido'],
        'impotência': ['Libido'],
        'desejo': ['Libido'],
      };

      Object.entries(keywords).forEach(([word, targetKeys]) => {
        if (query.includes(word)) {
          targetKeys.forEach(targetKey => {
            // Buscar em emergências
            if (EMERGENCY_DATABASE[targetKey] && !results.some(r => r.key === targetKey && r.source === 'emergency')) {
              const data = EMERGENCY_DATABASE[targetKey];
              results.push({ key: targetKey, ...data, source: 'emergency' });
            }
            // Buscar em fitoterapia
            if (COMPLETE_PHYTOTHERAPY_DATABASE[targetKey] && !results.some(r => r.key === targetKey && r.source === 'phytotherapy')) {
              const data = COMPLETE_PHYTOTHERAPY_DATABASE[targetKey];
              results.push({
                key: targetKey,
                severity: 'moderate',
                possibleConditions: data.indications,
                immediateActions: [`Protocolo fitoterápico disponível para ${targetKey}`],
                redFlags: data.protocol[0]?.contraindications || [],
                phytoProtocol: data,
                source: 'phytotherapy',
              });
            }
          });
        }
      });

      // Attach the specific symptom text to results for display
      const enriched = results.map(r => ({ ...r, symptomSpecific: symptomSpecific }));
      setSearchResults(enriched);
      setIsSearching(false);
    }, 500);
  };

  // Retorna os blocos de óleos essenciais como JSX para um resultado
  const getOilsBlocks = (result) => {
    const mapKeywordsToOils = (q) => {
      const qLower = q.toLowerCase();
      const oils = [];
      if (qLower.includes('respir') || qLower.includes('asma') || qLower.includes('tosse') || qLower.includes('gripe')) oils.push('Sistema Respiratório');
      if (qLower.includes('ansiedade') || qLower.includes('insônia') || qLower.includes('estresse') || qLower.includes('pânico')) oils.push('Sistema Nervoso');
      if (qLower.includes('dor') || qLower.includes('inflam')) oils.push('Dor e Inflamação');
      if (qLower.includes('digest') || qLower.includes('náusea') || qLower.includes('diarreia') || qLower.includes('estômago')) oils.push('Sistema Digestivo');
      return oils;
    };
    // Use the more specific symptom description if provided (better matching)
    const contextText = (result.symptomSpecific || result.key || (result.possibleConditions || []).join(' '));
    const groups = mapKeywordsToOils(contextText);
    const protocols = THERAPEUTIC_PROTOCOLS.essential_oils_general?.protocols || THERAPEUTIC_PROTOCOLS.essential_oils?.protocols || [];
    const oilsBlocks = groups.map(groupName => {
      const block = protocols.find(b => b.type?.toLowerCase().includes(groupName.toLowerCase()));
      return block;
    }).filter(Boolean);

    if (!oilsBlocks.length) return <Typography variant="body2">Nenhum óleo essencial específico encontrado para esse sintoma; veja fitoterapia acima para guia.</Typography>

    return oilsBlocks.map((block, i) => {
      const matched = groups.filter(g => block.type.toLowerCase().includes(g.toLowerCase()));
      return (
      <Box key={i} sx={{ mb: 2, bgcolor: '#fff', p: 2, borderRadius: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{block.type}</Typography>
        {matched.length > 0 && (
          <Typography variant="caption" color="text.secondary">Indicados para: {matched.join(', ')}</Typography>
        )}
        {/* Parse items into oil groupings */}
        {(() => {
          const groups = [];
          let current = null;
          block.items.forEach(line => {
            if (!line || !line.trim()) return;
            if (line.trim().startsWith('🌿') || line.trim().startsWith('🧠') || line.trim().startsWith('💪') || line.trim().startsWith('🌱')) {
              if (current) groups.push(current);
              current = { oil: line.split(' - ')[0].trim(), details: [line.split(' - ')[1] ? line.split(' - ')[1].trim() : ''] };
            } else if (current) {
              current.details.push(line.trim());
            }
          });
          if (current) groups.push(current);

          return groups.map((g, gi) => (
            <Box key={gi} sx={{ mb: 1, borderRadius: 1, p: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{g.oil}</Typography>
              <List dense>
                {g.details.map((d, di) => (
                  <ListItem key={di}><ListItemText primary={d} /></ListItem>
                ))}
              </List>
            </Box>
          ));
        })()}
      </Box>
    );
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#d32f2f';
      case 'high': return '#f57c00';
      case 'moderate': return '#fbc02d';
      default: return '#689f38';
    }
  };

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'critical': return 'CRÍTICO';
      case 'high': return 'GRAVE';
      case 'moderate': return 'MODERADO';
      default: return 'LEVE';
    }
  };

  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const normalizePhytoResults = () => {
    return searchResults
      .filter((result) => result.phytoProtocol || PHYTOTHERAPY_EMERGENCY[result.key])
      .map((result) => {
        const sourceProtocol = result.phytoProtocol || PHYTOTHERAPY_EMERGENCY[result.key];
        const category = result.phytoProtocol?.category || 'Protocolo de Emergencia';
        const indications = result.phytoProtocol?.indications || result.possibleConditions || [];
        const warning = PHYTOTHERAPY_EMERGENCY[result.key]?.warning || null;
        return {
          key: result.key,
          category,
          symptomSpecific: result.symptomSpecific || '',
          indications,
          protocol: sourceProtocol?.protocol || [],
          warning,
        };
      });
  };

  const hasGeneratedPhytoProtocols = normalizePhytoResults().length > 0;

  const buildPhytoPrescriptionBodyHtml = () => {
    const protocols = normalizePhytoResults();
    if (protocols.length === 0) {
      return '<p>Nenhum protocolo fitoterapico disponivel para impressao.</p>';
    }

    const generatedAt = new Date().toLocaleString('pt-BR');

    const protocolSections = protocols.map((item, index) => {
      const indicationHtml = item.indications.length > 0
        ? `<ul style="margin:6px 0 0 18px;">${item.indications.map((ind) => `<li>${escapeHtml(ind)}</li>`).join('')}</ul>`
        : '<p style="margin:6px 0 0 0;">Sem indicacoes adicionais.</p>';

      const plantCards = item.protocol.map((plant, plantIndex) => {
        const contraindications = Array.isArray(plant.contraindications) && plant.contraindications.length > 0
          ? `<div style="margin-top:8px;"><strong>Contraindicacoes:</strong><ul style="margin:4px 0 0 18px;">${plant.contraindications.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul></div>`
          : '';

        const interactions = Array.isArray(plant.interactions) && plant.interactions.length > 0
          ? `<div style="margin-top:8px;"><strong>Interacoes:</strong><ul style="margin:4px 0 0 18px;">${plant.interactions.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}</ul></div>`
          : '';

        const note = plant.note
          ? `<div style="margin-top:8px;"><strong>Nota:</strong> ${escapeHtml(plant.note)}</div>`
          : '';

        return `
          <div style="border:1px solid #c8e6c9;border-radius:8px;padding:12px;margin-top:10px;background:#fff;">
            <div style="font-size:15px;font-weight:700;color:#2e7d32;">${plantIndex + 1}. ${escapeHtml(plant.plant || 'Fitoterapico')}</div>
            <div style="margin-top:4px;font-style:italic;color:#455a64;">${escapeHtml(plant.scientificName || '')}</div>
            <div style="margin-top:8px;"><strong>Dosagem:</strong> ${escapeHtml(plant.dosage || '-')}</div>
            <div style="margin-top:6px;"><strong>Posologia:</strong> ${escapeHtml(plant.posology || '-')}</div>
            <div style="margin-top:6px;"><strong>Duracao:</strong> ${escapeHtml(plant.duration || '-')}</div>
            <div style="margin-top:6px;"><strong>Propriedades:</strong> ${escapeHtml(plant.properties || '-')}</div>
            ${contraindications}
            ${interactions}
            ${note}
          </div>
        `;
      }).join('');

      const symptomHtml = item.symptomSpecific
        ? `<div style="margin-top:6px;color:#546e7a;"><strong>Sintoma descrito:</strong> ${escapeHtml(item.symptomSpecific)}</div>`
        : '';

      const warningHtml = item.warning
        ? `<div style="margin-top:10px;padding:10px;border:1px solid #ffcc80;background:#fff8e1;border-radius:6px;"><strong>Alerta clinico:</strong> ${escapeHtml(item.warning)}</div>`
        : '';

      return `
        <section style="margin-top:${index === 0 ? '0' : '20px'};page-break-inside:avoid;">
          <div style="background:#e8f5e9;border-left:4px solid #43a047;padding:10px 12px;border-radius:4px;">
            <div style="font-size:16px;font-weight:700;color:#1b5e20;">${escapeHtml(item.key)}</div>
            <div style="font-size:13px;color:#2e7d32;"><strong>Categoria:</strong> ${escapeHtml(item.category)}</div>
            ${symptomHtml}
          </div>
          <div style="margin-top:10px;"><strong>Indicacoes terapeuticas:</strong>${indicationHtml}</div>
          <div style="margin-top:10px;">${plantCards}</div>
          ${warningHtml}
        </section>
      `;
    }).join('');

    return `
      <div style="font-family:Arial,sans-serif;color:#263238;">
        <div style="margin-bottom:14px;border-bottom:2px solid #2e7d32;padding-bottom:8px;">
          <div style="font-size:20px;font-weight:700;color:#1b5e20;">Sugestões Terapêuticas Fitoterápicas</div>
          <div style="font-size:13px;color:#546e7a;">Protocolos gerados no modulo de Emergencias e Fitoterapia</div>
          <div style="font-size:12px;color:#607d8b;margin-top:4px;">Gerado em: ${escapeHtml(generatedAt)}</div>
        </div>
        ${protocolSections}
        <div style="margin-top:20px;padding:10px;border:1px solid #ef9a9a;background:#ffebee;border-radius:6px;">
          <strong>Importante:</strong> Em situacoes graves, acione imediatamente o SAMU (192). Este receituario e complementar e nao substitui conduta medica de emergencia.
        </div>
      </div>
    `;
  };

  const handlePrintPhytoProtocols = async () => {
    try {
      const bodyHtml = buildPhytoPrescriptionBodyHtml();
      const qrUrl = await generateQrDataUrl(`Sugestoes terapeuticas fitoterapicas - ${new Date().toISOString()}`);
      const html = await buildLetterheadHtml({
        title: 'Sugestoes Terapeuticas Fitoterapicas',
        bodyHtml,
        qrUrl,
      });
      openPrintWindow(html, true);
    } catch (error) {
      console.error('Erro ao preparar impressao de protocolos fitoterapicos:', error);
      alert('Nao foi possivel abrir a impressao dos protocolos.');
    }
  };

  const handleDownloadPhytoProtocolsPdf = async () => {
    try {
      const bodyHtml = buildPhytoPrescriptionBodyHtml();
      const qrUrl = await generateQrDataUrl(`Sugestoes terapeuticas fitoterapicas - ${new Date().toISOString()}`);
      const html = await buildLetterheadHtml({
        title: 'Sugestoes Terapeuticas Fitoterapicas',
        bodyHtml,
        qrUrl,
      });
      const fileName = `sugestoes_terapeuticas_fitoterapicas_${new Date().toISOString().split('T')[0]}.pdf`;
      await downloadPdfFromHtml(html, fileName);
    } catch (error) {
      console.error('Erro ao baixar PDF de protocolos fitoterapicos:', error);
      alert('Nao foi possivel baixar o PDF dos protocolos fitoterapicos.');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <EmergencyIcon sx={{ fontSize: 48, color: '#d32f2f' }} />
          <Box>
            <Typography variant="h4" sx={{ color: '#d32f2f', fontWeight: 600 }}>
              🚨 Emergências & 🌿 Fitoterapia
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Orientações de emergência médica + Protocolos completos de tratamentos naturais com fitoterapia
            </Typography>
          </Box>
        </Box>

        {/* Alerta importante */}
        <Alert severity="error" sx={{ mb: 3 }}>
          <Typography variant="body2" gutterBottom>
            <strong>⚠️ ATENÇÃO:</strong> Este é um guia informativo de primeiros socorros. 
            Em caso de emergência real, sempre <strong>LIGUE 192 (SAMU)</strong> primeiro!
          </Typography>
          <Typography variant="body2">
            Esta ferramenta NÃO substitui atendimento/assistência por profissional de saúde.
          </Typography>
        </Alert>

        {/* Números de Emergência */}
        <Card sx={{ mb: 3, bgcolor: '#ffebee' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: '#d32f2f', display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon /> Números de Emergência
            </Typography>
            <Grid container spacing={2}>
              {EMERGENCY_CONTACTS.map((contact, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={contact.number}
                      color="error"
                      sx={{ fontWeight: 700, fontSize: '1rem' }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {contact.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {contact.description}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Campo de busca */}
        <Card sx={{ mb: 3, bgcolor: '#fff8e1' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🔍 Buscar por sintoma, doença ou condição de saúde:
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Digite qualquer sintoma para receber orientações de emergência E protocolos completos de fitoterapia
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Ex: ansiedade, gastrite, enxaqueca, pressão alta, insônia, diabetes, dor, acne, etc..."
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Descreva com detalhes o sintoma (local, intensidade, início, fatores associados). Ex: 'dor aguda no peito há 2h, irradiando para braço esquerdo, sudorese'"
                value={symptomSpecific}
                onChange={(e) => setSymptomSpecific(e.target.value)}
                multiline
                rows={2}
                variant="outlined"
                helperText='Seja específico: local / tempo de início / intensidade / sinais acompanhantes'
              />
              <Button
                variant="contained"
                color="error"
                startIcon={isSearching ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                onClick={handleSearch}
                disabled={isSearching || !symptomInput.trim()}
                sx={{ minWidth: 120 }}
              >
                Buscar
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Resultados */}
                {searchResults.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: '#d32f2f', mb: 2 }}>
              Orientações Encontradas ({searchResults.length})
            </Typography>

                    {hasGeneratedPhytoProtocols && (
                      <Box sx={{ mb: 2, p: 2, border: '1px solid #a5d6a7', borderRadius: 2, backgroundColor: '#f1f8e9', display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                        <Typography variant="body2" sx={{ flexBasis: '100%', color: '#2e7d32', fontWeight: 600 }}>
                          Sugestões Terapêuticas Fitoterápicas (todos os protocolos gerados)
                        </Typography>
                        <Button
                          variant="outlined"
                          color="success"
                          startIcon={<PrintIcon />}
                          onClick={handlePrintPhytoProtocols}
                        >
                          Imprimir Sugestões Terapêuticas
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<DownloadIcon />}
                          onClick={handleDownloadPhytoProtocolsPdf}
                        >
                          Download PDF
                        </Button>
                      </Box>
                    )}

            {searchResults.map((result, index) => (
              <Card key={index} sx={{ mb: 3, border: `3px solid ${getSeverityColor(result.severity)}` }}>
                <CardContent>
                  {/* Cabeçalho */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
                        {result.key}
                      </Typography>
                      {result.symptomSpecific && (
                        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: 'text.secondary' }}>
                          Sintoma descrito: {result.symptomSpecific}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={getSeverityLabel(result.severity)}
                      sx={{
                        bgcolor: getSeverityColor(result.severity),
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    />
                  </Box>

                  {/* Janela terapêutica */}
                  {result.timeWindow && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ⏱️ {result.timeWindow}
                      </Typography>
                    </Alert>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Possíveis condições */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                      🔍 Possíveis Condições:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {result.possibleConditions.map((cond, i) => (
                        <Chip key={i} label={cond} variant="outlined" />
                      ))}
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Ações imediatas */}
                  <Box sx={{ mb: 2, bgcolor: '#fff3e0', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#f57c00' }}>
                      ⚡ AÇÕES IMEDIATAS:
                    </Typography>
                    <List dense>
                      {result.immediateActions.map((action, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <CheckIcon color="warning" />
                          </ListItemIcon>
                          <ListItemText
                            primary={action}
                            primaryTypographyProps={{
                              fontWeight: action.includes('CHAMAR') || action.includes('NÃO') ? 700 : 400,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Sinais de alerta */}
                  <Box sx={{ mb: 2, bgcolor: '#ffebee', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#d32f2f' }}>
                      🚩 SINAIS DE ALERTA (Red Flags):
                    </Typography>
                    <List dense>
                      {result.redFlags.map((flag, i) => (
                        <ListItem key={i}>
                          <ListItemIcon>
                            <WarningIcon color="error" />
                          </ListItemIcon>
                          <ListItemText primary={flag} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* Teste FAST para AVC */}
                  {result.testFAST && (
                    <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                        🧪 Teste FAST (AVC):
                      </Typography>
                      {Object.entries(result.testFAST).map(([key, value], i) => (
                        <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                          <strong>{key}:</strong> {value}
                        </Typography>
                      ))}
                    </Box>
                  )}

                  {/* Protocolos Fitoterápicos COMPLETOS */}
                  {(result.source === 'phytotherapy' || result.phytoProtocol || PHYTOTHERAPY_EMERGENCY[result.key]) && (
                    <Box sx={{ mt: 3 }}>
                      <Divider sx={{ my: 2 }} />
                      
                      {result.source !== 'phytotherapy' && PHYTOTHERAPY_EMERGENCY[result.key]?.warning && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            ⚠️ {PHYTOTHERAPY_EMERGENCY[result.key].warning}
                          </Typography>
                        </Alert>
                      )}

                      <Box sx={{ bgcolor: '#e8f5e9', p: 3, borderRadius: 2 }}>
                        <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                          🌿 Protocolos Fitoterápicos Completos
                        </Typography>

                        {/* Se é resultado direto de fitoterapia */}
                        {result.phytoProtocol && ( <>
                          <Box>
                            <Chip 
                              label={result.phytoProtocol.category} 
                              sx={{ bgcolor: '#4caf50', color: '#fff', mb: 2 }}
                            />
                            {result.symptomSpecific && (
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                Sintoma declarado: {result.symptomSpecific}
                              </Typography>
                            )}
                            
                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                              📋 Indicações:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                              {result.phytoProtocol.indications.map((ind, i) => (
                                <Chip key={i} label={ind} variant="outlined" color="success" />
                              ))}
                            </Box>

                            {result.phytoProtocol.protocol.map((plant, pIndex) => (
                              <Card key={pIndex} sx={{ mb: 2, border: '3px solid #4caf50', boxShadow: 3 }}>
                                <CardContent>
                                  <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1, fontWeight: 600 }}>
                                    {pIndex + 1}. {plant.plant}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>
                                    <strong>Nome Científico:</strong> {plant.scientificName}
                                  </Typography>

                                  <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                      <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, mb: 2 }}>
                                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                                          <strong>💊 Dosagem:</strong><br />
                                          {plant.dosage}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mb: 1.5 }}>
                                          <strong>📋 Posologia:</strong><br />
                                          {plant.posology}
                                        </Typography>
                                        <Typography variant="body2">
                                          <strong>⏱️ Duração:</strong><br />
                                          {plant.duration}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                      <Box sx={{ bgcolor: '#fff', p: 2, borderRadius: 1, mb: 2 }}>
                                        <Typography variant="body2">
                                          <strong>✨ Propriedades:</strong><br />
                                          {plant.properties}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                  </Grid>

                                  {/* Contraindicações */}
                                  {plant.contraindications && plant.contraindications.length > 0 && (
                                    <Alert severity="error" sx={{ mt: 2 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                        ⛔ Contraindicações:
                                      </Typography>
                                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        {plant.contraindications.map((contra, i) => (
                                          <li key={i}>
                                            <Typography variant="body2">{contra}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    </Alert>
                                  )}

                                  {/* Interações */}
                                  {plant.interactions && plant.interactions.length > 0 && (
                                    <Alert severity="warning" sx={{ mt: 2 }}>
                                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                        🔄 Interações Medicamentosas:
                                      </Typography>
                                      <ul style={{ margin: 0, paddingLeft: 20 }}>
                                        {plant.interactions.map((inter, i) => (
                                          <li key={i}>
                                            <Typography variant="body2">{inter}</Typography>
                                          </li>
                                        ))}
                                      </ul>
                                    </Alert>
                                  )}

                                  {plant.note && (
                                    <Alert
                                      severity={plant.note.includes('⚠️') ? 'warning' : 'success'}
                                      sx={{ mt: 2 }}
                                    >
                                      <Typography variant="body2">{plant.note}</Typography>
                                    </Alert>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </Box>
                          
                          <Box sx={{ mt: 2 }}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>🌿 Aromaterapia / Óleos essenciais</Typography>
                            {getOilsBlocks(result)}
                          </Box>
                        </> )}

                        {/* Se é protocolo de emergência */}
                        {!result.phytoProtocol && PHYTOTHERAPY_EMERGENCY[result.key] && (
                          <>
                            {PHYTOTHERAPY_EMERGENCY[result.key].protocol.map((plant, pIndex) => (
                              <Card key={pIndex} sx={{ mb: 2, border: '2px solid #4caf50' }}>
                                <CardContent>
                                  <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1 }}>
                                    {pIndex + 1}. {plant.plant}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block', mb: 2 }}>
                                    {plant.scientificName}
                                  </Typography>

                                  <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                      <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>💊 Dosagem:</strong> {plant.dosage}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>📋 Posologia:</strong> {plant.posology}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                      <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>⏱️ Duração:</strong> {plant.duration}
                                      </Typography>
                                      <Typography variant="body2" sx={{ mb: 1 }}>
                                        <strong>✨ Propriedades:</strong> {plant.properties}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  {plant.note && (
                                    <Alert
                                      severity={plant.note.includes('⚠️') ? 'warning' : 'success'}
                                      sx={{ mt: 2 }}
                                    >
                                      <Typography variant="body2">{plant.note}</Typography>
                                    </Alert>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </>
                        )}

                        <Alert severity="warning" sx={{ mt: 3 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            <strong>⚠️ IMPORTANTE:</strong> Estes protocolos são baseados em evidências científicas e uso tradicional.
                            Consulte um profissional habilitado antes de iniciar. Fitoterapia é complementar - 
                            em emergências médicas graves, sempre priorize chamar 192 (SAMU).
                          </Typography>
                        </Alert>
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {searchResults.length === 0 && symptomInput && !isSearching && (
          <Alert severity="info">
            <Typography variant="body2">
              Nenhuma orientação específica encontrada. Em caso de dúvida, <strong>LIGUE 192 (SAMU)</strong>.
            </Typography>
          </Alert>
        )}

        {/* Informações gerais */}
        <Card sx={{ mt: 3, bgcolor: '#e8f5e9' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <InfoIcon color="success" /> Informações Importantes
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="✓ Mantenha a calma e avalie a situação rapidamente" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✓ Se a situação é grave ou há dúvida: LIGUE 192" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✓ Nunca dê medicamentos sem orientação médica" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✓ Não movimente vítimas de trauma até avaliação profissional" />
              </ListItem>
              <ListItem>
                <ListItemText primary="✓ Anote horário do início dos sintomas (importante para tratamento)" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Botão voltar */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
          >
            Voltar para Interagentes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
