"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void
  defaultImage?: string
}

export default function ImageUpload({ onImageUploaded, defaultImage }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(defaultImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Preview the image
    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)

    // Upload the image
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload image")
      }

      onImageUploaded(data.imageUrl)
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully.",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemoveImage = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    onImageUploaded("")
  }

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />

      {preview ? (
        <div className="relative aspect-square w-full max-w-[300px] overflow-hidden rounded-lg border">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
          <Button variant="destructive" size="icon" className="absolute right-2 top-2" onClick={handleRemoveImage}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={handleButtonClick}
          className="flex aspect-square w-full max-w-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 p-4 transition-colors hover:bg-muted/50"
        >
          <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">Click to upload image</p>
          <p className="text-xs text-muted-foreground">JPEG, PNG, WebP up to 5MB</p>
        </div>
      )}

      <Button type="button" variant="outline" onClick={handleButtonClick} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
    </div>
  )
}

