import { supabase } from '@/lib/supabase';

export const OPPORTUNITY_CATEGORIES = ['All', 'Scholarships', 'Government Schemes', 'Education', 'Financial Support', 'Skill Development', 'Entrepreneurship'] as const;
export type OpportunityCategory = typeof OPPORTUNITY_CATEGORIES[number];
export type OpportunityStatus = 'active' | 'upcoming' | 'closed' | 'inactive';
export type VerificationStatus = 'verified' | 'needs_review' | 'pending' | 'rejected';

export type Opportunity = {
  id: string;
  title: string;
  slug: string;
  organization: string | null;
  description: string | null;
  type: string | null;
  category: string;
  subcategory: string | null;
  state: string | null;
  district: string | null;
  education_level: string | null;
  gender_eligibility: string | null;
  min_age: number | null;
  max_age: number | null;
  income_limit: number | null;
  benefit: string | null;
  benefits: string | null;
  eligibility_text: string | null;
  documents_required: string[] | null;
  application_start_date: string | null;
  application_deadline: string | null;
  official_source_url: string | null;
  official_application_url: string | null;
  status: OpportunityStatus;
  verification_status: VerificationStatus;
  verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type OpportunityFilters = {
  category?: string;
  search?: string;
  state?: string;
  educationLevel?: string;
  deadline?: 'week' | 'month' | 'later';
  eligibility?: string;
  page?: number;
  pageSize?: number;
  includeUnverified?: boolean;
};

const publicFields = '*';

function normalizeOpportunity(row: Record<string, unknown>): Opportunity {
  const rawCategory = row.category;
  const category = typeof rawCategory === 'string' && rawCategory ? rawCategory : 'Education';
  return {
    id: String(row.id), title: String(row.title ?? ''), slug: String(row.slug ?? ''),
    organization: (row.organization as string | null) ?? null, description: (row.description as string | null) ?? null,
    type: (row.type as string | null) ?? null, category, subcategory: (row.subcategory as string | null) ?? null,
    state: (row.state as string | null) ?? null, district: (row.district as string | null) ?? null,
    education_level: (row.education_level as string | null) ?? null, gender_eligibility: (row.gender_eligibility as string | null) ?? null,
    min_age: (row.min_age as number | null) ?? null, max_age: (row.max_age as number | null) ?? null,
    income_limit: (row.income_limit as number | null) ?? null, benefit: (row.benefit as string | null) ?? (row.benefits as string | null) ?? null,
    benefits: (row.benefits as string | null) ?? (row.benefit as string | null) ?? null,
    eligibility_text: (row.eligibility_text as string | null) ?? null, documents_required: (row.documents_required as string[] | null) ?? null,
    application_start_date: (row.application_start_date as string | null) ?? null, application_deadline: (row.application_deadline as string | null) ?? null,
    official_source_url: (row.official_source_url as string | null) ?? null, official_application_url: (row.official_application_url as string | null) ?? null,
    status: (row.status as OpportunityStatus) ?? 'active', verification_status: (row.verification_status as VerificationStatus) ?? 'needs_review',
    verified_at: (row.verified_at as string | null) ?? null, created_at: (row.created_at as string | null) ?? null, updated_at: (row.updated_at as string | null) ?? null,
  };
}

function startOfToday() { const date = new Date(); date.setHours(0, 0, 0, 0); return date.toISOString().slice(0, 10); }
function addDays(days: number) { const date = new Date(); date.setDate(date.getDate() + days); return date.toISOString().slice(0, 10); }
function escapeSearchTerm(value: string) { return value.trim().replace(/[\\,()*]/g, ' ').replace(/\s+/g, ' '); }

export async function getOpportunities(filters: OpportunityFilters = {}) {
  const pageSize = filters.pageSize ?? 12;
  const page = filters.page ?? 1;
  let query = supabase.from('opportunities').select(publicFields, { count: 'exact' });
  if (!filters.includeUnverified) query = query.eq('status', 'active').eq('verification_status', 'verified');
  if (filters.category && filters.category !== 'All') query = query.eq('category', filters.category);
  if (filters.state && filters.state !== 'All India') query = query.ilike('state', `%${filters.state}%`);
  if (filters.educationLevel && filters.educationLevel !== 'Any') query = query.ilike('education_level', `%${filters.educationLevel}%`);
  if (filters.eligibility) query = query.ilike('eligibility_text', `%${filters.eligibility}%`);
  if (filters.search?.trim()) { const term = escapeSearchTerm(filters.search); if (term) query = query.or(`title.ilike.%${term}%,organization.ilike.%${term}%,description.ilike.%${term}%,eligibility_text.ilike.%${term}%,category.ilike.%${term}%,subcategory.ilike.%${term}%`); }
  if (filters.deadline === 'week') query = query.gte('application_deadline', startOfToday()).lte('application_deadline', addDays(7));
  if (filters.deadline === 'month') query = query.gte('application_deadline', startOfToday()).lte('application_deadline', addDays(30));
  if (filters.deadline === 'later') query = query.gt('application_deadline', addDays(30));
  const from = (page - 1) * pageSize;
  const { data, error, count } = await query.order('application_deadline', { ascending: true, nullsFirst: false }).range(from, from + pageSize - 1);
  if (error) throw error;
  return { data: (data ?? []).map(row => normalizeOpportunity(row as Record<string, unknown>)), count: count ?? 0, page, pageSize };
}

export async function getOpportunityBySlug(slug: string, includeUnverified = false) {
  let query = supabase.from('opportunities').select(publicFields).eq('slug', slug);
  if (!includeUnverified) query = query.eq('status', 'active').eq('verification_status', 'verified');
  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data ? normalizeOpportunity(data as Record<string, unknown>) : null;
}

export async function getSavedOpportunities(userId: string) {
  const { data, error } = await supabase.from('saved_opportunities').select('opportunity_id, opportunities(*)').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(row => row.opportunities ? normalizeOpportunity(row.opportunities as unknown as Record<string, unknown>) : null).filter((item): item is Opportunity => Boolean(item));
}

export async function getAdminOpportunitySummary() {
  const { data, error } = await supabase.from('opportunities').select('id,title,organization,application_deadline,status,verification_status,updated_at').order('updated_at', { ascending: false }).limit(8);
  if (error) throw error;
  const { count: total } = await supabase.from('opportunities').select('id', { count: 'exact', head: true });
  const { count: active } = await supabase.from('opportunities').select('id', { count: 'exact', head: true }).eq('status', 'active');
  const { count: pending } = await supabase.from('opportunities').select('id', { count: 'exact', head: true }).eq('verification_status', 'needs_review');
  const { count: drafts } = await supabase.from('opportunities').select('id', { count: 'exact', head: true }).eq('status', 'upcoming');
  return { rows: data ?? [], total: total ?? 0, active: active ?? 0, pending: pending ?? 0, drafts: drafts ?? 0 };
}
