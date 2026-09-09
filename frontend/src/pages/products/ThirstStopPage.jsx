import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Search } from 'lucide-react';
import { getOurProductsPageSettings } from '../../api/client';
import { fallbackOurProductsCms } from '../../data/ourProductsData';
import { resolveImageUrl } from '../../utils/imageHelper';

export default function ThirstStopPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const thirstStop = cms.subpages?.thirstStop || fallbackOurProductsCms.subpages.thirstStop;
  const hero = thirstStop.hero || {};
  const locator = thirstStop.locator || {};
  const featuredProducts = Array.isArray(thirstStop.featuredProducts) ? thirstStop.featuredProducts : [];
  const limitedTimeOffers = Array.isArray(thirstStop.limitedTimeOffers) ? thirstStop.limitedTimeOffers : [];
  const everydayClassics = Array.isArray(thirstStop.everydayClassics) ? thirstStop.everydayClassics : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/contact?search=${encodeURIComponent(searchQuery)}`);
  };

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
        {/* Left Side: Brand Green Container */}
        <div className="p-8 sm:p-14 lg:p-18 flex flex-col justify-center text-white space-y-6">
          <div className="w-10 h-1 bg-[#84d400] rounded-full" />
          <h1 className="font-gotham text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight uppercase leading-[1.1]">
            {hero.title || 'WE DEFINITELY HAVE THAT'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle ||
              'Thirsty? Chill out with an icy Polar Pop, grab an energy drink, or pour a steaming hot cup of bean-to-cup Arabica coffee.'}
          </p>

          <div className="pt-2">
            <Link
              to={hero.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#e8f7ee] text-[#016839] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-md group"
            >
              <MapPin className="w-4 h-4 text-[#016839]" />
              <span>{hero.buttonText || 'Find your nearest station'}</span>
            </Link>
          </div>
        </div>

        {/* Right Side: High-Res Beverage Photo */}
        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src={resolveImageUrl(
              hero.bgMediaUrl,
              'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'
            )}
            alt="Cold Beverages Lineup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. STORE LOCATOR SEARCH BAR WIDGET */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-8">
        <div className="bg-white rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[#016839]">
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#016839]" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#161616]">
                {locator.title || 'Find your nearest store'}
              </h3>
              <p className="text-xs text-slate-500 hidden sm:block">
                Discover local iced beverage deals & fountain stations near you
              </p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="w-full md:w-auto flex items-center gap-2">
            <div className="relative flex-1 md:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locator.placeholder || 'City & State or ZIP'}
                className="w-full pl-4 pr-10 py-3 rounded-full border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#016839] bg-slate-50"
              />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="bg-[#016839] hover:bg-[#014d28] text-white p-3 rounded-full transition-all shadow-sm shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS (3-Column Square Cards) */}
      {featuredProducts.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-14 sm:mt-20 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616] tracking-tight">
              Featured Products
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden relative mb-5 flex items-center justify-center p-6 border border-slate-100">
                  <img
                    src={resolveImageUrl(item.imageUrl)}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#016839] text-white shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#161616] group-hover:text-[#016839] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. LIMITED TIME OFFERS* (3-Column Square Cards) */}
      {limitedTimeOffers.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616] tracking-tight">
              Limited Time Offers*
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {limitedTimeOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden relative mb-5 flex items-center justify-center p-6 border border-slate-100">
                  <img
                    src={resolveImageUrl(offer.imageUrl)}
                    alt={offer.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#161616] group-hover:text-[#016839] transition-colors leading-snug">
                      {offer.title}
                    </h3>
                    {offer.description && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {offer.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. EVERYDAY CLASSICS (3-Column Coffee & Core Drinks) */}
      {everydayClassics.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616] tracking-tight">
              Everyday Classics
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {everydayClassics.map((classic) => (
              <div
                key={classic.id}
                className="bg-white rounded-[24px] p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="aspect-square w-full rounded-2xl bg-slate-50 overflow-hidden relative mb-5 flex items-center justify-center p-6 border border-slate-100">
                  <img
                    src={resolveImageUrl(classic.imageUrl)}
                    alt={classic.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-[#161616] group-hover:text-[#016839] transition-colors leading-snug">
                      {classic.title}
                    </h3>
                    {classic.description && (
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {classic.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. DISCLAIMER FOOTER NOTE */}
      <div className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 text-center">
        <p className="text-xs text-slate-500">
          {page.disclaimer ||
            '* Available at participating S&B Forecourt & C-Store locations across the United States.'}
        </p>
      </div>
    </div>
  );
}
