import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Lock, ExternalLink, Sparkles } from 'lucide-react';

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
  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

  return (
    <footer className="bg-[#0A0D1A] text-slate-400 text-xs border-t border-white/10 relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#4563FF]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand info (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#4563FF] to-[#D4FF5A] p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center font-display font-extrabold text-lg text-white">
                  F<span className="text-[#D4FF5A]">T</span>
                </div>
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight uppercase">
                FinTalent <span className="text-[#D4FF5A]">Partners</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Executive Search Practice specialized in Chartered Accountancy Firms, Big 4 Alumni Networks, Fortune 500 Corporates, and VC-funded Startups across India.
            </p>

            <div className="space-y-2.5 text-slate-300 text-xs pt-1">
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#D4FF5A]" />
                <span>Executive Search Lead (Amii Ma'am): <strong className="text-white">+91 98212 62613</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#4563FF]" />
                <span>recruitment@fintalentpartners.com</span>
              </div>
            </div>
          </div>

          {/* Practice Domains */}
          <div>
            <h4 className="font-display font-bold text-white uppercase text-xs tracking-wider mb-4">
              Practice Domains
            </h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">Statutory Audit & Assurance</span></li>
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">Direct Tax & Litigations</span></li>
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">GST & Indirect Taxation</span></li>
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">FP&A & Corporate Finance</span></li>
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">Accounting & SAP Finalization</span></li>
              <li><span className="hover:text-[#D4FF5A] transition cursor-pointer">CA Articleship Placements</span></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="font-display font-bold text-white uppercase text-xs tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onNavigateCandidate}
                  className="hover:text-[#D4FF5A] transition text-left cursor-pointer"
                >
                  Submit Profile (Candidates)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateEmployer}
                  className="hover:text-[#D4FF5A] transition text-left cursor-pointer"
                >
                  Hire Finance Talent (Employers)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="text-[#D4FF5A] font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Track Application Status</span>
                </button>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4FF5A] transition flex items-center gap-1.5"
                >
                  <span>WhatsApp Amii Ma'am</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Desks */}
          <div>
            <h4 className="font-display font-bold text-white uppercase text-xs tracking-wider mb-4">
              Executive Desks
            </h4>
            <div className="space-y-2.5 text-slate-400 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4FF5A] shrink-0 mt-0.5" />
                <span><strong>Mumbai:</strong> Bandra Kurla Complex (BKC)</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#4563FF] shrink-0 mt-0.5" />
                <span><strong>Delhi NCR:</strong> Barakhamba Road, Connaught Place</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong>Bengaluru:</strong> 100ft Road, Indiranagar</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar with discrete Admin Portal link */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} FinTalent Partners LLP. Head of Practice: Amii Ma'am. ICAI compliant & confidential.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-500 hidden sm:inline">Protected by Supabase Cloud</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-[#D4FF5A] border border-white/10 transition cursor-pointer"
              title="Restricted Staff Portal"
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
