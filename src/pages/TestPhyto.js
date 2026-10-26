import React from 'react';
import { getAllSymptoms, convertSpreadsheetToProtocol } from '../data/phytotherapySpreadsheetData';
import { EXPANDED_PHYTOTHERAPY_DATABASE } from '../data/expandedPhytotherapyDatabase';
import MEDICINAL_PLANTS from '../data/medicinalPlants';

function TestPhyto() {
  console.log('=== TESTE DE IMPORTAÇÕES ===');
  
  try {
    console.log('1. EXPANDED_PHYTOTHERAPY_DATABASE:', 
      EXPANDED_PHYTOTHERAPY_DATABASE ? 'OK' : 'FALHOU',
      'Protocolos:', Object.keys(EXPANDED_PHYTOTHERAPY_DATABASE || {}).length
    );
  } catch (e) {
    console.error('Erro ao acessar EXPANDED_PHYTOTHERAPY_DATABASE:', e.message);
  }

  try {
    console.log('2. MEDICINAL_PLANTS:', 
      MEDICINAL_PLANTS ? 'OK' : 'FALHOU',
      'Plantas:', Object.keys(MEDICINAL_PLANTS || {}).length
    );
  } catch (e) {
    console.error('Erro ao acessar MEDICINAL_PLANTS:', e.message);
  }

  try {
    const symptoms = getAllSymptoms();
    console.log('3. getAllSymptoms():', 
      symptoms ? 'OK' : 'FALHOU',
      'Sintomas:', symptoms?.length || 0
    );
    console.log('Primeiros sintomas:', symptoms?.slice(0, 5) || []);
  } catch (e) {
    console.error('Erro ao chamar getAllSymptoms():', e.message);
  }

  try {
    const protocol = convertSpreadsheetToProtocol('Abaixa A Pressão');
    console.log('4. convertSpreadsheetToProtocol():', 
      protocol ? 'OK' : 'FALHOU',
      'Protocolo criado:', !!protocol
    );
    if (protocol) {
      console.log('Nome:', protocol.name);
      console.log('Plantas:', protocol.protocol?.length || 0);
    }
  } catch (e) {
    console.error('Erro ao chamar convertSpreadsheetToProtocol():', e.message);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Teste de Importações - Fitoterapia</h1>
      <p>Abra o console (F12) para ver os resultados dos testes.</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Status dos Testes:</h3>
        <p>✓ Se todos os testes passarem, as importações estão funcionando</p>
        <p>✗ Se houver erros, verifique o console para detalhes</p>
      </div>
    </div>
  );
}

export default TestPhyto;
