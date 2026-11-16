import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const seedTsPath = path.resolve(process.cwd(), 'src/data/seed-data.ts');
const source = fs.readFileSync(seedTsPath, 'utf8');
const transpiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;

const tmpPath = path.resolve(process.cwd(), 'scripts/.seed-data.tmp.mjs');
fs.writeFileSync(tmpPath, transpiled, 'utf8');

const mod = await import(`file://${tmpPath}`);
fs.unlinkSync(tmpPath);

const esc = (v) => {
  if (v === null || v === undefined) return 'NULL';
  if (typeof v === 'number') return String(v);
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return `'${String(v).replace(/'/g, "''")}'`;
};

const seededProcessIdsSql = mod.SEED_PROCESSES.map((p) => esc(p.id)).join(', ');

const lines = [
  '-- KaamHoGaya.pk — Production Seed Data (8 Cities, 6 Categories, 10 Verified Real Guides, Documents, Steps, Mistakes, FAQs, Wait Times)',
  '-- Safe to re-run (idempotent upsert + clean child refresh for the 10 seeded guides).',
  '',
  'BEGIN;',
  '',
  '-- 1. Cities',
];

for (const c of mod.SEED_CITIES) {
  lines.push(
    `INSERT INTO public.cities (id, name, slug, province) VALUES (${esc(c.id)}, ${esc(c.name)}, ${esc(c.slug)}, ${esc(c.province)}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, province = EXCLUDED.province;`
  );
}

lines.push('', '-- 2. Categories');
for (const c of mod.SEED_CATEGORIES) {
  lines.push(
    `INSERT INTO public.categories (id, name, slug, urdu_label, description) VALUES (${esc(c.id)}, ${esc(c.name)}, ${esc(c.slug)}, ${esc(c.urdu_label)}, ${esc(c.description)}) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, urdu_label = EXCLUDED.urdu_label, description = EXCLUDED.description;`
  );
}

lines.push('', '-- 3. Processes (10 Verified Real Guides — Upsert)');
for (const p of mod.SEED_PROCESSES) {
  lines.push(
    `INSERT INTO public.processes (id, slug, title, urdu_title, summary, category, city, fee_normal, fee_urgent, fee_executive, fee_notes, time_required, office_name, office_address, office_timings, best_day_to_go, official_source_url, last_updated, is_verified, is_nationwide, popularity_rank) VALUES (${esc(p.id)}, ${esc(p.slug)}, ${esc(p.title)}, ${esc(p.urdu_title)}, ${esc(p.summary)}, ${esc(p.category)}, ${esc(p.city)}, ${esc(p.fee_normal)}, ${esc(p.fee_urgent)}, ${esc(p.fee_executive)}, ${esc(p.fee_notes)}, ${esc(p.time_required)}, ${esc(p.office_name)}, ${esc(p.office_address)}, ${esc(p.office_timings)}, ${esc(p.best_day_to_go)}, ${esc(p.official_source_url)}, ${esc(p.last_updated)}, ${esc(p.is_verified)}, ${esc(p.is_nationwide)}, ${esc(p.popularity_rank)}) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, urdu_title = EXCLUDED.urdu_title, summary = EXCLUDED.summary, category = EXCLUDED.category, city = EXCLUDED.city, fee_normal = EXCLUDED.fee_normal, fee_urgent = EXCLUDED.fee_urgent, fee_executive = EXCLUDED.fee_executive, fee_notes = EXCLUDED.fee_notes, time_required = EXCLUDED.time_required, office_name = EXCLUDED.office_name, office_address = EXCLUDED.office_address, office_timings = EXCLUDED.office_timings, best_day_to_go = EXCLUDED.best_day_to_go, official_source_url = EXCLUDED.official_source_url, last_updated = EXCLUDED.last_updated, is_verified = EXCLUDED.is_verified, is_nationwide = EXCLUDED.is_nationwide, popularity_rank = EXCLUDED.popularity_rank;`
  );
}

