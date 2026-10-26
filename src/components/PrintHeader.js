import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const therapistFullTitle = 'Wander Pires Silva Coelho, Terapeuta Integrativo Funcional, Naturopatia e Iridologia - CRTH-BR 17821';

export default function PrintHeader({ entry, showMedicalStyle = false }) {
  // prefer the therapist symbol in assets; letterhead.png is also supported
  let symbol = null;
  try { symbol = require('../assets/therapist-symbol.jpg'); } catch (e) { try { symbol = require('../assets/letterhead.png'); } catch (e2) { symbol = null; } }
  let stamp = null;
  try { stamp = require('../assets/stamp.png'); } catch (e) { stamp = null; }
  let emblem = null;
  try { emblem = require('../assets/therapist-symbol.jpg'); } catch (e) { emblem = null; }

  if (showMedicalStyle) {
    return (
      <Box className="print-header medical-prescription-header" sx={{ 
        borderBottom: '3px double #1976d2',
        pb: 2,
        mb: 3,
        background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          {symbol && <img className="print-header-symbol" src={symbol} alt="símbolo terapeuta" style={{ height: 85, objectFit: 'contain', marginBottom: 12 }} />}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2', letterSpacing: 0.5 }}>
              {therapistFullTitle.split(',')[0]}
            </Typography>
            <Typography variant="body2" sx={{ color: '#555', mt: 0.5 }}>
              Terapeuta Integrativo Funcional
            </Typography>
            <Typography variant="body2" sx={{ color: '#555' }}>
              Naturopatia e Iridologia
            </Typography>
            <Typography variant="caption" sx={{ color: '#777', mt: 0.5, display: 'block' }}>
              CRTH-BR 17821
            </Typography>
            <Typography variant="caption" sx={{ color: '#777', mt: 1, display: 'block' }}>
              📧 wanderpsc@gmail.com | 📱 (89) 9 8139-8723
            </Typography>
          </Box>
          {stamp && (
            <Box sx={{ mt: 2 }}>
              <img className="print-header-stamp" src={stamp} alt="carimbo" style={{ height: 95, opacity: 0.9 }} />
            </Box>
          )}
        </Box>
        
        {entry && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ color: '#555', mb: 0.5 }}>
              <strong>Interagente:</strong> {entry.nome ?? '—'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography variant="caption" sx={{ color: '#666' }}>
                <strong>Data de Nascimento:</strong> {entry.data_nasc ?? '—'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }}>
                <strong>Idade:</strong> {entry.idade ?? '—'} anos
              </Typography>
              {entry.celular && (
                <Typography variant="caption" sx={{ color: '#666' }}>
                  <strong>Contato:</strong> {entry.celular}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box className="print-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {symbol && <img className="print-header-symbol" src={symbol} alt="símbolo terapeuta" style={{ height: 72 }} />}
        {emblem && <img className="print-header-symbol" src={emblem} alt="emblema" style={{ height: 64, width:64, objectFit:'cover', borderRadius: '50%' }} />}
        <div>
          {entry ? (
            <>
              <Typography variant="h6">{entry.nome ?? '—'}</Typography>
              <Typography variant="caption">Nascimento: {entry.data_nasc ?? '—'} — Idade: {entry.idade ?? '—'}</Typography>
            </>
          ) : (
            <Typography variant="h6">Anamnese Integrativa</Typography>
          )}
        </div>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="subtitle2"><strong>Terapeuta</strong></Typography>
        <Typography variant="body2">{therapistFullTitle}</Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: '#666' }}>
          📧 wanderpsc@gmail.com
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#666' }}>
          📱 (89) 9 8139-8723
        </Typography>
        {stamp && <div style={{ marginTop: 8 }}><img className="print-header-stamp" src={stamp} alt="carimbo" style={{ height: 90, opacity: 0.95 }} /></div>}
        <Typography variant="caption" sx={{ display: 'block', color: '#616161', mt: 1 }}>
          O paciente receberá confirmação via e-mail e WhatsApp.
        </Typography>
      </Box>
    </Box>
  );
}
