import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import {
  Save,
  RotateCcw,
  Layout,
  Grid,
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ShoppingBag,
  Loader2,
  FileText,
  Layers,
  Info,
  MapPin,
  Coffee,
  Utensils,
  CreditCard,
  ShieldCheck,
  Truck,
  ChevronDown,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_OUR_PRODUCTS_CMS = {
  hub: {
    hero: {
      bgMediaUrl:
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1920&q=80',
      bgMediaType: 'image',
      badgeText: 'OUR PRODUCTS',
      title: 'Our Products',
      subtitle: '',
      overlayStyle: 'warm',
    },
    intro: {
      headline:
        'We carry beverages fit for energizing, satisfying, warming up, cooling down or just plain quenching your thirst',
      body:
        'We’ve got your food solutions, too - whether it’s for on-the-go, at work or anywhere in-between… treat time, lunch time, anytime! We’ll supply the everyday necessities for your fridge, your family, your first aid kit or your traveling tool box. Fuel up, oil up and tidy up your car. One stop at S&B Forecourt and you’re ready to take on your day. No matter why you’re stopping or who you’re with, just come as you are…we’ll be here ready and waiting for you!',
    },
    actionCards: [
      {
        id: 'card-thirst-stop',
        title: "America's\nTHIRST STOP!",
        subtitle:
          'Ice-cold fountain drinks, fresh barista coffee, froster slushies and ready-to-grab cold teas and juices.',
        imageUrl:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'blue',
        linkUrl: '/our-products/americas-thirst-stop',
        buttonText: 'More info →',
        badge: 'Drinks & Beverages',
        showDash: true,
      },
      {
        id: 'card-fresh-food',
        title: 'Fresh food,\nfast!',
        subtitle:
          'We’re the hot spot for tasty snacks and meals on the move. From hot dogs, artisan pizza, to sandwiches and salads, we’ve got your hunger covered.',
        imageUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'green',
        linkUrl: '/our-products/meal-deals',
        buttonText: 'More info →',
        badge: 'Hot Foods & Combos',
        showDash: true,
      },
      {
        id: 'card-easy-pay',
        title: 'Easy Pay',
        subtitle:
          'Easy to Save, Easy to Pay, Every Day, on Every Gallon! Link your S&B Easy Pay card to your checking account for the most secure, convenient way to fuel up and save up to 30¢/gal.',
        imageUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'white',
        linkUrl: '/our-products/easy-pay',
        buttonText: 'Read more →',
        badge: 'Save 30¢/gal',
        showDash: true,
      },
      {
        id: 'card-fleet',
        title: 'Fleet Card',
        subtitle:
          'Empower your commercial fleet with centralized fuel management, driver PIN security, monthly consolidated invoicing and tiered volume savings.',
        imageUrl:
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'white',
        linkUrl: '/our-products/business',
        buttonText: 'More info →',
        badge: 'B2B Solutions',
        showDash: true,
      },
      {
        id: 'card-quality-guaranteed',
        title: 'Quality\nguaranteed',
        subtitle:
          'When we say quality guaranteed fuel, we mean it. Top Tier™ detergent gasoline that cleans intake valves, protects engines, and enhances every mile.',
        imageUrl:
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
        cardTheme: 'slate',
        linkUrl: '/our-products/qualityguaranteed',
        buttonText: 'More info →',
        badge: 'Top Tier™ Fuel',
        showDash: true,
      },
    ],
  },
  subpages: {
    thirstStop: {
      hero: {
        title: 'WE DEFINITELY HAVE THAT',
        subtitle:
          'Thirsty? Chill out with an icy Polar Pop, grab an energy drink, or pour a steaming hot cup of bean-to-cup Arabica coffee.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your nearest station',
        buttonLink: '/contact',
      },
      locator: {
        title: 'Find your nearest store',
        placeholder: 'City & State or ZIP',
        buttonLink: '/contact',
      },
      featuredProducts: [
        {
          id: 'fp-1',
          name: 'NEW GHOST® Energy Strawbango',
          badge: 'NEW',
          description: 'Legendary energy and epic flavor with zero sugar and natural caffeine.',
          imageUrl:
            'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-2',
          name: 'NEW CELSIUS® Watermelon Ice',
          badge: 'REFRESHING',
          description: 'Essential energy formula packed with 7 essential vitamins and zero sugar.',
          imageUrl:
            'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'fp-3',
          name: 'Sprite Cherry Polar Pop',
          badge: 'CUSTOMER FAVORITE',
          description: 'Ice-cold crisp Sprite with a burst of sweet cherry served in our 44oz cup.',
          imageUrl:
            'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
        },
      ],
      limitedTimeOffers: [
        {
          id: 'lto-1',
          title: "S'mores Coffee",
          description: 'Rich dark roast infused with sweet marshmallow, toasted graham, and melted milk chocolate.',
          imageUrl:
            'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
        },
        {
          id: 'lto-2',
          title: "S'mores Hot Chocolate",
          description: 'Decadent creamy cocoa topped with campfire marshmallow notes and crunchy graham crumb topping.',
          imageUrl:
            'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
        },
      ],
      everydayClassics: [
        {
          id: 'ec-1',
          title: 'Award Winning Coffee',
          description: '100% Arabica beans freshly ground for each individual cup.',
          imageUrl:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
        },
      ],
      disclaimer: '* Available at participating S&B Forecourt & C-Store locations across the United States.',
    },
    mealDeals: {
      hero: {
        title: 'MEAL DEALS',
        subtitle: 'Hungry? Choose Your Deal! Satisfying, high-value combos made fresh daily for drivers on the go.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your local store',
        buttonLink: '/contact',
      },
      dealTiers: [
        {
          id: 'tier-3-lunch',
          title: '$3 Meal Deal',
          description: 'Includes a hot dog OR a taquito, 1oz-2oz bag of Frito-Lay chips, and any size Polar Pop (up to 44oz)',
          items: [
            { id: 't1-1', name: 'Grilled All-Beef Hot Dog', imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80' },
            { id: 't1-2', name: 'Crispy Artisan Taquito', imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80' },
          ],
        },
      ],
      disclaimer: '* Prices and participation may vary by location. Applicable taxes not included. Available at participating S&B stores.',
    },
    easyPay: {
      hero: {
        title: 'Easy Pay: Your Gas Card Alternative for Everyday Savings',
        subtitle: 'Sign up now to save 30¢ per gallon on your first 100 gallons or 60 days, then save at least 10¢ per gallon every single day!',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Enroll now',
        buttonLink: '/contact',
      },
      whatIs: {
        title: 'What is Easy Pay Debit?',
        points: [
          { heading: 'A Simple Way to Pay at S&B', description: 'Experience seamless transactions with Easy Pay linking to your bank account.' },
          { heading: 'Minimum 10¢ off per gallon', description: 'Enjoy at least 10¢ off every gallon, every day after introductory savings.' },
        ],
        memberBox: {
          title: 'Already an Easy Pay member?',
          description: 'Looking to log in to your account, check transaction history, or order replacement cards?',
          buttonText: 'Log In to Account',
          buttonLink: '/contact',
        },
      },
      steps: [
        { stepNumber: 'Step 1', title: 'Get your Easy Pay Card', description: 'Pick up an Easy Pay card at your local store or order online.', imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80', ctaText: 'Enroll now', ctaLink: '/contact' },
      ],
      faqs: [
        { category: 'General', question: 'How does Easy Pay work?', answer: 'Easy Pay is an ACH debit card linked securely to your existing checking account.' },
      ],
    },
    businessFleet: {
      hero: {
        title: 'A smarter way to fuel your fleet. Savings start at 10¢*',
        subtitle: 'With S&B Pro fleet cards and digital fleet solutions, you can cut fuel costs and simplify fleet management.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Get your personal quote',
        buttonLink: '/contact',
        secondaryButtonText: 'Apply for Fleet Card',
        secondaryButtonLink: '/contact',
      },
      offerRibbon: 'Enroll your fleet today and save 10¢ per gallon for 6 months* – Take advantage of this limited time offer.',
      optimizationFeatures: [
        { id: 'opt-1', title: 'Drive more. Pay less.', description: 'Save up to $40 a month per vehicle with tiered volume fuel rebates.', iconName: 'DollarSign' },
      ],
      fleetSolutions: [
        {
          id: 'sol-1',
          leadingTag: 'For exclusive fueling',
          title: 'Fleet Card',
          priceText: 'No monthly card fees',
          benefits: ['Save +10¢ per gallon*', 'All S&B Forecourt fuel stations', 'Fleet spend analytics'],
          imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=600&q=80',
          applyLink: '/contact',
          learnMoreLink: '/contact',
        },
      ],
      supportBanner: {
        title: 'Still not sure which product is best for you?',
        description: 'S&B Pro has a dedicated network of commercial fueling experts ready to analyze your fleet mileage.',
        buttonText: 'Fill contact form',
        buttonLink: '/contact',
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      },
      faqs: [
        { question: 'How can I find S&B locations near me for my fleet?', answer: 'Use our interactive Store Locator to view commercial fueling lanes.' },
      ],
    },
    qualityGuaranteed: {
      hero: {
        title: 'Best-in-class fuel services',
        subtitle: 'Top Tier™ certified gasoline that cleans intake valves, protects your engine, and maximizes fuel economy.',
        bgMediaUrl:
          'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
        buttonText: 'Find your local station',
        buttonLink: '/contact',
      },
      locator: {
        title: 'Find your local S&B station here',
        placeholder: 'City & State or ZIP',
        buttonLink: '/contact',
      },
      commitment: {
        title: 'Quality Guaranteed',
        p1: 'We guarantee our fuel is of high grade quality that meets all EPA standards.',
        p2: 'When we say quality guaranteed, we mean it. We strive to deliver a quality customer experience every time.',
      },
      showcaseImage1: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
      problemSteps: {
        heading: 'If you do experience a problem with our S&B fuel, please follow these easy steps:',
        steps: ['Call our 1-800-555-SANDB customer service line within 2 days.', 'Provide required support documentation.', 'We will work with you on full reimbursement.'],
        disclaimer: '* S&B Retail investigates all claims and reserves the right to reject any claim not supported by appropriate documentation.',
        supportTitle: 'Customer Care Line',
        supportPhone: '1-800-555-SANDB (1-800-555-7263)',
      },
      showcaseImage2: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      faqs: [
        { question: 'Why should I choose S&B fuels?', answer: 'Our fuel contains 3x more cleaning detergent than standard requirements.' },
      ],
    },
  },
};

export default function OurProductsCmsTab() {
  const queryClient = useQueryClient();
  const [activeMainTab, setActiveMainTab] = useState('subpages'); // 'hero', 'cards', 'subpages'
  const [activeSubpageKey, setActiveSubpageKey] = useState('thirstStop');
  const [uploadingHero, setUploadingHero] = useState(false);

  const { data: settingData, isLoading } = useQuery({
    queryKey: ['setting', 'our_products_cms'],
    queryFn: () => getSettingByKey('our_products_cms'),
  });

  const [formData, setFormData] = useState(DEFAULT_OUR_PRODUCTS_CMS);

  useEffect(() => {
    if (settingData && settingData.value) {
      try {
        const parsed = JSON.parse(settingData.value);
        setFormData({
          hub: {
            ...DEFAULT_OUR_PRODUCTS_CMS.hub,
            ...(parsed.hub || {}),
            hero: { ...DEFAULT_OUR_PRODUCTS_CMS.hub.hero, ...(parsed.hub?.hero || {}) },
            intro: { ...DEFAULT_OUR_PRODUCTS_CMS.hub.intro, ...(parsed.hub?.intro || {}) },
            actionCards: Array.isArray(parsed.hub?.actionCards)
              ? parsed.hub.actionCards
              : DEFAULT_OUR_PRODUCTS_CMS.hub.actionCards,
          },
          subpages: {
            ...DEFAULT_OUR_PRODUCTS_CMS.subpages,
            ...(parsed.subpages || {}),
          },
        });
      } catch (e) {
        console.error('Failed to parse our_products_cms setting:', e);
      }
    }
  }, [settingData]);

  const updateMutation = useMutation({
    mutationFn: (newData) => updateSetting('our_products_cms', JSON.stringify(newData)),
    onSuccess: () => {
      queryClient.invalidateQueries(['setting', 'our_products_cms']);
      queryClient.invalidateQueries(['our-products-cms']);
      toast.success('Our Products settings saved successfully!');
    },
    onError: (err) => {
      toast.error('Failed to save settings: ' + (err.message || 'Unknown error'));
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset all Our Products data to defaults? Any unsaved edits will be lost.')) {
      setFormData(DEFAULT_OUR_PRODUCTS_CMS);
      toast.success('Reset to default configuration. Click "Save Changes" to apply.');
    }
  };

  const handleHeroMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingHero(true);
      const res = await uploadImage(file);
      const url = res.url || res.secure_url;
      const isVideo = file.type.startsWith('video/');
      setFormData((prev) => ({
        ...prev,
        hub: {
          ...prev.hub,
          hero: {
            ...prev.hub.hero,
            bgMediaUrl: url,
            bgMediaType: isVideo ? 'video' : 'image',
          },
        },
      }));
      toast.success('Media uploaded successfully!');
    } catch (err) {
      toast.error('Upload failed: ' + (err.message || 'Unknown error'));
    } finally {
      setUploadingHero(false);
    }
  };

  // Helper for updating active subpage
  const updateSubpage = (updater) => {
    setFormData((prev) => {
      const current = prev.subpages[activeSubpageKey] || DEFAULT_OUR_PRODUCTS_CMS.subpages[activeSubpageKey] || {};
      const updated = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
      return {
        ...prev,
        subpages: {
          ...prev.subpages,
          [activeSubpageKey]: updated,
        },
      };
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <Loader2 className="w-8 h-8 animate-spin text-[#016839]" />
      </div>
    );
  }

  const currentSubpage = formData.subpages[activeSubpageKey] || DEFAULT_OUR_PRODUCTS_CMS.subpages[activeSubpageKey] || {};
  const subHero = currentSubpage.hero || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-gotham">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2.5">
            <ShoppingBag className="w-6 h-6 text-[#016839]" />
            Our Products CMS & Child Pages Manager
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage the Our Products Hub banner, 5 feature cards, and complete layouts for each dedicated child landing page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Default
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="px-5 py-2 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {[
          { id: 'subpages', label: '1. Child Landing Subpages (5 Live Links)', icon: Layers },
          { id: 'hero', label: '2. Hub Hero & Intro Header', icon: Layout },
          { id: 'cards', label: '3. Hub Feature Cards', icon: Grid },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMainTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMainTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
                isActive
                  ? 'border-[#016839] text-[#016839] bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: CHILD SUBPAGES (Live Links Manager) */}
      {/* ========================================================================= */}
      {activeMainTab === 'subpages' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Select Subpage To Edit</h3>
              <p className="text-xs text-slate-500">
                Faithfully matches the exact structure and sections of the live Circle K pages.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#016839] bg-[#e8f7ee] px-3 py-1 rounded-full border border-[#016839]/20">
              Live Link Synced
            </span>
          </div>

          {/* Subpage Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'thirstStop', label: "1. America's Thirst Stop" },
              { id: 'mealDeals', label: '2. Meal Deals' },
              { id: 'easyPay', label: '3. Easy Pay' },
              { id: 'businessFleet', label: '4. Business Fleet' },
              { id: 'qualityGuaranteed', label: '5. Quality Guaranteed Fuel' },
            ].map((sp) => (
              <button
                key={sp.id}
                type="button"
                onClick={() => setActiveSubpageKey(sp.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeSubpageKey === sp.id
                    ? 'bg-[#016839] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>

          {/* Common Split Hero Editor */}
          <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <h4 className="font-black text-xs uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Layout className="w-4 h-4 text-[#016839]" /> Split 50/50 Hero Banner
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Hero Main Headline</label>
                <input
                  type="text"
                  value={subHero.title ?? ''}
                  onChange={(e) =>
                    updateSubpage((curr) => ({
                      ...curr,
                      hero: { ...(curr.hero || {}), title: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Hero Subtitle / Copy</label>
                <textarea
                  rows={2}
                  value={subHero.subtitle ?? ''}
                  onChange={(e) =>
                    updateSubpage((curr) => ({
                      ...curr,
                      hero: { ...(curr.hero || {}), subtitle: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-700">Hero Banner Image URL (Right Side)</label>
                <input
                  type="text"
                  value={subHero.bgMediaUrl ?? ''}
                  onChange={(e) =>
                    updateSubpage((curr) => ({
                      ...curr,
                      hero: { ...(curr.hero || {}), bgMediaUrl: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hero Button Label</label>
                <input
                  type="text"
                  value={subHero.buttonText ?? ''}
                  onChange={(e) =>
                    updateSubpage((curr) => ({
                      ...curr,
                      hero: { ...(curr.hero || {}), buttonText: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hero Button Link</label>
                <input
                  type="text"
                  value={subHero.buttonLink ?? ''}
                  onChange={(e) =>
                    updateSubpage((curr) => ({
                      ...curr,
                      hero: { ...(curr.hero || {}), buttonLink: e.target.value },
                    }))
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* SUBPAGE 1: THIRST STOP SPECIFIC SECTIONS */}
          {/* ================================================================= */}
          {activeSubpageKey === 'thirstStop' && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              {/* Featured Products Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-[#016839]" /> Featured Products (3-Column Square Cards)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      updateSubpage((curr) => ({
                        ...curr,
                        featuredProducts: [
                          ...(curr.featuredProducts || []),
                          {
                            id: 'fp-' + Date.now(),
                            name: 'New Beverage Item',
                            badge: 'NEW',
                            description: 'Description of refreshing beverage drink.',
                            imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
                          },
                        ],
                      }))
                    }
                    className="px-3 py-1.5 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Product
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentSubpage.featuredProducts || []).map((prod, pIdx) => (
                    <div key={prod.id || pIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Product Title</label>
                        <input
                          type="text"
                          value={prod.name ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.featuredProducts || [])];
                              list[pIdx] = { ...list[pIdx], name: val };
                              return { ...curr, featuredProducts: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Badge</label>
                        <input
                          type="text"
                          value={prod.badge ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.featuredProducts || [])];
                              list[pIdx] = { ...list[pIdx], badge: val };
                              return { ...curr, featuredProducts: list };
                            });
                          }}
                          placeholder="e.g. NEW, EXCLUSIVE"
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={prod.imageUrl ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.featuredProducts || [])];
                              list[pIdx] = { ...list[pIdx], imageUrl: val };
                              return { ...curr, featuredProducts: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Description</label>
                        <input
                          type="text"
                          value={prod.description ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.featuredProducts || [])];
                              list[pIdx] = { ...list[pIdx], description: val };
                              return { ...curr, featuredProducts: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            updateSubpage((curr) => ({
                              ...curr,
                              featuredProducts: (curr.featuredProducts || []).filter((_, i) => i !== pIdx),
                            }));
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Limited Time Offers Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#016839]" /> Limited Time Offers (3-Column Square Cards)
                  </h4>
                  <button
                    type="button"
                    onClick={() =>
                      updateSubpage((curr) => ({
                        ...curr,
                        limitedTimeOffers: [
                          ...(curr.limitedTimeOffers || []),
                          {
                            id: 'lto-' + Date.now(),
                            title: 'Seasonal Promo Item',
                            description: 'Limited time seasonal exclusive item description.',
                            imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
                          },
                        ],
                      }))
                    }
                    className="px-3 py-1.5 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add LTO Item
                  </button>
                </div>

                <div className="space-y-3">
                  {(currentSubpage.limitedTimeOffers || []).map((lto, lIdx) => (
                    <div key={lto.id || lIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-4">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Title</label>
                        <input
                          type="text"
                          value={lto.title ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.limitedTimeOffers || [])];
                              list[lIdx] = { ...list[lIdx], title: val };
                              return { ...curr, limitedTimeOffers: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Image URL</label>
                        <input
                          type="text"
                          value={lto.imageUrl ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.limitedTimeOffers || [])];
                              list[lIdx] = { ...list[lIdx], imageUrl: val };
                              return { ...curr, limitedTimeOffers: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Description</label>
                        <input
                          type="text"
                          value={lto.description ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.limitedTimeOffers || [])];
                              list[lIdx] = { ...list[lIdx], description: val };
                              return { ...curr, limitedTimeOffers: list };
                            });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                      <div className="sm:col-span-1 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            updateSubpage((curr) => ({
                              ...curr,
                              limitedTimeOffers: (curr.limitedTimeOffers || []).filter((_, i) => i !== lIdx),
                            }));
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUBPAGE 2: MEAL DEALS SPECIFIC SECTIONS */}
          {/* ================================================================= */}
          {activeSubpageKey === 'mealDeals' && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-[#016839]" /> Meal Deal Tiers ($3, $4, $5 Combos)
                  </h4>
                  <p className="text-xs text-slate-500">Add or manage meal tiers and component items</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    updateSubpage((curr) => ({
                      ...curr,
                      dealTiers: [
                        ...(curr.dealTiers || []),
                        {
                          id: 'tier-' + Date.now(),
                          title: 'New Meal Deal',
                          description: 'Includes your choice of entree + snack + drink.',
                          items: [
                            { id: 'item-1', name: 'Combo Item 1', imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80' },
                          ],
                        },
                      ],
                    }))
                  }
                  className="px-3 py-1.5 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Deal Tier
                </button>
              </div>

              <div className="space-y-6">
                {(currentSubpage.dealTiers || []).map((tier, tIdx) => (
                  <div key={tier.id || tIdx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#016839] text-white font-black text-xs flex items-center justify-center">
                          {tIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={tier.title ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const list = [...(curr.dealTiers || [])];
                              list[tIdx] = { ...list[tIdx], title: val };
                              return { ...curr, dealTiers: list };
                            });
                          }}
                          placeholder="e.g. $3 Meal Deal"
                          className="font-black text-sm px-2.5 py-1 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          updateSubpage((curr) => ({
                            ...curr,
                            dealTiers: (curr.dealTiers || []).filter((_, i) => i !== tIdx),
                          }));
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tier Subtitle / Description</label>
                      <input
                        type="text"
                        value={tier.description ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const list = [...(curr.dealTiers || [])];
                            list[tIdx] = { ...list[tIdx], description: val };
                            return { ...curr, dealTiers: list };
                          });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>

                    {/* Tier Items */}
                    <div className="space-y-2 pt-2 border-t border-slate-200/60">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-bold text-slate-700">Product Option Cards ({tier.items?.length || 0})</label>
                        <button
                          type="button"
                          onClick={() => {
                            updateSubpage((curr) => {
                              const list = [...(curr.dealTiers || [])];
                              const items = [...(list[tIdx].items || [])];
                              items.push({ id: 'item-' + Date.now(), name: 'New Choice Item', imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80' });
                              list[tIdx] = { ...list[tIdx], items };
                              return { ...curr, dealTiers: list };
                            });
                          }}
                          className="text-[10px] font-bold text-[#016839] hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Choice Item
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(tier.items || []).map((itm, iIdx) => (
                          <div key={itm.id || iIdx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-slate-200">
                            <input
                              type="text"
                              value={itm.name ?? ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateSubpage((curr) => {
                                  const list = [...(curr.dealTiers || [])];
                                  const items = [...(list[tIdx].items || [])];
                                  items[iIdx] = { ...items[iIdx], name: val };
                                  list[tIdx] = { ...list[tIdx], items };
                                  return { ...curr, dealTiers: list };
                                });
                              }}
                              placeholder="Item Name"
                              className="flex-1 text-xs font-bold border-0 focus:ring-0 px-1"
                            />
                            <input
                              type="text"
                              value={itm.imageUrl ?? ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                updateSubpage((curr) => {
                                  const list = [...(curr.dealTiers || [])];
                                  const items = [...(list[tIdx].items || [])];
                                  items[iIdx] = { ...items[iIdx], imageUrl: val };
                                  list[tIdx] = { ...list[tIdx], items };
                                  return { ...curr, dealTiers: list };
                                });
                              }}
                              placeholder="Image URL"
                              className="flex-1 text-[10px] text-slate-500 border border-slate-100 rounded px-1.5 py-0.5"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                updateSubpage((curr) => {
                                  const list = [...(curr.dealTiers || [])];
                                  list[tIdx] = {
                                    ...list[tIdx],
                                    items: (list[tIdx].items || []).filter((_, idx2) => idx2 !== iIdx),
                                  };
                                  return { ...curr, dealTiers: list };
                                });
                              }}
                              className="text-rose-500 hover:text-rose-700 p-1"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUBPAGE 3: EASY PAY SPECIFIC SECTIONS */}
          {/* ================================================================= */}
          {activeSubpageKey === 'easyPay' && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#016839]" /> "What is Easy Pay" Bullet Points
                </h4>
                <div className="space-y-3">
                  {(currentSubpage.whatIs?.points || []).map((pt, ptIdx) => (
                    <div key={ptIdx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      <input
                        type="text"
                        value={pt.heading ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const pts = [...(curr.whatIs?.points || [])];
                            pts[ptIdx] = { ...pts[ptIdx], heading: val };
                            return { ...curr, whatIs: { ...(curr.whatIs || {}), points: pts } };
                          });
                        }}
                        placeholder="Bullet Heading"
                        className="w-full text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <textarea
                        rows={2}
                        value={pt.description ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const pts = [...(curr.whatIs?.points || [])];
                            pts[ptIdx] = { ...pts[ptIdx], description: val };
                            return { ...curr, whatIs: { ...(curr.whatIs || {}), points: pts } };
                          });
                        }}
                        placeholder="Bullet Description"
                        className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#016839]" /> How To Easily Sign Up (3 Steps)
                </h4>
                <div className="space-y-3">
                  {(currentSubpage.steps || []).map((st, sIdx) => (
                    <div key={sIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-0.5 rounded bg-[#016839] text-white text-[10px] font-bold">
                          Step {sIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={st.title ?? ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateSubpage((curr) => {
                              const steps = [...(curr.steps || [])];
                              steps[sIdx] = { ...steps[sIdx], title: val };
                              return { ...curr, steps };
                            });
                          }}
                          className="flex-1 text-xs font-bold px-3 py-1 rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={st.description ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const steps = [...(curr.steps || [])];
                            steps[sIdx] = { ...steps[sIdx], description: val };
                            return { ...curr, steps };
                          });
                        }}
                        className="w-full text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUBPAGE 4: BUSINESS FLEET SPECIFIC SECTIONS */}
          {/* ================================================================= */}
          {activeSubpageKey === 'businessFleet' && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <label className="text-xs font-bold text-slate-700">Offer Ribbon Callout Text</label>
                <input
                  type="text"
                  value={currentSubpage.offerRibbon ?? ''}
                  onChange={(e) => updateSubpage({ offerRibbon: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              {/* 3 Fleet Solutions */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#016839]" /> Three Fleet Solutions (Fleet Card, Universal, Digital+)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(currentSubpage.fleetSolutions || []).map((sol, solIdx) => (
                    <div key={sol.id || solIdx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                      <input
                        type="text"
                        value={sol.title ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const list = [...(curr.fleetSolutions || [])];
                            list[solIdx] = { ...list[solIdx], title: val };
                            return { ...curr, fleetSolutions: list };
                          });
                        }}
                        placeholder="Solution Title"
                        className="w-full text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <input
                        type="text"
                        value={sol.priceText ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateSubpage((curr) => {
                            const list = [...(curr.fleetSolutions || [])];
                            list[solIdx] = { ...list[solIdx], priceText: val };
                            return { ...curr, fleetSolutions: list };
                          });
                        }}
                        placeholder="Price tag e.g. No monthly card fees"
                        className="w-full text-xs text-[#016839] font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                      />
                      <textarea
                        rows={4}
                        value={(sol.benefits || []).join('\n')}
                        onChange={(e) => {
                          const val = e.target.value.split('\n').filter(Boolean);
                          updateSubpage((curr) => {
                            const list = [...(curr.fleetSolutions || [])];
                            list[solIdx] = { ...list[solIdx], benefits: val };
                            return { ...curr, fleetSolutions: list };
                          });
                        }}
                        placeholder="Benefits (one per line)"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* SUBPAGE 5: QUALITY GUARANTEED SPECIFIC SECTIONS */}
          {/* ================================================================= */}
          {activeSubpageKey === 'qualityGuaranteed' && (
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#016839]" /> Commitment Paragraphs
                </h4>
                <div className="space-y-3">
                  <textarea
                    rows={3}
                    value={currentSubpage.commitment?.p1 ?? ''}
                    onChange={(e) =>
                      updateSubpage((curr) => ({
                        ...curr,
                        commitment: { ...(curr.commitment || {}), p1: e.target.value },
                      }))
                    }
                    placeholder="Paragraph 1 on EPA standards..."
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 leading-relaxed"
                  />
                  <textarea
                    rows={3}
                    value={currentSubpage.commitment?.p2 ?? ''}
                    onChange={(e) =>
                      updateSubpage((curr) => ({
                        ...curr,
                        commitment: { ...(curr.commitment || {}), p2: e.target.value },
                      }))
                    }
                    placeholder="Paragraph 2 on fuel guarantee resolution..."
                    className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 leading-relaxed"
                  />
                </div>
              </div>

              {/* 3 Steps */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#016839]" /> Problem Resolution 3 Steps & Phone Callout
                </h4>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Support Phone Number</label>
                  <input
                    type="text"
                    value={currentSubpage.problemSteps?.supportPhone ?? ''}
                    onChange={(e) =>
                      updateSubpage((curr) => ({
                        ...curr,
                        problemSteps: { ...(curr.problemSteps || {}), supportPhone: e.target.value },
                      }))
                    }
                    className="w-full text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HUB HERO & INTRO */}
      {/* ========================================================================= */}
      {activeMainTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Hub Hero Banner & Intro Message</h3>
            <p className="text-xs text-slate-500">Customize the top section of /our-products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Hero Main Title</label>
              <input
                type="text"
                value={formData.hub.hero.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, title: e.target.value },
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Circular Stamp Text</label>
              <input
                type="text"
                value={formData.hub.hero.badgeText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      hero: { ...prev.hub.hero, badgeText: e.target.value },
                    },
                  }))
                }
                placeholder="OUR PRODUCTS"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold uppercase focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700">Intro Section Main Heading</label>
              <textarea
                rows={2}
                value={formData.hub.intro.headline ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      intro: { ...prev.hub.intro, headline: e.target.value },
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Intro Section Body Copy</label>
              <textarea
                rows={4}
                value={formData.hub.intro.body ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hub: {
                      ...prev.hub,
                      intro: { ...prev.hub.intro, body: e.target.value },
                    },
                  }))
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: FEATURE ACTION CARDS */}
      {/* ========================================================================= */}
      {activeMainTab === 'cards' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Product Feature Action Cards ({formData.hub.actionCards.length} Active)
              </h3>
              <p className="text-xs text-slate-500">
                The 5 feature cards (Thirst Stop, Fresh Food, Easy Pay, Fleet Card, Quality Guaranteed).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {formData.hub.actionCards.map((card, idx) => (
              <div key={card.id || idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#016839] text-white font-black text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{card.title.replace('\n', ' ')}</h4>
                    <span className="text-[10px] text-slate-500">{card.linkUrl}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#e8f7ee] text-[#016839] px-2.5 py-1 rounded-full uppercase">
                  {card.badge || 'Product'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
