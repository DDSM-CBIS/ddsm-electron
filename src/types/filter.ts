export type FilterMenu = {
  key: string;
  title: string;
  items: string[];
  value: string[];
  onChange: (event) => void;
};

export type FilterObject = {
  leftOrRightBreast: string[];
  imageView: string[];
  abnormalityType: string[];
  breastDensity: string[];
  subtlety: string[];
  assessment: string[];
  pathology: string[];
  abnormalityId: string[];
};

export type AbnormalityFilterObject = {
  calcType: string[];
  calcDistribution: string[];
  massShape: string[];
  massMargins: string[];
};

export type PatientFilterObject = string[];

export type FiltersProps = {
  filterOptions: FilterObject;
  abnormalityFilterOptions: AbnormalityFilterObject;
  patients: PatientFilterObject;
  setFilterOptions: (filterOptions: FilterObject) => void;
  setAbnormalityFilterOptions: (abnormalityFilterOptions: AbnormalityFilterObject) => void;
  setPatients: (patients: PatientFilterObject) => void;
};

export type FilterMenuProps = {
  variant: any;
  sx: any;
  title: string;
  headers: any;
  options: any;
  values: any;
  onChange: (value: string[]) => void;
};
