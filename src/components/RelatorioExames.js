import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ExpandMore as ExpandMoreIcon,
  Print as PrintIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  LocalHospital as HospitalIcon,
  Science as ScienceIcon,
  Assessment as AssessmentIcon,
  Healing as HealingIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const RelatorioExames = () => {
  const navigate = useNavigate();
  const [examesPreenchidos, setExamesPreenchidos] = useState([]);
  const [indicesCalculados, setIndicesCalculados] = useState({});
  const [diagnosticos, setDiagnosticos] = useState([]);

  useEffect(() => {
    // Buscar exames salvos no localStorage
    const examesSalvos = JSON.parse(localStorage.getItem('examesLaboratoriais') || '[]');
    const preenchidos = examesSalvos.filter(e => e.resultadoPaciente && e.resultadoPaciente.trim() !== '');
    setExamesPreenchidos(preenchidos);
    
    // Calcular todos os índices
    calcularIndices(preenchidos);
  }, []);

  const getValorExame = (nomeExame) => {
    const exame = examesPreenchidos.find(e => 
      e.exame.toLowerCase().includes(nomeExame.toLowerCase())
    );
    return exame ? parseFloat(exame.resultadoPaciente) : null;
  };

  const calcularIndices = (exames) => {
    const indices = {};
    const diag = [];

    // 1. PERFIL LIPÍDICO
    const colTotal = getValorExame('colesterol total');
    const hdl = getValorExame('hdl');
    const ldl = getValorExame('ldl');
    const tg = getValorExame('triglicerídeos') || getValorExame('triglicerideos');

    if (colTotal && hdl) {
      const castelli1 = (colTotal / hdl).toFixed(2);
      indices.castelli1 = {
        valor: castelli1,
        nome: 'Índice de Castelli I (Col.Total/HDL)',
        ideal: '< 3.5',
        status: castelli1 < 3.5 ? 'otimo' : castelli1 < 4.5 ? 'atencao' : 'alerta',
        interpretacao: castelli1 < 3.5 
          ? 'Risco cardiovascular baixo. Excelente relação entre colesterol total e HDL.'
          : castelli1 < 4.5
          ? 'Risco cardiovascular moderado. Sugere que há mais partículas aterogênicas circulantes.'
          : 'Risco cardiovascular elevado. Alto potencial de formação de placas ateroscleróticas.'
      };
    }

    if (ldl && hdl) {
      const castelli2 = (ldl / hdl).toFixed(2);
      indices.castelli2 = {
        valor: castelli2,
        nome: 'Índice de Castelli II (LDL/HDL)',
        ideal: '< 2.5',
        status: castelli2 < 2.5 ? 'otimo' : castelli2 < 3.5 ? 'atencao' : 'alerta',
        interpretacao: castelli2 < 2.5
          ? 'Equilíbrio adequado entre transporte e remoção de colesterol.'
          : castelli2 < 3.5
          ? 'Desequilíbrio moderado. Recomenda-se otimizar HDL e reduzir LDL oxidado.'
          : 'Risco elevado de aterosclerose. Intervenção nutricional urgente.'
      };
    }

    if (tg && hdl) {
      const tgHdl = (tg / hdl).toFixed(2);
      indices.tgHdl = {
        valor: tgHdl,
        nome: 'Relação TG/HDL',
        ideal: '< 2.0',
        status: tgHdl < 2.0 ? 'otimo' : tgHdl < 3.0 ? 'atencao' : 'alerta',
        interpretacao: tgHdl < 2.0
          ? 'Excelente sensibilidade à insulina. Baixo risco de LDL pequeno e denso.'
          : tgHdl < 3.0
          ? 'FORTE INDICATIVO DE RESISTÊNCIA À INSULINA. Provável presença de LDL pequenas e densas (mais inflamatórias).'
          : 'RESISTÊNCIA INSULÍNICA SEVERA. Alto risco de Síndrome Metabólica e Diabetes tipo 2.'
      };
      
      if (tgHdl >= 2.0) {
        diag.push({
          tipo: 'Resistência à Insulina',
          severidade: tgHdl >= 3.0 ? 'alta' : 'moderada',
          evidencias: [`TG/HDL = ${tgHdl} (ideal < 2.0)`],
          recomendacoes: [
            'Redução de carboidratos refinados e açúcares',
            'Aumento da massa muscular (treino resistido)',
            'Suplementação: Berberina 500mg 2x/dia, Cromo 200-400mcg/dia',
            'Magnésio Inositol 300mg/dia',
            'Ômega-3 (2-3g/dia) para reduzir triglicerídeos'
          ]
        });
      }
    }

    if (colTotal && hdl) {
      const naoHdl = (colTotal - hdl).toFixed(2);
      indices.naoHdl = {
        valor: naoHdl,
        nome: 'Colesterol não-HDL',
        ideal: '< 130 mg/dL',
        status: naoHdl < 130 ? 'otimo' : naoHdl < 160 ? 'atencao' : 'alerta',
        interpretacao: 'Reflete a carga total de lipoproteínas aterogênicas (VLDL, IDL e LDL).'
      };
    }

    // 2. METABOLISMO GLICÊMICO E INSULÍNICO
    const glicose = getValorExame('glicemia em jejum') || getValorExame('glicose');
    const insulina = getValorExame('insulina em jejum') || getValorExame('insulina');

    if (glicose && insulina) {
      const homaIr = ((glicose * insulina) / 405).toFixed(2);
      indices.homaIr = {
        valor: homaIr,
        nome: 'HOMA-IR (Resistência à Insulina)',
        ideal: '< 2.0',
        status: homaIr < 2.0 ? 'otimo' : homaIr < 2.7 ? 'atencao' : 'alerta',
        interpretacao: homaIr < 2.0
          ? 'Sensibilidade insulínica adequada.'
          : homaIr < 2.7
          ? 'RESISTÊNCIA À INSULINA MODERADA. Pâncreas começando a se sobrecarregar.'
          : 'RESISTÊNCIA À INSULINA SEVERA. Alto risco de progressão para Diabetes tipo 2.'
      };

      if (homaIr >= 2.0) {
        const existente = diag.find(d => d.tipo === 'Resistência à Insulina');
        if (existente) {
          existente.evidencias.push(`HOMA-IR = ${homaIr} (ideal < 2.0)`);
        } else {
          diag.push({
            tipo: 'Resistência à Insulina',
            severidade: homaIr >= 2.7 ? 'alta' : 'moderada',
            evidencias: [`HOMA-IR = ${homaIr} (ideal < 2.0)`],
            recomendacoes: [
              'Jejum intermitente (16/8 após liberação médica)',
              'Redução drástica de carboidratos de alto índice glicêmico',
              'Atividade física regular (mínimo 150min/semana)',
              'Suplementação: Berberina, Cromo, Magnésio',
              'Controle de cortisol e estresse'
            ]
          });
        }
      }
    }

    if (tg && glicose) {
      const tyg = (Math.log(tg * glicose / 2)).toFixed(2);
      indices.tyg = {
        valor: tyg,
        nome: 'TyG Index (Triglicerídeos-Glicose)',
        ideal: '< 4.5',
        status: tyg < 4.5 ? 'otimo' : tyg < 4.7 ? 'atencao' : 'alerta',
        interpretacao: 'Marcador alternativo de resistência à insulina periférica quando insulina não foi dosada.'
      };
    }

    // 3. PROTEÍNAS E INFLAMAÇÃO
    const albumina = getValorExame('albumina');
    const globulina = getValorExame('globulina');
    const pcr = getValorExame('pcr') || getValorExame('proteína c-reativa');
    const ferritina = getValorExame('ferritina');

    if (albumina && globulina) {
      const albGlob = (albumina / globulina).toFixed(2);
      indices.albGlob = {
        valor: albGlob,
        nome: 'Relação Albumina/Globulina',
        ideal: '1.5 - 2.0',
        status: albGlob >= 1.5 && albGlob <= 2.0 ? 'otimo' : albGlob < 1.2 ? 'alerta' : 'atencao',
        interpretacao: albGlob < 1.2
          ? 'INFLAMAÇÃO CRÔNICA OU DISBIOSE. Globulinas elevadas sugerem resposta imune ativa.'
          : albGlob > 2.0
          ? 'Possível baixa síntese proteica ou desnutrição.'
          : 'Equilíbrio adequado entre síntese e resposta imune.'
      };

      if (albGlob < 1.2) {
        diag.push({
          tipo: 'Inflamação Crônica / Disbiose',
          severidade: 'moderada',
          evidencias: [`Alb/Glob = ${albGlob} (ideal 1.5-2.0)`],
          recomendacoes: [
            'Investigar saúde intestinal (teste de permeabilidade)',
            'Probióticos de amplo espectro',
            'Glutamina 5g/dia para reparar mucosa intestinal',
            'Dieta anti-inflamatória (eliminar glúten/laticínios por 30 dias)',
            'Cúrcuma + Pimenta preta ou Boswellia'
          ]
        });
      }
    }

    if (pcr && ferritina) {
      if (pcr > 1.0 && ferritina > 150) {
        diag.push({
          tipo: 'Inflamação Sistêmica de Baixo Grau',
          severidade: 'moderada',
          evidencias: [
            `PCR = ${pcr} mg/L (ideal < 1.0)`,
            `Ferritina = ${ferritina} ng/mL (alta com PCR elevada indica inflamação, não estoque de ferro)`
          ],
          recomendacoes: [
            'Investigar fontes de inflamação (dental, intestinal, alimentar)',
            'N-Acetilcisteína (NAC) 600-1200mg/dia',
            'Ômega-3 de alta potência (EPA > DHA)',
            'Vitamina D (alvo 60-80 ng/mL)',
            'Reduzir alimentos pró-inflamatórios'
          ]
        });
      }
    }

    // 4. FUNÇÃO HEPÁTICA
    const tgo = getValorExame('tgo') || getValorExame('ast');
    const tgp = getValorExame('tgp') || getValorExame('alt');
    const ggt = getValorExame('gama-gt') || getValorExame('ggt');

    if (tgo && tgp) {
      const deRitis = (tgo / tgp).toFixed(2);
      indices.deRitis = {
        valor: deRitis,
        nome: 'Relação de De Ritis (TGO/TGP)',
        ideal: '≈ 1.0',
        status: Math.abs(deRitis - 1.0) < 0.3 ? 'otimo' : 'atencao',
        interpretacao: tgp > tgo
          ? 'TGP > TGO sugere ESTEATOSE HEPÁTICA (gordura no fígado) ou distúrbio metabólico.'
          : tgo > tgp
          ? 'TGO > TGP pode indicar dano muscular, consumo de álcool ou hepatite crônica.'
          : 'Relação equilibrada.'
      };

      if (tgp > tgo) {
        diag.push({
          tipo: 'Esteatose Hepática Não Alcoólica (Provável)',
          severidade: 'moderada',
          evidencias: [`TGP/TGO = ${(tgp/tgo).toFixed(2)} (TGP > TGO)`],
          recomendacoes: [
            'Redução de gordura visceral (essencial)',
            'Eliminar frutose e açúcares adicionados',
            'Suplementação: Silimarina 200-400mg/dia',
            'N-Acetilcisteína (NAC) para glutationa',
            'Alcachofra antes das refeições',
            'Colina e Metionina (lipotropicos)'
          ]
        });
      }
    }

    if (ggt && ggt > 25) {
      diag.push({
        tipo: 'Estresse Oxidativo / Sobrecarga de Destoxificação',
        severidade: 'moderada',
        evidencias: [`GGT = ${ggt} U/L (ideal < 25)`],
        recomendacoes: [
          'Aumentar antioxidantes naturais (vegetais crucíferos)',
          'N-Acetilcisteína 600mg 2x/dia',
          'Reduzir exposição a toxinas (álcool, medicamentos, poluição)',
          'Suporte com Complexo B metilado',
          'Milk Thistle (Cardo Mariano)'
        ]
      });
    }

    // 5. TIREOIDE
    const tsh = getValorExame('tsh');
    const t4livre = getValorExame('t4 livre');
    const t3livre = getValorExame('t3 livre');

    if (t3livre && t4livre) {
      const t3t4 = (t3livre / t4livre).toFixed(3);
      indices.t3t4 = {
        valor: t3t4,
        nome: 'Relação T3 Livre / T4 Livre',
        ideal: '> 0.25',
        status: t3t4 > 0.25 ? 'otimo' : 'atencao',
        interpretacao: t3t4 < 0.25
          ? 'BAIXA CONVERSÃO de T4 em T3. Possível deficiência de Selênio, Zinco ou excesso de Cortisol.'
          : 'Conversão periférica adequada.'
      };

      if (t3t4 < 0.25 || (tsh && tsh > 2.5)) {
        diag.push({
          tipo: 'Hipotireoidismo Funcional / Subclínico',
          severidade: 'moderada',
          evidencias: [
            tsh > 2.5 ? `TSH = ${tsh} mUI/L (ideal < 2.5 na visão funcional)` : null,
            t3t4 < 0.25 ? `Relação T3/T4 baixa (${t3t4})` : null
          ].filter(Boolean),
          recomendacoes: [
            'Suplementação: Selênio 100-200mcg/dia (essencial para conversão)',
            'Zinco quelado 15-30mg/dia',
            'Iodo (avaliar com cuidado, dose individualizada)',
            'L-Tirosina 500mg/dia',
            'Reduzir alimentos bociogênicos crus (brócolis, couve)',
            'Controlar estresse para reduzir cortisol'
          ]
        });
      }
    }

    // 6. FUNÇÃO RENAL E HIDRATAÇÃO
    const ureia = getValorExame('ureia');
    const creatinina = getValorExame('creatinina');

    if (ureia && creatinina) {
      const ureiaCreat = (ureia / creatinina).toFixed(2);
      indices.ureiaCreat = {
        valor: ureiaCreat,
        nome: 'Relação Ureia/Creatinina',
        ideal: '20 - 30',
        status: ureiaCreat >= 20 && ureiaCreat <= 30 ? 'otimo' : 'atencao',
        interpretacao: ureiaCreat > 30
          ? 'Possível desidratação, dieta hiperproteica ou catabolismo muscular.'
          : ureiaCreat < 20
          ? 'Possível baixa ingestão proteica ou disfunção hepática.'
          : 'Hidratação e metabolismo proteico adequados.'
      };
    }

    // 7. HEMATOLOGIA E INFLAMAÇÃO
    const neutrofilos = getValorExame('neutrófilos (absoluto)') || getValorExame('neutrofilos');
    const linfocitos = getValorExame('linfócitos (absoluto)') || getValorExame('linfocitos');

    if (neutrofilos && linfocitos) {
      const rnl = (neutrofilos / linfocitos).toFixed(2);
      indices.rnl = {
        valor: rnl,
        nome: 'Relação Neutrófilos/Linfócitos (RNL)',
        ideal: '1.2 - 2.0',
        status: rnl >= 1.2 && rnl <= 2.0 ? 'otimo' : rnl > 3.0 ? 'alerta' : 'atencao',
        interpretacao: rnl > 3.0
          ? 'INFLAMAÇÃO SISTÊMICA SEVERA ou ESTRESSE CRÔNICO. Cortisol elevado suprime linfócitos.'
          : rnl > 2.0
          ? 'Estresse metabólico ou resposta inflamatória ativa.'
          : 'Balanço imunológico adequado.'
      };

      if (rnl > 3.0) {
        diag.push({
          tipo: 'Estresse Adrenal / Inflamação Sistêmica',
          severidade: 'alta',
          evidencias: [`RNL = ${rnl} (ideal 1.2-2.0)`],
          recomendacoes: [
            'Ashwagandha KSM-66 300-600mg/dia',
            'Vitamina C 500mg-1g/dia',
            'Fosfatidilserina 100-300mg à noite',
            'Técnicas de redução de estresse (meditação, respiração)',
            'Avaliar cortisol salivar (4 pontos)',
            'Higiene do sono (essencial)'
          ]
        });
      }
    }

    // 8. ANEMIA E MICRONUTRIENTES
    const vcm = getValorExame('vcm');
    const b12 = getValorExame('vitamina b12');
    const folato = getValorExame('ácido fólico') || getValorExame('folato');
    const homocisteina = getValorExame('homocisteína') || getValorExame('homocisteina');

    if (vcm) {
      if (vcm > 100) {
        diag.push({
          tipo: 'Anemia Megaloblástica (Provável)',
          severidade: 'moderada',
          evidencias: [`VCM = ${vcm} fL (> 100 indica hemácias grandes)`],
          recomendacoes: [
            'Investigar B12 e Folato',
            'B12 Metilcobalamina 1000mcg sublingual',
            'Metilfolato 400-800mcg/dia',
            'Investigar causa (má absorção, gastrite, uso de IBP)',
            'Considerar teste de ácido metilmalônico'
          ]
        });
      } else if (vcm < 80) {
        diag.push({
          tipo: 'Anemia Ferropriva ou Talassemia (Provável)',
          severidade: 'moderada',
          evidencias: [`VCM = ${vcm} fL (< 80 indica hemácias pequenas)`],
          recomendacoes: [
            'Investigar Ferritina, Ferro sérico e Transferrina',
            'Se ferritina < 30: Suplementar Ferro bisglicinato 30mg/dia',
            'Vitamina C junto ao ferro (melhora absorção)',
            'Investigar perda sanguínea oculta',
            'Avaliar saúde digestiva'
          ]
        });
      }
    }

    if (b12 && b12 < 450) {
      diag.push({
        tipo: 'Deficiência Funcional de B12',
        severidade: 'moderada',
        evidencias: [`B12 = ${b12} pg/mL (ideal > 450 na visão funcional)`],
        recomendacoes: [
          'B12 Metilcobalamina 1000-2000mcg/dia',
          'Investigar causa: vegetarianismo, gastrite, uso de metformina/IBP',
          'Avaliar homocisteína (se alta, confirma deficiência funcional)',
          'Considerar injeções IM se absorção muito comprometida'
        ]
      });
    }

    if (homocisteina && homocisteina > 10) {
      diag.push({
        tipo: 'Hiperhomocisteinemia / Risco Cardiovascular',
        severidade: homocisteina > 15 ? 'alta' : 'moderada',
        evidencias: [`Homocisteína = ${homocisteina} µmol/L (ideal 7-9)`],
        recomendacoes: [
          'Complexo B METILADO (Metilfolato + Metilcobalamina + P5P)',
          'B6 (P5P) 25-50mg/dia',
          'B12 1000mcg + Folato 400-800mcg',
          'Betaína (TMG) 500-1000mg/dia',
          'Reduzir consumo de metionina (carnes vermelhas em excesso)',
          'Risco aumentado para trombose e eventos cardiovasculares'
        ]
      });
    }

    setIndicesCalculados(indices);
    setDiagnosticos(diag);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'otimo': return 'success';
      case 'atencao': return 'warning';
      case 'alerta': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'otimo': return <CheckCircleIcon />;
      case 'atencao': return <WarningIcon />;
      case 'alerta': return <ErrorIcon />;
      default: return <InfoIcon />;
    }
  };

  const getSeveridadeColor = (severidade) => {
    switch (severidade) {
      case 'alta': return 'error';
      case 'moderada': return 'warning';
      case 'baixa': return 'info';
      default: return 'default';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/exames-laboratoriais')}
            variant="outlined"
          >
            Voltar
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Relatório de Análise Integrativa
          </Typography>
        </Box>
        <Button
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          variant="contained"
          color="primary"
        >
          Imprimir
        </Button>
      </Box>

      {/* Informações do Paciente */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Data do Relatório</Typography>
            <Typography variant="body1">{new Date().toLocaleDateString('pt-BR')}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Total de Exames Preenchidos</Typography>
            <Typography variant="body1">{examesPreenchidos.length} exames</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Alert de Aviso */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <AlertTitle>Importante</AlertTitle>
        Este relatório baseia-se na <strong>Anamnese Integrativa</strong> e nos princípios da Medicina e Nutrição Funcional.
        Os valores ideais são mais estreitos que os laboratoriais convencionais, visando otimização e não apenas ausência de doença.
        <strong> Sempre consulte um profissional habilitado para interpretação individualizada.</strong>
      </Alert>

      {/* Seção 1: Índices Calculados */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <ScienceIcon sx={{ mr: 1, fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Índices e Correlações Calculadas
          </Typography>
        </Box>

        {Object.keys(indicesCalculados).length === 0 ? (
          <Alert severity="warning">
            Nenhum índice pode ser calculado. Preencha os exames relacionados na página de Exames Laboratoriais.
          </Alert>
        ) : (
          <Grid container spacing={2}>
            {Object.values(indicesCalculados).map((indice, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {indice.nome}
                      </Typography>
                      <Chip 
                        label={indice.status === 'otimo' ? 'ÓTIMO' : indice.status === 'atencao' ? 'ATENÇÃO' : 'ALERTA'}
                        color={getStatusColor(indice.status)}
                        icon={getStatusIcon(indice.status)}
                      />
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">Valor Calculado</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {indice.valor}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">Valor Ideal</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {indice.ideal}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                      <Typography variant="body2">
                        {indice.interpretacao}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Seção 2: Diagnósticos e Padrões Identificados */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AssessmentIcon sx={{ mr: 1, fontSize: 32, color: 'error.main' }} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Padrões Disfuncionais Identificados
          </Typography>
        </Box>

        {diagnosticos.length === 0 ? (
          <Alert severity="success">
            <AlertTitle>Parabéns!</AlertTitle>
            Nenhum padrão disfuncional identificado com base nos exames preenchidos.
            Continue mantendo hábitos saudáveis!
          </Alert>
        ) : (
          diagnosticos.map((diag, idx) => (
            <Accordion key={idx} sx={{ mb: 2 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <HospitalIcon color="error" />
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {diag.tipo}
                  </Typography>
                  <Chip 
                    label={diag.severidade.toUpperCase()}
                    color={getSeveridadeColor(diag.severidade)}
                    size="small"
                  />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  {/* Evidências */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    📊 Evidências Laboratoriais:
                  </Typography>
                  <List dense>
                    {diag.evidencias.map((ev, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <ErrorIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={ev} />
                      </ListItem>
                    ))}
                  </List>

                  <Divider sx={{ my: 2 }} />

                  {/* Recomendações */}
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    💊 Protocolo de Intervenção Sugerido:
                  </Typography>
                  <List dense>
                    {diag.recomendacoes.map((rec, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <HealingIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={rec} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Paper>

      {/* Seção 3: Exames Preenchidos */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Resumo dos Exames Preenchidos
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Exame</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Resultado</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Referência Lab</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ideal Funcional</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {examesPreenchidos.map((exame) => (
                <TableRow key={exame.id} hover>
                  <TableCell>{exame.exame}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {exame.resultadoPaciente} {exame.unidade}
                  </TableCell>
                  <TableCell>{exame.valoresReferencia}</TableCell>
                  <TableCell sx={{ color: 'success.main', fontWeight: 600 }}>
                    {exame.valoresIdeais}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Rodapé com Observações */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <AlertTitle>Observações Importantes sobre Interpretação Funcional</AlertTitle>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>1. Janela de Tempo:</strong> Recomenda-se reavaliar os exames após 90-120 dias de intervenção (tempo de renovação celular).
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>2. Individualidade Bioquímica:</strong> Os valores ideais podem variar conforme idade, sexo, genética e histórico pessoal.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>3. Sintomas > Exames:</strong> Na anamnese integrativa, os sintomas relatados sempre têm peso igual ou superior aos valores laboratoriais.
        </Typography>
        <Typography variant="body2">
          <strong>4. Suplementação:</strong> Todas as dosagens sugeridas são baseadas na literatura científica, mas devem ser prescritas por profissional habilitado após avaliação individualizada.
        </Typography>
      </Alert>

      {/* Referências */}
      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          📚 Referências Bibliográficas
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • CAXITO, Luciana. <strong>Anamnese Integrativa: Interpretação Funcional dos Exames Laboratoriais</strong>. São Paulo: Edição da Autora, 2023.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • Institute for Functional Medicine (IFM). <strong>Clinical Education Programs</strong>.
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          • BLAND, Jeffrey. <strong>The Disease Delusion</strong>. Harper Wave, 2014.
        </Typography>
        <Typography variant="body2">
          • Sociedade Brasileira de Medicina Biomolecular e Radicais Livres (SBBMRL).
        </Typography>
      </Paper>
    </Container>
  );
};

export default RelatorioExames;
