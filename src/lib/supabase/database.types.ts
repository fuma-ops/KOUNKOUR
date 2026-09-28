// Généré depuis le schéma Supabase du projet KounKour (Phase 2).
// Régénérer après chaque migration : mcp__Supabase__generate_typescript_types.

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
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
      is_staff: { Args: { uid: string }; Returns: boolean };
    };
    Enums: {
      app_role: "utilisateur" | "moderateur" | "editeur" | "administrateur";
    };
    CompositeTypes: { [_ in never]: never };
  };
};
