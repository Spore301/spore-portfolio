"use client"

import { Bar, BarChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useMemo, useState, useEffect } from "react"

export function MetricChart({ className = "h-[80px]", seed = 1 }: { className?: string, seed?: number }) {
  // We use state to only render random jitter on the client after mount to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = useMemo(() => {
    const base = [10, 20, 15, 35, 40, 60, 85];
    return base.map((val, i) => {
        // Add pseudo-random jitter based on the seed
        let jitter = 0;
        if (isMounted) {
            const randomOffset = Math.sin(val * seed * 1.5) * 10;
            jitter = Math.max(-5, randomOffset);
        }
        return {
            label: `Day ${i+1}`,
            value: Math.max(5, val + jitter)
        };
    });
  }, [seed, isMounted]);

  const chartConfig = {
    value: {
      label: "Activity",
      color: "#89CFF0", // Baby blue accent style
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className={`${className} w-full`}>
      <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Bar dataKey="value" fill="var(--color-value)" radius={[2, 2, 0, 0]} />
        <ChartTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<ChartTooltipContent hideLabel />} />
      </BarChart>
    </ChartContainer>
  )
}
