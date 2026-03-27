"use client";

import { useState } from "react";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Check } from "lucide-react";

import Step2 from "./components/step2";
import Step1 from "./components/step1";

export default function AvatarConfigWizard() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Config" },
    { title: "Details" },
    { title: "Preview" },
  ];

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-default-50 font-sans">
      <main className="flex-grow flex flex-col items-center py-10 px-4 md:px-8 w-full mx-auto">
        {/* Wizard Stepper */}
        <div className="w-full max-w-4xl mb-10">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isComplete = index < currentStep;
                const isLast = index === steps.length - 1;

                return (
                  <li
                    key={index}
                    className={`relative ${
                      !isLast ? "pr-8 sm:pr-20" : ""
                    } flex items-center justify-center`}
                  >
                    {!isLast && (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center w-full"
                      >
                        <div
                          className={`h-0.5 w-full ${
                            isComplete ? "bg-primary" : "bg-default-200"
                          }`}
                        />
                      </div>
                    )}
                    <div className="relative flex flex-col items-center justify-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ring-4 ring-default-50 z-10 ${
                          isComplete
                            ? "bg-primary border-primary text-white"
                            : isActive
                              ? "bg-white border-primary"
                              : "bg-white border-default-300"
                        }`}
                      >
                        {isComplete ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : isActive ? (
                          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                        ) : null}
                      </div>
                      <span
                        className={`absolute -bottom-6 text-xs whitespace-nowrap ${
                          isActive || isComplete
                            ? "font-semibold text-primary"
                            : "font-medium text-default-500"
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Content Area */}
        {currentStep === 0 && (
          <Step1 onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 1 && (
          <Step2 onNext={handleNext} onPrevious={handlePrevious} />
        )}
        {currentStep === 2 && (
          <div className="w-full max-w-4xl bg-background rounded-2xl shadow-sm border border-default-200 overflow-hidden flex flex-col p-8 text-center">
            <h2 className="text-2xl font-bold">Preview</h2>
            <p className="text-default-500 mt-2">
              This is a placeholder for the final step.
            </p>
            <div className="mt-8">
              <Button color="primary" onPress={handlePrevious}>
                Go Back
              </Button>
            </div>
          </div>
        )}

        {/* Helper Text */}
        <p className="mt-8 text-center text-sm text-default-400">
          Need assistance?{" "}
          <Link
            className="font-medium text-primary hover:text-primary-600 underline decoration-2 decoration-primary-200 underline-offset-2 text-sm"
            href="#"
          >
            Read our configuration guide
          </Link>
        </p>
      </main>
    </div>
  );
}
