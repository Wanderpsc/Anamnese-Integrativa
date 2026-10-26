import React from 'react';
import { render, screen } from '@testing-library/react';

import BloodTypeDiagnosis from '../components/BloodTypeDiagnosis';

test('shows guidance when no blood type provided', () => {
  render(<BloodTypeDiagnosis bloodType={''} />);
  expect(screen.getByLabelText('bloodtype-diagnosis-empty')).toBeInTheDocument();
  expect(screen.getByText(/Informe o tipo sanguíneo/i)).toBeInTheDocument();
});

test('renders a known blood type card for O+', () => {
  render(<BloodTypeDiagnosis bloodType={'O+'} />);
  expect(screen.getByLabelText('bloodtype-diagnosis-O+')).toBeInTheDocument();
  // ensure the explicit title for this blood type appears
  expect(screen.getByText(/Tipo O\+/i)).toBeInTheDocument();
  expect(screen.getByText(/tendência a metabolismo mais rápido/i) || screen.getByText(/demanda proteica/i)).toBeTruthy();
});
