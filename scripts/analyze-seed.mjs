import fs from 'node:fs';
const records = JSON.parse(fs.readFileSync(process.argv[2] || 'supabase/opportunities.seed.json', 'utf8'));
const bySlug = new Map();
const byTitle = new Map();
for (const record of records) {
  for (const [map, key] of [[bySlug, record.slug], [byTitle, record.title?.trim().toLowerCase()]]) {
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(record);
  }
}
console.log(JSON.stringify({raw: records.length, uniqueSlugs: bySlug.size, uniqueTitles: byTitle.size}, null, 2));
for (const [key, values] of bySlug) if (values.length > 1) console.log(`SLUG ${key}: ${values.map(v => v.title).join(' | ')}`);
for (const [key, values] of byTitle) if (values.length > 1) console.log(`TITLE ${key}: ${values.map(v => v.slug).join(' | ')}`);
