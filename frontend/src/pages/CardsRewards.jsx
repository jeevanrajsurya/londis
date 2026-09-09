import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCardsRewardsPageSettings } from '../api/client';
import { SafeImage } from '../utils/imageHelper';
import { ArrowRight, ChevronRight, CreditCard, Award, Gift, Sparkles } from 'lucide-react';

export default function CardsRewards() {
  const { data: cms } = useQuery({
    queryKey: ['cards-rewards-cms'],
    queryFn: getCardsRewardsPageSettings,
  });

  const hub = cms?.hub || {};
  const hero = hub.hero || {};
  const intro = hub.intro || {};
  const actionCards = hub.actionCards || [];

  return (
    <div className="bg-[#ebebef] min-h-screen text-[#161616] pb-24 sm:pb-32 font-sans selection:bg-[#016839] selection:text-white">
      {/* Breadcrumbs */}
      <div className="max-w-[1448px] mx-auto px-4 sm:px-8 lg:px-12 pt-4 pb-3">
        <nav className="flex items-center gap-2 font-gotham text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#016839] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">Cards &amp; Rewards</span>
        </nav>
      </div>

      {/* 1. Panoramic Hero Banner with Signature S&B Forest Green Circular Badge */}
      <div className="max-w-[1448px] mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-20">
        <div className="relative rounded-[24px] overflow-hidden min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center shadow-lg border border-slate-300">
          {/* Background Media */}
          <div className="absolute inset-0 z-0">
            {hero.bgMediaType === 'video' && hero.bgMediaUrl ? (
              <video
                src={hero.bgMediaUrl}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <SafeImage
                src={hero.bgMediaUrl || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80'}
                defaultFallback="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1920&q=80"
                alt="Cards & Rewards"
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          </div>

          {/* Large Forest Green Circular Badge on the Left */}
          <div className="relative z-20 p-8 sm:p-14 lg:p-20 flex items-center">
            <div className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-[#016839] text-white flex flex-col items-center justify-center text-center p-6 shadow-2xl border-4 border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="font-gotham text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight uppercase leading-[1.1] text-white">
                {hero.badgeText || 'CARDS & REWARDS'}
              </span>
              <div className="w-14 h-1.5 bg-[#84d400] rounded-full mt-3 mb-1" />
              <span className="text-[11px] sm:text-xs font-bold tracking-widest text-white/80 uppercase font-gotham">
                S&amp;B Retail
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Intro Typography Section */}
      <div className="max-w-[1448px] mx-auto px-4 sm:px-8 lg:px-12 mb-16 sm:mb-24 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <h2 className="font-gotham text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#161616] tracking-tight leading-tight">
            {intro.headline || 'Fuel savings, premium rewards and seamless fleet management in your pocket.'}
          </h2>
          <p className="font-gotham text-slate-700 text-lg sm:text-[20px] font-normal leading-relaxed">
            {intro.body ||
              'Whether you are an everyday driver looking to save at every fill-up, a family earning instant rewards, or a commercial fleet manager optimizing fuel costs and route efficiency, S&B Retail offers tailored payment and rewards solutions designed for modern mobility.'}
          </p>
        </div>
      </div>

      {/* 3. The 3 Feature Action Cards Grid */}
      <div className="max-w-[1448px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {actionCards && actionCards.map((card, idx) => {
            // Theme presets
            let cardBg = 'bg-white text-[#161616] border-slate-200';
            let btnStyle = 'bg-[#016839] hover:bg-[#014d28] text-white';
            let tagStyle = 'bg-[#016839]/10 text-[#016839]';

            if (card.theme === 'green') {
              cardBg = 'bg-[#016839] text-white border-[#014d28] shadow-lg';
              btnStyle = 'bg-white text-[#016839] hover:bg-[#84d400] hover:text-black';
              tagStyle = 'bg-white/20 text-white';
            } else if (card.theme === 'slate') {
              cardBg = 'bg-[#1e293b] text-white border-slate-700 shadow-lg';
              btnStyle = 'bg-[#016839] hover:bg-[#014d28] text-white';
              tagStyle = 'bg-slate-700 text-slate-200';
            }

            return (
              <div
                key={card.id || idx}
                className={`${cardBg} rounded-[24px] p-8 sm:p-10 border flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 group`}
              >
                <div>
                  {/* Top Tag */}
                  {card.tag && (
                    <div className="mb-6">
                      <span className={`inline-block text-xs font-bold uppercase tracking-wider font-gotham px-3.5 py-1 rounded-full ${tagStyle}`}>
                        {card.tag}
                      </span>
                    </div>
                  )}

                  {/* Card Image Area */}
                  <div className="h-44 sm:h-52 flex items-center justify-center mb-8 overflow-hidden rounded-xl bg-white/10 p-4">
                    <SafeImage
                      src={card.imageUrl}
                      defaultFallback="https://phillips66.widen.net/content/7pv15t7doa/png/new-cc-p66-card.png?position=c&color=ffffff00&quality=100&u=pqrmwb"
                      alt={card.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-gotham text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    {card.title}
                  </h3>
                  <p className="font-gotham text-base leading-relaxed opacity-90 mb-8">
                    {card.subtitle}
                  </p>
                </div>

                {/* Bottom CTA Button */}
                <div>
                  <Link
                    to={card.to || '/cards-rewards'}
                    className={`w-full py-4 px-6 rounded-full font-founders font-semibold text-[17px] inline-flex items-center justify-center gap-2.5 transition-all shadow-sm ${btnStyle}`}
                  >
                    <span>{card.buttonText || 'Learn more'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
