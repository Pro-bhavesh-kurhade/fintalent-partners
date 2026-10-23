import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Search,
  RefreshCw,
  FileText,
  ExternalLink,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  Download,
  Edit3,
  LogOut,
  Save,
  Plus,
} from 'lucide-react';
import {
  Candidate,
  FirmRequest,
  STAGES,
  PRACTICE_DOMAINS,
  QUALIFICATIONS,
  ORG_TYPES,
  fetchAllCandidates,
  fetchAllFirmRequests,
  updateCandidateStatus,
  updateFirmStatus,
  submitFirmRequirement,
} from '../lib/supabase';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('fintalent_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState('admin@fintalentpartners.com');
  const [adminPassword, setAdminPassword] = useState('admin123');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'candidates' | 'firms'>('candidates');

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [firmRequests, setFirmRequests] = useState<FirmRequest[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterQualification, setFilterQualification] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [firmStatusFilter, setFirmStatusFilter] = useState('All');

  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [tempNotes, setTempNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  // Quick Add Role Drawer inside Admin
  const [showNewRoleModal, setShowNewRoleModal] = useState(false);
  const [newOrg, setNewOrg] = useState('');
  const [newOrgType, setNewOrgType] = useState<string>(ORG_TYPES[0]);
  const [newRole, setNewRole] = useState('');
  const [newDomain, setNewDomain] = useState<string>(PRACTICE_DOMAINS[0]);
  const [newBudget, setNewBudget] = useState('14 - 20 LPA');
  const [newCity, setNewCity] = useState('Mumbai (BKC)');
  const [newContact, setNewContact] = useState("Amii Ma'am Desk");
  const [newPhone, setNewPhone] = useState('9821262613');

  const [updateFeedback, setUpdateFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
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
    } finally {
      setIsLoadingData(false);
    }
  };

  const showFeedback = (msg: string) => {
    setUpdateFeedback(msg);
    setTimeout(() => setUpdateFeedback(null), 3200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (adminEmail.trim() === 'admin@fintalentpartners.com' && adminPassword === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('fintalent_admin_auth', 'true');
    } else {
      setAuthError('Invalid credentials. Use admin@fintalentpartners.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('fintalent_admin_auth');
  };

  const handleStatusChange = async (candidateId: string, newStatus: string) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
    await updateCandidateStatus(candidateId, newStatus);
    onDataChanged?.();
    showFeedback(`Stage synced to "${newStatus}"`);
  };

  const handleSaveNotes = async () => {
    if (!editingCandidate) return;
    setIsSavingNotes(true);
    const id = editingCandidate.id;
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, admin_notes: tempNotes } : c))
    );
    await updateCandidateStatus(id, editingCandidate.status, tempNotes);
    setEditingCandidate(null);
    setIsSavingNotes(false);
    showFeedback('HR note synced live to Candidate Tracker!');
  };

  const handleFirmStatusChange = async (firmId: string, newStatus: string) => {
    setFirmRequests((prev) =>
      prev.map((f) => (f.id === firmId ? { ...f, status: newStatus } : f))
    );
    await updateFirmStatus(firmId, newStatus);
    onDataChanged?.();
    showFeedback(`Mandate status set to ${newStatus}`);
  };

  const handlePublishNewRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrg.trim() || !newRole.trim()) return;
    const res = await submitFirmRequirement({
      organization_name: newOrg.trim(),
      org_type: newOrgType,
      contact_person: newContact.trim() || "Amii Ma'am Desk",
      contact_phone: newPhone.trim() || '9821262613',
      role_needed: newRole.trim(),
      domain: newDomain,
      budget_range: newBudget.trim() || 'Open to discussion',
      city: newCity.trim() || 'Mumbai',
    });
    if (res.data) {
      setFirmRequests((prev) => [res.data, ...prev]);
      onDataChanged?.();
      setShowNewRoleModal(false);
      setNewOrg('');
      setNewRole('');
      showFeedback('New live role published to Open Roles Board!');
    }
  };

  const filteredCandidates = candidates.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.full_name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.current_location.toLowerCase().includes(q);
    const matchesDomain = filterDomain === 'All' || c.domain === filterDomain;
    const matchesQual = filterQualification === 'All' || c.qualification === filterQualification;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesDomain && matchesQual && matchesStatus;
  });

  const filteredFirms = firmRequests.filter(
    (f) => firmStatusFilter === 'All' || f.status === firmStatusFilter
  );

  const handleExportCsv = () => {
    if (filteredCandidates.length === 0) return;
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'DOB',
      'Qualification',
      'Domain',
      'Experience',
      'Location',
      'Expected CTC',
      'Status',
      'Resume URL',
      'Notes',
    ];
    const rows = filteredCandidates.map((c) => [
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
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute(
      'download',
      `FinTalent_Candidates_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  const activePipelineCount = candidates.filter(
    (c) => c.status?.includes('Shortlisted') || c.status?.includes('Interview')
  ).length;
  const placedCount = candidates.filter((c) => c.status?.includes('Placed')).length;
  const openMandatesCount = firmRequests.filter((f) => f.status !== 'Closed').length;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-console-title"
    >
      <div className="rounded-3xl max-w-7xl w-full h-[94vh] flex flex-col bg-[#FAF7F0] text-[#0D1017] border-2 border-[#0D1017] shadow-2xl overflow-hidden relative">
        {/* Top Command Header */}
        <div className="bg-[#0D1017] text-white px-5 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C8FF32] text-[#090B10] flex items-center justify-center font-display font-extrabold text-base">
              FT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="admin-console-title" className="font-display font-extrabold text-base sm:text-lg">
                  Staff Recruitment Command Console
                </h2>
                <span className="text-[10px] font-mono bg-[#12B886]/20 text-[#12B886] px-2 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Manage candidates, sync live status notes &amp; publish open mandates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-white/8 hover:bg-white/15 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-white/10 flex items-center justify-center cursor-pointer"
              aria-label="Close Staff Console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {updateFeedback && (
          <div className="absolute top-16 right-6 z-50 bg-[#0D1017] text-[#C8FF32] border border-[#C8FF32]/40 px-4 py-2.5 rounded-xl text-xs font-mono font-bold shadow-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#12B886]" />
            <span>{updateFeedback}</span>
          </div>
        )}

        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border-[1.5px] border-[#0D1017] shadow-[6px_6px_0px_0px_#0D1017] space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-[#0D1017] text-[#C8FF32] mx-auto flex items-center justify-center">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-display font-extrabold text-2xl">
                  Authorized Staff Sign-In
                </h3>
                <p className="text-xs text-slate-600">
                  Access live candidate applications, resumes &amp; firm mandates.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Staff Email</label>
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#3B5BFF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Access Pin / Password</label>
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#3B5BFF]"
                  />
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F0] border border-slate-200 text-[11px] font-mono">
                  Demo Staff Key: <strong>admin@fintalentpartners.com / admin123</strong>
                </div>
                <button
                  type="submit"
                  className="neo-btn-pop w-full py-3.5 rounded-xl bg-[#C8FF32] text-[#090B10] border-[1.5px] border-[#0D1017] font-display font-extrabold text-sm cursor-pointer"
                >
                  Open Staff Console →
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top KPI & Tab Bar */}
            <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('candidates')}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold flex items-center gap-2 cursor-pointer transition ${
                    activeTab === 'candidates'
                      ? 'bg-[#0D1017] text-[#C8FF32]'
                      : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Candidates ({candidates.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('firms')}
                  className={`px-4 py-2 rounded-xl text-xs font-display font-extrabold flex items-center gap-2 cursor-pointer transition ${
                    activeTab === 'firms'
                      ? 'bg-[#FF6B4A] text-white'
                      : 'bg-[#FAF7F0] text-slate-700 hover:bg-slate-200/70'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Mandates ({firmRequests.length})</span>
                </button>
              </div>

              {/* Quick Metrics + Toolbar */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="hidden lg:inline-block px-3 py-1.5 rounded-lg bg-[#FAF7F0] font-mono font-bold">
                  Active Stage: {activePipelineCount} · Placed: {placedCount} · Open Jobs: {openMandatesCount}
                </span>

                <button
                  type="button"
                  onClick={() => setShowNewRoleModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-[#FF6B4A] hover:bg-[#f25937] text-white font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Publish Job</span>
                </button>

                {activeTab === 'candidates' && (
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 font-bold inline-flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
                  >
                    <Download className="w-3.5 h-3.5 text-[#3B5BFF]" />
                    <span>CSV</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={loadData}
                  disabled={isLoadingData}
                  className="px-3.5 py-2 rounded-xl bg-[#3B5BFF] text-white font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                  <span>Sync</span>
                </button>
              </div>
            </div>

            {activeTab === 'candidates' ? (
              <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="flex-1 min-w-[200px] relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search name, phone, email, city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-slate-300 outline-none focus:border-[#3B5BFF]"
                    />
                  </div>

                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                    className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-semibold cursor-pointer"
                  >
                    <option value="All">All Domains</option>
                    {PRACTICE_DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filterQualification}
                    onChange={(e) => setFilterQualification(e.target.value)}
                    className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-semibold cursor-pointer"
                  >
                    <option value="All">All Degrees</option>
                    {QUALIFICATIONS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white font-semibold cursor-pointer"
                  >
                    <option value="All">All Stages</option>
                    {STAGES.map((s) => (
                      <option key={s.id} value={s.label}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 overflow-auto rounded-2xl bg-white border border-slate-200">
                  {filteredCandidates.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 space-y-2">
                      <Users className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="font-bold text-sm">No candidate records match current filters.</p>
                    </div>
                  ) : (
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-100 text-slate-700 sticky top-0 uppercase font-mono text-[10px] border-b border-slate-200 z-10">
                        <tr>
                          <th className="py-3 px-4">Candidate</th>
                          <th className="py-3 px-4">Degree &amp; Domain</th>
                          <th className="py-3 px-4">DOB Key</th>
                          <th className="py-3 px-4">Comp &amp; City</th>
                          <th className="py-3 px-4">CV</th>
                          <th className="py-3 px-4">Live Stage</th>
                          <th className="py-3 px-4 text-right">Quick Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredCandidates.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4">
                              <div className="font-bold text-slate-900 text-sm">{c.full_name}</div>
                              <div className="text-slate-500 font-mono text-[11px]">
                                +91 {c.phone} · {c.email}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 font-bold text-[11px]">
                                {c.qualification}
                              </span>
                              <div className="text-slate-600 mt-0.5">
                                {c.domain} ({c.experience_years}y)
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-600">{c.dob}</td>
                            <td className="py-3 px-4">
                              <div className="font-bold">{c.expected_ctc}</div>
                              <div className="text-slate-500 text-[11px]">{c.current_location}</div>
                            </td>
                            <td className="py-3 px-4">
                              {c.resume_url ? (
                                <a
                                  href={c.resume_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#3B5BFF]/10 text-[#3B5BFF] font-bold"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>PDF</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <select
                                value={c.status || 'Application Received'}
                                onChange={(e) => handleStatusChange(c.id, e.target.value)}
                                className="py-1.5 px-2.5 rounded-lg text-xs font-bold border border-slate-300 bg-white cursor-pointer"
                              >
                                {STAGES.map((s) => (
                                  <option key={s.id} value={s.label}>
                                    {s.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <a
                                  href={`https://wa.me/91${c.phone}?text=${encodeURIComponent(
                                    `Hi ${c.full_name}, reaching out from Amii Ma'am's desk at FinTalent Partners regarding your ${c.domain} profile.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-[#12B886] text-white"
                                  title="WhatsApp Candidate"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCandidate(c);
                                    setTempNotes(c.admin_notes || '');
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>{c.admin_notes ? 'Note ✓' : 'Note'}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  {['All', 'Open', 'In Progress', 'Closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setFirmStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                        firmStatusFilter === st
                          ? 'bg-[#0D1017] text-white'
                          : 'bg-white border border-slate-200 text-slate-600'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFirms.map((f) => (
                    <div
                      key={f.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">
                              {f.org_type}
                            </span>
                            <h4 className="font-display font-bold text-base mt-1">
                              {f.organization_name}
                            </h4>
                          </div>
                          <select
                            value={f.status || 'Open'}
                            onChange={(e) => handleFirmStatusChange(f.id, e.target.value)}
                            className="text-xs font-bold py-1 px-2 rounded-lg border border-slate-300 bg-slate-50 cursor-pointer"
                          >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-100">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Role</span>
                            <strong>{f.role_needed}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Budget</span>
                            <strong className="font-mono">{f.budget_range}</strong>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Domain</span>
                            <span>{f.domain}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">City</span>
                            <span>{f.city}</span>
                          </div>
                        </div>

                        {f.notes && (
                          <p className="text-[11px] bg-amber-50 text-amber-900 px-3 py-1.5 rounded-lg font-medium">
                            {f.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-xs">
                          <span className="text-slate-500 block">{f.contact_person}</span>
                          <strong className="font-mono">+91 {f.contact_phone}</strong>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:+91${f.contact_phone}`}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                            title="Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={`https://wa.me/91${f.contact_phone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-[#12B886] text-white"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-current" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* HR Notes Modal */}
        {editingCandidate && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-40">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-[#0D1017] space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-base">
                  Live Status Note for {editingCandidate.full_name}
                </h4>
                <button
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                rows={4}
                value={tempNotes}
                onChange={(e) => setTempNotes(e.target.value)}
                placeholder="e.g. Cleared screening! Partner interview scheduled Thursday at 4:00 PM."
                className="w-full p-3.5 rounded-xl border border-slate-300 text-sm outline-none focus:border-[#3B5BFF]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCandidate(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="px-5 py-2.5 rounded-xl bg-[#3B5BFF] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingNotes ? 'Syncing...' : 'Save & Sync Live'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Publish Role Modal */}
        {showNewRoleModal && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-40">
            <form
              onSubmit={handlePublishNewRole}
              className="bg-white rounded-3xl max-w-lg w-full p-6 border-2 border-[#0D1017] space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-display font-extrabold text-lg">
                  Publish New Role to Live Board
                </h4>
                <button
                  type="button"
                  onClick={() => setShowNewRoleModal(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Firm / Company *</label>
                  <input
                    required
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="Walker Chandiok Alumni LLP"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Org Type</label>
                  <select
                    value={newOrgType}
                    onChange={(e) => setNewOrgType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Role Title *</label>
                  <input
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Audit Manager / FP&A Lead"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    {PRACTICE_DOMAINS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Compensation</label>
                  <input
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">City</label>
                  <input
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Contact Name</label>
                  <input
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Contact Phone</label>
                  <input
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewRoleModal(false)}
                  className="px-4 py-2 text-xs font-bold rounded-xl hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#C8FF32] text-[#090B10] border border-[#0D1017] font-display font-extrabold text-xs cursor-pointer"
                >
                  Publish Live →
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
