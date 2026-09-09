import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getAboutPageSettings } from '../api/client';
import { fallbackAboutCms } from '../data/forecourtData';

export default function About() {
  const { data: cmsData } = useQuery({
    queryKey: ['about-page-cms'],
    queryFn: getAboutPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  const cms = cmsData || fallbackAboutCms;

  const hasMedia = Boolean(cms.hero?.bgMediaUrl && cms.hero.bgMediaUrl.trim());
  const isWhiteText =
    cms.hero?.textColor === 'white' || (hasMedia && cms.hero?.textColor !== 'dark');

  return (
    <div className="min-h-screen bg-[#ebebef] text-[#161616] font-gotham pb-16 sm:pb-28">
      {/* 1. BIG HERO BANNER - Exact Conoco .fuels-hero.fuels-hero--generic max-w-[1448px] rounded-[24px] */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] rounded-[24px] overflow-hidden min-h-[440px] sm:min-h-[504px] lg:min-h-[640px] flex items-center mt-2 sm:mt-4 shadow-none relative bg-[#161616]">
        {/* Background Media (Image or Video) */}
        {hasMedia ? (
          <>
            {cms.hero?.bgMediaType === 'video' ||
            /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(cms.hero.bgMediaUrl) ? (
              <video
                src={cms.hero.bgMediaUrl.trim()}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <img
                src={cms.hero.bgMediaUrl.trim()}
                alt={cms.hero?.title || 'About Us Hero'}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}

            {/* Gradient / Overlay Styling */}
            {cms.hero?.overlayStyle === 'gradient' && (
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-[1] pointer-events-none" />
            )}
            {cms.hero?.overlayStyle === 'dark' && (
              <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
            )}
            {cms.hero?.overlayStyle === 'light' && (
              <div className="absolute inset-0 bg-white/35 z-[1] pointer-events-none" />
            )}
          </>
        ) : (
          /* Blank media fallback: Clean solid white card */
          <div className="absolute inset-0 bg-white z-0" />
        )}

        {/* Hero Content */}
        <div
          className={`relative z-10 w-full lg:w-[65%] px-8 sm:px-14 lg:pl-[120px] lg:pr-12 py-16 sm:py-20 text-left ${
            isWhiteText ? 'text-white' : 'text-[#161616]'
          }`}
        >
          <div className="flex flex-col gap-6">
            <h1
              className={`font-gotham text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.12] tracking-tight whitespace-pre-line ${
                isWhiteText
                  ? 'text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]'
                  : 'text-[#161616]'
              }`}
            >
              {cms.hero?.title || 'Ready. Set.\nGO GO GO.'}
            </h1>

            {cms.hero?.subtitle && (
              <p
                className={`font-gotham text-base sm:text-lg lg:text-[20px] leading-[1.6] font-normal max-w-2xl ${
                  isWhiteText
                    ? 'text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]'
                    : 'text-[#334155]'
                }`}
              >
                {cms.hero.subtitle}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 2. COMMUNITY & SPONSORS SECTION ("GO Where the Action Is") */}
      {cms.actionSection?.enabled !== false && (
        <section className="max-w-[1028px] mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-[120px] text-center bg-transparent">
          <div className="space-y-5 max-w-[880px] mx-auto">
            <h2 className="font-gotham text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#161616] tracking-tight leading-[1.12]">
              {cms.actionSection?.title || 'GO Where the Action Is'}
            </h2>

            {cms.actionSection?.subtitle ? (
              <p className="font-gotham text-base sm:text-lg lg:text-[20px] text-[#161616] leading-[1.6] max-w-[880px] mx-auto whitespace-pre-line">
                {(() => {
                  const sub = cms.actionSection.subtitle;
                  if (typeof sub === 'string' && sub.includes('GO GO GO')) {
                    const parts = sub.split('GO GO GO');
                    return (
                      <>
                        {parts[0]}
                        <em>
                          <strong>GO GO GO</strong>
                        </em>
                        {parts.slice(1).join('GO GO GO')}
                      </>
                    );
                  }
                  return sub;
                })()}
              </p>
            ) : (
              <p className="font-gotham text-base sm:text-lg lg:text-[20px] text-[#161616] leading-[1.6] max-w-[880px] mx-auto">
                Scream from the stands. Paint your face with spirit. Race for the checkered flag.
                <br className="hidden sm:inline" />
                We sponsor teams, schools and events that inspire you to{' '}
                <em>
                  <strong>GO GO GO.</strong>
                </em>
              </p>
            )}
          </div>

          {/* Athletic & Community Partner Logos Strip */}
          {Boolean(
            cms.actionSection?.bannerImageUrl && cms.actionSection.bannerImageUrl.trim()
          ) && (
            <figure className="mt-12 sm:mt-16 max-w-[760px] sm:max-w-[840px] mx-auto flex justify-center items-center">
              <img
                src={cms.actionSection.bannerImageUrl.trim()}
                alt={cms.actionSection?.title || 'Community Sponsors and Partners'}
                className="w-full h-auto object-contain mx-auto"
                loading="lazy"
              />
            </figure>
          )}
        </section>
      )}

      {/* 3. FEATURE SPLIT CARDS (Alternating 50/50 Layout - Conoco .fuels-split-card--primary seamless on #ebebef) */}
      <div className="space-y-6 sm:space-y-12">
        {cms.splitCards?.map((card, idx) => {
          const isImageLeft = card.imagePosition === 'left';
          const hasImage = Boolean(card.imageUrl && card.imageUrl.trim());

          return (
            <section
              key={card.id || `split-${idx}`}
              className={`max-w-[1432px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] bg-transparent p-4 sm:p-8 lg:p-[50px] flex flex-col ${
                isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-8 lg:gap-[50px]`}
            >
              {/* Card Image */}
              {hasImage && (
                <div className="w-full lg:w-1/2 lg:max-w-[600px] aspect-square sm:aspect-[4/3] lg:aspect-square rounded-[24px] overflow-hidden shrink-0 bg-slate-200/50 shadow-sm">
                  <img
                    src={card.imageUrl.trim()}
                    alt={card.title || 'Feature Story'}
                    className="w-full h-full object-cover rounded-[24px] transition-transform duration-700 hover:scale-102"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Card Content */}
              <div
                className={`w-full ${
                  hasImage ? 'lg:w-1/2 lg:max-w-[682px]' : 'w-full max-w-3xl mx-auto text-center'
                } flex flex-col justify-center text-left space-y-6 lg:p-[36px] bg-transparent`}
              >
                <h2 className="font-gotham text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#161616] tracking-tight leading-tight">
                  {card.title}
                </h2>

                {card.description && (
                  <p className="font-gotham text-base sm:text-lg text-[#161616] leading-relaxed">
                    {card.description}
                  </p>
                )}

                {/* Optional Pill CTA Button in S&B Retail Forest Green */}
                {Boolean(card.buttonText && card.buttonText.trim()) && (() => {
                  const target = (card.buttonLink && card.buttonLink.trim()) || '/contact';
                  const isExternal = /^https?:\/\//i.test(target);
                  const btnClasses =
                    'inline-flex items-center gap-3 bg-[#016839] hover:bg-[#014d28] text-white font-gotham font-bold text-base sm:text-[18px] px-8 py-3.5 rounded-[360px] transition-all shadow-sm group self-start';
                  const arrowIcon = (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  );

                  return (
                    <div className="pt-2">
                      {isExternal ? (
                        <a
                          href={target}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={btnClasses}
                        >
                          <span>{card.buttonText}</span>
                          {arrowIcon}
                        </a>
                      ) : (
                        <Link to={target} className={btnClasses}>
                          <span>{card.buttonText}</span>
                          {arrowIcon}
                        </Link>
                      )}
                    </div>
                  );
                })()}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
