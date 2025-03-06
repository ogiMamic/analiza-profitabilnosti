import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Task = {
  id?: string
  name: string
  category: "direct" | "investment"
  duration: number
  cost: number
  currentRevenue: number
  potentialRevenue: number
  completionDate: string
  revenueDate: string | null
  roi: number | null
  created_at?: string
}

