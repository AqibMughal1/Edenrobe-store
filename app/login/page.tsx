"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useIsLoggedIn()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock token - in real app this would come from your backend
      const mockToken = "mock-jwt-token"
      
      login(mockToken)
      
      toast({
        title: "Logged in successfully",
        description: "Welcome back!",
      })
      
      router.push("/catalog")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

