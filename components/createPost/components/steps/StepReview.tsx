"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import { StepComponentProps } from "@/components/formStepper/types";
import { MapPin, Calendar, Globe } from "lucide-react";

export default function StepReview({
  formData,
}: StepComponentProps) {

  // Create preview tabs based on selected strategy/channels or defaults
  // For demo purposes, hardcoding IG and TikTok
  const platforms = [
    { id: "instagram", label: "Instagram" },
    { id: "tiktok", label: "TikTok" }
  ];

  return (
    <div className="flex w-full h-full gap-6 p-4">
      {/* Left: Summary Info */}
      <div className="w-1/2 h-full flex flex-col gap-6 overflow-y-auto pr-2">
        <div>
          <h3 className="text-xl font-bold mb-1">Revisión</h3>
          <p className="text-default-500 text-sm">Verifica los detalles antes de publicar.</p>
        </div>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">FORMATO</h4>
          <div className="text-foreground capitalize font-medium">{formData.format || "No seleccionado"}</div>
        </section>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">DESCRIPCIÓN</h4>
          <p className="text-foreground text-sm whitespace-pre-wrap">{formData.description || "Sin descripción"}</p>
        </section>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">HASHTAGS</h4>
          <div className="flex flex-wrap gap-2">
            {formData.hashtags && formData.hashtags.length > 0 ? (
              formData.hashtags.map((tag: string) => (
                <Chip key={tag} size="sm" variant="flat" color="secondary">#{tag}</Chip>
              ))
            ) : (
              <span className="text-sm text-default-400">Sin hashtags</span>
            )}
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">UBICACIÓN</h4>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPin size={16} className="text-default-500" />
            {formData.location || "No añadida"}
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">DISTRIBUCIÓN</h4>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Globe size={16} className="text-default-500" />
            {formData.strategy === "global" ? "Estrategia Global" : formData.strategy === "visuals" ? "Solo Visuales" : "Selección Manual"}
          </div>
        </section>

        <section className="space-y-2">
          <h4 className="text-xs font-semibold uppercase text-default-500">PROGRAMACIÓN</h4>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <Calendar size={16} className="text-default-500" />
            {formData.scheduleType === "schedule" ? "Programado" : "Publicar Ahora"}
          </div>
        </section>
      </div>

      {/* Right: Preview */}
      <div className="w-1/2 h-full bg-default-50 rounded-xl p-4 flex flex-col">
        <h4 className="text-xs font-semibold uppercase text-default-500 mb-4 text-center">VISTA PREVIA DE LA PUBLICACIÓN</h4>
        <Tabs
          aria-label="Platform Previews"
          fullWidth
          size="sm"
          classNames={{
            tabList: "bg-background shadow-none",
            panel: "flex-1 flex justify-center items-center mt-4"
          }}
        >
          {platforms.map(platform => (
            <Tab key={platform.id} title={platform.label}>
              <Card className="w-[280px] shadow-lg border border-default-100">
                <CardHeader className="flex gap-3">
                  <Avatar size="sm" src="https://github.com/shadcn.png" />
                  <div className="flex flex-col">
                    <p className="text-small font-semibold">fabi_stylez</p>
                    <p className="text-tiny text-default-500">Just now</p>
                  </div>
                </CardHeader>
                <CardBody className="py-2">
                  <div className="aspect-[4/5] bg-default-200 rounded-lg mb-2 overflow-hidden relative group">
                    {/* Placeholder for uploaded image */}
                    {formData.media && formData.media.length > 0 ? (
                      <Image
                        classNames={{ wrapper: "w-full h-full", img: "object-cover w-full h-full" }}
                        src={URL.createObjectURL(formData.media[0].file)} // Caution: FilePond file handling might differ
                        alt="Preview"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-default-400">Media Preview</div>
                    )}
                  </div>
                  <p className="text-sm line-clamp-2">
                    {formData.description}
                    <span className="text-blue-500 ml-1">
                      {formData.hashtags?.map((t: string) => `#${t}`).join(" ")}
                    </span>
                  </p>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
