import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import FilterMenu from '../FilterMenu/FilterMenu';
import { Item } from './style';
import Button from '../button/Button';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  AbnormalityFilterObject,
  FilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { CHANNELS } from '../../constants/common';

const { DDSM_AGENT } = window;

const Home = (): JSX.Element => {
  const [patientIds, setPatientIds] = useState<string[]>();
  const [filterOptions, setFilterOptions] = useState<FilterObject>();
  const [abnormalityFilterOptions, setAbnormalityFilterOptions] = useState<AbnormalityFilterObject>();
  const [patients, setPatients] = useState<PatientFilterObject>();
  const [filterOps, setFilterOps] = useState<FilterObject>();
  const [abnormalityFilterOps, setAbnormalityFilterOps] = useState<AbnormalityFilterObject>();
  const [patientOps, setPatientOps] = useState<PatientFilterObject>();

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

    getFilterOptions();
    getAbnormalityFilterOptions();
    getPatientOptions();
  }, []);

  const handleFilterChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setFilterOptions(null);
    }
    setFilterOptions(value);
  }, []);

  const handleAbnormalityFilterChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setAbnormalityFilterOptions(null);
    }
    setAbnormalityFilterOptions(value);
  }, []);

  const handlePatientChange = useCallback((value) => {
    if (!value || Object.keys(value).length === 0) {
      return setPatients(null);
    }
    setPatients(value);
  }, []);

  const isDisabled = useMemo(() => {
    return !filterOptions && !abnormalityFilterOptions && !patients;
  }, [filterOptions, abnormalityFilterOptions, patients]);

  const onApply = useCallback(() => {
    console.log('Filter Options:', filterOptions);
    console.log('Abnormality Filter Options:', abnormalityFilterOptions);
    console.log('Patients:', patients);
  }, [filterOptions, abnormalityFilterOptions, patients]);

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
              values={filterOptions}
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
              values={abnormalityFilterOptions}
              onChange={handleAbnormalityFilterChange}
            />
            <FilterMenu
              variant={'h5'}
              sx={{ marginTop: 4, paddingBlock: 2, background: '#4dabf5', borderRadius: 4, marginRight: 2 }}
              title="Patients"
              headers={{ patientId: 'Patients Ids' }}
              options={patientOps}
              values={patients}
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
      <Grid item xs={8}>
        <Item>{JSON.stringify(filterOptions)}</Item>
        <Item>{JSON.stringify(abnormalityFilterOptions)}</Item>
        <Item>{JSON.stringify(patients)}</Item>
      </Grid>
    </Grid>
  );
};

export default Home;
