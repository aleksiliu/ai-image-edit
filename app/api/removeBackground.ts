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

  

    if (!result || !result.image || !result.image.url) {
      throw new Error('Failed to remove background');
    }

    return result.image.url;

  } catch (error) {

    throw new Error('Failed to remove background');
  }
}