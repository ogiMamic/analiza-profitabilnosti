"use server"

import { supabaseAdmin, type Task } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function createTask(task: Omit<Task, "id" | "roi" | "created_at">) {
  // Izračunaj ROI
  let roi: number | null = null

  if (task.category === "direct" && task.duration > 0) {
    roi = (task.currentRevenue - task.cost) / task.duration
  } else if (task.category === "investment" && task.duration > 0) {
    roi = (task.potentialRevenue - task.cost) / task.duration
  }

  // Pripremi podatke za spremanje
  const taskToSave = {
    ...task,
    roi,
    // Pretvori datume u ISO format ako su Date objekti
    completionDate: task.completionDate instanceof Date ? task.completionDate.toISOString() : task.completionDate,
    revenueDate: task.revenueDate instanceof Date ? task.revenueDate.toISOString() : task.revenueDate,
  }

  // Spremi u Supabase
  const { data, error } = await supabaseAdmin.from("tasks").insert(taskToSave).select().single()

  if (error) {
    console.error("Error creating task:", error)
    throw new Error(`Failed to create task: ${error.message}`)
  }

  // Osvježi podatke na stranicama
  revalidatePath("/tasks")
  revalidatePath("/")

  return data
}

