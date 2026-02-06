import { api } from "@/utils/api";

export type TimeRange = "7d" |"14d" | "1m" | "3m" | "6m" | "1y";

export interface OrganizationalPulseResponse {
  healthScore: number;
  previous: number;
  target: number;
  industryAvg: number;

  strategicAlignment: {
    value: number;
    change: number;
  };

  communicationEfficiency: {
    value: number;
    change: number;
  };

  escalations: {
    total: number;
    chart: number[];
    labels: string[];
  };
}

export const kpiService = {
  organizationalPulse: (timeRange: TimeRange = "1m") =>
    api.get<OrganizationalPulseResponse>(
      `/kpi/dashboard/organizational-pulse?timeRange=${timeRange}`
    ),
};





// Optional: type the API response
export interface SignalApiItem {
  title: string;
  incidents: number;
  signals: number;
  achieved: number;
  fillColor: string;
}

// Optional: filter options for the API
export interface MetricsParams {
  category?: string;
  isActive?: boolean;
  timeRange?: "7d" | "1m" | "3m" | "6m" | "1y";
}

export const SIGNALS = {
  /**
   * Fetch metrics from /kpi/metrics
   * @param params Optional query parameters
   */
  metrics: (params: MetricsParams = {}) => {
    const { category = "incident_management", isActive = true, timeRange } = params;

    let query = `?category=${category}&isActive=${isActive}`;
    if (timeRange) query += `&timeRange=${timeRange}`;

    return api.get<SignalApiItem[]>(`/kpi/metrics${query}`);
  },
  getSignalDetail: (signalId: string | number) =>
    api.get<any>(`/kpi/dashboard/signals/${signalId}`),
};



