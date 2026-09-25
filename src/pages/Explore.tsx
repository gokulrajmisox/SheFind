import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { getOpportunities, OPPORTUNITY_CATEGORIES, type Opportunity } from '@/services/opportunities';
import { OpportunityCard } from '@/components/OpportunityCard';

const states = ['All India', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Telangana', 'Andhra Pradesh', 'Maharashtra', 'Gujarat', 'Rajasthan', 'West Bengal', 'Odisha', 'Uttar Pradesh', 'Madhya Pradesh', 'Jharkhand', 'Bihar', 'Delhi'];
const educationLevels = ['Any', 'School', 'Diploma', 'Undergraduate', 'Postgraduate', 'PhD'];

export function Explore() {
  const [params, setParams] = useSearchParams();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCategory = params.get('category') || 'All';
  const search = params.get('search') || '';
  const state = params.get('state') || 'All India';
  const educationLevel = params.get('education') || 'Any';
  const deadline = (params.get('deadline') || '') as 'week' | 'month' | 'later' | '';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError('');
    getOpportunities({ category: activeCategory, search, state, educationLevel, deadline: deadline || undefined, page, pageSize: 12 })
      .then(result => { if (!mounted) return; setOpportunities(current => page === 1 ? result.data : [...current, ...result.data]); setTotal(result.count); })
      .catch((queryError: Error) => { if (!mounted) return; setOpportunities([]); setTotal(0); setError(queryError.message || 'Unable to load opportunities.'); })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [activeCategory, search, state, educationLevel, deadline, page]);

  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'All' || value === 'All India' || value === 'Any') next.delete(key); else next.set(key, value);
    setPage(1);
    setParams(next);
  };

  return <div className="browse-shell">
    <div className="browse-heading"><div><span className="section-kicker">The opportunity library</span><h1>Find your next yes.</h1></div><p>Browse verified scholarships, schemes, and support programmes—thoughtfully organized for the path you are on.</p></div>
    <div className="browse-tools"><label className="browse-search"><Search size={16} /><input value={search} onChange={event => updateFilter('search', event.target.value)} type="text" placeholder="Search opportunities" aria-label="Search opportunities" /></label><button className="category-tab" onClick={() => setFiltersOpen(value => !value)} aria-label="Open filters"><SlidersHorizontal size={15} /></button></div>
    {filtersOpen && <div className="filter-panel"><label>State<select value={state} onChange={event => updateFilter('state', event.target.value)}>{states.map(item => <option key={item}>{item}</option>)}</select></label><label>Education<select value={educationLevel} onChange={event => updateFilter('education', event.target.value)}>{educationLevels.map(item => <option key={item}>{item}</option>)}</select></label><label>Deadline<select value={deadline} onChange={event => updateFilter('deadline', event.target.value)}><option value="">Any deadline</option><option value="week">Closing this week</option><option value="month">Closing this month</option><option value="later">Later</option></select></label></div>}
    <div className="category-tabs" style={{ marginTop: 28 }}>{OPPORTUNITY_CATEGORIES.map(category => <button key={category} onClick={() => updateFilter('category', category)} className={`category-tab ${activeCategory === category ? 'active' : ''}`}>{category}</button>)}</div>
    <div className="results-meta">Showing {opportunities.length ? 1 : 0}–{opportunities.length} of {total} opportunities</div>
    {error && <div className="auth-error" role="alert">Unable to load opportunities from Supabase: {error}</div>}
    <div className="opportunity-grid">{loading && page === 1 ? <p className="section-intro">Loading verified opportunities…</p> : opportunities.map(opp => <OpportunityCard key={opp.id} opportunity={opp} />)}</div>
    {!loading && !error && opportunities.length < total && <button className="load-more" onClick={() => setPage(value => value + 1)}>Load more opportunities</button>}
    {!loading && !error && !opportunities.length && <div className="auth-message-card">No verified opportunities match those filters.</div>}
  </div>;
}
