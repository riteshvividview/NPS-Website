import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Pre-Primary School",
  description:
    "Play, discovery and the Nature Nurture curriculum in the foundational years.",
});
export default function Page() {
  return <ProgramPage slug="pre-primary-school" />;
}
