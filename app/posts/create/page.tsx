"use client";

import { FormStepper } from '@/components/formStepper'
import { createPostSteps } from '@/components/createPost'

function Page() {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <FormStepper
        steps={createPostSteps}
        onComplete={async (data) => {
          console.log("Completed:", data);
        }}
        provider="instagram"
      />
    </div>
  )
}

export default Page