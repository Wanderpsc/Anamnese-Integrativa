import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PsychologyIcon from '@mui/icons-material/Psychology';
import {
  IRIDOLOGY_SEQUENCE_GUIDE,
  IRIDOLOGY_SEQUENCE_REFERENCES,
  IRIDOLOGY_BEHAVIORAL_PROFILES,
  IRIDOLOGY_COMBINATION_DYNAMICS,
  IRIDOLOGY_ADVANCED_SIGNS
} from '../config/iridologySequenceGuide';
import { buildEvidenceSafetyNotice, getIridologyPdfEvidence, getTherapeuticKnowledgeMeta } from '../lib/pdfTherapeuticKnowledge';

export default function IridologySequenceGuide({ title = 'Sequência Iridológica Integrada (1–32)' }) {
  const evidence = getIridologyPdfEvidence(10);
  const safetyNotes = buildEvidenceSafetyNotice();
  const meta = getTherapeuticKnowledgeMeta();

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 3, border: '1px solid #d1c4e9', bgcolor: '#faf7ff' }}>
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#5e35b1', fontWeight: 700, mb: 1 }}>
        <PsychologyIcon sx={{ color: '#5e35b1' }} />
        {title}
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Integração terapêutica baseada em materiais de iridologia do acervo clínico, com indexação de PDFs para consulta rápida.
      </Alert>

      <Alert severity="warning" sx={{ mb: 2 }}>
        {safetyNotes.map((note) => (
          <Typography key={note} variant="body2">• {note}</Typography>
        ))}
      </Alert>

      <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: '#fff' }}>
        <Typography variant="caption" color="text.secondary">
          Base documental indexada: {meta.totalIndexedPdfs} PDFs relevantes
          {meta.generatedAt ? ` • Atualizado em ${new Date(meta.generatedAt).toLocaleString('pt-BR')}` : ''}
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {IRIDOLOGY_SEQUENCE_REFERENCES.map((ref) => (
          <Chip key={ref} size="small" label={ref} variant="outlined" color="secondary" />
        ))}
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Fontes PDF priorizadas para esta sequência ({evidence.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {evidence.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhuma fonte indexada ainda. Execute o comando de indexação dos PDFs para preencher esta base.
            </Typography>
          ) : (
            <Grid container spacing={1}>
              {evidence.map((item) => (
                <Grid item xs={12} key={item.fileName}>
                  <Paper variant="outlined" sx={{ p: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.fileName}
                    </Typography>
                    {item.tags?.length > 0 && (
                      <Typography variant="caption" color="text.secondary">
                        Tags: {item.tags.join(', ')}
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Ver sinais, explicações e condutas ({IRIDOLOGY_SEQUENCE_GUIDE.length} itens)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {IRIDOLOGY_SEQUENCE_GUIDE.map((item) => (
              <Grid item xs={12} md={6} key={item.id}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
                    {item.id}. {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Explicação:</strong> {item.explanation}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Tratamento:</strong> {item.treatment}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Perfis comportamentais Rayid (Jóia, Flor, Corrente, Agitador)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Alert severity="warning" sx={{ mb: 2 }}>
            {IRIDOLOGY_ADVANCED_SIGNS.safetyPremise}
          </Alert>
          <Grid container spacing={2}>
            {Object.values(IRIDOLOGY_BEHAVIORAL_PROFILES).map((profile) => (
              <Grid item xs={12} md={6} key={profile.type}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#6a1b9a', mb: 0.8 }}>
                    {profile.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Lado oposto:</strong> {profile.oppositeSide}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Lado atraente:</strong> {profile.attractiveSide}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Integração:</strong> {profile.integrationHint}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    Características:
                  </Typography>
                  {profile.characteristics.map((item) => (
                    <Typography key={`${profile.type}-${item}`} variant="body2">• {item}</Typography>
                  ))}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Soma dos perfis e dinâmica relacional
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {IRIDOLOGY_COMBINATION_DYNAMICS.map((combo) => (
              <Grid item xs={12} key={combo.pair}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
                    {combo.pair}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Resumo:</strong> {combo.summary}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Foco terapêutico:</strong> {combo.therapeuticFocus}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    <strong>Forças:</strong> {combo.strengths.join(' • ')}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'warning.main' }}>
                    <strong>Riscos:</strong> {combo.risks.join(' • ')}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Sinais avançados, integração íris+esclera e hipóteses clínicas
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {IRIDOLOGY_ADVANCED_SIGNS.signs.map((sign) => (
              <Grid item xs={12} md={6} key={sign.name}>
                <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
                    {sign.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Leitura:</strong> {sign.interpretation}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.8 }}>
                    <strong>Hipótese:</strong> {sign.clinicalHypothesis}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Conduta:</strong> {sign.conduct}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Paper variant="outlined" sx={{ p: 1.5, mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
              {IRIDOLOGY_ADVANCED_SIGNS.irisScleraIntegration.title}
            </Typography>
            {IRIDOLOGY_ADVANCED_SIGNS.irisScleraIntegration.combinations.map((item) => (
              <Typography key={item} variant="body2">• {item}</Typography>
            ))}
            <Alert severity="warning" sx={{ mt: 1.5 }}>
              {IRIDOLOGY_ADVANCED_SIGNS.irisScleraIntegration.warning}
            </Alert>
          </Paper>

          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
                  Correlação por anéis (eixo masculino/feminino)
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.8 }}>
                  {IRIDOLOGY_ADVANCED_SIGNS.ringSexualCorrelation.note}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.8 }}>
                  <strong>Eixo masculino:</strong> {IRIDOLOGY_ADVANCED_SIGNS.ringSexualCorrelation.maleAxis}
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.8 }}>
                  <strong>Eixo feminino:</strong> {IRIDOLOGY_ADVANCED_SIGNS.ringSexualCorrelation.femaleAxis}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Validação recomendada: {IRIDOLOGY_ADVANCED_SIGNS.ringSexualCorrelation.requiredValidation.join(' • ')}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper variant="outlined" sx={{ p: 1.5, height: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#4a148c', mb: 0.8 }}>
                  Fases de trauma gestacional (hipótese iridológica)
                </Typography>
                <Typography variant="body2" sx={{ mb: 0.8 }}>
                  {IRIDOLOGY_ADVANCED_SIGNS.gestationalTraumaPhases.note}
                </Typography>
                {IRIDOLOGY_ADVANCED_SIGNS.gestationalTraumaPhases.phases.map((phase) => (
                  <Typography key={phase} variant="body2">• {phase}</Typography>
                ))}
                <Typography variant="body2" sx={{ mt: 0.8 }}>
                  <strong>Conduta integrativa:</strong> {IRIDOLOGY_ADVANCED_SIGNS.gestationalTraumaPhases.integrativeConduct}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
}