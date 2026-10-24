import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { termsSections } from "@/content/policies";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions for using the Niraj Public School website.",
};

export default function TermsAndConditionsPage() {
  return <PolicyPage title="Terms & Conditions" eyebrow="A clear understanding" intro="These terms explain the conditions for accessing and using the Niraj Public School website." sections={termsSections} />;
}
