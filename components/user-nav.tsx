"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function UserNav() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    async function getUserEmail() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserEmail(user?.email || null)
    }

    getUserEmail()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Uspješno ste odjavljeni")
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
      toast.error("Došlo je do greške prilikom odjave")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{userEmail ? userEmail[0].toUpperCase() : "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Korisnik</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail || "Korisnik"}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/tasks")}>Zadaci</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>Postavke</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Odjava</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

