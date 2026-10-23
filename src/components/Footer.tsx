import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Lock,
  MessageCircle,
  ArrowUpRight,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  CONTACT_EMAIL,
  DISPLAY_PHONE,
  buildWhatsAppUrl,
} from '../lib/supabase';

interface FooterProps {
  onOpenAdmin: () => void;
  onExploreJobs: () => void;
  onBrowseTalent: () => void;
  onNavigateCandidate: () => void;
  onNavigateEmployer: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onExploreJobs,
  onBrowseTalent,
  onNavigateCandidate,
  onNavigateEmployer,
  onOpenTracker,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const whatsappUrl = buildWhatsAppUrl(
    "Hi Amii Ma'am, reaching out via FinTalent Partners!"
  );

  return (
    <footer className="px-3 sm:px-6 pb-8 pt-6" role="contentinfo">
      <div
        className={`max-w-7xl mx-auto rounded-[2rem] p-8 sm:p-12 border ${
          isDark
            ? 'bg-[#0D101B] border-white/12 text-slate-300'
            : 'bg-[#0D1017] border-[#0D1017] text-slate-300'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-lg flex items-center justify-center relative">
                FT
                <span className="w-2 h-2 rounded-full bg-[#FF6B4A] absolute top-1.5 right-1.5" />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                FinTalent <span className="text-[#C8FF32]">Partners</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Modern executive search &amp; fast-turnaround placement studio bridging Qualified CAs, Tax Specialists, Audit Leads, and Articles with premier firms &amp; corporates across India.
            </p>

            <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono text-white">
              <a
                href="tel:+919821262613"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-white/10 transition"
              >
                <Phone className="w-3.5 h-3.5 text-[#12B886]" />
                {DISPLAY_PHONE}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/6 hover:bg-white/12 border border-white/10 transition"
              >
                <Mail className="w-3.5 h-3.5 text-[#3B5BFF]" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          {/* Instant Actions */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#C8FF32]">
              Zero-Friction Actions
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={onExploreJobs}
                  className="hover:text-[#C8FF32] transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Live Open Roles Board</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onBrowseTalent}
                  className="hover:text-[#C8FF32] transition cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Browse Pre-Vetted Talent Pool</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateCandidate}
                  className="hover:text-[#C8FF32] transition cursor-pointer"
                >
                  60-Second Candidate Fast Apply
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateEmployer}
                  className="hover:text-[#C8FF32] transition cursor-pointer"
                >
                  45-Second Recruiter Mandate Desk
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className="text-[#C8FF32] font-bold hover:underline cursor-pointer"
                >
                  Track Live Application Status →
                </button>
              </li>
            </ul>
          </div>

          {/* Regional Hubs */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-[#FF6B4A]">
              Search Desks
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8FF32] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Mumbai:</strong> Bandra Kurla Complex (BKC)
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#3B5BFF] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Delhi NCR:</strong> Connaught Place
                </span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#12B886] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Bengaluru:</strong> 100ft Rd, Indiranagar
                </span>
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C8FF32] text-[#090B10] font-display font-extrabold text-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Amii Ma&apos;am</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal + Staff Console Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FinTalent Partners LLP · Led by Amii Ma&apos;am · ICAI Confidential Search
          </p>

          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/6 hover:bg-white/12 text-slate-300 hover:text-[#C8FF32] border border-white/10 transition cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="font-mono font-bold text-[11px]">Staff Admin Console</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
