export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          affiliation: string | null;
          orcid: string | null;
          linkedin: string | null;
          github: string | null;
          google_scholar: string | null;
          avatar_type: "gravatar" | "premade";
          avatar_value: string | null;
          cover_photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          affiliation?: string | null;
          orcid?: string | null;
          linkedin?: string | null;
          github?: string | null;
          google_scholar?: string | null;
          avatar_type?: "gravatar" | "premade";
          avatar_value?: string | null;
          cover_photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          affiliation?: string | null;
          orcid?: string | null;
          linkedin?: string | null;
          github?: string | null;
          google_scholar?: string | null;
          avatar_type?: "gravatar" | "premade";
          avatar_value?: string | null;
          cover_photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      roles: {
        Row: {
          id: string;
          user_id: string;
          role: "superadmin" | "admin" | "moderator" | "user";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          role: "superadmin" | "admin" | "moderator" | "user";
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          role?: "superadmin" | "admin" | "moderator" | "user";
          created_at?: string;
        };
      };
      datasets: {
        Row: {
          id: string;
          title: string;
          abstract: string;
          doi: string | null;
          tags: string[];
          specialty: string;
          dataset_link: string;
          cover_image_url: string | null;
          sample_data: Json | null;
          case_size: string | null;
          submitted_by: string;
          status: "pending" | "approved" | "rejected";
          approved_by: string | null;
          approved_at: string | null;
          upvotes_count: number;
          monthly_downloads: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          abstract: string;
          doi?: string | null;
          tags?: string[];
          specialty: string;
          dataset_link: string;
          cover_image_url?: string | null;
          sample_data?: Json | null;
          case_size?: string | null;
          submitted_by: string;
          status?: "pending" | "approved" | "rejected";
          approved_by?: string | null;
          approved_at?: string | null;
          upvotes_count?: number;
          monthly_downloads?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          abstract?: string;
          doi?: string | null;
          tags?: string[];
          specialty?: string;
          dataset_link?: string;
          cover_image_url?: string | null;
          sample_data?: Json | null;
          case_size?: string | null;
          submitted_by?: string;
          status?: "pending" | "approved" | "rejected";
          approved_by?: string | null;
          approved_at?: string | null;
          upvotes_count?: number;
          monthly_downloads?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      comments: {
        Row: {
          id: string;
          dataset_id: string;
          user_id: string;
          content: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          dataset_id: string;
          user_id: string;
          content: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          dataset_id?: string;
          user_id?: string;
          content?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      upvotes: {
        Row: {
          id: string;
          dataset_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          dataset_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          dataset_id?: string;
          user_id?: string;
          created_at?: string;
        };
      };
      downloads: {
        Row: {
          id: string;
          dataset_id: string;
          user_id: string | null;
          downloaded_at: string;
        };
        Insert: {
          id?: string;
          dataset_id: string;
          user_id?: string | null;
          downloaded_at?: string;
        };
        Update: {
          id?: string;
          dataset_id?: string;
          user_id?: string | null;
          downloaded_at?: string;
        };
      };
    };
  };
}

