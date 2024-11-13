export interface Complaint {
  id: number;
  description: string;
  status: string;
  departmentType: string;  // Keep camelCase
  phoneNumber: string;     // Keep camelCase
  managementType: string;  // Keep camelCase
  userId: number;
}
