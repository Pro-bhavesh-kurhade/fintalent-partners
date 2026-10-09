import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Specializations } from './components/Specializations';
import { CandidateForm } from './components/CandidateForm';
import { EmployerForm } from './components/EmployerForm';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { StatusTrackerModal } from './components/StatusTrackerModal';
import { AdminPortal } from './components/AdminPortal';

export default function App() {
  // Modal states
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [trackerPhone, setTrackerPhone] = useState('');
  const [trackerDob, setTrackerDob] = useState('');

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Pre-selected domain when clicked from specializations
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Check URL hash on load for #admin or #track
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setIsAdminOpen(true);
      } else if (window.location.hash === '#track') {
        setIsTrackerOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTrackerWithData = (phone: string, dob: string) => {
    setTrackerPhone(phone);
    setTrackerDob(dob);
    setIsTrackerOpen(true);
  };

  const handleSelectDomain = (domain: string) => {
    setSelectedDomain(domain);
    scrollToSection('candidate-form');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Header */}
      <Header
        onOpenTracker={() => setIsTrackerOpen(true)}
        onNavigateCandidate={() => scrollToSection('candidate-form')}
        onNavigateEmployer={() => scrollToSection('employer-form')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onCandidateClick={() => scrollToSection('candidate-form')}
          onEmployerClick={() => scrollToSection('employer-form')}
        />

        {/* Practice Domains & Specializations */}
        <Specializations onSelectDomain={handleSelectDomain} />

        {/* Candidate Resume Submission Form (Anchor: #candidate-form) */}
        <CandidateForm
          onTrackNow={handleOpenTrackerWithData}
          initialDomain={selectedDomain}
        />

        {/* Employer / CA Firm Requirement Form (Anchor: #employer-form) */}
        <EmployerForm />

        {/* Trust & FAQ Section */}
        <TrustSection />
      </main>

      {/* Global Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateCandidate={() => scrollToSection('candidate-form')}
        onNavigateEmployer={() => scrollToSection('employer-form')}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Candidate Status Tracker Modal */}
      <StatusTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        initialPhone={trackerPhone}
        initialDob={trackerDob}
        onSwitchToApply={() => scrollToSection('candidate-form')}
      />

      {/* Admin Portal Modal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}
