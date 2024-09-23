"use client"

import { useState, useCallback } from "react"
import { Upload, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onImageUpload: (imageDataUrl: string) => void
  uploadedImage?: string | null
  onReset?: () => void
}

export default function ImageUpload({ onImageUpload, uploadedImage, onReset }: ImageUploadProps) {
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

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }, [handleImageUpload])

  if (uploadedImage) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-100">Uploaded Image</h2>
        <img src={uploadedImage} alt="Uploaded" className="max-w-full h-auto mx-auto mb-4 rounded" />
        <Button variant="outline" className="w-full bg-gray-700 text-white border-gray-600 hover:bg-gray-600" onClick={onReset}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Upload Different Image
        </Button>
      </div>
    )
  }

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-gray-900 transition-colors ${isDragging ? 'bg-gray-800' : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute inset-6 border-4 border-dashed border-gray-600 rounded-3xl pointer-events-none animate-pulse"></div>
      
      <div className="text-center p-8 rounded-lg z-10">
        <Upload className="mx-auto mb-4 h-24 w-24 text-gray-400" />
        <h1 className="text-4xl font-bold mb-4 text-white">Image Editing Suite</h1>
        <p className="text-xl text-gray-400 mb-8">Drop your image anywhere or click to upload</p>
        <Button size="lg" variant="outline" className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700" onClick={() => document.getElementById('fileInput')?.click()}>
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