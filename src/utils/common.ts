import Papa from 'papaparse';
import { CSVData } from '../types/data';

export const loadCSV = async (filePath: string): Promise<CSVData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (results) => {
        resolve({
          data: results.data,
          headers: results.meta.fields || [],
        });
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
