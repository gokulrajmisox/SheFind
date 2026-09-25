import fs from 'node:fs';

const input = process.argv[2] || '/home/ubuntu/.manus-jobs/39caedac3dc7/output.txt';
const output = process.argv[3] || 'supabase/opportunities.seed.json';
const raw = fs.readFileSync(input, 'utf8');
const payload = JSON.parse(raw.trim());
const records = payload.results?.flatMap(result => result.value?.records ?? []) ?? [];
if (!records.length) throw new Error('No records found in workflow output');
const normalized = records.map((record, index) => ({
  ...record,
  organization: record.organization ?? null,
  description: record.description ?? null,
  type: record.type ?? null,
  subcategory: record.subcategory ?? null,
  state: record.state ?? null,
  district: record.district ?? null,
  education_level: record.education_level ?? null,
  gender_eligibility: record.gender_eligibility ?? null,
  min_age: record.min_age ?? null,
  max_age: record.max_age ?? null,
  income_limit: typeof record.income_limit === 'number' ? record.income_limit : null,
  benefit: record.benefit ?? null,
  eligibility_text: record.eligibility_text ?? null,
  documents_required: record.documents_required ?? [],
  application_start_date: record.application_start_date ?? null,
  application_deadline: record.application_deadline ?? null,
  official_source_url: record.official_source_url ?? null,
  official_application_url: record.official_application_url ?? null,
  status: record.status ?? 'active',
  verification_status: record.verification_status ?? 'needs_review',
  _source_note: record.source_note ?? null,
}));
fs.writeFileSync(output, JSON.stringify(normalized, null, 2) + '\n');
console.log(`Extracted ${normalized.length} records to ${output}`);
console.log(JSON.stringify({categories: Object.fromEntries([...new Set(normalized.map(r => r.category))].map(c => [c, normalized.filter(r => r.category === c).length]))}, null, 2));
if (normalized.length !== 200) process.exitCode = 1;
