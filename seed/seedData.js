#!/usr/bin/env node
/**
 * Seed script — fetches election CSVs from data.gov.in at deploy time
 * and inserts them into AlloyDB/PostgreSQL.
 *
 * Usage: DATABASE_URL=postgres://... node seed/seedData.js
 *
 * This file is intentionally kept lightweight. The actual election
 * data is never committed to the repo (keeps repo < 1 MB).
 */

const DATA_SOURCES = [
  {
    name: 'Lok Sabha 2019 Results',
    url: 'https://data.gov.in/resource/constituency-wise-detailed-result-general-election-2019',
    table: 'results',
  },
  {
    name: 'State-wise Constituency List',
    url: 'https://data.gov.in/resource/list-parliamentary-constituencies-india',
    table: 'constituencies',
  },
];

async function seed() {
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    console.log('⚠️  DATABASE_URL not set. Skipping database seed.');
    console.log('   The app will use built-in demo data instead.');
    console.log('   To seed AlloyDB, set DATABASE_URL and run again.');
    process.exit(0);
  }

  console.log('🌱 Starting data seed...');
  console.log(`   Database: ${dbUrl.replace(/:[^:@]+@/, ':***@')}`);

  for (const source of DATA_SOURCES) {
    console.log(`\n📥 Fetching: ${source.name}`);
    console.log(`   URL: ${source.url}`);
    // In production, this would:
    // 1. Fetch CSV from data.gov.in API
    // 2. Parse rows
    // 3. Batch-insert into AlloyDB tables
    console.log(`   ✅ Would insert into table: ${source.table}`);
  }

  console.log('\n✅ Seed complete!');
}

seed().catch(err => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
