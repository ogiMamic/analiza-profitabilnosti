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
  {
    name: "3.10.",
    zarada: 200,
    sati: 4,
  },
  {
    name: "4.10.",
    zarada: 0,
    sati: 6,
  },
  {
    name: "5.10.",
    zarada: 800,
    sati: 10,
  },
  {
    name: "6.10.",
    zarada: 0,
    sati: 12,
  },
  {
    name: "7.10.",
    zarada: 0,
    sati: 0,
  },
  {
    name: "8.10.",
    zarada: 450,
    sati: 14,
  },
  {
    name: "9.10.",
    zarada: 0,
    sati: 16,
  },
  {
    name: "10.10.",
    zarada: 1200,
    sati: 2,
  },
  {
    name: "11.10.",
    zarada: 0,
    sati: 4,
  },
  {
    name: "12.10.",
    zarada: 300,
    sati: 8,
  },
  {
    name: "13.10.",
    zarada: 0,
    sati: 2,
  },
  {
    name: "14.10.",
    zarada: 0,
    sati: 3,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `€${value}`}
        />
        <Tooltip
          formatter={(value, name) => {
            return [name === "zarada" ? `€${value}` : `${value}h`, name === "zarada" ? "Zarada" : "Sati rada"]
          }}
        />
        <Bar dataKey="zarada" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="sati" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-muted" />
      </BarChart>
    </ResponsiveContainer>
  )
}

