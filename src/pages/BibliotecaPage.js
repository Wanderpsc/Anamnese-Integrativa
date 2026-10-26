/**
 * BibliotecaPage.js
 * Pesquisa Bibliográfica — visualizador de livros, PDFs e documentos clínicos.
 * Renderiza PDF via pdfjs-dist (canvas), DOCX via mammoth, TXT/RTF como texto.
 * Design: livro / apresentação de slides com navegação por páginas.
 */
import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from 'react';
import {
  Box, Typography, TextField, InputAdornment, Grid, Card,
  CardContent, CardActionArea, Chip, Dialog, DialogContent,
  IconButton, Tooltip, CircularProgress, Alert, Slider,
  Fade, Skeleton, useMediaQuery, useTheme, Divider,
  ToggleButtonGroup, ToggleButton, Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  ArrowBackIos as PrevIcon,
  ArrowForwardIos as NextIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  FitScreen as FitIcon,
  MenuBook as BookIcon,
  PictureAsPdf as PdfIcon,
  Description as DocxIcon,
  Article as TxtIcon,
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  Print as PrintIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
} from '@mui/icons-material';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// -------------- pdfjs worker ------------------------------------------------
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

// -------------- category icons / colors -------------------------------------
const CAT_ICONS = {
  iridologia:     { icon: '👁️', bg: 'linear-gradient(135deg,#7B1FA2,#AB47BC)' },
  fitoterapia:    { icon: '🌿', bg: 'linear-gradient(135deg,#388E3C,#81C784)' },
  homeopatia:     { icon: '🌸', bg: 'linear-gradient(135deg,#1565C0,#42A5F5)' },
  nutricao:       { icon: '🥗', bg: 'linear-gradient(135deg,#E65100,#FFB74D)' },
  ortomolecular:  { icon: '💊', bg: 'linear-gradient(135deg,#B71C1C,#E57373)' },
  exames:         { icon: '🔬', bg: 'linear-gradient(135deg,#006064,#4DD0E1)' },
  anamnese:       { icon: '📋', bg: 'linear-gradient(135deg,#4E342E,#A1887F)' },
  biorresonancia: { icon: '🌊', bg: 'linear-gradient(135deg,#4A148C,#BA68C8)' },
  manual:         { icon: '📚', bg: 'linear-gradient(135deg,#37474F,#90A4AE)' },
  protocolos:     { icon: '🩺', bg: 'linear-gradient(135deg,#BF360C,#FF8A65)' },
  outros:         { icon: '📄', bg: 'linear-gradient(135deg,#455A64,#90A4AE)' },
};

function catStyle(cat) {
  return CAT_ICONS[cat] || CAT_ICONS.outros;
}

function extIcon(ext) {
  if (ext === 'pdf')  return <PdfIcon  sx={{ fontSize: 14 }} />;
  if (ext === 'docx') return <DocxIcon sx={{ fontSize: 14 }} />;
  return <TxtIcon sx={{ fontSize: 14 }} />;
}

// ============================================================================
// PDF VIEWER — renders one page at a time onto a <canvas>
// ============================================================================
function PdfPageCanvas({ pdfDoc, pageNum, scale, onRenderDone }) {
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let cancelled = false;

    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(pageNum);
        if (cancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width  = viewport.width;

        // Cancel any previous render task
        if (renderTaskRef.current) {
          try { await renderTaskRef.current.cancel(); } catch(_) {}
        }

        renderTaskRef.current = page.render({
          canvasContext: ctx,
          viewport,
        });

        await renderTaskRef.current.promise;
        if (!cancelled && onRenderDone) onRenderDone();
      } catch(e) {
        if (e?.name !== 'RenderingCancelledException' && !cancelled) {
          console.error('PDF render error', e);
        }
      }
    }

    renderPage();

    return () => {
      cancelled = true;
      if (renderTaskRef.current) {
        try { renderTaskRef.current.cancel(); } catch(_) {}
      }
    };
  }, [pdfDoc, pageNum, scale, onRenderDone]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        maxWidth: '100%',
        height: 'auto',
        boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
        borderRadius: 4,
        background: '#fff',
      }}
    />
  );
}

