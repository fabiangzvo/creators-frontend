import { JSX } from "react";
import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";

import { badgeVariants, BadgeVariants } from "./variants";
import { ImageWithProviderProps } from "./types";

import { PROVIDER_ICONS } from "@/components/channelForm/components/confirmationStep/constants";
import { Providers } from "@/types/providers";

function ImageWithProvider(props: ImageWithProviderProps): JSX.Element {
  const { src, provider, alt } = props;

  const ProviderIcon = PROVIDER_ICONS[provider as Providers];

  return (
    <Badge
      className={badgeVariants({
        variant: provider as BadgeVariants["variant"],
      })}
      color="primary"
      content={<ProviderIcon size={20} />}
      placement="bottom-right"
      variant="solid"
    >
      <Image
        alt={alt}
        fallbackSrc={`https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?s=100`}
        height={50}
        radius="sm"
        src={src}
        width={50}
      />
    </Badge>
  );
}

export default ImageWithProvider;
