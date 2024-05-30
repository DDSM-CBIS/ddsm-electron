import { CalcCase, MassCase, MediaFilePath } from '../types/data';

export type Data = {
  calcCases: CalcCase[];
  massCases: MassCase[];
};

export function mapData(
  calcTrain: CalcCase[],
  calcTest: CalcCase[],
  massTrain: MassCase[],
  massTest: MassCase[]
): Data {
  return {
    calcCases: [...calcTrain, ...calcTest],
    massCases: [...massTrain, ...massTest],
  };
}

const mapCalcCase = (row: any): CalcCase => {
  return {
    breast_density: row.breast_density,
    left_or_right_breast: row.left_or_right_breast,
    image_view: row.image_view,
    abnormality_id: row.abnormality_id,
    abnormality_type: row.abnormality_type,
    calc_type: row.calc_type,
    calc_distribution: row.calc_distribution,
    assessment: row.assessment,
    pathology: row.pathology,
    subtlety: row.subtlety,
  };
};

const mapMassCase = (row: any): MassCase => {
  return {
    breast_density: row.breast_density,
    left_or_right_breast: row.left_or_right_breast,
    image_view: row.image_view,
    abnormality_id: row.abnormality_id,
    abnormality_type: row.abnormality_type,
    mass_shape: row.mass_shape,
    mass_margins: row.mass_margins,
    assessment: row.assessment,
    pathology: row.pathology,
    subtlety: row.subtlety,
  };
};

const mapMediaFilePath = (row: any): MediaFilePath => {
  return {
    left_or_right_breast: row.left_or_right_breast,
    image_view: row.image_view,
    image_file_path: row.image_file_path,
    cropped_image_file_path: row.cropped_image_file_path,
    roi_mask_file_path: row.roi_mask_file_path,
  };
};

export { mapCalcCase, mapMassCase, mapMediaFilePath };
