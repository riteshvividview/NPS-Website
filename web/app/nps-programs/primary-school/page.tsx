import ProgramPage from "@/components/pages/Programs/ProgramPages";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({
  title: "Primary School",
  description:
    "Connected, child-centred learning for curious and confident primary students.",
});
export default function Page() {
  return <ProgramPage slug="primary-school" />;
}
