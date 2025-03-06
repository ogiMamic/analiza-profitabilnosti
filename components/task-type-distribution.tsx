"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    name: "Direktno naplativo",
    value: 60,
    color: "hsl(var(--primary))",
  },
  {
    name: "Investicija",
    value: 40,
    color: "hsl(var(--muted))",
  },
]

export function TaskTypeDistribution() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => {
              return [`${value}%`, name]
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}