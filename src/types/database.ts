export interface City {
  id: string;
  name: string;
  slug: string;
  province: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  urdu_label: string;
  description: string;
}

export interface ProcessDocument {
  id: string;
  process_id: string;
  name: string;
  type: 'original' | 'photocopy';
  copies_needed: number;
  note: string;
  sort_order: number;
}

export interface ProcessStep {
  id: string;
  process_id: string;
  step_number: number;
  title: string;
  description: string;
  time_minutes: number;
}

export interface ProcessMistake {
  id: string;
  process_id: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ProcessFaq {
  id: string;
  process_id: string;
  question: string;
  answer: string;
  sort_order: number;
}

export interface WaitTime {
  id: string;
  process_id: string;
  office_name: string;
  city: string;
  visit_date: string; // YYYY-MM-DD
  wait_minutes: number;
  rating: number;
  tip: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ProcessRecord {
  id: string;
  slug: string;
  title: string;
  urdu_title: string;
  summary: string;
  category: string;
  city: string;
  fee_normal: number;
  fee_urgent: number;
  fee_executive: number;
  fee_notes: string;
  time_required: string;
  office_name: string;
  office_address: string;
  office_timings: string;
  best_day_to_go: string;
  official_source_url: string;
  last_updated: string;
  is_verified: boolean;
  is_nationwide: boolean;
  popularity_rank: number;
}

export interface ProcessWithDetails extends ProcessRecord {
  documents: ProcessDocument[];
  steps: ProcessStep[];
  mistakes: ProcessMistake[];
  faqs: ProcessFaq[];
  wait_times: WaitTime[];
}

export interface ProcessSummaryCard extends ProcessRecord {
  documents_count: number;
  avg_wait_minutes: number | null;
  wait_reports_count: number;
  avg_rating: number | null;
}

export interface OfficeWaitSummary {
  process_id: string;
  process_slug: string;
  process_title: string;
  office_name: string;
  office_address: string;
  office_timings: string;
  best_day_to_go: string;
  city: string;
  category: string;
  avg_wait_minutes: number | null;
  avg_rating: number | null;
  report_count: number;
  last_reported_date: string | null;
  last_reported_at: string | null;
  latest_tip: string | null;
}

export interface WaitTimeWithProcess extends WaitTime {
  process_title?: string;
  process_slug?: string;
}
