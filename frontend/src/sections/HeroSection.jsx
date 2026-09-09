import React, { useState } from 'react';
import { resolveImageUrl } from '../utils/imageHelper';

export default function HeroSection({ heroData }) {
  const [videoFailed, setVideoFailed] = useState(false);

  // If section is explicitly disabled in Admin CMS, do not render
  if (heroData?.enabled === false) {
    return null;
  }

  // Purely dynamic CMS values without hardcoded fallback text or images
  const rawVideoUrl = typeof heroData?.videoUrl === 'string' ? heroData.videoUrl.trim() : '';
  const videoUrl = resolveImageUrl(rawVideoUrl);
  const line1 = typeof heroData?.headlineLine1 === 'string' ? heroData.headlineLine1.trim() : '';
  const line2 = typeof heroData?.headlineLine2 === 'string' ? heroData.headlineLine2.trim() : '';
  const ctaText = typeof heroData?.buttonText === 'string' ? heroData.buttonText.trim() : '';
  const ctaLink = typeof heroData?.buttonLink === 'string' ? heroData.buttonLink.trim() : '';

  // Helper to format Conoco-style bold text for GO GO GO / SAVE SAVE SAVE
  const renderHeadlineSpan = (text, defaultHighlight) => {
    if (!text) return null;
    const parts = text.split(new RegExp(`(${defaultHighlight})`, 'i'));
    if (parts.length > 1) {
      return (
        <>
          {parts[0]}
          <strong className="font-black italic uppercase tracking-normal">
            {parts[1]}
          </strong>
          {parts.slice(2).join('')}
        </>
      );
    }
    return text;
  };

  const hasVideo = Boolean(videoUrl && videoUrl !== 'none');
  const hasHeadlines = Boolean(line1 || line2);
  const hasCta = Boolean(ctaText);

  return (
    <section className="relative w-full max-w-[1512px] mx-auto px-4 sm:px-8 pt-2 pb-6">
      {/* Massive Rounded Hero Card — fixed min-height ensures design never collapses even if empty */}
      <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[460px] sm:min-h-[540px] lg:min-h-[600px] xl:min-h-[620px] flex items-center shadow-xl bg-gradient-to-br from-[#062814] via-[#0b1b12] to-[#111827] border border-white/5">
        
        {/* Background Video (plays loopingly when provided; no fallback image) */}
        {hasVideo && !videoFailed && (
          <video
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            playsInline
            muted
            loop
            autoPlay
            onError={() => setVideoFailed(true)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

        {/* Ambient Subtle Gradient Overlay for contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent pointer-events-none" />

        {/* Hero Foreground Content — Left-aligned & Vertically centered */}
        {(hasHeadlines || hasCta) && (
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-24 py-12 sm:py-16 flex flex-col justify-center">
            <div className="max-w-5xl space-y-6 sm:space-y-8">
              
              {/* Dynamic 2-Line Headline (rendered only when text is non-empty) */}
              {hasHeadlines && (
                <h1 className="font-gotham text-[20px] min-[400px]:text-[24px] sm:text-[30px] md:text-[34px] lg:text-[38px] xl:text-[40px] font-bold text-white leading-[1.14] tracking-tight">
                  {line1 && (
                    <span className="block sm:whitespace-nowrap">
                      {renderHeadlineSpan(line1, 'GO GO GO.')}
                    </span>
                  )}
                  {line2 && (
                    <span className="block mt-1 sm:mt-1.5 sm:whitespace-nowrap">
                      {renderHeadlineSpan(line2, 'SAVE SAVE SAVE.')}
                    </span>
                  )}
                </h1>
              )}

              {/* Dynamic CTA Button (rendered only when button text is non-empty) */}
              {hasCta && (
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href={ctaLink || '#'}
                    target={ctaLink.startsWith('http') ? '_blank' : '_self'}
                    rel={ctaLink.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2.5 bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold px-7 sm:px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-[1.02] text-[18px] leading-[20px] tracking-[-0.15px] cursor-pointer"
                  >
                    <span>{ctaText}</span>
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
                        strokeWidth="2"
                      />
                    </svg>
                  </a>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
