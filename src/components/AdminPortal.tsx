import React, { useState, useEffect } from 'react';
import { 
  X, Lock, ShieldCheck, Search, Filter, RefreshCw, 
  FileText, ExternalLink, MessageCircle, Phone, CheckCircle2, 
  Clock, AlertCircle, Building2, Users, Download, Edit3, 
  LogOut, Save, ChevronRight, LayoutDashboard, Database 
} from 'lucide-react';
import { 
  Candidate, FirmRequest, STAGES, 
  fetchAllCandidates, fetchAllFirmRequests, 
  updateCandidateStatus, updateFirmStatus 
} from '../lib/supabase';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fintalent_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('admin@fintalentpartners.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'candidates' | 'firms' | 'overview'>('candidates');

  // Data
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [firmRequests, setFirmRequests] = useState<FirmRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Filters & search for candidates
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterQualification, setFilterQualification] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Firm filter
  const [firmStatusFilter, setFirmStatusFilter] = useState('All');

  // Candidate editing notes modal
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Toast / update alert
  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadData();
    }
  }, [isAuthenticated, isOpen]);

  const loadData = async () => {
    setIsLoadingData(true);
    try {
      const [cands, firms] = await Promise.all([
        fetchAllCandidates(),
        fetchAllFirmRequests(),
      ]);
      setCandidates(cands);
      setFirmRequests(firms);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (adminEmail.trim() === 'admin@fintalentpartners.com' && adminPassword === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('fintalent_admin_auth', 'true');
    } else {
      setAuthError('Invalid credentials. Default: admin@fintalentpartners.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fintalent_admin_auth');
  };

  // Status update
  const handleStatusChange = async (candidateId: string, newStatus: string) => {
    try {
      setCandidates(prev =>
        prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c)
      );
      await updateCandidateStatus(candidateId, newStatus);
      showFeedback(`Updated status to "${newStatus}"! Live candidate tracker synchronized.`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showFeedback('Error updating status');
    }
  };

  const handleSaveNotes = async () => {
    if (!editingCandidate) return;
    try {
      setIsSavingNotes(true);
      const id = editingCandidate.id;
      setCandidates(prev =>
        prev.map(c => c.id === id ? { ...c, admin_notes: tempNotes } : c)
      );
      await updateCandidateStatus(id, editingCandidate.status, tempNotes);
      setEditingCandidate(null);
      showFeedback('HR internal remarks saved and synced live!');
    } catch (err) {
      console.error('Failed to save notes:', err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleFirmStatusChange = async (firmId: string, newStatus: string) => {
    try {
      setFirmRequests(prev =>
        prev.map(f => f.id === firmId ? { ...f, status: newStatus } : f)
      );
      await updateFirmStatus(firmId, newStatus);
      showFeedback(`Firm request status set to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update firm status:', err);
    }
  };

  const showFeedback = (msg: string) => {
    setUpdateFeedback(msg);
    setTimeout(() => setUpdateFeedback(null), 3500);
  };

  // Export CSV
  const handleExportCsv = () => {
    if (candidates.length === 0) return;
    const headers = ['Full Name', 'Email', 'Phone', 'DOB', 'Qualification', 'Domain', 'Experience', 'Location', 'Expected CTC', 'Status', 'Resume URL', 'Notes'];
    const rows = filteredCandidates.map(c => [
      `"${c.full_name}"`,
      `"${c.email}"`,
      `"${c.phone}"`,
      `"${c.dob}"`,
      `"${c.qualification}"`,
      `"${c.domain}"`,
      `"${c.experience_years}"`,
      `"${c.current_location}"`,
      `"${c.expected_ctc}"`,
      `"${c.status}"`,
      `"${c.resume_url}"`,
      `"${(c.admin_notes || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FinTalent_Candidates_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Candidate filtering
  const filteredCandidates = candidates.filter(c => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      c.full_name.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.current_location.toLowerCase().includes(query);

    const matchesDomain = filterDomain === 'All' || c.domain === filterDomain;
    const matchesQual = filterQualification === 'All' || c.qualification === filterQualification;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;

    return matchesSearch && matchesDomain && matchesQual && matchesStatus;
  });

  // Firm filtering
  const filteredFirms = firmRequests.filter(f => {
    return firmStatusFilter === 'All' || f.status === firmStatusFilter;
  });

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-portal-title"
    >
      <div className="rounded-3xl max-w-7xl w-full h-[95vh] flex flex-col bg-white text-slate-900 shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Top Header Bar */}
        <div className="bg-[#101426] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4563FF] to-[#D4FF5A] flex items-center justify-center text-[#101426] font-display font-black text-lg">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-portal-title" className="font-display font-bold text-base text-white">FinTalent Partners Admin Portal</h2>
                <span className="text-[10px] bg-[#10B981]/20 text-[#10B981] font-mono px-2 py-0.5 rounded-full border border-[#10B981]/30">
                  Supabase Live
                </span>
              </div>
              <p className="text-xs text-slate-400">Executive Pipeline & Mandates Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition cursor-pointer min-h-[36px]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Update feedback toast */}
        {updateFeedback && (
          <div className="absolute top-16 right-6 z-50 bg-[#10B981] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{updateFeedback}</span>
          </div>
        )}

        {/* Body Container */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-12 flex items-center justify-center bg-slate-50">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#101426] text-[#D4FF5A] mx-auto flex items-center justify-center">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-display">Staff Access Portal</h3>
                <p className="text-xs text-slate-500">
                  Authenticate to manage candidate profiles, update stages, and view firm mandates.
                </p>
              </div>

              {authError && (
                <div role="alert" className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="admin-email-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="admin-email-input"
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#4563FF] focus:ring-2 focus:ring-[#4563FF]/20 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <input
                    id="admin-password-input"
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#4563FF] focus:ring-2 focus:ring-[#4563FF]/20 outline-none"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Default Authorized Credentials:</span>
                  <div className="mt-1 font-mono text-[#4563FF] font-bold">
                    admin@fintalentpartners.com / admin123
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#101426] hover:bg-slate-800 text-white font-display font-bold py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer min-h-[48px] focus-visible:ring-2 focus-visible:ring-[#4563FF] outline-none"
                >
                  Authenticate & Open Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* SaaS Dashboard with Sidebar */
          <div className="flex-1 flex overflow-hidden">
            
            {/* Sidebar */}
            <aside className="w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col justify-between hidden md:flex shrink-0">
              <div className="space-y-2">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Navigation
                </div>

                <button
                  onClick={() => setActiveTab('candidates')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'candidates'
                      ? 'bg-[#101426] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#4563FF]" />
                    <span>Candidate Pipeline</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'candidates' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {candidates.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('firms')}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'firms'
                      ? 'bg-[#101426] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-[#10B981]" />
                    <span>Employer Mandates</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === 'firms' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {firmRequests.length}
                  </span>
                </button>
              </div>

              {/* Sidebar bottom */}
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Database className="w-3.5 h-3.5 text-[#4563FF]" />
                  <span>Cloud Database</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Connected to Supabase PostgreSQL and Resumes Storage.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden bg-white">
              
              {/* Mobile Tab Switcher */}
              <div className="md:hidden flex items-center gap-2 p-3 bg-slate-100 border-b border-slate-200">
                <button
                  onClick={() => setActiveTab('candidates')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                    activeTab === 'candidates' ? 'bg-[#101426] text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Candidates ({candidates.length})
                </button>
                <button
                  onClick={() => setActiveTab('firms')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                    activeTab === 'firms' ? 'bg-[#101426] text-white' : 'bg-white text-slate-700'
                  }`}
                >
                  Firms ({firmRequests.length})
                </button>
              </div>

              {/* Action Bar */}
              <div className="px-6 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {activeTab === 'candidates' ? 'Candidates Registry' : 'Employer Mandates'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    Showing {activeTab === 'candidates' ? filteredCandidates.length : filteredFirms.length} records
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {activeTab === 'candidates' && (
                    <button
                      onClick={handleExportCsv}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#4563FF]" />
                      <span>Export CSV</span>
                    </button>
                  )}
                  <button
                    onClick={loadData}
                    disabled={isLoadingData}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4563FF] hover:bg-[#324fec] text-white rounded-lg text-xs font-bold transition cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                    <span>Sync Live</span>
                  </button>
                </div>
              </div>

              {/* TAB 1: CANDIDATES */}
              {activeTab === 'candidates' && (
                <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-4">
                  {/* Search and Filters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-[220px] relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        placeholder="Search candidate by name, phone, email, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#4563FF] focus:ring-1 focus:ring-[#4563FF] outline-none"
                      />
                    </div>

                    <select
                      value={filterDomain}
                      onChange={(e) => setFilterDomain(e.target.value)}
                      className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none cursor-pointer"
                    >
                      <option value="All">All Domains</option>
                      <option value="Statutory Audit & Assurance">Statutory Audit</option>
                      <option value="Direct Taxation & Litigations">Direct Tax</option>
                      <option value="Indirect Tax / GST">Indirect Tax / GST</option>
                      <option value="FP&A & Corporate Finance">FP&A & Corporate Finance</option>
                      <option value="Accounting, Finalization & ERP (Tally/SAP)">Accounting & ERP</option>
                    </select>

                    <select
                      value={filterQualification}
                      onChange={(e) => setFilterQualification(e.target.value)}
                      className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none cursor-pointer"
                    >
                      <option value="All">All Qualifications</option>
                      <option value="Qualified CA">Qualified CA</option>
                      <option value="CA Inter / Semi-Qualified">CA Inter</option>
                      <option value="CA Article Assistant / Trainee">CA Article</option>
                      <option value="CMA (Cost Accountant)">CMA</option>
                      <option value="MBA (Finance)">MBA Finance</option>
                    </select>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-700 outline-none cursor-pointer"
                    >
                      <option value="All">All Statuses</option>
                      {STAGES.map(s => (
                        <option key={s.id} value={s.label}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Candidates Table */}
                  <div className="flex-1 overflow-auto rounded-2xl border border-slate-200">
                    {filteredCandidates.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 space-y-2">
                        <Users className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="font-semibold text-sm">No candidates match your criteria.</p>
                      </div>
                    ) : (
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-slate-100 text-slate-700 sticky top-0 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 z-10">
                          <tr>
                            <th className="py-3 px-4">Candidate & Contact</th>
                            <th className="py-3 px-4">Qualification</th>
                            <th className="py-3 px-4">Domain & Exp</th>
                            <th className="py-3 px-4">DOB</th>
                            <th className="py-3 px-4">Comp / Location</th>
                            <th className="py-3 px-4">Resume</th>
                            <th className="py-3 px-4">Pipeline Status</th>
                            <th className="py-3 px-4 text-right">Remarks</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredCandidates.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50 transition">
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900 text-sm">{c.full_name}</div>
                                <div className="text-slate-500 font-mono text-[11px] mt-0.5">
                                  +91 {c.phone} · {c.email}
                                </div>
                              </td>

                              <td className="py-3 px-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold border border-slate-200 text-[11px]">
                                  {c.qualification}
                                </span>
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-semibold text-slate-800">{c.domain}</div>
                                <div className="text-slate-500 text-[11px]">{c.experience_years} years exp</div>
                              </td>

                              <td className="py-3 px-4 font-mono text-slate-600">
                                {c.dob}
                              </td>

                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900">{c.expected_ctc}</div>
                                <div className="text-slate-500 text-[11px]">{c.current_location}</div>
                              </td>

                              <td className="py-3 px-4">
                                {c.resume_url ? (
                                  <a
                                    href={c.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#4563FF]/10 hover:bg-[#4563FF]/20 text-[#4563FF] font-bold rounded-lg border border-[#4563FF]/20 transition"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>PDF</span>
                                    <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                ) : (
                                  <span className="text-slate-400 italic">No File</span>
                                )}
                              </td>

                              <td className="py-3 px-4">
                                <select
                                  value={c.status || 'Application Received'}
                                  onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                  className={`w-full py-1.5 pl-2.5 pr-6 rounded-lg text-xs font-bold border outline-none cursor-pointer transition ${
                                    c.status?.includes('Placed')
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : c.status?.includes('Interview')
                                      ? 'bg-purple-50 text-purple-800 border-purple-300'
                                      : c.status?.includes('Shortlisted')
                                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                                      : c.status?.includes('Screening')
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : 'bg-slate-50 text-slate-800 border-slate-300'
                                  }`}
                                >
                                  {STAGES.map(s => (
                                    <option key={s.id} value={s.label}>
                                      {s.label}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => {
                                    setEditingCandidate(c);
                                    setTempNotes(c.admin_notes || '');
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold transition cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>{c.admin_notes ? 'Notes ✓' : 'Add Note'}</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: FIRMS */}
              {activeTab === 'firms' && (
                <div className="flex-1 overflow-auto p-6 space-y-4">
                  {filteredFirms.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 space-y-2">
                      <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="font-semibold text-sm">No firm mandates submitted yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredFirms.map((f) => (
                        <div
                          key={f.id}
                          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                {f.org_type || 'CA / Audit Firm'}
                              </span>
                              <h4 className="text-base font-bold text-slate-900 mt-1">
                                {f.organization_name}
                              </h4>
                            </div>

                            <select
                              value={f.status || 'Open'}
                              onChange={(e) => handleFirmStatusChange(f.id, e.target.value)}
                              className={`text-xs font-bold py-1 px-2.5 rounded-lg border outline-none cursor-pointer ${
                                f.status === 'Closed'
                                  ? 'bg-slate-100 text-slate-600 border-slate-300'
                                  : f.status === 'In Progress'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              }`}
                            >
                              <option value="Open">Open</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Role Required</span>
                              <span className="font-bold text-slate-800">{f.role_needed}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Practice Area</span>
                              <span className="font-semibold text-slate-700">{f.domain}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">Budget</span>
                              <span className="font-semibold text-slate-700">{f.budget_range}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[10px] uppercase">City</span>
                              <span className="font-semibold text-slate-700">{f.city}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div className="text-xs">
                              <span className="text-slate-500">{f.contact_person}</span>
                              <div className="font-mono text-slate-900 font-bold mt-0.5">
                                +91 {f.contact_phone}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={`tel:+91${f.contact_phone}`}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                title="Call Contact Person"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              <a
                                href={`https://wa.me/91${f.contact_phone}?text=${encodeURIComponent(
                                  `Hi ${f.contact_person}, this is FinTalent Partners following up on your requirement for ${f.role_needed} at ${f.organization_name}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-xl bg-[#10B981] text-white hover:bg-[#0ea372] transition"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4 fill-current" />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </main>
          </div>
        )}

        {/* Modal for Editing Internal Remarks */}
        {editingCandidate && (
          <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-40">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-slate-900 text-base">
                    HR Internal Remarks for {editingCandidate.full_name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Visible to candidate in their live application tracker.
                  </p>
                </div>
                <button
                  onClick={() => setEditingCandidate(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                rows={4}
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="e.g. Cleared technical screening. Interview scheduled with Partner at Deloitte Alumni CA Firm on Friday 3:00 PM."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-[#4563FF] focus:ring-1 focus:ring-[#4563FF] outline-none text-slate-900"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setEditingCandidate(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-5 py-2.5 text-xs font-bold bg-[#4563FF] hover:bg-[#324fec] text-white rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingNotes ? 'Saving...' : 'Save & Sync Remarks'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
