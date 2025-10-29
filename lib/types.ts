export interface SearchParams {
  search?: string;
  specialty?: string; // Legacy single specialty param
  specialties?: string; // Comma-separated specialties
  sort?: string; // 'newest' | 'oldest' | 'most_upvoted' | 'most_downloaded' | 'alphabetical'
  min_upvotes?: string;
  min_downloads?: string;
  date_from?: string;
  date_to?: string;
}

