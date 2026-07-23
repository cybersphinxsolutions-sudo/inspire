"use client"

import { useEffect } from 'react'
import { handleOAuthCallback } from '@/lib/social-auth'

export default function OAuthCallback() {
    useEffect(() => {
        handleOAuthCallback()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E8F4F8]">
            <div className="text-center">
                <div className="animate-spin h-12 w-12 border-4 border-[#006795] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-700 font-semibold">Completing authentication...</p>
                <p className="text-gray-500 text-sm mt-2">This window will close automatically.</p>
            </div>
        </div>
    )
}
