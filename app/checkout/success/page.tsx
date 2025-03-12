import Link from "next/link"
import { CheckCircle, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CheckoutSuccessPage() {
  return (
    <div className="container max-w-md px-4 py-16 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="rounded-full bg-primary/10 p-6">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6 w-full">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Order Number</span>
              <span className="text-sm">#ED{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Date</span>
              <span className="text-sm">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email</span>
              <span className="text-sm">customer@example.com</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link href="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
          <Link href="/catalog">
            <Button variant="outline" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

