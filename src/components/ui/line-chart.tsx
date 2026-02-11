"use client";

import React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

const salesData = [
  { month: "Jan 24", goals: 250000, sales: 280000, salesArea: 280000 },
  { month: "Feb 24", goals: 420000, sales: 350000, salesArea: 350000 },
  { month: "Mar 24", goals: 380000, sales: 480000, salesArea: 480000 },
  { month: "Apr 24", goals: 520000, sales: 390000, salesArea: 390000 },
  { month: "May 24", goals: 300000, sales: 520000, salesArea: 520000 },
  { month: "Jun 24", goals: 550000, sales: 465000, salesArea: 465000 },
];

const chartConfig = {
  goals: {
    label: "Goals",
    color: "#ec4899",
  },
  sales: {
    label: "Sales",
    color: "#14b8a6",
  },
};

interface TooltipPayload {
  dataKey?: string;
  value?: number;
  color?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const ChartLabel = ({ label, color }: { label: string; color: string }) => (
  <div className="flex items-center gap-1.5">
    <div
      className="size-3.5 rounded-full border-4 bg-white"
      style={{ borderColor: color }}
    />
    <span className="text-xs text-neutral-500">{label}</span>
  </div>
);

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const filteredPayload = payload.filter(
    (entry) => entry.dataKey !== "salesArea" && entry.value !== undefined
  );

  if (!filteredPayload.length) return null;

  const base = filteredPayload[0]?.value;
  if (base === undefined) return null;

  return (
    <div className="min-w-[180px] rounded-lg border bg-white p-3 text-xs shadow-sm">
      <div className="mb-2.5 font-medium tracking-wide text-neutral-500">
        {label}
      </div>
      <div className="space-y-2">
        {filteredPayload.map((entry, index) => {
          if (entry.value === undefined || entry.color === undefined) return null;
          
          const config = chartConfig[entry.dataKey as keyof typeof chartConfig];
          const diffPct = ((entry.value - base) / base) * 100;

          return (
            <div key={index} className="flex items-center gap-2">
              <ChartLabel label={`${config?.label ?? ""}:`} color={entry.color} />
              <span className="font-semibold text-neutral-900">
                ${(entry.value / 1_000_000).toFixed(1)}M
              </span>
              {config?.label === "Goals" && (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] ${
                    diffPct > 0
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {diffPct > 0 ? (
                    <ArrowUp className="size-3" />
                  ) : (
                    <ArrowDown className="size-3" />
                  )}
                  {Math.abs(diffPct).toFixed(0)}%
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function SalesOverview() {
  return (
    <div className="flex min-h-[420px] items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">
              Sales Overview
            </h2>
            <p className="text-xs text-neutral-500">
              Performance vs. goals over the last 6 months
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <ChartLabel label="Sales" color={chartConfig.sales.color} />
            <ChartLabel label="Goals" color={chartConfig.goals.color} />
          </div>
        </div>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={salesData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="salesGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={chartConfig.sales.color}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={chartConfig.sales.color}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#e5e7eb"
                strokeOpacity={1}
                horizontal
                vertical={false}
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                dy={5}
                tickMargin={12}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                tickFormatter={(value) => `$${(value / 1_000_000).toFixed(1)}M`}
                domain={["dataMin - 50000", "dataMax + 50000"]}
                tickMargin={12}
              />

              <ReferenceLine
                x="Mar 24"
                stroke={chartConfig.sales.color}
                strokeWidth={1}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="linear"
                dataKey="salesArea"
                stroke="transparent"
                fill="url(#salesGradient)"
                strokeWidth={0}
                dot={false}
              />

              <Line
                type="linear"
                dataKey="sales"
                stroke={chartConfig.sales.color}
                strokeWidth={2}
                dot={{
                  fill: "#ffffff",
                  strokeWidth: 2,
                  r: 6,
                  stroke: chartConfig.sales.color,
                }}
              />

              <Line
                type="linear"
                dataKey="goals"
                stroke={chartConfig.goals.color}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{
                  fill: "#ffffff",
                  strokeWidth: 2,
                  r: 6,
                  stroke: chartConfig.goals.color,
                }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
