import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container, Paper, Typography, Box, Button, Alert, LinearProgress,
  TextField, Accordion, AccordionSummary, AccordionDetails, Stack,
  FormControlLabel, Checkbox, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { QUESTIONNAIRE_BLOCKS } from '../data/integrativeAnamnesisQuestions';
import { updateAnamnese } from '../lib/api';

export default function PublicAnamnesisForm() {
  const [searchParams] = useSearchParams();
  const anamneseId = searchParams.get('id');
  const nomePaciente = searchParams.get('nome') || '';

  const [answers, setAnswers] = useState({});
  const [expanded, setExpanded] = useState('b1');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const setAnswer = (qId, value) => setAnswers(prev => ({ ...prev, [qId]: value }));
  const setCheckbox = (qId, opt, checked) => setAnswers(prev => {
    const cur = prev[qId] || [];
    if (!checked) return { ...prev, [qId]: cur.filter(v => v !== opt) };
    if (opt === 'Nenhum') return { ...prev, [qId]: ['Nenhum'] };
    return { ...prev, [qId]: [...cur.filter(v => v !== 'Nenhum'), opt] };
  });

  const totalQuestions = QUESTIONNAIRE_BLOCKS.reduce((sum, b) => sum + b.questions.filter(q => !q.showIf).length, 0);
  const totalAnswered = Object.keys(answers).filter(k => {
    const v = answers[k];
    return v !== '' && v !== undefined && v !== null && (!Array.isArray(v) || v.length > 0);
  }).length;
  const progress = Math.round((totalAnswered / totalQuestions) * 100);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    const patch = {
      anamnesisIntegrativa: answers,
      anamnesisIntegrativaUpdated: new Date().toISOString(),
      anamnesisIntegrativaFilledByPatient: true,
    };
    try {
      if (anamneseId) {
        // Sync to Supabase + localStorage via updateAnamnese
        await updateAnamnese(anamneseId, patch);
      } else {
        // No ID — store as pending
        const pending = JSON.parse(localStorage.getItem('pendingAnamnesisIntegrativa') || '[]');
        pending.push({ nomePaciente, answers, submittedAt: new Date().toISOString() });
        localStorage.setItem('pendingAnamnesisIntegrativa', JSON.stringify(pending));
      }
      try { window.dispatchEvent(new CustomEvent('anamneses:updated')); } catch (_) {}
      setSubmitted(true);
    } catch (e) {
      setError('Ocorreu um erro ao salvar suas respostas. Por favor, tente novamente.');
      console.warn(e);
    }
    setSubmitting(false);
  };

  const renderQuestion = (q) => {
    if (q.showIf && answers[q.showIf.id] !== q.showIf.value) return null;

    if (q.type === 'text') {
      return (
        <TextField
          fullWidth multiline minRows={2} size="small" variant="outlined"
          value={answers[q.id] || ''}
          onChange={e => setAnswer(q.id, e.target.value)}
          placeholder="Descreva aqui..."
          sx={{ mt: 0.5 }}
        />
      );
    }
    if (q.type === 'scale') {
      return (
        <Box mt={0.5}>
          {q.hint && <Typography variant="caption" color="text.secondary">{q.hint}</Typography>}
          <Box mt={0.5}>
            <ToggleButtonGroup
              value={answers[q.id] !== undefined ? String(answers[q.id]) : ''}
              exclusive
              onChange={(_, v) => { if (v !== null) setAnswer(q.id, v); }}
              size="small"
              sx={{ flexWrap: 'wrap' }}
            >
              {Array.from({ length: 11 }, (_, i) => (
                <ToggleButton key={i} value={String(i)}
                  sx={{ minWidth: 34, px: 0.5, fontWeight: 600,
                    '&.Mui-selected': { bgcolor: '#1b5e20', color: '#fff' } }}>
                  {i}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Box>
      );
    }
    if (q.type === 'radio') {
      return (
        <Box mt={0.5}>
          <ToggleButtonGroup
            value={answers[q.id] || ''}
            exclusive
            onChange={(_, v) => { if (v !== null) setAnswer(q.id, v); }}
            size="small"
            sx={{ flexWrap: 'wrap', gap: 0.5 }}
          >
            {q.options.map(opt => (
              <ToggleButton key={opt} value={opt}
                sx={{ fontSize: '0.72rem', py: 0.5, px: 1.2, whiteSpace: 'normal', textAlign: 'left',
                  '&.Mui-selected': { bgcolor: '#1b5e20', color: '#fff' } }}>
                {opt}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      );
    }
    if (q.type === 'checkbox') {
      return (
        <Box display="flex" flexWrap="wrap" mt={0.5}>
          {q.options.map(opt => (
            <FormControlLabel key={opt}
              control={
                <Checkbox size="small"
                  checked={(answers[q.id] || []).includes(opt)}
                  onChange={e => setCheckbox(q.id, opt, e.target.checked)}
                  sx={{ py: 0.3, color: '#1b5e20', '&.Mui-checked': { color: '#1b5e20' } }}
                />
              }
              label={<Typography variant="body2">{opt}</Typography>}
              sx={{ mr: 2 }}
            />
          ))}
        </Box>
      );
    }
    return null;
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <CheckCircleOutlineIcon sx={{ fontSize: 72, color: '#2e7d32', mb: 2 }} />
          <Typography variant="h5" fontWeight="bold" color="success.dark" gutterBottom>
            Respostas enviadas com sucesso!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Obrigado{nomePaciente ? `, ${nomePaciente.split(' ')[0]}` : ''}! Suas respostas foram registradas.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            O terapeuta analisará suas informações antes da consulta para oferecer um atendimento ainda mais personalizado.
          </Typography>
          <Box mt={3} p={2} sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}>
            <Typography variant="body2" color="success.dark">
              Wander Pires Silva Coelho<br />
              Terapeuta Integrativo Funcional, Naturopatia e Iridologia<br />
              CRTH-BR 17821
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      {/* HEADER */}
      <Paper sx={{ p: 3, mb: 2, background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)' }}>
        <Typography variant="h5" fontWeight="bold" color="success.dark" gutterBottom>
          Formulário de Anamnese Integrativa
        </Typography>
        {nomePaciente && (
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Olá, <strong>{nomePaciente.split(' ')[0]}</strong>! Por favor, responda com honestidade — suas respostas ajudam a personalizar seu atendimento.
          </Typography>
        )}
        {!nomePaciente && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Responda com honestidade — suas informações são confidenciais e ajudam a personalizar seu atendimento.
          </Typography>
        )}
        <Box display="flex" alignItems="center" gap={2} mt={1.5}>
          <Box flex={1}>
            <LinearProgress variant="determinate" value={progress}
              sx={{ height: 10, borderRadius: 5, bgcolor: '#c8e6c9',
                '& .MuiLinearProgress-bar': { bgcolor: '#2e7d32' } }} />
          </Box>
          <Typography variant="caption" color="text.secondary">{progress}% concluído</Typography>
        </Box>
      </Paper>

      {/* BLOCKS */}
      {QUESTIONNAIRE_BLOCKS.map(block => (
        <Accordion
          key={block.id}
          expanded={expanded === block.id}
          onChange={(_, open) => setExpanded(open ? block.id : false)}
          sx={{ mb: 0.5 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: expanded === block.id ? '#fff' : undefined }} />}
            sx={{
              bgcolor: expanded === block.id ? '#2e7d32' : '#fafafa',
              color: expanded === block.id ? '#fff' : 'inherit',
              borderRadius: '4px 4px 0 0',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold">{block.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2.5}>
              {block.questions.map(q => {
                if (q.showIf && answers[q.showIf.id] !== q.showIf.value) return null;
                return (
                  <Box key={q.id}>
                    <Typography variant="body2" fontWeight={500} mb={0.5}>{q.text}</Typography>
                    {renderQuestion(q)}
                  </Box>
                );
              })}
            </Stack>
            {/* Navigate to next block */}
            {QUESTIONNAIRE_BLOCKS.findIndex(b => b.id === block.id) < QUESTIONNAIRE_BLOCKS.length - 1 && (
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button size="small" variant="outlined" color="success"
                  onClick={() => {
                    const idx = QUESTIONNAIRE_BLOCKS.findIndex(b => b.id === block.id);
                    if (idx < QUESTIONNAIRE_BLOCKS.length - 1) setExpanded(QUESTIONNAIRE_BLOCKS[idx + 1].id);
                  }}>
                  Próxima seção →
                </Button>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      {/* SUBMIT */}
      <Box mt={3}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {progress < 50 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Você respondeu {progress}% do formulário. Quanto mais completo, melhor será sua análise!
          </Alert>
        )}

        <Button
          variant="contained" color="success" size="large" startIcon={<SendIcon />}
          onClick={handleSubmit} disabled={submitting || totalAnswered === 0}
          fullWidth sx={{ py: 1.5, fontSize: '1rem', fontWeight: 700 }}
        >
          {submitting ? 'Enviando...' : 'Enviar Minhas Respostas'}
        </Button>

        <Typography variant="caption" color="text.secondary" display="block" textAlign="center" mt={1}>
          Suas respostas são confidenciais e serão analisadas exclusivamente pelo seu terapeuta.
        </Typography>
      </Box>

      <Box mt={3} p={2} sx={{ bgcolor: '#f5f5f5', borderRadius: 2, textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Wander Pires Silva Coelho — Terapeuta Integrativo Funcional, Naturopatia e Iridologia — CRTH-BR 17821
        </Typography>
      </Box>
    </Container>
  );
}
