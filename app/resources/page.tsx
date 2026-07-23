import { Metadata } from "next";
import ResourcesClient from "./ResourcesClient";

export const metadata: Metadata = {
  title: "Resources | Nspire Home Inspections",
  description: "Access Nspire's library of resources including blogs, guides, news articles, and FAQs about home and commercial inspections.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
