import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Alert,
  CircularProgress,
  Grid,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceIcon from '@mui/icons-material/Science';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SpaIcon from '@mui/icons-material/Spa';
import { getTherapeuticSuggestionsBySymptoms } from '../config/therapeuticDatabase';
import { PROBIOTIC_STRAINS } from '../data/probioticsData';

/**
 * Componente que analisa em tempo real a queixa principal
 * e gera sugestões terapêuticas automáticas
 */
export default function RealTimeTreatmentAnalysis({ complaint }) {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Analisar texto e extrair condições/sintomas
  const analyzeComplaint = (text) => {
    if (!text || text.length < 10) return [];
    
    const lowerText = text.toLowerCase();
    const conditions = [];

    // Base de conhecimento expandida
    const conditionKeywords = {
      // Sistema Digestivo
      'Gastrite/Refluxo': ['gastrite', 'refluxo', 'azia', 'queimação', 'estômago', 'acidez'],
      'Intestino Preso': ['intestino preso', 'prisão de ventre', 'constipação', 'fezes duras', 'dificuldade evacuar'],
      'Diarreia': ['diarreia', 'fezes líquidas', 'evacuação frequente', 'intestino solto'],
      'Gases/Distensão': ['gases', 'flatulência', 'distensão', 'barriga inchada', 'estufamento'],
      'Disbiose': ['disbiose', 'flora intestinal', 'microbiota alterada'],
      'Síndrome Intestino Irritável': ['intestino irritável', 'sii', 'cólon irritável'],
      
      // Sistema Nervoso/Emocional
      'Ansiedade': ['ansiedade', 'ansioso', 'nervoso', 'preocupação excessiva', 'pânico', 'angústia'],
      'Depressão': ['depressão', 'deprimido', 'tristeza profunda', 'desânimo', 'melancolia'],
      'Estresse': ['estresse', 'stress', 'tensão', 'sobrecarga'],
      'Insônia': ['insônia', 'não consigo dormir', 'dificuldade dormir', 'acorda noite', 'sono ruim'],
      'Fadiga Mental': ['fadiga mental', 'cansaço mental', 'exaustão mental', 'esgotamento'],
      
      // Sistema Cardiovascular
      'Hipertensão': ['pressão alta', 'hipertensão', 'pressão elevada'],
      'Colesterol Alto': ['colesterol alto', 'colesterol elevado', 'dislipidemia'],
      'Má Circulação': ['má circulação', 'circulação ruim', 'pernas inchadas', 'varizes'],
      
      // Sistema Imunológico
      'Imunidade Baixa': ['imunidade baixa', 'gripes frequentes', 'resfriados constantes', 'infecções repetidas'],
      'Alergias': ['alergia', 'rinite', 'sinusite', 'espirros frequentes'],
      'Inflamação Crônica': ['inflamação', 'processo inflamatório', 'corpo inflamado'],
      
      // Sistema Endócrino
      'Diabetes': ['diabetes', 'glicose alta', 'açúcar no sangue', 'glicemia elevada'],
      'Hipotireoidismo': ['hipotireoidismo', 'tireoide baixa', 'tsh alto'],
      'Síndrome Ovários Policísticos': ['ovários policísticos', 'sop', 'cistos ovários'],
      
      // Dor e Inflamação
      'Artrite/Artrose': ['artrite', 'artrose', 'dor articulações', 'juntas doloridas'],
      'Fibromialgia': ['fibromialgia', 'dor generalizada', 'dor corpo todo'],
      'Dor Crônica': ['dor crônica', 'dor persistente', 'dor constante'],
      'Enxaqueca': ['enxaqueca', 'cefaleia', 'dor de cabeça forte', 'migrânea'],
      
      // Sistema Respiratório
      'Asma': ['asma', 'falta de ar', 'chiado no peito', 'broncoespasmo'],
      'Bronquite': ['bronquite', 'tosse crônica', 'catarro'],
      
      // Pele
      'Acne': ['acne', 'espinhas', 'cravos'],
      'Eczema/Dermatite': ['eczema', 'dermatite', 'coceira pele', 'pele irritada'],
      'Psoríase': ['psoríase', 'placas na pele', 'descamação pele'],
      
      // Outros
      'Obesidade': ['obesidade', 'sobrepeso', 'excesso peso', 'perder peso', 'emagrecer'],
      'Menopausa': ['menopausa', 'climatério', 'ondas calor', 'fogachos'],
      'TPM': ['tpm', 'tensão pré-menstrual', 'sintomas antes menstruação'],
    };

    // Detectar condições
    for (const [condition, keywords] of Object.entries(conditionKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          if (!conditions.includes(condition)) {
            conditions.push(condition);
          }
          break;
        }
      }
    }

    return conditions;
  };

  // Gerar sugestões terapêuticas baseadas nas condições
  const generateTherapeuticSuggestions = (conditions) => {
    if (conditions.length === 0) return null;

    const plan = {
      emocional: [],
      fitoterapicos: [],
      nutraceuticos: [],
      homeopaticos: [],
      aromaterapia: [],
      oleos_essenciais: [],
      frequenciais: [],
      florais: [],
      suplementos: []
    };

    // Base terapêutica para cada condição
    const therapeuticDatabase = {
      'Ansiedade': {
        emocional: ['Psicoterapia cognitivo-comportamental', 'Meditação mindfulness 20min/dia', 'Exercícios respiratórios 4-7-8'],
        fitoterapicos: [
          { nome: 'Passiflora incarnata', dose: '300-500mg', posologia: '3x ao dia', obs: 'Antes das refeições' },
          { nome: 'Valeriana officinalis', dose: '300-600mg', posologia: '1-2x ao dia', obs: 'À noite' },
          { nome: 'Melissa officinalis', dose: '300mg', posologia: '3x ao dia', obs: 'Calmante suave' }
        ],
        nutraceuticos: [
          { nome: 'L-Teanina', dose: '200-400mg', posologia: '1-2x ao dia', obs: 'Relaxamento sem sonolência' },
          { nome: 'GABA', dose: '500-750mg', posologia: '1-2x ao dia', obs: 'Neurotransmissor inibitório' },
          { nome: 'Ashwagandha KSM-66', dose: '300-600mg', posologia: '2x ao dia', obs: 'Adaptógeno' }
        ],
        homeopaticos: [
          { nome: 'Gelsemium 30CH', dose: '5 glóbulos', posologia: '3x ao dia', obs: 'Ansiedade antecipatória' },
          { nome: 'Ignatia 30CH', dose: '5 glóbulos', posologia: '3x ao dia', obs: 'Ansiedade com suspiros' }
        ],
        oleos_essenciais: [
          { nome: 'Lavanda', uso: 'Difusor ou inalação', obs: 'Calmante potente' },
          { nome: 'Bergamota', uso: '2-3 gotas em difusor', obs: 'Reduz cortisol' }
        ],
        florais: [
          { nome: 'Rescue Remedy', dose: '4 gotas', posologia: '4x ao dia', obs: 'Emergências emocionais' },
          { nome: 'White Chestnut', dose: '4 gotas', posologia: '4x ao dia', obs: 'Pensamentos repetitivos' }
        ],
        suplementos: [
          { nome: 'Magnésio Glicina to', dose: '300-400mg', posologia: '1x ao dia (noite)', obs: 'Relaxamento muscular e mental' },
          { nome: 'Ômega-3 EPA/DHA', dose: '1000-2000mg', posologia: '1-2x ao dia', obs: 'Anti-inflamatório cerebral' },
          { nome: 'Vitamina B-Complex', dose: '1 cápsula', posologia: '1x ao dia', obs: 'Saúde do sistema nervoso' }
        ]
      },

      'Gastrite/Refluxo': {
        fitoterapicos: [
          { nome: 'Espinheira Santa', dose: '500mg', posologia: '3x ao dia', obs: '30min antes refeições' },
          { nome: 'Alcaçuz DGL', dose: '380mg', posologia: '3x ao dia', obs: 'Cicatrizante mucosa' },
          { nome: 'Camomila', dose: '300mg ou chá', posologia: '3x ao dia', obs: 'Anti-inflamatório' }
        ],
        nutraceuticos: [
          { nome: 'Glutamina', dose: '5g', posologia: '2x ao dia', obs: 'Regeneração mucosa' },
          { nome: 'Aloe Vera', dose: '50ml suco', posologia: '2x ao dia', obs: 'Cicatrizante' },
          { nome: 'Zinco Carnosina', dose: '75mg', posologia: '2x ao dia', obs: 'Proteção mucosa gástrica' }
        ],
        suplementos: [
          { nome: 'Probióticos', dose: '10-20 bilhões UFC', posologia: '1x ao dia', obs: 'H. pylori e inflamação' },
          { nome: 'Vitamina U (Metilmetionina)', dose: '200mg', posologia: '3x ao dia', obs: 'Cicatrização úlceras' }
        ]
      },

      'Insônia': {
        fitoterapicos: [
          { nome: 'Valeriana + Lúpulo', dose: '500mg', posologia: '1h antes dormir', obs: 'Indução do sono' },
          { nome: 'Passiflora', dose: '400mg', posologia: '1h antes dormir', obs: 'Melhora qualidade' },
          { nome: 'Mulungu', dose: '300mg', posologia: 'À noite', obs: 'Sedativo natural' }
        ],
        nutraceuticos: [
          { nome: 'Melatonina', dose: '1-5mg', posologia: '30min antes dormir', obs: 'Regular ciclo circadiano' },
          { nome: '5-HTP', dose: '100-200mg', posologia: 'À noite', obs: 'Precursor serotonina' },
          { nome: 'Glicina', dose: '3g', posologia: 'Antes dormir', obs: 'Melhora sono profundo' }
        ],
        oleos_essenciais: [
          { nome: 'Lavanda', uso: '5 gotas no travesseiro', obs: 'Indução sono' },
          { nome: 'Camomila Romana', uso: 'Difusor no quarto', obs: 'Relaxamento profundo' }
        ],
        suplementos: [
          { nome: 'Magnésio Treonato', dose: '2000mg', posologia: '1h antes dormir', obs: 'Cruza barreira hematoencefálica' },
          { nome: 'L-Teanina', dose: '200mg', posologia: 'Antes dormir', obs: 'Relaxamento mental' }
        ]
      },

      'Depressão': {
        emocional: ['Psicoterapia', 'Atividade física regular', 'Exposição luz solar manhã'],
        fitoterapicos: [
          { nome: 'Hipérico (St. John\'s Wort)', dose: '300mg (0,3% hipericina)', posologia: '3x ao dia', obs: 'Depressão leve/moderada' },
          { nome: 'Rhodiola rosea', dose: '200-400mg', posologia: '2x ao dia', obs: 'Adaptógeno, energia' },
          { nome: 'Açafrão (Crocus sativus)', dose: '30mg', posologia: '1x ao dia', obs: 'Eficácia comprovada' }
        ],
        nutraceuticos: [
          { nome: 'SAMe', dose: '400-800mg', posologia: '2x ao dia', obs: 'Metilação, neurotransmissores' },
          { nome: '5-HTP', dose: '100-300mg', posologia: '2-3x ao dia', obs: 'Precursor serotonina' },
          { nome: 'N-Acetil Cisteína', dose: '1000-2000mg', posologia: '2x ao dia', obs: 'Glutationa, neuroproteção' }
        ],
        suplementos: [
          { nome: 'Ômega-3 (EPA>DHA)', dose: '2000mg EPA', posologia: '2x ao dia', obs: 'Anti-inflamatório cerebral' },
          { nome: 'Vitamina D3', dose: '5000-10000 UI', posologia: '1x ao dia', obs: 'Neurotransmissores' },
          { nome: 'Vitaminas B (B6, B9, B12)', dose: '1 complexo', posologia: '1x ao dia', obs: 'Metilação' }
        ]
      },

      'Hipertensão': {
        emocional: ['Redução estresse', 'Exercícios aeróbicos 150min/semana', 'Técnicas relaxamento'],
        fitoterapicos: [
          { nome: 'Alho envelhecido', dose: '600-1200mg', posologia: '2x ao dia', obs: 'Vasodilatador' },
          { nome: 'Oliveira (folha)', dose: '500mg', posologia: '2x ao dia', obs: 'Hipotensor natural' },
          { nome: 'Hibisco', dose: 'Chá 2-3 xícaras', posologia: 'Ao longo do dia', obs: 'Diurético suave' }
        ],
        nutraceuticos: [
          { nome: 'Coenzima Q10', dose: '100-200mg', posologia: '2x ao dia', obs: 'Função endotelial' },
          { nome: 'L-Arginina', dose: '3-6g', posologia: '2-3x ao dia', obs: 'Precursor óxido nítrico' },
          { nome: 'Peptídeos de peixe', dose: '1000mg', posologia: '1x ao dia', obs: 'Inibidores ECA naturais' }
        ],
        suplementos: [
          { nome: 'Magnésio Quelato', dose: '400-600mg', posologia: '2x ao dia', obs: 'Relaxamento vascular' },
          { nome: 'Potássio', dose: '99mg (ou alimentos)', posologia: 'Conforme orientação', obs: 'Balanço eletrolítico' },
          { nome: 'Ômega-3', dose: '2-3g', posologia: '2x ao dia', obs: 'Anti-inflamatório vascular' }
        ]
      },

      'Diabetes': {
        fitoterapicos: [
          { nome: 'Pata de Vaca', dose: '500mg', posologia: '3x ao dia', obs: 'Hipoglicemiante' },
          { nome: 'Canela de Ceilão', dose: '1-3g', posologia: '2x ao dia', obs: 'Sensibilidade insulínica' },
          { nome: 'Gymnema sylvestre', dose: '400mg', posologia: '2x ao dia', obs: 'Reduz absorção glicose' }
        ],
        nutraceuticos: [
          { nome: 'Ácido Alfa-Lipóico', dose: '600mg', posologia: '2x ao dia', obs: 'Neuropatia, glicose' },
          { nome: 'Berberina', dose: '500mg', posologia: '3x ao dia', obs: 'Similar metformina' },
          { nome: 'Cromo Picolinato', dose: '200-400mcg', posologia: '1x ao dia', obs: 'Metabolismo glicose' }
        ],
        suplementos: [
          { nome: 'Magnésio', dose: '400mg', posologia: '2x ao dia', obs: 'Sensibilidade insulínica' },
          { nome: 'Vitamina D3', dose: '5000 UI', posologia: '1x ao dia', obs: 'Regulação insulina' },
          { nome: 'Ômega-3', dose: '2-3g', posologia: '2x ao dia', obs: 'Anti-inflamatório, triglicerídeos' }
        ]
      },

      'Colesterol Alto': {
        fitoterapicos: [
          { nome: 'Arroz Vermelho Fermentado', dose: '600mg (10mg monac olina)', posologia: '1x ao dia', obs: 'À noite, similar estatina' },
          { nome: 'Alcachofra', dose: '500mg', posologia: '3x ao dia', obs: 'Colerético, lipídios' },
          { nome: 'Alho', dose: '600-1200mg', posologia: '2x ao dia', obs: 'Reduz LDL' }
        ],
        nutraceuticos: [
          { nome: 'Berberina', dose: '500mg', posologia: '3x ao dia', obs: 'Reduz LDL 20-30%' },
          { nome: 'Niacina (B3)', dose: '500-2000mg', posologia: 'Progressivo', obs: 'Aumenta HDL, reduz LDL' },
          { nome: 'Esteróis Vegetais', dose: '2g', posologia: '1-2x ao dia', obs: 'Bloqueia absorção colesterol' }
        ],
        suplementos: [
          { nome: 'Ômega-3 EPA/DHA', dose: '2-4g', posologia: '2x ao dia', obs: 'Reduz triglicerídeos' },
          { nome: 'Coenzima Q10', dose: '100-200mg', posologia: '1-2x ao dia', obs: 'Proteção cardiovascular' }
        ]
      },

      'Intestino Preso': {
        fitoterapicos: [
          { nome: 'Psyllium (Plantago)', dose: '5-10g', posologia: '2x ao dia', obs: 'Com água abundante' },
          { nome: 'Cáscara Sagrada', dose: '300mg', posologia: '1x ao dia (noite)', obs: 'Uso curto prazo' },
          { nome: 'Sene', dose: '15-30mg', posologia: 'À noite', obs: 'Laxativo estimulante' }
        ],
        nutraceuticos: [
          { nome: 'Magnésio Citrato', dose: '300-500mg', posologia: '1x ao dia', obs: 'Osmótico suave' },
          { nome: 'Vitamina C', dose: '2-5g', posologia: 'Dividido', obs: 'Efeito osmótico' }
        ],
        suplementos: [
          { nome: 'Probióticos', dose: '30-50 bilhões UFC', posologia: '1-2x ao dia', obs: 'Bifidobactérias, Lactobacillus' },
          { nome: 'Prebióticos (FOS/Inulina)', dose: '5-10g', posologia: '1-2x ao dia', obs: 'Alimenta flora' }
        ]
      },

      'Imunidade Baixa': {
        fitoterapicos: [
          { nome: 'Equinácea', dose: '400mg', posologia: '3x ao dia', obs: 'Ciclos 2 semanas on/off' },
          { nome: 'Astragalus', dose: '500mg', posologia: '2x ao dia', obs: 'Adaptógeno imune' },
          { nome: 'Uncaria tomentosa (Unha de Gato)', dose: '300mg', posologia: '3x ao dia', obs: 'Imunomodulador' }
        ],
        nutraceuticos: [
          { nome: 'Beta-Glucanas', dose: '250-500mg', posologia: '1x ao dia', obs: 'Ativa macrófagos' },
          { nome: 'Lactoferrina', dose: '250-500mg', posologia: '1x ao dia', obs: 'Antimicrobiano, imune' },
          { nome: 'Colostro Bovino', dose: '1-2g', posologia: '2x ao dia', obs: 'Imunoglobulinas' }
        ],
        suplementos: [
          { nome: 'Vitamina D3', dose: '5000-10000 UI', posologia: '1x ao dia', obs: 'Imunomodulador' },
          { nome: 'Vitamina C', dose: '1000-2000mg', posologia: '2-3x ao dia', obs: 'Antioxidante, imune' },
          { nome: 'Zinco Quelato', dose: '30-50mg', posologia: '1x ao dia', obs: 'Função células T' },
          { nome: 'Selênio', dose: '200mcg', posologia: '1x ao dia', obs: 'Antioxidante, tireóide' }
        ]
      }
    };

    // Popular o plano terapêutico
    conditions.forEach(condition => {
      const therapy = therapeuticDatabase[condition];
      if (therapy) {
        if (therapy.emocional) plan.emocional.push(...therapy.emocional);
        if (therapy.fitoterapicos) plan.fitoterapicos.push(...therapy.fitoterapicos);
        if (therapy.nutraceuticos) plan.nutraceuticos.push(...therapy.nutraceuticos);
        if (therapy.homeopaticos) plan.homeopaticos.push(...therapy.homeopaticos);
        if (therapy.aromaterapia) plan.aromaterapia.push(...therapy.aromaterapia);
        if (therapy.oleos_essenciais) plan.oleos_essenciais.push(...therapy.oleos_essenciais);
        if (therapy.florais) plan.florais.push(...therapy.florais);
        if (therapy.suplementos) plan.suplementos.push(...therapy.suplementos);
      }
    });

    // Remover duplicatas
    Object.keys(plan).forEach(key => {
      if (Array.isArray(plan[key])) {
        plan[key] = [...new Set(plan[key].map(item => 
          typeof item === 'string' ? item : JSON.stringify(item)
        ))].map(item => {
          try {
            return JSON.parse(item);
          } catch {
            return item;
          }
        });
      }
    });

    return plan;
  };

  // Efeito para analisar a queixa quando mudar
  useEffect(() => {
    if (!complaint || complaint.length < 10) {
      setSuggestions(null);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const conditions = analyzeComplaint(complaint);
      if (conditions.length > 0) {
        const plan = generateTherapeuticSuggestions(conditions);
        setSuggestions({
          conditions,
          plan
        });
      } else {
        setSuggestions(null);
      }
      setLoading(false);
    }, 1000); // Debounce de 1 segundo

    return () => clearTimeout(timer);
  }, [complaint]);

  if (!complaint || complaint.length < 10) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Digite a queixa principal para gerar sugestões terapêuticas automáticas
      </Alert>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Analisando queixa...</Typography>
      </Box>
    );
  }

  if (!suggestions || suggestions.conditions.length === 0) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Nenhuma condição específica identificada. Continue detalhando a queixa.
      </Alert>
    );
  }

  const { conditions, plan } = suggestions;

  return (
    <Box sx={{ mt: 2 }}>
      {/* Condições Identificadas */}
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
          🎯 Condições Identificadas:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {conditions.map((condition, idx) => (
            <Chip 
              key={idx}
              label={condition}
              color="success"
              icon={<LocalHospitalIcon />}
            />
          ))}
        </Box>
      </Paper>

      {/* Plano Terapêutico */}
      <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
        📋 Plano Terapêutico Sugerido:
      </Typography>

      {/* Emocional */}
      {plan.emocional && plan.emocional.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e3f2fd' }}>
            <Typography sx={{ fontWeight: 600 }}>💭 Abordagem Emocional/Comportamental</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {plan.emocional.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 1 }}>
                • {item}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      )}

      {/* Fitoterápicos */}
      {plan.fitoterapicos && plan.fitoterapicos.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8f5e9' }}>
            <Typography sx={{ fontWeight: 600 }}>🌿 Fitoterápicos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.fitoterapicos.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#f1f8e9' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#558b2f' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Dosagem:</strong> {item.dose}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Posologia:</strong> {item.posologia}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Nutracêuticos */}
      {plan.nutraceuticos && plan.nutraceuticos.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fff3e0' }}>
            <Typography sx={{ fontWeight: 600 }}>⚗️ Nutracêuticos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.nutraceuticos.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#fff8e1' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f57c00' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Dosagem:</strong> {item.dose}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Posologia:</strong> {item.posologia}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Homeopáticos */}
      {plan.homeopaticos && plan.homeopaticos.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f3e5f5' }}>
            <Typography sx={{ fontWeight: 600 }}>💧 Homeopáticos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.homeopaticos.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#f8f4fc' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#7b1fa2' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Dosagem:</strong> {item.dose}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Posologia:</strong> {item.posologia}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Óleos Essenciais */}
      {plan.oleos_essenciais && plan.oleos_essenciais.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fce4ec' }}>
            <Typography sx={{ fontWeight: 600 }}>🌸 Óleos Essenciais / Aromaterapia</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.oleos_essenciais.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#fff0f5' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#c2185b' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Uso:</strong> {item.uso}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Florais */}
      {plan.florais && plan.florais.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e1f5fe' }}>
            <Typography sx={{ fontWeight: 600 }}>🌺 Florais Quânticos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.florais.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#e0f7fa' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0277bd' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Dosagem:</strong> {item.dose}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Posologia:</strong> {item.posologia}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      {/* Suplementos */}
      {plan.suplementos && plan.suplementos.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0f2f1' }}>
            <Typography sx={{ fontWeight: 600 }}>💊 Suplementos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {plan.suplementos.map((item, idx) => (
                <Grid item xs={12} key={idx}>
                  <Paper sx={{ p: 2, bgcolor: '#e0f7f4' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#00695c' }}>
                      {item.nome}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>Dosagem:</strong> {item.dose}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Posologia:</strong> {item.posologia}
                    </Typography>
                    {item.obs && (
                      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                        ℹ️ {item.obs}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          ⚠️ <strong>Importante:</strong> Este é um plano terapêutico sugerido baseado na queixa principal. 
          Ajuste conforme necessário com base na avaliação clínica completa do paciente.
        </Typography>
      </Alert>
    </Box>
  );
}
