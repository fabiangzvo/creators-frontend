import { JSX, useMemo } from "react";

import StatCard from "./components/statCard";
import { StatListProps } from "./types";

function StatList(props: StatListProps): JSX.Element {
  const { items } = props;

  const itemsRender = useMemo(
    () => items.map((item) => <StatCard key={item.title} {...item} />),
    [items],
  );

  return (
    <div className="grid grid-cols-3 gap-4 mt-4 max-md:grid-cols-2 max-sm:grid-cols-1">
      {itemsRender}
    </div>
  );
}

export default StatList;
