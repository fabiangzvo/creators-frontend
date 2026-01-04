"use client"

import { JSX } from 'react'
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

import GeneralTab from "./components/generalTab";
import { ChannelTabsProps } from "./types";

function ChannelTabs(props: ChannelTabsProps): JSX.Element {
  const { integration } = props;

  return (
    <div className="flex w-full flex-col mt-4">
      <Tabs
        aria-label="channel tabs"
        variant='underlined'
        color='primary'
        classNames={{ tabContent: "text-foreground group-data-[selected=true]:font-bold text-base" }}
      >
        <Tab key="general" aria-label="tab general" title="General">
          <GeneralTab
            apiKey={integration.apiKey}
            accountId={integration.accountId}
            description={integration.description}
          />
        </Tab>
        <Tab key="posts" title="Publicaciones">
          <Card className="h-full">
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="settings" title="Configuración">
          <Card className="h-full">
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ChannelTabs