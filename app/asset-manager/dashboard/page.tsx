"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AssetManagerDashboardLayout from "@/components/AssetManagerDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
import { assetsAPI } from "@/lib/api"

interface Asset {
  _id: string;
  assetId: string;
  name: string;
  category: string;
  status: string;
  location: string;
  value: number;
  lastMaintenanceDate?: string;
}

interface StatsData {
  total: number;
  active: number;
  maintenance: number;
  totalValue: number;
}

export default function AssetManagerDashboard() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState<StatsData>({
    total: 0,
    active: 0,
    maintenance: 0,
    totalValue: 0
  })

  const fetchAssets = async (search?: string) => {
    try {
      setLoading(true)
      const params: any = { limit: 50 }
      if (search) {
        params.search = search
      }
      const response = await assetsAPI.getAll(params)
      if (response.success) {
        setAssets(response.assets || [])
      }
    } catch (error) {
      console.error('Error fetching assets:', error)
      // Use mock data if API fails
      setAssets([
        {
          _id: "1",
          assetId: "AST-001",
          name: "Server Room Equipment",
          category: "IT",
          status: "Active",
          location: "Building A",
          value: 15000
        },
        {
          _id: "2",
          assetId: "AST-002",
          name: "HVAC System",
          category: "Infrastructure",
          status: "Active",
          location: "Building B",
          value: 25000
        },
        {
          _id: "3",
          assetId: "AST-003",
          name: "Security Cameras",
          category: "Security",
          status: "Maintenance",
          location: "Building A",
          value: 8500
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await assetsAPI.getStats()
      if (response.success) {
        setStatsData({
          total: response.stats.totalAssets || 0,
          active: response.stats.active || 0,
          maintenance: response.stats.maintenance || 0,
          totalValue: response.stats.totalValue || 0
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      setStatsData({
        total: 342,
        active: 298,
        maintenance: 24,
        totalValue: 2500000
      })
    }
  }

  useEffect(() => {
    fetchAssets()
    fetchStats()
  }, [])

  const handleSearch = () => {
    fetchAssets(searchQuery)
    toast.info("Searching assets...", { position: "top-right" })
  }

  const stats = [
    { label: "Total Assets", value: statsData.total.toString() },
    { label: "Active Assets", value: statsData.active.toString() },
    { label: "Under Maintenance", value: statsData.maintenance.toString() },
    { label: "Total Value", value: `$${(statsData.totalValue / 1000000).toFixed(1)}M` }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AssetManagerDashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Asset Manager Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">Monitor and manage your assets</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-8">
          <Button
            onClick={() => {
              toast.info("Adding new asset...", { position: "top-right" })
              router.push('/asset-manager/assets')
            }}
            className="w-full sm:w-auto bg-[#006795] hover:bg-[#00567a] text-white font-semibold px-6 py-3 rounded-lg text-base shadow-sm hover:shadow-md transition-all duration-200"
          >
            Add New Asset
          </Button>
          <Button
            onClick={() => {
              toast.info("Generating report...", { position: "top-right" })
            }}
            className="w-full sm:w-auto bg-[#F84B5F] hover:bg-[#EE3646] text-white font-semibold px-6 py-3 rounded-lg text-base shadow-sm hover:shadow-md transition-all duration-200"
          >
            Generate Report
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 lg:mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Assets</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Name or ID</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by asset name or ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006795] focus:border-transparent text-sm transition-colors duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg font-bold transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-[#006795] hover:bg-[#0A5670] text-white font-semibold py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md transition-all duration-200"
              >
                Search
              </Button>
            </div>
          </div>
        </Card>

        {/* Assets Table */}
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Assets Inventory</h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {assets.length} assets
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Asset ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Value</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">Loading assets...</td>
                  </tr>
                ) : assets.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-500">No assets found.</td>
                  </tr>
                ) : (
                assets.map((asset) => (
                  <tr 
                    key={asset._id} 
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-4">
                      <span className="text-blue-600 font-medium text-sm bg-blue-50 px-2 py-1 rounded">
                        {asset.assetId}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{asset.name}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{asset.category}</td>
                    <td className="py-4 px-4 text-gray-600">{asset.location}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900 font-semibold">${asset.value?.toLocaleString() || '0'}</td>
                    <td className="py-4 px-4">
                      <Button
                        onClick={() => toast.info(`Viewing asset ${asset.assetId}`, { position: "top-right" })}
                        className="bg-[#006795] hover:bg-[#0A5670] text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {loading ? (
              <div className="p-8 text-center text-gray-500">Loading assets...</div>
            ) : assets.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No assets found.</div>
            ) : (
            assets.map((asset) => (
              <Card key={asset._id} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-2 py-1 rounded">
                        {asset.assetId}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(asset.status)}`}>
                        {asset.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{asset.name}</h3>
                    <p className="text-gray-600 text-sm">{asset.category}</p>
                  </div>
                  <Button
                    onClick={() => toast.info(`Viewing asset ${asset.assetId}`, { position: "top-right" })}
                    className="bg-[#006795] hover:bg-[#0A5670] text-white font-semibold px-3 py-2 rounded-lg text-xs shadow-sm hover:shadow-md transition-all duration-200 whitespace-nowrap ml-2"
                  >
                    View
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 text-xs block mb-1">Location</span>
                    <p className="font-semibold text-gray-900 text-base">{asset.location}</p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-lg">
                    <span className="text-gray-500 text-xs block mb-1">Value</span>
                    <p className="font-semibold text-gray-900 text-base">${asset.value?.toLocaleString() || '0'}</p>
                  </div>
                </div>
              </Card>
            ))
            )}
          </div>
        </Card>
      </div>
    </AssetManagerDashboardLayout>
  )
}
