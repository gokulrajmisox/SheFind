import fs from 'node:fs';
const file = process.argv[2] || 'supabase/opportunities.seed.json';
const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
const normalize = value => String(value ?? '').trim().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const output = []; const titles = new Set(); const slugs = new Set();
for (const record of raw) {
  const title = normalize(record.title); const slug = normalize(record.slug);
  if (!title || titles.has(title) || slugs.has(slug)) continue;
  titles.add(title); slugs.add(slug);
  output.push({...record, status: ['active','upcoming','closed','inactive'].includes(record.status) ? record.status : 'active', verification_status: record.verification_status === 'verified' && record.official_source_url && record.official_application_url ? 'verified' : 'needs_review'});
}
fs.writeFileSync(file, JSON.stringify(output, null, 2) + '\n');
console.log(`Deduplicated ${raw.length} to ${output.length}`);
