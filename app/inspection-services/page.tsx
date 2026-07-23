import { Metadata } from "next";
import InspectionServicesClient from "./InspectionServicesClient";

export const metadata: Metadata = {
  title: "Inspection Services in USA | Nspire Home Inspections",
  description: "Nspire provides professional Inspection Services across the USA, delivering end-to-end solutions for buyers, owners, sellers, landlords, investors, and public housing authorities.",
};

export default function InspectionServicesPage() {
  return <InspectionServicesClient />;
}
