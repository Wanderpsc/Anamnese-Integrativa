import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Alert,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  LocalHospital as LocalHospitalIcon,
  Science as ScienceIcon,
  Healing as HealingIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

const AnaliseIntegrativa = () => {
  const [dadosExames, setDadosExames] = useState(null);
  const [analise, setAnalise] = useState(null);
  const [pacienteNome, setPacienteNome] = useState('');

  useEffect(() => {
    // Carregar dados dos exames do localStorage
    const examesData = localStorage.getItem('examesLaboratoriais');
    if (examesData) {
      const parsed = JSON.parse(examesData);
      setDadosExames(parsed);
      setPacienteNome(parsed.pacienteNome || 'Paciente');
      gerarAnalise(parsed);
    }
  }, []);

  const gerarAnalise = (dados) => {
    if (!dados || !dados.exames) return;

    const examesAlterados = dados.exames.filter(ex => 
      ex.resultadoPaciente && 
      ex.interpretacao && 
      !ex.interpretacao.includes('IDEAL')
    );

    const correlacoes = identificarCorrelacoes(examesAlterados);
    const diagnosticosPossiveis = gerarDiagnosticosPossiveis(correlacoes);
    const condutas = gerarCondutasIntegrativas(correlacoes, diagnosticosPossiveis);
    const resumo = gerarResumo(correlacoes, diagnosticosPossiveis);

    setAnalise({
      correlacoes,
      diagnosticosPossiveis,
      condutas,
      resumo,
      examesAlterados
    });
  };

  const identificarCorrelacoes = (examesAlterados) => {
    const correlacoes = [];

    // Verificar correlações de anemia
    const hemoglobina = examesAlterados.find(ex => ex.exame.includes('Hemoglobina'));
    const hemacias = examesAlterados.find(ex => ex.exame.includes('Hemácias'));
    const ferritina = examesAlterados.find(ex => ex.exame.includes('Ferritina'));
    
    if (hemoglobina && hemoglobina.interpretacao.includes('BAIXO')) {
      correlacoes.push({
        tipo: 'Anemia',
        gravidade: 'Moderada',
        examesRelacionados: ['Hemoglobina', 'Hematócrito', 'Ferritina', 'Ferro Sérico'],
        descricao: 'Padrão sugestivo de anemia ferropriva. Necessário investigar causas de perda ou má absorção de ferro.'
      });
    }

    // Verificar correlações inflamatórias
    const pcr = examesAlterados.find(ex => ex.exame.includes('PCR') || ex.exame.includes('Proteína C Reativa'));
    const vhs = examesAlterados.find(ex => ex.exame.includes('VHS'));
    const leucocitos = examesAlterados.find(ex => ex.exame.includes('Leucócitos'));

    if (pcr && pcr.interpretacao.includes('ALTO')) {
      correlacoes.push({
        tipo: 'Processo Inflamatório',
        gravidade: 'Ativo',
        examesRelacionados: ['PCR', 'VHS', 'Leucócitos', 'Fibrinogênio'],
        descricao: 'Marcadores inflamatórios elevados sugerem processo inflamatório sistêmico ativo.'
      });
    }

    // Verificar correlações metabólicas
    const glicose = examesAlterados.find(ex => ex.exame.includes('Glicose'));
    const hba1c = examesAlterados.find(ex => ex.exame.includes('Hemoglobina Glicada') || ex.exame.includes('HbA1c'));
    const insulina = examesAlterados.find(ex => ex.exame.includes('Insulina'));

    if (glicose && glicose.interpretacao.includes('ALTO')) {
      correlacoes.push({
        tipo: 'Disfunção Glicêmica',
        gravidade: 'Importante',
        examesRelacionados: ['Glicose', 'Hemoglobina Glicada', 'Insulina', 'Peptídeo C'],
        descricao: 'Alterações sugestivas de resistência à insulina ou diabetes. Necessário avaliar função pancreática.'
      });
    }

    // Verificar correlações lipídicas
    const colesterol = examesAlterados.find(ex => ex.exame.includes('Colesterol Total'));
    const ldl = examesAlterados.find(ex => ex.exame.includes('LDL'));
    const hdl = examesAlterados.find(ex => ex.exame.includes('HDL'));
    const triglicerideos = examesAlterados.find(ex => ex.exame.includes('Triglicerídeos'));

    if (ldl && ldl.interpretacao.includes('ALTO')) {
      correlacoes.push({
        tipo: 'Dislipidemia',
        gravidade: 'Moderada a Alta',
        examesRelacionados: ['Colesterol Total', 'LDL', 'HDL', 'Triglicerídeos', 'VLDL'],
        descricao: 'Perfil lipídico alterado com risco cardiovascular aumentado.'
      });
    }

    // Verificar correlações hepáticas
    const tgo = examesAlterados.find(ex => ex.exame.includes('TGO') || ex.exame.includes('AST'));
    const tgp = examesAlterados.find(ex => ex.exame.includes('TGP') || ex.exame.includes('ALT'));
    const ggt = examesAlterados.find(ex => ex.exame.includes('Gama GT') || ex.exame.includes('GGT'));

    if (tgp && tgp.interpretacao.includes('ALTO')) {
      correlacoes.push({
        tipo: 'Disfunção Hepática',
        gravidade: 'Leve a Moderada',
        examesRelacionados: ['TGO', 'TGP', 'Gama GT', 'Fosfatase Alcalina', 'Bilirrubinas'],
        descricao: 'Enzimas hepáticas elevadas sugerem sobrecarga ou lesão hepática. Investigar esteatose, medicamentos ou toxinas.'
      });
    }

    // Verificar correlações tireoidianas
    const tsh = examesAlterados.find(ex => ex.exame.includes('TSH'));
    const t4 = examesAlterados.find(ex => ex.exame.includes('T4'));
    const t3 = examesAlterados.find(ex => ex.exame.includes('T3'));

    if (tsh && (tsh.interpretacao.includes('ALTO') || tsh.interpretacao.includes('BAIXO'))) {
      correlacoes.push({
        tipo: 'Disfunção Tireoidiana',
        gravidade: 'Importante',
        examesRelacionados: ['TSH', 'T4 Livre', 'T3', 'Anti-TPO', 'Anti-Tireoglobulina'],
        descricao: tsh.interpretacao.includes('ALTO') ? 
          'TSH elevado sugere hipotireoidismo. Avaliar função tireoidiana completa e anticorpos.' :
          'TSH diminuído sugere hipertireoidismo. Investigar causas autoimunes ou nodulares.'
      });
    }

    // Verificar correlações renais
    const creatinina = examesAlterados.find(ex => ex.exame.includes('Creatinina'));
    const ureia = examesAlterados.find(ex => ex.exame.includes('Ureia') || ex.exame.includes('Uréia'));

    if (creatinina && creatinina.interpretacao.includes('ALTO')) {
      correlacoes.push({
        tipo: 'Disfunção Renal',
        gravidade: 'Importante',
        examesRelacionados: ['Creatinina', 'Ureia', 'Ácido Úrico', 'Potássio', 'Taxa de Filtração Glomerular'],
        descricao: 'Marcadores de função renal alterados. Necessário investigar causas e calcular taxa de filtração glomerular.'
      });
    }

    // Verificar deficiências vitamínicas
    const vitaminas = examesAlterados.filter(ex => 
      ex.exame.includes('Vitamina') || ex.exame.includes('Vit.')
    );

    if (vitaminas.length > 0) {
      correlacoes.push({
        tipo: 'Deficiências Vitamínicas',
        gravidade: 'Moderada',
        examesRelacionados: vitaminas.map(v => v.exame),
        descricao: `Deficiências de ${vitaminas.length} vitamina(s) identificadas. Investigar causas de má absorção e deficiência nutricional.`
      });
    }

    return correlacoes;
  };

  const gerarDiagnosticosPossiveis = (correlacoes) => {
    const diagnosticos = [];

    correlacoes.forEach(corr => {
      switch (corr.tipo) {
        case 'Anemia':
          diagnosticos.push({
            condicao: 'Anemia Ferropriva',
            probabilidade: 'Alta',
            descricao: 'Deficiência de ferro com comprometimento da produção de hemácias.',
            investigacoes: ['Pesquisa de sangue oculto nas fezes', 'Endoscopia digestiva', 'Colonoscopia', 'Avaliação ginecológica (mulheres)']
          });
          break;

        case 'Processo Inflamatório':
          diagnosticos.push({
            condicao: 'Inflamação Crônica de Baixo Grau',
            probabilidade: 'Moderada',
            descricao: 'Estado inflamatório persistente que pode estar relacionado a síndrome metabólica, obesidade ou doenças autoimunes.',
            investigacoes: ['FAN', 'Fator Reumatoide', 'Anti-CCP', 'Avaliação de composição corporal', 'Microbiota intestinal']
          });
          break;

        case 'Disfunção Glicêmica':
          diagnosticos.push({
            condicao: 'Resistência à Insulina / Pré-Diabetes',
            probabilidade: 'Alta',
            descricao: 'Metabolismo glicêmico comprometido com risco de evolução para diabetes tipo 2.',
            investigacoes: ['TOTG (Teste Oral de Tolerância à Glicose)', 'Insulina de jejum', 'HOMA-IR', 'Peptídeo C']
          });
          break;

        case 'Dislipidemia':
          diagnosticos.push({
            condicao: 'Dislipidemia Mista',
            probabilidade: 'Alta',
            descricao: 'Alterações no perfil lipídico com risco cardiovascular aumentado.',
            investigacoes: ['ApoA1 e ApoB', 'LDL oxidado', 'Lipoproteína(a)', 'Escore de cálcio coronariano']
          });
          break;

        case 'Disfunção Hepática':
          diagnosticos.push({
            condicao: 'Esteatose Hepática (Fígado Gorduroso)',
            probabilidade: 'Moderada a Alta',
            descricao: 'Acúmulo de gordura no fígado com possível inflamação (esteatohepatite).',
            investigacoes: ['Ultrassom de abdome superior', 'Elastografia hepática', 'Sorologias virais (Hepatites B e C)', 'Ferritina']
          });
          break;

        case 'Disfunção Tireoidiana':
          diagnosticos.push({
            condicao: 'Hipotireoidismo Subclínico ou Tireoidite Autoimune',
            probabilidade: 'Moderada',
            descricao: 'Alteração na função tireoidiana que pode evoluir para hipotireoidismo franco.',
            investigacoes: ['Anti-TPO', 'Anti-Tireoglobulina', 'Ultrassom de tireoide', 'T3 reverso']
          });
          break;

        case 'Disfunção Renal':
          diagnosticos.push({
            condicao: 'Doença Renal Crônica Inicial',
            probabilidade: 'Moderada',
            descricao: 'Comprometimento da função renal que requer monitoramento e intervenção precoce.',
            investigacoes: ['Urina tipo 1', 'Microalbuminúria', 'Proteinúria de 24h', 'Ultrassom de rins e vias urinárias']
          });
          break;

        case 'Deficiências Vitamínicas':
          diagnosticos.push({
            condicao: 'Síndrome de Má Absorção / Deficiências Nutricionais',
            probabilidade: 'Moderada',
            descricao: 'Múltiplas deficiências vitamínicas sugerindo problema de absorção intestinal ou dieta inadequada.',
            investigacoes: ['Avaliação da microbiota intestinal', 'Teste de permeabilidade intestinal', 'Avaliação nutricional completa', 'Calprotectina fecal']
          });
          break;

        default:
          break;
      }
    });

    return diagnosticos;
  };

  const gerarCondutasIntegrativas = (correlacoes, diagnosticos) => {
    const condutas = [];

    correlacoes.forEach(corr => {
      switch (corr.tipo) {
        case 'Anemia':
          condutas.push({
            titulo: 'CONDUTA PARA ANEMIA FERROPRIVA',
            fitoterapia: [
              'Urtica dioica (Urtiga) 300mg - 2x ao dia (remineralizante)',
              'Taraxacum officinale (Dente-de-leão) 200mg - 2x ao dia (melhora absorção)',
              'Spirulina 500mg - 3x ao dia (rica em ferro biodisponível)',
            ],
            suplementacao: [
              'Ferro quelato 30mg - 1x ao dia em jejum',
              'Vitamina C 500mg - junto com ferro (aumenta absorção)',
              'Vitamina B12 1000mcg sublingual - 1x ao dia',
              'Ácido fólico 400mcg - 1x ao dia',
            ],
            alimentacao: [
              'Aumentar: vegetais verde-escuros, beterraba, feijão, lentilha',
              'Consumir frutas cítricas nas refeições (vitamina C)',
              'Evitar: chá preto, café, leite durante refeições (inibem absorção)',
              'Incluir: suco de uva integral, melado de cana, castanhas',
            ],
            terapiasComplementares: [
              'Acupuntura para estimular produção de células sanguíneas',
              'Florais: Olive (fadiga), Hornbeam (vigor)',
              'Aromaterapia: Óleo essencial de alecrim (estimulante circulatório)',
            ]
          });
          break;

        case 'Processo Inflamatório':
          condutas.push({
            titulo: 'CONDUTA ANTI-INFLAMATÓRIA NATUROPÁTICA',
            fitoterapia: [
              'Curcuma longa (Cúrcuma) 500mg - 3x ao dia com pimenta preta',
              'Boswellia serrata 400mg - 2x ao dia',
              'Zingiber officinale (Gengibre) 300mg - 3x ao dia',
              'Omega-3 (EPA/DHA) 2g - 1x ao dia',
            ],
            suplementacao: [
              'Vitamina D3 5000 UI - 1x ao dia',
              'Magnésio dimalato 400mg - à noite',
              'Probióticos 10 bilhões UFC - 1x ao dia',
              'Quercetina 500mg - 2x ao dia',
            ],
            alimentacao: [
              'Dieta anti-inflamatória: aumentar vegetais coloridos',
              'Reduzir: açúcar, glúten, laticínios, carnes processadas',
              'Aumentar: peixes, azeite, frutas vermelhas, chá verde',
              'Incluir: cúrcuma, gengibre, alho, cebola nas preparações',
            ],
            terapiasComplementares: [
              'Hidroterapia: banhos de contraste',
              'Geoterapia: cataplasmas de argila nas áreas inflamadas',
              'Jejum intermitente 16/8',
              'Meditação e técnicas de redução de estresse',
            ]
          });
          break;

        case 'Disfunção Glicêmica':
          condutas.push({
            titulo: 'CONDUTA PARA CONTROLE GLICÊMICO',
            fitoterapia: [
              'Gymnema sylvestre 400mg - antes das refeições',
              'Morus nigra (Amora) 200mg - 2x ao dia',
              'Phaseolus vulgaris (Feijão branco) 500mg - antes refeições principais',
              'Canela 1g - 2x ao dia',
            ],
            suplementacao: [
              'Cromo picolinato 200mcg - 1x ao dia',
              'Ácido alfa-lipoico 300mg - 2x ao dia',
              'Magnésio 400mg - à noite',
              'Berberina 500mg - 3x ao dia',
            ],
            alimentacao: [
              'Dieta baixa em carboidratos refinados',
              'Priorizar: cereais integrais, leguminosas, vegetais',
              'Aumentar fibras: 30-40g por dia',
              'Evitar: refrigerantes, sucos industrializados, doces',
              'Distribuir carboidratos ao longo do dia',
            ],
            terapiasComplementares: [
              'Exercícios físicos 150min/semana (caminhada, musculação)',
              'Acupuntura para regulação metabólica',
              'Controle do estresse (cortisol interfere na glicemia)',
              'Sono adequado (7-8h por noite)',
            ]
          });
          break;

        case 'Dislipidemia':
          condutas.push({
            titulo: 'CONDUTA PARA DISLIPIDEMIA',
            fitoterapia: [
              'Cynara scolymus (Alcachofra) 400mg - 3x ao dia',
              'Allium sativum (Alho) 500mg - 2x ao dia',
              'Chá verde 300mg EGCG - 2x ao dia',
              'Berberis vulgaris (Berberina) 500mg - 2x ao dia',
            ],
            suplementacao: [
              'Omega-3 (EPA/DHA) 2-3g - 1x ao dia',
              'Coenzima Q10 100mg - 1x ao dia',
              'Niacina 500mg - 1x ao dia (com acompanhamento)',
              'Lecitina de soja 1200mg - 2x ao dia',
            ],
            alimentacao: [
              'Aumentar: peixes gordos, azeite extra-virgem, nozes, abacate',
              'Reduzir: gorduras trans, frituras, embutidos',
              'Incluir: aveia, linhaça, chia (fibras solúveis)',
              'Consumir: alho cru, cebola, gengibre',
              'Limitar carnes vermelhas a 1-2x/semana',
            ],
            terapiasComplementares: [
              'Exercícios aeróbicos 30min/dia',
              'Auriculoterapia para controle de apetite',
              'Controle do peso corporal',
              'Redução do estresse (yoga, meditação)',
            ]
          });
          break;

        case 'Disfunção Hepática':
          condutas.push({
            titulo: 'CONDUTA HEPATOPROTETORA',
            fitoterapia: [
              'Silybum marianum (Cardo mariano) 200mg - 3x ao dia',
              'Taraxacum officinale (Dente-de-leão) 300mg - 2x ao dia',
              'Cynara scolymus (Alcachofra) 400mg - 3x ao dia',
              'Schisandra chinensis 300mg - 2x ao dia',
            ],
            suplementacao: [
              'SAMe 400mg - 2x ao dia',
              'NAC (N-Acetilcisteína) 600mg - 2x ao dia',
              'Vitamina E 400 UI - 1x ao dia',
              'Colina 500mg - 2x ao dia',
            ],
            alimentacao: [
              'Dieta detoxificante hepática',
              'Aumentar: crucíferas (brócolis, couve), beterraba, limão',
              'Reduzir: álcool (eliminar), açúcar, gorduras saturadas',
              'Incluir: água de coco, chá verde, suco de couve',
              'Jejum intermitente (permite autofagia hepática)',
            ],
            terapiasComplementares: [
              'Hidroterapia: compressas quentes no fígado',
              'Geoterapia: cataplasma de argila sobre hipocôndrio direito',
              'Lavagem intestinal (hidrocolonterapia)',
              'Sauna para eliminação de toxinas',
            ]
          });
          break;

        case 'Disfunção Tireoidiana':
          condutas.push({
            titulo: 'CONDUTA PARA TIREOIDE',
            fitoterapia: [
              'Ashwagandha 300mg - 2x ao dia (adaptógeno)',
              'Fucus vesiculosus (rico em iodo) 200mg - 1x ao dia',
              'Schisandra chinensis 300mg - 2x ao dia',
              'Rodiola rosea 200mg - pela manhã',
            ],
            suplementacao: [
              'Selênio 200mcg - 1x ao dia',
              'Zinco quelato 30mg - 1x ao dia',
              'Vitamina D3 5000 UI - 1x ao dia',
              'Magnésio 400mg - à noite',
              'Iodo (se deficiente) 150mcg - 1x ao dia',
            ],
            alimentacao: [
              'Aumentar: castanha-do-pará (selênio), peixes, algas',
              'Evitar: soja em excesso, glúten (se Hashimoto)',
              'Reduzir: crucíferas cruas em excesso (bociogênicas)',
              'Suplementar iodo se necessário (com acompanhamento)',
            ],
            terapiasComplementares: [
              'Controle do estresse (afeta eixo HPA-tireoide)',
              'Yoga e meditação',
              'Sono adequado',
              'Exercícios moderados (evitar overtraining)',
            ]
          });
          break;

        case 'Disfunção Renal':
          condutas.push({
            titulo: 'CONDUTA NEFROPROTETORA',
            fitoterapia: [
              'Urtica dioica (Urtiga) 300mg - 2x ao dia',
              'Equisetum arvense (Cavalinha) 200mg - 2x ao dia',
              'Taraxacum officinale (Dente-de-leão) 300mg - 2x ao dia',
              'Hibiscus sabdariffa (Hibisco) chá 3x ao dia',
            ],
            suplementacao: [
              'Omega-3 2g - 1x ao dia',
              'Coenzima Q10 100mg - 1x ao dia',
              'Vitamina D3 (se deficiente) 5000 UI - 1x ao dia',
              'Probióticos - 1x ao dia',
            ],
            alimentacao: [
              'Reduzir proteína animal (1g/kg peso/dia)',
              'Aumentar hidratação: 2-3L água/dia',
              'Reduzir sódio: <2g/dia',
              'Controlar potássio e fósforo (se necessário)',
              'Aumentar: vegetais, frutas, cereais integrais',
            ],
            terapiasComplementares: [
              'Hidroterapia renal',
              'Controle da pressão arterial',
              'Controle glicêmico rigoroso',
              'Evitar anti-inflamatórios e nefrotóxicos',
            ]
          });
          break;

        case 'Deficiências Vitamínicas':
          condutas.push({
            titulo: 'CONDUTA PARA REPOSIÇÃO VITAMÍNICA',
            fitoterapia: [
              'Spirulina 1g - 2x ao dia (multivitamínico natural)',
              'Alfafa (Medicago sativa) 500mg - 2x ao dia',
              'Açaí em pó 2 colheres/dia (antioxidantes)',
              'Chlorella 500mg - 2x ao dia (desintoxicante)',
            ],
            suplementacao: [
              'Complexo B - 1x ao dia',
              'Vitamina D3 5000-10000 UI - 1x ao dia',
              'Vitamina C 1g - 2x ao dia',
              'Magnésio 400mg - à noite',
              'Zinco 30mg - 1x ao dia',
            ],
            alimentacao: [
              'Dieta variada e colorida',
              'Aumentar: vegetais verde-escuros, frutas, cereais integrais',
              'Incluir: sementes, castanhas, ovos, peixes',
              'Avaliar disbiose intestinal (prejudica absorção)',
            ],
            terapiasComplementares: [
              'Investigar saúde intestinal',
              'Probióticos e prebióticos',
              'Enzimas digestivas se necessário',
              'Avaliar exposição solar para vitamina D',
            ]
          });
          break;

        default:
          break;
      }
    });

    return condutas;
  };

  const gerarResumo = (correlacoes, diagnosticos) => {
    if (!correlacoes.length) {
      return {
        titulo: 'AVALIAÇÃO GERAL',
        texto: 'Exames laboratoriais dentro dos padrões ideais. Manter hábitos saudáveis e acompanhamento preventivo.',
        prioridades: ['Manutenção da saúde', 'Prevenção de doenças', 'Qualidade de vida']
      };
    }

    const prioridades = correlacoes.map(c => c.tipo);
    const gravidades = correlacoes.filter(c => c.gravidade.includes('Alta') || c.gravidade.includes('Importante'));

    return {
      titulo: 'RESUMO EXECUTIVO DA ANÁLISE INTEGRATIVA',
      texto: `Identificadas ${correlacoes.length} alteração(ões) significativa(s) nos exames laboratoriais, sugerindo ${diagnosticos.length} possível(is) condição(ões) clínica(s) que requerem atenção. ${gravidades.length > 0 ? 'Algumas alterações apresentam gravidade importante e devem ser priorizadas no tratamento.' : 'As alterações encontradas são de gravidade leve a moderada.'} A abordagem naturopática integrativa proposta combina fitoterapia, suplementação nutricional, dietoterapia e terapias complementares para restaurar o equilíbrio orgânico e promover a saúde.`,
      prioridades,
      alertas: gravidades.map(g => `⚠️ ${g.tipo}: ${g.descricao}`)
    };
  };

  const handleImprimir = () => {
    window.print();
  };

  if (!dadosExames) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">
          Nenhum dado de exames encontrado. Por favor, preencha os exames laboratoriais primeiro.
        </Alert>
      </Box>
    );
  }

  if (!analise) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Gerando análise integrativa...
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: '1400px', margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon fontSize="large" />
          ANÁLISE INTEGRATIVA DE EXAMES LABORATORIAIS
        </Typography>
        <Typography variant="h6">
          Interagente: {pacienteNome}
        </Typography>
        <Typography variant="body2">
          Data: {new Date().toLocaleDateString('pt-BR')}
        </Typography>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handleImprimir}
          sx={{ mt: 2, bgcolor: 'white', color: '#764ba2', '&:hover': { bgcolor: '#f5f5f5' } }}
        >
          Imprimir Análise
        </Button>
      </Paper>

      {/* RESUMO EXECUTIVO */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#fff3e0', borderLeft: '5px solid #ff9800' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#ff9800', display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalHospitalIcon />
          {analise.resumo.titulo}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
          {analise.resumo.texto}
        </Typography>
        {analise.resumo.alertas && analise.resumo.alertas.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              Alertas Importantes:
            </Typography>
            {analise.resumo.alertas.map((alerta, idx) => (
              <Alert key={idx} severity="warning" sx={{ mb: 1 }}>
                {alerta}
              </Alert>
            ))}
          </Box>
        )}
      </Paper>

      {/* CORRELAÇÕES IDENTIFICADAS */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
          <ScienceIcon />
          CORRELAÇÕES IDENTIFICADAS NOS EXAMES
        </Typography>
        <Grid container spacing={2}>
          {analise.correlacoes.map((corr, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                    {corr.tipo}
                  </Typography>
                  <Chip 
                    label={`Gravidade: ${corr.gravidade}`} 
                    color={corr.gravidade.includes('Alta') || corr.gravidade.includes('Importante') ? 'error' : 'warning'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {corr.descricao}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block', mb: 0.5 }}>
                    Exames Relacionados:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {corr.examesRelacionados.map((exame, i) => (
                      <Chip key={i} label={exame} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* DIAGNÓSTICOS POSSÍVEIS */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: '#e3f2fd' }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
          <LocalHospitalIcon />
          POSSÍVEIS DIAGNÓSTICOS E INVESTIGAÇÕES COMPLEMENTARES
        </Typography>
        {analise.diagnosticosPossiveis.map((diag, idx) => (
          <Card key={idx} elevation={2} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#1976d2', mb: 1 }}>
                {diag.condicao}
              </Typography>
              <Chip 
                label={`Probabilidade: ${diag.probabilidade}`} 
                color={diag.probabilidade === 'Alta' ? 'error' : 'warning'}
                size="small"
                sx={{ mb: 1 }}
              />
              <Typography variant="body2" sx={{ mb: 2 }}>
                {diag.descricao}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                📋 Investigações Complementares Sugeridas:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {diag.investigacoes.map((inv, i) => (
                  <li key={i}>
                    <Typography variant="body2">{inv}</Typography>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </Paper>

      {/* CONDUTAS TERAPÊUTICAS INTEGRATIVAS */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 }}>
          <HealingIcon />
          CONDUTA TERAPÊUTICA INTEGRATIVA / ABORDAGEM NATUROPÁTICA
        </Typography>
        {analise.condutas.map((conduta, idx) => (
          <Card key={idx} elevation={2} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#2e7d32', mb: 2, fontWeight: 'bold' }}>
                {conduta.titulo}
              </Typography>

              {/* FITOTERAPIA */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#388e3c', mb: 1 }}>
                  🌿 FITOTERAPIA
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {conduta.fitoterapia.map((fito, i) => (
                    <li key={i}>
                      <Typography variant="body2">{fito}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* SUPLEMENTAÇÃO */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#1976d2', mb: 1 }}>
                  💊 SUPLEMENTAÇÃO NUTRICIONAL
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {conduta.suplementacao.map((sup, i) => (
                    <li key={i}>
                      <Typography variant="body2">{sup}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* ALIMENTAÇÃO */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#f57c00', mb: 1 }}>
                  🍎 ORIENTAÇÕES ALIMENTARES
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {conduta.alimentacao.map((alim, i) => (
                    <li key={i}>
                      <Typography variant="body2">{alim}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>

              {/* TERAPIAS COMPLEMENTARES */}
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#7b1fa2', mb: 1 }}>
                  ✨ TERAPIAS COMPLEMENTARES
                </Typography>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {conduta.terapiasComplementares.map((terapia, i) => (
                    <li key={i}>
                      <Typography variant="body2">{terapia}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Paper>

      {/* RODAPÉ COM RECEITUÁRIO */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#f5f5f5', borderTop: '3px solid #764ba2' }} className="no-print">
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          📝 ORIENTAÇÕES FINAIS
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <strong>IMPORTANTE:</strong> Este relatório é uma análise integrativa baseada nos exames laboratoriais apresentados. 
          As recomendações devem ser individualizadas conforme avaliação clínica completa. 
          Consulte sempre um profissional de saúde qualificado antes de iniciar qualquer tratamento.
        </Alert>
        <Alert severity="warning">
          <strong>CONTRAINDICAÇÕES:</strong> Gestantes, lactantes, crianças menores de 12 anos e pessoas com alergias conhecidas 
          devem ter atenção especial às prescrições fitoterápicas. Informe seu terapeuta sobre todos os medicamentos em uso.
        </Alert>
      </Paper>
    </Box>
  );
};

export default AnaliseIntegrativa;
