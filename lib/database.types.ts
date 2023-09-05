export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      moods: {
        Row: {
          created_at: string
          id: string
          mood: Database["public"]["Enums"]["mood_enum"]
          note: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mood: Database["public"]["Enums"]["mood_enum"]
          note?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mood?: Database["public"]["Enums"]["mood_enum"]
          note?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "moods_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          id: string
          name: string
          username: string
        }
        Insert: {
          avatar_url: string
          id: string
          name: string
          username: string
        }
        Update: {
          avatar_url?: string
          id?: string
          name?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      mood_enum: "sad" | "angry" | "neutral" | "happy" | "excited"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
