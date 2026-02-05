// services/privacy.ts
import { api } from "@/utils/api";

export interface PrivacyDashboardData {
  privacySection: any[]; // replace `any` with actual type
  dataSources: any[];
  guarantees: any[];
}

export const privacyService = {
  getDashboard: () =>
    api.get<PrivacyDashboardData>("/privacy/dashboard"),
};
