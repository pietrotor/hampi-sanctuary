import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { placeholders } from "@/lib/copy";

export const metadata: Metadata = {
  title: placeholders.conversationTitle,
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/conversation",
  },
};

export default function ConversationPage() {
  return (
    <PlaceholderPage
      title={placeholders.conversationTitle}
      body={placeholders.conversationBody}
      backLabel={placeholders.back}
    />
  );
}
