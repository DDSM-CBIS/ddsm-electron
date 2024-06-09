import React from 'react';
import { Button as MuiButton } from '@mui/material';

type ButtonProps = {
  variant: 'text' | 'outlined' | 'contained';
  size: 'small' | 'medium' | 'large';
  title: string;
  disabled: boolean;
  sx: any;
  onClick: () => void;
};

export default function Button(prop: ButtonProps) {
  const { variant, size, title, disabled, sx, onClick } = prop;
  return (
    <MuiButton variant={variant} size={size} disabled={disabled} onClick={onClick} sx={sx}>
      {title}
    </MuiButton>
  );
}
