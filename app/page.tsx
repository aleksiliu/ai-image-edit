"use client"

import { Suspense } from 'react';
import { ImageUpload } from './components/image-upload/ImageUpload';
import { EditingOptions } from './components/editing-options/EditingOptions';
import { useImageEditor } from './hooks/useImageEditor';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  const { 
    uploadedImage, 
    editedImage, 
    handleImageUpload, 
    handleRemoveBackground, 
    handleUpscale, 
    resetUpload, 
    isLoading, 
    isUpscaling, 
    isRemovingBackground,
    isUpscaled,
    isBackgroundRemoved
  } = useImageEditor();

  const handleDownload = () => {
    if (!editedImage) {
      console.log("No edited image available for download.");
      return;
    }
    console.log("Starting download of edited image.");
    fetch(editedImage)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'upscaled-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log("Download completed.");
      })
      .catch(error => console.error("Error downloading the image:", error));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <main className="flex-grow container mx-auto">
        <div className="flex flex-col items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <ImageUpload 
              uploadedImage={uploadedImage} 
              onImageUpload={handleImageUpload} 
              onReset={resetUpload} 
              isLoading={isLoading}
              isUpscaling={isUpscaling}
              isRemovingBackground={isRemovingBackground}
              isUpscaled={isUpscaled}
              isBackgroundRemoved={isBackgroundRemoved}
            />
            {uploadedImage && (
              <>
                <div className="absolute top-4 left-4 z-20">
                  <Button variant="outline" className="bg-gray-700 text-white border-gray-600" onClick={resetUpload}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Upload Different Image
                  </Button>
                </div>
                <EditingOptions 
                  onUpscale={handleUpscale} 
                  onRemoveBackground={handleRemoveBackground}
                  onDownload={handleDownload} 
                  editedImage={editedImage} 
                  isUpscaling={isUpscaling}
                  isRemovingBackground={isRemovingBackground}
                />
              </>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}