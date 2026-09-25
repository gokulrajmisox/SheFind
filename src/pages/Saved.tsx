import { useEffect, useState } from 'react';
import { Bell, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';
import { getSavedOpportunities } from '@/services/opportunities';
import type { Opportunity } from '@/services/opportunities';
import { OpportunityCard } from '@/components/OpportunityCard';

export function Saved() {
  const { user } = useAuth();
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (!user) { setLoading(false); return; } getSavedOpportunities(user.id).then(setSavedOpportunities).catch(() => setSavedOpportunities([])).finally(() => setLoading(false)); }, [user]);
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div className="flex items-center gap-3 mb-8 border-b border-border pb-6"><Bookmark className="w-8 h-8 text-primary" /><h1 className="text-3xl font-bold text-primary">Saved Opportunities</h1></div>{!user ? <div className="auth-message-card"><strong>Sign in to build your shortlist.</strong><span>Save opportunities and return to them whenever you need.</span><Link to="/login" className="text-cta">Sign in <span>→</span></Link></div> : loading ? <div className="auth-loading">Loading your saved opportunities…</div> : savedOpportunities.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{savedOpportunities.map(opp => <div key={opp.id} className="relative"><OpportunityCard opportunity={opp} /><button className="absolute top-4 right-16 p-2 rounded-full hover:bg-gray-100 transition-colors text-secondary hover:text-primary z-10 bg-white shadow-sm border border-border" title="Set reminder"><Bell className="w-4 h-4" /></button></div>)}</div> : <div className="text-center py-20 bg-card rounded-2xl border border-border"><Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-4" /><h2 className="text-xl font-semibold text-primary mb-2">No saved opportunities</h2><p className="text-secondary mb-6">Opportunities you save will appear here.</p><Link to="/explore" className="text-cta">Explore opportunities →</Link></div>}</div>;
}
