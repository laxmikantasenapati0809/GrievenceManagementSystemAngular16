export interface Complaint {
  id: number;
  description: string;
  managementType: string;
  status: string;
  phoneNumber?: string;
  userId: number;
}
