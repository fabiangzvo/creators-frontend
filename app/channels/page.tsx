import { JSX } from "react";

import ChannelExplorer from "@/components/channelExplorer";

export const metadata = {
  title: "Canales",
  description: "Explora los canales que haz integrado",
};

async function Channels(): Promise<JSX.Element> {
  return (
    <ChannelExplorer />
  );
}

export default Channels;