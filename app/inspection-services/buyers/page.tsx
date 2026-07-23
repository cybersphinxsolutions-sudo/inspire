import { Metadata } from "next";
import BuyersClient from "./BuyersClient";

export const metadata: Metadata = {
  title: "Buyers Inspection Services in USA | Nspire Home Inspections",
  description: "Nspire's Buyer Inspection Services support confident purchasing decisions for residential, multi-family, commercial, and public housing properties across the USA.",
};

export default function BuyersPage() {
  return <BuyersClient />;
}
