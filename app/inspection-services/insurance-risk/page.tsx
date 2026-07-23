import { Metadata } from "next";
import InsuranceRiskClient from "./InsuranceRiskClient";

export const metadata: Metadata = {
  title: "Insurance Risk Management Services in USA | Nspire Home Inspections",
  description: "Property risk assessment, hazard and liability review, fire and safety risk reporting, environmental risk analysis, and insurance claim prevention services.",
};

export default function InsuranceRiskPage() {
  return <InsuranceRiskClient />;
}
