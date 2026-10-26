import React, { useEffect, useState } from 'react';
import therapistLogo from '../assets/therapist-symbol.jpg';
import { Box, Typography, Divider, Grid } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material';

import { getSetting } from '../lib/api';

export default function PrescriptionHeader({ entry }) {
  const [clinicInfo, setClinicInfo] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const s = await getSetting('clinicInfo');
        if (s) {
          const parsed = typeof s === 'string' ? JSON.parse(s) : s;
          setClinicInfo(parsed);
        }
      } catch (e) { /* ignore */ }
    })();
  }, []);
  return (
    <Box className="prescription-header" sx={{ 
      mb: 3,
      '@media print': {
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }
    }}>
      {/* Cabeçalho com Emblema e Informações */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        gap: 3,
        mb: 2,
        borderBottom: '3px solid',
        borderImage: 'linear-gradient(90deg, #2e7d32 0%, #66bb6a 50%, #2e7d32 100%) 1',
        pb: 2
      }}>
        {/* Emblema/Logo */}
        <Box sx={{ minWidth: 100, width: 100, height: 100, borderRadius: '50%', overflow: 'hidden', border: '4px solid #fff' }}>
          <img src={therapistLogo} alt="Emblema" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        {/* Informações do Terapeuta */}
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: '#1b5e20',
              mb: 0.5,
              letterSpacing: '0.5px'
            }}
          >
            {clinicInfo?.therapistName || 'Wander Pires Silva Coelho'}
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#2e7d32',
              fontWeight: 600,
              mb: 0.5,
              fontSize: '1rem'
            }}
          >
            {clinicInfo?.therapistTitle || 'Terapeuta Integrativo Funcional'}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#558b2f',
              fontWeight: 500,
              mb: 1.5,
              fontStyle: 'italic'
            }}
          >
            {clinicInfo?.therapistSpecialty || 'Naturopatia e Iridologia'}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#424242',
              fontWeight: 600,
              mb: 1,
              fontSize: '0.9rem'
            }}
          >
            {clinicInfo?.therapistReg || 'CRTH-BR 17821'}
          </Typography>

          {/* Contatos */}
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <PhoneIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
              <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
                {clinicInfo?.contact?.split('|')?.[1]?.trim() || '(89) 9 8139-8723'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <EmailIcon sx={{ fontSize: 16, color: '#2e7d32' }} />
              <Typography variant="body2" sx={{ color: '#424242', fontWeight: 500 }}>
                {clinicInfo?.contact?.split('|')?.[0]?.trim() || 'wanderpsc@gmail.com'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Frase Inspiradora */}
      <Box sx={{ 
        textAlign: 'center',
        py: 1.5,
        px: 2,
        background: 'linear-gradient(135deg, #f1f8e9 0%, #dcedc8 100%)',
        borderRadius: 2,
        border: '1px solid #c5e1a5',
        mb: 2,
        '@media print': {
          WebkitPrintColorAdjust: 'exact',
          printColorAdjust: 'exact'
        }
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#33691e',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}
        >
          "A natureza é a medicina mais antiga da humanidade. Honre seu corpo, nutra sua alma e desperte sua vitalidade interior."
        </Typography>
      </Box>

      <Divider sx={{ 
        borderColor: '#81c784',
        borderWidth: 1,
        mb: 2
      }} />

      {/* Informações do Interagente */}
      {entry && (
        <Box sx={{ 
          background: 'linear-gradient(135deg, #f1f8e9 0%, #ffffff 100%)', 
          p: 2, 
          borderRadius: 2,
          border: '1px solid #c5e1a5',
          '@media print': {
            WebkitPrintColorAdjust: 'exact',
            printColorAdjust: 'exact'
          }
        }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1.5 }}>
            Dados do Interagente
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Nome: <span style={{ fontWeight: 400 }}>{entry.nome || entry.q01_nome || '—'}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Idade: <span style={{ fontWeight: 400 }}>{entry.idade || '—'} anos</span>
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                Data: <span style={{ fontWeight: 400 }}>{new Date().toLocaleDateString('pt-BR')}</span>
              </Typography>
            </Grid>
            {(entry.celular || entry.q03_celular) && (
              <Grid item xs={12} md={6}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242' }}>
                  Contato: <span style={{ fontWeight: 400 }}>{entry.celular || entry.q03_celular}</span>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
