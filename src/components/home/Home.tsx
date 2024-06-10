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
import { PatientsDetails } from 'types/patient';
import { filterPatients } from '../../utils/filter';

const { DDSM_AGENT } = window;

const Home = (): JSX.Element => {
  const [patientIds, setPatientIds] = useState<string[]>();
  const [patientsDetails, setPatientsDetails] = useState<PatientsDetails>();
  const [selectedFilterOptions, setSelectedFilterOptions] = useState<FilterObject>();
  const [selectedAbnormalityFilterOptions, setSelectedAbnormalityFilterOptions] = useState<AbnormalityFilterObject>();
  const [selectedPatientIds, setSelectedPatientIds] = useState<PatientFilterObject>();
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

    const getPatientsDetails = async () => {
      const response = await DDSM_AGENT.send(CHANNELS.PATIENTS);
      const patients: PatientsDetails = JSON.parse(response);
      setPatientsDetails(patients);

      patientIds && setPatientIds(Object.keys(patients));
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

  const onApply = useCallback(() => {
    const filters = {
      filterOptions: selectedFilterOptions,
      abnormalityFilter: selectedAbnormalityFilterOptions,
      patientIds: selectedPatientIds,
    };
    const filteredPatients = filterPatients(patientsDetails, filters);
    setPatientIds(filteredPatients);
  }, [selectedFilterOptions, selectedAbnormalityFilterOptions, selectedPatientIds]);

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
              headers={{ patientId: 'Patients Ids' }}
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
      <Grid item xs={8}>
        {patientIds?.map((patientId) => (
          <Item key={patientId} title={patientId} />
        ))}
      </Grid>
    </Grid>
  );
};

export default Home;
