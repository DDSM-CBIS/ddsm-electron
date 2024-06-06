import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FilterMenu from '../FilterMenu/FilterMenu';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  AbnormalityFilterObject,
  FilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { CHANNELS } from '../../constants/common';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
    setFilterOptions(value);
  }, []);

  const handleAbnormalityFilterChange = useCallback((value) => {
    setAbnormalityFilterOptions(value);
  }, []);

  const handlePatientChange = useCallback((value) => {
    setPatients(value);
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
