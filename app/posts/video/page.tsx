"use client";

import { useState } from "react";
import { generateVideo } from "@/actions/gemini";

export default function VideoGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const result = await generateVideo(prompt);
      
      if (result.success && result.videoUrl) {
        setVideoUrl(result.videoUrl);
      } else {
        setError(result.error || "Ocurrió un error al generar el video.");
      }
    } catch (err) {
      setError("Ocurrió un error inesperado al llamar a la acción.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Generador de Video</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Ingresa un prompt detallado para generar un video usando IA.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Prompt del video
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ejemplo: Un astronauta montado a caballo en la luna al estilo cinemático..."
            className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-white"
            disabled={isGenerating}
          />
        </div>
        
        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 text-white shadow hover:bg-blue-700 h-10 px-4 py-2 w-full sm:w-auto"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generando video...
            </>
          ) : (
            "Generar Video"
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error al generar el video</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {videoUrl && (
        <div className="space-y-4 rounded-lg border border-gray-200 p-4 bg-gray-50 dark:bg-gray-900/50 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Resultado Generado</h2>
          <div className="aspect-video relative overflow-hidden rounded-lg border border-gray-200 bg-black dark:border-gray-800">
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
          <div className="flex justify-end">
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Abrir video original web
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
