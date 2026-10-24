import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Header, AppRoute } from './components/Header';
import { Hero } from './components/Hero';
import { CredibilityStrip } from './components/CredibilityStrip';
import { HomeGatewayCards } from './components/HomeGatewayCards';
import { SubPageBar } from './components/SubPageBar';
import { LiveExchange } from './components/LiveExchange';
import { ActionStudio } from './components/ActionStudio';
import { Specializations } from './components/Specializations';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
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

const StatusTrackerModal = lazy(() =>
  import('./components/StatusTrackerModal').then((m) => ({ default: m.StatusTrackerModal }))
);
const AdminPortal = lazy(() =>
  import('./components/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);

const APP_BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function parseRouteFromLocation(): AppRoute {
  const pathname = window.location.pathname;
  const appPath = APP_BASE_PATH && pathname.startsWith(`${APP_BASE_PATH}/`)
    ? pathname.slice(APP_BASE_PATH.length)
    : pathname;
  const path = appPath.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (path === 'jobs') return 'jobs';
  if (path === 'talent') return 'talent';
  if (path === 'apply') return 'apply';
  if (path === 'hire') return 'hire';
  if (path === 'domains') return 'domains';
  if (path === 'about') return 'about';

  const hash = window.location.hash.toLowerCase();
  if (hash === '#candidate-form') return 'apply';
  if (hash === '#employer-form') return 'hire';
  if (hash === '#specializations') return 'domains';
  if (hash === '#live-exchange') return 'jobs';
  return 'home';
}

function MainApp() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [currentPage, setCurrentPage] = useState<AppRoute>(() =>
    typeof window !== 'undefined' ? parseRouteFromLocation() : 'home'
  );

  // Shared live board search & domain filter (preserved across sub-pages)
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');

  // Live Marketplace Data
  const [openRoles, setOpenRoles] = useState<FirmRequest[]>(DEFAULT_SAMPLE_FIRMS);
  const [vettedTalent, setVettedTalent] = useState<VettedTalentProfile[]>(DEFAULT_VETTED_TALENT);

  // Pre-fill context passed when clicking a job or candidate card
  const [formInitialDomain, setFormInitialDomain] = useState<string | null>(null);
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<FirmRequest | null>(null);
  const [shortlistingTalent, setShortlistingTalent] = useState<VettedTalentProfile | null>(null);

  // Modals
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerPhone, setTrackerPhone] = useState('');
  const [trackerDob, setTrackerDob] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const navigateTo = useCallback((page: AppRoute) => {
    setCurrentPage(page);
    const targetPath = `${APP_BASE_PATH}${page === 'home' ? '/' : `/${page}`}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

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

  // Sync browser Back/Forward + URL hashes (#admin / #track)
  useEffect(() => {
    const syncFromUrl = () => {
      const h = window.location.hash;
      if (h === '#admin') {
        setIsAdminOpen(true);
        return;
      }
      if (h === '#track') {
        setIsTrackerOpen(true);
        return;
      }
      setCurrentPage(parseRouteFromLocation());
    };
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    window.addEventListener('hashchange', syncFromUrl);
    return () => {
      window.removeEventListener('popstate', syncFromUrl);
      window.removeEventListener('hashchange', syncFromUrl);
    };
  }, []);

  const handleQuickApplyRole = (role: FirmRequest) => {
    setSelectedRoleForApply(role);
    setFormInitialDomain(role.domain);
    navigateTo('apply');
  };

  const handleShortlistTalent = (profile: VettedTalentProfile) => {
    setShortlistingTalent(profile);
    navigateTo('hire');
  };

  const handleSelectDomainCard = (domain: string) => {
    setFormInitialDomain(domain);
    navigateTo('apply');
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
      {/* Persistent Top Studio Header */}
      <Header
        currentPage={currentPage}
        openRolesCount={activeOpenRolesCount}
        onNavigate={navigateTo}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Focused Multi-Page View Container */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {/* 1. CLEAN, SHORT, TO-THE-POINT MAIN HOME PAGE */}
            {currentPage === 'home' && (
              <>
                <Hero
                  openRolesCount={activeOpenRolesCount}
                  vettedTalentCount={vettedTalent.length}
                  onNavigate={navigateTo}
                  onTrackerClick={() => handleOpenTracker()}
                />
                <CredibilityStrip />
                <HomeGatewayCards
                  openRolesCount={activeOpenRolesCount}
                  vettedTalentCount={vettedTalent.length}
                  onNavigate={(target) => navigateTo(target)}
                />
              </>
            )}

            {/* 2. DEDICATED SUB-PAGE: LIVE OPEN ROLES (FOR CANDIDATES) */}
            {currentPage === 'jobs' && (
              <>
                <SubPageBar
                  badge="Open Finance Mandates"
                  secondaryLabel="Skip & Upload CV Directly (60s)"
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('apply')}
                />
                <LiveExchange
                  activeBoardTab="jobs"
                  onTabChange={(tab) => navigateTo(tab === 'jobs' ? 'jobs' : 'talent')}
                  openRoles={openRoles}
                  vettedTalent={vettedTalent}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedDomain={selectedDomainFilter}
                  onDomainChange={setSelectedDomainFilter}
                  onQuickApplyRole={handleQuickApplyRole}
                  onShortlistTalent={handleShortlistTalent}
                />
              </>
            )}

            {/* 3. DEDICATED SUB-PAGE: PRE-VETTED TALENT POOL (FOR RECRUITERS) */}
            {currentPage === 'talent' && (
              <>
                <SubPageBar
                  badge="Pre-Vetted Talent Pool"
                  secondaryLabel="Post Custom Hiring Mandate (45s)"
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('hire')}
                />
                <LiveExchange
                  activeBoardTab="talent"
                  onTabChange={(tab) => navigateTo(tab === 'jobs' ? 'jobs' : 'talent')}
                  openRoles={openRoles}
                  vettedTalent={vettedTalent}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedDomain={selectedDomainFilter}
                  onDomainChange={setSelectedDomainFilter}
                  onQuickApplyRole={handleQuickApplyRole}
                  onShortlistTalent={handleShortlistTalent}
                />
              </>
            )}

            {/* 4. DEDICATED SUB-PAGE: 60-SECOND CANDIDATE FAST APPLY */}
            {currentPage === 'apply' && (
              <>
                <SubPageBar
                  badge="Candidate 60s Fast Apply"
                  secondaryLabel={`Browse ${activeOpenRolesCount} Open Roles`}
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('jobs')}
                />
                <ActionStudio
                  activeStudioTab="candidate"
                  onTabChange={(tab) => navigateTo(tab === 'candidate' ? 'apply' : 'hire')}
                  initialDomain={formInitialDomain}
                  selectedRole={selectedRoleForApply}
                  onClearSelectedRole={() => setSelectedRoleForApply(null)}
                  shortlistingTalent={shortlistingTalent}
                  onClearShortlistTalent={() => setShortlistingTalent(null)}
                  onCandidateSubmitted={handleCandidateSubmitted}
                  onMandateCreated={handleMandateCreated}
                  onOpenTracker={handleOpenTracker}
                />
              </>
            )}

            {/* 5. DEDICATED SUB-PAGE: 45-SECOND RECRUITER MANDATE DESK */}
            {currentPage === 'hire' && (
              <>
                <SubPageBar
                  badge="Recruiter 48h Mandate Desk"
                  secondaryLabel={`Browse ${vettedTalent.length} Screened Profiles`}
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('talent')}
                />
                <ActionStudio
                  activeStudioTab="employer"
                  onTabChange={(tab) => navigateTo(tab === 'candidate' ? 'apply' : 'hire')}
                  initialDomain={formInitialDomain}
                  selectedRole={selectedRoleForApply}
                  onClearSelectedRole={() => setSelectedRoleForApply(null)}
                  shortlistingTalent={shortlistingTalent}
                  onClearShortlistTalent={() => setShortlistingTalent(null)}
                  onCandidateSubmitted={handleCandidateSubmitted}
                  onMandateCreated={handleMandateCreated}
                  onOpenTracker={handleOpenTracker}
                />
              </>
            )}

            {/* 6. DEDICATED SUB-PAGE: 6 FINANCE VERTICALS & COMPENSATION */}
            {currentPage === 'domains' && (
              <>
                <SubPageBar
                  badge="6 Specialized Verticals"
                  secondaryLabel="Meet Practice Principal & FAQs"
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('about')}
                />
                <Specializations onSelectDomain={handleSelectDomainCard} />
              </>
            )}

            {/* 7. DEDICATED SUB-PAGE: PRACTICE PRINCIPAL (Ami Bhanushali) & FAQS */}
            {currentPage === 'about' && (
              <>
                <SubPageBar
                  badge="Leadership & Quick FAQs"
                  secondaryLabel="Explore 6 Practice Domains"
                  onBackHome={() => navigateTo('home')}
                  onSecondaryAction={() => navigateTo('domains')}
                />
                <TrustSection />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Clean Compact Studio Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenAdmin={() => setIsAdminOpen(true)}
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
            onSwitchToApply={() => navigateTo('apply')}
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
