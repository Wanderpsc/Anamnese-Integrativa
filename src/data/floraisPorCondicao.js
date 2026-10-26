/**
 * Protocolos de Florais por condição clínica.
 *
 * Fontes internas utilizadas (apostilas do próprio sistema):
 * - PROMPT+BUQ+FLORAL.pdf
 * - uso-de-floral-frequencial-na-sindrome-do-panico-mioma-e-polipo-endometrial.pdf
 * - analise-do-biocampo-aura-com-o-uso-do-harmonizador-floral.pdf
 */

const POSOLOGIA_PADRAO = '4 gotas sublinguais, 4x/dia, por 30 a 60 dias, com reavaliação clínica.';
const POSOLOGIA_AGUDA = '4 gotas sublinguais a cada 30-60 minutos na crise (até 6 tomadas), depois 4x/dia.';

const floral = (essencia, objetivo, posologia = POSOLOGIA_PADRAO) => ({
  essencia,
  objetivo,
  posologia,
});

const FLORAL_THEMES = {
  neuroemocional: [
    floral('Impatiens', 'Reduz tensão interna, impaciência e hiperreatividade.'),
    floral('White Chestnut', 'Auxilia no controle de pensamentos repetitivos e ruminação.'),
    floral('Rock Rose', 'Suporte em medo intenso, pânico e crises agudas.', POSOLOGIA_AGUDA),
    floral('Rescue Remedy', 'Estabilização emocional rápida em períodos de crise.', POSOLOGIA_AGUDA),
  ],
  vitalidade: [
    floral('Olive', 'Apoio em exaustão física e mental persistente.'),
    floral('Hornbeam', 'Favorece motivação e energia para iniciar atividades.'),
    floral('Wild Rose', 'Auxilia em apatia e desânimo prolongado.'),
    floral('Elm', 'Suporte para sensação de sobrecarga e esgotamento.'),
  ],
  digestivoInflamatorio: [
    floral('Agrimony', 'Auxilia tensão emocional que repercute no trato digestivo.'),
    floral('Beech', 'Suporte em reatividade/intolerância e irritabilidade corporal.'),
    floral('Crab Apple', 'Apoio para limpeza e reorganização do terreno biológico.'),
    floral('Elm', 'Auxilia em sobrecarga psicofisiológica crônica.'),
  ],
  cardiometabolico: [
    floral('Olive', 'Suporte energético em sobrecarga metabólica e cardiovascular.'),
    floral('Walnut', 'Auxilia adaptação a mudanças intensas de estilo de vida.'),
    floral('Cherry Plum', 'Apoio para controle de impulsos e compulsões.'),
    floral('Crab Apple', 'Suporte em processos de depuração e autocuidado.'),
  ],
  imunoinflamatorio: [
    floral('Willow', 'Suporte para irritabilidade e rigidez emocional em dor crônica.'),
    floral('Crab Apple', 'Apoio para depuração e autoconsciência corporal.'),
    floral('Olive', 'Auxilia na recuperação de fadiga inflamatória persistente.'),
    floral('Walnut', 'Favorece estabilidade durante processos crônicos flutuantes.'),
  ],
  neurodegenerativo: [
    floral('Clematis', 'Auxilia foco, presença mental e clareza cognitiva.'),
    floral('Walnut', 'Suporte de adaptação em mudanças neurológicas progressivas.'),
    floral('Olive', 'Apoio energético global para sobrecarga neurofuncional.'),
    floral('White Chestnut', 'Ajuda a reduzir agitação mental recorrente.'),
  ],
  hormonal: [
    floral('Walnut', 'Apoio em transições hormonais e sensibilidade a ciclos.'),
    floral('Scleranthus', 'Suporte para instabilidade cíclica e oscilação interna.'),
    floral('Crab Apple', 'Auxilia no autocuidado corporal em alterações hormonais.'),
    floral('Elm', 'Reduz sensação de sobrecarga em sintomas recorrentes.'),
  ],
  respiratorioAlergico: [
    floral('Walnut', 'Auxilia proteção a gatilhos ambientais e adaptação.'),
    floral('Aspen', 'Suporte para medo difuso e ansiedade respiratória.'),
    floral('Crab Apple', 'Apoio em terreno reativo e hipersensibilidade.'),
    floral('Olive', 'Suporte em cansaço associado a limitação respiratória.'),
  ],
  oncologicoSuporte: [
    floral('Star of Bethlehem', 'Apoio ao processamento emocional de choques e traumas.'),
    floral('Gorse', 'Suporte em desesperança e fadiga emocional.'),
    floral('Walnut', 'Auxilia adaptação às etapas terapêuticas e mudanças.'),
    floral('Rescue Remedy', 'Estabilização emocional em períodos de maior estresse.', POSOLOGIA_AGUDA),
  ],
  geral: [
    floral('Rescue Remedy', 'Suporte emocional geral e regulação em momentos críticos.', POSOLOGIA_AGUDA),
    floral('Walnut', 'Apoio para adaptação e proteção energética em transições.'),
    floral('Olive', 'Suporte em fadiga física e mental associada ao tratamento.'),
    floral('Crab Apple', 'Apoio em depuração e autocuidado global.'),
  ],
};

const CONDITION_THEME_MAP = {
  'Dores de cabeça': 'neuroemocional',
  'Enxaqueca': 'neuroemocional',
  'Cansaço/Fadiga': 'vitalidade',
  'Ansiedade': 'neuroemocional',
  'Insônia': 'neuroemocional',
  'Gastrite': 'digestivoInflamatorio',
  'Pressão alta': 'cardiometabolico',
  'Diabetes tipo 1': 'cardiometabolico',
  'Diabetes tipo 2': 'cardiometabolico',
  'Diabetes': 'cardiometabolico',
  'Obesidade': 'cardiometabolico',
  'Colesterol alto': 'cardiometabolico',
  'Osteoporose': 'imunoinflamatorio',
  'Infarto': 'cardiometabolico',
  'AVC': 'cardiometabolico',
  'Câncer': 'oncologicoSuporte',
  'Alzheimer': 'neurodegenerativo',
  'Parkinson': 'neurodegenerativo',
  'Artrite': 'imunoinflamatorio',
  'Problemas de tireoide': 'hormonal',
  'Alergias': 'respiratorioAlergico',
  'DPOC': 'respiratorioAlergico',
  'Artrite reumatoide': 'imunoinflamatorio',
  'Lúpus': 'imunoinflamatorio',
  'Psoríase': 'imunoinflamatorio',
  'Doença de Crohn': 'digestivoInflamatorio',
  'Colite ulcerativa': 'digestivoInflamatorio',
  'Endometriose': 'hormonal',
  'SOP': 'hormonal',
};

export { FLORAL_THEMES };

export const FLORAIS_FONTE_APOSTILAS =
  'Apostilas internas: PROMPT+BUQ+FLORAL.pdf; uso-de-floral-frequencial-na-sindrome-do-panico-mioma-e-polipo-endometrial.pdf; analise-do-biocampo-aura-com-o-uso-do-harmonizador-floral.pdf.';

export function getFloraisPorCondicao(condicao) {
  const theme = CONDITION_THEME_MAP[condicao] || 'geral';
  const florais = FLORAL_THEMES[theme] || FLORAL_THEMES.geral;
  return florais.map((item) => ({ ...item }));
}
