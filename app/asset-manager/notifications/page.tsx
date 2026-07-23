"use client"

import { useState, useEffect } from "react"
import AssetManagerDashboardLayout from "@/components/AssetManagerDashboardLayout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "react-toastify"

interface Notification {
  _id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: string
  link?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setIsLoading(true)
      const mockNotifications: Notification[] = [
        {
          _id: '1',
          title: 'Asset Update',
          message: 'New assets have been registered in your portfolio.',
          type: 'info',
          isRead: false,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'Maintenance Alert',
          message: 'Scheduled maintenance for Building A is due next week.',
          type: 'warning',
          isRead: false,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          _id: '3',
          title: 'Compliance Update',
          message: 'All assets are now compliant with the latest regulations.',
          type: 'success',
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString()
        }
      ]
      setNotifications(mockNotifications)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      toast.error('Failed to load notifications')
    } finally {
      setIsLoading(false)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n))
    toast.success('Marked as read', { position: 'top-right' })
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
    toast.success('All notifications marked as read', { position: 'top-right' })
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n._id !== id))
    toast.success('Notification deleted', { position: 'top-right' })
  }

  const clearAll = () => {
    setNotifications([])
    toast.success('All notifications cleared', { position: 'top-right' })
  }

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'success': return { bg: 'bg-green-50', border: 'border-l-green-500', icon: 'text-green-500' }
      case 'warning': return { bg: 'bg-yellow-50', border: 'border-l-yellow-500', icon: 'text-yellow-500' }
      case 'error': return { bg: 'bg-red-50', border: 'border-l-red-500', icon: 'text-red-500' }
      default: return { bg: 'bg-blue-50', border: 'border-l-blue-500', icon: 'text-blue-500' }
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
      case 'warning':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
      case 'error':
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
      default:
        return <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead
    if (filter === 'read') return n.isRead
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <AssetManagerDashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && <Button onClick={markAllAsRead} variant="outline" className="text-sm">Mark all as read</Button>}
            {notifications.length > 0 && <Button onClick={clearAll} variant="outline" className="text-sm text-red-600 border-red-300 hover:bg-red-50">Clear all</Button>}
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as 'all' | 'unread' | 'read')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? 'bg-[#0D7FA8] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? notifications.length : f === 'unread' ? unreadCount : notifications.length - unreadCount})
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <Card className="p-8 text-center text-gray-500">Loading notifications...</Card>
          ) : filteredNotifications.length === 0 ? (
            <Card className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">No notifications</p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => {
              const styles = getTypeStyles(notification.type)
              return (
                <Card key={notification._id} className={`p-4 border-l-4 ${styles.border} ${styles.bg} ${!notification.isRead ? 'ring-1 ring-blue-200' : ''} transition-all hover:shadow-md`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 ${styles.icon}`}>{getTypeIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`font-semibold text-gray-900 ${!notification.isRead ? 'text-blue-900' : ''}`}>
                            {notification.title}
                            {!notification.isRead && <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-2">{formatDate(notification.createdAt)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notification.isRead && (
                            <button onClick={() => markAsRead(notification._id)} className="p-1.5 hover:bg-white rounded-lg transition-colors" title="Mark as read">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </button>
                          )}
                          <button onClick={() => deleteNotification(notification._id)} className="p-1.5 hover:bg-white rounded-lg transition-colors" title="Delete">
                            <svg className="w-4 h-4 text-gray-500 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      </div>
    </AssetManagerDashboardLayout>
  )
}
