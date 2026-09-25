import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { mockOpportunities } from '@/services/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { format, parseISO } from 'date-fns';

export function OpportunityDetails() {
  const { slug } = useParams();
  const opportunity = mockOpportunities.find(o => o.slug === slug);

  if (!opportunity) {
    return <div className="p-20 text-center text-xl">Opportunity not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/explore" className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to opportunities
      </Link>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-secondary">{opportunity.organization}</span>
          <Badge variant="success">Open</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
          {opportunity.title}
        </h1>
        <p className="text-xl text-secondary leading-relaxed">
          {opportunity.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-4">At a glance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <p className="text-sm text-secondary mb-1">Benefit</p>
                <p className="font-semibold text-primary">{opportunity.benefits}</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Eligibility</p>
                <p className="font-semibold text-primary">{opportunity.eligibility_text}</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Deadline</p>
                <p className="font-semibold text-primary tabular-nums">
                  {format(parseISO(opportunity.application_deadline), 'dd MMMM yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Application mode</p>
                <p className="font-semibold text-primary">Online</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-4">Who can apply?</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary">Must be a female student</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary">Currently enrolled in an undergraduate degree</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary">Indian citizen</span>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-border pb-4">How to apply</h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-card text-secondary font-semibold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">1</div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
                  <h4 className="font-semibold text-primary mb-1">Check eligibility</h4>
                  <p className="text-sm text-secondary">Review all criteria carefully before starting.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-card text-secondary font-semibold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">2</div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
                  <h4 className="font-semibold text-primary mb-1">Prepare documents</h4>
                  <p className="text-sm text-secondary">Gather your ID, academic transcripts, and income certificate.</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-card text-secondary font-semibold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">3</div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-border bg-card shadow-sm">
                  <h4 className="font-semibold text-primary mb-1">Submit application</h4>
                  <p className="text-sm text-secondary">Visit the official portal and complete the process.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <h3 className="font-semibold text-primary mb-4 text-lg">Official Application</h3>
            <p className="text-sm text-secondary mb-6">
              You will be redirected to the official government portal to complete your application.
            </p>
            
            <Button size="lg" className="w-full mb-4" asChild>
              <a href={opportunity.official_application_url} target="_blank" rel="noopener noreferrer">
                Continue to official website
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-secondary mt-6 p-3 bg-gray-50 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Source verified by SheFind</span>
            </div>
            <div className="text-center mt-2">
              <a href={opportunity.official_source_url} className="text-xs text-gray-400 hover:underline">
                {new URL(opportunity.official_source_url).hostname}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
