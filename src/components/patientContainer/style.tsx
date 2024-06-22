import { ImageList, ImageListItem, styled } from '@mui/material';

export const ContainerStyled = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '25%',
  boxSizing: 'border-box',
  marginBottom: 24,
});

export const TitleStyled = styled('h6')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightLight,
  color: theme.palette.text.primary,
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  width: '100%',
  marginTop: 0,
  marginBottom: 8,
  padding: 12,
}));

export const ImageListStyled = styled(ImageList)({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  overflow: 'hidden',
  borderRadius: 4,
  padding: 0,
  margin: 0,
});

export const ImageListItemStyled = styled(ImageListItem)({
  overflow: 'hidden',
  cursor: 'pointer',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
  },
});

export const ImageStyled = styled('img')({
  objectFit: 'scale-down',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
});
