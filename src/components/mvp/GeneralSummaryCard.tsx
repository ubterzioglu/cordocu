'use client'

import AccordionCard from '../ui/AccordionCard'
import SectionHeading from '../ui/SectionHeading'

interface GeneralSummaryCardProps {
  content: string
}

export default function GeneralSummaryCard({ content }: GeneralSummaryCardProps) {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="GENEL ÖZET"
        description="MVP hedefleri ve stratejik özet"
      />
      
      <AccordionCard
        defaultOpenId="general-summary"
        items={[
          {
            id: 'general-summary',
            title: 'MVP Hedefleri ve Stratejik Özet',
            accentColor: '#A142F4',
            children: (
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}