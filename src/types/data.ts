import { PatientId } from './patient';

export type CalcCase = {
  breast_density: string;
  left_or_right_breast: string;
  image_view: string;
  abnormality_id: string;
  abnormality_type: string;
  calc_type: string;
  calc_distribution: string;
  assessment: string;
  pathology: string;
  subtlety: string;
};

export type CalcCases = {
  [key: PatientId]: CalcCase;
};

export type MassCase = {
  breast_density: string;
  left_or_right_breast: string;
  image_view: string;
  abnormality_id: string;
  abnormality_type: string;
  mass_shape: string;
  mass_margins: string;
  assessment: string;
  pathology: string;
  subtlety: string;
};

export type MassCases = {
  [key: PatientId]: MassCase;
};

export type MediaFilePath = {
  left_or_right_breast: string;
  image_view: string;
  image_file_path: string;
  cropped_image_file_path: string;
  roi_mask_file_path: string;
};

export type MediaFilePaths = {
  [key: PatientId]: MediaFilePath;
};

export interface CSVData {
  data: any[];
  headers: string[];
}
