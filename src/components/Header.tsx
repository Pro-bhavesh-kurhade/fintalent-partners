import React, { useState } from 'react';
import { MessageCircle, Menu, X, ArrowUpRight, Search } from 'lucide-react';

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
    <header className="sticky top-0 z-50 bg-[#101426]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Left: Custom CSS Logo Mark & Brand Title */}
        <a href="#" className="flex items-center gap-3.5 group shrink-0">
          {/* Custom geometric logo mark */}
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#4563FF] via-[#101426] to-[#D4FF5A] p-0.5 shadow-lg shadow-[#4563FF]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center relative overflow-hidden">
              {/* Geometric monogram angles */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,255,90,0.2),transparent_70%)]" />
              <span className="font-display font-extrabold text-lg text-white tracking-tighter">
                F<span className="text-[#D4FF5A]">T</span>
              </span>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#10B981] rounded-full ring-2 ring-[#101426]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                FinTalent
              </span>
              <span className="font-display font-bold text-xl sm:text-2xl text-[#D4FF5A]">
                Partners
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide mt-1 hidden sm:block">
              Executive Search · CA, Tax & Finance
            </p>
          </div>
        </a>

        {/* Center: Exactly 3 Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={onNavigateCandidate}
            className="text-sm font-semibold text-slate-300 hover:text-[#D4FF5A] transition-colors py-1 cursor-pointer relative group"
          >
            <span>For Candidates</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4FF5A] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={onNavigateEmployer}
            className="text-sm font-semibold text-slate-300 hover:text-[#D4FF5A] transition-colors py-1 cursor-pointer relative group"
          >
            <span>For Employers</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4FF5A] group-hover:w-full transition-all duration-300" />
          </button>

          <button
            onClick={onOpenTracker}
            className="text-sm font-semibold text-slate-300 hover:text-white transition-colors py-1 cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <Search className="w-3.5 h-3.5 text-[#D4FF5A]" />
            <span>Track Status</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
          </button>
        </nav>

        {/* Right Actions: Prominent WhatsApp Desk Action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg shadow-[#D4FF5A]/20 hover:shadow-[#D4FF5A]/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-display"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>WhatsApp Desk</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D4FF5A] text-[#101426] p-2.5 rounded-xl text-xs font-bold"
            aria-label="WhatsApp Desk"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-300 hover:text-white bg-white/5 rounded-xl border border-white/10 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#101426] border-b border-white/10 px-4 pt-3 pb-6 space-y-2.5 shadow-2xl animate-in slide-in-from-top-3">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateCandidate();
            }}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold bg-white/5 text-slate-200 hover:text-[#D4FF5A] flex justify-between items-center border border-white/5"
          >
            <span>For Candidates</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onNavigateEmployer();
            }}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold bg-white/5 text-slate-200 hover:text-[#D4FF5A] flex justify-between items-center border border-white/5"
          >
            <span>For Employers</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTracker();
            }}
            className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold bg-[#4563FF]/20 text-white border border-[#4563FF]/40 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D4FF5A]" />
              Track Application Status
            </span>
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          </button>

          <div className="pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D4FF5A] text-[#101426] text-sm font-bold font-display shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp with Amii Ma'am</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
