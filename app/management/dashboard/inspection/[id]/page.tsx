"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import ManagementDashboardLayout from "@/components/ManagementDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"

export default function InspectionForm() {
  const router = useRouter()
  const params = useParams()
  const unitId = params.id || "101"
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const [inspectionData, setInspectionData] = useState({
    electrical: {
      smokeDetector: "",
      smokeDetectorRemarks: ""
    },
    plumbing: {
      faucetLeaks: "",
      faucetLeaksRemarks: ""
    }
  })

  const handleOptionSelect = (category: string, field: string, value: string) => {
    setInspectionData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleRemarksChange = (category: string, field: string, value: string) => {
    setInspectionData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }))
  }

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully!", { position: "top-right" })
    console.log("Saving draft:", inspectionData)
  }

  const handleSubmit = () => {
    toast.success("Inspection submitted successfully!", { position: "top-right" })
    setTimeout(() => router.push(`/management/dashboard/inspection/${unitId}/summary`), 1500)
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      toast.info(`Moving to page ${currentPage + 1}`, { position: "top-right" })
    } else {
      router.push(`/management/dashboard/inspection/${unitId}/summary`)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <ManagementDashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Inspection – Unit {unitId}</h1>
          <div className="text-sm text-gray-600">
            <p className="font-bold text-gray-900">Property: Sunset Apartments</p>
            <p>Unit: {unitId}</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              onClick={handleSaveDraft}
              className="bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg"
            >
              Save Draft
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#006795] hover:bg-[#0A5670] text-white font-semibold px-6 py-3 rounded-lg"
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-[#006795] h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round((currentPage / totalPages) * 100)}% Complete</p>
        </div>

        {/* Inspection Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Electrical Section */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Electrical</h2>
            
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Smoke Detector Function</h3>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleOptionSelect('electrical', 'smokeDetector', 'pass')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.electrical.smokeDetector === 'pass'
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                  }`}
                >
                  Pass
                </button>
                <button
                  onClick={() => handleOptionSelect('electrical', 'smokeDetector', 'fail')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.electrical.smokeDetector === 'fail'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                  }`}
                >
                  Fail
                </button>
                <button
                  onClick={() => handleOptionSelect('electrical', 'smokeDetector', 'na')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.electrical.smokeDetector === 'na'
                      ? 'bg-gray-500 text-white border-gray-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  N/A
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Remarks..."
                  value={inspectionData.electrical.smokeDetectorRemarks}
                  onChange={(e) => handleRemarksChange('electrical', 'smokeDetectorRemarks', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-[#E8F4F8] border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                />
                <button className="p-3 bg-[#E8F4F8] rounded-lg hover:bg-[#D0E8F0]">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>

          {/* Plumbing Section */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Plumbing</h2>
            
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Faucet Leaks?</h3>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => handleOptionSelect('plumbing', 'faucetLeaks', 'pass')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.plumbing.faucetLeaks === 'pass'
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-500'
                  }`}
                >
                  Pass
                </button>
                <button
                  onClick={() => handleOptionSelect('plumbing', 'faucetLeaks', 'fail')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.plumbing.faucetLeaks === 'fail'
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-red-500'
                  }`}
                >
                  Fail
                </button>
                <button
                  onClick={() => handleOptionSelect('plumbing', 'faucetLeaks', 'na')}
                  className={`flex-1 px-4 py-2 rounded-full border-2 font-medium transition-colors ${
                    inspectionData.plumbing.faucetLeaks === 'na'
                      ? 'bg-gray-500 text-white border-gray-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                  }`}
                >
                  N/A
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Remarks..."
                  value={inspectionData.plumbing.faucetLeaksRemarks}
                  onChange={(e) => handleRemarksChange('plumbing', 'faucetLeaksRemarks', e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-[#E8F4F8] border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                />
                <button className="p-3 bg-[#E8F4F8] rounded-lg hover:bg-[#D0E8F0]">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="bg-white border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </Button>
          <Button
            onClick={handleNext}
            className="bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg"
          >
            Next →
          </Button>
        </div>
      </div>
    </ManagementDashboardLayout>
  )
}
