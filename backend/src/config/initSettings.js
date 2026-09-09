const prisma = require('./db');
const defaultSettings = require('../constants/defaultSettings');

async function initDefaultSettings() {
  try {
    for (const [key, value] of Object.entries(defaultSettings)) {
      await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: {}, // Non-destructive: leave existing settings untouched
      });
    }
  } catch (err) {
    console.warn('Notice: Default settings auto-initialization deferred:', err.message);
  }
}

module.exports = initDefaultSettings;
