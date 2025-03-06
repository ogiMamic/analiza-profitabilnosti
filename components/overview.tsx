"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "1.10.",
    zarada: 400,
    sati: 8,
  },
  {
    name: "2.10.",
    zarada: 300,
    sati: 5,
  },
  // Dodajte ostale podatke iz originalnog koda
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip 
          formatter={(value, name) => {
            return [
              name === "zarada" ? `€${value}` : `${value}h`, 
              name === "zarada" ? "Zarada" : "Sati rada"
            ]
          }}
        />
        <Bar
          dataKey="zarada"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
        <Bar
          dataKey="sati"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-muted"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}