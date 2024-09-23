import { useState, useEffect } from 'react';
import { uploadImage } from '../api/auraSr';

export function useImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
      console.log("Loaded saved image from localStorage:", savedImage);
      setUploadedImage(savedImage);
    }
  }, []);

  const handleImageUpload = async (file: File) => {
    console.log("Uploading image...");
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      setUploadedImage(imageUrl);
      localStorage.setItem('uploadedImage', imageUrl);
      console.log("Image URL saved:", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyEdits = () => {
    console.log("Applying edits to image...");
    // Simulating image editing process
    setEditedImage(uploadedImage);
    console.log("Edits applied, edited image URL:", uploadedImage);
  };

  const resetUpload = () => {
    console.log("Resetting upload...");
    setUploadedImage(null);
    setEditedImage(null);
    localStorage.removeItem('uploadedImage');
    console.log("Upload reset, localStorage cleared.");
  };

  return {
    uploadedImage,
    editedImage,
    isLoading,
    handleImageUpload,
    handleApplyEdits,
    resetUpload,
  };
}