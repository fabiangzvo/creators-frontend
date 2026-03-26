"use client";

import { JSX, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  CheckCircle2,
  Image as ImageIcon,
  Info,
  Sparkles,
  Wand2,
  Upload,
  Zap,
  Clapperboard,
  Edit2,
} from "lucide-react";
import Image from "next/image";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const steps = ["Configuración", "Confirmación"];

export default function CreateAvatarPage(): JSX.Element {
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");
  const [avatarName, setAvatarName] = useState("Professional Headshot v1");

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="flex-grow flex flex-col items-center py-10 px-4 md:px-8 w-full max-w-7xl">
      {/* Stepper */}
      <div className="w-full max-w-4xl mb-10">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-center w-full max-w-2xl mx-auto">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isComplete = index < currentStep;

              return (
                <li
                  key={index}
                  className={`relative flex-1 ${index === steps.length - 1 ? "flex-none" : ""}`}
                >
                  {index < steps.length - 1 && (
                    <div
                      className="absolute inset-0 flex items-center w-full"
                      style={{ left: "50%", right: "-50%" }}
                    >
                      <div
                        className={`h-0.5 w-full ${isComplete ? "bg-primary-500" : "bg-slate-200 dark:bg-slate-700"}`}
                      />
                    </div>
                  )}

                  <div className="relative flex flex-col items-center justify-center group">
                    <button
                      className={`relative flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-background z-10 ${
                        isComplete
                          ? "bg-primary-500 hover:bg-primary-600 text-white"
                          : isActive
                            ? "bg-background border-2 border-primary-500"
                            : "bg-background border-2 border-slate-300 dark:border-slate-600"
                      }`}
                      disabled={index > currentStep}
                      onClick={() =>
                        index < currentStep && setCurrentStep(index)
                      }
                    >
                      {isComplete ? (
                        <Check className="w-4 h-4" />
                      ) : isActive ? (
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-500" />
                      ) : null}
                      <span className="sr-only">{step}</span>
                    </button>
                    <span
                      className={`absolute -bottom-6 text-xs font-semibold whitespace-nowrap ${
                        isActive
                          ? "text-primary-500"
                          : isComplete
                            ? "text-primary-500"
                            : "text-slate-500 dark:text-slate-400 font-medium"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-4xl shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-background">
        {currentStep === 0 && (
          <div className="flex flex-col h-full">
            <CardHeader className="p-8 pb-0 text-center md:text-left flex-col items-start">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Configuración del Avatar
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                Paso 1: Elige tu material fuente para comenzar el proceso de
                generación.
              </p>
            </CardHeader>
            <CardBody className="p-0 mt-8 min-h-[400px]">
              <Tabs
                aria-label="Opciones de origen"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded-none p-0 border-b border-divider px-8",
                  cursor: "w-full bg-primary-500",
                  tab: "max-w-fit px-1 h-12 text-sm",
                  tabContent: "group-data-[selected=true]:text-primary-500",
                }}
                variant="underlined"
              >
                <Tab
                  key="upload"
                  title={
                    <div className="flex items-center space-x-2">
                      <Upload className="w-5 h-5 text-primary-500" />
                      <span>Subir Imagen</span>
                    </div>
                  }
                >
                  <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full">
                    <div className="w-full max-w-2xl">
                      <FilePond
                        allowMultiple={false}
                        className="filepond-custom"
                        files={files}
                        labelIdle='<div class="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500 dark:text-slate-400"><div class="p-4 rounded-full bg-background shadow-sm mb-4"><svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg></div><p class="mb-2 text-lg font-semibold text-foreground">Haz clic para subir o arrastra y suelta</p><p class="text-sm">SVG, PNG, JPG o GIF (max. 800x400px)</p></div>'
                        name="file"
                        onupdatefiles={setFiles}
                        stylePanelAspectRatio="0.5"
                        stylePanelLayout="integrated"
                      />
                      <div className="mt-6 flex items-center gap-4 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800/30">
                        <Info className="text-primary-500 w-5 h-5 flex-shrink-0" />
                        <div className="text-sm text-primary-700 dark:text-primary-300">
                          <span className="font-semibold mr-1">
                            Consejo Pro:
                          </span>
                          Las imágenes de alta resolución (al menos 1024x1024)
                          producen los mejores avatares.
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab
                  key="ai"
                  title={
                    <div className="flex items-center space-x-2">
                      <Wand2 className="w-5 h-5 text-primary-500" />
                      <span>Generar con IA</span>
                    </div>
                  }
                >
                  <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="flex flex-col h-full">
                      <div className="flex-grow">
                        <label
                          className="block text-sm font-semibold text-foreground mb-3"
                          htmlFor="prompt"
                        >
                          Prompt de IA
                        </label>
                        <div className="relative mb-3">
                          <textarea
                            className="block w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-base p-5 transition-all min-h-[220px] resize-y outline-none"
                            id="prompt"
                            placeholder="Hombre profesional joven, iluminación cinematográfica, resolución 8k, fotorrealista, fondo neutro..."
                            rows={8}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                          <div className="absolute bottom-3 right-3">
                            <button
                              className="p-1.5 text-primary-500 hover:text-primary-600 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                              title="Optimizar Prompt"
                            >
                              <Sparkles className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-8">
                          <span>Sé descriptivo para mejores resultados.</span>
                          <span>{prompt.length}/500</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                        <Button
                          className="w-full mb-4 shadow-md font-semibold"
                          color="primary"
                          size="lg"
                          startContent={<Wand2 className="w-5 h-5" />}
                        >
                          Generar Visualización
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Zap className="w-4 h-4 text-primary-500" />
                          <span>Utiliza 1 crédito por generación</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col h-full">
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        Vista Previa
                      </h3>
                      <div className="flex-grow flex flex-col h-full">
                        <div className="relative w-full h-full min-h-[400px] flex-grow overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400">
                          <ImageIcon className="w-16 h-16 mb-4 opacity-50 text-primary-500" />
                          <p className="text-sm">
                            La vista previa aparecerá aquí
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardBody>
          </div>
        )}

        {currentStep === 1 && (
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col">
              <div className="flex-grow flex flex-col justify-center gap-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    Revisa tu Avatar con IA
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Tu avatar personalizado está listo. Dale un nombre para
                    guardarlo en tu biblioteca.
                  </p>
                </div>

                <div className="flex gap-4 p-4 rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-100 dark:border-success-800/50">
                  <CheckCircle2 className="w-6 h-6 text-success-600 dark:text-success-400 shrink-0" />
                  <div>
                    <h4 className="text-sm font-semibold text-success-800 dark:text-success-300">
                      ¡Avatar generado exitosamente!
                    </h4>
                    <p className="text-sm text-success-700 dark:text-success-400/80 mt-1">
                      Este modelo de alta resolución está listo para síntesis de
                      video.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    className="block text-sm font-medium text-foreground"
                    htmlFor="avatarName"
                  >
                    Nombra tu Avatar
                  </label>
                  <Input
                    classNames={{
                      inputWrapper:
                        "border-slate-300 dark:border-slate-600 focus-within:!border-primary-500 focus-within:!ring-1 focus-within:!ring-primary-500",
                    }}
                    endContent={<Edit2 className="w-4 h-4 text-primary-500" />}
                    id="avatarName"
                    size="lg"
                    value={avatarName}
                    variant="bordered"
                    onChange={(e) => setAvatarName(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-primary-500" />
                    Este nombre aparecerá en tu panel de proyectos.
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-2">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg shrink-0">
                    <Clapperboard className="w-5 h-5 text-primary-500" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-foreground">
                      Listo para producción
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Puedes usar inmediatamente este avatar en nuevas campañas
                      de video o exportar el modelo.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-5/12 bg-slate-50 dark:bg-slate-800 p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-700 relative group">
              <div className="relative w-full max-w-[320px] aspect-square rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/10 transition-transform duration-500 group-hover:scale-[1.02] bg-slate-200 dark:bg-slate-700">
                <Image
                  fill
                  unoptimized
                  alt="Vista previa del avatar"
                  className="object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu6L3YTSNEG_ygx1W4qhZbGdX_BmKNTAX0SlFg45Jmo_r5cwJ4eCr0PUwtBQqxglVTm00IaOHflMyatHDslR5-OFJoATATdnR1aPBfli54n1xacGZqobTpkzmErTtGMDRSquIo_2Dq1-KjfkC0qXUTjVtRF0oj5DUj5_ZYpsxQDWokIkPQHGmEdhhXc8GzWtcrOESUU2nCsctebRp74RbpHUMKp3oh1-NR6k-vwFqnArMJGgMFqxxCtcfniSSrpXskuD7-T1mkmdZO"
                />
                <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-foreground shadow-sm flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary-500" />
                  Generado por IA
                </div>
              </div>
            </div>
          </div>
        )}

        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 px-8 py-5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center rounded-b-2xl">
          <Button
            className="text-slate-500 dark:text-slate-400 font-medium"
            isDisabled={currentStep === 0}
            startContent={<ArrowLeft className="w-4 h-4" />}
            variant="light"
            onPress={prevStep}
          >
            Anterior
          </Button>

          <div className="flex gap-4">
            <Button
              className="text-slate-500 dark:text-slate-400 font-medium hidden sm:flex"
              variant="light"
            >
              Cancelar
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button
                className="font-medium px-6 shadow-sm"
                color="primary"
                endContent={<ArrowRight className="w-4 h-4" />}
                onPress={nextStep}
              >
                Siguiente Paso
              </Button>
            ) : (
              <Button
                className="font-medium px-8 shadow-md"
                color="primary"
                startContent={<CheckCircle className="w-4 h-4" />}
                onPress={() => console.log("Save & Finish")}
              >
                Guardar y Finalizar
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>

      <p className="mt-8 text-center text-sm text-slate-400 dark:text-slate-500">
        ¿Necesitas ayuda?{" "}
        <a
          className="font-medium text-primary-500 hover:text-primary-600 underline decoration-2 decoration-primary-200 underline-offset-2 transition-colors"
          href="/support"
        >
          Lee nuestra guía de configuración
        </a>
      </p>
    </div>
  );
}
