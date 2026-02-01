"use client";

import React, { useState } from "react";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";
import { cn } from "@heroui/theme";
import { StepComponentProps } from "@/components/formStepper/types";
import {
  Plus,
  Info,
  ChevronRight
} from "lucide-react";
import { STRATEGIES_LIST } from "../../constants";

export default function StepDistribution({
  formData,
  handleChange,
}: StepComponentProps) {
  const [activeTab, setActiveTab] = useState<"distributions" | "manual">("distributions");

  // Mock channels for manual selection (kept from previous implementation)
  const channels = [
    { id: "c1", name: "@fabiangzvo", platform: "TIKTOK", avatar: "https://github.com/shadcn.png" },
    { id: "c2", name: "fabi_stylez", platform: "INSTAGRAM", avatar: "https://github.com/shadcn.png" },
  ];

  const handleStrategyToggle = (id: string) => {
    const currentStrategies = formData.strategies || [];
    let newStrategies;
    if (currentStrategies.includes(id)) {
      newStrategies = currentStrategies.filter((s: string) => s !== id);
    } else {
      newStrategies = [...currentStrategies, id];
    }
    handleChange("strategies", newStrategies);
  };

  const handleChannelToggle = (id: string, isSelected: boolean) => {
    const currentChannels = formData.selectedChannels || [];
    if (isSelected) {
      handleChange("selectedChannels", [...currentChannels, id]);
    } else {
      handleChange("selectedChannels", currentChannels.filter((cid: string) => cid !== id));
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-transparent overflow-y-auto">
       <div className="max-w-xl mx-auto px-8 md:px-12 py-10 w-full">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight">Seleccionar Canales</h2>
          <p className="text-default-500 mt-2 text-sm font-light">Elige un set de distribución o selecciona manualmente</p>
        </div>

        <div className="flex items-center justify-center gap-12 mb-10 border-b border-default-200">
          <button
            onClick={() => setActiveTab("distributions")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "distributions" ? "text-primary" : "text-default-500 hover:text-foreground"
            )}
          >
            Distribuciones
            {activeTab === "distributions" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("manual")}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              activeTab === "manual" ? "text-primary" : "text-default-500 hover:text-foreground"
            )}
          >
            Manual
            {activeTab === "manual" && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-t-full"></span>
            )}
          </button>
        </div>

        {activeTab === "distributions" ? (
          <>
            <div className="space-y-3">
              {STRATEGIES_LIST.map((strategy) => {
                const isSelected = formData.strategies?.includes(strategy.id);
                const Icon = strategy.icon;
                return (
                  <label
                    key={strategy.id}
                    className={cn(
                      "group relative flex items-center p-5 bg-background border rounded-xl cursor-pointer transition-all",
                      isSelected
                        ? "border-primary ring-1 ring-primary"
                        : "border-default-200 hover:border-default-300 hover:shadow-sm"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isSelected || false}
                      onChange={() => handleStrategyToggle(strategy.id)}
                    />
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center transition-all border",
                        isSelected
                          ? "text-primary bg-primary-50 border-primary/20"
                          : "text-default-400 bg-default-50 border-default-100 group-hover:bg-background group-hover:border-default-200"
                      )}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="ml-5 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground">{strategy.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-2 text-default-400">
                          {strategy.channels.map((ChannelIcon, idx) => (
                            <ChannelIcon key={idx} size={12} />
                          ))}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-default-300"></span>
                        <span className="text-xs text-default-400">{strategy.description}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200",
                        isSelected
                          ? "border-primary bg-primary"
                          : "border-default-300"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 bg-white rounded-full transition-all duration-200 transform",
                          isSelected ? "opacity-100 scale-100" : "opacity-0 scale-0"
                        )}
                      ></div>
                    </div>
                  </label>
                );
              })}

              <button className="w-full group relative flex items-center p-5 bg-transparent border border-dashed border-default-300 rounded-xl cursor-pointer hover:border-default-400 hover:bg-default-50 transition-all">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-default-400 border border-default-200 bg-background shadow-sm group-hover:scale-105 transition-all">
                  <Plus size={20} />
                </div>
                <div className="ml-5 flex-1 text-left">
                  <h3 className="font-medium text-default-500 group-hover:text-foreground transition-colors">
                    Crear Nuevo Set
                  </h3>
                  <p className="text-xs text-default-400 mt-0.5">Combina canales para publicar más rápido</p>
                </div>
                <ChevronRight className="text-default-300 group-hover:text-default-500" />
              </button>
            </div>

            <div className="mt-8 flex items-start gap-3 px-4">
              <Info className="text-primary mt-0.5" size={16} />
              <p className="text-xs text-default-400 leading-relaxed">
                Seleccionar un set de distribución publicará en todos los canales incluidos. Puedes editar publicaciones individuales en el siguiente paso.
              </p>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.map((channel) => (
              <div key={channel.id} className="border border-default-200 rounded-xl p-3 bg-background flex items-center gap-4">
                <Avatar src={channel.avatar} size="sm" />
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate text-foreground">{channel.name}</p>
                  <p className="text-xs text-default-400 uppercase">{channel.platform}</p>
                </div>
                <Checkbox
                  isSelected={formData.selectedChannels?.includes(channel.id)}
                  onValueChange={(isSelected: boolean) => handleChannelToggle(channel.id, isSelected)}
                />
              </div>
            ))}
          </div>
        )}

        <div className="h-8"></div>
      </div>
    </div>
  );
}
