"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import { StepComponentProps } from "@/components/formStepper/types";
import { MapPin, Calendar, Globe, LayoutTemplate, Hash, FileText } from "lucide-react";

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
        <Card className="shadow-none bg-default-100/50">
          <CardBody className="p-6 gap-4">
            <span className="text-xs font-bold uppercase text-default-400 tracking-wider">PIE DE FOTO</span>
            <p className="text-foreground italic font-medium">
              {formData.description || "Sin descripción..."}
            </p>
          </CardBody>
        </Card>

        {/* Row: Format & Schedule */}
        <div className="flex gap-4">
          <Card className="flex-1 shadow-none bg-default-100/50">
            <CardBody className="p-6 gap-2">
              <span className="text-xs font-bold uppercase text-default-400 tracking-wider">FORMATO</span>
              <p className="text-xl font-bold uppercase">{formData.format || "REEL"}</p>
            </CardBody>
          </Card>
          <Card className="flex-1 shadow-none bg-default-100/50">
            <CardBody className="p-6 gap-2">
              <span className="text-xs font-bold uppercase text-default-400 tracking-wider">PROGRAMACIÓN</span>
              <p className="text-xl font-bold">
                {formData.scheduleType === "schedule" ? "Programado" : "Ahora mismo"}
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Channels Card */}
        <Card className="shadow-none bg-default-100/50">
          <CardBody className="p-6 gap-4">
            <span className="text-xs font-bold uppercase text-default-400 tracking-wider">CANALES SELECCIONADOS</span>
            <div className="flex flex-wrap gap-3">
              {/* Mocking selected channels based on strategy or default */}
              <Chip className="bg-white dark:bg-black font-bold text-xs shadow-sm uppercase" size="sm">TIKTOK</Chip>
              <Chip className="bg-white dark:bg-black font-bold text-xs shadow-sm uppercase" size="sm">INSTAGRAM</Chip>
              <Chip className="bg-white dark:bg-black font-bold text-xs shadow-sm uppercase" size="sm">FACEBOOK</Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right: Preview */}
      <div className="w-1/2 h-full flex flex-col items-center">
        <Tabs
          aria-label="Platform Previews"
          size="sm"
          radius="full"
          classNames={{
            tabList: "bg-default-100 p-1",
            cursor: "bg-white dark:bg-black shadow-sm",
            tab: "px-4 h-8 text-xs font-bold uppercase text-default-500 data-[selected=true]:text-foreground",
            panel: "flex-1 w-full flex justify-center items-center mt-6"
          }}
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
                      className="w-full h-full object-cover"
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
