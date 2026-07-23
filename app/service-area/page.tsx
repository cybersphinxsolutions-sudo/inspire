import { Metadata } from "next";
import ServiceAreaClient from "./ServiceAreaClient";

export const metadata: Metadata = {
  title: "Service Area | Nspire Home Inspections",
  description: "Nspire Home Inspections serves the greater Atlanta, Georgia metropolitan area including Alpharetta, Marietta, Sandy Springs, Roswell, Lawrenceville, Decatur, and more.",
};

export default function ServiceAreaPage() {
  return <ServiceAreaClient />;
}
