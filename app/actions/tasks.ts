'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { TaskFormValues } from '@/lib/types'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

// Dohvaćanje korisničke sesije
async function getUserSession() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('Niste prijavljeni')
  }
  
  return session
}

// Kreiranje novog zadatka
export async function createTask(values: TaskFormValues) {
  try {
    const session = await getUserSession()
    
    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        user_id: session.user.id,
        name: values.name,
        category: values.category,
        duration: values.duration,
        cost: values.cost,
        current_revenue: values.currentRevenue,
        potential_revenue: values.potentialRevenue,
        completion_date: values.completionDate.toISOString(),
        revenue_date: values.revenueDate ? values.revenueDate.toISOString() : null,
      }])
      .select()
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/tasks')
    return { success: true, data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Nepoznata greška' }
  }
}

// Dohvaćanje svih zadataka korisnika
export async function getTasks() {
  try {
    const session = await getUserSession()
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', session.user.id)
      .order('completion_date', { ascending: false })
    
    if (error) {
      throw new Error(`Greška pri dohvaćanju zadataka: ${error.message}`)
    }
    
    return data
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}

// Dohvaćanje jednog zadatka
export async function getTask(id: string) {
  try {
    const session = await getUserSession()
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .eq('user_id', session.user.id)
      .single()
    
    if (error) {
      throw new Error(`Greška pri dohvaćanju zadatka: ${error.message}`)
    }
    
    return data
  } catch (error) {
    console.error('Error fetching task:', error)
    return null
  }
}

// Ažuriranje zadatka
export async function updateTask(id: string, values: TaskFormValues) {
  try {
    const session = await getUserSession()
    
    const { data, error } = await supabase
      .from('tasks')
      .update({
        name: values.name,
        category: values.category,
        duration: values.duration,
        cost: values.cost,
        current_revenue: values.currentRevenue,
        potential_revenue: values.potentialRevenue,
        completion_date: values.completionDate.toISOString(),
        revenue_date: values.revenueDate ? values.revenueDate.toISOString() : null,
      })
      .eq('id', id)
      .eq('user_id', session.user.id)
      .select()
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/tasks')
    return { success: true, data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Nepoznata greška' }
  }
}

// Brisanje zadatka
export async function deleteTask(id: string) {
  try {
    const session = await getUserSession()
    
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id)
    
    if (error) {
      return { error: error.message }
    }
    
    revalidatePath('/tasks')
    return { success: true }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Nepoznata greška' }
  }
}