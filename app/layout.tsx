import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Analiza Profitabilnosti Zadataka",
  description: "Aplikacija za praćenje profitabilnosti zadataka i projekata",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hr">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

