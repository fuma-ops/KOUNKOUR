#!/usr/bin/env node
/* Transforme les vraies données scrapées de kounkour-studo en seed SQL propre
   pour public.radar_candidates (file de validation, status pending_review).
   Règles de conformité (cahier §0/§7/§13) :
   - on JETTE tout champ fabriqué : referenceCode (Math.random), image/logo deviné,
     overviewSummary/criteria/exams/documents (générés), daysRemaining (recalculé),
     parsingConfidence (bidon), id/slug internes ;
   - on GARDE la provenance réelle : officialSourceUrl, titre/admin/spécialité scrapés ;
   - on PARSE les vraies dates FR ; si non parsable → NULL (= à vérifier). */

const fs = require('fs');
const path = require('path');

const SRC = '/home/user/kounkour-studo/src/data/realScrapedFeed.json';
const OUT = path.join(__dirname, 'radar_seed.sql');

const SOURCE_ID = '11111111-1111-4111-8111-111111111111';
const RUN_ID = '22222222-2222-4222-8222-222222222222';

const MONTHS = {
  janvier: 1, février: 2, fevrier: 2, mars: 3, avril: 4, mai: 5, juin: 6,
  juillet: 7, août: 8, aout: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12, decembre: 12,
};

const hasArabic = (s) => typeof s === 'string' && /[؀-ۿ]/.test(s);

