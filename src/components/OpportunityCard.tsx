import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { ArrowUpRight, Bookmark } from 'lucide-react';
import type { Opportunity } from '@/services/mockData';
import { DeadlineBadge } from './DeadlineBadge';

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link to={`/opportunity/${opportunity.slug}`} className="opportunity-card">
      <div className="card-topline">
        <span className="card-org">{opportunity.organization}</span>
        <span className="card-save" aria-label="Save opportunity"><Bookmark size={14} strokeWidth={1.8} /></span>
      </div>
      <h3 className="card-title">{opportunity.title}</h3>
      <p className="card-description">{opportunity.description}</p>
      <div className="card-facts">
        <div className="card-fact"><span>Benefit</span><span>{opportunity.benefits}</span></div>
        <div className="card-fact"><span>For</span><span>{opportunity.eligibility_text}</span></div>
        <div className="card-fact"><span>Deadline</span><span>{format(parseISO(opportunity.application_deadline), 'dd MMM yyyy')}</span></div>
      </div>
      <div className="card-bottom"><DeadlineBadge deadline={opportunity.application_deadline} /><span className="card-link">View details <ArrowUpRight size={14} /></span></div>
    </Link>
  );
}
