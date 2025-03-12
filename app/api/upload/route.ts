import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { v4 as uuidv4 } from "uuid"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Check file type
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed." },
        { status: 400 },
      )
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const filename = `${uuidv4()}-${file.name.replace(/\s/g, "_")}`
    const path = join(process.cwd(), "public/uploads", filename)

    // Ensure the uploads directory exists
    const uploadsDir = join(process.cwd(), "public/uploads")
    try {
      await writeFile(join(uploadsDir, ".gitkeep"), "")
    } catch (error) {
      // Directory already exists or cannot be created
    }

    // Write the file
    await writeFile(path, buffer)

    // Return the path that can be used to access the file
    const imageUrl = `/uploads/${filename}`

    return NextResponse.json({ success: true, imageUrl })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

