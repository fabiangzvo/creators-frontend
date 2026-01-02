import { JSX } from 'react'
import { Image } from '@heroui/image'
import { Badge } from '@heroui/badge'

import { PROVIDER_ICONS } from '@/components/channelForm/components/confirmationStep/constants';
import { Providers } from '@/types/providers';

import { badgeVariants, BadgeVariants } from './variants'
import { ImageWithProviderProps } from './types'

function ImageWithProvider(props: ImageWithProviderProps): JSX.Element {
  const { src, provider, alt } = props;

  const ProviderIcon = PROVIDER_ICONS[provider as Providers]

  return (
    <Badge
      variant="solid"
      color="primary"
      placement='bottom-right'
      className={badgeVariants({ variant: provider as BadgeVariants['variant'] })}
      content={<ProviderIcon size={20} />}
    >
      <Image
        alt={alt}
        height={50}
        width={50}
        radius="sm"
        src={src}
        fallbackSrc={`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`}
      />
    </Badge>
  )
}

export default ImageWithProvider