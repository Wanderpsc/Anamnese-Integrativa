// Health utilities: BMI and Waist-to-Hip Ratio (WHR) calculations and risk categories

export function calculateBMI(heightCm, weightKg) {
  const h = Number(heightCm);
  const w = Number(weightKg);
  if (!h || !w) return null;
  const m = h / 100.0;
  const bmi = w / (m * m);
  const rounded = Math.round(bmi * 10) / 10; // one decimal

  const category = bmiCategory(rounded);
  return { bmi: rounded, category };
}

export function bmiCategory(bmi) {
  if (bmi == null || Number.isNaN(Number(bmi))) return '—';
  const n = Number(bmi);
  if (n < 18.5) return 'Baixo peso (<18.5)';
  if (n < 25) return 'Normal (18.5–24.9)';
  if (n < 30) return 'Sobrepeso (25–29.9)';
  if (n < 35) return 'Obesidade Grau I (30–34.9)';
  if (n < 40) return 'Obesidade Grau II (35–39.9)';
  return 'Obesidade Grau III (>=40)';
}

export function calculateWHR(waistCm, hipCm, gender = 'unknown') {
  const w = Number(waistCm);
  const h = Number(hipCm);
  if (!w || !h) return null;
  const ratio = Math.round((w / h) * 100) / 100;
  const risk = whrRiskCategory(ratio, gender);
  return { ratio, risk };
}

export function whrRiskCategory(ratio, gender = 'unknown') {
  // Use WHO thresholds: low / increased / substantially increased
  if (ratio == null || Number.isNaN(Number(ratio))) return '—';
  const r = Number(ratio);
  const g = String((gender || 'unknown')).toLowerCase();

  let thresh1 = 0.9; // increased
  let thresh2 = 1.0; // substantially increased
  if (g.includes('f') || g.includes('feminino') || g.includes('woman') || g.includes('female')) {
    thresh1 = 0.85; thresh2 = 0.90;
  }

  if (r <= thresh1) return 'Baixo risco';
  if (r <= thresh2) return 'Risco aumentado';
  return 'Risco substancialmente aumentado';
}

const health = { calculateBMI, bmiCategory, calculateWHR, whrRiskCategory };
export default health;

// UI helpers: choose color tones based on category/risk
export function bmiColor(category) {
  if (!category) return '#f5f5f5';
  if (category.includes('Baixo peso')) return '#d0ebff'; // light blue
  if (category.includes('Normal')) return '#e6f4ea'; // light green
  if (category.includes('Sobrepeso')) return '#fff4e0'; // light orange
  // check more specific (III, II) before I to avoid partial-match fallout ("II" contains "I")
  if (category.includes('Obesidade Grau III')) return '#ffb3b3'; // stronger red
  if (category.includes('Obesidade Grau II')) return '#ffd2d2'; // darker red
  if (category.includes('Obesidade Grau I')) return '#ffe6e6'; // light red
  return '#f5f5f5';
}

export function whrColor(risk) {
  if (!risk) return '#f5f5f5';
  if (risk.includes('Baixo risco')) return '#e6f4ea'; // green
  if (risk.includes('Risco aumentado')) return '#fff4e0'; // orange
  if (risk.includes('Risco substancialmente aumentado')) return '#ffe6e6'; // red
  return '#f5f5f5';
}

// Provide simple severity keys that UI can map to theme tokens
export function bmiSeverityFromCategory(category) {
  if (!category) return 'unknown';
  if (category.includes('Baixo peso')) return 'low';
  if (category.includes('Normal')) return 'normal';
  if (category.includes('Sobrepeso')) return 'overweight';
  if (category.includes('Obesidade Grau I')) return 'obesity1';
  if (category.includes('Obesidade Grau II')) return 'obesity2';
  if (category.includes('Obesidade Grau III')) return 'obesity3';
  return 'unknown';
}

export function whrSeverityFromRisk(risk) {
  if (!risk) return 'unknown';
  if (risk.includes('Baixo risco')) return 'low';
  if (risk.includes('Risco aumentado')) return 'increased';
  if (risk.includes('Risco substancialmente aumentado')) return 'substantial';
  return 'unknown';
}
