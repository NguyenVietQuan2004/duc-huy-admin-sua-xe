export type Service = {
  _id: string;
  name: string;
  content: string;
  price: string;
  images: string[]; // assuming multiple image URLs
  extra_images?: string[];
  extra_images_text?: string[];
  author_id: string;
  created_at: Date; // or Date if you're using Date objects
  updated_at: Date; // or Date
};
