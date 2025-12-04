export type Providers = "facebook" | "instagram" | "youtube" | "tiktok";

export interface Provider {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