lines.push(
  '',
  '-- 4. Clean previous starter child rows for these 10 guides before inserting refreshed records',
  `DELETE FROM public.documents WHERE process_id IN (${seededProcessIdsSql});`,
  `DELETE FROM public.steps WHERE process_id IN (${seededProcessIdsSql});`,
  `DELETE FROM public.mistakes WHERE process_id IN (${seededProcessIdsSql});`,
  `DELETE FROM public.faqs WHERE process_id IN (${seededProcessIdsSql});`,
  `DELETE FROM public.wait_times WHERE id IN (${mod.SEED_WAIT_TIMES.map((w) => esc(w.id)).join(', ')});`,
  '',
  '-- 5. Documents'
);
for (const d of mod.SEED_DOCUMENTS) {
  lines.push(
    `INSERT INTO public.documents (id, process_id, name, type, copies_needed, note, sort_order) VALUES (${esc(d.id)}, ${esc(d.process_id)}, ${esc(d.name)}, ${esc(d.type)}, ${esc(d.copies_needed)}, ${esc(d.note)}, ${esc(d.sort_order)}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, type = EXCLUDED.type, copies_needed = EXCLUDED.copies_needed, note = EXCLUDED.note, sort_order = EXCLUDED.sort_order;`
  );
}

lines.push('', '-- 6. Steps');
for (const s of mod.SEED_STEPS) {
  lines.push(
    `INSERT INTO public.steps (id, process_id, step_number, title, description, time_minutes) VALUES (${esc(s.id)}, ${esc(s.process_id)}, ${esc(s.step_number)}, ${esc(s.title)}, ${esc(s.description)}, ${esc(s.time_minutes)}) ON CONFLICT (id) DO UPDATE SET step_number = EXCLUDED.step_number, title = EXCLUDED.title, description = EXCLUDED.description, time_minutes = EXCLUDED.time_minutes;`
  );
}

lines.push('', '-- 7. Mistakes');
for (const m of mod.SEED_MISTAKES) {
  lines.push(
    `INSERT INTO public.mistakes (id, process_id, title, description, sort_order) VALUES (${esc(m.id)}, ${esc(m.process_id)}, ${esc(m.title)}, ${esc(m.description)}, ${esc(m.sort_order)}) ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;`
  );
}

lines.push('', '-- 8. FAQs');
for (const f of mod.SEED_FAQS) {
  lines.push(
    `INSERT INTO public.faqs (id, process_id, question, answer, sort_order) VALUES (${esc(f.id)}, ${esc(f.process_id)}, ${esc(f.question)}, ${esc(f.answer)}, ${esc(f.sort_order)}) ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, sort_order = EXCLUDED.sort_order;`
  );
}

lines.push('', '-- 9. Wait Times');
for (const w of mod.SEED_WAIT_TIMES) {
  lines.push(
    `INSERT INTO public.wait_times (id, process_id, office_name, city, visit_date, wait_minutes, rating, tip, status, created_at) VALUES (${esc(w.id)}, ${esc(w.process_id)}, ${esc(w.office_name)}, ${esc(w.city)}, ${esc(w.visit_date)}, ${esc(w.wait_minutes)}, ${esc(w.rating)}, ${esc(w.tip)}, ${esc(w.status)}, ${esc(w.created_at)}) ON CONFLICT (id) DO UPDATE SET office_name = EXCLUDED.office_name, city = EXCLUDED.city, visit_date = EXCLUDED.visit_date, wait_minutes = EXCLUDED.wait_minutes, rating = EXCLUDED.rating, tip = EXCLUDED.tip, status = EXCLUDED.status;`
  );
}

lines.push(
  '',
  '-- Preserve exact verified last_updated timestamp (2026-11-17) after child table triggers run',
  'ALTER TABLE public.processes DISABLE TRIGGER trg_processes_last_updated;',
  `UPDATE public.processes SET last_updated = '2026-11-17T00:00:00Z' WHERE id IN (${seededProcessIdsSql});`,
  'ALTER TABLE public.processes ENABLE TRIGGER trg_processes_last_updated;',
  '',
  'COMMIT;',
  ''
);

const outPath = path.resolve(process.cwd(), 'supabase/seed.sql');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Wrote ${outPath} (${lines.length} lines)`);
