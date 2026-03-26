import { JSX, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { LayoutEnum } from "../../types";
import DynamicField from "../dynamicField";

import { StepContentProps } from "./types";

import { useFormData, useFormErrors, useFormStore } from "@/lib/store/form";

export default function StepContent(props: StepContentProps): JSX.Element {
  const { stepConfig, provider } = props;

  const formData = useFormData();
  const errors = useFormErrors();
  const handleChange = useFormStore((state) => state.handleChange);
  const handleBlur = useFormStore((state) => state.handleBlur);

  const component = useMemo(() => {
    const isGrid = stepConfig?.layout && stepConfig.layout === LayoutEnum.GRID;

    if (stepConfig?.component)
      return (
        <stepConfig.component
          errors={errors}
          formData={formData}
          handleBlur={handleBlur}
          handleChange={handleChange}
          provider={provider}
        />
      );

    const fields = stepConfig?.fields?.map((field) => (
      <DynamicField key={field.name} field={field} />
    ));

    return (
      <div
        className={twMerge(
          "h-full",
          isGrid ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4",
        )}
      >
        {fields}
      </div>
    );
  }, [stepConfig, formData, errors, handleChange, handleBlur, provider]);

  return (
    <Card
      className="p-4 h-full !bg-background"
      id={stepConfig?.id || "step-content"}
      shadow="none"
    >
      <CardHeader className="flex flex-col items-start">
        <h2 className="text-2xl font-bold">{stepConfig?.title}</h2>
        {stepConfig?.description && (
          <p className="text-gray-400 mt-1">{stepConfig?.description}</p>
        )}
      </CardHeader>
      <CardBody>{component}</CardBody>
    </Card>
  );
}
