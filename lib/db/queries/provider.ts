"use server";

import { db } from "./..";
import { provider } from "../../db/schemas";

export async function getProviderByName(
  providerName: string
): Promise<typeof provider.$inferSelect | null> {
  const result = await db.query.provider.findFirst({
    where: (prov, { eq }) => eq(prov.name, providerName),
  });

  return result ?? null;
}
