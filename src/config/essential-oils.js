/**
 * Base de Dados - Óleos Essenciais
 * Protocolos terapêuticos com óleos essenciais puros
 */

const ESSENTIAL_OILS_DATABASE = {
  // Sistema Nervoso e Mental
  'Ansiedade': {
    title: 'Ansiedade e Nervosismo',
    oils: [
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Calmante, ansiolítico, relaxante muscular',
        indications: 'Ansiedade generalizada, nervosismo, agitação, insônia por ansiedade',
        usage: 'Difusor: 5-8 gotas | Topical: 2-3 gotas diluídas em óleo vegetal na nuca e pulsos',
        dosage: '3x ao dia ou conforme necessário',
        duration: 'Uso contínuo ou SOS',
        contraindications: 'Gravidez primeiro trimestre',
        synergy: ['Bergamota', 'Ylang-ylang', 'Camomila Romana']
      },
      {
        name: 'Bergamota (Citrus bergamia)',
        properties: 'Ansiolítico, antidepressivo, regulador do humor',
        indications: 'Ansiedade, stress, depressão leve, tensão nervosa',
        usage: 'Difusor: 4-6 gotas | Inalação: 2 gotas em lenço',
        dosage: '2-3x ao dia',
        duration: 'Uso contínuo',
        contraindications: 'Fotossensível - evitar exposição solar após aplicação tópica',
        synergy: ['Lavanda', 'Cedro', 'Vetiver']
      },
      {
        name: 'Vetiver (Vetiveria zizanioides)',
        properties: 'Calmante profundo, estabilizador emocional, enraizador',
        indications: 'Ansiedade severa, ataques de pânico, TEPT, hiperatividade mental',
        usage: 'Difusor: 3-5 gotas | Topical: 1-2 gotas diluídas nos pés antes de dormir',
        dosage: 'À noite ou 2x ao dia',
        duration: '4-8 semanas',
        contraindications: 'Nenhuma conhecida',
        synergy: ['Lavanda', 'Sândalo', 'Incenso']
      }
    ]
  },

  'Depressão': {
    title: 'Depressão e Baixa Energia',
    oils: [
      {
        name: 'Bergamota (Citrus bergamia)',
        properties: 'Antidepressivo, estimulante, elevador do humor',
        indications: 'Depressão leve a moderada, tristeza, melancolia',
        usage: 'Difusor: 5-7 gotas | Inalação direta 3-4x ao dia',
        dosage: 'Manhã e tarde',
        duration: 'Uso contínuo por 6-12 semanas',
        contraindications: 'Fotossensível',
        synergy: ['Laranja Doce', 'Ylang-ylang', 'Jasmim']
      },
      {
        name: 'Gerânio (Pelargonium graveolens)',
        properties: 'Regulador hormonal, antidepressivo, equilibrante',
        indications: 'Depressão hormonal, TPM, menopausa, flutuações de humor',
        usage: 'Difusor: 4-6 gotas | Massagem: 3 gotas em 10ml óleo vegetal no abdômen',
        dosage: '2x ao dia',
        duration: '3-6 meses',
        contraindications: 'Gravidez',
        synergy: ['Sálvia Esclareia', 'Lavanda', 'Rosa']
      },
      {
        name: 'Laranja Doce (Citrus sinensis)',
        properties: 'Antidepressivo, energizante, otimizante',
        indications: 'Depressão leve, falta de motivação, apatia',
        usage: 'Difusor: 6-10 gotas | Spray ambiente: 20 gotas em 100ml água',
        dosage: 'Manhã e início da tarde',
        duration: 'Uso contínuo',
        contraindications: 'Fotossensível (levemente)',
        synergy: ['Bergamota', 'Limão', 'Grapefruit']
      }
    ]
  },

  'Insônia': {
    title: 'Insônia e Distúrbios do Sono',
    oils: [
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Indutor do sono, calmante, relaxante muscular',
        indications: 'Insônia, dificuldade para dormir, sono agitado',
        usage: 'Difusor no quarto: 5-8 gotas 30min antes de dormir | Travesseiro: 2 gotas',
        dosage: 'Todas as noites',
        duration: 'Uso contínuo',
        contraindications: 'Nenhuma',
        synergy: ['Camomila Romana', 'Cedro', 'Mandarim']
      },
      {
        name: 'Camomila Romana (Chamaemelum nobile)',
        properties: 'Sedativo suave, calmante, antiespasmódico',
        indications: 'Insônia, ansiedade noturna, insônia infantil',
        usage: 'Difusor: 3-5 gotas | Banho: 4 gotas em óleo dispersante',
        dosage: 'À noite',
        duration: 'Uso contínuo',
        contraindications: 'Gravidez primeiro trimestre',
        synergy: ['Lavanda', 'Vetiver', 'Bergamota']
      },
      {
        name: 'Mandarim (Citrus reticulata)',
        properties: 'Calmante suave, indutor do sono, seguro para crianças',
        indications: 'Insônia leve, agitação noturna, insônia infantil',
        usage: 'Difusor: 5-8 gotas | Massagem nos pés: 2 gotas em óleo vegetal',
        dosage: 'À noite',
        duration: 'Uso contínuo',
        contraindications: 'Nenhuma',
        synergy: ['Lavanda', 'Cedro do Atlas', 'Neroli']
      }
    ]
  },

  // Sistema Respiratório
  'Gripe': {
    title: 'Gripe, Resfriado e Infecções Respiratórias',
    oils: [
      {
        name: 'Eucalipto Radiata (Eucalyptus radiata)',
        properties: 'Descongestionante, expectorante, antiviral, imunoestimulante',
        indications: 'Gripe, resfriado, sinusite, bronquite, tosse',
        usage: 'Difusor: 5-8 gotas | Inalação: 3 gotas em água quente 3x ao dia',
        dosage: '4-6x ao dia durante fase aguda',
        duration: '5-10 dias',
        contraindications: 'Crianças menores de 3 anos',
        synergy: ['Ravintsara', 'Tea Tree', 'Hortelã-Pimenta']
      },
      {
        name: 'Ravintsara (Cinnamomum camphora)',
        properties: 'Antiviral potente, imunoestimulante, expectorante',
        indications: 'Gripe, infecções virais, bronquite, fadiga imunológica',
        usage: 'Topical: 3 gotas puras no tórax 5x ao dia | Difusor: 6-8 gotas',
        dosage: 'A cada 3-4 horas na fase aguda',
        duration: '7-10 dias',
        contraindications: 'Gravidez, epilepsia',
        synergy: ['Eucalipto', 'Tea Tree', 'Niaouli']
      },
      {
        name: 'Tea Tree (Melaleuca alternifolia)',
        properties: 'Antibacteriano, antiviral, antifúngico, imunoestimulante',
        indications: 'Infecções respiratórias, sinusite, otite, gripe',
        usage: 'Difusor: 4-6 gotas | Inalação: 2-3 gotas 4x ao dia',
        dosage: '3-5x ao dia',
        duration: '7-14 dias',
        contraindications: 'Não ingerir',
        synergy: ['Eucalipto', 'Lavanda', 'Limão']
      }
    ]
  },

  'Tosse': {
    title: 'Tosse e Congestão',
    oils: [
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Antitussígeno, expectorante, descongestionante',
        indications: 'Tosse seca, tosse produtiva, congestão nasal',
        usage: 'Inalação: 2 gotas em água quente | Difusor: 3-5 gotas',
        dosage: '3-4x ao dia',
        duration: '5-7 dias',
        contraindications: 'Crianças menores de 6 anos, gravidez, epilepsia',
        synergy: ['Eucalipto', 'Cipreste', 'Incenso']
      },
      {
        name: 'Cipreste (Cupressus sempervirens)',
        properties: 'Antitussígeno, antiespasmódico, expectorante',
        indications: 'Tosse seca, tosse espasmódica, bronquite',
        usage: 'Topical: 3 gotas diluídas massagem no tórax | Difusor: 4-6 gotas',
        dosage: '3x ao dia',
        duration: '5-10 dias',
        contraindications: 'Nenhuma significativa',
        synergy: ['Eucalipto', 'Hortelã', 'Cedro']
      }
    ]
  },

  // Sistema Digestivo
  'Náusea': {
    title: 'Náusea e Enjoo',
    oils: [
      {
        name: 'Gengibre (Zingiber officinale)',
        properties: 'Antiemético, digestivo, estimulante circulatório',
        indications: 'Náusea, enjoo de movimento, vômito, indigestão',
        usage: 'Inalação direta: 1-2 gotas em lenço | Difusor: 3-4 gotas',
        dosage: 'Conforme necessário (SOS)',
        duration: 'Uso pontual ou contínuo conforme necessidade',
        contraindications: 'Nenhuma',
        synergy: ['Hortelã-Pimenta', 'Limão', 'Cardamomo']
      },
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Antiemético, antiespasmódico, analgésico digestivo',
        indications: 'Náusea, enjoo, vômito, síndrome do intestino irritável',
        usage: 'Inalação: 1-2 gotas | Topical: 1 gota diluída no abdômen',
        dosage: 'SOS ou 3x ao dia',
        duration: 'Conforme necessidade',
        contraindications: 'Gravidez, lactação, crianças pequenas',
        synergy: ['Gengibre', 'Limão', 'Cardamomo']
      }
    ]
  },

  'Indigestão': {
    title: 'Indigestão e Problemas Digestivos',
    oils: [
      {
        name: 'Manjericão Tropical (Ocimum basilicum)',
        properties: 'Antiespasmódico, digestivo, carminativo',
        indications: 'Indigestão, gases, cólicas, distensão abdominal',
        usage: 'Massagem abdominal: 2-3 gotas em 10ml óleo vegetal, circular horário',
        dosage: 'Após refeições ou SOS',
        duration: 'Conforme necessidade',
        contraindications: 'Gravidez',
        synergy: ['Hortelã-Pimenta', 'Funcho', 'Gengibre']
      },
      {
        name: 'Funcho Doce (Foeniculum vulgare)',
        properties: 'Carminativo, antiespasmódico, digestivo',
        indications: 'Gases, cólicas, indigestão, síndrome do intestino irritável',
        usage: 'Massagem: 3 gotas em óleo vegetal no abdômen | Inalação: 2 gotas',
        dosage: 'Após refeições',
        duration: 'Uso contínuo ou conforme necessidade',
        contraindications: 'Gravidez, epilepsia, crianças pequenas',
        synergy: ['Manjericão', 'Gengibre', 'Coentro']
      }
    ]
  },

  // Dor e Inflamação
  'Dor Muscular': {
    title: 'Dor Muscular e Contraturas',
    oils: [
      {
        name: 'Gaultéria (Gaultheria procumbens)',
        properties: 'Analgésico potente, anti-inflamatório, antiespasmódico',
        indications: 'Dor muscular, contraturas, tendinite, artrite',
        usage: 'Massagem: 3-4 gotas em 10ml óleo vegetal na área afetada',
        dosage: '2-4x ao dia',
        duration: '1-4 semanas',
        contraindications: 'Alergia a aspirina, gravidez, anticoagulantes',
        synergy: ['Eucalipto Citriodora', 'Lavanda', 'Alecrim']
      },
      {
        name: 'Eucalipto Citriodora (Eucalyptus citriodora)',
        properties: 'Anti-inflamatório potente, analgésico, antiespasmódico',
        indications: 'Dor muscular, artrite, reumatismo, tendinite',
        usage: 'Massagem: 3 gotas em óleo vegetal 3x ao dia',
        dosage: '3-4x ao dia',
        duration: '2-6 semanas',
        contraindications: 'Nenhuma significativa',
        synergy: ['Gaultéria', 'Katrafay', 'Immortelle']
      },
      {
        name: 'Alecrim Cânfora (Rosmarinus officinalis ct. camphor)',
        properties: 'Relaxante muscular, analgésico, circulatório',
        indications: 'Contraturas, câimbras, dor muscular, rigidez',
        usage: 'Massagem: 3 gotas em óleo vegetal antes/depois atividade física',
        dosage: '2-3x ao dia ou SOS',
        duration: 'Conforme necessidade',
        contraindications: 'Gravidez, epilepsia, hipertensão',
        synergy: ['Lavanda', 'Gaultéria', 'Zimbro']
      }
    ]
  },

  'Dor de Cabeça': {
    title: 'Cefaleia e Enxaqueca',
    oils: [
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Analgésico, vasoconstritor, refrescante',
        indications: 'Cefaleia tensional, enxaqueca, dor de cabeça por sinusite',
        usage: 'Topical: 1 gota pura nas têmporas (evitar olhos) | Inalação: 2 gotas',
        dosage: 'SOS, repetir após 15min se necessário',
        duration: 'Uso pontual',
        contraindications: 'Gravidez, crianças pequenas',
        synergy: ['Lavanda', 'Camomila Romana', 'Basileiro']
      },
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Analgésico, calmante, antiespasmódico',
        indications: 'Cefaleia tensional, enxaqueca, dor de cabeça por stress',
        usage: 'Topical: 2 gotas nas têmporas e nuca | Compressa fria na testa',
        dosage: 'SOS',
        duration: 'Uso pontual',
        contraindications: 'Nenhuma',
        synergy: ['Hortelã-Pimenta', 'Camomila', 'Manjerona']
      }
    ]
  },

  // Sistema Tegumentar
  'Acne': {
    title: 'Acne e Pele Oleosa',
    oils: [
      {
        name: 'Tea Tree (Melaleuca alternifolia)',
        properties: 'Antibacteriano, anti-inflamatório, cicatrizante',
        indications: 'Acne, espinhas, pele oleosa, infecção cutânea',
        usage: 'Topical: 1 gota pura em espinha | Loção: 2% em gel ou creme base',
        dosage: '2x ao dia (manhã e noite)',
        duration: '4-8 semanas',
        contraindications: 'Evitar áreas sensíveis',
        synergy: ['Lavanda', 'Palmarosa', 'Manuka']
      },
      {
        name: 'Palmarosa (Cymbopogon martinii)',
        properties: 'Antibacteriano, regulador de sebo, cicatrizante',
        indications: 'Acne, pele mista/oleosa, infecções fúngicas',
        usage: 'Loção facial: 1% em gel ou hidratante',
        dosage: '2x ao dia',
        duration: 'Uso contínuo',
        contraindications: 'Nenhuma',
        synergy: ['Tea Tree', 'Gerânio', 'Lavanda']
      }
    ]
  },

  'Eczema': {
    title: 'Eczema e Dermatite',
    oils: [
      {
        name: 'Camomila Alemã (Matricaria chamomilla)',
        properties: 'Anti-inflamatório potente, antipruriginoso, cicatrizante',
        indications: 'Eczema, dermatite, pele inflamada, coceira intensa',
        usage: 'Creme: 1-2% em base neutra | Compressa: 5 gotas em 200ml água morna',
        dosage: '2-3x ao dia',
        duration: '4-12 semanas',
        contraindications: 'Alergia a plantas da família Asteraceae',
        synergy: ['Lavanda', 'Gerânio', 'Helichrysum']
      },
      {
        name: 'Lavanda (Lavandula angustifolia)',
        properties: 'Anti-inflamatório, cicatrizante, antipruriginoso',
        indications: 'Eczema, dermatite, irritação cutânea',
        usage: 'Creme: 2% em base neutra | Puro: 1-2 gotas em lesões pequenas',
        dosage: '3-4x ao dia',
        duration: 'Uso contínuo',
        contraindications: 'Nenhuma',
        synergy: ['Camomila Alemã', 'Cedro do Atlas', 'Geranio']
      }
    ]
  },

  // Sistema Imunológico
  'Imunidade Baixa': {
    title: 'Baixa Imunidade',
    oils: [
      {
        name: 'Ravintsara (Cinnamomum camphora)',
        properties: 'Imunoestimulante potente, antiviral, antibacteriano',
        indications: 'Baixa imunidade, prevenção de infecções, fadiga crônica',
        usage: 'Topical: 2 gotas puras na planta dos pés 2x ao dia | Difusor: 6 gotas',
        dosage: '2x ao dia (manhã e noite)',
        duration: '3-6 meses (períodos sazonais)',
        contraindications: 'Gravidez, epilepsia',
        synergy: ['Tea Tree', 'Eucalipto', 'Niaouli']
      },
      {
        name: 'Tomilho ct. Linalol (Thymus vulgaris ct. linalool)',
        properties: 'Imunoestimulante, antibacteriano amplo espectro, antiviral',
        indications: 'Infecções recorrentes, baixa imunidade, fadiga',
        usage: 'Topical: 2-3 gotas diluídas no tórax 2x ao dia',
        dosage: '2x ao dia',
        duration: '2-3 meses',
        contraindications: 'Gravidez',
        synergy: ['Ravintsara', 'Orégano', 'Cravo']
      }
    ]
  },

  // Hormonal
  'TPM': {
    title: 'Tensão Pré-Menstrual e Cólicas',
    oils: [
      {
        name: 'Sálvia Esclareia (Salvia sclarea)',
        properties: 'Regulador hormonal, antiespasmódico, euforizante',
        indications: 'TPM, cólicas menstruais, desequilíbrio hormonal',
        usage: 'Massagem abdominal: 3 gotas em 10ml óleo vegetal | Difusor: 4-6 gotas',
        dosage: '2-3x ao dia durante sintomas',
        duration: 'Dias pré-menstruais até fim menstruação',
        contraindications: 'Gravidez, câncer hormônio-dependente',
        synergy: ['Gerânio', 'Lavanda', 'Camomila Romana']
      },
      {
        name: 'Gerânio (Pelargonium graveolens)',
        properties: 'Regulador hormonal, antiespasmódico, equilibrante emocional',
        indications: 'TPM, cólicas, alterações de humor, retenção hídrica',
        usage: 'Massagem: 3 gotas em óleo vegetal no baixo abdômen',
        dosage: '2x ao dia durante sintomas',
        duration: '5-10 dias por ciclo',
        contraindications: 'Gravidez',
        synergy: ['Sálvia Esclareia', 'Ylang-ylang', 'Rosa']
      }
    ]
  },

  // === NOVAS CONDIÇÕES EXPANDIDAS ===
  
  'Gastrite': {
    title: 'Gastrite e Problemas Estomacais',
    oils: [{
      name: 'Hortelã-Pimenta',
      properties: 'Antiespasmódico, digestivo, calmante estomacal',
      indications: 'Gastrite, azia, indigestão, náusea',
      usage: 'Massagem abdômen: 2-3% em óleo vegetal | Inalação: 1-2 gotas',
      dosage: 'Após refeições ou SOS',
      duration: 'Conforme necessário',
      contraindications: 'Não em crianças < 6 anos',
      synergy: ['Gengibre', 'Limão', 'Camomila']
    }]
  },
  
  'Constipação': {
    title: 'Constipação Intestinal',
    oils: [{
      name: 'Gengibre',
      properties: 'Estimulante digestivo, carminativo',
      indications: 'Intestino preso, digestão lenta',
      usage: 'Massagem abdômen circular (sentido horário): 3% diluído',
      dosage: '2-3x ao dia',
      duration: 'Até regularizar',
      contraindications: 'Pele sensível',
      synergy: ['Laranja Doce', 'Funcho', 'Hortelã']
    }]
  },
  
  'Dor de Cabeça': {
    title: 'Cefaleia e Dor de Cabeça',
    oils: [{
      name: 'Hortelã-Pimenta',
      properties: 'Analgésico, refrescante, vasoconstritor',
      indications: 'Cefaleia tensional, enxaqueca',
      usage: 'Têmporas e nuca: 1 gota diluída | Inalação: 2 gotas',
      dosage: 'SOS durante crise',
      duration: 'Até alívio',
      contraindications: 'Não próximo aos olhos',
      synergy: ['Lavanda', 'Eucalipto', 'Alecrim']
    }]
  },
  
  'Enxaqueca': {
    title: 'Enxaqueca e Migrânea',
    oils: [{
      name: 'Lavanda',
      properties: 'Analgésico, calmante, anti-enxaqueca',
      indications: 'Enxaqueca, migrânea, fotofobia',
      usage: 'Têmporas: 2 gotas diluídas | Compressa fria: 4 gotas',
      dosage: 'Durante crise e prevenção',
      duration: 'SOS ou diário',
      contraindications: 'Nenhuma',
      synergy: ['Hortelã', 'Camomila', 'Frankincense']
    }]
  },
  
  'Sinusite': {
    title: 'Sinusite e Congestão Nasal',
    oils: [{
      name: 'Eucalipto',
      properties: 'Descongestionante, expectorante, antibacteriano',
      indications: 'Sinusite, congestão nasal, pressão facial',
      usage: 'Inalação vapor: 3 gotas | Difusor: 5-7 gotas | Massagem seios da face: 2%',
      dosage: '3-4x ao dia',
      duration: '7-10 dias',
      contraindications: 'Não em crianças < 10 anos',
      synergy: ['Hortelã', 'Tea Tree', 'Alecrim']
    }]
  },
  
  'Bronquite': {
    title: 'Bronquite e Tosse',
    oils: [{
      name: 'Eucalipto',
      properties: 'Expectorante, antibacteriano, broncodilatador',
      indications: 'Bronquite, tosse produtiva, muco',
      usage: 'Inalação: 3-4 gotas | Massagem peito: 3% diluído',
      dosage: '3-4x ao dia',
      duration: '10-14 dias',
      contraindications: 'Asma severa (consultar antes)',
      synergy: ['Ravintsara', 'Hortelã', 'Alecrim']
    }]
  },
  
  'Dor Muscular': {
    title: 'Dores Musculares',
    oils: [{
      name: 'Alecrim',
      properties: 'Analgésico, anti-inflamatório, circulatório',
      indications: 'Dor muscular, fadiga muscular, rigidez',
      usage: 'Massagem: 3-5% em óleo vegetal | Banho: 8-10 gotas',
      dosage: 'Após exercício ou SOS',
      duration: 'Conforme necessário',
      contraindications: 'Epilepsia',
      synergy: ['Lavanda', 'Gengibre', 'Cipreste']
    }]
  },
  
  'Artrite': {
    title: 'Artrite e Dores Articulares',
    oils: [{
      name: 'Frankincense',
      properties: 'Anti-inflamatório potente, analgésico, regenerador',
      indications: 'Artrite, artrose, dores articulares',
      usage: 'Massagem articular: 3-5% diluído | Compressa: 4 gotas',
      dosage: '2-3x ao dia',
      duration: 'Uso prolongado',
      contraindications: 'Nenhuma',
      synergy: ['Gengibre', 'Alecrim', 'Cipreste']
    }]
  },
  
  'Tendinite': {
    title: 'Tendinite e Inflamação de Tendões',
    oils: [{
      name: 'Wintergreen',
      properties: 'Analgésico potente (salicilato de metila), anti-inflamatório',
      indications: 'Tendinite, bursite, lesões de tendões',
      usage: 'Massagem local: 1-2% diluído | Compressa: 2 gotas',
      dosage: '2-3x ao dia',
      duration: '2-4 semanas',
      contraindications: 'Gravidez, lactação, crianças, anticoagulantes',
      synergy: ['Alecrim', 'Gengibre', 'Lavanda']
    }]
  },
  
  'Varizes': {
    title: 'Varizes e Circulação',
    oils: [{
      name: 'Cipreste',
      properties: 'Vasoconstritor, circulatório, adstringente',
      indications: 'Varizes, má circulação, pernas pesadas',
      usage: 'Massagem pernas (baixo→cima): 2-3% | Banho pés: 6 gotas',
      dosage: '2x ao dia',
      duration: 'Uso contínuo',
      contraindications: 'Trombose ativa',
      synergy: ['Alecrim', 'Gengibre', 'Limão']
    }]
  },
  
  'Hipertensão': {
    title: 'Pressão Alta',
    oils: [{
      name: 'Ylang-Ylang',
      properties: 'Hipotensor, sedativo, equilibrante',
      indications: 'Hipertensão, palpitações, taquicardia',
      usage: 'Difusor: 4-6 gotas | Inalação: 2 gotas | Massagem: 2%',
      dosage: '2-3x ao dia',
      duration: 'Uso contínuo com monitoramento',
      contraindications: 'Hipotensão',
      synergy: ['Lavanda', 'Bergamota', 'Frankincense']
    }]
  },
  
  'Colesterol': {
    title: 'Colesterol Alto',
    oils: [{
      name: 'Limão',
      properties: 'Depurativo, estimulante hepático, hipolipemiante',
      indications: 'Colesterol alto, triglicerídeos, detox hepático',
      usage: 'Difusor: 6-8 gotas | Massagem abdômen: 2% diluído',
      dosage: '2x ao dia',
      duration: '3-6 meses com acompanhamento',
      contraindications: 'Fotossensível',
      synergy: ['Junípero', 'Alecrim', 'Grapefruit']
    }]
  },
  
  'Cistite': {
    title: 'Infecção Urinária e Cistite',
    oils: [{
      name: 'Tea Tree',
      properties: 'Antibacteriano potente, antisséptico urinário',
      indications: 'Cistite, infecção urinária, ardência ao urinar',
      usage: 'Massagem baixo abdômen: 2% | Banho assento: 6 gotas em dispersante',
      dosage: '3-4x ao dia',
      duration: '7-10 dias',
      contraindications: 'Gravidez (consultar)',
      synergy: ['Lavanda', 'Junípero', 'Sândalo']
    }]
  },
  
  'Acne': {
    title: 'Acne e Cravos',
    oils: [{
      name: 'Tea Tree',
      properties: 'Antibacteriano, antisséptico, cicatrizante',
      indications: 'Acne, cravos, pele oleosa, espinhas',
      usage: 'Aplicação direta: 1 gota em espinha | Tônico facial: 5 gotas em 100ml',
      dosage: '2x ao dia',
      duration: 'Até melhora',
      contraindications: 'Pode ressecar - hidratar',
      synergy: ['Lavanda', 'Frankincense', 'Gerânio']
    }]
  },
  
  'Eczema': {
    title: 'Eczema e Dermatite',
    oils: [{
      name: 'Lavanda',
      properties: 'Cicatrizante, anti-inflamatório, calmante',
      indications: 'Eczema, dermatite, pele inflamada, coceira',
      usage: 'Aplicação tópica: 2-5% em óleo vegetal | Banho: 8 gotas',
      dosage: '2-3x ao dia',
      duration: 'Uso prolongado',
      contraindications: 'Nenhuma',
      synergy: ['Camomila Alemã', 'Frankincense', 'Gerânio']
    }]
  },
  
  'Psoríase': {
    title: 'Psoríase',
    oils: [{
      name: 'Frankincense',
      properties: 'Anti-inflamatório, regenerador celular, cicatrizante',
      indications: 'Psoríase, placas escamosas, inflamação cutânea',
      usage: 'Aplicação local: 3-5% em óleo vegetal | Banho: 6 gotas',
      dosage: '2-3x ao dia',
      duration: 'Uso contínuo',
      contraindications: 'Nenhuma',
      synergy: ['Lavanda', 'Tea Tree', 'Gerânio']
    }]
  },
  
  'Cicatrização': {
    title: 'Cicatrização de Feridas',
    oils: [{
      name: 'Lavanda',
      properties: 'Cicatrizante, regenerador, antisséptico',
      indications: 'Feridas, cortes, queimaduras, cicatrizes',
      usage: 'Aplicação direta (pura) ou diluída 5% | Compressa: 3 gotas',
      dosage: '2-3x ao dia',
      duration: 'Até cicatrização',
      contraindications: 'Nenhuma',
      synergy: ['Tea Tree', 'Frankincense', 'Helichrysum']
    }]
  },
  
  'Menopausa': {
    title: 'Sintomas da Menopausa',
    oils: [{
      name: 'Sálvia Esclareia',
      properties: 'Regulador hormonal, estrogênico, euforizante',
      indications: 'Ondas de calor, suores noturnos, alterações humor',
      usage: 'Difusor: 5-7 gotas | Massagem: 3% diluído',
      dosage: '2-3x ao dia',
      duration: 'Uso contínuo durante período',
      contraindications: 'Câncer hormônio-dependente',
      synergy: ['Gerânio', 'Lavanda', 'Ylang-Ylang']
    }]
  },
  
  'Candidíase': {
    title: 'Candidíase e Infecções Fúngicas',
    oils: [{
      name: 'Tea Tree',
      properties: 'Antifúngico potente, antibacteriano',
      indications: 'Candidíase vaginal, fungo de unha, pé de atleta',
      usage: 'Banho assento: 8 gotas | Aplicação local: 2% diluído',
      dosage: '2x ao dia',
      duration: '10-14 dias',
      contraindications: 'Mucosas sensíveis - diluir bem',
      synergy: ['Lavanda', 'Orégano', 'Tomilho']
    }]
  },
  
  'Herpes': {
    title: 'Herpes Labial e Zoster',
    oils: [{
      name: 'Tea Tree',
      properties: 'Antiviral, cicatrizante, antisséptico',
      indications: 'Herpes labial, herpes zoster, lesões virais',
      usage: 'Aplicação direta: 1 gota pura na lesão | Diluído 5% para áreas maiores',
      dosage: '4-6x ao dia',
      duration: '5-10 dias',
      contraindications: 'Nenhuma',
      synergy: ['Lavanda', 'Melissa', 'Ravintsara']
    }]
  },
  
  'Rinite Alérgica': {
    title: 'Rinite Alérgica',
    oils: [{
      name: 'Lavanda',
      properties: 'Anti-histamínico, anti-inflamatório, calmante',
      indications: 'Rinite alérgica, espirros, coriza, coceira nasal',
      usage: 'Difusor: 6-8 gotas | Inalação: 2-3 gotas | Massagem seios: 2%',
      dosage: '3x ao dia',
      duration: 'Durante crise alérgica',
      contraindications: 'Nenhuma',
      synergy: ['Hortelã', 'Eucalipto', 'Camomila']
    }]
  },
  
  'Hemorroidas': {
    title: 'Hemorroidas',
    oils: [{
      name: 'Cipreste',
      properties: 'Vasoconstritor, adstringente, anti-inflamatório',
      indications: 'Hemorroidas, fissuras anais, sangramento',
      usage: 'Aplicação local: 2% em óleo vegetal | Banho assento: 6 gotas',
      dosage: '2-3x ao dia',
      duration: '10-15 dias',
      contraindications: 'Nenhuma',
      synergy: ['Lavanda', 'Gerânio', 'Helichrysum']
    }]
  },
  
  'Celulite': {
    title: 'Celulite e Retenção Líquida',
    oils: [{
      name: 'Grapefruit',
      properties: 'Lipolítico, drenante, diurético',
      indications: 'Celulite, retenção líquida, gordura localizada',
      usage: 'Massagem áreas afetadas: 3-5% diluído (vigorosa)',
      dosage: '2x ao dia',
      duration: '2-3 meses',
      contraindications: 'Fotossensível',
      synergy: ['Junípero', 'Cipreste', 'Limão']
    }]
  },
  
  'Queda de Cabelo': {
    title: 'Queda de Cabelo',
    oils: [{
      name: 'Alecrim',
      properties: 'Estimulante capilar, circulatório, fortalecedor',
      indications: 'Queda de cabelo, alopecia, cabelo ralo',
      usage: 'Massagem couro cabeludo: 2-3% em óleo vegetal | Shampoo: 10 gotas',
      dosage: '3x por semana',
      duration: '3-6 meses',
      contraindications: 'Nenhuma',
      synergy: ['Cedro', 'Lavanda', 'Ylang-Ylang']
    }]
  },
  
  'Caspa': {
    title: 'Caspa e Seborreia',
    oils: [{
      name: 'Tea Tree',
      properties: 'Antifúngico, antibacteriano, regulador sebáceo',
      indications: 'Caspa, seborreia, couro cabeludo oleoso',
      usage: 'Shampoo: 10 gotas para 100ml | Massagem: 2% antes lavar',
      dosage: '2-3x por semana',
      duration: 'Até resolver',
      contraindications: 'Pode ressecar',
      synergy: ['Alecrim', 'Lavanda', 'Cedro']
    }]
  },
  
  // === SISTEMA HEPÁTICO (FÍGADO) ===
  
  'Gordura no Fígado': {
    title: 'Esteatose Hepática - Gordura no Fígado',
    oils: [
      {
        name: 'Alecrim (Rosmarinus officinalis)',
        properties: 'Hepatoprotetor, colerético, desintoxicante hepático, estimulante biliar',
        indications: 'Gordura no fígado, esteatose hepática, fígado sobrecarregado, digestão de gorduras',
        usage: 'Massagem região hepática (abaixo costela direita): 3% em óleo vegetal | Difusor: 5-7 gotas 2x/dia | Compressa quente: 5 gotas',
        dosage: '2-3x ao dia, especialmente após refeições',
        duration: '3-6 meses com acompanhamento nutricional',
        contraindications: 'Epilepsia, hipertensão severa, gravidez',
        synergy: ['Limão', 'Hortelã-Pimenta', 'Gengibre', 'Grapefruit']
      },
      {
        name: 'Limão (Citrus limon)',
        properties: 'Depurativo hepático, lipolítico, colagogo, antioxidante',
        indications: 'Gordura no fígado, desintoxicação hepática, metabolismo de lipídios',
        usage: 'Difusor: 6-10 gotas 3x/dia | Massagem abdômen superior direito: 2% diluído',
        dosage: 'Manhã e tarde diariamente',
        duration: '3-6 meses',
        contraindications: 'Fotossensível - não expor ao sol após uso tópico',
        synergy: ['Alecrim', 'Grapefruit', 'Hortelã']
      },
      {
        name: 'Hortelã-Pimenta (Mentha piperita)',
        properties: 'Colerético, digestivo, estimulante biliar, hepatoprotetor',
        indications: 'Esteatose hepática, má digestão de gorduras, vesícula preguiçosa',
        usage: 'Massagem fígado: 2% em óleo vegetal | Difusor: 4-6 gotas | Inalação pós-refeição: 2 gotas',
        dosage: 'Após refeições principais',
        duration: '2-4 meses',
        contraindications: 'Crianças < 6 anos, gestantes',
        synergy: ['Alecrim', 'Limão', 'Gengibre']
      }
    ]
  },
  
  'Esteatose Hepática': {
    title: 'Esteatose Hepática (Fígado Gordo)',
    oils: [{
      name: 'Alecrim',
      properties: 'Hepatoprotetor, regenerador hepático',
      indications: 'Fígado gordo, esteatose, sobrecarga hepática',
      usage: 'Massagem: 3% diluído na região do fígado | Difusor: 6 gotas',
      dosage: '2x ao dia',
      duration: '3-6 meses',
      contraindications: 'Epilepsia',
      synergy: ['Limão', 'Grapefruit', 'Hortelã']
    }]
  },
  
  'Fígado Gordo': {
    title: 'Fígado Gordo',
    oils: [{
      name: 'Limão',
      properties: 'Depurativo hepático, lipolítico',
      indications: 'Gordura no fígado, metabolismo lento',
      usage: 'Difusor: 8-10 gotas | Massagem abdômen: 2%',
      dosage: '3x ao dia',
      duration: '90 dias',
      contraindications: 'Fotossensível',
      synergy: ['Alecrim', 'Grapefruit']
    }]
  },
  
  'Hepatite': {
    title: 'Hepatite e Inflamação Hepática',
    oils: [{
      name: 'Alecrim',
      properties: 'Anti-inflamatório hepático, hepatoprotetor',
      indications: 'Hepatite, inflamação do fígado, regeneração hepática',
      usage: 'Massagem região hepática: 2-3% diluído | Difusor: 5 gotas',
      dosage: '2-3x ao dia',
      duration: 'Conforme acompanhamento médico',
      contraindications: 'Epilepsia',
      synergy: ['Limão', 'Frankincense', 'Helichrysum']
    }]
  },
  
  'Cirrose': {
    title: 'Cirrose Hepática (Uso Complementar)',
    oils: [{
      name: 'Helichrysum (Helichrysum italicum)',
      properties: 'Regenerador celular hepático, anti-fibrótico',
      indications: 'Cirrose, fibrose hepática, regeneração (uso complementar ao tratamento médico)',
      usage: 'Massagem suave região fígado: 2% em óleo vegetal | Compressa: 3 gotas',
      dosage: '2x ao dia',
      duration: 'Acompanhamento médico obrigatório',
      contraindications: 'Uso apenas complementar - não substitui tratamento médico',
      synergy: ['Alecrim', 'Frankincense', 'Limão']
    }]
  },
  
  'Vesícula': {
    title: 'Problemas de Vesícula Biliar',
    oils: [{
      name: 'Hortelã-Pimenta',
      properties: 'Colerético, antiespasmódico biliar',
      indications: 'Vesícula preguiçosa, má digestão de gorduras, cólica biliar leve',
      usage: 'Massagem região vesícula: 2% diluído | Difusor: 4 gotas',
      dosage: 'Após refeições gordurosas',
      duration: '1-2 meses',
      contraindications: 'Cálculos grandes - consultar médico',
      synergy: ['Alecrim', 'Limão', 'Gengibre']
    }]
  },
  
  'Pedra na Vesícula': {
    title: 'Cálculo Biliar (Uso Preventivo)',
    oils: [{
      name: 'Limão',
      properties: 'Colagogo, solvente biliar suave',
      indications: 'Prevenção de cálculos, vesícula espessa (uso preventivo apenas)',
      usage: 'Difusor: 6-8 gotas | Massagem abdômen: 2%',
      dosage: '2x ao dia',
      duration: 'Uso preventivo com acompanhamento',
      contraindications: 'Cálculos confirmados grandes - consultar médico antes',
      synergy: ['Hortelã', 'Alecrim', 'Grapefruit']
    }]
  },
  
  'Intoxicação Hepática': {
    title: 'Intoxicação e Desintoxicação Hepática',
    oils: [{
      name: 'Alecrim',
      properties: 'Desintoxicante hepático, estimulante da fase II de detox',
      indications: 'Intoxicação por álcool, medicamentos, toxinas ambientais',
      usage: 'Massagem fígado: 3% diluído | Difusor: 6-8 gotas | Banho: 10 gotas',
      dosage: '3x ao dia',
      duration: '2-4 semanas',
      contraindications: 'Epilepsia',
      synergy: ['Limão', 'Junípero', 'Grapefruit']
    }]
  }
};

