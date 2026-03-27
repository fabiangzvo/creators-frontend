"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";
import {
  ArrowLeft,
  CheckCircle2,
  Edit2,
  Info,
  Clapperboard,
  Sparkles,
} from "lucide-react";

interface Step2Props {
  onNext: () => void;
  onPrevious: () => void;
}

export default function Step2({ onNext, onPrevious }: Step2Props) {
  const [avatarName, setAvatarName] = useState("Professional Headshot v1");

  return (
    <div className="bg-background rounded-xl shadow-lg border border-default-100 overflow-hidden flex flex-col-reverse lg:flex-row min-h-[500px]">
      {/* Left Content Area */}
      <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col">
        <div className="flex-grow flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-default-900 mb-2">
              Review your AI Avatar
            </h1>
            <p className="text-default-500">
              Your custom avatar is ready. Give it a name to save it to your
              library.
            </p>
          </div>

          <div className="flex gap-4 p-4 rounded-lg bg-success-50 border border-success-100">
            <div className="text-success-600 shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-success-800">
                Avatar generated successfully!
              </h4>
              <p className="text-sm text-success-700 mt-1">
                This high-resolution model is ready for video synthesis.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label
              className="block text-sm font-medium text-default-700"
              htmlFor="avatarName"
            >
              Name your Avatar
            </label>
            <div className="relative">
              <Input
                classNames={{
                  inputWrapper:
                    "bg-background border-default-300 shadow-sm focus-within:!border-primary-500 h-12",
                  input: "text-base px-1",
                }}
                endContent={
                  <div className="pointer-events-none flex items-center pr-2">
                    <Edit2 className="text-default-400" size={18} />
                  </div>
                }
                id="avatarName"
                placeholder="e.g., Professional Headshot v1"
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
              />
            </div>
            <p className="text-xs text-default-500 flex items-center gap-1">
              <Info size={14} />
              This name will appear in your project dashboard.
            </p>
          </div>

          <div className="flex items-start gap-3 mt-2">
            <div className="p-2 bg-primary-50 rounded-lg text-primary-500 shrink-0">
              <Clapperboard size={20} />
            </div>
            <div>
              <h5 className="text-sm font-medium text-default-900">
                Ready for production
              </h5>
              <p className="text-xs text-default-500 mt-0.5">
                You can immediately use this avatar in new video campaigns or
                export the model for external tools.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 mt-4 border-t border-default-100 flex items-center justify-between gap-4">
          <Button
            className="text-default-600 hover:text-default-900 font-medium px-6"
            startContent={<ArrowLeft size={18} />}
            variant="light"
            onPress={onPrevious}
          >
            Previous
          </Button>
          <Button
            className="flex-1 sm:flex-none px-8 font-semibold shadow-md shadow-primary-500/20 hover:shadow-lg hover:shadow-primary-500/30 transition-all h-12"
            color="primary"
            startContent={<CheckCircle2 size={20} />}
            onPress={onNext}
          >
            Save & Finish
          </Button>
        </div>
      </div>

      {/* Right Image Area */}
      <div className="lg:w-5/12 bg-default-50 p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-default-100 relative group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="relative w-full max-w-[320px] aspect-square rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 transition-transform duration-500 group-hover:scale-[1.02]">
          <Image
            alt="Generated AI Avatar Preview"
            className="w-full h-full object-cover rounded-xl"
            radius="none"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu6L3YTSNEG_ygx1W4qhZbGdX_BmKNTAX0SlFg45Jmo_r5cwJ4eCr0PUwtBQqxglVTm00IaOHflMyatHDslR5-OFJoATATdnR1aPBfli54n1xacGZqobTpkzmErTtGMDRSquIo_2Dq1-KjfkC0qXUTjVtRF0oj5DUj5_ZYpsxQDWokIkPQHGmEdhhXc8GzWtcrOESUU2nCsctebRp74RbpHUMKp3oh1-NR6k-vwFqnArMJGgMFqxxCtcfniSSrpXskuD7-T1mkmdZO"
          />
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-default-700 shadow-sm flex items-center gap-1 z-10">
            <Sparkles className="text-primary-500" size={16} />
            AI Generated
          </div>
        </div>
      </div>
    </div>
  );
}
