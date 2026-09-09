import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CLIENT_URL } from '../api/axios';
import {
  Fuel,
  Layout,
  Sparkles,
  ShoppingBag,
  Inbox,
  Car,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Compass,
  MailCheck,
  Mail,
  Info,
  CreditCard,
} from 'lucide-react';

import LiveFuelPricingTab from '../tabs/LiveFuelPricingTab';
import HeroBannersTab from '../tabs/HeroBannersTab';
import HomePageCmsTab from '../tabs/HomePageCmsTab';
import NavbarFooterTab from '../tabs/NavbarFooterTab';
import ForecourtServicesTab from '../tabs/ForecourtServicesTab';
import StorePromotionsTab from '../tabs/StorePromotionsTab';
import InquiriesCrmTab from '../tabs/InquiriesCrmTab';
import ValetBookingsTab from '../tabs/ValetBookingsTab';
import CareersTab from '../tabs/CareersTab';
import NewsletterSubmissionsTab from '../tabs/NewsletterSubmissionsTab';
import GeneralSettingsTab from '../tabs/GeneralSettingsTab';
import ContactPageCmsTab from '../tabs/ContactPageCmsTab';
import AboutPageCmsTab from '../tabs/AboutPageCmsTab';
import OurProductsCmsTab from '../tabs/OurProductsCmsTab';
import CardsRewardsCmsTab from '../tabs/CardsRewardsCmsTab';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('pricing');

  const navigation = [
    { id: 'pricing', label: 'Live Fuel Prices ($)', icon: Fuel, badge: 'Realtime' },
    { id: 'homepage', label: 'Home Page CMS & Images', icon: Layout, badge: 'CMS' },
    { id: 'about_page', label: 'About Us Page CMS', icon: Info, badge: 'Conoco Style' },
    { id: 'contact_page', label: 'Contact Us Page CMS', icon: Mail, badge: 'Conoco Style' },
    { id: 'our_products_page', label: 'Our Products Page CMS', icon: ShoppingBag, badge: 'Circle K Style' },
    { id: 'cards_rewards_page', label: 'Cards & Rewards Page CMS', icon: CreditCard, badge: 'Phillips 66 Style' },
    { id: 'nav_footer', label: 'Navbar & Footer CMS', icon: Compass, badge: 'Header/Footer' },
    { id: 'services', label: 'Forecourt Services', icon: Sparkles },
    { id: 'promotions', label: 'Our Products & Deals', icon: ShoppingBag, badge: 'Products' },
    { id: 'inquiries', label: 'B2B Fleets & Leads CRM', icon: Inbox },
    { id: 'valet', label: 'Car Wash & Spa Bookings', icon: Car },
    { id: 'careers', label: 'Forecourt Careers', icon: Briefcase },
    { id: 'newsletter', label: 'Newsletter & Resumes CRM', icon: MailCheck, badge: 'Leads' },
    { id: 'settings', label: 'Station Master Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-slate-950 text-white p-5 flex flex-col justify-between shrink-0 shadow-xl border-r border-slate-800">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="flex items-center justify-center border-2 border-[#016839] bg-white rounded-full px-2.5 py-0.5 shadow-sm">
              <span className="text-[#016839] font-black text-sm lowercase">conoco</span>
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white leading-tight">S&B Conoco Forecourt</h1>
              <p className="text-[11px] text-[#016839] font-semibold uppercase tracking-wider">Station CMS Admin</p>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#016839] text-white shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Footer & Quick Links */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <a
            href={CLIENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-slate-400 hover:text-[#016839] bg-slate-900/50 hover:bg-slate-900 rounded-lg border border-slate-800/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Live Customer Site
            </span>
            <ChevronRight className="w-3 h-3" />
          </a>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#016839]">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-200 leading-tight">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 font-mono">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto overflow-y-auto">
        {activeTab === 'pricing' && <LiveFuelPricingTab />}
        {activeTab === 'homepage' && <HomePageCmsTab />}
        {activeTab === 'about_page' && <AboutPageCmsTab />}
        {activeTab === 'contact_page' && <ContactPageCmsTab />}
        {activeTab === 'our_products_page' && <OurProductsCmsTab />}
        {activeTab === 'cards_rewards_page' && <CardsRewardsCmsTab />}
        {activeTab === 'hero' && <HomePageCmsTab />}
        {activeTab === 'nav_footer' && <NavbarFooterTab />}
        {activeTab === 'services' && <ForecourtServicesTab />}
        {activeTab === 'promotions' && <StorePromotionsTab />}
        {activeTab === 'inquiries' && <InquiriesCrmTab />}
        {activeTab === 'valet' && <ValetBookingsTab />}
        {activeTab === 'careers' && <CareersTab />}
        {activeTab === 'newsletter' && <NewsletterSubmissionsTab />}
        {activeTab === 'settings' && <GeneralSettingsTab />}
      </main>
    </div>
  );
}
