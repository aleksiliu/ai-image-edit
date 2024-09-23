import * as fal from "@fal-ai/serverless-client";

fal.config({
    proxyUrl: "/api/fal/proxy",
  });

export async function uploadImage(file: File): Promise<string> {
  console.log("Starting image upload...");

  try {
    const url = await fal.storage.upload(file);
    console.log("Image uploaded successfully:", url);
    return url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
}