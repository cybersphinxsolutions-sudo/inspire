"use client"

import { useRouter, useParams } from "next/navigation"
import ManagementDashboardLayout from "@/components/ManagementDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"

export default function InspectionSummary() {
  const router = useRouter()
  const params = useParams()
  const unitId = params.id || "101"

  const issues = [
    {
      title: "Smoke Detector",
      description: "Battery Missing - Needs Replacement"
    },
    {
      title: "Faucet Leak - Needs Attention",
      description: ""
    }
  ]

  const handleExportPDF = () => {
    toast.success("Exporting inspection report as PDF...", { position: "top-right" })
  }

  const handleShareReport = () => {
    toast.success("Report shared successfully!", { position: "top-right" })
  }

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!", { position: "top-right" })
  }

  return (
    <ManagementDashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Inspection – Unit {unitId}</h1>
              <div className="text-sm text-gray-600">
                <p className="font-bold text-gray-900">Property: Sunset Apartments</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-green-700">Compliant</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Compliance Score Card */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance Score</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              {/* Circular Progress */}
              <div className="relative w-40 h-40 flex-shrink-0">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - 88 / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">88%</span>
                  <span className="text-sm font-semibold text-gray-600">Compliant</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 space-y-3">
                <p className="text-base font-semibold text-gray-900">15 Of 17 Of Items Checked</p>
                <p className="text-base font-semibold text-gray-900">2 Issues Require Follow-Up</p>
                <p className="text-base font-semibold text-gray-900">5 Photos Added</p>
              </div>
            </div>
          </Card>

          {/* Issues Found Card */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Issues Found</h2>
            
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{issue.title}</h3>
                      {issue.description && (
                        <p className="text-sm text-gray-600">{issue.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Notes */}
        <Card className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">Overall condition is satisfactory. Minor maintenance is required.</p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-none bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleExportPDF}
            className="flex-1 sm:flex-none bg-[#006795] hover:bg-[#0A5670] text-white font-semibold px-6 py-3 rounded-lg"
          >
            Export PDF
          </Button>
          <Button
            onClick={handleShareReport}
            className="flex-1 sm:flex-none bg-[#F84B5F] hover:bg-[#EE3646] text-white font-semibold px-6 py-3 rounded-lg"
          >
            Share Report
          </Button>
        </div>
      </div>
    </ManagementDashboardLayout>
  )
}
