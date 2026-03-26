"use server";

import { apiIntegration } from "@/lib/axios";
import { Integration, IntegrationBody } from "@/types/integrations";

export async function deleteIntegration(
  integrationId: string,
): Promise<boolean> {
  try {
    const response = await apiIntegration.delete(
      `/integrations/${integrationId}`,
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
      `/integrations/${integrationId}/status`,
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
    console.error(JSON.stringify(e, null, 2));

    return { status: false, data: null };
  }
}

export async function getIntegrationById(
  integrationId: string,
): Promise<Integration | null> {
  try {
    const response = await apiIntegration.get(`/integrations/${integrationId}`);

    return response.data;
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));

    return null;
  }
}
