"use client";

import React from "react";
import { Card, CardBody } from "@heroui/card";
import { DatePicker } from "@heroui/date-picker";
import { TimeInput } from "@heroui/date-input";
import { cn } from "@heroui/theme";
import { Zap, Calendar } from "lucide-react";

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
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Programación</h2>
        <p className="text-default-500">
          Elige el momento perfecto para conectar con tu audiencia.
        </p>
      </div>

      <div className="flex gap-6 w-full max-w-2xl">
        <Card
          isPressable
          className={cn(
            "flex-1 border-2 transition-all duration-200 h-32",
            scheduleType === "now"
              ? "border-black dark:border-white shadow-md"
              : "border-transparent hover:border-default-200",
          )}
          onPress={() => handleChange("scheduleType", "now")}
        >
          <CardBody className="flex flex-col items-center justify-center gap-2">
            <Zap
              className={cn(
                "w-6 h-6",
                scheduleType === "now" ? "text-foreground" : "text-default-500",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                scheduleType === "now" ? "text-foreground" : "text-default-500",
              )}
            >
              Publicar ahora
            </span>
          </CardBody>
        </Card>

        <Card
          isPressable
          className={cn(
            "flex-1 border-2 transition-all duration-200 h-32",
            scheduleType === "schedule"
              ? "border-black dark:border-white shadow-md"
              : "border-transparent hover:border-default-200",
          )}
          onPress={() => handleChange("scheduleType", "schedule")}
        >
          <CardBody className="flex flex-col items-center justify-center gap-2">
            <Calendar
              className={cn(
                "w-6 h-6",
                scheduleType === "schedule"
                  ? "text-foreground"
                  : "text-default-500",
              )}
            />
            <span
              className={cn(
                "text-sm font-medium",
                scheduleType === "schedule"
                  ? "text-foreground"
                  : "text-default-500",
              )}
            >
              Programar
            </span>
          </CardBody>
        </Card>
      </div>

      {isScheduling && (
        <div className="w-full max-w-2xl flex gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex-1 space-y-2">
            <span className="text-xs font-semibold uppercase text-default-500">
              FECHA DE LANZAMIENTO
            </span>
            <DatePicker
              hideTimeZone
              showMonthAndYearPickers
              className="max-w-xs"
              label="Fecha de lanzamiento"
              value={formData.scheduledDate}
              variant="bordered"
              onChange={(date) => handleChange("scheduledDate", date)}
            />
          </div>
          <div className="flex-1 space-y-2">
            <span className="text-xs font-semibold uppercase text-default-500">
              HORARIO ÓPTIMO
            </span>
            <TimeInput
              label="Hora"
              value={formData.scheduledTime}
              variant="bordered"
              onChange={(time) => handleChange("scheduledTime", time)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
