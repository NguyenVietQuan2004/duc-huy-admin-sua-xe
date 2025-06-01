export type Service = {
  _id: string;
  name: string;
  content: string;
  price: string;
  images: string[]; // assuming multiple image URLs
  author_id: string;
  created_at: Date; // or Date if you're using Date objects
  updated_at: Date; // or Date
};
