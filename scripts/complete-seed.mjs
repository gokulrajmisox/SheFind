import fs from 'node:fs';

const file = process.argv[2] || 'supabase/opportunities.seed.json';
const records = JSON.parse(fs.readFileSync(file, 'utf8'));
const addition = {
  title: 'National Overseas Scholarship',
  slug: 'national-overseas-scholarship',
  organization: 'Department of Social Justice and Empowerment, Government of India',
  description: 'Financial assistance for eligible students from specified disadvantaged communities to pursue higher studies abroad.',
  type: 'Scholarship',
  category: 'Scholarships',
  subcategory: 'Overseas higher education',
  state: 'India',
  district: null,
  education_level: 'Postgraduate, doctoral and post-doctoral study abroad',
  gender_eligibility: 'All genders',
  min_age: null,
  max_age: null,
  income_limit: null,
  benefit: 'Tuition, maintenance and related overseas study support; amount varies by current guidelines',
  eligibility_text: 'Applicants from the communities and academic backgrounds covered by the current scheme guidelines who meet the income, admission and other eligibility conditions.',
  documents_required: ['Identity proof', 'Community certificate', 'Income certificate', 'Admission or offer letter', 'Academic marksheets', 'Bank details'],
  application_start_date: null,
  application_deadline: null,
  official_source_url: 'https://socialjustice.gov.in/',
  official_application_url: 'https://scholarships.gov.in/',
  status: 'active',
  verification_status: 'needs_review',
  _source_note: 'Official Department of Social Justice and Empowerment scheme family; verify the current cycle and application route before publishing a deadline.'
};
if (records.some(record => record.slug === addition.slug)) throw new Error('National Overseas Scholarship already exists');
records.push(addition);
fs.writeFileSync(file, JSON.stringify(records, null, 2) + '\n');
console.log(`Added ${addition.title}; total records: ${records.length}`);
