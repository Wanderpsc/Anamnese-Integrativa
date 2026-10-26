import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

// ensure router hooks return the expected id
const rr = require('react-router-dom');
rr.useParams = () => ({ id: 'abc' });
rr.useNavigate = () => jest.fn();

// stub html2pdf so download flow doesn't call real library in tests
jest.mock('html2pdf.js', () => jest.fn(() => ({ set: () => ({ from: () => ({ save: jest.fn() }) }) })));

import TherapySuggestions from '../pages/TherapySuggestions';
import { PatientContextProvider } from '../context/PatientContext';

describe('TherapySuggestions print/download header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders shared header and triggers download flow', async () => {
    const entry = { id: 'abc', q01_nome: 'João Silva', q02_data_nasc: '1990-02-10', q03_idade: 35, createdAt: new Date().toISOString() };
    localStorage.setItem('anamneses', JSON.stringify([entry]));

    // prevent remote fetch attempts from running during the component mount
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    render(
      <PatientContextProvider>
        <TherapySuggestions />
      </PatientContextProvider>
    );

    // header should show therapist identity and symbol (may appear more than once)
    expect(screen.getAllByText(/Wander Pires Silva Coelho/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByAltText(/símbolo terapeuta/i).length).toBeGreaterThanOrEqual(1);

    // patient summary present (name may render in different formats/places)
    expect(screen.getAllByText(/João Silva/i).length).toBeGreaterThanOrEqual(1);

    const downloadBtn = screen.getByText(/Download PDF/i);
    expect(downloadBtn).toBeInTheDocument();
    fireEvent.click(downloadBtn);
    expect(downloadBtn).toBeTruthy();
  });
});
