import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import type { Opportunity } from '@/services/mockData';
import { DeadlineBadge } from './DeadlineBadge';
import { SaveButton } from './SaveButton';

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link 
      to={`/opportunity/${opportunity.slug}`}
      className="group block bg-card rounded-2xl p-6 border border-border hover:shadow-sm transition-all duration-200"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-secondary mb-1">{opportunity.organization}</p>
          <h3 className="text-lg font-semibold text-primary leading-tight group-hover:text-accent transition-colors">
            {opportunity.title}
          </h3>
        </div>
        <SaveButton opportunityId={opportunity.id} />
      </div>

      <p className="text-secondary text-sm line-clamp-2 mb-6">
        {opportunity.description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-start">
          <span className="text-sm text-secondary w-24 flex-shrink-0">Benefit</span>
          <span className="text-sm font-medium text-primary">{opportunity.benefits}</span>
        </div>
        <div className="flex items-start">
          <span className="text-sm text-secondary w-24 flex-shrink-0">Eligibility</span>
          <span className="text-sm font-medium text-primary">{opportunity.eligibility_text}</span>
        </div>
        <div className="flex items-start">
          <span className="text-sm text-secondary w-24 flex-shrink-0">Deadline</span>
          <span className="text-sm font-medium text-primary tabular-nums">
            {format(parseISO(opportunity.application_deadline), 'dd MMM yyyy')}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <DeadlineBadge deadline={opportunity.application_deadline} />
        <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
          View details <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
