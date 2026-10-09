import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Lock, ExternalLink, Heart } from 'lucide-react';

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
  return (
    <footer className="bg-[#070C1E] text-slate-400 text-xs border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <span className="text-xl font-bold text-white font-serif">
                FinTalent <span className="text-emerald-400">Partners</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Executive Search Practice specialized in Chartered Accountancy Firms, Big 4 Alumni Practices, Fortune 500 Corporates, and VC-funded Startups.
            </p>

            <div className="space-y-2 text-slate-300 text-xs pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Executive Lead (Amii Ma'am): <strong className="text-white">+91 98212 62613</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>recruitment@fintalentpartners.com</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Practice Domains
            </h4>
            <ul className="space-y-2">
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Statutory Audit & Assurance</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Direct Tax & Litigations</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">GST & Indirect Taxation</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">FP&A & Corporate Finance</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">Accounting & SAP Finalization</span></li>
              <li><span className="hover:text-emerald-400 transition cursor-pointer">CA Articleship Placements</span></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onNavigateCandidate}
                  className="hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  Submit Profile (Candidates)
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateEmployer}
                  className="hover:text-emerald-400 transition text-left cursor-pointer"
                >
                  Hire Finance Talent (Employers)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="text-emerald-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Track Application Status</span>
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am,%20we%20have%20an%20urgent%20finance%20hiring%20requirement%20at%20our%20firm."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition flex items-center gap-1"
                >
                  <span>WhatsApp Amii Ma'am</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Desks */}
          <div>
            <h4 className="text-white font-bold uppercase text-[11px] tracking-wider mb-3">
              Executive Desks
            </h4>
            <div className="space-y-2 text-slate-400 text-xs">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Mumbai:</strong> Bandra Kurla Complex (BKC)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Delhi NCR:</strong> Barakhamba Road, Connaught Place</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Bengaluru:</strong> 100ft Road, Indiranagar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with discrete Admin Portal link */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} FinTalent Partners LLP. Head of Practice: Amii Ma'am. ICAI compliant & confidential.
          </div>

          {/* Discrete subtle admin portal trigger */}
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden sm:inline">Protected by Supabase Cloud</span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
              title="Restricted Staff Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span className="font-medium text-[11px]">Admin Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
