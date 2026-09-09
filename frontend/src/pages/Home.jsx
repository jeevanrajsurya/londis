import { useQuery } from '@tanstack/react-query';
import { getLiveFuelPrices, getSiteSettings, getForecourtServices, getStorePromotions } from '../api/client';

import HeroSection from '../sections/HeroSection';
import AppBentoSection from '../sections/AppBentoSection';
import ConocoBentoRows from '../sections/ConocoBentoRows';

export default function Home({ onOpenValet, onOpenFleet, onOpenJob }) {
  // Fetch live forecourt data with offline fallbacks
  const { data: fuelPrices } = useQuery({
    queryKey: ['live-fuel-prices'],
    queryFn: getLiveFuelPrices,
  });

  const { data: settings } = useQuery({
    queryKey: ['site-settings'],
    queryFn: getSiteSettings,
  });

  const homepageCms = settings?.homepage || {};
  const heroData = homepageCms.hero || settings?.hero || {};
  const specialtyData = homepageCms.specialtyApp || {};
  const bannerData = homepageCms.broncosBanner || {};
  const bentoGridData = homepageCms.bentoGrid || {};
  const featureCardsData = homepageCms.featureCards || {};
  const socialRatingsData = homepageCms.socialRatings || {};
  const newsletterData = homepageCms.newsletter || {};

  return (
    <div className="min-h-screen text-[#161616] space-y-4">
      {/* 1. Hero Section: "The fuel that lets you GO GO GO. The app that lets you SAVE SAVE SAVE." (Conoco Image 1 Ref) */}
      <HeroSection heroData={heroData} />

      {/* 2. 3-Column Specialty Card: Phone Station Finder & Fuel Forward Savings (Conoco Image 4 Ref) */}
      <AppBentoSection
        specialtyData={specialtyData}
        onOpenFleetModal={onOpenFleet}
      />

      {/* 3. Conoco Bento Rows & Specialty Cards (Conoco Images 2, 3, 5 & Live Site Ref) */}
      <ConocoBentoRows
        bannerData={bannerData}
        bentoGridData={bentoGridData}
        featureCardsData={featureCardsData}
        socialRatingsData={socialRatingsData}
        newsletterData={newsletterData}
        onOpenFleetModal={onOpenFleet}
        onOpenValetModal={onOpenValet}
      />
    </div>
  );
}


