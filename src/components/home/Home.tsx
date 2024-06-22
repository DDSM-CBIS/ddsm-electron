import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Grid, Pagination } from '@mui/material';
import FilterMenu from '../FilterMenu/FilterMenu';
import Button from '../button/Button';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  AbnormalityFilterObject,
  FilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { CHANNELS } from '../../constants/common';
import { PatientsDetails } from 'types/patient';
import { filterPatients } from '../../utils/filter';
import PatientContainer from '../patientContainer/patientContainer';

const { DDSM_AGENT } = window;

const Home = (): JSX.Element => {
  const [patientsDetails, setPatientsDetails] = useState<PatientsDetails>();
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<FilterObject>();
  const [selectedAbnormalityFilterOptions, setSelectedAbnormalityFilterOptions] = useState<AbnormalityFilterObject>();
  const [selectedPatientIds, setSelectedPatientIds] = useState<PatientFilterObject>();
  const [filterOps, setFilterOps] = useState<FilterObject>();
  const [abnormalityFilterOps, setAbnormalityFilterOps] = useState<AbnormalityFilterObject>();
  const [patientOps, setPatientOps] = useState<PatientFilterObject>();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    const getFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.FILTER_OPTIONS);
      const options: FilterObject = JSON.parse(response);
      setFilterOps(options);
    };

    const getAbnormalityFilterOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.ABNORMALITY_FILTER_OPTIONS);
      const options: AbnormalityFilterObject = JSON.parse(response);
      setAbnormalityFilterOps(options);
    };

    const getPatientOptions = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IDS);
      const options: PatientFilterObject = JSON.parse(response);
      setPatientOps(options);
    };

    const getPatientsDetails = async () => {
      const patients: PatientsDetails = await DDSM_AGENT.send(CHANNELS.PATIENTS);
      setPatientsDetails(patients);

      setPageCount(Object.keys(patients).length / 2);
    };

    getFilterOptions();
    getAbnormalityFilterOptions();
    getPatientOptions();
    getPatientsDetails();
  }, []);

  const handleFilterChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setSelectedFilterOptions(null);
    }
    setSelectedFilterOptions(value);
  }, []);

  const handleAbnormalityFilterChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setSelectedAbnormalityFilterOptions(null);
    }
    setSelectedAbnormalityFilterOptions(value);
  }, []);

  const handlePatientChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setSelectedPatientIds(null);
    }
    setSelectedPatientIds(value);
  }, []);

  const isDisabled = useMemo(() => {
    return !selectedFilterOptions && !selectedAbnormalityFilterOptions && !selectedPatientIds;
  }, [selectedFilterOptions, selectedAbnormalityFilterOptions, selectedPatientIds]);

  const patientIds = useMemo(() => {
    if (!patientsDetails) return [];
    const index = (pageIndex - 1) * 2;
    return Object.keys(patientsDetails).slice(index, index + 2);
  }, [patientsDetails, pageIndex]);

  const onApply = useCallback(() => {
    const filters = {
      filterOptions: selectedFilterOptions,
      abnormalityFilter: selectedAbnormalityFilterOptions,
      patientIds: selectedPatientIds,
    };
    filterPatients(patientsDetails, filters);
    setPatientsDetails(patientsDetails);
  }, [selectedFilterOptions, selectedAbnormalityFilterOptions, selectedPatientIds]);

  const handlePageChange = useCallback((event, value) => {
    setPageIndex(value);
  }, []);

  return (
    <Grid container>
      <Grid item xs={4}>
        <Grid container columns={2} sx={{ margin: 0 }}>
          <Grid item xs={1}>
            <FilterMenu
              variant={'h5'}
              sx={{
                background: '#4dabf5',
                borderRadius: 4,
                marginRight: 2,
                paddingBlock: 3,
              }}
              title="Filters"
              headers={FiltersMenuHeaders}
              options={filterOps}
              values={selectedFilterOptions}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={1}>
            <FilterMenu
              variant={'h6'}
              sx={{ paddingBlock: 1, background: '#4dabf5', borderRadius: 4, marginRight: 2 }}
              title="Abnormality Params"
              headers={AbnormalityFilterMenuHeaders}
              options={abnormalityFilterOps}
              values={selectedAbnormalityFilterOptions}
              onChange={handleAbnormalityFilterChange}
            />
            <FilterMenu
              variant={'h5'}
              sx={{ marginTop: 4, paddingBlock: 2, background: '#4dabf5', borderRadius: 4, marginRight: 2 }}
              title="Patients"
              headers={{ patientsIds: 'Patients Ids' }}
              options={patientOps}
              values={selectedPatientIds}
              onChange={handlePatientChange}
            />
            <Button
              variant="contained"
              size="small"
              title="Apply"
              disabled={isDisabled}
              sx={{ marginTop: 4 }}
              onClick={onApply}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={8} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <div>
          {patientIds && patientIds?.map((patientId) => <PatientContainer key={patientId} patientId={patientId} />)}
        </div>
        <div style={{ display: 'flex', position: 'fixed', right: 0, bottom: 6, margin: 2 }}>
          <Pagination count={pageCount} page={pageIndex} onChange={handlePageChange} size="small" />
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
