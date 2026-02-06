// services/privacy.ts
import { api } from "@/utils/api";

// Privacy Architecture
export interface PrivacyArchitecture {
  anonymizationRate: number; // 0-100
  piiStored: number;
  soc2Compliant: boolean;
  gdprCompliant: boolean;
  message: string;
}

// Individual Data Source
export interface Source {
  id: string;
  name: string;
  platform: string;
  isConnected: boolean;
  users: number;
  threads: number;
  participants: number;
  piiStored: number;
  lastSync: string | null;
  category: string;
  itemsProcessed: number;
}

// Data Sources Summary
export interface DataSources {
  totalSources: number;
  totalPiiStored: number;
  activeConnections: number;
  lastUpdate: string;
  sources: Source[];
}

// Privacy Guarantee Item
export interface PrivacyGuaranteeItem {
  enabled: boolean;
  description: string;
}

// Privacy Guarantees
export interface PrivacyGuarantees {
  fullyAnonymized: PrivacyGuaranteeItem;
  noPersonalIdentification: PrivacyGuaranteeItem;
  noDataStorage: PrivacyGuaranteeItem;
  ephemeralProcessing: PrivacyGuaranteeItem;
}

// Compliance Items
export interface SOC2Compliance {
  compliant: boolean;
  lastAudit: string;
  nextAudit: string;
}

export interface GDPRCompliance {
  compliant: boolean;
  dataProcessingAgreement: boolean;
  rightToErasure: boolean;
  dataPortability: boolean;
}

export interface HIPAACompliance {
  compliant: boolean;
  reason: string;
}

export interface CCPACompliance {
  compliant: boolean;
  optOutMechanism: boolean;
  dataDisclosure: boolean;
}

export interface ComplianceStatus {
  soc2: SOC2Compliance;
  gdpr: GDPRCompliance;
  hipaa: HIPAACompliance;
  ccpa: CCPACompliance;
}

// Full Privacy Dashboard Data
export interface PrivacyDashboardData {
  privacyArchitecture: PrivacyArchitecture;
  dataSources: DataSources;
  privacyGuarantees: PrivacyGuarantees;
  complianceStatus: ComplianceStatus;
}

// Service
export const privacyService = {
  getDashboard: () =>
    api.get<PrivacyDashboardData>("/privacy/dashboard"),
};
