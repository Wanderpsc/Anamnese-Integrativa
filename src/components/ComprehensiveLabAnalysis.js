import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Warning as WarningIcon,
  LocalHospital as EmergencyIcon,
  Science as ScienceIcon,
  Healing as HealingIcon,
  Print as PrintIcon
} from '@mui/icons-material';

/**
 * Componente de Análise Laboratorial Abrangente
 * Reúne TODOS os exames do paciente com análise integrada completa
 */
export default function ComprehensiveLabAnalysis({ 
  patientData,
  allExamResults,
  sexo = 'geral',
  idade = null 
}) {
  if (!allExamResults || Object.keys(allExamResults).length === 0) {
    return null; // Não mostrar nada se não houver exames
  }

  // Análise integrada dos exames
  const analyzeAllExams = () => {
    const analysis = {
      totalExams: 0,
      normalExams: 0,
      alteredExams: 0,
      criticalExams: [],
      patterns: [],
      risks: [],
      protocols: [],
      relationships: []
    };

    // Contar exames
    Object.entries(allExamResults).forEach(([category, exams]) => {
      Object.entries(exams).forEach(([examName, result]) => {
        if (result && result.valor) {
          analysis.totalExams++;
          if (result.status === 'normal') {
            analysis.normalExams++;
          } else {
            analysis.alteredExams++;
            
            // Identificar valores críticos
            if (result.severidade === 'crítico' || result.severidade === 'alto') {
              analysis.criticalExams.push({
                categoria: category,
                exame: examName,
                valor: result.valor,
                unidade: result.unidade,
                referencia: result.referencia,
                status: result.status,
                severidade: result.severidade
              });
            }
          }
        }
      });
    });

    // Identificar padrões clínicos (relações entre exames)
    analysis.patterns = identifyPatterns(allExamResults);
    
    // Identificar riscos
    analysis.risks = identifyRisks(allExamResults, sexo, idade);
    
    // Gerar protocolos terapêuticos
    analysis.protocols = generateProtocols(allExamResults, sexo, idade);
    
    // Identificar relações entre exames
    analysis.relationships = identifyRelationships(allExamResults);

    return analysis;
  };

  // Identificar padrões clínicos
  const identifyPatterns = (results) => {
    const patterns = [];

    // Padrão: Síndrome Metabólica
    if (results.bioquimica?.glicemia_jejum?.valor > 100 &&
        results.lipidograma?.triglicerides?.valor > 150 &&
        results.lipidograma?.hdl_colesterol?.valor < 40) {
      patterns.push({
        nome: 'Síndrome Metabólica',
        severidade: 'alta',
        descricao: 'Conjunto de alterações metabólicas indicando resistência à insulina',
        examesEnvolvidos: ['Glicemia', 'Triglicérides', 'HDL'],
        riscos: [
          'Diabetes tipo 2',
          'Doença cardiovascular',
          'Esteatose hepática',
          'Hipertensão arterial'
        ]
      });
    }

    // Padrão: Deficiência de Ferro
    if (results.hemograma?.hemoglobina?.valor < (sexo === 'mulher' ? 12 : 13.5) &&
        results.hemograma?.vcm?.valor < 80) {
      patterns.push({
        nome: 'Anemia Ferropriva',
        severidade: 'moderada',
        descricao: 'Anemia microcítica sugestiva de deficiência de ferro',
        examesEnvolvidos: ['Hemoglobina', 'VCM', 'HCM'],
        riscos: [
          'Fadiga crônica',
          'Queda de cabelo',
          'Comprometimento cognitivo',
          'Imunidade reduzida'
        ]
      });
    }

    // Padrão: Inflamação Crônica
    if (results.inflamatorios?.pcr?.valor > 3 &&
        results.hemograma?.vhs?.valor > 20) {
      patterns.push({
        nome: 'Estado Inflamatório Crônico',
        severidade: 'moderada',
        descricao: 'Marcadores elevados indicando processo inflamatório persistente',
        examesEnvolvidos: ['PCR', 'VHS'],
        riscos: [
          'Doenças cardiovasculares',
          'Doenças autoimunes',
          'Resistência à insulina',
          'Envelhecimento acelerado'
        ]
      });
    }

    // Padrão: Disfunção Hepática
    if (results.hepatico?.tgo?.valor > 40 &&
        results.hepatico?.tgp?.valor > 40) {
      patterns.push({
        nome: 'Comprometimento Hepático',
        severidade: 'moderada',
        descricao: 'Elevação das enzimas hepáticas indicando lesão hepatocelular',
        examesEnvolvidos: ['TGO (AST)', 'TGP (ALT)', 'GGT'],
        riscos: [
          'Esteatose hepática',
          'Hepatite medicamentosa',
          'Cirrose',
          'Síndrome metabólica'
        ]
      });
    }

    // Padrão: Disfunção Renal
    if (results.bioquimica?.creatinina?.valor > 1.2 &&
        results.bioquimica?.ureia?.valor > 45) {
      patterns.push({
        nome: 'Comprometimento da Função Renal',
        severidade: 'alta',
        descricao: 'Marcadores renais elevados sugerindo redução da filtração glomerular',
        examesEnvolvidos: ['Creatinina', 'Ureia', 'TFG'],
        riscos: [
          'Doença renal crônica',
          'Hipertensão',
          'Anemia',
          'Distúrbios eletrolíticos'
        ]
      });
    }

    // Padrão: Hipotireoidismo Subclínico
    if (results.tireoide?.tsh?.valor > 4.5 &&
        results.tireoide?.t4_livre?.valor >= 0.8 && results.tireoide?.t4_livre?.valor <= 1.8) {
      patterns.push({
        nome: 'Hipotireoidismo Subclínico',
        severidade: 'moderada',
        descricao: 'TSH elevado com T4 livre normal - comprometimento funcional da tireoide',
        examesEnvolvidos: ['TSH', 'T4 Livre', 'T3'],
        riscos: [
          'Fadiga',
          'Ganho de peso',
          'Colesterol elevado',
          'Depressão'
        ]
      });
    }

    return patterns;
  };

  // Identificar riscos baseados nos resultados
  const identifyRisks = (results, sexo, idade) => {
    const risks = [];

    // Risco cardiovascular
    const ldl = results.lipidograma?.ldl_colesterol?.valor;
    const hdl = results.lipidograma?.hdl_colesterol?.valor;
    const triglicerides = results.lipidograma?.triglicerides?.valor;
    const glicemia = results.bioquimica?.glicemia_jejum?.valor;

    if (ldl > 130 || (hdl && hdl < 40) || triglicerides > 150 || glicemia > 100) {
      risks.push({
        tipo: 'Risco Cardiovascular Aumentado',
        nivel: 'alto',
        fatores: [],
        recomendacoes: [
          'Dieta mediterrânea',
          'Exercícios aeróbicos 150min/semana',
          'Ômega-3 2-3g/dia',
          'Coenzima Q10 100-200mg/dia',
          'Avaliação cardiológica'
        ]
      });
      
      if (ldl > 130) risks[risks.length - 1].fatores.push('LDL elevado');
      if (hdl && hdl < 40) risks[risks.length - 1].fatores.push('HDL baixo');
      if (triglicerides > 150) risks[risks.length - 1].fatores.push('Triglicérides elevados');
      if (glicemia > 100) risks[risks.length - 1].fatores.push('Glicemia alterada');
    }

    // Risco de diabetes
    if (glicemia > 100 || results.bioquimica?.hemoglobina_glicada?.valor > 5.7) {
      risks.push({
        tipo: 'Pré-diabetes / Resistência Insulínica',
        nivel: glicemia > 126 ? 'crítico' : 'alto',
        fatores: [
          glicemia > 100 && 'Glicemia de jejum elevada',
          results.bioquimica?.hemoglobina_glicada?.valor > 5.7 && 'HbA1c elevada'
        ].filter(Boolean),
        recomendacoes: [
          'Dieta low carb / cetogênica',
          'Berberina 500mg 3x/dia',
          'Cromo picolinato 200mcg/dia',
          'Ácido alfa-lipoico 600mg/dia',
          'Exercícios de resistência + aeróbicos',
          'Jejum intermitente 16/8'
        ]
      });
    }

    // Risco de osteoporose (mulheres >45 anos)
    if (sexo === 'mulher' && idade > 45) {
      const calcio = results.minerais?.calcio?.valor;
      const vitD = results.vitaminas?.vitamina_d?.valor;
      
      if ((calcio && calcio < 9.0) || (vitD && vitD < 30)) {
        risks.push({
          tipo: 'Risco de Osteoporose',
          nivel: 'moderado',
          fatores: [
            calcio < 9.0 && 'Cálcio baixo',
            vitD < 30 && 'Vitamina D insuficiente',
            'Idade > 45 anos',
            sexo === 'mulher' && 'Sexo feminino'
          ].filter(Boolean),
          recomendacoes: [
            'Vitamina D3 5.000-10.000 UI/dia',
            'Cálcio 1.000mg/dia (citrato ou quelado)',
            'Vitamina K2 (MK-7) 100mcg/dia',
            'Magnésio 400mg/dia',
            'Exercícios de impacto',
            'Exposição solar 15-20min/dia'
          ]
        });
      }
    }

    return risks;
  };

  // Gerar protocolos terapêuticos integrativos
  const generateProtocols = (results, sexo, idade) => {
    const protocols = [];

    // Protocolo para anemia
    if (results.hemograma?.hemoglobina?.valor < (sexo === 'mulher' ? 12 : 13.5)) {
      protocols.push({
        condicao: 'Anemia',
        objetivo: 'Corrigir deficiência e melhorar transporte de oxigênio',
        suplementos: [
          { nome: 'Ferro quelado (bisglicinato)', dose: '30mg', frequencia: '1x/dia em jejum', duracao: '90 dias' },
          { nome: 'Vitamina C', dose: '500mg', frequencia: 'Junto com ferro', duracao: '90 dias' },
          { nome: 'Vitamina B12 metilcobalamina', dose: '1000mcg', frequencia: '1x/dia sublingual', duracao: '60 dias' },
          { nome: 'Ácido fólico (metilfolato)', dose: '400mcg', frequencia: '1x/dia', duracao: '60 dias' }
        ],
        fitoterapicos: [
          { nome: 'Spirulina', dose: '3-5g', frequencia: '1x/dia', duracao: '60 dias' },
          { nome: 'Urtiga (Urtica dioica)', dose: '500mg', frequencia: '2x/dia', duracao: '60 dias' }
        ],
        alimentacao: [
          'Carnes vermelhas 3-4x/semana',
          'Fígado bovino 1x/semana',
          'Feijão + arroz diariamente (com vitamina C)',
          'Beterraba e folhas verdes escuras',
          'Evitar chá preto/café junto às refeições'
        ],
        observacoes: 'Reavaliar hemograma em 60-90 dias. Se persiste, investigar sangramento oculto.'
      });
    }

    // Protocolo para colesterol elevado
    if (results.lipidograma?.colesterol_total?.valor > 200 ||
        results.lipidograma?.ldl_colesterol?.valor > 130) {
      protocols.push({
        condicao: 'Dislipidemiacolesterol elevado',
        objetivo: 'Reduzir LDL, aumentar HDL e controlar triglicérides',
        suplementos: [
          { nome: 'Ômega-3 (EPA/DHA)', dose: '2-3g', frequencia: '1-2x/dia com refeições', duracao: '90 dias' },
          { nome: 'Coenzima Q10', dose: '200mg', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Bergamota (Citrus bergamia)', dose: '500mg', frequencia: '2x/dia', duracao: '90 dias' },
          { nome: 'Niacina (Vitamina B3)', dose: '500-1000mg', frequencia: '1x/dia', duracao: '90 dias' }
        ],
        fitoterapicos: [
          { nome: 'Alho envelhecido (Allium sativum)', dose: '600mg', frequencia: '2x/dia', duracao: '90 dias' },
          { nome: 'Alcachofra (Cynara scolymus)', dose: '500mg', frequencia: '2x/dia antes refeições', duracao: '60 dias' },
          { nome: 'Chá verde (EGCG)', dose: '400mg', frequencia: '2x/dia', duracao: '90 dias' }
        ],
        alimentacao: [
          'Dieta mediterrânea rica em azeite extra virgem',
          'Peixes gordos 3-4x/semana',
          'Nozes, amêndoas, castanhas diariamente',
          'Aveia, linhaça, chia',
          'Reduzir carboidratos refinados e açúcar',
          'Evitar gorduras trans e óleos vegetais refinados'
        ],
        observacoes: 'Reavaliar lipidograma em 90 dias. Exercícios aeróbicos 150min/semana.'
      });
    }

    // Protocolo para glicemia elevada/pré-diabetes
    if (results.bioquimica?.glicemia_jejum?.valor > 100) {
      protocols.push({
        condicao: 'Glicemia Elevada / Pré-diabetes',
        objetivo: 'Melhorar sensibilidade à insulina e controlar glicemia',
        suplementos: [
          { nome: 'Berberina', dose: '500mg', frequencia: '3x/dia antes refeições', duracao: '90 dias' },
          { nome: 'Cromo picolinato', dose: '200mcg', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Ácido alfa-lipoico', dose: '600mg', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Canela de Ceilão', dose: '1-2g', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Magnésio', dose: '400mg', frequencia: '1x/dia', duracao: '90 dias' }
        ],
        fitoterapicos: [
          { nome: 'Gymnema sylvestre', dose: '400mg', frequencia: '2x/dia', duracao: '60 dias' },
          { nome: 'Pata de vaca (Bauhinia forficata)', dose: 'Chá 3x/dia', frequencia: 'Antes refeições', duracao: '60 dias' },
          { nome: 'Melão de São Caetano', dose: '500mg', frequencia: '2x/dia', duracao: '60 dias' }
        ],
        alimentacao: [
          'Dieta low carb (< 100g carboidratos/dia)',
          'Jejum intermitente 16/8',
          'Priorizar vegetais não-amiláceos',
          'Proteínas de qualidade em todas refeições',
          'Gorduras boas: abacate, azeite, castanhas',
          'Eliminar açúcar, refrigerantes, doces',
          'Evitar alimentos ultraprocessados'
        ],
        observacoes: 'Reavaliar glicemia e HbA1c em 90 dias. Exercícios essenciais (resistência + aeróbico).'
      });
    }

    // Protocolo para função hepática comprometida
    if (results.hepatico?.tgo?.valor > 40 || results.hepatico?.tgp?.valor > 40) {
      protocols.push({
        condicao: 'Comprometimento Hepático',
        objetivo: 'Hepatoproteção e regeneração hepática',
        suplementos: [
          { nome: 'N-Acetilcisteína (NAC)', dose: '600mg', frequencia: '2x/dia', duracao: '90 dias' },
          { nome: 'Ácido alfa-lipoico', dose: '600mg', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Colina + Inositol', dose: '500mg cada', frequencia: '2x/dia', duracao: '90 dias' },
          { nome: 'Vitamina E (tocoferóis mistos)', dose: '400 UI', frequencia: '1x/dia', duracao: '90 dias' }
        ],
        fitoterapicos: [
          { nome: 'Cardo Mariano (Silimarina)', dose: '300mg', frequencia: '3x/dia', duracao: '90 dias' },
          { nome: 'Alcachofra', dose: '500mg', frequencia: '3x/dia antes refeições', duracao: '60 dias' },
          { nome: 'Dente-de-leão (Taraxacum)', dose: 'Chá 2-3x/dia', frequencia: 'Entre refeições', duracao: '60 dias' },
          { nome: 'Cúrcuma (Curcumina)', dose: '500mg', frequencia: '2x/dia com pimenta', duracao: '90 dias' }
        ],
        alimentacao: [
          'Eliminar álcool completamente',
          'Reduzir frutose e açúcar',
          'Aumentar vegetais crucíferos (brócolis, couve)',
          'Alho, cebola, beterraba diariamente',
          'Chás: verde, gengibre, boldo',
          'Limão em jejum',
          'Evitar frituras e gorduras trans'
        ],
        observacoes: 'Reavaliar enzimas hepáticas em 60 dias. Investigar causas: esteatose, medicamentos, álcool.'
      });
    }

    // Protocolo para vitamina D baixa
    if (results.vitaminas?.vitamina_d?.valor < 30) {
      protocols.push({
        condicao: 'Deficiência de Vitamina D',
        objetivo: 'Atingir níveis ótimos de vitamina D (40-60 ng/mL)',
        suplementos: [
          { nome: 'Vitamina D3 (colecalciferol)', dose: '5.000-10.000 UI', frequencia: '1x/dia com gordura', duracao: '90 dias' },
          { nome: 'Vitamina K2 (MK-7)', dose: '100mcg', frequencia: '1x/dia', duracao: '90 dias' },
          { nome: 'Magnésio', dose: '400mg', frequencia: '1x/dia', duracao: '90 dias' }
        ],
        fitoterapicos: [],
        alimentacao: [
          'Peixes gordos (salmão, sardinha)',
          'Ovos orgânicos (gema)',
          'Fígado bovino',
          'Cogumelos expostos ao sol',
          'Exposição solar 15-20min/dia (braços e pernas) sem protetor'
        ],
        observacoes: 'Reavaliar vitamina D em 90 dias. Ajustar dose conforme resultado.'
      });
    }

    return protocols;
  };

  // Identificar relações entre exames
  const identifyRelationships = (results) => {
    const relationships = [];

    // Relação: Ferro x Tireoide
    if (results.hemograma?.ferritina?.valor < 50 && results.tireoide?.tsh?.valor > 2.5) {
      relationships.push({
        titulo: 'Ferro e Função Tireoidiana',
        exames: ['Ferritina', 'TSH', 'T4 Livre'],
        relacao: 'Ferritina baixa compromete a conversão de T4 em T3 (forma ativa do hormônio tireoidiano)',
        implicacao: 'Sintomas de hipotireoidismo podem persistir mesmo com TSH normal se ferro estiver baixo',
        conduta: 'Corrigir ferritina antes de avaliar necessidade de hormônio tireoidiano'
      });
    }

    // Relação: Vitamina D x Cálcio x PTH
    if (results.vitaminas?.vitamina_d?.valor < 30) {
      relationships.push({
        titulo: 'Vitamina D, Cálcio e Paratormônio',
        exames: ['Vitamina D', 'Cálcio', 'PTH'],
        relacao: 'Vitamina D baixa leva a má absorção de cálcio, estimulando produção de PTH',
        implicacao: 'PTH elevado pode levar a perda óssea (osteopenia/osteoporose)',
        conduta: 'Suplementar vitamina D3 + K2. Reavaliar PTH após normalizar vitamina D'
      });
    }

    // Relação: Glicemia x Triglicérides x HDL
    if (results.bioquimica?.glicemia_jejum?.valor > 100 ||
        results.lipidograma?.triglicerides?.valor > 150) {
      relationships.push({
        titulo: 'Tríade Metabólica (Resistência à Insulina)',
        exames: ['Glicemia', 'Triglicérides', 'HDL'],
        relacao: 'Resistência à insulina causa glicemia elevada, triglicérides altos e HDL baixo',
        implicacao: 'Síndrome metabólica - alto risco cardiovascular e diabetes tipo 2',
        conduta: 'Dieta low carb, jejum intermitente, berberina, exercícios de resistência'
      });
    }

    // Relação: TSH x T4 livre x T3
    if (results.tireoide?.tsh?.valor > 2.5) {
      relationships.push({
        titulo: 'Eixo Tireoidiano Completo',
        exames: ['TSH', 'T4 Livre', 'T3 Livre', 'T3 Reverso'],
        relacao: 'TSH estimula produção de T4, que deve ser convertido em T3 (forma ativa)',
        implicacao: 'Problemas de conversão T4→T3 causam sintomas mesmo com TSH/T4 normais',
        conduta: 'Avaliar selênio, zinco, ferro. Considerar T3 se conversão prejudicada'
      });
    }

    // Relação: Homocisteína x B12 x Ácido Fólico
    if (results.cardiometabolicos?.homocisteina?.valor > 10) {
      relationships.push({
        titulo: 'Homocisteína e Vitaminas do Complexo B',
        exames: ['Homocisteína', 'Vitamina B12', 'Ácido Fólico', 'Vitamina B6'],
        relacao: 'Homocisteína é metabolizada por B12, folato e B6. Deficiência eleva homocisteína',
        implicacao: 'Homocisteína alta é fator de risco cardiovascular independente',
        conduta: 'Metilcobalamina (B12) + Metilfolato + P5P (B6). Meta: homocisteína < 7'
      });
    }

    return relationships;
  };

  const analysis = analyzeAllExams();

  return (
    <Box id="comprehensive-lab-analysis" sx={{ mt: 4, pageBreakBefore: 'always' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          border: '3px solid #1976d2',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)'
        }}
      >
        {/* Cabeçalho */}
        <Box sx={{ borderBottom: '3px solid #1976d2', pb: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <ScienceIcon sx={{ fontSize: 50, color: '#1976d2', mr: 2 }} />
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
              ANÁLISE LABORATORIAL INTEGRADA
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#666', mt: 2 }}>
            Avaliação Completa | Medicina Funcional e Integrativa
          </Typography>
        </Box>

        {/* Resumo Geral */}
        <Card sx={{ mb: 4, bgcolor: '#e3f2fd', border: '2px solid #2196f3' }}>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>
              📊 RESUMO GERAL DOS EXAMES
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#ffffff', textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#2196f3', fontWeight: 700 }}>
                    {analysis.totalExams}
                  </Typography>
                  <Typography variant="body1">Total de Exames</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#e8f5e9', textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#4caf50', fontWeight: 700 }}>
                    {analysis.normalExams}
                  </Typography>
                  <Typography variant="body1">Exames Normais</Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: '#ffebee', textAlign: 'center', p: 2 }}>
                  <Typography variant="h3" sx={{ color: '#f44336', fontWeight: 700 }}>
                    {analysis.alteredExams}
                  </Typography>
                  <Typography variant="body1">Exames Alterados</Typography>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Valores Críticos */}
        {analysis.criticalExams.length > 0 && (
          <Alert 
            severity="error" 
            icon={<EmergencyIcon />}
            sx={{ mb: 4, border: '3px solid #d32f2f' }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              ⚠️ VALORES CRÍTICOS ({analysis.criticalExams.length})
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Os seguintes exames apresentam valores que requerem atenção médica prioritária:
            </Typography>
            {analysis.criticalExams.map((exam, idx) => (
              <Card key={idx} sx={{ mb: 2, bgcolor: '#ffebee', border: '2px solid #f44336', p: 2 }}>
                <Typography variant="h6" sx={{ color: '#d32f2f', fontWeight: 600 }}>
                  {exam.exame}: {exam.valor} {exam.unidade}
                </Typography>
                <Typography variant="body2">
                  Referência: {exam.referencia} | Status: {exam.status}
                </Typography>
              </Card>
            ))}
          </Alert>
        )}

        {/* Padrões Clínicos Identificados */}
        {analysis.patterns.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: '#fff3e0', border: '3px solid #ff9800' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#f57c00', mb: 3 }}>
                🔍 PADRÕES CLÍNICOS IDENTIFICADOS
              </Typography>
              {analysis.patterns.map((pattern, idx) => (
                <Card key={idx} sx={{ mb: 3, bgcolor: '#ffffff', border: '2px solid #ff9800' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip 
                        label={pattern.severidade === 'alta' ? 'PRIORIDADE ALTA' : 'MODERADA'} 
                        color={pattern.severidade === 'alta' ? 'error' : 'warning'}
                        sx={{ fontWeight: 700 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57c00' }}>
                        {pattern.nome}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {pattern.descricao}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      📍 Exames envolvidos: {pattern.examesEnvolvidos.join(', ')}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#d32f2f' }}>
                      ⚠️ Riscos Associados:
                    </Typography>
                    <List dense>
                      {pattern.riscos.map((risco, rIdx) => (
                        <ListItem key={rIdx}>
                          <ListItemText primary={`• ${risco}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Riscos Identificados */}
        {analysis.risks.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: '#ffebee', border: '3px solid #f44336' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#d32f2f', mb: 3 }}>
                ⚠️ RISCOS CLÍNICOS IDENTIFICADOS
              </Typography>
              {analysis.risks.map((risk, idx) => (
                <Card key={idx} sx={{ mb: 3, bgcolor: '#ffffff', border: '2px solid #f44336' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Chip 
                        label={risk.nivel.toUpperCase()} 
                        color="error"
                        sx={{ fontWeight: 700 }}
                      />
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#d32f2f' }}>
                        {risk.tipo}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Fatores de Risco:
                    </Typography>
                    <List dense>
                      {risk.fatores.map((fator, fIdx) => (
                        <ListItem key={fIdx}>
                          <ListItemText primary={`• ${fator}`} />
                        </ListItem>
                      ))}
                    </List>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#2e7d32', mt: 2 }}>
                      💡 Recomendações:
                    </Typography>
                    <List dense>
                      {risk.recomendacoes.map((rec, rIdx) => (
                        <ListItem key={rIdx}>
                          <ListItemText primary={`• ${rec}`} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Relações Entre Exames */}
        {analysis.relationships.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: '#f3e5f5', border: '3px solid #9c27b0' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#7b1fa2', mb: 3 }}>
                🔗 RELAÇÕES E INTERAÇÕES ENTRE EXAMES
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, fontStyle: 'italic' }}>
                Compreender como diferentes biomarcadores se relacionam é essencial para tratamento efetivo
              </Typography>
              {analysis.relationships.map((rel, idx) => (
                <Card key={idx} sx={{ mb: 3, bgcolor: '#ffffff', border: '2px solid #9c27b0' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#7b1fa2', mb: 2 }}>
                      {rel.titulo}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      📊 Exames: {rel.exames.join(', ')}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Relação:</strong> {rel.relacao}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, color: '#d32f2f' }}>
                      <strong>Implicação Clínica:</strong> {rel.implicacao}
                    </Typography>
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        💡 Conduta: {rel.conduta}
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* PROTOCOLOS TERAPÊUTICOS */}
        {analysis.protocols.length > 0 && (
          <Card sx={{ mb: 4, bgcolor: '#e8f5e9', border: '3px solid #4caf50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <HealingIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                  🌿 PROTOCOLOS TERAPÊUTICOS INTEGRATIVOS
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                Abordagem naturopática e funcional personalizada baseada nos resultados laboratoriais
              </Typography>

              {analysis.protocols.map((protocol, idx) => (
                <Card key={idx} sx={{ mb: 4, bgcolor: '#ffffff', border: '2px solid #4caf50' }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32', mb: 2 }}>
                      {protocol.condicao}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 3, color: '#666', fontStyle: 'italic' }}>
                      <strong>Objetivo:</strong> {protocol.objetivo}
                    </Typography>

                    {/* Suplementos */}
                    {protocol.suplementos.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#0288d1', fontWeight: 600, mb: 2 }}>
                          💊 Suplementação Ortomolecular
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                                <TableCell sx={{ fontWeight: 700 }}>Suplemento</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Dose</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Frequência</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Duração</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {protocol.suplementos.map((sup, sIdx) => (
                                <TableRow key={sIdx}>
                                  <TableCell>{sup.nome}</TableCell>
                                  <TableCell>{sup.dose}</TableCell>
                                  <TableCell>{sup.frequencia}</TableCell>
                                  <TableCell>{sup.duracao}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    )}

                    {/* Fitoterápicos */}
                    {protocol.fitoterapicos.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#388e3c', fontWeight: 600, mb: 2 }}>
                          🌿 Fitoterapia
                        </Typography>
                        <TableContainer>
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                                <TableCell sx={{ fontWeight: 700 }}>Planta/Extrato</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Dose</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Frequência</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Duração</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {protocol.fitoterapicos.map((fito, fIdx) => (
                                <TableRow key={fIdx}>
                                  <TableCell>{fito.nome}</TableCell>
                                  <TableCell>{fito.dose}</TableCell>
                                  <TableCell>{fito.frequencia}</TableCell>
                                  <TableCell>{fito.duracao}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Box>
                    )}

                    {/* Alimentação */}
                    {protocol.alimentacao.length > 0 && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#ff6f00', fontWeight: 600, mb: 2 }}>
                          🍽️ Orientações Nutricionais
                        </Typography>
                        <List>
                          {protocol.alimentacao.map((alim, aIdx) => (
                            <ListItem key={aIdx}>
                              <ListItemText primary={`• ${alim}`} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}

                    {/* Observações */}
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        📌 Observações: {protocol.observacoes}
                      </Typography>
                    </Alert>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Rodapé */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #ddd' }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            <strong>📋 Observações Finais:</strong> Esta análise foi elaborada com base em princípios da medicina funcional e integrativa,
            considerando valores ideais e não apenas valores de referência laboratorial. Os protocolos sugeridos visam otimização
            da saúde e prevenção de doenças, não substituindo avaliação e acompanhamento médico profissional.
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              ⚠️ IMPORTANTE: Estes protocolos são sugestões baseadas em evidências científicas e prática clínica integrativa.
              Sempre consulte profissional de saúde qualificado antes de iniciar qualquer suplementação ou alteração terapêutica.
              Interações medicamentosas, contraindicações e condições especiais devem ser avaliadas individualmente.
            </Typography>
          </Alert>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Data da Análise: {new Date().toLocaleDateString('pt-BR')}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Wander Pires Silva Coelho
              </Typography>
              <Typography variant="caption">
                Terapeuta Integrativo Funcional - CRTH-BR 17821
              </Typography>
              <Typography variant="caption" display="block">
                Naturopatia | Iridologia | Medicina Funcional
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Botão de Impressão */}
        <Box sx={{ mt: 3, textAlign: 'center', '@media print': { display: 'none' } }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 600,
              px: 4
            }}
          >
            Imprimir Análise Completa de Exames
          </Button>
        </Box>
      </Paper>

      {/* Estilos de impressão */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #comprehensive-lab-analysis,
            #comprehensive-lab-analysis * {
              visibility: visible;
            }
            #comprehensive-lab-analysis {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            @page {
              margin: 1.5cm;
              size: A4;
            }
          }
        `}
      </style>
    </Box>
  );
}
