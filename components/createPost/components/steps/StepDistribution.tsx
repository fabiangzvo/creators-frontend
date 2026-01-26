"use client";

import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { Avatar } from "@heroui/avatar";
import { cn } from "@heroui/theme";
import { StepComponentProps } from "@/components/formStepper/types";
import { Globe, Instagram } from "lucide-react";

export default function StepDistribution({
  formData,
  handleChange,
}: StepComponentProps) {
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

  // Mock channels for manual selection
  const channels = [
    { id: "c1", name: "@fabiangzvo", platform: "TIKTOK", avatar: "https://github.com/shadcn.png" },
    { id: "c2", name: "fabi_stylez", platform: "INSTAGRAM", avatar: "https://github.com/shadcn.png" },
    // Add more mocks if needed
  ];

  const handleStrategySelect = (id: string) => {
    handleChange("strategy", id);
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
    <div className="flex flex-col w-full max-w-2xl mx-auto gap-8 py-8 items-center">
      <div className="w-full">
        <Tabs
          aria-label="Distribution Options"
          fullWidth
          size="lg"
          classNames={{
            tabList: "bg-default-100/50 p-1",
            cursor: "w-full bg-background shadow-sm",
            tab: "h-10",
            tabContent: "text-default-500 group-data-[selected=true]:text-foreground font-medium"
          }}
        >
          <Tab key="strategies" title="Distribuciones">
            <div className="flex flex-col gap-4 mt-6">
              {strategies.map((strategy) => {
                const isSelected = formData.strategy === strategy.id;
                const Icon = strategy.icon;
                return (
                  <Card
                    key={strategy.id}
                    isPressable
                    onPress={() => handleStrategySelect(strategy.id)}
                    className={cn(
                      "border-2 w-full transition-all duration-200",
                      isSelected ? "border-black dark:border-white" : "border-transparent hover:border-default-200"
                    )}
                  >
                    <CardBody className="flex flex-row items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-default-100 text-default-500">
                          <Icon size={24} />
                        </div>
                        <div className="text-left">
                          <h4 className="font-semibold text-foreground">{strategy.title}</h4>
                          <p className="text-tiny text-default-500 uppercase">{strategy.description}</p>
                        </div>
                      </div>
                      <div className="rounded-full border-2 border-default-200 w-6 h-6 flex items-center justify-center">
                        {isSelected && <div className="w-3 h-3 rounded-full bg-success" />}
                      </div>
                    </CardBody>
                  </Card>
                )
              })}
            </div>
          </Tab>
          <Tab key="manual" title="Selección Manual">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {channels.map((channel) => (
                <Card key={channel.id} className="border border-default-200 shadow-none">
                  <CardBody className="flex flex-row items-center gap-4 p-3">
                    <Avatar src={channel.avatar} size="sm" />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-semibold truncate">{channel.name}</p>
                      <p className="text-xs text-default-400 uppercase">{channel.platform}</p>
                    </div>
                    <Checkbox
                      isSelected={formData.selectedChannels?.includes(channel.id)}
                      onValueChange={(isSelected: boolean) => handleChannelToggle(channel.id, isSelected)}
                    />
                  </CardBody>
                </Card>
              ))}
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
