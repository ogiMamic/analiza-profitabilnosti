import { Suspense } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TasksTable } from "@/components/tasks-table"
import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic"

export default function TasksPage() {
  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Zadaci</h1>
        <Link href="/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novi Zadatak
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Učitavanje zadataka...</div>}>
        <TasksTableWrapper />
      </Suspense>
    </div>
  )
}

async function TasksTableWrapper() {
  const { data: tasks, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching tasks:", error)
    return <div>Došlo je do greške prilikom dohvaćanja zadataka.</div>
  }

  return <TasksTable tasks={tasks || []} />
}

