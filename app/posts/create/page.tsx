import React from 'react'

import Banner from '@/components/banner'
import { FormStepper } from '@/components/formStepper'

function Page() {
  return (
    <div className="container flex flex-col pt-2 h-full">
      <Banner title="Crear publicación" description="Crea una nueva publicación para tus canales." />
      <FormStepper />
    </div>
  )
}

export default Page