'use server'

import { db } from "./db"

export async function getProducts() {
  try {
    const products = await db.product.findMany()
    return products
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getProductById(id) {
  try {
    const product = await db.product.findUnique({
      where: { id },
    })
    return product
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await db.product.findMany({
      take: 3,
    })
    return products
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function createProduct(productData) {
  try {
    const product = await db.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image: productData.image,
        category: productData.category,
        color: productData.color,
      },
    })
    return product
  } catch (error) {
    console.error("Error creating product:", error)
    throw new Error("Failed to create product")
  }
}

// This is a mock function for development
export async function getMockProducts() {
  return [
    {
      id: "1",
      name: "Classic Black T-Shirt",
      description: "A comfortable and versatile black t-shirt made from 100% cotton.",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
      color: "black",
    },
    {
      id: "2",
      name: "Blue Denim Jeans",
      description: "Stylish blue jeans with a modern fit, perfect for any casual occasion.",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      color: "blue",
    },
    {
      id: "3",
      name: "Gray Hoodie",
      description: "A warm and cozy hoodie for those chilly days, featuring a kangaroo pocket.",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      color: "gray",
    },
    {
      id: "4",
      name: "White Graphic T-Shirt",
      description: "A stylish white t-shirt with a unique graphic design on the front.",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
      color: "white",
    },
    {
      id: "5",
      name: "Black Skinny Jeans",
      description: "Sleek black skinny jeans that provide both comfort and style.",
      price: 54.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      color: "black",
    },
    {
      id: "6",
      name: "Red Zip-Up Hoodie",
      description: "A vibrant red hoodie with a full-length zipper and adjustable hood.",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      color: "red",
    },
  ]
}

