import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Grid,
  Alert,
  Chip,
  Divider,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ScaleIcon from '@mui/icons-material/Scale';
import HeightIcon from '@mui/icons-material/Height';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { getProtocolByCondition, formatProtocol } from '../lib/therapeuticProtocols';
import IridologySequenceGuide from './IridologySequenceGuide';

function VitalSignsAnalysis({ onAnalysisComplete, showIridologyGuide = true }) {
  const [vitalSigns, setVitalSigns] = useState({
    systolicBP: '',
    diastolicBP: '',
    heartRate: '',
    oxygenSaturation: '',
    temperature: '',
    weight: '',
    height: '',
    waist: '',
    hip: ''
  });

  const [calculatedValues, setCalculatedValues] = useState({
    bmi: null,
    bmiCategory: '',
    whr: null,
    whrCategory: ''
  });

  const [analysis, setAnalysis] = useState(null);

  // Calcular IMC e WHR automaticamente
  useEffect(() => {
    const weight = parseFloat(vitalSigns.weight);
    const height = parseFloat(vitalSigns.height);
    const waist = parseFloat(vitalSigns.waist);
    const hip = parseFloat(vitalSigns.hip);

    let newCalculated = { bmi: null, bmiCategory: '', whr: null, whrCategory: '' };

    // Calcular IMC
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      newCalculated.bmi = bmi.toFixed(1);

      if (bmi < 18.5) {
        newCalculated.bmiCategory = 'Abaixo do peso';
      } else if (bmi >= 18.5 && bmi < 25) {
        newCalculated.bmiCategory = 'Peso normal';
      } else if (bmi >= 25 && bmi < 30) {
        newCalculated.bmiCategory = 'Sobrepeso';
      } else if (bmi >= 30 && bmi < 35) {
        newCalculated.bmiCategory = 'Obesidade Grau I';
      } else if (bmi >= 35 && bmi < 40) {
        newCalculated.bmiCategory = 'Obesidade Grau II';
      } else {
        newCalculated.bmiCategory = 'Obesidade Grau III';
      }
    }

    // Calcular WHR (Waist-Hip Ratio)
    if (waist > 0 && hip > 0) {
      const whr = waist / hip;
      newCalculated.whr = whr.toFixed(2);

      // Classificação WHR (valores médios)
      if (whr < 0.85) {
        newCalculated.whrCategory = 'Baixo risco';
      } else if (whr >= 0.85 && whr < 0.90) {
        newCalculated.whrCategory = 'Risco moderado';
      } else {
        newCalculated.whrCategory = 'Alto risco';
      }
    }

    setCalculatedValues(newCalculated);
  }, [vitalSigns.weight, vitalSigns.height, vitalSigns.waist, vitalSigns.hip]);

  // Analisar sinais vitais
  useEffect(() => {
    const sys = parseFloat(vitalSigns.systolicBP);
    const dia = parseFloat(vitalSigns.diastolicBP);
    const hr = parseFloat(vitalSigns.heartRate);
    const spo2 = parseFloat(vitalSigns.oxygenSaturation);
    const bmi = parseFloat(calculatedValues.bmi);
    const whr = parseFloat(calculatedValues.whr);

    const newAnalysis = {
      bloodPressure: null,
      heartRate: null,
      oxygenSaturation: null,
      bmi: null,
      whr: null
    };

    // Análise Pressão Arterial (Diretrizes AHA 2017 / SBC 2020)
    if (sys > 0 && dia > 0) {
      if (sys < 90 || dia < 60) {
        newAnalysis.bloodPressure = {
          level: 'error',
          category: 'Hipotensão',
          value: `${sys}/${dia} mmHg`,
          causes: 'Desidratação, problemas cardíacos, endócrinos (hipotireoidismo, Addison), deficiências nutricionais (B12, folato), medicamentos, hemorragias, sepse.',
          treatments: 'Hidratação adequada (2-3L água/dia, eletrólitos). Aumentar consumo de sal (se não contraindicado). Alcaçuz (aumenta pressão). Café, chá preto. Vitamina B12, ferro. Meias de compressão. PROFISSIONAL DE SAÚDE: avaliar causas base.',
          comments: 'Pressão baixa pode causar tontura, fadiga, visão turva, desmaios. Comum em jejum prolongado, calor excessivo, medicamentos. Pode indicar problemas graves (choque, hemorragia interna). Se persistente com sintomas, procurar assistência de saúde.'
        };
      } else if (sys < 120 && dia < 80) {
        // Normal: Sistólica < 120 E Diastólica < 80
        newAnalysis.bloodPressure = {
          level: 'success',
          category: 'Pressão Normal',
          value: `${sys}/${dia} mmHg`,
          causes: 'Valores saudáveis. Indicam boa saúde cardiovascular.',
          treatments: 'Manter estilo de vida saudável: dieta balanceada, exercícios regulares, controle de estresse, sono adequado, hidratação. Omega-3, magnésio, potássio.',
          comments: 'Pressão arterial ideal (< 120/80 mmHg), associada a menor risco de doenças cardiovasculares, AVC e problemas renais. Manter monitoramento anual. Fatores protetores: peso saudável, atividade física regular, dieta com baixo sódio e rica em potássio.'
        };
      } else if (sys >= 120 && sys < 130 && dia < 80) {
        // Elevada: Sistólica 120-129 E Diastólica < 80
        newAnalysis.bloodPressure = {
          level: 'warning',
          category: 'Pressão Elevada',
          value: `${sys}/${dia} mmHg`,
          causes: 'Pré-hipertensão. Fatores: estresse, obesidade, sedentarismo, dieta rica em sódio, resistência à insulina, genética.',
          treatments: 'Reduzir sódio (<2g/dia), aumentar potássio (banana, abacate). Magnésio 400mg, CoQ10 100mg, alho envelhecido. Exercícios aeróbicos 150min/semana. Perder peso. Chás: hibisco, alho, oliveira.',
          comments: 'Pré-hipertensão (120-129/<80 mmHg): alerta para modificar estilo de vida antes de evoluir para hipertensão. Risco 2x maior de desenvolver pressão alta. Intervenções agora previnem complicações futuras. Monitorar mensalmente. Perda de 5-10% do peso pode normalizar pressão.'
        };
      } else if ((sys >= 130 && sys < 140) || (dia >= 80 && dia < 90)) {
        // Hipertensão Estágio 1: Sistólica 130-139 OU Diastólica 80-89
        newAnalysis.bloodPressure = {
          level: 'error',
          category: 'Hipertensão Estágio 1',
          value: `${sys}/${dia} mmHg`,
          causes: 'Hipertensão. Causas: obesidade, dieta rica em sódio, estresse crônico, sedentarismo, resistência à insulina, problemas renais, apneia do sono, álcool.',
          treatments: 'PROCURAR ASSISTÊNCIA DE SAÚDE. Reduzir sódio drasticamente (<1,5g/dia), dieta DASH. Magnésio 400-600mg, CoQ10 200mg, omega-3 2-3g, alho 600-1200mg, taurina 3g. Perder peso, exercícios diários. Chás: hibisco (muito eficaz), alho, oliveira. Reduzir álcool/cafeína.',
          comments: 'Hipertensão Estágio 1 (130-139/80-89 mmHg): pode responder a mudanças intensivas de estilo de vida, mas muitos pacientes necessitam medicação. "Assassino silencioso" - frequentemente sem sintomas mas danifica artérias, coração, cérebro, rins, olhos. Aumenta risco de infarto, AVC, insuficiência renal. Monitorar semanalmente.'
        };
      } else if (sys >= 140 || dia >= 90) {
        // Hipertensão Estágio 2: Sistólica ≥ 140 OU Diastólica ≥ 90
        newAnalysis.bloodPressure = {
          level: 'error',
          category: 'Hipertensão Estágio 2',
          value: `${sys}/${dia} mmHg`,
          causes: 'Hipertensão severa. Causas: obesidade, dieta rica em sódio, estresse crônico, sedentarismo, resistência à insulina, problemas renais, apneia do sono, álcool, genética.',
          treatments: 'URGENTE: Procurar assistência de saúde - pode requerer medicação! Se >180/120 buscar emergência. Reduzir sódio drasticamente (<1,5g/dia), dieta DASH rigorosa. Magnésio 400-600mg, CoQ10 200mg, omega-3 2-3g, alho 600-1200mg, taurina 3g. Perder peso urgente, exercícios diários supervisionados. Chás: hibisco (muito eficaz), alho, oliveira.',
          comments: 'Hipertensão Estágio 2 (≥140/90 mmHg): pode requerer medicação + mudanças estilo de vida. Risco cardiovascular muito elevado. Pode causar danos irreversíveis aos órgãos. Monitorar frequentemente (3-4x/semana). EMERGÊNCIA HIPERTENSIVA (>180/120 mmHg): dor no peito, falta de ar, alteração visual, confusão mental - buscar assistência de saúde IMEDIATA.'
        };
      }
    }

    // Análise Frequência Cardíaca
    if (hr > 0) {
      if (hr < 60) {
        newAnalysis.heartRate = {
          level: 'warning',
          category: 'Bradicardia',
          value: `${hr} bpm`,
          causes: 'Atletas treinados (normal), hipotireoidismo, medicamentos (beta-bloqueadores), problemas no nó sinusal, hipotermia, desequilíbrios eletrolíticos.',
          treatments: 'Avaliar tireoide (TSH). Se sintomático (tontura, fadiga): CoQ10, L-carnitina, ginseng. Exercícios leves. PROFISSIONAL DE SAÚDE: se <50 bpm com sintomas ou desmaios.',
          comments: 'Bradicardia: pode ser normal em atletas bem condicionados (coração mais eficiente). Em pessoas sedentárias, pode indicar problemas na condução elétrica do coração, hipotireoidismo ou efeito de medicamentos. Sintomas: fadiga, tontura ao levantar, falta de ar, confusão. Se <50 bpm ou com sintomas: avaliação cardiológica + ECG.'
        };
      } else if (hr >= 60 && hr <= 100) {
        newAnalysis.heartRate = {
          level: 'success',
          category: 'Frequência Normal',
          value: `${hr} bpm`,
          causes: 'Frequência cardíaca de repouso saudável.',
          treatments: 'Manter: exercícios regulares (melhora eficiência cardíaca), omega-3, magnésio, CoQ10. Gerenciar estresse com meditação, yoga.',
          comments: 'Frequência cardíaca de repouso ideal. Valores mais baixos dentro dessa faixa (60-70 bpm) indicam melhor condicionamento cardiovascular. Atletas frequentemente têm 40-60 bpm. FC de repouso é influenciada por: condicionamento físico, idade, temperatura, hidratação, medicamentos, estresse, cafeína. Medir pela manhã, antes de levantar, para valores mais precisos.'
        };
      } else {
        newAnalysis.heartRate = {
          level: 'error',
          category: 'Taquicardia',
          value: `${hr} bpm`,
          causes: 'Ansiedade, estresse, desidratação, anemia, hipertireoidismo, cafeína excessiva, febre, arritmias, problemas cardíacos, medicamentos estimulantes.',
          treatments: 'Hidratação adequada. Magnésio 400mg, taurina 2-3g, CoQ10, L-carnitina. Reduzir cafeína drasticamente. Técnicas relaxamento: respiração profunda, meditação. Chás: valeriana, melissa, passiflora, espinheira-santa. PROFISSIONAL DE SAÚDE: se >120 persistente ou palpitações.',
          comments: 'Taquicardia: coração batendo muito rápido em repouso. Pode ser resposta normal a estresse, exercício, cafeína. Se persistente ou com sintomas (palpitações, dor no peito, falta de ar, tontura), requer avaliação por profissional de saúde. Causas graves: fibrilação atrial, taquicardia ventricular, hipertireoidismo, anemia severa. >120 bpm em repouso ou palpitações frequentes: ECG + Holter 24h. Reduzir estimulantes, melhorar sono, gerenciar ansiedade.'
        };
      }
    }

    // Análise Saturação de Oxigênio
    if (spo2 > 0) {
      if (spo2 < 90) {
        newAnalysis.oxygenSaturation = {
          level: 'error',
          category: 'Hipoxemia Grave',
          value: `${spo2}%`,
          causes: 'EMERGÊNCIA: Pneumonia, DPOC, asma grave, COVID-19, embolia pulmonar, insuficiência cardíaca, apneia do sono, altitude.',
          treatments: 'URGENTE: Procurar assistência de saúde imediata. Oxigenoterapia. Suporte: NAC (N-acetilcisteína), vitamina C alta dose, quercetina. Evitar esforços.'
        };
      } else if (spo2 >= 90 && spo2 < 95) {
        newAnalysis.oxygenSaturation = {
          level: 'warning',
          category: 'Saturação Baixa',
          value: `${spo2}%`,
          causes: 'Problemas respiratórios (asma, DPOC, bronquite), anemia, problemas circulatórios, tabagismo, altitude.',
          treatments: 'Avaliar função pulmonar. Ferro + vitamina C (se anêmico), vitamina B12. NAC 600mg 2x/dia, quercetina, vitamina D3. Exercícios respiratórios. Parar de fumar. Chás: guaco, hortelã, eucalipto (inalação).'
        };
      } else if (spo2 >= 95 && spo2 <= 100) {
        newAnalysis.oxygenSaturation = {
          level: 'success',
          category: 'Saturação Normal',
          value: `${spo2}%`,
          causes: 'Oxigenação sanguínea adequada. Sistema respiratório e circulatório funcionando bem.',
          treatments: 'Manter: exercícios aeróbicos, respiração profunda, ambiente bem ventilado. Antioxidantes: vitamina C, E, selênio. Evitar tabagismo passivo.'
        };
      }
    }

    // Análise Temperatura Corporal
    const temp = parseFloat(vitalSigns.temperature);
    if (temp > 0) {
      if (temp < 35) {
        newAnalysis.temperature = {
          level: 'error',
          category: 'Hipotermia',
          value: `${temp}°C`,
          causes: 'Exposição ao frio, desnutrição, hipotireoidismo severo, hipoglicemia, sepse, choque, insuficiência adrenal.',
          treatments: 'URGENTE: Aquecer gradualmente. Líquidos mornos. Avaliar tireoide urgente. Iodo + selênio. Ashwagandha. Glicose se hipoglicêmico. PROFISSIONAL DE SAÚDE imediato se <35°C.'
        };
      } else if (temp >= 35 && temp < 36) {
        newAnalysis.temperature = {
          level: 'warning',
          category: 'Temperatura Baixa',
          value: `${temp}°C`,
          causes: 'Hipotireoidismo, metabolismo lento, má circulação, desnutrição, fadiga adrenal, anemia.',
          treatments: 'Avaliar função tireoidiana (TSH, T3, T4). Iodo + selênio 200mcg. Vitamina B12, ferro. Gengibre, canela, pimenta cayenne. Exercícios. Ashwagandha 500mg 2x/dia.'
        };
      } else if (temp >= 36 && temp <= 37.5) {
        newAnalysis.temperature = {
          level: 'success',
          category: 'Temperatura Normal',
          value: `${temp}°C`,
          causes: 'Temperatura corporal adequada. Metabolismo e termorregulação funcionando normalmente.',
          treatments: 'Manter: hidratação, alimentação equilibrada, sono adequado, atividade física regular.'
        };
      } else if (temp > 37.5 && temp < 38) {
        newAnalysis.temperature = {
          level: 'warning',
          category: 'Febrícula',
          value: `${temp}°C`,
          causes: 'Infecção leve, inflamação, estresse, ovulação (mulheres), desidratação, exercício recente.',
          treatments: 'Hidratação abundante. Vitamina C 2-3g, zinco 30mg, própolis. Chás: equinácea, gengibre, limão. Repouso. Se persistir >3 dias, procurar assistência de saúde.'
        };
      } else if (temp >= 38 && temp < 39) {
        newAnalysis.temperature = {
          level: 'warning',
          category: 'Febre Moderada',
          value: `${temp}°C`,
          causes: 'Infecção viral/bacteriana, COVID-19, gripe, inflamação, reação medicamentosa.',
          treatments: 'Hidratação intensa. Vitamina C 3-4g, zinco 50mg, vitamina D3 10.000 UI. Própolis, equinácea. Banho morno. Repouso absoluto. PROFISSIONAL DE SAÚDE se >3 dias ou piora.'
        };
      } else if (temp >= 39) {
        newAnalysis.temperature = {
          level: 'error',
          category: 'Febre Alta',
          value: `${temp}°C`,
          causes: 'ATENÇÃO: Infecção severa, pneumonia, meningite, sepse, dengue, COVID-19 grave.',
          treatments: 'URGENTE: Procurar assistência de saúde. Hidratação intensa. Banho morno. Vitamina C IV se possível. Não use antitérmicos sem orientação de profissional de saúde. EMERGÊNCIA se >40°C.'
        };
      }
    }

    // Análise IMC
    if (bmi > 0) {
      if (bmi < 18.5) {
        newAnalysis.bmi = {
          level: 'warning',
          category: calculatedValues.bmiCategory,
          value: calculatedValues.bmi,
          causes: 'Desnutrição, má absorção intestinal, hipertireoidismo, distúrbios alimentares, doenças crônicas, metabolismo acelerado, estresse.',
          treatments: 'Aumentar calorias (300-500 kcal/dia acima do gasto). Proteínas: 1.5-2g/kg. Shakes calóricos (whey, aveia, banana, pasta amendoim). Creatina 5g. Digestivos: enzimas pancreáticas, probióticos. Avaliar tireoide. Treinamento resistido.'
        };
      } else if (bmi >= 18.5 && bmi < 25) {
        newAnalysis.bmi = {
          level: 'success',
          category: calculatedValues.bmiCategory,
          value: calculatedValues.bmi,
          causes: 'Peso corporal saudável para a altura.',
          treatments: 'Manter: dieta balanceada, exercícios regulares (aeróbicos + musculação), sono 7-9h. Proteínas adequadas (0.8-1g/kg). Hidratação. Check-up anual.'
        };
      } else if (bmi >= 25 && bmi < 30) {
        newAnalysis.bmi = {
          level: 'warning',
          category: calculatedValues.bmiCategory,
          value: calculatedValues.bmi,
          causes: 'Excesso calórico, sedentarismo, dieta processada/açúcar, resistência à insulina, estresse, sono inadequado, genética.',
          treatments: 'Déficit calórico 300-500 kcal/dia. Dieta low-carb ou jejum intermitente. Proteínas 1.2-1.5g/kg. Fibras (30g/dia). Berberina 500mg 3x, cromo, L-carnitina. Exercícios 5x/semana (cardio + musculação). Chás: verde, hibisco, gengibre.'
        };
      } else {
        const grau = bmi < 35 ? 'I' : bmi < 40 ? 'II' : 'III';
        newAnalysis.bmi = {
          level: 'error',
          category: calculatedValues.bmiCategory,
          value: calculatedValues.bmi,
          causes: 'Obesidade. Causas: resistência à insulina/diabetes, síndrome metabólica, hipotireoidismo, SOP, apneia do sono, sedentarismo, dieta hipercalórica.',
          treatments: `PROFISSIONAL DE SAÚDE: acompanhamento nutricional/endócrino. Dieta cetogênica ou low-carb estrita. Jejum intermitente 16:8. Berberina 500mg 3x, metformina (sob supervisão de profissional de saúde), cromo, ALA 600mg. Exercícios diários progressivos. Avaliar hormônios (tireoide, cortisol, insulina). Chás: carqueja, hibisco, chá verde. ${grau === 'III' ? 'Considerar cirurgia bariátrica.' : ''}`
        };
      }
    }

    // Análise WHR
    if (whr > 0) {
      if (whr < 0.85) {
        newAnalysis.whr = {
          level: 'success',
          category: calculatedValues.whrCategory,
          value: calculatedValues.whr,
          causes: 'Distribuição de gordura saudável. Baixo risco cardiovascular e metabólico.',
          treatments: 'Manter: musculação para core, HIIT, dieta anti-inflamatória. Omega-3, vitamina D3.'
        };
      } else if (whr >= 0.85 && whr < 0.90) {
        newAnalysis.whr = {
          level: 'warning',
          category: calculatedValues.whrCategory,
          value: calculatedValues.whr,
          causes: 'Acúmulo de gordura abdominal (visceral). Risco aumentado para diabetes tipo 2, doenças cardiovasculares, síndrome metabólica.',
          treatments: 'Reduzir gordura visceral: dieta low-carb, evitar açúcar/álcool. Exercícios abdominais + HIIT. Berberina 500mg 3x, chá verde (EGCG), CLA, L-carnitina. Controlar cortisol (estresse). Dormir bem. Chás: hibisco, carqueja.'
        };
      } else {
        newAnalysis.whr = {
          level: 'error',
          category: calculatedValues.whrCategory,
          value: calculatedValues.whr,
          causes: 'Alto acúmulo de gordura abdominal visceral. Alto risco: diabetes, hipertensão, doenças cardiovasculares, AVC, síndrome metabólica, câncer.',
          treatments: 'URGENTE: Avaliar glicemia, insulina, perfil lipídico, pressão. Dieta cetogênica estrita ou jejum intermitente. Eliminar açúcar, álcool, carboidratos refinados. Berberina 500mg 3x, metformina (sob supervisão de profissional de saúde), omega-3 3g, vitamina D3 5000UI. HIIT + musculação 5-6x/semana. Gerenciar estresse (cortisol alto piora). Sono 8h. Chás: hibisco, carqueja, chá verde concentrado.'
        };
      }
    }

    setAnalysis(newAnalysis);

    // Enviar análise completa para o componente pai
    if (onAnalysisComplete) {
      onAnalysisComplete({
        vitalSigns,
        calculatedValues,
        analysis: newAnalysis,
        timestamp: new Date().toISOString()
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vitalSigns, calculatedValues]);

  const handleChange = (field) => (event) => {
    setVitalSigns({
      ...vitalSigns,
      [field]: event.target.value
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3, backgroundColor: '#e8f5e9', border: '2px solid #2e7d32', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#2e7d32', fontWeight: 600 }}>
        <MonitorHeartIcon sx={{ color: '#2e7d32' }} />
        Análise de Sinais Vitais e Medidas Corporais
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Insira os valores para análise automática com possíveis causas e tratamentos.
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Pressão Arterial e Frequência Cardíaca */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
          🩺 Pressão Arterial e Frequência Cardíaca
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Pressão Sistólica"
              type="number"
              value={vitalSigns.systolicBP}
              onChange={handleChange('systolicBP')}
              InputProps={{
                endAdornment: <InputAdornment position="end">mmHg</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Pressão Diastólica"
              type="number"
              value={vitalSigns.diastolicBP}
              onChange={handleChange('diastolicBP')}
              InputProps={{
                endAdornment: <InputAdornment position="end">mmHg</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Frequência Cardíaca"
              type="number"
              value={vitalSigns.heartRate}
              onChange={handleChange('heartRate')}
              InputProps={{
                endAdornment: <InputAdornment position="end">bpm</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Saturação O₂"
              type="number"
              value={vitalSigns.oxygenSaturation}
              onChange={handleChange('oxygenSaturation')}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              inputProps={{ min: 0, max: 100 }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Temperatura"
              type="number"
              value={vitalSigns.temperature}
              onChange={handleChange('temperature')}
              InputProps={{
                endAdornment: <InputAdornment position="end">°C</InputAdornment>
              }}
              inputProps={{ min: 33, max: 43, step: 0.1 }}
              helperText="Normal: 36-37°C"
            />
          </Grid>
        </Grid>
      </Box>

      {/* Medidas Corporais */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
          📏 Medidas Corporais
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Peso"
              type="number"
              value={vitalSigns.weight}
              onChange={handleChange('weight')}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Altura"
              type="number"
              value={vitalSigns.height}
              onChange={handleChange('height')}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Cintura"
              type="number"
              value={vitalSigns.waist}
              onChange={handleChange('waist')}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Quadril"
              type="number"
              value={vitalSigns.hip}
              onChange={handleChange('hip')}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Valores Calculados */}
      {(calculatedValues.bmi || calculatedValues.whr) && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#2e7d32' }}>
            📊 Valores Calculados
          </Typography>
          <Grid container spacing={2}>
            {calculatedValues.bmi && (
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    IMC (Índice de Massa Corporal)
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {calculatedValues.bmi}
                  </Typography>
                  <Chip
                    label={calculatedValues.bmiCategory}
                    size="small"
                    color={
                      calculatedValues.bmiCategory === 'Peso normal'
                        ? 'success'
                        : calculatedValues.bmiCategory.includes('Obesidade')
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>
            )}
            {calculatedValues.whr && (
              <Grid item xs={12} sm={6}>
                <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    RCQ (Relação Cintura-Quadril)
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {calculatedValues.whr}
                  </Typography>
                  <Chip
                    label={calculatedValues.whrCategory}
                    size="small"
                    color={
                      calculatedValues.whrCategory === 'Baixo risco'
                        ? 'success'
                        : calculatedValues.whrCategory === 'Alto risco'
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ mt: 1 }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {/* Análises */}
      {analysis && Object.values(analysis).some(a => a !== null) && (
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#9c27b0' }}>
            🔬 Análise Clínica
          </Typography>
          <Grid container spacing={2}>
            {analysis.bloodPressure && (
              <Grid item xs={12}>
                <Alert severity={analysis.bloodPressure.level} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {analysis.bloodPressure.category}: {analysis.bloodPressure.value}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Causas:</strong> {analysis.bloodPressure.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Tratamentos:</strong> {analysis.bloodPressure.treatments}
                  </Typography>
                  {analysis.bloodPressure.comments && (
                    <Typography variant="body2" sx={{ mt: 2, p: 1.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1, fontStyle: 'italic' }}>
                      <strong>💬 Observações:</strong> {analysis.bloodPressure.comments}
                    </Typography>
                  )}
                </Alert>
              </Grid>
            )}

            {analysis.heartRate && (
              <Grid item xs={12} md={6}>
                <Alert severity={analysis.heartRate.level}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {analysis.heartRate.category}: {analysis.heartRate.value}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Causas:</strong> {analysis.heartRate.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Tratamentos:</strong> {analysis.heartRate.treatments}
                  </Typography>
                  {analysis.heartRate.comments && (
                    <Typography variant="body2" sx={{ mt: 1.5, p: 1.5, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 1, fontStyle: 'italic', fontSize: '0.85rem' }}>
                      <strong>💬 Observações:</strong> {analysis.heartRate.comments}
                    </Typography>
                  )}
                </Alert>
              </Grid>
            )}

            {analysis.oxygenSaturation && (
              <Grid item xs={12} md={6}>
                <Alert severity={analysis.oxygenSaturation.level}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {analysis.oxygenSaturation.category}: {analysis.oxygenSaturation.value}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Causas:</strong> {analysis.oxygenSaturation.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    <strong>Tratamentos:</strong> {analysis.oxygenSaturation.treatments}
                  </Typography>
                </Alert>
              </Grid>
            )}

            {analysis.temperature && (
              <Grid item xs={12} md={6}>
                <Alert severity={analysis.temperature.level}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    {analysis.temperature.category}: {analysis.temperature.value}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Causas:</strong> {analysis.temperature.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    <strong>Tratamentos:</strong> {analysis.temperature.treatments}
                  </Typography>
                </Alert>
              </Grid>
            )}

            {analysis.bmi && (
              <Grid item xs={12} md={6}>
                <Alert severity={analysis.bmi.level}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    IMC {analysis.bmi.value} - {analysis.bmi.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Causas:</strong> {analysis.bmi.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    <strong>Tratamentos:</strong> {analysis.bmi.treatments}
                  </Typography>
                </Alert>
              </Grid>
            )}

            {analysis.whr && (
              <Grid item xs={12} md={6}>
                <Alert severity={analysis.whr.level}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    RCQ {analysis.whr.value} - {analysis.whr.category}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, fontSize: '0.85rem' }}>
                    <strong>Causas:</strong> {analysis.whr.causes}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    <strong>Tratamentos:</strong> {analysis.whr.treatments}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      )}

      {showIridologyGuide && (
        <IridologySequenceGuide title="Sequência Iridológica Integrada aos Sinais Vitais" />
      )}
    </Paper>
  );
}

export default VitalSignsAnalysis;
