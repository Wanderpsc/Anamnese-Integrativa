import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Alert, CircularProgress, Chip, Divider, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import * as pdfjsLib from 'pdfjs-dist';
import IridologySequenceGuide from './IridologySequenceGuide';
import { evaluateProtocolSafety } from '../lib/clinicalSafety';

// Configurar worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

/**
 * Componente para análise de PDF de Biorressonância
 * Extrai texto do PDF e gera protocolo terapêutico personalizado
 */
export default function BioresonanceAnalysis({ pdfData, patientData, onAnalysisComplete }) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  useEffect(() => {
    if (pdfData?.base64) {
      analyzePDF();
    }
  }, [pdfData]);

  async function analyzePDF() {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Iniciando extração de texto do PDF...');
      
      // Extrair texto real do PDF
      const text = await extractTextFromPDF(pdfData.base64);
      setExtractedText(text);
      
      console.log('📄 Texto extraído:', text.substring(0, 500) + '...');
      
      // Analisa o texto extraído
      const analysisResult = analyzeExtractedText(text, patientData);
      
      setAnalysis(analysisResult);
      if (onAnalysisComplete) onAnalysisComplete(analysisResult);
      console.log('✅ Análise concluída com sucesso');
    } catch (err) {
      console.error('❌ Erro ao analisar PDF:', err);
      setError('Erro ao analisar PDF: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Extração REAL de texto do PDF usando pdfjs-dist
  async function extractTextFromPDF(base64) {
    try {
      // Remover prefixo data:application/pdf;base64, se existir
      const base64Data = base64.includes(',') ? base64.split(',')[1] : base64;
      
      // Converter base64 para Uint8Array
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // Carregar PDF
      const loadingTask = pdfjsLib.getDocument({ data: bytes });
      const pdf = await loadingTask.promise;
      
      console.log(`📄 PDF carregado: ${pdf.numPages} páginas`);
      
      let fullText = '';
      
      // Extrair texto de todas as páginas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + '\n\n';
      }
      
      return fullText;
    } catch (err) {
      console.error('Erro ao extrair texto do PDF:', err);
      throw new Error('Falha ao extrair texto do PDF. Verifique se o arquivo é um PDF válido.');
    }
  }

  function analyzeExtractedText(text, patient) {
    const lowerText = text.toLowerCase();
    
    // Identificar problemas detectados
    const problems = [];
    const therapeuticProtocol = {
      probioticos: [],
      fitoterapicos: [],
      nutraceuticos: [],
      ortomolecular: [],
      ozonioterapia: [],
      homeopatia: [],
      injetaveis: [],
      florais: [],
      dietaEliminacao: [],
      suplementacao: [],
      orientacoesGerais: []
    };

    // ──────────────────────────────────────────────────
    // HELPER: adiciona item apenas se ainda não existir
    // ──────────────────────────────────────────────────
    const add = (categoria, item) => {
      if (!therapeuticProtocol[categoria].some(i => i.startsWith(item.split(' - ')[0]))) {
        therapeuticProtocol[categoria].push(item);
      }
    };

    // ════════════════════════════════════════════════
    // SISTEMA DIGESTIVO / DISBIOSE
    // ════════════════════════════════════════════════
    if (lowerText.includes('disbiose') || lowerText.includes('intestin') || lowerText.includes('colon') || lowerText.includes('microbiota')) {
      problems.push('Disbiose Intestinal / Desequilíbrio Microbiota');
      add('probioticos', 'Lactobacillus acidophilus + Bifidobacterium lactis - 10 bilhões UFC - 1 cápsula em jejum - 60 dias');
      add('probioticos', 'Saccharomyces boulardii - 5 bilhões UFC - 1 cápsula 2x/dia (longe das refeições) - 30 dias');
      add('fitoterapicos', 'Aloe vera (Aloe barbadensis) 200mg - 1 cápsula antes das 3 principais refeições - 60 dias');
      add('fitoterapicos', 'L-Glutamina 5g + FOS prebiótico 3g - 1 sachê em jejum com água morna - 60 dias');
      add('nutraceuticos', 'Zinco quelado 30mg - 1 cápsula/dia após almoço - 60 dias');
      add('ortomolecular', 'Vitamina C 5g EV em SF 0,9% 250ml - 1x/semana por 8 sessões (suporte intestinal/imune)');
      add('ortomolecular', 'Glutamina 10g IV em SF 100ml - 2x/semana por 4 semanas (reparação mucosa)');
      add('ozonioterapia', 'Insuflação Retal de Ozônio: 150–300ml O₃/O₂ (30 γ) — decúbito lateral, retença 5 min — diária × 7d, depois 3x/sem × 3 sem');
      add('homeopatia', 'Nux vomica 30CH - 5 glóbulos 3x/dia - 30 dias (disbiose, stress digestivo)');
      add('homeopatia', 'Mercurius solubilis 12CH - 5 glóbulos 2x/dia - 21 dias (inflamação intestinal)');
      add('injetaveis', 'Myers Cocktail IM: Vit C 500mg + B12 1000mcg + B6 100mg + MgSO₄ 200mg — 1x/sem × 8 semanas');
      add('florais', 'Crab Apple (Bach) — purificação e desintoxicação — 4 gotas 4x/dia');
      add('dietaEliminacao', 'Eliminar glúten, lactose e açúcar refinado por 30 dias; reintroduzir aos poucos após 30 dias');
      add('dietaEliminacao', 'Aumentar fibras prebióticas: banana verde, batata yacon, cebola, alho, aveia integral');
      add('orientacoesGerais', 'Mastigação lenta, 30 mastigações por bocada; evitar líquidos nas refeições');
    }

    // ════════════════════════════════════════════════
    // SISTEMA IMUNOLÓGICO / IMUNODEPRESSÃO
    // ════════════════════════════════════════════════
    if (lowerText.includes('imun') || lowerText.includes('defesa') || lowerText.includes('leucocit') || lowerText.includes('linfocit')) {
      problems.push('Sistema Imunológico Comprometido');
      add('nutraceuticos', 'Vitamina C 2000mg - 2 cápsulas de 1000mg 12/12h - 60 dias');
      add('nutraceuticos', 'Vitamina D3 10.000 UI + Vitamina K2 200mcg - 1 cápsula/dia com refeição gordurosa - 90 dias');
      add('nutraceuticos', 'Zinco quelado 30mg + Selênio 200mcg - 1 cápsula/dia - 60 dias');
      add('nutraceuticos', 'Ômega-3 TG (EPA 600mg + DHA 400mg) - 2 cápsulas/dia nas refeições - 90 dias');
      add('fitoterapicos', 'Equinácea (Echinacea purpurea) 300mg - 1 cápsula 3x/dia por 20 dias; pausa 10 dias; repetir');
      add('fitoterapicos', 'Extrato de Própolis verde padronizado 300mg - 1 cápsula 2x/dia - 60 dias');
      add('fitoterapicos', 'Cogumelo Reishi (Ganoderma lucidum) 500mg - 1 cápsula 2x/dia - 90 dias');
      add('ortomolecular', 'Vitamina C High Dose EV: 15–25g em SF 0,9% 250ml — infusão 60 min — 2x/sem × 10 sessões');
      add('ortomolecular', 'Glutationa Reduzida EV: 600–1200mg em 10ml SF — push lento 15 min — 2–3x/sem × 8 sessões');
      add('ortomolecular', 'Selênio EV 200mcg + Zinco EV 5mg em SF 100ml — 1x/sem × 6 sessões');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM): 150ml sangue + 150ml O₃/O₂ (25 γ) reinfundidos EV — 2x/sem × 10 sessões');
      add('ozonioterapia', 'Autohemoterapia Menor (ATm): 5ml sangue + 5ml O₃/O₂ (40 γ) — IM glúteo — 2x/sem × 10 sessões');
      add('homeopatia', 'Thuya occidentalis 30CH - 5 glóbulos 3x/dia - 30 dias (imunidade, viral, vacinas)');
      add('homeopatia', 'Echinacea composita (Heel) - 10 gotas sublinguais 3x/dia - 30 dias');
      add('injetaveis', 'Vitamina D3 (colecalciferol) 300.000 UI IM — dose única se nível < 20 ng/ml — repetir em 90 dias');
      add('injetaveis', 'B12 (Cianocobalamina) 5.000mcg IM — diário × 7d, depois 1x/sem × 4 semanas (imunoestimulante)');
      add('florais', 'Walnut (Bach) — transições e proteção de influências externas — 4 gotas 4x/dia');
      add('orientacoesGerais', 'Exposição solar 20–30 min/dia (braços e pernas) entre 10h e 14h para síntese de Vit D');
    }

    // ════════════════════════════════════════════════
    // ESTRESSE OXIDATIVO / SISTEMA NERVOSO / FADIGA
    // ════════════════════════════════════════════════
    if (lowerText.includes('estresse') || lowerText.includes('oxidativ') || lowerText.includes('nerv') || lowerText.includes('fadiga') || lowerText.includes('esgotamento') || lowerText.includes('energia')) {
      problems.push('Estresse Oxidativo / Esgotamento Nervoso');
      add('nutraceuticos', 'Coenzima Q10 (ubiquinol) 200mg - 1 cápsula pela manhã com refeição - 90 dias');
      add('nutraceuticos', 'Resveratrol 200mg + Quercetina 500mg + Pterostilbeno 50mg - 1 cápsula/dia - 60 dias');
      add('nutraceuticos', 'N-Acetilcisteína (NAC) 600mg - 1 cápsula em jejum - 60 dias');
      add('fitoterapicos', 'Rhodiola rosea (3% rosavinas) 300mg - 1 cápsula pela manhã (adaptógeno) - 60 dias');
      add('fitoterapicos', 'Ashwagandha (KSM-66) 300mg - 1 cápsula à noite (reduz cortisol) - 60 dias');
      add('fitoterapicos', 'Magnólia + Passionária 200mg - 1 cápsula 30 min antes de dormir - 30 dias');
      add('ortomolecular', 'Ácido Alfa-lipóico (ALA) 600mg EV em SF 100ml — push lento — 3x/sem × 6 sem (antioxidante potente)');
      add('ortomolecular', 'NADH/NAD+ EV 500mg em SF 250ml — infusão 4h — 1x/sem × 4 semanas (energia mitocondrial)');
      add('ortomolecular', 'Vitamina C + Glutationa EV combinada — 10g C + 600mg GSH — 2x/sem × 10 sessões');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) com O₃/O₂ (20 γ): 100ml — ativa mitocôndrias — 2x/sem × 10 sessões');
      add('ozonioterapia', 'Sauna de Ozônio: 30 min a 38–40°C (cabine corporal) — ativa sudorese detox — 3x/sem × 4 sem');
      add('homeopatia', 'Kali phosphoricum 12CH - 5 glóbulos 3x/dia - 30 dias (exaustão nervosa e mental)');
      add('homeopatia', 'Phosphoric acid 30CH - 5 glóbulos 2x/dia - 21 dias (prostração e indiferença)');
      add('injetaveis', 'Complexo B IM (B1+B2+B3+B5+B6) 1 ampola — 3x/sem × 4 semanas (suporte neurológico)');
      add('injetaveis', 'Dextrose 50% 20ml + B1 100mg + B6 100mg IV lento — 2x/sem × 8 sessões (energia neuronal)');
      add('florais', 'Olive (Bach) — exaustão física e mental total — 4 gotas 4x/dia');
      add('florais', 'Elm (Bach) — sobrecarga de responsabilidades — 4 gotas 4x/dia');
      add('orientacoesGerais', 'Técnicas de respiração diafragmática 3x/dia (4-7-8: inspira 4s, segura 7s, expira 8s)');
      add('orientacoesGerais', 'Meditação ou mindfulness 15–20 min/dia; caminhada ao ar livre 30 min/dia');
    }

    // ════════════════════════════════════════════════
    // ACIDOSE METABÓLICA / EQUILÍBRIO ÁCIDO-BASE
    // ════════════════════════════════════════════════
    if (lowerText.includes('acidos') || lowerText.includes('acidose') || lowerText.includes(' ph ') || lowerText.includes('alcalin')) {
      problems.push('Acidose Metabólica / Desequilíbrio Ácido-Base');
      add('suplementacao', 'Bicarbonato de sódio 1g (1 colher de café) em 200ml água — 30 min antes do almoço e jantar — 30 dias');
      add('suplementacao', 'Cloreto de magnésio PA 500mg - 1 cápsula 2x/dia (alcalinizante) - 60 dias');
      add('ortomolecular', 'Magnésio EV 1–2g (MgSO₄ 50%) em SF 250ml — infusão 30 min — 2x/sem × 6 semanas');
      add('ozonioterapia', 'Insuflação Retal O₃/O₂ (20 γ) 200ml — alcaliniza e oxigena tecidos — 5x/sem × 2 sem, depois 3x/sem');
      add('dietaEliminacao', 'Dieta 80% alcalina: vegetais verdes, limão, pepino, abacate, sementes; reduzir café, carne vermelha, refinados');
      add('dietaEliminacao', 'Água alcalinizada ou com 1 limão espremido em jejum (300ml)');
      add('fitoterapicos', 'Chlorella 500mg - 3 cápsulas 3x/dia (alcalinizante, quelatante, detox) - 90 dias');
      add('homeopatia', 'Acidum phosphoricum 30CH - 5 glóbulos 3x/dia - 21 dias (acidose crônica)');
    }

    // ════════════════════════════════════════════════
    // DEFICIÊNCIAS VITAMÍNICAS / MINERAIS
    // ════════════════════════════════════════════════
    if (lowerText.includes('vitamina d') || lowerText.includes('vit d') || lowerText.includes('deficiência') || lowerText.includes('carência') || lowerText.includes('mineral')) {
      problems.push('Deficiências Vitamínicas e Minerais');
      add('nutraceuticos', 'Vitamina D3 50.000 UI (semanal) + K2 MK-7 200mcg/dia — reavaliação sérica em 90 dias');
      add('nutraceuticos', 'Magnésio dimalato 300mg - 1 cápsula 2x/dia (energia celular, sono, músculo) - 90 dias');
      add('nutraceuticos', 'Complexo B ativo (B1-tiamina, B2-riboflavina, B6-P5P, B9-metilfolato, B12-metilcobalamina) - 1 cápsula/dia');
      add('ortomolecular', 'Vitamina D3 300.000 UI IM (dose de ataque se nível < 20 ng/mL) + manutenção oral 10.000 UI/dia');
      add('ortomolecular', 'B12 metilcobalamina 5.000mcg IM — diário × 7d; semanal × 1 mês (especialmente veganos/idosos)');
      add('injetaveis', 'Magnésio EV (MgSO₄ 50%) 2g em SF 250ml — 2x/sem × 4 semanas (reposição de déficit grave)');
      add('injetaveis', 'Complexo vitamínico IM (ADE) ou oral conforme avaliação nutricional');
    }

    if (lowerText.includes('magnésio') || lowerText.includes(' mg ')) {
      add('suplementacao', 'Magnésio dimalato 300mg - 1 cápsula 2x/dia (energia celular) - 90 dias');
    }
    if (lowerText.includes('zinco') || lowerText.includes(' zn ')) {
      add('nutraceuticos', 'Zinco quelado 30mg - 1 cápsula/dia após almoço - 60 dias');
    }
    if (lowerText.includes('ferro') || lowerText.includes('anemia') || lowerText.includes('hemoglobin')) {
      problems.push('Déficit de Ferro / Anemia');
      add('nutraceuticos', 'Ferro bisglicinato 30mg + Vitamina C 500mg - 1 cápsula em jejum - 90 dias');
      add('ortomolecular', 'Ferro EV (sacarato de hidróxido de ferro III) — dose calculada por déficit — protocolo supervisionado');
      add('fitoterapicos', 'Spirulina 500mg - 3 cápsulas 3x/dia (ferro orgânico + B12) - 90 dias');
      add('homeopatia', 'Ferrum phosphoricum 6CH - 5 glóbulos 3x/dia - 30 dias (anemia, debilidade)');
    }

    // ════════════════════════════════════════════════
    // METAIS PESADOS / INTOXICAÇÃO
    // ════════════════════════════════════════════════
    if (lowerText.includes('metal') || lowerText.includes('alumínio') || lowerText.includes('chumbo') || lowerText.includes('mercúrio') || lowerText.includes('intoxicaç')) {
      problems.push('Intoxicação por Metais Pesados');
      add('nutraceuticos', 'Ácido alfa-lipóico (ALA-R) 600mg - 1 cápsula em jejum (quelante) - 90 dias');
      add('nutraceuticos', 'Selênio orgânico (metionina) 200mcg - 1 cápsula/dia - 90 dias');
      add('fitoterapicos', 'Chlorella pyrenoidosa 500mg - 3 cápsulas 3x/dia (liga metais pesados no intestino) - 90 dias');
      add('fitoterapicos', 'Spirulina platensis 500mg - 2 cápsulas 3x/dia - 90 dias');
      add('fitoterapicos', 'Coentro (Coriandrum sativum) tintura — 30 gotas 3x/dia (mobilizador de metais) - 30 dias');
      add('ortomolecular', 'ALA EV 600mg em SF 250ml — infusão 90 min — 3x/sem × 8 semanas (quelação natural)');
      add('ortomolecular', 'Vitamina C High Dose EV 25g + Glutationa 1200mg — 2x/sem × 10 sessões (antioxidante quelante)');
      add('ortomolecular', 'DMPS (dimercaptopropanosulfonato) EV sob prescrição médica — protocolo de quelação supervisionado');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (25 γ) 150ml — 2x/sem × 15 sessões (oxigenação e mobilização tóxica)');
      add('ozonioterapia', 'Sauna de Ozônio 30 min a 40°C — 3x/sem × 4 sem (sudorese forçada de metais)');
      add('homeopatia', 'Mercurius solubilis 200CH - 1 dose semanal - 4 semanas (intoxicação mercúrio)');
      add('homeopatia', 'Nux vomica 30CH - 5 glóbulos 3x/dia - 30 dias (desintoxicação geral)');
      add('injetaveis', 'EDTA Cálcico EV 1g em SF 500ml — infusão 3h — 2x/sem × 10–20 sessões (quelação supervisionada)');
      add('injetaveis', 'Glutationa EV 1200mg em 100ml SF — push lento 20 min — 3x/sem × 10 sessões');
      add('florais', 'Crab Apple (Bach) — limpeza e purificação profunda — 4 gotas 4x/dia');
      add('orientacoesGerais', 'Sauna ou banhos quentes para sudorese ativa 3x/semana; ingestão 2,5L água/dia filtrada');
      add('orientacoesGerais', 'Evitar utensílios de alumínio, desodorantes com alumínio, peixes de grande porte (atum, peixe-espada)');
    }

    // ════════════════════════════════════════════════
    // CÂNDIDA / FUNGOS / PARASITAS
    // ════════════════════════════════════════════════
    if (lowerText.includes('candida') || lowerText.includes('fungo') || lowerText.includes('levedura') || lowerText.includes('parasita') || lowerText.includes('helminto') || lowerText.includes('giardia')) {
      problems.push('Sobrecarga Fúngica/Parasitária (Cândida / Parasitas)');
      add('fitoterapicos', 'Óleo de orégano (80% carvacrol) 150mg - 1 cápsula 3x/dia - 30–45 dias (antifúngico potente)');
      add('fitoterapicos', 'Extrato de alho (Allium sativum) 1000mg - 2 cápsulas 3x/dia (antibacteriano, antifúngico)');
      add('fitoterapicos', 'Pau d\'arco (Tabebuia avellanedae) 500mg - 1 cápsula 3x/dia - 45 dias');
      add('fitoterapicos', 'Ácido caprílico 500mg - 2 cápsulas 3x/dia - 30 dias (antifúngico de coco)');
      add('fitoterapicos', 'Extrato de sementes de toranja (GSE) 125mg - 1 cápsula 3x/dia - 30 dias');
      add('probioticos', 'Lactobacillus rhamnosus GG + L. plantarum - 10 bilhões UFC - 1 cápsula 2x/dia - 60 dias');
      add('ortomolecular', 'Vitamina C EV 10g + Ozônio intravascular — 2x/sem × 10 sessões (antifúngico sistêmico)');
      add('ozonioterapia', 'Insuflação Retal O₃/O₂ (35 γ) 150–200ml — antiparasitária e antifúngica — diária × 10d, depois 3x/sem × 3 sem');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (30 γ) — antimicrobiana sistêmica — 2x/sem × 12 sessões');
      add('homeopatia', 'China officinalis 30CH - 5 glóbulos 3x/dia - 21 dias (parasitose intestinal, anemia pós-parasitas)');
      add('homeopatia', 'Sulfur 30CH - 1 dose semanal - 4 semanas (drenagem fúngica profunda)');
      add('homeopatia', 'Cina 30CH - 5 glóbulos 3x/dia - 21 dias (parasitas intestinais, especialmente crianças)');
      add('injetaveis', 'Vitamina C EV 15g em SF 250ml — 2x/sem × 8 sessões (potencializa antiparasitários naturais)');
      add('florais', 'Crab Apple (Bach) — purificação e nojo de si mesmo — 4 gotas 4x/dia');
      add('dietaEliminacao', 'Dieta anti-Cândida: eliminar totalmente açúcar, álcool, carboidratos refinados, laticínios, frutas doces por 30 dias');
      add('dietaEliminacao', 'Protocolo "4R": Remove agressor → Replace enzimas → Reinoculate probióticos → Repair glutamina');
    }

    // ════════════════════════════════════════════════
    // ALERGIAS / SENSIBILIDADES ALIMENTARES
    // ════════════════════════════════════════════════
    if (lowerText.includes('alergia') || lowerText.includes('sensibil') || lowerText.includes('hipersen') || lowerText.includes('glúten') || lowerText.includes('lactose') || lowerText.includes('leaky gut') || lowerText.includes('intestino permeável')) {
      problems.push('Alergias / Sensibilidades Alimentares / Intestino Hiperpermeável');
      add('nutraceuticos', 'Quercetina 500mg - 1 cápsula 3x/dia (anti-histamínico e estabilizador de mastócitos) - 60 dias');
      add('nutraceuticos', 'Vitamina C 1000mg - 2x/dia - 60 dias (estabilizador de mastócitos)');
      add('nutraceuticos', 'L-Glutamina 10g - 1 sachê em jejum (reparo de tight junctions) - 60 dias');
      add('nutraceuticos', 'Colostro bovino 500mg - 2 cápsulas 2x/dia (IgA secretória, selagem intestinal) - 60 dias');
      add('fitoterapicos', 'Enzimas digestivas (protease, amilase, lipase, celulase) - 1 cápsula antes de cada refeição - 60 dias');
      add('fitoterapicos', 'Boswellia serrata 300mg - 1 cápsula 3x/dia (anti-inflamatório intestinal) - 60 dias');
      add('ortomolecular', 'Vitamina C EV 15g + Quercetina 1g EV — 1x/sem × 8 sessões (anti-histamínico intravenoso)');
      add('injetaveis', 'Vitamina C IM 2g + B5 500mg — 2x/sem × 6 semanas (suporte adrenal e anti-inflamatório)');
      add('homeopatia', 'Natrum muriaticum 30CH - 5 glóbulos 2x/dia - 30 dias (hipersensibilidade, intolerância ao glúten)');
      add('homeopatia', 'Apis mellifica 30CH - 5 glóbulos 3x/dia em crise aguda (edema, urticária, reação alérgica)');
      add('florais', 'Beech (Bach) — intolerância e julgamento — 4 gotas 4x/dia');
      add('dietaEliminacao', 'Protocolo de eliminação completa: retirar glúten, lactose, soja, milho, ovos, amendoim por 30 dias; reintroduzir 1 alimento/3 dias');
    }

    // ════════════════════════════════════════════════
    // SOBRECARGA HEPÁTICA / DETOX
    // ════════════════════════════════════════════════
    if (lowerText.includes('fígado') || lowerText.includes('hepát') || lowerText.includes('toxina') || lowerText.includes('bile') || lowerText.includes('vesícula') || lowerText.includes('detox') || lowerText.includes('hepat')) {
      problems.push('Sobrecarga Hepática / Déficit de Detoxificação');
      add('fitoterapicos', 'Cardo mariano (silimarina 80%) 300mg - 1 cápsula 3x/dia - 90 dias (proteção hepatocitária)');
      add('fitoterapicos', 'Alcachofra (Cynara scolymus) 300mg - 1 cápsula 3x/dia antes das refeições - 60 dias');
      add('fitoterapicos', 'Dente-de-leão (Taraxacum officinale) 400mg - 1 cápsula 2x/dia - 60 dias (colerético)');
      add('fitoterapicos', 'Cúrcuma (curcumina 95%) 500mg + Piperina 5mg - 1 cápsula 3x/dia - 90 dias');
      add('nutraceuticos', 'Taurina 1000mg - 1 cápsula em jejum (conjugação de bile, fase II hepática) - 60 dias');
      add('nutraceuticos', 'Colina + Inositol 500mg - 1 cápsula 2x/dia (fosfolipídios de membrana, anti-esteatose) - 60 dias');
      add('nutraceuticos', 'Metionina 500mg + Cisteína 300mg - 1 cápsula em jejum (doação de metil, glutationa) - 60 dias');
      add('ortomolecular', 'Glutationa EV 1200mg em SF 100ml — push lento 20 min — 3x/sem × 10 sessões (detox fase II)');
      add('ortomolecular', 'ALA EV 600mg + Vitamina C 10g + B-complex EV — 2x/sem × 8 sessões (antioxidante hepático)');
      add('ortomolecular', 'Fosfatidilcolina (PC) EV 500mg em SF 250ml — 2x/sem × 12 sessões (regeneração hepatocitária)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (25 γ) 150ml — ativa enzimas hepáticas de fase II — 2x/sem × 12 sessões');
      add('homeopatia', 'Chelidonium majus 6CH - 5 glóbulos 3x/dia - 30 dias (hepatoprotetor, colerético)');
      add('homeopatia', 'Lycopodium clavatum 30CH - 5 glóbulos 2x/dia - 30 dias (fígado, intestino, gases, direito)');
      add('homeopatia', 'Carduus marianus 6CH - 5 glóbulos 3x/dia - 30 dias (drenagem hepática profunda)');
      add('injetaveis', 'Glutationa EV 1200mg + Fosfolipídios EV 500mg em SF 250ml — 2x/sem × 12 sessões');
      add('injetaveis', 'EDTA EV 500mg + Vitamina C 5g em SF 250ml — 1x/sem × 10 sessões (detox geral)');
      add('florais', 'Holly (Bach) — raiva, inveja ocultas relacionadas à sobrecarga hepática — 4 gotas 4x/dia');
      add('orientacoesGerais', 'Jejum intermitente 14-16h (jantar até 19h, café da manhã às 9h) — 3-4x/semana');
      add('orientacoesGerais', 'Chá de boldo 1 xícara em jejum; chá de alcachofra 2x/dia; evitar álcool completamente por 90 dias');
    }

    // ════════════════════════════════════════════════
    // SISTEMA CARDIOVASCULAR
    // ════════════════════════════════════════════════
    if (lowerText.includes('coração') || lowerText.includes('cardíac') || lowerText.includes('cardiovasc') || lowerText.includes('pressão') || lowerText.includes('colesterol') || lowerText.includes('triglicerí') || lowerText.includes('arteria') || lowerText.includes('ateroscler')) {
      problems.push('Sistema Cardiovascular Comprometido');
      add('nutraceuticos', 'Ômega-3 TG (EPA 1000mg + DHA 500mg) - 3 cápsulas/dia nas refeições (anti-inflamatório vascular) - 90 dias');
      add('nutraceuticos', 'Coenzima Q10 (ubiquinol) 200mg - 1 cápsula/dia manhã (energia miocárdica) - 90 dias');
      add('nutraceuticos', 'L-Carnitina tartarato 2000mg - 1 sachê antes do exercício ou em jejum - 90 dias');
      add('nutraceuticos', 'Magnésio dimalato 400mg - 1 cápsula 2x/dia (relaxamento vascular, arritmia) - 90 dias');
      add('fitoterapicos', 'Hawthorne (Crataegus oxyacantha) 300mg - 1 cápsula 3x/dia (cardiotônico, vasodilatador) - 90 dias');
      add('fitoterapicos', 'Alho negro fermentado 1000mg - 1 cápsula/dia (hipolipemiante, anti-hipertensivo) - 90 dias');
      add('ortomolecular', 'Vitamina C EV 15g + Lisina EV 5g em SF 250ml — 1x/sem × 12 sessões (regeneração colágeno vascular, protocolo Rath-Pauling)');
      add('ortomolecular', 'Magnésio EV (MgSO₄) 2g em SF 250ml — 1x/sem × 8 sessões (antiarrítmico, vasodilatador)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (20 γ) 150ml — melhora perfusão tecidual e oxigenação — 2x/sem × 10 sessões');
      add('homeopatia', 'Cactus grandiflorus 6CH - 5 glóbulos 3x/dia - 30 dias (constrição coronariana, opressão torácica)');
      add('homeopatia', 'Aurum metallicum 30CH - 5 glóbulos 2x/dia - 30 dias (hipertensão, peso sobre coração)');
      add('homeopatia', 'Crataegus oxyacantha 6CH - 5 glóbulos 3x/dia - 60 dias (insuficiência cardíaca leve)');
      add('injetaveis', 'Myers Cocktail EV: B12 1000mcg + B6 100mg + B5 250mg + MgSO₄ 200mg + Vit C 2500mg + Ca 100mg em SF 250ml — 1x/sem × 10 sessões');
      add('injetaveis', 'CoQ10 EV 200mg em SF 100ml — push lento — 1x/sem × 8 sessões (insuficiência cardíaca)');
      add('florais', 'Holly (Bach) — compaixão, coração fechado — 4 gotas 4x/dia');
      add('dietaEliminacao', 'Dieta mediterrânea: olive oil extra virgem, vegetais coloridos, peixes gordurosos, nozes, grãos integrais; eliminar frituras e trans');
    }

    // ════════════════════════════════════════════════
    // SISTEMA HORMONAL / TIREÓIDE / SUPRARRENAL
    // ════════════════════════════════════════════════
    if (lowerText.includes('hormôn') || lowerText.includes('tireóide') || lowerText.includes('tireoide') || lowerText.includes('suprarrenal') || lowerText.includes('adrenal') || lowerText.includes('cortisol') || lowerText.includes('testosteron') || lowerText.includes('estrogen') || lowerText.includes('progester')) {
      problems.push('Desequilíbrio Hormonal / Suprarrenal');
      add('nutraceuticos', 'DHEA 25–50mg (sob avaliação sérica) - 1 cápsula pela manhã - 90 dias (precursor hormonal)');
      add('nutraceuticos', 'Selênio 200mcg + Iodo 150mcg - 1 cápsula/dia (suporte tireoidiano) - 90 dias');
      add('nutraceuticos', 'Vitamina D3 10.000 UI + K2 200mcg - 1 cápsula/dia (modulação hormonal) - 90 dias');
      add('fitoterapicos', 'Maca andina (Lepidium meyenii) 1500mg - 1 cápsula 2x/dia (adaptógeno hormonal) - 60 dias');
      add('fitoterapicos', 'Vitex agnus-castus 400mg - 1 cápsula pela manhã (fase lútea, prolactina, progesterona) - 3 meses');
      add('fitoterapicos', 'Fitohormonios: Cimicifuga racemosa 40mg - 1 cápsula 2x/dia (menopausa, sintomas estrogênicos) - 90 dias');
      add('fitoterapicos', 'Ashwagandha KSM-66 600mg - 1 cápsula à noite (eixo HPA, cortisol, testosterona) - 90 dias');
      add('ortomolecular', 'Vitamina C EV 10g + B5 500mg em SF 100ml — 2x/sem × 8 sessões (suporte suprarrenal)');
      add('ortomolecular', 'Zinco EV 5mg + Selênio EV 200mcg em SF 100ml — 1x/sem × 6 sessões (tireoide, testosterona)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (20 γ) — modulação inflamatória e hormonal — 2x/sem × 10 sessões');
      add('homeopatia', 'Thyreoidinum 30CH - 5 glóbulos 2x/dia - 30 dias (hipotireoidismo, fadiga, ganho de peso)');
      add('homeopatia', 'Sepia officinalis 200CH - 1 dose semanal - 4 semanas (feminino, menopausa, esgotamento)');
      add('homeopatia', 'Calcarea carbonica 200CH - 1 dose quinzenal - 60 dias (lentidão metabólica, hipotireoidismo)');
      add('injetaveis', 'Vitamina D3 300.000 UI IM (se nível < 20 ng/mL) — dose única; reavaliação em 90 dias');
      add('injetaveis', 'B12 metilcobalamina 5000mcg IM — 3x/sem × 4 semanas (fadiga, depressão, hormonal)');
      add('florais', 'Scleranthus (Bach) — equilíbrio, alternância emocional, hormonal — 4 gotas 4x/dia');
    }

    // ════════════════════════════════════════════════
    // SISTEMA OSTEOARTICULAR / DOR ARTICULAR
    // ════════════════════════════════════════════════
    if (lowerText.includes('articulaç') || lowerText.includes('artrite') || lowerText.includes('artros') || lowerText.includes('osteo') || lowerText.includes('coluna') || lowerText.includes('hérnia') || lowerText.includes('dor articul')) {
      problems.push('Comprometimento Osteoarticular');
      add('nutraceuticos', 'Colágeno tipo II não hidrolisado (UC-II) 40mg - 1 cápsula em jejum - 90 dias (regeneração cartilaginosa)');
      add('nutraceuticos', 'Glucosamina 1500mg + Condroitina 1200mg - 1 sachê/dia - 6 meses');
      add('nutraceuticos', 'Vitamina D3 10.000 UI + K2 200mcg - 1 cápsula/dia (mineralização óssea) - 90 dias');
      add('nutraceuticos', 'Cálcio quelado (bisglicinato) 600mg - 2x/dia com refeição - 90 dias');
      add('fitoterapicos', 'Boswellia serrata (AKBA 30%) 300mg - 1 cápsula 3x/dia (inibidor COX-2 natural) - 90 dias');
      add('fitoterapicos', 'Cúrcuma + Piperina 500mg - 1 cápsula 3x/dia (anti-inflamatório articular) - 90 dias');
      add('fitoterapicos', 'Harpagófito (Harpagophytum procumbens) 300mg - 1 cápsula 3x/dia - 60 dias');
      add('ortomolecular', 'Vitamina C EV 15g + Lisina 5g + Prolina 2g em SF 250ml — 1x/sem × 10 sessões (colágeno vascular e articular)');
      add('ozonioterapia', 'Ozonioterapia Intra-articular: 5–15ml O₃/O₂ (10–20 γ) — infiltração direta — 1x/sem × 5–10 sessões (joelho/quadril)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (20 γ) — anti-inflamatório sistêmico — 2x/sem × 10 sessões');
      add('ozonioterapia', 'Proloterapia com Ozônio: solução dextrose 25% + O₃/O₂ — infiltração periarticular — protocolo especializado');
      add('homeopatia', 'Bryonia alba 30CH - 5 glóbulos 3x/dia - 30 dias (artrite, dor que piora com movimento)');
      add('homeopatia', 'Rhus toxicodendron 30CH - 5 glóbulos 3x/dia - 30 dias (artrite que melhora com movimento inicial)');
      add('homeopatia', 'Calcarea fluorica 12CH - 5 glóbulos 3x/dia - 60 dias (deterioração óssea, osteófitos)');
      add('injetaveis', 'Colágeno hidrolisado EV 10g em SF 100ml + Vitamina C 5g — 1x/sem × 8 semanas');
      add('injetaveis', 'Condroitina + Glucosamina IM — protocolos injetáveis conforme prescrição médica');
      add('florais', 'Oak (Bach) — rigidez, perseverança excessiva — 4 gotas 4x/dia');
    }

    // ════════════════════════════════════════════════
    // SISTEMA RESPIRATÓRIO / PULMÕES
    // ════════════════════════════════════════════════
    if (lowerText.includes('pulmão') || lowerText.includes('brônquio') || lowerText.includes('asma') || lowerText.includes('sinus') || lowerText.includes('respiratório') || lowerText.includes('tosse') || lowerText.includes('rinite')) {
      problems.push('Comprometimento Respiratório');
      add('nutraceuticos', 'N-Acetilcisteína (NAC) 600mg - 1 cápsula 2x/dia em jejum (mucolítico, antioxidante pulmonar) - 60 dias');
      add('nutraceuticos', 'Vitamina C 2000mg - 2 cápsulas 12/12h (anti-histamínico, imunidade respiratória) - 60 dias');
      add('fitoterapicos', 'Guaco (Mikania glomerata) 500mg - 1 cápsula 3x/dia (broncodilatador, expectorante) - 30 dias');
      add('fitoterapicos', 'Própolis verde 500mg - 1 cápsula 2x/dia - 60 dias (antibacteriano respiratório)');
      add('ortomolecular', 'Vitamina C EV 10g + NAC EV 600mg em SF 250ml — 2x/sem × 8 sessões (asma, DPOC)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (20 γ) — anti-inflamatório broncopulmonar — 2x/sem × 10 sessões');
      add('ozonioterapia', 'Inalação de Água Ozonizada: 15 min inalação de névoa ozonizada — 1x/dia × 20 dias (sinusite, bronquite)');
      add('homeopatia', 'Arsenicum album 30CH - 5 glóbulos 3x/dia - 21 dias (asma, ansiedade respiratória, piora à noite)');
      add('homeopatia', 'Antimonium tartaricum 12CH - 5 glóbulos 3x/dia - 21 dias (bronquite, catarro abundante)');
      add('injetaveis', 'Vitamina C IM 2g + B6 100mg — 3x/sem × 4 semanas (suporte imune respiratório)');
      add('florais', 'Rock Rose (Bach) — terror, pânico em crise respiratória — 4 gotas em crise');
    }

    // ════════════════════════════════════════════════
    // SISTEMA RENAL / URINÁRIO
    // ════════════════════════════════════════════════
    if (lowerText.includes('rim') || lowerText.includes('renal') || lowerText.includes('urinário') || lowerText.includes('ureter') || lowerText.includes('cálculo') || lowerText.includes('bexiga') || lowerText.includes('cistite')) {
      problems.push('Comprometimento Renal/Urinário');
      add('fitoterapicos', 'Cavalinha (Equisetum arvense) 500mg - 1 cápsula 3x/dia (diurético, remineralizante) - 30 dias');
      add('fitoterapicos', 'Quebra-pedra (Phyllanthus niruri) 500mg - 1 cápsula 3x/dia - 30 dias (litíase renal, diurético)');
      add('fitoterapicos', 'Cranberry (proantocianidinas 36mg) - 1 cápsula 2x/dia - 60 dias (infecções urinárias)');
      add('nutraceuticos', 'Citrato de potássio + citrato de magnésio - 1 sachê 2x/dia (alcaliniza urina, previne cálculos) - 90 dias');
      add('ortomolecular', 'Vitamina C EV 10g em SF 250ml — 1x/sem × 6 sessões (antioxidante renal, prevenção litíase)');
      add('ozonioterapia', 'Insuflação Retal O₃/O₂ (20 γ) 150ml — anti-inflamatório renal indireto — 3x/sem × 3 sem');
      add('homeopatia', 'Berberis vulgaris 6CH - 5 glóbulos 3x/dia - 30 dias (cálculo renal, dor lombar irradiada)');
      add('homeopatia', 'Cantharis vesicatoria 30CH - 5 glóbulos 3x/dia - 21 dias (cistite, ardor urinário)');
      add('orientacoesGerais', 'Mínimo 2,5L de água filtrada/dia; chá de cavalinha e quebrra-pedra 2x/dia');
    }

    // ════════════════════════════════════════════════
    // SISTEMA NERVOSO / ANSIEDADE / DEPRESSÃO / SONO
    // ════════════════════════════════════════════════
    if (lowerText.includes('ansiedade') || lowerText.includes('depressão') || lowerText.includes('insônia') || lowerText.includes('sono') || lowerText.includes('pânico') || lowerText.includes('psicossom')) {
      problems.push('Desequilíbrio Neuroemocional / Ansiedade / Sono');
      add('nutraceuticos', '5-HTP (hidroxitriptofano) 100mg - 1 cápsula 30 min antes de dormir (precursor serotonina) - 60 dias');
      add('nutraceuticos', 'L-Teanina 200mg - 1 cápsula 2x/dia (ansiolítico, alfa-ondas cerebrais) - 60 dias');
      add('nutraceuticos', 'Magnésio treonato ou bisglicinato 400mg - 1 cápsula à noite (relaxamento muscular e neurológico) - 90 dias');
      add('nutraceuticos', 'GABA 500mg - 1 cápsula 30 min antes de dormir - 60 dias');
      add('fitoterapicos', 'Valeriana (Valeriana officinalis) 400mg - 1 cápsula 30 min antes de dormir - 30 dias');
      add('fitoterapicos', 'Melissa officinalis + Camomila 300mg - 1 cápsula 3x/dia (ansiolítico, antiespasmódico) - 60 dias');
      add('fitoterapicos', 'Passiflora incarnata 300mg - 1 cápsula 3x/dia (GABA-érgico, ansiolítico) - 60 dias');
      add('ortomolecular', 'Magnésio EV 2g + B-complex EV em SF 250ml — 1x/sem × 6 semanas (neuromodulador)');
      add('ortomolecular', 'NADH EV 500mg em SF 100ml — 1x/sem × 4 sessões (depressão, energy cerebral)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (15 γ) — modulação serotoninérgica — 2x/sem × 8 sessões');
      add('homeopatia', 'Ignatia amara 200CH - 1 dose semanal - 4 semanas (luto, tristeza reprimida, globo histérico)');
      add('homeopatia', 'Argentum nitricum 30CH - 5 glóbulos 3x/dia - 21 dias (ansiedade antecipatória, pânico)');
      add('homeopatia', 'Coffea cruda 30CH - 5 glóbulos 30 min antes de dormir - 30 dias (insônia por excesso mental)');
      add('homeopatia', 'Aurum metallicum 200CH - 1 dose quinzenal - 60 dias (depressão profunda, isolamento)');
      add('injetaveis', 'Complexo B IM (B1+B6+B12) 1 amp — 3x/sem × 4 semanas (neuropatia, depressão)');
      add('injetaveis', 'Magnésio EV 2g em SF 100ml + 5-HTP oral — protocolo integrado ansiedade — 1x/sem × 8 sessões');
      add('florais', 'Rock Water (Bach) — rigidez mental, autopunição — 4 gotas 4x/dia');
      add('florais', 'White Chestnut (Bach) — pensamentos repetitivos, insônia mental — 4 gotas 4x/dia');
      add('florais', 'Mimulus (Bach) — medos específicos conhecidos — 4 gotas 4x/dia');
      add('orientacoesGerais', 'Higiene do sono: rotina fixa de dormir/acordar; evitar telas 1h antes; quarto escuro e fresco');
    }

    // ════════════════════════════════════════════════
    // ONCOLÓGICO / SUPORTE AO CÂNCER
    // ════════════════════════════════════════════════
    if (lowerText.includes('neoplasia') || lowerText.includes('câncer') || lowerText.includes('tumor') || lowerText.includes('oncológico') || lowerText.includes('metástase')) {
      problems.push('Suporte Oncológico Integrativo');
      add('nutraceuticos', 'Vitamina C (ácido ascórbico pó) 10g/dia fracionado - 3x/dia - uso contínuo (antioxidante, pró-oxidante em alta dose)');
      add('nutraceuticos', 'Vitamina D3 10.000 UI/dia + K2 200mcg (receptores VDR tumorais) - 90 dias');
      add('nutraceuticos', 'Coenzima Q10 400mg - 2x/dia - uso contínuo');
      add('fitoterapicos', 'Cogumelo Shiitake (Lentinus edodes) + Reishi (Ganoderma) - 500mg cada - 2x/dia - uso contínuo (beta-glucanas imunomoduladoras)');
      add('fitoterapicos', 'Curcumina fosfatidilcolina 500mg - 3x/dia - uso contínuo (anti-inflamatório, anti-angiogênico)');
      add('ortomolecular', 'Vitamina C High Dose EV 50–75g em SF 1000ml — infusão 3h — 2–3x/sem (protocolo Riordan)');
      add('ortomolecular', 'Glutationa EV 1200mg + ALA 600mg — 3x/sem × ciclos de 10 sessões (suporte detox quimio)');
      add('ozonioterapia', 'Autohemoterapia Maior (ATM) (20–25 γ) 200ml — imunomoduladora — 3x/sem × ciclos contínuos');
      add('ozonioterapia', 'Insuflação Retal O₃/O₂ (30 γ) 300ml — oxigenação e alcalinização — diária × protocolos de suporte');
      add('homeopatia', 'Carcinosinum 200CH - 1 dose mensal - sob supervisão homeopata (miasma cancerígeno)');
      add('homeopatia', 'Arsenicum album 200CH - 1 dose quinzenal (ansiedade, medo, suporte paliativo)');
      add('injetaveis', 'Vitamina C EV 50g (protocolo Riordan) + Selênio IV 400mcg — 3x/sem × ciclos de 10 sessões');
      add('injetaveis', 'Mistletoe (Iscador) SC — protocolo antroposófico oncológico — sob prescrição especializada');
      add('florais', 'Sweet Chestnut (Bach) — angústia extrema, limite do suportável — 4 gotas 4x/dia');
    }

    // ════════════════════════════════════════════════
    // HOMEOPATIA DE SUPORTE GERAL (SEMPRE PRESENTE)
    // ════════════════════════════════════════════════
    add('homeopatia', 'Sulfur 30CH - 5 glóbulos 2x/semana - 30 dias (drenagem toxinas, miasma psorico geral)');
    add('homeopatia', 'Thuya occidentalis 30CH - 5 glóbulos 2x/semana - 30 dias (imunomodulação, detox viral/vacinal)');
    add('homeopatia', 'Nux vomica 30CH - 5 glóbulos 3x/dia - 30 dias (desintoxicação geral, stress hepático)');

    // ════════════════════════════════════════════════
    // OZONIOTERAPIA DE BASE (SEMPRE PRESENTE)
    // ════════════════════════════════════════════════
    add('ozonioterapia', '⚠️ IMPORTANTE: Todos os protocolos de ozonioterapia requerem prescrição médica e equipamento calibrado (gerador O₃ médico certificado)');

    // ════════════════════════════════════════════════
    // INJETÁVEIS DE BASE (SEMPRE PRESENTE)
    // ════════════════════════════════════════════════
    add('injetaveis', '⚠️ IMPORTANTE: Todos os protocolos injetáveis IV/IM requerem prescrição médica e aplicação em ambiente clínico supervisionado');



    return {
      problems: problems.length > 0 ? problems : ['Análise energética geral — sem alterações críticas detectadas'],
      protocol: therapeuticProtocol,
      summary: generateProtocolSummary(therapeuticProtocol),
      uploadDate: pdfData.uploadDate
    };
  }

  function generateProtocolSummary(protocol) {
    const totalItems = Object.values(protocol).reduce((acc, arr) => acc + arr.length, 0);
    const categories = Object.keys(protocol).filter(key => protocol[key].length > 0);
    const labelMap = {
      probioticos: 'Probióticos', fitoterapicos: 'Fitoterápicos', nutraceuticos: 'Nutracêuticos',
      ortomolecular: 'Ortomolecular IV', ozonioterapia: 'Ozonioterapia', homeopatia: 'Homeopatia',
      injetaveis: 'Injetáveis', florais: 'Florais', dietaEliminacao: 'Dieta', suplementacao: 'Suplementação', orientacoesGerais: 'Orientações'
    };
    return {
      totalItems,
      categories: categories.length,
      categoriesNames: categories.map(c => labelMap[c] || c)
    };
  }

  if (loading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Analisando PDF de Biorressonância...</Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!analysis) {
    return null;
  }

  const safetyReview = evaluateProtocolSafety(patientData, analysis.protocol);

  return (
    <Box>
      {/* Cabeçalho */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          📊 Análise de Biorressonância - Protocolo Terapêutico Personalizado
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Baseado no exame: {pdfData.name} • {new Date(analysis.uploadDate).toLocaleDateString('pt-BR')}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip 
            label={`${analysis.problems.length} Alterações Detectadas`} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip 
            label={`${analysis.summary.totalItems} Intervenções Terapêuticas`} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
          <Chip 
            label={`${analysis.summary.categories} Categorias de Tratamento`} 
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
          />
        </Box>
      </Paper>

      <Alert severity="warning" sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Revisão de segurança obrigatória antes da conduta
        </Typography>
        {safetyReview.warnings.map((warning, index) => (
          <Typography variant="body2" key={index}>• {warning}</Typography>
        ))}
      </Alert>

      {/* Alterações Detectadas */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: '#fff3e0' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#e65100', fontWeight: 600 }}>
          🔍 Alterações Detectadas no Exame
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {analysis.problems.map((problem, idx) => (
            <Chip 
              key={idx} 
              label={problem} 
              color="warning"
              sx={{ fontWeight: 500 }}
            />
          ))}
        </Box>
      </Paper>

      {/* Protocolo Terapêutico */}
      <Typography variant="h5" sx={{ mb: 3, color: '#1976d2', fontWeight: 600 }}>
        💊 Protocolo Terapêutico Completo
      </Typography>

      {/* Probióticos */}
      {analysis.protocol.probioticos.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🦠</span> Probióticos
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.probioticos.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Fitoterápicos */}
      {analysis.protocol.fitoterapicos.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#388e3c', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🌿</span> Fitoterápicos
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.fitoterapicos.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Nutracêuticos */}
      {analysis.protocol.nutraceuticos.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#0288d1', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>💊</span> Nutracêuticos e Suplementos
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.nutraceuticos.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Suplementação */}
      {analysis.protocol.suplementacao.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#0097a7', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>⚡</span> Suplementação Específica
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.suplementacao.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Homeopatia */}
      {analysis.protocol.homeopatia.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#7b1fa2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>💧</span> Homeopatia (Dr. Nilo Cairo / Escola Clássica)
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.homeopatia.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f3e5f5', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Referência: Guia Homeopático Dr. Nilo Cairo (2018) · Farmacotécnica Homeopática IEF
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Ortomolecular */}
      {analysis.protocol.ortomolecular.length > 0 && (
        <Paper sx={{ p: 3, mb: 2, border: '2px solid #1565c0' }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#1565c0', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>⚗️</span> Terapia Ortomolecular — Intravenosa / Alta Dose
          </Typography>
          <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 2 }}>
            ⚠️ Aplicação exclusivamente em clínica/hospital por profissional habilitado
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.ortomolecular.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1.5, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#e3f2fd', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Referências: E-book Nutracêuticos e Fitos (IEF) · E-book Substâncias Isoladas (IEF) · Linus Pauling Institute · Protocolo Riordan (Vit C IV)
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Ozonioterapia */}
      {analysis.protocol.ozonioterapia.length > 0 && (
        <Paper sx={{ p: 3, mb: 2, border: '2px solid #00838f' }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#00838f', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🫧</span> Ozonioterapia — Procedimentos e Protocolos
          </Typography>
          <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 2 }}>
            ⚠️ Exige equipamento certificado (gerador médico de O₃/O₂) e prescrição médica
          </Typography>

          {/* Tabela de procedimentos */}
          <Box sx={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#e0f7fa' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.85rem', border: '1px solid #b2ebf2' }}>Procedimento</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', fontSize: '0.85rem', border: '1px solid #b2ebf2' }}>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {analysis.protocol.ozonioterapia.map((item, idx) => {
                  const isWarning = item.startsWith('⚠️');
                  return (
                    <tr key={idx} style={{ backgroundColor: isWarning ? '#fff9c4' : idx % 2 === 0 ? '#fff' : '#f9fbe7' }}>
                      <td colSpan={isWarning ? 2 : 1} style={{ padding: '8px 12px', fontSize: '0.87rem', border: '1px solid #e0f7fa', fontWeight: isWarning ? 600 : 400 }}>
                        {isWarning ? item : item.split(':')[0]}
                      </td>
                      {!isWarning && (
                        <td style={{ padding: '8px 12px', fontSize: '0.87rem', border: '1px solid #e0f7fa' }}>
                          {item.includes(':') ? item.split(':').slice(1).join(':').trim() : '—'}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#e0f7fa', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Referências: Guia Completo de Bioressonância (IEF) · Protocolos Soroterapia e IM (IEF) · ISCO3 — International Scientific Committee of Ozone Therapy (2015)
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Injetáveis */}
      {analysis.protocol.injetaveis.length > 0 && (
        <Paper sx={{ p: 3, mb: 2, border: '2px solid #558b2f' }}>
          <Typography variant="h6" sx={{ mb: 1, color: '#558b2f', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>💉</span> Protocolos Injetáveis — IV / IM / Soroterapia
          </Typography>
          <Typography variant="caption" sx={{ color: '#777', display: 'block', mb: 2 }}>
            ⚠️ Aplicação exclusivamente por profissional habilitado em ambiente clínico
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.injetaveis.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1.5, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
          <Box sx={{ mt: 2, p: 1.5, bgcolor: '#f1f8e9', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Referências: Protocolos Soroterapia e IM — IEF · E-book Substâncias Isoladas (IEF) · Protocolo Myers Cocktail (Alan Gaby MD, 2002)
            </Typography>
          </Box>
        </Paper>
      )}

      {/* Florais */}
      {analysis.protocol.florais.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#ad1457', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🌸</span> Florais de Bach — Equilíbrio Emocional
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.florais.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Dieta e Eliminação */}
      {analysis.protocol.dietaEliminacao.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#f57c00', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>🍽️</span> Orientações Dietéticas
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.dietaEliminacao.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Orientações Gerais */}
      {analysis.protocol.orientacoesGerais.length > 0 && (
        <Paper sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#5d4037', display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>📝</span> Orientações Gerais e Estilo de Vida
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 3 }}>
            {analysis.protocol.orientacoesGerais.map((item, idx) => (
              <Typography component="li" key={idx} sx={{ mb: 1, lineHeight: 1.8 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}

      {/* Rodapé com observações importantes */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          ⚕️ Observações Importantes do Protocolo:
        </Typography>
        <Typography variant="body2" component="div">
          • Este protocolo foi gerado automaticamente baseado nos resultados do exame de biorressonância<br/>
          • As dosagens são sugestões iniciais e devem ser ajustadas conforme evolução clínica<br/>
          • Recomenda-se acompanhamento profissional durante todo o tratamento<br/>
          • Reavaliação após 30-60 dias para ajustes no protocolo<br/>
          • Em caso de reações adversas, suspender uso e consultar profissional<br/>
          • Manter hidratação adequada (mínimo 2 litros de água/dia)<br/>
          • Evitar interações medicamentosas - consultar profissional de saúde se em uso de medicações
        </Typography>
      </Alert>

      {/* RECEITUÁRIO - Formato Profissional para Impressão */}
      <Box id="prescription-printable" sx={{ mt: 4, pageBreakBefore: 'always' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            border: '2px solid #1976d2',
            background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)'
          }}
        >
          {/* Cabeçalho do Receituário */}
          <Box sx={{ borderBottom: '3px solid #1976d2', pb: 2, mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2', textAlign: 'center', mb: 1 }}>
              NATUROPATIA INTEGRATIVA
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', fontWeight: 600 }}>
              Wander Pires Silva Coelho
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666' }}>
              Terapeuta Integrativo Funcional | Naturopatia e Iridologia - CRTH-BR 17821
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 1 }}>
              Biorressonância | Medicina Tradicional Chinesa | Fitoterapia
            </Typography>
          </Box>

          {/* Dados do Paciente */}
          <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#1976d2' }}>
              DADOS DO PACIENTE
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Typography variant="body2">
                <strong>Nome:</strong> {patientData?.name || patientData?.nome || 'Não informado'}
              </Typography>
              <Typography variant="body2">
                <strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}
              </Typography>
              {patientData?.idade && (
                <Typography variant="body2">
                  <strong>Idade:</strong> {patientData.idade} anos
                </Typography>
              )}
              {patientData?.telefone && (
                <Typography variant="body2">
                  <strong>Telefone:</strong> {patientData.telefone}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Diagnóstico */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d32f2f' }}>
              📋 DIAGNÓSTICO ENERGÉTICO (Biorressonância)
            </Typography>
            <Box sx={{ pl: 2 }}>
              {analysis.problems.map((problem, idx) => (
                <Typography key={idx} variant="body1" sx={{ mb: 0.5 }}>
                  • {problem}
                </Typography>
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* RECEITUÁRIO - Lista Completa */}
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1976d2', textAlign: 'center' }}>
            ℞ PRESCRIÇÃO TERAPÊUTICA
          </Typography>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#e3f2fd' }}>
                  <TableCell sx={{ fontWeight: 700, width: '40%' }}>Produto/Intervenção</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: '20%' }}>Dose</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: '20%' }}>Frequência</TableCell>
                  <TableCell sx={{ fontWeight: 700, width: '20%' }}>Duração</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Probióticos */}
                {analysis.protocol.probioticos.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e8f5e9', fontWeight: 600 }}>
                        🦠 PROBIÓTICOS
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.probioticos.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`prob-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Fitoterápicos */}
                {analysis.protocol.fitoterapicos.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e8f5e9', fontWeight: 600 }}>
                        🌿 FITOTERÁPICOS
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.fitoterapicos.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`fito-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Nutracêuticos */}
                {analysis.protocol.nutraceuticos.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e3f2fd', fontWeight: 600 }}>
                        💊 NUTRACÊUTICOS
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.nutraceuticos.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`nutra-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Suplementação */}
                {analysis.protocol.suplementacao.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e0f2f1', fontWeight: 600 }}>
                        ⚡ SUPLEMENTAÇÃO
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.suplementacao.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`supl-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Homeopatia */}
                {analysis.protocol.homeopatia.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#f3e5f5', fontWeight: 600 }}>
                        💧 HOMEOPATIA (Dr. Nilo Cairo / Clássica)
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.homeopatia.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`homeo-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Ortomolecular */}
                {analysis.protocol.ortomolecular.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e3f2fd', fontWeight: 600 }}>
                        ⚗️ TERAPIA ORTOMOLECULAR (IV / Alta Dose)
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.ortomolecular.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`orto-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Ozonioterapia */}
                {analysis.protocol.ozonioterapia.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#e0f7fa', fontWeight: 600 }}>
                        🫧 OZONIOTERAPIA (Procedimentos)
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.ozonioterapia.map((item, idx) => {
                      const parts = item.split(':');
                      return (
                        <TableRow key={`ozon-${idx}`}>
                          <TableCell sx={{ fontWeight: item.startsWith('⚠️') ? 600 : 400 }}>{parts[0]}</TableCell>
                          <TableCell colSpan={3}>{parts.slice(1).join(':').trim() || '—'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Injetáveis */}
                {analysis.protocol.injetaveis.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#f1f8e9', fontWeight: 600 }}>
                        💉 INJETÁVEIS (IV / IM / Soroterapia)
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.injetaveis.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`inj-${idx}`}>
                          <TableCell sx={{ fontWeight: item.startsWith('⚠️') ? 600 : 400 }}>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}

                {/* Florais */}
                {analysis.protocol.florais.length > 0 && (
                  <>
                    <TableRow>
                      <TableCell colSpan={4} sx={{ bgcolor: '#fce4ec', fontWeight: 600 }}>
                        🌸 FLORAIS DE BACH
                      </TableCell>
                    </TableRow>
                    {analysis.protocol.florais.map((item, idx) => {
                      const parsed = parsePrescriptionLine(item);
                      return (
                        <TableRow key={`flor-${idx}`}>
                          <TableCell>{parsed.product}</TableCell>
                          <TableCell>{parsed.dose}</TableCell>
                          <TableCell>{parsed.frequency}</TableCell>
                          <TableCell>{parsed.duration}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Orientações Dietéticas */}
          {analysis.protocol.dietaEliminacao.length > 0 && (
            <Box sx={{ mt: 3, p: 2, bgcolor: '#fff3e0', borderRadius: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#f57c00' }}>
                🍽️ ORIENTAÇÕES DIETÉTICAS
              </Typography>
              {analysis.protocol.dietaEliminacao.map((item, idx) => (
                <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </Box>
          )}

          {/* Orientações Gerais */}
          {analysis.protocol.orientacoesGerais.length > 0 && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#efebe9', borderRadius: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1, color: '#5d4037' }}>
                📝 ORIENTAÇÕES GERAIS
              </Typography>
              {analysis.protocol.orientacoesGerais.map((item, idx) => (
                <Typography key={idx} variant="body2" sx={{ mb: 0.5 }}>
                  • {item}
                </Typography>
              ))}
            </Box>
          )}

          {/* Rodapé do Receituário */}
          <Box sx={{ mt: 4, pt: 3, borderTop: '2px solid #ddd' }}>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              <strong>Observações:</strong> Protocolo gerado com base em análise de Biorressonância. 
              Recomenda-se reavaliação após 30-60 dias. Em caso de dúvidas ou reações adversas, 
              contatar o terapeuta imediatamente.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  _______________________________
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Data: {new Date().toLocaleDateString('pt-BR')}
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  _______________________________
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Wander Pires Silva Coelho
                </Typography>
                <Typography variant="caption">
                  CRTH-BR 17821
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Botão de Impressão */}
          <Box sx={{ mt: 3, textAlign: 'center', '@media print': { display: 'none' } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 600,
                px: 4
              }}
            >
              Imprimir Sugestões Terapêuticas
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Estilos de impressão */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #prescription-printable,
            #prescription-printable * {
              visibility: visible;
            }
            #prescription-printable {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            @page {
              margin: 1.5cm;
            }
          }
        `}
      </style>

      <IridologySequenceGuide title="Sequência Iridológica Integrada à Biorressonância" />
    </Box>
  );
}

// Função auxiliar para parsear linha de prescrição
function parsePrescriptionLine(line) {
  // Exemplo: "Lactobacillus acidophilus + Bifidobacterium lactis - 10 bilhões UFC - 1 cápsula em jejum"
  const parts = line.split(' - ');
  
  return {
    product: parts[0] || line,
    dose: parts[1] || '-',
    frequency: parts[2] || '-',
    duration: parts[3] || '30-60 dias'
  };
}
