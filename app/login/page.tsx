"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

const loginSchema = z.object({
  email: z.string().email({ message: "Unesite valjanu email adresu" }),
  password: z.string().min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
})

const registerSchema = z
  .object({
    email: z.string().email({ message: "Unesite valjanu email adresu" }),
    password: z.string().min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
    confirmPassword: z.string().min(6, { message: "Lozinka mora imati najmanje 6 znakova" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Lozinke se ne podudaraju",
    path: ["confirmPassword"],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectedFrom") || "/"
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onLoginSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error("Neuspješna prijava: " + error.message)
        return
      }

      toast.success("Uspješno ste prijavljeni!")
      router.push(redirectTo)
      router.refresh()
    } catch (error) {
      console.error("Login error:", error)
      toast.error("Došlo je do greške prilikom prijave")
    } finally {
      setIsLoading(false)
    }
  }

  async function onRegisterSubmit(data: RegisterFormValues) {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        toast.error("Neuspješna registracija: " + error.message)
        return
      }

      toast.success("Registracija uspješna! Provjerite svoj email za potvrdu.")
      loginForm.setValue("email", data.email)
      loginForm.setValue("password", data.password)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("Došlo je do greške prilikom registracije")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Analiza Profitabilnosti Zadataka</CardTitle>
          <CardDescription>Prijavite se ili registrirajte za pristup aplikaciji</CardDescription>
        </CardHeader>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Prijava</TabsTrigger>
            <TabsTrigger value="register">Registracija</TabsTrigger>
          </TabsList>
          <CardContent className="p-6">
            <TabsContent value="login" className="mt-0">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="vas@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lozinka</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Prijava u tijeku..." : "Prijavi se"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            <TabsContent value="register" className="mt-0">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="vas@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lozinka</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potvrdite lozinku</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Registracija u tijeku..." : "Registriraj se"}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </CardContent>
        </Tabs>
        <CardFooter className="flex flex-col space-y-4 border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Prijavom prihvaćate naše uvjete korištenja i politiku privatnosti.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

