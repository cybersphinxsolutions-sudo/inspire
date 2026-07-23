import type { Metadata } from 'next'
import WhatIsSewerScopeInspection from './SewerScopeGuideClient'

export const metadata: Metadata = {
  title: 'What is a Sewer Scope Inspection',
  description: 'Everything you need to know about sewer scope inspections, including how they work, common problems detected, and why they are vital for property health.',
}

export default function Page() {
  return <WhatIsSewerScopeInspection />
}
