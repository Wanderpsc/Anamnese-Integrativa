import React from 'react';
import { render, screen } from '@testing-library/react';
import AssistantPrompt from '../components/AssistantPrompt';

describe('AssistantPrompt', () => {
  test('renders prompt for entry data and suggestions', () => {
    const entry = { nome: 'Maria', data_nasc: '1980-01-01', idade: 45, genero: 'Feminino', sintomas: ['azia', 'intestino_preso'] };
    const suggestions = ['Avaliação nutricional recomendada'];
    render(<AssistantPrompt entry={entry} suggestions={suggestions} />);

    const textarea = screen.getByLabelText('assistant-prompt');
    expect(textarea).toBeInTheDocument();
    expect(textarea.value).toMatch(/Paciente: Maria/);
    expect(textarea.value).toMatch(/Avaliação nutricional recomendada/);
  });
});
