import { JSX } from "react";

import ChannelList from "@/components/channelList";

function Channels(): JSX.Element {
  return (
    <div className="container flex flex-col">

      <ChannelList />
    </div>
  );
}

export default Channels;