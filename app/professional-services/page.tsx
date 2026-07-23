import { Metadata } from "next";
import ProfessionalServicesClient from "./ProfessionalServicesClient";

export const metadata: Metadata = {
  title: "Professional Services | Nspire Home Inspections",
  description: "B2B partnership services for real estate agents, brokerages, property managers, developers, lenders, and institutional investors.",
};

export default function ProfessionalServicesPage() {
  return <ProfessionalServicesClient />;
}
