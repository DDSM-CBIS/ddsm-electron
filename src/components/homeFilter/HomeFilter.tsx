import React, { useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import { FILTERS } from '../../constants/filter.constant';
import { Chip } from '@mui/material';
import { AllFilterOptions, useFilter } from '../../utils/useFilter';
import { getTableData } from '../../utils/dataUtils';
import { Patients } from '../../types/patient';
import { AbnormalityFilterMenuHeaders, FiltersMenuHeaders } from '../../types/types';

export default function HomeFilter({ onChange }) {
  const [patients, setPatients] = useState<Patients>([]);
  const [filterOptions, setFilterOptions] = useState<FiltersMenuHeaders>();
  const [abnormalityFilters, setAbnormalityFilters] = useState<AbnormalityFilterMenuHeaders>();
  const [filters, setFilters] = useState<AllFilterOptions>();

  useEffect(() => {
    const loadData = async () => {
      const { patients, calcCases, massCases, mediaFilePaths } = await getTableData();
      const options = useFilter(calcCases, massCases);
      setPatients(patients);
    };

    loadData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((filters) => {
      const newFilters = { ...filters, [e.target.name]: e.target.value };
      onChange(newFilters);
      return newFilters;
    });
  };

  return (
    <>
      <Chip label="Filters" />
      {Object.keys(filterOptions).map((key) => (
        <Filter
          title={FILTERS[key].title}
          items={filterOptions[key]}
          value={filters[key] || ''}
          onChange={handleFilterChange}
        />
      ))}
      <Chip label="Abnormality Params" />
      <Chip label="Patients" />
    </>
  );
}
