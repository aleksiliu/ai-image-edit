"use client"

import { useState, useEffect } from 'react';

export function useImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleImageUpload = (imageDataUrl: string) => {
    setUploadedImage(imageDataUrl);
    localStorage.setItem('uploadedImage', imageDataUrl);
  };

  const handleApplyEdits = () => {
    // Simulating image editing process
    setEditedImage(uploadedImage);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setEditedImage(null);
    localStorage.removeItem('uploadedImage');
  };

  return {
    uploadedImage,
    editedImage,
    handleImageUpload,
    handleApplyEdits,
    resetUpload,
  };
}