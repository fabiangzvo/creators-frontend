
"use client"
import { Button } from '@heroui/button'

import { authClient } from '@/lib/auth-client';

//const APP_ID = "1380955649866230"

function FbChannelButton({
  text = 'login',
}: any) {

  const handleClick = async () => {
    const response = await authClient.signIn.social({provider: "facebook", callbackURL: "/dashboard"})
    console.log(response)
  }

  return (
    <Button onPress={handleClick}>{text}</Button>
  )
}

export default FbChannelButton

