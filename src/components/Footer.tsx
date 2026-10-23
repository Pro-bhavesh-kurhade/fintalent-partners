import React from 'react';
import {
  Mail,
  Phone,
  Lock,
  MessageCircle,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  CONTACT_EMAIL,
  DISPLAY_PHONE,
  buildWhatsAppUrl,
} from '../lib/supabase';
import { AppRoute } from './Header';

interface FooterProps {
  onNavigate: (page: AppRoute) => void;
  onOpenAdmin: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenTracker,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const whatsappUrl = buildWhatsAppUrl(
    "Hi Amii Ma'am, reaching out via FinTalent Partners!"
  );

  return (
    <footer className="px-3 sm:px-6 pb-6 pt-2" role="contentinfo">
      <div
        className={`max-w-7xl mx-auto rounded-[1.8rem] p-6 sm:p-8 border ${
          isDark
            ? 'bg-[#0D101B] border-white/12 text-slate-300'
            : 'bg-[#0D1017] border-[#0D1017] text-slate-300'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          {/* Brand + Desks */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-base flex items-center justify-center">
                  FT
                </div>
                <span className="font-display font-extrabold text-xl text-white tracking-tight">
                  FinTalent <span className="text-[#C8FF32]">Partners</span>
                </span>
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B4A]" />
                Mumbai BKC · Delhi CP · Bengaluru
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
              <a href="tel:+919821262613" className="inline-flex items-center gap-1.5 hover:text-[#C8FF32]">
                <Phone className="w-3.5 h-3.5 text-[#12B886]" />
                {DISPLAY_PHONE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 hover:text-[#C8FF32]"
              >
                <Mail className="w-3.5 h-3.5 text-[#3B5BFF]" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Sub-Page Links + Direct WhatsApp */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {(
              [
                { id: 'jobs', label: 'Open Jobs' },
                { id: 'talent', label: 'Talent Pool' },
                { id: 'apply', label: '60s Apply' },
                { id: 'hire', label: 'Hire 48h' },
                { id: 'domains', label: 'Domains' },
                { id: 'about', label: 'About & FAQ' },
              ] as { id: AppRoute; label: string }[]
            ).map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/12 text-slate-200 hover:text-[#C8FF32] transition cursor-pointer"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={onOpenTracker}
              className="px-3 py-2 rounded-xl bg-[#3B5BFF]/20 hover:bg-[#3B5BFF]/30 text-[#9FB0FF] transition cursor-pointer"
            >
              Track Status
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Amii Ma&apos;am</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal + Staff Console */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FinTalent Partners LLP · Principal Search Lead: Amii Ma&apos;am · ICAI Confidential
          </p>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/6 hover:bg-white/12 text-slate-300 hover:text-[#C8FF32] border border-white/10 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="font-mono font-bold text-[11px]">Staff Admin Console</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
