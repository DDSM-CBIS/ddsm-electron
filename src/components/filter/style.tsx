import { FormControl, InputLabel, styled } from '@mui/material';

export const RootStyled = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
  width: 150,
  height: 25,
}));

export const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
  overflow: 'hidden',
  fontSize: 14,
}));
