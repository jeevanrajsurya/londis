import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import { getAssetUrl } from '../api/axios';
import {
  Save,
  RotateCcw,
  Layout,
  Layers,
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
  Info,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_ABOUT_CMS = {
  hero: {
    title: 'Ready. Set.\nGO GO GO.',
    subtitle:
      'There’s GO in everything you do. From 1,000-mile road trips and spontaneous adventures to conquering mundane errands and tackling grocery runs. S&B Forecourt isn’t just about getting you from point A to point B; we are here to fuel all the ways you GO GO GO.',
    bgMediaUrl:
      'https://phillips66.widen.net/content/xsr9lule9m/jpeg/2019_CO_About_Hero_1280x750_DT.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
    bgMediaType: 'image',
    textColor: 'white',
    overlayStyle: 'gradient',
  },
  actionSection: {
    enabled: true,
    title: 'GO Where the Action Is',
    subtitle:
      'Scream from the stands. Paint your face with spirit. Race for the checkered flag.\nWe sponsor teams, schools and events that inspire you to GO GO GO.',
    bannerImageUrl: '/uploads/conoco-sponsors-trimmed.png',
    sponsorLogos: [
      {
        id: '1',
        name: 'Regional Athletic Partners',
        logoUrl:
          'https://phillips66.widen.net/content/1xpc0vqsj3/png/PHICO_Sponsors_DT_1280x750_02%5B50%5D.png?crop=false&position=c&u=pqrmwb&w=1280&h=700',
      },
    ],
  },
  splitCards: [
    {
      id: 'split-1',
      title: 'A Century of Adventuring',
      description:
        'From the early days of Conoco Travel Bureau to today’s modern stations, Conoco has been a source of inspiration and adventure for America’s drivers.',
      imageUrl:
        'https://phillips66.widen.net/content/hmkhdoujrv/jpeg/2019_CO_About_History_1280x750_DT.jpeg?keep=c&crop=yes&color=ffffffff&quality=54&u=mw5qdv',
      imagePosition: 'right',
      buttonText: '',
      buttonLink: '',
    },
    {
      id: 'split-2',
      title: 'Locations Nationwide',
      description:
        'Find a station near you for fuel, convenience and the essentials that keep you GOing.',
      imageUrl:
        'https://phillips66.widen.net/content/wxzmm1lc5n/jpeg/20201113_P66_0170_ED.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
      imagePosition: 'left',
      buttonText: 'Find a station',
      buttonLink: '/contact',
    },
  ],
};

export default function AboutPageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSubtab, setActiveSubtab] = useState('hero');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingAction, setUploadingAction] = useState(false);
  const [uploadingCardId, setUploadingCardId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_ABOUT_CMS);

  // Fetch CMS data from backend
  const { data, isLoading } = useQuery({
    queryKey: ['cms-about-page'],
    queryFn: () => getSettingByKey('about_page_cms'),
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (data?.value) {
      setFormData({
        hero: {
          ...DEFAULT_ABOUT_CMS.hero,
          ...(data.value.hero || {}),
        },
        actionSection: {
          ...DEFAULT_ABOUT_CMS.actionSection,
          ...(data.value.actionSection || {}),
        },
        splitCards: Array.isArray(data.value.splitCards)
          ? data.value.splitCards
          : DEFAULT_ABOUT_CMS.splitCards,
      });
    }
  }, [data]);

  // Save Mutation
  const saveMutation = useMutation({
    mutationFn: (updatedData) => updateSetting('about_page_cms', updatedData),
    onSuccess: (savedResult) => {
      queryClient.invalidateQueries({ queryKey: ['cms-about-page'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      if (savedResult?.setting?.value) {
        setFormData((prev) => ({ ...prev, ...savedResult.setting.value }));
      }
      toast.success('About Us Page CMS updated successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update About Page CMS');
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleReset = () => {
    if (window.confirm('Reset all About Us page content to default settings?')) {
      setFormData(DEFAULT_ABOUT_CMS);
      toast.info('Reset to defaults. Click "Save Changes" to apply.');
    }
  };

  // Hero Media Upload
  const handleHeroMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingHero(true);
      const res = await uploadImage(file);
      const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          bgMediaUrl: res.url,
          bgMediaType: isVid ? 'video' : 'image',
          textColor: prev.hero.textColor || 'white',
        },
      }));
      toast.success(isVid ? 'Hero video uploaded!' : 'Hero image uploaded!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Hero media upload failed');
    } finally {
      setUploadingHero(false);
      e.target.value = '';
    }
  };

  // Action Banner Upload
  const handleActionBannerUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAction(true);
      const res = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        actionSection: {
          ...prev.actionSection,
          bannerImageUrl: res.url,
        },
      }));
      toast.success('Community banner uploaded!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Banner upload failed');
    } finally {
      setUploadingAction(false);
      e.target.value = '';
    }
  };

  // Split Card Image Upload
  const handleCardImageUpload = async (cardId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCardId(cardId);
      const res = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        splitCards: prev.splitCards.map((card) =>
          card.id === cardId ? { ...card, imageUrl: res.url } : card
        ),
      }));
      toast.success('Split card image uploaded!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Card image upload failed');
    } finally {
      setUploadingCardId(null);
      e.target.value = '';
    }
  };

  // Split Cards CRUD
  const handleAddSplitCard = () => {
    const newCard = {
      id: `split-${Date.now()}`,
      title: 'New Story / Milestone Title',
      description:
        'Share your forecourt story, community mission, or state-of-the-art facility features with visitors.',
      imageUrl:
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
      imagePosition: formData.splitCards.length % 2 === 0 ? 'right' : 'left',
      buttonText: 'Learn more',
      buttonLink: '/contact',
    };
    setFormData((prev) => ({
      ...prev,
      splitCards: [...prev.splitCards, newCard],
    }));
    toast.success('New split card added!');
  };

  const handleDeleteSplitCard = (cardId) => {
    if (window.confirm('Delete this feature split card?')) {
      setFormData((prev) => ({
        ...prev,
        splitCards: prev.splitCards.filter((c) => c.id !== cardId),
      }));
      toast.success('Split card removed');
    }
  };

  const handleUpdateSplitCard = (cardId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      splitCards: prev.splitCards.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      ),
    }));
  };

  const handleMoveSplitCard = (index, direction) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= formData.splitCards.length) return;
    const cards = [...formData.splitCards];
    const temp = cards[index];
    cards[index] = cards[targetIdx];
    cards[targetIdx] = temp;
    setFormData((prev) => ({ ...prev, splitCards: cards }));
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-[#016839] mx-auto mb-3" />
        <p className="text-sm font-bold text-slate-700">Loading About Page CMS...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#016839]" />
            <h2 className="text-xl font-bold text-slate-900">About Us Page CMS</h2>
            <span className="text-[10px] font-bold bg-[#e8f7ee] text-[#016839] border border-[#016839]/30 px-2 py-0.5 rounded-full uppercase">
              Conoco Style
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Replicates Conoco’s clean aesthetic with your S&amp;B Retail Forest Green (`#016839`) palette. Add, edit, or remove hero media, community banners, and split feature cards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'hero', label: '1. Hero & Big Banner', icon: Layout },
          { id: 'action', label: '2. Community & Sponsors', icon: Sparkles },
          { id: 'splitcards', label: `3. Split Feature Cards (${formData.splitCards.length})`, icon: Layers },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubtab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubtab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: HERO & HEADER */}
      {/* ========================================================================= */}
      {activeSubtab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Hero Header Configuration</h3>
            <p className="text-xs text-slate-500">
              The high-impact top banner of the About Us page (`max-w-[1448px]`, `rounded-[24px]`).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">
                Main Heading (Heading 1) - Use Newline for Two-Line Impact
              </label>
              <textarea
                rows={2}
                value={formData.hero.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }))
                }
                placeholder="Ready. Set.&#10;GO GO GO."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none font-bold font-mono"
              />
              <p className="text-[11px] text-slate-400">
                Tip: Press Enter to put &quot;GO GO GO.&quot; on the second line with emphasis.
              </p>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Subtitle / Brand Description</label>
              <textarea
                rows={3}
                value={formData.hero.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }))
                }
                placeholder="There’s GO in everything you do..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            {/* Background Media */}
            <div className="md:col-span-2 space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#016839]" />
                    Hero Background Media (Image or Video)
                  </label>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upload an image (JPG, PNG, WebP) or video (MP4, WebM), or paste any URL. Leave blank for a clean solid white card.
                  </p>
                </div>
                {formData.hero.bgMediaUrl && (
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, bgMediaUrl: '', bgMediaType: 'auto' },
                      }))
                    }
                    className="px-2.5 py-1 text-[11px] font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Clear Media
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={formData.hero.bgMediaUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const isVid = /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(val);
                      setFormData((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          bgMediaUrl: val,
                          bgMediaType: isVid ? 'video' : 'image',
                        },
                      }));
                    }}
                    placeholder="Enter image/video URL (or click Upload Media)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    className={`w-full h-[38px] px-4 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      uploadingHero
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-[#e8f7ee] text-[#016839] border-[#016839]/40 hover:border-[#016839]'
                    }`}
                  >
                    {uploadingHero ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Upload Image / Video
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*,video/mp4,video/webm,video/ogg,video/quicktime"
                      onChange={handleHeroMediaUpload}
                      disabled={uploadingHero}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Text Color & Overlay Style */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Hero Text Color:</span>
                  <div className="flex items-center gap-3 text-xs">
                    {[
                      { id: 'white', label: 'White (#FFFFFF) (Recommended for Media)' },
                      { id: 'dark', label: 'Dark (#161616)' },
                    ].map((opt) => (
                      <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="heroTextColor"
                          value={opt.id}
                          checked={
                            (formData.hero.textColor || (formData.hero.bgMediaUrl ? 'white' : 'dark')) ===
                            opt.id
                          }
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, textColor: e.target.value },
                            }))
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Background Gradient Tint:</span>
                  <div className="flex items-center gap-3 text-xs">
                    {[
                      { id: 'gradient', label: 'Soft Gradient (Conoco Style)' },
                      { id: 'none', label: 'None (100% Brightness)' },
                      { id: 'dark', label: 'Dark Tint' },
                    ].map((tint) => (
                      <label key={tint.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="heroOverlayStyle"
                          value={tint.id}
                          checked={(formData.hero.overlayStyle || 'gradient') === tint.id}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, overlayStyle: e.target.value },
                            }))
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span>{tint.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Hero Live Preview
            </span>
            <div className="relative bg-[#161616] rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm overflow-hidden min-h-[220px] flex items-center">
              {formData.hero.bgMediaUrl && (
                <>
                  {formData.hero.bgMediaType === 'video' ||
                  /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(formData.hero.bgMediaUrl) ? (
                    <video
                      src={getAssetUrl(formData.hero.bgMediaUrl)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  ) : (
                    <img
                      src={getAssetUrl(formData.hero.bgMediaUrl)}
                      alt="Hero preview"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  )}
                  {formData.hero.overlayStyle === 'gradient' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-[1] pointer-events-none" />
                  )}
                  {formData.hero.overlayStyle === 'dark' && (
                    <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
                  )}
                </>
              )}

              {(() => {
                const isWhite =
                  formData.hero.textColor === 'white' ||
                  (formData.hero.bgMediaUrl && formData.hero.textColor !== 'dark');
                return (
                  <div
                    className={`relative z-10 space-y-3 max-w-xl text-left ${
                      isWhite ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    <h1
                      className={`text-3xl sm:text-4xl font-black leading-tight tracking-tight whitespace-pre-line ${
                        isWhite ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]' : 'text-slate-900'
                      }`}
                    >
                      {formData.hero.title || 'Ready. Set.\nGO GO GO.'}
                    </h1>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isWhite
                          ? 'text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]'
                          : 'text-slate-700'
                      }`}
                    >
                      {formData.hero.subtitle}
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: COMMUNITY & SPONSORS BANNER */}
      {/* ========================================================================= */}
      {activeSubtab === 'action' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Community &amp; Sponsors Section</h3>
              <p className="text-xs text-slate-500">
                The centered section (&quot;GO Where the Action Is&quot;) highlighting athletic teams, sponsorships, or community initiatives.
              </p>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-bold text-slate-600">Show Section:</span>
              <input
                type="checkbox"
                checked={formData.actionSection.enabled !== false}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    actionSection: {
                      ...prev.actionSection,
                      enabled: e.target.checked,
                    },
                  }))
                }
                className="w-4 h-4 text-[#016839] rounded focus:ring-[#016839] accent-[#016839]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Section Headline</label>
              <input
                type="text"
                value={formData.actionSection.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    actionSection: { ...prev.actionSection, title: e.target.value },
                  }))
                }
                placeholder="GO Where the Action Is"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none font-bold"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Section Subtitle / Description</label>
              <textarea
                rows={3}
                value={formData.actionSection.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    actionSection: { ...prev.actionSection, subtitle: e.target.value },
                  }))
                }
                placeholder="Scream from the stands. Paint your face with spirit..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            {/* Banner Image / Logos Strip */}
            <div className="md:col-span-2 space-y-3 pt-3 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#016839]" />
                Sponsors / Community Logos Banner Image
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={formData.actionSection.bannerImageUrl || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        actionSection: { ...prev.actionSection, bannerImageUrl: e.target.value },
                      }))
                    }
                    placeholder="Enter image URL for sponsor logos strip..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    className={`w-full h-[38px] px-4 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      uploadingAction
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white hover:bg-[#e8f7ee] text-[#016839] border-[#016839]/40 hover:border-[#016839]'
                    }`}
                  >
                    {uploadingAction ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" /> Upload Sponsor Strip
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleActionBannerUpload}
                      disabled={uploadingAction}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section Live Preview */}
          <div className="bg-[#ebebef] border border-slate-300/80 rounded-2xl p-8 text-center shadow-inner">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-4">
              Community Section Live Preview (On Page Background #ebebef)
            </span>
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {formData.actionSection.title || 'GO Where the Action Is'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {formData.actionSection.subtitle}
              </p>
              {formData.actionSection.bannerImageUrl && (
                <div className="pt-4 flex justify-center">
                  <img
                    src={getAssetUrl(formData.actionSection.bannerImageUrl)}
                    alt="Sponsors preview"
                    className="max-h-24 object-contain mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: FEATURE SPLIT CARDS */}
      {/* ========================================================================= */}
      {activeSubtab === 'splitcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Split Feature Cards ({formData.splitCards.length} Active)
              </h3>
              <p className="text-xs text-slate-500">
                Alternating 50/50 split cards (e.g. &quot;A Century of Adventuring&quot; and &quot;Locations Nationwide&quot;). Add or delete cards anytime without breaking the layout.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddSplitCard}
              className="px-4 py-2.5 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Split Card
            </button>
          </div>

          {/* Cards List */}
          <div className="space-y-6">
            {formData.splitCards.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center space-y-3">
                <Layers className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No Split Cards Yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the &ldquo;Add Split Card&rdquo; button above to create a new 50/50 story card.
                </p>
                <button
                  type="button"
                  onClick={handleAddSplitCard}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#016839] bg-[#e8f7ee] hover:bg-[#d5eedf] rounded-xl transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Create First Split Card
                </button>
              </div>
            ) : (
              formData.splitCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
                >
                {/* Card Header Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#e8f7ee] text-[#016839] font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="font-black text-slate-900 text-sm">
                      {card.title || 'Untitled Split Card'}
                    </h4>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">
                      {card.imagePosition === 'left' ? 'Image Left' : 'Image Right'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveSplitCard(idx, -1)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.splitCards.length - 1}
                      onClick={() => handleMoveSplitCard(idx, 1)}
                      className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSplitCard(card.id)}
                      className="p-1.5 text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors ml-2"
                      title="Delete Card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Card Heading</label>
                    <input
                      type="text"
                      value={card.title ?? ''}
                      onChange={(e) => handleUpdateSplitCard(card.id, 'title', e.target.value)}
                      placeholder="e.g. A Century of Adventuring"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Image Alignment</label>
                    <div className="flex items-center gap-4 pt-1 text-xs">
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name={`imgPos-${card.id}`}
                          value="right"
                          checked={card.imagePosition === 'right' || !card.imagePosition}
                          onChange={(e) =>
                            handleUpdateSplitCard(card.id, 'imagePosition', e.target.value)
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span>Image on Right (Content Left)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name={`imgPos-${card.id}`}
                          value="left"
                          checked={card.imagePosition === 'left'}
                          onChange={(e) =>
                            handleUpdateSplitCard(card.id, 'imagePosition', e.target.value)
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span>Image on Left (Content Right)</span>
                      </label>
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Body Description</label>
                    <textarea
                      rows={3}
                      value={card.description ?? ''}
                      onChange={(e) =>
                        handleUpdateSplitCard(card.id, 'description', e.target.value)
                      }
                      placeholder="From the early days of..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Card Image Upload & URL */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-700">Card Photo Image</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          value={card.imageUrl || ''}
                          onChange={(e) =>
                            handleUpdateSplitCard(card.id, 'imageUrl', e.target.value)
                          }
                          placeholder="Enter image URL or click upload..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          className={`w-full h-[38px] px-4 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                            uploadingCardId === card.id
                              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                              : 'bg-white hover:bg-[#e8f7ee] text-[#016839] border-[#016839]/40 hover:border-[#016839]'
                          }`}
                        >
                          {uploadingCardId === card.id ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" /> Upload Image
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCardImageUpload(card.id, e)}
                            disabled={uploadingCardId === card.id}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Optional CTA Button */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      CTA Button Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={card.buttonText ?? ''}
                      onChange={(e) =>
                        handleUpdateSplitCard(card.id, 'buttonText', e.target.value)
                      }
                      placeholder="e.g. Find a station (leave blank for no button)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      CTA Button Link Target
                    </label>
                    <input
                      type="text"
                      value={card.buttonLink ?? ''}
                      onChange={(e) =>
                        handleUpdateSplitCard(card.id, 'buttonLink', e.target.value)
                      }
                      placeholder="e.g. /contact or /fuel-services"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Card Mini Live Preview */}
                <div className="bg-[#ebebef] p-5 rounded-2xl border border-slate-300/80 mt-3 shadow-inner">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-3">
                    Card Preview ({card.imagePosition === 'left' ? 'Image Left' : 'Image Right'} on Page Background #ebebef)
                  </span>
                  <div
                    className={`flex flex-col sm:flex-row items-center gap-6 ${
                      card.imagePosition === 'left' ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    <div className="w-full sm:w-52 h-36 rounded-2xl overflow-hidden bg-slate-300/60 shrink-0 shadow-sm">
                      {card.imageUrl ? (
                        <img
                          src={getAssetUrl(card.imageUrl)}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <ImageIcon className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 text-left">
                      <h5 className="font-bold text-slate-900 text-base">
                        {card.title || 'Split Card Heading'}
                      </h5>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {card.description}
                      </p>
                      {card.buttonText && card.buttonText.trim() && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#016839] px-3.5 py-1.5 rounded-full mt-2">
                          {card.buttonText} <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </div>
      )}
    </div>
  );
}
