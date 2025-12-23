"use client"

import { JSX } from 'react'

import { authClient } from '@/lib/auth-client'

function InstagramForm(): JSX.Element {
  const { data } = authClient.useSession()
  return (
    <div className="container">InstagramForm
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(authClient.listSessions())}</p>
    </div>
  )
}

export default InstagramForm