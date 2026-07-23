import type { Metadata } from 'next'
import ProfessionalRoofInspections from './RoofInspectionsClient'

export const metadata: Metadata = {
  title: 'Professional Guide For Roof Inspections US',
  description: 'Learn why professional roof inspections matter, common issues they uncover, and how they protect your property.',
}

export default function Page() {
  return <ProfessionalRoofInspections />
}
