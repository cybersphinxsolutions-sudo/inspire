import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact Us | Nspire Home Inspections',
  description: 'Get in touch with Nspire for professional home inspection services. Schedule an inspection, ask about our services, or get support from our expert team.',
}

export default function Page() {
  return <ContactClient />
}
