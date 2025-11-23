"use server"

import { JSX } from 'react'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

async function FacebookForm(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session?.session) return redirect("/channels/create")
  //https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id={TU_APP_ID}&client_secret={TU_APP_SECRET}&fb_exchange_token={TU_TOKEN_CORTO}
  const response = await fetch(
    `https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FACEBOOK_SECRET}&fb_exchange_token=${session.session.token}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  const token = await response.json()

  //https://graph.facebook.com/v23.0/me/accounts?access_token=EAAVYw3IqC9ABQAc19oyoyqVxHr7FdgiWLnKQdZCv1HFvgjIpsJTcXxnj1bvTnIJu3BicIwNCAYIcidMCaPZANvvwZARdqxzFrpJiA9xkOnPDFTwpw6SC3CHaanvxRhw4rBaGnqyiZBRQAKJzOvGqCbgUlADteQYKVJC5Ca0A9jtvVHPjzwnYdQ23WEDvh5chYaU5GRu50HD83ZBw1d23aGqz1ZCp4JEXn7twZDZD&debug=all&format=json&method=get&origin_graph_explorer=1&pretty=0&suppress_http_code=1&transport=cors

  const pages = await fetch(
    `https://graph.facebook.com/v23.0/me/accounts?access_token=${session.session.token}&debug=all&format=json&method=get&origin_graph_explorer=1&pretty=0&suppress_http_code=1&transport=cors`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  const data = await pages.json()
  console.log(session, data)
  return (
    <div className="px-4">
      <div className="flex flex-col mb-8">
        <h1 className="text-2xl font-semibold">Seleccionar página</h1>
        <p className="text-foreground/70">Selecciona la página que deseas conectar a creators</p>
      </div>
      {JSON.stringify(token)}
      {JSON.stringify(session)}
      {JSON.stringify(data)}
    </div>
  )
}

export default FacebookForm