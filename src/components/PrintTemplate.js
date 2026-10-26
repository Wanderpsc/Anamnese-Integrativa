import stampImg from '../assets/stamp.png';
import emblemImg from '../assets/therapist-symbol.jpg';
import { getSetting } from '../lib/api';

async function getClinicInfo() {
  try {
    const s = await getSetting('clinicInfo');
    if (!s) return null;
    if (typeof s === 'string') return JSON.parse(s);
    return s;
  } catch (e) {
    return null;
  }
}

export async function buildLetterheadHtml({ title = '', bodyHtml = '', footerHtml = '', meta = {}, qrUrl = '' }) {
  const clinicInfo = await getClinicInfo();
  const clinicName = clinicInfo?.clinicName || 'Local de Atendimento Wander Pires';
  const clinicSub = clinicInfo?.clinicSub || 'Atendimento Integrativo - Naturopatia & Iridologia';
  const therapistName = clinicInfo?.therapistName || 'Wander Pires Silva Coelho';
  const therapistTitle = clinicInfo?.therapistTitle || 'Terapeuta Integrativo Funcional';
  const therapistSpecialty = clinicInfo?.therapistSpecialty || 'Naturopatia e Iridologia';
  const therapistReg = clinicInfo?.therapistReg || 'CRTH-BR 17821';
  const contact = clinicInfo?.contact || 'wanderpsc@gmail.com | (89) 9 8139-8723';

  const qrHtml = qrUrl ? `<img src="${qrUrl}" alt="QR" style="height:68px;width:68px;border:0;display:block;"/>` : '';

  // Inline images as base64 data URIs so they render in print windows and PDFs
  async function toDataUrl(url) {
    try {
      const res = await fetch(url, { cache: 'force-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) { return url; }
  }
  const emblemSrc = await toDataUrl(emblemImg).catch(() => emblemImg);
  const stampSrc  = await toDataUrl(stampImg).catch(() => stampImg);

  const defaultFooter = `
    <table style="width:100%;border-collapse:collapse;margin-top:4px;">
      <tr>
        <td style="width:70%;vertical-align:middle;padding-right:10px;">
          <p style="font-style:italic;color:#2e7d32;font-size:9px;margin:0 0 4px 0;line-height:1.4;">"A sa&#250;de integral vai al&#233;m da aus&#234;ncia de doen&#231;a &#8212; &#233; o equil&#237;brio entre corpo, mente e esp&#237;rito.<br>A natureza oferece os recursos; o terapeuta, o caminho."</p>
          <p style="font-size:8.5px;color:#37474f;margin:0;line-height:1.5;"><strong>${therapistName}</strong> &nbsp;&middot;&nbsp; ${therapistTitle}<br>${therapistSpecialty} &nbsp;&middot;&nbsp; ${therapistReg}<br>Cel.: (89) 9 8139-8723 &nbsp;&middot;&nbsp; wanderpsc@gmail.com</p>
        </td>
        <td style="width:30%;text-align:right;vertical-align:middle;">
          ${stampSrc && stampSrc !== stampImg ? `<img src="${stampSrc}" alt="carimbo" style="height:60px;opacity:0.85;"/>` : ''}
          ${qrHtml}
        </td>
      </tr>
    </table>
    <p style="font-size:8px;color:#9e9e9e;text-align:center;margin:5px 0 0 0;border-top:1px solid #e0e0e0;padding-top:4px;">
      Este documento contém sugestões terapêuticas integrativas elaboradas por terapeuta habilitado e não substitui avaliação ou prescrição médica.
    </p>`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${title || 'Receituário Terapêutico'}</title>
  <style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Arial', 'Helvetica Neue', 'Helvetica', sans-serif;
      font-size: 10px;
      line-height: 1.4;
      color: #1a1a1a;
      background: #ececec;
      padding: 8px;
    }

    /* ── Page card ── */
    .rx-card {
      max-width: 780px;
      margin: 0 auto;
      background: #fff;
      border: 1px solid #bdbdbd;
      border-top: 5px solid #2e7d32;
      box-shadow: 0 2px 12px rgba(0,0,0,.12);
    }

    /* ── HEADER ── */
    .rx-header {
      display: table;
      width: 100%;
      padding: 8px 16px 7px;
      background: linear-gradient(to bottom, #f9fbe7 0%, #ffffff 100%);
      border-bottom: 2px double #2e7d32;
      page-break-inside: avoid;
    }
    .rx-header-logo {
      display: table-cell;
      width: 72px;
      vertical-align: middle;
      text-align: center;
    }
    .rx-header-logo img {
      width: 66px;
      height: 66px;
      object-fit: contain;
      border-radius: 50%;
      border: 2px solid #2e7d32;
      background: #fff;
      display: block;
    }
    .rx-header-info {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
      padding: 0 6px;
    }
    .rx-header-qr {
      display: table-cell;
      width: 72px;
      vertical-align: middle;
      text-align: right;
    }
    .rx-clinic-name {
      font-size: 14px;
      font-weight: 700;
      color: #1b5e20;
      letter-spacing: 0.3px;
      line-height: 1.2;
    }
    .rx-clinic-sub {
      font-size: 9.5px;
      color: #388e3c;
      margin-top: 2px;
      line-height: 1.3;
    }
    .rx-therapist {
      font-size: 9px;
      color: #546e7a;
      margin-top: 2px;
      line-height: 1.3;
    }

    /* ── Title band ── */
    .rx-title-band {
      background: #2e7d32;
      color: #fff;
      text-align: center;
      padding: 4px 16px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      page-break-after: avoid;
    }

    /* ── Body ── */
    .rx-body {
      padding: 10px 16px 8px;
    }

    /* ── Section blocks ── */
    .rx-section {
      margin-bottom: 8px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .rx-section-title {
      font-size: 9.5px;
      font-weight: 700;
      color: #fff;
      background: #388e3c;
      padding: 2px 7px;
      margin-bottom: 3px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
    }
    .rx-section-body {
      padding: 3px 7px;
      border-left: 3px solid #a5d6a7;
      background: #f9fbe7;
    }

    /* ── Tables inside body ── */
    table.rx-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 9.5px;
      margin-bottom: 5px;
      page-break-inside: avoid;
    }
    table.rx-table th {
      background: #e8f5e9;
      color: #1b5e20;
      padding: 3px 5px;
      text-align: left;
      font-weight: 700;
      border-bottom: 1.5px solid #a5d6a7;
      font-size: 9px;
    }
    table.rx-table td {
      padding: 2px 5px;
      border-bottom: 1px solid #f0f0f0;
      vertical-align: top;
    }
    table.rx-table tr:last-child td { border-bottom: none; }
    table.rx-table tr:nth-child(even) td { background: #f9fbe7; }

    /* ── Protocol cards ── */
    .rx-proto-card {
      border: 1px solid #c8e6c9;
      border-radius: 3px;
      margin-bottom: 6px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .rx-proto-header {
      background: #e8f5e9;
      padding: 3px 7px;
      font-weight: 700;
      font-size: 9.5px;
      color: #1b5e20;
      border-bottom: 1px solid #c8e6c9;
    }
    .rx-proto-body { padding: 4px 7px; }

    /* ── Footer ── */
    .rx-footer {
      padding: 8px 16px;
      background: #f9fbe7;
      border-top: 2px solid #c8e6c9;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* ── Utility ── */
    .text-center { text-align: center; }
    .text-muted   { color: #757575; }
    .divider-green { height: 1px; background: #c8e6c9; margin: 8px 0; }
    .chip {
      display: inline-block;
      background: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #a5d6a7;
      border-radius: 12px;
      padding: 1px 7px;
      font-size: 10px;
      margin: 1px 2px;
    }

    /* ── Print rules ── */
    @media print {
      @page { size: A4 portrait; margin: 12mm 15mm; }
      html, body { background: #fff !important; padding: 0 !important; margin: 0 !important; font-size: 11px; width: 100%; overflow-x: hidden; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .rx-card { box-shadow: none !important; border-left: 0; border-right: 0; border-bottom: 0; border-top: 4px solid #2e7d32; max-width: 100%; width: 100%; }
      .rx-header, .rx-title-band, .rx-footer { page-break-inside: avoid; }
      .rx-section, .rx-proto-card, table.rx-table { page-break-inside: avoid; break-inside: avoid; }
      h1,h2,h3,h4,h5,h6 { page-break-after: avoid; }
      tr { page-break-inside: avoid; }
      thead { display: table-header-group; }
      img { max-width: 100%; }
      * { overflow-x: visible; }
    }
  </style>
</head>
<body>
  <div class="rx-card">
    <!-- HEADER -->
    <div class="rx-header">
      <div class="rx-header-logo">
        <img src="${emblemSrc}" alt="Símbolo Terapeuta" onerror="this.style.display='none'"/>
      </div>
      <div class="rx-header-info">
        <div class="rx-clinic-name">${therapistName}</div>
        <div class="rx-clinic-sub">${therapistTitle} &mdash; ${therapistSpecialty}</div>
        <div class="rx-therapist">${therapistReg} &nbsp;&bull;&nbsp; Cel.: (89) 9 8139-8723 &nbsp;&bull;&nbsp; wanderpsc@gmail.com</div>
      </div>
      <div class="rx-header-qr">${qrHtml}</div>
    </div>
    <!-- TITLE BAND -->
    <div class="rx-title-band">${title || 'SUGESTÕES TERAPÊUTICAS INTEGRATIVAS'}</div>
    <!-- BODY -->
    <div class="rx-body">
      ${bodyHtml}
    </div>
    <!-- FOOTER -->
    <div class="rx-footer">
      ${footerHtml || defaultFooter}
    </div>
  </div>
</body>
</html>`;
}

export function openPrintWindow(htmlString, autoPrint = true) {
  const w = window.open('', '_blank', 'height=600,width=800');
  if (w) {
    w.document.write(htmlString);
    w.document.close();
    w.focus();
    if (autoPrint) setTimeout(() => w.print(), 500);
  }
}

export async function downloadPdfFromHtml(htmlString, filename = 'document.pdf') {
  // Create a hidden iframe to ensure styles in head are respected and fonts/images load
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.width = '800px';
  iframe.style.height = '1100px';
  iframe.style.border = '0';
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  try {
    const headMatch = htmlString.match(/<head[\s\S]*?>[\s\S]*?<\/head>/i);
    const bodyMatch = htmlString.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const headHtml = headMatch ? headMatch[0] : '';
    const bodyHtml = bodyMatch ? bodyMatch[1] : htmlString;
    const docString = `<!doctype html><html>${headHtml}<body>${bodyHtml}</body></html>`;
    doc.open();
    doc.write(docString);
    doc.close();
    await new Promise(resolve => {
      const onLoad = () => resolve();
      if (doc.readyState === 'complete') return resolve();
      iframe.addEventListener('load', onLoad);
      setTimeout(() => resolve(), 1200);
    });
    // Wait for images
    await new Promise((resolveImages) => {
      const imgs = doc.querySelectorAll('img');
      if (!imgs || imgs.length === 0) return resolveImages();
      let remaining = imgs.length;
      imgs.forEach(img => {
        try { img.setAttribute('crossorigin', 'anonymous'); } catch (e) { /* ignore */ }
        if (img.complete) {
          remaining -= 1;
          if (remaining <= 0) resolveImages();
        } else {
          img.addEventListener('load', () => {
            remaining -= 1;
            if (remaining <= 0) resolveImages();
          });
          img.addEventListener('error', () => {
            remaining -= 1;
            if (remaining <= 0) resolveImages();
          });
        }
      });
    });
    // fonts
    if (iframe.contentDocument?.fonts && typeof iframe.contentDocument.fonts.ready?.then === 'function') {
      await iframe.contentDocument.fonts.ready.catch(() => {});
    }
    await new Promise(r => setTimeout(r, 250));
    await new Promise((resolve) => {
      try {
        import('html2pdf.js').then(mod => {
          const html2pdf = mod.default || mod;
          html2pdf().set({ margin: 10, filename, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, logging: false }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).from(iframe.contentDocument.body).save().then(resolve).catch(resolve);
        }).catch(e => { console.warn('html2pdf import failed', e); resolve(); });
      } catch (e) {
        console.warn('html2pdf failed', e);
        resolve();
      }
    });
  } finally {
    setTimeout(() => { try { document.body.removeChild(iframe); } catch (e) { /* ignore */ } }, 600);
  }
}

export async function generateQrDataUrl(content) {
  try {
    // Use dynamic import to avoid a hard dependency at build-time and to allow graceful fallback
    const mod = await import('qrcode');
    const qrLib = mod?.default || mod;
    if (qrLib && typeof qrLib.toDataURL === 'function') {
      return await qrLib.toDataURL(content, { margin: 0, width: 170 });
    }
    console.warn('qrcode module does not expose toDataURL; skipping QR generation');
    return '';
  } catch (e) {
    console.warn('Failed to generate QR data url', e);
    return '';
  }
}

export function buildAppointmentBodyHtml(appt = {}) {
  const patient = appt.patient || appt.q01_nome || 'Cliente';
  const dateStr = appt.date ? new Date(appt.date).toLocaleDateString('pt-BR') : '-';
  const time = appt.time || '-';
  const type = appt.q14_tipo_consulta || '-';
  const notes = (appt.notes || '-').replace(/\n/g, '<br/>');
  const receiptNumber = appt.id || '';

  return `
    <div style="font-size:16px; font-weight:700; margin-bottom:8px; color:#1b5e20">Comprovante de Agendamento</div>
    <div class="divider"></div>
    <div class="info-row">
      <div class="info-col">
        <div class="info-label">Paciente</div>
        <div class="info-value">${patient}</div>
      </div>
      <div class="info-col">
        <div class="info-label">Data</div>
        <div class="info-value">${dateStr}</div>
      </div>
      <div class="info-col">
        <div class="info-label">Hora</div>
        <div class="info-value">${time}</div>
      </div>
    </div>
    <div style="margin-top:12px">
      <div class="info-label">Tipo de Atendimento</div>
      <div class="info-value">${type}</div>
    </div>
    <div style="margin-top:12px">
      <div class="info-label">Observações</div>
      <div class="info-value">${notes}</div>
    </div>
    <div style="margin-top:10px">
      <div class="info-label">Número do Comprovante</div>
      <div class="info-value">${receiptNumber}</div>
    </div>
  `;
}

export function buildAnamneseBodyHtml(anamnese = {}) {
  const patient = anamnese.q01_nome || anamnese.nome || 'Paciente';
  const dateStr = anamnese.createdAt ? new Date(anamnese.createdAt).toLocaleDateString('pt-BR') : '-';
  
  // Função auxiliar para renderizar seção
  const renderSection = (title, fields) => {
    const hasContent = fields.some(f => f.value);
    if (!hasContent) return '';
    
    return `
      <div style="margin-top:24px; padding:16px; background:#f5f5f5; border-radius:8px;">
        <div style="font-size:14px; font-weight:700; color:#1976d2; margin-bottom:12px;">${title}</div>
        ${fields.map(f => f.value ? `
          <div style="margin-bottom:10px;">
            <div class="info-label">${f.label}</div>
            <div class="info-value">${String(f.value).replace(/\n/g, '<br/>')}</div>
          </div>
        ` : '').join('')}
      </div>
    `;
  };

  // Função para renderizar array como lista
  const renderArray = (arr) => {
    if (!arr || !Array.isArray(arr) || arr.length === 0) return '-';
    return '<ul style="margin:4px 0; padding-left:20px;">' + 
           arr.map(item => `<li>${item}</li>`).join('') + 
           '</ul>';
  };

  return `
    <div style="font-size:18px; font-weight:700; margin-bottom:16px; color:#1b5e20; border-bottom:2px solid #1b5e20; padding-bottom:8px;">
      ANAMNESE INTEGRATIVA COMPLETA
    </div>
    
    <!-- Identificação -->
    ${renderSection('📋 IDENTIFICAÇÃO', [
      { label: 'Nome Completo', value: anamnese.q01_nome },
      { label: 'Data de Nascimento', value: anamnese.q02_data_nasc },
      { label: 'Idade', value: anamnese.q03_idade },
      { label: 'Sexo', value: anamnese.q04_sexo },
      { label: 'Estado Civil', value: anamnese.q05_estado_civil },
      { label: 'Profissão', value: anamnese.q06_profissao },
      { label: 'Endereço', value: anamnese.q07_endereco },
      { label: 'Cidade', value: anamnese.q08_cidade },
      { label: 'Estado', value: anamnese.q09_estado },
      { label: 'CEP', value: anamnese.q10_cep },
      { label: 'Telefone', value: anamnese.q11_telefone },
      { label: 'E-mail', value: anamnese.q12_email },
      { label: 'RG', value: anamnese.q13_rg },
      { label: 'CPF', value: anamnese.q14_cpf },
      { label: 'Tipo de Consulta', value: anamnese.q14_tipo_consulta },
    ])}

    <!-- Queixa Principal -->
    ${renderSection('🏥 QUEIXA PRINCIPAL E SINTOMAS', [
      { label: 'Queixa Principal', value: anamnese.q15_queixa_principal },
      { label: 'Tempo do Problema', value: anamnese.q16_tempo_problema },
      { label: 'Tratamentos Anteriores', value: anamnese.q17_tratamentos_anteriores },
      { label: 'Sintomas Selecionados', value: renderArray(anamnese.q17a_sintomas_selecionados) },
      { label: 'Carências Identificadas', value: renderArray(anamnese.q17b_carencias_identificadas) },
    ])}

    <!-- Histórico Familiar -->
    ${renderSection('👨‍👩‍👧‍👦 HISTÓRICO FAMILIAR', [
      { label: 'Doenças na Família', value: anamnese.q18_doencas_familia },
      { label: 'Pais Vivos', value: anamnese.q19_pais_vivos },
      { label: 'Doenças dos Pais', value: anamnese.q20_doencas_pais },
    ])}

    <!-- Histórico Pessoal -->
    ${renderSection('📝 HISTÓRICO PESSOAL DE SAÚDE', [
      { label: 'Cirurgias', value: anamnese.q21_cirurgias },
      { label: 'Hospitalizações', value: anamnese.q22_hospitalizacoes },
      { label: 'Alergias', value: anamnese.q23_alergias },
      { label: 'Medicamentos em Uso', value: anamnese.q24_medicamentos_uso },
      { label: 'Doenças Crônicas', value: anamnese.q25_doencas_cronicas },
    ])}

    <!-- Hábitos de Vida -->
    ${renderSection('🌱 HÁBITOS DE VIDA', [
      { label: 'Tabagismo', value: anamnese.q26_tabagismo },
      { label: 'Etilismo', value: anamnese.q27_etilismo },
      { label: 'Atividade Física', value: anamnese.q28_atividade_fisica },
      { label: 'Qualidade do Sono', value: anamnese.q29_qualidade_sono },
      { label: 'Horas de Sono', value: anamnese.q29_horas_sono },
      { label: 'Alimentação', value: anamnese.q30_alimentacao },
      { label: 'Ingestão de Água', value: anamnese.q31_agua },
    ])}

    <!-- Sistema Digestivo -->
    ${renderSection('🍽️ SISTEMA DIGESTIVO', [
      { label: 'Apetite', value: anamnese.q32_apetite },
      { label: 'Digestão', value: anamnese.q33_digestao },
      { label: 'Evacuação', value: anamnese.q34_evacuacao },
      { label: 'Gases/Distensão', value: anamnese.q35_gases },
    ])}

    <!-- Sistema Urinário -->
    ${renderSection('💧 SISTEMA URINÁRIO', [
      { label: 'Frequência Urinária', value: anamnese.q36_frequencia_urinaria },
      { label: 'Cor da Urina', value: anamnese.q37_cor_urina },
      { label: 'Dor ao Urinar', value: anamnese.q38_dor_urinar },
    ])}

    <!-- Sistema Reprodutor (Mulheres) -->
    ${anamnese.q04_sexo === 'Feminino' ? renderSection('🌸 SISTEMA REPRODUTOR (MULHERES)', [
      { label: 'Ciclo Menstrual', value: anamnese.q39_ciclo_menstrual },
      { label: 'Data da Última Menstruação (DUM)', value: anamnese.q40_dum },
      { label: 'TPM', value: anamnese.q41_tpm },
      { label: 'Gestações', value: anamnese.q42_gestacoes },
      { label: 'Partos', value: anamnese.q43_partos },
      { label: 'Abortos', value: anamnese.q44_abortos },
      { label: 'Menopausa', value: anamnese.q45_menopausa },
    ]) : ''}

    <!-- Sinais Vitais -->
    ${renderSection('❤️ SINAIS VITAIS', [
      { label: 'Pressão Arterial', value: anamnese.q46_pressao_arterial },
      { label: 'Frequência Cardíaca', value: anamnese.q47_frequencia_cardiaca },
      { label: 'Temperatura', value: anamnese.q48_temperatura },
      { label: 'Peso', value: anamnese.q49_peso },
      { label: 'Altura', value: anamnese.q50_altura },
      { label: 'IMC', value: anamnese.q51_imc },
    ])}

    <!-- Aspectos Emocionais -->
    ${renderSection('🧠 ASPECTOS EMOCIONAIS E MENTAIS', [
      { label: 'Estado Emocional', value: anamnese.q52_estado_emocional },
      { label: 'Ansiedade', value: anamnese.q53_ansiedade },
      { label: 'Depressão', value: anamnese.q54_depressao },
      { label: 'Estresse', value: anamnese.q55_estresse },
      { label: 'Memória/Concentração', value: anamnese.q56_memoria },
    ])}

    <!-- Análise Iridológica -->
    ${renderSection('👁️ ANÁLISE IRIDOLÓGICA', [
      { label: 'Análise do Olho Direito', value: anamnese.iridologia_od_analise },
      { label: 'Análise do Olho Esquerdo', value: anamnese.iridologia_oe_analise },
      { label: 'Achados Principais', value: anamnese.iridologia_achados },
    ])}

    <!-- Sinais Clínicos -->
    ${renderSection('🔍 SINAIS CLÍNICOS', [
      { label: 'Língua', value: anamnese.lingua_observacao },
      { label: 'Unhas', value: anamnese.unhas_observacao },
      { label: 'Pele', value: anamnese.pele_observacao },
      { label: 'Cabelos', value: anamnese.cabelos_observacao },
    ])}

    <!-- Biorressonância -->
    ${renderSection('⚡ RESULTADOS DE BIORRESSONÂNCIA', [
      { label: 'Biorressonância I (SISTÊMICA)', value: anamnese.biorresonanciaSystemAnalysis },
      { label: 'Biorressonância II (AURICULAR)', value: anamnese.biorresonanciaAuricularAnalysis },
    ])}

    <!-- Observações Gerais -->
    ${renderSection('📌 OBSERVAÇÕES E CONDUTA', [
      { label: 'Observações Gerais', value: anamnese.q57_observacoes },
      { label: 'Diagnóstico/Impressão Clínica', value: anamnese.q58_diagnostico },
      { label: 'Conduta Terapêutica', value: anamnese.q59_conduta },
      { label: 'Prescrição', value: anamnese.q60_prescricao },
    ])}

    <!-- Tratamentos Avançados Selecionados -->
    ${(anamnese.tratamentosHomeopatia?.length > 0 || anamnese.tratamentosAromaterapia?.length > 0 || anamnese.tratamentosOleosEssenciais?.length > 0) ? `
      <div style="margin-top:24px; padding:16px; background:#e8f5e9; border-radius:8px; border:2px solid #4caf50;">
        <div style="font-size:16px; font-weight:700; color:#2e7d32; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
          🌿 PROTOCOLOS TERAPÊUTICOS AVANÇADOS SELECIONADOS
        </div>
        
        ${anamnese.tratamentosHomeopatia?.length > 0 ? `
          <div style="margin-bottom:16px;">
            <div style="font-size:14px; font-weight:700; color:#1976d2; margin-bottom:8px;">💊 HOMEOPATIA</div>
            ${anamnese.tratamentosHomeopatia.map(item => `
              <div style="margin-bottom:12px; padding:12px; background:white; border-left:4px solid #2196f3; border-radius:4px;">
                <div style="font-weight:700; color:#1565c0; margin-bottom:6px;">
                  ${item.condition || 'Condição'}
                </div>
                ${item.result?.remedies ? `
                  <div style="margin-top:8px;">
                    ${item.result.remedies.map(remedy => `
                      <div style="margin-bottom:8px; padding:8px; background:#f5f5f5; border-radius:4px;">
                        <div style="font-weight:600; color:#333;">${remedy.name}</div>
                        ${remedy.potency ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Potência:</strong> ${remedy.potency}</div>` : ''}
                        ${remedy.indications ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Indicações:</strong> ${remedy.indications}</div>` : ''}
                        ${remedy.dosage ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Posologia:</strong> ${remedy.dosage}</div>` : ''}
                        ${remedy.duration ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Duração:</strong> ${remedy.duration}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${anamnese.tratamentosAromaterapia?.length > 0 ? `
          <div style="margin-bottom:16px;">
            <div style="font-size:14px; font-weight:700; color:#7b1fa2; margin-bottom:8px;">🌸 AROMATERAPIA</div>
            ${anamnese.tratamentosAromaterapia.map(item => `
              <div style="margin-bottom:12px; padding:12px; background:white; border-left:4px solid #9c27b0; border-radius:4px;">
                <div style="font-weight:700; color:#7b1fa2; margin-bottom:6px;">
                  ${item.condition || 'Condição'}
                </div>
                ${item.result?.oils ? `
                  <div style="margin-top:8px;">
                    ${item.result.oils.map(oil => `
                      <div style="margin-bottom:8px; padding:8px; background:#f5f5f5; border-radius:4px;">
                        <div style="font-weight:600; color:#333;">${oil.name}</div>
                        ${oil.properties ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Propriedades:</strong> ${oil.properties}</div>` : ''}
                        ${oil.application ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Aplicação:</strong> ${oil.application}</div>` : ''}
                        ${oil.dilution ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Diluição:</strong> ${oil.dilution}</div>` : ''}
                        ${oil.duration ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Duração:</strong> ${oil.duration}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${anamnese.tratamentosOleosEssenciais?.length > 0 ? `
          <div style="margin-bottom:16px;">
            <div style="font-size:14px; font-weight:700; color:#2e7d32; margin-bottom:8px;">🌿 ÓLEOS ESSENCIAIS</div>
            ${anamnese.tratamentosOleosEssenciais.map(item => `
              <div style="margin-bottom:12px; padding:12px; background:white; border-left:4px solid #4caf50; border-radius:4px;">
                <div style="font-weight:700; color:#2e7d32; margin-bottom:6px;">
                  ${item.condition || 'Condição'}
                </div>
                ${item.result?.oils ? `
                  <div style="margin-top:8px;">
                    ${item.result.oils.map(oil => `
                      <div style="margin-bottom:8px; padding:8px; background:#f5f5f5; border-radius:4px;">
                        <div style="font-weight:600; color:#333;">${oil.name}</div>
                        ${oil.properties ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Propriedades:</strong> ${oil.properties}</div>` : ''}
                        ${oil.indications ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Indicações:</strong> ${oil.indications}</div>` : ''}
                        ${oil.usage ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Modo de Uso:</strong> ${oil.usage}</div>` : ''}
                        ${oil.dosage ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Dosagem:</strong> ${oil.dosage}</div>` : ''}
                        ${oil.duration ? `<div style="font-size:12px; color:#666; margin-top:2px;"><strong>Duração:</strong> ${oil.duration}</div>` : ''}
                        ${oil.contraindications ? `<div style="font-size:12px; color:#d32f2f; margin-top:2px;"><strong>⚠️ Contraindicações:</strong> ${oil.contraindications}</div>` : ''}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    ` : ''}

    <div style="margin-top:24px; padding:12px; background:#e8f5e9; border-left:4px solid #4caf50; font-size:12px; color:#2e7d32;">
      <strong>📅 Data de Registro:</strong> ${dateStr}<br/>
      <strong>🆔 ID da Anamnese:</strong> ${anamnese.id || '-'}<br/>
      <em>Documento gerado automaticamente pelo Sistema de Anamnese Integrativa</em>
    </div>
  `;
}

export default {
  buildLetterheadHtml,
  openPrintWindow,
  downloadPdfFromHtml,
  buildAppointmentBodyHtml,
};
