export interface ActionButtonProps {
  integrationId: string;
  refresh: () => void;
}

export type AllowedActions = "edit" | "delete" | "status";