// ============================================================================
// VIEWER DIALOG — handles PDF / DOCX / TXT rendering
// ============================================================================
function DocumentViewer({ doc, open, onClose }) {
  const theme = useTheme();
  const fullscreen = useMediaQuery(theme.breakpoints.down('md'));

  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [pdfDoc, setPdfDoc]         = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale]           = useState(1.3);
  const [htmlContent, setHtmlContent] = useState('');
  const [textContent, setTextContent] = useState('');
  const [rendering, setRendering]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageInput, setPageInput]   = useState('1');

  const ext = doc?.ext || '';

  // Reset state when document changes
  useEffect(() => {
    if (!doc || !open) return;
    setLoading(true);
    setError(null);
    setPdfDoc(null);
    setHtmlContent('');
    setTextContent('');
    setCurrentPage(1);
    setPageInput('1');
    setTotalPages(1);
    setRendering(false);

    (async () => {
      try {
        if (ext === 'pdf') {
          await loadPdf(doc.url);
        } else if (ext === 'docx') {
          await loadDocx(doc.url);
        } else {
          await loadText(doc.url);
        }
      } catch(e) {
        setError('Não foi possível carregar o documento. Verifique se o servidor local está em execução com os arquivos copiados (npm start).');
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, open]);

  async function loadPdf(url) {
    const loadingTask = pdfjsLib.getDocument({
      url,
      cMapUrl: `${process.env.PUBLIC_URL}/cmaps/`,
      cMapPacked: true,
    });
    const pdf = await loadingTask.promise;
    setPdfDoc(pdf);
    setTotalPages(pdf.numPages);
  }

  async function loadDocx(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const buf = await resp.arrayBuffer();
    const result = await mammoth.convertToHtml({ arrayBuffer: buf }, {
      styleMap: [
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Heading 2'] => h3:fresh",
        "p[style-name='Heading 3'] => h4:fresh",
      ],
    });
    setHtmlContent(result.value);
  }

  async function loadText(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    setTextContent(text);
  }

  const handlePrev = useCallback(() => {
    setCurrentPage(p => {
      const next = Math.max(1, p - 1);
      setPageInput(String(next));
      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentPage(p => {
      const next = Math.min(totalPages, p + 1);
      setPageInput(String(next));
      return next;
    });
  }, [totalPages]);

  const handleFirst = () => { setCurrentPage(1); setPageInput('1'); };
  const handleLast  = () => { setCurrentPage(totalPages); setPageInput(String(totalPages)); };

  const handlePageInput = (e) => {
    setPageInput(e.target.value);
    const n = parseInt(e.target.value, 10);
    if (n >= 1 && n <= totalPages) setCurrentPage(n);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') handleNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   handlePrev();
      if (e.key === 'Escape') onClose();
      if (e.key === 'Home') handleFirst();
      if (e.key === 'End')  handleLast();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleNext, handlePrev, onClose, handleFirst, handleLast]);

  const handlePrint = () => {
    if (ext !== 'pdf') {
      window.open(doc.url, '_blank');
      return;
    }
    const w = window.open(doc.url, '_blank');
    if (w) setTimeout(() => { try { w.print(); } catch(_){} }, 1000);
  };

  const highlightedHtml = useMemo(() => {
    if (!htmlContent || !searchQuery) return htmlContent;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return htmlContent.replace(new RegExp(escaped, 'gi'), m => `<mark style="background:#ffe082">${m}</mark>`);
  }, [htmlContent, searchQuery]);

  const highlightedText = useMemo(() => {
    if (!textContent) return '';
    if (!searchQuery) return textContent;
    const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return textContent.replace(new RegExp(escaped, 'gi'), m => `<mark style="background:#ffe082">${m}</mark>`);
  }, [textContent, searchQuery]);

  const onRenderDone = useCallback(() => setRendering(false), []);
  const onRenderStart = useCallback(() => setRendering(true), []);
  useEffect(() => { if (pdfDoc) onRenderStart(); }, [pdfDoc, currentPage, scale, onRenderStart]);

  if (!doc) return null;

  const cst = catStyle(doc.category);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullscreen}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: fullscreen ? '100vw' : '92vw',
          maxWidth: '100vw',
          height: fullscreen ? '100vh' : '94vh',
          bgcolor: '#0a0a1a',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          m: 0,
          borderRadius: fullscreen ? 0 : 2,
          overflow: 'hidden',
        },
      }}
    >
      {/* ── HEADER ── */}
      <Box sx={{
        px: 2, py: 1,
        background: cst.bg,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexShrink: 0,
      }}>
        <Typography sx={{ fontSize: 24, flexShrink: 0 }}>{cst.icon}</Typography>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography fontWeight={700} noWrap sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
            {doc.title}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8 }}>
            {doc.categoryLabel} · {doc.ext.toUpperCase()}
          </Typography>
        </Box>

        {/* Search within document (DOCX/TXT only) */}
        {(ext === 'docx' || ext === 'txt' || ext === 'rtf') && (
          <TextField
            size="small"
            placeholder="Pesquisar no doc..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }} /></InputAdornment>,
            }}
            sx={{
              width: 200,
              '& .MuiInputBase-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.15)', borderRadius: 1 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              display: { xs: 'none', sm: 'block' },
            }}
          />
        )}

        <Tooltip title="Imprimir / Abrir">
          <IconButton onClick={handlePrint} size="small" sx={{ color: 'white' }}>
            <PrintIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Fechar (Esc)">
          <IconButton onClick={onClose} size="small" sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ── CONTENT ── */}
      <DialogContent sx={{ flexGrow: 1, p: 0, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 2 }}>
            <CircularProgress size={56} sx={{ color: '#7B68EE' }} />
            <Typography color="rgba(255,255,255,0.6)">Carregando documento…</Typography>
          </Box>
        )}

        {error && !loading && (
          <Box sx={{ p: 4, maxWidth: 520, textAlign: 'center', mx: 'auto', mt: 4 }}>
            <Typography sx={{ fontSize: 52, mb: 2 }}>🏠</Typography>
            <Typography fontWeight={700} sx={{ color: 'white', mb: 1.5, fontSize: '1.1rem' }}>
              Documento disponível no Modo Local
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.7, fontSize: '0.92rem' }}>
              Este arquivo fica armazenado no seu PC e não pode ser carregado pela versão online.
              Para abri-lo, inicie o sistema localmente:
            </Typography>
            <Box sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2, p: 2, textAlign: 'left' }}>
              {[
                { n: '1', t: 'Feche esta aba do navegador' },
                { n: '2', t: 'Dê duplo-clique em  Iniciar-Sistema-Local.bat  na pasta do projeto' },
                { n: '3', t: 'Aguarde o navegador abrir em http://localhost:3000' },
                { n: '4', t: 'Acesse Pesquisa Bibliográfica e clique no documento novamente' },
              ].map(s => (
                <Box key={s.n} sx={{ display: 'flex', gap: 1.5, mb: 1.2, alignItems: 'flex-start' }}>
                  <Box sx={{ bgcolor: '#4a148c', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.1 }}>
                    <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'white' }}>{s.n}</Typography>
                  </Box>
                  <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.5 }}>{s.t}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* PDF PAGES */}
        {!loading && !error && ext === 'pdf' && pdfDoc && (
          <Box sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 1, sm: 2 },
            position: 'relative',
            width: '100%',
          }}>
            {/* Prev arrow */}
            <Tooltip title="Página anterior (←)">
              <span>
                <IconButton
                  onClick={handlePrev}
                  disabled={currentPage <= 1}
                  sx={{
                    position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.12)', color: 'white', zIndex: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                    '&.Mui-disabled': { opacity: 0.3, color: 'rgba(255,255,255,0.3)' },
                  }}
                >
                  <PrevIcon />
                </IconButton>
              </span>
            </Tooltip>

            <Box sx={{ position: 'relative' }}>
              {rendering && (
                <Box sx={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: 'rgba(0,0,0,0.5)', borderRadius: 1, zIndex: 1,
                }}>
                  <CircularProgress size={32} sx={{ color: '#7B68EE' }} />
                </Box>
              )}
              <PdfPageCanvas
                pdfDoc={pdfDoc}
                pageNum={currentPage}
                scale={scale}
                onRenderDone={onRenderDone}
              />
            </Box>

            {/* Next arrow */}
            <Tooltip title="Próxima página (→)">
              <span>
                <IconButton
                  onClick={handleNext}
                  disabled={currentPage >= totalPages}
                  sx={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.12)', color: 'white', zIndex: 2,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
                    '&.Mui-disabled': { opacity: 0.3, color: 'rgba(255,255,255,0.3)' },
                  }}
                >
                  <NextIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}

        {/* DOCX HTML */}
        {!loading && !error && ext === 'docx' && htmlContent && (
          <Box sx={{
            width: '100%',
            maxWidth: 860,
            mx: 'auto',
            p: { xs: 2, sm: 4 },
            bgcolor: 'white',
            color: '#1a1a1a',
            minHeight: '100%',
            fontFamily: 'Georgia, serif',
            '& h1,h2': { color: '#1a237e', mt: 3, mb: 1 },
            '& h3,h4': { color: '#283593', mt: 2, mb: 0.5 },
            '& p': { mb: 1, lineHeight: 1.8, textAlign: 'justify' },
            '& table': { borderCollapse: 'collapse', width: '100%', mb: 2, fontSize: '0.9rem' },
            '& th,td': { border: '1px solid #ccc', p: '6px 10px' },
            '& th': { bgcolor: '#e8eaf6', fontWeight: 700 },
            '& img': { maxWidth: '100%', borderRadius: 1 },
          }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        )}

        {/* TXT / RTF TEXT */}
        {!loading && !error && (ext === 'txt' || ext === 'rtf') && textContent && (
          <Box sx={{
            width: '100%',
            maxWidth: 860,
            mx: 'auto',
            p: { xs: 2, sm: 4 },
            bgcolor: 'white',
            color: '#1a1a1a',
            minHeight: '100%',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            lineHeight: 1.7,
          }}
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        )}
      </DialogContent>

      {/* ── FOOTER CONTROLS ── */}
      {!loading && !error && (
        <Box sx={{
          px: 2, py: 1,
          background: 'rgba(255,255,255,0.06)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          flexShrink: 0,
          flexWrap: 'wrap',
        }}>
          {ext === 'pdf' && (
            <>
              {/* Page navigation */}
              <Tooltip title="Primeira página (Home)">
                <span><IconButton size="small" onClick={handleFirst} disabled={currentPage <= 1} sx={{ color: 'rgba(255,255,255,0.7)' }}><FirstPageIcon /></IconButton></span>
              </Tooltip>
              <Tooltip title="Página anterior (←)">
                <span><IconButton size="small" onClick={handlePrev} disabled={currentPage <= 1} sx={{ color: 'rgba(255,255,255,0.7)' }}><PrevIcon /></IconButton></span>
              </Tooltip>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TextField
                  size="small"
                  value={pageInput}
                  onChange={handlePageInput}
                  inputProps={{ min: 1, max: totalPages, style: { textAlign: 'center', color: 'white', width: 40, padding: '2px 4px' } }}
                  sx={{
                    '& .MuiInputBase-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.12)', borderRadius: 1 },
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>/ {totalPages}</Typography>
              </Box>

              <Tooltip title="Próxima página (→)">
                <span><IconButton size="small" onClick={handleNext} disabled={currentPage >= totalPages} sx={{ color: 'rgba(255,255,255,0.7)' }}><NextIcon /></IconButton></span>
              </Tooltip>
              <Tooltip title="Última página (End)">
                <span><IconButton size="small" onClick={handleLast} disabled={currentPage >= totalPages} sx={{ color: 'rgba(255,255,255,0.7)' }}><LastPageIcon /></IconButton></span>
              </Tooltip>

              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.15)', mx: 0.5 }} />

              {/* Zoom */}
              <Tooltip title="Reduzir zoom">
                <span><IconButton size="small" onClick={() => setScale(s => Math.max(0.5, s - 0.2))} sx={{ color: 'rgba(255,255,255,0.7)' }}><ZoomOutIcon /></IconButton></span>
              </Tooltip>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', minWidth: 40, textAlign: 'center' }}>
                {Math.round(scale * 100)}%
              </Typography>
              <Tooltip title="Aumentar zoom">
                <span><IconButton size="small" onClick={() => setScale(s => Math.min(3.0, s + 0.2))} sx={{ color: 'rgba(255,255,255,0.7)' }}><ZoomInIcon /></IconButton></span>
              </Tooltip>
              <Tooltip title="Zoom ajustado">
                <span><IconButton size="small" onClick={() => setScale(1.3)} sx={{ color: 'rgba(255,255,255,0.7)' }}><FitIcon /></IconButton></span>
              </Tooltip>
            </>
          )}

          {/* Keyboard hint */}
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)', ml: 'auto', display: { xs: 'none', md: 'block' } }}>
            {ext === 'pdf' ? '← → mudam página · Home/End · Esc fecha' : 'Esc fecha'}
          </Typography>
        </Box>
      )}
    </Dialog>
  );
}

