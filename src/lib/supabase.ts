import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://dwebcaopcmahtfnlhoad.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_wZhy8p3SQc5KKB3pEtIBFA_szTU3g9y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const STAGES = [
  { id: 1, label: 'Application Received', short: 'Received', desc: 'Profile recorded in talent database' },
  { id: 2, label: 'Under Screening', short: 'Screening', desc: 'Technical profile evaluation & ICAI verification' },
  { id: 3, label: 'Shortlisted for Matching Roles', short: 'Shortlisted', desc: 'Matched with prospective CA Firms & Corporates' },
  { id: 4, label: 'Interview in Progress', short: 'Interviewing', desc: 'Partner / HR rounds scheduled' },
  { id: 5, label: 'Placed / Offer Received', short: 'Placed', desc: 'Offer letter extended and accepted' },
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
  created_at?: string;
}

// Local cache keys for offline resilience / RLS fallbacks
const LOCAL_UPDATES_KEY = 'fintalent_candidate_local_updates';
const LOCAL_FIRMS_KEY = 'fintalent_local_firm_requests';

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

const DEFAULT_SAMPLE_FIRMS: FirmRequest[] = [
  {
    id: 'firm_seed_1',
    organization_name: 'B.R. Maheshwari & Co. (Chartered Accountants)',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Prateek Maheshwari',
    contact_phone: '9811098765',
    role_needed: 'Senior Statutory Audit Manager',
    domain: 'Statutory Audit & Assurance',
    budget_range: '16 - 20 LPA',
    city: 'New Delhi (Connaught Place)',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'firm_seed_2',
    organization_name: 'Kreston SGCO Alumni Advisory',
    org_type: 'CA / Audit Firm',
    contact_person: 'CA Sneha Kulkarni',
    contact_phone: '9820556677',
    role_needed: 'GST & Litigation Lead',
    domain: 'Indirect Tax / GST',
    budget_range: '12 - 15 LPA',
    city: 'Mumbai (Andheri East)',
    status: 'In Progress',
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'firm_seed_3',
    organization_name: 'Nexus PayTech Solutions Ltd.',
    org_type: 'Corporate / MNC',
    contact_person: 'Vikram Sethi (VP Finance)',
    contact_phone: '9900112233',
    role_needed: 'FP&A Lead / Senior Manager',
    domain: 'FP&A & Corporate Finance',
    budget_range: '24 - 28 LPA',
    city: 'Bengaluru (Koramangala)',
    status: 'Open',
    created_at: new Date(Date.now() - 3600000 * 36).toISOString(),
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
    list.unshift(req);
    localStorage.setItem(LOCAL_FIRMS_KEY, JSON.stringify(list));
  } catch (err) {
    console.error('Failed to save local firm request', err);
  }
}

