import React from 'react';
import { Box, Button, Alert } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl, openPrintWindow } from './PrintTemplate';

/**
 * Componente reutilizável para ações de receituário
 * Fornece botões para voltar, imprimir e baixar PDF
 */
export default function PrescriptionActions({
  patientData,
  contentRef,
  contentTitle,
  onBack,
  showWarning = true,
  warningMessage = null,
  customButtons = null,
  printDisabled = false
}) {

  const getPrintableArea = () => contentRef?.current || document.querySelector('#prescription-print-area');

  const getPatientName = () => {
    return patientData?.q1_nome_completo
      || patientData?.q01_nome
      || patientData?.nome
      || 'Paciente';
  };

  const buildPrintableDocumentHtml = async (printArea) => {
    const qrDataUrl = await generateQrDataUrl(
      `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
      '#000000'
    );

    return buildLetterheadHtml({
      title: contentTitle || 'SUGESTÕES TERAPÊUTICAS',
      bodyHtml: printArea.innerHTML,
      qrUrl: qrDataUrl
    });
  };
  
  const handlePrint = async () => {
    const printArea = getPrintableArea();
    if (!printArea) {
      alert('Erro: Área de impressão não encontrada');
      return;
    }

    try {
      const html = await buildPrintableDocumentHtml(printArea);
      openPrintWindow(html, true);
    } catch (error) {
      console.error('Erro ao preparar impressão:', error);
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const printArea = getPrintableArea();
      
      if (!printArea) {
        alert('Erro: Área de impressão não encontrada');
        return;
      }

      const html = await buildPrintableDocumentHtml(printArea);

      const safePatientName = getPatientName().replace(/\s+/g, '_');
      const safeTitle = (contentTitle || 'Sugestoes_Terapeuticas').replace(/\s+/g, '_');

      await downloadPdfFromHtml(
        html,
        `${safeTitle}_${safePatientName}_${new Date().toISOString().split('T')[0]}.pdf`
      );
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente usar o botão Imprimir e salvar como PDF pelo navegador.');
    }
  };

  const defaultWarning = 'Selecione um paciente no Dashboard ou preencha uma anamnese antes de gerar o receituário.';

  return (
    <Box className="no-print">
      {showWarning && !patientData && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {warningMessage || defaultWarning}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {onBack && (
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
            >
              Voltar
            </Button>
          )}
          {customButtons}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
            disabled={!patientData || printDisabled}
          >
            Imprimir
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            disabled={!patientData}
          >
            Baixar PDF
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