// "5 Octobre 2026 - 16:30" | "19 Septembre 2026" -> "2026-10-05" | null
function parseFrDate(text) {
  if (!text || typeof text !== 'string') return null;
  const m = text.match(/(\d{1,2})\s+([A-Za-zÀ-ÿ]+)\s+(\d{4})/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = MONTHS[m[2].toLowerCase()];
  const year = parseInt(m[3], 10);
  if (!month || day < 1 || day > 31) return null;
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// externe id = uuid du portail dans .../details/<uuid>
function extractExternalId(url) {
  if (!url) return null;
  const m = url.match(/\/details\/([0-9a-f-]{8,})/i);
  return m ? m[1] : null;
}

const sqlStr = (v) => (v == null || v === '' ? 'null' : `'${String(v).replace(/'/g, "''")}'`);
const sqlInt = (v) => (v == null || Number.isNaN(Number(v)) ? 'null' : String(parseInt(v, 10)));
const sqlDate = (v) => (v == null ? 'null' : `'${v}'`);
const sqlJson = (o) => `'${JSON.stringify(o).replace(/'/g, "''")}'::jsonb`;

const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const seen = new Set();
const rows = [];
let skippedNoUrl = 0;
let skippedNoExtId = 0;
let dupes = 0;

for (const it of data) {
  const sourceUrl = it.officialSourceUrl;
  if (!sourceUrl || !/^https?:\/\//.test(sourceUrl)) { skippedNoUrl++; continue; }
  const externalId = extractExternalId(sourceUrl);
  if (!externalId) { skippedNoExtId++; continue; }
  if (seen.has(externalId)) { dupes++; continue; }
  seen.add(externalId);

  const titleOriginal = it.title && it.title.fr ? it.title.fr : null;
  if (!titleOriginal) continue; // titre original obligatoire

  const titleAr = it.title && hasArabic(it.title.ar) ? it.title.ar : null;
  const adminName = it.administration && it.administration.name ? it.administration.name.fr : null;
  const adminSite = it.administration ? it.administration.officialWebsite : null;
  const adminCat = it.administration ? it.administration.category : null;
  const specialty = it.specialty ? it.specialty.fr : null;
  const region = it.region ? it.region.fr : null;
  const deadlineText = it.deadlineDate || null;
  const deadlineDate = parseFrDate(deadlineText);
  const pubText = it.publicationDate || null;

  // Charge brute d'audit = uniquement ce qui N'EST PAS déjà stocké en colonnes
  // (les valeurs FR sont dans les colonnes ; on garde ici les variantes AR
  // scrapées + indices non promus, pour traçabilité à la validation).
  const raw = {
    scraped_status: it.status || null,
    type: it.type || null,
    contest_date: it.contestDate || null,
    location: it.location || null,
    is_verified_source: it.isVerifiedSource || null,
    ar: {
      administration_name: it.administration && it.administration.name && hasArabic(it.administration.name.ar) ? it.administration.name.ar : null,
      specialty: it.specialty && hasArabic(it.specialty.ar) ? it.specialty.ar : null,
      region: it.region && hasArabic(it.region.ar) ? it.region.ar : null,
    },
  };

  rows.push(
    `  (${SOURCE_ID ? `'${SOURCE_ID}'` : 'null'}, '${RUN_ID}', ${sqlStr(externalId)}, ${sqlStr(sourceUrl)}, ` +
    `${sqlStr(titleOriginal)}, ${sqlStr(titleAr)}, ${sqlStr(adminName)}, ${sqlStr(adminSite)}, ${sqlStr(adminCat)}, ` +
    `${sqlStr(it.degreeLevel)}, ${sqlStr(specialty)}, ${sqlStr(region)}, ${sqlInt(it.postsCount)}, ` +
    `${sqlStr(deadlineText)}, ${sqlDate(deadlineDate)}, ${sqlStr(pubText)}, ${sqlJson(raw)}, 'pending_review')`
  );
}

const header = `-- SEED Radar R1 — vraies données scrapées de emploi-public.ma, NETTOYÉES.
-- Généré par build_radar_seed.cjs. Champs fabriqués supprimés (referenceCode,
-- image/logo, overviewSummary, criteria/exams, daysRemaining). Dates FR parsées ;
-- non parsable => NULL (à vérifier). Tout en 'pending_review' (§13.2).
-- Idempotent : ON CONFLICT (source_id, external_id) DO NOTHING.

insert into public.radar_sources (id, slug, name_fr, name_ar, domain, base_url, category, robots_checked, robots_allowed, min_delay_seconds, active, notes)
values (
  '${SOURCE_ID}', 'emploi-public-ma',
  'Portail Emploi Public (emploi-public.ma)', 'بوابة التشغيل العمومي',
  'emploi-public.ma', 'https://www.emploi-public.ma/fr/concours-liste',
  'official_portal', false, null, 5, false,
  'Source d''amorçage. Collecte automatisée INACTIVE tant que la vérification robots.txt/ToS et le feu vert juridique ne sont pas donnés (§13.1).'
)
on conflict (slug) do nothing;

insert into public.radar_runs (id, source_id, status, started_at, finished_at, items_detected, items_new, trigger)
values (
  '${RUN_ID}', '${SOURCE_ID}', 'success', now(), now(), ${rows.length}, ${rows.length}, 'seed_import'
)
on conflict (id) do nothing;

insert into public.radar_candidates
  (source_id, run_id, external_id, source_url, title_original, title_ar, administration_name, administration_site, administration_category, degree_level, specialty, region, positions, deadline_text, deadline_date, publication_text, raw, status)
values
`;

fs.writeFileSync(OUT, header + rows.join(',\n') + '\non conflict (source_id, external_id) do nothing;\n');

// Découpage en lots auto-suffisants pour exécution via MCP (taille de payload).
const CANDS_HEADER = `insert into public.radar_candidates
  (source_id, run_id, external_id, source_url, title_original, title_ar, administration_name, administration_site, administration_category, degree_level, specialty, region, positions, deadline_text, deadline_date, publication_text, raw, status)
values
`;
const BATCH = 12;
let batchNo = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  batchNo++;
  const chunk = rows.slice(i, i + BATCH);
  const body = CANDS_HEADER + chunk.join(',\n') + '\non conflict (source_id, external_id) do nothing;\n';
  fs.writeFileSync(path.join(__dirname, `radar_seed_${batchNo}.sql`), body);
}
console.log('Lots écrits     :', batchNo);

console.log('Items lus       :', data.length);
console.log('Ignorés (no url):', skippedNoUrl);
console.log('Ignorés (no id) :', skippedNoExtId);
console.log('Doublons        :', dupes);
console.log('Candidats seed  :', rows.length);
console.log('SQL écrit dans  :', OUT);
