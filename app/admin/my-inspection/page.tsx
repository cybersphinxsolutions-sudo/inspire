"use client"

import { useState } from "react"
import AdminDashboardLayout from "@/components/AdminDashboardLayout"
import { toast } from "react-toastify"

// Mock inspection data
const mockInspections = [
  {
    _id: "1",
    inspectionId: "INS-2024-0001",
    property: { name: "PROJECT INDEPENDENCE", propertyId: "800002257", city: "Granada Hills", state: "California", address: "10454 AMESTOY AVE" },
    inspector: { fullName: "John Smith", email: "john.smith@example.com" },
    status: "completed",
    result: "pass",
    score: 92,
    scheduledDate: "2024-12-10",
    completedDate: "2024-12-10"
  },
  {
    _id: "2",
    inspectionId: "INS-2024-0002",
    property: { name: "GLENOAKS TOWNHOMES", propertyId: "800001568", city: "Sylmar", state: "California", address: "14300 FOOTHILL BLVD" },
    inspector: { fullName: "Sarah Johnson", email: "sarah.j@example.com" },
    status: "in-progress",
    result: null,
    score: null,
    scheduledDate: "2024-12-14",
    completedDate: null
  },
  {
    _id: "3",
    inspectionId: "INS-2024-0003",
    property: { name: "SAN FERNANDO GARDENS", propertyId: "CA004000422", city: "Pacoima", state: "California", address: "LEHIGH" },
    inspector: { fullName: "Mike Davis", email: "mike.d@example.com" },
    status: "scheduled",
    result: null,
    score: null,
    scheduledDate: "2024-12-20",
    completedDate: null
  },
  {
    _id: "4",
    inspectionId: "INS-2024-0004",
    property: { name: "PASADENA HEIGHTS", propertyId: "800003112", city: "Pasadena", state: "California", address: "1200 E COLORADO BLVD" },
    inspector: { fullName: "John Smith", email: "john.smith@example.com" },
    status: "completed",
    result: "fail",
    score: 65,
    scheduledDate: "2024-12-08",
    completedDate: "2024-12-08"
  },
  {
    _id: "5",
    inspectionId: "INS-2024-0005",
    property: { name: "WESTWOOD APARTMENTS", propertyId: "800004521", city: "Los Angeles", state: "California", address: "10920 WILSHIRE BLVD" },
    inspector: { fullName: "Emily Brown", email: "emily.b@example.com" },
    status: "completed",
    result: "pass",
    score: 88,
    scheduledDate: "2024-12-05",
    completedDate: "2024-12-05"
  },
  {
    _id: "6",
    inspectionId: "INS-2024-0006",
    property: { name: "VALLEY VILLAGE ESTATES", propertyId: "800005678", city: "Valley Village", state: "California", address: "5400 LAUREL CANYON BLVD" },
    inspector: { fullName: "Sarah Johnson", email: "sarah.j@example.com" },
    status: "scheduled",
    result: null,
    score: null,
    scheduledDate: "2024-12-22",
    completedDate: null
  }
]

export default function AdminMyInspection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [inspectorFilter, setInspectorFilter] = useState("")

  // Get unique inspectors for filter
  const inspectors = [...new Set(mockInspections.map(i => i.inspector.fullName))]

  // Filter inspections
  const filteredInspections = mockInspections.filter(inspection => {
    const matchesSearch = searchTerm === "" || 
      inspection.property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.inspectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inspection.inspector.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "" || inspection.status === statusFilter
    const matchesInspector = inspectorFilter === "" || inspection.inspector.fullName === inspectorFilter

    return matchesSearch && matchesStatus && matchesInspector
  })

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'completed': 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      'scheduled': 'bg-yellow-100 text-yellow-800',
      'cancelled': 'bg-red-100 text-red-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const getResultBadge = (result: string | null) => {
    if (!result) return null
    const styles: Record<string, string> = {
      'pass': 'bg-green-500 text-white',
      'fail': 'bg-red-500 text-white'
    }
    return styles[result] || 'bg-gray-500 text-white'
  }

  const handleViewDetails = (id: string) => {
    toast.info(`Viewing inspection details for ${id}`, { position: "top-right" })
  }

  const handleExportReport = () => {
    toast.success("Exporting inspections report...", { position: "top-right" })
  }

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-[#E8F4F8] p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">All Inspections</h1>
            <p className="text-gray-600 mt-1">View and manage all inspector inspections</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-[#1E3A5F]">{mockInspections.length}</div>
              <div className="text-sm text-gray-600">Total Inspections</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-green-600">{mockInspections.filter(i => i.status === 'completed').length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-blue-600">{mockInspections.filter(i => i.status === 'in-progress').length}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="text-3xl font-bold text-yellow-600">{mockInspections.filter(i => i.status === 'scheduled').length}</div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Search by property, ID, or inspector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-sm"
              />
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-sm bg-white"
              >
                <option value="">All Statuses</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={inspectorFilter}
                onChange={(e) => setInspectorFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-sm bg-white"
              >
                <option value="">All Inspectors</option>
                {inspectors.map(inspector => (
                  <option key={inspector} value={inspector}>{inspector}</option>
                ))}
              </select>

              <button
                onClick={handleExportReport}
                className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#152A45] text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Export Report
              </button>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1E3A5F] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Inspection ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Property</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Inspector</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Result</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Score</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Scheduled Date</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInspections.map((inspection) => (
                  <tr key={inspection._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{inspection.inspectionId}</td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-medium text-gray-900">{inspection.property.name}</div>
                      <div className="text-xs text-gray-500">{inspection.property.city}, {inspection.property.state}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{inspection.inspector.fullName}</div>
                      <div className="text-xs text-gray-500">{inspection.inspector.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(inspection.status)}`}>
                        {inspection.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {inspection.result ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getResultBadge(inspection.result)}`}>
                          {inspection.result}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {inspection.score !== null ? (
                        <span className={`font-semibold ${inspection.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                          {inspection.score}%
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(inspection.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleViewDetails(inspection.inspectionId)}
                        className="text-[#1E3A5F] hover:text-[#152A45] font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInspections.length === 0 && (
              <div className="p-8 text-center text-gray-500">No inspections found matching your criteria.</div>
            )}
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredInspections.map((inspection) => (
              <div key={inspection._id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-gray-900">{inspection.inspectionId}</div>
                    <div className="text-sm text-gray-600">{inspection.property.name}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(inspection.status)}`}>
                    {inspection.status.replace('-', ' ')}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Inspector:</span>
                    <span className="text-gray-900">{inspection.inspector.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-900">{inspection.property.city}, {inspection.property.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="text-gray-900">{new Date(inspection.scheduledDate).toLocaleDateString()}</span>
                  </div>
                  {inspection.result && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Result:</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase ${getResultBadge(inspection.result)}`}>
                        {inspection.result}
                      </span>
                    </div>
                  )}
                  {inspection.score !== null && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Score:</span>
                      <span className={`font-semibold ${inspection.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                        {inspection.score}%
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleViewDetails(inspection.inspectionId)}
                  className="mt-4 w-full py-2 bg-[#1E3A5F] hover:bg-[#152A45] text-white font-medium rounded-lg transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            ))}
            {filteredInspections.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
                No inspections found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}
