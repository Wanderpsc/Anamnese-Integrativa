import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, TextField, Alert, Checkbox, FormControlLabel } from '@mui/material';
import { saveCsvToIndex, loadSymptomIndex, clearSymptomIndex, saveMapping, loadMapping } from '../lib/symptomIndex';

export default function DataImport() {
  const [csvText, setCsvText] = useState('');
  const [lastStatus, setLastStatus] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [mapping, setMapping] = useState(() => loadMapping() || { symptomColumn: '', numericColumns: [], suggestionColumns: [] });

  function updateHeaderCandidates(parsed) {
    const h = (parsed && parsed.length && Object.keys(parsed[0])) || [];
    setHeaders(h);
    // heuristic defaults if mapping empty
    if (!mapping || !mapping.symptomColumn) {
      const lower = h.map((x) => String(x).toLowerCase());
      const defaultSymptom = h[lower.findIndex((x) => x.includes('sintoma') || x.includes('symptom') || x.includes('nome'))];
      const defaultSuggestions = h.filter((x) => /sugest|suggest|trat|treatment|interven|protocolo|plano/i.test(x));
      const defaultNumeric = h.filter((x) => /score|indice|index|peso|weight|valor|value|percent|%/i.test(x));
      setMapping((m) => ({ ...m, symptomColumn: defaultSymptom || '', suggestionColumns: defaultSuggestions || [], numericColumns: defaultNumeric || [] }));
    }

    // detect overlap with common initial form fields and offer to hide them
    try {
      const canonical = ['altura', 'peso', 'cintura', 'quadril', 'imc'];
      const lower = h.map((x) => String(x).toLowerCase());
      const overlaps = canonical.filter((c) => lower.some((l) => l.includes(c)));
      if (overlaps.length) {
        // expose candidate overlaps to high-level UI so user can decide
        setLastStatus({ type: 'info', message: `Campos detectados na planilha: ${overlaps.join(', ')} — você pode ocultá-los do formulário inicial nas opções abaixo.` });
        // store temporary detection for UI (not permanent until user confirms)
        localStorage.setItem('form.detectedFields', JSON.stringify(overlaps));
      }
    } catch (err) {
      // ignore
    }
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCsvText(String(ev.target?.result ?? ''));
    reader.readAsText(file, 'utf-8');
  }

  function tryParseAndSave() {
    if (!csvText) {
      setLastStatus({ type: 'error', message: 'Nenhum CSV carregado.' });
      return;
    }

    try {
      const data = saveCsvToIndex(csvText);
      updateHeaderCandidates(data);
      setLastStatus({ type: 'success', message: `Importado ${data.length} linhas — pronto para usar.` });
    } catch (err) {
      setLastStatus({ type: 'error', message: String(err) });
    }
  }

  async function loadFromUrl(passedUrl) {
    // try to fetch CSV if user pasted a URL (or provided by query param)
    const url = passedUrl || csvText;
    if (!url) {
      setLastStatus({ type: 'error', message: 'Cole a URL pública da planilha ou carregue um CSV.' });
      return;
    }

    try {
      const r = await fetch(url);
      const text = await r.text();
      setCsvText(text);
      const data = saveCsvToIndex(text);
      updateHeaderCandidates(data);
      setLastStatus({ type: 'success', message: `Importado ${data.length} linhas da URL — pronto para usar.` });
    } catch (err) {
      setLastStatus({ type: 'error', message: String(err) });
    }
  }

  // if importUrl is provided as a query parameter, try importing automatically
  const location = useLocation();
  useEffect(() => {
    const q = new URLSearchParams(location.search || '');
    const importUrl = q.get('importUrl');
    if (importUrl) {
      setCsvText(importUrl);
      // call loader
      loadFromUrl(importUrl);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5">Importar índices / planilha</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Faça upload do arquivo CSV (exportado da sua planilha) ou cole uma URL pública de export CSV.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
          <input type="file" accept=".csv,text/csv" onChange={handleFile} />
          <Button variant="contained" onClick={tryParseAndSave}>Importar CSV carregado</Button>
        </Box>

        {headers.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Mapear colunas (opcional — recomendado)</Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>Coluna de sintoma (cada linha deve identificar um sintoma/termo):</Typography>
            <TextField select value={mapping.symptomColumn} onChange={(e) => setMapping((m) => ({ ...m, symptomColumn: e.target.value }))} SelectProps={{ native: true }} sx={{ mt: 1, mb: 1 }}>
              <option value="">— selecione —</option>
              {headers.map((h) => <option key={h} value={h}>{h}</option>)}
            </TextField>

            <Typography variant="body2" sx={{ mt: 1 }}>Colunas numéricas (índices / pesos) — selecione uma ou mais:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {headers.map((h) => (
                <FormControlLabel key={h} control={<Checkbox checked={(mapping.numericColumns || []).includes(h)} onChange={(e) => setMapping((m) => {
                  const list = new Set(m.numericColumns || []);
                  if (e.target.checked) list.add(h); else list.delete(h);
                  return { ...m, numericColumns: Array.from(list) };
                })} />} label={h} />
              ))}
            </Box>

            <Typography variant="body2" sx={{ mt: 1 }}>Colunas de sugestões/tratamento (texto) — selecione uma ou mais:</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              {headers.map((h) => (
                <FormControlLabel key={h} control={<Checkbox checked={(mapping.suggestionColumns || []).includes(h)} onChange={(e) => setMapping((m) => {
                  const list = new Set(m.suggestionColumns || []);
                  if (e.target.checked) list.add(h); else list.delete(h);
                  return { ...m, suggestionColumns: Array.from(list) };
                })} />} label={h} />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" onClick={() => { saveMapping(mapping); setLastStatus({ type: 'success', message: 'Mapeamento salvo.' }); }}>Salvar mapeamento</Button>
              <Button variant="outlined" onClick={() => { setMapping({ symptomColumn: '', numericColumns: [], suggestionColumns: [] }); saveMapping({}); setLastStatus({ type:'info', message: 'Mapeamento limpo' }); }}>Limpar mapeamento</Button>
            </Box>
          </Box>
        )}

        <Typography sx={{ mt: 2 }}>Ou cole URL pública de export CSV:</Typography>
        <TextField placeholder="https://docs.google.com/spreadsheets/.../export?format=csv&id=...&gid=..." value={csvText} onChange={(e) => setCsvText(e.target.value)} fullWidth multiline rows={3} sx={{ mt: 1 }} />
        <Box sx={{ display:'flex', gap:1, mt: 1 }}>
          <Button variant="outlined" onClick={loadFromUrl}>Importar da URL</Button>
          <Button variant="text" onClick={() => { const arr = loadSymptomIndex(); if (arr) setLastStatus({ type: 'info', message: `Cache: ${arr.length} linhas` }); else setLastStatus({ type:'info', message:'Nenhum índice em cache' }); }}>Ver cache</Button>
          <Button variant="text" color="error" onClick={() => { clearSymptomIndex(); setLastStatus({ type: 'info', message: 'Cache removido' }); }}>Limpar cache</Button>
        </Box>

        {/* If we detected overlapping fields (like altura/peso) suggest hiding them from initial form */}
        {localStorage.getItem('form.detectedFields') && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Detectamos os campos abaixo na planilha. Deseja ocultá-los do formulário inicial?</Typography>
            {JSON.parse(localStorage.getItem('form.detectedFields') || '[]').map((f) => (
              <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Button size="small" onClick={() => {
                  const current = JSON.parse(localStorage.getItem('form.hiddenFields') || '[]');
                  if (!current.includes(f)) {
                    current.push(f);
                    localStorage.setItem('form.hiddenFields', JSON.stringify(current));
                    setLastStatus({ type: 'success', message: `Campo '${f}' ocultado do formulário inicial.` });
                  } else {
                    setLastStatus({ type: 'info', message: `Campo '${f}' já está oculto.` });
                  }
                }}>Ocultar {f}</Button>
                <Button size="small" variant="outlined" onClick={() => {
                  // remove detected marker
                  const arr = JSON.parse(localStorage.getItem('form.detectedFields') || '[]').filter((x) => x !== f);
                  localStorage.setItem('form.detectedFields', JSON.stringify(arr));
                  setLastStatus({ type: 'info', message: `Campo '${f}' mantido.` });
                }}>Manter</Button>
              </Box>
            ))}
          </Box>
        )}

        {lastStatus && (
          <Alert severity={lastStatus.type} sx={{ mt: 2 }}>{lastStatus.message}</Alert>
        )}
      </Paper>
    </Container>
  );
}
