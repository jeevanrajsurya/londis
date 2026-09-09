import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getSettingByKey, updateSetting } from '../api/settings';
import { uploadImage } from '../api/upload';
import { getAssetUrl } from '../api/axios';
import {
  Mail,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Phone,
  ExternalLink,
  HelpCircle,
  Layout,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Layers,
  Sparkles,
  Upload,
  Video,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const DEFAULT_CONTACT_CMS = {
  hero: {
    title: 'Contact Us',
    subtitle: "Your car knows and we'd like to know too. Drop us a line below.",
    bgMediaUrl: '',
    bgMediaType: 'auto',
    textColor: 'dark',
    overlayStyle: 'none',
  },
  topics: [
    'Personnel & service',
    'Station facility & equipment',
    'ADA related',
    'Fuel quality',
    'Credit card & Fuel cards',
    'Kickback & Forecourt points',
    'Our Products & Offers',
    'Pricing',
    'Mobile App',
    'Visitor Feedback Survey',
    'Other',
  ],
  twoColumnCards: [
    {
      id: 'card-1',
      title: 'Conoco® Credit Card Inquiries.',
      description: 'For questions regarding Conoco® personal credit cards, please call: 1-855-513-1176.',
      phone: '1-855-513-1176',
      imageUrl:
        'https://phillips66.widen.net/content/inihlwr22p/jpeg/P66-1129-Credit-Card-Navigation_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
      buttonText: 'Learn more',
      buttonLink: '/fleet',
    },
    {
      id: 'card-2',
      title: 'KickBack® Rewards Inquiries',
      description:
        'Get rewarded for every mile. Earn points on top of savings with a KickBack® Rewards Card.',
      phone: '',
      imageUrl:
        'https://phillips66.widen.net/content/nacz2a8eto/jpeg/P66-1129%20Kickback%20Tile_654x480.jpeg?position=c&color=ffffffff&quality=100&u=pqrmwb',
      buttonText: 'Kickback® email form',
      buttonLink: 'https://kickbackpoints.com/contact-us/',
    },
  ],
  bentoCards: [
    {
      id: 'bento-1',
      title: 'Customer service department',
      lines: [
        'Available Monday – Friday',
        '8 a.m.-5 p.m. Central Time',
        '1-800-527-5476',
      ],
      phone: '1-800-527-5476',
      linkText: '',
      linkUrl: '',
    },
    {
      id: 'bento-2',
      title: 'Mailing address',
      lines: [
        'Consumer Services Department',
        'P.O. Box 7200',
        'Bartlesville, OK 74005',
      ],
      phone: '',
      linkText: '',
      linkUrl: '',
    },
    {
      id: 'bento-3',
      title: 'Interested in growing with us?',
      lines: [
        'To find out information on how you can become a marketer or reseller, check out our Conoco® Fuel Supplier Website.',
      ],
      phone: '',
      linkText: 'Conoco® Fuel Supplier Website.',
      linkUrl: 'http://www.phillips66fuelsupplier.com/',
    },
  ],
  formSettings: {
    optInText:
      'Sign up for email updates from Phillips 66® and a chance to win $500 in promo items and fuel cards each quarter.',
    disclaimerText:
      'By clicking the SUBMIT button you agree to the Privacy Statement and Terms & Conditions.',
  },
};

export default function ContactPageCmsTab() {
  const queryClient = useQueryClient();
  const [activeSubtab, setActiveSubtab] = useState('hero');
  const [formData, setFormData] = useState(DEFAULT_CONTACT_CMS);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cms-contact-page'],
    queryFn: () => getSettingByKey('contact_page_cms'),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data?.value) {
      setFormData({
        hero: {
          title: data.value.hero?.title !== undefined ? data.value.hero.title : DEFAULT_CONTACT_CMS.hero.title,
          subtitle: data.value.hero?.subtitle !== undefined ? data.value.hero.subtitle : DEFAULT_CONTACT_CMS.hero.subtitle,
          bgMediaUrl: data.value.hero?.bgMediaUrl || '',
          bgMediaType: data.value.hero?.bgMediaType || 'auto',
          textColor: data.value.hero?.textColor || 'dark',
          overlayStyle: data.value.hero?.overlayStyle || 'none',
        },
        topics: data.value.topics || DEFAULT_CONTACT_CMS.topics,
        twoColumnCards: data.value.twoColumnCards || DEFAULT_CONTACT_CMS.twoColumnCards,
        bentoCards: data.value.bentoCards || DEFAULT_CONTACT_CMS.bentoCards,
        formSettings: {
          ...DEFAULT_CONTACT_CMS.formSettings,
          ...data.value.formSettings,
        },
      });
    }
  }, [data]);

  const handleMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingMedia(true);
      const res = await uploadImage(file);
      const isVid = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          bgMediaUrl: res.url,
          bgMediaType: isVid ? 'video' : 'image',
        },
      }));
      toast.success(isVid ? 'Hero video uploaded!' : 'Hero image uploaded!');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Media upload failed');
    } finally {
      setUploadingMedia(false);
      e.target.value = '';
    }
  };

  const saveMutation = useMutation({
    mutationFn: (updatedData) => updateSetting('contact_page_cms', updatedData),
    onSuccess: (savedResult) => {
      queryClient.invalidateQueries({ queryKey: ['cms-contact-page'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      if (savedResult?.setting?.value) {
        setFormData((prev) => ({ ...prev, ...savedResult.setting.value }));
      }
      toast.success('Contact Page CMS updated successfully!');
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Failed to update Contact Page CMS');
    },
  });

  const handleSave = () => {
    saveMutation.mutate(formData);
  };

  const handleReset = () => {
    if (window.confirm('Reset all Contact page content to defaults?')) {
      setFormData(DEFAULT_CONTACT_CMS);
      toast.info('Reset to default content. Click "Save Changes" to apply.');
    }
  };

  // Topics management
  const handleAddTopic = () => {
    if (!newTopicInput.trim()) return;
    if (formData.topics.includes(newTopicInput.trim())) {
      toast.error('Topic already exists');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, newTopicInput.trim()],
    }));
    setNewTopicInput('');
    toast.success('Topic added');
  };

  const handleDeleteTopic = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, idx) => idx !== indexToDelete),
    }));
  };

  const handleTopicChange = (index, value) => {
    const updated = [...formData.topics];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, topics: updated }));
  };

  // Two-Column Cards management
  const handleAddTwoColCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: 'New Feature Card Title',
      description: 'Enter your card description here...',
      phone: '',
      imageUrl:
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
      buttonText: 'Learn more',
      buttonLink: '/contact',
    };
    setFormData((prev) => ({
      ...prev,
      twoColumnCards: [...prev.twoColumnCards, newCard],
    }));
  };

  const handleDeleteTwoColCard = (cardId) => {
    setFormData((prev) => ({
      ...prev,
      twoColumnCards: prev.twoColumnCards.filter((c) => c.id !== cardId),
    }));
  };

  const handleTwoColCardChange = (index, field, value) => {
    const updated = [...formData.twoColumnCards];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, twoColumnCards: updated }));
  };

  // Bento Cards management
  const handleAddBentoCard = () => {
    const newBento = {
      id: `bento-${Date.now()}`,
      title: 'New Bento Information Card',
      lines: ['Detail line 1', 'Detail line 2'],
      phone: '',
      linkText: 'Learn more',
      linkUrl: '/contact',
    };
    setFormData((prev) => ({
      ...prev,
      bentoCards: [...prev.bentoCards, newBento],
    }));
  };

  const handleDeleteBentoCard = (cardId) => {
    setFormData((prev) => ({
      ...prev,
      bentoCards: prev.bentoCards.filter((b) => b.id !== cardId),
    }));
  };

  const handleBentoCardChange = (index, field, value) => {
    const updated = [...formData.bentoCards];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, bentoCards: updated }));
  };

  const handleBentoLinesChange = (index, textValue) => {
    const lines = textValue.split('\n');
    handleBentoCardChange(index, 'lines', lines);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#016839]" />
            <h2 className="text-xl font-bold text-slate-900">Contact Us Page CMS</h2>
            <span className="text-[10px] font-bold bg-[#e8f7ee] text-[#016839] border border-[#016839]/30 px-2 py-0.5 rounded-full uppercase">
              Live Sync
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Replicates the Conoco page layout with your Londis Forest Green &amp; Eco-Lime theme. Edit hero texts, inquiry topics, feature cards, and bento blocks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5"
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
          { id: 'hero', label: '1. Hero & Header', icon: Layout },
          { id: 'topics', label: '2. Inquiry Topics Dropdown', icon: HelpCircle },
          { id: 'twocolumn', label: '3. Two-Column Feature Cards', icon: Layers },
          { id: 'bento', label: '4. Bento 3-Column Info Cards', icon: Sparkles },
          { id: 'form', label: '5. Form Texts & Disclaimer', icon: CheckCircle2 },
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

      {/* Subtab 1: Hero & Header */}
      {activeSubtab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Hero Header Configuration</h3>
            <p className="text-xs text-slate-500">
              The top header block of the Contact Us page. Leave background media blank for a clean solid white card.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700">Main Title (Heading 1)</label>
              <input
                type="text"
                value={formData.hero.title ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value },
                  }))
                }
                placeholder="Contact Us"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none font-bold"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Subtitle / Tagline</label>
              <textarea
                rows={2}
                value={formData.hero.subtitle ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value },
                  }))
                }
                placeholder="Your car knows and we'd like to know too. Drop us a line below."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            {/* Background Image / Video Section */}
            <div className="md:col-span-2 space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-[#016839]" />
                    Hero Background Media (Image or Video)
                  </label>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upload or paste an image (JPG, PNG, WebP) or video (MP4, WebM). <strong className="text-slate-700">Leave blank for a clean solid white card (no fallback).</strong>
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
                    <X className="w-3 h-3" /> Clear Media (Make Blank)
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
                  <label className={`w-full h-[38px] px-4 rounded-xl border border-dashed text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    uploadingMedia
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'bg-white hover:bg-[#e8f7ee] text-[#016839] border-[#016839]/40 hover:border-[#016839]'
                  }`}>
                    {uploadingMedia ? (
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
                      onChange={handleMediaUpload}
                      disabled={uploadingMedia}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Media Type, Text Color, and Tint selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Media Type:</span>
                  <div className="flex items-center gap-3 text-xs">
                    {['auto', 'image', 'video'].map((type) => (
                      <label key={type} className="flex items-center gap-1.5 cursor-pointer text-slate-700 capitalize">
                        <input
                          type="radio"
                          name="bgMediaType"
                          value={type}
                          checked={(formData.hero.bgMediaType || 'auto') === type}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              hero: { ...prev.hero, bgMediaType: e.target.value },
                            }))
                          }
                          className="text-[#016839] focus:ring-[#016839] accent-[#016839]"
                        />
                        <span>{type === 'auto' ? 'Auto-Detect' : type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Hero Text Color:</span>
                  <div className="flex items-center gap-3 text-xs">
                    {[
                      { id: 'white', label: 'White (#FFFFFF)' },
                      { id: 'dark', label: 'Dark (#161616)' },
                    ].map((opt) => (
                      <label key={opt.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="heroTextColor"
                          value={opt.id}
                          checked={(formData.hero.textColor || (formData.hero.bgMediaUrl ? 'white' : 'dark')) === opt.id}
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

                <div className="sm:col-span-2 space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">Background Tint / Brightness:</span>
                  <div className="flex items-center gap-4 text-xs">
                    {[
                      { id: 'none', label: 'None (100% Full Brightness - No Overlay)' },
                      { id: 'light', label: 'Soft Light Tint' },
                      { id: 'dark', label: 'Soft Dark Tint' },
                    ].map((tint) => (
                      <label key={tint.id} className="flex items-center gap-1.5 cursor-pointer text-slate-700">
                        <input
                          type="radio"
                          name="heroOverlayStyle"
                          value={tint.id}
                          checked={(formData.hero.overlayStyle || 'none') === tint.id}
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

              {/* Media Preview if provided */}
              {formData.hero.bgMediaUrl && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 mt-2">
                  {(formData.hero.bgMediaType === 'video' || /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(formData.hero.bgMediaUrl)) ? (
                    <video
                      src={getAssetUrl(formData.hero.bgMediaUrl)}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={getAssetUrl(formData.hero.bgMediaUrl)}
                      alt="Hero background preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/60 text-white backdrop-blur-sm">
                    {(formData.hero.bgMediaType === 'video' || /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(formData.hero.bgMediaUrl)) ? 'Video' : 'Image'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Preview Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Live Preview
            </span>
            <div className="relative bg-[#161616] rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-sm overflow-hidden min-h-[220px] flex items-center">
              {formData.hero.bgMediaUrl ? (
                <>
                  {(formData.hero.bgMediaType === 'video' || /\.(mp4|webm|mov|m4v|ogg)(\?.*)?$/i.test(formData.hero.bgMediaUrl)) ? (
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
                  {formData.hero.overlayStyle === 'light' && (
                    <div className="absolute inset-0 bg-white/35 z-[1] pointer-events-none" />
                  )}
                  {formData.hero.overlayStyle === 'dark' && (
                    <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />
                  )}
                </>
              ) : null}
              {(() => {
                const isWhite = formData.hero.textColor === 'white' || (formData.hero.bgMediaUrl && formData.hero.textColor !== 'dark');
                return (
                  <div className={`relative z-10 space-y-2 ${
                    isWhite ? 'text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]' : 'text-slate-900'
                  }`}>
                    <h1 className="text-2xl font-black">{formData.hero.title || 'Contact Us'}</h1>
                    <p className="text-xs max-w-xl opacity-90">{formData.hero.subtitle}</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Inquiry Topics */}
      {activeSubtab === 'topics' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Inquiry Topics (Select a Topic Dropdown)</h3>
              <p className="text-xs text-slate-500">
                Options displayed in the "Select a topic" dropdown on the contact form. You can add, edit, or remove topics anytime.
              </p>
            </div>
            <span className="text-xs font-bold text-[#016839] bg-[#e8f7ee] px-2.5 py-1 rounded-full">
              {formData.topics.length} Topics Active
            </span>
          </div>

          {/* Add New Topic */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input
              type="text"
              value={newTopicInput}
              onChange={(e) => setNewTopicInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
              placeholder="Enter new topic name (e.g., EV Charging Inquiries)..."
              className="flex-1 px-3.5 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none bg-white"
            />
            <button
              type="button"
              onClick={handleAddTopic}
              className="px-4 py-2 bg-[#016839] hover:bg-[#014d28] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Topic
            </button>
          </div>

          {/* Topics List */}
          <div className="space-y-2">
            {formData.topics.map((topic, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all group"
              >
                <div className="flex items-center gap-3 flex-1">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => handleTopicChange(idx, e.target.value)}
                    className="flex-1 px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-transparent rounded border border-transparent hover:border-slate-200 focus:border-[#016839] focus:bg-slate-50 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteTopic(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-80 group-hover:opacity-100"
                  title="Delete topic"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 3: Two-Column Feature Cards */}
      {activeSubtab === 'twocolumn' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Two-Column Feature Cards</h3>
              <p className="text-xs text-slate-500">
                Matches the 2 featured cards from Conoco (e.g. Credit Card Inquiries &amp; Loyalty Inquiries). Add, edit, or remove cards.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTwoColCard}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Add Card
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {formData.twoColumnCards.map((card, idx) => (
              <div
                key={card.id || idx}
                className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50 relative group"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-[#016839] bg-[#e8f7ee] px-2.5 py-0.5 rounded-full">
                    Card #{idx + 1}
                  </span>
                  {formData.twoColumnCards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteTwoColCard(card.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Image URL</label>
                    <input
                      type="text"
                      value={card.imageUrl}
                      onChange={(e) => handleTwoColCardChange(idx, 'imageUrl', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                    />
                    {card.imageUrl && (
                      <div className="w-full h-32 rounded-lg overflow-hidden mt-1 border border-slate-200 bg-slate-100">
                        <img
                          src={getAssetUrl(card.imageUrl)}
                          alt="Card preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Card Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleTwoColCardChange(idx, 'title', e.target.value)}
                      placeholder="Commercial & Fuel Card Inquiries."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white font-bold focus:ring-1 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Description</label>
                    <textarea
                      rows={2}
                      value={card.description}
                      onChange={(e) => handleTwoColCardChange(idx, 'description', e.target.value)}
                      placeholder="Description text..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Phone (Optional)</label>
                      <input
                        type="text"
                        value={card.phone || ''}
                        onChange={(e) => handleTwoColCardChange(idx, 'phone', e.target.value)}
                        placeholder="1-855-513-1176"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Button Text</label>
                      <input
                        type="text"
                        value={card.buttonText}
                        onChange={(e) => handleTwoColCardChange(idx, 'buttonText', e.target.value)}
                        placeholder="Learn more"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700">Button Link</label>
                      <input
                        type="text"
                        value={card.buttonLink}
                        onChange={(e) => handleTwoColCardChange(idx, 'buttonLink', e.target.value)}
                        placeholder="/fleet"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Bento 3-Column Info Cards */}
      {activeSubtab === 'bento' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Bento 3-Column Info Cards (Londis Forest Green)</h3>
              <p className="text-xs text-slate-500">
                Matches the 3 bottom bento cards from Conoco (Customer Service, Address, Partnership/Supplier). Displayed in brand green with crisp white text.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddBentoCard}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#016839] hover:bg-[#014d28] rounded-xl flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Add Bento Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {formData.bentoCards.map((bento, idx) => (
              <div
                key={bento.id || idx}
                className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-slate-50 relative"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-xs font-bold text-[#016839] bg-[#e8f7ee] px-2 py-0.5 rounded-full">
                    Bento #{idx + 1}
                  </span>
                  {formData.bentoCards.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteBentoCard(bento.id)}
                      className="p-1 text-slate-400 hover:text-red-600 rounded"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Card Headline</label>
                    <input
                      type="text"
                      value={bento.title}
                      onChange={(e) => handleBentoCardChange(idx, 'title', e.target.value)}
                      placeholder="Customer service department"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white font-bold focus:ring-1 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Lines / Details (One per line)</label>
                    <textarea
                      rows={3}
                      value={(bento.lines || []).join('\n')}
                      onChange={(e) => handleBentoLinesChange(idx, e.target.value)}
                      placeholder="Available Monday – Friday&#10;8 a.m. – 5 p.m.&#10;1-800-527-5476"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700">Clickable Phone Number (Optional)</label>
                    <input
                      type="text"
                      value={bento.phone || ''}
                      onChange={(e) => handleBentoCardChange(idx, 'phone', e.target.value)}
                      placeholder="1-800-527-5476"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-700">Link Label</label>
                      <input
                        type="text"
                        value={bento.linkText || ''}
                        onChange={(e) => handleBentoCardChange(idx, 'linkText', e.target.value)}
                        placeholder="Supplier Portal"
                        className="w-full px-2.5 py-1 rounded border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-700">Link URL</label>
                      <input
                        type="text"
                        value={bento.linkUrl || ''}
                        onChange={(e) => handleBentoCardChange(idx, 'linkUrl', e.target.value)}
                        placeholder="/fleet"
                        className="w-full px-2.5 py-1 rounded border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-[#016839] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Green Card Preview */}
                <div className="bg-[#016839] text-white p-3 rounded-xl space-y-1.5 mt-2">
                  <p className="text-[10px] text-[#84d400] font-bold uppercase tracking-wider">Preview Card</p>
                  <h4 className="font-bold text-xs">{bento.title}</h4>
                  <div className="text-[11px] text-white/80 space-y-0.5">
                    {(bento.lines || []).map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 5: Form Settings & Disclaimers */}
      {activeSubtab === 'form' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Form Marketing &amp; Legal Disclaimers</h3>
            <p className="text-xs text-slate-500">
              Customize the opt-in checkbox text and submission disclaimer text under the Submit button.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Marketing Opt-in Checkbox Label</label>
                <span className="text-[10px] text-slate-500 italic">Leave empty to completely hide the checkbox</span>
              </div>
              <textarea
                rows={2}
                value={formData.formSettings?.optInText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    formSettings: {
                      ...prev.formSettings,
                      optInText: e.target.value,
                    },
                  }))
                }
                placeholder="Leave blank to hide, or enter label (e.g., Sign up for email updates...)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Footer Legal Disclaimer</label>
                <span className="text-[10px] text-slate-500 italic">Leave empty to completely hide the disclaimer</span>
              </div>
              <textarea
                rows={3}
                value={formData.formSettings?.disclaimerText ?? ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    formSettings: {
                      ...prev.formSettings,
                      disclaimerText: e.target.value,
                    },
                  }))
                }
                placeholder="Leave blank to hide, or enter disclaimer (e.g., By clicking the SUBMIT button you agree to...)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#016839] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
