import { CalcCases, MassCases, MediaFilePaths } from '../types/data';
import { Patients } from '../types/patient';
import { loadCSV } from './common';
import { mapCalcCase, mapMassCase, mapMediaFilePath } from './mapData';

export type DataTable = {
  patients: Patients;
  calcCases: CalcCases;
  massCases: MassCases;
  mediaFilePaths: MediaFilePaths;
};

export async function getFilesData() {
  const calcTrain = await loadCSV('path/to/calc_train.csv');
  const calcTest = await loadCSV('path/to/calc_test.csv');
  const massTrain = await loadCSV('path/to/mass_train.csv');
  const massTest = await loadCSV('path/to/mass_test.csv');

  const allCalcData = [...calcTrain.data, ...calcTest.data];
  const allMassData = [...massTrain.data, ...massTest.data];
  return { allCalcData, allMassData };
}

export async function getTableData() {
  const { allCalcData, allMassData } = await getFilesData();
  const patients: Patients = [];
  const calcCases: CalcCases = {};
  const massCases: MassCases = {};
  const mediaFilePaths: MediaFilePaths = {};

  allCalcData.forEach((row) => {
    const calc = mapCalcCase(row);
    const media = mapMediaFilePath(row);
    calcCases[row.patient_id] = calc;
    mediaFilePaths[row.patient_id] = media;
    patients.push(row.patient_id);
  });

  allMassData.forEach((row) => {
    const mass = mapMassCase(row);
    const media = mapMediaFilePath(row);
    massCases[row.patient_id] = mass;
    mediaFilePaths[row.patient_id] = media;
    patients.push(row.patient_id);
  });

  return { patients, calcCases, massCases, mediaFilePaths };
}
