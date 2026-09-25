import React from 'react';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockOpportunities } from '@/services/mockData';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Link } from 'react-router-dom';

export function Home() {
  const featured = mockOpportunities[0];
  const recent = mockOpportunities.slice(1, 4);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-4 block">
              OPPORTUNITIES, WITHOUT THE SEARCH
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              Find the support you're eligible for.
            </h1>
            <p className="text-xl text-secondary mb-8 leading-relaxed max-w-lg">
              Discover scholarships, financial assistance, and government schemes created to support women and girl students.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/explore">Explore Opportunities</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative h-[500px] w-full rounded-3xl overflow-hidden bg-background-alt border border-border">
            {/* Abstract composition replacing giant illustration */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent p-8">
              <div className="w-full h-full border border-border/50 rounded-2xl bg-white/50 backdrop-blur-sm p-6 flex flex-col gap-4 shadow-sm relative overflow-hidden">
                <div className="w-3/4 h-8 bg-gray-100 rounded mb-4" />
                <div className="w-full h-24 bg-gray-50 rounded" />
                <div className="w-5/6 h-24 bg-gray-50 rounded" />
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent/5 rounded-full blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border bg-background-alt py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-secondary">
            <ShieldCheck className="w-4 h-4 text-success" />
            Verified opportunities
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <CheckCircle2 className="w-4 h-4" />
            Official sources
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <CheckCircle2 className="w-4 h-4" />
            Eligibility checked
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Calendar className="w-4 h-4" />
            Deadline tracked
          </div>
        </div>
      </section>

      {/* Search/Filter Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8 text-primary">What are you looking for?</h2>
        <div className="bg-card p-2 rounded-2xl shadow-sm border border-border flex items-center">
          <div className="flex-grow px-4 py-3">
            <input 
              type="text" 
              placeholder="Search scholarships, schemes, education support..." 
              className="w-full bg-transparent border-none focus:outline-none text-lg text-primary placeholder:text-gray-400"
            />
          </div>
          <Button className="rounded-xl px-8 py-3">Search</Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {['Undergraduate', 'Postgraduate', 'Skill Development', 'Financial Support'].map(tag => (
            <span key={tag} className="px-4 py-2 rounded-full border border-border text-sm text-secondary hover:border-gray-300 cursor-pointer transition-colors bg-card">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Featured Opportunity */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-card rounded-3xl border border-border overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <span className="text-xs font-bold tracking-wider text-accent uppercase mb-3">Featured Opportunity</span>
              <h2 className="text-3xl font-bold mb-4">{featured.title}</h2>
              <p className="text-lg text-secondary mb-8">{featured.description}</p>
              <Button size="lg" className="w-fit" asChild>
                <Link to={`/opportunity/${featured.slug}`}>View details</Link>
              </Button>
            </div>
            <div className="bg-background-alt p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-border flex flex-col justify-center gap-8">
              <div>
                <p className="text-sm text-secondary mb-1">Benefit</p>
                <p className="text-xl font-semibold tabular-nums">{featured.benefits}</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Eligibility</p>
                <p className="text-xl font-semibold">{featured.eligibility_text}</p>
              </div>
              <div>
                <p className="text-sm text-secondary mb-1">Deadline</p>
                <p className="text-xl font-semibold tabular-nums">Closing soon</p>
              </div>
              <div className="pt-6 border-t border-border">
                <a href={featured.official_application_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors">
                  Apply on official portal <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-bold text-primary">Explore opportunities</h2>
          <Link to="/explore" className="text-sm font-medium text-accent hover:text-accent-hover transition-colors flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map(opp => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>
    </div>
  );
}
