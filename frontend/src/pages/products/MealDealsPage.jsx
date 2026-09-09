import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { getOurProductsPageSettings } from '../../api/client';
import { fallbackOurProductsCms } from '../../data/ourProductsData';
import { resolveImageUrl } from '../../utils/imageHelper';

export default function MealDealsPage() {
  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const page = cms.subpages?.mealDeals || fallbackOurProductsCms.subpages.mealDeals;
  const hero = page.hero || {};
  const dealTiers = Array.isArray(page.dealTiers) ? page.dealTiers : [];

  return (
    <div className="min-h-screen bg-[#ebebef] text-[#161616] font-gotham pb-24">
      {/* Breadcrumb / Back Bar */}
      <div className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] pt-6 pb-4">
        <Link
          to="/our-products"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#016839] hover:text-[#014d28] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Our Products
        </Link>
      </div>

      {/* 1. SPLIT 50/50 HERO BANNER */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] rounded-[24px] overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-2 bg-[#016839]">
        <div className="p-8 sm:p-14 lg:p-18 flex flex-col justify-center text-white space-y-6">
          <div className="w-10 h-1 bg-[#84d400] rounded-full" />
          <h1 className="font-gotham text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight uppercase leading-[1.1]">
            {hero.title || 'MEAL DEALS'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle ||
              'Hungry? Choose Your Deal! Satisfying, high-value combos made fresh daily for drivers on the go.'}
          </p>

          <div className="pt-2">
            <Link
              to={hero.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#e8f7ee] text-[#016839] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-md group"
            >
              <MapPin className="w-4 h-4 text-[#016839]" />
              <span>{hero.buttonText || 'Find your local store'}</span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src={resolveImageUrl(
              hero.bgMediaUrl,
              'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
            )}
            alt="Fresh In-Store Meal Deals"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. MULTI-TIER MEAL DEALS */}
      <div className="space-y-16 sm:space-y-24 mt-14 sm:mt-20">
        {dealTiers.map((tier, idx) => (
          <section
            key={tier.id || idx}
            className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] space-y-8"
          >
            {/* Centered Tier Heading & Copy */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#e8f7ee] text-[#016839] border border-[#016839]/20">
                Combo Value Deal
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#161616] tracking-tight">
                {tier.title}
              </h2>
              {tier.description && (
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {tier.description}
                </p>
              )}
            </div>

            {/* Product Rectangle Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.isArray(tier.items) &&
                tier.items.map((item, itemIdx) => (
                  <div
                    key={item.id || itemIdx}
                    className="bg-white rounded-[24px] p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group text-center"
                  >
                    <div className="aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden relative mb-4 flex items-center justify-center p-4 border border-slate-100">
                      <img
                        src={resolveImageUrl(item.imageUrl)}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#161616] group-hover:text-[#016839] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>
                ))}
            </div>

            {idx < dealTiers.length - 1 && (
              <div className="pt-10">
                <div className="w-full h-px bg-slate-300/80" />
              </div>
            )}
          </section>
        ))}
      </div>

      {/* 3. STORE DISCLAIMER */}
      <div className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-20 text-center">
        <p className="text-xs text-slate-500">
          {page.disclaimer ||
            '* Prices and participation may vary by location. Applicable taxes not included. Available at participating S&B stores.'}
        </p>
      </div>
    </div>
  );
}
