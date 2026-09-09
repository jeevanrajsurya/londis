import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Search,
  PhoneCall,
  ChevronDown,
} from 'lucide-react';
import { getOurProductsPageSettings } from '../../api/client';
import { fallbackOurProductsCms } from '../../data/ourProductsData';
import { resolveImageUrl } from '../../utils/imageHelper';

export default function QualityGuaranteedPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const page = cms.subpages?.qualityGuaranteed || fallbackOurProductsCms.subpages.qualityGuaranteed;
  const hero = page.hero || {};
  const locator = page.locator || {};
  const commitment = page.commitment || {};
  const problemSteps = page.problemSteps || {};
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

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
        <div className="p-8 sm:p-14 lg:p-18 flex flex-col justify-center text-white space-y-6">
          <div className="w-10 h-1 bg-[#84d400] rounded-full" />
          <h1 className="font-gotham text-3xl sm:text-4xl lg:text-[48px] font-black tracking-tight leading-[1.15]">
            {hero.title || 'Best-in-class fuel services'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle ||
              'Top Tier™ certified gasoline that cleans intake valves, protects your engine against deposit buildup, and maximizes fuel economy.'}
          </p>

          <div className="pt-2">
            <Link
              to={hero.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#e8f7ee] text-[#016839] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all shadow-md group"
            >
              <MapPin className="w-4 h-4 text-[#016839]" />
              <span>{hero.buttonText || 'Find your local station'}</span>
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src={resolveImageUrl(
              hero.bgMediaUrl,
              'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
            )}
            alt="Quality Guaranteed Fuel Canopy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. STORE LOCATOR SEARCH BAR */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-8">
        <div className="bg-white rounded-[24px] p-4 sm:p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[#016839]">
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#016839]" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-[#161616]">
                {locator.title || 'Find your local S&B station here'}
              </h3>
              <p className="text-xs text-slate-500 hidden sm:block">
                Locate high-grade Top Tier™ detergent fuel & diesel pumps
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

      {/* 3. QUALITY GUARANTEED COMMITMENT INTRO */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-14 sm:mt-20">
        <div className="bg-white rounded-[24px] p-8 sm:p-14 border border-slate-200/80 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#e8f7ee] text-[#016839] border border-[#016839]/20">
            Engineered For Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#161616] tracking-tight">
            {commitment.title || 'Quality Guaranteed'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {commitment.p1 ||
              'We guarantee our fuel is of high grade quality that meets all EPA standards. We are committed to best-in-class for fuel services and provide an easy fueling experience for our customers. We only use fuel sourced from responsible refineries and terminals that use cleaning detergent additives. This means lower vehicle emissions and maintenance of optimal engine performance.'}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {commitment.p2 ||
              "When we say quality guaranteed, we mean it. We strive to deliver a quality customer experience every time. That's why if you do run into an issue with our fuel, we guarantee to work with you to fix the issue and have you back on the road as quickly as possible."}
          </p>
        </div>
      </section>

      {/* 4. SHOWCASE IMAGE 1 */}
      {page.showcaseImage1 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-12 sm:mt-16">
          <div className="rounded-[24px] overflow-hidden max-h-[460px] shadow-sm border border-slate-200/80">
            <img
              src={resolveImageUrl(page.showcaseImage1)}
              alt="Road Trip Confidence"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* 5. PROBLEM RESOLUTION GUARANTEE BOX */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-14 sm:mt-20">
        <div className="bg-[#f0fbf4] rounded-[24px] p-8 sm:p-14 border border-[#016839]/20 shadow-sm max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#161616]">
              {problemSteps.heading ||
                'If you do experience a problem with our S&B fuel, please follow these easy steps:'}
            </h3>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {Array.isArray(problemSteps.steps) &&
              problemSteps.steps.map((st, sIdx) => (
                <div key={sIdx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#016839] text-white font-black text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {st}
                  </p>
                </div>
              ))}
          </div>

          <div className="text-center pt-4 border-t border-[#016839]/15 max-w-lg mx-auto space-y-2">
            <p className="text-[11px] text-slate-500 italic">
              {problemSteps.disclaimer ||
                '* S&B Retail investigates all claims and reserves the right to reject any claim not supported by appropriate documentation.'}
            </p>
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                {problemSteps.supportTitle || 'Customer Care Line'}
              </span>
              <a
                href="tel:1-800-555-7263"
                className="inline-flex items-center gap-2 text-lg sm:text-2xl font-black text-[#016839] hover:underline mt-1"
              >
                <PhoneCall className="w-5 h-5 text-[#016839]" />
                <span>{problemSteps.supportPhone || '1-800-555-SANDB'}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOWCASE IMAGE 2 */}
      {page.showcaseImage2 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-12 sm:mt-16">
          <div className="rounded-[24px] overflow-hidden max-h-[460px] shadow-sm border border-slate-200/80">
            <img
              src={resolveImageUrl(page.showcaseImage2)}
              alt="S&B Modern Forecourt Canopy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* 7. QUALITY GUARANTEED FAQ ACCORDION */}
      {faqs.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-8">
          <div className="border-b border-slate-300 pb-4 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616]">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Engine health, fuel detergents, and Top Tier™ EPA certifications
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex((prev) => (prev === idx ? null : idx))}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#161616]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#016839]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
