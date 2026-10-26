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
  Grid
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

/**
 * Componente de Resumo Final Abrangente
 * Reúne todos os pontos críticos de todas as análises realizadas
 * Gera protocolos de tratamento e receituário profissional
 */
export default function ComprehensiveFinalSummary({ formData, patientName }) {
  // Verificação de segurança
  if (!formData) {
    return null;
  }

  // Coletar todos os pontos críticos
  const collectCriticalFindings = () => {
    const findings = {
      sintomas: [],
      carencias: [],
      sinaisVitais: [],
      iridologia: [],
      bioressonancia: [],
      questionario: []
    };

    // Sintomas selecionados
    if (formData.q17a_sintomas_selecionados?.length > 0) {
      findings.sintomas = formData.q17a_sintomas_selecionados.map(s => ({
        tipo: 'Sintoma Clínico',
        descricao: s,
        severidade: 'Moderado',
        sistema: identificarSistema(s)
      }));
    }

    // Carências nutricionais
    if (formData.q17b_carencias_identificadas?.length > 0) {
      findings.carencias = formData.q17b_carencias_identificadas.map(c => ({
        tipo: 'Carência Nutricional',
        descricao: c.carencia || c,
        severidade: 'Alto',
        sistema: 'Nutricional/Metabólico'
      }));
    }

    // Sinais vitais alterados
    if (formData.vitalSigns) {
      const vs = formData.vitalSigns;
      if (vs.pressaoSistolica && (vs.pressaoSistolica < 90 || vs.pressaoSistolica > 140)) {
        findings.sinaisVitais.push({
          tipo: 'Sinal Vital Alterado',
          descricao: `Pressão Arterial: ${vs.pressaoSistolica}/${vs.pressaoDiastolica} mmHg`,
          severidade: vs.pressaoSistolica > 160 ? 'Crítico' : 'Moderado',
          sistema: 'Cardiovascular'
        });
      }
      if (vs.peso && vs.altura) {
        const imc = vs.peso / ((vs.altura / 100) ** 2);
        if (imc < 18.5 || imc > 25) {
          findings.sinaisVitais.push({
            tipo: 'IMC Alterado',
            descricao: `IMC: ${imc.toFixed(1)} - ${imc < 18.5 ? 'Baixo peso' : imc < 30 ? 'Sobrepeso' : 'Obesidade'}`,
            severidade: imc < 16 || imc > 35 ? 'Alto' : 'Moderado',
            sistema: 'Metabólico/Nutricional'
          });
        }
      }
    }

    // Iridologia
    if (formData.iridologyAnalysis?.therapeuticPriorities) {
      findings.iridologia = formData.iridologyAnalysis.therapeuticPriorities.slice(0, 6).map(p => ({
        tipo: 'Achado Iridológico',
        descricao: p,
        severidade: p.includes('URGENTE') || p.includes('Cardiovascular') ? 'Crítico' : 'Alto',
        sistema: extrairSistema(p)
      }));
    }

    // Biorressonância
    if (formData.biorresonanciaBarraParsedResults || formData.biorresonanciaAuricularParsedResults) {
      const barraParams = formData.biorresonanciaBarraParsedResults?.parameters || [];
      const auricularParams = formData.biorresonanciaAuricularParsedResults?.parameters || [];
      
      [...barraParams, ...auricularParams].forEach(param => {
        if (param.status === 'alterado' || param.value < param.normalRange?.min || param.value > param.normalRange?.max) {
          findings.bioressonancia.push({
            tipo: 'Parâmetro de Biorressonância Alterado',
            descricao: `${param.name}: ${param.value} ${param.unit || ''}`,
            severidade: 'Moderado',
            sistema: param.system || 'Geral'
          });
        }
      });
    }

    // Questionário abrangente
    if (formData.comprehensiveHealthData) {
      const chData = formData.comprehensiveHealthData;
      Object.keys(chData).forEach(key => {
        if (Array.isArray(chData[key]) && chData[key].length > 0) {
          chData[key].forEach(item => {
            findings.questionario.push({
              tipo: 'Histórico de Saúde',
              descricao: typeof item === 'string' ? item : item.description || item,
              severidade: 'Moderado',
              sistema: key
            });
          });
        }
      });
    }

    return findings;
  };

  const identificarSistema = (sintoma) => {
    const lower = sintoma.toLowerCase();
    if (lower.includes('dor de cabeça') || lower.includes('tontura') || lower.includes('memória')) return 'Nervoso';
    if (lower.includes('digest') || lower.includes('estômago') || lower.includes('intestin')) return 'Digestivo';
    if (lower.includes('coração') || lower.includes('pressão')) return 'Cardiovascular';
    if (lower.includes('respira') || lower.includes('pulmão')) return 'Respiratório';
    if (lower.includes('articulação') || lower.includes('osso') || lower.includes('músculo')) return 'Musculoesquelético';
    return 'Geral';
  };

  const extrairSistema = (prioridade) => {
    if (prioridade.includes('Cardiovascular')) return 'Cardiovascular';
    if (prioridade.includes('Hepático') || prioridade.includes('Digestivo')) return 'Digestivo';
    if (prioridade.includes('Nervoso') || prioridade.includes('Adrenais')) return 'Nervoso';
    if (prioridade.includes('Renal')) return 'Excretor';
    if (prioridade.includes('Intestinal')) return 'Digestivo';
    return 'Geral';
  };

  const findings = collectCriticalFindings();
  const allFindings = [
    ...findings.sintomas,
    ...findings.carencias,
    ...findings.sinaisVitais,
    ...findings.iridologia,
    ...findings.bioressonancia,
    ...findings.questionario
  ];

  // Gerar protocolos de tratamento baseado nos achados
  const generateTreatmentProtocols = () => {
    const protocols = {
      suplementos: [],
      fitoterapicos: [],
      homeopatia: [],
      orientacoesGerais: []
    };

    // Se houver carências nutricionais
    findings.carencias.forEach(carencia => {
      const desc = carencia.descricao.toLowerCase();
      if (desc.includes('vitamina d')) {
        protocols.suplementos.push('Vitamina D3 10.000 UI - 1 cápsula/dia - Junto ao almoço - 60 dias');
      }
      if (desc.includes('magnésio')) {
        protocols.suplementos.push('Magnésio Dimalato 400mg - 1 cápsula/dia - Antes de dormir - 60 dias');
      }
      if (desc.includes('zinco')) {
        protocols.suplementos.push('Zinco quelado 30mg - 1 cápsula/dia - Após almoço - 60 dias');
      }
      if (desc.includes('ferro')) {
        protocols.suplementos.push('Ferro quelado 30mg - 1 cápsula/dia - Em jejum - 90 dias');
      }
    });

    // Se houver problemas cardiovasculares
    const hasCardiac = allFindings.some(f => f.sistema === 'Cardiovascular');
    if (hasCardiac) {
      protocols.suplementos.push('Ômega-3 (EPA/DHA) 2g - 2 cápsulas/dia - Junto às refeições - 90 dias');
      protocols.suplementos.push('Coenzima Q10 200mg - 1 cápsula/dia - Pela manhã - 60 dias');
      protocols.fitoterapicos.push('Alho (Allium sativum) 500mg - 2 cápsulas/dia - Após refeições - 60 dias');
      protocols.orientacoesGerais.push('Dieta com baixo teor de sódio (<2g/dia)');
      protocols.orientacoesGerais.push('Exercícios aeróbicos moderados 30min 5x/semana');
    }

    // Se houver problemas digestivos
    const hasDigestive = allFindings.some(f => f.sistema === 'Digestivo');
    if (hasDigestive) {
      protocols.suplementos.push('Probióticos 10-50 bilhões UFC - 1 cápsula - Em jejum - 60 dias');
      protocols.suplementos.push('L-Glutamina 5g - 1 dose - Em jejum - 60 dias');
      protocols.fitoterapicos.push('Cardo Mariano 300mg - 1 cápsula 3x/dia - Antes das refeições - 60 dias');
      protocols.fitoterapicos.push('Aloe vera 200mg - 1 cápsula 2x/dia - Antes das refeições - 30 dias');
      protocols.orientacoesGerais.push('Eliminar glúten e lactose por 30 dias (dieta de eliminação)');
    }

    // Se houver problemas nervosos/estresse
    const hasNervous = allFindings.some(f => f.sistema === 'Nervoso' || f.descricao.toLowerCase().includes('ansiedade') || f.descricao.toLowerCase().includes('estresse'));
    if (hasNervous) {
      protocols.suplementos.push('Magnésio Treonato 400mg - 1 cápsula - À noite - 60 dias');
      protocols.fitoterapicos.push('Rhodiola rosea 300mg - 1 cápsula - Pela manhã - 60 dias');
      protocols.fitoterapicos.push('Ashwagandha 600mg - 1 cápsula - À noite - 60 dias');
      protocols.homeopatia.push('Ignatia 30CH - 5 gotas 3x/dia - Sublingual - 30 dias');
      protocols.orientacoesGerais.push('Meditação ou mindfulness 10-20 minutos/dia');
      protocols.orientacoesGerais.push('Técnicas de respiração diafragmática 3x/dia');
    }

    // Homeopatia geral
    if (protocols.homeopatia.length === 0) {
      protocols.homeopatia.push('Nux vomica 30CH - 5 gotas 3x/dia - Sublingual - 30 dias');
      protocols.homeopatia.push('Lycopodium 30CH - 5 gotas 2x/dia - Sublingual - 30 dias');
    }

    // Orientações gerais sempre
    if (protocols.orientacoesGerais.length === 0) {
      protocols.orientacoesGerais.push('Hidratação adequada (mínimo 2L água/dia)');
    }
    protocols.orientacoesGerais.push('Sono regular 7-9h/noite');
    protocols.orientacoesGerais.push('Dieta balanceada rica em vegetais e frutas orgânicas');

    return protocols;
  };

  const protocols = generateTreatmentProtocols();

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Crítico': return '#d32f2f';
      case 'Alto': return '#f57c00';
      case 'Moderado': return '#fbc02d';
      default: return '#388e3c';
    }
  };

  if (allFindings.length === 0) {
    return (
      <Paper sx={{ p: 3, mt: 4, bgcolor: '#e8f5e9', border: '2px solid #4caf50' }}>
        <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 600 }}>
          ✅ Nenhum Ponto Crítico Identificado
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Não foram identificados pontos críticos que necessitem intervenção imediata. Continue com hábitos saudáveis e acompanhamento periódico.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box id="comprehensive-final-summary-printable" sx={{ mt: 4, pageBreakBefore: 'always' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          border: '2px solid #1976d2',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        {/* Cabeçalho com Logo */}
        <Box sx={{ borderBottom: '3px solid #1976d2', pb: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <img 
              src={`${process.env.PUBLIC_URL}/logo192.png`} 
              alt="Logo" 
              style={{ width: 80, height: 80, marginRight: 16 }}
            />
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center', mb: 1 }}>
                NATUROPATIA INTEGRATIVA
              </Typography>
              <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', fontWeight: 600 }}>
                Wander Pires Silva Coelho
              </Typography>
            </Box>
          </Box>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
            Terapeuta Integrativo Funcional | Naturopatia e Iridologia - CRTH-BR 17821
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 1 }}>
            Biorressonância | Medicina Tradicional Chinesa | Fitoterapia | Homeopatia
          </Typography>
        </Box>

        {/* Dados do Paciente */}
        <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
            DADOS DO PACIENTE
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                <strong>Nome:</strong> {patientName || 'Não informado'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">
                <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Resumo de Pontos Críticos */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#d32f2f', textAlign: 'center' }}>
          🚨 RESUMO EXECUTIVO - PONTOS CRÍTICOS IDENTIFICADOS
        </Typography>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Total de Achados:</strong> {allFindings.length} pontos críticos identificados em {Object.keys(findings).filter(k => findings[k].length > 0).length} categorias de avaliação.
          </Typography>
        </Alert>

        {/* Tabela de Pontos Críticos */}
        <TableContainer sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: '#ffebee' }}>
                <TableCell sx={{ fontWeight: 700 }}>Tipo de Achado</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Descrição</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Sistema</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Severidade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allFindings.slice(0, 20).map((finding, idx) => (
                <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { bgcolor: '#fafafa' } }}>
                  <TableCell>{finding.tipo}</TableCell>
                  <TableCell>{finding.descricao}</TableCell>
                  <TableCell>{finding.sistema}</TableCell>
                  <TableCell>
                    <Chip 
                      label={finding.severidade} 
                      size="small"
                      sx={{ 
                        bgcolor: getSeverityColor(finding.severidade),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider sx={{ my: 4 }} />

        {/* Protocolos de Tratamento */}
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1976d2', textAlign: 'center' }}>
          📝 SUGESTÕES TERAPÊUTICAS
        </Typography>

        {/* Suplementos */}
        {protocols.suplementos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#0288d1', fontWeight: 600 }}>
              💊 Suplementos Nutricionais
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                    <TableCell sx={{ fontWeight: 700, width: '40%' }}>Produto</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '15%' }}>Dose</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '25%' }}>Frequência</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '20%' }}>Duração</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {protocols.suplementos.map((item, idx) => {
                    const parts = item.split(' - ');
                    const [produto, dose, freq, duracao] = parts;
                    return (
                      <TableRow key={idx}>
                        <TableCell>{produto}</TableCell>
                        <TableCell>{dose}</TableCell>
                        <TableCell>{freq}</TableCell>
                        <TableCell>{duracao}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Fitoterápicos */}
        {protocols.fitoterapicos.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#388e3c', fontWeight: 600 }}>
              🌿 Fitoterápicos
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e8f5e9' }}>
                    <TableCell sx={{ fontWeight: 700, width: '40%' }}>Produto</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '15%' }}>Dose</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '25%' }}>Frequência</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '20%' }}>Duração</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {protocols.fitoterapicos.map((item, idx) => {
                    const parts = item.split(' - ');
                    const [produto, dose, freq, duracao] = parts;
                    return (
                      <TableRow key={idx}>
                        <TableCell>{produto}</TableCell>
                        <TableCell>{dose}</TableCell>
                        <TableCell>{freq}</TableCell>
                        <TableCell>{duracao}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Homeopatia */}
        {protocols.homeopatia.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#7b1fa2', fontWeight: 600 }}>
              💧 Homeopatia
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#f3e5f5' }}>
                    <TableCell sx={{ fontWeight: 700, width: '40%' }}>Medicamento</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '15%' }}>Dose</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '25%' }}>Frequência</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: '20%' }}>Duração</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {protocols.homeopatia.map((item, idx) => {
                    const parts = item.split(' - ');
                    const [medicamento, dose, freq, duracao] = parts;
                    return (
                      <TableRow key={idx}>
                        <TableCell>{medicamento}</TableCell>
                        <TableCell>{dose}</TableCell>
                        <TableCell>{freq}</TableCell>
                        <TableCell>{duracao}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {/* Orientações Gerais */}
        {protocols.orientacoesGerais.length > 0 && (
          <Box sx={{ mb: 3, p: 2, bgcolor: '#efebe9', borderRadius: 1 }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#5d4037', fontWeight: 600 }}>
              📝 Orientações Gerais
            </Typography>
            {protocols.orientacoesGerais.map((item, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                • {item}
              </Typography>
            ))}
          </Box>
        )}

        {/* Rodapé */}
        <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #ddd' }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            <strong>Observações:</strong> Estas sugestões terapêuticas foram geradas com base na avaliação integrativa completa. 
            Recomenda-se reavaliação após 30-60 dias. Em caso de dúvidas ou reações adversas, 
            contatar o terapeuta imediatamente.
          </Typography>
          
          <Alert severity="warning" sx={{ mb: 3, fontSize: '0.85rem' }}>
            <strong>⚠️ IMPORTANTE:</strong> Estas são sugestões terapêuticas baseadas em análise integrativa. 
            Consulte profissional de saúde antes de iniciar qualquer tratamento. Verifique contraindicações 
            e interações medicamentosas. Gestantes, lactantes e pessoas com doenças crônicas devem 
            buscar orientação médica especializada.
          </Alert>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                _______________________________
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Data: {new Date().toLocaleDateString('pt-BR')}
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                _______________________________
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Wander Pires Silva Coelho
              </Typography>
              <Typography variant="caption">
                CRTH-BR 17821
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
            onClick={() => {
              document.getElementById('comprehensive-final-summary-printable')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setTimeout(() => window.print(), 500);
            }}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 600,
              px: 4
            }}
          >
            Imprimir Resumo e Sugestões Terapêuticas
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
            #comprehensive-final-summary-printable,
            #comprehensive-final-summary-printable * {
              visibility: visible;
            }
            #comprehensive-final-summary-printable {
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
