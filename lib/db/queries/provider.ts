"use server";

import { provider } from "../../db/schemas";

import { db } from "./..";

export async function getProviderByName(
  providerName: string,
): Promise<typeof provider.$inferSelect | null> {
  const result = await db.query.provider.findFirst({
    where: (prov, { eq }) => eq(prov.name, providerName),
  });

  return result ?? null;
}
