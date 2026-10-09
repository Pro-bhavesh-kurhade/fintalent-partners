import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Shield, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenTracker: () => void;
  onNavigateCandidate: () => void;
  onNavigateEmployer: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTracker,
  onNavigateCandidate,
  onNavigateEmployer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Clean Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-slate-800">
            <Shield className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-tight">
              <span className="font-bold text-xl sm:text-2xl text-slate-950 font-headline tracking-tight">
                FinTalent
              </span>
              <span className="font-bold text-xl sm:text-2xl text-emerald-600 font-headline">
                Partners
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Curated Finance & Tax Talent
            </p>
          </div>
        </a>

        {/* Center: Exactly 3 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onNavigateCandidate}
            className="text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors py-1 cursor-pointer"
          >
            For Candidates
          </button>

          <button
            onClick={onNavigateEmployer}
            className="text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors py-1 cursor-pointer"
          >
            For Employers
          </button>

          <button
            onClick={onOpenTracker}
            className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors py-1 cursor-pointer flex items-center gap-1.5"
          >
            <span>Track Status</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>
        </nav>

        {/* Right Actions: Subtle contact pill + Single sleek pill WhatsApp button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+919821262613"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200 transition"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>+91 9821262613</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Desk</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white p-2.5 rounded-full text-xs font-bold"
            aria-label="WhatsApp Desk"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-950 bg-slate-100 rounded-lg border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateCandidate();
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-slate-50 text-slate-900 flex justify-between items-center"
          >
            <span>For Candidates</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateEmployer();
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-slate-50 text-slate-900 flex justify-between items-center"
          >
            <span>For Employers</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center justify-between"
          >
            <span>Track Application Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          </button>

          <div className="pt-2">
            <a
              href="tel:+919821262613"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              <span>Call Desk: +91 9821262613</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
