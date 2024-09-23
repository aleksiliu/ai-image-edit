"use client"

import { useState, useCallback } from "react"
import { Upload, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void
  uploadedImage?: string | null
  onReset?: () => void
}

export function ImageUpload({ onImageUpload, uploadedImage, onReset }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        onImageUpload(e.target.result)
      }
    }
    reader.readAsDataURL(file)
  }, [onImageUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  if (uploadedImage) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="relative w-full max-w-4xl h-auto">
          <Image src={uploadedImage} alt="Uploaded" layout="responsive" width={1000} height={600} className="rounded" />
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gray-900 transition-colors ${isDragging ? 'bg-gray-500' : ''}`}
      onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleImageUpload(e.dataTransfer.files[0]); }}
    >
      <div className="absolute inset-6 border-4 border-dashed border-gray-600 rounded-3xl pointer-events-none animate-pulse"></div>
      
      <div className="text-center p-8 rounded-lg z-10">
        <Upload className="mx-auto mb-4 h-24 w-24 text-gray-400" />
        <h1 className="text-4xl font-bold mb-4 text-white">Image Editing Suite</h1>
        <p className="text-xl text-gray-400 mb-8">Drop your image anywhere or click to upload</p>
        <Button size="lg" variant="outline" className="bg-gray-800 text-white border-gray-600" onClick={() => document.getElementById('fileInput')?.click()}>
          Select Image
        </Button>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
      </div>
    </div>
  )
}