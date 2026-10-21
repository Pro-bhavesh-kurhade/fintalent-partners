import React from 'react';
import { 
  ArrowRight, UserCheck, Building2, CheckCircle2, 
  ShieldCheck, Clock, Sparkles, MessageCircle, Search 
} from 'lucide-react';

interface MarketplaceSplitProps {
  onCandidateClick: () => void;
  onEmployerClick: () => void;
  onTrackerClick: () => void;
}

export const MarketplaceSplit: React.FC<MarketplaceSplitProps> = ({
  onCandidateClick,
  onEmployerClick,
  onTrackerClick,
}) => {
  const WHATSAPP_URL =
    "https://wa.me/919821262613?text=Hi%20Amii%20Ma%27am%2C%20reaching%20out%20via%20FinTalent%20Partners";

  return (
    <section className="py-20 lg:py-28 bg-[#F7F6F2] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#101426] text-xs font-semibold border border-slate-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4563FF]" />
            <span className="font-display font-bold uppercase tracking-wider text-[11px]">
              TWO-SIDED TALENT ENGINE
            </span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#101426] tracking-tight uppercase">
            DESIGNED FOR CANDIDATES. <br />
            <span className="text-[#4563FF]">ENGINEERED FOR EMPLOYERS.</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Choose your tailored pathway below to either discover high-impact finance roles or secure verified Chartered Accountants for your team.
          </p>
        </div>

        {/* Dual High-Contrast Pathways */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Pathway 1: For Candidates (Dark / Neon Lime Aesthetic) */}
          <div className="rounded-3xl p-8 sm:p-12 bg-[#101426] text-white border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4FF5A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4FF5A] text-xs font-display font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" />
                <span>For Job Seekers & Aspirants</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-white uppercase leading-tight">
                LAUNCH YOUR <br />
                <span className="text-[#D4FF5A]">NEXT FINANCE MILESTONE.</span>
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed">
                Connect directly with senior hiring partners at leading CA Firms, Big 4 Alumni networks, and Fortune 500 Corporates across India.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF5A] shrink-0 mt-0.5" />
                  <span><strong>100% Free Placement Assistance:</strong> Zero charges for job seekers at any stage.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF5A] shrink-0 mt-0.5" />
                  <span><strong>Live Application Tracker:</strong> Transparent 5-stage progress using your Mobile & DOB.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF5A] shrink-0 mt-0.5" />
                  <span><strong>Strict Confidentiality:</strong> Your profile is shared only with approved partner firms.</span>
                </div>
              </div>
            </div>

            <div className="pt-10 space-y-3 relative z-10">
              <button
                onClick={onCandidateClick}
                className="w-full group inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#D4FF5A] hover:bg-[#bbf036] text-[#101426] font-display font-extrabold text-sm sm:text-base shadow-lg shadow-[#D4FF5A]/20 transition cursor-pointer"
              >
                <span>Submit Profile & Resume (2 Mins)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTrackerClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-[#D4FF5A]" />
                <span>Already applied? Track your live status</span>
              </button>
            </div>
          </div>

          {/* Pathway 2: For Employers (Crisp Off-White / Cobalt Aesthetic) */}
          <div className="rounded-3xl p-8 sm:p-12 bg-white text-[#101426] border border-slate-200/90 shadow-xl flex flex-col justify-between relative overflow-hidden group">
            {/* Ambient decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#4563FF]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4563FF]/10 text-[#4563FF] text-xs font-display font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>For CA Firms, Corporates & CFOs</span>
              </div>

              <h3 className="font-display font-black text-2xl sm:text-4xl text-[#101426] uppercase leading-tight">
                HIRE SCREENED <br />
                <span className="text-[#4563FF]">FINANCE LEADERS.</span>
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Save dozens of hours of unqualified resume screening. Receive curated, technically vetted candidate shortlists tailored to your mandate.
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4563FF] shrink-0 mt-0.5" />
                  <span><strong>48-Hour Turnaround:</strong> Receive pre-screened candidate batches in 1-2 days.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4563FF] shrink-0 mt-0.5" />
                  <span><strong>ICAI Credential Checks:</strong> Every degree, attempt count, and articleship verified.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#4563FF] shrink-0 mt-0.5" />
                  <span><strong>Replacement Guarantee:</strong> Flexible 90-day replacement policy for corporate hires.</span>
                </div>
              </div>
            </div>

            <div className="pt-10 space-y-3 relative z-10">
              <button
                onClick={onEmployerClick}
                className="w-full group inline-flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-[#4563FF] hover:bg-[#324fec] text-white font-display font-bold text-sm sm:text-base shadow-lg shadow-[#4563FF]/20 transition cursor-pointer"
              >
                <span>Hire Finance Talent (Submit Mandate)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#10B981] fill-current" />
                <span>Direct WhatsApp Consultation with Amii Ma'am</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
