import React from 'react';
import { Box, Typography } from '@mui/material';
import Filter from '../filter/Filter';
import { FilterMenuProps } from '../../types/filter';

export default function FilterMenu(props: FilterMenuProps) {
  const { variant, sx, title, headers, options, values, onChange } = props;

  const handleChange = (key, value) => {
    let newValues = { ...values };
    if (!value || value.length === 0) {
      delete newValues[key];
      return onChange(newValues);
    }
    newValues = { ...values, [key]: value };
    onChange(newValues);
  };

  return (
    <Box>
      <Typography variant={variant} component="h1" align="center" sx={sx}>
        {title}
      </Typography>
      {Object.entries(headers).map(([key, value]) => (
        <Filter
          key={key as string}
          title={value as string}
          items={(options && options[key]) || []}
          value={(values && values[key]) || []}
          onChange={(value) => handleChange(key, value)}
        />
      ))}
    </Box>
  );
}
