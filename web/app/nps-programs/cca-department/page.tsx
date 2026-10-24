import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "CCA Department",
  description:
    "Discover co-curricular learning through expression, sport, teamwork and purpose.",
});
export default function Page() {
  return <ProgramPage slug="cca-department" />;
}
