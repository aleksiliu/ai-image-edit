"use client"

import { useState, useCallback } from "react"
import { Upload, FileImage, LoaderCircle, AlertCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import Image from 'next/image'

interface ImageUploadProps {
  onImageUpload: (file: File) => void
  uploadedImage?: string | null
  onReset?: () => void
  isLoading: boolean
  isUpscaling: boolean
  isRemovingBackground: boolean
}

export function ImageUpload({ 
  onImageUpload, 
  uploadedImage, 
  onReset, 
  isLoading, 
  isUpscaling, 
  isRemovingBackground 
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
          {isLoading && "Uploading..."}
          {isUpscaling && "Scaling..."}
          {isRemovingBackground && "Removing background..."}
        </p>
      </div>
    )
  }

  if (uploadedImage) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen bg-gray-900 overflow-auto">
        <div className="relative w-full max-w-4xl h-auto">
          <div className="relative overflow-hidden rounded-lg shadow-[0_0_15px_5px_rgba(255,255,255,0.05)]">
            <Image 
              src={uploadedImage} 
              alt="Uploaded" 
              width={1000} 
              height={600} 
              className="rounded object-contain w-full h-auto" 
            />
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
              <FileImage className="mx-auto mb-4 h-24 w-24 text-gray-400" />
              <h1 className="text-4xl font-bold mb-4 text-white">Drop your image here</h1>
              <p className="text-xl text-gray-400 mb-8">Release to upload</p>
            </>
          ) : (
            <>
              <Upload className="mx-auto mb-4 h-24 w-24 text-gray-400" />
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