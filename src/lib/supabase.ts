import { createClient } from '@supabase/supabase-js';

export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}

export const SUPABASE_URL = 'https://dwebcaopcmahtfnlhoad.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_wZhy8p3SQc5KKB3pEtIBFA_szTU3g9y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const WHATSAPP_NUMBER = '919821262613';
export const DISPLAY_PHONE = '+91 98212 62613';
export const CONTACT_EMAIL = 'recruitment@fintalentpartners.com';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PRACTICE_DOMAINS = [
  'Statutory Audit & Assurance',
  'FP&A & Corporate Finance',
  'Direct Taxation & Litigations',
  'Indirect Tax / GST',
  'CA Articleship & Trainee Roles',
  'Accounting, Finalization & ERP (Tally/SAP)',
] as const;

export const QUALIFICATIONS = [
  'Qualified CA',
  'CA Inter / Semi-Qualified',
  'CA Article Assistant / Trainee',
  'CMA (Cost Accountant)',
  'ACCA / CS / CFA',
  'MBA (Finance)',
  'B.Com / M.Com / Senior Accountant',
] as const;

export const ORG_TYPES = [
  'CA / Audit Firm',
  'Corporate / MNC',
  'Startup / MSME',
] as const;

export const STAGES = [
  { id: 1, label: 'Application Received', short: 'Received', desc: 'Profile recorded & queued in talent desk' },
  { id: 2, label: 'Under Screening', short: 'Screening', desc: 'Technical screening & ICAI verification' },
  { id: 3, label: 'Shortlisted for Matching Roles', short: 'Shortlisted', desc: 'Shared with matching CA Firms & Corporates' },
  { id: 4, label: 'Interview in Progress', short: 'Interviewing', desc: 'Partner / CFO technical round scheduled' },
  { id: 5, label: 'Placed / Offer Received', short: 'Placed', desc: 'Offer letter rolled out & confirmed' },
] as const;

export type CandidateStatus = typeof STAGES[number]['label'];

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  qualification: string;
  domain: string;
  experience_years: number;
  current_location: string;
  expected_ctc: string;
  resume_url: string;
  status: string;
  admin_notes?: string | null;
  created_at?: string;
}

export interface FirmRequest {
  id: string;
  organization_name: string;
  org_type: string;
  contact_person: string;
  contact_phone: string;
  role_needed: string;
  domain: string;
  budget_range: string;
  city: string;
  status: string;
  notes?: string;
  highlights?: string[];
  urgent?: boolean;
  created_at?: string;
}

export interface VettedTalentProfile {
  id: string;
  code: string;
  display_name: string;
  qualification: string;
  domain: string;
  experience_years: number;
  city: string;
  expected_ctc: string;
  notice_period: string;
  badge: string;
  skills: string[];
  verified: boolean;
}

// Local cache keys for instant UI sync + offline / RLS resilience
const LOCAL_UPDATES_KEY = 'fintalent_candidate_local_updates';
const LOCAL_CANDIDATES_KEY = 'fintalent_local_candidates_v2';
const LOCAL_FIRMS_KEY = 'fintalent_local_firm_requests_v2';
const LAST_TRACK_KEY = 'fintalent_last_tracked_credentials';

export function saveLastTrackingCredentials(phone: string, dob: string, name?: string) {
  try {
    localStorage.setItem(LAST_TRACK_KEY, JSON.stringify({ phone, dob, name: name || '' }));
  } catch {
    // ignore storage errors
  }
}

