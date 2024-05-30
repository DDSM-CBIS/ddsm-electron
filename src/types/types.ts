export enum FiltersMenuHeaders {
  left_or_right_breast = 'Breast Side',
  image_view = 'View',
  abnormality_type = 'Abnormality',
  breast_density = 'Breast Density',
  subtlety = 'Subtlety',
  assessment = 'BIRADS Assessment',
  pathology = 'Pathology',
  abnormality_id = '#Abnormality',
}

export enum AbnormalityFilterMenuHeaders {
  calc_type = 'Classification Type',
  calc_distribution = 'Classification Distribution',
  mass_shape = 'Mass Shape',
  mass_margins = 'Mass Margins',
}

export type FilterMenu = {
  title: FiltersMenuHeaders | AbnormalityFilterMenuHeaders;
  items: string[];
  value: string[] | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export type FilterMenuProps = {
  filterMenus: FilterMenu[];
};
