export interface ArtForm {
  id: string;
  title: string;
  description: string;
  origin: string;
  type: string;
  image_url_1: string;
  image_url_2?: string;
  image_url_3?: string;
  likes: number;
  created_at?: string;
  updated_at?: string;
}

export interface Database {
  public: {
    Tables: {
      art_forms: {
        Row: ArtForm;
        Insert: Omit<ArtForm, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<ArtForm, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}