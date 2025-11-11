"use client";

import { useQuery } from "@tanstack/react-query";

import {
  ActivityItem,
  ProjectSummary,
  UsageMetric,
  fetchActivityFeed,
  fetchProjectSummaries,
  fetchUsageMetrics,
} from "@/lib/api-client";

export function useDashboardData(isEnabled: boolean) {
  const usageQuery = useQuery<UsageMetric[]>({
    queryKey: ["usage-metrics"],
    queryFn: () => fetchUsageMetrics(),
    enabled: isEnabled,
  });

  const projectQuery = useQuery<ProjectSummary[]>({
    queryKey: ["projects"],
    queryFn: () => fetchProjectSummaries(),
    enabled: isEnabled,
  });

  const activityQuery = useQuery<ActivityItem[]>({
    queryKey: ["activity"],
    queryFn: () => fetchActivityFeed(),
    enabled: isEnabled,
  });

  return {
    usageQuery,
    projectQuery,
    activityQuery,
  };
}
