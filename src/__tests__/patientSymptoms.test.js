import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientSymptoms from '../pages/PatientSymptoms';

describe('PatientSymptoms page', () => {
  beforeEach(() => {
    // Clear any existing localStorage anamneses
    localStorage.removeItem('anamneses');
  });

  it('renders and shows hospitalizations, alimentation, exercise frequency, and other fields', async () => {
    const sample = {
      id: 't1',
      q01_nome: 'Test User',
      q15_queixa_principal: 'Dor na cabeça',
      q22_hospitalizacoes: 'Hospital X - 2019',
      q29_frequencia_exercicio: '3x por semana',
      q30_cafe_manha: 'Pão e Café',
      q31_almoco: 'Arroz e Feijão',
      q32_jantar: 'Frango e Salada',
      q33_lanches: 'Frutas',
      q34_agua_dia: '6 copos',
      q46_dores: 'Cefaleia diária',
      q47_cansaco: 'Muito cansaço',
      q48_estresse: 'Alto',
      q49_ansiedade: 'Muita ansiedade',
      q50_observacoes: 'Paciente relatou melhora com descanso',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('anamneses', JSON.stringify([sample]));

    render(
      <MemoryRouter>
        <PatientSymptoms />
      </MemoryRouter>
    );

    // Check some fields appear on screen (labels can appear more than once: chip + list item)
    expect((await screen.findAllByText('Hospitalizações')).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText('Café da Manhã')).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText('Frequência Exercício')).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText('Dores')).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText('Ansiedade')).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText('Observações')).length).toBeGreaterThanOrEqual(1);

    // Check consolidated download buttons exist (PDF and CSV; can appear more than once)
    expect(screen.getAllByText(/Download Consolidado \(PDF\)/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Download Consolidado \(CSV\)/i).length).toBeGreaterThanOrEqual(1);

    // Check consolidated summary header exists
    expect(screen.getAllByText(/Resumo Consolidado de Sintomas/i).length).toBeGreaterThanOrEqual(1);
  });
});
