import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { SafeImage } from '../../utils/imageHelper';
import { getCardsRewardsPageSettings } from '../../api/client';

const defaultNavLinks = [
  { name: 'About', to: '/about' },
  { name: 'Our Products', to: '/our-products' },
  { name: 'Cards & Rewards', to: '/cards-rewards' },
  { name: 'Contact Us', to: '/contact' },
];

export default function Navbar({ navigationData, onOpenValetModal, onOpenFleetModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cardsFlyoutOpen, setCardsFlyoutOpen] = useState(false);
  const flyoutTimerRef = useRef(null);

  const { data: cardsCms } = useQuery({
    queryKey: ['cards-rewards-cms'],
    queryFn: getCardsRewardsPageSettings,
  });

  const navDropdown = cardsCms?.navDropdown || {
    title: 'Cards & Rewards',
    description: 'Explore our suite of cards and rewards to make the most of every mile.',
    cardImage: 'https://phillips66.widen.net/content/c5qqgh5vil/jpeg/BrandedFuelCardPrograms_CommercialCreditCard.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
    links: [
      { label: 'Credit Cards', to: '/credit-cards' },
      { label: 'KickBack® Rewards', to: '/kickback' },
      { label: 'Gift Cards', to: '/gift-cards' },
    ],
  };

  const handleMouseEnterCards = () => {
    if (flyoutTimerRef.current) clearTimeout(flyoutTimerRef.current);
    setCardsFlyoutOpen(true);
  };

  const handleMouseLeaveCards = () => {
    flyoutTimerRef.current = setTimeout(() => {
      setCardsFlyoutOpen(false);
    }, 200);
  };
  const [lang, setLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Top Bar Dynamic Settings
  const showTopBar = navigationData?.topBar?.enabled !== false;
  const topLocation = navigationData?.topBar?.locationText ?? 'Unitedstates';
  const topPhone = navigationData?.topBar?.phoneNumber ?? '+91 87789-98453';
  const topPhoneLink = navigationData?.topBar?.phoneLink ?? 'tel:+918778998453';
  const showLang = navigationData?.topBar?.showLanguageSwitcher !== false;
  const showSupplierButton = navigationData?.topBar?.showSupplierButton !== false;
  const supplierText = navigationData?.topBar?.supplierButtonText || 'Become A Fuel Supplier';
  const supplierLink = navigationData?.topBar?.supplierButtonLink || '/fleet';
  const showSupplierShape = navigationData?.topBar?.showSupplierShape !== false;
  const supplierShapeImg = navigationData?.topBar?.supplierShapeImageUrl;

  // Navbar Dynamic Settings
  const showNavbar = navigationData?.navbar?.enabled !== false;
  const logoUrl = navigationData?.navbar?.logoUrl;
  const hasLogoImage = logoUrl !== '' && logoUrl !== 'none';
  const navLinks =
    navigationData?.navbar?.links && navigationData.navbar.links.length > 0
      ? navigationData.navbar.links
      : defaultNavLinks;
  const showCtaButton = navigationData?.navbar?.showCtaButton !== false;
  const ctaText = navigationData?.navbar?.ctaButtonText || 'Find a station';
  const ctaLink = navigationData?.navbar?.ctaButtonLink || '/contact';

  return (
    <>
      {/* 1. Conoco Top Utility Bar (Black #000000, 52px high - scrolls naturally with page) */}
      {showTopBar && (
        <div className="bg-[#000000] text-white text-xs h-[52px] flex items-center border-b border-white/10 w-full relative z-40">
          <div className="w-full flex items-center justify-between pl-5 sm:pl-9 lg:pl-12 pr-0">
            {/* Left: Unitedstates & Contact Info */}
            <div className="flex items-center gap-2.5 font-gotham text-[13px] text-white/90 font-medium tracking-wide">
              {topLocation && <span className="text-white/95">{topLocation}</span>}
              {topLocation && topPhone && <span className="text-white/40">|</span>}
              {topPhone && (
                <a
                  href={topPhoneLink || `tel:${topPhone}`}
                  className="text-white hover:text-[#84d400] transition-colors cursor-pointer"
                >
                  {topPhone}
                </a>
              )}
            </div>

            {/* Right: Language Switcher & Angled Green Supplier CTA */}
            <div className="flex items-center h-[52px]">
              {/* Language Selector */}
              {showLang && (
                <div className="flex items-center gap-2 font-gotham text-[13px] text-white/95 mr-6 sm:mr-8 font-medium">
                  <img
                    src="/uploads/globe-white.svg"
                    alt=""
                    className="w-4 h-4 opacity-90"
                  />
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`transition-colors hover:text-white cursor-pointer ${
                      lang === 'en' ? 'font-bold underline underline-offset-4 text-white' : 'text-white/70'
                    }`}
                  >
                    English
                  </button>
                  <span className="text-white/40">|</span>
                  <button
                    type="button"
                    onClick={() => setLang('es')}
                    className={`transition-colors hover:text-white cursor-pointer ${
                      lang === 'es' ? 'font-bold underline underline-offset-4 text-white' : 'text-white/70'
                    }`}
                  >
                    Español
                  </button>
                </div>
              )}

              {/* Green Slanted "Become A Fuel Supplier" CTA Block */}
              {showSupplierButton && (
                <div className="h-[52px] flex items-center">
                  {showSupplierShape && supplierShapeImg !== '' && supplierShapeImg !== 'none' && (
                    <SafeImage
                      src={supplierShapeImg || '/uploads/go-shape-londis-green-utility-bar.png'}
                      defaultFallback="/uploads/go-shape-londis-green-utility-bar.png"
                      alt=""
                      className="h-[52px] w-auto pointer-events-none hidden sm:block"
                    />
                  )}
                  {supplierLink.startsWith('http') ? (
                    <a
                      href={supplierLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#016839] hover:bg-[#014d28] text-white font-gotham font-bold text-[12px] sm:text-[13px] uppercase tracking-[0.24px] h-[52px] px-6 sm:px-8 flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{supplierText}</span>
                      <img
                        src="/uploads/nozzle.svg"
                        alt=""
                        className="w-4 h-4 object-contain brightness-0 invert"
                      />
                    </a>
                  ) : (
                    <Link
                      to={supplierLink}
                      className="bg-[#016839] hover:bg-[#014d28] text-white font-gotham font-bold text-[12px] sm:text-[13px] uppercase tracking-[0.24px] h-[52px] px-6 sm:px-8 flex items-center gap-2.5 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{supplierText}</span>
                      <img
                        src="/uploads/nozzle.svg"
                        alt=""
                        className="w-4 h-4 object-contain brightness-0 invert"
                      />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Floating Rounded Navbar Card matching Conoco Official Design & Background */}
      {showNavbar && (
        <header className="sticky top-0 z-50 w-full transition-all duration-300 py-3 sm:py-5 px-4 sm:px-8 lg:px-12 pointer-events-none bg-transparent mb-3 sm:mb-6">
          <div
            className={`max-w-[1448px] mx-auto rounded-[24px] transition-all duration-300 px-8 sm:px-12 lg:px-16 py-6 sm:py-7 lg:py-8 flex items-center justify-between pointer-events-auto ${
              isScrolled
                ? 'bg-white/80 backdrop-blur-md shadow-sm'
                : 'bg-white'
            }`}
          >
            {/* Official Brand Logo or Typography fallback */}
            <Link to="/" className="flex items-center shrink-0 min-w-[140px] sm:min-w-[200px]">
              {hasLogoImage ? (
                <SafeImage
                  src={logoUrl || '/uploads/conoco-default.png'}
                  defaultFallback="/uploads/conoco-default.png"
                  alt="Petrol"
                  className="h-9 sm:h-10 w-auto object-contain hover:scale-[1.02] transition-transform"
                />
              ) : (
                <span className="font-gotham text-2xl sm:text-3xl font-black tracking-tight text-[#016839]">
                  Petrol<span className="text-[#84d400]">®</span>
                </span>
              )}
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-11">
              {navLinks.map((link, idx) => {
                const isCardsLink =
                  link.name === 'Cards & Rewards' ||
                  link.to.includes('card') ||
                  link.to.includes('fleet');

                return (
                  <div
                    key={link.to || idx}
                    className="relative py-2"
                    onMouseEnter={isCardsLink ? handleMouseEnterCards : undefined}
                    onMouseLeave={isCardsLink ? handleMouseLeaveCards : undefined}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        `font-gotham text-[15px] xl:text-[16px] leading-[24px] transition-colors inline-flex items-center gap-1.5 ${
                          isActive || (isCardsLink && cardsFlyoutOpen)
                            ? 'text-[#016839] font-bold'
                            : 'font-medium text-[#121212] hover:text-[#016839]'
                        }`
                      }
                    >
                      <span>{link.name}</span>
                      {isCardsLink && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            cardsFlyoutOpen ? 'rotate-180 text-[#016839]' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </NavLink>
                  </div>
                );
              })}
            </nav>

            {/* Right Action: Green Pill "Find a station" Button in Founders Grotesk */}
            <div className="flex items-center gap-3 shrink-0">
              {showCtaButton && (
                <>
                  {ctaLink.startsWith('http') ? (
                    <a
                      href={ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] leading-[20px] tracking-[-0.15px] h-[48px] px-7 sm:px-8 rounded-full flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                    >
                      {/* Conoco Official Location Pin SVG */}
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="w-4 h-5 text-white fill-current shrink-0"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{ctaText}</span>
                    </a>
                  ) : (
                    <Link
                      to={ctaLink}
                      className="bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] leading-[20px] tracking-[-0.15px] h-[48px] px-7 sm:px-8 rounded-full flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer whitespace-nowrap"
                    >
                      {/* Conoco Official Location Pin SVG */}
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        className="w-4 h-5 text-white fill-current shrink-0"
                        viewBox="0 0 16 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>{ctaText}</span>
                    </Link>
                  )}
                </>
              )}

              {/* Mobile Hamburger Toggle */}
              <div className="lg:hidden flex items-center ml-1">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-[#161616] hover:text-[#016839] cursor-pointer"
                  aria-label="Toggle Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Mega-Menu Flyout for Cards & Rewards (matching User Screenshot 1) */}
          {cardsFlyoutOpen && (
            <div
              onMouseEnter={handleMouseEnterCards}
              onMouseLeave={handleMouseLeaveCards}
              className="hidden lg:block max-w-[1448px] mx-auto mt-2 pointer-events-auto z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="bg-white rounded-[24px] p-8 lg:p-10 shadow-2xl border border-slate-200/90 flex items-center justify-between gap-8 lg:gap-14">
                {/* Left: Forest Green Card Badge with Credit Card visual */}
                <div className="bg-[#016839] rounded-[20px] p-6 flex items-center justify-center w-[300px] lg:w-[340px] h-[190px] shrink-0 shadow-md border border-[#014d28]">
                  <SafeImage
                    src={
                      navDropdown.cardImage ||
                      'https://phillips66.widen.net/content/c5qqgh5vil/jpeg/BrandedFuelCardPrograms_CommercialCreditCard.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb'
                    }
                    defaultFallback="https://phillips66.widen.net/content/c5qqgh5vil/jpeg/BrandedFuelCardPrograms_CommercialCreditCard.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb"
                    alt="Cards & Rewards"
                    className="max-h-full max-w-full object-contain drop-shadow-xl"
                  />
                </div>

                {/* Middle: Title & Description */}
                <div className="flex-1 space-y-2 text-left">
                  <h3 className="font-gotham text-2xl lg:text-3xl font-bold text-[#161616] tracking-tight">
                    {navDropdown.title || 'Cards & Rewards'}
                  </h3>
                  <p className="font-gotham text-slate-600 text-[15px] sm:text-[16px] leading-relaxed max-w-md">
                    {navDropdown.description ||
                      'Explore our suite of cards and rewards to make the most of every mile.'}
                  </p>
                </div>

                {/* Right: Subpage Links with Arrow */}
                <div className="flex flex-col gap-4 shrink-0 font-gotham text-[16px] font-bold text-[#161616] min-w-[220px]">
                  {navDropdown.links?.map((subLink, sIdx) => (
                    <Link
                      key={sIdx}
                      to={subLink.to}
                      onClick={() => setCardsFlyoutOpen(false)}
                      className="group flex items-center justify-between gap-6 hover:text-[#016839] transition-colors py-1.5 border-b border-slate-100 hover:border-[#016839]/30"
                    >
                      <span>{subLink.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#161616] group-hover:text-[#016839] group-hover:translate-x-1.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 px-6 pt-4 pb-6 space-y-3 shadow-xl max-w-[1448px] mx-auto mt-2 rounded-2xl">
              {navLinks.map((link, idx) => (
                <div key={link.to || idx}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block font-gotham text-base leading-[24px] py-2 border-b border-slate-100 ${
                        isActive ? 'text-[#016839] font-bold' : 'font-medium text-[#161616]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                  {link.name === 'Cards & Rewards' && (
                    <div className="pl-4 py-2 space-y-2 bg-slate-50 rounded-xl my-2 border border-slate-200/60">
                      {navDropdown.links?.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          to={sub.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-gotham font-semibold text-slate-700 hover:text-[#016839] py-1.5 pr-3"
                        >
                          <span>{sub.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                {showCtaButton && (
                  <>
                    {ctaLink.startsWith('http') ? (
                      <a
                        href={ctaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center font-founders font-semibold text-[18px] leading-[20px] tracking-[-0.15px] py-3.5 bg-[#016839] text-white rounded-full flex items-center justify-center gap-2"
                      >
                        <span>{ctaText}</span>
                      </a>
                    ) : (
                      <Link
                        to={ctaLink}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center font-founders font-semibold text-[18px] leading-[20px] tracking-[-0.15px] py-3.5 bg-[#016839] text-white rounded-full flex items-center justify-center gap-2"
                      >
                        <span>{ctaText}</span>
                      </Link>
                    )}
                  </>
                )}

                {showSupplierButton && (
                  <>
                    {supplierLink.startsWith('http') ? (
                      <a
                        href={supplierLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center font-gotham font-bold text-[13px] uppercase tracking-[0.24px] py-3 bg-[#161616] text-white rounded-full"
                      >
                        {supplierText}
                      </a>
                    ) : (
                      <Link
                        to={supplierLink}
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-center font-gotham font-bold text-[13px] uppercase tracking-[0.24px] py-3 bg-[#161616] text-white rounded-full"
                      >
                        {supplierText}
                      </Link>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
}
