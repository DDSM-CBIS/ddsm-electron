export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const FilterMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

export const FiltersMenuHeaders = {
  leftOrRightBreast: 'Breast Side',
  imageView: 'View',
  abnormalityType: 'Abnormality',
  breastDensity: 'Breast Density',
  subtlety: 'Subtlety',
  assessment: 'BIRADS Assessment',
  pathology: 'Pathology',
  abnormalityId: '#Abnormality',
};

export const AbnormalityFilterMenuHeaders = {
  calcType: 'Classification Type',
  calcDistribution: 'Classification Distribution',
  massShape: 'Mass Shape',
  massMargins: 'Mass Margins',
};

export interface FilterObject {
  leftOrRightBreast: string[];
  imageView: string[];
  abnormalityId: string[];
  abnormalityType: string[];
  breastDensity: string[];
  subtlety: string[];
  assessment: string[];
  pathology: string[];
}

export interface AbnormalityFilterObject {
  calcType: string[];
  calcDistribution: string[];
  massShape: string[];
  massMargins: string[];
}

export interface PatientFilterObject {
  patientsIds: string[];
}
