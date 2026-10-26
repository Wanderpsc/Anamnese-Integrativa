export function calculateAgeFromBirthDate(birthDate) {
  if (!birthDate) return '';

  const today = new Date();
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return '';

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age >= 0 ? age : '';
}

export function getPatientAge(patient) {
  if (!patient || typeof patient !== 'object') return '';

  if (patient.q03_idade !== undefined && patient.q03_idade !== null && patient.q03_idade !== '') {
    return patient.q03_idade;
  }

  if (patient.q02_idade !== undefined && patient.q02_idade !== null && patient.q02_idade !== '') {
    return patient.q02_idade;
  }

  return calculateAgeFromBirthDate(patient.q02_data_nasc || patient.data_nasc || patient.q02_data_nascimento || '');
}
