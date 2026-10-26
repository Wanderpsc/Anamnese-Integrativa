// Função para calcular quintil e gerar interpretação automática
export const calcularInterpretacaoQuintil = (valor, valoresReferencia, exame) => {
  if (!valor || !valoresReferencia) return { quintil: null, interpretacao: "" };
  
  const valorNum = parseFloat(valor);
  if (isNaN(valorNum)) return { quintil: null, interpretacao: "" };
  
  // Extrair valores mínimo e máximo da referência
  const regex = /(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/;
  const match = valoresReferencia.match(regex);
  
  if (!match) return { quintil: null, interpretacao: "" };
  
  const min = parseFloat(match[1]);
  const max = parseFloat(match[2]);
  const range = max - min;
  
  // Definir quintis
  const q1 = min + range * 0.2;  // 20%
  const q2 = min + range * 0.4;  // 40%
  const q3 = min + range * 0.6;  // 60%
  const q4 = min + range * 0.8;  // 80%
  
  let quintil;
  let interpretacao = "";
  
  if (valorNum < min) {
    quintil = 0; // Abaixo do normal
    interpretacao = `⚠️ ABAIXO DO NORMAL\\n\\n`;
    
    if (exame.causasSuspeitas?.baixo) {
      interpretacao += `🔍 **Possíveis Causas:**\\n${exame.causasSuspeitas.baixo}\\n\\n`;
    }
    
    if (exame.consequencias?.baixo) {
      interpretacao += `⚡ **Consequências:**\\n${exame.consequencias.baixo}\\n\\n`;
    }
    
    if (exame.tratamentos?.baixo) {
      interpretacao += `💊 **Tratamento Integrativo:**\\n${exame.tratamentos.baixo}`;
    }
    
  } else if (valorNum > max) {
    quintil = 6; // Acima do normal
    interpretacao = `⚠️ ACIMA DO NORMAL\\n\\n`;
    
    if (exame.causasSuspeitas?.alto) {
      interpretacao += `🔍 **Possíveis Causas:**\\n${exame.causasSuspeitas.alto}\\n\\n`;
    }
    
    if (exame.consequencias?.alto) {
      interpretacao += `⚡ **Consequências:**\\n${exame.consequencias.alto}\\n\\n`;
    }
    
    if (exame.tratamentos?.alto) {
      interpretacao += `💊 **Tratamento Integrativo:**\\n${exame.tratamentos.alto}`;
    }
    
  } else if (valorNum < q1) {
    quintil = 1;
    interpretacao = `📊 Quintil 1 - Limite inferior da normalidade\\n\\n⚠️ Atenção: Valor no limite inferior. Recomenda-se acompanhamento e prevenção.`;
  } else if (valorNum < q2) {
    quintil = 2;
    interpretacao = `📊 Quintil 2 - Abaixo do ideal\\n\\n💡 Sugestão: Otimizar com alimentação e suplementação preventiva.`;
  } else if (valorNum < q3) {
    quintil = 3;
    interpretacao = `✅ Quintil 3 - IDEAL\\n\\n🎯 Perfeito! Manter hábitos saudáveis atuais.`;
  } else if (valorNum < q4) {
    quintil = 4;
    interpretacao = `📊 Quintil 4 - Acima do ideal\\n\\n💡 Sugestão: Monitorar para evitar elevação excessiva.`;
  } else {
    quintil = 5;
    interpretacao = `📊 Quintil 5 - Limite superior da normalidade\\n\\n⚠️ Atenção: Valor no limite superior. Investigar causas.`;
  }
  
  return { quintil, interpretacao };
};

// Função para enviar resultados para outras páginas
export const enviarParaTherapySuggestions = async (exames, pacienteNome) => {
  try {
    const examData = exames.filter(e => e.resultadoPaciente).map(e => ({
      exame: e.exame,
      resultado: e.resultadoPaciente,
      unidade: e.unidadeSelecionada,
      interpretacao: e.interpretacao,
      conduta: e.conduta,
      quintil: e.quintil
    }));
    
    const dataToSend = {
      paciente: pacienteNome,
      data: new Date().toISOString(),
      exames: examData
    };
    
    // Salvar no localStorage para ser acessado pela outra página
    localStorage.setItem('therapy-suggestions-data', JSON.stringify(dataToSend));
    localStorage.setItem('prescription-data', JSON.stringify(dataToSend));
    
    console.log('✅ Dados enviados para therapy-suggestions e prescription');
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao enviar dados:', error);
    return false;
  }
};

// Template de informações expandidas para exames
export const EXAMES_INFO_EXPANDIDA = {
  "Hemácias (Eritrócitos)": {
    objetivo: "Avaliar capacidade de transporte de oxigênio e detectar anemias ou policitemia.",
    causasSuspeitas: {
      baixo: "Anemia ferropriva, anemia megaloblástica (B12/folato), sangramento agudo/crônico, hemólise, doença renal crônica, hipotireoidismo, desnutrição.",
      alto: "Policitemia vera, desidratação, tabagismo crônico, altitude elevada, doenças pulmonares crônicas (DPOC), apneia do sono."
    },
    consequencias: {
      baixo: "Fadiga intensa, palidez, taquicardia, dispneia aos esforços, tontura, dificuldade de concentração, unhas quebradiças, queda de cabelo.",
      alto: "Aumento da viscosidade sanguínea, risco de trombose (AVC, IAM), cefaleia, tontura, prurido após banho quente, face avermelhada."
    },
    tratamentos: {
      baixo: `🔸 Suplementação: Ferro quelado 30-60mg/dia + Vitamina C 500mg (aumenta absorção) + Vitamina B12 1000mcg sublingual + Ácido fólico 400-800mcg
🔸 Fitoterápicos: Urtica dioica (urtiga) chá 3x/dia, Taraxacum officinale (dente-de-leão), Spirulina 3-5g/dia
🔸 Alimentação: Carnes vermelhas, fígado, beterraba, vegetais verde-escuros, feijão, lentilha, melado de cana
🔸 Florais: Olive (esgotamento), Hornbeam (fadiga mental)
🔸 Naturopatia: Geoterapia (argila verde), hidroterapia alternada`,
      alto: `🔸 Hidratação: 2-3L água/dia
🔸 Fitoterápicos: Ginkgo biloba (melhora circulação), Alho (anticoagulante natural)
🔸 Sangria terapêutica (sob orientação médica em policitemia vera)
🔸 Evitar: Tabagismo, altitude elevada, suplementação de ferro
🔸 Florais: Vervain (hiperatividade), Impatiens (impaciência)`
    }
  },
  
  "Hemoglobina": {
    objetivo: "Medir a concentração de proteína transportadora de oxigênio no sangue.",
    causasSuspeitas: {
      baixo: "Anemia ferropriva (principal), anemia por doença crônica, talassemia, sangramento gastrointestinal, menstruação abundante, deficiência B12/folato.",
      alto: "Desidratação, policitemia vera, tabagismo, doenças pulmonares, apneia do sono, altitude."
    },
    consequencias: {
      baixo: "Cansaço extremo, palidez cutânea e mucosas, palpitações, falta de ar, dor torácica aos esforços, síndrome das pernas inquietas.",
      alto: "Sangue espesso, trombose, hipertensão arterial, face rubra, prurido, sangramento nasal."
    },
    tratamentos: {
      baixo: `🔸 Suplementação: Ferro bisglicinato 40-80mg/dia em jejum + Vitamina C
🔸 Fitoterápicos: Chlorella, Spirulina, Alfafa (Medicago sativa)
🔸 Alimentação: Carne vermelha 3-4x/semana, fígado, moela, coração de galinha
🔸 Florais: Olive (fadiga), Centaury (falta de energia vital)
🔸 Naturopatia: Sucos verdes com couve, salsa e limão`,
      alto: `🔸 Hidratação intensa
🔸 Fitoterápicos: Ginko biloba, Castanha-da-índia (Aesculus hippocastanum)
🔸 Sangria se indicação médica
🔸 Florais: Cherry Plum (controle), Vine (relaxamento)`
    }
  },
  
  "Glicemia em Jejum": {
    objetivo: "Diagnosticar diabetes mellitus e pré-diabetes, avaliar controle glicêmico.",
    causasSuspeitas: {
      baixo: "Jejum prolongado, excesso de insulina exógena, insulinoma (tumor pancreático), insuficiência adrenal, hipotireoidismo grave.",
      alto: "Diabetes mellitus tipo 1 ou 2, pré-diabetes, resistência insulínica, síndrome metabólica, estresse agudo, uso de corticoides, pancreatite."
    },
    consequencias: {
      baixo: "Tremores, sudorese fria, palpitações, confusão mental, visão turva, convulsões, coma (se <50 mg/dL).",
      alto: "Poliúria, polidipsia, polifagia, perda de peso, fadiga, visão turva, cicatrização lenta, infecções recorrentes, neuropatia, retinopatia, nefropatia."
    },
    tratamentos: {
      baixo: `🔸 Alimentação: Refeições regulares a cada 3h, carboidratos complexos
🔸 Suplementação: Cromo picolinato 200mcg, Magnésio
🔸 Fitoterápicos: Ginseng (Panax ginseng), Alcaçuz (Glycyrrhiza glabra)
🔸 Florais: Scleranthus (estabilização), Clematis (consciência)`,
      alto: `🔸 Dieta: Low carb/cetogênica, eliminar açúcares e farinhas brancas
🔸 Suplementação: Berberina 500mg 3x/dia, Cromo 200-400mcg, Canela 1-3g/dia, Ácido alfa-lipoico 600mg
🔸 Fitoterápicos: Pata de vaca (Bauhinia forficata), Jambolão (Syzygium cumini), Gymnema sylvestre
🔸 Alimentação: Vegetais baixo IG, proteínas magras, gorduras boas (abacate, azeite, oleaginosas)
🔸 Florais: Cherry Plum (autocontrole), Crab Apple (limpeza)
🔸 Naturopatia: Jejum intermitente 16/8, exercícios aeróbicos 150min/semana`
    }
  },
  
  "Vitamina D (25-OH)": {
    objetivo: "Avaliar reservas de vitamina D, essencial para saúde óssea, imunidade e prevenção de doenças autoimunes.",
    causasSuspeitas: {
      baixo: "Baixa exposição solar, uso excessivo de protetor solar, pele escura, obesidade, má absorção intestinal, insuficiência renal/hepática.",
      alto: "Suplementação excessiva (>10.000 UI/dia por meses), hipercalcemia, sarcoidose."
    },
    consequencias: {
      baixo: "Osteoporose, fraturas, dor óssea/muscular, fraqueza muscular, quedas em idosos, infecções recorrentes, depressão, doenças autoimunes.",
      alto: "Hipercalcemia, náuseas, vômitos, fraqueza, confusão mental, arritmias, nefrocalcinose."
    },
    tratamentos: {
      baixo: `🔸 Suplementação: Vitamina D3 (colecalciferol) 5.000-10.000 UI/dia por 2-3 meses, depois manutenção 2.000-4.000 UI/dia
🔸 Exposição solar: 15-30min/dia (braços e pernas) entre 10h-15h sem protetor
🔸 Alimentação: Salmão, sardinha, atum, gema de ovo, cogumelos expostos ao sol
🔸 Cofatores: Magnésio 400mg, Vitamina K2 100-200mcg, Cálcio alimentar
🔸 Florais: Mustard (depressão), Gorse (falta de esperança)
🔸 Naturopatia: Helioterapia (banhos de sol), alimentação rica em ômega-3`,
      alto: `🔸 Suspender suplementação imediatamente
🔸 Hidratação abundante
🔸 Evitar exposição solar excessiva
🔸 Monitorar cálcio sérico
🔸 Florais: Cherry Plum (excesso)`
    }
  },
  
  "TSH": {
    objetivo: "Avaliar função tireoidiana, diagnosticar hipo ou hipertireoidismo.",
    causasSuspeitas: {
      baixo: "Hipertireoidismo (Graves, adenoma tóxico, tireoidite), uso excessivo de levotiroxina.",
      alto: "Hipotireoidismo primário (Hashimoto, deficiência iodo), hipotireoidismo subclínico, resistência ao hormônio tireoidiano."
    },
    consequencias: {
      baixo: "Taquicardia, perda de peso, ansiedade, tremores, sudorese, insônia, irritabilidade, exoftalmia (olhos saltados).",
      alto: "Ganho de peso, fadiga extrema, intolerância ao frio, constipação, pele seca, queda de cabelo, depressão, bradicardia, edema."
    },
    tratamentos: {
      baixo: `🔸 Fitoterápicos: Melissa (Melissa officinalis), Valeriana (Valeriana officinalis)
🔸 Alimentação: Evitar iodo excessivo, crucíferas moderadamente
🔸 Florais: Impatiens (agitação), Vervain (hiperatividade)
🔸 Naturopatia: Relaxamento, yoga, meditação`,
      alto: `🔸 Suplementação: Selênio 200mcg, Zinco 30mg, Iodo (se deficiência) 150-300mcg, Vitamina D
🔸 Fitoterápicos: Fucus vesiculosus (alga), Coleus forskohlii, Ashwagandha
🔸 Alimentação: Algas marinhas (nori, wakame), castanha-do-pará (selênio), peixes
🔸 Evitar: Glúten (Hashimoto), soja não fermentada, crucíferas cruas
🔸 Florais: Hornbeam (fadiga), Wild Rose (apatia), Olive (esgotamento)
🔸 Naturopatia: Compressas de argila no pescoço, banhos quentes`
    }
  },
  
  "Ferritina": {
    objetivo: "Avaliar reservas de ferro no organismo, diagnosticar deficiência ou sobrecarga.",
    causasSuspeitas: {
      baixo: "Deficiência de ferro (anemia ferropriva), sangramento crônico, menstruação abundante, vegetarianismo, má absorção.",
      alto: "Hemocromatose, inflamação crônica, síndrome metabólica, esteatose hepática, alcoolismo, uso crônico de ferro."
    },
    consequencias: {
      baixo: "Anemia, fadiga, queda de cabelo, unhas quebradiças, síndrome das pernas inquietas, pica (vontade de comer gelo/terra).",
      alto: "Sobrecarga de ferro, cirrose hepática, diabetes, artropatia, cardiomiopatia, pigmentação cutânea."
    },
    tratamentos: {
      baixo: `🔸 Suplementação: Ferro quelado/bisglicinato 40-80mg/dia + Vitamina C 500mg
🔸 Alimentação: Carnes vermelhas, fígado, mariscos, feijão, lentilha
🔸 Fitoterápicos: Urtica dioica (urtiga), Alfafa
🔸 Evitar: Café/chá 1h antes e depois das refeições (inibem absorção)
🔸 Florais: Olive (fadiga), Clematis (vitalidade)`,
      alto: `🔸 Evitar: Suplementos de ferro, vitamina C em altas doses, álcool
🔸 Quelantes: Se hemocromatose - desferroxamina (médico)
🔸 Sangria terapêutica (se indicado)
🔸 Fitoterápicos: Cardo mariano (silimarina) para proteção hepática
🔸 Florais: Crab Apple (limpeza/desintoxicação)`
    }
  }
};
