import { Integration } from "@/types/integrations";

export interface ChannelListProps {
  data: Integration[];
  count: number;
  limit: number;
  mutate: () => void;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
  isError?: boolean;
}
