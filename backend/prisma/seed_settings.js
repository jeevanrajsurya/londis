const { PrismaClient } = require('@prisma/client');
const defaultSettings = require('../src/constants/defaultSettings');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Initializing / Upserting Default Site Settings (Safe & Idempotent) ---');
  let created = 0;
  let skipped = 0;

  for (const [key, value] of Object.entries(defaultSettings)) {
    const existing = await prisma.siteSetting.findUnique({ where: { key } });
    if (existing) {
      console.log(`  [EXISTS] Setting '${key}' already exists in database (skipped, preserved existing data)`);
      skipped++;
    } else {
      await prisma.siteSetting.create({
        data: { key, value },
      });
      console.log(`  [CREATED] Setting '${key}' inserted into database`);
      created++;
    }
  }

  console.log(`\nDone! Total settings processed: ${created} created, ${skipped} already existed (untouched).`);
}

main()
  .catch((e) => {
    console.error('Seed settings error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
