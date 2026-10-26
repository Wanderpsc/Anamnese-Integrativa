import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientExams from '../pages/PatientExams';

describe('PatientExams page', () => {
  beforeEach(() => {
    localStorage.removeItem('anamneses');
    localStorage.removeItem('bloodTests');
  });

  it('renders consolidated sections and export buttons for a patient with exams', async () => {
    const anamnese = {
      id: 'a1',
      q01_nome: 'Paciente Teste',
      createdAt: new Date().toISOString(),
      iridologyAnalysis: {
        date: new Date().toISOString(),
        generalFindings: 'Teste iridologia: manchas e congestão',
        organSystems: { digestive: 'alterado' }
      },
      biorresonanciaBarraAnalysis: 'Resultado Biorressonância Barra: OK',
      biorresonanciaBarraFile: { name: 'barra-result.pdf', uploadDate: new Date().toISOString() }
    };

    const bloodTest = {
      id: 'b1',
      patientName: 'Paciente Teste',
      testDate: new Date().toISOString(),
      laboratory: 'Laboratório ABC',
      hemoglobin: '13.5',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem('anamneses', JSON.stringify([anamnese]));
    localStorage.setItem('bloodTests', JSON.stringify([bloodTest]));

    render(
      <MemoryRouter>
        <PatientExams />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Resumo Consolidado de Exames/i)).toBeInTheDocument();
    expect((await screen.findAllByText(/Iridologia/i)).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText(/Biorressonância/i)).length).toBeGreaterThanOrEqual(1);
    expect((await screen.findAllByText(/Exames de Sangue/i)).length).toBeGreaterThanOrEqual(1);

    // Exports
    expect(screen.getByText(/Download Consolidado \(PDF\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Download Consolidado \(CSV\)/i)).toBeInTheDocument();
  });

  it('shows patient from bloodtests even if no anamneses exist', async () => {
    const bloodTest = {
      id: 'b2',
      patientName: 'Somente Sanguinho',
      testDate: new Date().toISOString(),
      laboratory: 'Laboratório XYZ',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('anamneses', JSON.stringify([]));
    localStorage.setItem('bloodTests', JSON.stringify([bloodTest]));

    render(
      <MemoryRouter>
        <PatientExams />
      </MemoryRouter>
    );
    // The patient should appear in the select dropdown, so look for the patient name somewhere on the page
    // (The select renders the selected patient name inside the component when selected by default.)
    expect(await screen.findByText('Somente Sanguinho')).toBeInTheDocument();
  });
});
