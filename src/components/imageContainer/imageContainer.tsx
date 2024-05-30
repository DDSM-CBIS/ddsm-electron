import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ImageType } from '../../types/patient';

export default function ImageContainer(props: ImageType) {
  const { breastSide, imageView, imageFilePath } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {breastSide + ' ' + imageView}
          </Typography>
        </CardContent>
        <CardMedia component="img" height="140" src={imageFilePath.image} />
      </CardActionArea>
    </Card>
  );
}
