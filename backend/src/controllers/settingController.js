const asyncHandler = require('express-async-handler');
const prisma = require('../config/db');
const defaultSettings = require('../constants/defaultSettings');

// GET /api/settings (Public - returns all CMS settings grouped by key)
const getAllSettings = asyncHandler(async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  const records = await prisma.siteSetting.findMany();
  const settings = { ...defaultSettings };
  records.forEach((rec) => {
    settings[rec.key] = rec.value;
  });
  res.json({ settings });
});

// GET /api/settings/:key (Public)
const getSettingByKey = asyncHandler(async (req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  const { key } = req.params;
  let record = await prisma.siteSetting.findUnique({ where: { key } });

  // If setting is missing in the database but exists in defaults, safely initialize it
  if (!record && defaultSettings[key]) {
    record = await prisma.siteSetting.upsert({
      where: { key },
      create: { key, value: defaultSettings[key] },
      update: {}, // Non-destructive: do not overwrite if created concurrently
    });
  }

  if (!record) {
    return res.status(404).json({ message: `Setting '${key}' not found` });
  }
  res.json({ key: record.key, value: record.value });
});

// PUT /api/settings/:key (Admin update or create)
const updateSetting = asyncHandler(async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;

  if (!value) {
    res.status(400);
    throw new Error('Value object is required');
  }

  const updated = await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  res.json({ setting: updated, message: `Setting '${key}' updated successfully` });
});

module.exports = {
  getAllSettings,
  getSettingByKey,
  updateSetting,
};
