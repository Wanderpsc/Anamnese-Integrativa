import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { buildLetterheadHtml, downloadPdfFromHtml, buildAnamneseBodyHtml, generateQrDataUrl } from '../components/PrintTemplate';
import PrescriptionHeader from '../components/PrescriptionHeader';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  Chip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const Field = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="text.secondary" display="block">
      {label}
    </Typography>
    <Typography variant="body1" sx={{ fontWeight: value ? 500 : 'normal', color: value ? 'text.primary' : 'text.disabled' }}>
      {value || 'Não informado'}
    </Typography>
  </Box>
);

export default function AnamneseView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anamnese, setAnamnese] = useState(null);

  useEffect(() => {
    const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
    const found = anamneses.find(a => String(a.id) === String(id));
    setAnamnese(found);
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir esta anamnese?')) {
      const anamneses = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const filtered = anamneses.filter(a => String(a.id) !== String(id));
      localStorage.setItem('anamneses', JSON.stringify(filtered));
      try { window.dispatchEvent(new CustomEvent('anamneses:updated', { detail: { id } })); } catch (e) { /* ignore */ }
      navigate('/dashboard');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadPdf = async () => {
    // Download using centralized letterhead template
    try {
      const bodyHtml = buildAnamneseBodyHtml(anamnese);
      const qr = `${window.location.origin}/anamnese/${anamnese.id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ title: 'Anamnese - Resumo', bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `anamnese_${(anamnese.q01_nome||anamnese.nome||'paciente').replace(/\s/g,'_')}_${(new Date()).toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      window.print();
    }
  };

  if (!anamnese) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5">Anamnese não encontrada</Typography>
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
            startIcon={<ArrowBackIcon />}
          >
            Voltar para Interagentes
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }} className="print-container">
        {/* Header com ações */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} className="no-print">
          <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 700 }}>
            Anamnese Integrativa
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate('/dashboard')}
              startIcon={<ArrowBackIcon />}
            >
              Voltar
            </Button>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Imprimir
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={downloadPdf}
            >
              Download PDF
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </Box>
        </Box>

        {/* Cabeçalho de Atendimento */}
        <PrescriptionHeader entry={anamnese} />

        {/* Data de criação */}
        {anamnese.createdAt && (
          <Box sx={{ mb: 3 }} className="no-print">
            <Chip
              label={`Criado em: ${new Date(anamnese.createdAt).toLocaleString('pt-BR')}`}
              sx={{ bgcolor: '#c5e1a5', color: '#33691e', fontWeight: 600 }}
              variant="filled"
            />
          </Box>
        )}

        <Divider sx={{ mb: 3, borderColor: '#81c784' }} />

        {/* Identificação */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600 }}>
            📋 Identificação do Interagente
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Field label="Nome Completo" value={anamnese.q01_nome} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field
                label="Data de Nascimento"
                value={anamnese.q02_data_nasc ? new Date(anamnese.q02_data_nasc).toLocaleDateString('pt-BR') : null}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Field label="Idade" value={anamnese.q03_idade} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="Sexo" value={anamnese.q04_sexo} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Estado Civil" value={anamnese.q05_estado_civil} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Field label="Profissão" value={anamnese.q06_profissao} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Field label="Endereço" value={anamnese.q07_endereco} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="CEP" value={anamnese.q10_cep} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Field label="Estado" value={anamnese.q09_estado} />
            </Grid>
            <Grid item xs={12} md={5}>
              <Field label="Cidade" value={anamnese.q08_cidade} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Telefone" value={anamnese.q11_telefone} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="E-mail" value={anamnese.q12_email} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="RG" value={anamnese.q13_rg} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="CPF" value={anamnese.q14_cpf} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Queixa Principal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            🩺 Queixa Principal
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field label="Queixa Principal" value={anamnese.q15_queixa_principal} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Há quanto tempo?" value={anamnese.q16_tempo_problema} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Tratamentos anteriores" value={anamnese.q17_tratamentos_anteriores} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Histórico Familiar */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            👨‍👩‍👧‍👦 Histórico Familiar
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field label="Doenças na família" value={anamnese.q18_doencas_familia} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Pais vivos?" value={anamnese.q19_pais_vivos} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Doenças dos pais" value={anamnese.q20_doencas_pais} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Histórico Pessoal */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            📝 Histórico Pessoal
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field label="Cirurgias realizadas" value={anamnese.q21_cirurgias} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Hospitalizações" value={anamnese.q22_hospitalizacoes} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Alergias" value={anamnese.q23_alergias} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Medicamentos em uso" value={anamnese.q24_medicamentos_uso} />
            </Grid>
            <Grid item xs={12}>
              <Field label="Doenças crônicas" value={anamnese.q25_doencas_cronicas} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Hábitos de Vida */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            🏃 Hábitos de Vida
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
              <Field label="Fumante?" value={anamnese.q26_tabagismo} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="Consome álcool?" value={anamnese.q27_etilismo} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="Pratica exercícios?" value={anamnese.q28_atividade_fisica} />
            </Grid>
            <Grid item xs={6} md={3}>
              <Field label="Frequência" value={anamnese.q29_frequencia_exercicio} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Alimentação */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            🍽️ Alimentação
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field label="Café da manhã" value={anamnese.q30_cafe_manha} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Almoço" value={anamnese.q31_almoco} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Jantar" value={anamnese.q32_jantar} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Lanches" value={anamnese.q33_lanches} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Copos de água por dia" value={anamnese.q34_agua_dia} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Restrições alimentares" value={anamnese.q35_restricoes_alimentares} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Sono e Repouso */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            😴 Sono e Repouso
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Field label="Horas de sono" value={anamnese.q36_horas_sono} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Qualidade do sono" value={anamnese.q37_qualidade_sono} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Acorda durante a noite?" value={anamnese.q38_acorda_noite} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Sistema Digestivo */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            🫃 Sistema Digestivo
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field label="Funcionamento intestinal" value={anamnese.q39_intestino} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Gases/Flatulência" value={anamnese.q40_gases} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Azia/Refluxo" value={anamnese.q41_azia} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Náuseas/Vômitos" value={anamnese.q42_nauseas} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Sistema Urinário */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            💧 Sistema Urinário
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Field label="Frequência urinária" value={anamnese.q43_urina_frequencia} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Cor da urina" value={anamnese.q44_cor_urina} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Field label="Ardor ao urinar" value={anamnese.q45_ardor_urinar} />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Outros Sintomas */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom color="secondary">
            💭 Outros Sintomas e Observações
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Field label="Dores" value={anamnese.q46_dores} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Nível de cansaço" value={anamnese.q47_cansaco} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Nível de estresse" value={anamnese.q48_estresse} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field label="Ansiedade" value={anamnese.q49_ansiedade} />
            </Grid>
            <Grid item xs={12}>
              <Field label="Observações adicionais" value={anamnese.q50_observacoes} />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* CSS para impressão */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-container {
            box-shadow: none !important;
          }
        }
      `}</style>
      <ScrollToTop />
    </Container>
  );
}
