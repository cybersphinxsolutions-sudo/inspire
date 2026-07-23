import type { Metadata } from 'next'
import ProfessionalHomeInspectionServices from './HomeInspectionClient'

export const metadata: Metadata = {
  title: 'What to Expect and Why Home Inspection Matter',
  description: 'Learn why professional home inspections are critical in real estate transactions, what inspectors evaluate, and how they protect your investment.',
}

export default function Page() {
  return <ProfessionalHomeInspectionServices />
}
