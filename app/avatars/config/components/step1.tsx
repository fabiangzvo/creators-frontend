"use client";

import { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import {
  UploadCloud,
  Wand2,
  Image as ImageIcon,
  ArrowLeft,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";

import FileImageUploader from "@/components/fileUpload/filepond-image-uploader";

interface Step1Props {
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step1({ onNext, onPrevious }: Step1Props) {
  const [selectedTab, setSelectedTab] = useState<"upload" | "generate">(
    "upload",
  );
  const [prompt, setPrompt] = useState("");

  return (
    <div className="w-full max-w-4xl bg-background rounded-2xl shadow-sm border border-default-200 overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="p-8 pb-0 text-center md:text-left">
        <h1 className="text-3xl font-bold text-default-900 mb-2">
          Avatar Configuration
        </h1>
        <p className="text-default-500">
          Step 1: Choose your source material to begin the generation process.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="px-8 mt-8 border-b border-default-200">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList:
              "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
          color="primary"
          selectedKey={selectedTab}
          variant="underlined"
          onSelectionChange={(key) =>
            setSelectedTab(key as "upload" | "generate")
          }
        >
          <Tab
            key="upload"
            title={
              <div className="flex items-center space-x-2 text-sm font-medium">
                <UploadCloud size={20} />
                <span>Upload Image</span>
              </div>
            }
          />
          <Tab
            key="generate"
            title={
              <div className="flex items-center space-x-2 text-sm font-medium">
                <Wand2 size={20} />
                <span>Generate with AI</span>
              </div>
            }
          />
        </Tabs>
      </div>

      {/* Content Area */}
      <div className="p-8 md:p-12 bg-background min-h-[400px]">
        {selectedTab === "upload" && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-full max-w-2xl">
              <div className="w-full rounded-xl border-2 border-dashed border-default-300 bg-default-50 hover:bg-primary-50 hover:border-primary-300 transition-all cursor-pointer">
                <FileImageUploader
                  description="SVG, PNG, JPG or GIF (max. 800x400px)"
                  label="Click to upload or drag and drop"
                />
              </div>

              <div className="mt-6 flex items-center gap-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
                <Info className="text-primary-500" size={24} />
                <div className="text-sm text-primary-700">
                  <span className="font-semibold">Pro Tip:</span>{" "}
                  High-resolution images (at least 1024x1024) produce the best
                  avatars.
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "generate" && (
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Prompt */}
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <label
                    className="block text-sm font-semibold text-default-900 mb-3"
                    htmlFor="prompt"
                  >
                    AI Prompt
                  </label>
                  <div className="relative mb-3">
                    <Textarea
                      classNames={{
                        inputWrapper:
                          "rounded-xl border border-default-200 bg-default-50 shadow-sm transition-all focus-within:!border-primary-500",
                        input: "text-base p-1 resize-y",
                      }}
                      id="prompt"
                      maxLength={500}
                      minRows={8}
                      placeholder="Young professional man, cinematic lighting, 8k resolution, photorealistic, neutral background..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3 z-10">
                      <Button
                        isIconOnly
                        className="text-default-400 hover:text-primary-500"
                        color="default"
                        size="sm"
                        title="Optimize Prompt"
                        variant="light"
                      >
                        <Wand2 size={18} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-default-500 flex justify-between mb-8">
                    <span>Be descriptive for better results.</span>
                    <span>{prompt.length}/500</span>
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-default-100">
                  <Button
                    className="w-full h-14 bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg shadow-primary-500/20 mb-4"
                    radius="md"
                    size="lg"
                    startContent={<Sparkles size={20} />}
                  >
                    Generate Visualization
                  </Button>
                  <div className="flex items-center justify-center gap-2 text-sm text-default-500">
                    <Wand2 className="text-primary-300" size={18} />
                    <span>Uses 1 credit per generation</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="flex flex-col h-full">
                <h3 className="text-sm font-semibold text-default-900 mb-3">
                  Preview
                </h3>
                <div className="flex-grow flex flex-col h-full">
                  <div className="relative w-full h-full min-h-[400px] flex-grow overflow-hidden rounded-xl bg-default-100 animate-pulse border border-default-200 flex flex-col items-center justify-center">
                    <ImageIcon className="text-default-300 opacity-20 w-16 h-16" />
                    <div className="absolute bottom-4 left-4 right-4 h-4 bg-default-200 rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-default-50 px-8 py-5 border-t border-default-200 flex justify-between items-center">
        <Button
          className="text-default-500 font-medium"
          startContent={<ArrowLeft size={18} />}
          variant="light"
          onPress={onPrevious}
        >
          Previous
        </Button>
        <div className="flex gap-4">
          <Button className="text-default-500 font-medium" variant="light">
            Cancel
          </Button>
          <Button
            className="font-medium px-6"
            color="primary"
            endContent={<ArrowRight size={18} />}
            onPress={onNext}
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
}
