"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { createTask } from "@/app/actions/task-actions"
import { toast } from "sonner"

const taskFormSchema = z.object({
  name: z.string().min(2, {
    message: "Naziv zadatka mora imati najmanje 2 znaka",
  }),
  category: z.enum(["direct", "investment"], {
    required_error: "Molimo odaberite kategoriju zadatka",
  }),
  duration: z.coerce.number().min(0.5, {
    message: "Trajanje mora biti najmanje 0.5 sati",
  }),
  cost: z.coerce.number().min(0, {
    message: "Trošak ne može biti negativan",
  }),
  currentRevenue: z.coerce.number().min(0, {
    message: "Trenutna zarada ne može biti negativna",
  }),
  potentialRevenue: z.coerce.number().min(0, {
    message: "Potencijalna zarada ne može biti negativna",
  }),
  completionDate: z.date({
    required_error: "Datum završetka je obavezan",
  }),
  revenueDate: z.date().optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

export default function NewTaskPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const defaultValues: Partial<TaskFormValues> = {
    name: "",
    duration: 1,
    cost: 0,
    currentRevenue: 0,
    potentialRevenue: 0,
    completionDate: new Date(),
  }

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
  })

  async function onSubmit(data: TaskFormValues) {
    setIsPending(true)

    try {
      // Pripremi podatke za server action
      const taskData = {
        name: data.name,
        category: data.category,
        duration: data.duration,
        cost: data.cost,
        currentRevenue: data.category === "direct" ? data.currentRevenue : 0,
        potentialRevenue: data.category === "investment" ? data.potentialRevenue : 0,
        completionDate: data.completionDate.toISOString(),
        revenueDate: data.revenueDate ? data.revenueDate.toISOString() : null,
      }

      // Pozovi server action
      await createTask(taskData)

      toast.success("Zadatak je uspješno spremljen!")
      router.push("/tasks")
    } catch (error) {
      console.error("Error saving task:", error)
      toast.error("Došlo je do greške prilikom spremanja zadatka.")
    } finally {
      setIsPending(false)
    }
  }

  const watchCategory = form.watch("category")

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Novi Zadatak</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Odustani
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Podaci o zadatku</CardTitle>
          <CardDescription>Unesite detalje o zadatku kako biste mogli pratiti njegovu profitabilnost</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naziv zadatka</FormLabel>
                      <FormControl>
                        <Input placeholder="Izrada logotipa za klijenta X" {...field} />
                      </FormControl>
                      <FormDescription>Unesite deskriptivan naziv zadatka</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategorija</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberite kategoriju zadatka" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="direct">Direktno naplativo</SelectItem>
                          <SelectItem value="investment">Investicija</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Direktno naplativo za zadatke koji odmah donose zaradu, Investicija za dugoročne zadatke
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trajanje (h)</FormLabel>
                      <FormControl>
                        <Input type="number" min={0.5} step={0.5} {...field} />
                      </FormControl>
                      <FormDescription>Unesite koliko sati rada je potrebno za zadatak</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trošak (€)</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} step={1} {...field} />
                      </FormControl>
                      <FormDescription>Direktni troškovi povezani sa zadatkom (alati, oglasi, itd.)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className="grid gap-6 md:grid-cols-2">
                {watchCategory === "direct" ? (
                  <FormField
                    control={form.control}
                    name="currentRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trenutna zarada (€)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step={1} {...field} />
                        </FormControl>
                        <FormDescription>Iznos koji naplaćujete za ovaj zadatak</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="potentialRevenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potencijalna zarada (€)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step={1} {...field} />
                        </FormControl>
                        <FormDescription>Procijenjena vrijednost koju očekujete u budućnosti</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="completionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Datum završetka</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "dd.MM.yyyy") : <span>Odaberite datum</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Datum kada je zadatak završen</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchCategory === "investment" && (
                <FormField
                  control={form.control}
                  name="revenueDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Očekivani datum zarade</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? format(field.value, "dd.MM.yyyy") : <span>Odaberite datum</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Približni datum kada očekujete da će investicija donijeti zaradu
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Spremanje..." : "Spremi zadatak"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

