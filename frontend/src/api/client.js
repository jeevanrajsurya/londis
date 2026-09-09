import api from './axios';
import {
  fallbackSettings,
  fallbackFuelPrices,
  fallbackServices,
  fallbackPromotions,
  fallbackAboutCms,
} from '../data/forecourtData';
import { fallbackOurProductsCms } from '../data/ourProductsData';
import { fallbackCardsRewardsCms } from '../data/cardsRewardsData';

// Fetch Live Fuel Prices with offline fallback
export async function getLiveFuelPrices() {
  try {
    const res = await api.get('/fuel-prices');
    return res.data?.fuelPrices?.length ? res.data.fuelPrices : fallbackFuelPrices;
  } catch (err) {
    console.warn('Backend offline, using fallback fuel prices:', err.message);
    return fallbackFuelPrices;
  }
}

// Fetch All Site CMS Settings
export async function getSiteSettings() {
  try {
    const res = await api.get('/settings');
    return res.data?.settings || fallbackSettings;
  } catch (err) {
    console.warn('Backend offline, using fallback settings:', err.message);
    return fallbackSettings;
  }
}

// Fetch Contact Page CMS Settings
export async function getContactPageSettings() {
  try {
    const res = await api.get('/settings/contact_page_cms');
    return res.data?.value || fallbackSettings.contact_page_cms;
  } catch (err) {
    return fallbackSettings.contact_page_cms;
  }
}

// Fetch About Page CMS Settings
export async function getAboutPageSettings() {
  try {
    const res = await api.get('/settings/about_page_cms');
    return res.data?.value || fallbackAboutCms;
  } catch (err) {
    return fallbackAboutCms;
  }
}

// Fetch Our Products Page CMS Settings
export async function getOurProductsPageSettings() {
  try {
    const res = await api.get('/settings/our_products_cms');
    return res.data?.value || fallbackOurProductsCms;
  } catch (err) {
    return fallbackOurProductsCms;
  }
}

// Fetch Cards & Rewards Page CMS Settings
export async function getCardsRewardsPageSettings() {
  try {
    const res = await api.get('/settings/cards_rewards_cms');
    return res.data?.value || fallbackCardsRewardsCms;
  } catch (err) {
    return fallbackCardsRewardsCms;
  }
}

// Fetch Forecourt Services
export async function getForecourtServices(category) {
  try {
    const res = await api.get('/services', { params: { category } });
    return res.data?.services?.length ? res.data.services : fallbackServices;
  } catch (err) {
    console.warn('Backend offline, using fallback services:', err.message);
    return fallbackServices;
  }
}

// Fetch Store Promotions
export async function getStorePromotions() {
  try {
    const res = await api.get('/promotions');
    return res.data?.promotions?.length ? res.data.promotions : fallbackPromotions;
  } catch (err) {
    console.warn('Backend offline, using fallback promotions:', err.message);
    return fallbackPromotions;
  }
}

// Submit Inquiry / B2B Fleet Card Application
export async function submitInquiry(data) {
  return api.post('/inquiries', data).then((r) => r.data);
}

// Submit Valet / Car Wash Slot Booking
export async function submitValetBooking(data) {
  return api.post('/valet-bookings', data).then((r) => r.data);
}

// Submit Job Application with CV
export async function submitJobApplication(formData) {
  return api.post('/jobs/apply', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
}

// Submit Newsletter & Community Subscription with optional Resume
export async function submitNewsletterSubscription(formData) {
  return api.post('/newsletter/subscribe', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
}

