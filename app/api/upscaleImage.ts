import * as fal from "@fal-ai/serverless-client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

interface UpscaleResult {
  image: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
    width: number;
    height: number;
  };
  timings: {
    inference: number;
  };
}

export async function upscaleImage(imageUrl: string): Promise<string> {
  try {
    console.log('Starting image upscaling process for:', imageUrl);

    const result = await fal.subscribe("fal-ai/aura-sr", {
      input: {
        image_url: imageUrl,
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Queue update:', update);
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    }) as UpscaleResult; // Type assertion here

    console.log('Upscale result:', result);

    if (!result || !result.image || !result.image.url) {
      throw new Error('Failed to upscale image');
    }

    console.log('Upscaled image URL:', result.image.url);
    return result.image.url;
  } catch (error) {
    console.error('Error upscaling image:', error);
    throw new Error('Failed to upscale image');
  }
}