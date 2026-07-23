import type { Metadata } from 'next'
import HomeInspectionServicesForREProfessionals from './RealEstateServicesClient'

export const metadata: Metadata = {
  title: 'Home Inspection Services for Real Estate Professionals',
  description: 'How professional home inspection services help real estate agents build trust, facilitate smoother transactions, and provide clarity to buyers and sellers.',
}

export default function Page() {
  return <HomeInspectionServicesForREProfessionals />
}
