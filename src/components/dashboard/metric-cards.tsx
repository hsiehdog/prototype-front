import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsageMetric } from "@/lib/api-client";

type MetricCardsProps = {
  metrics?: UsageMetric[];
  isLoading?: boolean;
};

export function MetricCards({ metrics, isLoading }: MetricCardsProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={`metric-skeleton-${index}`} className="border-muted">
            <CardHeader className="gap-1">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics?.length) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => {
        const TrendIcon = metric.delta >= 0 ? ArrowUpRight : ArrowDownRight;
        const trendColor =
          metric.delta >= 0 ? "text-emerald-500" : "text-amber-500";

        return (
          <Card key={metric.id} className="border-muted">
            <CardHeader className="gap-1">
              <CardTitle className="text-sm text-muted-foreground">
                {metric.label}
              </CardTitle>
              <p className="text-2xl font-semibold">{metric.value}</p>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              <span>{Math.abs(metric.delta)}%</span>
              <span className="text-muted-foreground/80">
                {metric.delta >= 0 ? "vs last period" : "slower this week"}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
