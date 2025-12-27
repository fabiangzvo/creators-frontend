import { JSX } from 'react'

import { FormProviderProps } from '@/types/providers'

import Form from './components/form'

async function ChannelForm(props: FormProviderProps): Promise<JSX.Element> {
  const { accessToken, fetchAllowedAccounts, provider } = props

  const data = await fetchAllowedAccounts(accessToken)

  if (typeof data === 'string') return <div>{data}</div>

  return (
    <div className="px-4">
      <Form
        token={accessToken}
        pages={data}
        provider={provider}
      />
    </div>
  )
}

export default ChannelForm