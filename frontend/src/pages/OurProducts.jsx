import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getOurProductsPageSettings } from '../api/client';
import { fallbackOurProductsCms } from '../data/ourProductsData';
import { resolveImageUrl } from '../utils/imageHelper';

export default function OurProducts() {
  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const hub = cms.hub || fallbackOurProductsCms.hub;
  const hero = hub.hero || {};
  const intro = hub.intro || {};
  const actionCards = Array.isArray(hub.actionCards) ? hub.actionCards : [];

  const hasHeroMedia = Boolean(hero.bgMediaUrl && hero.bgMediaUrl.trim());

  return (
    <div className="min-h-screen bg-[#ebebef] text-[#161616] font-gotham pb-20 sm:pb-28">
      {/* 1. TOP PANORAMIC HERO BANNER - Exact Circle K style with large circular badge */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] rounded-[24px] overflow-hidden min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] flex items-center mt-3 sm:mt-5 shadow-none relative bg-[#161616]">
        {/* Background Media */}
        {hasHeroMedia ? (
          <>
            {hero.bgMediaType === 'video' ||
            /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(hero.bgMediaUrl) ? (
              <video
                src={resolveImageUrl(hero.bgMediaUrl.trim())}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <img
                src={resolveImageUrl(hero.bgMediaUrl.trim())}
                alt={hero.title || 'Our Products'}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}

            {/* Gradient / Overlay */}
            {hero.overlayStyle === 'warm' && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-amber-600/20 z-[1] pointer-events-none" />
            )}
            {hero.overlayStyle === 'gradient' && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1] pointer-events-none" />
            )}
            {hero.overlayStyle === 'dark' && (
              <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#014d28] to-[#016839] z-0" />
        )}

        {/* Big Circular "OUR PRODUCTS" Badge matching Circle K reference screenshot */}
        <div className="relative z-10 pl-6 sm:pl-12 lg:pl-20 py-12 flex items-center">
          <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-[#016839]/95 backdrop-blur-md border-4 border-white/25 flex flex-col items-center justify-center p-6 text-center shadow-2xl transition-transform duration-500 hover:scale-103">
            <h1 className="font-gotham text-2xl sm:text-3xl lg:text-[40px] font-black tracking-tight text-white uppercase leading-[1.05] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {hero.badgeText || 'OUR PRODUCTS'}
            </h1>
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-white rounded-full mt-3 sm:mt-4 shadow-sm" />
          </div>
        </div>
      </section>

      {/* 2. CENTERED INTRO TYPOGRAPHY SECTION */}
      <section className="max-w-[1040px] mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        {intro.headline && (
          <h2 className="font-gotham text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#161616] leading-snug tracking-tight max-w-4xl mx-auto">
            {intro.headline}
          </h2>
        )}

        {intro.body && (
          <p className="font-gotham text-sm sm:text-base lg:text-[17px] text-[#3a3a3a] leading-relaxed max-w-3xl mx-auto mt-6 whitespace-pre-line">
            {intro.body}
          </p>
        )}
      </section>

      {/* 3. THE 5 FEATURE ACTION CARDS GRID (Collapse-Proof) */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)]">
        {actionCards.length === 0 ? (
          <div className="bg-white rounded-[24px] p-12 text-center text-slate-500">
            <p className="text-base font-bold">No product feature cards currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {actionCards.map((card, idx) => {
              const theme = card.cardTheme || 'white';
              const isDarkTheme = theme === 'green' || theme === 'slate';
              const isBlue = theme === 'blue';

              // Theme background classes
              let bgCls = 'bg-white text-[#161616] border border-slate-200/80';
              let dashCls = 'bg-[#016839]';
              let titleCls = 'text-[#161616]';

              if (theme === 'green') {
                bgCls = 'bg-[#016839] text-white border border-[#016839]';
                dashCls = 'bg-white';
                titleCls = 'text-white';
              } else if (theme === 'slate') {
                bgCls = 'bg-gradient-to-br from-[#2c3e50] to-[#1e272e] text-white border border-slate-700';
                dashCls = 'bg-[#84d400]';
                titleCls = 'text-white';
              } else if (isBlue) {
                bgCls = 'bg-gradient-to-b from-[#d8effd] to-[#bde3fb] text-[#161616] border border-sky-200';
                dashCls = 'bg-white';
                titleCls = 'text-[#161616]';
              }

              const targetLink = card.linkUrl || '/store';
              const isExternal = /^https?:\/\//i.test(targetLink);

              const CardWrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal
                ? { href: targetLink, target: '_blank', rel: 'noopener noreferrer' }
                : { to: targetLink };

              return (
                <CardWrapper
                  key={card.id || `card-${idx}`}
                  {...wrapperProps}
                  className={`group rounded-[24px] overflow-hidden ${bgCls} flex flex-col justify-between p-7 sm:p-8 relative min-h-[380px] sm:min-h-[420px] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer`}
                >
                  {/* Top Content: Dash Accent + Title */}
                  <div className="relative z-10 space-y-2">
                    {card.showDash !== false && (
                      <div className={`w-8 h-1 ${dashCls} rounded-full transition-all duration-300 group-hover:w-12`} />
                    )}

                    <h3 className={`font-gotham text-2xl sm:text-3xl font-black tracking-tight whitespace-pre-line leading-tight ${titleCls}`}>
                      {card.title}
                    </h3>

                    {card.badge && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/10 text-current mt-1">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {/* Card Main Image (Center or Bottom) */}
                  {Boolean(card.imageUrl && card.imageUrl.trim()) && (
                    <div className="relative z-0 my-4 h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden rounded-2xl">
                      <img
                        src={resolveImageUrl(card.imageUrl.trim())}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-106"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Bottom Subtitle / Description & CTA Button */}
                  <div className="relative z-10 pt-2 space-y-3">
                    {card.subtitle && (
                      <p
                        className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                          isDarkTheme ? 'text-white/85' : 'text-slate-600'
                        }`}
                      >
                        {card.subtitle}
                      </p>
                    )}

                    <div className="pt-1 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 font-gotham font-bold text-xs sm:text-sm px-4 py-2 rounded-full transition-all shadow-sm ${
                          isDarkTheme
                            ? 'bg-white text-[#016839] group-hover:bg-[#e8f7ee]'
                            : 'bg-[#016839] text-white group-hover:bg-[#014d28]'
                        }`}
                      >
                        <span>{card.buttonText || 'More info →'}</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>

                      <span className="text-[11px] font-semibold opacity-60 flex items-center gap-1 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Explore
                      </span>
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
