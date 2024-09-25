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


    if (!result || !result.image || !result.image.url) {
      throw new Error('Failed to upscale image');
    }

    return result.image.url;
  } catch (error) {

    throw new Error('Failed to upscale image');
  }
}