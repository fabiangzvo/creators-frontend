"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Avatar } from "@heroui/avatar";
import { Image } from "@heroui/image";
import { Divider } from "@heroui/divider";
import {
  Globe,
  Instagram,
  MonitorPlay,
  Zap,
  FileText,
  Calendar,
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

  // Helper to format date/time
  const formatSchedule = () => {
    if (formData.scheduleType !== "schedule") return "Ahora mismo";

    const date = formData.scheduledDate?.toString() || "";
    const time = formData.scheduledTime?.toString() || "";

    return `${date} ${time}`.trim() || "Fecha pendiente";
  };

  const getDistributionDisplay = () => {
    if (formData.strategy) {
      const strategy = strategies.find((s) => s.id === formData.strategy);

      if (strategy) {
        const Icon = strategy.icon;

        return (
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm">{strategy.title}</p>
              <p className="text-xs text-default-500">{strategy.description}</p>
            </div>
          </div>
        );
      }
    }

    if (formData.selectedChannels && formData.selectedChannels.length > 0) {
      return (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-default-600">
            Selección Manual:
          </p>
          <div className="flex flex-wrap gap-2">
            {formData.selectedChannels.map((cid: string) => {
              const channel = channelsMock.find((c) => c.id === cid);

              return channel ? (
                <Chip
                  key={cid}
                  avatar={<Avatar src={channel.avatar} />}
                  size="sm"
                  variant="flat"
                >
                  {channel.name}
                </Chip>
              ) : (
                <Chip key={cid} size="sm">
                  Canal {cid}
                </Chip>
              );
            })}
          </div>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full p-2 lg:p-6">
      {/* Left: Summary Info */}
      <div className="flex flex-col gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Revisión Final</h2>
          <p className="text-default-500">
            Verifica que todo esté correcto antes de publicar.
          </p>
        </div>

        <Card className="shadow-sm border border-default-200">
          <CardHeader className="flex gap-3 px-6 pt-6">
            <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
              <FileText size={24} />
            </div>
            <div className="flex flex-col">
              <p className="text-md font-bold">Resumen de la Publicación</p>
              <p className="text-small text-default-500">
                Contenido y metadatos
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="px-6 py-4 gap-6">
            {/* Description & Media */}
            <div className="flex gap-4">
              {formData.media && formData.media.length > 0 && (
                <div className="shrink-0">
                  <Image
                    alt="Thumbnail"
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                    src={URL.createObjectURL(formData.media[0].file)}
                  />
                </div>
              )}
              <div className="flex-1 space-y-1">
                <span className="text-xs font-bold uppercase text-default-400 tracking-wider">
                  PIE DE FOTO
                </span>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {formData.description || (
                    <span className="italic text-default-400">
                      Sin descripción...
                    </span>
                  )}
                </p>
              </div>
            </div>

            <Divider className="my-2" />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-default-400 tracking-wider flex items-center gap-1">
                  <MonitorPlay size={12} /> FORMATO
                </span>
                <p className="font-semibold capitalize">
                  {formData.format || "Reel"}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-default-400 tracking-wider flex items-center gap-1">
                  {formData.scheduleType === "schedule" ? (
                    <Calendar size={12} />
                  ) : (
                    <Zap size={12} />
                  )}{" "}
                  PROGRAMACIÓN
                </span>
                <p className="font-semibold">{formatSchedule()}</p>
              </div>
            </div>

            <Divider className="my-2" />

            {/* Distribution */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-default-400 tracking-wider flex items-center gap-1">
                <Globe size={12} /> DISTRIBUCIÓN
              </span>
              {getDistributionDisplay()}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right: Preview */}
      <div className="flex flex-col items-center justify-start lg:justify-center h-full min-h-[600px]">
        <Tabs
          aria-label="Platform Previews"
          className="mb-6"
          classNames={{
            cursor: "bg-foreground text-background shadow-sm",
            tabContent:
              "group-data-[selected=true]:text-background font-semibold",
          }}
          radius="full"
        >
          {platforms.map((platform) => (
            <Tab key={platform.id} title={platform.label}>
              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-black rounded-[40px] border-[8px] border-zinc-900 shadow-2xl overflow-hidden ring-1 ring-white/10 mx-auto mt-4">
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
                      <span className="font-bold text-sm shadow-sm">
                        @fabiangzvo
                      </span>
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
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
