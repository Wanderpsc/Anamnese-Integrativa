import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
  TextField,
  Alert
} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from './PrintTemplate';

/**
 * Componente de Diálogo para Seleção e Impressão/Download
 * Permite escolher quais seções incluir no documento
 */
export default function PrintSelectionDialog({ 
  open, 
  onClose, 
  autoSearchResults = [],
  searchResults = null,
  activeTab = 0,
  patientData = null 
}) {
  const [selections, setSelections] = useState({
    patientInfo: true,
    autoRecommendations: true,
    searchResults: false,
    generalInstructions: true,
    safetyGuidelines: true,
    dilutionGuide: false, // Apenas para Óleos Essenciais
    allCategories: false
  });

  const [clinicInfo, setClinicInfo] = useState({
    clinicName: localStorage.getItem('clinicName') || 'Clínica de Terapias Integrativas',
    professionalName: localStorage.getItem('professionalName') || 'Dr(a). Nome do Profissional',
    professionalRegistry: localStorage.getItem('professionalRegistry') || 'CRM/CRT 12345',
    address: localStorage.getItem('clinicAddress') || 'Rua Example, 123 - Cidade/UF',
    phone: localStorage.getItem('clinicPhone') || '(00) 0000-0000',
    email: localStorage.getItem('clinicEmail') || 'contato@clinica.com.br'
  });

  const handleSelectionChange = (field) => (event) => {
    setSelections({ ...selections, [field]: event.target.checked });
  };

  const handleClinicInfoChange = (field) => (event) => {
    const newValue = event.target.value;
    setClinicInfo({ ...clinicInfo, [field]: newValue });
    localStorage.setItem(field === 'clinicName' ? 'clinicName' :
                        field === 'professionalName' ? 'professionalName' :
                        field === 'professionalRegistry' ? 'professionalRegistry' :
                        field === 'address' ? 'clinicAddress' :
                        field === 'phone' ? 'clinicPhone' : 'clinicEmail', 
                        newValue);
  };

  const getTherapyTypeName = () => {
    switch(activeTab) {
      case 0: return 'Homeopatia';
      case 1: return 'Aromaterapia';
      case 2: return 'Óleos Essenciais';
      default: return 'Terapias Avançadas';
    }
  };

  const generatePrintContent = () => {
    const therapyType = getTherapyTypeName();
    let html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto;">
        <!-- TIMBRE PROFISSIONAL -->
        <div style="border-bottom: 3px solid #1976d2; padding-bottom: 15px; margin-bottom: 30px;">
          <div style="text-align: center;">
            <h1 style="color: #1976d2; margin: 0; font-size: 24px; font-weight: bold;">
              ${clinicInfo.clinicName}
            </h1>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">
              ${clinicInfo.address}
            </p>
            <p style="margin: 5px 0; color: #666; font-size: 14px;">
              Tel: ${clinicInfo.phone} | Email: ${clinicInfo.email}
            </p>
          </div>
        </div>

        <!-- INFORMAÇÕES DO PROFISSIONAL -->
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 5px 0; font-size: 14px;">
            <strong>Profissional:</strong> ${clinicInfo.professionalName}
          </p>
          <p style="margin: 5px 0; font-size: 14px;">
            <strong>Registro:</strong> ${clinicInfo.professionalRegistry}
          </p>
          <p style="margin: 5px 0; font-size: 14px;">
            <strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
    `;

    // INFORMAÇÕES DO PACIENTE
    if (selections.patientInfo && patientData) {
      html += `
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #1976d2;">
          <h2 style="color: #1976d2; margin: 0 0 10px 0; font-size: 18px;">Dados do Paciente</h2>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Nome:</strong> ${patientData.q0_nome_completo || 'Não informado'}</p>
          <p style="margin: 5px 0; font-size: 14px;"><strong>Data de Nascimento:</strong> ${patientData.q0_data_nascimento || 'Não informado'}</p>
          ${patientData.q1_queixa_principal ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Queixa Principal:</strong> ${patientData.q1_queixa_principal}</p>` : ''}
        </div>
      `;
    }

    // TÍTULO DO PROTOCOLO
    html += `
      <h2 style="color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 10px; margin: 30px 0 20px 0; font-size: 20px;">
        Protocolo de ${therapyType}
      </h2>
    `;

    // RECOMENDAÇÕES AUTOMÁTICAS
    if (selections.autoRecommendations && autoSearchResults.length > 0) {
      html += `
        <div style="margin-bottom: 30px;">
          <h3 style="background: #4caf50; color: white; padding: 10px; border-radius: 5px; font-size: 16px; margin: 20px 0 15px 0;">
            ✅ Recomendações Baseadas na Anamnese
          </h3>
      `;

      autoSearchResults.forEach((item, idx) => {
        html += `
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin-bottom: 15px; background: #fafafa;">
            <h4 style="color: #2e7d32; margin: 0 0 10px 0; font-size: 15px;">
              ${idx + 1}. Condição: ${item.condition}
            </h4>
            <div style="background: white; padding: 12px; border-radius: 5px;">
              <p style="margin: 8px 0; font-size: 14px;">
                <strong style="color: #1976d2;">
                  ${activeTab === 0 ? 'Remédio Homeopático' : activeTab === 1 ? 'Óleo Aromático' : 'Óleo Essencial'}:
                </strong> ${item.result.name}
              </p>
        `;

        if (item.result.potency) {
          html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Potência:</strong> ${item.result.potency}</p>`;
        }
        if (item.result.properties) {
          html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Propriedades:</strong> ${item.result.properties}</p>`;
        }
        html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Indicações:</strong> ${item.result.indications}</p>`;
        
        if (item.result.usage) {
          html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Modo de Uso:</strong> ${item.result.usage}</p>`;
        }
        html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Dosagem:</strong> ${item.result.dosage}</p>`;
        html += `<p style="margin: 8px 0; font-size: 14px;"><strong>Duração:</strong> ${item.result.duration}</p>`;

        if (item.result.contraindications) {
          html += `
            <div style="background: #fff3cd; border-left: 4px solid #ff9800; padding: 10px; margin-top: 10px;">
              <p style="margin: 0; font-size: 13px; color: #856404;">
                <strong>⚠️ Contraindicações:</strong> ${item.result.contraindications}
              </p>
            </div>
          `;
        }

        html += `
            </div>
          </div>
        `;
      });

      html += `</div>`;
    }

    // RESULTADOS DE BUSCA MANUAL
    if (selections.searchResults && searchResults) {
      html += `
        <div style="margin-bottom: 30px;">
          <h3 style="background: #2196f3; color: white; padding: 10px; border-radius: 5px; font-size: 16px; margin: 20px 0 15px 0;">
            🔍 Resultado da Busca Adicional
          </h3>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; background: #fafafa;">
            <h4 style="color: #1565c0; margin: 0 0 10px 0; font-size: 15px;">${searchResults.name}</h4>
            <div style="background: white; padding: 12px; border-radius: 5px;">
              ${searchResults.category ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Categoria:</strong> ${searchResults.category}</p>` : ''}
              ${searchResults.potency ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Potência:</strong> ${searchResults.potency}</p>` : ''}
              ${searchResults.properties ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Propriedades:</strong> ${searchResults.properties}</p>` : ''}
              <p style="margin: 8px 0; font-size: 14px;"><strong>Indicações:</strong> ${searchResults.indications}</p>
              ${searchResults.usage ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Modo de Uso:</strong> ${searchResults.usage}</p>` : ''}
              <p style="margin: 8px 0; font-size: 14px;"><strong>Dosagem:</strong> ${searchResults.dosage}</p>
              ${searchResults.duration ? `<p style="margin: 8px 0; font-size: 14px;"><strong>Duração:</strong> ${searchResults.duration}</p>` : ''}
            </div>
          </div>
        </div>
      `;
    }

    // GUIA DE DILUIÇÃO (apenas para Óleos Essenciais)
    if (selections.dilutionGuide && activeTab === 2) {
      html += `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h3 style="background: #ff9800; color: white; padding: 10px; border-radius: 5px; font-size: 16px; margin: 20px 0 15px 0;">
            📊 Guia de Diluição de Óleos Essenciais
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background: #f5f5f5;">
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px;">Tipo de Uso</th>
                <th style="border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 14px;">Diluição</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">💆 Uso Facial</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">0.5-1% (1-3 gotas em 30ml)</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">🧴 Uso Corporal</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">2-3% (6-9 gotas em 30ml)</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">💆‍♀️ Massagem</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">3-5% (9-15 gotas em 30ml)</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">🩹 Dor/Tratamento</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">5-10% (15-30 gotas em 30ml)</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">👶 Crianças</td>
                <td style="border: 1px solid #ddd; padding: 10px; font-size: 13px;">0.5-1% (1-3 gotas em 30ml)</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }

    // INSTRUÇÕES GERAIS
    if (selections.generalInstructions) {
      const instructions = activeTab === 0 ? [
        'Tomar os glóbulos ou gotas longe das refeições (30 minutos antes ou depois)',
        'Deixar dissolver na boca, sem mastigar',
        'Evitar alimentos muito condimentados, café e menta durante o tratamento',
        'Armazenar em local fresco, longe de celulares e campos eletromagnéticos',
        'Não tocar os glóbulos com as mãos'
      ] : activeTab === 1 ? [
        'Usar difusor ultrassônico ou elétrico, nunca com calor direto',
        'Diluir sempre óleos essenciais antes de aplicar na pele',
        'Fazer teste de sensibilidade antes do primeiro uso',
        'Manter fora do alcance de crianças e animais',
        'Armazenar em frascos escuros, protegidos da luz'
      ] : [
        'Sempre diluir óleos essenciais em óleo vegetal para uso tópico',
        'Diluição padrão: 2-3% (6-9 gotas em 30ml de óleo vegetal)',
        'Para pele sensível: diluição 1% (3 gotas em 30ml)',
        'Armazenar em frascos escuros, ao abrigo de luz e calor',
        'Evitar contato com olhos e mucosas',
        'Fazer teste de sensibilidade antes do primeiro uso',
        'Não ingerir sem orientação profissional'
      ];

      html += `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h3 style="background: #2196f3; color: white; padding: 10px; border-radius: 5px; font-size: 16px; margin: 20px 0 15px 0;">
            ℹ️ Instruções Gerais de Uso
          </h3>
          <ul style="background: #e3f2fd; padding: 20px 20px 20px 40px; border-radius: 5px; margin: 0;">
      `;
      
      instructions.forEach(instruction => {
        html += `<li style="margin: 8px 0; font-size: 14px; line-height: 1.6;">${instruction}</li>`;
      });

      html += `
          </ul>
        </div>
      `;
    }

    // AVISOS DE SEGURANÇA
    if (selections.safetyGuidelines) {
      const safetyItems = activeTab === 2 ? [
        'Gravidez: evitar nos primeiros 3 meses, alguns óleos contraindicados toda gestação',
        'Lactação: evitar óleos mentolados e cânfora',
        'Crianças < 3 anos: apenas Lavanda, Camomila Romana e Mandarim em baixa diluição',
        'Epilepsia: evitar óleos ricos em cetonas (Alecrim, Sálvia, Hortelã)',
        'Hipertensão: evitar Alecrim, Tomilho, Sálvia',
        'Fotossensibilidade: cítricos (Bergamota, Limão, Laranja) - não expor ao sol por 12h'
      ] : activeTab === 1 ? [
        'Gravidez: consultar profissional antes de usar qualquer óleo',
        'Crianças: usar com cautela e em diluições baixas',
        'Animais de estimação: alguns óleos são tóxicos para pets',
        'Pele sensível: sempre fazer teste de sensibilidade',
        'Não ingerir óleos essenciais sem orientação profissional'
      ] : [
        'Respeitar as doses recomendadas',
        'Em caso de gravidez, consultar profissional',
        'Não interromper tratamento médico convencional',
        'Consultar profissional em caso de dúvidas',
        'Manter remédios fora do alcance de crianças'
      ];

      html += `
        <div style="margin-bottom: 30px; page-break-inside: avoid;">
          <h3 style="background: #f44336; color: white; padding: 10px; border-radius: 5px; font-size: 16px; margin: 20px 0 15px 0;">
            ⚠️ Avisos de Segurança e Contraindicações
          </h3>
          <div style="background: #ffebee; padding: 15px; border-radius: 5px; border-left: 4px solid #f44336;">
            <ul style="margin: 0; padding-left: 20px;">
      `;

      safetyItems.forEach(item => {
        html += `<li style="margin: 8px 0; font-size: 14px; line-height: 1.6; color: #c62828;">${item}</li>`;
      });

      html += `
            </ul>
          </div>
        </div>
      `;
    }

    // RODAPÉ
    html += `
        <div style="margin-top: 50px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center;">
          <p style="margin: 5px 0; font-size: 12px; color: #666;">
            Este documento foi gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
          </p>
          <p style="margin: 5px 0; font-size: 12px; color: #666;">
            ${clinicInfo.clinicName} - ${clinicInfo.professionalName}
          </p>
          <p style="margin: 15px 0 5px 0; font-size: 11px; color: #999;">
            Documento de orientação terapêutica. Não substitui consulta médica.
          </p>
        </div>
      </div>
    `;

    return html;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    const content = generatePrintContent();
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Protocolo de ${getTherapyTypeName()}</title>
          <style>
            @media print {
              @page {
                size: A4;
                margin: 2cm;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
    
    onClose();
  };

  const handleDownloadPdf = async () => {
    try {
      const content = generatePrintContent();
      const title = `protocolo_${getTherapyTypeName().toLowerCase().replace(/ /g, '_')}_${new Date().toISOString().split('T')[0]}`;
      
      await downloadPdfFromHtml(content, `${title}.pdf`);
      onClose();
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente a opção de impressão.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color="primary">
          📄 Configurar Impressão / Download
        </Typography>
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Informações da Clínica */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            🏥 Informações do Timbre (salvos automaticamente)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Nome da Clínica"
              value={clinicInfo.clinicName}
              onChange={handleClinicInfoChange('clinicName')}
            />
            <TextField
              fullWidth
              size="small"
              label="Nome do Profissional"
              value={clinicInfo.professionalName}
              onChange={handleClinicInfoChange('professionalName')}
            />
            <TextField
              fullWidth
              size="small"
              label="Registro Profissional (CRM/CRT/etc)"
              value={clinicInfo.professionalRegistry}
              onChange={handleClinicInfoChange('professionalRegistry')}
            />
            <TextField
              fullWidth
              size="small"
              label="Endereço"
              value={clinicInfo.address}
              onChange={handleClinicInfoChange('address')}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Telefone"
                value={clinicInfo.phone}
                onChange={handleClinicInfoChange('phone')}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                value={clinicInfo.email}
                onChange={handleClinicInfoChange('email')}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Seleção de Conteúdo */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          ✅ Selecione o que deseja incluir no documento:
        </Typography>
        
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox 
                checked={selections.patientInfo}
                onChange={handleSelectionChange('patientInfo')}
              />
            }
            label="Informações do Paciente"
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={selections.autoRecommendations}
                onChange={handleSelectionChange('autoRecommendations')}
              />
            }
            label={`Recomendações Marcadas para Prescrição (${autoSearchResults.length} ${autoSearchResults.length === 1 ? 'item' : 'itens'})`}
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={selections.searchResults}
                onChange={handleSelectionChange('searchResults')}
              />
            }
            label="Resultado da Busca Manual"
          />

          {activeTab === 2 && (
            <FormControlLabel
              control={
                <Checkbox 
                  checked={selections.dilutionGuide}
                  onChange={handleSelectionChange('dilutionGuide')}
                />
              }
              label="Guia de Diluição de Óleos Essenciais"
            />
          )}
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={selections.generalInstructions}
                onChange={handleSelectionChange('generalInstructions')}
              />
            }
            label="Instruções Gerais de Uso"
          />
          
          <FormControlLabel
            control={
              <Checkbox 
                checked={selections.safetyGuidelines}
                onChange={handleSelectionChange('safetyGuidelines')}
              />
            }
            label="Avisos de Segurança e Contraindicações"
          />
        </FormGroup>
      </DialogContent>

      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button 
          onClick={handlePrint} 
          variant="outlined" 
          startIcon={<PrintIcon />}
        >
          Imprimir
        </Button>
        <Button 
          onClick={handleDownloadPdf} 
          variant="contained" 
          startIcon={<DownloadIcon />}
        >
          Download PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
}
