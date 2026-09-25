import { addDays, subDays } from 'date-fns';

export type Opportunity = {
  id: string;
  title: string;
  slug: string;
  organization: string;
  description: string;
  category: string;
  benefits: string;
  eligibility_text: string;
  application_deadline: string;
  official_application_url: string;
  official_source_url: string;
  status: 'active' | 'draft' | 'inactive';
  verification_status: 'verified' | 'pending' | 'rejected';
};

const today = new Date();

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Pragati Scholarship for Girls',
    slug: 'pragati-scholarship',
    organization: 'AICTE',
    description: 'Scholarship scheme implemented by AICTE aimed at providing assistance for advancement of girls pursuing technical education.',
    category: 'Scholarships',
    benefits: '₹50,000 per annum',
    eligibility_text: 'Women • Undergraduate • Technical Degree',
    application_deadline: addDays(today, 3).toISOString(), // Closing soon
    official_application_url: 'https://scholarships.gov.in',
    official_source_url: 'https://www.aicte-india.org',
    status: 'active',
    verification_status: 'verified'
  },
  {
    id: '2',
    title: 'Kalpana Chawla Memorial Scholarship',
    slug: 'kalpana-chawla-scholarship',
    organization: 'Govt. of Himachal Pradesh',
    description: 'Financial support for meritorious girl students who have passed 12th standard.',
    category: 'Scholarships',
    benefits: '₹15,000 per annum',
    eligibility_text: 'Women • 12th Pass • Himachal Pradesh',
    application_deadline: addDays(today, 15).toISOString(),
    official_application_url: 'https://hpepass.cgg.gov.in/',
    official_source_url: 'https://education.hp.gov.in/',
    status: 'active',
    verification_status: 'verified'
  },
  {
    id: '3',
    title: 'Post-Graduate Indira Gandhi Scholarship for Single Girl Child',
    slug: 'ig-scholarship-single-girl',
    organization: 'UGC',
    description: 'To support higher education of single girl child in non-professional courses.',
    category: 'Higher Education',
    benefits: '₹36,200 per annum',
    eligibility_text: 'Women • Single Girl Child • PG Student',
    application_deadline: addDays(today, 45).toISOString(),
    official_application_url: 'https://scholarships.gov.in',
    official_source_url: 'https://ugc.ac.in',
    status: 'active',
    verification_status: 'verified'
  },
  {
    id: '4',
    title: 'Women Entrepreneurship Support Scheme',
    slug: 'women-entrepreneurship',
    organization: 'Ministry of MSME',
    description: 'Financial assistance and training for women seeking to start their own businesses.',
    category: 'Entrepreneurship',
    benefits: 'Up to ₹5,00,000 loan at low interest',
    eligibility_text: 'Women • 18-45 years • Skill certificate',
    application_deadline: subDays(today, 2).toISOString(), // Closed
    official_application_url: 'https://msme.gov.in',
    official_source_url: 'https://msme.gov.in',
    status: 'active',
    verification_status: 'verified'
  }
];

export const mockCategories = [
  'All',
  'Scholarships',
  'Government Schemes',
  'Education',
  'Financial Support',
  'Skill Development',
  'Entrepreneurship'
];
