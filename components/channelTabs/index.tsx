"use client"

import { JSX } from 'react'
import { Tabs, Tab } from "@heroui/tabs";

import { Providers } from "@/types/providers";

import GeneralTab from "./components/generalTab";
import PostTab from './components/postsTab';
import SettingTab from './components/settingsTab';
import { ChannelTabsProps } from "./types";

function ChannelTabs(props: ChannelTabsProps): JSX.Element {
  const { integration, token } = props;

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
            provider={integration.provider.name as Providers}
            token={token}
          />
        </Tab>
        <Tab key="posts" title="Publicaciones">
          <PostTab />
        </Tab>
        <Tab key="settings" title="Configuración">
          <SettingTab
            integrationId={integration.id}
            status={integration.status.name}
          />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ChannelTabs