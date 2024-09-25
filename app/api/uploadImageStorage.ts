import * as fal from "@fal-ai/serverless-client";

fal.config({
    proxyUrl: "/api/fal/proxy",
  });

export async function uploadImage(file: File): Promise<string> {

  try {
    const url = await fal.storage.upload(file);
    return url;
  } catch (error) {
    throw error;
  }
}