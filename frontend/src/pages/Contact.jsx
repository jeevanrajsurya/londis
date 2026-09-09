import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getContactPageSettings, submitInquiry } from '../api/client';
import { fallbackSettings } from '../data/forecourtData';
import { resolveImageUrl } from '../utils/imageHelper';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: cmsData } = useQuery({
    queryKey: ['contact-page-cms'],
    queryFn: getContactPageSettings,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: 'always',
  });

  const cms = cmsData || fallbackSettings.contact_page_cms;

  // Form state
  const [topic, setTopic] = useState('OTHER');
  const [stationSpecific, setStationSpecific] = useState('');
  const [selectedStation, setSelectedStation] = useState('S&B Conoco Forecourt - 14205 Katy Freeway, Houston, TX 77079');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [optInNewsletter, setOptInNewsletter] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please enter your first and last name');
      return;
    }
    if (!email.trim() || !message.trim()) {
      toast.error('Please fill in your email address and message');
      return;
    }

    try {
      setLoading(true);
      await submitInquiry({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        name: `${firstName.trim()} ${lastName.trim()}`,
        email: email.trim(),
        phone: phone.trim() || undefined,
        topic: topic === 'OTHER' ? 'General Inquiry' : topic,
        subject: `[${topic}] Contact Form Submission`,
        stationSpecific,
        station: stationSpecific === 'Yes' ? selectedStation : undefined,
        zipCode: zipCode.trim() || undefined,
        optInNewsletter,
        message: message.trim(),
      });

      setSuccess(true);
      toast.success('Your message has been received! Our team will respond shortly.');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to submit message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  }

  const handleResetForm = () => {
    setSuccess(false);
    setTopic('OTHER');
    setStationSpecific('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setZipCode('');
    setPhone('');
    setMessage('');
    setOptInNewsletter(false);
  };

  return (
    <div className="min-h-screen bg-[#ebebef] text-[#161616] font-sans pb-16">
      
      {/* 1. HERO SECTION - Floating rounded white card matching Conoco's .fuels-hero--generic */}
      <section className="max-w-[1448px] mx-auto w-[calc(100%-32px)] sm:w-[calc(100%-64px)] bg-white rounded-[24px] overflow-hidden min-h-[520px] sm:min-h-[600px] md:min-h-[640px] lg:min-h-[680px] xl:min-h-[720px] flex items-center mt-3 sm:mt-6 shadow-none relative">
        {/* Background Media (Image / Video) - 100% full brightness, zero washing out, absolutely NO fallback when blank */}
        {Boolean(cms.hero?.bgMediaUrl && cms.hero.bgMediaUrl.trim()) && (
          <>
            {(cms.hero?.bgMediaType === 'video' || /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(cms.hero.bgMediaUrl)) ? (
              <video
                src={resolveImageUrl(cms.hero.bgMediaUrl.trim())}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <img
                src={resolveImageUrl(cms.hero.bgMediaUrl.trim())}
                alt={cms.hero?.title || 'Contact Us Hero'}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
            {/* Optional tint only if user explicitly selects it in admin */}
            {cms.hero?.overlayStyle === 'light' && (
              <div className="absolute inset-0 bg-white/35 z-[1] pointer-events-none" />
            )}
            {cms.hero?.overlayStyle === 'dark' && (
              <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />
            )}
          </>
        )}

        {(() => {
          const hasMedia = Boolean(cms.hero?.bgMediaUrl && cms.hero.bgMediaUrl.trim());
          const isWhiteText = cms.hero?.textColor === 'white' || (hasMedia && cms.hero?.textColor !== 'dark');
          return (
            <div className={`relative z-10 w-full lg:w-[65%] px-8 sm:px-14 lg:pl-[120px] lg:pr-12 py-20 sm:py-28 lg:py-36 text-left ${
              isWhiteText ? 'text-white' : 'text-[#161616]'
            }`}>
              <div className="flex flex-col gap-6">
                <h1 className={`font-gotham text-4xl sm:text-5xl lg:text-[60px] font-bold leading-[1.14] tracking-tight ${
                  isWhiteText ? 'text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]' : 'text-[#161616]'
                }`}>
                  {cms.hero?.title !== undefined ? cms.hero.title : 'Contact Us'}
                </h1>
                {cms.hero?.subtitle !== undefined ? (
                  Boolean(cms.hero.subtitle && cms.hero.subtitle.trim()) && (
                    <p className={`font-gotham text-lg sm:text-[20px] lg:text-[22px] leading-[1.6] font-normal max-w-2xl ${
                      isWhiteText ? 'text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]' : 'text-[#161616]'
                    }`}>
                      {cms.hero.subtitle}
                    </p>
                  )
                ) : (
                  <p className={`font-gotham text-lg sm:text-[20px] lg:text-[22px] leading-[1.6] font-normal max-w-2xl ${
                    isWhiteText ? 'text-white/95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]' : 'text-[#161616]'
                  }`}>
                    Your car knows and we&#8217;d like to know too. <br className="hidden sm:inline" />
                    Drop us a line below.
                  </p>
                )}
              </div>
            </div>
          );
        })()}
      </section>

      {/* 2. FORM SECTION - Matching Conoco .wp-container-core-group-is-layout-7dc7228c max-w-[1028px], rounded-[8px], border-[#686e77] */}
      <section className="max-w-[1028px] mx-auto px-4 sm:px-6 py-16 sm:py-20 text-left">
        {success ? (
          <div className="bg-white rounded-[24px] p-12 sm:p-16 text-center space-y-6 shadow-none">
            <div className="w-16 h-16 bg-[#e8f7ee] text-[#016839] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold text-[#161616]">Message Sent!</h3>
              <p className="text-base text-slate-600 leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. Our customer service team has received your message and will respond promptly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetForm}
              className="h-[48px] px-8 rounded-full bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            
            {/* Field 1: Select a topic */}
            <div>
              <label htmlFor="contact-topic" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Select a topic <span className="italic font-normal text-[#686e77] text-[13px] ml-1">required</span>
              </label>
              <div className="relative">
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] appearance-none cursor-pointer transition-colors"
                >
                  <option value="OTHER">&#8212;</option>
                  {(cms.topics || []).map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#686e77]">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.097631 1.31658 -0.097631 1.70711 0.292893L5 3.58579L8.29289 0.292893C8.68342 -0.0976311 9.31658 -0.0976311 9.70711 0.292893C10.0976 0.683417 10.0976 1.31658 9.70711 1.70711L5.70711 5.70711C5.31658 6.09763 4.68342 6.09763 4.29289 5.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z" fill="#686e77" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Field 2: Does this concern a specific station? */}
            <div className="pt-1">
              <label className="block text-[16px] font-normal text-[#161616] mb-2">
                Does this concern a specific station?
              </label>
              <div className="space-y-2 pt-0.5">
                <label className="flex items-center gap-3.5 cursor-pointer text-[16px] text-[#161616]">
                  <input
                    type="radio"
                    name="stationSpecific"
                    value="Yes"
                    checked={stationSpecific === 'Yes'}
                    onChange={() => setStationSpecific('Yes')}
                    className="w-5 h-5 border border-[#686e77] text-[#016839] focus:ring-[#016839] cursor-pointer accent-[#016839]"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-3.5 cursor-pointer text-[16px] text-[#161616]">
                  <input
                    type="radio"
                    name="stationSpecific"
                    value="No"
                    checked={stationSpecific === 'No'}
                    onChange={() => setStationSpecific('No')}
                    className="w-5 h-5 border border-[#686e77] text-[#016839] focus:ring-[#016839] cursor-pointer accent-[#016839]"
                  />
                  <span>No</span>
                </label>
              </div>

              {/* Station Selection Dropdown when Yes is selected */}
              {stationSpecific === 'Yes' && (
                <div className="pt-3">
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839]"
                  >
                    <option value="S&B Conoco Forecourt - 14205 Katy Freeway, Houston, TX 77079">
                      S&B Conoco Forecourt - 14205 Katy Freeway, Houston, TX 77079
                    </option>
                    <option value="S&B Memorial City Forecourt & Car Wash - 9800 Katy Fwy, Houston, TX 77024">
                      S&B Memorial City Forecourt & Car Wash - 9800 Katy Fwy, Houston, TX 77024
                    </option>
                    <option value="S&B Energy Corridor 24/7 C-Store - 11700 Westheimer Rd, Houston, TX 77077">
                      S&B Energy Corridor 24/7 C-Store - 11700 Westheimer Rd, Houston, TX 77077
                    </option>
                  </select>
                </div>
              )}
            </div>

            {/* Field 3: First Name */}
            <div>
              <label htmlFor="contact-fname" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                First Name <span className="italic font-normal text-[#686e77] text-[13px] ml-1">required</span>
              </label>
              <input
                id="contact-fname"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors"
              />
            </div>

            {/* Field 4: Last Name */}
            <div>
              <label htmlFor="contact-lname" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Last Name <span className="italic font-normal text-[#686e77] text-[13px] ml-1">required</span>
              </label>
              <input
                id="contact-lname"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors"
              />
            </div>

            {/* Field 5: Email */}
            <div>
              <label htmlFor="contact-email" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Email <span className="italic font-normal text-[#686e77] text-[13px] ml-1">required</span>
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors"
              />
            </div>

            {/* Field 6: Zip Code */}
            <div>
              <label htmlFor="contact-zip" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Zip Code
              </label>
              <input
                id="contact-zip"
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors"
              />
            </div>

            {/* Field 7: Phone */}
            <div>
              <label htmlFor="contact-phone" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Phone
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full h-[52px] px-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors"
              />
            </div>

            {/* Field 8: Message */}
            <div>
              <label htmlFor="contact-message" className="block text-[16px] font-normal text-[#161616] mb-1.5">
                Message <span className="italic font-normal text-[#686e77] text-[13px] ml-1">required</span>
              </label>
              <textarea
                id="contact-message"
                rows={10}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[260px] p-4 rounded-[8px] border border-[#686e77] text-[16px] text-[#161616] bg-white focus:outline-none focus:border-[#016839] focus:ring-1 focus:ring-[#016839] transition-colors resize-y"
              />
            </div>

            {/* Field 9: Opt-in Checkbox - Only rendered if optInText is non-empty */}
            {Boolean(cms?.formSettings?.optInText && cms.formSettings.optInText.trim()) && (
              <div className="pt-2">
                <label className="flex items-start gap-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optInNewsletter}
                    onChange={(e) => setOptInNewsletter(e.target.checked)}
                    className="w-[18px] h-[18px] rounded-[3px] border border-[#686e77] text-[#016839] focus:ring-[#016839] mt-0.5 cursor-pointer accent-[#016839]"
                  />
                  <span className="text-[14px] text-[#161616] leading-[22px] font-normal">
                    {cms.formSettings.optInText}
                  </span>
                </label>
              </div>
            )}

            {/* Field 10: Submit Button & Legal Disclaimers */}
            <div className="pt-3 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="h-[48px] px-8 rounded-full bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] leading-[20px] transition-all inline-flex items-center justify-center gap-2.5 group disabled:opacity-50 cursor-pointer shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <span>Submit</span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>

              {Boolean(cms?.formSettings?.disclaimerText && cms.formSettings.disclaimerText.trim()) && (
                <div className="text-[12px] text-[#161616] leading-[18px] pt-1">
                  <p>{cms.formSettings.disclaimerText}</p>
                </div>
              )}
            </div>

          </form>
        )}
      </section>

      {/* 3. TWO-COLUMN FEATURE CARDS - Matching Conoco's .wp-block-fuels-redesign-two-columns */}
      {Boolean(cms.twoColumnCards && cms.twoColumnCards.length > 0) && (
        <section className="max-w-[1512px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className={
            cms.twoColumnCards.length === 1
              ? 'max-w-[740px] mx-auto'
              : cms.twoColumnCards.length === 3
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 gap-6'
          }>
            {cms.twoColumnCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="bg-white rounded-[24px] p-6 pb-12 flex flex-col justify-between text-left shadow-none h-full"
              >
                {/* Inset Image with 16px corner radius and 72.28% ratio (only if imageUrl provided) */}
                {Boolean(card.imageUrl && card.imageUrl.trim()) && (
                  <div className="relative w-full rounded-[16px] overflow-hidden mb-8 lg:mb-10 bg-[#e0e0e0] pb-[72.28%] shrink-0">
                    <img
                      src={resolveImageUrl(card.imageUrl)}
                      alt={card.title || 'Feature card'}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="flex-1 flex flex-col justify-between px-0 sm:px-4 lg:px-6 space-y-8">
                  <div className="space-y-4">
                    {card.title && (
                      <h3 className="font-gotham text-3xl sm:text-[36px] lg:text-[42px] font-bold text-[#161616] leading-[1.095] tracking-tight">
                        {card.title}
                      </h3>
                    )}
                    {card.description && (
                      <div className="font-gotham text-base sm:text-lg lg:text-[20px] text-[#161616] leading-[1.6] font-normal">
                        <p>
                          {card.description}{' '}
                          {card.phone && (
                            <a
                              href={`tel:${card.phone.replace(/[^0-9+]/g, '')}`}
                              className="underline text-[#161616] hover:text-[#016839] font-normal"
                            >
                              {card.phone}
                            </a>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {Boolean(card.buttonText && card.buttonLink) && (
                    <div className="pt-2">
                      {card.buttonLink.startsWith('http') ? (
                        <a
                          href={card.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-[48px] px-8 rounded-full bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] leading-[20px] inline-flex items-center gap-2.5 group transition-all cursor-pointer"
                        >
                          <span>{card.buttonText}</span>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <path
                              d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          to={card.buttonLink}
                          className="h-[48px] px-8 rounded-full bg-[#016839] hover:bg-[#014d28] text-white font-founders font-semibold text-[18px] leading-[20px] inline-flex items-center gap-2.5 group transition-all cursor-pointer"
                        >
                          <span>{card.buttonText}</span>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <path
                              d="M3.33331 7.99998L12.6666 7.99998M12.6666 7.99998L7.99998 3.33331M12.6666 7.99998L7.99998 12.6666"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. BENTO INFO CARDS - Matching Conoco's .wp-block-fuels-redesign-bento */}
      {Boolean(cms.bentoCards && cms.bentoCards.length > 0) && (
        <section className="max-w-[1512px] mx-auto px-4 sm:px-6 py-4 pb-16">
          <div className={
            cms.bentoCards.length === 1
              ? 'max-w-[560px] mx-auto'
              : cms.bentoCards.length === 2
                ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1028px] mx-auto'
                : cms.bentoCards.length === 4
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          }>
            {cms.bentoCards.map((bento, idx) => (
              <div
                key={bento.id || idx}
                className="bg-[#016839] rounded-[24px] min-h-[440px] p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white shadow-none h-full"
              >
                <div>
                  <h2 className="font-gotham text-3xl sm:text-[36px] lg:text-[42px] font-bold leading-[1.095] text-white mb-6">
                    {bento.title}
                  </h2>
                  <div className="font-gotham text-base sm:text-lg lg:text-[20px] text-white space-y-2 leading-[1.6] font-normal">
                    {(bento.lines || []).map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  {bento.phone && (
                    <p>
                      <a
                        href={`tel:${bento.phone.replace(/[^0-9+]/g, '')}`}
                        className="underline hover:opacity-90 font-normal text-white"
                      >
                        {bento.phone}
                      </a>
                    </p>
                  )}
                  {bento.linkUrl && bento.linkText && (
                    <p>
                      <a
                        href={bento.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:opacity-90 font-normal text-white"
                      >
                        {bento.linkText}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Spacer before footer */}
      <div className="h-8 sm:h-12" aria-hidden="true" />

    </div>
  );
}
