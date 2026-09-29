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
    };
    CompositeTypes: { [_ in never]: never };
  };
};
