import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  DollarSign,
  Headphones,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { getOurProductsPageSettings } from '../../api/client';
import { fallbackOurProductsCms } from '../../data/ourProductsData';
import { resolveImageUrl } from '../../utils/imageHelper';

export default function BusinessFleetPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const page = cms.subpages?.businessFleet || fallbackOurProductsCms.subpages.businessFleet;
  const hero = page.hero || {};
  const offerRibbon = page.offerRibbon;
  const optimizationFeatures = Array.isArray(page.optimizationFeatures) ? page.optimizationFeatures : [];
  const fleetSolutions = Array.isArray(page.fleetSolutions) ? page.fleetSolutions : [];
  const supportBanner = page.supportBanner || {};
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

  const getFeatureIcon = (iconName) => {
    switch (iconName) {
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-[#016839]" />;
      case 'Headphones':
        return <Headphones className="w-5 h-5 text-[#016839]" />;
      case 'MapPin':
      default:
        return <MapPin className="w-5 h-5 text-[#016839]" />;
    }
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
          <h1 className="font-gotham text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.15]">
            {hero.title || 'A smarter way to fuel your fleet. Savings start at 10¢*'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle ||
              'With S&B Pro fleet cards and digital fleet solutions, you can cut fuel costs, simplify fleet expense management and prevent driver fraud.'}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to={hero.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#e8f7ee] text-[#016839] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-md group"
            >
              <span>{hero.buttonText || 'Get your personal quote'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {hero.secondaryButtonText && (
              <Link
                to={hero.secondaryButtonLink || '/contact'}
                className="inline-flex items-center gap-2 bg-[#014d28] hover:bg-[#023c20] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all border border-white/20"
              >
                <span>{hero.secondaryButtonText}</span>
              </Link>
            )}
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src={resolveImageUrl(
              hero.bgMediaUrl,
              'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80'
            )}
            alt="Commercial Fleet Vehicles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. OFFER EXTENSION RIBBON */}
      {offerRibbon && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-[#016839]" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">
              {offerRibbon}
            </p>
          </div>
        </section>
      )}

      {/* 3. OPTIMIZE YOUR BUSINESS (3 Feature Cards) */}
      {optimizationFeatures.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-14 sm:mt-20 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#161616]">
              Optimize your business and fuel your fleet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Products designed to help your enterprise save money, manage vehicles, and save administrative time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {optimizationFeatures.map((feat) => (
              <div
                key={feat.id}
                className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] flex items-center justify-center">
                  {getFeatureIcon(feat.iconName)}
                </div>
                <h3 className="text-lg font-bold text-[#161616]">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. THREE POWERFUL FLEET SOLUTIONS */}
      {fleetSolutions.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight">
              Three Powerful Fleet Solutions
            </h2>
            <p className="text-sm text-slate-600">
              One right fit for your business. Choose our proprietary forecourt card, nationwide universal card, or Digital+ app.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {fleetSolutions.map((sol) => (
              <div
                key={sol.id}
                className="bg-white rounded-[24px] p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    {sol.leadingTag}
                  </span>

                  <div className="aspect-[1.58/1] rounded-2xl bg-slate-50 overflow-hidden relative border border-slate-100 p-4 flex items-center justify-center">
                    <img
                      src={resolveImageUrl(sol.imageUrl)}
                      alt={sol.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-[#161616]">{sol.title}</h3>
                    <h4 className="text-sm font-black text-[#016839] mt-1">{sol.priceText}</h4>
                  </div>

                  <ul className="space-y-2.5 pt-2 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                    {Array.isArray(sol.benefits) &&
                      sol.benefits.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#016839] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="pt-8 space-y-2.5">
                  <Link
                    to={sol.applyLink || '/contact'}
                    className="w-full bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold py-3 rounded-full text-center block transition-colors shadow-sm"
                  >
                    Apply now
                  </Link>
                  <Link
                    to={sol.learnMoreLink || '/contact'}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-3 rounded-full text-center block transition-colors"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. DEDICATED SUPPORT ADVISOR BANNER */}
      {supportBanner.title && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24">
          <div className="bg-white rounded-[24px] p-8 sm:p-12 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 rounded-2xl overflow-hidden min-h-[240px] max-h-[280px]">
              <img
                src={resolveImageUrl(
                  supportBanner.imageUrl,
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
                )}
                alt="Fleet Expert Advisor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-2xl sm:text-3xl font-black text-[#161616]">
                {supportBanner.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                {supportBanner.description}
              </p>
              <div className="pt-2">
                <Link
                  to={supportBanner.buttonLink || '/contact'}
                  className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition-colors shadow-md"
                >
                  <span>{supportBanner.buttonText || 'Fill contact form'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. BUSINESS FLEET FAQ */}
      {faqs.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-[#161616]">
              Fleet Management FAQ
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Answers to common inquiries on commercial card controls, tax invoicing, and rebates
            </p>
          </div>

          <div className="space-y-3">
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
