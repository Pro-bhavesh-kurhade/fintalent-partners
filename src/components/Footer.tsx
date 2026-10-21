import React from 'react';
import { Mail, Phone, MapPin, Lock, ExternalLink, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigateCandidate: () => void;
  onNavigateEmployer: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdmin,
  onNavigateCandidate,
  onNavigateEmployer,
  onOpenTracker,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

  return (
    <footer 
      role="contentinfo"
      className={`text-xs border-t transition-colors duration-200 relative overflow-hidden ${
        isDark 
          ? 'bg-[#0A0D1A] text-slate-400 border-white/10' 
          : 'bg-[#F4F3EE] text-slate-600 border-slate-200'
      }`}
    >
      {/* Decorative ambient gradient */}
      <div 
        className={`absolute bottom-0 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isDark ? 'bg-[#4563FF]/10' : 'bg-[#4563FF]/5'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4563FF] to-[#D4FF5A] p-0.5 shadow-md">
                <div className={`w-full h-full rounded-[10px] flex items-center justify-center font-display font-extrabold text-lg ${
                  isDark ? 'bg-[#101426] text-white' : 'bg-[#101426] text-white'
                }`}>
                  F<span className="text-[#D4FF5A]">T</span>
                </div>
              </div>
              <span className={`font-display font-black text-2xl tracking-tight uppercase ${
                isDark ? 'text-white' : 'text-[#101426]'
              }`}>
                FinTalent <span className="text-[#4563FF]">Partners</span>
              </span>
            </div>
            
            <p className={`leading-relaxed text-xs max-w-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Executive Search Practice specialized in Chartered Accountancy Firms, Big 4 Alumni Networks, Fortune 500 Corporates, and VC-funded Startups across India.
            </p>

            <div className={`space-y-2.5 text-xs pt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                <span>Executive Search Lead (Amii Ma'am): <strong className={isDark ? 'text-white font-mono' : 'text-[#101426] font-mono'}>+91 98212 62613</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#4563FF] shrink-0" />
                <span>recruitment@fintalentpartners.com</span>
              </div>
            </div>
          </div>

          {/* Practice Domains */}
          <div>
            <h3 className={`font-display font-bold uppercase text-xs tracking-wider mb-4 ${
              isDark ? 'text-white' : 'text-[#101426]'
            }`}>
              Practice Domains
            </h3>
            <ul className="space-y-2.5">
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>Statutory Audit & Assurance</span></li>
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>Direct Tax & Litigations</span></li>
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>GST & Indirect Taxation</span></li>
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>FP&A & Corporate Finance</span></li>
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>Accounting & SAP Finalization</span></li>
              <li><span className={`transition cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}>CA Articleship Placements</span></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h3 className={`font-display font-bold uppercase text-xs tracking-wider mb-4 ${
              isDark ? 'text-white' : 'text-[#101426]'
            }`}>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={onNavigateCandidate}
                  className={`transition text-left cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}
                >
                  Submit Profile (Candidates)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onNavigateEmployer}
                  className={`transition text-left cursor-pointer ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}
                >
                  Hire Finance Talent (Employers)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTracker}
                  className={`font-bold hover:underline flex items-center gap-1.5 cursor-pointer ${
                    isDark ? 'text-[#D4FF5A]' : 'text-[#4563FF]'
                  }`}
                >
                  <span>Track Application Status</span>
                </button>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition flex items-center gap-1.5 ${isDark ? 'hover:text-[#D4FF5A]' : 'hover:text-[#4563FF]'}`}
                  aria-label="WhatsApp Amii Ma'am on +91 9821262613"
                >
                  <span>WhatsApp Amii Ma'am</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Desks */}
          <div>
            <h3 className={`font-display font-bold uppercase text-xs tracking-wider mb-4 ${
              isDark ? 'text-white' : 'text-[#101426]'
            }`}>
              Executive Desks
            </h3>
            <div className={`space-y-2.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong className={isDark ? 'text-white' : 'text-[#101426]'}>Mumbai:</strong> Bandra Kurla Complex (BKC)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4563FF] shrink-0 mt-0.5" />
                <span><strong className={isDark ? 'text-white' : 'text-[#101426]'}>Delhi NCR:</strong> Barakhamba Road, Connaught Place</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B9A7FF] shrink-0 mt-0.5" />
                <span><strong className={isDark ? 'text-white' : 'text-[#101426]'}>Bengaluru:</strong> 100ft Road, Indiranagar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with discrete Admin Portal link */}
        <div className={`pt-8 mt-12 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div className={`text-center sm:text-left ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            © {new Date().getFullYear()} FinTalent Partners LLP. Head of Practice: Amii Ma'am. ICAI compliant & confidential.
          </div>

          <div className="flex items-center gap-4">
            <span className={`hidden sm:inline ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Protected by Supabase Cloud
            </span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#D4FF5A] border-white/10' 
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-[#4563FF] border-slate-300 shadow-sm'
              }`}
              title="Restricted Staff Portal"
              aria-label="Open staff admin portal"
            >
              <Lock className="w-3 h-3" />
              <span className="font-medium text-[11px]">Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
