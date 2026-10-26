import React, { useEffect, useState } from 'react';
import { getSetting } from '../lib/api';
import { Box, Typography, Divider } from '@mui/material';

// default replaced by clinicInfo later

export default function PrescriptionFooter() {
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
  // Load stamp/carimbo
  let stamp = null;
  try { 
    stamp = require('../assets/therapeutic-data/CARIMBO NATUROPATIA.jpg'); 
  } catch (e) {
    try {
      stamp = require('../assets/stamp.png');
    } catch (e2) {
      stamp = null;
    }
  }

  return (
    <Box className="prescription-footer" sx={{ 
      mt: 4, 
      pt: 3, 
      borderTop: '2px solid #1976d2',
      '@media print': {
        pageBreakInside: 'avoid',
        marginTop: 'auto'
      }
    }}>
      {/* Observações importantes */}
      <Box sx={{ mb: 3, p: 2, background: '#fff3cd', borderRadius: 1, border: '1px solid #ffc107' }}>
        <Typography variant="caption" sx={{ display: 'block', color: '#856404', fontWeight: 600, mb: 0.5 }}>
          ⚠️ OBSERVAÇÕES IMPORTANTES:
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#856404' }}>
          • Seguir rigorosamente as dosagens indicadas
        </Typography>
          <Typography variant="caption" sx={{ display: 'block', color: '#856404' }}>
          • Informar ao profissional de saúde sobre todos os produtos naturais em uso
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#856404' }}>
          • Suspender uso em caso de reações adversas e procurar orientação
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', color: '#856404' }}>
          • Manter produtos fora do alcance de crianças
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Assinatura e carimbo */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* Data de emissão */}
        <Box>
          <Typography variant="caption" sx={{ color: '#666' }}>
            Protocolo emitido em:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {new Date().toLocaleDateString('pt-BR', { 
              day: '2-digit', 
              month: 'long', 
              year: 'numeric' 
            })}
          </Typography>
        </Box>

        {/* Assinatura e carimbo */}
        <Box sx={{ textAlign: 'center' }}>
          {stamp && (
            <Box sx={{ mb: 1 }}>
              <img 
                src={stamp} 
                alt="Carimbo Naturopatia" 
                style={{ 
                  height: 120, 
                  objectFit: 'contain',
                  opacity: 0.95 
                }} 
              />
            </Box>
          )}
          <Box sx={{ 
            borderTop: '1px solid #333', 
            pt: 1, 
            minWidth: 300,
            mt: stamp ? 1 : 3
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {clinicInfo?.therapistName || 'Wander Pires Silva Coelho'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              {clinicInfo?.therapistReg || 'CRTH-BR 17821'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Nota de confidencialidade */}
      <Typography variant="caption" sx={{ 
        display: 'block', 
        textAlign: 'center', 
        color: '#999', 
        mt: 2,
        fontStyle: 'italic'
      }}>
        Este documento contém informações confidenciais protegidas por sigilo profissional.
      </Typography>
    </Box>
  );
}
