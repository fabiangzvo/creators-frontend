"use server"

import { JSX } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getPages } from '@/actions/facebook'
import PageList from './components/pageList'
import { Button } from '@heroui/button'

async function FacebookForm(): Promise<JSX.Element> {
  const session = await auth.api.getAccessToken({
    headers:await headers(),
    body: {
      providerId: "facebook"
    },
  })

  if (!session?.accessToken) return redirect("/channels/create")

  const data = await getPages(session.accessToken)

  console.log(session, data)
  return (
    <div className="px-4">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-semibold">Seleccionar página</h1>
        <p className="text-foreground/70">Selecciona la página que deseas conectar a creators</p>
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-[70vw] w-full">
          <PageList pages={data}  />
          <Button disabled={true}>Siguiente</Button>
        </div>
      </div>
    </div>
  )
}

export default FacebookForm