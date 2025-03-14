'use server'

import { db } from "./db"
import { hash, compare } from "bcryptjs"

export async function registerUser(userData) {
  try {
    // Hash the password
    const hashedPassword = await hash(userData.password, 10)

    // Create user in the database
    const user = await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        address: userData.address,
        city: userData.city,
        country: userData.country,
        contact: userData.contact,
      },
    })

    return user
  } catch (error) {
    console.error("Error registering user:", error)
    throw new Error("Failed to register user")
  }
}

export async function loginUser(email, password) {
  try {
    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return false
    }

    // Compare passwords
    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      return false
    }

    return true
  } catch (error) {
    console.error("Error logging in:", error)
    throw new Error("Failed to login")
  }
}

