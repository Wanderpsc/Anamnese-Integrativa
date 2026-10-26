import React, { useMemo, useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
} from '@mui/material';
import {
  LocalHospital as LocalHospitalIcon,
  Print as PrintIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterIcon,
  FiberManualRecord as DotIcon,
} from '@mui/icons-material';
import { evaluateDiseases, generateDiagnosticSummary } from '../data/diseaseDiagnosisEngine';

// ─────────────────────────────────────────────────────────────────────────────
// PRINT CSS — layout tecnológico compacto A4
// ─────────────────────────────────────────────────────────────────────────────
const PRINT_CSS = `
@media print {
  @page { size: A4 portrait; margin: 1cm 1.2cm; }
  body > * { display: none !important; }
  #diagnostic-print-root { display: block !important; position: static !important; }
  #diagnostic-print-root * { color-adjust: exact; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .MuiPaper-root, .MuiCard-root { box-shadow: none !important; }

  .dr-print-header { background: #0d47a1 !important; color: #fff !important; padding: 10px 14px; border-radius: 4px; margin-bottom: 8px; }
  .dr-print-header h1 { font-size: 13pt; font-weight: 800; margin: 0 0 2px; }
  .dr-print-header p  { font-size: 7.5pt; margin: 0; opacity: 0.85; }

  .dr-print-patient { border: 1.5px solid #1565c0; border-radius: 4px; padding: 6px 10px; margin-bottom: 8px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 6px; }
  .dr-print-patient .label { font-size: 6.5pt; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
  .dr-print-patient .value { font-size: 9pt; font-weight: 700; color: #0d47a1; }

  .dr-print-counters { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 8px; }
  .dr-counter-box { border: 1.5px solid; border-radius: 3px; text-align: center; padding: 4px; }
  .dr-counter-box .num { font-size: 18pt; font-weight: 900; line-height: 1; }
  .dr-counter-box .lbl { font-size: 6.5pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; }

  .dr-print-summary { border-left: 4px solid #d32f2f; background: #fff3f3 !important; padding: 5px 8px; margin-bottom: 6px; border-radius: 0 3px 3px 0; font-size: 8pt; }

  .dr-print-disclaimer { background: #fffde7 !important; border: 1px solid #f9a825; border-radius: 3px; padding: 4px 8px; font-size: 7pt; color: #5f4c00; margin: 5px 0; }

  .dr-print-diseases-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }

  .dr-disease-card { border: 1.5px solid; border-radius: 4px; padding: 6px 8px; break-inside: avoid; page-break-inside: avoid; }
  .dr-disease-header { display: flex; align-items: flex-start; gap: 5px; margin-bottom: 3px; }
  .dr-disease-icon { font-size: 13pt; line-height: 1; }
  .dr-disease-title { font-size: 9pt; font-weight: 800; margin: 0 0 2px; line-height: 1.2; }
  .dr-disease-badges { display: flex; gap: 3px; flex-wrap: wrap; }
  .dr-badge { font-size: 5.5pt; font-weight: 700; padding: 1px 4px; border-radius: 2px; color: #fff; text-transform: uppercase; letter-spacing: 0.3px; }
  .dr-badge-cat { font-size: 5.5pt; padding: 1px 4px; border-radius: 2px; border: 0.5px solid #999; color: #555; }

  .dr-patient-explain { background: #e8f4fd !important; border-left: 3px solid #1565c0; padding: 3px 6px; font-size: 7pt; font-style: italic; color: #1a237e; margin: 3px 0; border-radius: 0 2px 2px 0; }

  .dr-protocols { margin: 3px 0; }
  .dr-protocol-block { margin-bottom: 3px; }
  .dr-protocol-title { font-size: 6.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; color: #2e7d32; margin-bottom: 2px; border-bottom: 0.5px solid #a5d6a7; padding-bottom: 1px; }
  .dr-protocol-items { display: flex; flex-wrap: wrap; gap: 2px; }
  .dr-protocol-item { font-size: 6.5pt; background: #f1f8e9 !important; border: 0.5px solid #c8e6c9; border-radius: 2px; padding: 1px 4px; line-height: 1.3; }

  .dr-exams-label { font-size: 6.5pt; font-weight: 700; color: #1565c0; margin: 3px 0 2px; }
  .dr-exams-chips { display: flex; flex-wrap: wrap; gap: 2px; }
  .dr-exam-chip { font-size: 6pt; border: 0.5px solid #90caf9; border-radius: 2px; padding: 1px 4px; color: #1565c0; background: #e3f2fd !important; }
  .dr-ref { font-size: 6pt; color: #888; margin-top: 2px; }

  .dr-print-action-title { font-size: 10pt; font-weight: 800; color: #1a237e; margin: 8px 0 4px; border-bottom: 2px solid #1a237e; padding-bottom: 2px; }
  .dr-print-action-table { width: 100%; border-collapse: collapse; font-size: 7.5pt; }
  .dr-print-action-table th { background: #1a237e !important; color: #fff; padding: 4px 6px; text-align: left; font-size: 7pt; text-transform: uppercase; }
  .dr-print-action-table td { padding: 3px 6px; border-bottom: 0.5px solid #ddd; vertical-align: top; }
  .dr-print-action-table tr:nth-child(even) td { background: #f5f5f5 !important; }
  .dr-priority-chip { font-size: 5.5pt; font-weight: 700; padding: 1px 4px; border-radius: 2px; background: #ffebee !important; color: #c62828; border: 0.5px solid #ef9a9a; }

  .dr-print-footer { border-top: 1px solid #ccc; padding-top: 4px; margin-top: 8px; font-size: 6.5pt; color: #777; display: flex; justify-content: space-between; }
  .dr-no-print { display: none !important; }
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURAÇÃO DE CERTEZA
// ─────────────────────────────────────────────────────────────────────────────
const CERT = {
  confirmado:    { label: '✅ CONFIRMADO',    color: '#b71c1c', bg: '#ffebee', border: '#ef5350' },
  provável:      { label: '⚠️ PROVÁVEL',      color: '#e65100', bg: '#fff3e0', border: '#ff9800' },
  predisposição: { label: '📊 PREDISPOSIÇÃO', color: '#1565c0', bg: '#e3f2fd', border: '#1976d2' },
};

const PROTO_ICONS = {
  'Fitoterápicos': '🌿', 'Ortomolecular': '💊', 'Alimentação': '🍽️',
  'Estilo de Vida': '🏃', 'Médico': '⚕️', 'Investigação': '🔬',
  'Fisioquântica': '⚡', 'Reposição': '💉', 'Reparo': '🔧',
};
function getProtoIcon(cat) {
  const k = Object.keys(PROTO_ICONS).find(k => cat.includes(k));
  return PROTO_ICONS[k] || '📋';
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD DE DOENÇA — TELA (protocolos visíveis em abas)
// ─────────────────────────────────────────────────────────────────────────────
function DiseaseCard({ disease }) {
  const [activeTab, setActiveTab] = useState(0);
  const cfg = CERT[disease.certainty] || CERT['predisposição'];
  const protocols = disease.protocols || [];

  return (
    <Card sx={{ mb: 2, border: `2px solid ${cfg.border}`, bgcolor: cfg.bg, borderRadius: 2 }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 1, borderBottom: `1px solid ${cfg.border}`, display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Typography sx={{ fontSize: '1.9rem', lineHeight: 1, mt: 0.2 }}>{disease.icon}</Typography>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: cfg.color, lineHeight: 1.2, fontSize: '1rem' }}>
            {disease.condition}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.4 }}>
            <Chip label={cfg.label} size="small" sx={{ bgcolor: cfg.border, color: '#fff', fontWeight: 700, fontSize: '0.65rem', height: 20 }} />
            <Chip label={disease.category} size="small" variant="outlined" sx={{ fontSize: '0.65rem', height: 20 }} />
            {disease.cid && <Chip label={`CID ${disease.cid}`} size="small" variant="outlined" sx={{ fontSize: '0.6rem', height: 20, color: '#888' }} />}
            {disease.severity === 'critical' && (
              <Chip label="⚠️ CRÍTICO" size="small" sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 700, fontSize: '0.6rem', height: 20 }} />
            )}
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ pt: 1.5, pb: '12px !important' }}>
        {/* Explicação para paciente */}
        <Box sx={{ bgcolor: '#e3f2fd', borderLeft: '4px solid #1565c0', borderRadius: '0 4px 4px 0', px: 1.5, py: 0.8, mb: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#1565c0', display: 'block', mb: 0.3 }}>
            🗣️ O que significa para você:
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: '0.82rem', color: '#1a237e' }}>
            "{disease.patientExplanation}"
          </Typography>
        </Box>

        {/* Descrição clínica */}
        <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#444', mb: 1.5, lineHeight: 1.4 }}>
          {disease.description}
        </Typography>

        {/* PROTOCOLOS — abas por categoria, sempre visíveis */}
        {protocols.length > 0 && (
          <Box sx={{ bgcolor: '#fff', borderRadius: 1.5, border: '1px solid #c8e6c9', overflow: 'hidden' }}>
            <Box sx={{ bgcolor: '#2e7d32', px: 1.5, py: 0.4 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1, fontSize: '0.7rem' }}>
                💊 PROTOCOLO TERAPÊUTICO INTEGRADO
              </Typography>
            </Box>

            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 32, bgcolor: '#f1f8e9', borderBottom: '1px solid #c8e6c9',
                '& .MuiTab-root': { minHeight: 32, py: 0, px: 1.5, fontSize: '0.7rem', fontWeight: 600, minWidth: 'auto' },
                '& .Mui-selected': { color: '#2e7d32 !important', fontWeight: 800 },
                '& .MuiTabs-indicator': { bgcolor: '#2e7d32', height: 3 },
              }}
            >
              {protocols.map((p, i) => (
                <Tab key={i} label={`${getProtoIcon(p.category)} ${p.category.replace(/\(.*?\)/g, '').trim()}`} />
              ))}
            </Tabs>

            {protocols[activeTab] && (
              <Box sx={{ px: 1.5, py: 1 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {protocols[activeTab].items.map((item, i) => (
                    <Box
                      key={i}
                      sx={{
                        bgcolor: '#f9fbe7', border: '1px solid #c8e6c9', borderRadius: 1,
                        px: 1, py: 0.4, fontSize: '0.75rem', lineHeight: 1.3,
                        display: 'flex', alignItems: 'flex-start', gap: 0.5,
                      }}
                    >
                      <DotIcon sx={{ fontSize: 8, mt: 0.4, color: '#4caf50', flexShrink: 0 }} />
                      <span>{item}</span>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ bgcolor: '#f1f8e9', px: 1.5, py: 0.4, display: 'flex', gap: 0.5, flexWrap: 'wrap', borderTop: '1px solid #c8e6c9' }} className="dr-no-print">
              {protocols.map((p, i) => (
                <Chip
                  key={i} label={i + 1} size="small" onClick={() => setActiveTab(i)}
                  sx={{
                    height: 18, fontSize: '0.65rem', cursor: 'pointer',
                    bgcolor: activeTab === i ? '#2e7d32' : '#fff',
                    color: activeTab === i ? '#fff' : '#2e7d32',
                    border: '1px solid #a5d6a7', fontWeight: 700,
                  }}
                />
              ))}
              <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#888', alignSelf: 'center' }}>
                {activeTab + 1}/{protocols.length} categorias
              </Typography>
            </Box>
          </Box>
        )}

        {/* Exames complementares */}
        {disease.examsToInvestigate?.length > 0 && (
          <Box sx={{ mt: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: '#1565c0', display: 'block', mb: 0.5 }}>
              🔬 Investigar também:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {disease.examsToInvestigate.map((e, i) => (
                <Chip key={i} label={e} size="small" variant="outlined"
                  sx={{ fontSize: '0.65rem', height: 20, color: '#1565c0', borderColor: '#90caf9' }} />
              ))}
            </Box>
          </Box>
        )}

        {/* Referências */}
        {disease.references && (
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#999', fontSize: '0.68rem' }}>
            📚 {disease.references}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export default function DiagnosticReport({ analysis, results, patientName, patientAge, patientSex, dataExame }) {
  const [filterCertainty, setFilterCertainty] = useState('all');

  // Injeta CSS de impressão
  useEffect(() => {
    const id = 'dr-print-css';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = PRINT_CSS;
      document.head.appendChild(style);
    }
  }, []);

  const diseases  = useMemo(() => evaluateDiseases(analysis || {}, results || {}), [analysis, results]);
  const filtered  = useMemo(() => filterCertainty === 'all' ? diseases : diseases.filter(d => d.certainty === filterCertainty), [diseases, filterCertainty]);
  const confirmed = diseases.filter(d => d.certainty === 'confirmado');
  const probable  = diseases.filter(d => d.certainty === 'provável');
  const predisps  = diseases.filter(d => d.certainty === 'predisposição');
  const critical  = diseases.filter(d => d.severity === 'critical');
  const summary   = generateDiagnosticSummary(diseases);

  if (!analysis || Object.keys(analysis).length === 0) {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        Preencha os valores dos exames acima para gerar o Relatório Diagnóstico Integrado.
      </Alert>
    );
  }

  if (diseases.length === 0) {
    return (
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#e8f5e9', border: '2px solid #4caf50', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: '#4caf50' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
              ✅ Nenhum padrão diagnóstico crítico identificado
            </Typography>
            <Typography variant="body2" color="text.secondary">Continue monitorando periodicamente.</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  // ─── DIV OCULTA NA TELA — VISÍVEL APENAS NA IMPRESSÃO ────────────────────
  const printRoot = (
    <div id="diagnostic-print-root" style={{ display: 'none' }}>
      <div className="dr-print-header">
        <h1>📋 RELATÓRIO DIAGNÓSTICO INTEGRADO — MEDICINA FUNCIONAL</h1>
        <p>Diagnósticos, Predisposições e Protocolos Terapêuticos por Resultado Laboratorial</p>
        <p>Ref.: Luciana Caxito Lopes — Manual Prático da Anamnese Integrativa + Guia dos Exames Laboratoriais</p>
      </div>

      <div className="dr-print-patient">
        <div><div className="label">Paciente</div><div className="value">{patientName || '—'}</div></div>
        <div><div className="label">Idade</div><div className="value">{patientAge ? `${patientAge} anos` : '—'}</div></div>
        <div><div className="label">Sexo</div><div className="value">{patientSex || '—'}</div></div>
        <div><div className="label">Data Exame</div><div className="value">{dataExame ? new Date(dataExame).toLocaleDateString('pt-BR') : '—'}</div></div>
        <div><div className="label">Gerado em</div><div className="value">{new Date().toLocaleDateString('pt-BR')}</div></div>
      </div>

      <div className="dr-print-counters">
        <div className="dr-counter-box" style={{ borderColor: '#ef5350', color: '#b71c1c' }}>
          <div className="num">{confirmed.length}</div><div className="lbl">Confirmados</div>
        </div>
        <div className="dr-counter-box" style={{ borderColor: '#ff9800', color: '#e65100' }}>
          <div className="num">{probable.length}</div><div className="lbl">Prováveis</div>
        </div>
        <div className="dr-counter-box" style={{ borderColor: '#1976d2', color: '#1565c0' }}>
          <div className="num">{predisps.length}</div><div className="lbl">Predisposições</div>
        </div>
        <div className="dr-counter-box" style={{ borderColor: '#ffc107', color: '#f57f17' }}>
          <div className="num">{critical.length}</div><div className="lbl">Críticos</div>
        </div>
      </div>

      <div className="dr-print-summary"><strong>🩺 RESUMO EXECUTIVO — </strong>{summary}</div>

      <div className="dr-print-disclaimer">
        ⚕️ <strong>AVISO:</strong> Este relatório é baseado em Medicina Funcional Integrativa. NÃO substitui avaliação médica. Deve ser interpretado por profissional habilitado.
      </div>

      <div className="dr-print-diseases-grid">
        {diseases.map(disease => {
          const cfg = CERT[disease.certainty] || CERT['predisposição'];
          return (
            <div key={disease.id} className="dr-disease-card" style={{ borderColor: cfg.border }}>
              <div className="dr-disease-header">
                <div className="dr-disease-icon">{disease.icon}</div>
                <div>
                  <p className="dr-disease-title" style={{ color: cfg.color }}>{disease.condition}</p>
                  <div className="dr-disease-badges">
                    <span className="dr-badge" style={{ backgroundColor: cfg.border }}>{cfg.label}</span>
                    <span className="dr-badge-cat">{disease.category}</span>
                    {disease.cid && <span className="dr-badge-cat">CID {disease.cid}</span>}
                    {disease.severity === 'critical' && <span className="dr-badge" style={{ backgroundColor: '#d32f2f' }}>⚠️ CRÍTICO</span>}
                  </div>
                </div>
              </div>
              <div className="dr-patient-explain">"{disease.patientExplanation}"</div>
              <div className="dr-protocols">
                {(disease.protocols || []).map((proto, pi) => (
                  <div key={pi} className="dr-protocol-block">
                    <div className="dr-protocol-title">{getProtoIcon(proto.category)} {proto.category.replace(/\(.*?\)/g, '').trim()}</div>
                    <div className="dr-protocol-items">
                      {proto.items.map((item, ii) => <span key={ii} className="dr-protocol-item">• {item}</span>)}
                    </div>
                  </div>
                ))}
              </div>
              {disease.examsToInvestigate?.length > 0 && (
                <>
                  <div className="dr-exams-label">🔬 Investigar:</div>
                  <div className="dr-exams-chips">
                    {disease.examsToInvestigate.map((e, i) => <span key={i} className="dr-exam-chip">{e}</span>)}
                  </div>
                </>
              )}
              {disease.references && <div className="dr-ref">📚 {disease.references}</div>}
            </div>
          );
        })}
      </div>

      <div className="dr-print-action-title">📌 PLANO DE AÇÃO — PRIORIDADES</div>
      <table className="dr-print-action-table">
        <thead>
          <tr>
            <th style={{ width: '5%' }}>—</th>
            <th style={{ width: '28%' }}>Condição</th>
            <th style={{ width: '15%' }}>Certeza</th>
            <th>Ação Prioritária</th>
          </tr>
        </thead>
        <tbody>
          {diseases.map((d, i) => {
            const cfg = CERT[d.certainty] || CERT['predisposição'];
            return (
              <tr key={d.id}>
                <td>{d.icon}</td>
                <td style={{ fontWeight: 700, color: cfg.color, fontSize: '7.5pt' }}>{d.condition}</td>
                <td><span className="dr-badge" style={{ backgroundColor: cfg.border }}>{d.certainty.toUpperCase()}</span></td>
                <td>
                  {d.protocols?.[0]?.items?.[0] || '—'}
                  {d.severity === 'critical' && <span className="dr-priority-chip" style={{ marginLeft: 4 }}>PRIORIDADE ALTA</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="dr-print-footer">
        <span>Sistema Anamnese Integrativa — anamneseintegrativa.surge.sh</span>
        <span>Gerado em {new Date().toLocaleString('pt-BR')} | Relatório confidencial</span>
      </div>
    </div>
  );

  // ─── LAYOUT DE TELA ───────────────────────────────────────────────────────
  return (
    <>
      {printRoot}

      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fafafa', border: '3px solid #1565c0', borderRadius: 3 }} id="diagnostic-report-section">

        {/* Cabeçalho */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
          <Box sx={{ bgcolor: '#1565c0', p: 1.5, borderRadius: 2, display: 'flex' }}>
            <LocalHospitalIcon sx={{ fontSize: 36, color: '#fff' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1565c0', lineHeight: 1.2 }}>
              📋 RELATÓRIO DIAGNÓSTICO INTEGRADO
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Medicina Funcional Integrativa · Luciana Caxito Lopes
            </Typography>
          </Box>
          <Button
            size="small" variant="contained" startIcon={<PrintIcon />}
            onClick={() => window.print()}
            sx={{ bgcolor: '#1565c0' }}
            className="dr-no-print"
          >
            Imprimir Relatório
          </Button>
        </Box>

        {/* Dados do paciente */}
        <Box sx={{ bgcolor: '#1565c0', color: '#fff', borderRadius: 2, p: 2, mb: 2.5 }}>
          <Grid container spacing={1.5} alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', fontSize: '0.7rem' }}>PACIENTE</Typography>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{patientName || 'Não informado'}</Typography>
            </Grid>
            {[
              { label: 'IDADE',      value: patientAge ? `${patientAge} anos` : '—' },
              { label: 'SEXO',       value: patientSex || '—' },
              { label: 'DATA EXAME', value: dataExame ? new Date(dataExame).toLocaleDateString('pt-BR') : '—' },
              { label: 'EMITIDO EM', value: new Date().toLocaleDateString('pt-BR') },
            ].map(item => (
              <Grid item xs={6} md={2} key={item.label}>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', fontSize: '0.65rem' }}>{item.label}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contadores */}
        <Grid container spacing={1.5} sx={{ mb: 2.5 }}>
          {[
            { n: confirmed.length, label: 'Confirmados',    color: '#c62828', bg: '#ffebee', border: '#ef5350' },
            { n: probable.length,  label: 'Prováveis',      color: '#e65100', bg: '#fff3e0', border: '#ff9800' },
            { n: predisps.length,  label: 'Predisposições', color: '#1565c0', bg: '#e3f2fd', border: '#1976d2' },
            { n: critical.length,  label: 'Críticos',       color: '#f57f17', bg: '#fff8e1', border: '#ffc107' },
          ].map(item => (
            <Grid item xs={6} md={3} key={item.label}>
              <Card sx={{ bgcolor: item.bg, border: `2px solid ${item.border}`, textAlign: 'center', py: 1.5, borderRadius: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.n}</Typography>
                <Typography variant="caption" sx={{ color: item.color, fontWeight: 700, fontSize: '0.7rem' }}>{item.label}</Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Resumo executivo */}
        <Alert severity={confirmed.length > 0 ? 'error' : 'warning'} sx={{ mb: 2.5, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>🩺 RESUMO DIAGNÓSTICO EXECUTIVO</Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>{summary}</Typography>
        </Alert>

        {/* Filtro */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5, alignItems: 'center' }} className="dr-no-print">
          <FilterIcon sx={{ fontSize: 16, color: '#888' }} />
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#666' }}>Filtrar por:</Typography>
          {['all', 'confirmado', 'provável', 'predisposição'].map(f => (
            <Chip
              key={f}
              label={f === 'all' ? `Todos (${diseases.length})` : `${f} (${diseases.filter(d => d.certainty === f).length})`}
              size="small"
              variant={filterCertainty === f ? 'filled' : 'outlined'}
              onClick={() => setFilterCertainty(f)}
              color={f === 'confirmado' ? 'error' : f === 'provável' ? 'warning' : f === 'predisposição' ? 'info' : 'default'}
              sx={{ cursor: 'pointer', textTransform: 'capitalize', height: 24 }}
            />
          ))}
        </Box>

        {/* Cards de doenças */}
        {filtered.map(disease => <DiseaseCard key={disease.id} disease={disease} />)}

        {/* Plano de ação consolidado */}
        {diseases.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1a237e' }}>
              📌 PLANO DE AÇÃO — PRIORIDADES DE TRATAMENTO
            </Typography>
            <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>⚕️ AVISO:</strong> Este relatório baseia-se em Medicina Funcional Integrativa.{' '}
                <strong>NÃO substitui avaliação médica.</strong> Consulte sempre profissional habilitado antes de iniciar qualquer suplementação ou medicamento.
              </Typography>
            </Alert>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#1a237e' }}>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, width: '5%', py: 1 }}>—</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, width: '28%', fontSize: '0.75rem' }}>Condição</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, width: '15%', fontSize: '0.75rem' }}>Certeza</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem' }}>Ação Prioritária</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diseases.map((d, i) => {
                    const cfg = CERT[d.certainty] || CERT['predisposição'];
                    return (
                      <TableRow key={d.id} sx={{ bgcolor: i % 2 === 0 ? '#fafafa' : '#fff' }}>
                        <TableCell sx={{ fontSize: '1.2rem' }}>{d.icon}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: cfg.color, fontSize: '0.8rem' }}>{d.condition}</Typography>
                          <Typography variant="caption" sx={{ color: '#888', fontSize: '0.68rem' }}>{d.category}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={d.certainty.toUpperCase()} size="small"
                            sx={{ bgcolor: cfg.border, color: '#fff', fontWeight: 700, fontSize: '0.6rem', height: 20 }} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontSize: '0.78rem' }}>
                            {d.protocols?.[0]?.items?.[0] || '—'}
                          </Typography>
                          {d.severity === 'critical' && (
                            <Chip label="⚠️ PRIORIDADE ALTA" size="small" color="error"
                              sx={{ mt: 0.3, height: 18, fontSize: '0.6rem', fontWeight: 700 }} />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {/* Rodapé */}
        <Box sx={{ mt: 3, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1.5 }}>
          <Typography variant="caption" sx={{ color: '#777', fontSize: '0.7rem', display: 'block' }}>
            <strong>Fontes:</strong> Luciana Caxito Lopes — Manual Prático da Anamnese Integrativa + Guia dos Exames Laboratoriais;
            Protocolos Maria Rocha; IEF Ortomolecular; Diretrizes ADA, EASL, KDIGO, ACC/AHA 2024.
          </Typography>
          <Typography variant="caption" sx={{ color: '#aaa', fontSize: '0.68rem' }}>
            Gerado em {new Date().toLocaleString('pt-BR')} · anamneseintegrativa.surge.sh
          </Typography>
        </Box>
      </Paper>
    </>
  );
}
