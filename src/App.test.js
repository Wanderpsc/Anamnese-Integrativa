import { render, screen } from '@testing-library/react';
// Prevent html2pdf/jspdf from being imported during test evaluation
jest.mock('html2pdf.js', () => ({ __esModule: true, default: jest.fn() }));

import App from './App';
import { AiModelProvider } from './context/AiModelContext';

test('renders app header', () => {
  render(
    <AiModelProvider>
      <App />
    </AiModelProvider>
  );

  // With authentication enabled and no logged user, the login screen is shown first;
  // both the login screen and the app shell expose an "Anamnese Integrativa" heading.
  const headers = screen.getAllByRole('heading', { name: /Anamnese Integrativa/i });
  expect(headers.length).toBeGreaterThanOrEqual(1);
});
