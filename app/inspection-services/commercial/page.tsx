import { Metadata } from "next";
import CommercialClient from "./CommercialClient";

export const metadata: Metadata = {
  title: "Commercial Buildings Inspection Services in USA | Nspire Home Inspections",
  description: "Top-tier commercial buildings inspection services for businesses, property managers, and industrial facility owners ensuring safety, functionality, and compliance.",
};

export default function CommercialPage() {
  return <CommercialClient />;
}
