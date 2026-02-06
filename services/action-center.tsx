import { api } from "@/utils/api";


// Action Center Item type
export interface ActionCenterItem {
  id: string;
  title: string;
  description: string;
  status: "open" | "closed" | "in_progress";
  priority: "critical" | "high" | "medium" | "low";
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
}



// Optional: query params for filtering
export interface ActionCenterParams {
  status?: any;
  priority?: any;
  search?: string;
  page?: number;
  limit?: number;
}

export const actionCenterService = {
  /**
   * Fetch action center items with optional filters
   */
  getItems: (params: ActionCenterParams = {}) => {
    const { status, priority, search, page, limit } = params;

    // Build query string
    const query = new URLSearchParams();
    if (status) query.append("status", status);
    if (priority) query.append("priority", priority);
    if (search) query.append("search", search);
    // if (page) query.append("page", page.toString());
    // if (limit) query.append("limit", limit.toString());

    return api.get<ActionCenterItem[]>(`/action-center?${query.toString()}`);
  },
};
