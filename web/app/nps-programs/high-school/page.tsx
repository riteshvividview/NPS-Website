import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "High School",
  description:
    "Explore ICSE learning, subject choices, technology and life beyond the classroom.",
});
export default function Page() {
  return <ProgramPage slug="high-school" />;
}
