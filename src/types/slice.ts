export interface ListMedicine {
  id: number;
  status: string;
  total_price: number;
  currency: string;
  updated_at: string;
}

export interface ListMedicineResponse {
  data: ListMedicine[];
  message: string;
}
