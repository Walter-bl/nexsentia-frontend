export interface User {
  id: string;
  name: string;
  email: string;
}


export interface UerInfo {
  id: number;
  email: string;
  tenantId: number;
  role: string;
  permissions: string[];
}
