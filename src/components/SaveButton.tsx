import { useEffect, useState } from 'react';
import { Bookmark } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/auth/useAuth';

export function SaveButton({ opportunityId, initialSaved = false }: { opportunityId: string; initialSaved?: boolean }) {
  const { user } = useAuth();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!user) { setSaved(false); return () => { mounted = false; }; }
    supabase.from('saved_opportunities').select('id').eq('user_id', user.id).eq('opportunity_id', opportunityId).maybeSingle().then(({ data }) => { if (mounted) setSaved(Boolean(data)); });
    return () => { mounted = false; };
  }, [user, opportunityId]);

  const toggleSave = async (event: React.MouseEvent) => {
    event.preventDefault(); event.stopPropagation();
    if (!user || loading) { if (!user) window.location.assign('/login'); return; }
    setLoading(true);
    if (saved) await supabase.from('saved_opportunities').delete().eq('user_id', user.id).eq('opportunity_id', opportunityId);
    else await supabase.from('saved_opportunities').insert({ user_id: user.id, opportunity_id: opportunityId });
    setSaved(value => !value); setLoading(false);
  };

  return <button onClick={toggleSave} disabled={loading} className="card-save" aria-label={`${saved ? 'Remove from saved' : 'Save opportunity'} ${opportunityId}`}><Bookmark size={14} strokeWidth={1.8} fill={saved ? 'currentColor' : 'none'} /></button>;
}
