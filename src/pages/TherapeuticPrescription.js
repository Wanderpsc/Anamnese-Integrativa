import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Paper, Typography, Box, Button, Divider, Alert, Chip, Accordion, AccordionSummary, AccordionDetails, Stack, Grid, Autocomplete, TextField, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import { getTherapeuticSuggestionsBySymptoms, THERAPEUTIC_DATABASE, CONTRAINDICATIONS_GUIDE, generateTherapeuticReport } from '../config/therapeuticDatabase';
import { autoGenerateProtocols } from '../lib/autoProtocolEngine';
import PrescriptionHeader from '../components/PrescriptionHeader';
import PrescriptionFooter from '../components/PrescriptionFooter';
import { buildLetterheadHtml, downloadPdfFromHtml, generateQrDataUrl } from '../components/PrintTemplate';
import { getBoarimProtocolsBySymptoms } from '../config/boarimProtocols';
import { getReferences, getSafetyInfo } from '../config/scientific-references';
import { getSavedProtocols } from '../lib/savedProtocols';
import therapistSymbol from '../assets/therapist-symbol.jpg';
import { appendHistoricoEntry } from '../lib/historicoUtils';
import { evaluateProtocolSafety } from '../lib/clinicalSafety';

const therapistFullTitle = 'Wander Pires Silva Coelho, Terapeuta Integrativo Funcional, Naturopatia e Iridologia - CRTH-BR 17821';

/**
 * Consolida TODAS as indicações terapêuticas para o interagente
 * Remove duplicações e agrupa por tipo de terapia
 */
