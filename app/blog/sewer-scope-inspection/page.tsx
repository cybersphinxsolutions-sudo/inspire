import type { Metadata } from 'next'
import SewerScopeBlogPost from './SewerScopeClient'

export const metadata: Metadata = {
  title: 'Sewer Scope Inspection Guide for Homeowners US',
  description: 'Learn what a sewer scope inspection is, how it works, and why it is essential for home buyers and owners to prevent costly pipe repairs and backups.',
}

export default function Page() {
  return <SewerScopeBlogPost />
}
