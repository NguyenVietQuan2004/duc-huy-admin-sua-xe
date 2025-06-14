export interface PriceServiceType {
  _id?: string;
  name_service: string;
  vehicle_type: string[];
  unit: string[];
  price: string[];
  created_at?: Date;
  updated_at?: Date;
}
