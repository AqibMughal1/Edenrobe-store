"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/lib/cart-context"

export default function CartPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, updateQuantity, removeFromCart, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUpdateQuantity = (id, quantity) => {
    updateQuantity(id, quantity)
  }

  const handleRemoveItem = (id) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleCheckout = () => {
    clearCart()
    router.push("/checkout/success")
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  if (!mounted) {
    return null
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground">Review your items and proceed to checkout</p>
        </div>
        {items.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4 sm:flex-row">
                  <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="capitalize">{item.color}</span>
                        <Separator orientation="vertical" className="h-3" />
                        <span>{item.category}</span>
                      </div>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium">Order Summary</h3>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="font-medium">Need Help?</h3>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Our customer service is available 24/7 to assist you with any questions or concerns.</p>
                  <p>
                    <Link href="#" className="text-primary hover:underline">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-muted p-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground">Looks like you haven&apos;t added anything to your cart yet.</p>
            </div>
            <Link href="/catalog">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

