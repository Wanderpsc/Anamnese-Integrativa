import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Button, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

/**
 * Componente lateral com perguntas sugestivas de anamnese
 * para facilitar a coleta durante a consulta
 */
export default function AnamnesisQuestionsSidebar({ onAddText }) {
  
  const questionCategories = [
    {
      category: 'Características da Dor/Sintoma',
      icon: '🩺',
      color: '#d32f2f',
      questions: [
        'Como você descreveria a dor? (pontada, queimação, peso, latejante, etc.)',
        'A dor/sintoma é constante ou vai e volta?',
        'Em que horário do dia piora?',
        'Em que horário do dia melhora?',
        'Qual a intensidade de 0 a 10?',
        'O que alivia o sintoma?',
        'O que piora o sintoma?',
        'O sintoma irradia para algum lugar?',
        'Tem algum sintoma associado?'
      ]
    },
    {
      category: 'Início e Evolução',
      icon: '📅',
      color: '#1976d2',
      questions: [
        'Quando começou exatamente?',
        'Como começou? (súbito, gradual)',
        'Teve algum evento/trauma antes de começar?',
        'Passou por estresse emocional nessa época?',
        'O sintoma está melhorando, piorando ou estável?',
        'Já teve isso antes?',
        'Teve febre ou outros sintomas sistêmicos?'
      ]
    },
    {
      category: 'Tratamentos Anteriores',
      icon: '💊',
      color: '#7b1fa2',
      questions: [
        'Já fez tratamento para isso?',
        'Quais medicamentos já usou?',
        'Algum medicamento ajudou?',
        'Teve efeitos colaterais?',
        'Já fez exames? Quais? Resultados?',
        'Já consultou especialista? Qual diagnóstico?',
        'Faz uso contínuo de medicamentos?'
      ]
    },
    {
      category: 'Sistema Digestivo',
      icon: '🍽️',
      color: '#f57c00',
      questions: [
        'Como está seu intestino? (frequência, consistência)',
        'Tem gases, distensão abdominal?',
        'Sente azia, refluxo?',
        'Tem náuseas ou vômitos?',
        'Qual sua dieta habitual?',
        'Quantos copos de água bebe por dia?',
        'Consome álcool? Quanto?',
        'Tem intolerâncias alimentares conhecidas?'
      ]
    },
    {
      category: 'Sistema Nervoso/Emocional',
      icon: '🧠',
      color: '#0288d1',
      questions: [
        'Como está seu sono? (demora dormir, acorda noite, qualidade)',
        'Sente-se ansioso(a)? Com que frequência?',
        'Tem ou teve depressão?',
        'Como está seu nível de estresse? (1-10)',
        'Tem picos de energia ou cansaço durante o dia?',
        'Tem dificuldade de concentração?',
        'Tem esquecimentos frequentes?',
        'Passa por momento difícil emocionalmente?'
      ]
    },
    {
      category: 'Sistema Circulatório',
      icon: '❤️',
      color: '#c62828',
      questions: [
        'Sabe sua pressão arterial? Qual o último valor?',
        'Sente palpitações?',
        'Tem inchaço nas pernas/pés?',
        'Sente dor no peito?',
        'Tem falta de ar?',
        'Sente formigamentos?',
        'Tem varizes?',
        'Mãos e pés ficam frios?'
      ]
    },
    {
      category: 'Sistema Endócrino/Metabólico',
      icon: '⚖️',
      color: '#388e3c',
      questions: [
        'Ganhou ou perdeu peso recentemente? Quanto?',
        'Como está sua glicose? (última medição)',
        'Tem muito sede?',
        'Urina muito?',
        'Tem sudorese excessiva?',
        'Sente muito frio ou muito calor?',
        'Tem queda de cabelo?',
        'Unhas quebradiças?',
        'Pele muito seca?'
      ]
    },
    {
      category: 'Sistema Reprodutor (Mulheres)',
      icon: '🌸',
      color: '#ec407a',
      questions: [
        'Ciclo menstrual regular?',
        'Fluxo menstrual (leve, moderado, intenso)?',
        'Tem cólicas? Intensidade?',
        'Sintomas de TPM?',
        'Data da última menstruação?',
        'Usa anticoncepcional? Qual?',
        'Já entrou na menopausa?',
        'Sintomas de menopausa?',
        'Gestações anteriores?'
      ]
    },
    {
      category: 'Sistema Urinário',
      icon: '💧',
      color: '#0097a7',
      questions: [
        'Quantas vezes urina por dia?',
        'Acorda à noite para urinar?',
        'Cor da urina? (clara, escura, com sangue)',
        'Tem ardor ao urinar?',
        'Tem urgência urinária?',
        'Já teve pedras nos rins?',
        'Tem infecções urinárias frequentes?'
      ]
    },
    {
      category: 'Sistema Respiratório',
      icon: '🫁',
      color: '#5e35b1',
      questions: [
        'Tem tosse? Há quanto tempo?',
        'Tosse com catarro? Cor?',
        'Tem falta de ar?',
        'Sente chiado no peito?',
        'Tem alergias respiratórias?',
        'Fuma? Há quanto tempo? Quantidade?',
        'Ex-fumante? Parou quando?',
        'Ronca durante o sono?'
      ]
    },
    {
      category: 'Hábitos de Vida',
      icon: '🏃',
      color: '#558b2f',
      questions: [
        'Pratica atividade física? Qual? Frequência?',
        'Quantas horas dorme por noite?',
        'Trabalha sentado ou em pé?',
        'Quantas horas trabalha por dia?',
        'Tem momentos de lazer/relaxamento?',
        'Pratica meditação, yoga ou similar?',
        'Exposição ao sol diária?',
        'Usa telas antes de dormir?'
      ]
    },
    {
      category: 'Antecedentes Familiares',
      icon: '👨‍👩‍👧‍👦',
      color: '#795548',
      questions: [
        'Seus pais são vivos? Saúde deles?',
        'Alguém na família tem diabetes?',
        'Alguém na família tem hipertensão?',
        'Histórico de câncer na família? Qual tipo?',
        'Doenças autoimunes na família?',
        'Problemas cardíacos na família?',
        'Doenças neurológicas na família?',
        'Problemas de tireoide na família?'
      ]
    }
  ];

  const handleAddQuestion = (question) => {
    if (onAddText) {
      onAddText(`\n${question}\n`);
    }
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'auto' }}>
      <Paper sx={{ p: 2, mb: 2, bgcolor: '#f5f5f5', border: '2px solid #1976d2' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1976d2', mb: 1 }}>
          <HelpOutlineIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Perguntas Sugestivas
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Clique nas perguntas para adicionar ao campo de queixa principal
        </Typography>
      </Paper>

      {questionCategories.map((category, catIdx) => (
        <Accordion key={catIdx} sx={{ mb: 1 }}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              bgcolor: `${category.color}15`,
              '&:hover': { bgcolor: `${category.color}25` }
            }}
          >
            <Typography sx={{ fontWeight: 600, color: category.color }}>
              {category.icon} {category.category}
            </Typography>
            <Chip 
              label={category.questions.length}
              size="small"
              sx={{ ml: 'auto', mr: 1 }}
            />
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: '#fafafa' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {category.questions.map((question, qIdx) => (
                <Button
                  key={qIdx}
                  variant="outlined"
                  size="small"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => handleAddQuestion(question)}
                  sx={{
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    textTransform: 'none',
                    borderColor: '#e0e0e0',
                    color: '#555',
                    '&:hover': {
                      borderColor: category.color,
                      bgcolor: `${category.color}10`,
                      color: category.color
                    },
                    py: 1,
                    px: 2
                  }}
                >
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {question}
                  </Typography>
                </Button>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Paper sx={{ p: 2, mt: 2, bgcolor: '#e8f5e9', border: '1px solid #4caf50' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#2e7d32' }}>
          💡 <strong>Dica:</strong> Quanto mais detalhada a queixa, mais preciso será o plano terapêutico gerado automaticamente.
        </Typography>
      </Paper>
    </Box>
  );
}
