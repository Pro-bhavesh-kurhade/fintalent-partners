import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { LiveExchange } from './components/LiveExchange';
import { ActionStudio } from './components/ActionStudio';
import { Specializations } from './components/Specializations';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';

const StatusTrackerModal = lazy(() =>
  import('./components/StatusTrackerModal').then((m) => ({ default: m.StatusTrackerModal }))
);
const AdminPortal = lazy(() =>
  import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);
import {
  DEFAULT_SAMPLE_FIRMS,
  DEFAULT_VETTED_TALENT,
  FirmRequest,
  VettedTalentProfile,
  Candidate,
  fetchAllCandidates,
  fetchAllFirmRequests,
  buildPublicTalentPool,
} from './lib/supabase';

function MainApp() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dual persona state ('candidate' | 'recruiter') synced cleanly across Hero, Live Board & Studio
  const [persona, setPersona] = useState<'candidate' | 'recruiter'>('candidate');
  const [activeBoardTab, setActiveBoardTab] = useState<'jobs' | 'talent'>('jobs');
  const [activeStudioTab, setActiveStudioTab] = useState<'candidate' | 'employer'>('candidate');

  // Shared instant search & domain filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');

  // Live Marketplace Data
  const [openRoles, setOpenRoles] = useState<FirmRequest[]>(DEFAULT_SAMPLE_FIRMS);
  const [vettedTalent, setVettedTalent] = useState<VettedTalentProfile[]>(DEFAULT_VETTED_TALENT);

  // Fast-fill context passed when clicking a job or candidate card
  const [formInitialDomain, setFormInitialDomain] = useState<string | null>(null);
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<FirmRequest | null>(null);
  const [shortlistingTalent, setShortlistingTalent] = useState<VettedTalentProfile | null>(null);

  // Modals
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerPhone, setTrackerPhone] = useState('');
  const [trackerDob, setTrackerDob] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const syncMarketplaceData = useCallback(async () => {
    const [firms, cands] = await Promise.all([
      fetchAllFirmRequests(),
      fetchAllCandidates(),
    ]);
    setOpenRoles(firms);
    setVettedTalent(buildPublicTalentPool(cands));
  }, []);

  useEffect(() => {
    syncMarketplaceData();
  }, [syncMarketplaceData]);

  // URL Hash support (#admin, #track, #candidate-form, #employer-form)
  useEffect(() => {
    const handleHash = () => {
      const h = window.location.hash;
      if (h === '#admin') {
        setIsAdminOpen(true);
      } else if (h === '#track') {
        setIsTrackerOpen(true);
      } else if (h === '#employer-form') {
        setPersona('recruiter');
        setActiveStudioTab('employer');
        document.getElementById('action-studio')?.scrollIntoView({ behavior: 'smooth' });
      } else if (h === '#candidate-form') {
        setPersona('candidate');
        setActiveStudioTab('candidate');
        document.getElementById('action-studio')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollTo = (id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const handlePersonaSwitch = (mode: 'candidate' | 'recruiter') => {
    setPersona(mode);
    setActiveBoardTab(mode === 'candidate' ? 'jobs' : 'talent');
    setActiveStudioTab(mode === 'candidate' ? 'candidate' : 'employer');
  };

  const handleQuickApplyRole = (role: FirmRequest) => {
    setSelectedRoleForApply(role);
    setFormInitialDomain(role.domain);
    setActiveStudioTab('candidate');
    scrollTo('action-studio');
  };

  const handleShortlistTalent = (profile: VettedTalentProfile) => {
    setShortlistingTalent(profile);
    setActiveStudioTab('employer');
    scrollTo('action-studio');
  };

  const handleSelectDomainCard = (domain: string) => {
    setFormInitialDomain(domain);
    setActiveStudioTab('candidate');
    scrollTo('action-studio');
  };

  const handleOpenTracker = (ph = '', db = '') => {
    setTrackerPhone(ph);
    setTrackerDob(db);
    setIsTrackerOpen(true);
  };

  const handleCandidateSubmitted = (newCand: Candidate) => {
    setVettedTalent((prev) => buildPublicTalentPool([newCand]).slice(0, 1).concat(prev));
  };

  const handleMandateCreated = (newMandate: FirmRequest) => {
    setOpenRoles((prev) => [newMandate, ...prev]);
  };

  const activeOpenRolesCount = openRoles.filter((r) => r.status !== 'Closed').length;

  return (
    <div
      className={`min-h-screen font-sans antialiased flex flex-col overflow-x-hidden transition-colors duration-200 ${
        isDark
          ? 'bg-[#090B10] studio-grain text-slate-100 selection:bg-[#C8FF32] selection:text-[#090B10]'
          : 'bg-[#FAF7F0] studio-grain-light text-[#0D1017] selection:bg-[#C8FF32] selection:text-[#0D1017]'
      }`}
    >
      {/* Floating Studio Navigation Pill */}
      <Header
        openRolesCount={activeOpenRolesCount}
        onOpenTracker={() => handleOpenTracker()}
        onExploreJobs={() => {
          setPersona('candidate');
          setActiveBoardTab('jobs');
          scrollTo('live-exchange');
        }}
        onBrowseTalent={() => {
          setPersona('recruiter');
          setActiveBoardTab('talent');
          scrollTo('live-exchange');
        }}
        onNavigateCandidate={() => {
          setActiveStudioTab('candidate');
          scrollTo('action-studio');
        }}
        onNavigateEmployer={() => {
          setActiveStudioTab('employer');
          scrollTo('action-studio');
        }}
      />

      <main className="flex-1">
        {/* 1. Architectural Hero + Instant Role/Talent Finder */}
        <Hero
          persona={persona}
          onPersonaChange={handlePersonaSwitch}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDomainFilter={selectedDomainFilter}
          onQuickDomainSelect={(d) => {
            setSelectedDomainFilter(d);
            scrollTo('live-exchange');
          }}
          onJumpToExchange={() => scrollTo('live-exchange')}
          onCandidateApplyClick={() => {
            setActiveStudioTab('candidate');
            scrollTo('action-studio');
          }}
          onEmployerPostClick={() => {
            setActiveStudioTab('employer');
            scrollTo('action-studio');
          }}
          onTrackerClick={() => handleOpenTracker()}
          openRolesCount={activeOpenRolesCount}
          vettedTalentCount={vettedTalent.length}
        />

        {/* 2. High-Contrast Kinetic Ticker */}
        <CredibilityStrip />

        {/* 3. Live Dual Marketplace Board (Jobs for Candidates <-> Vetted Pool for Recruiters) */}
        <LiveExchange
          activeBoardTab={activeBoardTab}
          onTabChange={(tab) => {
            setActiveBoardTab(tab);
            setPersona(tab === 'jobs' ? 'candidate' : 'recruiter');
          }}
          openRoles={openRoles}
          vettedTalent={vettedTalent}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDomain={selectedDomainFilter}
          onDomainChange={setSelectedDomainFilter}
          onQuickApplyRole={handleQuickApplyRole}
          onShortlistTalent={handleShortlistTalent}
        />

        {/* 4. Single-Screen Express Action Studio (60s Apply / 45s Mandate / 1-Tap Tracker) */}
        <ActionStudio
          activeStudioTab={activeStudioTab}
          onTabChange={setActiveStudioTab}
          initialDomain={formInitialDomain}
          selectedRole={selectedRoleForApply}
          onClearSelectedRole={() => setSelectedRoleForApply(null)}
          shortlistingTalent={shortlistingTalent}
          onClearShortlistTalent={() => setShortlistingTalent(null)}
          onCandidateSubmitted={handleCandidateSubmitted}
          onMandateCreated={handleMandateCreated}
          onOpenTracker={handleOpenTracker}
        />

        {/* 5. 6 Practice Verticals Bento Grid */}
        <Specializations onSelectDomain={handleSelectDomainCard} />

        {/* 6. Practice Principal Desk (Amii Ma'am) & Snappy FAQ */}
        <TrustSection />
      </main>

      {/* 7. Sleek Studio Footer + Staff Console Access */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onExploreJobs={() => {
          setActiveBoardTab('jobs');
          scrollTo('live-exchange');
        }}
        onBrowseTalent={() => {
          setActiveBoardTab('talent');
          scrollTo('live-exchange');
        }}
        onNavigateCandidate={() => {
          setActiveStudioTab('candidate');
          scrollTo('action-studio');
        }}
        onNavigateEmployer={() => {
          setActiveStudioTab('employer');
          scrollTo('action-studio');
        }}
        onOpenTracker={() => handleOpenTracker()}
      />

      <Suspense fallback={null}>
        {isTrackerOpen && (
          <StatusTrackerModal
            isOpen={isTrackerOpen}
            onClose={() => {
              setIsTrackerOpen(false);
              if (window.location.hash === '#track') {
                window.history.pushState(null, '', window.location.pathname);
              }
            }}
            initialPhone={trackerPhone}
            initialDob={trackerDob}
            onSwitchToApply={() => {
              setActiveStudioTab('candidate');
              scrollTo('action-studio');
            }}
          />
        )}

        {isAdminOpen && (
          <AdminPortal
            isOpen={isAdminOpen}
            onClose={() => {
              setIsAdminOpen(false);
              if (window.location.hash === '#admin') {
                window.history.pushState(null, '', window.location.pathname);
              }
            }}
            onDataChanged={syncMarketplaceData}
          />
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
