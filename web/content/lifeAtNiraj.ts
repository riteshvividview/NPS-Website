import galleryData from "@/content/galleryManifest.json";
import type { GalleryManifest, GalleryImage } from "@/lib/gallery";

export interface LifeAtNirajGroup {
  hero: { image: string; alt: string; aspectRatio: string; captionLine1: string; captionLine2: string };
  top1: { image: string; alt: string; aspectRatio: string };
  top2: { image: string; alt: string; aspectRatio: string };
  top3: { image: string; alt: string; aspectRatio: string };
  video: { thumbnail: string; alt: string; aspectRatio: string; titleLine1: string; titleLine2: string; tag: string; duration: string };
  bottom: { image: string; alt: string; aspectRatio: string };
  extra: { image: string; alt: string; aspectRatio: string };
  additional: { image: string; alt: string; aspectRatio: string }[];
}

export interface LifeAtNirajContent {
  navRight: string;
  eyebrow: string;
  heading: string;
  filters: string[];
  ctaLine1: string;
  ctaLine2: string;
  ctaHref: string;
  sideTagLines: string[];
  groups: LifeAtNirajGroup[];
}

const manifest = galleryData as GalleryManifest;

function categoryImages(category: string): GalleryImage[] {
  return manifest.images.filter((image) => image.category === category);
}

function photo(image: GalleryImage) {
  return {
    image: image.src,
    alt: `Photo from ${image.category}`,
    aspectRatio: image.width > 0 && image.height > 0 ? `${image.width} / ${image.height}` : "4 / 3",
  };
}

function createGroup(category: string, caption: [string, string], callout: [string, string]): LifeAtNirajGroup {
  const images = categoryImages(category);
  const [heroImage, top1Image, top2Image, top3Image, featureImage, bottomImage, extraImage] = images;
  const hero = photo(heroImage);
  const top1 = photo(top1Image);
  const top2 = photo(top2Image);
  const top3 = photo(top3Image);
  const feature = photo(featureImage);
  const bottom = photo(bottomImage);
  const extra = photo(extraImage);
  return {
    hero: { ...hero, captionLine1: caption[0], captionLine2: caption[1] },
    top1,
    top2,
    top3,
    video: { thumbnail: feature.image, alt: feature.alt, aspectRatio: feature.aspectRatio, titleLine1: callout[0], titleLine2: callout[1], tag: category, duration: "" },
    bottom,
    extra,
    additional: category === "Pre-Primary Class Activities" ? images.slice(7, 12).map(photo) : [],
  };
}

export const lifeAtNirajContent: LifeAtNirajContent = {
  navRight: "Learn · Grow · Belong",
  eyebrow: "Moments That Matter",
  heading: "Life at Niraj",
  filters: ["Field Trips", "Co-Curricular", "Pre-Primary"],
  ctaLine1: "Explore",
  ctaLine2: "Gallery",
  ctaHref: "/gallery",
  sideTagLines: ["Small", "Steps", "Big", "Stories"],
  groups: [
    createGroup("Field Trips", ["Beyond", "the Classroom"], ["New places", "New perspectives"]),
    createGroup("Co-Curricular Activities", ["Hands-on", "Discovery"], ["Ideas into", "action"]),
    createGroup("Pre-Primary Class Activities", ["Little", "Big Ideas"], ["Learning", "through play"]),
  ],
};
