"use client";

import React, { useState } from "react";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Sparkles, X } from "lucide-react";
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
      currentHashtags.filter((tag: string) => tag !== tagToRemove)
    );
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-8 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <Textarea
            label="Descripción"
            placeholder="Escribe el pie de foto o usa la IA para inspirarte..."
            minRows={6}
            variant="bordered"
            color="primary"
            labelPlacement="outside"
            value={formData.description || ""}
            isClearable
            onValueChange={(val) => handleChange("description", val)}
            onClear={() => handleChange("description", "")}
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-purple-600 text-white shadow-lg shadow-purple-500/20"
              startContent={<Sparkles size={16} />}
            >
              IA ASISTENTE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Input
              label="Hashtags"
              placeholder="#gaming #lifestyle..."
              labelPlacement="outside"
              variant="bordered"
              color="primary"
              value={hashtagInput}
              onValueChange={setHashtagInput}
              onKeyDown={handleAddHashtag}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.hashtags?.map((tag: string) => (
                <Chip
                  key={tag}
                  onClose={() => removeHashtag(tag)}
                  variant="flat"
                  color="primary"
                  className="text-lg font-medium"
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Input
              label="Ubicación"
              placeholder="Añadir lugar..."
              variant="bordered"
              labelPlacement="outside"
              color="primary"
              value={formData.location || ""}
              onValueChange={(val) => handleChange("location", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
