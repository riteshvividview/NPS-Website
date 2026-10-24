export interface GalleryImage {
  id: string;
  src: string;
  original: string;
  category: string;
  name: string;
  displayable: boolean;
  width: number;
  height: number;
  score: number;
  sharpness: number;
  brightness: number;
  contrast: number;
}

export interface GalleryManifest {
  generatedAt: string;
  algorithm: string;
  categories: string[];
  images: GalleryImage[];
}
