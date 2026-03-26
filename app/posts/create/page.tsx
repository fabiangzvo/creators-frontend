"use client";

import React from "react";

import { FormStepper } from "@/components/formStepper";
import { createPostSteps } from "@/components/createPost/steps-config";

function Page() {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <FormStepper
        provider="instagram" // Mock provider for types
        steps={createPostSteps}
        onComplete={async (data) => {
          console.log("Completed:", data);
        }}
      />
    </div>
  );
}

export default Page;
