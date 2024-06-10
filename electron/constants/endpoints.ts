export const GET_FILTER_OPTIONS = 'filter/options';
export const GET_ABNORMALITY_FILTER_OPTIONS = 'filter/abnormality-options';
export const GET_PATIENTS = 'patients/';
export const GET_PATIENT_DETAILS = (patientId: string) => `patients/${patientId}`;
export const GET_PATIENT_IDS = 'filter/patients-ids';
export const GET_IMAGES_DETAILS = (patientId: string) => `images/${patientId}/details`;
export const GET_IMAGE = (patientId: string, filename: string) => `images/${patientId}/${filename}`;
