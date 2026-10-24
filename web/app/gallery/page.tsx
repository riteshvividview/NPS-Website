import type { Metadata } from "next";
import GalleryExperience from "@/components/gallery/GalleryExperience";
import galleryData from "@/content/galleryManifest.json";
import type { GalleryManifest } from "@/lib/gallery";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "A closer look at the activities, achievements and everyday moments that make life at Niraj Public School.",
});

export default function GalleryPage() {
  return <GalleryExperience manifest={galleryData as GalleryManifest} />;
}
