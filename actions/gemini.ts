"use server";

import { ai } from "@/lib/gemini";

export async function generateVideo(
  prompt: string,
): Promise<{ success: boolean; videoUrl?: string; error?: string }> {
  try {
    let operation = await ai.models.generateVideos({
      model: "veo-3.1-generate-preview",
      prompt: prompt,
    });

    while (!operation.done) {
      console.warn("Generando video... esperando 20 segundos.");
      await new Promise((resolve) => setTimeout(resolve, 20000));

      operation = await ai.operations.getVideosOperation({
        operation: operation,
      });
    }

    if (operation?.error) {
      console.error(operation.error);

      throw new Error(operation.error?.message?.toString());
    }

    const generatedVideo = operation.response?.generatedVideos?.[0]?.video;

    if (!generatedVideo || !generatedVideo.uri) {
      throw new Error("No se devolvió una URI de video válida.");
    }

    const videoUrl = `${generatedVideo.uri}&key=${process.env.GEMINI_API_KEY}`;

    return {
      success: true,
      videoUrl: videoUrl,
    };
  } catch (err) {
    const error = err as Error;

    console.error(error?.message);

    return {
      success: false,
      error: error?.message,
    };
  }
}
