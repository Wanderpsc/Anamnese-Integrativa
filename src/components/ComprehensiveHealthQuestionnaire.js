import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Grid,
  Divider
} from '@mui/material';
import TreatmentProtocolsDisplay from './TreatmentProtocolsDisplay';

const DORES_PARA_PROTOCOLO = {
  'Cabeça': 'Dores de cabeça',
  'Pescoço': 'Dor no pescoço',
  'Ombros': 'Dor nos ombros',
  'Costas': 'Dor nas costas',
  'Coluna lombar': 'Lombalgia',
  'Joelhos': 'Dor nos joelhos',
  'Articulações': 'Artrite',
  'Musculares': 'Dor muscular',
  'Abdominal': 'Dor abdominal',
};

/**
 * Questionário abrangente de saúde com respostas de múltipla escolha
 * Engloba todos os sistemas e históricos de saúde
 */
export default function ComprehensiveHealthQuestionnaire({ onChange, value = null, includeSections = null, patientId }) {
  const [responses, setResponses] = useState({
    // Histórico Familiar
    doencasFamiliares: [],
    paisVivos: '',
    causaMortePais: [],
    
    // Histórico Pessoal
    cirurgias: [],
    hospitalizacoes: [],
    alergias: [],
    medicamentosUso: [],
    doencasCronicas: [],
    
    // Hábitos de Vida
    tabagismo: '',
    etilismo: '',
    atividadeFisica: '',
    frequenciaExercicio: '',
    exposicaoSol: '',
    
    // Alimentação
    refeicoesDia: '',
    qualidadeAlimentacao: '',
    consumoAgua: '',
    restricoesAlimentares: [],
    consumoFrequente: [],
    
    // Sono e Repouso
    horasSono: '',
    qualidadeSono: '',
    dificuldadeDormir: [],
    acordaNoite: '',
    
    // Sistema Digestório
    funcionamentoIntestinal: '',
    frequenciaEvacuacao: '',
    gases: '',
    azia: '',
    nauseas: '',
    distensaoAbdominal: '',
    
    // Sistema Urinário
    frequenciaUrinaria: '',
    corUrina: '',
    ardorUrinar: '',
    acordaUrinar: '',
    
    // Sintomas Gerais
    nivelEnergia: '',
    dores: [],
    nivelEstresse: '',
    nivelAnsiedade: '',
    humor: ''
  });

  // Sincronizar com valor externo quando usado em modo controlado
  useEffect(() => {
    if (!value) return;

    setResponses(prev => {
      const merged = { ...prev, ...value };
      return JSON.stringify(prev) === JSON.stringify(merged) ? prev : merged;
    });
  }, [value]);

  // Notificar mudanças ao componente pai
  // Nota: onChange é intencionalmente excluído das dependências para evitar loop
  // infinito causado por funções inline recriadas a cada render do componente pai.
  useEffect(() => {
    if (onChange) {
      onChange(responses);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responses]);

  const shouldRenderSection = (sectionKey) => {
    if (!Array.isArray(includeSections) || includeSections.length === 0) {
      return true;
    }

    return includeSections.includes(sectionKey);
  };

  const handleCheckboxChange = (category, value) => {
    setResponses(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleRadioChange = (category, value) => {
    setResponses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <Box>
      {/* HISTÓRICO FAMILIAR */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#f3e5f5', border: '2px solid #7b1fa2', display: shouldRenderSection('historico_familiar') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#7b1fa2', mb: 3 }}>
          👨‍👩‍👧‍👦 Histórico Familiar
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
          <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Há histórico de doenças na família?</FormLabel>
          <FormGroup>
            <Grid container spacing={1}>
              {[
                'Hipertensão', 'Diabetes', 'Colesterol alto', 'Infarto',
                'AVC', 'Câncer', 'Alzheimer', 'Parkinson',
                'Depressão', 'Ansiedade', 'Osteoporose', 'Artrite',
                'Problemas de tireoide', 'Obesidade', 'Alergias'
              ].map(item => (
                <Grid item xs={12} sm={6} md={4} key={item}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={responses.doencasFamiliares.includes(item)}
                        onChange={() => handleCheckboxChange('doencasFamiliares', item)}
                      />
                    }
                    label={<Typography variant="body2">{item}</Typography>}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>

          <Divider sx={{ my: 3 }} />

          <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Seus pais são vivos?</FormLabel>
          <RadioGroup
            value={responses.paisVivos}
            onChange={(e) => handleRadioChange('paisVivos', e.target.value)}
            row
          >
            <FormControlLabel value="Ambos vivos" control={<Radio />} label="Ambos vivos" />
            <FormControlLabel value="Só o pai" control={<Radio />} label="Só o pai" />
            <FormControlLabel value="Só a mãe" control={<Radio />} label="Só a mãe" />
            <FormControlLabel value="Nenhum" control={<Radio />} label="Nenhum" />
          </RadioGroup>
        </FormControl>

        {/* Protocolos para Histórico Familiar */}
        {(() => {
          const conditions = [];
          
          const familyMapping = {
            'Hipertensão': 'Pressão alta',
            'Diabetes': 'Diabetes',  
            'Colesterol alto': 'Colesterol alto',
            'Infarto': 'Infarto',
            'AVC': 'AVC',
            'Câncer': 'Câncer',
            'Alzheimer': 'Alzheimer',
            'Parkinson': 'Parkinson',
            'Depressão': 'Ansiedade',
            'Ansiedade': 'Ansiedade',
            'Osteoporose': 'Osteoporose',
            'Artrite': 'Artrite',
            'Problemas de tireoide': 'Problemas de tireoide',
            'Obesidade': 'Obesidade',
            'Alergias': 'Alergias'
          };
          
          if (responses.doencasFamiliares) {
            responses.doencasFamiliares.forEach(doenca => {
              if (familyMapping[doenca]) {
                conditions.push(familyMapping[doenca]);
              }
            });
          }
          
          const uniqueConditions = [...new Set(conditions)];
          return uniqueConditions.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
            </Box>
          ) : null;
        })()}
      </Paper>

      {/* HISTÓRICO PESSOAL */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#fff3e0', border: '2px solid #f57c00', display: shouldRenderSection('historico_pessoal') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#f57c00', mb: 3 }}>
          📝 Histórico Pessoal
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Já fez alguma cirurgia?</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Apêndice', 'Vesícula', 'Hérnia', 'Cesárea',
                  'Amígdalas', 'Ortopédica', 'Cardíaca', 'Catarata',
                  'Ginecológica', 'Urológica', 'Outra'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.cirurgias.includes(item)}
                          onChange={() => handleCheckboxChange('cirurgias', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Tem alergias?</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Medicamentos', 'Alimentos', 'Poeira', 'Pólen',
                  'Pelo de animais', 'Látex', 'Picadas de insetos', 'Não tenho alergias'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.alergias.includes(item)}
                          onChange={() => handleCheckboxChange('alergias', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Medicamentos em uso contínuo:</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Anti-hipertensivos', 'Antidiabéticos', 'Estatinas', 'Anticoagulantes',
                  'Antidepressivos', 'Ansiolíticos', 'Corticoides', 'Anti-inflamatórios',
                  'Hormônios tireoidianos', 'Antiácidos/IBP', 'Contraceptivos', 'Não uso medicamentos'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.medicamentosUso.includes(item)}
                          onChange={() => handleCheckboxChange('medicamentosUso', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Tem alguma doença crônica?</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Hipertensão', 'Diabetes tipo 1', 'Diabetes tipo 2', 'Hipotireoidismo',
                  'Hipertireoidismo', 'Asma', 'DPOC', 'Fibromialgia',
                  'Artrite reumatoide', 'Lúpus', 'Psoríase', 'Doença de Crohn',
                  'Colite ulcerativa', 'Endometriose', 'SOP', 'Não tenho'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.doencasCronicas.includes(item)}
                          onChange={() => handleCheckboxChange('doencasCronicas', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>

          {/* Protocolos para Histórico Pessoal */}
          {(() => {
            const conditions = [];
            
            const diseaseMapping = {
              'Hipertensão': 'Pressão alta',
              'Diabetes tipo 1': 'Diabetes tipo 1',
              'Diabetes tipo 2': 'Diabetes tipo 2',
              'Hipotireoidismo': 'Problemas de tireoide',
              'Hipertireoidismo': 'Problemas de tireoide',
              'Asma': 'Alergias',
              'DPOC': 'DPOC',
              'Fibromialgia': 'Dores de cabeça',
              'Artrite reumatoide': 'Artrite reumatoide',
              'Lúpus': 'Lúpus',
              'Psoríase': 'Psoríase',
              'Doença de Crohn': 'Doença de Crohn',
              'Colite ulcerativa': 'Colite ulcerativa',
              'Endometriose': 'Endometriose',
              'SOP': 'SOP'
            };
            
            if (responses.doencasCronicas) {
              responses.doencasCronicas.forEach(doenca => {
                if (diseaseMapping[doenca]) {
                  conditions.push(diseaseMapping[doenca]);
                }
              });
            }
            
            const uniqueConditions = [...new Set(conditions)];
            
            return (
              <>
                {uniqueConditions.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
                  </Box>
                )}
              </>
            );
          })()}
      </Paper>

      {/* HÁBITOS DE VIDA */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#e8f5e9', border: '2px solid #388e3c', display: shouldRenderSection('habitos_vida') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#388e3c', mb: 3 }}>
          🚶 Hábitos de Vida
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Tabagismo:</FormLabel>
            <RadioGroup
              value={responses.tabagismo}
              onChange={(e) => handleRadioChange('tabagismo', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca fumei" control={<Radio />} label="Nunca fumei" />
              <FormControlLabel value="Ex-fumante" control={<Radio />} label="Ex-fumante" />
              <FormControlLabel value="Fumante" control={<Radio />} label="Fumante" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Consumo de álcool:</FormLabel>
            <RadioGroup
              value={responses.etilismo}
              onChange={(e) => handleRadioChange('etilismo', e.target.value)}
              row
            >
              <FormControlLabel value="Não bebo" control={<Radio />} label="Não bebo" />
              <FormControlLabel value="Ocasionalmente" control={<Radio />} label="Ocasionalmente" />
              <FormControlLabel value="Finais de semana" control={<Radio />} label="Finais de semana" />
              <FormControlLabel value="Regularmente" control={<Radio />} label="Regularmente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Atividade física:</FormLabel>
            <RadioGroup
              value={responses.atividadeFisica}
              onChange={(e) => handleRadioChange('atividadeFisica', e.target.value)}
            >
              <FormControlLabel value="Sedentário" control={<Radio />} label="Sedentário (não pratico)" />
              <FormControlLabel value="Leve" control={<Radio />} label="Leve (1-2x por semana)" />
              <FormControlLabel value="Moderada" control={<Radio />} label="Moderada (3-4x por semana)" />
              <FormControlLabel value="Intensa" control={<Radio />} label="Intensa (5+ vezes por semana)" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Exposição ao sol:</FormLabel>
            <RadioGroup
              value={responses.exposicaoSol}
              onChange={(e) => handleRadioChange('exposicaoSol', e.target.value)}
              row
            >
              <FormControlLabel value="Muito pouca" control={<Radio />} label="Muito pouca" />
              <FormControlLabel value="Moderada" control={<Radio />} label="Moderada (15-30min/dia)" />
              <FormControlLabel value="Frequente" control={<Radio />} label="Frequente" />
            </RadioGroup>
          </FormControl>

          {/* Protocolos para Hábitos de Vida */}
          {(() => {
            const conditions = [];
            
            if (responses.atividadeFisica === 'Sedentário') {
              conditions.push('Cansaço/Fadiga');
            }
            
            if (responses.tabagismo === 'Fumante') {
              conditions.push('Ansiedade');
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>

      {/* ALIMENTAÇÃO */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#e0f2f1', border: '2px solid #00796b', display: shouldRenderSection('alimentacao') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#00796b', mb: 3 }}>
          🍽️ Alimentação
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Quantas refeições faz por dia?</FormLabel>
            <RadioGroup
              value={responses.refeicoesDia}
              onChange={(e) => handleRadioChange('refeicoesDia', e.target.value)}
              row
            >
              <FormControlLabel value="1-2" control={<Radio />} label="1-2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4-5" control={<Radio />} label="4-5" />
              <FormControlLabel value="6 ou mais" control={<Radio />} label="6 ou mais" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Como avalia sua alimentação?</FormLabel>
            <RadioGroup
              value={responses.qualidadeAlimentacao}
              onChange={(e) => handleRadioChange('qualidadeAlimentacao', e.target.value)}
              row
            >
              <FormControlLabel value="Ruim" control={<Radio />} label="Ruim" />
              <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="Boa" control={<Radio />} label="Boa" />
              <FormControlLabel value="Excelente" control={<Radio />} label="Excelente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Consumo de água por dia:</FormLabel>
            <RadioGroup
              value={responses.consumoAgua}
              onChange={(e) => handleRadioChange('consumoAgua', e.target.value)}
              row
            >
              <FormControlLabel value="Menos de 1L" control={<Radio />} label="Menos de 1L" />
              <FormControlLabel value="1-2L" control={<Radio />} label="1-2L" />
              <FormControlLabel value="2-3L" control={<Radio />} label="2-3L" />
              <FormControlLabel value="Mais de 3L" control={<Radio />} label="Mais de 3L" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Restrições alimentares ou dietas especiais:</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Vegetariano', 'Vegano', 'Sem glúten', 'Sem lactose',
                  'Low carb', 'Cetogênica', 'Jejum intermitente', 'Sem restrições'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.restricoesAlimentares.includes(item)}
                          onChange={() => handleCheckboxChange('restricoesAlimentares', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Consumo frequente de:</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Fast food', 'Doces/Açúcar', 'Refrigerantes', 'Frituras',
                  'Embutidos', 'Café', 'Chá', 'Industrializados'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.consumoFrequente.includes(item)}
                          onChange={() => handleCheckboxChange('consumoFrequente', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>

          {/* Protocolos para Alimentação */}
          {(() => {
            const conditions = [];
            
            if (responses.qualidadeAlimentacao === 'Ruim' || 
                responses.consumoFrequente.includes('Fast food') ||
                responses.consumoFrequente.includes('Frituras')) {
              conditions.push('Gastrite');
            }
            
            if (responses.consumoAgua === 'Menos de 1L') {
              conditions.push('Cansaço/Fadiga');
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>

      {/* SONO E REPOUSO */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#e8eaf6', border: '2px solid #303f9f', display: shouldRenderSection('sono_repouso') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#303f9f', mb: 3 }}>
          😴 Sono e Repouso
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Horas de sono por noite:</FormLabel>
            <RadioGroup
              value={responses.horasSono}
              onChange={(e) => handleRadioChange('horasSono', e.target.value)}
              row
            >
              <FormControlLabel value="Menos de 5h" control={<Radio />} label="Menos de 5h" />
              <FormControlLabel value="5-6h" control={<Radio />} label="5-6h" />
              <FormControlLabel value="7-8h" control={<Radio />} label="7-8h" />
              <FormControlLabel value="Mais de 8h" control={<Radio />} label="Mais de 8h" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Qualidade do sono:</FormLabel>
            <RadioGroup
              value={responses.qualidadeSono}
              onChange={(e) => handleRadioChange('qualidadeSono', e.target.value)}
              row
            >
              <FormControlLabel value="Ruim" control={<Radio />} label="Ruim" />
              <FormControlLabel value="Regular" control={<Radio />} label="Regular" />
              <FormControlLabel value="Boa" control={<Radio />} label="Boa" />
              <FormControlLabel value="Excelente" control={<Radio />} label="Excelente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Dificuldades para dormir:</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Demora para pegar no sono', 'Acorda durante a noite', 'Acorda muito cedo',
                  'Pesadelos', 'Ronco', 'Apneia do sono', 'Nenhuma dificuldade'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.dificuldadeDormir.includes(item)}
                          onChange={() => handleCheckboxChange('dificuldadeDormir', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
          </FormControl>

          {/* Protocolos para Sono e Repouso */}
          {(() => {
            const conditions = [];
            
            if (responses.qualidadeSono === 'Ruim' || 
                responses.qualidadeSono === 'Regular' ||
                responses.dificuldadeDormir?.length > 0 && 
                !responses.dificuldadeDormir.includes('Nenhuma dificuldade')) {
              conditions.push('Insônia');
            }
            
            if (responses.horasSono === 'Menos de 5h' || responses.horasSono === '5-6h') {
              conditions.push('Cansaço/Fadiga');
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>

      {/* SISTEMA DIGESTÓRIO */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#fce4ec', border: '2px solid #c2185b', display: shouldRenderSection('sistema_digestorio') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#c2185b', mb: 3 }}>
          🫃 Sistema Digestório
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Funcionamento intestinal:</FormLabel>
            <RadioGroup
              value={responses.funcionamentoIntestinal}
              onChange={(e) => handleRadioChange('funcionamentoIntestinal', e.target.value)}
            >
              <FormControlLabel value="Normal (1x ao dia)" control={<Radio />} label="Normal (1x ao dia)" />
              <FormControlLabel value="Constipação (menos de 3x por semana)" control={<Radio />} label="Constipação (menos de 3x por semana)" />
              <FormControlLabel value="Diarreia frequente" control={<Radio />} label="Diarreia frequente" />
              <FormControlLabel value="Irregular (alternado)" control={<Radio />} label="Irregular (alternado)" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Gases/Flatulência:</FormLabel>
            <RadioGroup
              value={responses.gases}
              onChange={(e) => handleRadioChange('gases', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
              <FormControlLabel value="Raramente" control={<Radio />} label="Raramente" />
              <FormControlLabel value="Frequentemente" control={<Radio />} label="Frequentemente" />
              <FormControlLabel value="Diariamente" control={<Radio />} label="Diariamente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Azia/Refluxo:</FormLabel>
            <RadioGroup
              value={responses.azia}
              onChange={(e) => handleRadioChange('azia', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
              <FormControlLabel value="Raramente" control={<Radio />} label="Raramente" />
              <FormControlLabel value="Frequentemente" control={<Radio />} label="Frequentemente" />
              <FormControlLabel value="Diariamente" control={<Radio />} label="Diariamente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Náuseas/Enjoos:</FormLabel>
            <RadioGroup
              value={responses.nauseas}
              onChange={(e) => handleRadioChange('nauseas', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
              <FormControlLabel value="Raramente" control={<Radio />} label="Raramente" />
              <FormControlLabel value="Frequentemente" control={<Radio />} label="Frequentemente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Distensão abdominal:</FormLabel>
            <RadioGroup
              value={responses.distensaoAbdominal}
              onChange={(e) => handleRadioChange('distensaoAbdominal', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
              <FormControlLabel value="Após refeições" control={<Radio />} label="Após refeições" />
              <FormControlLabel value="Frequentemente" control={<Radio />} label="Frequentemente" />
              <FormControlLabel value="Constante" control={<Radio />} label="Constante" />
            </RadioGroup>
          </FormControl>

          {/* Protocolos para Sistema Digestório */}
          {(() => {
            const conditions = [];
            
            if (responses.azia === 'Frequentemente' || 
                responses.azia === 'Diariamente' ||
                responses.nauseas === 'Frequentemente') {
              conditions.push('Gastrite');
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>

      {/* SISTEMA URINÁRIO */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#e1f5fe', border: '2px solid #0288d1', display: shouldRenderSection('sistema_urinario') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#0288d1', mb: 3 }}>
          💧 Sistema Urinário
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Frequência urinária:</FormLabel>
            <RadioGroup
              value={responses.frequenciaUrinaria}
              onChange={(e) => handleRadioChange('frequenciaUrinaria', e.target.value)}
            >
              <FormControlLabel value="Normal (4-7x ao dia)" control={<Radio />} label="Normal (4-7x ao dia)" />
              <FormControlLabel value="Aumentada (mais de 8x ao dia)" control={<Radio />} label="Aumentada (mais de 8x ao dia)" />
              <FormControlLabel value="Diminuída (menos de 4x ao dia)" control={<Radio />} label="Diminuída (menos de 4x ao dia)" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Cor da urina:</FormLabel>
            <RadioGroup
              value={responses.corUrina}
              onChange={(e) => handleRadioChange('corUrina', e.target.value)}
              row
            >
              <FormControlLabel value="Clara/Transparente" control={<Radio />} label="Clara" />
              <FormControlLabel value="Amarelo claro" control={<Radio />} label="Amarelo claro" />
              <FormControlLabel value="Amarelo escuro" control={<Radio />} label="Amarelo escuro" />
              <FormControlLabel value="Turva/Outra" control={<Radio />} label="Turva/Outra" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Ardor ou dor ao urinar:</FormLabel>
            <RadioGroup
              value={responses.ardorUrinar}
              onChange={(e) => handleRadioChange('ardorUrinar', e.target.value)}
              row
            >
              <FormControlLabel value="Nunca" control={<Radio />} label="Nunca" />
              <FormControlLabel value="Raramente" control={<Radio />} label="Raramente" />
              <FormControlLabel value="Frequentemente" control={<Radio />} label="Frequentemente" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Acorda à noite para urinar?</FormLabel>
            <RadioGroup
              value={responses.acordaUrinar}
              onChange={(e) => handleRadioChange('acordaUrinar', e.target.value)}
              row
            >
              <FormControlLabel value="Não" control={<Radio />} label="Não" />
              <FormControlLabel value="1x" control={<Radio />} label="1x" />
              <FormControlLabel value="2x ou mais" control={<Radio />} label="2x ou mais" />
            </RadioGroup>
          </FormControl>

          {/* Protocolos para Sistema Urinário */}
          {(() => {
            const conditions = [];
            
            if (responses.ardorUrinar === 'Frequentemente' || 
                responses.corUrina === 'Turva/Outra') {
              conditions.push('Ansiedade'); // Placeholder - adicionar protocolo específico se disponível
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>

      {/* SINTOMAS GERAIS */}
      <Paper elevation={3} sx={{ mb: 3, p: 3, bgcolor: '#fbe9e7', border: '2px solid #e64a19', display: shouldRenderSection('sintomas_gerais') ? 'block' : 'none' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#e64a19', mb: 3 }}>
          💭 Sintomas Gerais
        </Typography>
        
        <FormControl component="fieldset" fullWidth>
            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Nível de energia:</FormLabel>
            <RadioGroup
              value={responses.nivelEnergia}
              onChange={(e) => handleRadioChange('nivelEnergia', e.target.value)}
              row
            >
              <FormControlLabel value="Muito baixo" control={<Radio />} label="Muito baixo" />
              <FormControlLabel value="Baixo" control={<Radio />} label="Baixo" />
              <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="Alto" control={<Radio />} label="Alto" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 2, fontWeight: 600 }}>Dores frequentes:</FormLabel>
            <FormGroup>
              <Grid container spacing={1}>
                {[
                  'Cabeça', 'Pescoço', 'Ombros', 'Costas',
                  'Coluna lombar', 'Joelhos', 'Articulações', 'Musculares',
                  'Abdominal', 'Sem dores'
                ].map(item => (
                  <Grid item xs={12} sm={6} md={4} key={item}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={responses.dores.includes(item)}
                          onChange={() => handleCheckboxChange('dores', item)}
                        />
                      }
                      label={<Typography variant="body2">{item}</Typography>}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            {/* Protocolos inline para cada dor selecionada */}
            {(() => {
              const mappedConditions = [...new Set(
                (responses.dores || [])
                  .filter(d => DORES_PARA_PROTOCOLO[d])
                  .map(d => DORES_PARA_PROTOCOLO[d])
              )];
              return mappedConditions.length > 0 ? (
                <Box sx={{ mt: 2 }}>
                  <TreatmentProtocolsDisplay selectedConditions={mappedConditions} patientId={patientId} />
                </Box>
              ) : null;
            })()}

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Nível de estresse:</FormLabel>
            <RadioGroup
              value={responses.nivelEstresse}
              onChange={(e) => handleRadioChange('nivelEstresse', e.target.value)}
              row
            >
              <FormControlLabel value="Baixo" control={<Radio />} label="Baixo" />
              <FormControlLabel value="Moderado" control={<Radio />} label="Moderado" />
              <FormControlLabel value="Alto" control={<Radio />} label="Alto" />
              <FormControlLabel value="Muito alto" control={<Radio />} label="Muito alto" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Nível de ansiedade:</FormLabel>
            <RadioGroup
              value={responses.nivelAnsiedade}
              onChange={(e) => handleRadioChange('nivelAnsiedade', e.target.value)}
              row
            >
              <FormControlLabel value="Nenhuma" control={<Radio />} label="Nenhuma" />
              <FormControlLabel value="Leve" control={<Radio />} label="Leve" />
              <FormControlLabel value="Moderada" control={<Radio />} label="Moderada" />
              <FormControlLabel value="Intensa" control={<Radio />} label="Intensa" />
            </RadioGroup>

            <Divider sx={{ my: 3 }} />

            <FormLabel sx={{ mb: 1, fontWeight: 600 }}>Como está seu humor?</FormLabel>
            <RadioGroup
              value={responses.humor}
              onChange={(e) => handleRadioChange('humor', e.target.value)}
              row
            >
              <FormControlLabel value="Deprimido" control={<Radio />} label="Deprimido" />
              <FormControlLabel value="Baixo" control={<Radio />} label="Baixo" />
              <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
              <FormControlLabel value="Bom" control={<Radio />} label="Bom" />
            </RadioGroup>
          </FormControl>

          {/* Protocolos para Sintomas Gerais — estresse, ansiedade, fadiga */}
          {(() => {
            const conditions = [];
            
            // Enxaqueca se dor de cabeça + estresse alto
            if (responses.dores?.includes('Cabeça') && 
                (responses.nivelEstresse === 'Alto' || 
                 responses.nivelEstresse === 'Muito alto')) {
              conditions.push('Enxaqueca');
            }
            
            // Ansiedade
            if (responses.nivelAnsiedade === 'Moderada' || 
                responses.nivelAnsiedade === 'Intensa' ||
                responses.nivelEstresse === 'Alto' ||
                responses.nivelEstresse === 'Muito alto') {
              conditions.push('Ansiedade');
            }
            
            // Cansaço/Fadiga
            if (responses.nivelEnergia === 'Muito baixo' ||
                responses.nivelEnergia === 'Baixo') {
              conditions.push('Cansaço/Fadiga');
            }
            
            const uniqueConditions = [...new Set(conditions)];
            return uniqueConditions.length > 0 ? (
              <Box sx={{ mt: 3 }}>
                <TreatmentProtocolsDisplay selectedConditions={uniqueConditions} patientId={patientId} />
              </Box>
            ) : null;
          })()}
      </Paper>
    </Box>
  );
}