// ============================================================================
// DOCUMENT CARD
// ============================================================================
function DocumentCard({ doc, onClick, listView, localOnly }) {
  const cst = catStyle(doc.category);
  const localOnlyTip = '🏠 Abrir disponível no modo local — clique duas vezes em Iniciar-Sistema-Local.bat';

  if (listView) {
    return (
      <Tooltip title={localOnly ? localOnlyTip : ''} placement="top" arrow>
        <Card
          sx={{
            mb: 0.5,
            background: localOnly ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.2s',
            opacity: localOnly ? 0.75 : 1,
            '&:hover': localOnly ? {} : { background: 'rgba(255,255,255,0.09)', transform: 'translateX(4px)' },
          }}
          elevation={0}
        >
          <CardActionArea
            onClick={() => onClick(doc)}
            sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1 }}
          >
            <Typography sx={{ fontSize: 22, mr: 2, flexShrink: 0 }}>{cst.icon}</Typography>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography fontWeight={600} noWrap sx={{ color: localOnly ? 'rgba(255,255,255,0.55)' : 'white', fontSize: '0.9rem' }}>{doc.title}</Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{doc.categoryLabel}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {localOnly && (
                <Chip label="🏠 Local" size="small" sx={{ bgcolor: 'rgba(255,152,0,0.2)', color: '#ffb74d', fontSize: '0.65rem', height: 18 }} />
              )}
              <Chip
                label={doc.ext.toUpperCase()}
                icon={extIcon(doc.ext)}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.7rem', ml: 0.5 }}
              />
            </Box>
          </CardActionArea>
        </Card>
      </Tooltip>
    );
  }

  return (
    <Tooltip title={localOnly ? localOnlyTip : ''} placement="top" arrow>
      <Card
        elevation={localOnly ? 1 : 4}
        sx={{
          height: '100%',
          background: localOnly ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${localOnly ? 'rgba(255,152,0,0.2)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 2,
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          overflow: 'hidden',
          opacity: localOnly ? 0.72 : 1,
          '&:hover': localOnly ? {} : {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.2)',
          },
        }}
      >
        <CardActionArea
          onClick={() => onClick(doc)}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 0 }}
        >
          {/* Top gradient strip */}
          <Box sx={{ width: '100%', height: 80, background: cst.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
            <Typography sx={{ fontSize: 38 }}>{cst.icon}</Typography>
            {localOnly && (
              <Box sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,0.45)', borderRadius: 1, px: 0.8, py: 0.2 }}>
                <Typography sx={{ fontSize: '0.6rem', color: '#ffb74d', fontWeight: 700 }}>🏠 LOCAL</Typography>
              </Box>
            )}
          </Box>
          <CardContent sx={{ flexGrow: 1, pb: '12px !important', pt: 1.5, px: 2, width: '100%' }}>
            <Typography
              fontWeight={700}
              sx={{
                color: localOnly ? 'rgba(255,255,255,0.6)' : 'white',
                fontSize: '0.82rem',
                lineHeight: 1.35,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1,
              }}
            >
              {doc.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
              <Chip
                label={doc.categoryLabel}
                size="small"
                sx={{
                  background: cst.bg,
                  color: 'white',
                  fontSize: '0.65rem',
                  height: 20,
                  fontWeight: 600,
                  opacity: localOnly ? 0.7 : 1,
                }}
              />
              <Chip
                label={doc.ext.toUpperCase()}
                icon={extIcon(doc.ext)}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: '0.65rem', height: 20 }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Tooltip>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function BibliotecaPage() {
  const [documents, setDocuments]         = useState([]);
  const [loading, setLoading]             = useState(true);
  const [fetchError, setFetchError]       = useState(null);
  const [localOnly, setLocalOnly]         = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedDoc, setSelectedDoc]     = useState(null);
  const [viewerOpen, setViewerOpen]       = useState(false);
  const [listView, setListView]           = useState(false);
  const [page, setPage]                   = useState(0);
  const PAGE_SIZE = 60;

  // Load index
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${process.env.PUBLIC_URL}/biblioteca-index.json?v=${Date.now()}`);
        if (!resp.ok) throw new Error('Index não encontrado');
        const data = await resp.json();
        setDocuments(data.files || []);
        setLocalOnly(data.localOnly === true);
      } catch(e) {
        setFetchError('Biblioteca não disponível. Execute <code>npm start</code> para carregar os documentos.');
        setLocalOnly(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const seen = new Map();
    for (const d of documents) {
      if (!seen.has(d.category)) seen.set(d.category, { key: d.category, label: d.categoryLabel });
    }
    return [{ key: 'all', label: 'Todos' }, ...Array.from(seen.values()).sort((a,b) => a.label.localeCompare(b.label,'pt-BR'))];
  }, [documents]);

  const filtered = useMemo(() => {
    let list = documents;
    if (categoryFilter !== 'all') list = list.filter(d => d.category === categoryFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
      list = list.filter(d => {
        const t = d.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
        const c = d.categoryLabel.toLowerCase();
        return t.includes(q) || c.includes(q);
      });
    }
    return list;
  }, [documents, searchQuery, categoryFilter]);

  // Reset page when filter changes
  useEffect(() => setPage(0), [searchQuery, categoryFilter]);

  const paged = useMemo(() => filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE), [filtered, page]);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // Always allow opening — viewer handles error gracefully when file is unavailable
  const canOpen = true;

  const openDoc = useCallback((doc) => {
    setSelectedDoc(doc);
    setViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerOpen(false);
  }, []);

  // ── STATS ──
  const statsByExt = useMemo(() => {
    const s = {};
    for (const d of documents) s[d.ext] = (s[d.ext] || 0) + 1;
    return s;
  }, [documents]);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1b2a 50%, #0a0a1a 100%)',
      pb: 6,
    }}>
      {/* ── HERO HEADER ── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1a237e 0%, #283593 40%, #4a148c 100%)',
        py: { xs: 3, md: 5 },
        px: { xs: 2, md: 5 },
        mb: 3,
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative blobs */}
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(123,104,238,0.15)', pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', bottom: -30, left: '30%', width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, position: 'relative' }}>
          <BookIcon sx={{ fontSize: 48, color: '#9fa8da' }} />
          <Box>
            <Typography variant="h4" fontWeight={800} sx={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)', lineHeight: 1.1 }}>
              Pesquisa Bibliográfica
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mt: 0.5 }}>
              Biblioteca clínica completa — {documents.length} documentos indexados
            </Typography>
          </Box>
        </Box>

        {/* Stats chips */}
        {!loading && !fetchError && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2.5 }}>
            {Object.entries(statsByExt).map(([ext, count]) => (
              <Chip
                key={ext}
                icon={extIcon(ext)}
                label={`${count} ${ext.toUpperCase()}`}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600 }}
              />
            ))}
          </Box>
        )}

        {/* Search */}
        <TextField
          fullWidth
          placeholder="Pesquisar documentos por título ou categoria…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: 'rgba(255,255,255,0.6)' }} /></InputAdornment>,
          }}
          sx={{
            maxWidth: 700,
            '& .MuiInputBase-root': {
              color: 'white',
              bgcolor: 'rgba(255,255,255,0.12)',
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
            },
            '& .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(255,255,255,0.25)' },
            '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid rgba(255,255,255,0.5)' },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid rgba(255,255,255,0.7)' },
            '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.5)' },
          }}
        />
      </Box>

      <Box sx={{ px: { xs: 1.5, md: 3 } }}>
        {/* ── LOCAL ONLY WARNING ── */}
        {localOnly && !loading && (
          <Box sx={{ mb: 3 }}>
            <Box sx={{
              borderRadius: 3,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'linear-gradient(135deg, rgba(26,35,126,0.6) 0%, rgba(74,20,140,0.6) 100%)',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Header strip */}
              <Box sx={{ px: 3, py: 2, background: 'linear-gradient(135deg, #1a237e, #4a148c)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ fontSize: 28 }}>📚</Typography>
                <Box>
                  <Typography fontWeight={700} sx={{ color: 'white', fontSize: '1.05rem' }}>
                    Pesquisa Bibliográfica — Disponível no Modo Local
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    1161+ documentos clínicos acessíveis diretamente no seu PC
                  </Typography>
                </Box>
              </Box>
              {/* Content */}
              <Box sx={{ px: 3, py: 2.5 }}>
                <Typography sx={{ color: 'rgba(255,255,255,0.85)', mb: 2, lineHeight: 1.7 }}>
                  Esta biblioteca completa de documentos (PDFs, apostilas, artigos, protocolos) está disponível
                  quando o sistema roda <strong style={{ color: '#90caf9' }}>localmente no seu PC</strong>,
                  pois os arquivos ficam em <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.85em' }}>src/assets/therapeutic-data/</code>.
                </Typography>

                {/* Step-by-step */}
                <Typography fontWeight={700} sx={{ color: '#9fa8da', mb: 1.5, fontSize: '0.9rem' }}>
                  Como acessar todos os documentos:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { icon: '1️⃣', text: 'Certifique-se de que a pasta do projeto está no seu PC:', sub: 'E:\\1. Nova pasta\\MEUS PROJETOS DE PROGRAMAÇÃO 2\\anamnese-app' },
                    { icon: '2️⃣', text: 'Clique duas vezes no arquivo:', sub: 'Iniciar-Sistema-Local.bat  (na raiz do projeto)' },
                    { icon: '3️⃣', text: 'O sistema abrirá automaticamente em http://localhost:3000 com todos os 1161+ documentos disponíveis.', sub: null },
                  ].map((step, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Typography sx={{ fontSize: 20, flexShrink: 0, mt: 0.2 }}>{step.icon}</Typography>
                      <Box>
                        <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.88rem' }}>{step.text}</Typography>
                        {step.sub && (
                          <Typography sx={{ color: '#90caf9', fontFamily: 'monospace', fontSize: '0.82rem', mt: 0.3, bgcolor: 'rgba(255,255,255,0.06)', px: 1, py: 0.3, borderRadius: 1, display: 'inline-block' }}>
                            {step.sub}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ mt: 2.5, p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.3)', display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                  <Typography sx={{ fontSize: 16, flexShrink: 0 }}>💡</Typography>
                  <Typography variant="caption" sx={{ color: '#a5d6a7', lineHeight: 1.6 }}>
                    <strong>Modo Local vs Online:</strong> Quando o indicador no topo mostrar <strong>"🏠 Local"</strong>,
                    todos os recursos estão disponíveis incluindo esta biblioteca. Quando mostrar <strong>"🌐 Online"</strong>
                    (surge.sh), os documentos pesados ficam apenas no PC por limitação de tamanho do servidor gratuito.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {fetchError && !localOnly && (
          <Alert severity="warning" sx={{ mb: 3 }}>{fetchError}</Alert>
        )}

        {/* ── FILTERS + VIEW TOGGLE ── */}
        {!loading && !fetchError && documents.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {/* Category filter pills */}
            <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap', flexGrow: 1 }}>
              {categories.map(cat => (
                <Chip
                  key={cat.key}
                  label={cat.label}
                  clickable
                  onClick={() => setCategoryFilter(cat.key)}
                  size="small"
                  sx={{
                    bgcolor: categoryFilter === cat.key ? 'rgba(123,104,238,0.8)' : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontWeight: categoryFilter === cat.key ? 700 : 400,
                    border: categoryFilter === cat.key ? '1px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
                    '&:hover': { bgcolor: 'rgba(123,104,238,0.5)' },
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </Box>

            {/* View toggle */}
            <ToggleButtonGroup
              size="small"
              value={listView ? 'list' : 'grid'}
              exclusive
              onChange={(_, v) => { if (v) setListView(v === 'list'); }}
              sx={{ '& .MuiToggleButton-root': { color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.15)' }, '& .Mui-selected': { bgcolor: 'rgba(123,104,238,0.5) !important', color: 'white !important' } }}
            >
              <ToggleButton value="grid"><GridViewIcon sx={{ fontSize: 18 }} /></ToggleButton>
              <ToggleButton value="list"><ListViewIcon sx={{ fontSize: 18 }} /></ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        {/* Result count */}
        {!loading && !fetchError && searchQuery && (
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 1.5 }}>
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para "{searchQuery}"
          </Typography>
        )}

        {/* ── LOADING SKELETONS ── */}
        {loading && (
          <Grid container spacing={2}>
            {Array.from({ length: 12 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
                <Skeleton variant="rounded" height={180} sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* ── DOCUMENT GRID / LIST ── */}
        {!loading && !fetchError && paged.length > 0 && (
          <>
            {listView ? (
              <Box>
                {paged.map(doc => (
                  <DocumentCard key={doc.id} doc={doc} onClick={openDoc} listView localOnly={!canOpen} />
                ))}
              </Box>
            ) : (
              <Grid container spacing={2}>
                {paged.map(doc => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={doc.id}>
                    <DocumentCard doc={doc} onClick={openDoc} listView={false} localOnly={!canOpen} />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 1 }}>
                <Button
                  disabled={page === 0}
                  onClick={() => setPage(p => p - 1)}
                  variant="outlined"
                  size="small"
                  sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'rgba(255,255,255,0.5)' } }}
                >
                  Anterior
                </Button>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', px: 2 }}>
                  Pág. {page + 1} / {totalPages}
                </Typography>
                <Button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage(p => p + 1)}
                  variant="outlined"
                  size="small"
                  sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)', '&:hover': { borderColor: 'rgba(255,255,255,0.5)' } }}
                >
                  Próxima
                </Button>
              </Box>
            )}
          </>
        )}

        {/* Empty state */}
        {!loading && !fetchError && filtered.length === 0 && documents.length > 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: 48, mb: 2 }}>🔍</Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Nenhum documento encontrado para "{searchQuery}"
            </Typography>
            <Button onClick={() => setSearchQuery('')} sx={{ mt: 2, color: '#9fa8da' }}>
              Limpar pesquisa
            </Button>
          </Box>
        )}

        {!loading && !fetchError && documents.length === 0 && !localOnly && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: 48, mb: 2 }}>📚</Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Nenhum documento na biblioteca ainda.
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── DOCUMENT VIEWER ── */}
      <DocumentViewer doc={selectedDoc} open={viewerOpen} onClose={closeViewer} />
    </Box>
  );
}
