$filePath = "e:\1. Nova pasta\MEUS PROJETOS DE PROGRAMAÇÃO 2\anamnese-app\src\data\subclinicalIntegrativeData.json"

$newEntries = @'
,
  {
    "id": "sc-sinais-pes",
    "categoria": "Sinais nos Pés",
    "emoji": "🦶",
    "title": "O que seus Pés Dizem sobre sua Saúde",
    "image": "pes-saude.jpg",
    "sinais": [
      "Dormência e Formigamento nos pés (→ Diabetes / neuropatia periférica)",
      "Inchaço nos pés e tornozelos (→ Doença renal / insuficiência venosa)",
      "Dor em queimação ou dormência (→ Dano nervoso / neuropatia)",
      "Veias tortuosas e pernas pesadas (→ Varizes / insuficiência venosa)",
      "Inchaço e vermelhidão nos pés (→ Infecção / celulite bacteriana)",
      "Dor intensa e repentina no dedão do pé (→ Gota / hiperuricemia)",
      "Dor aguda no calcanhar pela manhã (→ Fascite plantar / esporão)",
      "Pés frios com pele azulada ou pálida (→ Doença cardíaca / má circulação)",
      "Dor, inchaço e rigidez nas articulações dos pés (→ Artrite reumatoide)",
      "Pés pálidos e frios (→ Anemia / deficiência de ferro)",
      "Coceira, descamação e odor nos pés (→ Infecção fúngica / tinea pedis)",
      "Calcanhares rachados e unhas frágeis e quebradiças (→ Deficiência de vitaminas / desidratação)"
    ],
    "diagnostico": "Os pés revelam o estado circulatório, metabólico e neurológico do organismo. Dormência e formigamento indicam neuropatia periférica — frequente em diabetes, deficiência de B12 e síndrome metabólica. Inchaço bilateral remete a função renal comprometida ou insuficiência cardíaca. Pés frios e cianóticos alertam para comprometimento cardiovascular e periférico. Unhas quebradiças e calcanhares rachados indicam deficiência de vitaminas A, C, E, biotina e ômega-3. Dor intensa no hálux aponta para hiperuricemia (gota). Infecção fúngica crônica sugere disbiose, imunidade baixa ou hiperglicemia.",
    "condutas": {
      "fitoterapia": [
        "Ginkgo biloba 120mg/dia — circulação periférica e neuropatia",
        "Hamamelis virginiana (creme tópico) — varizes e inchaço",
        "Cynara scolymus (alcachofra) 500mg — depuração hepática e ácido úrico",
        "Equisetum arvense (cavalinha) em chá — retenção hídrica e rins",
        "Própolis verde tópico 11% — infecções fúngicas e bacterianas",
        "Curcuma longa 500mg 3x/dia — inflamação articular (artrite, gota)"
      ],
      "suplementacao": [
        "Vitamina B12 (metilcobalamina) 1000mcg/dia — neuropatia periférica",
        "Vitamina D3 5000 UI + K2 100mcg — metabolismo ósseo e articular",
        "Ômega-3 EPA+DHA 2-3g/dia — anti-inflamatório e circulação",
        "Biotina 5mg/dia — unhas frágeis e pele ressecada",
        "Vitamina C lipossomal 1g/dia — colágeno, cicatrização e imunidade",
        "Magnésio glicinato 300-400mg/dia — cãibras e circulação muscular",
        "Ferro quelado + Vitamina C (se anemia) — hemoglobina e oxigenação",
        "Berberina 500mg 2x/dia — resistência insulínica e controle glicêmico",
        "Ácido fólico 800mcg — neuropatia e eritropoiese",
        "Coenzima Q10 100-200mg — disfunção mitocondrial e circulação periférica"
      ],
      "dietoterapia": [
        "Reduzir purinas: evitar carnes vermelhas, vísceras e frutos do mar (gota)",
        "Cerejas e mirtilo — antocianinas que reduzem ácido úrico",
        "Dieta anti-inflamatória: azeite, cúrcuma, gengibre, frutas vermelhas",
        "Reduzir açúcar e carboidratos refinados — controle glicêmico e prevenção fúngica",
        "Alimentos ricos em ferro: folhas verde-escuras, leguminosas, sementes de abóbora",
        "Hidratação mínima 35ml/kg/dia para drenagem renal",
        "Alho cru e cebola roxa — antifúngico e antibacteriano natural"
      ],
      "estilo_vida": [
        "Elevação dos pés 30min/dia — drenagem venosa e redução de edema",
        "Caminhada leve 30min/dia — ativação da circulação periférica",
        "Massagem com óleo de calêndula + tea tree nos pés — fungos e hidratação",
        "Meias de compressão graduada — varizes e insuficiência venosa",
        "Evitar calçados fechados úmidos prolongados — prevenção fúngica",
        "Hidroterapia: banhos alternados quente/frio para ativação circulatória"
      ],
      "orientacoes": [
        "Pés frios + pele azulada: encaminhar para avaliação cardiovascular urgente",
        "Dor persistente no calcanhar: fisioterapia + palmilha ortopédica personalizada",
        "Infecção fúngica crônica: investigar diabetes e disbiose intestinal",
        "Monitorar glicemia em jejum e HbA1c se dormência bilateral",
        "Artrite reumatoide confirmada: encaminhar para reumatologista + protocolo integrativo",
        "Reavaliar em 30 dias após protocolo iniciado"
      ]
    }
  },
  {
    "id": "sc-sinais-olhos",
    "categoria": "Sinais nos Olhos",
    "emoji": "👁️",
    "title": "O que seus Olhos Revelam sobre sua Saúde",
    "image": "olhos-saude.jpg",
    "sinais": [
      "Olhos amarelados / esclerótica ictérica (→ Problema no fígado / icterícia)",
      "Olhos vermelhos / injeção conjuntival (→ Falta de sono, irritação ou alergia)",
      "Pálpebras inchadas ao acordar (→ Retenção hídrica ou problema renal)",
      "Olheiras escuras e roxas (→ Cansaço crônico, estresse ou anemia)",
      "Tremor involuntário na pálpebra (→ Deficiência de magnésio)",
      "Olhos secos com ardência e sensação de areia (→ Baixo nível de vitamina A)",
      "Visão embaçada ou turva (→ Possível glicose elevada / hipertensão ocular)"
    ],
    "diagnostico": "Os olhos são uma das janelas mais precisas do estado metabólico e sistêmico. Esclerótica amarelada (icterícia) indica comprometimento hepático — pode ser hepatite, cálculos biliares ou sobrecarga tóxica. Pálpebras edemaciadas ao amanhecer sugerem filtração renal comprometida. Olheiras escuras crônicas apontam para anemia ferropriva, estresse oxidativo ou distúrbio suprarrenal. Tremor palpebral é sinal clássico de hipomagnesemia. Olhos secos persistentes indicam deficiência de vitamina A e ácidos graxos essenciais. Visão embaçada intermitente deve levantar suspeita de hiperglicemia.",
    "condutas": {
      "fitoterapia": [
        "Silybum marianum (silimarina) 300mg 3x/dia — proteção e regeneração hepática",
        "Vaccinium myrtillus (mirtilo) — circulação microvascular ocular e retiniana",
        "Ginkgo biloba 120mg/dia — fluxo sanguíneo ocular e perfusão",
        "Taraxacum officinale (dente-de-leão) — drenagem hepática e renal",
        "Euphrasia officinalis — olhos vermelhos e conjuntivite (uso homeopático)",
        "Withania somnifera (Ashwagandha) 300mg — cortisol, fadiga adrenal e olheiras"
      ],
      "suplementacao": [
        "Magnésio glicinato 400mg/dia — tremor palpebral e pressão ocular",
        "Vitamina A (retinol) 5000-10.000 UI — olhos secos e integridade da córnea",
        "Ômega-3 DHA 1g/dia — qualidade do filme lacrimal",
        "Complexo B (B1, B2, B6, B12) — neuropatia óptica e olheiras",
        "Vitamina C 1g + Vitamina E 400 UI — antioxidante e proteção ocular",
        "Luteína 20mg + Zeaxantina 4mg — proteção macular e retiniana",
        "Zinco quelado 30mg — metabolismo hepático e imunidade ocular",
        "Ferro quelado + Vitamina C (se olheiras + anemia) — hemoglobina",
        "Silimarina 150mg 3x/dia (se olhos amarelados) — hepatoproteção urgente"
      ],
      "dietoterapia": [
        "Cenoura, manga, batata-doce — betacaroteno (pró-vitamina A) para olhos secos",
        "Ovos com gema — luteína e zeaxantina naturais para a mácula",
        "Frutas vermelhas e mirtilo — antocianinas para microvasculatura ocular",
        "Reduzir álcool e ultraprocessados — sobrecarga hepática (olhos amarelados)",
        "Vegetais verde-escuros — folato, ferro e clorofila para olheiras",
        "Limitar cafeína se olhos secos — efeito diurético que resseca mucosas",
        "Gengibre e açafrão no cardápio — anti-inflamatório sistêmico"
      ],
      "estilo_vida": [
        "Compressas de camomila fria nos olhos inchados — descongestionante",
        "Regra 20-20-20: a cada 20 min de tela, olhar 20m de distância por 20 seg",
        "Dormir 7-9 horas — regeneração hepática noturna e redução de olheiras",
        "Colírio de água de rosas sem conservantes — hidratação ocular natural",
        "Proteção solar e óculos UV — prevenção de degeneração macular",
        "Umidificador no ambiente — prevenção de ressecamento ocular"
      ],
      "orientacoes": [
        "Olhos amarelados: solicitar TGO, TGP, GGT, fosfatase alcalina e bilirrubinas com urgência",
        "Visão embaçada: solicitar glicemia em jejum e hemoglobina glicada (HbA1c)",
        "Olheiras crônicas em jovens: investigar anemia ferropriva, tireoide e suprarrenais",
        "Pálpebras inchadas persistentes: solicitar creatinina, ureia e urinálise",
        "Olhos secos crônicos: avaliar síndrome de Sjögren (ANA, anti-Ro/La)",
        "Encaminhar para oftalmologista se pressão ocular suspeita ou visão turva contínua"
      ]
    }
  },
  {
    "id": "sc-lesoes-pele-abcde",
    "categoria": "Avaliação Dermatológica",
    "emoji": "🔬",
    "title": "Regra ABCDE — Avaliação de Lesões de Pele",
    "image": "lesoes-pele-abcde.jpg",
    "sinais": [
      "A — Assimetria: um lado da lesão diferente do outro",
      "B — Bordas: irregulares, mal definidas, escorregadas ou festonadas",
      "C — Cor: variação de cores (marrom, preto, vermelho, branco) na mesma lesão",
      "D — Diâmetro: maior que 6mm (tamanho de uma borracha de lápis)",
      "E — Evolução: lesão que mudou de tamanho, forma, cor ou desenvolveu coceira, sangramento ou crosta"
    ],
    "diagnostico": "A regra ABCDE é o método padrão de rastreamento visual de lesões malignas de pele, especialmente melanoma — o mais perigoso dos cânceres cutâneos. A presença de qualquer critério exige encaminhamento dermatológico urgente para dermoscopia e possível biópsia. Fatores de risco: exposição solar crônica sem proteção, histórico familiar de melanoma, pele clara, múltiplos nevos e imunossupressão. A abordagem integrativa atua na prevenção, detecção precoce e suporte ao tratamento convencional.",
    "condutas": {
      "fitoterapia": [
        "Camellia sinensis (chá verde) — EGCG com atividade antioxidante e anticarcinogênica",
        "Aloe vera gel tópico — cicatrização, hidratação e fotoproteção",
        "Silybum marianum (silimarina) — hepatoproteção durante quimioterapia",
        "Uncaria tomentosa (Unha-de-gato) — imunomodulação e ação antiproliferativa",
        "Calendula officinalis tópico — cicatrização pós-biópsia ou cirurgia"
      ],
      "suplementacao": [
        "Vitamina D3 5000 UI/dia — imunomodulação e prevenção oncológica",
        "Vitamina C lipossomal 2-3g/dia — antioxidante e síntese de colágeno dérmico",
        "Vitamina E tocoferol 400 UI — proteção lipídica cutânea",
        "Selênio 200mcg/dia — antioxidante enzimático (glutationa peroxidase)",
        "Zinco quelado 30mg — imunidade e regeneração celular",
        "Astaxantina 12mg — fotoproteção interna e antioxidante potente",
        "Licopeno 20mg — proteção UV intrínseca (tomate cozido é fonte ideal)"
      ],
      "dietoterapia": [
        "Tomate cozido e pimentão vermelho — licopeno para proteção solar interna",
        "Chá verde 3 xícaras/dia — catequinas com ação antineoplásica",
        "Brócolis, couve e repolho — sulforafano e indol-3-carbinol (antiproliferativo)",
        "Evitar carnes processadas e álcool — fatores pró-carcinogênicos",
        "Açaí, mirtilo, amora — antocianinas e resveratrol antioxidantes",
        "Dieta mediterrânea anti-inflamatória",
        "Azeite extra virgem — polifenóis com propriedades fotoprotetoras"
      ],
      "estilo_vida": [
        "ENCAMINHAR AO DERMATOLOGISTA — qualquer critério ABCDE positivo exige avaliação urgente",
        "Protetor solar FPS 50+ diário — proteção UVA e UVB",
        "Evitar exposição solar entre 10h e 16h",
        "Autoexame mensal de pele (inclusive couro cabeludo, plantas dos pés e genitais)",
        "Usar roupas com proteção UV em atividades ao ar livre",
        "Dermoscopia anual com dermatologista para pacientes de risco"
      ],
      "orientacoes": [
        "URGENTE: qualquer critério ABCDE positivo → encaminhar ao dermatologista imediatamente",
        "Não realizar cauterização, extração ou tratamentos cosméticos na lesão antes da avaliação",
        "Fotografar a lesão mensalmente para documentar evolução",
        "Investigar histórico familiar de melanoma e câncer de pele",
        "Após diagnóstico e tratamento convencional: suporte integrativo com oncologista",
        "Histórico de câncer de pele: dermoscopia a cada 6 meses"
      ]
    }
  },
  {
    "id": "sc-secrecao-nasal",
    "categoria": "Sinais Nasais",
    "emoji": "👃",
    "title": "O que a Secreção Nasal Revela sobre sua Saúde",
    "image": "secrecao-nasal.jpg",
    "sinais": [
      "Secreção transparente e líquida (→ Normal, alergia ou início de resfriado)",
      "Secreção branca e espessa (→ Congestão nasal ou resfriado inicial)",
      "Secreção amarela (→ Sistema imunológico combatendo infecção ativa)",
      "Secreção verde e purulenta (→ Possível infecção bacteriana ou viral avançada)",
      "Secreção marrom (→ Poeira, poluição intensa ou sangue ressecado)",
      "Secreção cinza ou preta (→ Exposição a poluição, fumaça ou partículas inaladas)"
    ],
    "diagnostico": "A cor e consistência da secreção nasal espelha o estado imunológico e inflamatório das vias aéreas superiores. Secreção transparente fluida é fisiológica ou alérgica (rinite). Secreção amarela indica mobilização ativa de neutrófilos — o corpo está combatendo um agente infeccioso. Secreção verde (leucócitos degradados) sugere infecção bacteriana secundária ou sinusite. Secreção marrom com pontos escuros aponta para exposição crônica a poluentes. Secreção cinza/preta pode indicar Aspergillus ou outros fungos em pacientes imunossuprimidos.",
    "condutas": {
      "fitoterapia": [
        "Echinacea purpurea 400mg 3x/dia — estimulação imune em infecções virais",
        "Pelargonium sidoides (Umckaloabo) — sinusite e resfriado bacteriano",
        "Allium sativum (alho) 600mg/dia — antimicrobiano de amplo espectro",
        "Sambucus nigra (sabugueiro) — redução da replicação viral",
        "Andrographis paniculata — anti-inflamatório das vias respiratórias",
        "Eucalyptus globulus (inalação) — descongestionante e antisséptico"
      ],
      "suplementacao": [
        "Vitamina C 2g/dia — imunomodulação e modulação de citocinas",
        "Vitamina D3 5000 UI/dia — imunidade inata e adaptativa",
        "Zinco 30mg/dia — antiviral e reduz duração do resfriado",
        "Quercetina 500mg 2x/dia — anti-histamínico natural e anti-inflamatório",
        "Probióticos multiestirpe — eixo intestino-pulmão e imunidade mucosa",
        "N-Acetilcisteína (NAC) 600mg 2x/dia — fluidificação de muco espesso",
        "Própolis extrato seco 400mg — antimicrobiano e imunomodulador",
        "Vitamina A 10.000 UI por 10 dias — integridade da mucosa nasal"
      ],
      "dietoterapia": [
        "Caldo de galinha caseiro — lisozima e glutamina para mucosa respiratória",
        "Alho e cebola crus — compostos sulfurados antimicrobianos",
        "Mel de qualidade 1 colher/dia — antisséptico e imunoestimulante",
        "Eliminar laticínios temporariamente — reduz produção de muco",
        "Xarope: gengibre + limão + mel + própolis — imunoestimulante potente",
        "Aumentar vegetais coloridos — carotenoides e vitamina C",
        "Hidratação generosa — fluidifica secreção e facilita drenagem"
      ],
      "estilo_vida": [
        "Lavagem nasal com solução salina isotônica 2x/dia — higiene e drenagem",
        "Umidificador de ar no quarto — previne ressecamento da mucosa nasal",
        "Inalação com eucalipto ou hortelã — desobstrução e antissepsia",
        "Cabeceira elevada ao dormir — drenagem postural das vias aéreas",
        "Evitar fumaça e ambientes poluídos — agrava inflamação da mucosa",
        "Máscara em locais com muito pó, fuligem ou mofo"
      ],
      "orientacoes": [
        "Secreção verde + febre + dor facial > 7 dias: avaliar sinusite bacteriana",
        "Secreção escura + tosse produtiva em imunossuprimidos: descartar aspergilose",
        "Secreção persistente + espirros matinais: investigar rinite alérgica (IgE total, RAST)",
        "Sangue na secreção recorrente: verificar pressão arterial e coagulograma",
        "Crianças com secreção verde persistente: investigar corpo estranho nasal",
        "Reavaliar em 10-14 dias; sem melhora: encaminhar ao ORL"
      ]
    }
  },
  {
    "id": "sc-espinhas-mapa-facial",
    "categoria": "Mapeamento de Acne",
    "emoji": "🫦",
    "title": "O que as Espinhas Dizem sobre seus Órgãos",
    "image": "espinhas-mapa-facial.jpg",
    "sinais": [
      "Espinhas na Testa (→ Má digestão / Excesso de toxinas / Privação de sono)",
      "Espinhas entre as Sobrancelhas (→ Fígado sobrecarregado / Álcool / Excesso de laticínios)",
      "Espinhas no Nariz (→ Pressão arterial elevada / Problemas cardíacos / Deficiência de vitamina B)",
      "Espinhas nas Bochechas (→ Alergias respiratórias / Bactérias do celular / Excesso de açúcar)",
      "Espinhas no Queixo e Mandíbula (→ Desequilíbrio hormonal / Ovários / Estresse intenso)",
      "Espinhas no Pescoço (→ Corpo combatendo infecção / Tireoide / Estresse)"
    ],
    "diagnostico": "O mapeamento facial de acne correlaciona a localização das lesões com desequilíbrios orgânicos específicos — conceito derivado da medicina tradicional chinesa e da dermatologia funcional. Espinhas na testa apontam para disbiose intestinal e sobrecarga do sistema digestivo. Entre as sobrancelhas indica estase hepática e processamento inadequado de gorduras. Acne no nariz relaciona-se ao eixo cardiovascular e pressório. Bochechas refletem o estado pulmonar e a qualidade do ar (inclusive contaminação por celular). Queixo e mandíbula são os locais clássicos de acne hormonal — andrógenos elevados, resistência insulínica ou SOP. Pescoço indica linfadenopatia e possível disfunção da tireoide.",
    "condutas": {
      "fitoterapia": [
        "Silybum marianum (silimarina) 300mg 3x/dia — desintoxicação hepática",
        "Vitex agnus-castus 400mg/dia — reequilíbrio hormonal (acne queixo/mandíbula)",
        "Arctium lappa (bardana) — depurativa e antiandrogênica para pele",
        "Sambucus nigra + Echinacea — reforço imune (acne pescoço/infecção)",
        "Aloe vera gel tópico — anti-inflamatório e cicatrizante",
        "Camellia sinensis (chá verde) oral e tópico — EGCG antiandrogênico"
      ],
      "suplementacao": [
        "Zinco quelado 30-50mg/dia — antiandrogênico, cicatrização e imunidade",
        "Vitamina B5 (ácido pantotênico) 2-5g/dia — reduz produção de sebo",
        "Complexo B completo — metabolismo hepático, hormonal e energético",
        "Ômega-3 EPA+DHA 2g/dia — anti-inflamatório e regulação sebácea",
        "Vitamina A retinol — modulação da queratinização folicular",
        "Probióticos multiestirpe — eixo intestino-pele e modulação androgênica",
        "Inositol (mio-inositol) 2-4g/dia — sensibilidade insulínica e acne hormonal",
        "Selênio 200mcg/dia — antioxidante e antiandrogênico"
      ],
      "dietoterapia": [
        "Eliminar laticínios por 30 dias — IGF-1 e andrógenos do leite agravam acne",
        "Reduzir açúcar e índice glicêmico — pico insulínico estimula produção de andrógenos",
        "Aumentar fibras e prebióticos — saúde da microbiota intestinal",
        "Sementes de abóbora, carne magra, leguminosas — fontes de zinco",
        "Brócolis, couve, repolho — DIM (indol-3-carbinol) para metabolismo estrogênico",
        "Testar retirada do glúten por 4 semanas — hipersensibilidade pode causar acne",
        "Abacate e castanhas — vitamina E anti-inflamatória para a pele"
      ],
      "estilo_vida": [
        "Higienizar o celular com álcool 70% diariamente (acne nas bochechas)",
        "Trocar fronha do travesseiro 2x/semana",
        "Não tocar o rosto com as mãos durante o dia",
        "Gerenciar cortisol: respiração diafragmática, meditação, sono 7-8h",
        "Exercício físico regular — metabolismo hormonal e drenagem linfática",
        "Cosméticos não comedogênicos (oil-free)"
      ],
      "orientacoes": [
        "Acne queixo/mandíbula em mulheres: investigar SOP (USG pélvico, testosterona, DHEA-S, insulina)",
        "Acne testa + digestão ruim: parasitologia, H. pylori, disbiose intestinal",
        "Acne pescoço + cansaço + ganho de peso: TSH, T4 livre — avaliar tireoide",
        "Acne sobrancelhas: TGO, TGP, GGT, bilirrubinas — função hepática",
        "Acne nariz: verificar PA, colesterol e homocisteína — risco cardiovascular",
        "Acne inflamatória grave (nódulos, cistos): encaminhar ao dermatologista"
      ]
    }
  }
]
'@

# Read existing JSON
$content = Get-Content $filePath -Raw -Encoding UTF8

# Remove trailing ] and whitespace
$trimmed = $content.TrimEnd()
if ($trimmed.EndsWith(']')) {
    $trimmed = $trimmed.Substring(0, $trimmed.Length - 1).TrimEnd()
    # Remove trailing } if followed by newline etc.
    $newContent = $trimmed + $newEntries
    [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
    Write-Host "Done! New entries added."
} else {
    Write-Host "ERROR: JSON does not end with ']'"
}
