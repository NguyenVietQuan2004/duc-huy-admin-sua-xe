export interface Reason {
  _id: string;
  title: string;
  content: string;
  author_id: string;
  images: string[];
  reason: string[];
  created_at?: Date;
  updated_at?: Date;
}
