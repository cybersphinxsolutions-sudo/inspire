import type { Metadata } from 'next'
import BlogIndex from './BlogIndexClient'

export const metadata: Metadata = {
  title: 'Blog | Nspire Home Inspections',
  description: 'Read the latest articles and insights on home inspections, property maintenance, and real estate from the experts at Nspire.',
}

export default function Page() {
  return <BlogIndex />
}
