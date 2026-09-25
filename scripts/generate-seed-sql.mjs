import fs from 'node:fs';
import process from 'node:process';

const input = process.argv[2] || 'supabase/opportunities.seed.json';
const output = process.argv[3] || 'supabase/opportunities_seed.sql';
const records = JSON.parse(fs.readFileSync(input, 'utf8'));
const sql = value => value === null || value === undefined || value === '' ? 'NULL' : `'${String(value).replaceAll("'", "''")}'`;
const date = value => value ? sql(value) : 'NULL';
const array = value => Array.isArray(value) && value.length ? `ARRAY[${value.map(item => sql(item)).join(', ')}]::TEXT[]` : 'NULL';
const columns = ['title','slug','organization','description','type','category','subcategory','state','district','education_level','gender_eligibility','min_age','max_age','income_limit','benefit','eligibility_text','documents_required','application_start_date','application_deadline','official_source_url','official_application_url','status','verification_status'];
const values = record => [sql(record.title), sql(record.slug), sql(record.organization), sql(record.description), sql(record.type), sql(record.category), sql(record.subcategory), sql(record.state), sql(record.district), sql(record.education_level), sql(record.gender_eligibility), record.min_age ?? 'NULL', record.max_age ?? 'NULL', record.income_limit ?? 'NULL', sql(record.benefit), sql(record.eligibility_text), array(record.documents_required), date(record.application_start_date), date(record.application_deadline), sql(record.official_source_url), sql(record.official_application_url), sql(record.status), sql(record.verification_status)].join(', ');
const statements = records.map(record => `(${values(record)})`).join(',\n');
const outputText = `-- Generated from ${input}. Validate before running in the existing SheFind Supabase project.\nBEGIN;\nINSERT INTO public.opportunities (${columns.join(', ')}) VALUES\n${statements}\nON CONFLICT (slug) DO UPDATE SET\n  title = EXCLUDED.title, organization = EXCLUDED.organization, description = EXCLUDED.description, type = EXCLUDED.type, category = EXCLUDED.category, subcategory = EXCLUDED.subcategory, state = EXCLUDED.state, district = EXCLUDED.district, education_level = EXCLUDED.education_level, gender_eligibility = EXCLUDED.gender_eligibility, min_age = EXCLUDED.min_age, max_age = EXCLUDED.max_age, income_limit = EXCLUDED.income_limit, benefit = EXCLUDED.benefit, eligibility_text = EXCLUDED.eligibility_text, documents_required = EXCLUDED.documents_required, application_start_date = EXCLUDED.application_start_date, application_deadline = EXCLUDED.application_deadline, official_source_url = EXCLUDED.official_source_url, official_application_url = EXCLUDED.official_application_url, status = EXCLUDED.status, verification_status = EXCLUDED.verification_status, updated_at = NOW();\nCOMMIT;\n`;
fs.writeFileSync(output, outputText);
console.log(`Wrote ${records.length} records to ${output}`);
