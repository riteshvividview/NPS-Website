import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Special Section",
  description:
    "Individual learning support and shared experiences in an inclusive school community.",
});
export default function Page() {
  return <ProgramPage slug="special-section" />;
}
