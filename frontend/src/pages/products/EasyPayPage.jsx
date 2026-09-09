import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CreditCard,
  CheckCircle2,
  Lock,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { getOurProductsPageSettings } from '../../api/client';
import { fallbackOurProductsCms } from '../../data/ourProductsData';
import { resolveImageUrl } from '../../utils/imageHelper';

export default function EasyPayPage() {
  const [activeFaqCategory, setActiveFaqCategory] = useState('All');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const { data: cmsData } = useQuery({
    queryKey: ['our-products-cms'],
    queryFn: getOurProductsPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const cms = cmsData || fallbackOurProductsCms;
  const page = cms.subpages?.easyPay || fallbackOurProductsCms.subpages.easyPay;
  const hero = page.hero || {};
  const whatIs = page.whatIs || {};
  const points = Array.isArray(whatIs.points) ? whatIs.points : [];
  const memberBox = whatIs.memberBox || {};
  const steps = Array.isArray(page.steps) ? page.steps : [];
  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

  const categories = ['All', ...new Set(faqs.map((f) => f.category).filter(Boolean))];
  const filteredFaqs =
    activeFaqCategory === 'All'
      ? faqs
      : faqs.filter((f) => f.category === activeFaqCategory);

  const toggleFaq = (idx) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
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
            {hero.title || 'Easy Pay: Your Gas Card Alternative for Everyday Savings'}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed max-w-xl">
            {hero.subtitle ||
              'Sign up now to save 30¢ per gallon on your first 100 gallons or 60 days, then save at least 10¢ per gallon every single day!'}
          </p>

          <div className="pt-2">
            <Link
              to={hero.buttonLink || '/contact'}
              className="inline-flex items-center gap-3 bg-white hover:bg-[#e8f7ee] text-[#016839] font-bold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all shadow-md group"
            >
              <CreditCard className="w-4 h-4 text-[#016839]" />
              <span>{hero.buttonText || 'Enroll now'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden">
          <img
            src={resolveImageUrl(
              hero.bgMediaUrl,
              'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80'
            )}
            alt="Easy Pay Refueling Savings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 2. WHAT IS EASY PAY DEBIT? */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-14 sm:mt-20">
        <div className="bg-white rounded-[24px] p-8 sm:p-14 border border-slate-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Card Mockup Visual */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-[#014d28] via-[#016839] to-[#02874a] text-white p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/20 group hover:scale-[1.02] transition-transform">
              <div className="flex items-center justify-between">
                <span className="font-black tracking-wider text-lg uppercase">S&B EASY PAY</span>
                <span className="text-[10px] font-black bg-[#84d400] text-slate-950 px-2 py-0.5 rounded-full">
                  DEBIT
                </span>
              </div>
              <div className="space-y-1 my-auto">
                <div className="w-10 h-7 bg-amber-300/80 rounded-md mb-2 flex items-center justify-center">
                  <div className="w-6 h-4 border border-amber-500/60 rounded" />
                </div>
                <p className="font-mono text-xs text-white/70">•••• •••• •••• 5476</p>
                <p className="text-[11px] font-black uppercase tracking-widest text-[#84d400]">
                  Save 30¢ / GAL
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/80 font-bold">
                <span>VALUED MEMBER</span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#84d400]" /> PIN PROTECTED
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Accepted at all S&B Forecourt & C-Store pumps nationwide
            </p>
          </div>

          {/* Value Points & Member Alert Box */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#161616]">
              {whatIs.title || 'What is Easy Pay Debit?'}
            </h2>

            <div className="space-y-5">
              {points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#e8f7ee] text-[#016839] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#016839]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#161616]">{pt.heading}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {pt.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Member Alert Box */}
            <div className="mt-8 bg-[#f0fbf4] rounded-2xl p-5 border border-[#016839]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm text-[#016839]">
                  {memberBox.title || 'Already an Easy Pay member?'}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  {memberBox.description ||
                    'If you are looking to log in to your account, manage cards, or check savings.'}
                </p>
              </div>
              <Link
                to={memberBox.buttonLink || '/contact'}
                className="inline-flex items-center gap-2 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-sm"
              >
                <span>{memberBox.buttonText || 'Log In to Account'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW TO EASILY SIGN UP (3 Alternating Step Cards) */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#161616] tracking-tight">
            How To Easily Sign Up
          </h2>
          <p className="text-sm text-slate-600">
            Three simple steps to unlock everyday fuel discounts and instant member benefits
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, idx) => {
            const isReverse = idx % 2 === 1;
            return (
              <div
                key={idx}
                className="bg-white rounded-[24px] p-6 sm:p-10 border border-slate-200/80 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                <div
                  className={`md:col-span-6 overflow-hidden rounded-2xl bg-slate-100 relative min-h-[240px] max-h-[300px] ${
                    isReverse ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <img
                    src={resolveImageUrl(step.imageUrl)}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div
                  className={`md:col-span-6 space-y-4 ${
                    isReverse ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#016839] bg-[#e8f7ee] px-3 py-1 rounded-full border border-[#016839]/20">
                    {step.stepNumber || `Step ${idx + 1}`}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#161616] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  {step.ctaText && (
                    <div className="pt-2">
                      <Link
                        to={step.ctaLink || '/contact'}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#016839] hover:text-[#014d28] transition-colors"
                      >
                        <span>{step.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. EASY PAY CARD FAQ ACCORDION */}
      {faqs.length > 0 && (
        <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] mt-16 sm:mt-24 space-y-8">
          <div className="border-b border-slate-300 pb-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#161616] tracking-tight">
              Easy Pay Card FAQ
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Discover the ins and outs of S&B Easy Pay and get insights into common questions
            </p>
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFaqCategory(cat);
                    setOpenFaqIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeFaqCategory === cat
                      ? 'bg-[#016839] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
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
