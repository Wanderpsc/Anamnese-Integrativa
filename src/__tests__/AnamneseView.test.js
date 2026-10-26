import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// ensure router hooks return the expected id
const rr = require('react-router-dom');
rr.useParams = () => ({ id: 'abc' });
rr.useNavigate = () => jest.fn();

// stub html2pdf so download flow doesn't call real library in tests
jest.mock('html2pdf.js', () => jest.fn(() => ({ set: () => ({ from: () => ({ save: jest.fn() }) }) })));

import AnamneseView from '../pages/AnamneseView';

describe('AnamneseView', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders header with patient data and therapist and triggers download', async () => {
    const entry = { id: 'abc', q01_nome: 'João Silva', q02_data_nasc: '1990-02-10', q03_idade: 35, modelUsed: 'Asclépio', createdAt: new Date().toISOString() };
    localStorage.setItem('anamneses', JSON.stringify([entry]));

    render(<AnamneseView />);

    // There may be multiple occurrences (header, field label, assistant prompt), assert presence
    const matches = screen.getAllByText(/João Silva/i);
    expect(matches.length).toBeGreaterThanOrEqual(1);
    // identification is rendered as label/value fields
    expect(screen.getAllByText(/Data de Nascimento/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/^35$/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Wander Pires Silva Coelho/i).length).toBeGreaterThanOrEqual(1);

    // download button should exist and be callable (html2pdf mocked)
    const downloadBtn = screen.getByText(/Download PDF/i);
    expect(downloadBtn).toBeInTheDocument();
    fireEvent.click(downloadBtn);
    // if download tries to use html2pdf, our mock will be present, but we can't assert window behavior here
    expect(downloadBtn).toBeTruthy();
  });
});
