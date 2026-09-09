import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Upload, FileText, X, Loader2 } from 'lucide-react';
import { SafeImage } from '../utils/imageHelper';
import { submitNewsletterSubscription } from '../api/client';

export default function ConocoBentoRows({
  bannerData,
  bentoGridData,
  featureCardsData,
  socialRatingsData,
  newsletterData,
  onOpenFleetModal,
}) {
  const [newsletter, setNewsletter] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zip: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // 1. Broncos Banner Dynamic Data
  const showBroncos = bannerData?.enabled !== false;
  const safeBannerBg =
    bannerData?.bannerImageUrl &&
    bannerData.bannerImageUrl !== 'none' &&
    bannerData.bannerImageUrl.trim() !== ''
      ? bannerData.bannerImageUrl
      : null;
  const bannerTitle =
    bannerData?.title !== undefined
      ? bannerData.title
      : 'BRONCOS FANS. GO VIP.';
  const bannerDesc =
    bannerData?.description !== undefined
      ? bannerData.description
      : 'Watch the Denver Broncos battle Miami on December 6, 2026 in style. Now through 11/15/26, buy 8+ gallons* with the Fuel Forward® App for a chance to win premium tickets, pregame field passes and so much more.';
  const bannerBtnText =
    bannerData?.buttonText !== undefined
      ? bannerData.buttonText
      : 'Learn More';
  const bannerBtnLink =
    bannerData?.buttonLink !== undefined
      ? bannerData.buttonLink
      : 'https://www.conoco.com/broncos/';
  const bannerTerms =
    bannerData?.termsText !== undefined
      ? bannerData.termsText
      : '*Terms and conditions apply. See official rules for details at www.conoco.com/broncos-rules.';
  const logo1 = bannerData?.logo1Url !== undefined ? bannerData.logo1Url : '/uploads/conoco-rev.png';
  const logo2 = bannerData?.logo2Url !== undefined ? bannerData.logo2Url : '/uploads/broncos-logo.png';
  const hasLogo1 = Boolean(logo1 && logo1 !== 'none' && logo1.trim() !== '');
  const hasLogo2 = Boolean(logo2 && logo2 !== 'none' && logo2.trim() !== '');

  // 2. Bento Grid Dynamic Data
  const showIgCard = bentoGridData?.igCard?.enabled !== false;
  const safeIgBg =
    bentoGridData?.igCard?.imageUrl &&
    bentoGridData.igCard.imageUrl !== 'none' &&
    bentoGridData.igCard.imageUrl.trim() !== ''
      ? bentoGridData.igCard.imageUrl
      : null;
  const igTitle =
    bentoGridData?.igCard?.title !== undefined
      ? bentoGridData.igCard.title
      : 'One tank, four destinations, zero PTO wasted.';
  const igSubtitle =
    bentoGridData?.igCard?.subtitle !== undefined
      ? bentoGridData.igCard.subtitle
      : 'Ready to GO GO GO?';
  const igHandle =
    bentoGridData?.igCard?.handle !== undefined
      ? bentoGridData.igCard.handle
      : '@petrol';
  const igLink =
    bentoGridData?.igCard?.link !== undefined
      ? bentoGridData.igCard.link
      : 'https://www.instagram.com/conoco/';

  const showGameCard = bentoGridData?.gameCard?.enabled !== false;
  const safeGameBg =
    bentoGridData?.gameCard?.imageUrl &&
    bentoGridData.gameCard.imageUrl !== 'none' &&
    bentoGridData.gameCard.imageUrl.trim() !== ''
      ? bentoGridData.gameCard.imageUrl
      : null;
  const gameTitle =
    bentoGridData?.gameCard?.title !== undefined
      ? bentoGridData.gameCard.title
      : 'Test your sleuthing skills.';
  const gameDesc =
    bentoGridData?.gameCard?.description !== undefined
      ? bentoGridData.gameCard.description
      : 'Take a trip to the ballgame in Seventh Inning Sketch, an interactive hidden object game. Only the sharpest eyes can find all ten.';
  const gameBtnText =
    bentoGridData?.gameCard?.buttonText !== undefined
      ? bentoGridData.gameCard.buttonText
      : 'Start your search';
  const gameBtnLink =
    bentoGridData?.gameCard?.buttonLink !== undefined
      ? bentoGridData.gameCard.buttonLink
      : 'https://www.phillips66stadiumsketch.com/';

  const showTuesdayCard = bentoGridData?.tuesdayCard?.enabled !== false;
  const tuesdayBadge =
    bentoGridData?.tuesdayCard?.badge !== undefined
      ? bentoGridData.tuesdayCard.badge
      : '10¢';
  const tuesdayTitle =
    bentoGridData?.tuesdayCard?.title !== undefined
      ? bentoGridData.tuesdayCard.title
      : 'Ten Cent Tuesdays';
  const tuesdayDesc =
    bentoGridData?.tuesdayCard?.description !== undefined
      ? bentoGridData.tuesdayCard.description
      : 'Save an extra 10¢/gal every first Tuesday of the month with the Fuel Forward® App.';
  const tuesdayBtnText =
    bentoGridData?.tuesdayCard?.buttonText !== undefined
      ? bentoGridData.tuesdayCard.buttonText
      : 'Start saving now';
  const tuesdayBtnLink =
    bentoGridData?.tuesdayCard?.buttonLink !== undefined
      ? bentoGridData.tuesdayCard.buttonLink
      : 'https://onelink.to/xpxtfg';

  const activeBentoCount = (showIgCard ? 1 : 0) + (showGameCard ? 1 : 0) + (showTuesdayCard ? 1 : 0);

  // 3. Feature Cards Dynamic Data
  const showPlaces = featureCardsData?.placesCard?.enabled !== false;
  const placesImg =
    featureCardsData?.placesCard?.imageUrl &&
    featureCardsData.placesCard.imageUrl !== 'none' &&
    featureCardsData.placesCard.imageUrl.trim() !== ''
      ? featureCardsData.placesCard.imageUrl
      : null;
  const hasPlacesImg = Boolean(placesImg);
  const placesTitle =
    featureCardsData?.placesCard?.title !== undefined
      ? featureCardsData.placesCard.title
      : 'Thousands of places to save.';
  const placesDesc =
    featureCardsData?.placesCard?.description !== undefined
      ? featureCardsData.placesCard.description
      : 'The Fuel Forward® App gets you a lower price at Phillips 66®, Petrol® and 76® stations in seconds. Download to fill up the smart way.';
  const placesBtnText =
    featureCardsData?.placesCard?.buttonText !== undefined
      ? featureCardsData.placesCard.buttonText
      : 'Learn more';
  const placesBtnLink =
    featureCardsData?.placesCard?.buttonLink !== undefined
      ? featureCardsData.placesCard.buttonLink
      : '/rewards';

  // 5. Nearest Station Finder Card Dynamic Data
  const showStation = featureCardsData?.stationCard?.enabled !== false;
  const stationBg =
    featureCardsData?.stationCard?.bgImageUrl &&
    featureCardsData.stationCard.bgImageUrl !== 'none' &&
    featureCardsData.stationCard.bgImageUrl.trim() !== ''
      ? featureCardsData.stationCard.bgImageUrl
      : null;
  const stationPumpsImg =
    featureCardsData?.stationCard?.pumpsImageUrl &&
    featureCardsData.stationCard.pumpsImageUrl !== 'none' &&
    featureCardsData.stationCard.pumpsImageUrl.trim() !== ''
      ? featureCardsData.stationCard.pumpsImageUrl
      : null;
  const hasPumpsImg = Boolean(stationPumpsImg);
  const stationTitle =
    featureCardsData?.stationCard?.title !== undefined
      ? featureCardsData.stationCard.title
      : 'Find your closest station.';
  const stationDesc =
    featureCardsData?.stationCard?.description !== undefined
      ? featureCardsData.stationCard.description
      : 'You’re on the go. We’re on your route. Tap below to find your nearest station, or map your next adventure with the Plan a Trip tool.';
  const stationBtnText =
    featureCardsData?.stationCard?.buttonText !== undefined
      ? featureCardsData.stationCard.buttonText
      : 'Find your fuel';
  const stationBtnLink =
    featureCardsData?.stationCard?.buttonLink !== undefined
      ? featureCardsData.stationCard.buttonLink
      : '/contact';

  // 6. Forecourt & Rewards Cards (Survey, Kickback, + Dynamic Extra Cards)
  const showSurvey = featureCardsData?.surveyCard?.enabled !== false;
  const surveyImg =
    featureCardsData?.surveyCard?.imageUrl &&
    featureCardsData.surveyCard.imageUrl !== 'none' &&
    featureCardsData.surveyCard.imageUrl.trim() !== ''
      ? featureCardsData.surveyCard.imageUrl
      : (featureCardsData?.surveyCard?.imageUrl !== undefined ? null : '/uploads/pay-at-pump-survey.jpeg');
  const surveyTitle =
    featureCardsData?.surveyCard?.title !== undefined
      ? featureCardsData.surveyCard.title
      : 'You’ve got opinions. We’ve got rewards.';
  const surveyDesc =
    featureCardsData?.surveyCard?.description !== undefined
      ? featureCardsData.surveyCard.description
      : 'Visited a station lately? Take a quick survey about your recent purchase and you could win free gas.';
  const surveyBtnText =
    featureCardsData?.surveyCard?.buttonText !== undefined
      ? featureCardsData.surveyCard.buttonText
      : 'Take a survey';
  const surveyBtnLink =
    featureCardsData?.surveyCard?.buttonLink !== undefined
      ? featureCardsData.surveyCard.buttonLink
      : 'https://www.conocofeedback.com/p66feedback/visit_conoco/home';

  const showKickback = featureCardsData?.kickbackCard?.enabled !== false;
  const kickbackImg =
    featureCardsData?.kickbackCard?.imageUrl &&
    featureCardsData.kickbackCard.imageUrl !== 'none' &&
    featureCardsData.kickbackCard.imageUrl.trim() !== ''
      ? featureCardsData.kickbackCard.imageUrl
      : (featureCardsData?.kickbackCard?.imageUrl !== undefined ? null : '/uploads/kickback-card.jpeg');
  const kickbackTitle =
    featureCardsData?.kickbackCard?.title !== undefined
      ? featureCardsData.kickbackCard.title
      : 'KickBack® Rewards maximize your miles.';
  const kickbackDesc =
    featureCardsData?.kickbackCard?.description !== undefined
      ? featureCardsData.kickbackCard.description
      : 'Earn rewards on fuel and other purchases to spend like cash across thousands of forecourt locations.';
  const kickbackBtnText =
    featureCardsData?.kickbackCard?.buttonText !== undefined
      ? featureCardsData.kickbackCard.buttonText
      : 'Learn more';
  const kickbackBtnLink =
    featureCardsData?.kickbackCard?.buttonLink !== undefined
      ? featureCardsData.kickbackCard.buttonLink
      : '/rewards';

  const extraPromoCards = Array.isArray(featureCardsData?.extraCards)
    ? featureCardsData.extraCards.filter((c) => c && c.enabled !== false)
    : [];

  const forecourtPromoCards = [
    ...(showSurvey
      ? [
          {
            id: 'survey',
            imageUrl: surveyImg,
            title: surveyTitle,
            description: surveyDesc,
            buttonText: surveyBtnText,
            buttonLink: surveyBtnLink,
          },
        ]
      : []),
    ...(showKickback
      ? [
          {
            id: 'kickback',
            imageUrl: kickbackImg,
            title: kickbackTitle,
            description: kickbackDesc,
            buttonText: kickbackBtnText,
            buttonLink: kickbackBtnLink,
          },
        ]
      : []),
    ...extraPromoCards.map((c, i) => ({
      id: c.id || `extra-${i}`,
      imageUrl:
        c.imageUrl && c.imageUrl !== 'none' && c.imageUrl.trim() !== ''
          ? c.imageUrl
          : null,
      title: c.title || '',
      description: c.description || '',
      buttonText: c.buttonText || '',
      buttonLink: c.buttonLink || '',
    })),
  ];

  // 4. Social & Ratings Row Dynamic Data
  const showSocialRow = socialRatingsData?.enabled !== false;

  // Card 1: Social Follow Card
  const socialCard = socialRatingsData?.socialCard || {};
  const showSocialCard = socialCard?.enabled !== false;
  const socialTitle =
    socialCard?.title !== undefined
      ? socialCard.title
      : 'Follow to stay in the know while you go.';
  const igUrl =
    socialCard?.instagramUrl !== undefined
      ? socialCard.instagramUrl
      : 'https://www.instagram.com/conoco/';
  const fbUrl =
    socialCard?.facebookUrl !== undefined
      ? socialCard.facebookUrl
      : 'https://www.facebook.com/conoco';
  const ytUrl =
    socialCard?.youtubeUrl !== undefined
      ? socialCard.youtubeUrl
      : 'https://youtube.com/playlist?list=PLhZANlfVQtQeQq02_i-P-FzxJk8lOKgX-';

  // Card 2: App Ratings Card
  const ratingsCard = socialRatingsData?.ratingsCard || {};
  const showRatingsCard = ratingsCard?.enabled !== false;
  const appIcon =
    ratingsCard?.appIconUrl &&
    ratingsCard.appIconUrl !== 'none' &&
    ratingsCard.appIconUrl.trim() !== ''
      ? ratingsCard.appIconUrl
      : (ratingsCard?.appIconUrl !== undefined ? null : '/uploads/FF-App-Icon.svg');
  const hasAppIcon = Boolean(appIcon);
  const appName =
    ratingsCard?.appName !== undefined ? ratingsCard.appName : 'Fuel Forward® App';
  const r1Val =
    ratingsCard?.rating1Value !== undefined ? ratingsCard.rating1Value : '4.9';
  const r1Count =
    ratingsCard?.rating1Count !== undefined ? ratingsCard.rating1Count : '53K reviews';
  const r1Img =
    ratingsCard?.rating1ImageUrl &&
    ratingsCard.rating1ImageUrl !== 'none' &&
    ratingsCard.rating1ImageUrl.trim() !== ''
      ? ratingsCard.rating1ImageUrl
      : null;
  const r1Link =
    ratingsCard?.rating1Link !== undefined
      ? ratingsCard.rating1Link
      : 'https://apps.apple.com/us/app/my-phillips-66/id922282104';
  const r2Val =
    ratingsCard?.rating2Value !== undefined ? ratingsCard.rating2Value : '4.4';
  const r2Count =
    ratingsCard?.rating2Count !== undefined ? ratingsCard.rating2Count : '7.99K reviews';
  const r2Img =
    ratingsCard?.rating2ImageUrl &&
    ratingsCard.rating2ImageUrl !== 'none' &&
    ratingsCard.rating2ImageUrl.trim() !== ''
      ? ratingsCard.rating2ImageUrl
      : null;
  const r2Link =
    ratingsCard?.rating2Link !== undefined
      ? ratingsCard.rating2Link
      : 'https://play.google.com/store/apps/details?id=com.p66.b2c.stationfinder.p66';
  const ratingsBtnText =
    ratingsCard?.buttonText !== undefined ? ratingsCard.buttonText : 'Download the app';
  const ratingsBtnLink =
    ratingsCard?.buttonLink !== undefined ? ratingsCard.buttonLink : 'https://onelink.to/xpxtfg';

  // Card 3: Testimonial Card
  const testimonialCard = socialRatingsData?.testimonialCard || {};
  const showTestimonialCard = testimonialCard?.enabled !== false;
  const testStars =
    testimonialCard?.stars !== undefined ? testimonialCard.stars : '★★★★★';
  const testQuote =
    testimonialCard?.quote !== undefined
      ? testimonialCard.quote
      : '“The Fuel Forward app makes filling up so easy. I save money and time on every visit.”';
  const testAuthor =
    testimonialCard?.author !== undefined
      ? testimonialCard.author
      : '— Sarah M., App User';
  const testBtnText =
    testimonialCard?.buttonText !== undefined ? testimonialCard.buttonText : 'Try the app';
  const testBtnLink =
    testimonialCard?.buttonLink !== undefined ? testimonialCard.buttonLink : 'https://onelink.to/xpxtfg';

  const activeSocialCardsCount = (showSocialCard ? 1 : 0) + (showRatingsCard ? 1 : 0) + (showTestimonialCard ? 1 : 0);

  // 7. Newsletter Section Dynamic Data (Zero-Fallback, Zero-Collapse)
  const showNewsletter = newsletterData?.enabled !== false;
  const newsletterTitle =
    newsletterData?.title !== undefined
      ? newsletterData.title
      : 'Get emails you actually like.';
  const newsletterDesc =
    newsletterData?.description !== undefined
      ? newsletterData.description
      : 'With special offers and out-of-this-world trip ideas, our emails put adventure on the agenda.';
  const newsletterBtnText =
    newsletterData?.buttonText !== undefined
      ? newsletterData.buttonText
      : 'Submit';
  const newsletterTerms =
    newsletterData?.termsText !== undefined
      ? newsletterData.termsText
      : 'By clicking Submit you agree to our Privacy Statement and Terms & Conditions. This site is protected by reCAPTCHA.';

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!newsletter.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!newsletter.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletter.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!newsletter.phone.trim()) {
      errors.phone = 'Mobile number is required';
    } else {
      const cleanDigits = newsletter.phone.replace(/[\s\-\+\(\)]/g, '');
      if (cleanDigits.length < 7) {
        errors.phone = 'Please enter a valid mobile number (min 7 digits)';
      }
    }

    if (resumeFile) {
      const allowed = ['.pdf', '.doc', '.docx'];
      const ext = '.' + resumeFile.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) {
        errors.resume = 'Only PDF, DOC, or DOCX files are allowed';
      } else if (resumeFile.size > 10 * 1024 * 1024) {
        errors.resume = 'File size cannot exceed 10MB';
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      toast.error('Please fix the highlighted fields');
      return;
    }

    try {
      setSubmitting(true);
      setFormErrors({});

      const formData = new FormData();
      formData.append('firstName', newsletter.firstName.trim());
      if (newsletter.lastName.trim()) formData.append('lastName', newsletter.lastName.trim());
      formData.append('email', newsletter.email.trim().toLowerCase());
      formData.append('phone', newsletter.phone.trim());
      if (newsletter.zip.trim()) formData.append('zip', newsletter.zip.trim());
      if (resumeFile) formData.append('resume', resumeFile);

      await submitNewsletterSubscription(formData);

      setSubmitted(true);
      toast.success('Thank you! Your details and resume have been received.');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Submission failed. Please try again.';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-[1512px] mx-auto px-4 sm:px-8 space-y-8 py-4">

      {/* 1. Full-Width Partnership Bento Banner (Conoco Image 5 Ref: BRONCOS FANS. GO VIP.) */}
      {showBroncos && (
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden min-h-[460px] sm:min-h-[490px] lg:min-h-[510px] flex items-center px-6 py-10 sm:px-12 sm:py-12 lg:px-16 lg:py-14 shadow-2xl bg-gradient-to-br from-[#062814] via-[#0b1b12] to-[#111827] border border-white/5">
          {/* Background Stadium Atmosphere */}
          {safeBannerBg ? (
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url('${safeBannerBg}')`,
              }}
            />
          ) : null}
          {/* Subtle Dark Gradients for Maximum Legibility matching Conoco Reference */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-4xl text-white">
            {/* Dual Logos: Conoco Pill + Broncos */}
            {(hasLogo1 || hasLogo2) && (
              <div className="flex items-center gap-3.5 sm:gap-4 mb-5 sm:mb-7">
                {hasLogo1 && (
                  <SafeImage
                    src={logo1}
                    alt="Brand Logo 1"
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                )}
                {hasLogo1 && hasLogo2 && (
                  <span className="w-[1.5px] h-6 sm:h-7 bg-white/40" />
                )}
                {hasLogo2 && (
                  <SafeImage
                    src={logo2}
                    alt="Denver Broncos Official Logo"
                    className="h-8 sm:h-9 w-auto object-contain"
                  />
                )}
              </div>
            )}

            {/* Headline in Founders Grotesk */}
            {bannerTitle ? (
              <h2 className="font-founders text-3xl min-[480px]:text-4xl sm:text-[42px] lg:text-[46px] xl:text-[48px] font-semibold text-white uppercase tracking-tight leading-[1.05]">
                {bannerTitle}
              </h2>
            ) : null}

            {/* Description in Gotham SSm Book */}
            {bannerDesc ? (
              <p className="font-gotham text-[15px] sm:text-[16px] lg:text-[17px] text-white font-normal leading-[1.48] sm:leading-[1.5] max-w-[800px] mt-3.5 sm:mt-4 mb-6 sm:mb-7">
                {bannerDesc}
              </p>
            ) : null}

            {/* CTA Button in Gotham SSm Bold with Right Arrow */}
            {bannerBtnText ? (
              <div>
                <a
                  href={bannerBtnLink || '#'}
                  target={bannerBtnLink?.startsWith('http') ? '_blank' : '_self'}
                  rel={bannerBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-gotham font-bold text-[15px] sm:text-[16px] px-8 py-3.5 rounded-full shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>{bannerBtnText}</span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="w-4 h-4 stroke-current stroke-[2.2]"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ) : null}

            {/* Legal / Terms Disclaimer in Gotham SSm */}
            {bannerTerms ? (
              <p className="font-gotham text-[11px] sm:text-[12px] text-white/85 font-normal mt-5 sm:mt-6">
                {bannerTerms.includes('www.conoco.com/broncos-rules') ? (
                  <>
                    {bannerTerms.split('www.conoco.com/broncos-rules')[0]}
                    <a
                      href="https://www.conoco.com/broncos/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 hover:text-white"
                    >
                      www.conoco.com/broncos-rules
                    </a>
                    {bannerTerms.split('www.conoco.com/broncos-rules')[1] || '.'}
                  </>
                ) : (
                  bannerTerms
                )}
              </p>
            ) : null}
          </div>
        </div>
      )}

      {/* 2. 3-Column Community Bento Grid: Instagram + Ballgame Sketch + Ten Cent Tuesdays */}
      {activeBentoCount > 0 && (
        <div
          className={`grid grid-cols-1 ${
            activeBentoCount === 1
              ? 'max-w-xl mx-auto'
              : activeBentoCount === 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'lg:grid-cols-3 w-full'
          } gap-6 items-stretch justify-center`}
        >
          {/* Card 1: Instagram Lifestyle Post */}
          {showIgCard && (
            <div
              className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[420px] p-8 sm:p-10 flex flex-col justify-between text-white shadow-md bg-gradient-to-br from-[#062814] via-[#0b1b12] to-[#111827] border border-white/5 transition-all duration-300"
              style={
                safeIgBg
                  ? {
                      backgroundImage: `url('${safeIgBg}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

              {/* Top Instagram icon */}
              {igLink ? (
                <div className="relative z-10">
                  <a
                    href={igLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform"
                    aria-label="Instagram post"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              ) : (
                <div />
              )}

              {/* Bottom text */}
              {(igTitle || igSubtitle || igHandle) && (
                <div className="relative z-10 space-y-2">
                  {igTitle ? (
                    <p className="text-lg font-bold leading-snug">
                      {igTitle}
                    </p>
                  ) : null}
                  {igSubtitle ? (
                    <p className="text-sm font-semibold text-white/80">{igSubtitle}</p>
                  ) : null}
                  {igHandle ? (
                    <span className="text-sm font-bold text-[#84d400] block pt-1">{igHandle}</span>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* Card 2: Seventh Inning Sketch */}
          {showGameCard && (
            <div
              className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[420px] p-8 sm:p-10 flex flex-col justify-between text-white shadow-md bg-gradient-to-br from-[#062814] via-[#0b1b12] to-[#111827] border border-white/5 transition-all duration-300"
              style={
                safeGameBg
                  ? {
                      backgroundImage: `url('${safeGameBg}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

              {(gameTitle || gameDesc) && (
                <div className="relative z-10 space-y-3 pt-12">
                  {gameTitle ? (
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      {gameTitle}
                    </h3>
                  ) : null}
                  {gameDesc ? (
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                      {gameDesc}
                    </p>
                  ) : null}
                </div>
              )}

              {gameBtnText ? (
                <div className="relative z-10 pt-4">
                  <a
                    href={gameBtnLink || '#'}
                    target={gameBtnLink?.startsWith('http') ? '_blank' : '_self'}
                    rel={gameBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 bg-white text-[#161616] hover:bg-[#016839] hover:text-white text-sm font-bold px-6 py-3 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <span>{gameBtnText}</span>
                    <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ) : null}
            </div>
          )}

          {/* Card 3: Ten Cent Tuesdays */}
          {showTuesdayCard && (
            <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow min-h-[420px]">
              {(tuesdayBadge || tuesdayTitle || tuesdayDesc) && (
                <div className="space-y-4">
                  {tuesdayBadge ? (
                    <div className="w-12 h-12 rounded-2xl bg-[#84d400]/20 text-[#016839] border border-[#84d400]/40 flex items-center justify-center font-black text-xl">
                      {tuesdayBadge}
                    </div>
                  ) : null}
                  {tuesdayTitle ? (
                    <h3 className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight leading-tight">
                      {tuesdayTitle}
                    </h3>
                  ) : null}
                  {tuesdayDesc ? (
                    <p className="text-base text-[#555555] leading-relaxed">
                      {tuesdayDesc}
                    </p>
                  ) : null}
                </div>
              )}

              {tuesdayBtnText ? (
                <div className="pt-6">
                  <a
                    href={tuesdayBtnLink || '#'}
                    target={tuesdayBtnLink?.startsWith('http') ? '_blank' : '_self'}
                    rel={tuesdayBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white text-sm font-bold px-6 py-3 rounded-full shadow-md transition-all hover:scale-[1.02]"
                  >
                    <span>{tuesdayBtnText}</span>
                    <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* 3. Split Card: "Thousands of places to save." */}
      {showPlaces && (
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16 py-4 sm:py-8">
          {hasPlacesImg && (
            <div className="lg:col-span-1 h-[340px] sm:h-[420px] lg:h-[460px] xl:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm bg-slate-100">
              <SafeImage
                src={placesImg}
                alt="A Petrol branded fuel dispenser"
                className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          <div
            className={`${
              hasPlacesImg ? 'lg:col-span-1' : 'lg:col-span-2 max-w-2xl mx-auto text-center items-center'
            } space-y-5 sm:space-y-6 flex flex-col justify-center`}
          >
            {placesTitle ? (
              <h2 className="font-founders text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black text-[#161616] tracking-tight leading-[1.12]">
                {placesTitle}
              </h2>
            ) : null}
            {placesDesc ? (
              <p className="font-gotham text-base sm:text-lg text-[#3f3f3f] leading-relaxed max-w-xl">
                {placesDesc}
              </p>
            ) : null}
            {placesBtnText ? (
              <div className="pt-2">
                {placesBtnLink && placesBtnLink.startsWith('http') ? (
                  <a
                    href={placesBtnLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-gotham text-sm sm:text-base font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>{placesBtnText}</span>
                    <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ) : (
                  <Link
                    to={placesBtnLink || '/rewards'}
                    className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white font-gotham text-sm sm:text-base font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                  >
                    <span>{placesBtnText}</span>
                    <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                      <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* 4. 3-Column Social, App Ratings & Review Bento Row (Conoco Image 2 Ref) */}
      {showSocialRow && activeSocialCardsCount > 0 && (
        <div
          className={`grid grid-cols-1 ${
            activeSocialCardsCount === 1
              ? 'max-w-xl mx-auto'
              : activeSocialCardsCount === 2
              ? 'md:grid-cols-2 max-w-4xl mx-auto'
              : 'lg:grid-cols-3'
          } gap-6 sm:gap-8 items-stretch pt-8 sm:pt-12 lg:pt-16 pb-2 sm:pb-4`}
        >
          {/* Card 1: Solid Green Social Follow Card */}
          {showSocialCard && (
            <div className="bg-[#016839] rounded-[24px] sm:rounded-[32px] p-8 sm:p-10 lg:p-12 flex flex-col justify-center text-white shadow-lg min-h-[380px] sm:min-h-[420px] lg:min-h-[440px]">
              {socialTitle ? (
                <h3 className="text-white text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight leading-[1.2]">
                  {socialTitle}
                </h3>
              ) : null}

              {(igUrl || fbUrl || ytUrl) ? (
                <div className="flex items-center gap-4 sm:gap-5 pt-6 sm:pt-8 text-white">
                  {/* Instagram */}
                  {igUrl && igUrl.trim() !== '' && (
                    <a
                      href={igUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform text-white"
                      aria-label="Petrol Instagram"
                    >
                      <svg className="w-9 h-9 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  )}
                  {/* Facebook */}
                  {fbUrl && fbUrl.trim() !== '' && (
                    <a
                      href={fbUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform text-white"
                      aria-label="Petrol Facebook"
                    >
                      <svg className="w-9 h-9 fill-white" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                    </a>
                  )}
                  {/* YouTube */}
                  {ytUrl && ytUrl.trim() !== '' && (
                    <a
                      href={ytUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:scale-110 transition-transform text-white"
                      aria-label="Petrol YouTube"
                    >
                      <svg className="w-10 h-10 fill-white" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* Card 2: App Store & Google Play Ratings Card */}
          {showRatingsCard && (
            <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200/80 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6 sm:space-y-8 shadow-sm min-h-[380px] sm:min-h-[420px] lg:min-h-[440px]">
              {(hasAppIcon || appName) ? (
                <div className="flex items-center gap-4">
                  {hasAppIcon ? (
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-sm flex items-center justify-center flex-shrink-0 bg-transparent">
                      <SafeImage
                        src={appIcon}
                        alt={appName || 'App Icon'}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}

                  {appName ? (
                    <span className="text-xl sm:text-2xl font-black text-[#161616] tracking-tight">
                      {appName}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <div className="grid grid-cols-2 gap-4 pt-1">
                {/* App Store Rating */}
                {(r1Val || r1Count || r1Img) ? (
                  <div className="space-y-1">
                    {(r1Val || r1Count) ? (
                      <div>
                        {r1Val ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#161616] tracking-tight leading-none">{r1Val}</span>
                            <span className="text-2xl sm:text-3xl text-[#016839] leading-none">★</span>
                          </div>
                        ) : null}
                        {r1Count ? <p className="text-sm sm:text-base font-medium text-[#555555] mt-1.5">{r1Count}</p> : null}
                      </div>
                    ) : null}
                    {r1Img && (
                      <div className="pt-3">
                        <a
                          href={r1Link || '#'}
                          target={r1Link?.startsWith('http') ? '_blank' : '_self'}
                          rel={r1Link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block hover:opacity-85 transition-opacity"
                        >
                          <SafeImage
                            src={r1Img}
                            alt="Download on App Store"
                            className="h-10 sm:h-11 w-auto object-contain"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                ) : null}

                {/* Google Play Rating */}
                {(r2Val || r2Count || r2Img) ? (
                  <div className="space-y-1">
                    {(r2Val || r2Count) ? (
                      <div>
                        {r2Val ? (
                          <div className="flex items-center gap-1.5">
                            <span className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#161616] tracking-tight leading-none">{r2Val}</span>
                            <span className="text-2xl sm:text-3xl text-[#016839] leading-none">★</span>
                          </div>
                        ) : null}
                        {r2Count ? <p className="text-sm sm:text-base font-medium text-[#555555] mt-1.5">{r2Count}</p> : null}
                      </div>
                    ) : null}
                    {r2Img && (
                      <div className="pt-3">
                        <a
                          href={r2Link || '#'}
                          target={r2Link?.startsWith('http') ? '_blank' : '_self'}
                          rel={r2Link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block hover:opacity-85 transition-opacity"
                        >
                          <SafeImage
                            src={r2Img}
                            alt="Get it on Google Play"
                            className="h-10 sm:h-11 w-auto object-contain"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              {ratingsBtnText ? (
                <div className="pt-2">
                  <a
                    href={ratingsBtnLink || '#'}
                    target={ratingsBtnLink?.startsWith('http') ? '_blank' : '_self'}
                    rel={ratingsBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#016839] hover:underline cursor-pointer group"
                  >
                    <span>{ratingsBtnText}</span>
                    <span className="text-xl font-bold transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              ) : null}
            </div>
          )}

          {/* Card 3: 5-Star Testimonial Card */}
          {showTestimonialCard && (
            <div className="bg-white rounded-[24px] sm:rounded-[32px] border border-slate-200/80 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6 sm:space-y-7 shadow-sm min-h-[380px] sm:min-h-[420px] lg:min-h-[440px]">
              {(testStars || testQuote || testAuthor) ? (
                <div className="space-y-4">
                  {testStars ? (
                    <div className="flex items-center gap-1 text-[#016839] text-3xl sm:text-4xl lg:text-[42px] tracking-wide leading-none">
                      {testStars}
                    </div>
                  ) : null}

                  {testQuote ? (
                    <blockquote className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#161616] leading-snug">
                      {testQuote}
                    </blockquote>
                  ) : null}

                  {testAuthor ? (
                    <p className="text-sm sm:text-base font-medium text-[#666666]">
                      {testAuthor}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {testBtnText ? (
                <div className="pt-2">
                  <a
                    href={testBtnLink || '#'}
                    target={testBtnLink?.startsWith('http') ? '_blank' : '_self'}
                    rel={testBtnLink?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-[#016839] hover:underline cursor-pointer group"
                  >
                    <span>{testBtnText}</span>
                    <span className="text-xl font-bold transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}

      {/* 5. "Find your closest station." Specialty Card (Conoco Image 3 Ref) */}
      {showStation && (
        <div
          className="relative rounded-[24px] sm:rounded-[32px] border border-slate-200/80 overflow-hidden shadow-sm bg-white transition-all duration-300 min-h-[360px] sm:min-h-[380px] lg:min-h-[400px] xl:min-h-[420px] mt-8 sm:mt-12 lg:mt-16 mb-10 sm:mb-14 lg:mb-20"
          style={
            stationBg
              ? {
                  backgroundImage: `url('${stationBg}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        >
          <div className="flex flex-col lg:flex-row items-stretch justify-between min-h-[360px] sm:min-h-[380px] lg:min-h-[400px] xl:min-h-[420px]">
            {/* Left Text Column - Centered Vertically */}
            <div
              className={`${
                hasPumpsImg ? 'w-full lg:w-1/2 xl:w-[48%]' : 'w-full max-w-2xl'
              } p-8 sm:p-12 lg:p-14 xl:pl-20 xl:pr-6 flex flex-col justify-center space-y-4 sm:space-y-5 relative z-10 my-auto`}
            >
              {stationTitle ? (
                <h2 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-black text-[#161616] tracking-tight leading-[1.1]">
                  {stationTitle}
                </h2>
              ) : null}
              {stationDesc ? (
                <p className="text-sm sm:text-base lg:text-[16px] text-[#444444] font-normal leading-relaxed max-w-[460px]">
                  {stationDesc}
                </p>
              ) : null}
              {stationBtnText ? (
                <div className="pt-1 sm:pt-2">
                  {stationBtnLink && stationBtnLink.startsWith('http') ? (
                    <a
                      href={stationBtnLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white text-sm sm:text-base font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      <span>{stationBtnText}</span>
                      <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                        <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      to={stationBtnLink || '/contact'}
                      className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white text-sm sm:text-base font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                      <span>{stationBtnText}</span>
                      <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                        <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>
              ) : null}
            </div>

            {/* Right Dispenser Pumps Cutout Image - Anchored to bottom right and filling height */}
            {hasPumpsImg && (
              <div className="w-full lg:w-1/2 xl:w-[52%] flex items-end justify-center lg:justify-end relative self-stretch h-[280px] sm:h-[340px] lg:h-auto overflow-hidden">
                <SafeImage
                  src={stationPumpsImg}
                  defaultFallback=""
                  alt="Phillips 66, Petrol, and 76 Fuel Dispensers"
                  className="h-full w-auto max-w-full object-contain object-bottom pointer-events-none"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. Forecourt & Rewards Cards Row: Dynamic & Zero-Collapse */}
      {forecourtPromoCards.length > 0 && (
        <div
          className={`grid grid-cols-1 ${
            forecourtPromoCards.length === 1
              ? 'max-w-2xl mx-auto'
              : forecourtPromoCards.length === 2
              ? 'lg:grid-cols-2'
              : 'md:grid-cols-2 lg:grid-cols-3'
          } gap-6 sm:gap-8 lg:gap-10 items-stretch !mt-12 sm:!mt-16 lg:!mt-24 xl:!mt-28 !mb-6 sm:!mb-8 lg:!mb-10`}
        >
          {forecourtPromoCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-[28px] sm:rounded-[36px] border border-slate-200/80 overflow-hidden shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                card.imageUrl ? 'min-h-[540px] sm:min-h-[600px] lg:min-h-[640px]' : 'min-h-[380px] sm:min-h-[420px]'
              }`}
            >
              {/* Card Image matching Conoco media reference */}
              {card.imageUrl ? (
                <div className="w-full h-[280px] min-[480px]:h-[320px] sm:h-[360px] lg:h-[380px] xl:h-[400px] overflow-hidden bg-slate-100 flex-shrink-0">
                  <SafeImage
                    src={card.imageUrl}
                    defaultFallback=""
                    alt={card.title || 'Promotional Card'}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : null}

              {/* Content Box */}
              <div className="p-8 sm:p-10 lg:p-12 xl:p-14 flex-1 flex flex-col justify-between space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-5">
                  {card.title ? (
                    <h3 className="font-founders text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-black text-[#161616] tracking-tight leading-[1.14]">
                      {card.title}
                    </h3>
                  ) : null}
                  {card.description ? (
                    <p className="font-gotham text-base sm:text-lg lg:text-[17px] text-[#444444] leading-relaxed max-w-xl">
                      {card.description}
                    </p>
                  ) : null}
                </div>

                {card.buttonText ? (
                  <div className="pt-2 sm:pt-4">
                    {card.buttonLink && card.buttonLink.startsWith('http') ? (
                      <a
                        href={card.buttonLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#016839] hover:bg-[#014d28] text-white font-gotham text-sm sm:text-base font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                      >
                        <span>{card.buttonText}</span>
                        <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                          <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        to={card.buttonLink || '/'}
                        className="inline-flex items-center gap-2.5 bg-[#016839] hover:bg-[#014d28] text-white font-gotham text-sm sm:text-base font-bold px-7 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
                      >
                        <span>{card.buttonText}</span>
                        <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                          <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>

      {/* 7. Newsletter Section: Full-Width matching Conoco & reference image */}
      {showNewsletter && (
        <section id="newsletter" className="w-full bg-white rounded-t-[32px] sm:rounded-t-[48px] pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 mt-16 sm:mt-20 lg:mt-24 border-t border-slate-200/60 shadow-sm transition-all min-h-[380px] sm:min-h-[420px]">
          <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12">
            {(newsletterTitle || newsletterDesc) && (
              <div className="max-w-4xl mb-8 sm:mb-10">
                {newsletterTitle ? (
                  <h2 className="font-founders text-3xl sm:text-4xl lg:text-[42px] font-black text-[#161616] tracking-tight leading-tight">
                    {newsletterTitle}
                  </h2>
                ) : null}
                {newsletterDesc ? (
                  <p className="font-gotham text-base sm:text-lg text-[#444444] leading-relaxed mt-2.5">
                    {newsletterDesc}
                  </p>
                ) : null}
              </div>
            )}

            {submitted ? (
              <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3 max-w-2xl">
                <p className="text-2xl font-black">🎉 You are all set!</p>
                <p className="text-sm sm:text-base text-emerald-800 leading-relaxed font-gotham">
                  Your contact details and resume have been successfully received by our management team. We look forward to connecting with you soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setNewsletter({ firstName: '', lastName: '', email: '', phone: '', zip: '' });
                    setResumeFile(null);
                    setFormErrors({});
                  }}
                  className="inline-block mt-3 text-sm font-bold text-[#016839] hover:underline cursor-pointer"
                >
                  Submit another response →
                </button>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-6 sm:gap-y-7">
                  {/* 1. First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      First Name <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                    </label>
                    <input
                      type="text"
                      value={newsletter.firstName}
                      onChange={(e) => {
                        setNewsletter({ ...newsletter, firstName: e.target.value });
                        if (formErrors.firstName) setFormErrors({ ...formErrors, firstName: null });
                      }}
                      className={`w-full bg-white border ${
                        formErrors.firstName ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#016839] focus:ring-1 focus:ring-[#016839]'
                      } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                    />
                    {formErrors.firstName && (
                      <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.firstName}</p>
                    )}
                  </div>

                  {/* 2. Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      Last Name <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                    </label>
                    <input
                      type="text"
                      value={newsletter.lastName}
                      onChange={(e) => setNewsletter({ ...newsletter, lastName: e.target.value })}
                      className="w-full bg-white border border-gray-400 focus:border-[#016839] focus:ring-1 focus:ring-[#016839] rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none"
                    />
                  </div>

                  {/* 3. Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      Email <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                    </label>
                    <input
                      type="email"
                      value={newsletter.email}
                      onChange={(e) => {
                        setNewsletter({ ...newsletter, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: null });
                      }}
                      className={`w-full bg-white border ${
                        formErrors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#016839] focus:ring-1 focus:ring-[#016839]'
                      } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.email}</p>
                    )}
                  </div>

                  {/* 4. Mobile Number */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      Mobile Number <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                    </label>
                    <input
                      type="tel"
                      value={newsletter.phone}
                      onChange={(e) => {
                        setNewsletter({ ...newsletter, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: null });
                      }}
                      placeholder="+44 7700 900077"
                      className={`w-full bg-white border ${
                        formErrors.phone ? 'border-rose-500 ring-1 ring-rose-500' : 'border-gray-400 focus:border-[#016839] focus:ring-1 focus:ring-[#016839]'
                      } rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none`}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.phone}</p>
                    )}
                  </div>

                  {/* 5. Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      Zip Code <span className="font-normal italic text-slate-500 text-xs ml-1.5">required</span>
                    </label>
                    <input
                      type="text"
                      value={newsletter.zip}
                      onChange={(e) => setNewsletter({ ...newsletter, zip: e.target.value })}
                      className="w-full bg-white border border-gray-400 focus:border-[#016839] focus:ring-1 focus:ring-[#016839] rounded-lg h-12 px-4 text-base text-[#161616] outline-none transition-colors shadow-none"
                    />
                  </div>

                  {/* 6. Resume Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-[#161616] mb-2 font-gotham">
                      Upload Resume <span className="font-normal italic text-slate-500 text-xs ml-1.5">(optional .pdf, .doc)</span>
                    </label>
                    {resumeFile ? (
                      <div className="w-full bg-emerald-50 border border-emerald-400 rounded-lg h-12 px-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 truncate">
                          <FileText className="w-4 h-4 text-[#016839] shrink-0" />
                          <span className="font-semibold text-sm text-emerald-950 truncate">{resumeFile.name}</span>
                          <span className="text-xs text-emerald-700 shrink-0">
                            ({(resumeFile.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="p-1 hover:bg-emerald-200 rounded-md text-emerald-800 transition-colors shrink-0"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full bg-white hover:bg-slate-50 border border-gray-400 hover:border-[#016839] rounded-lg h-12 px-4 flex items-center justify-between cursor-pointer transition-colors group">
                        <span className="text-slate-500 text-sm sm:text-base group-hover:text-slate-700 truncate">
                          Attach candidate resume (.pdf, .doc, max 10MB)
                        </span>
                        <Upload className="w-4 h-4 text-slate-500 group-hover:text-[#016839] shrink-0 ml-2" />
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              setResumeFile(f);
                              if (formErrors.resume) setFormErrors({ ...formErrors, resume: null });
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                    {formErrors.resume && (
                      <p className="text-xs text-rose-600 font-medium mt-1.5">{formErrors.resume}</p>
                    )}
                  </div>
                </div>

                {/* Left-Aligned Submit Button matching reference image */}
                {newsletterBtnText ? (
                  <div className="pt-6 sm:pt-7">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#016839] hover:bg-[#014d28] disabled:opacity-60 text-white font-gotham text-base font-bold px-9 py-3.5 rounded-full shadow-sm hover:shadow transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>{newsletterBtnText}</span>
                          <svg className="w-4 h-4 stroke-current stroke-[2.5]" viewBox="0 0 16 16" fill="none">
                            <path d="M3.33 8h9.34M8 3.33L12.67 8 8 12.67" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                ) : null}

                {/* Disclaimer Text: strictly renders what the user entered in Admin */}
                {newsletterTerms && newsletterTerms.trim() !== '' ? (
                  <div className="mt-8 text-xs text-slate-600 leading-relaxed max-w-2xl font-gotham whitespace-pre-line">
                    <p>{newsletterTerms}</p>
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </section>
      )}
    </>
  );
}
