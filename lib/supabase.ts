import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Klijent za korištenje u komponentama
export const supabase = createClientComponentClient()

// Klijent za korištenje u server akcijama i API rutama
export const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey)

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

