"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Filter, SlidersHorizontal } from "lucide-react"
import { useIsLoggedIn } from "@/hooks/useIsLoggedIn"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { getProducts } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [mounted, setMounted] = useState(false)
  const isLoggedIn = useIsLoggedIn()

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([0, 200])
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    colors: [],
    minPrice: 0,
    maxPrice: 200,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const data = await getProducts()
        setProducts(data)
        setFilteredProducts(data)

        // Find min and max prices
        if (data.length > 0) {
          const prices = data.map((p) => p.price)
          const min = Math.floor(Math.min(...prices))
          const max = Math.ceil(Math.max(...prices))
          setPriceRange([min, max])
          setFilters((prev) => ({
            ...prev,
            minPrice: min,
            maxPrice: max,
          }))
        }
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setFilters((prev) => ({
        ...prev,
        category: categoryParam,
      }))
    }
  }, [searchParams])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const applyFilters = () => {
    let filtered = [...products]

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Filter by color
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => filters.colors.includes(product.color))
    }

    // Filter by price
    filtered = filtered.filter((product) => product.price >= filters.minPrice && product.price <= filters.maxPrice)

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === category ? "" : category,
    }))
  }

  const handleColorChange = (color) => {
    setFilters((prev) => {
      const colors = prev.colors.includes(color) ? prev.colors.filter((c) => c !== color) : [...prev.colors, color]

      return {
        ...prev,
        colors,
      }
    })
  }

  const handlePriceChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1],
    }))
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      colors: [],
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    })
  }

  if (!mounted) {
    return null
  }

  if (!isLoggedIn) {
    return (
      <div className="container flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-2xl font-bold mb-4">Please Login to View Catalog</h1>
        <p className="text-muted-foreground mb-6">You need to be logged in to browse products</p>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Catalog</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto flex md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="px-1 py-6">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Categories</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="t-shirts-mobile"
                          checked={filters.category === "T-shirts"}
                          onCheckedChange={() => handleCategoryChange("T-shirts")}
                        />
                        <Label htmlFor="t-shirts-mobile">T-shirts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hoodies-mobile"
                          checked={filters.category === "Hoodies"}
                          onCheckedChange={() => handleCategoryChange("Hoodies")}
                        />
                        <Label htmlFor="hoodies-mobile">Hoodies</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="jeans-mobile"
                          checked={filters.category === "Jeans"}
                          onCheckedChange={() => handleCategoryChange("Jeans")}
                        />
                        <Label htmlFor="jeans-mobile">Jeans</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium">Colors</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="black-mobile"
                          checked={filters.colors.includes("black")}
                          onCheckedChange={() => handleColorChange("black")}
                        />
                        <Label htmlFor="black-mobile">Black</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="white-mobile"
                          checked={filters.colors.includes("white")}
                          onCheckedChange={() => handleColorChange("white")}
                        />
                        <Label htmlFor="white-mobile">White</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="blue-mobile"
                          checked={filters.colors.includes("blue")}
                          onCheckedChange={() => handleColorChange("blue")}
                        />
                        <Label htmlFor="blue-mobile">Blue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="red-mobile"
                          checked={filters.colors.includes("red")}
                          onCheckedChange={() => handleColorChange("red")}
                        />
                        <Label htmlFor="red-mobile">Red</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Price Range</h3>
                      <div className="text-sm text-muted-foreground">
                        ${filters.minPrice} - ${filters.maxPrice}
                      </div>
                    </div>
                    <Slider
                      defaultValue={[filters.minPrice, filters.maxPrice]}
                      max={priceRange[1]}
                      min={priceRange[0]}
                      step={1}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                  </div>
                  <Button onClick={clearFilters} variant="outline" className="w-full">
                    Clear Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden space-y-6 md:block">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="t-shirts"
                    checked={filters.category === "T-shirts"}
                    onCheckedChange={() => handleCategoryChange("T-shirts")}
                  />
                  <Label htmlFor="t-shirts">T-shirts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hoodies"
                    checked={filters.category === "Hoodies"}
                    onCheckedChange={() => handleCategoryChange("Hoodies")}
                  />
                  <Label htmlFor="hoodies">Hoodies</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="jeans"
                    checked={filters.category === "Jeans"}
                    onCheckedChange={() => handleCategoryChange("Jeans")}
                  />
                  <Label htmlFor="jeans">Jeans</Label>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="black"
                    checked={filters.colors.includes("black")}
                    onCheckedChange={() => handleColorChange("black")}
                  />
                  <Label htmlFor="black">Black</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="white"
                    checked={filters.colors.includes("white")}
                    onCheckedChange={() => handleColorChange("white")}
                  />
                  <Label htmlFor="white">White</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="blue"
                    checked={filters.colors.includes("blue")}
                    onCheckedChange={() => handleColorChange("blue")}
                  />
                  <Label htmlFor="blue">Blue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="red"
                    checked={filters.colors.includes("red")}
                    onCheckedChange={() => handleColorChange("red")}
                  />
                  <Label htmlFor="red">Red</Label>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Price Range</h3>
                <div className="text-sm text-muted-foreground">
                  ${filters.minPrice} - ${filters.maxPrice}
                </div>
              </div>
              <Slider
                defaultValue={[filters.minPrice, filters.maxPrice]}
                max={priceRange[1]}
                min={priceRange[0]}
                step={1}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={handlePriceChange}
                className="py-4"
              />
            </div>
            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear Filters
            </Button>
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
                </span>
              </div>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="aspect-square bg-muted animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                      <div className="mt-2 h-4 w-1/2 bg-muted animate-pulse rounded" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <Link href={`/product/${product.id}`} className="relative block aspect-square">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </Link>
                    <CardContent className="p-4">
                      <div className="space-y-1">
                        <Link href={`/product/${product.id}`} className="font-medium hover:underline">
                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{product.category}</span>
                          <span className="font-medium">${product.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: product.color }} />
                          <span className="text-xs capitalize text-muted-foreground">{product.color}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button onClick={() => handleAddToCart(product)} className="w-full" size="sm">
                        Add to Cart
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3 py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium">No products found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search term</p>
                </div>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

