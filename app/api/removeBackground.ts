import * as fal from "@fal-ai/serverless-client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

interface RemoveBackgroundResult {
  image: {
    url: string;
  };
}

export async function removeBackground(imageUrl: string): Promise<string> {
  try {
    console.log('Starting background removal process for:', imageUrl);

    const result = await fal.subscribe("fal-ai/birefnet", {
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
    }) as RemoveBackgroundResult;

    console.log('Background removal result:', result);

    if (!result || !result.image || !result.image.url) {
      throw new Error('Failed to remove background');
    }

    console.log('Image URL with removed background:', result.image.url);
    return result.image.url;
  } catch (error) {
    console.error('Error removing background:', error);
    throw new Error('Failed to remove background');
  }
}