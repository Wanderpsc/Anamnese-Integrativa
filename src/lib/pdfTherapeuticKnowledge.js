import pdfKnowledgeRaw from '../data/therapeuticPdfKnowledgeIndex.json';

const EMPTY_INDEX = {
  generatedAt: null,
  totalIndexedPdfs: 0,
  items: []
};

const KNOWLEDGE_INDEX = pdfKnowledgeRaw && Array.isArray(pdfKnowledgeRaw.items)
  ? pdfKnowledgeRaw
  : EMPTY_INDEX;

function normalize(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function scoreItem(item, terms = []) {
  const haystack = normalize(`${item.fileName} ${item.excerpt} ${(item.tags || []).join(' ')}`);
  return terms.reduce((acc, term) => {
    if (!term) return acc;
    const normalizedTerm = normalize(term);
    return haystack.includes(normalizedTerm) ? acc + 1 : acc;
  }, 0);
}

export function getTherapeuticKnowledgeMeta() {
  return {
    generatedAt: KNOWLEDGE_INDEX.generatedAt,
    totalIndexedPdfs: KNOWLEDGE_INDEX.totalIndexedPdfs || 0
  };
}

export function searchTherapeuticPdfEvidence(terms = [], limit = 10) {
  if (!Array.isArray(terms) || terms.length === 0) return [];

  const ranked = (KNOWLEDGE_INDEX.items || [])
    .map((item) => ({
      ...item,
      matchScore: scoreItem(item, terms)
    }))
    .filter((item) => item.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore || b.relevanceScore - a.relevanceScore);

  return ranked.slice(0, Math.max(1, limit));
}

export function getIridologyPdfEvidence(limit = 12) {
  const terms = [
    'iridologia',
    'iris',
    'rayid',
    'lindomar',
    'felipe',
    'gerson',
    'maria rocha',
    'luciana caxito',
    'lair ribeiro',
    'floral',
    'biorressonancia'
  ];
  return searchTherapeuticPdfEvidence(terms, limit);
}

export function buildEvidenceSafetyNotice() {
  return [
    'Uso profissional: apoio à decisão clínica integrativa baseada no acervo documental.',
    'Validar contraindicações, interações medicamentosas e contexto individual antes de qualquer conduta.',
    'Encaminhar para avaliação médica imediata em sinais de alarme ou agravamento clínico.'
  ];
}
