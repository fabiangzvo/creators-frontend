"use server"

import { JSX } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getPages } from '@/actions/facebook'

import Form from './components/form'

async function FacebookForm(): Promise<JSX.Element> {
  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "facebook"
    },
  })

  if (!session?.accessToken) return redirect("/channels/create")

  const data = await getPages(session.accessToken)

  if (!data || data.length === 0) return <div>No tienes páginas disponibles</div>

  return (
    <div className="px-4">
      <Form pages={data.map(page => ({ value: page.id, title: page.name, image: page.picture.data.url }))} />
    </div>
  )
}

export default FacebookForm