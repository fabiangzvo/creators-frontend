"use client";

import { FormStepper } from "@/components/formStepper";
import { createPostSteps } from "@/components/createPost";

function Page() {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <FormStepper
        provider="instagram"
        steps={createPostSteps}
        onComplete={async (data) => {
          console.warn("Completed:", data);
        }}
      />
    </div>
  );
}

export default Page;
