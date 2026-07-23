import { Metadata } from "next";
import SellersClient from "./SellersClient";

export const metadata: Metadata = {
  title: "Sellers Inspection Services in USA | Nspire Home Inspections",
  description: "Prepare your property for listing with Nspire's sellers inspection services. Pre-listing inspections, HUD/REAC pre-sale support, and seller transparency reports.",
};

export default function SellersPage() {
  return <SellersClient />;
}
