import React, { useState, useMemo, useCallback, useEffect } from 'react';
import FilterMenu from '../filterMenu/FilterMenu';
import Button from '../button/Button';
import {
  FiltersMenuHeaders,
  AbnormalityFilterMenuHeaders,
  FilterObject,
  AbnormalityFilterObject,
  PatientFilterObject,
} from '../../constants/filter.constant';
import { BoxFilterMenuStyled } from './style';
import QuerySaveDialog from '../querySaveDialog/QuerySaveDialog';
import { CHANNELS } from '../../constants/common';

const { DDSM_AGENT } = window;

type FilterSectionProps = {
  filtersMenuOptions: FilterObject;
  abnormalityFilterMenuOptions: AbnormalityFilterObject;
  patientIdsFilterMenuOptions: PatientFilterObject;
  handleFilterApply: (filters) => void;
  initialFilters?: { filterOptions?: any; abnormalityFilter?: any; patientIds?: any };
};

export default function FilterSection(props: FilterSectionProps) {
  const {
    filtersMenuOptions,
    abnormalityFilterMenuOptions,
    patientIdsFilterMenuOptions,
    handleFilterApply,
    initialFilters,
  } = props;
  const [filtersMenu, setFiltersMenu] = useState({ options: {}, selected: {} });
  const [abnormalityFilterMenu, setAbnormalityFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [patientIdsFilterMenu, setPatientIdsFilterMenu] = useState({
    options: {},
    selected: {},
  });
  const [isSaveQueryPopupOpen, setIsSaveQueryPopupOpen] = useState(false);

  useEffect(() => {
    setFiltersMenu({ options: filtersMenuOptions, selected: initialFilters?.filterOptions || {} });
    setAbnormalityFilterMenu({
      options: abnormalityFilterMenuOptions,
      selected: initialFilters?.abnormalityFilter || {},
    });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: initialFilters?.patientIds || {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, patientIdsFilterMenuOptions, initialFilters]);

  const handleFilterChange = useCallback((menu, value) => {
    const menus = {
      filters: setFiltersMenu,
      abnormality: setAbnormalityFilterMenu,
      patientsIds: setPatientIdsFilterMenu,
    };
    menus[menu]((prev) => {
      const options = prev.options;
      return {
        ['options']: options,
        ['selected']: !value || Object.keys(value).length === 0 ? null : value,
      };
    });
  }, []);

  const onApply = useCallback(async () => {
    const filters = {
      filterOptions: filtersMenu.selected || {},
      abnormalityFilter: abnormalityFilterMenu.selected || {},
      patientIds: patientIdsFilterMenu.selected || {},
    };
    handleFilterApply(filters);
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  const onReset = useCallback(async () => {
    setFiltersMenu({ options: filtersMenuOptions, selected: {} });
    setAbnormalityFilterMenu({ options: abnormalityFilterMenuOptions, selected: {} });
    setPatientIdsFilterMenu({ options: patientIdsFilterMenuOptions, selected: {} });
  }, [filtersMenuOptions, abnormalityFilterMenuOptions, patientIdsFilterMenuOptions]);

  const onQuerySave = useCallback(
    async (queryName: string) => {
      const filters = {
        filterOptions: filtersMenu.selected || {},
        abnormalityFilter: abnormalityFilterMenu.selected || {},
        patientIds: patientIdsFilterMenu.selected || {},
      };

      if (queryName) {
        const response = await DDSM_AGENT.send(CHANNELS.SAVE_QUERY, { queryName, filters });
        if (response === 'success') {
          alert(`Query saved successfully as "${queryName}.json" in the "savedQueries" folder.`);
        } else {
          alert('Saving query was canceled.');
        }
      }
    },
    [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]
  );

  const isDisabled = useMemo(() => {
    const filterEmpty = !filtersMenu.selected || Object.keys(filtersMenu.selected).length === 0;
    const abnormalityEmpty =
      !abnormalityFilterMenu.selected || Object.keys(abnormalityFilterMenu.selected).length === 0;
    const patientIdsEmpty = !patientIdsFilterMenu.selected || Object.keys(patientIdsFilterMenu.selected).length === 0;
    return filterEmpty && abnormalityEmpty && patientIdsEmpty;
  }, [filtersMenu.selected, abnormalityFilterMenu.selected, patientIdsFilterMenu.selected]);

  return (
    <>
      <BoxFilterMenuStyled id="filter-menu-filter-section">
        <FilterMenu
          title="Filters"
          headers={FiltersMenuHeaders}
          options={filtersMenu.options}
          values={filtersMenu.selected}
          onChange={(value) => handleFilterChange('filters', value)}
        />
      </BoxFilterMenuStyled>
      <BoxFilterMenuStyled id="other-filter-menu-filter-section">
        <FilterMenu
          title="Abnormality Params"
          headers={AbnormalityFilterMenuHeaders}
          options={abnormalityFilterMenu.options}
          values={abnormalityFilterMenu.selected}
          onChange={(value) => handleFilterChange('abnormality', value)}
        />
        <FilterMenu
          title="Patients"
          headers={{ patientsIds: 'Patients Ids' }}
          options={patientIdsFilterMenu.options}
          values={patientIdsFilterMenu.selected}
          onChange={(value) => handleFilterChange('patientsIds', value)}
        />
        <Button
          variant="contained"
          size="small"
          title="Apply"
          disabled={isDisabled}
          sx={{ margin: 2 }}
          onClick={onApply}
        />
        <Button
          variant="outlined"
          size="small"
          title="Reset"
          disabled={isDisabled}
          sx={{ margin: 2 }}
          onClick={onReset}
        />
        <Button
          variant="outlined"
          size="small"
          title="Save Query"
          disabled={isDisabled}
          sx={{ margin: 2 }}
          onClick={() => setIsSaveQueryPopupOpen(true)}
        />
      </BoxFilterMenuStyled>
      <QuerySaveDialog
        open={isSaveQueryPopupOpen}
        onClose={() => setIsSaveQueryPopupOpen(false)}
        onSave={onQuerySave}
      />
    </>
  );
}
