import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import { getAssetUrl, CLIENT_URL } from '../api/axios';
import {
  Layout,
  Save,
  RotateCcw,
  Upload,
  ExternalLink,
  Smartphone,
  Trophy,
  Grid,
  CreditCard,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2,
  Star,
  Film,
  Lock,
  Plus,
  Mail,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_HOMEPAGE_CMS = {
  hero: {
    enabled: true,
    videoUrl: '/uploads/hero-video.mp4',
    headlineLine1: 'The fuel that lets you GO GO GO.',
    headlineLine2: 'The app that lets you SAVE SAVE SAVE.',
    buttonText: 'Download the app',
    buttonLink: 'https://onelink.to/xpxtfg',
  },
  specialtyApp: {
    enabled: true,
    bgImageUrl: '/uploads/street-map-bg.jpeg',
    phoneImageUrl: '/uploads/Cropped-phone.jpg',
    appIconUrl: '/uploads/FF-App-Icon.svg',
    leftTitle: 'Save on Every.<br />Single. Tank.',
    leftDescription: 'Get the Fuel Forward® App to save up to 20¢/gallon* on your first fill-up.',
    leftCtaText: 'Find a station',
    leftCtaLink: '/contact',
    termsText: '*Terms and conditions apply. See app for details.',
    rightTitle: 'Stack and save. Again and again.',
    rightDescription: 'Combine multiple discounts for bigger savings every time you fuel up.',
    appStoreLink: 'https://apps.apple.com/us/app/my-phillips-66/id922282104',
    googlePlayLink: 'https://play.google.com/store/apps/details?id=com.p66.b2c.stationfinder.p66',
  },
  broncosBanner: {
    enabled: true,
    bannerImageUrl: '/uploads/broncos-lifestyle.jpeg',
    title: 'BRONCOS FANS. GO VIP.',
    description:
      'Watch the Denver Broncos battle Miami on December 6, 2026 in style. Now through 11/15/26, buy 8+ gallons* with the Fuel Forward® App for a chance to win premium tickets, pregame field passes and so much more.',
    buttonText: 'Learn More',
    buttonLink: 'https://www.conoco.com/broncos/',
    termsText: '*Terms and conditions apply. See official rules for details at www.conoco.com/broncos-rules.',
    logo1Url: '/uploads/conoco-rev.png',
    logo2Url: '/uploads/broncos-logo.png',
  },
  bentoGrid: {
    igCard: {
      enabled: true,
      imageUrl: '/uploads/conoco-one-tank-ig.jpeg',
      title: 'One tank, four destinations, zero PTO wasted.',
      subtitle: 'Ready to GO GO GO?',
      handle: '@petrol',
      link: 'https://www.instagram.com/conoco/',
    },
    gameCard: {
      enabled: true,
      imageUrl: '/uploads/seventh-inning-stretch.jpeg',
      title: 'Test your sleuthing skills.',
      description:
        'Take a trip to the ballgame in Seventh Inning Sketch, an interactive hidden object game. Only the sharpest eyes can find all ten.',
      buttonText: 'Start your search',
      buttonLink: 'https://www.phillips66stadiumsketch.com/',
    },
    tuesdayCard: {
      enabled: true,
      badge: '10¢',
      title: 'Ten Cent Tuesdays',
      description: 'Save an extra 10¢/gal every first Tuesday of the month with the Fuel Forward® App.',
      buttonText: 'Start saving now',
      buttonLink: 'https://onelink.to/xpxtfg',
    },
  },
  featureCards: {
    placesCard: {
      enabled: true,
      imageUrl: '/uploads/dispenser-pump-app.jpeg',
      title: 'Thousands of places to save.',
      description:
        'The Fuel Forward® App gets you a lower price at Phillips 66®, Petrol® and 76® stations in seconds. Download to fill up the smart way.',
      buttonText: 'Learn more',
      buttonLink: '/rewards',
    },
    stationCard: {
      enabled: true,
      bgImageUrl: '/uploads/street-map-bg.jpeg',
      pumpsImageUrl: '/uploads/gas-pumps-conoco.png',
      title: 'Find your closest station.',
      description:
        'You’re on the go. We’re on your route. Tap below to find your nearest station, or map your next adventure with the Plan a Trip tool.',
      buttonText: 'Find your fuel',
      buttonLink: '/contact',
    },
    surveyCard: {
      enabled: true,
      imageUrl: '/uploads/pay-at-pump-survey.jpeg',
      title: 'You’ve got opinions. We’ve got rewards.',
      description:
        'Visited a station lately? Take a quick survey about your recent purchase and you could win free gas.',
      buttonText: 'Take a survey',
      buttonLink: 'https://www.conocofeedback.com/p66feedback/visit_conoco/home',
    },
    kickbackCard: {
      enabled: true,
      imageUrl: '/uploads/kickback-card.jpeg',
      title: 'KickBack® Rewards maximize your miles.',
      description:
        'Earn rewards on fuel and other purchases to spend like cash across thousands of forecourt locations.',
      buttonText: 'Learn more',
      buttonLink: '/rewards',
    },
    extraCards: [],
  },
  socialRatings: {
    enabled: true,
    socialCard: {
      enabled: true,
      title: 'Follow to stay in the know while you go.',
      instagramUrl: 'https://www.instagram.com/conoco/',
      facebookUrl: 'https://www.facebook.com/conoco',
      youtubeUrl: 'https://youtube.com/playlist?list=PLhZANlfVQtQeQq02_i-P-FzxJk8lOKgX-',
    },
    ratingsCard: {
      enabled: true,
      appIconUrl: '/uploads/FF-App-Icon.svg',
      appName: 'Fuel Forward® App',
      rating1Value: '4.9',
      rating1Count: '53K reviews',
      rating1ImageUrl: '/uploads/app-store.png',
      rating1Link: 'https://apps.apple.com/us/app/my-phillips-66/id922282104',
      rating2Value: '4.4',
      rating2Count: '7.99K reviews',
      rating2ImageUrl: '/uploads/google-play.png',
      rating2Link: 'https://play.google.com/store/apps/details?id=com.p66.b2c.stationfinder.p66',
      buttonText: 'Download the app',
      buttonLink: 'https://onelink.to/xpxtfg',
    },
    testimonialCard: {
      enabled: true,
      stars: '★★★★★',
      quote: '“The Fuel Forward app makes filling up so easy. I save money and time on every visit.”',
      author: '— Sarah M., App User',
      buttonText: 'Try the app',
      buttonLink: 'https://onelink.to/xpxtfg',
    },
  },
  newsletter: {
    enabled: true,
    title: 'Get emails you actually like.',
    description:
      'With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda.',
    buttonText: 'Submit',
    termsText:
      'By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA.',
  },
};

// Reusable Image & Media Uploader with Fallback, Preview, and Explicit Removal
function MediaField({ label, value, defaultValue, onChange, hint, isVideo = false }) {
  const [uploading, setUploading] = useState(false);
  const isRemoved = value === '' || value === 'none';
  const isDefault = value === undefined || value === null || value === defaultValue;
  const isCustom = Boolean(value && value !== defaultValue);

  const isVideoField =
    isVideo ||
    label?.toLowerCase().includes('video') ||
    (typeof value === 'string' &&
      (value.endsWith('.mp4') || value.endsWith('.webm') || value.endsWith('.mov')));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const res = await uploadImage(file);
      onChange(res.url);
      toast.success(`${label} uploaded successfully!`);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const previewSrc = isRemoved ? '' : (value || defaultValue);
  const displaySrc = getAssetUrl(previewSrc);

  const isVideoPreview =
    isVideoField ||
    previewSrc?.endsWith('.mp4') ||
    previewSrc?.endsWith('.webm') ||
    previewSrc?.endsWith('.mov');

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-bold text-slate-800 block">{label}</label>
          {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            isRemoved
              ? 'bg-rose-100 text-rose-800 border border-rose-300'
              : isDefault
              ? 'bg-slate-200 text-slate-700'
              : 'bg-amber-100 text-amber-800 border border-amber-300'
          }`}
        >
          {isRemoved
            ? isVideoField
              ? 'No Video (Removed)'
              : 'No Image (Removed)'
            : isDefault
            ? 'Default Asset'
            : isVideoField
            ? 'Custom Video'
            : 'Custom Asset'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Preview Box */}
        <div className="w-28 h-20 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center shrink-0 relative group">
          {isRemoved ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-950 p-2 text-center">
              {isVideoField ? (
                <Film className="w-6 h-6 opacity-40 mb-1" />
              ) : (
                <ImageIcon className="w-6 h-6 opacity-40 mb-1" />
              )}
              <span className="text-[10px] font-semibold">
                {isVideoField ? 'Video Removed' : 'Image Removed'}
              </span>
            </div>
          ) : isVideoPreview ? (
            <video src={displaySrc} className="w-full h-full object-cover" muted loop autoPlay />
          ) : (
            <img
              src={displaySrc}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (defaultValue) {
                  e.currentTarget.src = getAssetUrl(defaultValue);
                }
              }}
            />
          )}
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-2 w-full">
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              isRemoved
                ? isVideoField
                  ? '(Video removed / empty)'
                  : '(Image removed / empty)'
                : defaultValue
            }
            className="w-full text-xs font-mono px-3 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
          />

          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors">
              {uploading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#016839]" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-[#016839]" />
              )}
              <span>
                {uploading
                  ? isVideoField
                    ? 'Uploading Video...'
                    : 'Uploading...'
                  : isVideoField
                  ? 'Upload Video'
                  : 'Upload New Image'}
              </span>
              <input
                type="file"
                className="hidden"
                accept={
                  isVideoField
                    ? 'video/mp4,video/webm,video/quicktime,video/*'
                    : 'image/*,video/mp4'
                }
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>

            {!isRemoved && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title={isVideoField ? 'Remove video from website' : 'Remove image from website'}
              >
                <Trash2 className="w-3 h-3" /> {isVideoField ? 'Remove Video' : 'Remove Image'}
              </button>
            )}

            {(isCustom || isRemoved) && (
              <button
                type="button"
                onClick={() => onChange(defaultValue)}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Reset to default asset"
              >
                <RotateCcw className="w-3 h-3" /> Reset Default
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Section & Card Visibility / Enabled Toggle Header
function CardVisibilityToggle({ enabled = true, onChange, title, subtitle }) {
  const isEnabled = enabled !== false;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-200/80">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">{title}</h4>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isEnabled
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {isEnabled ? 'Active on Website' : 'Hidden / Removed'}
          </span>
        </div>
        {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!isEnabled)}
        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto ${
          isEnabled
            ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50 shadow-sm'
            : 'bg-[#016839] text-white border-[#016839] hover:bg-[#014d28] shadow-sm'
        }`}
      >
        {isEnabled ? (
          <>
            <EyeOff className="w-3.5 h-3.5" />
            <span>Hide / Remove Card</span>
          </>
        ) : (
          <>
            <Eye className="w-3.5 h-3.5" />
            <span>Show / Restore Card</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function HomePageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState(DEFAULT_HOMEPAGE_CMS);

  // Fetch current setting from backend
  const { data: cmsSetting, isLoading } = useQuery({
    queryKey: ['admin-homepage-cms'],
    queryFn: () => getSettingByKey('homepage'),
  });

  // Populate data when loaded
  useEffect(() => {
    if (cmsSetting?.value) {
      setFormData({
        hero: {
          enabled: cmsSetting.value.hero?.enabled !== false,
          videoUrl:
            cmsSetting.value.hero?.videoUrl !== undefined
              ? cmsSetting.value.hero.videoUrl
              : DEFAULT_HOMEPAGE_CMS.hero.videoUrl,
          headlineLine1:
            cmsSetting.value.hero?.headlineLine1 !== undefined
              ? cmsSetting.value.hero.headlineLine1
              : DEFAULT_HOMEPAGE_CMS.hero.headlineLine1,
          headlineLine2:
            cmsSetting.value.hero?.headlineLine2 !== undefined
              ? cmsSetting.value.hero.headlineLine2
              : DEFAULT_HOMEPAGE_CMS.hero.headlineLine2,
          buttonText:
            cmsSetting.value.hero?.buttonText !== undefined
              ? cmsSetting.value.hero.buttonText
              : DEFAULT_HOMEPAGE_CMS.hero.buttonText,
          buttonLink:
            cmsSetting.value.hero?.buttonLink !== undefined
              ? cmsSetting.value.hero.buttonLink
              : DEFAULT_HOMEPAGE_CMS.hero.buttonLink,
        },
        specialtyApp: {
          enabled: cmsSetting.value.specialtyApp?.enabled !== false,
          bgImageUrl:
            cmsSetting.value.specialtyApp?.bgImageUrl !== undefined
              ? cmsSetting.value.specialtyApp.bgImageUrl
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.bgImageUrl,
          phoneImageUrl: DEFAULT_HOMEPAGE_CMS.specialtyApp.phoneImageUrl,
          appIconUrl:
            cmsSetting.value.specialtyApp?.appIconUrl !== undefined
              ? cmsSetting.value.specialtyApp.appIconUrl
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.appIconUrl,
          leftTitle:
            cmsSetting.value.specialtyApp?.leftTitle !== undefined
              ? cmsSetting.value.specialtyApp.leftTitle
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.leftTitle,
          leftDescription:
            cmsSetting.value.specialtyApp?.leftDescription !== undefined
              ? cmsSetting.value.specialtyApp.leftDescription
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.leftDescription,
          leftCtaText:
            cmsSetting.value.specialtyApp?.leftCtaText !== undefined
              ? cmsSetting.value.specialtyApp.leftCtaText
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.leftCtaText,
          leftCtaLink:
            cmsSetting.value.specialtyApp?.leftCtaLink !== undefined
              ? cmsSetting.value.specialtyApp.leftCtaLink
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.leftCtaLink,
          termsText:
            cmsSetting.value.specialtyApp?.termsText !== undefined
              ? cmsSetting.value.specialtyApp.termsText
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.termsText,
          rightTitle:
            cmsSetting.value.specialtyApp?.rightTitle !== undefined
              ? cmsSetting.value.specialtyApp.rightTitle
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.rightTitle,
          rightDescription:
            cmsSetting.value.specialtyApp?.rightDescription !== undefined
              ? cmsSetting.value.specialtyApp.rightDescription
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.rightDescription,
          appStoreLink:
            cmsSetting.value.specialtyApp?.appStoreLink !== undefined
              ? cmsSetting.value.specialtyApp.appStoreLink
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.appStoreLink,
          googlePlayLink:
            cmsSetting.value.specialtyApp?.googlePlayLink !== undefined
              ? cmsSetting.value.specialtyApp.googlePlayLink
              : DEFAULT_HOMEPAGE_CMS.specialtyApp.googlePlayLink,
        },
        broncosBanner: {
          enabled: cmsSetting.value.broncosBanner?.enabled !== false,
          bannerImageUrl:
            cmsSetting.value.broncosBanner?.bannerImageUrl !== undefined
              ? cmsSetting.value.broncosBanner.bannerImageUrl
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.bannerImageUrl,
          title:
            cmsSetting.value.broncosBanner?.title !== undefined
              ? cmsSetting.value.broncosBanner.title
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.title,
          description:
            cmsSetting.value.broncosBanner?.description !== undefined
              ? cmsSetting.value.broncosBanner.description
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.description,
          buttonText:
            cmsSetting.value.broncosBanner?.buttonText !== undefined
              ? cmsSetting.value.broncosBanner.buttonText
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.buttonText,
          buttonLink:
            cmsSetting.value.broncosBanner?.buttonLink !== undefined
              ? cmsSetting.value.broncosBanner.buttonLink
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.buttonLink,
          termsText:
            cmsSetting.value.broncosBanner?.termsText !== undefined
              ? cmsSetting.value.broncosBanner.termsText
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.termsText,
          logo1Url:
            cmsSetting.value.broncosBanner?.logo1Url !== undefined
              ? cmsSetting.value.broncosBanner.logo1Url
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.logo1Url,
          logo2Url:
            cmsSetting.value.broncosBanner?.logo2Url !== undefined
              ? cmsSetting.value.broncosBanner.logo2Url
              : DEFAULT_HOMEPAGE_CMS.broncosBanner.logo2Url,
        },
        bentoGrid: {
          igCard: {
            enabled: cmsSetting.value.bentoGrid?.igCard?.enabled !== false,
            imageUrl:
              cmsSetting.value.bentoGrid?.igCard?.imageUrl !== undefined
                ? cmsSetting.value.bentoGrid.igCard.imageUrl
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.imageUrl,
            title:
              cmsSetting.value.bentoGrid?.igCard?.title !== undefined
                ? cmsSetting.value.bentoGrid.igCard.title
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.title,
            subtitle:
              cmsSetting.value.bentoGrid?.igCard?.subtitle !== undefined
                ? cmsSetting.value.bentoGrid.igCard.subtitle
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.subtitle,
            handle:
              cmsSetting.value.bentoGrid?.igCard?.handle !== undefined
                ? cmsSetting.value.bentoGrid.igCard.handle
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.handle,
            link:
              cmsSetting.value.bentoGrid?.igCard?.link !== undefined
                ? cmsSetting.value.bentoGrid.igCard.link
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.link,
          },
          gameCard: {
            enabled: cmsSetting.value.bentoGrid?.gameCard?.enabled !== false,
            imageUrl:
              cmsSetting.value.bentoGrid?.gameCard?.imageUrl !== undefined
                ? cmsSetting.value.bentoGrid.gameCard.imageUrl
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.imageUrl,
            title:
              cmsSetting.value.bentoGrid?.gameCard?.title !== undefined
                ? cmsSetting.value.bentoGrid.gameCard.title
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.title,
            description:
              cmsSetting.value.bentoGrid?.gameCard?.description !== undefined
                ? cmsSetting.value.bentoGrid.gameCard.description
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.description,
            buttonText:
              cmsSetting.value.bentoGrid?.gameCard?.buttonText !== undefined
                ? cmsSetting.value.bentoGrid.gameCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.buttonText,
            buttonLink:
              cmsSetting.value.bentoGrid?.gameCard?.buttonLink !== undefined
                ? cmsSetting.value.bentoGrid.gameCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.buttonLink,
          },
          tuesdayCard: {
            enabled: cmsSetting.value.bentoGrid?.tuesdayCard?.enabled !== false,
            badge:
              cmsSetting.value.bentoGrid?.tuesdayCard?.badge !== undefined
                ? cmsSetting.value.bentoGrid.tuesdayCard.badge
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.tuesdayCard.badge,
            title:
              cmsSetting.value.bentoGrid?.tuesdayCard?.title !== undefined
                ? cmsSetting.value.bentoGrid.tuesdayCard.title
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.tuesdayCard.title,
            description:
              cmsSetting.value.bentoGrid?.tuesdayCard?.description !== undefined
                ? cmsSetting.value.bentoGrid.tuesdayCard.description
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.tuesdayCard.description,
            buttonText:
              cmsSetting.value.bentoGrid?.tuesdayCard?.buttonText !== undefined
                ? cmsSetting.value.bentoGrid.tuesdayCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.tuesdayCard.buttonText,
            buttonLink:
              cmsSetting.value.bentoGrid?.tuesdayCard?.buttonLink !== undefined
                ? cmsSetting.value.bentoGrid.tuesdayCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.bentoGrid.tuesdayCard.buttonLink,
          },
        },
        featureCards: {
          placesCard: {
            enabled: cmsSetting.value.featureCards?.placesCard?.enabled !== false,
            imageUrl:
              cmsSetting.value.featureCards?.placesCard?.imageUrl !== undefined
                ? cmsSetting.value.featureCards.placesCard.imageUrl
                : DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.imageUrl,
            title:
              cmsSetting.value.featureCards?.placesCard?.title !== undefined
                ? cmsSetting.value.featureCards.placesCard.title
                : DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.title,
            description:
              cmsSetting.value.featureCards?.placesCard?.description !== undefined
                ? cmsSetting.value.featureCards.placesCard.description
                : DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.description,
            buttonText:
              cmsSetting.value.featureCards?.placesCard?.buttonText !== undefined
                ? cmsSetting.value.featureCards.placesCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.buttonText,
            buttonLink:
              cmsSetting.value.featureCards?.placesCard?.buttonLink !== undefined
                ? cmsSetting.value.featureCards.placesCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.buttonLink,
          },
          stationCard: {
            enabled: cmsSetting.value.featureCards?.stationCard?.enabled !== false,
            bgImageUrl:
              cmsSetting.value.featureCards?.stationCard?.bgImageUrl !== undefined
                ? cmsSetting.value.featureCards.stationCard.bgImageUrl
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.bgImageUrl,
            pumpsImageUrl:
              cmsSetting.value.featureCards?.stationCard?.pumpsImageUrl !== undefined
                ? cmsSetting.value.featureCards.stationCard.pumpsImageUrl
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.pumpsImageUrl,
            title:
              cmsSetting.value.featureCards?.stationCard?.title !== undefined
                ? cmsSetting.value.featureCards.stationCard.title
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.title,
            description:
              cmsSetting.value.featureCards?.stationCard?.description !== undefined
                ? cmsSetting.value.featureCards.stationCard.description
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.description,
            buttonText:
              cmsSetting.value.featureCards?.stationCard?.buttonText !== undefined
                ? cmsSetting.value.featureCards.stationCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.buttonText,
            buttonLink:
              cmsSetting.value.featureCards?.stationCard?.buttonLink !== undefined
                ? cmsSetting.value.featureCards.stationCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.buttonLink,
          },
          surveyCard: {
            enabled: cmsSetting.value.featureCards?.surveyCard?.enabled !== false,
            imageUrl:
              cmsSetting.value.featureCards?.surveyCard?.imageUrl !== undefined
                ? cmsSetting.value.featureCards.surveyCard.imageUrl
                : DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.imageUrl,
            title:
              cmsSetting.value.featureCards?.surveyCard?.title !== undefined
                ? cmsSetting.value.featureCards.surveyCard.title
                : DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.title,
            description:
              cmsSetting.value.featureCards?.surveyCard?.description !== undefined
                ? cmsSetting.value.featureCards.surveyCard.description
                : DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.description,
            buttonText:
              cmsSetting.value.featureCards?.surveyCard?.buttonText !== undefined
                ? cmsSetting.value.featureCards.surveyCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.buttonText,
            buttonLink:
              cmsSetting.value.featureCards?.surveyCard?.buttonLink !== undefined
                ? cmsSetting.value.featureCards.surveyCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.buttonLink,
          },
          kickbackCard: {
            enabled: cmsSetting.value.featureCards?.kickbackCard?.enabled !== false,
            imageUrl:
              cmsSetting.value.featureCards?.kickbackCard?.imageUrl !== undefined
                ? cmsSetting.value.featureCards.kickbackCard.imageUrl
                : DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.imageUrl,
            title:
              cmsSetting.value.featureCards?.kickbackCard?.title !== undefined
                ? cmsSetting.value.featureCards.kickbackCard.title
                : DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.title,
            description:
              cmsSetting.value.featureCards?.kickbackCard?.description !== undefined
                ? cmsSetting.value.featureCards.kickbackCard.description
                : DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.description,
            buttonText:
              cmsSetting.value.featureCards?.kickbackCard?.buttonText !== undefined
                ? cmsSetting.value.featureCards.kickbackCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.buttonText,
            buttonLink:
              cmsSetting.value.featureCards?.kickbackCard?.buttonLink !== undefined
                ? cmsSetting.value.featureCards.kickbackCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.buttonLink,
          },
          extraCards: Array.isArray(cmsSetting.value.featureCards?.extraCards)
            ? cmsSetting.value.featureCards.extraCards.map((c) => ({
                id: c.id || String(Date.now() + Math.random()),
                enabled: c.enabled !== false,
                imageUrl: c.imageUrl ?? '',
                title: c.title ?? '',
                description: c.description ?? '',
                buttonText: c.buttonText ?? '',
                buttonLink: c.buttonLink ?? '',
              }))
            : [],
        },
        socialRatings: {
          enabled: cmsSetting.value.socialRatings?.enabled !== false,
          socialCard: {
            enabled: cmsSetting.value.socialRatings?.socialCard?.enabled !== false,
            title:
              cmsSetting.value.socialRatings?.socialCard?.title !== undefined
                ? cmsSetting.value.socialRatings.socialCard.title
                : DEFAULT_HOMEPAGE_CMS.socialRatings.socialCard.title,
            instagramUrl:
              cmsSetting.value.socialRatings?.socialCard?.instagramUrl !== undefined
                ? cmsSetting.value.socialRatings.socialCard.instagramUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.socialCard.instagramUrl,
            facebookUrl:
              cmsSetting.value.socialRatings?.socialCard?.facebookUrl !== undefined
                ? cmsSetting.value.socialRatings.socialCard.facebookUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.socialCard.facebookUrl,
            youtubeUrl:
              cmsSetting.value.socialRatings?.socialCard?.youtubeUrl !== undefined
                ? cmsSetting.value.socialRatings.socialCard.youtubeUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.socialCard.youtubeUrl,
          },
          ratingsCard: {
            enabled: cmsSetting.value.socialRatings?.ratingsCard?.enabled !== false,
            appIconUrl:
              cmsSetting.value.socialRatings?.ratingsCard?.appIconUrl !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.appIconUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.appIconUrl,
            appName:
              cmsSetting.value.socialRatings?.ratingsCard?.appName !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.appName
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.appName,
            rating1Value:
              cmsSetting.value.socialRatings?.ratingsCard?.rating1Value !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating1Value
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating1Value,
            rating1Count:
              cmsSetting.value.socialRatings?.ratingsCard?.rating1Count !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating1Count
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating1Count,
            rating1ImageUrl:
              cmsSetting.value.socialRatings?.ratingsCard?.rating1ImageUrl !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating1ImageUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating1ImageUrl,
            rating1Link:
              cmsSetting.value.socialRatings?.ratingsCard?.rating1Link !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating1Link
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating1Link,
            rating2Value:
              cmsSetting.value.socialRatings?.ratingsCard?.rating2Value !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating2Value
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating2Value,
            rating2Count:
              cmsSetting.value.socialRatings?.ratingsCard?.rating2Count !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating2Count
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating2Count,
            rating2ImageUrl:
              cmsSetting.value.socialRatings?.ratingsCard?.rating2ImageUrl !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating2ImageUrl
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating2ImageUrl,
            rating2Link:
              cmsSetting.value.socialRatings?.ratingsCard?.rating2Link !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.rating2Link
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.rating2Link,
            buttonText:
              cmsSetting.value.socialRatings?.ratingsCard?.buttonText !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.buttonText,
            buttonLink:
              cmsSetting.value.socialRatings?.ratingsCard?.buttonLink !== undefined
                ? cmsSetting.value.socialRatings.ratingsCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.buttonLink,
          },
          testimonialCard: {
            enabled: cmsSetting.value.socialRatings?.testimonialCard?.enabled !== false,
            stars:
              cmsSetting.value.socialRatings?.testimonialCard?.stars !== undefined
                ? cmsSetting.value.socialRatings.testimonialCard.stars
                : DEFAULT_HOMEPAGE_CMS.socialRatings.testimonialCard.stars,
            quote:
              cmsSetting.value.socialRatings?.testimonialCard?.quote !== undefined
                ? cmsSetting.value.socialRatings.testimonialCard.quote
                : DEFAULT_HOMEPAGE_CMS.socialRatings.testimonialCard.quote,
            author:
              cmsSetting.value.socialRatings?.testimonialCard?.author !== undefined
                ? cmsSetting.value.socialRatings.testimonialCard.author
                : DEFAULT_HOMEPAGE_CMS.socialRatings.testimonialCard.author,
            buttonText:
              cmsSetting.value.socialRatings?.testimonialCard?.buttonText !== undefined
                ? cmsSetting.value.socialRatings.testimonialCard.buttonText
                : DEFAULT_HOMEPAGE_CMS.socialRatings.testimonialCard.buttonText,
            buttonLink:
              cmsSetting.value.socialRatings?.testimonialCard?.buttonLink !== undefined
                ? cmsSetting.value.socialRatings.testimonialCard.buttonLink
                : DEFAULT_HOMEPAGE_CMS.socialRatings.testimonialCard.buttonLink,
          },
        },
        newsletter: {
          enabled: cmsSetting.value.newsletter?.enabled !== false,
          title:
            cmsSetting.value.newsletter?.title !== undefined
              ? cmsSetting.value.newsletter.title
              : DEFAULT_HOMEPAGE_CMS.newsletter.title,
          description:
            cmsSetting.value.newsletter?.description !== undefined
              ? cmsSetting.value.newsletter.description
              : DEFAULT_HOMEPAGE_CMS.newsletter.description,
          buttonText:
            cmsSetting.value.newsletter?.buttonText !== undefined
              ? cmsSetting.value.newsletter.buttonText
              : DEFAULT_HOMEPAGE_CMS.newsletter.buttonText,
          termsText:
            cmsSetting.value.newsletter?.termsText !== undefined
              ? cmsSetting.value.newsletter.termsText
              : DEFAULT_HOMEPAGE_CMS.newsletter.termsText,
        },
      });
    }
  }, [cmsSetting]);

  // Mutation to save CMS settings
  const saveMutation = useMutation({
    mutationFn: async (updatedData) => {
      await updateSetting('homepage', updatedData);
      // Also update 'hero' key for backward compatibility
      if (updatedData.hero) {
        await updateSetting('hero', {
          headline: `${updatedData.hero.headlineLine1} ${updatedData.hero.headlineLine2}`,
          subheadline: updatedData.hero.buttonText,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-homepage-cms'] });
      toast.success('Home page CMS settings saved! Customer site updated.');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    },
  });

  const handleResetAll = () => {
    if (
      window.confirm(
        'Are you sure you want to reset ALL home page images and text to the original pristine Conoco defaults?'
      )
    ) {
      setFormData(DEFAULT_HOMEPAGE_CMS);
      saveMutation.mutate(DEFAULT_HOMEPAGE_CMS);
    }
  };

  const sections = [
    { id: 'hero', label: '1. Hero & Video Banner', icon: Layout },
    { id: 'specialty', label: '2. Specialty Phone Bento', icon: Smartphone },
    { id: 'broncos', label: '3. Broncos Partnership VIP', icon: Trophy },
    { id: 'bento', label: '4. 3-Card Bento Grid', icon: Grid },
    { id: 'features', label: '5. Station & Rewards Cards', icon: CreditCard },
    { id: 'socialRatings', label: '6. Social, Ratings & Reviews', icon: Star },
    { id: 'newsletter', label: '7. Newsletter & Community Form', icon: Mail },
  ];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#016839] flex items-center justify-center font-bold">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Home Page CMS &amp; Image Manager
              </h2>
              <p className="text-xs text-slate-500">
                Upload &amp; customize images, headlines, and buttons. Built-in fail-safe protection ensures missing or deleted assets safely fall back to default Conoco visuals.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Site
          </a>

          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3.5 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Defaults
          </button>

          <button
            type="button"
            onClick={() => saveMutation.mutate(formData)}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            {saveMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saveMutation.isPending ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#016839]' : 'text-slate-400'}`} />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HERO & VIDEO BANNER */}
      {activeSection === 'hero' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">Hero Section Content &amp; Video</h3>
            <p className="text-xs text-slate-500">
              Customize the full-width hero headlines, call-to-action button, and looping background MP4 video. Empty fields will remain cleanly empty on the customer site without collapsing the layout.
            </p>
          </div>

          <CardVisibilityToggle
            title="Hero Section Visibility"
            subtitle="Enable, disable, or remove the entire hero banner from the home page"
            enabled={formData.hero.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, enabled: val },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  Text Content &amp; Button
                </span>
                <span className="text-[11px] text-slate-400">Optional (leave blank to hide)</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 1 (Fuel Callout)
                </label>
                <input
                  type="text"
                  value={formData.hero.headlineLine1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, headlineLine1: e.target.value },
                    })
                  }
                  placeholder="The fuel that lets you GO GO GO."
                  className="w-full text-sm font-semibold px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty if you do not want to display line 1</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Headline Line 2 (App Callout)
                </label>
                <input
                  type="text"
                  value={formData.hero.headlineLine2}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, headlineLine2: e.target.value },
                    })
                  }
                  placeholder="The app that lets you SAVE SAVE SAVE."
                  className="w-full text-sm font-semibold px-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty if you do not want to display line 2</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonText: e.target.value },
                      })
                    }
                    placeholder="Download the app"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide button</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Target Link
                  </label>
                  <input
                    type="text"
                    value={formData.hero.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, buttonLink: e.target.value },
                      })
                    }
                    placeholder="https://onelink.to/xpxtfg"
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#016839] bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">URL or relative route</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Background Video Only */}
            <div className="lg:col-span-5 space-y-4">
              <MediaField
                label="Hero Background Video"
                isVideo={true}
                value={formData.hero.videoUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.hero.videoUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, videoUrl: val },
                  })
                }
                hint="Looping MP4 video file. If removed, the section displays a sleek dark forecourt backdrop without collapsing."
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: SPECIALTY PHONE BENTO */}
      {activeSection === 'specialty' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Specialty Fuel Forward® App Bento Card
            </h3>
            <p className="text-xs text-slate-500">
              Manage the 3-column specialty card. Center smartphone mockup is locked to protect visual structure. All other text, icons, background, and links can be customized or cleared without collapsing.
            </p>
          </div>

          <CardVisibilityToggle
            title="Specialty App Bento Card Visibility"
            subtitle="Enable or disable the 3-column Fuel Forward phone app showcase on the home page"
            enabled={formData.specialtyApp.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                specialtyApp: { ...formData.specialtyApp, enabled: val },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column Controls */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  Left Column Content
                </span>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>

              <MediaField
                label="Fuel Forward® App Icon"
                value={formData.specialtyApp.appIconUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.specialtyApp.appIconUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    specialtyApp: { ...formData.specialtyApp, appIconUrl: val },
                  })
                }
                hint="App icon displayed above the left heading. Leave empty to hide."
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Left Title</label>
                <input
                  type="text"
                  value={formData.specialtyApp.leftTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, leftTitle: e.target.value },
                    })
                  }
                  placeholder="Save on Every.<br />Single. Tank."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">HTML tags like &lt;br /&gt; are supported</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Left Description
                </label>
                <textarea
                  rows="3"
                  value={formData.specialtyApp.leftDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: {
                        ...formData.specialtyApp,
                        leftDescription: e.target.value,
                      },
                    })
                  }
                  placeholder="Get the Fuel Forward® App to save up to 20¢/gallon* on your first fill-up."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide description</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.leftCtaText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: { ...formData.specialtyApp, leftCtaText: e.target.value },
                      })
                    }
                    placeholder="Find a station"
                    className="w-full text-xs px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide button</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    CTA Link
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.leftCtaLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: { ...formData.specialtyApp, leftCtaLink: e.target.value },
                      })
                    }
                    placeholder="/contact"
                    className="w-full text-xs font-mono px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Route or URL</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Terms &amp; Conditions Disclaimer
                </label>
                <input
                  type="text"
                  value={formData.specialtyApp.termsText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, termsText: e.target.value },
                    })
                  }
                  placeholder="*Terms and conditions apply. See details."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide terms disclaimer</p>
              </div>
            </div>

            {/* Center Column: Locked Smartphone Mockup + Background Image */}
            <div className="space-y-4">
              {/* Locked Smartphone Mockup Card */}
              <div className="bg-slate-100 border border-slate-300/80 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Floating Smartphone Mockup</span>
                    </label>
                    <p className="text-[11px] text-slate-500">Center mobile app screen</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" /> Locked
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-24 h-24 bg-slate-900 rounded-lg overflow-hidden border border-slate-300 flex items-center justify-center shrink-0 relative">
                    <img
                      src={getAssetUrl('/uploads/Cropped-phone.jpg')}
                      alt="Phone Mockup"
                      className="w-full h-full object-cover object-top opacity-80"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white/90 drop-shadow" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5 text-xs text-slate-600">
                    <p className="font-bold text-slate-800">Fixed Forecourt Component</p>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      This 3D phone graphic is an official forecourt brand standard and is locked from editing to prevent layout collapse.
                    </p>
                    <div className="text-[10px] font-mono text-slate-400 bg-slate-200/80 px-2 py-1 rounded">
                      /uploads/Cropped-phone.jpg (Read-only)
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Map Background Image */}
              <MediaField
                label="Card Map Background Image"
                value={formData.specialtyApp.bgImageUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.specialtyApp.bgImageUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    specialtyApp: { ...formData.specialtyApp, bgImageUrl: val },
                  })
                }
                hint="Faded street map background behind the card. If removed, card displays a clean white forecourt backdrop without collapsing."
              />
            </div>

            {/* Right Column Controls */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#016839]">
                  Right Column &amp; Stores
                </span>
                <span className="text-[11px] text-slate-400">Optional</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Right Title</label>
                <input
                  type="text"
                  value={formData.specialtyApp.rightTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: { ...formData.specialtyApp, rightTitle: e.target.value },
                    })
                  }
                  placeholder="Stack and save. Again and again."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide right title</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Right Description
                </label>
                <textarea
                  rows="3"
                  value={formData.specialtyApp.rightDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialtyApp: {
                        ...formData.specialtyApp,
                        rightDescription: e.target.value,
                      },
                    })
                  }
                  placeholder="Combine multiple discounts for bigger savings every time you fuel up."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide description</p>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    App Store Link
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.appStoreLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: {
                          ...formData.specialtyApp,
                          appStoreLink: e.target.value,
                        },
                      })
                    }
                    placeholder="https://apps.apple.com/..."
                    className="w-full text-xs font-mono px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide App Store badge</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Google Play Link
                  </label>
                  <input
                    type="text"
                    value={formData.specialtyApp.googlePlayLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialtyApp: {
                          ...formData.specialtyApp,
                          googlePlayLink: e.target.value,
                        },
                      })
                    }
                    placeholder="https://play.google.com/..."
                    className="w-full text-xs font-mono px-2.5 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide Google Play badge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BRONCOS PARTNERSHIP VIP */}
      {activeSection === 'broncos' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              3. VIP Partnership Banner
            </h3>
            <p className="text-xs text-slate-500">
              Manage the full-width VIP tickets contest banner, background imagery, partner logos, headlines, and terms.
            </p>
          </div>

          <CardVisibilityToggle
            title="VIP Partnership Banner Visibility"
            subtitle="Enable, disable, or hide the full-width VIP contest banner on the customer home page"
            enabled={formData.broncosBanner.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                broncosBanner: { ...formData.broncosBanner, enabled: val },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Panel: Content & Call-to-Action (7 cols) */}
            <div className="lg:col-span-7 bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  📝 Content &amp; Call-to-Action
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Customize headlines, promotional body text, button, and legal disclaimers.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Banner Headline
                </label>
                <input
                  type="text"
                  value={formData.broncosBanner.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      broncosBanner: { ...formData.broncosBanner, title: e.target.value },
                    })
                  }
                  placeholder="e.g. BRONCOS FANS. GO VIP."
                  className="w-full text-sm font-semibold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Banner Description
                </label>
                <textarea
                  rows="4"
                  value={formData.broncosBanner.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      broncosBanner: {
                        ...formData.broncosBanner,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="Promotional copy..."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.broncosBanner.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        broncosBanner: {
                          ...formData.broncosBanner,
                          buttonText: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. Learn More"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove button</p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Button URL
                  </label>
                  <input
                    type="text"
                    value={formData.broncosBanner.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        broncosBanner: {
                          ...formData.broncosBanner,
                          buttonLink: e.target.value,
                        },
                      })
                    }
                    placeholder="https://..."
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Destination page link</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Terms &amp; Official Rules Notice
                </label>
                <textarea
                  rows="2"
                  value={formData.broncosBanner.termsText}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      broncosBanner: { ...formData.broncosBanner, termsText: e.target.value },
                    })
                  }
                  placeholder="*Terms and conditions apply. See official rules for details..."
                  className="w-full text-xs px-3.5 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Displayed in small legal font. Leave empty to remove.</p>
              </div>
            </div>

            {/* Right Panel: Imagery & Dual Logos (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    🖼️ Background Image
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Atmospheric stadium hero background. If removed, the card displays an ambient dark forecourt gradient.
                  </p>
                </div>

                <MediaField
                  label="Stadium Atmosphere Background Image"
                  value={formData.broncosBanner.bannerImageUrl}
                  defaultValue={DEFAULT_HOMEPAGE_CMS.broncosBanner.bannerImageUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      broncosBanner: { ...formData.broncosBanner, bannerImageUrl: val },
                    })
                  }
                  hint="Recommended high-resolution landscape photo"
                />
              </div>

              <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    🤝 Dual Co-Branded Logos
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Displayed side-by-side above headline. If both are removed, the logo row is hidden.
                  </p>
                </div>

                <div className="space-y-4">
                  <MediaField
                    label="Partner Logo 1 (Brand Logo)"
                    value={formData.broncosBanner.logo1Url}
                    defaultValue={DEFAULT_HOMEPAGE_CMS.broncosBanner.logo1Url}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        broncosBanner: { ...formData.broncosBanner, logo1Url: val },
                      })
                    }
                    hint="White reverse logo (left side)"
                  />
                  <MediaField
                    label="Partner Logo 2 (Team / Sponsor Logo)"
                    value={formData.broncosBanner.logo2Url}
                    defaultValue={DEFAULT_HOMEPAGE_CMS.broncosBanner.logo2Url}
                    onChange={(val) =>
                      setFormData({
                        ...formData,
                        broncosBanner: { ...formData.broncosBanner, logo2Url: val },
                      })
                    }
                    hint="Official team insignia (right side)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 3-CARD BENTO GRID */}
      {activeSection === 'bento' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              4. Community Bento Grid (3 Cards)
            </h3>
            <p className="text-xs text-slate-500">
              Manage the 3-column community bento cards: Instagram lifestyle post, Seventh Inning sketch interactive game, and Ten Cent Tuesdays savings card. Hiding cards will automatically center the remaining cards on the customer site.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Card 1: Instagram */}
            <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
              <CardVisibilityToggle
                title="Card 1: Instagram Post"
                subtitle="Lifestyle destination card"
                enabled={formData.bentoGrid.igCard.enabled}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    bentoGrid: {
                      ...formData.bentoGrid,
                      igCard: { ...formData.bentoGrid.igCard, enabled: val },
                    },
                  })
                }
              />

              <MediaField
                label="Card Background Image"
                value={formData.bentoGrid.igCard.imageUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.bentoGrid.igCard.imageUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    bentoGrid: {
                      ...formData.bentoGrid,
                      igCard: { ...formData.bentoGrid.igCard, imageUrl: val },
                    },
                  })
                }
                hint="Atmospheric photo. If removed, card displays dark forecourt gradient."
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Headline</label>
                <input
                  type="text"
                  value={formData.bentoGrid.igCard.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        igCard: { ...formData.bentoGrid.igCard, title: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. One tank, four destinations..."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.bentoGrid.igCard.subtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        igCard: { ...formData.bentoGrid.igCard, subtitle: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. Ready to GO GO GO?"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove subtitle</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Social Handle</label>
                  <input
                    type="text"
                    value={formData.bentoGrid.igCard.handle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          igCard: { ...formData.bentoGrid.igCard, handle: e.target.value },
                        },
                      })
                    }
                    placeholder="@petrol"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Green handle tag</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={formData.bentoGrid.igCard.link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          igCard: { ...formData.bentoGrid.igCard, link: e.target.value },
                        },
                      })
                    }
                    placeholder="https://..."
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Top icon button link</p>
                </div>
              </div>
            </div>

            {/* Card 2: Interactive Game */}
            <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
              <CardVisibilityToggle
                title="Card 2: Interactive Game"
                subtitle="Sleuthing interactive game card"
                enabled={formData.bentoGrid.gameCard.enabled}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    bentoGrid: {
                      ...formData.bentoGrid,
                      gameCard: { ...formData.bentoGrid.gameCard, enabled: val },
                    },
                  })
                }
              />

              <MediaField
                label="Game Background Image"
                value={formData.bentoGrid.gameCard.imageUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.bentoGrid.gameCard.imageUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    bentoGrid: {
                      ...formData.bentoGrid,
                      gameCard: { ...formData.bentoGrid.gameCard, imageUrl: val },
                    },
                  })
                }
                hint="Game artwork. If removed, card displays dark forecourt gradient."
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Game Title</label>
                <input
                  type="text"
                  value={formData.bentoGrid.gameCard.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        gameCard: { ...formData.bentoGrid.gameCard, title: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. Test your sleuthing skills."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove title</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Game Description</label>
                <textarea
                  rows="3"
                  value={formData.bentoGrid.gameCard.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        gameCard: { ...formData.bentoGrid.gameCard, description: e.target.value },
                      },
                    })
                  }
                  placeholder="Interactive game rules and description..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.bentoGrid.gameCard.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          gameCard: { ...formData.bentoGrid.gameCard, buttonText: e.target.value },
                        },
                      })
                    }
                    placeholder="e.g. Start your search"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Leave empty to hide</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Game URL</label>
                  <input
                    type="text"
                    value={formData.bentoGrid.gameCard.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          gameCard: { ...formData.bentoGrid.gameCard, buttonLink: e.target.value },
                        },
                      })
                    }
                    placeholder="https://..."
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Game destination link</p>
                </div>
              </div>
            </div>

            {/* Card 3: Ten Cent Tuesdays */}
            <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
              <CardVisibilityToggle
                title="Card 3: Tuesdays Promo"
                subtitle="First Tuesday discounts card"
                enabled={formData.bentoGrid.tuesdayCard.enabled}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    bentoGrid: {
                      ...formData.bentoGrid,
                      tuesdayCard: { ...formData.bentoGrid.tuesdayCard, enabled: val },
                    },
                  })
                }
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Badge Callout (Accent)</label>
                <input
                  type="text"
                  value={formData.bentoGrid.tuesdayCard.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        tuesdayCard: { ...formData.bentoGrid.tuesdayCard, badge: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. 10¢"
                  className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Highlighted green badge. Leave empty to hide badge.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Promo Title</label>
                <input
                  type="text"
                  value={formData.bentoGrid.tuesdayCard.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        tuesdayCard: { ...formData.bentoGrid.tuesdayCard, title: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. Ten Cent Tuesdays"
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove title</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Promo Description</label>
                <textarea
                  rows="3"
                  value={formData.bentoGrid.tuesdayCard.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bentoGrid: {
                        ...formData.bentoGrid,
                        tuesdayCard: {
                          ...formData.bentoGrid,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Promotional savings details..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.bentoGrid.tuesdayCard.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          tuesdayCard: {
                            ...formData.bentoGrid,
                            buttonText: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. Start saving now"
                    className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Leave empty to hide</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Action Link</label>
                  <input
                    type="text"
                    value={formData.bentoGrid.tuesdayCard.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bentoGrid: {
                          ...formData.bentoGrid,
                          tuesdayCard: {
                            ...formData.bentoGrid,
                            buttonLink: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="https://..."
                    className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Button URL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: STATION & REWARDS CARDS */}
      {activeSection === 'features' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Station Finder, Opinions Survey &amp; Rewards Cards
            </h3>
            <p className="text-xs text-slate-500">
              Manage images and text for the Split Dispenser Card, Closest Station Map, Guest Survey, and KickBack Rewards.
            </p>
          </div>

          {/* Feature Split Card ('Thousands of places to save') */}
          <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
            <CardVisibilityToggle
              title="5. Feature Split Card ('Thousands of places to save')"
              subtitle="Prominent split showcase card featuring dispenser artwork, promotional headline, and action button"
              enabled={formData.featureCards.placesCard.enabled}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  featureCards: {
                    ...formData.featureCards,
                    placesCard: { ...formData.featureCards.placesCard, enabled: val },
                  },
                })
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (7 cols): Content & Call to Action */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    📝 Content &amp; Call-to-Action
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Customize the headline, descriptive copy, and call-to-action link.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Feature Headline</label>
                  <input
                    type="text"
                    value={formData.featureCards.placesCard.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          placesCard: { ...formData.featureCards.placesCard, title: e.target.value },
                        },
                      })
                    }
                    placeholder="e.g. Thousands of places to save."
                    className="w-full text-sm font-semibold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Description Copy</label>
                  <textarea
                    rows="3"
                    value={formData.featureCards.placesCard.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          placesCard: {
                            ...formData.featureCards.placesCard,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Body description copy..."
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Button Label</label>
                    <input
                      type="text"
                      value={formData.featureCards.placesCard.buttonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featureCards: {
                            ...formData.featureCards,
                            placesCard: { ...formData.featureCards.placesCard, buttonText: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g. Learn more"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Leave empty to hide button</p>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.featureCards.placesCard.buttonLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featureCards: {
                            ...formData.featureCards,
                            placesCard: { ...formData.featureCards.placesCard, buttonLink: e.target.value },
                          },
                        })
                      }
                      placeholder="/rewards or https://..."
                      className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Destination page link</p>
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Dispenser Media */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    🖼️ Dispenser Photo
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    High-quality forecourt dispenser photo. If removed, the card text expands smoothly without collapsing.
                  </p>
                </div>

                <MediaField
                  label="Dispenser / Station Photo"
                  value={formData.featureCards.placesCard.imageUrl}
                  defaultValue={DEFAULT_HOMEPAGE_CMS.featureCards.placesCard.imageUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        placesCard: { ...formData.featureCards.placesCard, imageUrl: val },
                      },
                    })
                  }
                  hint="Aspect ratio ~4:3 landscape photo"
                />
              </div>
            </div>
          </div>

          {/* 7. Nearest Station Finder Card ("Find your closest station.") */}
          <div className="bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
            <CardVisibilityToggle
              title="7. Nearest Station Finder Card ('Find your closest station.')"
              subtitle="Specialty locator card with street map texture background and cutout fuel dispenser art"
              enabled={formData.featureCards.stationCard.enabled}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  featureCards: {
                    ...formData.featureCards,
                    stationCard: { ...formData.featureCards.stationCard, enabled: val },
                  },
                })
              }
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (7 cols): Content & Call to Action */}
              <div className="lg:col-span-7 space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    📝 Content &amp; Call-to-Action
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Customize the promotional headline, descriptive copy, and locator button link.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Headline / Title</label>
                  <input
                    type="text"
                    value={formData.featureCards.stationCard.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          stationCard: { ...formData.featureCards.stationCard, title: e.target.value },
                        },
                      })
                    }
                    placeholder="e.g. Find your closest station."
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                  <textarea
                    rows="3"
                    value={formData.featureCards.stationCard.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          stationCard: {
                            ...formData.featureCards.stationCard,
                            description: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. You’re on the go. We’re on your route..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.featureCards.stationCard.buttonText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featureCards: {
                            ...formData.featureCards,
                            stationCard: { ...formData.featureCards.stationCard, buttonText: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g. Find your fuel"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.featureCards.stationCard.buttonLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featureCards: {
                            ...formData.featureCards,
                            stationCard: { ...formData.featureCards.stationCard, buttonLink: e.target.value },
                          },
                        })
                      }
                      placeholder="e.g. /contact or https://..."
                      className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Media & Imagery */}
              <div className="lg:col-span-5 space-y-4">
                <div className="border-b border-slate-200 pb-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                    🖼️ Background &amp; Cutout Pump Graphic
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Background street map texture and transparent fuel dispenser graphic.
                  </p>
                </div>

                <MediaField
                  label="Street Map Background"
                  value={formData.featureCards.stationCard.bgImageUrl}
                  defaultValue={DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.bgImageUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        stationCard: {
                          ...formData.featureCards.stationCard,
                          bgImageUrl: val,
                        },
                      },
                    })
                  }
                  hint="Map texture background image (e.g. /uploads/street-map-bg.jpeg)"
                />

                <MediaField
                  label="Cutout Pumps Graphic"
                  value={formData.featureCards.stationCard.pumpsImageUrl}
                  defaultValue={DEFAULT_HOMEPAGE_CMS.featureCards.stationCard.pumpsImageUrl}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        stationCard: {
                          ...formData.featureCards.stationCard,
                          pumpsImageUrl: val,
                        },
                      },
                    })
                  }
                  hint="Transparent PNG graphic anchored to the bottom right"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                8. Forecourt &amp; Rewards Promotional Cards
              </h4>
              <p className="text-xs text-slate-500">
                Manage promotional cards (Customer Survey, KickBack Rewards) and dynamically add more cards.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newCard = {
                  id: `extra-${Date.now()}`,
                  enabled: true,
                  imageUrl: '',
                  title: '',
                  description: '',
                  buttonText: 'Learn more',
                  buttonLink: '/',
                };
                setFormData({
                  ...formData,
                  featureCards: {
                    ...formData.featureCards,
                    extraCards: [...(formData.featureCards.extraCards || []), newCard],
                  },
                });
                toast.success('New promotional card added!');
              }}
              className="inline-flex items-center gap-1.5 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Plus className="w-3.5 h-3.5" /> Add Promotional Card
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1: Customer Survey */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <CardVisibilityToggle
                title="1. Customer Survey Card"
                subtitle="Customer opinions & feedback rewards promo"
                enabled={formData.featureCards.surveyCard.enabled}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    featureCards: {
                      ...formData.featureCards,
                      surveyCard: { ...formData.featureCards.surveyCard, enabled: val },
                    },
                  })
                }
              />

              <MediaField
                label="Survey Image"
                value={formData.featureCards.surveyCard.imageUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.featureCards.surveyCard.imageUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    featureCards: {
                      ...formData.featureCards,
                      surveyCard: { ...formData.featureCards.surveyCard, imageUrl: val },
                    },
                  })
                }
                hint="Landscape photo (e.g. /uploads/pay-at-pump-survey.jpeg)"
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={formData.featureCards.surveyCard.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        surveyCard: { ...formData.featureCards.surveyCard, title: e.target.value },
                      },
                    })
                  }
                  placeholder="e.g. You’ve got opinions. We’ve got rewards."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.featureCards.surveyCard.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        surveyCard: {
                          ...formData.featureCards.surveyCard,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g. Visited a station lately? Take a quick survey..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.featureCards.surveyCard.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          surveyCard: { ...formData.featureCards.surveyCard, buttonText: e.target.value },
                        },
                      })
                    }
                    placeholder="e.g. Take a survey"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={formData.featureCards.surveyCard.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          surveyCard: { ...formData.featureCards.surveyCard, buttonLink: e.target.value },
                        },
                      })
                    }
                    placeholder="e.g. https://..."
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: KickBack Rewards */}
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm">
              <CardVisibilityToggle
                title="2. KickBack® Rewards Card"
                subtitle="Loyalty points & miles rewards promo"
                enabled={formData.featureCards.kickbackCard.enabled}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    featureCards: {
                      ...formData.featureCards,
                      kickbackCard: { ...formData.featureCards.kickbackCard, enabled: val },
                    },
                  })
                }
              />

              <MediaField
                label="KickBack Card Graphic"
                value={formData.featureCards.kickbackCard.imageUrl}
                defaultValue={DEFAULT_HOMEPAGE_CMS.featureCards.kickbackCard.imageUrl}
                onChange={(val) =>
                  setFormData({
                    ...formData,
                    featureCards: {
                      ...formData.featureCards,
                      kickbackCard: {
                        ...formData.featureCards.kickbackCard,
                        imageUrl: val,
                      },
                    },
                  })
                }
                hint="Card artwork graphic (e.g. /uploads/kickback-card.jpeg)"
              />

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Headline / Title</label>
                <input
                  type="text"
                  value={formData.featureCards.kickbackCard.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        kickbackCard: {
                          ...formData.featureCards.kickbackCard,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g. KickBack® Rewards maximize your miles."
                  className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.featureCards.kickbackCard.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      featureCards: {
                        ...formData.featureCards,
                        kickbackCard: {
                          ...formData.featureCards.kickbackCard,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="e.g. Earn rewards on fuel and other purchases..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Text</label>
                  <input
                    type="text"
                    value={formData.featureCards.kickbackCard.buttonText}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          kickbackCard: {
                            ...formData.featureCards.kickbackCard,
                            buttonText: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. Learn more"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Link</label>
                  <input
                    type="text"
                    value={formData.featureCards.kickbackCard.buttonLink}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        featureCards: {
                          ...formData.featureCards,
                          kickbackCard: {
                            ...formData.featureCards.kickbackCard,
                            buttonLink: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="e.g. /rewards or https://..."
                    className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Extra Cards */}
            {formData.featureCards.extraCards?.map((extraCard, idx) => (
              <div
                key={extraCard.id || idx}
                className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm relative animate-in fade-in duration-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#016839] flex items-center justify-center text-xs font-bold">
                      {idx + 3}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-slate-800">
                        {extraCard.title || `Custom Promotional Card ${idx + 1}`}
                      </h5>
                      <p className="text-[10px] text-slate-500">User-added promotional card</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = formData.featureCards.extraCards.map((c, i) =>
                          i === idx ? { ...c, enabled: c.enabled === false ? true : false } : c
                        );
                        setFormData({
                          ...formData,
                          featureCards: { ...formData.featureCards, extraCards: updated },
                        });
                      }}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                        extraCard.enabled !== false
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      {extraCard.enabled !== false ? 'Active' : 'Hidden'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this promotional card?')) {
                          const updated = formData.featureCards.extraCards.filter((_, i) => i !== idx);
                          setFormData({
                            ...formData,
                            featureCards: { ...formData.featureCards, extraCards: updated },
                          });
                          toast.success('Card deleted!');
                        }
                      }}
                      className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <MediaField
                  label="Card Image"
                  value={extraCard.imageUrl}
                  defaultValue=""
                  onChange={(val) => {
                    const updated = formData.featureCards.extraCards.map((c, i) =>
                      i === idx ? { ...c, imageUrl: val } : c
                    );
                    setFormData({
                      ...formData,
                      featureCards: { ...formData.featureCards, extraCards: updated },
                    });
                  }}
                  hint="Upload promotional card image"
                />

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Headline / Title</label>
                  <input
                    type="text"
                    value={extraCard.title}
                    onChange={(e) => {
                      const updated = formData.featureCards.extraCards.map((c, i) =>
                        i === idx ? { ...c, title: e.target.value } : c
                      );
                      setFormData({
                        ...formData,
                        featureCards: { ...formData.featureCards, extraCards: updated },
                      });
                    }}
                    placeholder="e.g. Special Holiday Offer"
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Description</label>
                  <textarea
                    rows="2"
                    value={extraCard.description}
                    onChange={(e) => {
                      const updated = formData.featureCards.extraCards.map((c, i) =>
                        i === idx ? { ...c, description: e.target.value } : c
                      );
                      setFormData({
                        ...formData,
                        featureCards: { ...formData.featureCards, extraCards: updated },
                      });
                    }}
                    placeholder="e.g. Save even more when you fuel up this week..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={extraCard.buttonText}
                      onChange={(e) => {
                        const updated = formData.featureCards.extraCards.map((c, i) =>
                          i === idx ? { ...c, buttonText: e.target.value } : c
                        );
                        setFormData({
                          ...formData,
                          featureCards: { ...formData.featureCards, extraCards: updated },
                        });
                      }}
                      placeholder="e.g. Learn more"
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={extraCard.buttonLink}
                      onChange={(e) => {
                        const updated = formData.featureCards.extraCards.map((c, i) =>
                          i === idx ? { ...c, buttonLink: e.target.value } : c
                        );
                        setFormData({
                          ...formData,
                          featureCards: { ...formData.featureCards, extraCards: updated },
                        });
                      }}
                      placeholder="e.g. /rewards or https://..."
                      className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 6: SOCIAL, APP RATINGS & TESTIMONIALS */}
      {activeSection === 'socialRatings' && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b pb-4">
            <h3 className="text-base font-bold text-slate-900">
              Social, App Ratings &amp; Reviews Content
            </h3>
            <p className="text-xs text-slate-500">
              Manage the 3-column row featuring the forest green social follow card, app store review ratings, and customer testimonial quote.
            </p>
          </div>

          <CardVisibilityToggle
            title="Social &amp; Reviews Row Visibility"
            subtitle="Enable, disable, or completely remove the entire 3-card social &amp; reviews row from the home page"
            enabled={formData.socialRatings?.enabled}
            onChange={(val) =>
              setFormData({
                ...formData,
                socialRatings: {
                  ...formData.socialRatings,
                  enabled: val,
                },
              })
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* CARD 1: SOCIAL FOLLOW */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50 flex flex-col justify-between">
              <div className="space-y-4">
                <CardVisibilityToggle
                  title="Card 1: Social Follow"
                  subtitle="Green social follow banner card"
                  enabled={formData.socialRatings?.socialCard?.enabled}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      socialRatings: {
                        ...formData.socialRatings,
                        socialCard: {
                          ...formData.socialRatings.socialCard,
                          enabled: val,
                        },
                      },
                    })
                  }
                />

                <div className="p-3 bg-[#016839]/10 border border-[#016839]/20 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-[#016839]">Card Background</span>
                  <span className="font-mono font-semibold text-[#016839]">Brand Forest Green (#016839)</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Card Headline</label>
                  <input
                    type="text"
                    value={formData.socialRatings?.socialCard?.title !== undefined ? formData.socialRatings.socialCard.title : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          socialCard: {
                            ...formData.socialRatings.socialCard,
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="Follow to stay in the know while you go."
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
                </div>

                <div className="space-y-3 pt-1">
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Social Profile Links (leave empty to hide icon)
                  </p>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      value={formData.socialRatings?.socialCard?.instagramUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            socialCard: {
                              ...formData.socialRatings.socialCard,
                              instagramUrl: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://www.instagram.com/conoco/"
                      className="w-full text-xs font-mono px-3 py-2 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="text"
                      value={formData.socialRatings?.socialCard?.facebookUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            socialCard: {
                              ...formData.socialRatings.socialCard,
                              facebookUrl: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://www.facebook.com/conoco"
                      className="w-full text-xs font-mono px-3 py-2 border rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      YouTube URL
                    </label>
                    <input
                      type="text"
                      value={formData.socialRatings?.socialCard?.youtubeUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            socialCard: {
                              ...formData.socialRatings.socialCard,
                              youtubeUrl: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://youtube.com/..."
                      className="w-full text-xs font-mono px-3 py-2 border rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: APP STORE & GOOGLE PLAY RATINGS */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50 flex flex-col justify-between">
              <div className="space-y-4">
                <CardVisibilityToggle
                  title="Card 2: App Ratings"
                  subtitle="Store ratings &amp; badges card"
                  enabled={formData.socialRatings?.ratingsCard?.enabled}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      socialRatings: {
                        ...formData.socialRatings,
                        ratingsCard: {
                          ...formData.socialRatings.ratingsCard,
                          enabled: val,
                        },
                      },
                    })
                  }
                />

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">App Name</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.ratingsCard?.appName !== undefined ? formData.socialRatings.ratingsCard.appName : ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            ratingsCard: {
                              ...formData.socialRatings.ratingsCard,
                              appName: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Fuel Forward® App"
                      className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove</p>
                  </div>

                  <MediaField
                    label="App Icon Image"
                    value={formData.socialRatings?.ratingsCard?.appIconUrl}
                    defaultValue={DEFAULT_HOMEPAGE_CMS.socialRatings.ratingsCard.appIconUrl}
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          ratingsCard: {
                            ...formData.socialRatings.ratingsCard,
                            appIconUrl: url,
                          },
                        },
                      })
                    }
                    hint="Upload square app icon image (SVG, PNG, or JPG). Replaces the old badge design."
                  />
                </div>

                {/* App Store Column */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Apple App Store
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Rating</label>
                      <input
                        type="text"
                        value={formData.socialRatings?.ratingsCard?.rating1Value || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialRatings: {
                              ...formData.socialRatings,
                              ratingsCard: {
                                ...formData.socialRatings.ratingsCard,
                                rating1Value: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="4.9"
                        className="w-full text-xs font-bold px-2.5 py-1.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Reviews</label>
                      <input
                        type="text"
                        value={formData.socialRatings?.ratingsCard?.rating1Count || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialRatings: {
                              ...formData.socialRatings,
                              ratingsCard: {
                                ...formData.socialRatings.ratingsCard,
                                rating1Count: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="53K reviews"
                        className="w-full text-xs px-2.5 py-1.5 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Store URL</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.ratingsCard?.rating1Link || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            ratingsCard: {
                              ...formData.socialRatings.ratingsCard,
                              rating1Link: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://apps.apple.com/..."
                      className="w-full text-xs font-mono px-2.5 py-1.5 border rounded-lg"
                    />
                  </div>

                  <MediaField
                    label="App Store Badge Image"
                    value={formData.socialRatings?.ratingsCard?.rating1ImageUrl}
                    defaultValue="/uploads/app-store.png"
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          ratingsCard: {
                            ...formData.socialRatings.ratingsCard,
                            rating1ImageUrl: url,
                          },
                        },
                      })
                    }
                  />
                </div>

                {/* Google Play Column */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                    Google Play Store
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Rating</label>
                      <input
                        type="text"
                        value={formData.socialRatings?.ratingsCard?.rating2Value || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialRatings: {
                              ...formData.socialRatings,
                              ratingsCard: {
                                ...formData.socialRatings.ratingsCard,
                                rating2Value: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="4.4"
                        className="w-full text-xs font-bold px-2.5 py-1.5 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Reviews</label>
                      <input
                        type="text"
                        value={formData.socialRatings?.ratingsCard?.rating2Count || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialRatings: {
                              ...formData.socialRatings,
                              ratingsCard: {
                                ...formData.socialRatings.ratingsCard,
                                rating2Count: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="7.99K reviews"
                        className="w-full text-xs px-2.5 py-1.5 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Store URL</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.ratingsCard?.rating2Link || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            ratingsCard: {
                              ...formData.socialRatings.ratingsCard,
                              rating2Link: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://play.google.com/..."
                      className="w-full text-xs font-mono px-2.5 py-1.5 border rounded-lg"
                    />
                  </div>

                  <MediaField
                    label="Google Play Badge Image"
                    value={formData.socialRatings?.ratingsCard?.rating2ImageUrl}
                    defaultValue="/uploads/google-play.png"
                    onChange={(url) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          ratingsCard: {
                            ...formData.socialRatings.ratingsCard,
                            rating2ImageUrl: url,
                          },
                        },
                      })
                    }
                  />
                </div>

                {/* Bottom CTA */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Bottom Link Text</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.ratingsCard?.buttonText !== undefined ? formData.socialRatings.ratingsCard.buttonText : ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            ratingsCard: {
                              ...formData.socialRatings.ratingsCard,
                              buttonText: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Download the app"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">Leave empty to remove</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Bottom Link URL</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.ratingsCard?.buttonLink !== undefined ? formData.socialRatings.ratingsCard.buttonLink : ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            ratingsCard: {
                              ...formData.socialRatings.ratingsCard,
                              buttonLink: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://onelink.to/..."
                      className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: 5-STAR TESTIMONIAL */}
            <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50 flex flex-col justify-between">
              <div className="space-y-4">
                <CardVisibilityToggle
                  title="Card 3: Customer Review"
                  subtitle="5-Star quote testimonial card"
                  enabled={formData.socialRatings?.testimonialCard?.enabled}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      socialRatings: {
                        ...formData.socialRatings,
                        testimonialCard: {
                          ...formData.socialRatings.testimonialCard,
                          enabled: val,
                        },
                      },
                    })
                  }
                />

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Star Icons Display</label>
                  <input
                    type="text"
                    value={formData.socialRatings?.testimonialCard?.stars !== undefined ? formData.socialRatings.testimonialCard.stars : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          testimonialCard: {
                            ...formData.socialRatings.testimonialCard,
                            stars: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="★★★★★"
                    className="w-full text-sm font-bold text-[#016839] px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove stars</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Customer Quote / Review
                  </label>
                  <textarea
                    rows={4}
                    value={formData.socialRatings?.testimonialCard?.quote !== undefined ? formData.socialRatings.testimonialCard.quote : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          testimonialCard: {
                            ...formData.socialRatings.testimonialCard,
                            quote: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="“The Fuel Forward app makes filling up so easy...”"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove quote</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Reviewer Name &amp; Role / Source
                  </label>
                  <input
                    type="text"
                    value={formData.socialRatings?.testimonialCard?.author !== undefined ? formData.socialRatings.testimonialCard.author : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialRatings: {
                          ...formData.socialRatings,
                          testimonialCard: {
                            ...formData.socialRatings.testimonialCard,
                            author: e.target.value,
                          },
                        },
                      })
                    }
                    placeholder="— Sarah M., App User"
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove reviewer</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.testimonialCard?.buttonText !== undefined ? formData.socialRatings.testimonialCard.buttonText : ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            testimonialCard: {
                              ...formData.socialRatings.testimonialCard,
                              buttonText: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="Try the app"
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                    <p className="text-[10px] text-slate-400 mt-0.5">Leave empty to remove</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.socialRatings?.testimonialCard?.buttonLink !== undefined ? formData.socialRatings.testimonialCard.buttonLink : ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialRatings: {
                            ...formData.socialRatings,
                            testimonialCard: {
                              ...formData.socialRatings.testimonialCard,
                              buttonLink: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="https://onelink.to/..."
                      className="w-full text-xs font-mono px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-[#016839]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Newsletter & Community Form Section */}
      {activeSection === 'newsletter' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#016839]" /> 7. Newsletter &amp; Community Sign-up
                </h3>
                <p className="text-xs text-slate-500">
                  Control the headline, subtitle copy, button text, and privacy terms shown in the footer newsletter block.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    newsletter: {
                      ...formData.newsletter,
                      enabled: formData.newsletter?.enabled === false ? true : false,
                    },
                  })
                }
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap ${
                  formData.newsletter?.enabled !== false
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                    : 'bg-rose-50 text-rose-700 border-rose-300 shadow-sm'
                }`}
              >
                {formData.newsletter?.enabled !== false ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Active on Website</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden / Removed</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-5 max-w-3xl">
              {/* Title / Headline */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Headline / Title
                </label>
                <input
                  type="text"
                  value={formData.newsletter?.title !== undefined ? formData.newsletter.title : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        title: e.target.value,
                      },
                    })
                  }
                  placeholder="Get emails you actually like."
                  className="w-full text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove headline</p>
              </div>

              {/* Subtitle / Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Subtitle
                </label>
                <textarea
                  rows={3}
                  value={formData.newsletter?.description !== undefined ? formData.newsletter.description : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        description: e.target.value,
                      },
                    })
                  }
                  placeholder="With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove description</p>
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Submit Button Text
                </label>
                <input
                  type="text"
                  value={formData.newsletter?.buttonText !== undefined ? formData.newsletter.buttonText : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        buttonText: e.target.value,
                      },
                    })
                  }
                  placeholder="Submit"
                  className="w-full sm:w-64 text-xs font-bold px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
              </div>

              {/* Terms / Disclaimer */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Terms &amp; Privacy Disclaimer
                </label>
                <textarea
                  rows={2}
                  value={formData.newsletter?.termsText !== undefined ? formData.newsletter.termsText : ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter: {
                        ...formData.newsletter,
                        termsText: e.target.value,
                      },
                    })
                  }
                  placeholder="By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA."
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl bg-white focus:ring-2 focus:ring-[#016839]"
                />
                <p className="text-[11px] text-slate-400 mt-1">Leave empty to remove disclaimer</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
