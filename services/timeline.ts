// services/timeline.ts
import { api } from "@/utils/api";
export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  impactLevel: "high" | "medium" | "low";
  category: string;
  sourceType: string;
  isResolved: boolean;
}


export const timelineService = {
  getTimeline: (page: number = 1, limit: number = 10) =>
    api.get<{ events: TimelineItem[]; total: number, totalPages:number }>(
      `/timeline?page=${page}&limit=${limit}`
    ),
};
