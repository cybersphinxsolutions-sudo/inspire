"use client";

import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/MainLayout";

interface Inspector {
  name: string;
  company: string;
  city: string;
  phone: string;
}

interface Props {
  stateName: string;
  inspectors: Inspector[];
}

export default function StateInspectorsClient({ stateName, inspectors }: Props) {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-[#E8F4F8]">
        <section className="max-w-[1200px] mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-20">

          {/* Back link */}
          <Link
            href="/find-inspectors"
            className="inline-flex items-center gap-2 text-[#006795] hover:underline font-medium mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all locations
          </Link>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#334155] mb-2">
            Certified Home Inspectors in {stateName}
          </h1>
          <p className="text-gray-600 mb-10">
            All certified home inspectors available in {stateName}
          </p>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left sidebar */}
            <div className="lg:w-[340px] bg-white rounded-2xl p-6 shadow-sm h-fit">
              <p className="text-gray-700 text-sm mb-5">
                All CompanyName members listed on this site are Company Name
                Certified Professional Inspectors and meet/abide by
                CompanyName's strict standards.
              </p>
              <p className="font-bold text-gray-900 mb-3">All CompanyName CPIs:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Must pass the CompanyName Online Inspector Exam</li>
                <li>✓ Must meet pre-certification training requirements</li>
                <li>✓ Must abide by the CompanyName standards of practice</li>
                <li>✓ Must abide by the CompanyName code of ethics</li>
                <li>✓ Must meet CompanyName's continuing education policy, including 24 hours of education each year</li>
              </ul>
            </div>

            {/* Inspectors table */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
                <span className="font-semibold text-gray-700 text-sm">Inspector</span>
                <span className="font-semibold text-gray-700 text-sm">Servicing</span>
                <span className="font-semibold text-gray-700 text-sm">Phone Number</span>
              </div>

              {/* Inspector rows */}
              {inspectors.map((inspector, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-3 items-center px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group ${
                    idx !== inspectors.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div>
                    <p className="text-[#006795] font-medium group-hover:underline">
                      {inspector.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5">{inspector.company}</p>
                  </div>
                  <span className="text-gray-700 text-sm">{inspector.city}</span>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 text-sm">{inspector.phone}</span>
                    <ChevronRight className="w-5 h-5 text-[#006795]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>
    </MainLayout>
  );
}
