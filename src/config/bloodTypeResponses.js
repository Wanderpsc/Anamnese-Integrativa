// Mapping of blood type to diagnostic / high-level recommendations
// This is derived from clinical/energetic notes format and serves as a starting
// point. You can update these strings with the exact wording from your
// 'TIPO SANGUÍNEO - ANAMNESE CONFORME BIORRESSONÂNCIA.docx' if you prefer.

const BLOOD_TYPE_RESPONSES = {
  'A+': {
    title: 'Tipo A+',
    synopsis: 'Perfil A+: tendência a digestão sensível. Recomendado suporte hepático e dieta com alimentos leves e fermentados.',
    details: 'Considere controle de estresse, suporte probiótico e consumir proteínas magras. Evite alimentos processados e excesso de laticínios.'
  },
  'A-': {
    title: 'Tipo A-',
    synopsis: 'Perfil A-: semelhanças com A+, com maior risco autoimune em alguns casos. Priorizar anti-inflamatórios naturais e relaxamento.',
    details: 'Atenção à imunomodulação e cuidar de possíveis sensibilidades alimentares. Dieta anti-inflamatória e monitorar vitaminas D e B12.'
  },
  'B+': {
    title: 'Tipo B+',
    synopsis: 'Perfil B+: sistema imunológico reativo, bom processamento de laticínios para alguns. Trabalhar equilíbrio metabólico.',
    details: 'Incluir variação de proteínas (peixes, aves), avaliar intolerâncias e recomendados antioxidantes e exercícios regulares.'
  },
  'B-': {
    title: 'Tipo B-',
    synopsis: 'Perfil B-: similar ao B+, com necessidade de monitoramento imunológico e equilíbrio energético.',
    details: 'Monitorar sinais de inflamação crônica e apoiar função hepática e linfática. Considerar avaliação de marcadores inflamatórios.'
  },
  'AB+': {
    title: 'Tipo AB+',
    synopsis: 'Perfil AB+: mistura de características A e B; maior necessidade de personalização dietética.',
    details: 'Avaliar sensibilidade a alimentos e estresse. Recomendar dieta balanceada, hidratação e acompanhamento funcional individualizado.'
  },
  'AB-': {
    title: 'Tipo AB-',
    synopsis: 'Perfil AB-: requer abordagem personalizada semelhante a AB+, com atenção especial a deficiências nutricionais.',
    details: 'Considerar suporte de micronutrientes, teste para intolerâncias e plano alimentar individual.'
  },
  'O+': {
    title: 'Tipo O+',
    synopsis: 'Perfil O+: tendência a metabolismo mais rápido e maior demanda proteica. Atenção a acidez e inflamação digestiva.',
    details: 'Recomendar dieta com proteínas de qualidade, controle de açúcar e atividade física regular. Suporte digestivo quando necessário.'
  },
  'O-': {
    title: 'Tipo O-',
    synopsis: 'Perfil O-: similar ao O+, mas com possíveis variações imunológicas. Monitorar anemia e reservas minerais.',
    details: 'Avaliar ferro, vitamina B12 e apoiar o equilíbrio ácido-base. Incentivar dieta nutritiva e exames laboratoriais conforme necessidade.'
  }
};

export default BLOOD_TYPE_RESPONSES;
