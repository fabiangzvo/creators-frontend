
"use client"
import { Button } from '@heroui/button'
import { auth } from "@/lib/auth";

//const APP_ID = "1380955649866230"

function FbChannelButton({
  text = 'login',
}: any) {

  const handleClick = async () => {
    const response = await auth.api.signInSocial({
      body: {
        provider: "facebook",
        callbackURL: "/dashboard",
        scopes: [
          "email",
          "public_profile",
          "pages_manage_posts",
          "pages_read_engagement",
          "pages_manage_engagement",
          "instagram_basic"
        ]
      }
    })
    console.log(response)
  }

  return (
    <Button onPress={handleClick}>{text}</Button>
  )
}

export default FbChannelButton

