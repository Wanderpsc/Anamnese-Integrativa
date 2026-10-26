import { useState, useMemo } from 'react';
import {
  Box, Typography, Tabs, Tab, TextField, Checkbox, FormControlLabel,
  FormGroup, Grid, Chip, Button, Divider, Alert, InputAdornment,
  Accordion, AccordionSummary, AccordionDetails, Paper, Badge,
  Select, MenuItem, FormControl, InputLabel, Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

import {
  TABS, IDENTIFICACAO_FIELDS, QUEIXA_TEMPO, QUEIXA_EVOLUCAO,
  QUEIXA_FATORES_PIORA, QUEIXA_FATORES_MELHORA,
  DOENCAS_PREVIAS, CIRURGIAS_ITEMS, MEDICAMENTOS_CLASSES,
  ALERGIAS_ITEMS, VACINAS_ITEMS, HOSPITALIZACOES_ITEMS,
  FAMILIA_PARENTES, FAMILIA_DOENCAS,
  ALIMENTACAO_PADRAO, ALIMENTOS_CONSUMO_DIARIO, SINAIS_ALIMENTARES,
  SONO_PADRAO, ENERGIA_PADRAO,
  ATIVIDADE_TIPO, ATIVIDADE_FREQUENCIA, ATIVIDADE_DURACAO, ATIVIDADE_INTENSIDADE, ATIVIDADE_SINAIS,
  INTESTINO_PADRAO, URINA_PADRAO, SUOR_PADRAO, RESPIRACAO_ELIMINACAO,
  SISTEMAS,
  EMOCIONAL_SINTOMAS, EMOCIONAL_HISTORIA, EMOCIONAL_RECURSOS,
  ESPIRITUAL_ITENS, SOCIAL_ITENS, HABITOS_VICIOSO,
  EXAMES_GRUPOS,
  HIPOTESES_CATEGORIAS,
} from '../data/lucianaCaxitoData';

// ── Utilitários ──────────────────────────────────────────────
const STORAGE_KEY = 'anamneseLucianaCaxito_draft';

function loadDraft() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function CheckList({ items, checked, onToggle, searchTerm }) {
  const filtered = searchTerm
    ? items.filter(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
    : items;
  return (
    <FormGroup>
      <Grid container spacing={0}>
        {filtered.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={!!checked[item]}
                  onChange={() => onToggle(item)}
                  sx={{ py: 0.3 }}
                />
              }
              label={<Typography variant="body2" sx={{ fontSize: '0.82rem' }}>{item}</Typography>}
            />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <TextField
      size="small"
      placeholder="Buscar..."
      value={value}
      onChange={e => onChange(e.target.value)}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
      }}
      sx={{ mb: 1.5, maxWidth: 320 }}
    />
  );
}

function SectionTitle({ children, count }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 2 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1565c0' }}>{children}</Typography>
      {count > 0 && <Chip label={count} size="small" color="primary" sx={{ height: 18, fontSize: '0.7rem' }} />}
    </Box>
  );
}