function consolidateAllTherapies(entry, therapeuticData, boarimProtocols) {
  if (!entry) return null;

  const consolidated = {
    homeopathy: [],
    aromatherapy: [],
    essentialOils: [],
    phytotherapy: [],
    nutritional: [],
    hydrotherapy: [],
    lifestyle: [],
    symptoms: [] // Sintomas/doenças captados
  };

  // 1. EXTRAIR SINTOMAS DA ANAMNESE
  const symptoms = new Set();
  
  // Queixa principal
  if (entry.queixaPrincipal) symptoms.add(entry.queixaPrincipal);
  if (entry.queixas && Array.isArray(entry.queixas)) {
    entry.queixas.forEach(q => symptoms.add(q));
  }
  
  // Sintomas específicos dos sistemas
  const symptomFields = [
    'q46_dores', 'q47_cansaco', 'q48_estresse', 'q49_ansiedade',
    'q39_intestino', 'q40_gases', 'q41_azia', 'q42_nauseas',
    'q43_urina_frequencia', 'q45_ardor_urinar',
    'q29_doencas_previas', 'q30_medicamentos_uso'
  ];
  
  symptomFields.forEach(field => {
    if (entry[field] && entry[field] !== 'Não' && entry[field] !== 'Nenhum') {
      symptoms.add(entry[field]);
    }
  });

  consolidated.symptoms = Array.from(symptoms).filter(s => s && s.trim());

  // 2. CONSOLIDAR DADOS TERAPÊUTICOS (da AdvancedTherapies)
  if (therapeuticData && Array.isArray(therapeuticData)) {
    therapeuticData.forEach(item => {
      if (!item || !item.result) return;
      
      const type = item.type || (item.result.remedies ? 'homeopathy' : item.result.oils ? 'essentialOils' : 'aromatherapy');
      
      if (type === 'homeopathy' && item.result.remedies) {
        item.result.remedies.forEach(remedy => {
          if (!consolidated.homeopathy.find(r => r.name === remedy.name)) {
            consolidated.homeopathy.push({
              ...remedy,
              indication: item.condition || item.result.category || item.result.condition,
              references: item.result.references,
              safety: item.result.safety
            });
          }
        });
      }
      
      if ((type === 'essentialOils' || type === 'aromatherapy') && item.result.oils) {
        item.result.oils.forEach(oil => {
          const targetArray = type === 'essentialOils' ? consolidated.essentialOils : consolidated.aromatherapy;
          if (!targetArray.find(o => o.name === oil.name)) {
            targetArray.push({
              ...oil,
              indication: item.condition || item.result.title || item.result.category,
              references: item.result.references
            });
          }
        });
      }
    });
  }

  // 3. CONSOLIDAR PROTOCOLOS BOARIM
  if (boarimProtocols && Array.isArray(boarimProtocols)) {
    boarimProtocols.forEach(protocol => {
      // Fitoterapia
      if (protocol.phytotherapy && Array.isArray(protocol.phytotherapy)) {
        protocol.phytotherapy.forEach(item => {
          if (!consolidated.phytotherapy.find(p => p.name === item.name)) {
            consolidated.phytotherapy.push({
              name: item.name,
              usage: item.usage,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Hidroterapia
      if (protocol.hydrotherapy && Array.isArray(protocol.hydrotherapy)) {
        protocol.hydrotherapy.forEach(item => {
          if (!consolidated.hydrotherapy.find(h => h.treatment === item.treatment)) {
            consolidated.hydrotherapy.push({
              treatment: item.treatment,
              temperature: item.temperature,
              duration: item.duration,
              frequency: item.frequency,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Orientações nutricionais
      if (protocol.diet && Array.isArray(protocol.diet)) {
        protocol.diet.forEach(item => {
          if (!consolidated.nutritional.find(n => n.recommendation === item.recommendation)) {
            consolidated.nutritional.push({
              recommendation: item.recommendation,
              type: item.type,
              indication: protocol.disease
            });
          }
        });
      }
      
      // Estilo de vida
      if (protocol.lifestyle && Array.isArray(protocol.lifestyle)) {
        protocol.lifestyle.forEach(item => {
          if (!consolidated.lifestyle.find(l => l === item)) {
            consolidated.lifestyle.push(item);
          }
        });
      }
    });
  }

  return consolidated;
}

// ── Receituário Mestre Consolidado (sem repetições) ─────────────────────────
function buildMasterPrescription(entry, consolidatedTherapies, savedProtocolsData) {
  const normalize = (str) => (str || '').toLowerCase().trim().replace(/\s+/g, ' ');
  const masterFito = new Map();
  const masterSupl = new Map();
  const masterHomeo = new Map();
  const masterOleos = new Map();
  const masterProb = new Map();
  const masterOrientacoes = new Set();

  const addIfNew = (map, key, value) => {
    const nkey = normalize(key);
    if (nkey && nkey.length > 2 && !map.has(nkey)) map.set(nkey, value);
  };

  // 1. Receituário Fitoterápico
  entry?.phytotherapyProtocols?.cartItems?.forEach(item => {
    addIfNew(masterFito, item.name, { nome: item.name, dosagem: item.dosage, posologia: item.preparation, fonte: 'Receituário Fitoterápico' });
  });

  // 2. Análise Subclínica Integrativa
  entry?.subclinicalIntegrativeAnalysis?.selectedItems?.forEach(item => {
    item.condutas?.fitoterapia?.forEach(str => {
      const name = (str || '').split('-')[0].split('(')[0].trim();
      addIfNew(masterFito, name, { nome: str, fonte: `AIC: ${item.itemTitle}` });
    });
    item.condutas?.suplementacao?.forEach(str => {
      const name = (str || '').split('-')[0].split('(')[0].trim();
      addIfNew(masterSupl, name, { nome: str, fonte: `AIC: ${item.itemTitle}` });
    });
    item.condutas?.orientacoes?.forEach(str => masterOrientacoes.add(str));
    item.condutas?.estilo_vida?.forEach(str => masterOrientacoes.add(str));
    item.condutas?.dietoterapia?.forEach(str => masterOrientacoes.add(str));
  });

  // 3. Protocolos Salvos
  savedProtocolsData?.forEach(protocol => {
    protocol.fitoterapia?.forEach(item => {
      const k = item.nome || item.name;
      addIfNew(masterFito, k, { nome: k, dosagem: item.dosagem, posologia: item.posologia, fonte: protocol.conditionNome });
    });
    protocol.suplementacao?.forEach(item => {
      const k = item.nutriente || item.nome || item.name;
      addIfNew(masterSupl, k, { nome: k, dosagem: item.dosagem, posologia: item.posologia, fonte: protocol.conditionNome });
    });
    protocol.homeopatia?.forEach(item => {
      const k = item.medicamento || item.nome || item.name;
      addIfNew(masterHomeo, k, { nome: k, posologia: item.posologia, indicacao: item.indicacao, fonte: protocol.conditionNome });
    });
    protocol.aromaterapia?.forEach(item => {
      const k = item.oleo || item.nome || item.name;
      addIfNew(masterOleos, k, { nome: k, uso: item.uso, diluicao: item.diluicao, fonte: protocol.conditionNome });
    });
    protocol.orientacoesGerais?.forEach(str => masterOrientacoes.add(str));
  });

  // 4. Terapias Consolidadas (Boarim + IA)
  consolidatedTherapies?.phytotherapy?.forEach(item => {
    const k = item.name || item.herb;
    if (k) addIfNew(masterFito, k, { nome: k, dosagem: item.dosage, fonte: item.source || 'Protocolo Boarim' });
  });
  consolidatedTherapies?.homeopathy?.forEach(item => {
    if (item.name) addIfNew(masterHomeo, item.name, { nome: item.name, posologia: item.dosage, fonte: 'Homeopatia' });
  });
  consolidatedTherapies?.essentialOils?.forEach(item => {
    if (item.name) addIfNew(masterOleos, item.name, { nome: item.name, uso: item.usage, fonte: 'Óleos Essenciais' });
  });
  consolidatedTherapies?.aromatherapy?.forEach(item => {
    if (item.name) addIfNew(masterOleos, item.name, { nome: item.name, uso: item.usage, fonte: 'Aromaterapia' });
  });
  consolidatedTherapies?.nutritional?.forEach(item => {
    if (item.name) addIfNew(masterSupl, item.name, { nome: item.name, dosagem: item.dosage, fonte: 'Orientações Nutricionais' });
  });
  consolidatedTherapies?.lifestyle?.forEach(item => {
    masterOrientacoes.add(item.name || item.recommendation || String(item));
  });

  // 5. Deficiências de Vitaminas
  entry?.vitaminDeficiencyAnalyzer?.analiseDeficiencias?.deficiencias?.forEach(def => {
    const k = def.vitamina || def.nome || def.nutrient;
    if (k) addIfNew(masterSupl, k, { nome: k, dosagem: def.dosagem || def.dose, fonte: `Deficiência (${def.severidade || ''})` });
  });

  // 6. Sugestões Terapêuticas
  entry?.therapySuggestions?.consolidatedTherapies?.phytotherapy?.forEach(item => {
    const k = item.name || item.herb;
    if (k) addIfNew(masterFito, k, { nome: k, dosagem: item.dosage, fonte: 'Sugestões Terapêuticas' });
  });
  entry?.therapySuggestions?.consolidatedTherapies?.homeopathy?.forEach(item => {
    if (item.name) addIfNew(masterHomeo, item.name, { nome: item.name, posologia: item.dosage, fonte: 'Sugestões Terapêuticas' });
  });
  entry?.therapySuggestions?.consolidatedTherapies?.essentialOils?.forEach(item => {
    if (item.name) addIfNew(masterOleos, item.name, { nome: item.name, uso: item.usage, fonte: 'Sugestões Terapêuticas' });
  });
  entry?.therapySuggestions?.consolidatedTherapies?.aromatherapy?.forEach(item => {
    if (item.name) addIfNew(masterOleos, item.name, { nome: item.name, uso: item.usage, fonte: 'Sugestões Terapêuticas' });
  });
  entry?.therapySuggestions?.consolidatedTherapies?.nutritional?.forEach(item => {
    const k = item.name || item.supplement;
    if (k) addIfNew(masterSupl, k, { nome: k, fonte: 'Sugestões Terapêuticas' });
  });
  entry?.therapySuggestions?.consolidatedTherapies?.lifestyle?.forEach(item => {
    masterOrientacoes.add(item.name || item.recommendation || String(item));
  });

  // 7. Probióticos
  entry?.probioticsRecommendation?.recommendations?.strains?.forEach(strain => {
    if (strain.name) addIfNew(masterProb, strain.name, { nome: strain.name, dosagem: strain.dosage, fonte: 'Probióticos' });
  });

  // 8. Plano Nutricional
  entry?.nutritionalPlan?.profiles?.forEach(profile => {
    profile.protocols?.forEach(item => {
      const k = item.name || item.nutrient || item.supplement;
      if (k) addIfNew(masterSupl, k, { nome: k, dosagem: item.dosage, fonte: `Plano Nutricional: ${profile.name || ''}` });
    });
    profile.orientacoes?.forEach(str => masterOrientacoes.add(str));
  });

  // 9. Interações Nutricionais
  entry?.nutrientInteractions?.recommendations?.forEach(item => {
    const k = item.nutrient || item.name;
    if (k) addIfNew(masterSupl, k, { nome: k, dosagem: item.dosage, fonte: 'Interações Nutricionais' });
  });

  return {
    fitoterapia: Array.from(masterFito.values()),
    suplementacao: Array.from(masterSupl.values()),
    homeopatia: Array.from(masterHomeo.values()),
    oleos: Array.from(masterOleos.values()),
    probioticos: Array.from(masterProb.values()),
    orientacoes: Array.from(masterOrientacoes).filter(Boolean),
  };
}

export default function TherapeuticPrescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [entry, setEntry] = useState(null);
  const [therapeuticData, setTherapeuticData] = useState([]);
  const [boarimProtocols, setBoarimProtocols] = useState([]);
  const [consolidatedTherapies, setConsolidatedTherapies] = useState(null);
  const [autoProtocol, setAutoProtocol] = useState(null);
  
  // Seleção de interagente
  const [allAnamneses, setAllAnamneses] = useState([]);
  const [uniquePatients, setUniquePatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientAnamneses, setPatientAnamneses] = useState([]);
  const [savedProtocolsData, setSavedProtocolsData] = useState([]);
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveHistorico = () => {
    const target = entry;
    if (!target) return;
    appendHistoricoEntry(target.id, {
      tipo: 'prescricao',
      titulo: '💊 Sugestões Terapêuticas — Protocolo',
      resumo: `${therapeuticData?.length || 0} indicação(ões) terapêutica(s)`,
      pagina: `/prescription/${target.id}`,
    });
    setSavedMsg('Protocolo salvo no histórico!');
    setTimeout(() => setSavedMsg(''), 3500);
  };

  const shouldPrint = searchParams.get('print') === 'true';
  const shouldDownload = searchParams.get('download') === 'true';

  // Carregar anamneses
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('anamneses') || '[]');
    console.log('Total de anamneses no localStorage:', saved.length);
    setAllAnamneses(saved);
    
    // Extrair interagentes únicos
    const patientMap = new Map();
    saved.forEach(anamnese => {
      const patientName = anamnese.nome || anamnese.q01_nome || 'Sem nome';
      const patientId = anamnese.patientId || patientName.toLowerCase().replace(/\s+/g, '-');
      
      if (!patientMap.has(patientId)) {
        patientMap.set(patientId, {
          id: patientId,
          name: patientName,
          anamneses: []
        });
      }
      patientMap.get(patientId).anamneses.push(anamnese);
    });
    
    // Ordenar anamneses de cada paciente por data (mais recente primeiro)
    const patients = Array.from(patientMap.values()).map(patient => ({
      ...patient,
      anamneses: patient.anamneses.sort((a, b) => {
        const dateStrA = a.dataConsulta || a.data || a.createdAt;
        const dateStrB = b.dataConsulta || b.data || b.createdAt;
        const dateA = dateStrA ? new Date(dateStrA).getTime() : 0;
        const dateB = dateStrB ? new Date(dateStrB).getTime() : 0;
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      })
    }));
    
    console.log('Interagentes únicos encontrados:', patients.length);
    console.log('Lista de interagentes:', patients);
    setUniquePatients(patients);
    
    // Se tem ID na URL, carregar esse registro
    if (id) {
      const found = saved.find((x) => String(x.id) === String(id));
      if (found) {
        setEntry(found);
        const patientName = found.nome || found.q01_nome;
        const patient = patients.find(p => p.name === patientName);
        setSelectedPatient(patient);
        if (patient) {
          setPatientAnamneses(patient.anamneses);
        }
      }
    } else {
      // Sem ID na URL → auto-seleciona paciente ativo da consulta
      const currentPid = localStorage.getItem('currentPatientId');
      if (currentPid) {
        const currentEntry = saved.find(x => String(x.id) === String(currentPid));
        if (currentEntry) {
          setEntry(currentEntry);
          const patientName = currentEntry.nome || currentEntry.q01_nome;
          const patient = patients.find(p => p.name === patientName);
          if (patient) {
            setSelectedPatient(patient);
            setPatientAnamneses(patient.anamneses);
          }
        }
      }
    }
  }, [id]);

  // Carregar protocolos salvos quando entry muda
  useEffect(() => {
    if (!entry) {
      setSavedProtocolsData([]);
      return;
    }
    const patientId = String(entry.id || entry.patientId || '');
    if (patientId) {
      setSavedProtocolsData(getSavedProtocols(patientId));
    } else {
      setSavedProtocolsData([]);
    }
  }, [entry]);

  // Gerar dados terapêuticos quando entry muda
  useEffect(() => {
    if (!entry) {
      console.log('Entry vazio, limpando dados terapêuticos');
      setTherapeuticData([]);
      setBoarimProtocols([]);
      return;
    }

    console.log('=== GERANDO DADOS TERAPÊUTICOS ===');
    console.log('Entry completa:', entry);

    // Verificar se existem dados salvos (advancedTherapiesData OU tratamentos separados)
    const savedTherapies = [];
    
    // Buscar no campo consolidado
    if (entry.advancedTherapiesData && Array.isArray(entry.advancedTherapiesData) && entry.advancedTherapiesData.length > 0) {
      console.log('✅ AdvancedTherapiesData encontrados:', entry.advancedTherapiesData.length, 'item(ns)');
      savedTherapies.push(...entry.advancedTherapiesData);
    }
    
    // Buscar também nos campos separados (compatibilidade)
    if (entry.tratamentosHomeopatia && Array.isArray(entry.tratamentosHomeopatia) && entry.tratamentosHomeopatia.length > 0) {
      console.log('✅ Tratamentos Homeopatia encontrados:', entry.tratamentosHomeopatia.length, 'item(ns)');
      savedTherapies.push(...entry.tratamentosHomeopatia);
    }
    if (entry.tratamentosAromaterapia && Array.isArray(entry.tratamentosAromaterapia) && entry.tratamentosAromaterapia.length > 0) {
      console.log('✅ Tratamentos Aromaterapia encontrados:', entry.tratamentosAromaterapia.length, 'item(ns)');
      savedTherapies.push(...entry.tratamentosAromaterapia);
    }
    if (entry.tratamentosOleosEssenciais && Array.isArray(entry.tratamentosOleosEssenciais) && entry.tratamentosOleosEssenciais.length > 0) {
      console.log('✅ Tratamentos Óleos Essenciais encontrados:', entry.tratamentosOleosEssenciais.length, 'item(ns)');
      savedTherapies.push(...entry.tratamentosOleosEssenciais);
    }
    
    if (savedTherapies.length > 0) {
      console.log('✅ Total de tratamentos salvos encontrados:', savedTherapies.length);
      setTherapeuticData(savedTherapies);
      setAutoProtocol(null);
    } else {
      console.log('⚠️ Nenhum AdvancedTherapiesData salvo — gerando protocolo automático da anamnese...');
      
      // Auto-gerar protocolos a partir dos dados da anamnese
      try {
        const proto = autoGenerateProtocols(entry);
        console.log('✅ Protocolo auto-gerado:', proto);
        setAutoProtocol(proto);
        // Preencher boarimProtocols para o consolidateAllTherapies também funcionar
        if (proto?.boarimProtocols?.length) {
          setBoarimProtocols(proto.boarimProtocols);
        }
      } catch (err) {
        console.warn('Erro no autoGenerateProtocols:', err);
        setAutoProtocol(null);
      }
      setTherapeuticData([]);
    }
    
    // Coletar sintomas para protocolos Boarim
    const symptoms = [];
    if (entry.queixaPrincipal || entry.q15_queixa_principal) symptoms.push('queixa_principal');
    if (entry.dor) symptoms.push('dor');
    if (entry.febre) symptoms.push('febre');
    if (entry.tosse) symptoms.push('tosse');
    if (entry.cansaco || entry.q47_cansaco) symptoms.push('cansaco');
    if (entry.faltaAr) symptoms.push('falta_ar');
    if (entry.narizEntupido) symptoms.push('nariz_entupido');
    if (entry.dorGarganta) symptoms.push('dor_garganta');
    if (entry.nausea || entry.q42_nauseas) symptoms.push('nausea');
    if (entry.vomito) symptoms.push('vomito');
    if (entry.diarreia) symptoms.push('diarreia');
    if (entry.intestinoPreso || entry.q39_intestino === 'Preso') symptoms.push('intestino_preso');
    if (entry.q48_estresse === 'Sim' || entry.q48_estresse === 'sim') symptoms.push('estresse');
    if (entry.q49_ansiedade === 'Sim' || entry.q49_ansiedade === 'sim') symptoms.push('ansiedade');
    
    // Analisar texto livre
    const textoLivre = entry.outrosSintomas || entry.q15_queixa_principal || '';
    if (textoLivre) {
      const text = textoLivre.toLowerCase();
      if (text.includes('intestino') || text.includes('constip')) symptoms.push('intestino_preso');
      if (text.includes('ansiedade') || text.includes('nervos')) symptoms.push('ansiedade');
      if (text.includes('insônia') || text.includes('sono')) symptoms.push('insonia');
      if (text.includes('dor de cabeça') || text.includes('cefaleia')) symptoms.push('cefaleia');
      if (text.includes('fígado') || text.includes('hepat')) symptoms.push('figado');
      if (text.includes('gordura') || text.includes('esteatose')) symptoms.push('gordura_figado');
    }
    
    console.log('Sintomas identificados:', symptoms);
    
    // Buscar protocolos Boarim
    const protocols = getBoarimProtocolsBySymptoms(symptoms);
    console.log('Protocolos Boarim encontrados:', protocols);
    setBoarimProtocols(protocols || []);
  }, [entry]);

  // Consolidar quando os dados estiverem prontos
  useEffect(() => {
    console.log('=== VERIFICANDO CONSOLIDAÇÃO ===');
    console.log('Entry existe?', !!entry);
    console.log('TherapeuticData:', therapeuticData);
    console.log('BoarimProtocols:', boarimProtocols);
    
    if (entry) {
      console.log('Consolidando dados terapêuticos...');
      const consolidated = consolidateAllTherapies(entry, therapeuticData, boarimProtocols);
      console.log('✅ Resultado consolidado:', consolidated);
      setConsolidatedTherapies(consolidated);
    } else {
      console.log('Entry não existe, limpando consolidação');
      setConsolidatedTherapies(null);
    }
  }, [entry, therapeuticData, boarimProtocols]);

  // Debug: Monitorar mudanças em patientAnamneses
  useEffect(() => {
    console.log('Estado de patientAnamneses atualizado:', patientAnamneses);
    console.log('Total de opções no Autocomplete:', patientAnamneses.length);
  }, [patientAnamneses]);

  // Handle patient selection
  const handlePatientSelect = (event, patient) => {
    console.log('Interagente selecionado:', patient);
    setSelectedPatient(patient);
    setEntry(null); // Limpa a entrada atual
    setConsolidatedTherapies(null); // Limpa terapias consolidadas
    if (patient) {
      console.log('Anamneses do interagente:', patient.anamneses);
      console.log('Total de avaliações:', patient.anamneses.length);
      setPatientAnamneses(patient.anamneses);
      
      // Se houver apenas UMA avaliação, seleciona automaticamente
      if (patient.anamneses.length === 1) {
        console.log('Apenas 1 avaliação encontrada, selecionando automaticamente:', patient.anamneses[0]);
        setEntry(patient.anamneses[0]);
      }
    } else {
      console.log('Nenhum interagente selecionado');
      setPatientAnamneses([]);
    }
  };

  // Handle anamnese date selection
  const handleDateSelect = (event, anamnese) => {
    console.log('Anamnese selecionada:', anamnese);
    if (anamnese) {
      setEntry(anamnese);
    } else {
      setEntry(null);
    }
  };

  // Handle print action
  useEffect(() => {
    if (shouldPrint && entry) {
      setTimeout(() => window.print(), 1000);
    }
  }, [shouldPrint, entry]);

  // Handle download action
  useEffect(() => {
    if (shouldDownload && entry) {
      setTimeout(() => downloadPdf(), 1000);
    }
  }, [shouldDownload, entry]);

  async function downloadConsolidatedTherapies() {
    const el = document.getElementById('consolidated-therapies-section');
    if (!el || !entry) return;

    const patientName = entry.nome || entry.q01_nome || 'interagente';
    const dateStr = entry.dataConsulta ? new Date(entry.dataConsulta).toLocaleDateString('pt-BR').replace(/\//g, '-') : new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    
    try {
      // Clonar elemento e remover cabeçalho interno (buildLetterheadHtml já adiciona o seu)
      const clone = el.cloneNode(true);
      clone.querySelectorAll('[data-nopdf]').forEach(n => n.remove());
      const bodyHtml = clone.innerHTML;
      const qr = `${window.location.origin}/anamnese/${entry.id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ 
        title: `Sugestões Terapêuticas - ${patientName}`, 
        bodyHtml, 
        qrUrl 
      });
      await downloadPdfFromHtml(html, `sugestoes-terapeuticas-${patientName}-${dateStr}.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  }

  async function downloadPdf() {
    const el = document.getElementById('prescription-print-area');
    if (!el) return;

    const patientName = entry?.nome ? entry.nome.replace(/\s+/g, '-').toLowerCase() : 'paciente';
    const opt = { 
      margin: 0.5, 
      filename: `${patientName}-sugestoes-terapeuticas.pdf`, 
      image: { type: 'jpeg', quality: 0.98 }, 
      html2canvas: { scale: 2, useCORS: true }, 
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } 
    };
    
    try {
      const bodyHtml = el.innerHTML;
      const qr = `${window.location.origin}/anamnese/${entry.id}`;
      const qrUrl = await generateQrDataUrl(qr);
      const html = await buildLetterheadHtml({ title: `${entry.nome || entry.q01_nome}-sugestoes-terapeuticas`, bodyHtml, qrUrl });
      await downloadPdfFromHtml(html, `${patientName}-sugestoes-terapeuticas.pdf`);
    } catch (err) {
      console.error('PDF error:', err);
      window.print();
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return new Date().toLocaleDateString('pt-BR');
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR');
    } catch (e) {
      return new Date().toLocaleDateString('pt-BR');
    }
  };

  // Receituário mestre consolidado (sem repetições)
  const masterPrescription = entry ? buildMasterPrescription(entry, consolidatedTherapies, savedProtocolsData) : null;
  const hasMasterContent = masterPrescription && (
    masterPrescription.fitoterapia.length > 0 ||
    masterPrescription.suplementacao.length > 0 ||
    masterPrescription.homeopatia.length > 0 ||
    masterPrescription.oleos.length > 0 ||
    masterPrescription.probioticos.length > 0 ||
    masterPrescription.orientacoes.length > 0
  );
  const safetyReview = entry && masterPrescription
    ? evaluateProtocolSafety(entry, masterPrescription)
    : null;

  // Quando há id na URL mas entry não foi encontrado, mostra estado de carregamento/não encontrado
  if (id && !entry && allAnamneses.length > 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Receituário não encontrado</Typography>
          <Typography>Não foi possível encontrar dados para o interagente com ID: {id}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate('/dashboard')}>
            ← Voltar ao Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Seleção de Interagente */}
      {!id && (
        <Paper sx={{ p: 3, mt: 3, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#2e7d32', fontWeight: 600, mb: 3 }}>
            🌿 SUGESTÕES TERAPÊUTICAS INTEGRATIVAS
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={uniquePatients}
                getOptionLabel={(option) => option.name}
                value={selectedPatient}
                onChange={handlePatientSelect}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Selecione o Interagente"
                    variant="outlined"
                    helperText={uniquePatients.length === 0 ? 'Nenhum interagente cadastrado' : `${uniquePatients.length} interagente(s) disponível(is)`}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2e7d32' }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body1">{option.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.anamneses.length} avaliação(ões) registrada(s) para este interagente
                      </Typography>
                    </Box>
                  </Box>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Autocomplete
                disabled={!selectedPatient || patientAnamneses.length === 0}
                options={patientAnamneses}
                getOptionLabel={(option) => {
                  const dateStr = option.dataConsulta || option.data || option.createdAt;
                  const date = dateStr ? new Date(dateStr).toLocaleDateString('pt-BR') : 'Data não informada';
                  return `${date} - ${option.queixaPrincipal || option.q02_queixa_principal || 'Sem queixa principal'}`;
                }}
                value={entry || null}
                onChange={handleDateSelect}
                isOptionEqualToValue={(option, value) => option.id === value?.id}
                noOptionsText="Nenhuma avaliação encontrada"
                renderOption={(props, option) => (
                  <Box component="li" {...props}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {(() => {
                          const dateStr = option.dataConsulta || option.data || option.createdAt;
                          return dateStr ? new Date(dateStr).toLocaleDateString('pt-BR') : 'Data não informada';
                        })()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.queixaPrincipal || option.q02_queixa_principal || 'Sem queixa principal'}
                      </Typography>
                    </Box>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Data da Avaliação"
                    variant="outlined"
                    placeholder={!selectedPatient ? 'Selecione um interagente primeiro' : 'Clique para selecionar a data'}
                    helperText={selectedPatient ? `${patientAnamneses.length} avaliação(ões) disponível(is)` : 'Selecione um interagente primeiro'}
                  />
                )}
              />
            </Grid>
          </Grid>

          {!selectedPatient && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Selecione um interagente e a data da avaliação para visualizar as sugestões terapêuticas consolidadas.
            </Alert>
          )}
          
          {selectedPatient && entry && !consolidatedTherapies && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Carregando sugestões terapêuticas... Verifique o console para mais informações.
            </Alert>
          )}
        </Paper>
      )}

      {/* Botões de Ação */}
      {entry && consolidatedTherapies && (
        <Box className="no-print" sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
          >
            ↩️ Voltar
          </Button>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            🖨️ Imprimir
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
            onClick={downloadConsolidatedTherapies}
            sx={{ bgcolor: '#2e7d32', '&:hover': { bgcolor: '#1b5e20' } }}
          >
            📄 Baixar Sugestões Terapêuticas
          </Button>
          <Button
            variant="contained"
            color="info"
            startIcon={<SaveIcon />}
            onClick={handleSaveHistorico}
          >
            💾 Salvar no Histórico
          </Button>
          {savedMsg && <Chip label={savedMsg} color="success" size="small" sx={{ alignSelf: 'center' }} />}
        </Box>
      )}

      {/* SEÇÃO DE SUGESTÕES TERAPÊUTICAS CONSOLIDADAS */}
      {entry && consolidatedTherapies && (() => {
        console.log('RENDERIZANDO SEÇÃO CONSOLIDADA!');
        console.log('consolidatedTherapies:', consolidatedTherapies);
        return true;
      })() && (
        <Paper id="consolidated-therapies-section" sx={{ p: 4, mb: 3, background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)' }}>
          {/* Cabeçalho */}
          <Box data-nopdf="true" sx={{ 
            textAlign: 'center', 
            mb: 3,
            pb: 2,
            borderBottom: '3px double #2e7d32'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
              <img
                src={therapistSymbol}
                alt="Símbolo Terapeuta"
                style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'contain', border: '2px solid #2e7d32' }}
              />
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1b5e20', lineHeight: 1.2 }}>
                  Wander Pires Silva Coelho
                </Typography>
                <Typography variant="body2" sx={{ color: '#388e3c', lineHeight: 1.3 }}>
                  Terapeuta Integrativo Funcional
                </Typography>
                <Typography variant="body2" sx={{ color: '#546e7a', fontSize: '0.8rem', lineHeight: 1.3 }}>
                  Naturopatia e Iridologia · CRTH-BR 17821
                </Typography>
              </Box>
            </Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700, 
              color: '#2e7d32',
              letterSpacing: 1.5,
              mt: 1,
              mb: 0.5
            }}>
              SUGESTÕES TERAPÊUTICAS INTEGRATIVAS
            </Typography>
            <Typography variant="body2" sx={{ color: '#558b2f', fontStyle: 'italic', mb: 1 }}>
              Protocolo Personalizado para {entry.nome || entry.q01_nome}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Data da Avaliação: {formatDate(entry.dataConsulta || entry.data || entry.createdAt)}
            </Typography>
          </Box>

          {/* Sintomas Identificados */}
          {consolidatedTherapies.symptoms && consolidatedTherapies.symptoms.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32', mb: 2 }}>
                📋 Sintomas e Condições Identificadas:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {consolidatedTherapies.symptoms.map((symptom, idx) => (
                  <Chip
                    key={idx}
                    label={symptom}
                    size="small"
                    sx={{
                      bgcolor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 500,
                      border: '1px solid #a5d6a7'
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Resumo do protocolo consolidado */}
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              📊 Protocolos encontrados para {entry.nome || entry.q01_nome}:
            </Typography>
            {consolidatedTherapies.homeopathy?.length > 0 && <Typography variant="body2">• Homeopatia: {consolidatedTherapies.homeopathy.length} remédio(s)</Typography>}
            {consolidatedTherapies.essentialOils?.length > 0 && <Typography variant="body2">• Óleos Essenciais: {consolidatedTherapies.essentialOils.length} óleo(s)</Typography>}
            {consolidatedTherapies.aromatherapy?.length > 0 && <Typography variant="body2">• Aromaterapia: {consolidatedTherapies.aromatherapy.length} item(ns)</Typography>}
            {consolidatedTherapies.phytotherapy?.length > 0 && <Typography variant="body2">• Fitoterapia (Boarim): {consolidatedTherapies.phytotherapy.length} planta(s)</Typography>}
            {autoProtocol?.conditionsDetected?.length > 0 && <Typography variant="body2">• Condições detectadas (auto): {autoProtocol.conditionsDetected.length}</Typography>}
            {entry.phytotherapyProtocols?.cartItems?.length > 0 && <Typography variant="body2">• Receituário Fitoterápico: {entry.phytotherapyProtocols.cartItems.length} planta(s)</Typography>}
            {entry.probioticsRecommendation?.recommendations?.strains?.length > 0 && <Typography variant="body2">• Probióticos: {entry.probioticsRecommendation.recommendations.strains.length} cepa(s)</Typography>}
            {entry.vitaminDeficiencyAnalyzer?.analiseDeficiencias?.deficiencias?.length > 0 && <Typography variant="body2">• Análise Vitaminas: {entry.vitaminDeficiencyAnalyzer.analiseDeficiencias.deficiencias.length} deficiência(s)</Typography>}
            {entry.examRequests?.examsList?.length > 0 && <Typography variant="body2">• Exames Laboratoriais: {entry.examRequests.examsList.length} exame(s)</Typography>}
            {entry.subclinicalIntegrativeAnalysis?.selectedItems?.length > 0 && <Typography variant="body2">• Análise Subclínica: {entry.subclinicalIntegrativeAnalysis.selectedItems.length} área(s) — {entry.subclinicalIntegrativeAnalysis.selectedSignIds?.length || 0} sinal(is)</Typography>}
            {savedProtocolsData?.length > 0 && <Typography variant="body2">• Protocolos da Consulta: {savedProtocolsData.length} condição(ões)</Typography>}
          </Alert>

          {safetyReview && (
            <Alert severity={safetyReview.matchedRisks.some(item => item.risk === 'redFlag') ? 'error' : 'warning'} sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                Revisão de segurança obrigatória antes da conduta
              </Typography>
              {safetyReview.warnings.map((warning, index) => (
                <Typography variant="body2" key={index}>• {warning}</Typography>
              ))}
            </Alert>
          )}

          {/* ══════════════════════════════════════════════════════════
              PROTOCOLOS AUTO-GERADOS (a partir da anamnese)
              Mostrado quando não há dados manuais de Terapias Avançadas
              ══════════════════════════════════════════════════════════ */}
          {autoProtocol && autoProtocol.conditionsDetected?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  🤖 Protocolo gerado automaticamente com base nos dados da anamnese
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                  Condições identificadas: {autoProtocol.conditionsDetected.join(' · ')}
                </Typography>
              </Alert>

              {/* Condições detectadas */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {autoProtocol.conditionsDetected.map((k, i) => (
                  <Chip key={i} label={k.replace(/_/g, ' ')} size="small"
                    sx={{ bgcolor: '#e8f5e9', color: '#1b5e20', fontWeight: 600, border: '1px solid #a5d6a7' }} />
                ))}
              </Box>

              {/* ── ORIENTAÇÕES GERAIS ─────────────────────────────── */}
              {autoProtocol.orientacoes?.length > 0 && (
                <Accordion defaultExpanded sx={{ mb: 2, border: '1px solid #c8e6c9', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8f5e9', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1b5e20' }}>
                      📋 Orientações e Condutas Gerais
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.orientacoes.map((o, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#f1f8e9', borderRadius: 1, borderLeft: '4px solid #66bb6a' }}>
                        <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block' }}>{o.condicao}</Typography>
                        <Typography variant="body2">{o.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── FITOTERAPIA ────────────────────────────────────── */}
              {autoProtocol.fitoterapia?.length > 0 && (
                <Accordion defaultExpanded sx={{ mb: 2, border: '1px solid #c8e6c9', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f1f8e9', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                      🌿 Fitoterapia
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.fitoterapia.map((f, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #dcedc8', borderLeft: '4px solid #8bc34a' }}>
                        <Typography variant="caption" sx={{ color: '#558b2f', fontWeight: 600, display: 'block' }}>{f.condicao}</Typography>
                        <Typography variant="body2">{f.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── SUPLEMENTAÇÃO ──────────────────────────────────── */}
              {autoProtocol.suplementacao?.length > 0 && (
                <Accordion defaultExpanded sx={{ mb: 2, border: '1px solid #b3e5fc', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e1f5fe', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#01579b' }}>
                      💊 Suplementação / Nutrição Ortomolecular
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.suplementacao.map((s, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #b3e5fc', borderLeft: '4px solid #29b6f6' }}>
                        <Typography variant="caption" sx={{ color: '#0277bd', fontWeight: 600, display: 'block' }}>{s.condicao}</Typography>
                        <Typography variant="body2">{s.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── HOMEOPATIA ─────────────────────────────────────── */}
              {autoProtocol.homeopatia?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #e1bee7', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f3e5f5', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#6a1b9a' }}>
                      ⚗️ Homeopatia
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.homeopatia.map((h, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #e1bee7', borderLeft: '4px solid #ab47bc' }}>
                        <Typography variant="caption" sx={{ color: '#7b1fa2', fontWeight: 600, display: 'block' }}>{h.condicao}</Typography>
                        <Typography variant="body2">{h.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── ALIMENTAÇÃO ────────────────────────────────────── */}
              {autoProtocol.alimentacao?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #ffe0b2', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fff3e0', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#e65100' }}>
                      🥗 Dietoterapia / Alimentação Funcional
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.alimentacao.map((a, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #ffe0b2', borderLeft: '4px solid #ff9800' }}>
                        <Typography variant="caption" sx={{ color: '#bf360c', fontWeight: 600, display: 'block' }}>{a.condicao}</Typography>
                        <Typography variant="body2">{a.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── HIDROTERAPIA ───────────────────────────────────── */}
              {autoProtocol.hidroterapia?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #b2ebf2', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0f7fa', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#006064' }}>
                      💧 Hidroterapia
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.hidroterapia.map((h, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #b2ebf2', borderLeft: '4px solid #00bcd4' }}>
                        <Typography variant="caption" sx={{ color: '#00838f', fontWeight: 600, display: 'block' }}>{h.condicao}</Typography>
                        <Typography variant="body2">{h.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── FLORAIS ────────────────────────────────────────── */}
              {autoProtocol.florais?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #fce4ec', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fce4ec', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#880e4f' }}>
                      🌸 Florais / Terapia Vibracional
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.florais.map((f, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #fce4ec', borderLeft: '4px solid #e91e63' }}>
                        <Typography variant="body2">{f.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── MEDICINA TRADICIONAL CHINESA ───────────────────── */}
              {autoProtocol.tcm?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #ffccbc', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fbe9e7', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#bf360c' }}>
                      ☯️ Medicina Tradicional Chinesa / Acupuntura
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.tcm.map((t, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #ffccbc', borderLeft: '4px solid #ff5722' }}>
                        <Typography variant="caption" sx={{ color: '#bf360c', fontWeight: 600, display: 'block' }}>{t.condicao}</Typography>
                        <Typography variant="body2">{t.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── GEOTERAPIA ─────────────────────────────────────── */}
              {autoProtocol.geoterapia?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #d7ccc8', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#efebe9', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#4e342e' }}>
                      🪨 Geoterapia / Argiloterapia
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.geoterapia.map((g, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #d7ccc8', borderLeft: '4px solid #795548' }}>
                        <Typography variant="caption" sx={{ color: '#5d4037', fontWeight: 600, display: 'block' }}>{g.condicao}</Typography>
                        <Typography variant="body2">{g.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── ÓLEOS ESSENCIAIS / AROMATERAPIA ────────────────── */}
              {autoProtocol.oleos?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #fff9c4', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fffde7', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57f17' }}>
                      🌼 Óleos Essenciais / Aromaterapia
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.oleos.map((o, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #fff9c4', borderLeft: '4px solid #fbc02d' }}>
                        <Typography variant="caption" sx={{ color: '#f57f17', fontWeight: 600, display: 'block' }}>{o.condicao}</Typography>
                        <Typography variant="body2">{o.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── OUTRAS TERAPIAS ────────────────────────────────── */}
              {autoProtocol.outrasTherapias?.length > 0 && (
                <Accordion sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: '8px!important' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#424242' }}>
                      🔬 Outras Terapias (Reflexologia, Massoterapia, etc.)
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {autoProtocol.outrasTherapias.map((o, i) => (
                      <Box key={i} sx={{ mb: 1.5, p: 1.5, bgcolor: '#fff', borderRadius: 1, border: '1px solid #e0e0e0', borderLeft: '4px solid #9e9e9e' }}>
                        <Typography variant="caption" sx={{ color: '#616161', fontWeight: 600, display: 'block' }}>{o.condicao}</Typography>
                        <Typography variant="body2">{o.item}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* ── PROTOCOLOS BOARIM ──────────────────────────────── */}
              {autoProtocol.boarimProtocols?.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#1b5e20', mb: 2, pb: 1, borderBottom: '2px solid #81c784' }}>
                    📘 Protocolos Naturais (Manual Boarim)
                  </Typography>
                  {autoProtocol.boarimProtocols.map((prot, pi) => (
                    <Accordion key={pi} sx={{ mb: 2, border: '1px solid #c8e6c9', borderRadius: '8px!important' }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8f5e9' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                          {prot.condicao}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {prot.hidroterapia?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#006064', mb: 1 }}>💧 Hidroterapia</Typography>
                            {prot.hidroterapia.map((h, i) => <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {h}</Typography>)}
                          </Box>
                        )}
                        {prot.fitoterapia?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#2e7d32', mb: 1 }}>🌿 Fitoterapia</Typography>
                            {prot.fitoterapia.map((f, i) => <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {f}</Typography>)}
                          </Box>
                        )}
                        {prot.suplementacao?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#01579b', mb: 1 }}>💊 Suplementação</Typography>
                            {prot.suplementacao.map((s, i) => <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {s}</Typography>)}
                          </Box>
                        )}
                        {prot.alimentacao?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#e65100', mb: 1 }}>🥗 Alimentação</Typography>
                            {prot.alimentacao.map((a, i) => <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {a}</Typography>)}
                          </Box>
                        )}
                        {prot.habitos?.length > 0 && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#37474f', mb: 1 }}>🏃 Hábitos de Vida</Typography>
                            {prot.habitos.map((h, i) => <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {h}</Typography>)}
                          </Box>
                        )}
                        {prot.observacoes && (
                          <Alert severity="info" sx={{ mt: 1 }}>
                            <Typography variant="body2">{prot.observacoes}</Typography>
                          </Alert>
                        )}
                        {prot.referencia && (
                          <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic', color: '#666' }}>
                            📚 {prot.referencia}
                          </Typography>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
            </Box>
          )}

          {/* Mensagem fallback se nem auto-protocolo nem manual */}
          {!autoProtocol && (!consolidatedTherapies.homeopathy || consolidatedTherapies.homeopathy.length === 0) &&
           (!consolidatedTherapies.essentialOils || consolidatedTherapies.essentialOils.length === 0) &&
           (!consolidatedTherapies.aromatherapy || consolidatedTherapies.aromatherapy.length === 0) &&
           (!consolidatedTherapies.phytotherapy || consolidatedTherapies.phytotherapy.length === 0) &&
           (!consolidatedTherapies.hydrotherapy || consolidatedTherapies.hydrotherapy.length === 0) &&
           (!consolidatedTherapies.nutritional || consolidatedTherapies.nutritional.length === 0) &&
           (!consolidatedTherapies.lifestyle || consolidatedTherapies.lifestyle.length === 0) && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                ⚠️ Nenhuma sugestão terapêutica encontrada
              </Typography>
              <Typography variant="body2">
                Preencha mais campos da anamnese (sintomas, queixas, dados biométricos) para que o sistema
                possa gerar automaticamente os protocolos terapêuticos.
              </Typography>
            </Alert>
          )}

          {/* HOMEOPATIA */}
          {consolidatedTherapies.homeopathy && consolidatedTherapies.homeopathy.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                💊 Homeopatia
              </Typography>
              {consolidatedTherapies.homeopathy.map((remedy, idx) => (
                <Box key={idx} sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: '#fff', 
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  borderBottom: '3px solid #81c784'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                    {remedy.name}
                  </Typography>
                  
                  {remedy.indication && (
                    <Typography variant="body2" sx={{ mb: 1, color: '#1976d2', fontStyle: 'italic' }}>
                      <strong>Indicação:</strong> {remedy.indication}
                    </Typography>
                  )}
                  
                  {remedy.dosage && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Posologia:</strong> {remedy.dosage}
                    </Typography>
                  )}
                  
                  {remedy.duration && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Duração:</strong> {remedy.duration}
                    </Typography>
                  )}
                  
                  {remedy.contraindications && remedy.contraindications.length > 0 && (
                    <Alert severity="warning" sx={{ mt: 2, mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        ⚠️ Contraindicações:
                      </Typography>
                      {remedy.contraindications.map((contra, cIdx) => (
                        <Typography key={cIdx} variant="caption" sx={{ display: 'block' }}>
                          • {contra}
                        </Typography>
                      ))}
                    </Alert>
                  )}
                  
                  {remedy.safety && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, p: 1, bgcolor: '#fff3cd', borderRadius: 1 }}>
                      💡 <strong>Orientações de Segurança:</strong> {remedy.safety}
                    </Typography>
                  )}
                  
                  {remedy.references && remedy.references.length > 0 && (
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, fontStyle: 'italic', color: '#666' }}>
                      📚 <strong>Fontes:</strong> {remedy.references.slice(0, 2).join('; ')}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* ÓLEOS ESSENCIAIS */}
          {consolidatedTherapies.essentialOils && consolidatedTherapies.essentialOils.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                🌿 Óleos Essenciais
              </Typography>
              {consolidatedTherapies.essentialOils.map((oil, idx) => (
                <Box key={idx} sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: '#fff', 
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  borderBottom: '3px solid #81c784'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                    {oil.name}
                  </Typography>
                  
                  {oil.indication && (
                    <Typography variant="body2" sx={{ mb: 1, color: '#1976d2', fontStyle: 'italic' }}>
                      <strong>Indicação:</strong> {oil.indication}
                    </Typography>
                  )}
                  
                  {oil.properties && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Propriedades:</strong> {oil.properties}
                    </Typography>
                  )}
                  
                  {oil.usage && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Modo de Uso:</strong> {oil.usage}
                    </Typography>
                  )}
                  
                  {oil.dosage && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Dosagem:</strong> {oil.dosage}
                    </Typography>
                  )}
                  
                  {oil.duration && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Duração:</strong> {oil.duration}
                    </Typography>
                  )}
                  
                  {oil.contraindications && oil.contraindications.length > 0 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        ⚠️ Contraindicações:
                      </Typography>
                      {oil.contraindications.map((contra, cIdx) => (
                        <Typography key={cIdx} variant="caption" sx={{ display: 'block' }}>
                          • {contra}
                        </Typography>
                      ))}
                    </Alert>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* AROMATERAPIA */}
          {consolidatedTherapies.aromatherapy && consolidatedTherapies.aromatherapy.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                🌸 Aromaterapia
              </Typography>
              {consolidatedTherapies.aromatherapy.map((aroma, idx) => (
                <Box key={idx} sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: '#fff', 
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  borderBottom: '3px solid #81c784'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#2e7d32', mb: 1 }}>
                    {aroma.name}
                  </Typography>
                  
                  {aroma.indication && (
                    <Typography variant="body2" sx={{ mb: 1, color: '#1976d2', fontStyle: 'italic' }}>
                      <strong>Indicação:</strong> {aroma.indication}
                    </Typography>
                  )}
                  
                  {aroma.properties && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Propriedades:</strong> {aroma.properties}
                    </Typography>
                  )}
                  
                  {aroma.uses && Array.isArray(aroma.uses) && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Formas de Uso:
                      </Typography>
                      {aroma.uses.map((use, uIdx) => (
                        <Typography key={uIdx} variant="body2" sx={{ pl: 2, mb: 0.5 }}>
                          • {use}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* FITOTERAPIA */}
          {consolidatedTherapies.phytotherapy && consolidatedTherapies.phytotherapy.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                🍃 Fitoterapia (Plantas Medicinais)
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {consolidatedTherapies.phytotherapy.map((plant, idx) => (
                  <Typography key={idx} component="li" variant="body2" sx={{ mb: 1 }}>
                    <strong>{plant.name}</strong> - {plant.usage} {plant.indication && `(${plant.indication})`}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {/* HIDROTERAPIA */}
          {consolidatedTherapies.hydrotherapy && consolidatedTherapies.hydrotherapy.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                💧 Hidroterapia
              </Typography>
              {consolidatedTherapies.hydrotherapy.map((hydro, idx) => (
                <Box key={idx} sx={{ 
                  mb: 2, 
                  p: 2, 
                  bgcolor: '#fff', 
                  borderRadius: 2,
                  border: '1px solid #e0e0e0'
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {hydro.treatment}
                  </Typography>
                  {hydro.temperature && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Temperatura:</strong> {hydro.temperature}
                    </Typography>
                  )}
                  {hydro.duration && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Duração:</strong> {hydro.duration}
                    </Typography>
                  )}
                  {hydro.frequency && (
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Frequência:</strong> {hydro.frequency}
                    </Typography>
                  )}
                  {hydro.indication && (
                    <Typography variant="body2" sx={{ color: '#1976d2', fontStyle: 'italic' }}>
                      <strong>Para:</strong> {hydro.indication}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* ORIENTAÇÕES NUTRICIONAIS */}
          {consolidatedTherapies.nutritional && consolidatedTherapies.nutritional.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                🥗 Orientações Nutricionais
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
                    <Typography variant="h6" sx={{ color: '#c62828', mb: 1 }}>
                      ❌ Evitar
                    </Typography>
                    {consolidatedTherapies.nutritional
                      .filter(n => n.type === 'avoid')
                      .map((item, idx) => (
                        <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                          • {item.recommendation}
                        </Typography>
                      ))}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                    <Typography variant="h6" sx={{ color: '#2e7d32', mb: 1 }}>
                      ✅ Incluir
                    </Typography>
                    {consolidatedTherapies.nutritional
                      .filter(n => n.type === 'include')
                      .map((item, idx) => (
                        <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                          • {item.recommendation}
                        </Typography>
                      ))}
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* PRÁTICAS INTEGRATIVAS */}
          {consolidatedTherapies.lifestyle && consolidatedTherapies.lifestyle.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 600, 
                color: '#2e7d32', 
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #81c784'
              }}>
                🧘 Práticas Integrativas e Estilo de Vida
              </Typography>
              <Box component="ul" sx={{ pl: 3 }}>
                {consolidatedTherapies.lifestyle.map((practice, idx) => (
                  <Typography key={idx} component="li" variant="body2" sx={{ mb: 1 }}>
                    {typeof practice === 'string' ? practice : practice.description || practice.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          {/* PROTOCOLOS SALVOS DA ANAMNESE */}
          {savedProtocolsData && savedProtocolsData.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{
                fontWeight: 700,
                color: '#1565c0',
                mb: 2,
                pb: 1,
                borderBottom: '2px solid #1976d2',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                📌 Protocolos Salvos da Consulta
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, color: '#555', fontStyle: 'italic' }}>
                Protocolos marcados durante o atendimento, agrupados com eliminação de sugestões repetidas.
              </Typography>

              {(() => {
                // Desduplica fitoterapia, suplementação, homeopatia, aromaterapia por nome
                const fitoterapiaMap = new Map();
                const suplementacaoMap = new Map();
                const homeopatiaMap = new Map();
                const aromaterapiaMap = new Map();
                const orientacoes = new Set();

                savedProtocolsData.forEach(proto => {
                  (proto.fitoterapia || []).forEach(f => {
                    const key = (f.nome || '').toLowerCase();
                    if (key && !fitoterapiaMap.has(key)) fitoterapiaMap.set(key, { ...f, _condicao: proto.conditionNome });
                  });
                  (proto.suplementacao || []).forEach(s => {
                    const key = (s.nutriente || s.nome || '').toLowerCase();
                    if (key && !suplementacaoMap.has(key)) suplementacaoMap.set(key, { ...s, _condicao: proto.conditionNome });
                  });
                  (proto.homeopatia || []).forEach(h => {
                    const key = (h.medicamento || h.nome || '').toLowerCase();
                    if (key && !homeopatiaMap.has(key)) homeopatiaMap.set(key, { ...h, _condicao: proto.conditionNome });
                  });
                  (proto.aromaterapia || []).forEach(a => {
                    const key = (a.oleo || a.nome || '').toLowerCase();
                    if (key && !aromaterapiaMap.has(key)) aromaterapiaMap.set(key, { ...a, _condicao: proto.conditionNome });
                  });
                  (proto.orientacoesGerais || []).forEach(o => {
                    if (o) orientacoes.add(o);
                  });
                });

                const fito = Array.from(fitoterapiaMap.values());
                const supl = Array.from(suplementacaoMap.values());
                const homeo = Array.from(homeopatiaMap.values());
                const aroma = Array.from(aromaterapiaMap.values());
                const orientList = Array.from(orientacoes);

                return (
                  <Box>
                    {/* Condições incluídas */}
                    <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {savedProtocolsData.map((p, i) => (
                        <Chip
                          key={i}
                          label={p.conditionNome}
                          size="small"
                          sx={{ bgcolor: '#e3f2fd', color: '#1565c0', fontWeight: 600, border: '1px solid #90caf9' }}
                        />
                      ))}
                    </Box>

                    {/* Fitoterapia */}
                    {fito.length > 0 && (
                      <Accordion defaultExpanded sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e8f5e9' }}>
                          <Typography sx={{ fontWeight: 700, color: '#2e7d32' }}>🌿 Fitoterapia — {fito.length} item(ns)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {fito.map((f, i) => (
                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < fito.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{f.nome}</Typography>
                              {f.dosagem && <Typography variant="body2">Dose: {f.dosagem}</Typography>}
                              {f.posologia && <Typography variant="body2">Posologia: {f.posologia}</Typography>}
                              {f.duracao && <Typography variant="body2">Duração: {f.duracao}</Typography>}
                              {f.observacoes && <Typography variant="caption" color="text.secondary">{f.observacoes}</Typography>}
                              <Typography variant="caption" sx={{ color: '#1976d2', fontStyle: 'italic' }}>Protocolo: {f._condicao}</Typography>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {/* Suplementação */}
                    {supl.length > 0 && (
                      <Accordion defaultExpanded sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#fff3e0' }}>
                          <Typography sx={{ fontWeight: 700, color: '#e65100' }}>💊 Suplementação — {supl.length} item(ns)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {supl.map((s, i) => (
                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < supl.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{s.nutriente || s.nome}</Typography>
                              {s.dosagem && <Typography variant="body2">Dose: {s.dosagem}</Typography>}
                              {s.posologia && <Typography variant="body2">Posologia: {s.posologia}</Typography>}
                              {s.duracao && <Typography variant="body2">Duração: {s.duracao}</Typography>}
                              {s.beneficio && <Typography variant="caption" color="text.secondary">{s.beneficio}</Typography>}
                              <Typography variant="caption" sx={{ color: '#1976d2', fontStyle: 'italic' }}>Protocolo: {s._condicao}</Typography>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {/* Homeopatia */}
                    {homeo.length > 0 && (
                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#f3e5f5' }}>
                          <Typography sx={{ fontWeight: 700, color: '#7b1fa2' }}>⚗️ Homeopatia — {homeo.length} item(ns)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {homeo.map((h, i) => (
                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < homeo.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{h.medicamento || h.nome}</Typography>
                              {h.indicacao && <Typography variant="body2">Indicação: {h.indicacao}</Typography>}
                              {h.posologia && <Typography variant="body2">Posologia: {h.posologia}</Typography>}
                              <Typography variant="caption" sx={{ color: '#1976d2', fontStyle: 'italic' }}>Protocolo: {h._condicao}</Typography>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {/* Aromaterapia */}
                    {aroma.length > 0 && (
                      <Accordion sx={{ mb: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: '#e0f2f1' }}>
                          <Typography sx={{ fontWeight: 700, color: '#00695c' }}>🌸 Aromaterapia — {aroma.length} item(ns)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {aroma.map((a, i) => (
                            <Box key={i} sx={{ mb: 1.5, pb: 1.5, borderBottom: i < aroma.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                              <Typography variant="body2" sx={{ fontWeight: 700 }}>{a.oleo || a.nome}</Typography>
                              {a.uso && <Typography variant="body2">Uso: {a.uso}</Typography>}
                              {a.diluicao && <Typography variant="body2">Diluição: {a.diluicao}</Typography>}
                              <Typography variant="caption" sx={{ color: '#1976d2', fontStyle: 'italic' }}>Protocolo: {a._condicao}</Typography>
                            </Box>
                          ))}
                        </AccordionDetails>
                      </Accordion>
                    )}

                    {/* Orientações Gerais */}
                    {orientList.length > 0 && (
                      <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 1, border: '1px solid #90caf9' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0d47a1', mb: 1 }}>
                          📋 Orientações Gerais Consolidadas ({orientList.length}):
                        </Typography>
                        {orientList.map((o, i) => (
                          <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>• {o}</Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                );
              })()}
            </Box>
          )}

          {savedProtocolsData && savedProtocolsData.length === 0 && (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                Nenhum protocolo salvo para este interagente ainda. Durante a consulta, clique em <strong>"Salvar Protocolo"</strong> abaixo de cada protocolo gerado para que ele apareça aqui consolidado.
              </Typography>
            </Alert>
          )}

          {/* ─── PROBIÓTICOS ─── */}
          {entry.probioticsRecommendation?.recommendations?.strains?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#0277bd', mb: 2, pb: 1, borderBottom: '2px solid #81d4fa' }}>
                🦠 Protocolo de Probióticos
              </Typography>
              {entry.probioticsRecommendation.selectedPathologies?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {entry.probioticsRecommendation.selectedPathologies.map((p, i) => (
                    <Chip key={i} label={p} size="small" sx={{ bgcolor: '#e1f5fe', color: '#0277bd', border: '1px solid #81d4fa' }} />
                  ))}
                </Box>
              )}
              {entry.probioticsRecommendation.recommendations.strains.slice(0, 10).map((strain, idx) => (
                <Box key={idx} sx={{ mb: 1.5, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', borderLeft: `4px solid ${strain.score >= 3 ? '#ef5350' : strain.score === 2 ? '#ffa726' : '#81d4fa'}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{strain.name}</Typography>
                    <Chip label={strain.score >= 3 ? 'ALTA' : strain.score === 2 ? 'MÉDIA' : 'BAIXA'} size="small" color={strain.score >= 3 ? 'error' : strain.score === 2 ? 'warning' : 'default'} />
                  </Box>
                  {strain.benefits?.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{strain.benefits.slice(0, 2).join(', ')}</Typography>
                  )}
                  {strain.dosage && <Typography variant="body2"><strong>Dosagem:</strong> {strain.dosage}</Typography>}
                  {strain.timing && <Typography variant="body2"><strong>Horário:</strong> {strain.timing}</Typography>}
                </Box>
              ))}
              {entry.probioticsRecommendation.updatedAt && (
                <Typography variant="caption" color="text.secondary">
                  Gerado em: {new Date(entry.probioticsRecommendation.updatedAt).toLocaleDateString('pt-BR')}
                </Typography>
              )}
            </Box>
          )}

          {/* ─── RECEITUÁRIO FITOTERÁPICO (V2) ─── */}
          {entry.phytotherapyProtocols?.cartItems?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1b5e20', mb: 2, pb: 1, borderBottom: '2px solid #a5d6a7' }}>
                🌿 Receituário Fitoterápico Personalizado
              </Typography>
              {entry.phytotherapyProtocols.cartItems.map((plant, idx) => (
                <Box key={idx} sx={{ mb: 1.5, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', borderLeft: '4px solid #66bb6a' }}>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#2e7d32' }}>{plant.name}</Typography>
                  {plant.scientificName && (
                    <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic', display: 'block' }}>{plant.scientificName}</Typography>
                  )}
                  {plant.dosage && <Typography variant="body2"><strong>Dosagem:</strong> {plant.dosage}</Typography>}
                  {plant.preparation && <Typography variant="body2"><strong>Preparo:</strong> {plant.preparation}</Typography>}
                  {plant.contraindications && (
                    <Typography variant="caption" color="error.main">
                      <strong>Contraindicações:</strong> {Array.isArray(plant.contraindications) ? plant.contraindications.join(', ') : plant.contraindications}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* ─── ANÁLISE DE DEFICIÊNCIA DE VITAMINAS ─── */}
          {entry.vitaminDeficiencyAnalyzer?.analiseDeficiencias?.deficiencias?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#e65100', mb: 2, pb: 1, borderBottom: '2px solid #ffcc02' }}>
                💊 Análise de Deficiência de Vitaminas/Minerais
              </Typography>
              {entry.vitaminDeficiencyAnalyzer.sintomasSelecionados?.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {entry.vitaminDeficiencyAnalyzer.sintomasSelecionados.map((s, i) => (
                    <Chip key={i} label={s} size="small" variant="outlined" color="warning" />
                  ))}
                </Box>
              )}
              {entry.vitaminDeficiencyAnalyzer.analiseDeficiencias.deficiencias.slice(0, 8).map((def, idx) => (
                <Box key={idx} sx={{ mb: 1.5, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', borderLeft: `4px solid ${def.severidade === 'alta' ? '#d32f2f' : def.severidade === 'moderada' ? '#ff9800' : '#ffc107'}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>{def.vitamina || def.nome}</Typography>
                    {def.probabilidade && (
                      <Chip label={`${def.probabilidade}%`} size="small" sx={{ bgcolor: def.probabilidade >= 70 ? '#ffebee' : '#fff3e0', color: def.probabilidade >= 70 ? '#c62828' : '#e65100', fontWeight: 700 }} />
                    )}
                  </Box>
                  {def.severidade && (
                    <Typography variant="caption" sx={{ color: def.severidade === 'alta' ? '#d32f2f' : def.severidade === 'moderada' ? '#ff9800' : '#ffc107', fontWeight: 600, textTransform: 'uppercase' }}>
                      Probabilidade {def.severidade}
                    </Typography>
                  )}
                  {def.sintomas?.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{def.sintomas.slice(0, 3).join(', ')}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* ─── EXAMES LABORATORIAIS SOLICITADOS ─── */}
          {entry.examRequests?.examsList?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e', mb: 2, pb: 1, borderBottom: '2px solid #7986cb' }}>
                🔬 Exames Laboratoriais Solicitados
              </Typography>
              {entry.examRequests.indication && (
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Indicação clínica:</strong> {entry.examRequests.indication}
                </Alert>
              )}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {entry.examRequests.examsList.map((exam, idx) => (
                  <Chip key={idx} label={exam.name} size="small" sx={{ bgcolor: '#e8eaf6', color: '#1a237e', border: '1px solid #9fa8da' }} />
                ))}
              </Box>
              {entry.examRequests.requestDate && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Solicitado em: {new Date(entry.examRequests.requestDate).toLocaleDateString('pt-BR')}
                </Typography>
              )}
            </Box>
          )}

          {/* ─── ANÁLISE SUBCLÍNICA INTEGRATIVA ─── */}
          {entry.subclinicalIntegrativeAnalysis?.selectedItems?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#00838f', mb: 2, pb: 1, borderBottom: '2px solid #80deea' }}>
                🧬 Análise Subclínica Integrativa
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: '#555', fontStyle: 'italic' }}>
                Sinais e condutas identificados na avaliação subclínica integrativa ({entry.subclinicalIntegrativeAnalysis.selectedSignIds?.length || 0} sinal(is) em {entry.subclinicalIntegrativeAnalysis.selectedItems.length} área(s)).
              </Typography>
              {entry.subclinicalIntegrativeAnalysis.selectedItems.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: '#fff', borderRadius: 2, border: '1px solid #e0e0e0', borderLeft: '4px solid #00838f' }}>
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#006064', mb: 0.5 }}>
                    {item.emoji || '🔍'} {item.itemTitle}
                  </Typography>
                  {item.diagnostico && (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555', mb: 1 }}>
                      {item.diagnostico}
                    </Typography>
                  )}
                  {item.selectedSigns?.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" fontWeight={700} color="success.dark">Sinais observados:</Typography>
                      {item.selectedSigns.map((sign, si) => (
                        <Typography key={si} variant="caption" sx={{ display: 'block', pl: 1 }}>✓ {sign}</Typography>
                      ))}
                    </Box>
                  )}
                  {item.condutas?.fitoterapia?.length > 0 && (
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={700} sx={{ color: '#388e3c' }}>🌿 Fitoterapia:</Typography>
                      {item.condutas.fitoterapia.map((f, fi) => (
                        <Typography key={fi} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {f}</Typography>
                      ))}
                    </Box>
                  )}
                  {item.condutas?.suplementacao?.length > 0 && (
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={700} sx={{ color: '#1565c0' }}>💊 Suplementação:</Typography>
                      {item.condutas.suplementacao.map((s, si) => (
                        <Typography key={si} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {s}</Typography>
                      ))}
                    </Box>
                  )}
                  {item.condutas?.dietoterapia?.length > 0 && (
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={700} sx={{ color: '#e65100' }}>🥗 Dietoterapia:</Typography>
                      {item.condutas.dietoterapia.map((d, di) => (
                        <Typography key={di} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {d}</Typography>
                      ))}
                    </Box>
                  )}
                  {item.condutas?.estilo_vida?.length > 0 && (
                    <Box sx={{ mb: 0.5 }}>
                      <Typography variant="caption" fontWeight={700} sx={{ color: '#6a1b9a' }}>🏃 Estilo de Vida:</Typography>
                      {item.condutas.estilo_vida.map((e, ei) => (
                        <Typography key={ei} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {e}</Typography>
                      ))}
                    </Box>
                  )}
                  {item.condutas?.orientacoes?.length > 0 && (
                    <Box>
                      <Typography variant="caption" fontWeight={700} sx={{ color: '#795548' }}>📋 Orientações:</Typography>
                      {item.condutas.orientacoes.map((o, oi) => (
                        <Typography key={oi} variant="caption" sx={{ display: 'block', pl: 1.5 }}>• {o}</Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
              {entry.subclinicalIntegrativeAnalysis.updatedAt && (
                <Typography variant="caption" color="text.secondary">
                  Atualizado em: {new Date(entry.subclinicalIntegrativeAnalysis.updatedAt).toLocaleDateString('pt-BR')}
                </Typography>
              )}
            </Box>
          )}

          {/* SUGESTÕES TERAPÊUTICAS (de outras páginas do sistema) */}
          {entry.therapySuggestions?.consolidatedTherapies && Object.values(entry.therapySuggestions.consolidatedTherapies).some(arr => Array.isArray(arr) && arr.length > 0) && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#4a148c', mb: 2 }}>
                💊 SUGESTÕES TERAPÊUTICAS ADICIONAIS
              </Typography>
              {entry.therapySuggestions.consolidatedTherapies.phytotherapy?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1b5e20', mb: 1 }}>🌿 Fitoterapia</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.phytotherapy.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• <strong>{item.name}</strong>{item.dosage ? ` — ${item.dosage}` : ''}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.consolidatedTherapies.homeopathy?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1565c0', mb: 1 }}>💊 Homeopatia</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.homeopathy.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• <strong>{item.name}</strong>{item.dosage ? ` — ${item.dosage}` : ''}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.consolidatedTherapies.essentialOils?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#e65100', mb: 1 }}>🌸 Óleos Essenciais</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.essentialOils.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• <strong>{item.name}</strong>{item.usage ? ` — ${item.usage}` : ''}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.consolidatedTherapies.aromatherapy?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#880e4f', mb: 1 }}>🕯️ Aromaterapia</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.aromatherapy.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• <strong>{item.name}</strong>{item.usage ? ` — ${item.usage}` : ''}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.consolidatedTherapies.nutritional?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#f57f17', mb: 1 }}>🥗 Orientações Nutricionais</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.nutritional.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• <strong>{item.name}</strong>{item.recommendation ? ` — ${item.recommendation}` : ''}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.consolidatedTherapies.lifestyle?.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1b5e20', mb: 1 }}>🏃 Estilo de Vida</Typography>
                  {entry.therapySuggestions.consolidatedTherapies.lifestyle.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {item.name || item.recommendation || String(item)}</Typography>
                  ))}
                </Box>
              )}
              {entry.therapySuggestions.savedAt && (
                <Typography variant="caption" color="text.secondary">Salvo em: {new Date(entry.therapySuggestions.savedAt).toLocaleDateString('pt-BR')}</Typography>
              )}
            </Box>
          )}

          {/* PROTOCOLO DETOX */}
          {entry.detoxProtocol?.selectedProtocol && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#004d40', mb: 2 }}>
                🌊 PROTOCOLO DETOX
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#e0f2f1', borderRadius: 2, border: '1px solid #80cbc4' }}>
                {entry.detoxProtocol.selectedProtocol.name && (
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#00695c', mb: 1 }}>
                    {entry.detoxProtocol.selectedProtocol.name}
                  </Typography>
                )}
                {entry.detoxProtocol.selectedProtocol.description && (
                  <Typography variant="body2" sx={{ mb: 2 }}>{entry.detoxProtocol.selectedProtocol.description}</Typography>
                )}
                {entry.detoxProtocol.selectedProtocol.steps?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Etapas:</Typography>
                    {entry.detoxProtocol.selectedProtocol.steps.map((step, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        {idx + 1}. {typeof step === 'string' ? step : step.description || step.name}
                      </Typography>
                    ))}
                  </Box>
                )}
                {entry.detoxProtocol.selectedProtocol.duration && (
                  <Typography variant="body2" sx={{ mt: 1 }}>⏱️ Duração: {entry.detoxProtocol.selectedProtocol.duration}</Typography>
                )}
                {entry.detoxProtocol.savedAt && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Salvo em: {new Date(entry.detoxProtocol.savedAt).toLocaleDateString('pt-BR')}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* ANÁLISE DE BIORRESSONÂNCIA */}
          {entry.bioresonanceResults && Object.keys(entry.bioresonanceResults).length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a237e', mb: 2 }}>
                🔬 ANÁLISE DE BIORRESSONÂNCIA
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#e8eaf6', borderRadius: 2, border: '1px solid #9fa8da' }}>
                {entry.bioresonanceResults.findings?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Achados:</Typography>
                    {entry.bioresonanceResults.findings.map((f, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {typeof f === 'string' ? f : f.description || f.name}</Typography>
                    ))}
                  </Box>
                )}
                {entry.bioresonanceResults.recommendations?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Recomendações:</Typography>
                    {entry.bioresonanceResults.recommendations.map((r, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {typeof r === 'string' ? r : r.description || r.name}</Typography>
                    ))}
                  </Box>
                )}
                {!entry.bioresonanceResults.findings && !entry.bioresonanceResults.recommendations && (
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>Dados de biorressonância registrados.</Typography>
                )}
                {entry.bioresonanceResults.savedAt && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Salvo em: {new Date(entry.bioresonanceResults.savedAt).toLocaleDateString('pt-BR')}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* ANÁLISE DE IRIDOLOGIA */}
          {entry.iridologyAnalysis && Object.keys(entry.iridologyAnalysis).length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#4a0e0e', mb: 2 }}>
                👁️ ANÁLISE DE IRIDOLOGIA
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#fce4ec', borderRadius: 2, border: '1px solid #ef9a9a' }}>
                {entry.iridologyAnalysis.findings?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Achados Iridológicos:</Typography>
                    {entry.iridologyAnalysis.findings.map((f, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {typeof f === 'string' ? f : f.description || f.zone || f.name}</Typography>
                    ))}
                  </Box>
                )}
                {entry.iridologyAnalysis.recommendations?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Recomendações:</Typography>
                    {entry.iridologyAnalysis.recommendations.map((r, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {typeof r === 'string' ? r : r.description || r.name}</Typography>
                    ))}
                  </Box>
                )}
                {!entry.iridologyAnalysis.findings && !entry.iridologyAnalysis.recommendations && (
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>Dados de iridologia registrados.</Typography>
                )}
                {entry.iridologyAnalysis.savedAt && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Salvo em: {new Date(entry.iridologyAnalysis.savedAt).toLocaleDateString('pt-BR')}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* PLANO NUTRICIONAL */}
          {entry.nutritionalPlan?.profiles?.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#e65100', mb: 2 }}>
                🥗 PLANO NUTRICIONAL
              </Typography>
              {entry.nutritionalPlan.profiles.map((profile, idx) => (
                <Box key={idx} sx={{ mb: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 2, border: '1px solid #ffcc80' }}>
                  {profile.name && (
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#bf360c', mb: 1 }}>{profile.name}</Typography>
                  )}
                  {profile.description && (
                    <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>{profile.description}</Typography>
                  )}
                  {profile.protocols?.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Protocolos:</Typography>
                      {profile.protocols.map((p, pIdx) => (
                        <Typography key={pIdx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                          • <strong>{p.name || p.nutrient || p.supplement}</strong>
                          {p.dosage ? ` — ${p.dosage}` : ''}
                          {p.timing ? ` (${p.timing})` : ''}
                        </Typography>
                      ))}
                    </Box>
                  )}
                  {profile.orientacoes?.length > 0 && (
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Orientações:</Typography>
                      {profile.orientacoes.map((o, oIdx) => (
                        <Typography key={oIdx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {o}</Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
              {entry.nutritionalPlan.restrictions?.length > 0 && (
                <Box sx={{ p: 2, bgcolor: '#ffebee', borderRadius: 2, border: '1px dashed #ef9a9a' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: '#c62828' }}>🚫 Restrições Alimentares:</Typography>
                  {entry.nutritionalPlan.restrictions.map((r, rIdx) => (
                    <Chip key={rIdx} label={r} size="small" sx={{ m: 0.5, bgcolor: '#ffcdd2', color: '#c62828' }} />
                  ))}
                </Box>
              )}
              {entry.nutritionalPlan.generatedAt && (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  Gerado em: {new Date(entry.nutritionalPlan.generatedAt).toLocaleDateString('pt-BR')}
                </Typography>
              )}
            </Box>
          )}

          {/* INTERAÇÕES NUTRICIONAIS */}
          {entry.nutrientInteractions && Object.keys(entry.nutrientInteractions).length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#1b5e20', mb: 2 }}>
                🔄 INTERAÇÕES NUTRICIONAIS
              </Typography>
              <Box sx={{ p: 2, bgcolor: '#f1f8e9', borderRadius: 2, border: '1px solid #aed581' }}>
                {entry.nutrientInteractions.interactions?.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Interações Identificadas:</Typography>
                    {entry.nutrientInteractions.interactions.map((inter, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        • {typeof inter === 'string' ? inter : inter.description || `${inter.nutrient1} ↔ ${inter.nutrient2}`}
                      </Typography>
                    ))}
                  </Box>
                )}
                {entry.nutrientInteractions.recommendations?.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Recomendações:</Typography>
                    {entry.nutrientInteractions.recommendations.map((r, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        • <strong>{r.nutrient || r.name}</strong>{r.dosage ? ` — ${r.dosage}` : ''}
                      </Typography>
                    ))}
                  </Box>
                )}
                {entry.nutrientInteractions.savedAt && (
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                    Salvo em: {new Date(entry.nutrientInteractions.savedAt).toLocaleDateString('pt-BR')}
                  </Typography>
                )}
              </Box>
            </Box>
          )}

          {/* ═══════════════════════════════════════════════════════════════════
              RECEITUÁRIO MESTRE CONSOLIDADO — SEM REDUNDÂNCIAS
          ══════════════════════════════════════════════════════════════════════ */}
          {hasMasterContent && (
            <Box sx={{ mt: 5 }}>
              <Divider sx={{ mb: 3, borderColor: '#00897b', borderWidth: 2 }} />
              <Box sx={{
                background: 'linear-gradient(135deg, #004d40 0%, #00695c 100%)',
                p: 3, borderRadius: 3, color: 'white', mb: 3
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                  📜 RECEITUÁRIO MESTRE CONSOLIDADO
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Todos os protocolos do sistema reunidos e deduplicados — sem repetições
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 0.5 }}>
                  {masterPrescription.fitoterapia.length + masterPrescription.suplementacao.length + masterPrescription.homeopatia.length + masterPrescription.oleos.length + masterPrescription.probioticos.length} itens únicos identificados
                </Typography>
              </Box>

              {/* Fitoterapia Mestre */}
              {masterPrescription.fitoterapia.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#e8f5e9', borderRadius: 2, border: '2px solid #4caf50' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1b5e20', mb: 2 }}>
                    🌿 FITOTERAPIA ({masterPrescription.fitoterapia.length} item{masterPrescription.fitoterapia.length !== 1 ? 's' : ''})
                  </Typography>
                  <Grid container spacing={1}>
                    {masterPrescription.fitoterapia.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #a5d6a7' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                            {idx + 1}. {item.nome}
                          </Typography>
                          {item.dosagem && <Typography variant="caption" color="text.secondary">Dose: {item.dosagem}</Typography>}
                          {item.posologia && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Posologia: {item.posologia}</Typography>}
                          <Typography variant="caption" sx={{ color: '#81c784', display: 'block', fontStyle: 'italic' }}>Fonte: {item.fonte}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Suplementação Mestre */}
              {masterPrescription.suplementacao.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#fff8e1', borderRadius: 2, border: '2px solid #ffc107' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#e65100', mb: 2 }}>
                    💊 SUPLEMENTAÇÃO / NUTRIÇÃO ({masterPrescription.suplementacao.length} item{masterPrescription.suplementacao.length !== 1 ? 's' : ''})
                  </Typography>
                  <Grid container spacing={1}>
                    {masterPrescription.suplementacao.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #ffe082' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#e65100' }}>
                            {idx + 1}. {item.nome}
                          </Typography>
                          {item.dosagem && <Typography variant="caption" color="text.secondary">Dose: {item.dosagem}</Typography>}
                          {item.posologia && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Posologia: {item.posologia}</Typography>}
                          <Typography variant="caption" sx={{ color: '#ffa726', display: 'block', fontStyle: 'italic' }}>Fonte: {item.fonte}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Probióticos Mestre */}
              {masterPrescription.probioticos.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#e3f2fd', borderRadius: 2, border: '2px solid #2196f3' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#0d47a1', mb: 2 }}>
                    🦠 PROBIÓTICOS ({masterPrescription.probioticos.length} item{masterPrescription.probioticos.length !== 1 ? 's' : ''})
                  </Typography>
                  <Grid container spacing={1}>
                    {masterPrescription.probioticos.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #90caf9' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#1565c0' }}>
                            {idx + 1}. {item.nome}
                          </Typography>
                          {item.dosagem && <Typography variant="caption" color="text.secondary">Dose: {item.dosagem}</Typography>}
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Homeopatia Mestre */}
              {masterPrescription.homeopatia.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#f3e5f5', borderRadius: 2, border: '2px solid #9c27b0' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#4a148c', mb: 2 }}>
                    💊 HOMEOPATIA ({masterPrescription.homeopatia.length} item{masterPrescription.homeopatia.length !== 1 ? 's' : ''})
                  </Typography>
                  <Grid container spacing={1}>
                    {masterPrescription.homeopatia.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #ce93d8' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#6a1b9a' }}>
                            {idx + 1}. {item.nome}
                          </Typography>
                          {item.posologia && <Typography variant="caption" color="text.secondary">Posologia: {item.posologia}</Typography>}
                          {item.indicacao && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Indicação: {item.indicacao}</Typography>}
                          <Typography variant="caption" sx={{ color: '#ba68c8', display: 'block', fontStyle: 'italic' }}>Fonte: {item.fonte}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Óleos e Aromaterapia Mestre */}
              {masterPrescription.oleos.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#fce4ec', borderRadius: 2, border: '2px solid #e91e63' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#880e4f', mb: 2 }}>
                    🌸 ÓLEOS ESSENCIAIS / AROMATERAPIA ({masterPrescription.oleos.length} item{masterPrescription.oleos.length !== 1 ? 's' : ''})
                  </Typography>
                  <Grid container spacing={1}>
                    {masterPrescription.oleos.map((item, idx) => (
                      <Grid item xs={12} sm={6} key={idx}>
                        <Box sx={{ p: 1.5, bgcolor: 'white', borderRadius: 1, border: '1px solid #f48fb1' }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#ad1457' }}>
                            {idx + 1}. {item.nome}
                          </Typography>
                          {item.uso && <Typography variant="caption" color="text.secondary">Uso: {item.uso}</Typography>}
                          {item.diluicao && <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>Diluição: {item.diluicao}</Typography>}
                          <Typography variant="caption" sx={{ color: '#f06292', display: 'block', fontStyle: 'italic' }}>Fonte: {item.fonte}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              {/* Orientações Mestre */}
              {masterPrescription.orientacoes.length > 0 && (
                <Box sx={{ mb: 4, p: 3, bgcolor: '#e8eaf6', borderRadius: 2, border: '2px solid #3f51b5' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1a237e', mb: 2 }}>
                    📋 ORIENTAÇÕES GERAIS ({masterPrescription.orientacoes.length})
                  </Typography>
                  {masterPrescription.orientacoes.map((item, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>• {item}</Typography>
                  ))}
                </Box>
              )}

              <Box sx={{ mt: 3, p: 2, bgcolor: '#004d40', borderRadius: 2, color: 'white', textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Receituário gerado em {new Date().toLocaleDateString('pt-BR')} · {entry.q01_nome || 'Paciente'}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>
                  Documento consolidado — todos os protocolos do sistema sem repetições
                </Typography>
              </Box>
            </Box>
          )}

          {/* Observações Importantes */}
          <Alert severity="info" sx={{ mt: 4, bgcolor: '#e3f2fd', border: '1px solid #2196f3' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              📌 OBSERVAÇÕES IMPORTANTES:
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • Siga rigorosamente as dosagens e horários indicados
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • Comunique quaisquer reações ou desconfortos durante o uso
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              • Mantenha todos os produtos em local adequado
            </Typography>
            <Typography variant="body2">
              • Este documento contém sugestões terapêuticas complementares baseadas em análise funcional integrativa
            </Typography>
          </Alert>

          {/* Rodapé */}
          <Box sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: '3px double #2e7d32',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 600 }}>
              {therapistFullTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: '#558b2f', display: 'block', mt: 1 }}>
              (89) 9 8139-8723 | wanderpsc@gmail.com
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Mensagem quando não há interagente selecionado */}
      {!entry && !id && (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Selecione um interagente e a data da avaliação acima para visualizar as sugestões terapêuticas.
          </Typography>
        </Paper>
      )}

      {/* Estilos de impressão */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          #consolidated-therapies-section {
            page-break-inside: avoid;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-size: 11pt;
          }
          .MuiPaper-root {
            box-shadow: none !important;
          }
          .MuiAlert-root {
            border: 1px solid currentColor !important;
          }
        }
      `}</style>
    </Container>
  );
}
