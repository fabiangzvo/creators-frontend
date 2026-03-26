"use client";

import { JSX, useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { Filters } from "@/types/pagination";
import { PaginatedResponse } from "@/types/pagination";
import { Integration } from "@/types/integrations";
import ChannelList from "@/components/channelList";
import Banner from "@/components/banner";

function ChannelExplorer(): JSX.Element {
  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: "",
  });
  const {
    data: { data = [], count = 0 } = {},
    error,
    isLoading,
    mutate,
  } = useFetch<PaginatedResponse<Integration>>("/integrations", {
    api: "integration",
    queryParams: {
      page: filters.page,
      limit: filters.limit,
      search: filters.search,
      filters: {
        softRemoved: false,
      },
    },
  });

  return (
    <div className="container flex flex-col pt-2 h-full">
      <Banner
        description="Explora los canales que haz integrado"
        handleSearch={(search) => setFilters((prev) => ({ ...prev, search }))}
        link="/channels/create"
        title="Canales"
      />
      <ChannelList
        count={count}
        data={data}
        handlePageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
        isError={!!error}
        isLoading={isLoading}
        limit={filters.limit}
        mutate={mutate}
      />
    </div>
  );
}

export default ChannelExplorer;
