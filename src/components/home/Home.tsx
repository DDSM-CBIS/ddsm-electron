import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { AbnormalityFilterObject, FilterObject, PatientFilterObject } from '../../constants/filter.constant';
import { CHANNELS } from '../../constants/common';
import FilterSection from '../filterSection/FilterSection';
import PatientSection from '../patientsSection/PatientsSection';
import { BoxStyled, BoxFilterSectionStyled, BoxContentSectionStyled } from './style';

const { DDSM_AGENT } = window;

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [filtersMenuOptions, setFiltersMenuOptions] = useState<FilterObject>();
  const [abnormalityFilterMenuOptions, setAbnormalityFilterMenuOptions] = useState<AbnormalityFilterObject>();
  const [patientIdsFilterMenuOptions, setPatientIdsFilterMenuOptions] = useState<PatientFilterObject>();
  const [patientsIds, setPatientsIds] = useState<string[]>();
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    const getFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.FILTER_OPTIONS);
      const options: FilterObject = JSON.parse(response);
      setFiltersMenuOptions(options);
    };

    const getAbnormalityFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.ABNORMALITY_FILTER_OPTIONS);
      const options: AbnormalityFilterObject = JSON.parse(response);
      setAbnormalityFilterMenuOptions(options);
    };

    const getPatientOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IDS);
      const options: PatientFilterObject = JSON.parse(response);
      setPatientIdsFilterMenuOptions(options);

      if (!patientsIds && options.patientsIds) {
        setPatientsIds(options.patientsIds);
      }
      setLoading(false);
    };

    getFilterOptions();
    getAbnormalityFilterOptions();
    getPatientOptions();
  }, []);

  const onApplyFilter = useCallback(async (filters) => {
    const response = await DDSM_AGENT.send(CHANNELS.FILTER_PATIENTS, filters);
    const patients: PatientFilterObject = JSON.parse(response);
    setPatientsIds(patients.patientsIds);
  }, []);

  const handlePageChange = useCallback((event, value) => {
    setPageIndex(value);
  }, []);

  const pageCount = useMemo(() => {
    return Math.ceil(patientsIds?.length / 2) || 1;
  }, [patientsIds]);

  const currentPatients = useMemo(() => {
    const index = (pageIndex - 1) * 2;
    return patientsIds?.slice(index, index + 2);
  }, [patientsIds, pageIndex, handlePageChange]);

  return (
    <BoxStyled id="home-container">
      <BoxFilterSectionStyled id="filter-section-container">
        <FilterSection
          filtersMenuOptions={filtersMenuOptions}
          abnormalityFilterMenuOptions={abnormalityFilterMenuOptions}
          patientIdsFilterMenuOptions={patientIdsFilterMenuOptions}
          handleFilterApply={onApplyFilter}
        />
      </BoxFilterSectionStyled>
      <BoxContentSectionStyled id="patient-section-container">
        {loading ? (
          <CircularProgress />
        ) : (
          <PatientSection
            patientIds={currentPatients}
            pageCount={pageCount}
            pageIndex={pageIndex}
            handlePageChange={handlePageChange}
          />
        )}
      </BoxContentSectionStyled>
    </BoxStyled>
  );
}
