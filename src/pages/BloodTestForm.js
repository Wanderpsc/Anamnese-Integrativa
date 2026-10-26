import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import { safeSetItem } from '../lib/localStorageSafe';
import ScrollToTop from '../components/ScrollToTop';

const BloodTestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');

  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    testDate: new Date().toISOString().split('T')[0],
    laboratory: '',
    requestingDoctor: '',
    
    // HEMOGRAMA COMPLETO
    // Eritrograma
    hemoglobin: '',
    hematocrit: '',
    redBloodCells: '',
    mcv: '', // VCM - Volume Corpuscular Médio
    mch: '', // HCM - Hemoglobina Corpuscular Média
    mchc: '', // CHCM - Concentração de Hemoglobina Corpuscular Média
    rdw: '', // RDW - Amplitude de Distribuição dos Eritrócitos
    
    // Leucograma
    leukocytes: '',
    neutrophils: '',
    lymphocytes: '',
    monocytes: '',
    eosinophils: '',
    basophils: '',
    
    // Plaquetas
    platelets: '',
    mpv: '', // MPV - Volume Plaquetário Médio
    
    // BIOQUÍMICA
    glucose: '',
    glycatedHemoglobin: '', // HbA1c
    totalCholesterol: '',
    hdl: '',
    ldl: '',
    vldl: '',
    triglycerides: '',
    urea: '',
    creatinine: '',
    uricAcid: '',
    
    // ENZIMAS HEPÁTICAS
    ast: '', // TGO
    alt: '', // TGP
    ggt: '',
    alkalinePhosphatase: '',
    totalBilirubin: '',
    directBilirubin: '',
    indirectBilirubin: '',
    albumin: '',
    totalProteins: '',
    globulin: '',
    
    // ELETRÓLITOS
    sodium: '',
    potassium: '',
    calcium: '',
    phosphorus: '',
    magnesium: '',
    chloride: '',
    
    // HORMÔNIOS TIREOIDIANOS
    tsh: '',
    t3: '',
    t4: '',
    freeT4: '',
    
    // HORMÔNIOS REPRODUTIVOS
    testosterone: '',
    estradiol: '',
    progesterone: '',
    fsh: '',
    lh: '',
    prolactin: '',
    
    // VITAMINAS
    vitaminD: '',
    vitaminB12: '',
    folicAcid: '',
    
    // MINERAIS
    iron: '',
    ferritin: '',
    transferrin: '',
    transferrinSaturation: '',
    
    // MARCADORES INFLAMATÓRIOS
    crp: '', // Proteína C-Reativa
    esr: '', // VHS - Velocidade de Hemossedimentação
    
    // MARCADORES CARDÍACOS
    cpk: '',
    ckmb: '',
    troponin: '',
    ldh: '',
    
    // COAGULAÇÃO
    pt: '', // Tempo de Protrombina
    inr: '',
    aptt: '', // Tempo de Tromboplastina Parcial Ativada
    
    // OUTROS
    amylase: '',
    lipase: '',
    bnp: '', // Peptídeo Natriurético Cerebral
    psa: '', // Antígeno Prostático Específico
    
    // Observações por categoria
    hemogramObservations: '',
    hemogramCauses: '',
    hemogramProtocols: '',
    
    biochemistryObservations: '',
    biochemistryCauses: '',
    biochemistryProtocols: '',
    
    liverObservations: '',
    liverCauses: '',
    liverProtocols: '',
    
    electrolytesObservations: '',
    electrolytesCauses: '',
    electrolytesProtocols: '',
    
    hormonesObservations: '',
    hormonesCauses: '',
    hormonesProtocols: '',
    
    vitaminsObservations: '',
    vitaminsCauses: '',
    vitaminsProtocols: '',
    
    inflammatoryObservations: '',
    inflammatoryCauses: '',
    inflammatoryProtocols: '',
    
    coagulationObservations: '',
    coagulationCauses: '',
    coagulationProtocols: '',
    
    othersObservations: '',
    othersCauses: '',
    othersProtocols: '',
    
    // Observações Gerais
    observations: '',
  });

  // Valores de referência
  const referenceValues = {
    hemoglobin: 'H: 13.5-17.5 g/dL | M: 12.0-15.5 g/dL',
    hematocrit: 'H: 40-52% | M: 36-48%',
    redBloodCells: 'H: 4.5-6.5 milhões/mm³ | M: 4.0-5.5 milhões/mm³',
    mcv: '80-100 fL',
    mch: '27-33 pg',
    mchc: '32-36 g/dL',
    rdw: '11.5-14.5%',
    leukocytes: '4.000-11.000/mm³',
    neutrophils: '40-75% ou 1.800-7.700/mm³',
    lymphocytes: '20-50% ou 900-2.900/mm³',
    monocytes: '2-10% ou 300-900/mm³',
    eosinophils: '1-6% ou 50-500/mm³',
    basophils: '0-2% ou 0-200/mm³',
    platelets: '150.000-450.000/mm³',
    mpv: '7.5-11.5 fL',
    glucose: '70-99 mg/dL (jejum)',
    glycatedHemoglobin: 'Até 5.6% (normal) | 5.7-6.4% (pré-diabetes) | ≥6.5% (diabetes)',
    totalCholesterol: 'Desejável: <200 mg/dL',
    hdl: 'H: >40 mg/dL | M: >50 mg/dL',
    ldl: 'Ótimo: <100 mg/dL',
    vldl: '<30 mg/dL',
    triglycerides: '<150 mg/dL',
    urea: '10-50 mg/dL',
    creatinine: 'H: 0.7-1.3 mg/dL | M: 0.6-1.1 mg/dL',
    uricAcid: 'H: 3.4-7.0 mg/dL | M: 2.4-6.0 mg/dL',
    ast: '5-40 U/L',
    alt: '7-56 U/L',
    ggt: 'H: 8-61 U/L | M: 5-36 U/L',
    alkalinePhosphatase: '40-130 U/L',
    totalBilirubin: '0.2-1.2 mg/dL',
    directBilirubin: '0.0-0.3 mg/dL',
    indirectBilirubin: '0.2-0.8 mg/dL',
    albumin: '3.5-5.5 g/dL',
    totalProteins: '6.0-8.3 g/dL',
    globulin: '2.3-3.5 g/dL',
    sodium: '135-145 mEq/L',
    potassium: '3.5-5.0 mEq/L',
    calcium: '8.5-10.5 mg/dL',
    phosphorus: '2.5-4.5 mg/dL',
    magnesium: '1.7-2.2 mg/dL',
    chloride: '98-107 mEq/L',
    tsh: '0.4-4.0 mUI/L',
    t3: '80-180 ng/dL',
    t4: '5.0-12.0 μg/dL',
    freeT4: '0.8-1.8 ng/dL',
    testosterone: 'H: 300-1000 ng/dL | M: 15-70 ng/dL',
    estradiol: 'Varia conforme fase do ciclo',
    progesterone: 'Varia conforme fase do ciclo',
    fsh: 'Varia conforme idade e sexo',
    lh: 'Varia conforme idade e sexo',
    prolactin: 'H: 4-23 ng/mL | M: 4-30 ng/mL',
    vitaminD: '30-100 ng/mL',
    vitaminB12: '200-900 pg/mL',
    folicAcid: '2.7-17.0 ng/mL',
    iron: 'H: 65-175 μg/dL | M: 50-170 μg/dL',
    ferritin: 'H: 20-250 ng/mL | M: 10-120 ng/mL',
    transferrin: '200-360 mg/dL',
    transferrinSaturation: '20-50%',
    crp: '<5 mg/L',
    esr: 'H: <15 mm/h | M: <20 mm/h',
    cpk: 'H: 38-174 U/L | M: 26-140 U/L',
    ckmb: '<25 U/L',
    troponin: '<0.04 ng/mL',
    ldh: '120-246 U/L',
    pt: '11-13.5 segundos',
    inr: '0.8-1.2',
    aptt: '25-35 segundos',
    amylase: '30-110 U/L',
    lipase: '10-140 U/L',
    bnp: '<100 pg/mL',
    psa: 'H <50 anos: <2.5 ng/mL | H >50 anos: <4.0 ng/mL',
  };

  useEffect(() => {
    loadPatients();
    if (id) {
      loadExistingTest(id);
    }
  }, [id]);

  const loadPatients = () => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const uniquePatients = [];
    const seen = new Set();
    
    anamneses.forEach(a => {
      if (a.q01_nome && !seen.has(a.q01_nome)) {
        seen.add(a.q01_nome);
        uniquePatients.push({
          id: a.id,
          name: a.q01_nome,
          birthDate: a.q02_data_nasc,
        });
      }
    });
    
    setPatients(uniquePatients);
  };

  const loadExistingTest = (testId) => {
    const tests = JSON.parse(localStorage.getItem('bloodTests') || '[]');
    const test = tests.find(t => t.id === testId);
    if (test) {
      setFormData(test);
      setSelectedPatient(test.patientId);
    }
  };

  const handlePatientChange = (patientId) => {
    setSelectedPatient(patientId);
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
      setFormData(prev => ({
        ...prev,
        patientId: patient.id,
        patientName: patient.name,
      }));
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Se o campo é um resultado de exame (numérico), analisar automaticamente
      if (value && !isNaN(value) && !field.includes('_obs') && !field.includes('_causes') && !field.includes('_treatment')) {
        const analysis = analyzeResult(field, parseFloat(value));
        if (analysis) {
          newData[`${field}_causes`] = analysis.causes;
          newData[`${field}_treatment`] = analysis.treatment;
        }
      }
      
      return newData;
    });
  };

  const analyzeResult = (field, value) => {
    const analyses = {
      hemoglobin: (v) => {
        if (v < 12) return {
          causes: 'Anemia (ferropriva, megaloblástica, hemolítica), sangramento crônico, deficiência nutricional, doença crônica',
          treatment: 'Sulfato ferroso 300mg/dia, vitamina B12, ácido fólico, investigar causa base (endoscopia se necessário), dieta rica em ferro (carnes vermelhas, feijão, vegetais verde-escuros)'
        };
        if (v > 17.5) return {
          causes: 'Policitemia vera, desidratação, doença pulmonar crônica, tabagismo, altitude elevada',
          treatment: 'Hidratação adequada, investigar policitemia, suspender tabagismo, monitorar saturação de O2'
        };
        return null;
      },
      hematocrit: (v) => {
        if (v < 36) return {
          causes: 'Anemia, hemorragia, hiper-hidratação, deficiências nutricionais',
          treatment: 'Reposição de ferro, vitaminas, investigação de sangramentos, adequação hídrica'
        };
        if (v > 52) return {
          causes: 'Policitemia, desidratação, DPOC, insuficiência cardíaca',
          treatment: 'Hidratação, oxigenoterapia se necessário, tratamento da causa base'
        };
        return null;
      },
      glucose: (v) => {
        if (v < 70) return {
          causes: 'Hipoglicemia (jejum prolongado, insulina excessiva, tumores pancreáticos, insuficiência hepática)',
          treatment: 'Carboidratos de absorção rápida imediata, ajuste de insulina/hipoglicemiantes, refeições regulares, investigar causa'
        };
        if (v >= 100 && v < 126) return {
          causes: 'Pré-diabetes, resistência insulínica, síndrome metabólica, obesidade',
          treatment: 'Dieta hipoglicêmica, exercícios físicos regulares, perda de peso, controle de carboidratos, metformina se indicado'
        };
        if (v >= 126) return {
          causes: 'Diabetes mellitus tipo 1 ou 2, diabetes gestacional, pancreatite crônica, uso de corticoides',
          treatment: 'Dieta para diabéticos, exercícios, metformina, insulina conforme necessário, monitoramento glicêmico, HbA1c trimestral'
        };
        return null;
      },
      totalCholesterol: (v) => {
        if (v > 200) return {
          causes: 'Dislipidemia, dieta rica em gorduras saturadas, obesidade, hipotireoidismo, síndrome metabólica, genética',
          treatment: 'Estatinas (sinvastatina 20-40mg/dia), dieta mediterrânea, redução de gorduras saturadas, exercícios aeróbicos, ômega-3'
        };
        return null;
      },
      ldl: (v) => {
        if (v > 100) return {
          causes: 'Dieta inadequada, sedentarismo, obesidade, diabetes, hipotireoidismo, fatores genéticos',
          treatment: 'Estatinas (atorvastatina 10-20mg), dieta DASH, redução de gorduras trans, fibras solúveis (aveia, linhaça), exercícios'
        };
        return null;
      },
      hdl: (v) => {
        if (v < 40) return {
          causes: 'Sedentarismo, tabagismo, obesidade, diabetes, síndrome metabólica, dieta pobre em gorduras boas',
          treatment: 'Exercícios aeróbicos regulares, ômega-3, azeite de oliva, oleaginosas (nozes, castanhas), parar de fumar'
        };
        return null;
      },
      triglycerides: (v) => {
        if (v > 150) return {
          causes: 'Dieta rica em açúcares e carboidratos refinados, álcool, obesidade, diabetes, síndrome metabólica',
          treatment: 'Redução de carboidratos simples, suspensão de álcool, ômega-3 (1-2g/dia), fibratos se >500mg/dL, exercícios'
        };
        return null;
      },
      urea: (v) => {
        if (v < 10) return {
          causes: 'Desnutrição proteica, doença hepática grave, hiper-hidratação',
          treatment: 'Dieta hiperproteica, avaliação hepática, ajuste hídrico'
        };
        if (v > 50) return {
          causes: 'Insuficiência renal, desidratação, dieta hiperproteica, catabolismo aumentado, sangramento digestivo',
          treatment: 'Hidratação, dieta hipoproteica, investigar função renal (creatinina, clearance), tratar causa base'
        };
        return null;
      },
      creatinine: (v) => {
        if (v > 1.3) return {
          causes: 'Insuficiência renal crônica ou aguda, desidratação, obstrução urinária, rabdomiólise, medicamentos nefrotóxicos',
          treatment: 'Hidratação, suspender nefrotóxicos (AINEs), dieta hipoproteica, controle pressórico, investigar com ultrassom renal'
        };
        return null;
      },
      uricAcid: (v) => {
        if (v > 7.0) return {
          causes: 'Gota, hiperuricemia, dieta rica em purinas (carnes vermelhas, frutos do mar), álcool, insuficiência renal',
          treatment: 'Alopurinol 300mg/dia, colchicina na crise aguda, redução de purinas, aumento de hidratação, evitar álcool'
        };
        return null;
      },
      ast: (v) => {
        if (v > 40) return {
          causes: 'Hepatite (viral, alcoólica, medicamentosa), esteatose hepática, cirrose, lesão muscular, infarto',
          treatment: 'Suspender álcool e hepatotóxicos, hepatoprotetores (silimarina), investigar com ultrassom/sorologias, dieta hipogordurosa'
        };
        return null;
      },
      alt: (v) => {
        if (v > 56) return {
          causes: 'Hepatite viral ou medicamentosa, esteatose hepática não alcoólica (NASH), cirrose, obesidade',
          treatment: 'Perda de peso, dieta hipogordurosa, suspender álcool, silimarina 140mg 3x/dia, investigar hepatites B e C'
        };
        return null;
      },
      tsh: (v) => {
        if (v < 0.4) return {
          causes: 'Hipertireoidismo (Doença de Graves, bócio tóxico), tireoidite, excesso de levotiroxina',
          treatment: 'Metimazol ou propiltiouracil, reduzir dose de levotiroxina se em uso, betabloqueador para sintomas, encaminhar endócrino'
        };
        if (v > 4.0) return {
          causes: 'Hipotireoidismo primário (Tireoidite de Hashimoto), deficiência de iodo, pós-tireoidectomia',
          treatment: 'Levotiroxina 25-50mcg/dia em jejum, ajustar dose conforme TSH, suplementar iodo e selênio, reavaliar em 6-8 semanas'
        };
        return null;
      },
      vitaminD: (v) => {
        if (v < 30) return {
          causes: 'Baixa exposição solar, dieta pobre em vitamina D, má absorção intestinal, obesidade, insuficiência renal',
          treatment: 'Vitamina D3 10.000 UI/dia por 2 meses, depois 2.000 UI/dia manutenção, exposição solar 15-20min/dia, alimentos fortificados'
        };
        return null;
      },
      vitaminB12: (v) => {
        if (v < 200) return {
          causes: 'Anemia perniciosa, vegetarianismo/veganismo, gastrectomia, má absorção intestinal, uso de metformina',
          treatment: 'Cianocobalamina 1000mcg IM semanal por 4 semanas, depois mensal, ou sublingual 1000mcg/dia, investigar causa'
        };
        return null;
      },
      iron: (v) => {
        if (v < 50) return {
          causes: 'Anemia ferropriva, sangramento crônico, má absorção, dieta pobre em ferro, menstruação abundante',
          treatment: 'Sulfato ferroso 300mg/dia em jejum com vitamina C, investigar sangramentos (endoscopia/colonoscopia), dieta rica em ferro'
        };
        return null;
      },
      ferritin: (v) => {
        if (v < 10) return {
          causes: 'Deficiência de ferro severa, anemia ferropriva, sangramento crônico oculto',
          treatment: 'Ferro parenteral (Noripurum 200mg IV), sulfato ferroso 300mg 3x/dia, investigação gastrointestinal obrigatória'
        };
        if (v > 250) return {
          causes: 'Hemocromatose, inflamação crônica, hepatopatia, síndrome metabólica, excesso de suplementação',
          treatment: 'Suspender suplementação de ferro, flebotomia se hemocromatose, tratar inflamação/hepatopatia base'
        };
        return null;
      },
      sodium: (v) => {
        if (v < 135) return {
          causes: 'Hiponatremia (hiper-hidratação, SIADH, insuficiência cardíaca, diuréticos, diarreia/vômitos)',
          treatment: 'Restrição hídrica, reposição de sódio oral/EV se <120, suspender diuréticos, investigar causa, correção lenta'
        };
        if (v > 145) return {
          causes: 'Hipernatremia (desidratação, diabetes insipidus, baixa ingesta hídrica, perdas renais)',
          treatment: 'Hidratação oral ou EV (soro glicosado 5%), correção lenta, investigar diabetes insipidus se persistente'
        };
        return null;
      },
      potassium: (v) => {
        if (v < 3.5) return {
          causes: 'Hipocalemia (diuréticos, diarreia/vômitos, desnutrição, alcalose, uso de insulina)',
          treatment: 'Reposição de potássio oral (cloreto de potássio 600mg 3-4x/dia), dieta rica em K (banana, laranja), ajustar diuréticos'
        };
        if (v > 5.0) return {
          causes: 'Hipercalemia (insuficiência renal, uso de IECA/BRA, espironolactona, acidose, hemólise)',
          treatment: 'URGÊNCIA se >6.0: gluconato de cálcio EV, insulina+glicose, suspender IECA/espironolactona, dieta pobre em K'
        };
        return null;
      },
      crp: (v) => {
        if (v > 5) return {
          causes: 'Processo inflamatório/infeccioso agudo, doenças autoimunes, trauma, pós-operatório, obesidade',
          treatment: 'Tratar infecção/inflamação base, anti-inflamatórios se indicado, investigar com hemograma e VHS'
        };
        return null;
      },
      platelets: (v) => {
        if (v < 150000) return {
          causes: 'Plaquetopenia (púrpura trombocitopênica, dengue, anemia aplásica, quimioterapia, hiperesplenismo)',
          treatment: 'Se <50.000: corticoide, imunoglobulina, transfusão se sangramento, investigar causa com mielograma'
        };
        if (v > 450000) return {
          causes: 'Trombocitose (reacional a inflamação/infecção, pós-esplenectomia, síndrome mieloproliferativa)',
          treatment: 'AAS 100mg/dia se >600.000, investigar com JAK2, tratar causa base, hidroxiureia se primária'
        };
        return null;
      }
    };

    return analyses[field] ? analyses[field](value) : null;
  };

  const handleSave = () => {
    if (!formData.patientName) {
      setSnackbar({
        open: true,
        message: 'Selecione um paciente!',
        severity: 'error'
      });
      return;
    }

    const tests = JSON.parse(localStorage.getItem('bloodTests') || '[]');
    
    if (id) {
      const index = tests.findIndex(t => t.id === id);
      if (index !== -1) {
        tests[index] = { ...formData, id, updatedAt: new Date().toISOString() };
      }
    } else {
      const newTest = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      tests.push(newTest);
    }
    
    if (!safeSetItem('bloodTests', tests)) {
      alert('Erro: armazenamento local está cheio. O exame pode não ter sido salvo corretamente.');
    }
    
    setSnackbar({
      open: true,
      message: 'Exame salvo com sucesso!',
      severity: 'success'
    });
    
    setTimeout(() => navigate('/blood-tests-list'), 1500);
  };

  const handleClear = () => {
    if (window.confirm('Deseja realmente limpar todos os campos?')) {
      setFormData({
        patientId: formData.patientId,
        patientName: formData.patientName,
        testDate: new Date().toISOString().split('T')[0],
        laboratory: '',
        requestingDoctor: '',
        hemoglobin: '', hematocrit: '', redBloodCells: '', mcv: '', mch: '', mchc: '', rdw: '',
        leukocytes: '', neutrophils: '', lymphocytes: '', monocytes: '', eosinophils: '', basophils: '',
        platelets: '', mpv: '',
        glucose: '', glycatedHemoglobin: '', totalCholesterol: '', hdl: '', ldl: '', vldl: '', triglycerides: '',
        urea: '', creatinine: '', uricAcid: '',
        ast: '', alt: '', ggt: '', alkalinePhosphatase: '', totalBilirubin: '', directBilirubin: '', indirectBilirubin: '',
        albumin: '', totalProteins: '', globulin: '',
        sodium: '', potassium: '', calcium: '', phosphorus: '', magnesium: '', chloride: '',
        tsh: '', t3: '', t4: '', freeT4: '',
        testosterone: '', estradiol: '', progesterone: '', fsh: '', lh: '', prolactin: '',
        vitaminD: '', vitaminB12: '', folicAcid: '',
        iron: '', ferritin: '', transferrin: '', transferrinSaturation: '',
        crp: '', esr: '',
        cpk: '', ckmb: '', troponin: '', ldh: '',
        pt: '', inr: '', aptt: '',
        amylase: '', lipase: '', bnp: '', psa: '',
        hemogramObservations: '', hemogramCauses: '', hemogramProtocols: '',
        biochemistryObservations: '', biochemistryCauses: '', biochemistryProtocols: '',
        liverObservations: '', liverCauses: '', liverProtocols: '',
        electrolytesObservations: '', electrolytesCauses: '', electrolytesProtocols: '',
        hormonesObservations: '', hormonesCauses: '', hormonesProtocols: '',
        vitaminsObservations: '', vitaminsCauses: '', vitaminsProtocols: '',
        inflammatoryObservations: '', inflammatoryCauses: '', inflammatoryProtocols: '',
        coagulationObservations: '', coagulationCauses: '', coagulationProtocols: '',
        othersObservations: '', othersCauses: '', othersProtocols: '',
        observations: '',
      });
    }
  };

  const renderField = (field, label, unit = '') => {
    const observationField = `${field}_obs`;
    const causesField = `${field}_causes`;
    const treatmentField = `${field}_treatment`;
    const hasValue = formData[field] && formData[field] !== '';
    
    return (
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, backgroundColor: '#fafafa' }}>
          <TextField
            fullWidth
            size="small"
            label={`${label} ${unit}`}
            value={formData[field]}
            onChange={(e) => handleChange(field, e.target.value)}
            helperText={referenceValues[field]}
            type="number"
            inputProps={{ step: 'any' }}
          />
          {hasValue && (
            <>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="📝 Observações"
                placeholder="Observação sobre este resultado..."
                value={formData[observationField] || ''}
                onChange={(e) => handleChange(observationField, e.target.value)}
                sx={{ 
                  '& .MuiInputBase-root': { 
                    fontSize: '0.875rem',
                    backgroundColor: '#fffef7'
                  }
                }}
              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="🔍 Possíveis Causas"
                placeholder="Ex: deficiência, excesso, condição clínica relacionada..."
                value={formData[causesField] || ''}
                onChange={(e) => handleChange(causesField, e.target.value)}
                sx={{ 
                  '& .MuiInputBase-root': { 
                    fontSize: '0.875rem',
                    backgroundColor: '#fff3e0'
                  }
                }}
              />
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                label="💊 Protocolo de Tratamento"
                placeholder="Ex: suplementação, medicação, orientações dietéticas..."
                value={formData[treatmentField] || ''}
                onChange={(e) => handleChange(treatmentField, e.target.value)}
                sx={{ 
                  '& .MuiInputBase-root': { 
                    fontSize: '0.875rem',
                    backgroundColor: '#e8f5e9'
                  }
                }}
              />
            </>
          )}
        </Box>
      </Grid>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#d32f2f', fontWeight: 600 }}>
          🩸 Exames de Sangue
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {/* Identificação */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2' }}>
            Identificação do Exame
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Paciente *</InputLabel>
                <Select
                  value={selectedPatient}
                  onChange={(e) => handlePatientChange(e.target.value)}
                  label="Paciente *"
                >
                  {patients.map(p => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name} {p.birthDate && `(${p.birthDate})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Data do Exame"
                value={formData.testDate}
                onChange={(e) => handleChange('testDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                size="small"
                label="Laboratório"
                value={formData.laboratory}
                onChange={(e) => handleChange('laboratory', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Solicitante"
                value={formData.requestingDoctor}
                onChange={(e) => handleChange('requestingDoctor', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        {/* HEMOGRAMA COMPLETO */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🔴 Hemograma Completo
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                Eritrograma (Série Vermelha)
              </Typography>
              <Grid container spacing={2}>
                {renderField('hemoglobin', 'Hemoglobina', '(g/dL)')}
                {renderField('hematocrit', 'Hematócrito', '(%)')}
                {renderField('redBloodCells', 'Hemácias', '(milhões/mm³)')}
                {renderField('mcv', 'VCM', '(fL)')}
                {renderField('mch', 'HCM', '(pg)')}
                {renderField('mchc', 'CHCM', '(g/dL)')}
                {renderField('rdw', 'RDW', '(%)')}
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                Leucograma (Série Branca)
              </Typography>
              <Grid container spacing={2}>
                {renderField('leukocytes', 'Leucócitos', '(/mm³)')}
                {renderField('neutrophils', 'Neutrófilos', '(%)')}
                {renderField('lymphocytes', 'Linfócitos', '(%)')}
                {renderField('monocytes', 'Monócitos', '(%)')}
                {renderField('eosinophils', 'Eosinófilos', '(%)')}
                {renderField('basophils', 'Basófilos', '(%)')}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                Plaquetas
              </Typography>
              <Grid container spacing={2}>
                {renderField('platelets', 'Plaquetas', '(/mm³)')}
                {renderField('mpv', 'Volume Plaquetário Médio', '(fL)')}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre os resultados do hemograma..."
                value={formData.hemogramObservations}
                onChange={(e) => handleChange('hemogramObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Anemia ferropriva, leucocitose por infecção, plaquetopenia..."
                value={formData.hemogramCauses}
                onChange={(e) => handleChange('hemogramCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Suplementação de ferro, vitamina B12, investigação de sangramentos..."
                value={formData.hemogramProtocols}
                onChange={(e) => handleChange('hemogramProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* BIOQUÍMICA */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🧪 Bioquímica
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Glicemia e Metabolismo
              </Typography>
              <Grid container spacing={2}>
                {renderField('glucose', 'Glicose', '(mg/dL)')}
                {renderField('glycatedHemoglobin', 'Hemoglobina Glicada (HbA1c)', '(%)')}
              </Grid>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Perfil Lipídico
              </Typography>
              <Grid container spacing={2}>
                {renderField('totalCholesterol', 'Colesterol Total', '(mg/dL)')}
                {renderField('hdl', 'HDL (Bom)', '(mg/dL)')}
                {renderField('ldl', 'LDL (Ruim)', '(mg/dL)')}
                {renderField('vldl', 'VLDL', '(mg/dL)')}
                {renderField('triglycerides', 'Triglicerídeos', '(mg/dL)')}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                Função Renal
              </Typography>
              <Grid container spacing={2}>
                {renderField('urea', 'Ureia', '(mg/dL)')}
                {renderField('creatinine', 'Creatinina', '(mg/dL)')}
                {renderField('uricAcid', 'Ácido Úrico', '(mg/dL)')}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre bioquímica e metabolismo..."
                value={formData.biochemistryObservations}
                onChange={(e) => handleChange('biochemistryObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Diabetes mellitus, dislipidemia, síndrome metabólica, insuficiência renal..."
                value={formData.biochemistryCauses}
                onChange={(e) => handleChange('biochemistryCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Dieta hipoglicêmica, estatinas, controle glicêmico, hidratação..."
                value={formData.biochemistryProtocols}
                onChange={(e) => handleChange('biochemistryProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* FUNÇÃO HEPÁTICA */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🫀 Função Hepática
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {renderField('ast', 'AST/TGO', '(U/L)')}
              {renderField('alt', 'ALT/TGP', '(U/L)')}
              {renderField('ggt', 'Gama GT', '(U/L)')}
              {renderField('alkalinePhosphatase', 'Fosfatase Alcalina', '(U/L)')}
              {renderField('totalBilirubin', 'Bilirrubina Total', '(mg/dL)')}
              {renderField('directBilirubin', 'Bilirrubina Direta', '(mg/dL)')}
              {renderField('indirectBilirubin', 'Bilirrubina Indireta', '(mg/dL)')}
              {renderField('albumin', 'Albumina', '(g/dL)')}
              {renderField('totalProteins', 'Proteínas Totais', '(g/dL)')}
              {renderField('globulin', 'Globulina', '(g/dL)')}
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre função hepática..."
                value={formData.liverObservations}
                onChange={(e) => handleChange('liverObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Hepatite, esteatose hepática, cirrose, uso de medicamentos hepatotóxicos..."
                value={formData.liverCauses}
                onChange={(e) => handleChange('liverCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Hepatoprotetores, dieta hipogordurosa, controle de álcool, silimarina..."
                value={formData.liverProtocols}
                onChange={(e) => handleChange('liverProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ELETRÓLITOS */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ⚡ Eletrólitos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {renderField('sodium', 'Sódio', '(mEq/L)')}
              {renderField('potassium', 'Potássio', '(mEq/L)')}
              {renderField('calcium', 'Cálcio', '(mg/dL)')}
              {renderField('phosphorus', 'Fósforo', '(mg/dL)')}
              {renderField('magnesium', 'Magnésio', '(mg/dL)')}
              {renderField('chloride', 'Cloreto', '(mEq/L)')}
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre eletrólitos..."
                value={formData.electrolytesObservations}
                onChange={(e) => handleChange('electrolytesObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Desidratação, uso de diuréticos, insuficiência renal, distúrbios cardíacos..."
                value={formData.electrolytesCauses}
                onChange={(e) => handleChange('electrolytesCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Reposição de potássio, correção de sódio, suplementação de magnésio..."
                value={formData.electrolytesProtocols}
                onChange={(e) => handleChange('electrolytesProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* HORMÔNIOS */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🧬 Hormônios
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
                Tireoide
              </Typography>
              <Grid container spacing={2}>
                {renderField('tsh', 'TSH', '(mUI/L)')}
                {renderField('t3', 'T3 Total', '(ng/dL)')}
                {renderField('t4', 'T4 Total', '(μg/dL)')}
                {renderField('freeT4', 'T4 Livre', '(ng/dL)')}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
                Hormônios Reprodutivos
              </Typography>
              <Grid container spacing={2}>
                {renderField('testosterone', 'Testosterona', '(ng/dL)')}
                {renderField('estradiol', 'Estradiol', '(pg/mL)')}
                {renderField('progesterone', 'Progesterona', '(ng/mL)')}
                {renderField('fsh', 'FSH', '(mUI/mL)')}
                {renderField('lh', 'LH', '(mUI/mL)')}
                {renderField('prolactin', 'Prolactina', '(ng/mL)')}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre perfil hormonal..."
                value={formData.hormonesObservations}
                onChange={(e) => handleChange('hormonesObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Hipotireoidismo, hipertireoidismo, SOP, menopausa, andropausa, hiperprolactinemia..."
                value={formData.hormonesCauses}
                onChange={(e) => handleChange('hormonesCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Levotiroxina, reposição hormonal, tratamento para tireoide, moduladores hormonais..."
                value={formData.hormonesProtocols}
                onChange={(e) => handleChange('hormonesProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* VITAMINAS E MINERAIS */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              💊 Vitaminas e Minerais
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                Vitaminas
              </Typography>
              <Grid container spacing={2}>
                {renderField('vitaminD', 'Vitamina D', '(ng/mL)')}
                {renderField('vitaminB12', 'Vitamina B12', '(pg/mL)')}
                {renderField('folicAcid', 'Ácido Fólico', '(ng/mL)')}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                Metabolismo do Ferro
              </Typography>
              <Grid container spacing={2}>
                {renderField('iron', 'Ferro Sérico', '(μg/dL)')}
                {renderField('ferritin', 'Ferritina', '(ng/mL)')}
                {renderField('transferrin', 'Transferrina', '(mg/dL)')}
                {renderField('transferrinSaturation', 'Saturação de Transferrina', '(%)')}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre vitaminas e minerais..."
                value={formData.vitaminsObservations}
                onChange={(e) => handleChange('vitaminsObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Deficiência de vitamina D, anemia ferropriva, má absorção intestinal..."
                value={formData.vitaminsCauses}
                onChange={(e) => handleChange('vitaminsCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#ff9800' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Suplementação de vitamina D, complexo B, sulfato ferroso, ácido fólico..."
                value={formData.vitaminsProtocols}
                onChange={(e) => handleChange('vitaminsProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* MARCADORES INFLAMATÓRIOS E CARDÍACOS */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ❤️ Marcadores Inflamatórios e Cardíacos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#e91e63' }}>
                Inflamação
              </Typography>
              <Grid container spacing={2}>
                {renderField('crp', 'Proteína C-Reativa (PCR)', '(mg/L)')}
                {renderField('esr', 'VHS', '(mm/h)')}
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#e91e63' }}>
                Cardíacos
              </Typography>
              <Grid container spacing={2}>
                {renderField('cpk', 'CPK', '(U/L)')}
                {renderField('ckmb', 'CK-MB', '(U/L)')}
                {renderField('troponin', 'Troponina', '(ng/mL)')}
                {renderField('ldh', 'LDH', '(U/L)')}
                {renderField('bnp', 'BNP', '(pg/mL)')}
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#e91e63' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre marcadores inflamatórios e cardíacos..."
                value={formData.inflammatoryObservations}
                onChange={(e) => handleChange('inflammatoryObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#e91e63' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Infarto agudo do miocárdio, insuficiência cardíaca, processos inflamatórios..."
                value={formData.inflammatoryCauses}
                onChange={(e) => handleChange('inflammatoryCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#e91e63' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Anti-inflamatórios, anticoagulantes, betabloqueadores, controle cardiovascular..."
                value={formData.inflammatoryProtocols}
                onChange={(e) => handleChange('inflammatoryProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* COAGULAÇÃO */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              🩹 Coagulação
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {renderField('pt', 'Tempo de Protrombina (TP)', '(seg)')}
              {renderField('inr', 'INR', '')}
              {renderField('aptt', 'TTPA', '(seg)')}
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre coagulação..."
                value={formData.coagulationObservations}
                onChange={(e) => handleChange('coagulationObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Uso de anticoagulantes, deficiência de vitamina K, hemofilia, trombose..."
                value={formData.coagulationCauses}
                onChange={(e) => handleChange('coagulationCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#4caf50' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Ajuste de varfarina, vitamina K, heparina, controle de INR..."
                value={formData.coagulationProtocols}
                onChange={(e) => handleChange('coagulationProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* OUTROS */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              📋 Outros Exames
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {renderField('amylase', 'Amilase', '(U/L)')}
              {renderField('lipase', 'Lipase', '(U/L)')}
              {renderField('psa', 'PSA (Antígeno Prostático)', '(ng/mL)')}
            </Grid>

            <Divider sx={{ my: 3 }} />
            
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#795548' }}>
                📝 Observações Clínicas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Observações sobre outros exames..."
                value={formData.othersObservations}
                onChange={(e) => handleChange('othersObservations', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#795548' }}>
                🔍 Possíveis Causas
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                size="small"
                placeholder="Ex: Pancreatite aguda, câncer de próstata, alterações pancreáticas..."
                value={formData.othersCauses}
                onChange={(e) => handleChange('othersCauses', e.target.value)}
                sx={{ mb: 2 }}
              />
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#795548' }}>
                💊 Protocolos de Tratamento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Ex: Investigação urológica, acompanhamento pancreático, dieta específica..."
                value={formData.othersProtocols}
                onChange={(e) => handleChange('othersProtocols', e.target.value)}
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* OBSERVAÇÕES */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            📝 Observações
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={formData.observations}
            onChange={(e) => handleChange('observations', e.target.value)}
            placeholder="Anotações adicionais sobre o exame..."
          />
        </Box>

        {/* BOTÕES */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleClear}
          >
            Limpar
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Salvar Exame
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <ScrollToTop />
    </Container>
  );
};

export default BloodTestForm;
