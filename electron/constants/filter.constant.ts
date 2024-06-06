// Dummy data
export const FILTERS = {
  leftOrRightBreast: {
    title: 'Breast Side',
    items: ['Right', 'Left'],
  },
  imageView: {
    title: 'View',
    items: ['MLO', 'CC'],
  },
  abnormalityType: {
    title: 'Abnormality',
    items: ['Mass', 'Calcification'],
  },
  breastDensity: {
    title: 'Breast Density',
    items: ['1', '2', '3', '4'],
  },
  subtlety: {
    title: 'Subtlety',
    items: ['1', '2', '3', '4', '5'],
  },
  assessment: {
    title: 'BIRADS Assessment',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  pathology: {
    title: 'Pathology',
    items: ['Benign', 'Malignant', 'Benign without callback'],
  },
  abnormalities: {
    title: '#Abnormalities',
    items: ['0', '1', '2', '3', '4', '5'],
  },
};

export const ABNORMALITY_PARAMS = {
  calcType: {
    title: 'Classification Type',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  calcDistribution: {
    title: 'Classification Distribution',
    items: ['0', '1', '2', '3', '4', '5'],
  },
  massShape: {
    title: 'Mass Shape',
    items: ['IRREGULAR', 'ROUND', 'LOBULATED', 'OVAL', 'IRREGULAR-ARCHITECTURAL_DISTORTION'],
  },
  massMargins: {
    title: 'Mass Margins',
    items: ['SPICULATED', 'CIRCUMSCRIBED', 'ILL_DEFINED', 'OBSCURED'],
  },
};
