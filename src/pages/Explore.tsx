import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { mockOpportunities, mockCategories } from '@/services/mockData';
import { OpportunityCard } from '@/components/OpportunityCard';

export function Explore() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredOpportunities = mockOpportunities.filter(opp => activeCategory === 'All' ? true : opp.category === activeCategory);

  return (
    <div className="browse-shell">
      <div className="browse-heading">
        <div><span className="section-kicker">The opportunity library</span><h1>Find your next yes.</h1></div>
        <p>Browse verified scholarships, schemes, and support programmes—thoughtfully organized for the path you are on.</p>
      </div>
      <div className="browse-tools">
        <label className="browse-search"><Search size={16} /><input type="text" placeholder="Search opportunities" aria-label="Search opportunities" /></label>
        <button className="category-tab" aria-label="Open filters"><SlidersHorizontal size={15} /></button>
      </div>
      <div className="category-tabs" style={{ marginTop: 28 }}>
        {mockCategories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`category-tab ${activeCategory === category ? 'active' : ''}`}>{category}</button>)}
      </div>
      <div className="opportunity-grid">{filteredOpportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}</div>
    </div>
  );
}
