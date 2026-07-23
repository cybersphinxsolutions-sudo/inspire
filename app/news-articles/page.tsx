import { Metadata } from "next";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "News & Articles | Nspire Home Inspections",
  description: "Stay informed with the latest industry news, regulatory updates, and Nspire announcements about home and commercial inspections.",
};

export default function NewsPage() {
  return <NewsClient />;
}
