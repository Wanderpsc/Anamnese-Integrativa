// Banco de Dados Expandido de Protocolos Fitoterápicos
// Inclui: Partes das plantas, contraindica\u00e7\u00f5es detalhadas, intera\u00e7\u00f5es medicamentosas ampliadas,
// novos protocolos baseados em evid\u00eancias cient\u00edficas

export const EXPANDED_PHYTOTHERAPY_DATABASE = {
  // SISTEMA DIGESTIVO
  'Gastrite e \u00dalcera': {
    category: 'Sistema Digestivo',
    indications: ['Gastrite aguda', 'Gastrite cr\u00f4nica', '\u00dalcera p\u00e9ptica', 'Dispepsia', 'Hiperacidez'],
    protocol: [
      {
        plant: 'Espinheira-santa (Maytenus ilicifolia)',
        partUsed: 'Folhas',
        dosage: '3g folhas/dia',
        posology: 'Infus\u00e3o: 1 colher sopa (3g) para 150ml \u00e1gua. Tomar 3x ao dia, 30min antes das refei\u00e7\u00f5es',
        duration: '4-8 semanas',
        properties: 'Antiulcerog\u00eanica, gastroprotetora, cicatrizante',
        evidenceLevel: 'Alta (estudos cl\u00ednicos controlados)',
      },
      {
        plant: 'Camomila (Matricaria chamomilla)',
        partUsed: 'Flores',
        dosage: '3-6g flores/dia',
        posology: 'Infus\u00e3o: 1 colher sopa para 200ml \u00e1gua. Tomar 3-4x ao dia',
        duration: '2-4 semanas',
        properties: 'Anti-inflamat\u00f3ria, antiespasmَdica, calmante',
        evidenceLevel: 'M\u00e9dia (estudos observacionais)',
      },
      {
        plant: 'Alca\u00e7uz (Glycyrrhiza glabra)',
        partUsed: 'Ra\u00edzes',
        dosage: '5-15g raiz/dia',
        posology: 'Decoc\u00e7\u00e3o: 1-3 colheres de ch\u00e1 para 200ml. Tomar 3x ao dia',
        duration: 'M\u00e1ximo 4 semanas',
        properties: 'Antiulcerog\u00eanico, anti-inflamat\u00f3rio',
        evidenceLevel: 'M\u00e9dia (requer cautela)',
      },
    ],
    contraindications: [
      {
        substance: 'Alca\u00e7uz',
        conditions: 'Hipertens\u00e3o arterial, hipocalemia, insufici\u00eancia renal',
        populations: 'Gestantes, lactantes',
        severity: 'Alta',
        mechanism: 'Inibi\u00e7\u00e3o da 11-beta-hidroxiesteroide desidrogenase, causando reten\u00e7\u00e3o de s\u00f3dio e perda de pot\u00e1ssio',
      },
      {
        substance: 'Espinheira-santa',
        conditions: 'Hipersensibilidade conhecida',
        populations: 'Gestantes (evitar no 1\u00ba trimestre), lactantes',
        severity: 'Moderada',
        mechanism: 'Efeitos teratog\u00eanicos potenciais n\u00e3o completamente estudados',
      },
      {
        substance: 'Camomila',
        conditions: 'Alergia \u00e0 fam\u00edlia Asteraceae',
        populations: 'Gestantes em grandes doses',
        severity: 'Baixa',
        mechanism: 'Rea\u00e7\u00f5es al\u00e9rgicas cruzadas com outras Asteraceae',
      },
    ],
    drugInteractions: [
      {
        herb: 'Alca\u00e7uz',
        drugs: 'Anti-hipertensivos (IECA, BRA, diur\u00e9ticos)',
        severity: 'Alta',
        mechanism: 'Antagoniza efeito anti-hipertensivo via reten\u00e7\u00e3o de s\u00f3dio',
        management: 'Evitar uso concomitante ou monitorar press\u00e3o arterial rigorosamente',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Alca\u00e7uz',
        drugs: 'Corticosteroides (prednisona, dexametasona)',
        severity: 'Alta',
        mechanism: 'Potencializa efeitos e toxicidade dos corticoides',
        management: 'Evitar combina\u00e7\u00e3o. Se necess\u00e1rio, reduzir dose de corticoide e monitorar',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Alca\u00e7uz',
        drugs: 'Digoxina',
        severity: 'Alta',
        mechanism: 'Hipocalemia induzida aumenta risco de toxicidade por digoxina',
        management: 'Contraindicado. Monitorar pot\u00e1ssio s\u00e9rico se uso inevit\u00e1vel',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Espinheira-santa',
        drugs: 'Anti\u00e1cidos, IBP (omeprazol)',
        severity: 'Moderada',
        mechanism: 'Possível redu\u00e7\u00e3o da efic\u00e1cia. Aguardar 2h entre administra\u00e7\u00f5es',
        management: 'Distanciar administra\u00e7\u00e3o em pelo menos 2 horas',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Evitar alimentos irritantes (caf\u00e9, \u00e1lcool, picantes). H. pylori pode necessitar tratamento convencional associado. Alca\u00e7uz: uso m\u00e1ximo de 4 semanas devido a risco de pseudo-hiperaldosteronismo.',
    clinicalMonitoring: 'Monitorar press\u00e3o arterial e eletr\u00f3litos se usar alca\u00e7uz. Acompanhamento endosc\u00f3pico conforme indica\u00e7\u00e3o m\u00e9dica.',
  },

  'Constipa\u00e7\u00e3o Intestinal': {
    category: 'Sistema Digestivo',
    indications: ['Constipa\u00e7\u00e3o cr\u00f4nica', 'Intestino preso', 'S\u00edndrome do intestino lento'],
    protocol: [
      {
        plant: 'Psyllium (Plantago ovata)',
        partUsed: 'Sementes (casca/mucilagem)',
        dosage: '10-30g/dia',
        posology: '1-2 colheres de sopa em 200-300ml \u00e1gua. Tomar 2-3x ao dia com bastante l\u00edquido',
        duration: 'Uso cont\u00ednuo permitido',
        properties: 'Laxante formador de bolo, prebi\u00f3tico',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Linha\u00e7a (Linum usitatissimum)',
        partUsed: 'Sementes',
        dosage: '10-30g sementes/dia',
        posology: '1-2 colheres de sopa mo\u00eddas. Misturar em \u00e1gua, iogurte ou frutas. 2-3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Laxante, anti-inflamat\u00f3rio, fonte de \u00f4mega-3',
        evidenceLevel: 'M\u00e9dia-Alta',
      },
      {
        plant: 'Sene (Cassia angustifolia)',
        partUsed: 'Folhas e vagens',
        dosage: '15-30mg sennoídeos/dia',
        posology: 'Infus\u00e3o: 1-2g folhas para 150ml. Tomar \u00e0 noite',
        duration: 'M\u00e1ximo 1-2 semanas',
        properties: 'Laxante estimulante',
        evidenceLevel: 'Alta (uso pontual apenas)',
      },
    ],
    contraindications: [
      {
        substance: 'Sene',
        conditions: 'Doen\u00e7as inflamat\u00f3rias intestinais (Crohn, retocolite), obstru\u00e7\u00e3o intestinal, apendicite, dor abdominal de origem desconhecida',
        populations: 'Gestantes, lactantes, crian\u00e7as <12 anos',
        severity: 'Alta',
        mechanism: 'Estimula peristaltismo intenso - risco de agrava\u00e7\u00e3o de condi\u00e7\u00f5es inflamat\u00f3rias',
      },
      {
        substance: 'Psyllium',
        conditions: 'Obstru\u00e7\u00e3o intestinal, dificuldade de degluti\u00e7\u00e3o, estenose esof\u00e1gica',
        populations: 'Idosos com mobilidade reduzida (risco aumentado)',
        severity: 'Moderada-Alta',
        mechanism: 'Forma gel volumoso que pode obstruir se hidrata\u00e7\u00e3o inadequada',
      },
      {
        substance: 'Linha\u00e7a',
        conditions: 'Obstru\u00e7\u00e3o intestinal',
        populations: 'Seguran\u00e7a estabelecida em adultos',
        severity: 'Baixa',
        mechanism: 'Forma gel ao contato com \u00e1gua',
      },
    ],
    drugInteractions: [
      {
        herb: 'Sene',
        drugs: 'Medicamentos orais (geral)',
        severity: 'Moderada',
        mechanism: 'Acelera tr\u00e2nsito intestinal, reduzindo tempo de absor\u00e7\u00e3o',
        management: 'Tomar medicamentos 2h antes ou 4h depois do sene',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Sene',
        drugs: 'Diur\u00e9ticos, corticoides, digoxina',
        severity: 'Alta',
        mechanism: 'Perda de pot\u00e1ssio (hipocalemia) aumenta toxicidade card\u00edaca',
        management: 'Evitar uso prolongado. Monitorar eletr\u00f3litos',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Psyllium/Linha\u00e7a',
        drugs: 'Minerais (ferro, c\u00e1lcio, zinco), levotiroxina, carbamazepina, l\u00edtio',
        severity: 'Moderada',
        mechanism: 'Fibras reduzem absor\u00e7\u00e3o de minerais e alguns f\u00e1rmacos',
        management: 'Distanciar administra\u00e7\u00e3o em 2-4 horas',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Linha\u00e7a',
        drugs: 'Anticoagulantes (varfarina)',
        severity: 'Baixa-Moderada',
        mechanism: 'Conte\u00fado de \u00f4mega-3 pode potencializar efeito anticoagulante',
        management: 'Monitorar INR. Informar m\u00e9dico sobre uso',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Hidrata\u00e7\u00e3o adequada \u00e9 essencial (2-3L \u00e1gua/dia). Sene apenas para uso pontual (m\u00e1ximo 7-14 dias). Prefer\u00eancia por fibras (psyllium/linha\u00e7a) para tratamento cr\u00f4nico. Linha\u00e7a deve ser mo\u00edda na hora ou armazenada sob refrigera\u00e7\u00e3o.',
    clinicalMonitoring: 'Se uso prolongado de sene: monitorar eletr\u00f3litos (pot\u00e1ssio). Avaliar resposta cl\u00ednica ap\u00f3s 2 semanas de fibras.',
  },

  // SISTEMA CARDIOVASCULAR
  'Hipertens\u00e3o Arterial Leve': {
    category: 'Sistema Cardiovascular',
    indications: ['Hipertens\u00e3o arterial leve (est\u00e1gio 1)', 'Pr\u00e9-hipertens\u00e3o', 'Adjuvante ao tratamento convencional'],
    protocol: [
      {
        plant: 'Alho (Allium sativum)',
        partUsed: 'Bulbo',
        dosage: '600-1200mg extrato padronizado (alicina 1,3%) ou 2-4g alho fresco/dia',
        posology: '1-2 c\u00e1psulas 2x ao dia com refei\u00e7\u00f5es',
        duration: '8-12 semanas para efeito pleno',
        properties: 'Anti-hipertensivo leve, antiaterog\u00eanico, antitromb\u00f3tico',
        evidenceLevel: 'M\u00e9dia-Alta (metaan\u00e1lises com resultados modestos)',
      },
      {
        plant: 'Hibisco (Hibiscus sabdariffa)',
        partUsed: 'C\u00e1lices/flores',
        dosage: '1,5-3g flores secas/dia',
        posology: 'Infus\u00e3o: 1-2g em 200ml. Tomar 2-3x ao dia',
        duration: '4-12 semanas',
        properties: 'Anti-hipertensivo, diur\u00e9tico leve, antioxidante',
        evidenceLevel: 'M\u00e9dia (estudos cl\u00ednicos pequenos)',
      },
      {
        plant: 'Espinheiro-branco (Crataegus oxyacantha)',
        partUsed: 'Flores, folhas, frutos',
        dosage: '160-900mg extrato padronizado/dia',
        posology: '1-2 c\u00e1psulas 2-3x ao dia',
        duration: '6-12 semanas',
        properties: 'Cardioprotetor, vasodilatador, anti-hipertensivo leve',
        evidenceLevel: 'M\u00e9dia (mais estudos em insufici\u00eancia card\u00edaca)',
      },
    ],
    contraindications: [
      {
        substance: 'Alho',
        conditions: 'Dist\u00farbios de coagula\u00e7\u00e3o, gastrite aguda, \u00falcera p\u00e9ptica ativa',
        populations: 'Pacientes pr\u00e9-operat\u00f3rios (suspender 7 dias antes)',
        severity: 'Moderada',
        mechanism: 'Efeito antiagregante plaquet\u00e1rio aumenta risco de sangramento',
      },
      {
        substance: 'Hibisco',
        conditions: 'Hipotens\u00e3o, insufici\u00eancia renal grave',
        populations: 'Gestantes (pode estimular menstrua\u00e7\u00e3o)',
        severity: 'Moderada',
        mechanism: 'Pode reduzir excessivamente a press\u00e3o arterial',
      },
      {
        substance: 'Espinheiro-branco',
        conditions: 'Hipotens\u00e3o, bradicardia',
        populations: 'Seguran\u00e7a em gestantes n\u00e3o estabelecida',
        severity: 'Baixa-Moderada',
        mechanism: 'Potencializa efeitos card\u00edacos',
      },
    ],
    drugInteractions: [
      {
        herb: 'Alho',
        drugs: 'Anticoagulantes (varfarina), antiagreģantes (AAS, clopidogrel)',
        severity: 'Alta',
        mechanism: 'Potencializa efeito anticoagulante/antiagreganteรท risco de sangramento',
        management: 'Evitar combina\u00e7\u00e3o ou usar com extrema cautela. Monitorar INR (varfarina)',
        cypInvolvement: 'CYP2C9, CYP3A4 (indu\u00e7\u00e3o)',
      },
      {
        herb: 'Alho',
        drugs: 'Saquinavir, outros antirretrovirais',
        severity: 'Alta',
        mechanism: 'Redu\u00e7\u00e3o de n\u00edveis plasm\u00e1ticos do antirretroviral (indu\u00e7\u00e3o CYP3A4)',
        management: 'Evitar combina\u00e7\u00e3o',
        cypInvolvement: 'CYP3A4 (indu\u00e7\u00e3o)',
      },
      {
        herb: 'Alho',
        drugs: 'Anti-hipertensivos (geral)',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo na redu\u00e7\u00e3o da press\u00e3o arterial',
        management: 'Monitorar press\u00e3o arterial. Pode necessitar ajuste de dose',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Hibisco',
        drugs: 'Diur\u00e9ticos, anti-hipertensivos',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo - risco de hipotens\u00e3o',
        management: 'Monitorar press\u00e3o arterial e eletr\u00f3litos',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Espinheiro-branco',
        drugs: 'Digital\u00edlicos (digoxina), betabloqueadores, bloqueadores de canais de c\u00e1lcio',
        severity: 'Moderada',
        mechanism: 'Potencializa efeitos card\u00edacos',
        management: 'Usar com cautela. Monitorar frequệncia card\u00edaca e ECG',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Fitoterapia \u00e9 adjuvante, n\u00e3o substitui anti-hipertensivos em HAS moderada/grave. Mudan\u00e7as de estilo de vida (dieta, exerc\u00edcio, redu\u00e7\u00e3o de s\u00f3dio) s\u00e3o fundamentais. Evitar alho cru em excesso (risco de gastrite).',
    clinicalMonitoring: 'Monitorar press\u00e3o arterial semanalmente nas primeiras 4 semanas. Avaliar resposta ap\u00f3s 8 semanas. Verificar fun\u00e7\u00e3o renal e eletr\u00f3litos periodicamente.',
  },

  // SISTEMA NERVOSO
  'Ansiedade Leve a Moderada': {
    category: 'Sistema Nervoso',
    indications: ['Ansiedade generalizada leve', 'Nervosismo', 'Tens\u00e3o', 'Dist\u00farbios do sono relacionados \u00e0 ansiedade'],
    protocol: [
      {
        plant: 'Valeriana (Valeriana officinalis)',
        partUsed: 'Ra\u00edzes e rizomas',
        dosage: '300-600mg extrato padronizado/dia',
        posology: '1-2 c\u00e1psulas \u00e0 noite (ins\u00f4nia) ou 2-3x ao dia (ansiedade)',
        duration: '2-4 semanas para efeito ansiol\u00edtico pleno',
        properties: 'Ansiol\u00edtica, sedativa, relaxante muscular',
        evidenceLevel: 'M\u00e9dia (resultados inconsistentes entre estudos)',
      },
      {
        plant: 'Passiflora (Passiflora incarnata)',
        partUsed: 'Partes a\u00e9reas',
        dosage: '250-500mg extrato seco 3-4x ao dia ou 4-8g planta seca/dia',
        posology: 'Infus\u00e3o: 1-2g para 150ml. Tomar 3-4x ao dia',
        duration: '4-8 semanas',
        properties: 'Ansiol\u00edtica, sedativa leve',
        evidenceLevel: 'M\u00e9dia (alguns estudos cl\u00ednicos favor\u00e1veis)',
      },
      {
        plant: 'Melissa (Melissa officinalis)',
        partUsed: 'Folhas',
        dosage: '300-600mg extrato ou 1,5-4,5g planta seca/dia',
        posology: 'Infus\u00e3o: 1-2g para 150ml. Tomar 3x ao dia',
        duration: '4-12 semanas',
        properties: 'Ansiol\u00edtica, calmante, antiespasmَdica',
        evidenceLevel: 'Baixa-M\u00e9dia',
      },
    ],
    contraindications: [
      {
        substance: 'Valeriana',
        conditions: 'Doen\u00e7a hep\u00e1tica (cautela)',
        populations: 'Gestantes, lactantes, crian\u00e7as <3 anos',
        severity: 'Moderada',
        mechanism: 'Risco potencial de hepatotoxicidade em casos raros',
      },
      {
        substance: 'Passiflora',
        conditions: 'Hipersensibilidade conhecida',
        populations: 'Gestantes (pode estimular contra\u00e7\u00f5es uterinas)',
        severity: 'Moderada',
        mechanism: 'Efeitos uterot\u00f4nicos em modelos animais',
      },
      {
        substance: 'Melissa',
        conditions: 'Hipotireoidismo (monitorar)',
        populations: 'Seguran\u00e7a em gesta\u00e7\u00e3o n\u00e3o completamente estabelecida',
        severity: 'Baixa',
        mechanism: 'Poss\u00edvel intera\u00e7\u00e3o com horm\u00f4nio tireoidiano',
      },
    ],
    drugInteractions: [
      {
        herb: 'Valeriana',
        drugs: 'Benzodiazep\u00ednicos, barbit\u00faricos, outros sedativos/hipn\u00f3ticos',
        severity: 'Alta',
        mechanism: 'Potencializa efeito sedativo - risco de seda\u00e7\u00e3o excessiva',
        management: 'Evitar combina\u00e7\u00e3o ou reduzir doses. Monitorar seda\u00e7\u00e3o',
        cypInvolvement: 'Poss\u00edvel inibի\u00e7\u00e3o de CYP3A4 e CYP2D6 (in vitro)',
      },
      {
        herb: 'Valeriana',
        drugs: '\u00c1lcool',
        severity: 'Alta',
        mechanism: 'Potencializa efeito depressor do SNC',
        management: 'Evitar consumo de \u00e1lcool durante tratamento',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Passiflora',
        drugs: 'Sedativos, ansiol\u00edticos',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo sedativo',
        management: 'Usar com cautela. Ajustar doses se necess\u00e1rio',
        cypInvolvement: 'Desconhecido',
      },
      {
        herb: 'Melissa',
        drugs: 'Sedativos, medicamentos para tireoide (levotiroxina)',
        severity: 'Baixa-Moderada',
        mechanism: 'Potencializa seda\u00e7\u00e3o; pode interferir com horm\u00f4nio tireoidiano',
        management: 'Monitorar fun\u00e7\u00e3o tireoidiana se uso prolongado',
        cypInvolvement: 'Desconhecido',
      },
    ],
    observations: 'Para ansiedade moderada a grave, psicoterapia e/ou medica\u00e7\u00e3o convencional s\u00e3o necess\u00e1rias. Valeriana pode causar sonol\u00eancia diurna em alguns indiv\u00edduos. Evitar operar m\u00e1quinas pesadas ou dirigir at\u00e9 conhecer efeitos individuais.',
    clinicalMonitoring: 'Avaliar resposta cl\u00ednica ap\u00f3s 2-4 semanas. Se uso prolongado de valeriana, monitorar enzimas hep\u00e1ticas anualmente (por precau\u00e7\u00e3o).',
  },

  'Ins\u00f4nia': {
    category: 'Sistema Nervoso',
    indications: ['Ins\u00f4nia prim\u00e1ria leve', 'Dificuldade para iniciar o sono', 'Despertares noturnos'],
    protocol: [
      {
        plant: 'Valeriana (Valeriana officinalis)',
        partUsed: 'Ra\u00edzes e rizomas',
        dosage: '400-900mg extrato padronizado',
        posology: '1-2 c\u00e1psulas 30-60min antes de deitar',
        duration: '2-4 semanas para efeito \u00f3timo',
        properties: 'Sedativa, indutora do sono, melhora qualidade do sono',
        evidenceLevel: 'M\u00e9dia',
      },
      {
        plant: 'L\u00fapulo (Humulus lupulus)',
        partUsed: 'Estróbilos (infloresc\u00eancias femininas)',
        dosage: '200-400mg extrato',
        posology: '1-2 c\u00e1psulas \u00e0 noite',
        duration: '2-4 semanas',
        properties: 'Sedativo, hipn\u00f3tico',
        evidenceLevel: 'Baixa (geralmente usado em combina\u00e7\u00e3o com valeriana)',
      },
      {
        plant: 'Camomila (Matricaria chamomilla)',
        partUsed: 'Flores',
        dosage: '2-4g flores secas',
        posology: 'Infus\u00e3o: 1-2 colheres de sopa para 200ml. Tomar 30-60min antes de dormir',
        duration: 'Uso cont\u00ednuo permitido',
        properties: 'Sedativa leve, relaxante, ansiol\u00edtica',
        evidenceLevel: 'Baixa',
      },
    ],
    contraindications: [
      {
        substance: 'Valeriana',
        conditions: 'Doen\u00e7a hep\u00e1tica',
        populations: 'Gestantes, lactantes, crian\u00e7as <3 anos',
        severity: 'Moderada',
        mechanism: 'Risco raro de hepatotoxicidade',
      },
      {
        substance: 'L\u00fapulo',
        conditions: 'Depress\u00e3o (pode piorar sintomas)',
        populations: 'Gestantes (efeito estrog\u00eanico)',
        severity: 'Moderada',
        mechanism: 'Cont\u00e9m fitoestر\u00f3genos',
      },
      {
        substance: 'Camomila',
        conditions: 'Alergia a Asteraceae',
        populations: 'Seguran\u00e7a estabelecida em adultos',
        severity: 'Baixa',
        mechanism: 'Rea\u00e7\u00f5es al\u00e9rgicas cruzadas',
      },
    ],
    drugInteractions: [
      {
        herb: 'Valeriana',
        drugs: 'Benzodiazep\u00ednicos, zolpidem, outros hipn\u00f3ticos',
        severity: 'Alta',
        mechanism: 'Potencializa seda\u00e7\u00e3o',
        management: 'Evitar ou ajustar doses com orienta\u00e7\u00e3o m\u00e9dica',
        cypInvolvement: 'Inibe CYP3A4 in vitro',
      },
      {
        herb: 'Valeriana',
        drugs: 'Antidepressivos (ISRS, IRSN)',
        severity: 'Moderada',
        mechanism: 'Potencializa seda\u00e7\u00e3o',
        management: 'Monitorar sonol\u00eancia',
        cypInvolvement: 'Desconhecido',
      },
      {
        herb: 'L\u00fapulo',
        drugs: 'Sedativos, \u00e1lcool',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo sedativo',
        management: 'Evitar \u00e1lcool. Cautela com sedativos',
        cypInvolvement: 'Desconhecido',
      },
    ],
    observations: 'Higiene do sono \u00e9 essencial (ambiente escuro/silencioso, hor\u00e1rios regulares, evitar telas antes de dormir). Se ins\u00f4nia persistir >4 semanas, investigar causas subjacentes. Valeriana pode demorar 2-4 semanas para efeito pleno.',
    clinicalMonitoring: 'Reavaliar ap\u00f3s 4 semanas. Se sem melhora, considerar investiga\u00e7\u00e3o m\u00e9dica (polissonografia se indicado).',
  },

  // NOVOS PROTOCOLOS

  'Dor Cr\u00f4nica (Osteoartrite)': {
    category: 'Sistema Musculoesquel\u00e9tico',
    indications: ['Osteoartrite leve a moderada', 'Dor articular cr\u00f4nica', 'Artrose'],
    protocol: [
      {
        plant: 'Gengibre (Zingiber officinale)',
        partUsed: 'Rizomas',
        dosage: '500-1000mg extrato padronizado 2x ao dia ou 2-4g gengibre fresco/dia',
        posology: '1-2 c\u00e1psulas 2x ao dia com refei\u00e7\u00f5es',
        duration: '4-12 semanas',
        properties: 'Anti-inflamat\u00f3rio, analg\u00e9sico',
        evidenceLevel: 'M\u00e9dia (estudos com resultados modestos)',
      },
      {
        plant: 'C\u00farcuma (Curcuma longa)',
        partUsed: 'Rizomas',
        dosage: '500mg curcumina (extrato padronizado) 2-3x ao dia',
        posology: '1-2 c\u00e1psulas 2-3x ao dia com refei\u00e7\u00f5es (melhor absor\u00e7\u00e3o com pimenta preta)',
        duration: '8-12 semanas',
        properties: 'Anti-inflamat\u00f3rio potente, antioxidante',
        evidenceLevel: 'M\u00e9dia-Alta',
      },
      {
        plant: 'Harpagófito (Harpagophytum procumbens)',
        partUsed: 'Ra\u00edzes secund\u00e1rias',
        dosage: '600-2400mg extrato (contendo 50-100mg harpagosídeo/dia)',
        posology: '1-2 c\u00e1psulas 2-3x ao dia',
        duration: '8-12 semanas',
        properties: 'Anti-inflamat\u00f3rio, analg\u00e9sico',
        evidenceLevel: 'M\u00e9dia',
      },
    ],
    contraindications: [
      {
        substance: 'Gengibre',
        conditions: '\u00dalcera p\u00e9ptica ativa, c\u00e1lculos biliares',
        populations: 'Pacientes anticoagulados (cautela)',
        severity: 'Moderada',
        mechanism: 'Efeito antiagregante plaquet\u00e1rio',
      },
      {
        substance: 'C\u00farcuma',
        conditions: 'Obstru\u00e7\u00e3o biliar, c\u00e1lculos biliares',
        populations: 'Gestantes, lactantes',
        severity: 'Moderada',
        mechanism: 'Estimula contra\u00e7\u00e3o da ves\u00edcula biliar',
      },
      {
        substance: 'Harpagófito',
        conditions: '\u00dalcera p\u00e9ptica, c\u00e1lculos biliares',
        populations: 'Gestantes, lactantes',
        severity: 'Moderada-Alta',
        mechanism: 'Aumenta secre\u00e7\u00e3o g\u00e1strica',
      },
    ],
    drugInteractions: [
      {
        herb: 'Gengibre',
        drugs: 'Anticoagulantes (varfarina), antiagreģantes',
        severity: 'Moderada-Alta',
        mechanism: 'Potencializa efeito anticoagulante',
        management: 'Usar com cautela. Monitorar INR',
        cypInvolvement: 'Inibe CYP2C9',
      },
      {
        herb: 'C\u00farcuma',
        drugs: 'Anticoagulantes, antiagregantes, AINEs',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo antiinflamat\u00f3rio/anticoagulante',
        management: 'Monitorar sangramento. Cautela',
        cypInvolvement: 'Inibe CYP3A4, CYP2C9',
      },
      {
        herb: 'Harpag\u00f3fito',
        drugs: 'Varfarina, medicamentos metabolizados por CYP3A4',
        severity: 'Moderada',
        mechanism: 'Pode alterar metabolismo de f\u00e1rmacos',
        management: 'Monitorar INR se varfarina',
        cypInvolvement: 'Inibe CYP3A4, CYP2C9, CYP2C19',
      },
    ],
    observations: 'Fitoterapia \u00e9 adjuvante. Exerc\u00edcios de baixo impacto, fisioterapia e controle de peso s\u00e3o fundamentais. Curcumina tem biodisponibilidade baixa - usar formula\u00e7\u00f5es com piperina ou fitossomas para melhor absor\u00e7\u00e3o.',
    clinicalMonitoring: 'Avaliar resposta (redu\u00e7\u00e3o da dor, melhora funcional) ap\u00f3s 8 semanas. Monitorar fun\u00e7\u00e3o hep\u00e1tica se uso prolongado de c\u00farcuma.',
  },

  'Enxaqueca (Preven\u00e7\u00e3o)': {
    category: 'Sistema Nervoso',
    indications: ['Preven\u00e7\u00e3o de enxaqueca', 'Redu\u00e7\u00e3o de frequ\u00eancia e intensidade de crises'],
    protocol: [
      {
        plant: 'Tanaceto (Tanacetum parthenium / Feverfew)',
        partUsed: 'Partes a\u00e9reas',
        dosage: '50-150mg extrato padronizado (contendo 0,2-0,5% partenol\u00eddeo)/dia',
        posology: '1 c\u00e1psula 1-2x ao dia',
        duration: 'M\u00ednimo 4-6 semanas (at\u00e9 3 meses para efeito m\u00e1ximo)',
        properties: 'Preventivo de enxaqueca, anti-inflamat\u00f3rio',
        evidenceLevel: 'M\u00e9dia (estudos com resultados conflitantes)',
      },
      {
        plant: 'Gengibre (Zingiber officinale)',
        partUsed: 'Rizomas',
        dosage: '250-500mg p\u00f3 seco 4x ao dia (tratamento agudo) ou 500mg 2x ao dia (preven\u00e7\u00e3o)',
        posology: '1 c\u00e1psula no in\u00edcio da crise + manter uso preventivo',
        duration: '3-6 meses',
        properties: 'Anti-inflamat\u00f3rio, antiemético, analg\u00e9sico',
        evidenceLevel: 'Baixa-M\u00e9dia',
      },
    ],
    contraindications: [
      {
        substance: 'Tanaceto',
        conditions: 'Alergia a Asteraceae',
        populations: 'Gestantes (pode estimular contra\u00e7\u00f5es uterinas), lactantes, crian\u00e7as',
        severity: 'Alta',
        mechanism: 'Efeito uterot\u00f4nico',
      },
      {
        substance: 'Gengibre',
        conditions: '\u00dalcera p\u00e9ptica ativa',
        populations: 'Anticoagulados (usar com cautela)',
        severity: 'Moderada',
        mechanism: 'Efeito anticoagulante leve',
      },
    ],
    drugInteractions: [
      {
        herb: 'Tanaceto',
        drugs: 'Anticoagulantes (varfarina)',
        severity: 'Moderada',
        mechanism: 'Pode potencializar anticoagula\u00e7\u00e3o',
        management: 'Monitorar INR',
        cypInvolvement: 'Desconhecido',
      },
      {
        herb: 'Gengibre',
        drugs: 'Anticoagulantes, AINEs',
        severity: 'Moderada',
        mechanism: 'Efeito aditivo anticoagulante/antiinflamat\u00f3rio',
        management: 'Monitorar sangramento',
        cypInvolvement: 'Inibe CYP2C9',
      },
    ],
    observations: 'Efic\u00e1cia preventiva do tanaceto requer uso regular por v\u00e1rias semanas. N\u00e3o trata crise aguda. Identificar e evitar gatilhos (alimentos, estresse, sono irregular). Manter di\u00e1rio de enxaqueca para avaliar resposta.',
    clinicalMonitoring: 'Reavaliar frequ\u00eancia e intensidade das crises ap\u00f3s 8-12 semanas. Se <50% redu\u00e7\u00e3o, considerar outras op\u00e7\u00f5es terap\u00eauticas.',
  },

  'Sintomas da Menopausa': {
    category: 'Sa\u00fade da Mulher',
    indications: ['Fogachos', 'Suores noturnos', 'Sintomas vasomotores da menopausa'],
    protocol: [
      {
        plant: 'Cimicifuga (Cimicifuga racemosa / Black Cohosh)',
        partUsed: 'Rizomas e ra\u00edzes',
        dosage: '40-80mg extrato padronizado/dia',
        posology: '1-2 c\u00e1psulas 1-2x ao dia',
        duration: '12 semanas (reavaliar)',
        properties: 'Reduz fogachos, modula receptores estrog\u00eanicos',
        evidenceLevel: 'M\u00e9dia (estudos com resultados mistos)',
      },
      {
        plant: 'Soja (Glycine max) - Isoflavonas',
        partUsed: 'Sem', dosage: '40-80mg isoflavonas/dia',
        posology: '1-2 c\u00e1psulas ao dia',
        duration: '12 semanas',
        properties: 'Fitoestrog\u00eanio, reduz sintomas vasomotores',
        evidenceLevel: 'Baixa-M\u00e9dia (efeito modesto)',
      },
    ],
    contraindications: [
      {
        substance: 'Cimicifuga',
        conditions: 'C\u00e2ncer de mama (hist\u00f3rico ou ativo), doen\u00e7a hep\u00e1tica',
        populations: 'Gestantes, lactantes',
        severity: 'Alta',
        mechanism: 'Risco raro de hepatotoxicidade; evitar em c\u00e2ncer hormônio-dependente',
      },
      {
        substance: 'Isoflavonas de Soja',
        conditions: 'C\u00e2ncer de mama hormônio-dependente (usar com cautela)',
        populations: 'Seguran\u00e7a estabelecida em adultos',
        severity: 'Moderada',
        mechanism: 'Efeito estrog\u00eanico leve',
      },
    ],
    drugInteractions: [
      {
        herb: 'Cimicifuga',
        drugs: 'Tamoxifeno, outros antiestrog\u00eanicos',
        severity: 'Moderada',
        mechanism: 'Poss\u00edvel intera\u00e7\u00e3o com receptores estrog\u00eanicos',
        management: 'Evitar combina\u00e7\u00e3o. Discutir com oncologista',
        cypInvolvement: 'Inibe CYP2D6',
      },
      {
        herb: 'Isoflavonas',
        drugs: 'Levotiroxina',
        severity: 'Baixa-Moderada',
        mechanism: 'Pode interferir com absor\u00e7\u00e3o de horm\u00f4nio tireoidiano',
        management: 'Distanciar administra\u00e7\u00e3o em 4h',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Resposta individual vari\u00e1vel. Se hist\u00f3rico de c\u00e2ncer de mama, evitar cimicifuga. Terapia de reposi\u00e7\u00e3o hormonal convencional pode ser necess\u00e1ria em casos graves. Exerc\u00edcio regular e dieta equilibrada auxiliam.',
    clinicalMonitoring: 'Monitorar enzimas hep\u00e1ticas se uso prolongado de cimicifuga. Reavaliar sintomas ap\u00f3s 12 semanas.',
  },

  'Hiperplasia Prost\u00e1tica Benigna (HPB) Leve': {
    category: 'Sa\u00fade do Homem',
    indications: ['HPB leve', 'Sintomas urin\u00e1rios baixos leves'],
    protocol: [
      {
        plant: 'Saw Palmetto (Serenoa repens)',
        partUsed: 'Frutos maduros',
        dosage: '160mg extrato lip\u00edfilico 2x ao dia ou 320mg 1x ao dia',
        posology: '1-2 c\u00e1psulas ao dia com refei\u00e7\u00f5es',
        duration: 'M\u00ednimo 6-12 semanas (pode necessitar meses)',
        properties: 'Inibe 5-alfa-redutase, anti-inflamat\u00f3rio',
        evidenceLevel: 'M\u00e9dia (estudos com resultados inconsistentes)',
      },
      {
        plant: 'Urtica (Urtica dioica)',
        partUsed: 'Ra\u00edzes',
        dosage: '120mg extrato 2x ao dia',
        posology: '1 c\u00e1psula 2x ao dia',
        duration: '6-12 meses',
        properties: 'Melhora fluxo urin\u00e1rio, anti-inflamat\u00f3rio',
        evidenceLevel: 'Baixa-M\u00e9dia',
      },
    ],
    contraindications: [
      {
        substance: 'Saw Palmetto',
        conditions: 'Cirurgia planejada (suspender 2 semanas antes)',
        populations: 'Gestantes, lactantes (n\u00e3o aplic\u00e1vel)',
        severity: 'Baixa-Moderada',
        mechanism: 'Risco te\u00f3rico de sangramento aumentado',
      },
      {
        substance: 'Urtica',
        conditions: 'Insufici\u00eancia renal ou card\u00edaca (redu\u00e7\u00e3o de di\u00farese)',
        populations: 'Seguran\u00e7a estabelecida',
        severity: 'Baixa',
        mechanism: 'Diurése',
      },
    ],
    drugInteractions: [
      {
        herb: 'Saw Palmetto',
        drugs: 'Finasterida, dutasterida',
        severity: 'Baixa',
        mechanism: 'Mecanismo de a\u00e7\u00e3o similar - efeito aditivo poss\u00edvel',
        management: 'Geralmente seguro. Monitorar sintomas',
        cypInvolvement: 'Inibe CYP3A4 in vitro',
      },
      {
        herb: 'Saw Palmetto',
        drugs: 'Anticoagulantes (te\u00f3rico)',
        severity: 'Baixa',
        mechanism: 'Risco te\u00f3rico (n\u00e3o confirmado em estudos)',
        management: 'Monitorar',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Efic\u00e1cia controversa - alguns estudos n\u00e3o mostram benef\u00edcio. Acompanhamento urol\u00f3gico necess\u00e1rio. Descartar c\u00e2ncer de pr\u00f3stata (PSA, toque retal). N\u00e3o \u00e9 substituto de tratamento cirúrgico em HPB grave.',
    clinicalMonitoring: 'Avaliar sintomas (IPSS score), fluxo urin\u00e1rio, PSA periodicamente. Reavaliar ap\u00f3s 3-6 meses.',
  },

  // ADICIONANDO MAIS PROTOCOLOS...

  'Depress\u00e3o Leve': {
    category: 'Sistema Nervoso',
    indications: ['Depress\u00e3o leve', 'Dist\u00farbios de humor leves', 'Tristeza persistente'],
    protocol: [
      {
        plant: 'Erva-de-S\u00e3o-Jo\u00e3o (Hypericum perforatum)',
        partUsed: 'Partes a\u00e9reas floridas',
        dosage: '300mg extrato padronizado (0,3% hipericina) 3x ao dia',
        posology: '1 c\u00e1psula 3x ao dia com refei\u00e7\u00f5es',
        duration: '4-8 semanas para efeito pleno (at\u00e9 6 meses)',
        properties: 'Antidepressivo, inibe recapta\u00e7\u00e3o de serotonina/noradrenalina/dopamina',
        evidenceLevel: 'Alta (efic\u00e1cia comparável a antidepressivos em depress\u00e3o leve)',
      },
    ],
    contraindications: [
      {
        substance: 'Erva-de-S\u00e3o-Jo\u00e3o',
        conditions: 'Depress\u00e3o moderada a grave, transtorno bipolar, fotossensibilidade',
        populations: 'Gestantes, lactantes',
        severity: 'Alta',
        mechanism: 'Indu\u00e7\u00e3o enzim\u00e1tica massiva (CYP450) - m\u00faltiplas intera\u00e7\u00f5es',
      },
    ],
    drugInteractions: [
      {
        herb: 'Erva-de-S\u00e3o-Jo\u00e3o',
        drugs: 'Anticoncepcionais orais',
        severity: 'Muito Alta',
        mechanism: 'Indu\u00e7\u00e3o de CYP3A4 - redu\u00e7\u00e3o dráástica de efic\u00e1cia contraceptiva',
        management: 'CONTRAINDICADO. Usar m\u00e9todo contraceptivo alternativo',
        cypInvolvement: 'Induz CYP3A4, CYP2C9, CYP2C19, CYP1A2',
      },
      {
        herb: 'Erva-de-S\u00e3o-Jo\u00e3o',
        drugs: 'ISRS, IRSN, IMAOs',
        severity: 'Muito Alta',
        mechanism: 'Risco de S\u00edndrome Serotoninérgica',
        management: 'CONTRAINDICADO',
        cypInvolvement: 'N\u00e3o (mecanismo farmacodin\u00e2mico)',
      },
      {
        herb: 'Erva-de-S\u00e3o-Jo\u00e3o',
        drugs: 'Varfarina, digoxina, teofilina, ciclosporina, tacrolimo',
        severity: 'Muito Alta',
        mechanism: 'Indu\u00e7\u00e3o de CYP450 e P-gp - redu\u00e7\u00e3o de n\u00edveis plasm\u00e1ticos',
        management: 'Evitar combina\u00e7\u00e3o. Monitorar rigorosamente se inevit\u00e1vel',
        cypInvolvement: 'Induz CYP3A4 e P-glicoprote\u00edna',
      },
      {
        herb: 'Erva-de-S\u00e3o-Jo\u00e3o',
        drugs: 'Antirretrovirais (indinavir, efavirenz)',
        severity: 'Muito Alta',
        mechanism: 'Redu\u00e7\u00e3o de n\u00edveis plasm\u00e1ticos - falha terap\u00eautica',
        management: 'CONTRAINDICADO',
        cypInvolvement: 'Induz CYP3A4',
      },
    ],
    observations: 'Ȧ\u00c3O USAR SEM AVALIA\u00c7\u00c3O M\u00c9DICA. M\u00faltiplas intera\u00e7\u00f5es medicamentosas graves. Fotossensibilidade (evitar exposi\u00e7\u00e3o solar excessiva). Depress\u00e3o moderada/grave requer psicoterapia e/ou antidepressivos convencionais.',
    clinicalMonitoring: 'Avaliar resposta ap\u00f3s 4-6 semanas. Suspender 2 semanas antes de cirurgias. Informar TODOS os medicamentos em uso ao prescrever Erva-de-S\u00e3o-Jo\u00e3o.',
  },

  'DRGE (Refluxo Gastroesof\u00e1gico) Leve': {
    category: 'Sistema Digestivo',
    indications: ['Refluxo gastroesof\u00e1gico leve', 'Azia ocasional', 'Pirose'],
    protocol: [
      {
        plant: 'Babosa/Aloe Vera (Aloe vera)',
        partUsed: 'Gel da folha (interno)',
        dosage: '30-60ml gel/dia',
        posology: '1-2 colheres de sopa 2x ao dia',
        duration: '4-8 semanas',
        properties: 'Cicatrizante, anti-inflamat\u00f3rio, protetor de mucosa',
        evidenceLevel: 'Baixa',
      },
      {
        plant: 'Marshmallow (Althaea officinalis)',
        partUsed: 'Ra\u00edzes',
        dosage: '2-5g raiz/dia',
        posology: 'Decoc\u00e7\u00e3o: 1-2g para 150ml. Tomar 3x ao dia',
        duration: '2-4 semanas',
        properties: 'Demulcente (protege mucosa), anti-inflamat\u00f3rio',
        evidenceLevel: 'Baixa',
      },
    ],
    contraindications: [
      {
        substance: 'Aloe Vera (gel)',
        conditions: 'Diarreia, obstru\u00e7\u00e3o intestinal',
        populations: 'Gestantes, lactantes',
        severity: 'Moderada',
        mechanism: 'L\u00e1tex de aloe (diferente do gel) tem efeito laxante',
      },
      {
        substance: 'Marshmallow',
        conditions: 'Diabetes (pode interferir com controle glic\u00eamico)',
        populations: 'Seguran\u00e7a estabelecida',
        severity: 'Baixa',
        mechanism: 'Poss\u00edvel redu\u00e7\u00e3o de absor\u00e7\u00e3o de glicose',
      },
    ],
    drugInteractions: [
      {
        herb: 'Aloe Vera',
        drugs: 'Hipoglic\u00eamiantes orais, insulina',
        severity: 'Moderada',
        mechanism: 'Pode potencializar efeito hipoglicemiante',
        management: 'Monitorar glicemia',
        cypInvolvement: 'N\u00e3o',
      },
      {
        herb: 'Marshmallow',
        drugs: 'Medicamentos orais (geral)',
        severity: 'Baixa-Moderada',
        mechanism: 'Mucilagem pode reduzir absor\u00e7\u00e3o',
        management: 'Distanciar administra\u00e7\u00e3o em 1-2 horas',
        cypInvolvement: 'N\u00e3o',
      },
    ],
    observations: 'Elevar cabeceira da cama, evitar refei\u00e7\u00f5es 2-3h antes de deitar, reduzir café/\u00e1lcool/gorduras. IBPs (omeprazol) s\u00e3o mais eficazes para DRGE moderada/grave. Aloe: usar apenas gel interno da folha (evitar l\u00e1tex amarelo).',
    clinicalMonitoring: 'Se sintomas persistirem >4 semanas ou piorarem, realizar endoscopia digestiva alta.',
  },

  // ─── SISTEMA DIGESTIVO – NOVOS PROTOCOLOS ───────────────────────────────────

  'Diarreia Aguda': {
    category: 'Sistema Digestivo',
    indications: ['Diarreia aguda infecciosa leve', 'Diarreia por estresse', 'Gastroenterite leve'],
    protocol: [
      {
        plant: 'Romã (Punica granatum)',
        partUsed: 'Casca do fruto',
        dosage: '5–10 g casca seca/dia',
        posology: 'Decocção: 5 g em 200 ml, ferver 10 min. Tomar 3–4x ao dia',
        duration: '3–5 dias',
        properties: 'Adstringente, antimicrobiana, antidiarreica',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Guaçatonga (Casearia sylvestris)',
        partUsed: 'Folhas',
        dosage: '3–6 g/dia',
        posology: 'Infusão: 1–2 colheres de chá em 200 ml, 3x ao dia',
        duration: '3–5 dias',
        properties: 'Antidiarreica, anti-inflamatória intestinal',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Romã', conditions: 'Gastrite severa', populations: 'Crianças < 6 anos', severity: 'Baixa', mechanism: 'Taninos podem irritar mucosa gástrica irritada' },
    ],
    drugInteractions: [
      { herb: 'Romã', drugs: 'Antibióticos orais', severity: 'Baixa', mechanism: 'Taninos podem reduzir levemente a biodisponibilidade', management: 'Separar por 2 h', cypInvolvement: 'Não' },
    ],
    observations: 'Reidratação oral é prioritária. Procurar médico se febre alta, sangue nas fezes ou > 48 h de duração.',
    clinicalMonitoring: 'Monitorar sinais de desidratação: sede intensa, urina escura.',
  },

  'Síndrome do Intestino Irritável (SII)': {
    category: 'Sistema Digestivo',
    indications: ['SII com predominância de dor', 'SII mista', 'Cólon espástico', 'Distúrbios funcionais intestinais'],
    protocol: [
      {
        plant: 'Hortelã-pimenta (Mentha piperita)',
        partUsed: 'Óleo essencial das folhas',
        dosage: '0,2–0,4 ml óleo essencial/dose',
        posology: 'Cápsulas entéricas: 1–2 cápsulas 3x ao dia, 30 min antes das refeições',
        duration: '4–8 semanas',
        properties: 'Antiespasmódica, carminativa, analgésica visceral',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Funcho (Foeniculum vulgare)',
        partUsed: 'Sementes',
        dosage: '5–7 g sementes/dia',
        posology: 'Infusão: 1 colher de chá em 150 ml, 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Carminativo, antiespasmódico, digestivo',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Hortelã', conditions: 'DRGE ativa', populations: 'Gestantes no 1° trimestre', severity: 'Moderada', mechanism: 'Relaxamento do esfíncter esofágico inferior' },
    ],
    drugInteractions: [
      { herb: 'Hortelã', drugs: 'Ciclosporina', severity: 'Moderada', mechanism: 'Inibição CYP3A4 pode elevar níveis séricos', management: 'Monitorar níveis da ciclosporina', cypInvolvement: 'CYP3A4' },
    ],
    observations: 'Dieta low-FODMAP associada melhora resultados. Gerenciamento do estresse é fundamental.',
    clinicalMonitoring: 'Reavaliar a cada 4 semanas. Investigar doença inflamatória intestinal se sintomas graves.',
  },

  'Doença Hepática / Hepatoproteção': {
    category: 'Sistema Digestivo',
    indications: ['Hepatite alcoólica leve', 'Esteatose hepática', 'Hepatopatia medicamentosa', 'Proteção hepática preventiva'],
    protocol: [
      {
        plant: 'Cardo-mariano (Silybum marianum)',
        partUsed: 'Sementes',
        dosage: '420 mg silibinina/dia (extrato padronizado a 70–80%)',
        posology: 'Extrato: 140 mg 3x ao dia com refeições',
        duration: '3–6 meses',
        properties: 'Hepatoprotetor, antioxidante, regenerador hepatocitário',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Alcachofra (Cynara scolymus)',
        partUsed: 'Folhas',
        dosage: '600–1800 mg extrato/dia',
        posology: 'Extrato seco: 300–600 mg 3x ao dia antes das refeições',
        duration: '6–12 semanas',
        properties: 'Colerético, hepatoprotetor, hipolipemiante',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Cardo-mariano', conditions: 'Obstrução biliar', populations: 'Gestantes (cautela)', severity: 'Moderada', mechanism: 'Estímulo ao fluxo biliar pode agravar obstrução' },
      { substance: 'Alcachofra', conditions: 'Cálculos biliares ativos', populations: 'Alérgicos a Asteraceae', severity: 'Moderada', mechanism: 'Efeito colerético' },
    ],
    drugInteractions: [
      { herb: 'Cardo-mariano', drugs: 'Estatinas, Tacrolimus', severity: 'Moderada', mechanism: 'Inibição CYP3A4/CYP2C9', management: 'Monitorar níveis séricos dos fármacos', cypInvolvement: 'CYP3A4, CYP2C9' },
    ],
    observations: 'Evitar álcool durante tratamento. Dieta hipocalórica nas esteatoses. Não substituir tratamento etiológico.',
    clinicalMonitoring: 'Dosagem de enzimas hepáticas (TGO/TGP) a cada 4–8 semanas.',
  },

  'Parasitoses Intestinais': {
    category: 'Sistema Digestivo',
    indications: ['Prevenção de parasitoses', 'Adjuvante no tratamento de helmintos', 'Giardíase leve'],
    protocol: [
      {
        plant: 'Alho (Allium sativum)',
        partUsed: 'Bulbo fresco ou extrato',
        dosage: '1–3 dentes frescos/dia ou 600–900 mg extrato envelhecido/dia',
        posology: 'Fresco: amassado e ingerir em jejum. Extrato: 300 mg 2–3x ao dia',
        duration: '4–6 semanas',
        properties: 'Antiparasitária, antimicrobiana',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Papaia / Mamão (Carica papaya)',
        partUsed: 'Sementes',
        dosage: '1–2 colheres de sopa de sementes frescas/dia',
        posology: 'Sementes trituradas em suco de leite de coco ou iogurte, em jejum, por 7 dias',
        duration: '7 dias por ciclo',
        properties: 'Antiparasitária (carpaina, papaína)',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Alho', conditions: 'Cirurgia programada', populations: 'Pacientes em anticoagulação', severity: 'Alta', mechanism: 'Efeito antiagregante plaquetário' },
      { substance: 'Mamão (sementes)', conditions: 'Hepatopatia grave', populations: 'Gestantes', severity: 'Moderada', mechanism: 'Carpaina pode ser embriotóxica' },
    ],
    drugInteractions: [
      { herb: 'Alho', drugs: 'Varfarina, Antiagregantes', severity: 'Alta', mechanism: 'Potencializa ação anticoagulante', management: 'Monitorar INR, evitar uso concomitante', cypInvolvement: 'CYP2C9 (inibição)' },
    ],
    observations: 'Não substituir antiparasitários convencionais em infestações moderadas/intensas ou em crianças. Higiene das mãos e dos alimentos é a medida mais eficaz.',
    clinicalMonitoring: 'Exame parasitológico de fezes antes e 30 dias após o tratamento.',
  },

  // ─── SISTEMA CARDIOVASCULAR – NOVOS PROTOCOLOS ──────────────────────────────

  'Insuficiência Venosa e Varizes': {
    category: 'Sistema Cardiovascular',
    indications: ['Insuficiência venosa crônica leve/moderada', 'Varizes', 'Edema de MMII', 'Sensação de pernas pesadas'],
    protocol: [
      {
        plant: 'Castanha-da-índia (Aesculus hippocastanum)',
        partUsed: 'Extrato padronizado da semente',
        dosage: '300 mg extrato padronizado (16–20% escina) 2x ao dia',
        posology: 'Cápsulas: 1 cápsula de 300 mg manhã e noite (com refeições)',
        duration: '3–6 meses',
        properties: 'Venotônica, antiexsudativa, anti-inflamatória vascular',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Ginkgo biloba',
        partUsed: 'Folhas (extrato EGb 761)',
        dosage: '120–240 mg extrato padronizado/dia',
        posology: '40–80 mg 3x ao dia com refeições',
        duration: '3–6 meses',
        properties: 'Vasodilatador periférico, antioxidante, antiagregante',
        evidenceLevel: 'Média-Alta',
      },
    ],
    contraindications: [
      { substance: 'Castanha-da-índia', conditions: 'Insuficiência renal/hepática grave', populations: 'Gestantes, lactantes', severity: 'Moderada', mechanism: 'Ausência de dados de segurança' },
      { substance: 'Ginkgo', conditions: 'Cirurgia programada, distúrbios hemorrágicos', populations: 'Crianças < 12 anos', severity: 'Alta', mechanism: 'Inibição do PAF (fator de ativação plaquetária)' },
    ],
    drugInteractions: [
      { herb: 'Ginkgo', drugs: 'Anticoagulantes (varfarina, apixabana)', severity: 'Alta', mechanism: 'Inibição plaquetária aditiva', management: 'Evitar combinação; monitorar INR', cypInvolvement: 'CYP2C19 (inibição leve)' },
    ],
    observations: 'Meias de compressão melhoram os resultados. Elevar membros inferiores ao repouso. Evitar períodos longos em pé ou sentado.',
    clinicalMonitoring: 'Avaliar resposta clínica (edema, dor) a cada 6 semanas.',
  },

  'Colesterol e Triglicerídeos Elevados': {
    category: 'Sistema Cardiovascular',
    indications: ['Hipercolesterolemia leve a moderada', 'Hipertrigliceridemia', 'Dislipidemia mista', 'Síndrome metabólica'],
    protocol: [
      {
        plant: 'Berberina (Berberis vulgaris)',
        partUsed: 'Caule e raiz',
        dosage: '900–1500 mg berberina/dia',
        posology: '500 mg 2–3x ao dia antes das refeições',
        duration: '3–6 meses',
        properties: 'Hipolipemiante, hipoglicemiante, cardioprotetor',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Óleo de peixe / Ômega-3 (fontes vegetais: chia, linhaça)',
        partUsed: 'Sementes (linhaça, chia)',
        dosage: '2–4 g EPA+DHA/dia (ou 20–30 g sementes)',
        posology: '2 colheres de sopa de linhaça moída ou chia. Cápsulas de ômega-3: 1–2 caps 3x ao dia com refeição',
        duration: 'Uso prolongado',
        properties: 'Redução de triglicerídeos, anti-inflamatório, cardioprotetor',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Berberina', conditions: 'Insuficiência hepática', populations: 'Gestantes, lactantes, crianças', severity: 'Alta', mechanism: 'Não estudado nessas populações' },
    ],
    drugInteractions: [
      { herb: 'Berberina', drugs: 'Metformina, Estatinas', severity: 'Moderada', mechanism: 'Efeitos aditivos hipoglicemiante e hipolipemiante', management: 'Monitorar glicemia e enzimas hepáticas', cypInvolvement: 'CYP3A4 (inibição)' },
    ],
    observations: 'Dieta mediterrânea e exercício físico são complementos essenciais. Monitorar lipidograma a cada 3 meses.',
    clinicalMonitoring: 'Lipidograma e glicemia de 3 em 3 meses. TGP/TGO antes e durante o uso de berberina.',
  },

  'Aterosclerose e Prevenção Cardiovascular': {
    category: 'Sistema Cardiovascular',
    indications: ['Prevenção primária cardiovascular', 'Síndrome metabólica', 'Inflamação vascular crônica'],
    protocol: [
      {
        plant: 'Resveratrol (Vitis vinifera / casca de uva)',
        partUsed: 'Extrato da casca e semente de uva',
        dosage: '150–500 mg/dia',
        posology: 'Extrato padronizado: 150–250 mg 2x ao dia com refeições',
        duration: '3–6 meses',
        properties: 'Antioxidante, anti-inflamatório vascular, cardioprotetor',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Alho (Allium sativum)',
        partUsed: 'Bulbo',
        dosage: '600–1200 mg extrato envelhecido/dia',
        posology: 'Extrato envelhecido: 300 mg 2–4x ao dia',
        duration: 'Uso prolongado (mín. 12 semanas)',
        properties: 'Anti-hipertensivo, antiagregante, hipolipemiante',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Extrato semente de uva', conditions: 'Distúrbios hemorrágicos', populations: 'Gestantes', severity: 'Moderada', mechanism: 'Potencial efeito antiagregante' },
    ],
    drugInteractions: [
      { herb: 'Alho', drugs: 'Varfarina, Clopidogrel', severity: 'Alta', mechanism: 'Potencializa anticoagulação', management: 'Monitorar INR; evitar forte suplementação', cypInvolvement: 'CYP2C9' },
    ],
    observations: 'Não substituir estatinas quando indicadas. Estilo de vida (dieta, exercício, não fumar) é insubstituível.',
    clinicalMonitoring: 'Lipidograma, proteína C-reativa e pressão arterial trimestralmente.',
  },

  // ─── SISTEMA NERVOSO – NOVOS PROTOCOLOS ─────────────────────────────────────

  'Transtorno de Déficit de Atenção (TDAH) – Suporte': {
    category: 'Sistema Nervoso',
    indications: ['Dificuldade de concentração leve', 'Foco mental reduzido', 'Fadiga cognitiva'],
    protocol: [
      {
        plant: 'Bacopa (Bacopa monnieri)',
        partUsed: 'Partes aéreas',
        dosage: '300–450 mg extrato padronizado (45% bacosídeos)/dia',
        posology: 'Extrato: 150 mg 2–3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Neuroprotetor, melhoria da memória, ansiolítico leve',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Ginkgo biloba',
        partUsed: 'Folhas',
        dosage: '120–240 mg/dia',
        posology: '40–80 mg 3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Melhoria circulação cerebral, neuroprotetor',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Bacopa', conditions: 'Hipotireoidismo não tratado', populations: 'Gestantes (dados insuficientes)', severity: 'Moderada', mechanism: 'Possível interferência hormonal tireoidiana' },
    ],
    drugInteractions: [
      { herb: 'Ginkgo', drugs: 'Metilfenidato', severity: 'Baixa-Moderada', mechanism: 'Possível efeito aditivo sobre SNC', management: 'Monitorar resposta clínica', cypInvolvement: 'Não' },
    ],
    observations: 'Deve ser usado apenas como suporte complementar. Não substitui avaliação neuropsiquiátrica ou tratamento farmacológico quando necessário.',
    clinicalMonitoring: 'Avaliação neuropsicológica basal e após 8 semanas.',
  },

  'Demência / Declínio Cognitivo (Prevenção)': {
    category: 'Sistema Nervoso',
    indications: ['Prevenção do declínio cognitivo', 'Comprometimento cognitivo leve', 'Suporte na doença de Alzheimer inicial (adjuvante)'],
    protocol: [
      {
        plant: 'Ginkgo biloba',
        partUsed: 'Folhas (EGb 761)',
        dosage: '240 mg/dia (extrato padronizado)',
        posology: 'Extrato EGb 761: 120 mg 2x ao dia com refeições',
        duration: '24 semanas ou mais',
        properties: 'Neuroprotetor, vasodilatador cerebral, antioxidante',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Cúrcuma (Curcuma longa)',
        partUsed: 'Rizoma',
        dosage: '500–1500 mg curcumina/dia',
        posology: 'Extrato com piperina:  500 mg 2–3x ao dia com refeições gordurosas',
        duration: 'Uso prolongado',
        properties: 'Neuroprotetor, anti-inflamatório, antioxidante neurológico',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Ginkgo', conditions: 'Tendência hemorrágica', populations: 'Crianças < 12 anos', severity: 'Alta', mechanism: 'Efeito antiagregante plaquetário' },
    ],
    drugInteractions: [
      { herb: 'Ginkgo', drugs: 'Anticoagulantes, AAS', severity: 'Alta', mechanism: 'Efeito antiagregante aditivo', management: 'Monitorar coagulação', cypInvolvement: 'CYP2C19' },
    ],
    observations: 'Atividade física, sono e estimulação cognitiva são complementos essenciais. Não substituir tratamento farmacológico quando indicado.',
    clinicalMonitoring: 'Miniexame do estado mental (MEEM) a cada 6 meses.',
  },

  'Fibromialgia e Dor Crônica Difusa': {
    category: 'Sistema Nervoso',
    indications: ['Fibromialgia', 'Dor crônica difusa', 'Fadiga crônica associada'],
    protocol: [
      {
        plant: 'Griffonia (Griffonia simplicifolia)',
        partUsed: 'Sementes',
        dosage: '100–300 mg 5-HTP/dia',
        posology: '50–100 mg 3x ao dia (começar com dose baixa; tomar 30 min antes das refeições)',
        duration: '8–12 semanas',
        properties: 'Precursor de serotonina, analgésico central, melhoria do sono',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Valeriana (Valeriana officinalis)',
        partUsed: 'Raízes e rizomas',
        dosage: '300–600 mg extrato/dia',
        posology: 'Extrato: 300 mg 2x ao dia; 600 mg à noite',
        duration: '4–8 semanas',
        properties: 'Miorrelaxante, ansiolítica, melhora qualidade do sono',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Griffonia / 5-HTP', conditions: 'Síndrome serotoninérgica (risco)', populations: 'Gestantes', severity: 'Alta', mechanism: 'Excesso serotonérgico com antidepressivos' },
    ],
    drugInteractions: [
      { herb: 'Griffonia / 5-HTP', drugs: 'ISRS, IRSN, IMAOs, Tramadol', severity: 'Muito Alta', mechanism: 'Risco de síndrome serotoninérgica', management: 'CONTRAINDICADO em uso concomitante', cypInvolvement: 'Não' },
    ],
    observations: 'Exercício aeróbico leve e psicoterapia (TCC) são companentes centrais do tratamento. Avaliação reumatológica obrigatória.',
    clinicalMonitoring: 'Escalas de dor (EVA) e sono a cada 4 semanas.',
  },

  // ─── SISTEMA RESPIRATÓRIO – NOVOS PROTOCOLOS ────────────────────────────────

  'Asma Brônquica Leve (Adjuvante)': {
    category: 'Sistema Respiratório',
    indications: ['Asma brônquica leve', 'Sibilância leve recorrente', 'Tosse asmática'],
    protocol: [
      {
        plant: 'Guaco (Mikania glomerata)',
        partUsed: 'Folhas',
        dosage: '1,5–4,5 g folhas/dia',
        posology: 'Xarope fitoterápico: 5–15 ml 3x ao dia. Infusão: 1,5 g/150 ml, 3x ao dia',
        duration: '4–8 semanas',
        properties: 'Broncodilatador, expectorante, anti-inflamatório brônquico',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Pycnogenol (Pinus maritima)',
        partUsed: 'Casca do pinheiro marítimo',
        dosage: '100–200 mg/dia',
        posology: 'Extrato: 50–100 mg 2x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Anti-inflamatório respiratório, antioxidante',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Guaco', conditions: 'Sangramento ativo, hepatopatia', populations: 'Gestantes, anticoagulados', severity: 'Alta', mechanism: 'Cumarina anticoagulante' },
    ],
    drugInteractions: [
      { herb: 'Guaco', drugs: 'Varfarina, AAS, heparinas', severity: 'Alta', mechanism: 'Potencializa anticoagulação pela cumarina', management: 'Evitar combinação; monitorar INR', cypInvolvement: 'Não' },
    ],
    observations: 'NUNCA substituir broncodilatadores de resgate ou corticoides inalatórios. Usar como adjuvante em asma bem controlada.',
    clinicalMonitoring: 'Monitorar função pulmonar (PFE / VEF1) e frequência de exacerbações.',
  },

  'Bronquite Crônica / DPOC Leve (Adjuvante)': {
    category: 'Sistema Respiratório',
    indications: ['Bronquite crônica', 'DPOC leve', 'Tosse produtiva crônica', 'Inflamação brônquica persistente'],
    protocol: [
      {
        plant: 'Hera (Hedera helix)',
        partUsed: 'Folhas',
        dosage: '700 mg extrato seco/dia',
        posology: 'Xarope padronizado: 5–10 ml 2–3x ao dia',
        duration: '3–5 semanas',
        properties: 'Mucolítica, broncodilatadora, antitussígena',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Serratiopeptidase (fonte: bioflavonoides + enzima)',
        partUsed: 'Enzima (complemento)',
        dosage: '5–10 mg/dia',
        posology: 'Cápsula entérica: 5–10 mg em jejum',
        duration: '4–6 semanas',
        properties: 'Mucolítica, anti-inflamatória',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Hera', conditions: 'Alergia à planta', populations: 'Crianças < 2 anos', severity: 'Moderada', mechanism: 'Saponinas podem causar irritação' },
    ],
    drugInteractions: [
      { herb: 'Hera', drugs: 'Corticoides inalatórios', severity: 'Baixa', mechanism: 'Efeito aditivo anti-inflamatório', management: 'Pode ser benéfico, monitorar', cypInvolvement: 'Não' },
    ],
    observations: 'Parar de fumar é a medida mais eficaz. Reabilitação pulmonar e vacinação são essenciais.',
    clinicalMonitoring: 'Espirometria a cada 6 meses.',
  },

  'Rinite Alérgica': {
    category: 'Sistema Respiratório',
    indications: ['Rinite alérgica sazonal', 'Rinite alérgica perene', 'Polinose'],
    protocol: [
      {
        plant: 'Butterbur / Petasites (Petasites hybridus)',
        partUsed: 'Rizoma (extrato isento de alcaloides pirrolizidínicos)',
        dosage: '50–75 mg extrato 2x ao dia',
        posology: 'Extrato padronizado (sem APs): 50 mg 2x ao dia com refeições',
        duration: '2–4 semanas (sintomático)',
        properties: 'Anti-histamínico natural, anti-inflamatório',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Quercetina (fontes: cebola, maçã, Sophora japonica)',
        partUsed: 'Extrato padronizado',
        dosage: '500–1000 mg/dia',
        posology: 'Extrato: 250–500 mg 2x ao dia 20 min antes das refeições',
        duration: '4–8 semanas',
        properties: 'Anti-histamínico, estabilizador de mastócitos, anti-inflamatório',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Butterbur', conditions: 'Doença hepática', populations: 'Gestantes, lactantes, crianças', severity: 'Alta', mechanism: 'Uso apenas de extrato PA-free; o produto bruto é hepatotóxico' },
    ],
    drugInteractions: [
      { herb: 'Quercetina', drugs: 'Ciclosporina, Felodipin', severity: 'Moderada', mechanism: 'Inibição de CYP3A4', management: 'Monitorar níveis séricos', cypInvolvement: 'CYP3A4' },
    ],
    observations: 'Controle ambiental de alérgenos é prioritário. Imunoterapia para casos moderados/graves.',
    clinicalMonitoring: 'Avaliar sintomas (RQLQ) antes e após 4 semanas.',
  },

  // ─── SISTEMA IMUNOLÓGICO – NOVOS PROTOCOLOS ─────────────────────────────────

  'Doenças Autoimunes – Modulação Imune': {
    category: 'Sistema Imunológico',
    indications: ['Lúpus (adjuvante leve)', 'Artrite reumatoide (adjuvante)', 'Tireoidite de Hashimoto'],
    protocol: [
      {
        plant: 'Cúrcuma (Curcuma longa)',
        partUsed: 'Rizoma',
        dosage: '500–1000 mg curcumina/dia',
        posology: 'Extrato com piperina: 500 mg 2x ao dia com refeições',
        duration: '3–6 meses',
        properties: 'Imunomodulador, anti-inflamatório (NF-κB)',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Astragalus (Astragalus membranaceus)',
        partUsed: 'Raiz',
        dosage: '9–30 g raiz/dia (ou 500–1000 mg extrato)',
        posology: 'Extrato: 500 mg 2x ao dia',
        duration: '8–12 semanas',
        properties: 'Imunomodulador adaptogênico',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Astragalus', conditions: 'Doenças autoimunes ativas graves (pode estimular)', populations: 'Transplantados', severity: 'Alta', mechanism: 'Imunoestimulação pode piorar autoimunidade ativa' },
    ],
    drugInteractions: [
      { herb: 'Astragalus', drugs: 'Imunossupressores (ciclosporina, metotrexato)', severity: 'Alta', mechanism: 'Antagonismo do efeito imunossupressor', management: 'EVITAR combinação', cypInvolvement: 'Não' },
    ],
    observations: 'Em doenças autoimunes ativas, qualquer planta imunoestimulante deve ser evitada. Usar apenas sob supervisão médica.',
    clinicalMonitoring: 'Marcadores inflamatórios (PCR, VHS) e atividade da doença a cada 4 semanas.',
  },

  'Infecções Virais Recorrentes': {
    category: 'Sistema Imunológico',
    indications: ['Herpes recorrente', 'Infecções virais repetitivas', 'Reativação viral (HPV adjuvante)'],
    protocol: [
      {
        plant: 'Melissa (Melissa officinalis)',
        partUsed: 'Folhas',
        dosage: '1–4 g folhas secas/dia (creme tópico para herpes labial)',
        posology: 'Infusão: 1–2 g/150 ml, 3x ao dia. Creme 1%: aplicar na lesão 2–4x ao dia',
        duration: '7–14 dias (herpético) / contínuo para prevenção',
        properties: 'Antiviral (herpes simplex), imunomoduladora',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Própolis Verde Brasileiro',
        partUsed: 'Extrato padronizado',
        dosage: '200–400 mg extrato/dia',
        posology: 'Extrato: 200 mg 2x ao dia ou tintura 30 gotas 3x ao dia',
        duration: 'Uso prolongado (preventivo)',
        properties: 'Antiviral, imunoestimulante, antimicrobiana',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Própolis', conditions: 'Hipersensibilidade a produtos de abelha', populations: 'Asmáticos atópicos', severity: 'Alta', mechanism: 'Reações alérgicas graves' },
    ],
    drugInteractions: [
      { herb: 'Própolis', drugs: 'Antivirais (aciclovir)', severity: 'Baixa', mechanism: 'Efeito potencialmente sinérgico (não estudado)', management: 'Monitorar resposta clínica', cypInvolvement: 'Não' },
    ],
    observations: 'Gerenciar estresse, dormir bem e evitar exposição solar excessiva reduzem reativações do herpes.',
    clinicalMonitoring: 'Frequência/duração dos surtos mensalmente.',
  },

  // ─── SISTEMA METABÓLICO – NOVOS PROTOCOLOS ──────────────────────────────────

  'Obesidade e Controle de Peso': {
    category: 'Sistema Metabólico',
    indications: ['Excesso de peso', 'Obesidade leve/moderada', 'Síndrome metabólica', 'Compulsão alimentar'],
    protocol: [
      {
        plant: 'Garcinia cambogia',
        partUsed: 'Casca do fruto (HCA)',
        dosage: '1500–3000 mg HCA/dia',
        posology: 'Extrato: 500–1000 mg 30 min antes das principais refeições',
        duration: '8–12 semanas',
        properties: 'Inibição lipogênese, redução do apetite',
        evidenceLevel: 'Baixa-Média',
      },
      {
        plant: 'Chá verde (Camellia sinensis)',
        partUsed: 'Folhas não fermentadas',
        dosage: '400–800 mg extrato (50% EGCG)/dia',
        posology: 'Extrato: 200–400 mg 2x ao dia antes das refeições OU 3–5 xícaras ao dia',
        duration: 'Uso prolongado',
        properties: 'Termogênico leve, antioxidante, inibição de lipase pancreática',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Garcinia', conditions: 'Hepatopatia', populations: 'Gestantes, diabéticos em hipoglicemiantes', severity: 'Moderada', mechanism: 'Casos raros de hepatotoxicidade' },
      { substance: 'Chá verde (alta dose)', conditions: 'Insônia, ansiedade', populations: 'Cardiopatas, hipertensos', severity: 'Moderada', mechanism: 'Cafeína: taquicardia, hipertensão' },
    ],
    drugInteractions: [
      { herb: 'Chá verde', drugs: 'Varfarina, adenosina, betabloqueadores', severity: 'Moderada', mechanism: 'Antagonismo de varfarina (vitamina K); interação beta', management: 'Monitorar INR e PA', cypInvolvement: 'CYP1A2' },
    ],
    observations: 'Dieta hipocalórica e exercício físico são insubstituíveis. Não usar como única estratégia de emagrecimento.',
    clinicalMonitoring: 'Peso, IMC e circunferência abdominal mensalmente. Enzimas hepáticas se usar Garcinia.',
  },

  'Hipotireoidismo (Suporte Nutricional)': {
    category: 'Sistema Metabólico',
    indications: ['Hipotireoidismo autoimune (Hashimoto) – suporte', 'Deficiência subclínica de micronutrientes tireoidianos'],
    protocol: [
      {
        plant: 'Ashwagandha (Withania somnifera)',
        partUsed: 'Raiz',
        dosage: '300–600 mg extrato (5% witanolídeos)/dia',
        posology: 'Extrato: 300 mg 2x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Adaptogênica, pode modular TSH/T4 levemente',
        evidenceLevel: 'Baixa-Média',
      },
      {
        plant: 'Selênio (fontes: castanha-do-pará)',
        partUsed: 'Noz (castanha-do-pará)',
        dosage: '1–2 castanhas ao dia (~100–200 µg selênio/dia)',
        posology: '1–2 castanhas-do-pará pela manhã, antes do desjejum',
        duration: 'Uso contínuo com monitoramento',
        properties: 'Suporte à conversão T4→T3, antioxidante tireoidiano',
        evidenceLevel: 'Média-Alta',
      },
    ],
    contraindications: [
      { substance: 'Ashwagandha', conditions: 'Hipertireoidismo ativo', populations: 'Gestantes (cautela)', severity: 'Moderada', mechanism: 'Pode estimular tireoide' },
      { substance: 'Castanha-do-pará (excesso)', conditions: 'Selenose (> 400 µg/dia)', populations: 'Todos (dose-dependente)', severity: 'Alta', mechanism: 'Excesso de selênio é tóxico' },
    ],
    drugInteractions: [
      { herb: 'Ashwagandha', drugs: 'Levotiroxina', severity: 'Baixa-Moderada', mechanism: 'Pode alterar necessidade de dose', management: 'Monitorar TSH após iniciar suplementação', cypInvolvement: 'Não' },
    ],
    observations: 'NÃO substituir levotiroxina. Suporte apenas para reduzir inflamação autoimune. Dosar TSH, T4L e anti-TPO regratamente.',
    clinicalMonitoring: 'TSH e T4 livre a cada 6–8 semanas.',
  },

  'Gota e Hiperuricemia': {
    category: 'Sistema Metabólico',
    indications: ['Hiperuricemia assintomática', 'Crise gotosa (prevenção e adjuvante)', 'Cálculos de urato'],
    protocol: [
      {
        plant: 'Cereja (Prunus avium)',
        partUsed: 'Fruto (concentrado)',
        dosage: '8–12 cerejas frescas/dia ou 400 mg extrato 2x ao dia',
        posology: 'Suco concentrado: 30 ml 2x ao dia; Extrato: 1 cápsula 2x ao dia',
        duration: '4–8 semanas',
        properties: 'Redução de ácido úrico, anti-inflamatória (antocianinas)',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Água de Coco (Cocos nucifera)',
        partUsed: 'Água do fruto',
        dosage: '300–400 ml/dia',
        posology: 'Beber 200 ml em jejum e 200 ml à tarde',
        duration: 'Uso contínuo',
        properties: 'Alcalinizante urinário, diurético natural, hidratante',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Cereja concentrada (açucarada)', conditions: 'Diabetes não controlado', populations: 'Diabéticos', severity: 'Moderada', mechanism: 'Carga glicêmica elevada nas formas com açúcar adicionado' },
    ],
    drugInteractions: [
      { herb: 'Cereja', drugs: 'Alopurinol', severity: 'Baixa', mechanism: 'Efeito aditivo na redução do ácido úrico', management: 'Pode ser benéfico; monitorar uricemia', cypInvolvement: 'Não' },
    ],
    observations: 'Evitar purinas (carnes vermelhas, frutos do mar, cerveja). Hidratação abundante é essencial. Allopurinol não deve ser suspenso nas crises.',
    clinicalMonitoring: 'Ácido úrico sérico mensalmente no início; creatinina trimestralmente.',
  },

  // ─── SISTEMA MUSCULOESQUELÉTICO – NOVOS PROTOCOLOS ──────────────────────────

  'Artrite Reumatoide – Inflamação Crônica (Adjuvante)': {
    category: 'Sistema Musculoesquelético',
    indications: ['Artrite reumatoide', 'Artrite psoriásica', 'Poliartrite inflamatória'],
    protocol: [
      {
        plant: 'Boswellia (Boswellia serrata)',
        partUsed: 'Oleorresina',
        dosage: '300–1200 mg extrato (65% ácidos boswélicos) 2–3x ao dia',
        posology: 'Extrato: 300–400 mg 3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Anti-inflamatório (inibição de 5-lipoxigenase)',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Cúrcuma (Curcuma longa)',
        partUsed: 'Rizoma (curcumina + piperina)',
        dosage: '500 mg curcumina + 5 mg piperina, 3x ao dia',
        posology: 'Cápsulas: 1–2 cáps com refeição 3x ao dia',
        duration: '3–6 meses',
        properties: 'Anti-inflamatório (NF-κB, COX-2), antioxidante articular',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Boswellia', conditions: 'Sangramento gastrintestinal', populations: 'Gestantes', severity: 'Moderada', mechanism: 'Inibição parcial da COX' },
    ],
    drugInteractions: [
      { herb: 'Cúrcuma', drugs: 'AINEs, Metotrexato', severity: 'Moderada', mechanism: 'Efeito anti-inflamatório aditivo; cúrcuma pode alterar farmacocinética', management: 'Monitorar função renal/hepática', cypInvolvement: 'CYP1A2, CYP3A4' },
    ],
    observations: 'Não substituir DMARDs (metotrexato, leflunomida). Adjuvante comprovado para reduzir dor e inflamação.',
    clinicalMonitoring: 'PCR, VHS, contagem articular a cada 4–8 semanas.',
  },

  'Osteoporose – Suporte Ósseo': {
    category: 'Sistema Musculoesquelético',
    indications: ['Osteoporose pós-menopausa', 'Osteopenia', 'Risco aumentado de fraturas'],
    protocol: [
      {
        plant: 'Isoflavonas de soja (Glycine max)',
        partUsed: 'Grão (extrato)',
        dosage: '40–80 mg isoflavonas/dia',
        posology: 'Extrato padronizado: 40 mg 1–2x ao dia com refeições',
        duration: '12–24 semanas',
        properties: 'Fitoestrógeno, proteção óssea, redução reabsorção',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Cavalinha (Equisetum arvense)',
        partUsed: 'Partes aéreas',
        dosage: '1–4 g planta seca/dia',
        posology: 'Decocção: 2–3 g em 200 ml fervidos, 2x ao dia',
        duration: '4–8 semanas',
        properties: 'Remineralizante (sílica orgânica), fortalecimento ósseo',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Isoflavonas', conditions: 'Câncer de mama hormônio-dependente (histórico)', populations: 'Cautela em mulheres com histórico familiar de Ca de mama', severity: 'Alta', mechanism: 'Atividade estrogênica' },
      { substance: 'Cavalinha', conditions: 'Edema cardíaco ou renal', populations: 'Crianças', severity: 'Moderada', mechanism: 'Efeito diurético' },
    ],
    drugInteractions: [
      { herb: 'Isoflavonas', drugs: 'Tamoxifeno, Anastrozol', severity: 'Alta', mechanism: 'Pode antagonizar efeito antiestrogênico', management: 'CONTRAINDICADO em pacientes em hormonoterapia', cypInvolvement: 'CYP1A2' },
    ],
    observations: 'Suplementação de cálcio e vitamina D são insubstituíveis. Exercícios com carga são essenciais para saúde óssea.',
    clinicalMonitoring: 'Densitometria óssea (DEXA) anual.',
  },

  'Lombalgia e Tensão Muscular': {
    category: 'Sistema Musculoesquelético',
    indications: ['Lombalgia crônica', 'Tensão muscular', 'Mialgia difusa', 'Dor lombar inespecífica'],
    protocol: [
      {
        plant: 'Arnica (Arnica montana)',
        partUsed: 'Capítulos florais (uso TÓPICO)',
        dosage: 'Gel/pomada 2–4% aplicar 2–4x ao dia sobre área afetada',
        posology: 'Tópico: aplicar em camada fina sobre a área dolorosa 3–4x ao dia',
        duration: '2–4 semanas',
        properties: 'Anti-inflamatório, analgésico local, antihematoma',
        evidenceLevel: 'Alta (uso tópico)',
      },
      {
        plant: 'Capsaicina (Capsicum annuum)',
        partUsed: 'Fruto (pimenta)',
        dosage: 'Creme 0,025–0,075% tópico',
        posology: 'Creme: aplicar 3–4x ao dia na área dolorosa. Evitar olhos e mucosas',
        duration: '4–8 semanas (melhora gradual)',
        properties: 'Dessensibilização de nociceptores, analgésico',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Arnica', conditions: 'Pele lesada, feridas abertas', populations: 'USO INTERNO contraindicado (hepatotóxico)', severity: 'Alta', mechanism: 'Intóxico em uso oral: lactonas sesquiterpênicas' },
      { substance: 'Capsaicina', conditions: 'Hipersensibilidade a capsaicina', populations: 'Crianças', severity: 'Moderada', mechanism: 'Irritação cutânea intensa' },
    ],
    drugInteractions: [
      { herb: 'Capsaicina tópica', drugs: 'AINEs orais', severity: 'Baixa', mechanism: 'Mecanismos complementares de analgesia', management: 'Pode potencializar alívio da dor', cypInvolvement: 'Não' },
    ],
    observations: 'Fisioterapia e exercícios de fortalecimento da musculatura paravertebral são fundamentais. Investigar causas secundárias em lombalgia persistente.',
    clinicalMonitoring: 'Escala de dor (EVA) e funcionalidade (ODI) a cada 4 semanas.',
  },

  // ─── SISTEMA URINÁRIO – NOVOS PROTOCOLOS ────────────────────────────────────

  'Litíase Renal (Cálculos)': {
    category: 'Sistema Urinário',
    indications: ['Nefrolitíase (prevenção)', 'Cálculo renal de oxalato de cálcio', 'Cólica renal leve'],
    protocol: [
      {
        plant: 'Pedra-quebrada (Phyllanthus niruri)',
        partUsed: 'Partes aéreas',
        dosage: '3–5 g planta/dia',
        posology: 'Infusão: 1–2 colheres de sopa em 300 ml, 3x ao dia por 3 meses',
        duration: '8–12 semanas',
        properties: 'Litotripsíaca, diurética, antiespamódica ureteral',
        evidenceLevel: 'Média-Alta',
      },
      {
        plant: 'Cavalinha (Equisetum arvense)',
        partUsed: 'Partes aéreas',
        dosage: '2–6 g planta/dia',
        posology: 'Infusão/decocção: 2 g em 200 ml, 3x ao dia',
        duration: '3–4 semanas',
        properties: 'Diurética, remineralizante, anti-inflamatória ureteral',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Pedra-quebrada', conditions: 'Gestação (estímulo uterino teórico)', populations: 'Gestantes, hipoglicemiantes', severity: 'Moderada', mechanism: 'Efeito hipoglicemiante; possível atividade na musculatura lisa' },
    ],
    drugInteractions: [
      { herb: 'Pedra-quebrada', drugs: 'Lítio, diuréticos tiazídicos', severity: 'Moderada', mechanism: 'Aumento de excreção renal pode alterar níveis séricos de lítio', management: 'Monitorar litemida', cypInvolvement: 'Não' },
    ],
    observations: 'Ingestão de 2–3 L de água/dia é a medida mais eficaz. Dieta pobre em oxalato e sal. Investigar tipo de cálculo antes de tratar.',
    clinicalMonitoring: 'Ultrassonografia renal cada 3–6 meses. Calcemia e calciúria.',
  },

  'Incontinência Urinária e Bexiga Hiperativa': {
    category: 'Sistema Urinário',
    indications: ['Bexiga hiperativa', 'Incontinência urinária de urgência', 'Nictúria'],
    protocol: [
      {
        plant: 'Abóbora (Cucurbita pepo) – sementes',
        partUsed: 'Sementes (óleo)',
        dosage: '10 g sementes ou 160 mg extrato lipofílico/dia',
        posology: 'Óleo de sementes: 1 colher de sopa/dia. Extrato: 80 mg 2x ao dia',
        duration: '12 semanas',
        properties: 'Tônico da musculatura do assoalho pélvico, anti-inflamatório vesical',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Soja – isoflavonas (Glycine max)',
        partUsed: 'Grão (extrato)',
        dosage: '40–60 mg isoflavonas/dia',
        posology: 'Extrato: 40 mg 1–2x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Fitoestrógeno, melhora trofismo uretral e vesical',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Isoflavonas', conditions: 'Câncer de mama/endométrio hormônio-dependente', populations: 'Mulheres em hormonoterapia', severity: 'Alta', mechanism: 'Atividade estrogênica' },
    ],
    drugInteractions: [
      { herb: 'Isoflavonas', drugs: 'Tamoxifeno', severity: 'Alta', mechanism: 'Antagonismo da ação antiestrogênica', management: 'CONTRAINDICADO', cypInvolvement: 'Não' },
    ],
    observations: 'Fisioterapia pélvica (Kegel) é a base do tratamento. Restringir cafeína, álcool e líquidos noturnos.',
    clinicalMonitoring: 'Diário miccional (frequência e episódios de urgência) a cada 4 semanas.',
  },

  // ─── SAÚDE DA MULHER – NOVOS PROTOCOLOS ─────────────────────────────────────

  'Endometriose (Adjuvante)': {
    category: 'Saúde da Mulher',
    indications: ['Endometriose estágio I–II', 'Dismenorreia secundária', 'Inflamação pélvica crônica'],
    protocol: [
      {
        plant: 'Cúrcuma (Curcuma longa)',
        partUsed: 'Rizoma',
        dosage: '500 mg curcumina + piperina 3x ao dia',
        posology: 'Cápsulas: 1–2 caps 3x ao dia com refeições',
        duration: '3–6 meses',
        properties: 'Anti-inflamatório (inibição NF-κB, COX-2), inibição de angiogênese ectópica',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Vitex (Vitex agnus-castus)',
        partUsed: 'Frutos',
        dosage: '20–40 mg extrato padronizado/dia',
        posology: 'Extrato: 20–40 mg pela manhã em jejum',
        duration: 'Mínimo 3 ciclos',
        properties: 'Regulador dopaminérgico e hormonal (prolactina, progesterona)',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Vitex', conditions: 'Tumores hormônio-dependentes', populations: 'Gestantes, lactantes', severity: 'Alta', mechanism: 'Atividade hormonal (dopaminérgica)' },
    ],
    drugInteractions: [
      { herb: 'Vitex', drugs: 'Contraceptivos hormonais, dopaminérgicos', severity: 'Alta', mechanism: 'Antagonismo ou interação hormonal', management: 'Não usar concomitantemente sem orientação', cypInvolvement: 'Não' },
    ],
    observations: 'Controle ginecológico regular é obrigatório. Dieta anti-inflamatória (redução de carnes vermelhas, glúten e laticínios) pode ajudar.',
    clinicalMonitoring: 'Avaliação ginecológica e ultrassonografia transvaginal periódica.',
  },

  'Ovário Policístico (SOP) – Suporte Metabólico': {
    category: 'Saúde da Mulher',
    indications: ['Síndrome dos ovários policísticos', 'Resistência insulínica associada a SOP', 'Hiperandrogenismo leve'],
    protocol: [
      {
        plant: 'Berberina (Berberis vulgaris)',
        partUsed: 'Caule e raiz',
        dosage: '500 mg 2–3x ao dia',
        posology: 'Cápsulas: 500 mg antes das refeições',
        duration: '3–6 meses',
        properties: 'Sensibilizador de insulina, regulação hormonal',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Canela (Cinnamomum verum)',
        partUsed: 'Casca',
        dosage: '1–3 g/dia',
        posology: 'Pó: 0,5–1,5 g 2x ao dia com refeições',
        duration: 'Uso prolongado',
        properties: 'Sensibilizador insulínico, regulação do ciclo',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Berberina', conditions: 'Hepatopatia', populations: 'Gestantes, lactantes', severity: 'Alta', mechanism: 'Dados de segurança insuficientes na gestação' },
    ],
    drugInteractions: [
      { herb: 'Berberina', drugs: 'Metformina, contraceptivos hormonais', severity: 'Moderada', mechanism: 'Efeito aditivo hipoglicemiante; possível interferência hormonal', management: 'Monitorar glicemia e ciclo menstrual', cypInvolvement: 'CYP3A4' },
    ],
    observations: 'Redução de peso, exercício e dieta de baixo índice glicêmico são pilares do tratamento. Suplementar mioinositol e ácido fólico quando indicado.',
    clinicalMonitoring: 'Glicemia de jejum, insulina, perfil androgênico a cada 3 meses.',
  },

  'Climatério (Suporte aos Sintomas)': {
    category: 'Saúde da Mulher',
    indications: ['Fogachos moderados', 'Suor noturno', 'Irritabilidade no climatério', 'Ressecamento vaginal leve'],
    protocol: [
      {
        plant: 'Cimicifuga (Cimicifuga racemosa)',
        partUsed: 'Rizoma',
        dosage: '20–40 mg extrato (2,5% glicosídeos triterpênicos)/dia',
        posology: '20 mg 1–2x ao dia com refeições',
        duration: '3–6 meses (máx. 6 meses)',
        properties: 'Redução de fogachos, ansiolítica, atividade serotoninérgica',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Isoflavonas de soja (Glycine max)',
        partUsed: 'Grão (extrato)',
        dosage: '40–80 mg/dia',
        posology: 'Extrato: 40 mg 1–2x ao dia',
        duration: '12–24 semanas',
        properties: 'Fitoestrógeno, redução de fogachos e ressecamento',
        evidenceLevel: 'Média-Alta',
      },
    ],
    contraindications: [
      { substance: 'Cimicifuga', conditions: 'Doença hepática (casos de hepatotoxicidade relatados)', populations: 'Câncer hormônio-dependente (cautela)', severity: 'Moderada', mechanism: 'Possível hepatotoxicidade idiossincrática em raros casos' },
    ],
    drugInteractions: [
      { herb: 'Cimicifuga', drugs: 'Tamoxifeno', severity: 'Moderada', mechanism: 'Possível interferência estrogênica', management: 'Usar com cautela; preferir avaliação oncológica', cypInvolvement: 'CYP2D6 (inibição leve)' },
    ],
    observations: 'Terapia de reposição hormonal permanece padrão-ouro para casos moderados/graves. Estilo de vida ativo reduz sintomas.',
    clinicalMonitoring: 'FSH, E2 e perfil hepático (TGP) a cada 6–8 semanas.',
  },

  // ─── SAÚDE DO HOMEM – NOVOS PROTOCOLOS ──────────────────────────────────────

  'Disfunção Erétil (Suporte)': {
    category: 'Saúde do Homem',
    indications: ['Disfunção erétil de causa vascular/psicogênica leve', 'Suporte à libido masculina'],
    protocol: [
      {
        plant: 'Tribulus (Tribulus terrestris)',
        partUsed: 'Partes aéreas (extrato padronizado)',
        dosage: '750–1500 mg/dia',
        posology: 'Extrato: 250–500 mg 2–3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Androgenogênico leve, vasodilatador',
        evidenceLevel: 'Baixa-Média',
      },
      {
        plant: 'Maca peruana (Lepidium meyenii)',
        partUsed: 'Raiz',
        dosage: '1,5–3 g/dia',
        posology: 'Pó: 1/2–1 colher de chá 2x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Adaptogênica, melhora libido, energia',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Tribulus', conditions: 'Câncer de próstata, hipertrofia prostática severa', populations: 'Crianças e adolescentes', severity: 'Alta', mechanism: 'Possível efeito androgênico pode estimular crescimento prostático' },
    ],
    drugInteractions: [
      { herb: 'Tribulus', drugs: 'Inibidores de PDE5 (sildenafil, tadalafil)', severity: 'Baixa', mechanism: 'Efeito complementar vasodilatador', management: 'Monitorar hipotensão', cypInvolvement: 'Não' },
    ],
    observations: 'Investigar causas cardiovasculares e psicológicas. Estilo de vida (exercício, peso saudável, não fumar) é fundamental.',
    clinicalMonitoring: 'IIEF-5 (questionário) basal e após 8 semanas. Testosterona total e livre.',
  },

  // ─── PELE E DERMATOLOGIA ─────────────────────────────────────────────────────

  'Acne e Seborreia': {
    category: 'Pele e Dermatologia',
    indications: ['Acne vulgar leve/moderada', 'Seborreia', 'Comedões'],
    protocol: [
      {
        plant: 'Bardana (Arctium lappa)',
        partUsed: 'Raiz',
        dosage: '3–6 g raiz seca/dia',
        posology: 'Decocção: 2 colheres de chá em 200 ml, 3x ao dia. Uso oral + compressas tópicas',
        duration: '4–8 semanas',
        properties: 'Depurativa, anti-inflamatória, antimicrobiana',
        evidenceLevel: 'Baixa-Média',
      },
      {
        plant: 'Óleo de tea tree (Melaleuca alternifolia) – TÓPICO',
        partUsed: 'Óleo essencial das folhas',
        dosage: 'Gel/creme com 5 % de óleo essencial',
        posology: 'Aplicar nos locais afetados com algodão 2x ao dia após lavar o rosto',
        duration: '4–8 semanas',
        properties: 'Antimicrobiano (Propionibacterium acnes), anti-inflamatório tópico',
        evidenceLevel: 'Alta (tópico)',
      },
    ],
    contraindications: [
      { substance: 'Bardana', conditions: 'Alergia a Asteraceae', populations: 'Gestantes (dados insuficientes)', severity: 'Baixa', mechanism: 'Reação cruzada com outras Asteraceae' },
      { substance: 'Tea tree (oral)', conditions: 'USO ORAL: tóxico', populations: 'Todos', severity: 'Muito Alta', mechanism: 'Neurotóxico se ingerido' },
    ],
    drugInteractions: [
      { herb: 'Tea tree tópico', drugs: 'Retinóides tópicos', severity: 'Baixa', mechanism: 'Possível irritação cumulativa', management: 'Aplicar em momentos diferentes do dia', cypInvolvement: 'Não' },
    ],
    observations: 'Higiene facial adequada, evitar alimentos de alto IG e laticínios pode ajudar. Casos moderados/graves: encaminhar ao dermatologista.',
    clinicalMonitoring: 'Contar lesões e avaliar DLQI a cada 4 semanas.',
  },

  'Psoríase (Adjuvante)': {
    category: 'Pele e Dermatologia',
    indications: ['Psoríase em placas leve/moderada', 'Dermatite seborreica', 'Eczema crônico'],
    protocol: [
      {
        plant: 'Aloe vera (Aloe barbadensis)',
        partUsed: 'Gel foliar interno',
        dosage: 'Tópico: gel puro 3–4x ao dia; Oral: 50–100 ml suco/dia',
        posology: 'Tópico: aplicar camada generosa 3–4x ao dia nas placas. Oral: 50 ml 2x ao dia',
        duration: '4–12 semanas',
        properties: 'Anti-inflamatório, emoliente, imunomodulador cutâneo',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Óleo de borragem (Borago officinalis)',
        partUsed: 'Sementes (óleo)',
        dosage: '1000–3000 mg óleo/dia (GLA)',
        posology: 'Cápsulas: 500 mg 2–3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Anti-inflamatório cutâneo (GLA), barreira epidérmica',
        evidenceLevel: 'Baixa-Média',
      },
    ],
    contraindications: [
      { substance: 'Aloe oral', conditions: 'Doença inflamatória intestinal, gestação', populations: 'Crianças < 12 anos', severity: 'Moderada', mechanism: 'Antraquinonas: efeito laxante/irritação intestinal' },
    ],
    drugInteractions: [
      { herb: 'Aloe oral', drugs: 'Glicosídeos cardíacos, diuréticos', severity: 'Moderada', mechanism: 'Perda de potássio por efeito laxante', management: 'Monitorar eletrólitos', cypInvolvement: 'CYP3A4 (leve)' },
    ],
    observations: 'Evitar gatilhos (estresse, infecções, medicamentos como beta-bloqueadores). Fototerapia e biologics são tratamentos eficazes para casos moderados/graves.',
    clinicalMonitoring: 'PASI score a cada 4 semanas.',
  },

  // ─── SAÚDE OCULAR ─────────────────────────────────────────────────────────

  'Síndrome do Olho Seco / Cansaço Visual': {
    category: 'Saúde Ocular',
    indications: ['Olho seco', 'Cansaço visual por telas', 'Blefarite', 'Conjuntivite seca'],
    protocol: [
      {
        plant: 'Mirtilo (Vaccinium myrtillus)',
        partUsed: 'Frutos (extrato)',
        dosage: '160–480 mg extrato (25% antocianinas)/dia',
        posology: 'Extrato: 80–160 mg 2–3x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Proteção retiniana, melhora microcirculação ocular, adaptação ao escuro',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Ômega-3 (linhaça/chia)',
        partUsed: 'Sementes',
        dosage: '2–3 g EPA+DHA/dia',
        posology: '1–2 colheres de sopa de linhaça moída ou cápsulas de ômega-3 (1 g) 3x ao dia',
        duration: 'Uso prolongado',
        properties: 'Anti-inflamatório da glândula lacrimal, melhora filme lacrimal',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Mirtilo', conditions: 'Cirurgia ocular recente', populations: 'Gestantes (alta dose)', severity: 'Baixa', mechanism: 'Efeito antiagregante plaquetário leve' },
    ],
    drugInteractions: [
      { herb: 'Ômega-3', drugs: 'Varfarina, AAS', severity: 'Moderada', mechanism: 'Efeito antiagregante aditivo', management: 'Monitorar coagulação', cypInvolvement: 'Não' },
    ],
    observations: 'Regra 20-20-20: a cada 20 min de tela, olhar 20 segundos para 6m de distância. Umidificador ambiental e piscar conscientemente ajudam.',
    clinicalMonitoring: 'Schirmer test e avaliação oftalmológica a cada 3 meses.',
  },

  // ─── SAÚDE MENTAL ─────────────────────────────────────────────────────────

  'Burnout e Fadiga Adrenal': {
    category: 'Sistema Nervoso',
    indications: ['Esgotamento mental', 'Fadiga crônica', 'Burnout', 'Baixa resiliência ao estresse'],
    protocol: [
      {
        plant: 'Rhodiola (Rhodiola rosea)',
        partUsed: 'Raiz',
        dosage: '200–600 mg extrato (3% rosavinas)/dia',
        posology: 'Extrato: 200–400 mg pela manhã, em jejum ou com pequena refeição',
        duration: '6–12 semanas',
        properties: 'Adaptogênica, antifadiga, neuroprotetora',
        evidenceLevel: 'Alta',
      },
      {
        plant: 'Ashwagandha (Withania somnifera)',
        partUsed: 'Raiz',
        dosage: '300–600 mg extrato (5% witanolídeos)/dia',
        posology: 'Extrato: 300 mg 2x ao dia com refeições',
        duration: '8–12 semanas',
        properties: 'Redução de cortisol, adaptogênica, ansiolítica',
        evidenceLevel: 'Alta',
      },
    ],
    contraindications: [
      { substance: 'Rhodiola', conditions: 'Transtorno bipolar', populations: 'Gestantes', severity: 'Moderada', mechanism: 'Possível ativação do SNC pode precipitar episódio maníaco' },
    ],
    drugInteractions: [
      { herb: 'Rhodiola', drugs: 'Antidepressivos ISRS', severity: 'Moderada', mechanism: 'Efeito serotoninérgico aditivo leve', management: 'Monitorar sintomas serotoninérgicos', cypInvolvement: 'CYP3A4 (leve)' },
    ],
    observations: 'Psicoterapia e reorganização das demandas são centrais no burnout. Higiene do sono e atividade física completam o tratamento.',
    clinicalMonitoring: 'Escalas de estresse percebido (PSS) e cortisol matinal antes e após 8 semanas.',
  },

  'Compulsão Alimentar e Ansiedade Alimentar': {
    category: 'Sistema Nervoso',
    indications: ['Compulsão alimentar leve-moderada', 'Comer emocional', 'Ansiedade associada à alimentação'],
    protocol: [
      {
        plant: 'Griffonia / 5-HTP (Griffonia simplicifolia)',
        partUsed: 'Sementes',
        dosage: '100–300 mg 5-HTP/dia',
        posology: '50–100 mg 3x ao dia 30 min antes das refeições',
        duration: '8–12 semanas',
        properties: 'Aumento serotoninérgico, redução da compulsão, saciedade',
        evidenceLevel: 'Média',
      },
      {
        plant: 'Gymnema (Gymnema sylvestre)',
        partUsed: 'Folhas',
        dosage: '400–800 mg extrato/dia',
        posology: 'Extrato: 200–400 mg antes das principais refeições',
        duration: '8–12 semanas',
        properties: 'Redução do desejo por doces, hipoglicemiante',
        evidenceLevel: 'Média',
      },
    ],
    contraindications: [
      { substance: 'Griffonia / 5-HTP', conditions: 'Uso de antidepressivos', populations: 'Gestantes', severity: 'Muito Alta', mechanism: 'Síndrome serotoninérgica' },
    ],
    drugInteractions: [
      { herb: 'Gymnema', drugs: 'Insulina, hipoglicemiantes orais', severity: 'Alta', mechanism: 'Efeito hipoglicemiante aditivo', management: 'Monitorar glicemia rigorosamente', cypInvolvement: 'Não' },
    ],
    observations: 'Psicoterapia (TCC, terapia comportamental alimentar) é o tratamento mais eficaz. Plantões nutricionais ajudam na reeducação alimentar.',
    clinicalMonitoring: 'Binge Eating Scale (BES) a cada 4 semanas.',
  },

};

// Função auxiliar para buscar protocolos por categoria
export function getProtocolsByCategory(category) {
  return Object.entries(EXPANDED_PHYTOTHERAPY_DATABASE)
    .filter(([_, protocol]) => protocol.category === category)
    .map(([name, protocol]) => ({ name, ...protocol }));
}

// Fun\u00e7\u00e3o auxiliar para buscar todas as categorias
export function getAllCategories() {
  const categories = new Set();
  Object.values(EXPANDED_PHYTOTHERAPY_DATABASE).forEach(protocol => {
    categories.add(protocol.category);
  });
  return Array.from(categories).sort();
}

// Fun\u00e7\u00e3o auxiliar para buscar por indica\u00e7\u00e3o
export function searchProtocolsByIndication(searchTerm) {
  const term = searchTerm.toLowerCase();
  return Object.entries(EXPANDED_PHYTOTHERAPY_DATABASE)
    .filter(([_, protocol]) => 
      protocol.indications.some(ind => ind.toLowerCase().includes(term))
    )
    .map(([name, protocol]) => ({ name, ...protocol }));
}
