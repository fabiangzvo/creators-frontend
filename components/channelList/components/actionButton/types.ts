export interface ActionButtonProps {
  integrationId: string;
  refresh: () => void;
  status: string;
}

export type AllowedActions = "edit" | "delete" | "status";
