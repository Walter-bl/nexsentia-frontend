// services/timeline.ts
import { api } from "@/utils/api";

export interface TimelineItem {
  id: string;
  title: string;
  impact: "High Impact" | "Medium Impact" | "Low Impact";
  date: string;
}

export const timelineService = {
  getTimeline: (page: number = 1, limit: number = 10) =>
    api.get<{ items: TimelineItem[]; total: number }>(
      `/timeline?page=${page}&limit=${limit}`
    ),
};
