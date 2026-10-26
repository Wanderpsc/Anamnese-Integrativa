import React, { useMemo, useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, Typography } from '@mui/material';
import ASSISTANTS from '../config/assistants';

function buildPrompt(entry, suggestions = []) {
  if (!entry) return 'Nenhuma anamnese selecionada.';

  const lines = [];
  lines.push(`Paciente: ${entry.nome ?? '—'}`);
  if (entry.data_nasc) lines.push(`Data de nascimento: ${entry.data_nasc}`);
  if (entry.idade) lines.push(`Idade: ${entry.idade}`);
  if (entry.genero) lines.push(`Gênero: ${entry.genero}`);

  lines.push('\nResumo das anotações e campos salvos:');
  Object.keys(entry).forEach((k) => {
    if (['id', 'nome', 'data_nasc', 'createdAt', 'modelUsed'].includes(k)) return;
    const val = entry[k];
    if (val == null || val === '') return;
    const display = Array.isArray(val) ? val.join(', ') : String(val);
    lines.push(`- ${k.replace(/_/g, ' ')}: ${display}`);
  });

  if (suggestions && suggestions.length) {
    lines.push('\nSugestões / observações extraídas das planilhas e do sistema:');
    suggestions.forEach((s, idx) => lines.push(`${idx + 1}. ${s}`));
  }

  lines.push(`\nPor favor, gere uma sugestão terapêutica de tratamento integrativa, organizada, concisa e em linguagem técnica apropriada. Forneça:
  1) Recomendações de intervenções (prioridade, dose/tempo se aplicável)
  2) Encaminhamentos ou exames necessários
  3) Observações de monitoramento e follow-up
  4) Indicações de contraindicações ou sinais de alerta
  Use tom profissional e inclua referências quando possível. Identifique se a sugestão terapêutica é apenas sugestiva — confirmar com profissional responsável.`);

  return lines.join('\n');
}

export default function AssistantPrompt({ entry, suggestions = [] }) {
  const [assistant, setAssistant] = useState(ASSISTANTS[0]?.id || 'asclepio');

  const prompt = useMemo(() => buildPrompt(entry, suggestions), [entry, suggestions]);

  function copyPrompt() {
    navigator.clipboard.writeText(prompt).then(() => {
      // minimal feedback (component sits in the app visually)
      // In a real app we'd show a Snackbar; keep simple for tests.
      // eslint-disable-next-line no-console
      console.log('Prompt copiado para a área de transferência');
    });
  }

  function openChat() {
    const cfg = ASSISTANTS.find((a) => a.id === assistant);
    const url = cfg?.chatUrl || 'https://chat.openai.com/new';
    // We can't reliably pre-populate the chat window via URL, so open new chat
    window.open(url, '_blank', 'noopener');
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography variant="caption">Assistente:</Typography>
        <Select size="small" value={assistant} onChange={(e) => setAssistant(e.target.value)} sx={{ width: 200 }}>
          {ASSISTANTS.map((a) => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
        </Select>

        <Button variant="contained" size="small" onClick={copyPrompt} sx={{ ml: 1 }}>Copiar prompt</Button>
        <Button variant="outlined" size="small" onClick={openChat}>Abrir ChatGPT</Button>
      </Box>

      <TextField value={prompt} multiline fullWidth rows={12} sx={{ mt: 1 }} inputProps={{ 'aria-label': 'assistant-prompt' }} />
    </Box>
  );
}
