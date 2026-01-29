"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import {
  Globe,
  Instagram,
  MonitorPlay,
  Zap,
  Calendar,
  Share2,
} from "lucide-react";

import { StepComponentProps } from "@/components/formStepper/types";

export default function StepReview({ formData }: StepComponentProps) {
  // Mock data duplicated from StepDistribution for display purposes
  const strategies = [
    {
      id: "global",
      title: "Estrategia Global",
      description: "FB, IG, TT, YT + 12 CANALES",
      icon: Globe,
    },
    {
      id: "visuals",
      title: "Solo Visuales",
      description: "INSTAGRAM & TIKTOK + 5 CANALES",
      icon: Instagram,
    },
  ];

  const channelsMock = [
    {
      id: "c1",
      name: "@fabiangzvo",
      platform: "TIKTOK",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: "c2",
      name: "fabi_stylez",
      platform: "INSTAGRAM",
      avatar: "https://github.com/shadcn.png",
    },
  ];

  // Platforms for preview tabs
  const platforms = [
    { id: "instagram", label: "Instagram" },
    { id: "tiktok", label: "TikTok" },
  ];

  // Helper to format date/time in Spanish
  const formatSchedule = () => {
    if (formData.scheduleType !== "schedule") return "Ahora mismo";
    if (!formData.scheduledDate || !formData.scheduledTime) return "Fecha pendiente";

    try {
      const dateStr = formData.scheduledDate.toString();
      const timeStr = formData.scheduledTime.toString();
      // Combine date and time into a single Date object
      // Assuming scheduledDate is YYYY-MM-DD and scheduledTime is HH:mm
      const dateTime = new Date(`${dateStr}T${timeStr}`);

      return new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(dateTime);
    } catch (e) {
      return `${formData.scheduledDate} ${formData.scheduledTime}`;
    }
  };

  const getDistributionDisplay = () => {
    if (formData.strategy) {
      const strategy = strategies.find((s) => s.id === formData.strategy);

      if (strategy) {
        return (
          <div className="flex flex-wrap gap-2">
            <Chip
              classNames={{
                base: "bg-primary-500/10 border-small border-primary-500/50",
                content: "text-primary-700 font-medium",
              }}
              startContent={<strategy.icon size={16} className="text-primary-500" />}
              variant="flat"
            >
              {strategy.title}
            </Chip>
          </div>
        );
      }
    }

    if (formData.selectedChannels && formData.selectedChannels.length > 0) {
      return (
        <div className="flex flex-wrap gap-2">
          {formData.selectedChannels.map((cid: string) => {
            const channel = channelsMock.find((c) => c.id === cid);
            // Fallback if channel not found in mock, usually wouldn't happen in real app
            const name = channel ? channel.platform : `Channel ${cid}`;
            const label = channel ? channel.platform : name;

            return (
              <Chip
                key={cid}
                className="capitalize"
                classNames={{
                  base: "bg-primary-500/10 border-small border-primary-500/50",
                  content: "text-primary-700 font-medium",
                }}
                size="md"
                variant="flat"
              >
                {label.toLowerCase()}
              </Chip>
            );
          })}
        </div>
      );
    }

    return (
      <p className="text-sm text-default-500 italic">
        No hay canales seleccionados
      </p>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full py-6 px-2">
      {/* Left: Summary Info */}
      <div className="flex flex-col gap-10 pt-4">

        {/* Row 1: Programación & Formato */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* 1. Programación */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                {formData.scheduleType === "schedule" ? (
                  <Calendar className="text-primary-500" size={24} />
                ) : (
                  <Zap className="text-primary-500" size={24} />
                )}
                <h3>Programación</h3>
              </div>
              <p className="text-default-600 text-base pl-1 font-medium capitalize">
                {formatSchedule()}
              </p>
            </div>

            {/* 2. Formato */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-foreground font-bold text-lg">
                <MonitorPlay className="text-primary-500" size={24} />
                <h3>Formato</h3>
              </div>
              <p className="text-default-600 text-base capitalize pl-1 font-medium">
                {formData.format || "Reel"}
              </p>
            </div>
        </div>

        {/* Row 2: Canales seleccionados (Full Width) */}
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2 text-foreground font-bold text-lg">
            <Share2 className="text-primary-500" size={24} />
            <h3>Canales seleccionados</h3>
          </div>
          <div className="pl-1">{getDistributionDisplay()}</div>
        </div>

      </div>

      {/* Right: Preview */}
      <div className="flex flex-col items-center gap-6">
        {/* Custom styled Tabs */}
        <div className="w-full max-w-[400px]">
          <Tabs
            fullWidth
            aria-label="Platform Previews"
            classNames={{
              cursor: "bg-primary shadow-md",
              tabContent:
                "group-data-[selected=true]:text-primary-foreground font-bold",
              tabList:
                "bg-default-100 p-1 rounded-lg gap-2 border border-default-200",
              tab: "h-10 data-[hover=true]:bg-default-200",
            }}
            radius="sm"
            size="lg"
          >
            {platforms.map((platform) => (
              <Tab key={platform.id} title={platform.label} />
            ))}
          </Tabs>
        </div>

        {/* Phone Frame */}
        <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-black/5 mx-auto">
          {/* Status Bar Mock */}
          <div className="absolute top-0 w-full h-8 z-20 flex justify-between px-6 items-center text-white text-[10px] font-medium opacity-80">
            <span>9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-3 rounded-sm bg-white/20" />
              <div className="w-4 h-3 rounded-sm bg-white/20" />
            </div>
          </div>

          {/* Content */}
          <div className="w-full h-full relative">
            {/* Background Image/Media */}
            {formData.media && formData.media.length > 0 ? (
              <Image
                removeWrapper
                alt="Preview"
                className="w-full h-full object-cover"
                src={URL.createObjectURL(formData.media[0].file)}
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
                <Globe className="opacity-20" size={48} />
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

            {/* UI Overlay */}
            <div className="absolute bottom-0 w-full p-6 text-white pb-12">
              <div className="flex items-center gap-3 mb-4">
                <Avatar
                  className="w-8 h-8 border-1 border-white/50"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                <span className="font-bold text-sm shadow-sm">@fabiangzvo</span>
              </div>
              <p className="text-sm opacity-90 leading-relaxed line-clamp-3 mb-6 font-light">
                {formData.description ||
                  "Tu descripción aquí aparecera de esta forma..."}
              </p>

              {/* Interaction Icons Mock */}
              <div className="flex flex-col gap-4 absolute right-4 bottom-24 items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"
                  >
                    <div className="w-5 h-5 bg-white/80 rounded-full opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
