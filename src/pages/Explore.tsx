import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { mockOpportunities, mockCategories } from '@/services/mockData';
import { OpportunityCard } from '@/components/OpportunityCard';
import { Button } from '@/components/ui/Button';

export function Explore() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredOpportunities = mockOpportunities.filter(opp => 
    activeCategory === 'All' ? true : opp.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-4">Explore opportunities</h1>
          <p className="text-secondary text-lg max-w-2xl">
            Browse through verified scholarships, schemes, and financial support programs tailored for you.
          </p>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            />
          </div>
          <Button variant="outline" className="px-3" aria-label="Filters">
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {mockCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-card border border-border text-secondary hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map(opp => (
          <OpportunityCard key={opp.id} opportunity={opp} />
        ))}
      </div>
    </div>
  );
}
