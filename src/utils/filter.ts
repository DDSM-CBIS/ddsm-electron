import { PatientsDetails } from 'types/patient';

function isPatientInFilter(patientDetails: any, filters: any): boolean {
  if (Object.keys(filters).length === 0) return true;

  for (let key in filters) {
    const filterValues = filters[key];
    if (filterValues.includes(patientDetails[key])) {
      return true;
    }
  }
  return false;
}

export function filterPatients(patientsDetails: PatientsDetails, filters: any) {
  const { filterOptions, abnormalityFilter, patientIds } = filters;
  let filteredPatients: string[] = [];

  if (patientIds.length > 0) {
    filteredPatients = Object.keys(patientsDetails).filter((patientId) => patientIds.includes(patientId));
    return filteredPatients;
  }

  filteredPatients = Object.keys(patientsDetails).filter((patientId) => {
    const patientDetails = patientsDetails[patientId];
    for (let row in patientDetails) {
      if (
        isPatientInFilter(patientDetails[row], filterOptions) ||
        isPatientInFilter(patientDetails[row], abnormalityFilter)
      ) {
        return true;
      }
    }
    return false;
  });

  return filteredPatients;
}
