"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

interface UnitSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (selectedUnits: string[]) => void
  totalUnits?: number
}

// NSPIRE sampling table: [minUnits, maxUnits, sampleSize]
const NSPIRE_SAMPLING: [number, number, number][] = [
  [1, 1, 1], [2, 2, 1], [3, 3, 2], [4, 4, 3], [5, 5, 4],
  [6, 6, 5], [7, 7, 6], [8, 8, 7], [9, 9, 8], [10, 10, 9],
  [11, 12, 9], [13, 14, 10], [15, 16, 11], [17, 18, 12],
  [19, 21, 13], [22, 24, 14], [25, 27, 15], [28, 30, 16],
  [31, 35, 17], [36, 39, 18], [40, 45, 19], [46, 51, 20],
  [52, 59, 21], [60, 67, 22], [68, 78, 23], [79, 92, 24],
  [93, 110, 25], [111, 120, 26], [121, 166, 27], [167, 214, 28],
  [215, 295, 29], [296, 455, 30], [456, 920, 31], [921, Infinity, 32],
]

function getNspireSampleSize(total: number): number {
  for (const [min, max, n] of NSPIRE_SAMPLING) {
    if (total >= min && total <= max) return n
  }
  return 32
}

function pickRandomUnits(allUnits: string[], count: number): string[] {
  const shuffled = [...allUnits].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function UnitSelectionModal({ isOpen, onClose, onContinue, totalUnits = 20 }: UnitSelectionModalProps) {
  const sampleSize = useMemo(() => getNspireSampleSize(totalUnits), [totalUnits])

  // Generate all unit names for the property
  const allUnits = useMemo(
    () => Array.from({ length: totalUnits }, (_, i) => `Unit ${String(i + 1).padStart(3, '0')}`),
    [totalUnits]
  )

  const [selectedUnits, setSelectedUnits] = useState<string[]>([])

  // Reset selection when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedUnits([])
    }
  }, [isOpen])

  const allSelected = allUnits.length > 0 && selectedUnits.length === allUnits.length

  const handleUnitToggle = (unit: string) => {
    setSelectedUnits(prev =>
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    )
  }

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedUnits([])
    } else {
      setSelectedUnits([...allUnits])
    }
  }

  const handleRandomSelection = () => {
    const picked = pickRandomUnits(allUnits, sampleSize)
    setSelectedUnits(picked)
  }

  const handleContinue = () => {
    if (selectedUnits.length === 0) {
      toast.error("Please select at least one unit to continue", { position: "top-right" })
      return
    }
    onContinue(selectedUnits)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 font-lexend animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-slate-200/80 shadow-xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 border border-transparent hover:border-slate-200 transition-all z-10"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 mb-2 pr-8 tracking-tight">
            Select Units for Inspection
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            Choose the units you want to include in your inspection. You can select individual units or use random selection.
          </p>
        </div>

        {/* Select All + Random Selection buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <Button
            onClick={handleSelectAll}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 text-xs sm:text-sm rounded-xl font-bold border-0 shadow-sm shadow-teal-600/10 transition-colors"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </Button>
          <Button
            onClick={handleRandomSelection}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2.5 text-xs sm:text-sm rounded-xl font-bold border-0 shadow-sm shadow-rose-500/10 transition-colors"
          >
            Random Selection
          </Button>
        </div>

        {/* Selected Count */}
        <div className="text-center mb-4">
          <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider bg-slate-50 border border-slate-100 px-3.5 py-1.5 rounded-lg inline-block">
            Selected: <span className="text-teal-600 font-extrabold">{selectedUnits.length}</span> of {allUnits.length} units
          </span>
        </div>

        {/* Units Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
          {allUnits.map((unit) => (
            <div
              key={unit}
              onClick={() => handleUnitToggle(unit)}
              className={`
                p-4 rounded-2xl border cursor-pointer transition-all text-center text-xs sm:text-sm font-bold select-none
                ${selectedUnits.includes(unit)
                  ? 'border-teal-500 bg-teal-50/40 text-teal-700'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-teal-500/30 hover:bg-teal-50/10 shadow-sm'
                }
              `}
            >
              {unit}
              {selectedUnits.includes(unit) && (
                <div className="mt-1.5 flex justify-center">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center pt-4 border-t border-slate-100">
          <Button
            onClick={handleContinue}
            disabled={selectedUnits.length === 0}
            className="w-full sm:w-auto px-10 sm:px-16 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-md shadow-teal-600/10 transition-all"
          >
            Continue with {selectedUnits.length} Unit{selectedUnits.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </div>
  )
}
