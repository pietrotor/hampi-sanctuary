import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { placeholders } from "@/lib/copy";

export const metadata: Metadata = {
  title: placeholders.documentaryTitle,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/documentary",
  },
};

export default function DocumentaryPage() {
  return (
    <PlaceholderPage
      title={placeholders.documentaryTitle}
      body={placeholders.documentaryBody}
      backLabel={placeholders.back}
    />
  );
}
