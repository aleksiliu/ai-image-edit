"use client"

import { Suspense } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { EditingOptions } from './components/EditingOptions';
import { ResultDisplay } from './components/ResultDisplay';
import { useImageEditor } from './hooks/useImageEditor';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { uploadedImage, editedImage, handleImageUpload, handleApplyEdits, resetUpload, isLoading} = useImageEditor();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <main className="flex-grow container mx-auto p-4">
        <div className="flex flex-col items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <ImageUpload 
              uploadedImage={uploadedImage} 
              onImageUpload={handleImageUpload} 
              onReset={resetUpload} 
              isLoading={isLoading}
            />
            {uploadedImage && (
              <>
                <div className="absolute top-4 left-4 z-20">
                  <Button variant="outline" className="bg-gray-700 text-white border-gray-600" onClick={resetUpload}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Upload Different Image
                  </Button>
                </div>
                <EditingOptions onApplyEdits={handleApplyEdits} />
                <ResultDisplay editedImage={editedImage} />
              </>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
}