"use client";

import { JSX } from "react";
import { Spinner } from "@heroui/spinner";

function Loader(): JSX.Element {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner />
    </div>
  );
}

export default Loader;
