import { Metadata } from "next";
import PublicHousingClient from "./PublicHousingClient";

export const metadata: Metadata = {
  title: "Public Housing Inspection Services in USA | Nspire Home Inspections",
  description: "Professional public housing inspection services for housing authorities and property managers. HUD/REAC preparation, compliance, and REAC score improvement.",
};

export default function PublicHousingPage() {
  return <PublicHousingClient />;
}
