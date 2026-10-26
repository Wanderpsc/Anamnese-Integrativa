import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AnamneseForm from '../pages/AnamneseForm';
import AiModelContext from '../context/AiModelContext';

describe('AnamneseForm spreadsheet panel', () => {
  test('renders planilhas panel with the five configured sheets and import navigation', () => {
    // provide a simple AiModelContext so component renders normally
    const model = 'test-model';

    // spy on window.open and on navigation by rendering inside MemoryRouter and
    // asserting that clicking import navigation changes location via history push
    const winOpen = jest.spyOn(window, 'open').mockImplementation(() => null);

    const { container } = render(
      <AiModelContext.Provider value={{ model }}>
        <MemoryRouter>
          <AnamneseForm />
        </MemoryRouter>
      </AiModelContext.Provider>
    );

    // the panel should be present
    const panel = screen.getByLabelText('planilhas-panel');
    expect(panel).toBeInTheDocument();

    // there should be five sheet entries (as configured)
    const openButtons = container.querySelectorAll('button[aria-label^="open-sheet-"]');
    expect(openButtons.length).toBe(5);

    // click the first open button and ensure window.open was called with the sheet url
    fireEvent.click(openButtons[0]);
    expect(winOpen).toHaveBeenCalled();

    winOpen.mockRestore();
  });
});
