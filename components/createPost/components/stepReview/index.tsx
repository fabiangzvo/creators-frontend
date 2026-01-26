"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import { StepComponentProps } from "@/components/formStepper/types";
import { Globe } from "lucide-react";

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
    <div className="flex w-full h-full gap-8 p-6">
      {/* Left: Summary Info */}
      <div className="w-1/2 flex flex-col gap-6 overflow-y-auto">
        {/* Description Card */}
        <div className="p-6 w-full">
          <span className="font-bold">Pie de foto</span>
          <p className="text-lg text-foreground/70">
            {formData.description || "Sin descripción..."}
          </p>
        </div>

        {/* Row: Format & Schedule */}
        <div className="flex gap-4 w-full">
          <div className="p-6 w-full">
            <span className="font-bold">Formato</span>
            <p className="text-lg text-foreground/70">{formData.format || "Reel"}</p>
          </div>
          <div className="p-6 w-full">
            <span className="font-bold">Programación</span>
            <p className="text-lg text-foreground/70">
              {formData.scheduleType === "schedule" ? "Programado" : "Ahora mismo"}
            </p>
          </div>
        </div>

        {/* Channels Card */}
        <Card className="shadow-none">
          <CardBody className="p-6 gap-4 flex">
            <span className="font-bold">Canales seleccionados</span>
            <div className="flex flex-wrap gap-3">
              <Chip variant='flat' color="primary" size="sm">Tiktok</Chip>
              <Chip variant='flat' color="primary" size="sm">Instagram</Chip>
              <Chip variant='flat' color="primary" size="sm">Facebook</Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right: Preview */}
      <div className="w-1/2 h-full flex flex-col items-center">
        <Tabs
          fullWidth
          aria-label="Platform Previews"
          variant="bordered"
          color="primary"
          size="md"
          classNames={{ tabList: "shadow mb-4 [&_div]:text-foreground [&_div]:font-medium", base: "px-4" }}
        >
          {platforms.map(platform => (
            <Tab key={platform.id} title={platform.label}>
              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
                {/* Status Bar Mock */}
                <div className="absolute top-0 w-full h-8 z-20 flex justify-between px-6 items-center text-white text-[10px] font-medium opacity-80">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-3 rounded-sm bg-white/20"></div>
                    <div className="w-4 h-3 rounded-sm bg-white/20"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full h-full relative">
                  {/* Background Image/Media */}
                  {formData.media && formData.media.length > 0 ? (
                    <Image
                      removeWrapper
                      className="w-full h-full object-cover z-0"
                      src={URL.createObjectURL(formData.media[0].file)}
                      alt="Preview"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                      <Globe size={48} className="opacity-20" />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                  {/* UI Overlay */}
                  <div className="absolute bottom-0 w-full p-6 text-white pb-12">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-10 h-10 border-2 border-white" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                      <span className="font-bold text-sm shadow-sm">@fabiangzvo</span>
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed line-clamp-2 mb-6 text-shadow-sm">
                      {formData.description || "Tu descripción aquí aparecera de esta forma..."}
                    </p>

                    {/* Interaction Icons Mock */}
                    <div className="flex flex-col gap-4 absolute right-4 bottom-24 items-center">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <div className="w-5 h-5 bg-white/80 rounded-full"></div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                        <div className="w-5 h-5 bg-white/80 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
