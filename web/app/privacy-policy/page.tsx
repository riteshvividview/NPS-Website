import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { privacySections } from "@/content/policies";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Niraj Public School handles information shared through its website.",
};

export default function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" eyebrow="Your information, respected" intro="This policy describes the information Niraj Public School may collect through this website and how it is used." sections={privacySections} />;
}
