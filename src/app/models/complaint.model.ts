export interface Complaint {
  id: number;
  description: string;
  managementType: string;
  departmentType: string;
  status: string;
  phoneNumber?: string;
  userId: number;
}
