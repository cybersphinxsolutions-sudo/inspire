import { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service | Nspire Home Inspections",
  description: "Review the terms of service for Nspire Home Inspections. Understand the conditions governing the use of our services and website.",
};

export default function TermsPage() {
  return <TermsClient />;
}
