export type SeriesMetadata = {
  class: string;
  imageFormat: string;
  imageView: string;
  leftOrRightBreast: string;
  sopUIDs: string[];
  uid: string;
};

export type ImageMetadata = SeriesMetadata[];
export type ImagesMetadata = Record<string, SeriesMetadata[]>;

export type Metadata = {
  imagesMetadata: ImageMetadata;
  imageCount: number;
};

export type PatientImages = {
  id?: number;
  seriesUID?: string;
  sopUID?: string;
  class?: string;
  imageView: string;
  leftOrRightBreast: string;
  imageFilePath: string;
};
