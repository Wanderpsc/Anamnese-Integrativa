import { searchTherapeuticContent } from './therapeuticDataLoader';

// Reusable logic for generating suggestions from an entry and optional index data
export function generateSuggestions(entry, indexDataOrNull = null, mapping = null) {
  if (!entry) return ['Nenhuma sugestão disponível — registro não encontrado.'];

  let suggestions = [];

  // Simple rule-based suggestions based on symptoms
  const phys = entry.sintomas || [];
  const emo = entry.sintomasEmoc || [];

  if (phys.includes('azia') || phys.includes('digestao_lenta')) {
    suggestions.push('Avaliação nutricional para identificar alimentos desencadeantes e orientar ajustes alimentares.');
  }

  if (phys.includes('intestino_preso') || phys.includes('diarreia')) {
    suggestions.push('Investigação de saúde intestinal (fibra, hidratação, avaliação de intolerâncias).');
  }

  if (phys.includes('diabetes_prediabetes') || phys.includes('hipoglicemia')) {
    suggestions.push('Avaliação metabólica e acompanhamento com profissional de saúde (endocrinologista) e ajuste de dieta.');
  }

  if (phys.includes('dores_musculares_articulares') || phys.includes('cãibras')) {
    suggestions.push('Avaliar níveis de magnésio/eletrólitos e plano de exercícios de alongamento e fortalecimento.');
  }

  if (emo.includes('ansiedade') || emo.includes('insonia')) {
    suggestions.push('Técnicas de relaxamento, treino de respiração, terapia cognitivo-comportamental e práticas de higiene do sono.');
  }

  if (emo.includes('depressao') || emo.includes('sindrome_panico')) {
    suggestions.push('Avaliação psicológica/psiquiátrica para definir abordagem terapêutica adequada e apoiar com intervenções específicas.');
  }

  const rawText = JSON.stringify(entry || {}).toLowerCase();
  const hasAny = (terms) => terms.some((term) => rawText.includes(term));

  const addDetoxAndFoodPlan = (contextTitle) => {
    suggestions.push(`${contextTitle}: iniciar protocolo de detoxificação gradual (hepático-intestinal-linfático), com hidratação fracionada e monitorização clínica.`);
    suggestions.push(`${contextTitle}: incluir plano alimentar anti-inflamatório e individualizado, com retirada de ultraprocessados/açúcar refinado e ajuste de fibras, proteínas e gorduras de qualidade.`);
  };

  const appendTherapeuticDataEvidence = (terms, label) => {
    const seen = new Set();
    terms.forEach((term) => {
      const matches = searchTherapeuticContent(term).slice(0, 2);
      matches.forEach((file) => {
        if (seen.has(file.fileName)) return;
        seen.add(file.fileName);
        suggestions.push(`Base terapêutica interna (${label}): referência encontrada em ${file.fileName}.`);
      });
    });
  };

  if (hasAny(['diabetes', 'pré-diabetes', 'prediabetes', 'resistência insulínica', 'resistencia insulinica', 'glicose', 'hba1c', 'hemoglobina glicada'])) {
    addDetoxAndFoodPlan('Condição metabólica (diabetes/resistência insulínica)');
    suggestions.push('Condição metabólica: plano alimentar com baixo impacto glicêmico, distribuição de carboidratos por refeição e prioridade para vegetais, leguminosas e proteínas magras.');
    appendTherapeuticDataEvidence(['diabetes', 'glicose', 'plano alimentar'], 'diabetes');
  }

  if (hasAny(['autoimune', 'autoimunes', 'artrite reumatoide', 'lúpus', 'lupus', 'hashimoto', 'crohn', 'retocolite', 'psoríase', 'psoriase'])) {
    addDetoxAndFoodPlan('Doença autoimune');
    suggestions.push('Doença autoimune: considerar protocolo alimentar anti-inflamatório com rastreio de sensibilidades alimentares e suporte de microbiota intestinal.');
    appendTherapeuticDataEvidence(['autoimune', 'imunidade', 'inflamação'], 'autoimunes');
  }

  if (hasAny(['câncer', 'cancer', 'oncologia', 'tumor', 'neoplasia', 'quimioterapia', 'radioterapia'])) {
    addDetoxAndFoodPlan('Contexto oncológico');
    suggestions.push('Contexto oncológico: suporte nutricional individualizado para preservar massa magra, modular inflamação e melhorar tolerância terapêutica, sempre com equipe assistente.');
    appendTherapeuticDataEvidence(['cancer', 'câncer', 'oncologia'], 'oncologia');
  }

  if (hasAny(['detox', 'desintoxicação', 'desintoxicacao', 'sobrecarga tóxica', 'sobrecarga toxica', 'fígado', 'figado'])) {
    addDetoxAndFoodPlan('Sobrecarga tóxica/detoxificação');
    appendTherapeuticDataEvidence(['detox', 'desintoxicação', 'fígado'], 'detox');
  }

  if (suggestions.length === 0) {
    suggestions.push('Plano inicial: avaliação global integrativa, revisão de exames e acompanhamento de estilo de vida.');
  }

  // If an index (sheet) is available, extract any suggestion/treatment text from rows that match symptoms
  const indexData = indexDataOrNull || null;
  const map = mapping || null;

  if (indexData && Array.isArray(indexData)) {
    const gathered = new Set();
    phys.forEach((s) => {
      const sLower = String(s).toLowerCase();
      indexDataOrNull.forEach((row) => {
        const cells = Object.values(row).map((c) => String(c || '').toLowerCase());
        if (cells.some((c) => c.includes(sLower))) {
          if (map && Array.isArray(map.suggestionColumns) && map.suggestionColumns.length) {
            // use mapped suggestion columns
            map.suggestionColumns.forEach((col) => {
              if (row[col]) gathered.add(String(row[col]).trim());
            });
          } else {
            Object.entries(row).forEach(([col, val]) => {
              if (!val) return;
              const colLower = col.toLowerCase();
              if (/sugest|suggest|trat|treatment|interven|protocolo|plano/i.test(colLower)) {
                gathered.add(String(val).trim());
              }
            });
          }
        }
      });
    });

    if (gathered.size) {
      suggestions = [...Array.from(gathered), ...suggestions];
    }
  }

  // add a general suggestion about consent and follow up
  suggestions.push('Registrar um plano de acompanhamento e reavaliação a cada 4–8 semanas; mantenha comunicação ativa com o terapeuta.');

  return [...new Set(suggestions)];
}

const suggestionsExport = { generateSuggestions };
export default suggestionsExport;
