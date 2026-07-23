import { Metadata } from "next";
import RentalClient from "./RentalClient";

export const metadata: Metadata = {
  title: "Rental Property Inspection Services in USA | Nspire Home Inspections",
  description: "Comprehensive rental property inspection services for landlords, property managers, and tenants. Move-in, move-out, annual safety inspections, and compliance documentation.",
};

export default function RentalPage() {
  return <RentalClient />;
}
