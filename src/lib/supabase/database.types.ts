// Généré depuis le schéma Supabase du projet KounKour.
// Régénérer après chaque migration : mcp__Supabase__generate_typescript_types.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      administrations: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
          name_ar: string | null;
          name_fr: string;
          official_site: string | null;
          slug: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
          name_ar?: string | null;
          name_fr: string;
          official_site?: string | null;
          slug: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: string;
          name_ar?: string | null;
          name_fr?: string;
          official_site?: string | null;
          slug?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      contest_bookmarks: {
        Row: { contest_id: string; created_at: string; user_id: string };
        Insert: { contest_id: string; created_at?: string; user_id: string };
        Update: { contest_id?: string; created_at?: string; user_id?: string };
        Relationships: [
          {
            foreignKeyName: "contest_bookmarks_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };
      contest_criteria: {
        Row: {
          contest_id: string;
          created_at: string;
          criterion_type: string;
          id: string;
          position: number;
          source_excerpt: string | null;
          source_page: string | null;
          value_ar: string | null;
          value_fr: string | null;
          verification_state: Database["public"]["Enums"]["verification_state"];
        };
        Insert: {
          contest_id: string;
          created_at?: string;
          criterion_type: string;
          id?: string;
          position?: number;
          source_excerpt?: string | null;
          source_page?: string | null;
          value_ar?: string | null;
          value_fr?: string | null;
          verification_state?: Database["public"]["Enums"]["verification_state"];
        };
        Update: {
          contest_id?: string;
          created_at?: string;
          criterion_type?: string;
          id?: string;
          position?: number;
          source_excerpt?: string | null;
          source_page?: string | null;
          value_ar?: string | null;
          value_fr?: string | null;
          verification_state?: Database["public"]["Enums"]["verification_state"];
        };
        Relationships: [
          {
            foreignKeyName: "contest_criteria_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };
      contest_documents: {
        Row: {
          contest_id: string;
          created_at: string;
          doc_type: string;
          file_hash: string | null;
          format: string | null;
          id: string;
          language: string | null;
          position: number;
          rights_status: string | null;
          size_kb: number | null;
          source_label: string | null;
          title_ar: string | null;
          title_fr: string | null;
          url: string;
        };
        Insert: {
          contest_id: string;
          created_at?: string;
          doc_type: string;
          file_hash?: string | null;
          format?: string | null;
          id?: string;
          language?: string | null;
          position?: number;
          rights_status?: string | null;
          size_kb?: number | null;
          source_label?: string | null;
          title_ar?: string | null;
          title_fr?: string | null;
          url: string;
        };
        Update: {
          contest_id?: string;
          created_at?: string;
          doc_type?: string;
          file_hash?: string | null;
          format?: string | null;
          id?: string;
          language?: string | null;
          position?: number;
          rights_status?: string | null;
          size_kb?: number | null;
          source_label?: string | null;
          title_ar?: string | null;
          title_fr?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "contest_documents_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };
      contest_versions: {
        Row: {
          author_id: string | null;
          contest_id: string;
          created_at: string;
          id: string;
          snapshot: Json;
          source_url: string | null;
        };
        Insert: {
          author_id?: string | null;
          contest_id: string;
          created_at?: string;
          id?: string;
          snapshot: Json;
          source_url?: string | null;
        };
        Update: {
          author_id?: string | null;
          contest_id?: string;
          created_at?: string;
          id?: string;
          snapshot?: Json;
          source_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "contest_versions_contest_id_fkey";
            columns: ["contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
        ];
      };
      contests: {
        Row: {
          administration_id: string | null;
          apply_url: string | null;
          created_at: string;
          created_by: string | null;
          deadline_date: string | null;
          diploma_ar: string | null;
          diploma_fr: string | null;
          exam_date: string | null;
          id: string;
          opening_date: string | null;
          positions: number | null;
          published_at: string | null;
          reference: string | null;
          region_ar: string | null;
          region_fr: string | null;
          slug: string;
          source_org: string | null;
          source_url: string;
          status: Database["public"]["Enums"]["contest_status"];
          summary_ar: string | null;
          summary_fr: string | null;
          title_ar: string | null;
          title_fr: string | null;
          title_original: string;
          updated_at: string;
          verified_at: string | null;
          verified_by: string | null;
        };
        Insert: {
          administration_id?: string | null;
          apply_url?: string | null;
          created_at?: string;
          created_by?: string | null;
          deadline_date?: string | null;
          diploma_ar?: string | null;
          diploma_fr?: string | null;
          exam_date?: string | null;
          id?: string;
          opening_date?: string | null;
          positions?: number | null;
          published_at?: string | null;
          reference?: string | null;
          region_ar?: string | null;
          region_fr?: string | null;
          slug: string;
          source_org?: string | null;
          source_url: string;
          status?: Database["public"]["Enums"]["contest_status"];
          summary_ar?: string | null;
          summary_fr?: string | null;
          title_ar?: string | null;
          title_fr?: string | null;
          title_original: string;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Update: {
          administration_id?: string | null;
          apply_url?: string | null;
          created_at?: string;
          created_by?: string | null;
          deadline_date?: string | null;
          diploma_ar?: string | null;
          diploma_fr?: string | null;
          exam_date?: string | null;
          id?: string;
          opening_date?: string | null;
          positions?: number | null;
          published_at?: string | null;
          reference?: string | null;
          region_ar?: string | null;
          region_fr?: string | null;
          slug?: string;
          source_org?: string | null;
          source_url?: string;
          status?: Database["public"]["Enums"]["contest_status"];
          summary_ar?: string | null;
          summary_fr?: string | null;
          title_ar?: string | null;
          title_fr?: string | null;
          title_original?: string;
          updated_at?: string;
          verified_at?: string | null;
          verified_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "contests_administration_id_fkey";
            columns: ["administration_id"];
            isOneToOne: false;
            referencedRelation: "administrations";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          consents: Json;
          created_at: string;
          display_name: string | null;
          id: string;
          language: string;
          preferences: Json;
          region: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          consents?: Json;
          created_at?: string;
          display_name?: string | null;
          id: string;
          language?: string;
          preferences?: Json;
          region?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          consents?: Json;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          language?: string;
          preferences?: Json;
          region?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      smart_match_preferences: {
        Row: {
          user_id: string;
          diploma_level: number | null;
          specialty: string | null;
          region: string | null;
          domain: string | null;
          match_consent: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          diploma_level?: number | null;
          specialty?: string | null;
          region?: string | null;
          domain?: string | null;
          match_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          diploma_level?: number | null;
          specialty?: string | null;
          region?: string | null;
          domain?: string | null;
          match_consent?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          role: Database["public"]["Enums"]["app_role"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          role?: Database["public"]["Enums"]["app_role"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      radar_sources: {
        Row: {
          active: boolean;
          base_url: string;
          category: string | null;
          created_at: string;
          domain: string;
          id: string;
          min_delay_seconds: number;
          name_ar: string | null;
          name_fr: string;
          notes: string | null;
          robots_allowed: boolean | null;
          robots_checked: boolean;
          slug: string;
          tos_url: string | null;
          updated_at: string;
        };
        Insert: {
          active?: boolean;
          base_url: string;
          category?: string | null;
          created_at?: string;
          domain: string;
          id?: string;
          min_delay_seconds?: number;
          name_ar?: string | null;
          name_fr: string;
          notes?: string | null;
          robots_allowed?: boolean | null;
          robots_checked?: boolean;
          slug: string;
          tos_url?: string | null;
          updated_at?: string;
        };
        Update: {
          active?: boolean;
          base_url?: string;
          category?: string | null;
          created_at?: string;
          domain?: string;
          id?: string;
          min_delay_seconds?: number;
          name_ar?: string | null;
          name_fr?: string;
          notes?: string | null;
          robots_allowed?: boolean | null;
          robots_checked?: boolean;
          slug?: string;
          tos_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      radar_runs: {
        Row: {
          created_at: string;
          error_message: string | null;
          finished_at: string | null;
          id: string;
          items_detected: number;
          items_new: number;
          source_id: string;
          started_at: string;
          status: Database["public"]["Enums"]["radar_run_status"];
          trigger: string;
        };
        Insert: {
          created_at?: string;
          error_message?: string | null;
          finished_at?: string | null;
          id?: string;
          items_detected?: number;
          items_new?: number;
          source_id: string;
          started_at?: string;
          status?: Database["public"]["Enums"]["radar_run_status"];
          trigger?: string;
        };
        Update: {
          created_at?: string;
          error_message?: string | null;
          finished_at?: string | null;
          id?: string;
          items_detected?: number;
          items_new?: number;
          source_id?: string;
          started_at?: string;
          status?: Database["public"]["Enums"]["radar_run_status"];
          trigger?: string;
        };
        Relationships: [
          {
            foreignKeyName: "radar_runs_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "radar_sources";
            referencedColumns: ["id"];
          },
        ];
      };
      radar_candidates: {
        Row: {
          administration_category: string | null;
          administration_name: string | null;
          administration_site: string | null;
          created_at: string;
          deadline_date: string | null;
          deadline_text: string | null;
          degree_level: string | null;
          external_id: string | null;
          id: string;
          imported_contest_id: string | null;
          positions: number | null;
          publication_text: string | null;
          raw: Json;
          region: string | null;
          review_notes: string | null;
          reviewed_at: string | null;
          reviewed_by: string | null;
          run_id: string | null;
          scraped_at: string;
          source_id: string;
          source_url: string;
          specialty: string | null;
          status: Database["public"]["Enums"]["radar_candidate_status"];
          title_ar: string | null;
          title_original: string;
          updated_at: string;
        };
        Insert: {
          administration_category?: string | null;
          administration_name?: string | null;
          administration_site?: string | null;
          created_at?: string;
          deadline_date?: string | null;
          deadline_text?: string | null;
          degree_level?: string | null;
          external_id?: string | null;
          id?: string;
          imported_contest_id?: string | null;
          positions?: number | null;
          publication_text?: string | null;
          raw?: Json;
          region?: string | null;
          review_notes?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          run_id?: string | null;
          scraped_at?: string;
          source_id: string;
          source_url: string;
          specialty?: string | null;
          status?: Database["public"]["Enums"]["radar_candidate_status"];
          title_ar?: string | null;
          title_original: string;
          updated_at?: string;
        };
        Update: {
          administration_category?: string | null;
          administration_name?: string | null;
          administration_site?: string | null;
          created_at?: string;
          deadline_date?: string | null;
          deadline_text?: string | null;
          degree_level?: string | null;
          external_id?: string | null;
          id?: string;
          imported_contest_id?: string | null;
          positions?: number | null;
          publication_text?: string | null;
          raw?: Json;
          region?: string | null;
          review_notes?: string | null;
          reviewed_at?: string | null;
          reviewed_by?: string | null;
          run_id?: string | null;
          scraped_at?: string;
          source_id?: string;
          source_url?: string;
          specialty?: string | null;
          status?: Database["public"]["Enums"]["radar_candidate_status"];
          title_ar?: string | null;
          title_original?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "radar_candidates_imported_contest_id_fkey";
            columns: ["imported_contest_id"];
            isOneToOne: false;
            referencedRelation: "contests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "radar_candidates_run_id_fkey";
            columns: ["run_id"];
            isOneToOne: false;
            referencedRelation: "radar_runs";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "radar_candidates_source_id_fkey";
            columns: ["source_id"];
            isOneToOne: false;
            referencedRelation: "radar_sources";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      contest_is_public: {
        Args: { s: Database["public"]["Enums"]["contest_status"] };
        Returns: boolean;
      };
      is_staff: { Args: { uid: string }; Returns: boolean };
    };
    Enums: {
      app_role: "utilisateur" | "moderateur" | "editeur" | "administrateur";
      contest_status:
        | "brouillon"
        | "a_verifier"
        | "publie"
        | "mis_a_jour"
        | "cloture"
        | "annule"
        | "resultats_publies"
        | "archive";
      verification_state: "a_verifier" | "verifie" | "incertain";
      radar_candidate_status: "pending_review" | "imported" | "ignored";
      radar_run_status: "running" | "success" | "error";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
