export type Contact = {
  _id: string;
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
  handled?: boolean;
  created_at?: Date;
};
