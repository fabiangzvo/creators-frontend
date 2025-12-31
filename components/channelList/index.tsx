"use client";

import { JSX, useState, useMemo } from "react";
import { Pagination } from "@heroui/pagination";

import { useFetch } from "@/hooks/useFetch";
import { Integration } from "@/types/integrations";
import { Filters } from "@/types/pagination";
import { PaginatedResponse } from "@/types/pagination";

import Loader from "../loader";
import EmptyMessage from "./components/emptyMessage";
import ChannelCard from "./components/channelCard";

function ChannelList(): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: "",
  });
  const { data:
    { data = [], count = 0 } = {},
    error,
    isLoading,
    mutate
  } = useFetch<PaginatedResponse<Integration>>(
    "/integrations",
    {
      api: "integration",
      queryParams: {
        page: filters.page,
        limit: filters.limit,
        filters: {
          softRemoved: false,
        }
      },
    });

  const cards = useMemo(() => data?.map(
    (integration: Integration) => <ChannelCard key={integration.id} refresh={mutate} {...integration} />),
    [data]);

  if (isLoading) return <Loader />;

  if (error) return <div>Error: {error.message}</div>;

  if (data.length === 0) return <EmptyMessage />;

  return (
    <div className="container flex flex-col gap-6 items-center">
      <div className="grid grid-cols-4 gap-4 w-full max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:px-3">
        {cards}
      </div>
      <Pagination
        showControls
        initialPage={1}
        total={Math.ceil((count || 0) / filters.limit)}
        onChange={(page) => setFilters((prev) => ({ ...prev, page }))}
      />
    </div>
  );
}

export default ChannelList;