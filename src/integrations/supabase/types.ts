export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      mc_build_projects: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_credentials: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_custom_modules: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_habits: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_ideas: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_links: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_notes: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_payments: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_repos: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_settings: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_sync_log: {
        Row: {
          direction: string | null
          id: number
          synced_at: string | null
          tables: string[] | null
        }
        Insert: {
          direction?: string | null
          id?: number
          synced_at?: string | null
          tables?: string[] | null
        }
        Update: {
          direction?: string | null
          id?: number
          synced_at?: string | null
          tables?: string[] | null
        }
        Relationships: []
      }
      mc_tasks: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
      mc_websites: {
        Row: {
          data: Json | null
          id: string
        }
        Insert: {
          data?: Json | null
          id: string
        }
        Update: {
          data?: Json | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
