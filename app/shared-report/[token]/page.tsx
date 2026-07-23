"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { inspectionsAPI } from "@/lib/api"

interface Finding {
  id?: string
  category: string
  severity: string
  title: string
  description: string
  location?: string
  recommendedAction?: string
  estimatedCost?: string
}

interface SharedReport {
  _id: string
  inspectionId: string
  property: {
    _id: string
    name: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  unit?: {
    _id: string
    unitNumber: string
  }
  inspector: {
    fullName: string
  }
  scheduledDate: string
  inspectionDate?: string
  completedDate?: string
  status: string
  result?: string
  score?: number
  complianceScore?: number
  deficiencies?: any[]
  findings?: Finding[]
  notes?: string
  createdAt: string
}

export default function SharedReportPage() {
  const params = useParams()
  const token = params.token as string
  const [report, setReport] = useState<SharedReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSharedReport()
  }, [token])

  const fetchSharedReport = async () => {
    try {
      setLoading(true)
      const response = await inspectionsAPI.getSharedReport(token)
      setReport(response.inspection)
    } catch (error: any) {
      console.error('Failed to fetch shared report:', error)
      setError(error.message || 'Failed to load shared report')
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': case 'life-threatening': return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' }
      case 'major': case 'severe': return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500' }
      case 'minor': case 'moderate': return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' }
      case 'observation': case 'low': return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-500' }
    }
  }

  const getConditionColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-green-500', text: 'text-white', label: 'Excellent' }
    if (score >= 80) return { bg: 'bg-green-400', text: 'text-white', label: 'Good' }
    if (score >= 70) return { bg: 'bg-yellow-500', text: 'text-white', label: 'Fair' }
    if (score >= 60) return { bg: 'bg-orange-500', text: 'text-white', label: 'Poor' }
    return { bg: 'bg-red-500', text: 'text-white', label: 'Critical' }
  }

  const categoryLabels: Record<string, string> = {
    structural: 'Structural',
    electrical: 'Electrical',
    plumbing: 'Plumbing',
    safety: 'Safety',
    hvac: 'HVAC',
    exterior: 'Exterior',
    interior: 'Interior',
    appliances: 'Appliances',
    site: 'Site',
    'building-exterior': 'Building Exterior',
    'building-systems': 'Building Systems',
    'common-areas': 'Common Areas',
    unit: 'Unit',
    other: 'Other',
    General: 'General'
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  }

  const handleDownloadPDF = async () => {
    if (!report) return

    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF()

      // Header
      doc.setFontSize(20)
      doc.setTextColor(13, 106, 141)
      doc.text('NSPIRE INSPECTION REPORT', 20, 25)

      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35)

      // Property Information
      doc.setFontSize(14)
      doc.setTextColor(0)
      doc.text('PROPERTY INFORMATION', 20, 50)
      
      doc.setFontSize(10)
      let y = 60
      const propertyDetails = [
        ['Property:', report.property?.name || 'N/A'],
        ['Address:', `${report.property?.address || ''}, ${report.property?.city || ''}, ${report.property?.state || ''} ${report.property?.zipCode || ''}`],
        ['Unit:', report.unit?.unitNumber || 'All Units'],
        ['Inspector:', report.inspector?.fullName || 'N/A'],
        ['Inspection Date:', report.inspectionDate ? formatDate(report.inspectionDate) : formatDate(report.scheduledDate)],
        ['Compliance Score:', `${report.complianceScore || report.score || 0}%`],
        ['Overall Condition:', getConditionColor(report.complianceScore || report.score || 0).label]
      ]

      propertyDetails.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold')
        doc.text(label, 20, y)
        doc.setFont('helvetica', 'normal')
        doc.text(String(value), 70, y)
        y += 8
      })

      // Summary Statistics
      const findings = report.findings || report.deficiencies || []
      const criticalCount = findings.filter((f: any) => f.severity === 'critical' || f.severity === 'life-threatening').length
      const majorCount = findings.filter((f: any) => f.severity === 'major' || f.severity === 'severe').length
      const minorCount = findings.filter((f: any) => f.severity === 'minor' || f.severity === 'moderate').length

      y += 10
      doc.setFont('helvetica', 'bold')
      doc.text('SUMMARY STATISTICS', 20, y)
      y += 10

      const summaryStats = [
        ['Total Issues Found:', findings.length.toString()],
        ['Critical Issues:', criticalCount.toString()],
        ['Major Issues:', majorCount.toString()],
        ['Minor Issues:', minorCount.toString()]
      ]

      summaryStats.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold')
        doc.text(label, 20, y)
        doc.setFont('helvetica', 'normal')
        doc.text(value, 70, y)
        y += 8
      })

      // Findings by Category
      if (findings.length > 0) {
        const groupedFindings = findings.reduce((acc: any, finding: any) => {
          const category = finding.category || 'other'
          if (!acc[category]) acc[category] = []
          acc[category].push(finding)
          return acc
        }, {})

        y += 10
        doc.setFont('helvetica', 'bold')
        doc.text('FINDINGS BY CATEGORY', 20, y)
        y += 10

        Object.entries(groupedFindings).forEach(([category, categoryFindings]: [string, any]) => {
          if (y > 250) {
            doc.addPage()
            y = 20
          }

          doc.setFont('helvetica', 'bold')
          doc.text(`${categoryLabels[category] || category} (${categoryFindings.length})`, 20, y)
          y += 8

          categoryFindings.forEach((finding: any, index: number) => {
            if (y > 270) {
              doc.addPage()
              y = 20
            }

            doc.setFont('helvetica', 'normal')
            const title = finding.title || finding.description || `Finding ${index + 1}`
            const severity = finding.severity ? `[${finding.severity.toUpperCase()}]` : ''
            doc.text(`  • ${severity} ${title}`, 25, y)
            y += 6

            if (finding.description && finding.description !== finding.title) {
              const description = doc.splitTextToSize(finding.description, 160)
              doc.text(description, 30, y)
              y += description.length * 4
            }

            if (finding.location) {
              doc.setFont('helvetica', 'italic')
              doc.text(`    Location: ${finding.location}`, 30, y)
              y += 6
            }

            if (finding.recommendedAction) {
              doc.setFont('helvetica', 'normal')
              const action = doc.splitTextToSize(`    Action: ${finding.recommendedAction}`, 160)
              doc.text(action, 30, y)
              y += action.length * 4
            }

            y += 3
          })
          y += 5
        })
      }

      // Notes
      if (report.notes) {
        if (y > 250) {
          doc.addPage()
          y = 20
        }
        
        y += 10
        doc.setFont('helvetica', 'bold')
        doc.text('ADDITIONAL NOTES', 20, y)
        y += 10
        doc.setFont('helvetica', 'normal')
        const splitNotes = doc.splitTextToSize(report.notes, 170)
        doc.text(splitNotes, 20, y)
      }

      // Footer
      doc.setFontSize(8)
      doc.setTextColor(150)
      doc.text(`Report ID: ${report.inspectionId}`, 20, 285)
      doc.text('NSPIRE Property Compliance System', 150, 285)

      doc.save(`NSPIRE_Inspection_Report_${report.inspectionId}.pdf`)
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('Failed to generate PDF report')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006795] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inspection report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">
            {error || 'This shared report link may have expired or is invalid.'}
          </p>
        </Card>
      </div>
    )
  }

  const findings = report.findings || report.deficiencies || []
  const complianceScore = report.complianceScore || report.score || 0
  const conditionStyle = getConditionColor(complianceScore)
  
  // Group findings by category
  const groupedFindings = findings.reduce((acc: any, finding: any) => {
    const category = finding.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(finding)
    return acc
  }, {})

  // Calculate summary stats
  const criticalCount = findings.filter((f: any) => f.severity === 'critical' || f.severity === 'life-threatening').length
  const majorCount = findings.filter((f: any) => f.severity === 'major' || f.severity === 'severe').length
  const minorCount = findings.filter((f: any) => f.severity === 'minor' || f.severity === 'moderate').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">NSPIRE Inspection Report</h1>
              <p className="text-sm text-gray-600 mt-1">Report ID: {report.inspectionId}</p>
            </div>
            <button
              onClick={handleDownloadPDF}
              className="bg-[#006795] hover:bg-[#0A5670] text-white px-4 md:px-6 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Property Information Card */}
        <Card className="p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">{report.property?.name || 'Unknown Property'}</h2>
          <p className="text-sm md:text-base text-gray-600 mb-2">
            {report.property?.address}, {report.property?.city}, {report.property?.state} {report.property?.zipCode}
          </p>
          <p className="text-xs md:text-sm text-gray-500">
            Report Date: {report.inspectionDate ? formatDate(report.inspectionDate) : formatDate(report.scheduledDate)}
          </p>
        </Card>

        {/* Compliance Score Card */}
        <Card className="p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-blue-50 border-4 border-[#006795] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#006795]">{complianceScore}%</div>
                  <div className="text-xs text-gray-600">Compliance</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Overall Condition</p>
              <div className={`px-4 py-2 rounded-full ${conditionStyle.bg} ${conditionStyle.text}`}>
                <span className="font-bold">{conditionStyle.label}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Summary Statistics */}
        <Card className="p-4 md:p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">{findings.length}</div>
              <div className="text-xs md:text-sm text-gray-600">Total Issues</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-red-600">{criticalCount}</div>
              <div className="text-xs md:text-sm text-gray-600">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-orange-600">{majorCount}</div>
              <div className="text-xs md:text-sm text-gray-600">Major</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-blue-600">{minorCount}</div>
              <div className="text-xs md:text-sm text-gray-600">Minor</div>
            </div>
          </div>
        </Card>

        {/* Findings by Category */}
        {Object.entries(groupedFindings).map(([category, categoryFindings]: [string, any]) => (
          <Card key={category} className="p-4 md:p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {categoryLabels[category] || category}
              </h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                {categoryFindings.length}
              </span>
            </div>
            
            <div className="space-y-4">
              {categoryFindings.map((finding: any, index: number) => {
                const severityStyle = getSeverityColor(finding.severity)
                return (
                  <div key={finding.id || index} className="bg-white border rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${severityStyle.bg} ${severityStyle.text}`}>
                        {(finding.severity || 'unknown').toUpperCase()}
                      </span>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {finding.title || finding.description || `Finding ${index + 1}`}
                    </h4>
                    
                    {finding.description && finding.description !== finding.title && (
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                        {finding.description}
                      </p>
                    )}
                    
                    {finding.location && (
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">{finding.location}</span>
                      </div>
                    )}
                    
                    {finding.recommendedAction && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-3">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-medium text-blue-800">Recommended Action</p>
                            <p className="text-sm text-blue-700 mt-1">{finding.recommendedAction}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {finding.estimatedCost && (
                      <div className="flex items-center gap-2 mt-3">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        <span className="text-sm font-medium text-green-600">Est. Cost: {finding.estimatedCost}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        ))}

        {findings.length === 0 && (
          <Card className="p-8 text-center">
            <div className="text-green-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-600 mb-2">No Issues Found</h3>
            <p className="text-gray-600">The property passed inspection with no deficiencies identified.</p>
          </Card>
        )}

        {/* Additional Notes */}
        {report.notes && (
          <Card className="p-4 md:p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Notes</h3>
            <p className="text-sm md:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
              {report.notes}
            </p>
          </Card>
        )}

        {/* Inspector Information */}
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Inspector Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Inspector</label>
              <p className="text-sm text-gray-900">{report.inspector?.fullName || 'N/A'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Inspected</label>
              <p className="text-sm text-gray-900">{report.unit?.unitNumber || 'All Units'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}