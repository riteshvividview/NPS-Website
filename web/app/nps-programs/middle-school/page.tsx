import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Middle School",
  description:
    "Explore Grades VI and VII, specialist subjects, hands-on learning and assessment.",
});
export default function Page() {
  return <ProgramPage slug="middle-school" />;
}
