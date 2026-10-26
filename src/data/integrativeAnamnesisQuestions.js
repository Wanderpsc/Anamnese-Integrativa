// Questionnaire blocks for the Integrative Anamnesis Dialog
// Used by both AnamnesisDialog (therapist view) and PublicAnamnesisForm (patient view)

export const QUESTIONNAIRE_BLOCKS = [
  {
    id: 'b1', title: '1. Identificação e Queixa Principal', color: '#1565c0',
    questions: [
      { id: 'b1q1', text: 'Qual o principal motivo da consulta hoje?', type: 'text' },
      { id: 'b1q2', text: 'Há quanto tempo isso começou?', type: 'radio',
        options: ['Menos de 1 mês', '1–3 meses', '3–6 meses', 'Mais de 6 meses'] },
      { id: 'b1q3', text: 'O que piora seus sintomas?', type: 'text' },
      { id: 'b1q4', text: 'O que melhora seus sintomas?', type: 'text' },
    ]
  },
  {
    id: 'b2', title: '2. Energia e Disposição', color: '#e65100',
    questions: [
      { id: 'b2q1', text: 'Como está sua energia ao longo do dia?', type: 'scale',
        hint: '0 = muito baixa  •  10 = excelente' },
      { id: 'b2q2', text: 'Em quais períodos sente mais cansaço?', type: 'radio',
        options: ['Manhã', 'Tarde', 'Noite', 'O dia todo'] },
      { id: 'b2q3', text: 'Você sente "picos e quedas" de energia?', type: 'radio', options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b3', title: '3. Sono', color: '#4527a0',
    questions: [
      { id: 'b3q1', text: 'Como você avalia a qualidade do seu sono?', type: 'scale',
        hint: '0 = muito ruim  •  10 = excelente' },
      { id: 'b3q2', text: 'Você tem dificuldade para dormir?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b3q3', text: 'Acorda durante a noite?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b3q4', text: 'Acorda descansado(a)?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b3q5', text: 'O que mais atrapalha seu sono?', type: 'checkbox',
        options: ['Pensamentos', 'Celular', 'Barulho', 'Alimentação', 'Ansiedade', 'Nenhum'] },
    ]
  },
  {
    id: 'b4', title: '4. Alimentação', color: '#2e7d32',
    questions: [
      { id: 'b4q1', text: 'Como é sua rotina alimentar?', type: 'radio',
        options: ['Regular (horários definidos)', 'Irregular', 'Pulo refeições com frequência'] },
      { id: 'b4q2', text: 'Você sente fome ou come mais por emoção?', type: 'radio',
        options: ['Fome real', 'Emoção/ansiedade', 'Ambos'] },
      { id: 'b4q3', text: 'Sente que sua alimentação é saudável?', type: 'radio',
        options: ['Sim', 'Não', 'Parcialmente'] },
      { id: 'b4q4', text: 'Consumo de água diário:', type: 'radio',
        options: ['Menos de 1L', '1–2L', 'Mais de 2L'] },
    ]
  },
  {
    id: 'b5', title: '5. Sistema Digestório', color: '#558b2f',
    questions: [
      { id: 'b5q1', text: 'Você sente algum desses sintomas?', type: 'checkbox',
        options: ['Inchaço abdominal', 'Gases', 'Azia/refluxo', 'Constipação', 'Diarreia', 'Nenhum'] },
      { id: 'b5q2', text: 'Algum alimento piora seus sintomas?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b5q3', text: 'Você sente desconforto após comer?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b5q4', text: 'Como é o funcionamento do seu intestino?', type: 'radio',
        options: ['Regular', 'Preso', 'Solto'] },
    ]
  },
  {
    id: 'b6', title: '6. Emocional e Mental', color: '#ad1457',
    questions: [
      { id: 'b6q1', text: 'Como você avalia seu nível de estresse?', type: 'scale',
        hint: '0 = sem estresse  •  10 = estresse máximo' },
      { id: 'b6q2', text: 'Você se sente ansioso(a) com frequência?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b6q3', text: 'Sua mente costuma ficar acelerada?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b6q4', text: 'Como está sua concentração?', type: 'scale',
        hint: '0 = muito ruim  •  10 = excelente' },
      { id: 'b6q5', text: 'Você sente desânimo ou perda de interesse?', type: 'radio', options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b7', title: '7. Atividade Física', color: '#00695c',
    questions: [
      { id: 'b7q1', text: 'Você pratica atividade física?', type: 'radio',
        options: ['Sim regularmente', 'Às vezes', 'Não'] },
      { id: 'b7q2', text: 'Como você se sente ao se movimentar?', type: 'scale',
        hint: '0 = muito mal  •  10 = muito bem' },
      { id: 'b7q3', text: 'O que te impede de se exercitar mais?', type: 'radio',
        options: ['Falta de tempo', 'Dor', 'Falta de motivação', 'Cansaço'] },
    ]
  },
  {
    id: 'b8', title: '8. Cardiovascular', color: '#b71c1c',
    questions: [
      { id: 'b8q1', text: 'Já sentiu algum desses sintomas?', type: 'checkbox',
        options: ['Palpitação', 'Tontura', 'Pressão alta', 'Nenhum'] },
      { id: 'b8q2', text: 'Você percebe relação entre estresse e esses sintomas?', type: 'radio',
        options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b9', title: '9. Sistema Imunológico', color: '#006064',
    questions: [
      { id: 'b9q1', text: 'Você adoece com frequência?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b9q2', text: 'Já teve infecções recorrentes?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b9q3', text: 'Tem alguma doença autoimune?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b9q3a', text: 'Qual(is) doença(s) autoimune(s)?', type: 'checkbox',
        showIf: { id: 'b9q3', value: 'Sim' },
        options: [
          'Hashimoto (tireoidite autoimune)',
          'Lúpus (LES)',
          'Doença de Crohn',
          'Colite ulcerativa',
          'Psoríase',
          'Artrite reumatoide',
          'Esclerose múltipla',
          'Vitiligo',
          'Síndrome de Sjögren',
          'Fibromialgia',
          'Doença celíaca',
          'Diabetes tipo 1',
          'Esclerodermia',
          'Outra',
        ]
      },
      { id: 'b9q3b', text: 'Se marcou "Outra", descreva qual:', type: 'text',
        showIf: { id: 'b9q3', value: 'Sim' }
      },
    ]
  },
  {
    id: 'b10', title: '10. Respiratório', color: '#37474f',
    questions: [
      { id: 'b10q1', text: 'Você sente falta de ar ou respiração curta?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b10q2', text: 'Sua respiração piora com estresse?', type: 'radio', options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b11', title: '11. Musculoesquelético', color: '#4e342e',
    questions: [
      { id: 'b11q1', text: 'Você sente dores musculares ou articulares?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b11q2', text: 'Como está sua recuperação física?', type: 'scale',
        hint: '0 = muito lenta  •  10 = excelente' },
    ]
  },
  {
    id: 'b12', title: '12. Hábitos e Exposições', color: '#6a1b9a',
    questions: [
      { id: 'b12q1', text: 'Consome álcool?', type: 'radio', options: ['Não', 'Socialmente', 'Frequente'] },
      { id: 'b12q2', text: 'Fuma?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b12q3', text: 'Usa medicamentos contínuos?', type: 'radio', options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b13', title: '13. Estilo de Vida', color: '#bf360c',
    questions: [
      { id: 'b13q1', text: 'Você sente que vive mais em:', type: 'radio',
        options: ['Modo sobrevivência', 'Modo presença'] },
      { id: 'b13q2', text: 'Você tem tempo para si mesmo(a)?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b13q3', text: 'Você se sente apoiado emocionalmente?', type: 'radio', options: ['Sim', 'Não'] },
    ]
  },
  {
    id: 'b14', title: '14. Percepção de Saúde', color: '#1a237e',
    questions: [
      { id: 'b14q1', text: 'Como você avalia sua saúde hoje?', type: 'scale',
        hint: '0 = muito ruim  •  10 = excelente' },
      { id: 'b14q2', text: 'Você sente que tem qualidade de vida?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b14q3', text: 'O que você gostaria de melhorar?', type: 'text' },
      { id: 'b14q4', text: 'Quais são seus principais objetivos com o tratamento?', type: 'text' },
    ]
  },
  {
    id: 'b15', title: '15. Saúde Emocional e Psicológica', color: '#4527a0',
    questions: [
      { id: 'b15q1', text: 'Como você avalia seu estado emocional atualmente?', type: 'scale',
        hint: '0 = muito ruim  •  10 = muito bem' },
      { id: 'b15q2', text: 'Com que frequência você se sente sobrecarregado(a)?', type: 'radio',
        options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Quase sempre'] },
      { id: 'b15q3', text: 'Você sente ansiedade com frequência?', type: 'radio',
        options: ['Não', 'Leve', 'Moderada', 'Intensa'] },
      { id: 'b15q4', text: 'Quais sintomas de ansiedade você percebe?', type: 'checkbox',
        options: ['Pensamentos acelerados', 'Preocupação excessiva', 'Falta de ar', 'Tensão muscular', 'Insônia', 'Taquicardia', 'Nenhum'] },
      { id: 'b15q5', text: 'Nos últimos meses, você tem sentido:', type: 'checkbox',
        options: ['Desânimo frequente', 'Perda de interesse nas coisas', 'Cansaço constante', 'Irritabilidade', 'Sensação de vazio', 'Nenhum'] },
      { id: 'b15q6', text: 'Como está sua motivação para atividades do dia a dia?', type: 'scale',
        hint: '0 = sem motivação  •  10 = muito motivado(a)' },
      { id: 'b15q7', text: 'Você sente dificuldade de concentração ou memória?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b15q8', text: 'Você sente "mente confusa" ou lentidão mental?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b15q9', text: 'Como você reage ao estresse?', type: 'radio',
        options: ['Fico mais calmo(a)', 'Ansioso(a)', 'Irritado(a)', 'Evito ou me isolo'] },
      { id: 'b15q10', text: 'Você sente que está vivendo mais em estado de alerta constante?', type: 'radio',
        options: ['Sim', 'Não'] },
      { id: 'b15q11', text: 'Você já passou por situações difíceis que sente que ainda impactam sua vida?', type: 'radio',
        options: ['Sim', 'Não', 'Prefiro não responder'] },
      { id: 'b15q12', text: 'Esses eventos ainda afetam seu emocional hoje?', type: 'radio',
        options: ['Sim', 'Não', 'Não sei dizer'] },
      { id: 'b15q13', text: 'Você se sente apoiado emocionalmente?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b15q14', text: 'Você tem com quem conversar quando precisa?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b15q15', text: 'Você utiliza algo para aliviar emoções difíceis?', type: 'checkbox',
        options: ['Comida', 'Álcool', 'Medicamentos', 'Redes sociais', 'Isolamento', 'Exercício', 'Nenhum', 'Outros'] },
      { id: 'b15q16', text: 'Em momentos difíceis, você já sentiu que gostaria de "desaparecer" ou fugir de tudo?', type: 'radio',
        options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente'] },
      { id: 'b15q17', text: 'Você já teve pensamentos de que sua vida não vale a pena ou de desistir de tudo?', type: 'radio',
        options: ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Prefiro não responder'] },
      { id: 'b15q18', text: 'Você sente dificuldade em controlar impulsos ou reações emocionais?', type: 'radio',
        options: ['Sim', 'Não'] },
      { id: 'b15q19', text: 'Já percebeu comportamentos agressivos (consigo ou com outros)?', type: 'radio',
        options: ['Sim', 'Não'] },
      { id: 'b15q20', text: 'Você já recebeu algum diagnóstico psicológico ou psiquiátrico?', type: 'radio',
        options: ['Não', 'Sim'] },
      { id: 'b15q20b', text: 'Se sim, qual diagnóstico?', type: 'text',
        showIf: { id: 'b15q20', value: 'Sim' } },
      { id: 'b15q21', text: 'Como você avalia sua qualidade emocional geral?', type: 'scale',
        hint: '0 = muito ruim  •  10 = muito bem' },
    ]
  },
  {
    id: 'b16', title: '16. Alergias e Sensibilidades', color: '#e65100',
    questions: [
      { id: 'b16q1', text: 'Você possui alguma alergia diagnosticada?', type: 'radio', options: ['Não', 'Sim'] },
      { id: 'b16q1b', text: 'Se sim, qual?', type: 'text', showIf: { id: 'b16q1', value: 'Sim' } },
      { id: 'b16q2', text: 'Você apresenta sintomas após contato com:', type: 'checkbox',
        options: ['Alimentos', 'Poeira', 'Perfumes/químicos', 'Animais', 'Medicamentos', 'Nenhum'] },
    ]
  },
  {
    id: 'b17', title: '17. Intolerâncias Alimentares', color: '#1b5e20',
    questions: [
      { id: 'b17q1', text: 'Você suspeita de intolerância alimentar?', type: 'radio', options: ['Sim', 'Não'] },
      { id: 'b17q2', text: 'Após comer, você sente:', type: 'checkbox',
        options: ['Inchaço', 'Cansaço', 'Dor de cabeça', 'Diarreia', 'Gases', 'Nenhum'] },
    ]
  },
];
