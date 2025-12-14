"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export async function signUp(formData: FormData): Promise<void> {
  const body = Object.fromEntries(formData.entries());

  await auth.api.signUpEmail({
    body: body as any,
  });

  redirect("/");
}

export async function signIn(formData: FormData): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/dashboard",
    },
  });

  return result;
}

export async function signOut(): Promise<any> {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect("/");
}

export async function socialSignIn(): Promise<any> {
  try {
    const result = await auth.api.signInSocial({
      body: {
        provider: "facebook",
        callbackURL: "/dashboard",
      },
    });

    return result;
  } catch (e) {
    console.error(e);
  }
}
