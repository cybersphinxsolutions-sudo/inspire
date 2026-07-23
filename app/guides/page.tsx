import { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
  title: "Guides | Nspire Home Inspections",
  description: "Comprehensive guides for home buyers, sellers, homeowners, and real estate professionals on property inspections and maintenance.",
};

export default function GuidesPage() {
  return <GuidesClient />;
}
