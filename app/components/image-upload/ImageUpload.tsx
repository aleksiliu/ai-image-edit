"use client"

import { useState, useCallback } from "react"
import { Upload, FileImage, LoaderCircle, AlertCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  uploadedImage?: string | null
  onReset?: () => void
  isLoading: boolean
  isUpscaling: boolean
  isRemovingBackground: boolean
  isUpscaled: boolean
  isBackgroundRemoved: boolean
}

export function ImageUpload({ 
  onImageUpload, 
  uploadedImage, 
  isLoading, 
  isUpscaling, 
  isRemovingBackground, 
  isUpscaled, 
  isBackgroundRemoved 
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAndUploadFile = (file: File) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Unsupported file format. Please upload a JPEG, PNG, GIF, or WebP image.')
      return
    }
    setError(null)
    onImageUpload(file)
  }

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndUploadFile(file)
    }
  }, [onImageUpload])

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      validateAndUploadFile(file)
    }
  }

  if (isLoading || isUpscaling || isRemovingBackground) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <LoaderCircle className="animate-spin h-24 w-24 text-white" />
        <p className="text-xl text-gray-400 mt-4">
          {isLoading && "Uploading image.."}
          {isUpscaling && "Upscaling image..."}
          {isRemovingBackground && "Removing background..."}
        </p>
      </div>
    )
  }

  if (uploadedImage) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="relative w-full max-w-6xl aspect-[4/3]">
        <img 
              src={uploadedImage} 
              alt="Uploaded" 
              className="w-full h-full object-contain rounded-lg"
            />
          <div className="absolute top-2 right-2 flex gap-2">
            {isUpscaled && (
              <Badge className="bg-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Upscaled
              </Badge>
            )}
            {isBackgroundRemoved && (
              <Badge className="bg-white bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                BG Removed
              </Badge>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center transition-colors ${isDragging ? 'bg-gray-800' : 'bg-gray-900'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="absolute inset-6 border-4 border-dashed border-gray-600 rounded-3xl pointer-events-none animate-pulse"></div>
        
        <div className="text-center p-8 rounded-lg z-10">
          {isDragging ? (
            <>
              <FileImage className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h1 className="text-4xl font-bold mb-4 text-white">Drop your image here</h1>
              <p className="text-xl text-gray-400 mb-8">Release to upload</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h1 className="text-4xl font-bold mb-4 text-white">Image Editing Suite</h1>
              <p className="text-xl text-gray-400 mb-8">Drop your image anywhere or click to upload</p>
              <Button size="lg" variant="outline" className="bg-gray-800 text-white border-gray-600" onClick={() => document.getElementById('fileInput')?.click()}>
                Select Image
              </Button>
            </>
          )}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileInput}
          />
                    {error && (
            <div className="mt-8 flex items-center justify-center text-red-500">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}