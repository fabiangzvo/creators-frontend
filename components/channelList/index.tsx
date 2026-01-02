"use client";

import { JSX, useMemo } from "react";
import { Pagination } from "@heroui/pagination";

import { Integration } from "@/types/integrations";

import Loader from "../loader";
import EmptyMessage from "./components/emptyMessage";
import ChannelCard from "./components/channelCard";
import { ChannelListProps } from "./types"

function ChannelList(props: ChannelListProps): JSX.Element {
  const { data, count, limit, mutate, handlePageChange, isLoading, error } = props;

  const cards = useMemo(() => data?.map(
    (integration: Integration) => <ChannelCard key={integration.id} refresh={mutate} {...integration} />),
    [data]);

  if (isLoading) return <Loader />;

  if (error) return <div>Error: {error.message}</div>;

  if (data.length === 0) return <EmptyMessage />;

  return (
    <div className="container flex flex-col gap-6 items-center h-full">
      <div className="grid grid-cols-4 gap-4 w-full max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:px-3">
        {cards}
      </div>
      <Pagination
        showControls
        initialPage={1}
        total={Math.ceil((count || 0) / limit)}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default ChannelList;