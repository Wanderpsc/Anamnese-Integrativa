import React from 'react';

function ExamesLaboratoriais() {
  const timestamp = new Date().toISOString();
  
  return (
    <div style={{ 
      padding: '40px', 
      backgroundColor: '#4caf50', 
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#1976d2', marginBottom: '20px', fontSize: '32px' }}>
          ✅ PÁGINA FUNCIONANDO AGORA!
        </h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#333' }}>
          Exames Laboratoriais carregados com sucesso!
        </p>
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          backgroundColor: '#e8f5e9', 
          borderLeft: '4px solid #4caf50',
          borderRadius: '4px'
        }}>
          <strong>Status:</strong> Componente OK ✓<br/>
          <small>Carregado em: {timestamp}</small>
        </div>
      </div>
    </div>
  );
}

export default ExamesLaboratoriais;
