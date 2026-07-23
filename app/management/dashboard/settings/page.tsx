"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ManagementDashboardLayout from "@/components/ManagementDashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "react-toastify"

export default function Settings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("+1 (555) 123-4567")
  const [role, setRole] = useState("")
  const [language, setLanguage] = useState("English US")
  const [timezone, setTimezone] = useState("GMT +05:00")

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setName(user.fullName || '')
        setEmail(user.email || '')
        setRole(getRoleDisplayName(user.role) || '')
      } catch (e) {
        console.error('Error parsing user data:', e)
      }
    }
  }, [])

  const getRoleDisplayName = (role: string) => {
    const roleNames: { [key: string]: string } = {
      'property-manager': 'Property Manager',
      'management': 'Management',
      'supervisor': 'Supervisor',
      'inspector': 'Inspector',
      'other': 'Other Manager',
      'asset-manager': 'Asset Manager'
    }
    return roleNames[role] || role
  }

  // Notification preferences
  const [inspectionReminders, setInspectionReminders] = useState({ email: true, inApp: false })
  const [reportCompletion, setReportCompletion] = useState({ email: false, inApp: true })
  const [followUpTasks, setFollowUpTasks] = useState({ email: false, inApp: false })
  const [systemUpdates, setSystemUpdates] = useState({ email: true, inApp: false })

  // Security settings
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully!", { position: "top-right" })
  }

  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved successfully!", { position: "top-right" })
  }

  const handleSaveSecurity = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!", { position: "top-right" })
      return
    }
    toast.success("Security settings updated successfully!", { position: "top-right" })
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleLogout = (deviceId: string) => {
    toast.success("Device logged out successfully!", { position: "top-right" })
  }

  return (
    <ManagementDashboardLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account, organization, and app preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <Card className="bg-white rounded-lg shadow-sm p-4 h-fit">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "profile" ? "bg-[#F84B5F] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "notifications" ? "bg-[#F84B5F] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Notification Preferences
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === "security" ? "bg-[#F84B5F] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Security Settings
              </button>
            </nav>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Profile Settings</h2>
                    <p className="text-sm text-gray-600">Manage personal details of the logged-in user.</p>
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#006795] hover:bg-[#0A5670] text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Save Changes
                  </Button>
                </div>

                {/* Profile Picture */}
                <div className="flex items-center gap-4 mb-8">
                  <Image
                    src="https://ui-avatars.com/api/?name=John+Doe&background=0D6A8D&color=fff&size=100"
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <Button
                    onClick={() => toast.info("Change profile picture feature coming soon!", { position: "top-right" })}
                    className="bg-white border border-[#006795] text-[#006795] hover:bg-[#E8F4F8] px-4 py-2 rounded-lg font-medium"
                  >
                    Change Photo
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                      <button className="ml-2 text-[#006795] text-xs font-normal hover:underline">Edit</button>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                      <button className="ml-2 text-[#006795] text-xs font-normal hover:underline">Edit</button>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone
                      <button className="ml-2 text-[#006795] text-xs font-normal hover:underline">Edit</button>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Role
                      <button className="ml-2 text-[#006795] text-xs font-normal hover:underline">Edit</button>
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    >
                      <option value="English US">English US</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Timezone</label>
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                    >
                      <option value="GMT +05:00">GMT +05:00</option>
                      <option value="GMT -05:00">GMT -05:00</option>
                      <option value="GMT +00:00">GMT +00:00</option>
                    </select>
                  </div>
                </div>
              </Card>
            )}

            {/* Notification Preferences */}
            {activeTab === "notifications" && (
              <Card className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Notification Preferences</h2>
                    <p className="text-sm text-gray-600">Manage in-app and email notifications.</p>
                  </div>
                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-[#006795] hover:bg-[#0A5670] text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Save Changes
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Inspection Reminders */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Inspection Reminders</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={inspectionReminders.email}
                            onChange={(e) => setInspectionReminders({ ...inspectionReminders, email: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={inspectionReminders.inApp}
                            onChange={(e) => setInspectionReminders({ ...inspectionReminders, inApp: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">In-App</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Report Completion Alerts */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Report Completion Alerts</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reportCompletion.email}
                            onChange={(e) => setReportCompletion({ ...reportCompletion, email: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={reportCompletion.inApp}
                            onChange={(e) => setReportCompletion({ ...reportCompletion, inApp: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">In-App</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Follow-Up Tasks */}
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Follow-Up Tasks</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={followUpTasks.email}
                            onChange={(e) => setFollowUpTasks({ ...followUpTasks, email: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={followUpTasks.inApp}
                            onChange={(e) => setFollowUpTasks({ ...followUpTasks, inApp: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">In-App</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* System Updates */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">System Updates</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemUpdates.email}
                            onChange={(e) => setSystemUpdates({ ...systemUpdates, email: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">Email</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={systemUpdates.inApp}
                            onChange={(e) => setSystemUpdates({ ...systemUpdates, inApp: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700">In-App</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">Security Settings 🔒</h2>
                    <p className="text-sm text-gray-600">Manage passwords, sessions, and 2FA.</p>
                  </div>
                  <Button
                    onClick={handleSaveSecurity}
                    className="bg-[#006795] hover:bg-[#0A5670] text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Save Changes
                  </Button>
                </div>

                {/* Change Password */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">Change Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Old Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your old password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#006795]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2FA Toggle */}
                <div className="mb-8 pb-8 border-b">
                  <h3 className="font-semibold text-gray-900 mb-4">2FA Toggle</h3>
                  <Button
                    onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled)
                      toast.success(twoFactorEnabled ? "2FA disabled" : "2FA enabled", { position: "top-right" })
                    }}
                    className={`${
                      twoFactorEnabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                    } text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    {twoFactorEnabled ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
                  </Button>
                </div>

                {/* Session Management */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Session Management</h3>
                  <p className="text-sm text-gray-600 mb-4">Review And Manage Devices Currently Logged In To Your NSPIRE Account.</p>
                  
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Web Browser</p>
                          <p className="text-sm text-gray-600">Chrome On Windows • 192.168.0.15</p>
                          <p className="text-sm text-gray-600">NewYork NY • 2 hours ago</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleLogout("device1")}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Log Out
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ManagementDashboardLayout>
  )
}
