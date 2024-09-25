import { useState, useEffect } from 'react';
import { uploadImage } from '../api/uploadImageStorage';
import { upscaleImage } from '../api/upscaleImage';
import { removeBackground } from '../api/removeBackground';

export function useImageEditor() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpscaling, setIsUpscaling] = useState(false);
  const [isRemovingBackground, setIsRemovingBackground] = useState(false);
  const [isUpscaled, setIsUpscaled] = useState(false);
  const [isBackgroundRemoved, setIsBackgroundRemoved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const savedEditedImage = localStorage.getItem('editedImage');
    const savedUploadedImage = localStorage.getItem('uploadedImage');
    if (savedEditedImage) {
      setEditedImage(savedEditedImage);
      setUploadedImage(savedEditedImage);
    } else if (savedUploadedImage) {
      setUploadedImage(savedUploadedImage);
    }
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      setUploadedImage(imageUrl);
      setOriginalImage(imageUrl);
      localStorage.setItem('uploadedImage', imageUrl);
    } catch (error) {
      setErrorMessage("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpscale = async () => {
    if (!uploadedImage) return;
    setIsUpscaling(true);
    try {
      const upscaledImageUrl = await upscaleImage(uploadedImage);
      setUploadedImage(upscaledImageUrl); 
      setEditedImage(upscaledImageUrl); 
      setIsUpscaled(true);
      localStorage.setItem('uploadedImage', upscaledImageUrl);
      localStorage.setItem('editedImage', upscaledImageUrl);
    } catch (error) {
      setErrorMessage("Failed to upscale image. Please try again.");
    } finally {
      setIsUpscaling(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;
    setIsRemovingBackground(true);
    try {
      const removedBgImageUrl = await removeBackground(uploadedImage);
      setUploadedImage(removedBgImageUrl);
      setEditedImage(removedBgImageUrl);
      setIsBackgroundRemoved(true);
      localStorage.setItem('uploadedImage', removedBgImageUrl);
      localStorage.setItem('editedImage', removedBgImageUrl);
    } catch (error) {
      setErrorMessage("Failed to remove background. Please try again.");
    } finally {
      setIsRemovingBackground(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setEditedImage(null);
    localStorage.removeItem('uploadedImage');
    localStorage.removeItem('editedImage');
    setIsUpscaled(false);
    setIsBackgroundRemoved(false);
    setErrorMessage(null);
  };

  return {
    uploadedImage,
    editedImage,
    isLoading,
    isUpscaling,
    isRemovingBackground,
    originalImage,
    handleImageUpload,
    handleRemoveBackground,
    handleUpscale,
    resetUpload,
    isUpscaled,
    isBackgroundRemoved,
    errorMessage,
  };
}