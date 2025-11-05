// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      agent_ideas: {
        Row: {
          agent_name: string
          ai_analysis_id: number
          complexity:
            | Database['public']['Enums']['agent_idea_complexity_type']
            | null
          created_at: string
          description: string | null
          expected_benefits: string | null
          id: number
          key_features: string | null
          status: Database['public']['Enums']['agent_idea_status_type']
          updated_at: string
        }
        Insert: {
          agent_name: string
          ai_analysis_id: number
          complexity?:
            | Database['public']['Enums']['agent_idea_complexity_type']
            | null
          created_at?: string
          description?: string | null
          expected_benefits?: string | null
          id?: number
          key_features?: string | null
          status?: Database['public']['Enums']['agent_idea_status_type']
          updated_at?: string
        }
        Update: {
          agent_name?: string
          ai_analysis_id?: number
          complexity?:
            | Database['public']['Enums']['agent_idea_complexity_type']
            | null
          created_at?: string
          description?: string | null
          expected_benefits?: string | null
          id?: number
          key_features?: string | null
          status?: Database['public']['Enums']['agent_idea_status_type']
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'agent_ideas_ai_analysis_id_fkey'
            columns: ['ai_analysis_id']
            isOneToOne: false
            referencedRelation: 'ai_analyses'
            referencedColumns: ['id']
          },
        ]
      }
      ai_analyses: {
        Row: {
          created_at: string
          id: number
          impact_potential: string | null
          main_pains: string | null
          maturity_level: string | null
          opportunity_mapping_id: number
          processed: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          impact_potential?: string | null
          main_pains?: string | null
          maturity_level?: string | null
          opportunity_mapping_id: number
          processed?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          impact_potential?: string | null
          main_pains?: string | null
          maturity_level?: string | null
          opportunity_mapping_id?: number
          processed?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'ai_analyses_opportunity_mapping_id_fkey'
            columns: ['opportunity_mapping_id']
            isOneToOne: true
            referencedRelation: 'opportunity_mappings'
            referencedColumns: ['id']
          },
        ]
      }
      clients: {
        Row: {
          created_at: string
          department: string | null
          digital_maturity: string | null
          id: number
          main_systems: string | null
          name: string
          operation_size: string | null
          potential_status: Database['public']['Enums']['client_potential_status']
          responsible: string | null
          trend_status: Database['public']['Enums']['client_trend_status']
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string | null
          digital_maturity?: string | null
          id?: number
          main_systems?: string | null
          name: string
          operation_size?: string | null
          potential_status?: Database['public']['Enums']['client_potential_status']
          responsible?: string | null
          trend_status?: Database['public']['Enums']['client_trend_status']
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string | null
          digital_maturity?: string | null
          id?: number
          main_systems?: string | null
          name?: string
          operation_size?: string | null
          potential_status?: Database['public']['Enums']['client_potential_status']
          responsible?: string | null
          trend_status?: Database['public']['Enums']['client_trend_status']
          updated_at?: string
        }
        Relationships: []
      }
      forms: {
        Row: {
          created_at: string
          description: string | null
          form_type: string
          id: number
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          form_type: string
          id?: number
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          form_type?: string
          id?: number
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      opportunity_mappings: {
        Row: {
          bottlenecks: string | null
          budget: number | null
          business_objective: string | null
          client_id: number
          client_interest_level:
            | Database['public']['Enums']['client_interest_level_type']
            | null
          client_name_on_mapping: string
          created_at: string
          critical_systems: string | null
          deadline_goal: string | null
          department_on_mapping: string | null
          digital_maturity_on_mapping: string | null
          email_spreadsheet_activities: string | null
          expected_benefit: string | null
          expected_impact_percentage: number | null
          id: number
          main_systems_on_mapping: string | null
          main_user: string | null
          operation_size_on_mapping: string | null
          repetitive_tasks: string | null
          responsible_on_mapping: string | null
          time_spent_today: string | null
          updated_at: string
        }
        Insert: {
          bottlenecks?: string | null
          budget?: number | null
          business_objective?: string | null
          client_id: number
          client_interest_level?:
            | Database['public']['Enums']['client_interest_level_type']
            | null
          client_name_on_mapping: string
          created_at?: string
          critical_systems?: string | null
          deadline_goal?: string | null
          department_on_mapping?: string | null
          digital_maturity_on_mapping?: string | null
          email_spreadsheet_activities?: string | null
          expected_benefit?: string | null
          expected_impact_percentage?: number | null
          id?: number
          main_systems_on_mapping?: string | null
          main_user?: string | null
          operation_size_on_mapping?: string | null
          repetitive_tasks?: string | null
          responsible_on_mapping?: string | null
          time_spent_today?: string | null
          updated_at?: string
        }
        Update: {
          bottlenecks?: string | null
          budget?: number | null
          business_objective?: string | null
          client_id?: number
          client_interest_level?:
            | Database['public']['Enums']['client_interest_level_type']
            | null
          client_name_on_mapping?: string
          created_at?: string
          critical_systems?: string | null
          deadline_goal?: string | null
          department_on_mapping?: string | null
          digital_maturity_on_mapping?: string | null
          email_spreadsheet_activities?: string | null
          expected_benefit?: string | null
          expected_impact_percentage?: number | null
          id?: number
          main_systems_on_mapping?: string | null
          main_user?: string | null
          operation_size_on_mapping?: string | null
          repetitive_tasks?: string | null
          responsible_on_mapping?: string | null
          time_spent_today?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'opportunity_mappings_client_id_fkey'
            columns: ['client_id']
            isOneToOne: false
            referencedRelation: 'clients'
            referencedColumns: ['id']
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey'
            columns: ['id']
            isOneToOne: true
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      agent_idea_complexity_type: 'Baixa' | 'Media' | 'Alta'
      agent_idea_status_type:
        | 'Rascunho'
        | 'Aprovado'
        | 'Rejeitado'
        | 'Implementado'
      agent_role_type: 'responder' | 'executar'
      client_interest_level_type: 'Alto' | 'Medio' | 'Baixo'
      client_potential_status: 'Alto' | 'Medio' | 'Baixo'
      client_trend_status: 'Alta' | 'Media' | 'Baixa'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      agent_idea_complexity_type: ['Baixa', 'Media', 'Alta'],
      agent_idea_status_type: [
        'Rascunho',
        'Aprovado',
        'Rejeitado',
        'Implementado',
      ],
      agent_role_type: ['responder', 'executar'],
      client_interest_level_type: ['Alto', 'Medio', 'Baixo'],
      client_potential_status: ['Alto', 'Medio', 'Baixo'],
      client_trend_status: ['Alta', 'Media', 'Baixa'],
    },
  },
} as const