// Função de busca MELHORADA por sintoma/condição - PRIORIZA EXATAS
export function searchEssentialOil(searchTerm) {
  if (!searchTerm || searchTerm.trim().length === 0) return null;
  
  const term = searchTerm.toLowerCase().trim();
  
  // 1. BUSCA EXATA por nome da condição (chave do objeto)
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    if (key.toLowerCase() === term) {
      return {
        oils: category.oils,
        title: category.title
      };
    }
  }
  
  // 2. BUSCA EXATA por título
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    if (category.title.toLowerCase() === term) {
      return {
        oils: category.oils,
        title: category.title
      };
    }
  }
  
  // 3. Busca CONTÉM na chave
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    if (key.toLowerCase().includes(term) || term.includes(key.toLowerCase())) {
      return {
        oils: category.oils,
        title: category.title
      };
    }
  }
  
  // 4. Busca CONTÉM no título
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    if (category.title.toLowerCase().includes(term) || term.includes(category.title.toLowerCase())) {
      return {
        oils: category.oils,
        title: category.title
      };
    }
  }
  
  // 5. Busca dentro das indicações dos óleos
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    const matchingOils = category.oils.filter(oil => 
      oil.indications.toLowerCase().includes(term) ||
      oil.name.toLowerCase().includes(term) ||
      oil.properties.toLowerCase().includes(term)
    );
    
    if (matchingOils.length > 0) {
      return {
        oils: matchingOils,
        title: category.title
      };
    }
  }
  
  // 6. Busca por palavras-chave parciais (última opção)
  const keywords = term.split(' ').filter(w => w.length > 3);
  
  for (const [key, category] of Object.entries(ESSENTIAL_OILS_DATABASE)) {
    const keyWords = key.toLowerCase().split(' ');
    const titleWords = category.title.toLowerCase().split(' ');
    
    const matchCount = keywords.filter(kw => 
      keyWords.some(k => k.includes(kw) || kw.includes(k)) ||
      titleWords.some(tw => tw.includes(kw) || kw.includes(tw))
    ).length;
    
    if (matchCount >= Math.ceil(keywords.length * 0.7) && matchCount > 0) {
      return {
        oils: category.oils,
        title: category.title
      };
    }
  }
  
  return null;
}

