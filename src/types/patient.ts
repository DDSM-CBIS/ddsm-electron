export type PatientId = string;
export type Patients = PatientId[];

export type PatientsDetails = Record<string, [{ [key: string]: string | number }]>;
