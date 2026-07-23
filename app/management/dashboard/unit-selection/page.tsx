"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import ManagementDashboardLayout from "@/components/ManagementDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"

function UnitSelectionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyName = searchParams.get('property') || 'Sunset Apartments'
  const [selectedUnits, setSelectedUnits] = useState<string[]>([])

  const units = [
    {
      id: "101",
      status: "needs-attention",
      statusText: "Needs Attention",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-50",
      icon: "⚠"
    },
    {
      id: "102",
      status: "paid",
      statusText: "Paid",
      statusColor: "text-green-600",
      statusBg: "bg-green-50",
      icon: "✓"
    },
    {
      id: "103",
      status: "unpaid",
      statusText: "Unpaid",
      statusColor: "text-red-600",
      statusBg: "bg-red-50",
      icon: "✕"
    }
  ]

  const handleSelectRandomUnits = () => {
    const shuffled = [...units].sort(() => 0.5 - Math.random())
    const randomCount = Math.floor(Math.random() * units.length) + 1
    const randomUnits = shuffled.slice(0, randomCount).map(u => u.id)
    setSelectedUnits(randomUnits)
    toast.success(`${randomCount} random unit${randomCount !== 1 ? 's' : ''} selected!`, { position: "top-right" })
  }

  const handleUnitToggle = (unitId: string) => {
    setSelectedUnits(prev => 
      prev.includes(unitId) 
        ? prev.filter(u => u !== unitId)
        : [...prev, unitId]
    )
  }

  return (
    <ManagementDashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Select Unit For Inspection</h1>
            <div className="text-sm text-gray-600">
              <p className="font-bold text-gray-900">{propertyName}</p>
              <p>New York</p>
            </div>
          </div>
          <Button
            onClick={handleSelectRandomUnits}
            className="w-full sm:w-auto bg-[#F84B5F] hover:bg-[#EE3646] text-white font-semibold px-6 py-3 rounded-lg"
          >
            Select Random Units
          </Button>
        </div>

        {selectedUnits.length > 0 && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <span className="text-sm font-medium text-blue-700">
              Selected: {selectedUnits.length} of {units.length} units
            </span>
          </div>
        )}

        {/* Units List */}
        <div className="space-y-4">
          {units.map((unit) => (
            <Card 
              key={unit.id} 
              className={`bg-white rounded-lg shadow-sm p-4 md:p-6 cursor-pointer transition-all ${
                selectedUnits.includes(unit.id) ? 'ring-2 ring-[#006795] bg-[#E8F4F8]' : ''
              }`}
              onClick={() => handleUnitToggle(unit.id)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedUnits.includes(unit.id)}
                    onChange={() => handleUnitToggle(unit.id)}
                    className="w-5 h-5 rounded border-gray-300 text-[#006795] focus:ring-[#006795]"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Unit {unit.id}</h2>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${unit.statusBg}`}>
                      <span className={`text-sm font-semibold ${unit.statusColor}`}>
                        {unit.icon} {unit.statusText}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/management/dashboard/inspection/${unit.id}`)
                  }}
                  className="w-full sm:w-auto bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-50 font-semibold px-6 py-3 rounded-lg"
                >
                  Start Inspection
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ManagementDashboardLayout>
  )
}

export default function UnitSelection() {
  return (
    <Suspense fallback={
      <ManagementDashboardLayout>
        <div className="p-4 md:p-6">
          <div className="text-center py-8">Loading...</div>
        </div>
      </ManagementDashboardLayout>
    }>
      <UnitSelectionContent />
    </Suspense>
  )
}