// ── Componente principal ─────────────────────────────────────
export default function AnamneseLucianaCaxito() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState(() => loadDraft());
  const [search, setSearch] = useState({});
  const [saved, setSaved] = useState(false);

  // Helpers
  const set = (key, value) => setData(p => ({ ...p, [key]: value }));
  const toggleCheck = (group, item) =>
    setData(p => ({ ...p, [group]: { ...(p[group] || {}), [item]: !(p[group] || {})[item] } }));
  const countChecked = group => Object.values(data[group] || {}).filter(Boolean).length;
  const setSearch_ = (key, v) => setSearch(p => ({ ...p, [key]: v }));

  const handleSave = () => {
    const entry = {
      ...data,
      _savedAt: new Date().toISOString(),
      _type: 'anamneseLucianaCaxito',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
    // Save also in anamneses list if patient loaded
    const pacId = localStorage.getItem('currentPatientId');
    if (pacId) {
      const all = JSON.parse(localStorage.getItem('anamneses') || '[]');
      const idx = all.findIndex(a => String(a.id) === String(pacId));
      if (idx >= 0) {
        all[idx].anamneseLucianaCaxito = entry;
        localStorage.setItem('anamneses', JSON.stringify(all));
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePrint = () => {
    const w = window.open('', '_blank');
    const rows = (group, items) => items.map(it =>
      (data[group] || {})[it]
        ? `<tr><td style="padding:3px 8px">✓ ${it}</td></tr>`
        : ''
    ).join('');
    w.document.write(`<!DOCTYPE html><html><head><title>Anamnese Integrativa I — Luciana Caxito</title>
    <style>body{font-family:Arial,sans-serif;font-size:11.5px;margin:20px}
    h1{font-size:15px;color:#1565c0}h2{font-size:13px;color:#0d47a1;border-bottom:1px solid #90caf9;padding-bottom:4px;margin-top:18px}
    table{border-collapse:collapse;width:100%}td{vertical-align:top}
    .grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:2px}
    @media print{@page{size:A4 portrait;margin:12mm 15mm}html,body{margin:0;padding:0;width:100%;overflow-x:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style></head><body>
    <h1>📋 Anamnese Integrativa I — Luciana Caxito</h1>
    <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')} | 
    <strong>Paciente:</strong> ${data.nome || '—'} | 
    <strong>Idade:</strong> ${data.idade || '—'} anos</p>
    <h2>Identificação</h2>
    ${IDENTIFICACAO_FIELDS.map(f => `<p><strong>${f.label}:</strong> ${data[f.key] || '—'}</p>`).join('')}
    <h2>Queixa Principal</h2>
    <p>${data.queixaPrincipal || '—'}</p>
    <h2>Observações Gerais</h2>
    <p>${data.observacoesGerais || '—'}</p>
    <h2>Hipóteses Diagnósticas</h2>
    ${Object.entries(HIPOTESES_CATEGORIAS).map(([gk, g]) => {
      const selecionados = g.itens.filter(i => (data[`hipotese_${gk}`] || {})[i]);
      if (!selecionados.length) return '';
      return `<h3 style="font-size:12px;color:#c62828">${g.label}</h3><ul>${selecionados.map(i => `<li>${i}</li>`).join('')}</ul>`;
    }).join('')}
    </body></html>`);
    w.document.close();
    w.onload = () => w.print();
  };

  // Contadores por aba para badge
  const tabCounts = useMemo(() => {
    const counts = {};
    counts[1] = countChecked('queixa_piora') + countChecked('queixa_melhora');
    counts[2] = countChecked('doencas') + countChecked('cirurgias') + countChecked('medicamentos') + countChecked('alergias');
    counts[3] = countChecked('familia_doencas');
    counts[4] = countChecked('alimentacao_padrao') + countChecked('alimentos') + countChecked('sinais_alim');
    counts[5] = countChecked('sono') + countChecked('energia');
    counts[6] = countChecked('atividade_tipo');
    counts[7] = countChecked('intestino') + countChecked('urina') + countChecked('suor');
    counts[8] = Object.keys(SISTEMAS).reduce((acc, k) => acc + countChecked(`sistema_${k}`), 0);
    counts[9] = countChecked('emocional_sint') + countChecked('emocional_hist');
    counts[10] = countChecked('espiritual') + countChecked('social') + countChecked('vicios');
    counts[11] = Object.keys(EXAMES_GRUPOS).reduce((acc, k) => acc + countChecked(`exame_${k}`), 0);
    counts[12] = Object.keys(HIPOTESES_CATEGORIAS).reduce((acc, k) => acc + countChecked(`hipotese_${k}`), 0);
    return counts;
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── RENDERS POR ABA ──────────────────────────────────────────

  // ── Pressão de Pulso ─────────────────────────────────────────
  const ppSist = parseFloat(data.pa_sistolica) || 0;
  const ppDias = parseFloat(data.pa_diastolica) || 0;
  const pressaoPulso = ppSist > 0 && ppDias > 0 ? ppSist - ppDias : null;
  const getPpInfo = (pp) => {
    if (pp === null) return null;
    if (pp < 40)  return { label: 'Saudável', color: '#2e7d32', bg: '#e8f5e9', icon: '✅' };
    if (pp < 50)  return { label: 'Início de rigidez arterial', color: '#f57f17', bg: '#fff8e1', icon: '⚠️' };
    if (pp < 60)  return { label: 'Baixa elasticidade arterial', color: '#e65100', bg: '#fff3e0', icon: '🔶' };
    return { label: 'Alta rigidez arterial — maior risco cardiovascular', color: '#b71c1c', bg: '#ffebee', icon: '🔴' };
  };
  const ppInfo = getPpInfo(pressaoPulso);
  const ppAssociacao = pressaoPulso !== null && pressaoPulso >= 50
    ? 'Associar com: sono ruim, glicação, pressão arterial alta e inflamação crônica'
    : null;

  const renderIdentificacao = () => (
    <Box>
      <Grid container spacing={2}>
        {IDENTIFICACAO_FIELDS.map(f => (
          <Grid item xs={12} sm={f.key === 'nome' ? 12 : 6} md={f.key === 'nome' ? 6 : 3} key={f.key}>
            {f.type === 'select' ? (
              <FormControl fullWidth size="small">
                <InputLabel>{f.label}</InputLabel>
                <Select value={data[f.key] || ''} label={f.label}
                  onChange={e => set(f.key, e.target.value)}>
                  {f.options.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                </Select>
              </FormControl>
            ) : (
              <TextField fullWidth size="small" label={f.label} type={f.type}
                value={data[f.key] || ''}
                onChange={e => set(f.key, e.target.value)}
                InputProps={f.unit ? { endAdornment: <InputAdornment position="end">{f.unit}</InputAdornment> } : {}}
              />
            )}
          </Grid>
        ))}
      </Grid>

      {/* ── Pressão Arterial + Pressão de Pulso ── */}
      <Divider sx={{ my: 2 }} />
      <SectionTitle>❤️ Pressão Arterial (PA)</SectionTitle>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Sistólica (sístole)"
            type="number" inputProps={{ min: 60, max: 260 }}
            value={data.pa_sistolica || ''}
            onChange={e => set('pa_sistolica', e.target.value)}
            helperText="quando o coração fecha"
            InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Diastólica (diástole)"
            type="number" inputProps={{ min: 40, max: 160 }}
            value={data.pa_diastolica || ''}
            onChange={e => set('pa_diastolica', e.target.value)}
            helperText="quando o coração abre"
            InputProps={{ endAdornment: <InputAdornment position="end">mmHg</InputAdornment> }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {pressaoPulso !== null && ppInfo ? (
            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: ppInfo.bg, borderColor: ppInfo.color }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: ppInfo.color }}>
                  {ppInfo.icon} Pressão de Pulso: {pressaoPulso} mmHg
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: ppInfo.color, fontWeight: 600, fontSize: '0.82rem' }}>
                {ppInfo.label}
              </Typography>
              {ppAssociacao && (
                <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#bf360c', fontStyle: 'italic' }}>
                  ⚠️ {ppAssociacao}
                </Typography>
              )}
              <Divider sx={{ my: 0.8 }} />
              <Typography variant="caption" sx={{ color: '#555', display: 'block', lineHeight: 1.5 }}>
                {'< 40 ✅ Saudável  •  40–50 ⚠️ Início de rigidez  •  50–60 🔶 Baixa elasticidade  •  > 60 🔴 Alta rigidez'}
              </Typography>
            </Paper>
          ) : (
            <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f5f5f5' }}>
              <Typography variant="caption" sx={{ color: '#757575' }}>
                Preencha a PA sistólica e diastólica para calcular a <strong>Pressão de Pulso</strong> e ver a interpretação clínica.
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#9e9e9e', fontSize: '0.7rem' }}>
                {'< 40 ✅ Saudável  •  40–50 ⚠️ Início de rigidez  •  50–60 🔶 Baixa elasticidade  •  > 60 🔴 Alta rigidez'}
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  const renderQueixa = () => (
    <Box>
      <SectionTitle>Descreva a queixa principal</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        label="Queixa principal (em palavras do paciente)"
        value={data.queixaPrincipal || ''}
        onChange={e => set('queixaPrincipal', e.target.value)}
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Tempo de evolução</InputLabel>
            <Select value={data.queixaTempo || ''} label="Tempo de evolução"
              onChange={e => set('queixaTempo', e.target.value)}>
              {QUEIXA_TEMPO.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Evolução recente</InputLabel>
            <Select value={data.queixaEvolucao || ''} label="Evolução recente"
              onChange={e => set('queixaEvolucao', e.target.value)}>
              {QUEIXA_EVOLUCAO.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth size="small" label="Intensidade (0–10)"
            type="number" inputProps={{ min: 0, max: 10 }}
            value={data.queixaIntensidade || ''}
            onChange={e => set('queixaIntensidade', e.target.value)}
          />
        </Grid>
      </Grid>

      <SectionTitle count={countChecked('queixa_piora')}>Fatores que pioram</SectionTitle>
      <SearchBox value={search.queixa_piora || ''} onChange={v => setSearch_('queixa_piora', v)} />
      <CheckList items={QUEIXA_FATORES_PIORA} checked={data.queixa_piora || {}}
        onToggle={i => toggleCheck('queixa_piora', i)} searchTerm={search.queixa_piora} />

      <SectionTitle count={countChecked('queixa_melhora')}>Fatores que melhoram</SectionTitle>
      <SearchBox value={search.queixa_melhora || ''} onChange={v => setSearch_('queixa_melhora', v)} />
      <CheckList items={QUEIXA_FATORES_MELHORA} checked={data.queixa_melhora || {}}
        onToggle={i => toggleCheck('queixa_melhora', i)} searchTerm={search.queixa_melhora} />

      <SectionTitle>Tratamentos anteriores e resultados</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.queixaTratamentos || ''} onChange={e => set('queixaTratamentos', e.target.value)} />
    </Box>
  );

  const renderAntecedentes = () => (
    <Box>
      {[
        { key: 'doencas', label: 'Doenças / Condições prévias', items: DOENCAS_PREVIAS },
        { key: 'cirurgias', label: 'Cirurgias realizadas', items: CIRURGIAS_ITEMS },
        { key: 'medicamentos', label: 'Medicamentos em uso (classe)', items: MEDICAMENTOS_CLASSES },
        { key: 'alergias', label: 'Alergias e intolerâncias', items: ALERGIAS_ITEMS },
        { key: 'vacinas', label: 'Vacinas atualizadas', items: VACINAS_ITEMS },
        { key: 'hospitalizacoes', label: 'Internações / hospitalizações', items: HOSPITALIZACOES_ITEMS },
      ].map(({ key, label, items }) => (
        <Box key={key}>
          <SectionTitle count={countChecked(key)}>{label}</SectionTitle>
          <SearchBox value={search[key] || ''} onChange={v => setSearch_(key, v)} />
          <CheckList items={items} checked={data[key] || {}}
            onToggle={i => toggleCheck(key, i)} searchTerm={search[key]} />
        </Box>
      ))}
      <SectionTitle>Medicamentos — nome e dose (texto livre)</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        value={data.medicamentosDetalhe || ''} onChange={e => set('medicamentosDetalhe', e.target.value)} />
      <SectionTitle>Observações gerais sobre antecedentes</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.antecedentesObs || ''} onChange={e => set('antecedentesObs', e.target.value)} />
    </Box>
  );

  const renderFamilia = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        Marque as doenças presentes nos familiares. Use o campo texto para especificar parente e tipo de câncer, se aplicável.
      </Alert>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {FAMILIA_PARENTES.map(p => (
          <Grid item xs={6} sm={4} md={3} key={p}>
            <Chip label={p} variant={data[`familiar_${p}`] ? 'filled' : 'outlined'}
              color={data[`familiar_${p}`] ? 'primary' : 'default'}
              onClick={() => set(`familiar_${p}`, !data[`familiar_${p}`])}
              sx={{ width: '100%', cursor: 'pointer' }}
            />
          </Grid>
        ))}
      </Grid>
      <SectionTitle count={countChecked('familia_doencas')}>Doenças na família</SectionTitle>
      <SearchBox value={search.familia || ''} onChange={v => setSearch_('familia', v)} />
      <CheckList items={FAMILIA_DOENCAS} checked={data.familia_doencas || {}}
        onToggle={i => toggleCheck('familia_doencas', i)} searchTerm={search.familia} />
      <SectionTitle>Especificações (parente / tipo de câncer / outras doenças)</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        value={data.familiaObs || ''} onChange={e => set('familiaObs', e.target.value)} />
    </Box>
  );

  const renderAlimentacao = () => (
    <Box>
      {[
        { key: 'alimentacao_padrao', label: 'Padrão alimentar', items: ALIMENTACAO_PADRAO },
        { key: 'alimentos', label: 'Alimentos consumidos diariamente', items: ALIMENTOS_CONSUMO_DIARIO },
        { key: 'sinais_alim', label: 'Sinais e comportamentos alimentares', items: SINAIS_ALIMENTARES },
      ].map(({ key, label, items }) => (
        <Box key={key}>
          <SectionTitle count={countChecked(key)}>{label}</SectionTitle>
          <SearchBox value={search[key] || ''} onChange={v => setSearch_(key, v)} />
          <CheckList items={items} checked={data[key] || {}}
            onToggle={i => toggleCheck(key, i)} searchTerm={search[key]} />
        </Box>
      ))}
      <SectionTitle>Restrições alimentares / dietas específicas</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.alimentacaoRestricoes || ''} onChange={e => set('alimentacaoRestricoes', e.target.value)} />
      <SectionTitle>Suplementos em uso (alimentação)</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.suplementosUso || ''} onChange={e => set('suplementosUso', e.target.value)} />
    </Box>
  );

  const renderSono = () => (
    <Box>
      <SectionTitle count={countChecked('sono')}>Padrão de sono</SectionTitle>
      <SearchBox value={search.sono || ''} onChange={v => setSearch_('sono', v)} />
      <CheckList items={SONO_PADRAO} checked={data.sono || {}}
        onToggle={i => toggleCheck('sono', i)} searchTerm={search.sono} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Hora de dormir" value={data.horaDormir || ''}
            onChange={e => set('horaDormir', e.target.value)} placeholder="ex: 22:30" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Hora de acordar" value={data.horaAcordar || ''}
            onChange={e => set('horaAcordar', e.target.value)} placeholder="ex: 06:30" />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField fullWidth size="small" label="Total de horas" type="number"
            value={data.horasSono || ''} onChange={e => set('horasSono', e.target.value)}
            InputProps={{ endAdornment: <InputAdornment position="end">h</InputAdornment> }} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Qualidade subjetiva</InputLabel>
            <Select value={data.qualidadeSono || ''} label="Qualidade subjetiva"
              onChange={e => set('qualidadeSono', e.target.value)}>
              {['Ótima','Boa','Regular','Ruim','Péssima'].map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <SectionTitle count={countChecked('energia')}>Padrão de energia</SectionTitle>
      <SearchBox value={search.energia || ''} onChange={v => setSearch_('energia', v)} />
      <CheckList items={ENERGIA_PADRAO} checked={data.energia || {}}
        onToggle={i => toggleCheck('energia', i)} searchTerm={search.energia} />
      <SectionTitle>Observações sobre sono e energia</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.sonoObs || ''} onChange={e => set('sonoObs', e.target.value)} />
    </Box>
  );

  const renderAtividade = () => (
    <Box>
      <SectionTitle count={countChecked('atividade_tipo')}>Tipo de atividade física</SectionTitle>
      <SearchBox value={search.atividade || ''} onChange={v => setSearch_('atividade', v)} />
      <CheckList items={ATIVIDADE_TIPO} checked={data.atividade_tipo || {}}
        onToggle={i => toggleCheck('atividade_tipo', i)} searchTerm={search.atividade} />
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Frequência</InputLabel>
            <Select value={data.atividadeFreq || ''} label="Frequência"
              onChange={e => set('atividadeFreq', e.target.value)}>
              {ATIVIDADE_FREQUENCIA.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Duração por sessão</InputLabel>
            <Select value={data.atividadeDur || ''} label="Duração por sessão"
              onChange={e => set('atividadeDur', e.target.value)}>
              {ATIVIDADE_DURACAO.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Intensidade</InputLabel>
            <Select value={data.atividadeInt || ''} label="Intensidade"
              onChange={e => set('atividadeInt', e.target.value)}>
              {ATIVIDADE_INTENSIDADE.map(o => <MenuItem key={o} value={o}>{o}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <SectionTitle count={countChecked('atividade_sinais')}>Sinais durante ou após exercício</SectionTitle>
      <CheckList items={ATIVIDADE_SINAIS} checked={data.atividade_sinais || {}}
        onToggle={i => toggleCheck('atividade_sinais', i)} searchTerm="" />
    </Box>
  );

  const renderEliminacoes = () => (
    <Box>
      {[
        { key: 'intestino', label: '💩 Intestino / Fezes', items: INTESTINO_PADRAO },
        { key: 'urina', label: '💧 Urina', items: URINA_PADRAO },
        { key: 'suor', label: '💦 Suor / Pele', items: SUOR_PADRAO },
        { key: 'resp_elim', label: '🌬️ Respiração / Secreções', items: RESPIRACAO_ELIMINACAO },
      ].map(({ key, label, items }) => (
        <Box key={key}>
          <SectionTitle count={countChecked(key)}>{label}</SectionTitle>
          <CheckList items={items} checked={data[key] || {}}
            onToggle={i => toggleCheck(key, i)} searchTerm="" />
        </Box>
      ))}
    </Box>
  );

  const renderSistemas = () => (
    <Box>
      <SearchBox value={search.sistemas || ''} onChange={v => setSearch_('sistemas', v)} />
      {Object.entries(SISTEMAS).map(([sKey, sis]) => {
        const cnt = countChecked(`sistema_${sKey}`);
        return (
          <Accordion key={sKey} defaultExpanded={cnt > 0}
            sx={{ mb: 1, '&:before': { display: 'none' }, borderRadius: '8px !important', overflow: 'hidden' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: cnt > 0 ? '#e3f2fd' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{sis.label}</Typography>
                {cnt > 0 && <Chip label={cnt} size="small" color="primary" sx={{ height: 18, fontSize: '0.7rem', ml: 'auto', mr: 2 }} />}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList items={sis.itens} checked={data[`sistema_${sKey}`] || {}}
                onToggle={i => toggleCheck(`sistema_${sKey}`, i)}
                searchTerm={search.sistemas} />
            </AccordionDetails>
          </Accordion>
        );
      })}
      <SectionTitle>Outras queixas por sistema (texto livre)</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        value={data.sistemasObs || ''} onChange={e => set('sistemasObs', e.target.value)} />
    </Box>
  );

  const renderEmocional = () => (
    <Box>
      {[
        { key: 'emocional_sint', label: '🌀 Sintomas psico-emocionais', items: EMOCIONAL_SINTOMAS },
        { key: 'emocional_hist', label: '📖 História e eventos de vida', items: EMOCIONAL_HISTORIA },
        { key: 'emocional_rec', label: '🌈 Recursos e suportes atuais', items: EMOCIONAL_RECURSOS },
      ].map(({ key, label, items }) => (
        <Box key={key}>
          <SectionTitle count={countChecked(key)}>{label}</SectionTitle>
          <SearchBox value={search[key] || ''} onChange={v => setSearch_(key, v)} />
          <CheckList items={items} checked={data[key] || {}}
            onToggle={i => toggleCheck(key, i)} searchTerm={search[key]} />
        </Box>
      ))}
      <SectionTitle>Escala de bem-estar subjetivo (0–10)</SectionTitle>
      <Grid container spacing={2}>
        {[
          { key: 'bem_estar_geral', label: 'Bem-estar geral' },
          { key: 'bem_estar_emocional', label: 'Equilíbrio emocional' },
          { key: 'bem_estar_social', label: 'Relacionamentos' },
          { key: 'bem_estar_proposito', label: 'Sentido de propósito' },
        ].map(f => (
          <Grid item xs={6} sm={3} key={f.key}>
            <TextField fullWidth size="small" label={f.label} type="number"
              inputProps={{ min: 0, max: 10 }}
              value={data[f.key] || ''}
              onChange={e => set(f.key, e.target.value)}
              InputProps={{ endAdornment: <InputAdornment position="end">/10</InputAdornment> }}
            />
          </Grid>
        ))}
      </Grid>
      <SectionTitle>Acompanhamento psicológico / psiquiátrico atual</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        value={data.emocionalAcomp || ''} onChange={e => set('emocionalAcomp', e.target.value)} />
    </Box>
  );

  const renderEspiritual = () => (
    <Box>
      {[
        { key: 'espiritual', label: '🌿 Dimensão espiritual', items: ESPIRITUAL_ITENS },
        { key: 'social', label: '👥 Aspectos sociais', items: SOCIAL_ITENS },
        { key: 'vicios', label: '⚠️ Hábitos e vícios', items: HABITOS_VICIOSO },
      ].map(({ key, label, items }) => (
        <Box key={key}>
          <SectionTitle count={countChecked(key)}>{label}</SectionTitle>
          <CheckList items={items} checked={data[key] || {}}
            onToggle={i => toggleCheck(key, i)} searchTerm="" />
        </Box>
      ))}
      <SectionTitle>Comentários sobre dimensão espiritual e social</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        value={data.espiritualObs || ''} onChange={e => set('espiritualObs', e.target.value)} />
    </Box>
  );

  const renderExames = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        Marque os exames alterados e registre o valor encontrado no campo texto abaixo de cada grupo.
        Os valores de referência são funcionais (medicina integrativa), podendo diferir da referência laboratorial convencional.
      </Alert>
      <SearchBox value={search.exames || ''} onChange={v => setSearch_('exames', v)} />
      {Object.entries(EXAMES_GRUPOS).map(([gKey, grupo]) => {
        const cnt = countChecked(`exame_${gKey}`);
        const filtered = search.exames
          ? grupo.itens.filter(i => i.label.toLowerCase().includes(search.exames.toLowerCase()))
          : grupo.itens;
        return (
          <Accordion key={gKey} defaultExpanded={cnt > 0}
            sx={{ mb: 1, '&:before': { display: 'none' }, borderRadius: '8px !important', overflow: 'hidden' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: cnt > 0 ? '#fce4ec' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{grupo.label}</Typography>
                {cnt > 0 && <Chip label={cnt} size="small" color="error" sx={{ height: 18, fontSize: '0.7rem', ml: 'auto', mr: 2 }} />}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {filtered.map(exame => (
                  <Grid item xs={12} sm={6} md={4} key={exame.key}>
                    <Paper variant="outlined" sx={{ p: 1, borderRadius: 1,
                      bgcolor: (data[`exame_${gKey}`] || {})[exame.label] ? '#fff8e1' : 'transparent',
                      borderColor: (data[`exame_${gKey}`] || {})[exame.label] ? '#f9a825' : '#e0e0e0',
                    }}>
                      <FormControlLabel
                        control={
                          <Checkbox size="small"
                            checked={!!((data[`exame_${gKey}`] || {})[exame.label])}
                            onChange={() => toggleCheck(`exame_${gKey}`, exame.label)}
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', fontWeight: 600 }}>{exame.label}</Typography>
                            <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.7rem' }}>Ref: {exame.ref}</Typography>
                          </Box>
                        }
                        sx={{ alignItems: 'flex-start', m: 0 }}
                      />
                      {(data[`exame_${gKey}`] || {})[exame.label] && (
                        <TextField size="small" fullWidth
                          placeholder="Valor encontrado"
                          value={data[`exame_val_${exame.key}`] || ''}
                          onChange={e => set(`exame_val_${exame.key}`, e.target.value)}
                          sx={{ mt: 0.5 }}
                        />
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <TextField fullWidth size="small" multiline rows={2} sx={{ mt: 2 }}
                label={`Observações — ${grupo.label}`}
                value={data[`exame_obs_${gKey}`] || ''}
                onChange={e => set(`exame_obs_${gKey}`, e.target.value)}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );

  const renderDiagnostico = () => (
    <Box>
      <Alert severity="warning" sx={{ mb: 2 }}>
        As hipóteses diagnósticas são inferências do terapeuta integrativo com base nos dados coletados.
        Não substituem diagnóstico médico. Registre as hipóteses para orientar o plano terapêutico.
      </Alert>
      <SearchBox value={search.diag || ''} onChange={v => setSearch_('diag', v)} />
      {Object.entries(HIPOTESES_CATEGORIAS).map(([catKey, cat]) => {
        const cnt = countChecked(`hipotese_${catKey}`);
        return (
          <Accordion key={catKey} defaultExpanded={cnt > 0}
            sx={{ mb: 1, '&:before': { display: 'none' }, borderRadius: '8px !important', overflow: 'hidden' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: cnt > 0 ? '#fce4ec' : '#f5f5f5' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{cat.label}</Typography>
                {cnt > 0 && <Chip label={cnt} size="small" color="error" sx={{ height: 18, fontSize: '0.7rem', ml: 'auto', mr: 2 }} />}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <CheckList items={cat.itens} checked={data[`hipotese_${catKey}`] || {}}
                onToggle={i => toggleCheck(`hipotese_${catKey}`, i)}
                searchTerm={search.diag} />
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* Resumo diagnóstico */}
      {Object.values(HIPOTESES_CATEGORIAS).some((cat, idx) =>
        countChecked(`hipotese_${Object.keys(HIPOTESES_CATEGORIAS)[idx]}`) > 0
      ) && (
        <Paper sx={{ p: 2, mt: 2, bgcolor: '#fff3e0', border: '1px solid #ffcc02' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#e65100' }}>
            📊 Resumo das hipóteses selecionadas
          </Typography>
          {Object.entries(HIPOTESES_CATEGORIAS).map(([catKey, cat]) => {
            const selecionados = cat.itens.filter(i => (data[`hipotese_${catKey}`] || {})[i]);
            if (!selecionados.length) return null;
            return (
              <Box key={catKey} sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#555' }}>{cat.label}:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.3 }}>
                  {selecionados.map(i => (
                    <Chip key={i} label={i} size="small" onDelete={() => toggleCheck(`hipotese_${catKey}`, i)}
                      sx={{ fontSize: '0.72rem', height: 22, bgcolor: '#fff', border: '1px solid #ef9a9a' }} />
                  ))}
                </Box>
              </Box>
            );
          })}
        </Paper>
      )}

      <SectionTitle>Plano terapêutico e observações gerais</SectionTitle>
      <TextField fullWidth multiline rows={5} size="small"
        label="Condutas, encaminhamentos, metas e observações"
        value={data.observacoesGerais || ''} onChange={e => set('observacoesGerais', e.target.value)} />
    </Box>
  );

  const handlePrintReceituario = () => {
    const hipsDiag = Object.entries(HIPOTESES_CATEGORIAS).flatMap(([catKey, cat]) =>
      cat.itens.filter(i => (data[`hipotese_${catKey}`] || {})[i]).map(i => `<li>${i}</li>`)
    ).join('');
    const w = window.open('', '_blank');
    w.document.write(`<!DOCTYPE html><html lang="pt-BR"><head>
<meta charset="utf-8"/>
<title>Receituário — ${data.nome || 'Paciente'}</title>
<style>
  @page { size: A4; margin: 18mm 18mm 22mm 18mm; }
  body { font-family: Arial, sans-serif; font-size: 12px; color: #1a1a1a; margin: 0; }
  .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1565c0; padding-bottom: 12px; margin-bottom: 14px; }
  .logo-box { width: 68px; height: 68px; border: 2px solid #1565c0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #1565c0; }
  .clinic-info h1 { font-size: 16px; color: #1565c0; margin: 0 0 2px; }
  .clinic-info p { margin: 1px 0; font-size: 11px; color: #444; }
  .title-bar { background: #1565c0; color: #fff; text-align: center; padding: 8px 0; font-size: 15px; font-weight: bold; letter-spacing: 1px; border-radius: 4px; margin-bottom: 14px; }
  .patient-box { border: 1px solid #90caf9; border-radius: 6px; padding: 10px 14px; margin-bottom: 14px; background: #e3f2fd; }
  .patient-box p { margin: 3px 0; font-size: 11.5px; }
  .section-title { font-size: 12.5px; font-weight: bold; color: #1565c0; border-bottom: 1px solid #90caf9; margin: 14px 0 6px; padding-bottom: 3px; }
  .rx-block { background: #fafafa; border: 1px solid #e0e0e0; border-radius: 5px; padding: 10px 14px; margin-bottom: 10px; min-height: 48px; font-size: 12px; white-space: pre-wrap; }
  .diag-list ul { margin: 4px 0; padding-left: 18px; font-size: 11.5px; }
  .signature-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 28px; padding-top: 14px; border-top: 1px solid #bbb; }
  .sig-block { text-align: center; min-width: 160px; }
  .sig-line { border-top: 1px solid #333; margin-top: 40px; font-size: 11px; padding-top: 4px; }
  .footer { position: fixed; bottom: 0; left: 0; right: 0; background: #f5f5f5; border-top: 1px solid #ccc; text-align: center; font-size: 10px; color: #777; padding: 6px 0; }
  @media print { .no-print { display: none; } }
</style></head><body>
<div class="no-print" style="background:#1565c0;color:#fff;padding:8px 16px;text-align:center;font-size:13px;cursor:pointer" onclick="window.print()">
  🖨️ Clique aqui para imprimir / salvar como PDF
</div>
<div style="padding:12px 14px;">
  <div class="header">
    <div class="logo-box">⚕️</div>
    <div class="clinic-info" style="flex:1;padding-left:18px;">
      <h1>${data.profissionalNome || 'Luciana Caxito'}</h1>
      <p>Especialidade: ${data.profissionalEspecialidade || 'Nutrição Integrativa e Funcional'}</p>
      <p>Registro: ${data.profissionalRegistro || 'CRN — / CRM —'}</p>
      <p>Endereço: ${data.profissionalEndereco || '—'}</p>
      <p>Tel.: ${data.profissionalTelefone || '—'} | E-mail: ${data.profissionalEmail || '—'}</p>
    </div>
    <div style="text-align:right;font-size:11px;color:#888;">
      Data: ${new Date().toLocaleDateString('pt-BR')}<br/>
      N° ${String(Date.now()).slice(-6)}
    </div>
  </div>
  <div class="title-bar">RECEITUÁRIO / PROTOCOLO TERAPÊUTICO INTEGRATIVO</div>
  <div class="patient-box">
    <p><strong>Paciente:</strong> ${data.nome || '—'} &nbsp;&nbsp; <strong>Sexo:</strong> ${data.sexo || '—'} &nbsp;&nbsp; <strong>Idade:</strong> ${data.idade || '—'} anos &nbsp;&nbsp; <strong>Nasc.:</strong> ${data.dataNasc || '—'}</p>
    <p><strong>Profissão:</strong> ${data.profissao || '—'} &nbsp;&nbsp; <strong>Cidade:</strong> ${data.cidade || '—'} &nbsp;&nbsp; <strong>Tel.:</strong> ${data.telefone || '—'}</p>
    <p><strong>Queixa principal:</strong> ${data.queixaPrincipal || '—'}</p>
  </div>
  ${hipsDiag ? '<div class="section-title">Hipóteses Diagnósticas</div><div class="diag-list"><ul>' + hipsDiag + '</ul></div>' : ''}
  <div class="section-title">Rp — Suplementação / Nutraceuticos</div>
  <div class="rx-block">${(data.rx_suplementacao || '').replace(/\n/g, '<br/>') || '(em branco)'}</div>
  <div class="section-title">Rp — Fitoterapícos</div>
  <div class="rx-block">${(data.rx_fitoterapicos || '').replace(/\n/g, '<br/>') || '(em branco)'}</div>
  <div class="section-title">Orientações Nutricionais</div>
  <div class="rx-block">${(data.rx_nutricional || '').replace(/\n/g, '<br/>') || '(em branco)'}</div>
  <div class="section-title">Estilo de Vida</div>
  <div class="rx-block">${(data.rx_estilo || '').replace(/\n/g, '<br/>') || '(em branco)'}</div>
  <div class="section-title">Encaminhamentos</div>
  <div class="rx-block">${(data.rx_encaminhamentos || '').replace(/\n/g, '<br/>') || '(em branco)'}</div>
  <div class="section-title">Retorno Previsto</div>
  <div class="rx-block">${data.rx_retorno || '(em branco)'}</div>
  <div class="signature-row">
    <div class="sig-block"><div class="sig-line">Assinatura do Profissional<br/>${data.profissionalNome || 'Profissional'}<br/>${data.profissionalRegistro || ''}</div></div>
    <div class="sig-block"><div class="sig-line">Carimbo / Stamp</div></div>
    <div class="sig-block"><div class="sig-line">Assinatura do Paciente<br/>${data.nome || 'Paciente'}</div></div>
  </div>
</div>
<div class="footer">
  Este receituário é exclusivo para uso clínico integrativo. Não substitui prescrição médica.
  Emitido em ${new Date().toLocaleDateString('pt-BR')} — ${data.profissionalNome || 'Luciana Caxito'}
</div>
</body></html>`);
    w.document.close();
  };

  const renderReceituario = () => (
    <Box>
      <Alert severity="info" sx={{ mb: 2 }}>
        Preencha os campos abaixo para gerar o receituário integrativo completo com cabeçalho profissional e rodapé.
      </Alert>

      <Paper sx={{ p: 2, mb: 2, bgcolor: '#e3f2fd', border: '1px solid #90caf9' }}>
        <SectionTitle>🏥 Dados do Profissional</SectionTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Nome do Profissional" value={data.profissionalNome || ''} onChange={e => set('profissionalNome', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Especialidade" value={data.profissionalEspecialidade || ''} onChange={e => set('profissionalEspecialidade', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth size="small" label="Registro (CRN/CRM)" value={data.profissionalRegistro || ''} onChange={e => set('profissionalRegistro', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth size="small" label="Telefone" value={data.profissionalTelefone || ''} onChange={e => set('profissionalTelefone', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth size="small" label="E-mail" value={data.profissionalEmail || ''} onChange={e => set('profissionalEmail', e.target.value)} /></Grid>
          <Grid item xs={12}><TextField fullWidth size="small" label="Endereço Completo" value={data.profissionalEndereco || ''} onChange={e => set('profissionalEndereco', e.target.value)} /></Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, mb: 2, bgcolor: '#f1f8e9', border: '1px solid #a5d6a7' }}>
        <SectionTitle>👤 Dados do Paciente (da Identificação)</SectionTitle>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}><TextField fullWidth size="small" label="Nome" value={data.nome || ''} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={6} sm={2}><TextField fullWidth size="small" label="Idade" value={data.idade || ''} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={6} sm={2}><TextField fullWidth size="small" label="Sexo" value={data.sexo || ''} InputProps={{ readOnly: true }} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth size="small" label="Telefone" value={data.telefone || ''} InputProps={{ readOnly: true }} /></Grid>
        </Grid>
      </Paper>

      {Object.keys(HIPOTESES_CATEGORIAS).some(k => countChecked(`hipotese_${k}`) > 0) && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: '#fff8e1', border: '1px solid #ffe082' }}>
          <SectionTitle>📊 Hipóteses Diagnósticas Selecionadas</SectionTitle>
          {Object.entries(HIPOTESES_CATEGORIAS).map(([catKey, cat]) => {
            const selecionados = cat.itens.filter(i => (data[`hipotese_${catKey}`] || {})[i]);
            if (!selecionados.length) return null;
            return (
              <Box key={catKey} sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: '#666' }}>{cat.label}:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.3 }}>
                  {selecionados.map(i => <Chip key={i} label={i} size="small" sx={{ fontSize: '0.7rem', height: 20, bgcolor: '#fff', border: '1px solid #ffd54f' }} />)}
                </Box>
              </Box>
            );
          })}
        </Paper>
      )}

      <SectionTitle>💊 Rp — Suplementação / Nutraceuticos</SectionTitle>
      <TextField fullWidth multiline rows={5} size="small"
        placeholder="Ex: Vitamina D3 — 10.000 UI/dia, durante 90 dias&#10;mega-3 — 2g/dia (EPA+DHA)&#10;Magnésio Dimalato — 400mg/noite"
        value={data.rx_suplementacao || ''} onChange={e => set('rx_suplementacao', e.target.value)} sx={{ mb: 2 }} />

      <SectionTitle>🌿 Rp — Fitoterapícos</SectionTitle>
      <TextField fullWidth multiline rows={4} size="small"
        placeholder="Ex: Ashwagandha (Withania somnifera) — extrato seco 300mg — 2x/dia&#10;Rhodiola rosea — 200mg/manhã"
        value={data.rx_fitoterapicos || ''} onChange={e => set('rx_fitoterapicos', e.target.value)} sx={{ mb: 2 }} />

      <SectionTitle>🥗 Orientações Nutricionais</SectionTitle>
      <TextField fullWidth multiline rows={4} size="small"
        placeholder="Ex: Dieta anti-inflamatória — eliminar glúten e laticínios por 30 dias&#10;Aumentar consumo de vegetais crucíferos"
        value={data.rx_nutricional || ''} onChange={e => set('rx_nutricional', e.target.value)} sx={{ mb: 2 }} />

      <SectionTitle>🏃 Estilo de Vida</SectionTitle>
      <TextField fullWidth multiline rows={3} size="small"
        placeholder="Ex: Exercício aeróbico 30 min, 5x/semana&#10;Meditação 10 min/dia&#10;Higiene do sono: horário fixo, sem telas 1h antes"
        value={data.rx_estilo || ''} onChange={e => set('rx_estilo', e.target.value)} sx={{ mb: 2 }} />

      <SectionTitle>🔗 Encaminhamentos</SectionTitle>
      <TextField fullWidth multiline rows={2} size="small"
        placeholder="Ex: Encaminhar para endocrinologista para avaliação tireoidiana"
        value={data.rx_encaminhamentos || ''} onChange={e => set('rx_encaminhamentos', e.target.value)} sx={{ mb: 2 }} />

      <SectionTitle>📅 Retorno</SectionTitle>
      <TextField fullWidth size="small"
        placeholder="Ex: Retorno em 45 dias para reavaliação e novos exames"
        value={data.rx_retorno || ''} onChange={e => set('rx_retorno', e.target.value)} sx={{ mb: 3 }} />

      <Button variant="contained" size="large" startIcon={<PrintIcon />}
        onClick={handlePrintReceituario}
        sx={{ bgcolor: '#1565c0', '&:hover': { bgcolor: '#0d47a1' } }}>
        🖨️ Gerar Receituário para Impressão / PDF
      </Button>
    </Box>
  );

  const RENDERS = [
    renderIdentificacao,
    renderQueixa,
    renderAntecedentes,
    renderFamilia,
    renderAlimentacao,
    renderSono,
    renderAtividade,
    renderEliminacoes,
    renderSistemas,
    renderEmocional,
    renderEspiritual,
    renderExames,
    renderDiagnostico,
    renderReceituario,
  ];

  return (
    <Box sx={{ p: { xs: 1, sm: 2 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{
        background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%)',
        borderRadius: 3, p: { xs: 2, sm: 3 }, mb: 3, color: '#fff',
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          📋 Anamnese Integrativa I
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>
          Luciana Caxito — Avaliação integral do paciente em 14 domínios
        </Typography>
        {data.nome && (
          <Chip label={`Paciente: ${data.nome}`} sx={{ mt: 1, bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
        )}
      </Box>

      {/* Ações */}
      <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}
          color={saved ? 'success' : 'primary'}>
          {saved ? '✓ Salvo!' : 'Salvar rascunho'}
        </Button>
        <Button variant="outlined" startIcon={<PrintIcon />} onClick={handlePrint}>
          Imprimir / PDF
        </Button>
        <Button variant="text" onClick={() => navigate(-1)} sx={{ ml: 'auto' }}>
          ← Voltar
        </Button>
      </Stack>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 2, bgcolor: '#f5f5f5', borderRadius: 2,
          '& .MuiTab-root': { minHeight: 48, fontSize: '0.78rem', textTransform: 'none', fontWeight: 600 },
          '& .Mui-selected': { color: '#1565c0' },
        }}
      >
        {TABS.map((tab, idx) => {
          const cnt = tabCounts[idx] || 0;
          return (
            <Tab
              key={tab.id}
              label={
                <Badge badgeContent={cnt || undefined} color="error"
                  sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', height: 14, minWidth: 14 } }}>
                  <span>{tab.icon} {tab.label}</span>
                </Badge>
              }
            />
          );
        })}
      </Tabs>

      {/* Conteúdo da aba */}
      <Paper elevation={0} variant="outlined" sx={{ p: { xs: 1.5, sm: 2.5 }, borderRadius: 2, minHeight: 400 }}>
        {RENDERS[activeTab]?.()}
      </Paper>

      {/* Rodapé */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Button disabled={activeTab === 0} variant="outlined" size="small"
          onClick={() => setActiveTab(t => t - 1)}>← Anterior</Button>
        <Typography variant="caption" sx={{ color: '#757575', alignSelf: 'center' }}>
          {activeTab + 1} / {TABS.length} — {TABS[activeTab].label}
        </Typography>
        <Button disabled={activeTab === TABS.length - 1} variant="contained" size="small"
          onClick={() => setActiveTab(t => t + 1)}>Próximo →</Button>
      </Box>
    </Box>
  );
}
