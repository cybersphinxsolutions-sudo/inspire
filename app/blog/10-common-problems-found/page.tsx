import type { Metadata } from 'next'
import CommonProblemsFound from './CommonProblemsClient'

export const metadata: Metadata = {
  title: '10 Common Problems Found During Home Inspections',
  description: 'Explore the 10 most frequent issues discovered during home inspections, from roofing and foundation problems to electrical and plumbing hazards.',
}

export default function Page() {
  return <CommonProblemsFound />
}
