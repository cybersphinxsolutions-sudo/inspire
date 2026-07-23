import { Metadata } from "next";
import SpecializedClient from "./SpecializedClient";

export const metadata: Metadata = {
  title: "Special Inspection Services in USA | Nspire Home Inspections",
  description: "Comprehensive special inspection services including sewer scope, mold sampling, pool inspections, roof inspections, foundation assessments, and luxury home inspections.",
};

export default function SpecializedPage() {
  return <SpecializedClient />;
}
