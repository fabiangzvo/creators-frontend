"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { Film, Image as ImageIcon, History, Layers } from "lucide-react";
import { Button } from "@heroui/button";

import FileImageUploader from "@/components/fileUpload/filepond-image-uploader";
import { StepComponentProps } from "@/components/formStepper/types";

export default function StepFormat({
  formData,
  handleChange,
}: StepComponentProps) {
  const formats = [
    { id: "reel", label: "Reel / Video", icon: Film },
    { id: "photo", label: "Foto", icon: ImageIcon },
    { id: "story", label: "Historia", icon: History },
    { id: "carousel", label: "Carousel", icon: Layers },
  ];

  return (
    <div className="flex w-full h-full gap-6 p-4">
      {/* Format Selection Section */}
      <div className="w-1/2 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {formats.map((format) => {
            const isSelected = formData.format === format.id;
            const Icon = format.icon;

            return (
              <Button
                key={format.id}
                className="transition-all duration-200 h-32"
                color="primary"
                variant={isSelected ? "solid" : "bordered"}
                onPress={() => handleChange("format", format.id)}
              >
                <CardBody className="flex flex-col items-center justify-center gap-2">
                  <Icon className="w-10 h-10" />
                  <span className="text-base font-medium">{format.label}</span>
                </CardBody>
              </Button>
            );
          })}
        </div>
      </div>
      {/* Build Upload Section */}
      <div className="w-1/2 h-full">
        <Card className="h-full w-full border-dashed border-2 border-default-200 bg-content1/50 shadow-none">
          <CardBody className="flex flex-col items-center justify-center p-0 overflow-hidden">
            <div className="w-full h-full p-4">
              <FileImageUploader
                allowMultiple={true}
                description="Arrastra tus fotos o videos aquí. Soporta MP4, MOV, JPG, PNG de alta calidad."
                files={formData.media}
                label="Cargar Multimedia"
                name="media"
                setFiles={(files) => handleChange("media", files)}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
