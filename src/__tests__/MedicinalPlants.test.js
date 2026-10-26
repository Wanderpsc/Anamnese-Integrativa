import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PhytotherapyProtocols from '../pages/PhytotherapyProtocols';

describe('PhytotherapyProtocols page (replacing MedicinalPlants)', () => {
  it('renders main protocols heading and search area', async () => {
    render(
      <MemoryRouter>
        <PhytotherapyProtocols />
      </MemoryRouter>
    );
    // The consolidated page includes a description about protocols
    const heading = await screen.findByText(/Protocolos terapêuticos com plantas medicinais/i);
    expect(heading).toBeInTheDocument();
    // Ensure the search input exists
    const searchInput = screen.getByPlaceholderText(/gastrite, alho, ansiedade/i);
    expect(searchInput).toBeInTheDocument();
  });
});
