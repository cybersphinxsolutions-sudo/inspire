"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import OtherDashboardLayout from "@/components/OtherDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"
import { usersAPI } from "@/lib/api"

export default function OtherUsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOtherUsers()
  }, [])

  const fetchOtherUsers = async () => {
    try {
      setLoading(true)
      const response = await usersAPI.getOtherUsers()
      if (response.success) {
        // Filter out inspectors - show only non-inspector users
        const nonInspectors = (response.users || []).filter(
          (user: any) => user.role !== 'inspector'
        )
        setUsers(nonInspectors)
      }
    } catch (error: any) {
      console.error('Error loading other users:', error)
      toast.error('Failed to load users', { position: "top-right" })
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    // Filter users locally based on search query
    fetchOtherUsers()
    toast.info("Searching users...", { position: "top-right" })
  }

  const filteredUsers = users.filter(user => 
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "management":
        return "bg-purple-50 text-purple-700 border border-purple-200"
      case "supervisor":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200"
      case "property-manager":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200"
      case "asset-manager":
        return "bg-amber-50 text-amber-700 border border-amber-200"
      case "other":
        return "bg-slate-50 text-slate-700 border border-slate-200"
      default:
        return "bg-slate-50 text-slate-700 border border-slate-200"
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role?.toLowerCase()) {
      case "management":
        return "Management"
      case "supervisor":
        return "Supervisor"
      case "property-manager":
        return "Property Manager"
      case "asset-manager":
        return "Asset Manager"
      case "other":
        return "Other"
      default:
        return role || "User"
    }
  }

  return (
    <OtherDashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">Other Users</h1>
          <p className="text-slate-500 text-sm sm:text-base">View and manage system users and team members.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6 lg:mb-8">
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Users</p>
            <p className="text-3xl font-extrabold text-slate-900">{users.length}</p>
          </Card>
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Management</p>
            <p className="text-3xl font-extrabold text-slate-900">
              {users.filter(u => u.role === 'management').length}
            </p>
          </Card>
          <Card className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Supervisors</p>
            <p className="text-3xl font-extrabold text-slate-900">
              {users.filter(u => u.role === 'supervisor').length}
            </p>
          </Card>
        </div>

        {/* Search */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 sm:p-6 mb-6 lg:mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Search Users</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Name, Email or Role</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm transition-colors duration-200 bg-slate-50/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-lg font-bold transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-end">
              <Button
                onClick={handleSearch}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-sm hover:shadow transition-all duration-200"
              >
                Search
              </Button>
            </div>
          </div>
        </Card>

        {/* Users Grid */}
        <Card className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-900">All Users</h2>
            <span className="text-xs text-indigo-700 font-bold bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              {filteredUsers.length} users
            </span>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500 font-medium">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-medium">No users found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user._id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-sm">
                      {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 truncate text-sm sm:text-base">{user.fullName}</h3>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mt-2 ${getRoleColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Joined</span>
                      <span className="text-slate-700 font-medium">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </OtherDashboardLayout>
  )
}
