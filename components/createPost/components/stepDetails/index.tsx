"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Sparkles } from "lucide-react";

import { StepComponentProps } from "@/components/formStepper/types";

export default function StepDetails({
  formData,
  handleChange,
}: StepComponentProps) {
  const [hashtagInput, setHashtagInput] = useState("");

  const handleAddHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const newTag = hashtagInput.trim().replace(/^#/, "");

      if (newTag && !formData.hashtags?.includes(newTag)) {
        const currentHashtags = formData.hashtags || [];

        handleChange("hashtags", [...currentHashtags, newTag]);
        setHashtagInput("");
      }
    }
  };

  const removeHashtag = (tagToRemove: string) => {
    const currentHashtags = formData.hashtags || [];

    handleChange(
      "hashtags",
      currentHashtags.filter((tag: string) => tag !== tagToRemove),
    );
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-8 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            isClearable
            color="primary"
            label="Descripción"
            labelPlacement="outside"
            minRows={6}
            placeholder="Escribe el pie de foto o usa la IA para inspirarte..."
            value={formData.description || ""}
            variant="bordered"
            onClear={() => handleChange("description", "")}
            onValueChange={(val) => handleChange("description", val)}
          />
          <div className="flex justify-end">
            <Button
              className="bg-purple-600 text-white shadow-lg shadow-purple-500/20"
              size="sm"
              startContent={<Sparkles size={16} />}
            >
              IA ASISTENTE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              color="primary"
              label="Hashtags"
              labelPlacement="outside"
              placeholder="#gaming #lifestyle..."
              value={hashtagInput}
              variant="bordered"
              onKeyDown={handleAddHashtag}
              onValueChange={setHashtagInput}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.hashtags?.map((tag: string) => (
                <Chip
                  key={tag}
                  className="text-lg font-medium"
                  color="primary"
                  variant="flat"
                  onClose={() => removeHashtag(tag)}
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Input
              color="primary"
              label="Ubicación"
              labelPlacement="outside"
              placeholder="Añadir lugar..."
              value={formData.location || ""}
              variant="bordered"
              onValueChange={(val) => handleChange("location", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
