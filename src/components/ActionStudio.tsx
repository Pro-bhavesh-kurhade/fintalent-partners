import React from 'react';
import { Briefcase, Building2, Search, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CandidateForm } from './CandidateForm';
import { EmployerForm } from './EmployerForm';
import {
  FirmRequest,
  VettedTalentProfile,
  Candidate,
  getLastTrackingCredentials,
  publicAsset,
} from '../lib/supabase';

interface ActionStudioProps {
  activeStudioTab: 'candidate' | 'employer';
  onTabChange: (tab: 'candidate' | 'employer') => void;
  initialDomain: string | null;
  selectedRole: FirmRequest | null;
  onClearSelectedRole: () => void;
  shortlistingTalent: VettedTalentProfile | null;
  onClearShortlistTalent: () => void;
  onCandidateSubmitted: (cand: Candidate) => void;
  onMandateCreated: (mandate: FirmRequest) => void;
  onOpenTracker: (phone?: string, dob?: string) => void;
}

export const ActionStudio: React.FC<ActionStudioProps> = ({
  activeStudioTab,
  onTabChange,
  initialDomain,
  selectedRole,
  onClearSelectedRole,
  shortlistingTalent,
  onClearShortlistTalent,
  onCandidateSubmitted,
  onMandateCreated,
  onOpenTracker,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const savedCreds = getLastTrackingCredentials();

  return (
    <section id="action-studio" className="px-3 sm:px-6 pt-5 pb-12 scroll-mt-20">
      <div
        className={`max-w-6xl mx-auto relative rounded-[2.2rem] overflow-hidden border p-4 sm:p-8 lg:p-12 ${
          isDark
            ? 'border-white/15 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)]'
            : 'border-[2px] border-[#0D1017] shadow-[8px_8px_0px_0px_#0D1017]'
        }`}
      >
        {/* Neo-Geometric Custom Generated Artwork Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${publicAsset('images/workspace-abstract-bg.jpg')}')`,
          }}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? 'bg-[#090B10]/88 backdrop-blur-md'
              : 'bg-[#FAF7F0]/90 backdrop-blur-md'
          }`}
        />

        <div className="relative z-10 space-y-7">
          {/* Header & Instant Mode Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-2">
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  isDark
                    ? 'bg-[#C8FF32]/15 text-[#C8FF32] border border-[#C8FF32]/30'
                    : 'bg-[#0D1017] text-[#C8FF32]'
                }`}
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                Express Action Studio · No Multi-Page Forms
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
                {activeStudioTab === 'candidate'
                  ? 'Drop Your Resume in 60 Seconds.'
                  : 'Submit Your Hiring Mandate in 45 Seconds.'}
              </h2>
            </div>

            {/* Instant Switcher + Quick Track Trigger */}
            <div className="flex flex-wrap items-center gap-2">
              <div
                className={`inline-flex p-1.5 rounded-2xl border ${
                  isDark
                    ? 'bg-black/55 border-white/15'
                    : 'bg-white border-[1.5px] border-[#0D1017]'
                }`}
                role="tablist"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStudioTab === 'candidate'}
                  onClick={() => onTabChange('candidate')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-extrabold flex items-center gap-2 transition cursor-pointer ${
                    activeStudioTab === 'candidate'
                      ? 'bg-[#C8FF32] text-[#090B10]'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Candidate Apply</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeStudioTab === 'employer'}
                  onClick={() => onTabChange('employer')}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-display font-extrabold flex items-center gap-2 transition cursor-pointer ${
                    activeStudioTab === 'employer'
                      ? 'bg-[#FF6B4A] text-white'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Recruiter Mandate</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() =>
                  savedCreds
                    ? onOpenTracker(savedCreds.phone, savedCreds.dob)
                    : onOpenTracker()
                }
                className={`px-4 py-3 rounded-2xl text-xs font-display font-bold border flex items-center gap-2 cursor-pointer transition ${
                  isDark
                    ? 'bg-black/55 hover:bg-black/80 text-[#C8FF32] border-white/15'
                    : 'bg-white hover:bg-slate-50 text-[#0D1017] border-[1.5px] border-[#0D1017]'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>{savedCreds ? 'My Live Status' : 'Track Application'}</span>
              </button>
            </div>
          </div>

          {/* Inner Glass Card Containing Active Single-Screen Form */}
          <div
            className={`rounded-3xl p-5 sm:p-8 lg:p-10 transition-colors ${
              isDark
                ? 'bg-[#0F1320]/92 border border-white/15 shadow-2xl'
                : 'bg-white border-[1.5px] border-[#0D1017] shadow-[5px_5px_0px_0px_#0D1017]'
            }`}
          >
            {activeStudioTab === 'candidate' ? (
              <CandidateForm
                initialDomain={initialDomain}
                selectedRole={selectedRole}
                onClearSelectedRole={onClearSelectedRole}
                onCandidateSubmitted={onCandidateSubmitted}
                onTrackNow={(ph, db) => onOpenTracker(ph, db)}
              />
            ) : (
              <EmployerForm
                shortlistingTalent={shortlistingTalent}
                onClearShortlistTalent={onClearShortlistTalent}
                onMandateCreated={onMandateCreated}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
