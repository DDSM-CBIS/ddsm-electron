import { CalcCases, MassCases } from '../types/data';
import { AbnormalityFilterMenuHeaders, FiltersMenuHeaders } from '../types/types';

export type FilterOptions = {
  [key in FiltersMenuHeaders]: Set<string>;
};

export type AbnormalityFilterOptions = {
  [key in AbnormalityFilterMenuHeaders]: Set<string>;
};

export type AllFilterOptions = {
  filterOptions: FilterOptions;
  abnormalityFilterOptions: AbnormalityFilterOptions;
};

export function useFilter(calcCases: CalcCases, massCases: MassCases): AllFilterOptions {
  const filterOptions: FilterOptions = {
    [FiltersMenuHeaders.left_or_right_breast]: new Set(),
    [FiltersMenuHeaders.image_view]: new Set(),
    [FiltersMenuHeaders.abnormality_type]: new Set(),
    [FiltersMenuHeaders.breast_density]: new Set(),
    [FiltersMenuHeaders.subtlety]: new Set(),
    [FiltersMenuHeaders.assessment]: new Set(),
    [FiltersMenuHeaders.pathology]: new Set(),
    [FiltersMenuHeaders.abnormality_id]: new Set(),
  };

  const abnormalityFilterOptions: AbnormalityFilterOptions = {
    [AbnormalityFilterMenuHeaders.calc_type]: new Set(),
    [AbnormalityFilterMenuHeaders.calc_distribution]: new Set(),
    [AbnormalityFilterMenuHeaders.mass_shape]: new Set(),
    [AbnormalityFilterMenuHeaders.mass_margins]: new Set(),
  };

  Object.keys(calcCases).forEach((patientId) => {
    const calc = calcCases[patientId];
    filterOptions[FiltersMenuHeaders.left_or_right_breast].add(calc.left_or_right_breast);
    filterOptions[FiltersMenuHeaders.image_view].add(calc.image_view);
    filterOptions[FiltersMenuHeaders.abnormality_type].add(calc.abnormality_type);
    filterOptions[FiltersMenuHeaders.breast_density].add(calc.breast_density);
    filterOptions[FiltersMenuHeaders.subtlety].add(calc.subtlety);
    filterOptions[FiltersMenuHeaders.assessment].add(calc.assessment);
    filterOptions[FiltersMenuHeaders.pathology].add(calc.pathology);
    filterOptions[FiltersMenuHeaders.abnormality_id].add(calc.abnormality_id);
    abnormalityFilterOptions[AbnormalityFilterMenuHeaders.calc_type].add(calc.calc_type);
    abnormalityFilterOptions[AbnormalityFilterMenuHeaders.calc_distribution].add(calc.calc_distribution);
  });
  Object.keys(massCases).forEach((patientId) => {
    const mass = massCases[patientId];
    filterOptions[FiltersMenuHeaders.left_or_right_breast].add(mass.left_or_right_breast);
    filterOptions[FiltersMenuHeaders.image_view].add(mass.image_view);
    filterOptions[FiltersMenuHeaders.abnormality_type].add(mass.abnormality_type);
    filterOptions[FiltersMenuHeaders.breast_density].add(mass.breast_density);
    filterOptions[FiltersMenuHeaders.subtlety].add(mass.subtlety);
    filterOptions[FiltersMenuHeaders.assessment].add(mass.assessment);
    filterOptions[FiltersMenuHeaders.pathology].add(mass.pathology);
    filterOptions[FiltersMenuHeaders.abnormality_id].add(mass.abnormality_id);
    abnormalityFilterOptions[AbnormalityFilterMenuHeaders.mass_shape].add(mass.mass_shape);
    abnormalityFilterOptions[AbnormalityFilterMenuHeaders.mass_margins].add(mass.mass_margins);
  });

  return { filterOptions, abnormalityFilterOptions };
}
