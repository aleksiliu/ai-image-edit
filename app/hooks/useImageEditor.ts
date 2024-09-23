"use client"

import { useState } from 'react';

export function useImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
  };

  const handleApplyEdits = () => {
    // Simulating image editing process
    setEditedImage(uploadedImage);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setEditedImage(null);
  };

  return {
    uploadedImage,
    editedImage,
    handleImageUpload,
    handleApplyEdits,
    resetUpload,
  };
}