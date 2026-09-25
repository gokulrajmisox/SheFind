import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import type { Opportunity } from '@/services/opportunities';
import { DeadlineBadge } from './DeadlineBadge';
import { SaveButton } from './SaveButton';

function displayDate(value: string | null) { return value ? format(parseISO(value), 'dd MMM yyyy') : 'Deadline not announced'; }

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return <Link to={`/opportunity/${opportunity.slug}`} className="opportunity-card">
    <div className="card-topline"><span className="card-org">{opportunity.organization || 'Official programme'}</span><SaveButton opportunityId={opportunity.id} /></div>
    <h3 className="card-title">{opportunity.title}</h3>
    <p className="card-description">{opportunity.description || 'Official support programme. Review the eligibility and application details on the source portal.'}</p>
    <div className="card-facts">
      {opportunity.benefit && <div className="card-fact"><span>Benefit</span><span>{opportunity.benefit}</span></div>}
      {opportunity.eligibility_text && <div className="card-fact"><span>For</span><span>{opportunity.eligibility_text}</span></div>}
      {opportunity.application_deadline && <div className="card-fact"><span>Deadline</span><span>{displayDate(opportunity.application_deadline)}</span></div>}
    </div>
    <div className="card-bottom"><DeadlineBadge deadline={opportunity.application_deadline} /><span className="card-link">View details <ArrowUpRight size={14} /></span></div>
  </Link>;
}
