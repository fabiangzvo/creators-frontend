"use server";

import { apiIntegration } from "@/lib/axios";
import { IntegrationBody } from "@/types/integrations";

export async function deleteIntegration(
  integrationId: string
): Promise<boolean> {
  try {
    const response = await apiIntegration.delete(
      `/integrations/${integrationId}`
    );

    return response.status === 200;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export async function changeStatus(integrationId: string): Promise<boolean> {
  try {
    const response = await apiIntegration.put(
      `/integrations/${integrationId}/status`
    );

    return response.status === 200;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export async function createIntegration(data: IntegrationBody): Promise<any> {
  try {
    const response = await apiIntegration.post("/integrations", data);

    return response.data;
  } catch (e) {
    return { status: false, data: null };
  }
}