export function getLastTrackingCredentials(): { phone: string; dob: string; name?: string } | null {
  try {
    const raw = localStorage.getItem(LAST_TRACK_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getLocalCandidateUpdates(): Record<string, { status?: string; admin_notes?: string }> {
  try {
    const raw = localStorage.getItem(LOCAL_UPDATES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalCandidateUpdate(id: string, updates: { status?: string; admin_notes?: string }) {
  try {
    const current = getLocalCandidateUpdates();
    current[id] = { ...current[id], ...updates };
    localStorage.setItem(LOCAL_UPDATES_KEY, JSON.stringify(current));
  } catch (err) {
    console.error('Failed to save local candidate update', err);
  }
}

function getLocalCandidates(): Candidate[] {
  try {
    const raw = localStorage.getItem(LOCAL_CANDIDATES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCandidate(candidate: Candidate) {
  try {
    const list = getLocalCandidates();
    const filtered = list.filter((c) => c.id !== candidate.id);
    filtered.unshift(candidate);
    localStorage.setItem(LOCAL_CANDIDATES_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to cache local candidate', err);
  }
}

export const DEFAULT_SAMPLE_FIRMS: FirmRequest[] = [
  {
    id: 'firm_seed_1',
    organization_name: 'B.R. Maheshwari & Co. LLP',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Prateek Maheshwari',
    contact_phone: '9811098765',
    role_needed: 'Senior Statutory Audit Manager',
    domain: 'Statutory Audit & Assurance',
    budget_range: '16 - 22 LPA',
    city: 'Mumbai (BKC)',
    status: 'Open',
    urgent: true,
    highlights: ['Ind AS Listed Clients', 'CARO 2020', 'Team of 12'],
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'firm_seed_2',
    organization_name: 'Nexus PayTech Solutions (Series C)',
    org_type: 'Startup / MSME',
    contact_person: 'Vikram Sethi (VP Finance)',
    contact_phone: '9900112233',
    role_needed: 'FP&A & Strategic Finance Lead',
    domain: 'FP&A & Corporate Finance',
    budget_range: '24 - 30 LPA',
    city: 'Bengaluru (Indiranagar)',
    status: 'Open',
    urgent: true,
    highlights: ['SaaS Metrics & AOP', 'Board Decks', 'ESOP Upside'],
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'firm_seed_3',
    organization_name: 'Kreston SGCO Tax Advisory',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Sneha Kulkarni',
    contact_phone: '9820556677',
    role_needed: 'GST Litigation & Advisory Lead',
    domain: 'Indirect Tax / GST',
    budget_range: '13 - 17 LPA',
    city: 'Mumbai (Andheri East)',
    status: 'Open',
    urgent: false,
    highlights: ['Show Cause Replies', 'GSTR 9/9C', 'Tribunal Drafting'],
    created_at: new Date(Date.now() - 3600000 * 16).toISOString(),
  },
  {
    id: 'firm_seed_4',
    organization_name: 'V. Sankar Aiyar & Associates',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Raghavendra Iyer',
    contact_phone: '9810443322',
    role_needed: 'Direct Tax & Transfer Pricing Senior',
    domain: 'Direct Taxation & Litigations',
    budget_range: '14 - 19 LPA',
    city: 'New Delhi (Connaught Place)',
    status: 'Open',
    urgent: false,
    highlights: ['Sec 143/148 Appeals', 'DTAA Advisory', '3CD Reviews'],
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'firm_seed_5',
    organization_name: 'Aurelia Global Shared Services',
    org_type: 'Corporate / MNC',
    contact_person: 'Meera Nair (Financial Controller)',
    contact_phone: '9845123490',
    role_needed: 'Plant & R2R Finance Controller (SAP)',
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    budget_range: '15 - 20 LPA',
    city: 'Pune (Hinjewadi)',
    status: 'Open',
    urgent: true,
    highlights: ['SAP S/4 HANA FICO', 'Schedule III Close', 'Month-End MIS'],
    created_at: new Date(Date.now() - 3600000 * 30).toISOString(),
  },
  {
    id: 'firm_seed_6',
    organization_name: 'Desai Haribhakti & Partners',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Kunal Desai',
    contact_phone: '9821778899',
    role_needed: 'CA Article Assistant / Industrial Trainee',
    domain: 'CA Articleship & Trainee Roles',
    budget_range: '₹22,000 - ₹35,000 / mo',
    city: 'Mumbai (Nariman Point)',
    status: 'Open',
    urgent: false,
    highlights: ['Listed Stat Audit + Tax', 'Exam Leave Guaranteed', 'Transfer Accepted'],
    created_at: new Date(Date.now() - 3600000 * 42).toISOString(),
  },
];

export const DEFAULT_VETTED_TALENT: VettedTalentProfile[] = [
  {
    id: 'talent_1',
    code: 'FT-CA-904',
    display_name: 'CA Rohit A.',
    qualification: 'Qualified CA',
    domain: 'Statutory Audit & Assurance',
    experience_years: 4,
    city: 'Mumbai (BKC)',
    expected_ctc: '16 - 18 LPA',
    notice_period: '15 Days',
    badge: '1st Attempt · Big 4 Articleship',
    skills: ['Ind AS 115/116', 'Listed Stat Audit', 'IFC & CARO 2020'],
    verified: true,
  },
  {
    id: 'talent_2',
    code: 'FT-FPA-812',
    display_name: 'CA Ananya S.',
    qualification: 'Qualified CA',
    domain: 'FP&A & Corporate Finance',
    experience_years: 5,
    city: 'Bengaluru',
    expected_ctc: '24 - 27 LPA',
    notice_period: '30 Days',
    badge: 'Series B SaaS Finance Lead',
    skills: ['AOP & Rolling Forecast', 'Cohort Modeling', 'Investor Board Decks'],
    verified: true,
  },
  {
    id: 'talent_3',
    code: 'FT-TAX-651',
    display_name: 'Siddharth M.',
    qualification: 'CA Inter / Semi-Qualified',
    domain: 'Indirect Tax / GST',
    experience_years: 3.5,
    city: 'Mumbai (Goregaon)',
    expected_ctc: '9.5 - 11 LPA',
    notice_period: 'Immediate',
    badge: 'GST Litigation & Refund Specialist',
    skills: ['GSTR 9 & 9C', 'SCN Replies', 'Pan-India ITC Recon'],
    verified: true,
  },
  {
    id: 'talent_4',
    code: 'FT-DTX-739',
    display_name: 'CA Niharika V.',
    qualification: 'Qualified CA',
    domain: 'Direct Taxation & Litigations',
    experience_years: 3,
    city: 'Delhi NCR',
    expected_ctc: '14 - 16 LPA',
    notice_period: 'Immediate',
    badge: 'Ex-Grant Thornton Tax Senior',
    skills: ['Faceless Appeals', 'Transfer Pricing 3CEB', 'DTAA Withholding'],
    verified: true,
  },
  {
    id: 'talent_5',
    code: 'FT-ERP-520',
    display_name: 'CMA Karthik R.',
    qualification: 'CMA (Cost Accountant)',
    domain: 'Accounting, Finalization & ERP (Tally/SAP)',
    experience_years: 6,
    city: 'Pune / Hybrid',
    expected_ctc: '15 - 17 LPA',
    notice_period: '30 Days',
    badge: 'SAP S/4 HANA Costing & Close',
    skills: ['SAP FICO', 'Plant Costing', 'Schedule III Consolidation'],
    verified: true,
  },
  {
    id: 'talent_6',
    code: 'FT-ART-318',
    display_name: ' Tanvi K.',
    qualification: 'CA Article Assistant / Trainee',
    domain: 'CA Articleship & Trainee Roles',
    experience_years: 0.5,
    city: 'Mumbai (Dadar / BKC)',
    expected_ctc: '₹20,000 / mo Stipend',
    notice_period: 'Immediate',
    badge: 'CA Inter Both Groups 1st Attempt',
    skills: ['ITT & OC Completed', 'Advanced Excel', 'Tally Prime & Audit'],
    verified: true,
  },
];

function getLocalFirmRequests(): FirmRequest[] {
  try {
    const raw = localStorage.getItem(LOCAL_FIRMS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_FIRMS_KEY, JSON.stringify(DEFAULT_SAMPLE_FIRMS));
      return DEFAULT_SAMPLE_FIRMS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SAMPLE_FIRMS;
  }
}

function saveLocalFirmRequest(req: FirmRequest) {
  try {
    const list = getLocalFirmRequests();
    const filtered = list.filter((i) => i.id !== req.id);
    filtered.unshift(req);
    localStorage.setItem(LOCAL_FIRMS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('Failed to save local firm request', err);
  }
}

function updateLocalFirmStatus(id: string, status: string) {
  try {
    const list = getLocalFirmRequests();
    const updated = list.map((item) => (item.id === id ? { ...item, status } : item));
    localStorage.setItem(LOCAL_FIRMS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update local firm request', err);
  }
}

/**
 * Upload resume to Supabase Storage 'resumes' bucket with resilient fallback
 */
export async function uploadResumeToSupabase(file: File, phone: string, fullName: string): Promise<string> {
  if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
    throw new Error('Please upload a valid PDF document (.pdf).');
  }

  const maxSizeBytes = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds the 2MB limit. Please compress your PDF.');
  }

  const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const timestamp = Date.now();
  const filePath = `${cleanPhone}_${cleanName}_${timestamp}.pdf`;

  try {
    const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, {
      contentType: 'application/pdf',
      upsert: true,
    });

    if (error) {
      console.warn('Supabase storage fallback triggered:', error.message);
      return URL.createObjectURL(file);
    }

    const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(data.path);
    return publicUrlData.publicUrl;
  } catch (err) {
    console.warn('Network/storage fallback triggered:', err);
    return URL.createObjectURL(file);
  }
}

/**
 * Insert a candidate profile into public.candidates + local cache sync
 */
export async function submitCandidateProfile(candidate: Omit<Candidate, 'id' | 'created_at'>): Promise<Candidate> {
  const payload = {
    full_name: candidate.full_name.trim(),
    email: candidate.email.trim().toLowerCase(),
    phone: candidate.phone.trim().replace(/\D/g, ''),
    dob: candidate.dob.trim(),
    qualification: candidate.qualification,
    domain: candidate.domain,
    experience_years: Number(candidate.experience_years) || 0,
    current_location: candidate.current_location.trim(),
    expected_ctc: candidate.expected_ctc.trim(),
    resume_url: candidate.resume_url,
    status: candidate.status || 'Application Received',
    admin_notes: candidate.admin_notes || null,
  };

  saveLastTrackingCredentials(payload.phone, payload.dob, payload.full_name);

  try {
    const { data, error } = await supabase
      .from('candidates')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const saved = data as Candidate;
      saveLocalCandidate(saved);
      return saved;
    }

    console.warn('Supabase candidate insert fallback:', error?.message);
  } catch (err) {
    console.warn('Supabase network insert fallback:', err);
  }

  const fallbackCandidate: Candidate = {
    id: 'cand_' + Date.now(),
    ...payload,
    created_at: new Date().toISOString(),
  };
  saveLocalCandidate(fallbackCandidate);
  return fallbackCandidate;
}

/**
 * Query candidate by mobile number AND date of birth
 */
export async function trackCandidateStatus(phone: string, dob: string): Promise<Candidate | null> {
  const cleanPhone = phone.trim().replace(/\D/g, '');
  const cleanDob = dob.trim();
  const last10 = cleanPhone.slice(-10);

  let found: Candidate | null = null;

  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .or(`phone.eq.${cleanPhone},phone.ilike.%${last10}`)
      .eq('dob', cleanDob)
      .order('created_at', { ascending: false })
      .limit(1);

    if (!error && data && data.length > 0) {
      found = data[0] as Candidate;
    } else if (error) {
      const retry = await supabase
        .from('candidates')
        .select('*')
        .eq('phone', cleanPhone)
        .eq('dob', cleanDob)
        .limit(1);
      if (!retry.error && retry.data && retry.data.length > 0) {
        found = retry.data[0] as Candidate;
      }
    }
  } catch (err) {
    console.warn('Supabase status query offline fallback:', err);
  }

  if (!found) {
    const localList = getLocalCandidates();
    found =
      localList.find(
        (c) => (c.phone === cleanPhone || c.phone.endsWith(last10)) && c.dob === cleanDob
      ) || null;
  }

  if (!found) return null;

  saveLastTrackingCredentials(cleanPhone, cleanDob, found.full_name);

  const localUpdates = getLocalCandidateUpdates();
  if (localUpdates[found.id]) {
    return { ...found, ...localUpdates[found.id] };
  }

  return found;
}

/**
 * Submit hiring requirement for CA Firms & Corporates
 */
export async function submitFirmRequirement(request: {
  organization_name: string;
  org_type: string;
  contact_person: string;
  contact_phone: string;
  role_needed: string;
  domain: string;
  budget_range: string;
  city: string;
  notes?: string;
}): Promise<{ success: boolean; data: FirmRequest }> {
  const payload = {
    organization_name: request.organization_name.trim(),
    org_type: request.org_type,
    contact_person: request.contact_person.trim(),
    contact_phone: request.contact_phone.trim().replace(/\D/g, ''),
    role_needed: request.role_needed.trim(),
    domain: request.domain,
    budget_range: request.budget_range.trim(),
    city: request.city.trim(),
    status: 'Open',
  };

  try {
    const { data, error } = await supabase
      .from('firm_requests')
      .insert([payload])
      .select()
      .single();

    if (!error && data) {
      const enriched: FirmRequest = {
        ...(data as FirmRequest),
        urgent: true,
        notes: request.notes,
        highlights: ['48h Active Mandate', request.org_type],
      };
      saveLocalFirmRequest(enriched);
      return { success: true, data: enriched };
    }
  } catch (err) {
    console.warn('Supabase firm insert network fallback:', err);
  }

  const fallbackRecord: FirmRequest = {
    id: 'firm_' + Date.now(),
    ...payload,
    urgent: true,
    notes: request.notes,
    highlights: ['Direct Verified Mandate', request.org_type],
    created_at: new Date().toISOString(),
  };
  saveLocalFirmRequest(fallbackRecord);
  return { success: true, data: fallbackRecord };
}

/**
 * Fetch all candidates for Admin Portal (merged remote + local)
 */
export async function fetchAllCandidates(): Promise<Candidate[]> {
  let remote: Candidate[] = [];
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) {
      remote = data as Candidate[];
    }
  } catch (err) {
    console.warn('Fetch all candidates offline fallback:', err);
  }

  const local = getLocalCandidates();
  const map = new Map<string, Candidate>();
  for (const item of local) {
    map.set(item.id, item);
  }
  for (const item of remote) {
    map.set(item.id, item);
  }

  const localUpdates = getLocalCandidateUpdates();
  return Array.from(map.values())
    .map((cand) => (localUpdates[cand.id] ? { ...cand, ...localUpdates[cand.id] } : cand))
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
}

/**
 * Build anonymized public talent cards for Recruiters to browse instantly
 */
export function buildPublicTalentPool(candidates: Candidate[]): VettedTalentProfile[] {
  const dynamicProfiles: VettedTalentProfile[] = candidates.slice(0, 8).map((c, idx) => {
    const parts = c.full_name.trim().split(/\s+/);
    const maskedName =
      parts.length > 1
        ? `${parts[0]} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`
        : parts[0];

    return {
      id: `live_${c.id}`,
      code: `FT-LIVE-${100 + idx}`,
      display_name: maskedName,
      qualification: c.qualification,
      domain: c.domain,
      experience_years: c.experience_years,
      city: c.current_location,
      expected_ctc: c.expected_ctc,
      notice_period: 'Immediate / 30d',
      badge: c.status === 'Placed / Offer Received' ? 'Placed via FinTalent' : 'Screened & Active',
      skills: [c.qualification, c.domain.split('&')[0].trim(), 'ICAI Verified'],
      verified: true,
    };
  });

  return [...dynamicProfiles, ...DEFAULT_VETTED_TALENT];
}

/**
 * Update candidate status & notes (Admin Portal)
 */
export async function updateCandidateStatus(
  id: string,
  status: string,
  adminNotes?: string | null
): Promise<boolean> {
  saveLocalCandidateUpdate(id, {
    status,
    ...(adminNotes !== undefined ? { admin_notes: adminNotes ?? undefined } : {}),
  });

  try {
    const updatePayload: Record<string, unknown> = { status };
    if (adminNotes !== undefined) {
      updatePayload.admin_notes = adminNotes;
    }

    const { error } = await supabase.from('candidates').update(updatePayload).eq('id', id);
    if (error) {
      console.warn('Supabase candidate status update warning:', error.message);
    }
  } catch (err) {
    console.warn('Supabase status update offline fallback:', err);
  }

  return true;
}

/**
 * Fetch all firm hiring requests for Live Board & Admin Portal
 */
export async function fetchAllFirmRequests(): Promise<FirmRequest[]> {
  let remoteFirms: FirmRequest[] = [];
  try {
    const { data } = await supabase
      .from('firm_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) {
      remoteFirms = data as FirmRequest[];
    }
  } catch (err) {
    console.warn('Supabase firm fetch offline fallback:', err);
  }

  const localFirms = getLocalFirmRequests();

  const map = new Map<string, FirmRequest>();
  for (const item of localFirms) {
    map.set(item.id, item);
  }
  for (const item of remoteFirms) {
    const existing = map.get(item.id);
    map.set(item.id, { ...existing, ...item });
  }

  return Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );
}

/**
 * Update firm request status
 */
export async function updateFirmStatus(id: string, status: string): Promise<boolean> {
  updateLocalFirmStatus(id, status);

  try {
    const { error } = await supabase.from('firm_requests').update({ status }).eq('id', id);
    if (error) {
      console.warn('Supabase firm update warning:', error.message);
    }
  } catch (err) {
    console.warn('Supabase firm status offline fallback:', err);
  }

  return true;
}
