import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const hashedPassword = await hash("password123", 10)

  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      address: "123 Test Street",
      city: "Test City",
      country: "Test Country",
      contact: "1234567890",
    },
  })

  // Create products
  const products = [
    {
      name: "Classic Black T-Shirt",
      description: "A comfortable and versatile black t-shirt made from 100% cotton.",
      price: 19.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
      color: "black",
    },
    {
      name: "Blue Denim Jeans",
      description: "Stylish blue jeans with a modern fit, perfect for any casual occasion.",
      price: 49.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      color: "blue",
    },
    {
      name: "Gray Hoodie",
      description: "A warm and cozy hoodie for those chilly days, featuring a kangaroo pocket.",
      price: 39.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      color: "gray",
    },
    {
      name: "White Graphic T-Shirt",
      description: "A stylish white t-shirt with a unique graphic design on the front.",
      price: 24.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
      color: "white",
    },
    {
      name: "Black Skinny Jeans",
      description: "Sleek black skinny jeans that provide both comfort and style.",
      price: 54.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      color: "black",
    },
    {
      name: "Red Zip-Up Hoodie",
      description: "A vibrant red hoodie with a full-length zipper and adjustable hood.",
      price: 44.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      color: "red",
    },
    {
      name: "Striped T-Shirt",
      description: "A classic striped t-shirt with a comfortable fit.",
      price: 22.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "T-shirts",
      color: "blue",
    },
    {
      name: "Distressed Jeans",
      description: "Trendy distressed jeans with a relaxed fit.",
      price: 59.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Jeans",
      color: "blue",
    },
    {
      name: "Pullover Hoodie",
      description: "A comfortable pullover hoodie perfect for layering.",
      price: 42.99,
      image: "/placeholder.svg?height=300&width=300",
      category: "Hoodies",
      color: "black",
    },
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product,
    })
  }

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

