export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      count_mp: {
        Row: {
          book_id: number | null;
          created_at: string;
          player_id: number | null;
        };
        Insert: {
          book_id?: number | null;
          created_at?: string;
          player_id?: number | null;
        };
        Update: {
          book_id?: number | null;
          created_at?: string;
          player_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "count_mp_book_id_fkey";
            columns: ["book_id"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["room_id"];
          },
          {
            foreignKeyName: "count_mp_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "player";
            referencedColumns: ["player_id"];
          }
        ];
      };
      magic_quest: {
        Row: {
          created_at: string;
          quest_details: string | null;
          quest_id: number;
          quest_title: string | null;
          quest_type: number | null;
        };
        Insert: {
          created_at?: string;
          quest_details?: string | null;
          quest_id?: number;
          quest_title?: string | null;
          quest_type?: number | null;
        };
        Update: {
          created_at?: string;
          quest_details?: string | null;
          quest_id?: number;
          quest_title?: string | null;
          quest_type?: number | null;
        };
        Relationships: [];
      };
      magic_quest_answer: {
        Row: {
          answer_id: number;
          answer_list: Json | null;
          correct_answer: string | null;
          created_at: string;
          quest_id: number | null;
        };
        Insert: {
          answer_id?: number;
          answer_list?: Json | null;
          correct_answer?: string | null;
          created_at?: string;
          quest_id?: number | null;
        };
        Update: {
          answer_id?: number;
          answer_list?: Json | null;
          correct_answer?: string | null;
          created_at?: string;
          quest_id?: number | null;
        };
        Relationships: [];
      };
      player: {
        Row: {
          created_at: string;
          player_id: number;
          player_mp: number | null;
          room_id: number | null;
          user_id: number | null;
        };
        Insert: {
          created_at?: string;
          player_id?: number;
          player_mp?: number | null;
          room_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          created_at?: string;
          player_id?: number;
          player_mp?: number | null;
          room_id?: number | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "player_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "room";
            referencedColumns: ["room_id"];
          },
          {
            foreignKeyName: "player_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["user_id"];
          }
        ];
      };
      room: {
        Row: {
          created_at: string;
          match_history: Json | null;
          room_code: string | null;
          room_id: number;
          status: string;
          player_list: Json | null;
        };
        Insert: {
          created_at?: string;
          match_history?: Json | null;
          room_code?: string | null;
          room_id?: number;
          status?: string;
          player_list: Json | null;
        };
        Update: {
          created_at?: string;
          match_history?: Json | null;
          player_id?: number | null;
          room_code?: string | null;
          room_id?: number;
          status?: string;
          player_list: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "room_player_id_fkey";
            columns: ["player_id"];
            isOneToOne: false;
            referencedRelation: "player";
            referencedColumns: ["player_id"];
          }
        ];
      };
      spell_orb: {
        Row: {
          created_at: string;
          orb_desc: string | null;
          orb_id: number;
          orb_mp: number | null;
          orb_name: string | null;
          orb_rarity: string | null;
        };
        Insert: {
          created_at?: string;
          orb_desc?: string | null;
          orb_id?: number;
          orb_mp?: number | null;
          orb_name?: string | null;
          orb_rarity?: string | null;
        };
        Update: {
          created_at?: string;
          orb_desc?: string | null;
          orb_id?: number;
          orb_mp?: number | null;
          orb_name?: string | null;
          orb_rarity?: string | null;
        };
        Relationships: [];
      };
      user: {
        Row: {
          created_at: string;
          user_email: string | null;
          user_id: number;
          user_name: string | null;
          user_avatar: string | null;
        };
        Insert: {
          created_at?: string;
          user_email?: string | null;
          user_id?: number;
          user_name?: string | null;
          user_avatar?: string | null;
        };
        Update: {
          created_at?: string;
          user_email?: string | null;
          user_id?: number;
          user_name?: string | null;
          user_avatar?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
