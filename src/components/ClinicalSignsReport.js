import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Alert,
  Stack
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Componente de Relatório de Sinais Clínicos
 * Exibe resultados formatados com opções de impressão e exportação PDF
 */
export default function ClinicalSignsReport({ analysis, patientName }) {
  const reportRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;

    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`relatorio-sinais-clinicos-${patientName || 'paciente'}-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  if (!analysis) {
    return (
      <Alert severity="info">
        Nenhuma análise disponível para exibir.
      </Alert>
    );
  }

  return (
    <Box>
      {/* Botões de Ação - Não imprimem */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, '@media print': { display: 'none' } }}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
        >
          Imprimir
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleExportPDF}
        >
          Exportar PDF
        </Button>
      </Box>

      {/* Conteúdo do Relatório */}
      <Paper ref={reportRef} sx={{ p: 4, '@media print': { boxShadow: 'none' } }}>
        {/* Cabeçalho */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', mb: 1 }}>
            Relatório de Análise de Sinais Clínicos
          </Typography>
          <Typography variant="h6" sx={{ color: '#555' }}>
            {patientName || 'Paciente'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Data: {new Date(analysis.date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Resumo Geral */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
            📊 Resumo da Análise
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            <strong>Imagens Analisadas:</strong> {analysis.imagesAnalyzed?.length || 0} 
            {' - '}
            {analysis.imagesAnalyzed?.join(', ')}
          </Alert>
          {analysis.bloodType && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <strong>🩸 Tipo Sanguíneo:</strong> {analysis.bloodType}
              {analysis.bloodTypeAnalysis && (
                <> - {analysis.bloodTypeAnalysis.bloodType} (Frequência: {analysis.bloodTypeAnalysis.frequency})</>
              )}
            </Alert>
          )}
          {analysis.generalFindings?.overallHealth && (
            <Typography variant="body1" paragraph>
              <strong>Avaliação Geral:</strong> {analysis.generalFindings.overallHealth}
            </Typography>
          )}
        </Box>

        {/* Principais Achados */}
        {analysis.generalFindings?.mainConcerns && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
              🚨 Principais Achados
            </Typography>
            <Stack spacing={1}>
              {analysis.generalFindings.mainConcerns.map((concern, index) => (
                <Alert severity="warning" key={index}>
                  {concern}
                </Alert>
              ))}
            </Stack>
          </Box>
        )}

        {/* Análise da Pele/Face */}
        {analysis.skinAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              👤 Análise da Pele e Face
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.skinAnalysis.overview}
            </Typography>
            
            {analysis.skinAnalysis.faceAnalysis?.zones && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Mapeamento Facial (MTC)
                </Typography>
                {analysis.skinAnalysis.faceAnalysis.zones.slice(0, 3).map((zone, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                      {zone.area}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Órgãos:</strong> {zone.organs?.join(', ')}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      <strong>MTC:</strong> {zone.tcm}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Análise das Unhas */}
        {analysis.nailAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              💅 Análise das Unhas
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.nailAnalysis.overview}
            </Typography>
            
            {analysis.nailAnalysis.nailSigns && (
              <Box sx={{ mt: 2 }}>
                {analysis.nailAnalysis.nailSigns.slice(0, 3).map((sign, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {sign.sign}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Significado:</strong> {sign.significance}
                    </Typography>
                    {sign.urgency && (
                      <Alert severity="error" sx={{ mt: 1 }}>
                        {sign.urgency}
                      </Alert>
                    )}
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Análise das Orelhas */}
        {analysis.earAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              👂 Análise das Orelhas (Auriculoterapia)
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.earAnalysis.overview}
            </Typography>
            
            {analysis.earAnalysis.earMapping?.frankSign && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  🚨 {analysis.earAnalysis.earMapping.frankSign.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {analysis.earAnalysis.earMapping.frankSign.description}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
                  {analysis.earAnalysis.earMapping.frankSign.significance}
                </Typography>
              </Alert>
            )}
          </Box>
        )}

        {/* Análise dos Olhos */}
        {analysis.eyeAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              👁️ Análise dos Olhos
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.eyeAnalysis.overview}
            </Typography>
          </Box>
        )}

        {/* Análise do Cabelo */}
        {analysis.hairAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              💇 Análise do Cabelo
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.hairAnalysis.overview}
            </Typography>
          </Box>
        )}

        {/* Análise da Língua */}
        {analysis.tongueAnalysis && (
          <Box sx={{ mb: 4, pageBreakInside: 'avoid' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
              👅 Análise da Língua (Diagnóstico MTC)
            </Typography>
            <Typography variant="body2" paragraph color="text.secondary">
              {analysis.tongueAnalysis.overview}
            </Typography>
          </Box>
        )}

        {/* Análise por Tipo Sanguíneo (Biorressonância) */}
        {analysis.bloodTypeAnalysis && (
          <Box sx={{ mb: 4, pageBreakBefore: 'always' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}>
              🩸 Análise por Tipo Sanguíneo - Biorressonância
            </Typography>

            {/* Alertas de Compatibilidade */}
            {analysis.bloodTypeAnalysis.alerts && analysis.bloodTypeAnalysis.alerts.length > 0 && (
              <Box sx={{ mb: 3 }}>
                {analysis.bloodTypeAnalysis.alerts.map((alert, index) => (
                  <Alert 
                    key={index}
                    severity={alert.level === 'HIGH' ? 'error' : alert.level === 'MEDIUM' ? 'warning' : 'info'}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {alert.title}
                    </Typography>
                    <Typography variant="body2">{alert.message}</Typography>
                    {alert.recommendation && (
                      <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                        💡 {alert.recommendation}
                      </Typography>
                    )}
                  </Alert>
                ))}
              </Box>
            )}

            {/* Recomendações Dietéticas */}
            {analysis.bloodTypeAnalysis.dietRecommendations && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#2e7d32' }}>
                  🥗 Recomendações Dietéticas para Tipo {analysis.bloodType}
                </Typography>
                
                {analysis.bloodTypeAnalysis.dietRecommendations.beneficial && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      ✅ Alimentos Benéficos:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.bloodTypeAnalysis.dietRecommendations.beneficial.join(', ')}
                    </Typography>
                  </Box>
                )}

                {analysis.bloodTypeAnalysis.dietRecommendations.avoid && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#d32f2f' }}>
                      ❌ Alimentos a Evitar:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.bloodTypeAnalysis.dietRecommendations.avoid.join(', ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Suplementos Recomendados */}
            {analysis.bloodTypeAnalysis.supplements && analysis.bloodTypeAnalysis.supplements.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
                  💊 Suplementos Recomendados
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.bloodTypeAnalysis.supplements.map((supplement, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="text.secondary">
                        {supplement}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Fitoterápicos */}
            {analysis.bloodTypeAnalysis.herbs && analysis.bloodTypeAnalysis.herbs.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#388e3c' }}>
                  🌿 Fitoterápicos Recomendados
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.bloodTypeAnalysis.herbs.map((herb, index) => (
                    <li key={index}>
                      <Typography variant="body2" color="text.secondary">
                        {herb}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            {/* Exercícios Físicos */}
            {analysis.bloodTypeAnalysis.exercise && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#f57c00' }}>
                  🏃 Exercícios Recomendados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {analysis.bloodTypeAnalysis.exercise}
                </Typography>
              </Box>
            )}

            {/* Padrões MTC e Ayurveda */}
            {(analysis.bloodTypeAnalysis.tcm || analysis.bloodTypeAnalysis.ayurveda) && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#6a1b9a' }}>
                  🔮 Correlações Medicina Tradicional
                </Typography>
                
                {analysis.bloodTypeAnalysis.tcm && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      MTC (Medicina Tradicional Chinesa):
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.bloodTypeAnalysis.tcm}
                    </Typography>
                  </Box>
                )}

                {analysis.bloodTypeAnalysis.ayurveda && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Ayurveda:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {analysis.bloodTypeAnalysis.ayurveda}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                <strong>Referência:</strong> TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA.pdf
              </Typography>
            </Box>
          </Box>
        )}

        {/* Recomendações Integradas */}
        {analysis.integratedRecommendations && (
          <Box sx={{ mb: 4, pageBreakBefore: 'always' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#1976d2' }}>
              💊 Recomendações Integradas
            </Typography>

            {analysis.integratedRecommendations.priority1 && (
              <Alert severity="error" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {analysis.integratedRecommendations.priority1.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Motivo:</strong> {analysis.integratedRecommendations.priority1.reason}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Ações Necessárias:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.integratedRecommendations.priority1.actions?.map((action, index) => (
                    <li key={index}><Typography variant="body2">{action}</Typography></li>
                  ))}
                </ul>
              </Alert>
            )}

            {analysis.integratedRecommendations.priority2 && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {analysis.integratedRecommendations.priority2.title}
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.integratedRecommendations.priority2.actions?.map((action, index) => (
                    <li key={index}><Typography variant="body2">{action}</Typography></li>
                  ))}
                </ul>
              </Alert>
            )}

            {analysis.integratedRecommendations.priority3 && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {analysis.integratedRecommendations.priority3.title}
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.integratedRecommendations.priority3.actions?.map((action, index) => (
                    <li key={index}><Typography variant="body2">{action}</Typography></li>
                  ))}
                </ul>
              </Alert>
            )}

            {analysis.integratedRecommendations.lifestyle && (
              <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {analysis.integratedRecommendations.lifestyle.title}
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {analysis.integratedRecommendations.lifestyle.actions?.map((action, index) => (
                    <li key={index}><Typography variant="body2">{action}</Typography></li>
                  ))}
                </ul>
              </Paper>
            )}
          </Box>
        )}

        {/* Rodapé */}
        <Divider sx={{ my: 3 }} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Este relatório foi gerado por um sistema de análise integrativa.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            As informações aqui contidas são para fins educacionais e não substituem consulta médica.
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            © {new Date().getFullYear()} - Sistema de Anamnese Integrativa
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
