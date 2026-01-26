"use client";

import React from "react";
import { CardBody } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { cn } from "@heroui/theme";
import { Zap, Calendar } from "lucide-react";
import { Button } from "@heroui/button";

import { StepComponentProps } from "@/components/formStepper/types";

export default function StepSchedule({
  formData,
  handleChange,
}: StepComponentProps) {
  const scheduleType = formData.scheduleType || "now";

  // Determine if showing scheduler
  const isScheduling = scheduleType === "schedule";

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto gap-8 py-8 items-center">
      <div className="flex gap-6 w-full max-w-2xl">
        <Button
          color="primary"
          variant={scheduleType === "now" ? "solid" : "bordered"}
          onPress={() => handleChange("scheduleType", "now")}
          className={cn(
            "flex-1 border-2 transition-all duration-200 h-32",
          )}
        >
          <CardBody className="flex flex-col items-center justify-center gap-2">
            <Zap className="w-10 h-10" />
            <span className="text-base font-medium">
              Publicar ahora
            </span>
          </CardBody>
        </Button>

        <Button
          color="primary"
          variant={scheduleType === "schedule" ? "solid" : "bordered"}
          onPress={() => handleChange("scheduleType", "schedule")}
          className={cn(
            "flex-1 border-2 transition-all duration-200 h-32",
          )}
        >
          <CardBody className="flex flex-col items-center justify-center gap-2">
            <Calendar className="w-10 h-10" />
            <span className="text-base font-medium">
              Programar
            </span>
          </CardBody>
        </Button>
      </div>

      {isScheduling && (
        <div className="w-full max-w-2xl flex gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-1 space-y-2">
            <DatePicker
              label="Fecha de lanzamiento"
              hideTimeZone
              showMonthAndYearPickers
              variant="bordered"
              labelPlacement="outside"
              className="max-w-xs"
              value={formData.scheduledDate}
              onChange={(date) => handleChange("scheduledDate", date)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <TimeInput
              label="Hora"
              labelPlacement="outside"
              variant="bordered"
              value={formData.scheduledTime}
              onChange={(time) => handleChange("scheduledTime", time)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
