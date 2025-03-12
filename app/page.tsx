import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products"

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 gradient-theme opacity-10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Your Style with <span className="gradient-text">EdenRobe</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Elevate your wardrobe with our premium collection of T-shirts, hoodies, and jeans. Quality craftsmanship
                meets contemporary design.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/catalog">
                  <Button size="lg" className="gradient-theme">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="gradient-border">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[600px] overflow-hidden rounded-xl">
              <Image
                src="/shirtman.webp?height=600&width=800"
                alt="EdenRobe Collection"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Featured Products</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our latest collection of premium clothing designed for comfort and style.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 gradient-border"
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="bg-background p-4">
                  <h3 className="font-semibold">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">{product.category}</p>
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="gradient-border">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative">
        <div className="absolute inset-0 gradient-theme opacity-10"></div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="gradient-text">Shop by Category</span>
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find exactly what you're looking for in our curated collections.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3 lg:gap-8">
            <Link
              href="/catalog?category=T-shirts"
              className="group relative overflow-hidden rounded-lg shadow-lg gradient-border"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/shirtman.webp?height=400&width=600"
                  alt="T-shirts"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">T-shirts</h3>
              </div>
            </Link>
            <Link
              href="/catalog?category=Hoodies"
              className="group relative overflow-hidden rounded-lg shadow-lg gradient-border"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/hoodie.webp?height=400&width=600"
                  alt="Hoodies"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Hoodies</h3>
              </div>
            </Link>
            <Link
              href="/catalog?category=Jeans"
              className="group relative overflow-hidden rounded-lg shadow-lg gradient-border"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src="/jeans.webp?height=400&width=600"
                  alt="Jeans"
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Jeans</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

