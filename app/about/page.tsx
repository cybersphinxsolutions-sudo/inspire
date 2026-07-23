import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Nspire Home Inspections",
  description: "Learn more about Nspire Home Inspections, our mission, values, and our commitment to providing expert property inspection services across Georgia.",
};

export default function AboutPage() {
  return <AboutClient />;
}
