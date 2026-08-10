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
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          business_name: string
          business_type: string | null
          city: string | null
          created_at: string
          email: string | null
          estimated_opportunity: number | null
          id: string
          language: string
          locations: string | null
          missed_revenue: number | null
          neighborhood: string | null
          noshow_revenue: number | null
          owner_name: string | null
          phone: string | null
          priority: string | null
          recommended_plan: string | null
          status: Database["public"]["Enums"]["lead_status"]
          submitted_at: string | null
          total_score: number | null
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          estimated_opportunity?: number | null
          id?: string
          language?: string
          locations?: string | null
          missed_revenue?: number | null
          neighborhood?: string | null
          noshow_revenue?: number | null
          owner_name?: string | null
          phone?: string | null
          priority?: string | null
          recommended_plan?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          submitted_at?: string | null
          total_score?: number | null
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          estimated_opportunity?: number | null
          id?: string
          language?: string
          locations?: string | null
          missed_revenue?: number | null
          neighborhood?: string | null
          noshow_revenue?: number | null
          owner_name?: string | null
          phone?: string | null
          priority?: string | null
          recommended_plan?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          submitted_at?: string | null
          total_score?: number | null
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: []
      }
      diagnostic_answers: {
        Row: {
          answer: Json | null
          created_at: string
          diagnostic_id: string
          id: string
          language: string
          question_id: string
        }
        Insert: {
          answer?: Json | null
          created_at?: string
          diagnostic_id: string
          id?: string
          language?: string
          question_id: string
        }
        Update: {
          answer?: Json | null
          created_at?: string
          diagnostic_id?: string
          id?: string
          language?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnostic_answers_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      diagnostics: {
        Row: {
          answers: Json
          completed_at: string | null
          created_at: string
          estimated_opportunity: number | null
          id: string
          language: string
          missed_revenue: number | null
          noshow_revenue: number | null
          priority: string | null
          recommended_plan: string | null
          status: string
          total_score: number | null
          updated_at: string
        }
        Insert: {
          answers?: Json
          completed_at?: string | null
          created_at?: string
          estimated_opportunity?: number | null
          id?: string
          language?: string
          missed_revenue?: number | null
          noshow_revenue?: number | null
          priority?: string | null
          recommended_plan?: string | null
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Update: {
          answers?: Json
          completed_at?: string | null
          created_at?: string
          estimated_opportunity?: number | null
          id?: string
          language?: string
          missed_revenue?: number | null
          noshow_revenue?: number | null
          priority?: string | null
          recommended_plan?: string | null
          status?: string
          total_score?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      lead_scores: {
        Row: {
          category: string
          created_at: string
          diagnostic_id: string
          id: string
          max_score: number
          score: number
        }
        Insert: {
          category: string
          created_at?: string
          diagnostic_id: string
          id?: string
          max_score: number
          score: number
        }
        Update: {
          category?: string
          created_at?: string
          diagnostic_id?: string
          id?: string
          max_score?: number
          score?: number
        }
        Relationships: [
          {
            foreignKeyName: "lead_scores_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          business_name: string
          business_type: string | null
          city: string | null
          created_at: string
          diagnostic_id: string
          email: string | null
          id: string
          locations: string | null
          neighborhood: string | null
          owner_name: string | null
          phone: string | null
          status: Database["public"]["Enums"]["lead_status"]
          updated_at: string
          whatsapp: string | null
        }
        Insert: {
          business_name: string
          business_type?: string | null
          city?: string | null
          created_at?: string
          diagnostic_id: string
          email?: string | null
          id?: string
          locations?: string | null
          neighborhood?: string | null
          owner_name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          whatsapp?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string | null
          city?: string | null
          created_at?: string
          diagnostic_id?: string
          email?: string | null
          id?: string
          locations?: string | null
          neighborhood?: string | null
          owner_name?: string | null
          phone?: string | null
          status?: Database["public"]["Enums"]["lead_status"]
          updated_at?: string
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      pain_points: {
        Row: {
          created_at: string
          diagnostic_id: string
          estimated_impact: number | null
          id: string
          key: string
          recommended_product: string | null
          severity: string
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          estimated_impact?: number | null
          id?: string
          key: string
          recommended_product?: string | null
          severity: string
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          estimated_impact?: number | null
          id?: string
          key?: string
          recommended_product?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "pain_points_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      recommendations: {
        Row: {
          created_at: string
          diagnostic_id: string
          id: string
          priority: string
          product: string
          rank: number
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          id?: string
          priority: string
          product: string
          rank?: number
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          id?: string
          priority?: string
          product?: string
          rank?: number
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      sales_notes: {
        Row: {
          created_at: string
          diagnostic_id: string
          id: string
          note: string
          user_id: string
        }
        Insert: {
          created_at?: string
          diagnostic_id: string
          id?: string
          note: string
          user_id: string
        }
        Update: {
          created_at?: string
          diagnostic_id?: string
          id?: string
          note?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sales_notes_diagnostic_id_fkey"
            columns: ["diagnostic_id"]
            isOneToOne: false
            referencedRelation: "diagnostics"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "sales"
      lead_status:
        | "new"
        | "contacted"
        | "demo_scheduled"
        | "trial"
        | "won"
        | "lost"
        | "nurture"
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
    Enums: {
      app_role: ["admin", "sales"],
      lead_status: [
        "new",
        "contacted",
        "demo_scheduled",
        "trial",
        "won",
        "lost",
        "nurture",
      ],
    },
  },
} as const
