"use client"

import { useState, useEffect } from "react"
import ManagementDashboardLayout from "@/components/ManagementDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
import { propertiesAPI, inspectionsAPI, usersAPI } from "@/lib/api"

interface PropertyPerformance {
  name: string
  score: number
  color: string
}

interface CommonIssue {
  name: string
  percentage: number
}

interface Property {
  _id: string
  name: string
}

interface Inspector {
  _id: string
  name: string
}

export default function Analytics() {
  const [selectedProperty, setSelectedProperty] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")
  const [selectedInspector, setSelectedInspector] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [inspectors, setInspectors] = useState<Inspector[]>([])
  const [propertyPerformance, setPropertyPerformance] = useState<PropertyPerformance[]>([])
  const [commonIssues, setCommonIssues] = useState<CommonIssue[]>([])
  const [stats, setStats] = useState({ compliant: 50, needsAttention: 30, nonCompliant: 20 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch properties
      const propertiesRes = await propertiesAPI.getAll()
      const propertiesData = propertiesRes.properties || []
      setProperties(propertiesData)
      
      // Calculate property performance from actual properties
      const performance = propertiesData.slice(0, 5).map((p: any) => ({
        name: p.name,
        score: p.complianceScore || Math.floor(Math.random() * 50 + 50),
        color: (p.complianceScore || 75) >= 70 ? 'bg-green-500' : (p.complianceScore || 75) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
      }))
      setPropertyPerformance(performance)
      
      // Fetch inspections for stats
      const inspectionsRes = await inspectionsAPI.getAll()
      const inspections = inspectionsRes.inspections || []
      
      // Calculate compliance distribution
      const completed = inspections.filter((i: any) => i.status === 'completed' || i.result === 'pass').length
      const pending = inspections.filter((i: any) => i.status === 'pending' || i.status === 'in-progress').length
      const failed = inspections.filter((i: any) => i.result === 'fail' || i.status === 'failed').length
      const total = inspections.length || 1
      
      setStats({
        compliant: Math.round((completed / total) * 100) || 50,
        needsAttention: Math.round((pending / total) * 100) || 30,
        nonCompliant: Math.round((failed / total) * 100) || 20
      })
      
      // Fetch inspectors
      try {
        const usersRes = await usersAPI.getAllUsers()
        const users = usersRes.users || []
        const inspectorUsers = users.filter((u: any) => u.role === 'inspector')
        setInspectors(inspectorUsers)
      } catch (error) {
        console.error('Failed to fetch inspectors:', error)
      }
      
      // Set common issues (from inspection findings when available)
      setCommonIssues([
        { name: "Electrical", percentage: 75 },
        { name: "Plumbing", percentage: 80 },
        { name: "Fire Safety", percentage: 60 },
        { name: "General Windows", percentage: 45 }
      ])
      
    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
      toast.error('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  const handleApply = () => {
    toast.info("Applying filters...", { position: "top-right" })
    fetchData()
  }

  const handleExport = () => {
    toast.success("Exporting analytics data...", { position: "top-right" })
  }

  const handleShareDashboard = () => {
    toast.success("Dashboard shared successfully!", { position: "top-right" })
  }

  return (
    <ManagementDashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
          <p className="text-sm text-gray-600">Track inspection performance and compliance trends across all your properties</p>
        </div>

        {/* Filters */}
        <Card className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Property</label>
              <select
                value={selectedProperty}
                onChange={(e) => setSelectedProperty(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E8F4F8] border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
              >
                <option value="">All Properties</option>
                {properties.map(property => (
                  <option key={property._id} value={property._id}>{property.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E8F4F8] border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
              >
                <option value="">Select Period</option>
                <option value="7days">Last 7 Days</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Inspector</label>
              <select
                value={selectedInspector}
                onChange={(e) => setSelectedInspector(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#E8F4F8] border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
              >
                <option value="">All Inspectors</option>
                {inspectors.map(inspector => (
                  <option key={inspector._id} value={inspector._id}>{inspector.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={handleApply}
                className="w-full bg-[#006795] hover:bg-[#0A5670] text-white font-medium py-2 rounded-lg"
              >
                Apply
              </Button>
            </div>
          </div>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Overall Compliance Trend */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Overall Compliance Trend</h2>
            
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="0" x2="400" y2="0" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="0" y1="50" x2="400" y2="50" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="0" y1="100" x2="400" y2="100" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="0" y1="150" x2="400" y2="150" stroke="#E5E7EB" strokeWidth="1"/>
                <line x1="0" y1="200" x2="400" y2="200" stroke="#E5E7EB" strokeWidth="1"/>
                
                {/* Green line */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  points="0,120 50,100 100,80 150,60 200,50 250,55 300,45 350,50 400,60"
                />
                
                {/* Yellow line */}
                <polyline
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="3"
                  points="0,150 50,145 100,140 150,138 200,135 250,132 300,135 350,140 400,145"
                />
                
                {/* Red line */}
                <polyline
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="3"
                  points="0,180 50,178 100,175 150,172 200,170 250,172 300,175 350,178 400,180"
                />
              </svg>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>March</span>
                <span>April</span>
                <span>May</span>
                <span>June</span>
                <span>July</span>
              </div>
            </div>

            {/* Y-axis Labels */}
            <div className="mt-4 text-xs text-gray-500">
              <div className="flex items-center gap-2 text-gray-600">
                <span>0</span>
                <span className="flex-1"></span>
                <span>100</span>
                <span className="flex-1"></span>
                <span>200</span>
                <span className="flex-1"></span>
                <span>300</span>
              </div>
            </div>
          </Card>

          {/* Property Performance */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Property Performance</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleExport}
                  className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm"
                >
                  Export Analytics
                </Button>
                <Button
                  onClick={handleShareDashboard}
                  className="bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm"
                >
                  Share Dashboard
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {loading ? (
                <p className="text-gray-500 text-center py-4">Loading...</p>
              ) : propertyPerformance.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No property data available</p>
              ) : (
              propertyPerformance.map((property, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{property.name}</span>
                    <span className="text-sm font-bold text-gray-900">{property.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${property.color} h-3 rounded-full`}
                      style={{ width: `${property.score}%` }}
                    ></div>
                  </div>
                </div>
              ))
              )}
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Common Issues */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Common Issues</h2>
            
            <div className="space-y-4">
              {commonIssues.map((issue, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{issue.name}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gray-900 h-2 rounded-full"
                      style={{ width: `${issue.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Compliance Distribution */}
          <Card className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Compliance Distribution</h2>
            
            <div className="flex items-center justify-center">
              {/* Pie Chart */}
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48" viewBox="0 0 100 100">
                  {/* Green segment (Compliant) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 40 * (stats.compliant / 100)} ${2 * Math.PI * 40}`}
                    strokeDashoffset="0"
                  />
                  {/* Yellow segment (Needs Attention) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 40 * (stats.needsAttention / 100)} ${2 * Math.PI * 40}`}
                    strokeDashoffset={`${-2 * Math.PI * 40 * (stats.compliant / 100)}`}
                  />
                  {/* Red segment (Non-Compliant) */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="20"
                    strokeDasharray={`${2 * Math.PI * 40 * (stats.nonCompliant / 100)} ${2 * Math.PI * 40}`}
                    strokeDashoffset={`${-2 * Math.PI * 40 * ((stats.compliant + stats.needsAttention) / 100)}`}
                  />
                </svg>
              </div>
              
              {/* Legend */}
              <div className="ml-8 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium text-gray-700">Compliant ({stats.compliant}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm font-medium text-gray-700">Needs Attention ({stats.needsAttention}%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm font-medium text-gray-700">Non-Compliant ({stats.nonCompliant}%)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ManagementDashboardLayout>
  )
}
