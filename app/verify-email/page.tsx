"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

// ── EMAIL VERIFICATION BYPASSED FOR TESTING ──
// This page now immediately redirects to the correct login page.

function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const role = searchParams.get("role") || ""

    useEffect(() => {
        const loginPath =
            role === 'management' ? '/management/login' :
            role === 'other'      ? '/other/login' :
            '/login'
        router.replace(loginPath)
    }, [role, router])

    return (
        <div className="min-h-screen bg-[#E8F4F8] flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin h-10 w-10 border-4 border-[#006795] border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-gray-600 font-medium text-lg">Account created! Redirecting to login...</p>
            </div>
        </div>
    )
}

export default function VerifyEmail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#E8F4F8]" />}>
            <VerifyEmailContent />
        </Suspense>
    )
}
