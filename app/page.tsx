"use client"

import { useState } from "react"
import ImageUpload from "./components/ImageUpload"
import EditingOptions from "./components/EditingOptions"
import ResultDisplay from "./components/ResultDisplay"


export default function Home() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [editedImage, setEditedImage] = useState<string | null>(null)

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl)
  }

  const handleApplyEdits = () => {
    // Simulating image editing process
    setEditedImage(uploadedImage)
  }

  const resetUpload = () => {
    setUploadedImage(null)
    setEditedImage(null)
  }

  if (!uploadedImage) {
    return <ImageUpload onImageUpload={handleImageUpload} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ImageUpload 
            uploadedImage={uploadedImage} 
            onImageUpload={handleImageUpload} 
            onReset={resetUpload} 
          />
          <EditingOptions onApplyEdits={handleApplyEdits} />
          <ResultDisplay editedImage={editedImage} />
        </div>
      </main>
    </div>
  )
}