import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilterMenu } from '../../types/filter';
import { FilterMenuProps } from '../../constants/filter.constant';
import { RootStyled, InputLabelStyled } from './style';

export default function Filter(props: FilterMenu) {
  const { key, title, items, value, onChange } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    const {
      target: { value },
    } = event;
    onChange(value as string[]);
  };

  return (
    <div key={key}>
      <RootStyled>
        <InputLabelStyled shrink id="demo-multiple-checkbox-label" variant="outlined">
          {title}
        </InputLabelStyled>
        <Select
          labelId="demo-multiple-checkbox-label"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput notched label={title} id="outlined-age-native-simple" />}
          renderValue={(selected) => (selected as string[]).join(', ')}
          MenuProps={FilterMenuProps}>
          {items.map((item) => (
            <MenuItem key={item} value={item} sx={{ fontSize: 4 }}>
              <Checkbox checked={value?.indexOf(item) > -1} size="small" />
              <ListItemText primary={item} sx={{ fontSize: 4 }} />
            </MenuItem>
          ))}
        </Select>
      </RootStyled>
    </div>
  );
}
