import { JSX } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { getAccountInfo } from '@/actions/instagram'

import Form from './components/form'

async function InstagramForm(): Promise<JSX.Element> {
  const session = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "instagram"
    },
  })

  if (!session?.accessToken) return redirect("/channels/create")

  const data = await getAccountInfo(session.accessToken)

  if (!data) return <div>No tienes una cuenta enlazada</div>

  return (
    <div className="px-4">
      <Form
        token={session.accessToken}
        pages={[data]
          .map(page => ({
            value: page.id,
            title: page.username,
            image: page.profile_picture_url
          }))
        }
      />
    </div>
  )
}

export default InstagramForm