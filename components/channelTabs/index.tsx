"use client"

import { JSX } from 'react'
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";

function ChannelTabs(): JSX.Element {
  return (
    <div className="flex w-full flex-col mt-4">
      <Tabs aria-label="Options">
        <Tab key="general" title="General">
          <Card className="h-full">
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="posts" title="Posts">
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
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default ChannelTabs