// Instruções de uso de óleos essenciais
export const ESSENTIAL_OILS_INSTRUCTIONS = {
  general: [
    'Sempre diluir óleos essenciais em óleo vegetal para uso tópico (exceto Lavanda e Tea Tree em pequenas áreas)',
    'Diluição padrão: 2-3% (6-9 gotas em 30ml de óleo vegetal)',
    'Para pele sensível: diluição 1% (3 gotas em 30ml)',
    'Armazenar em frascos escuros, ao abrigo de luz e calor',
    'Validade: 2-3 anos para a maioria, 1 ano para cítricos',
    'Evitar contato com olhos e mucosas',
    'Fazer teste de sensibilidade antes do primeiro uso',
    'Não ingerir sem orientação de profissional qualificado'
  ],
  dilution: {
    facial: '0.5-1% (1-3 gotas em 30ml)',
    body: '2-3% (6-9 gotas em 30ml)',
    massage: '3-5% (9-15 gotas em 30ml)',
    pain: '5-10% (15-30 gotas em 30ml)',
    children: '0.5-1% (1-3 gotas em 30ml)'
  },
  safety: [
    'Gravidez: evitar nos primeiros 3 meses, alguns óleos contraindicados toda gestação',
    'Lactação: evitar óleos mentolados e cânfora',
    'Crianças < 3 anos: apenas Lavanda, Camomila Romana e Mandarim em baixa diluição',
    'Epilepsia: evitar óleos ricos em cetonas (Alecrim, Sálvia, Hortelã)',
    'Hipertensão: evitar Alecrim, Tomilho, Sálvia',
    'Fotossensibilidade: cítricos (Bergamota, Limão, Laranja) - não expor ao sol por 12h'
  ]
};

export default ESSENTIAL_OILS_DATABASE;