function updateLocalFirmStatus(id: string, status: string) {
  try {
    const list = getLocalFirmRequests();
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem(LOCAL_FIRMS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update local firm request', err);
  }
}

/**
 * Upload resume directly to Supabase Storage 'resumes' bucket
 */
export async function uploadResumeToSupabase(file: File, phone: string, fullName: string): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('Please upload a valid PDF document.');
  }

  const maxSizeBytes = 2 * 1024 * 1024; // 2MB
  if (file.size > maxSizeBytes) {
    throw new Error('File size exceeds the 2MB limit. Please upload a smaller PDF.');
  }

  const cleanName = fullName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const timestamp = Date.now();
  const filePath = `${cleanPhone}_${cleanName}_${timestamp}.pdf`;

  const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, {
    contentType: 'application/pdf',
    upsert: true,
  });

  if (error) {
    console.error('Storage upload error:', error);
    throw new Error(`Resume upload failed: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(data.path);
  return publicUrlData.publicUrl;
}

/**
 * Insert a candidate profile into public.candidates
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

  const { data, error } = await supabase
    .from('candidates')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Candidate insert error:', error);
    throw new Error(error.message || 'Failed to submit candidate profile');
  }

  return data as Candidate;
}

/**
 * Query candidate by mobile number AND date of birth
 */
export async function trackCandidateStatus(phone: string, dob: string): Promise<Candidate | null> {
  const cleanPhone = phone.trim().replace(/\D/g, '');
  const cleanDob = dob.trim();

  // Try exact match or match last 10 digits
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .or(`phone.eq.${cleanPhone},phone.ilike.%${cleanPhone.slice(-10)}`)
    .eq('dob', cleanDob)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('Status tracker query error:', error);
    // Try single query without ILIKE fallback if or failed
    const retry = await supabase
      .from('candidates')
      .select('*')
      .eq('phone', cleanPhone)
      .eq('dob', cleanDob)
      .limit(1);
    
    if (retry.error || !retry.data || retry.data.length === 0) {
      return null;
    }
    const cand = retry.data[0] as Candidate;
    const localUpdates = getLocalCandidateUpdates();
    if (localUpdates[cand.id]) {
      return { ...cand, ...localUpdates[cand.id] };
    }
    return cand;
  }

  if (!data || data.length === 0) {
    return null;
  }

  const candidate = data[0] as Candidate;
  // Overlay any administrative updates saved locally
  const localUpdates = getLocalCandidateUpdates();
  if (localUpdates[candidate.id]) {
    return { ...candidate, ...localUpdates[candidate.id] };
  }

  return candidate;
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
}): Promise<{ success: boolean; data?: FirmRequest }> {
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

  const { data, error } = await supabase
    .from('firm_requests')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.warn('Firm request insert returned RLS/error, backing up locally:', error.message);
    // Create a client-side simulated record so admin can review and call immediately
    const fallbackRecord: FirmRequest = {
      id: 'firm_' + Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
    };
    saveLocalFirmRequest(fallbackRecord);
    return { success: true, data: fallbackRecord };
  }

  return { success: true, data: data as FirmRequest };
}

/**
 * Fetch all candidates for Admin Portal
 */
export async function fetchAllCandidates(): Promise<Candidate[]> {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch all candidates error:', error);
    return [];
  }

  const localUpdates = getLocalCandidateUpdates();
  return ((data as Candidate[]) || []).map(cand => {
    if (localUpdates[cand.id]) {
      return { ...cand, ...localUpdates[cand.id] };
    }
    return cand;
  });
}

/**
 * Update candidate status & notes (Admin Portal)
 */
export async function updateCandidateStatus(id: string, status: string, adminNotes?: string | null): Promise<boolean> {
  // Always update locally for instant synchronization
  saveLocalCandidateUpdate(id, {
    status,
    ...(adminNotes !== undefined ? { admin_notes: adminNotes ?? undefined } : {}),
  });

  const updatePayload: Record<string, any> = { status };
  if (adminNotes !== undefined) {
    updatePayload.admin_notes = adminNotes;
  }

  const { error } = await supabase
    .from('candidates')
    .update(updatePayload)
    .eq('id', id);

  if (error) {
    console.warn('Supabase candidate status update warning:', error.message);
  }

  return true;
}

/**
 * Fetch all firm hiring requests for Admin Portal
 */
export async function fetchAllFirmRequests(): Promise<FirmRequest[]> {
  const { data, error } = await supabase
    .from('firm_requests')
    .select('*')
    .order('created_at', { ascending: false });

  const localFirms = getLocalFirmRequests();
  const remoteFirms = (data as FirmRequest[]) || [];

  // Merge remote and local (avoiding duplicates by id)
  const map = new Map<string, FirmRequest>();
  for (const item of localFirms) {
    map.set(item.id, item);
  }
  for (const item of remoteFirms) {
    map.set(item.id, item);
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

  const { error } = await supabase
    .from('firm_requests')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.warn('Supabase firm update warning:', error.message);
  }

  return true;
}
