import React, { useState, useEffect } from 'react';
import { Buffer } from 'buffer';
import { CHANNELS } from '../../../electron/constants/common';
import { ImageListItemBar } from '@mui/material';
import { ContainerStyled, TitleStyled, ImageListStyled, ImageListItemStyled, ImageStyled } from './style';

type PatientContainerProps = {
  patientId: string;
};

const { DDSM_AGENT } = window;

export default function PatientContainer(props: PatientContainerProps) {
  const { patientId } = props;
  const [patientImages, setPatientImages] = useState<string[]>();

  useEffect(() => {
    const getPatientImages = async (patientId: string) => {
      const imagesMetadata = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGES_DETAILS, patientId);

      const imagePromises: string[] = [];
      for (const seriesUID of Object.keys(imagesMetadata)) {
        const SOPUIDs = imagesMetadata[seriesUID];
        for (const SOPUID of SOPUIDs) {
          const response = await DDSM_AGENT.send(CHANNELS.PATIENT_IMAGE, { seriesUID, SOPUID });
          const base64Image = Buffer.from(response, 'binary').toString('base64');
          imagePromises.push(`data:image/jpeg;base64,${base64Image}`);
        }
      }

      const images = await Promise.all(imagePromises);
      setPatientImages(images);
    };
    getPatientImages(patientId);
  }, [props]);

  return (
    <ContainerStyled>
      <TitleStyled key={patientId}>Patient {patientId.split('_')[1]}</TitleStyled>
      <ImageListStyled cols={patientImages?.length}>
        {patientImages &&
          patientImages.map((image, index) => (
            <ImageListItemStyled key={index}>
              <ImageListItemBar title={'Image'} position="top" />
              <ImageStyled src={image} alt={`Image ${index}`} loading="lazy" />
            </ImageListItemStyled>
          ))}
      </ImageListStyled>
    </ContainerStyled>
  );
}
