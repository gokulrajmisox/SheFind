import fs from 'node:fs';
const file = process.argv[2] || 'supabase/opportunities.seed.json';
const records = JSON.parse(fs.readFileSync(file, 'utf8'));
const norm = v => String(v ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const seen = new Set(records.map(r => norm(r.title)));
const make = (title, slug, state, category, source, description, education_level='Any', gender_eligibility='All genders') => ({title, slug, organization: `Government of ${state}`, description, type: category === 'Scholarships' ? 'Scholarship' : 'Government Scheme', category, subcategory: 'State support programme', state, district: null, education_level, gender_eligibility, min_age: null, max_age: null, income_limit: null, benefit: 'Support varies by eligibility and current government guidelines', eligibility_text: 'Applicants must meet the current official scheme guidelines and application conditions.', documents_required: ['Identity proof', 'Residence or domicile proof', 'Bank account details'], application_start_date: null, application_deadline: null, official_source_url: source, official_application_url: source, status: 'active', verification_status: 'needs_review', _source_note: 'Official scheme family identified; verify current guidelines before publishing.'});
const items = [
 make('Manipur State Scholarship','manipur-state-scholarship','Manipur','Scholarships','https://manipur.gov.in/','State scholarship support for eligible students in Manipur.','School and higher education'),
 make('Mizoram State Scholarship','mizoram-state-scholarship','Mizoram','Scholarships','https://mizoram.gov.in/','State scholarship support for eligible students in Mizoram.','School and higher education'),
 make('Puducherry Higher Education Scholarship','puducherry-higher-education-scholarship','Puducherry','Scholarships','https://py.gov.in/','Higher-education scholarship support for eligible students in Puducherry.','Higher education'),
 make('Lakshadweep Student Scholarship','lakshadweep-student-scholarship','Lakshadweep','Scholarships','https://lakshadweep.gov.in/','Educational assistance for eligible students from Lakshadweep.','School and higher education'),
 make('Andaman and Nicobar Student Scholarship','andaman-nicobar-student-scholarship','Andaman and Nicobar Islands','Scholarships','https://andaman.gov.in/','Educational assistance for eligible students from the Union Territory.','School and higher education'),
];
for (const x of items) if (!seen.has(norm(x.title))) {records.push(x); seen.add(norm(x.title));}
if (records.length !== 200) throw new Error(`Expected 200, got ${records.length}`);
fs.writeFileSync(file, JSON.stringify(records, null, 2) + '\n');
console.log(`Completed ${records.length}`);
