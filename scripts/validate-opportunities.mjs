import fs from 'node:fs';
import process from 'node:process';

const file = process.argv[2] || 'supabase/opportunities.seed.json';
const records = JSON.parse(fs.readFileSync(file, 'utf8'));
const allowedCategories = new Set(['Scholarships', 'Government Schemes', 'Education', 'Financial Support', 'Skill Development', 'Entrepreneurship']);
const allowedStatuses = new Set(['active', 'upcoming', 'closed', 'inactive']);
const allowedVerification = new Set(['verified', 'needs_review', 'pending', 'rejected']);
const errors = [];
const seenTitles = new Set();
const seenSlugs = new Set();
const urlPattern = /^https?:\/\/[^\s]+$/i;

if (!Array.isArray(records)) errors.push('Seed root must be an array.');
if (records.length !== 200) errors.push(`Expected exactly 200 records, found ${records.length}.`);
for (const [index, record] of records.entries()) {
  const label = `Record ${index + 1}`;
  if (!record.title?.trim()) errors.push(`${label}: missing title.`);
  if (seenTitles.has(record.title?.trim().toLowerCase())) errors.push(`${label}: duplicate title.`);
  seenTitles.add(record.title?.trim().toLowerCase());
  if (!record.slug?.trim()) errors.push(`${label}: missing slug.`);
  if (seenSlugs.has(record.slug)) errors.push(`${label}: duplicate slug.`);
  seenSlugs.add(record.slug);
  if (!allowedCategories.has(record.category)) errors.push(`${label}: invalid category ${record.category}.`);
  if (!allowedStatuses.has(record.status)) errors.push(`${label}: invalid status ${record.status}.`);
  if (!allowedVerification.has(record.verification_status)) errors.push(`${label}: invalid verification_status ${record.verification_status}.`);
  if (record.official_source_url && !urlPattern.test(record.official_source_url)) errors.push(`${label}: malformed official_source_url.`);
  if (record.official_application_url && !urlPattern.test(record.official_application_url)) errors.push(`${label}: malformed official_application_url.`);
  if (record.application_deadline && !/^\d{4}-\d{2}-\d{2}$/.test(record.application_deadline)) errors.push(`${label}: deadline must be YYYY-MM-DD or null.`);
  if (record.verification_status === 'verified' && (!record.official_source_url || !record.official_application_url)) errors.push(`${label}: verified record must have both official URLs.`);
  if (record.status === 'active' && !record.application_deadline && !record.description) errors.push(`${label}: active record needs a useful description when deadline is unknown.`);
}
const counts = Object.fromEntries([...allowedCategories].map(category => [category, records.filter(record => record.category === category).length]));
console.log(JSON.stringify({valid: errors.length === 0, count: records.length, category_counts: counts, errors}, null, 2));
process.exitCode = errors.length ? 1 : 0;
