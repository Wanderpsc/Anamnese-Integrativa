import React, { useState, useEffect } from 'react';
import anamnesisData from './anamnesis_complete_data.json';

/**
 * Componente principal de Anamnese Integrativa
 * Utiliza os dados extraídos dos arquivos DOCX
 */
const AnamnesisInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState('geral');
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  // Filtra perguntas pela categoria selecionada
  const categoryQuestions = anamnesisData.questions.filter(
    q => q.category === selectedCategory
  );

  // Paginação
  const totalPages = Math.ceil(categoryQuestions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = categoryQuestions.slice(startIndex, endIndex);

  // Manipula respostas
  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  // Calcula progresso
  const progress = Object.keys(answers).length;
  const total = anamnesisData.questions.length;
  const progressPercentage = (progress / total) * 100;

  return (
    <div className="anamnesis-container">
      {/* Header */}
      <header className="anamnesis-header">
        <h1>🏥 Anamnese Integrativa</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
          <span className="progress-text">
            {progress} / {total} perguntas respondidas ({progressPercentage.toFixed(1)}%)
          </span>
        </div>
      </header>

      {/* Navegação por categorias */}
      <nav className="category-nav">
        <h2>Categorias</h2>
        <div className="category-grid">
          {anamnesisData.categories.map(category => {
            const count = anamnesisData.questions.filter(
              q => q.category === category
            ).length;
            const answered = Object.keys(answers).filter(
              id => anamnesisData.questions.find(q => q.id === id)?.category === category
            ).length;
            
            return (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(0);
                }}
              >
                <span className="category-name">
                  {anamnesisData.categoriesDescription[category]}
                </span>
                <span className="category-count">
                  {answered}/{count}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Perguntas */}
      <main className="questions-section">
        <div className="category-header">
          <h2>{anamnesisData.categoriesDescription[selectedCategory]}</h2>
          <p>{categoryQuestions.length} perguntas nesta categoria</p>
        </div>

        <div className="questions-list">
          {currentQuestions.map((question, index) => (
            <div key={question.id} className="question-card">
              <div className="question-number">
                Pergunta {startIndex + index + 1} de {categoryQuestions.length}
              </div>
              <p className="question-text">{question.text}</p>
              
              <div className="answer-options">
                <button
                  className={`answer-btn ${answers[question.id] === true ? 'selected yes' : ''}`}
                  onClick={() => handleAnswer(question.id, true)}
                >
                  ✓ Sim
                </button>
                <button
                  className={`answer-btn ${answers[question.id] === false ? 'selected no' : ''}`}
                  onClick={() => handleAnswer(question.id, false)}
                >
                  ✗ Não
                </button>
                <button
                  className={`answer-btn ${answers[question.id] === 'na' ? 'selected neutral' : ''}`}
                  onClick={() => handleAnswer(question.id, 'na')}
                >
                  ⊘ Não se aplica
                </button>
              </div>

              {question.relatedConditions.length > 0 && (
                <div className="related-conditions">
                  <strong>Condições relacionadas:</strong>
                  <ul>
                    {question.relatedConditions.map((condition, idx) => (
                      <li key={idx}>{condition}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Paginação */}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
          >
            ← Anterior
          </button>
          <span className="page-info">
            Página {currentPage + 1} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
          >
            Próxima →
          </button>
        </div>
      </main>

      {/* Sidebar com estatísticas */}
      <aside className="stats-sidebar">
        <h3>📊 Estatísticas</h3>
        <div className="stat-item">
          <strong>Total de perguntas:</strong>
          <span>{anamnesisData.metadata.totalQuestions}</span>
        </div>
        <div className="stat-item">
          <strong>Categorias:</strong>
          <span>{anamnesisData.metadata.totalCategories}</span>
        </div>
        <div className="stat-item">
          <strong>Protocolos:</strong>
          <span>{anamnesisData.metadata.totalProtocols}</span>
        </div>
        <div className="stat-item">
          <strong>Progresso:</strong>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>

        <button 
          className="save-btn"
          onClick={() => {
            console.log('Salvando respostas:', answers);
            // Aqui você implementaria o salvamento no backend
          }}
        >
          💾 Salvar Progresso
        </button>

        <button 
          className="report-btn"
          onClick={() => {
            console.log('Gerando relatório...');
            // Aqui você implementaria a geração do relatório
          }}
        >
          📄 Gerar Relatório
        </button>
      </aside>
    </div>
  );
};

export default AnamnesisInterface;
