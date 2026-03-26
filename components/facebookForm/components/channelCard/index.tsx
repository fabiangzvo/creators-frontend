import { JSX } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";

import { ChannelCardProps } from "./types";
import { avatarVariants, buttonVariants } from "./variants";

function ChannelCard(props: ChannelCardProps): JSX.Element {
  const {
    image,
    description,
    optionsComponent,
    pageLink,
    subtitle,
    title,
    provider,
  } = props;

  return (
    <Card className="cursor-default w-3/6 max-md:w-5/6 h-full" shadow="sm">
      <CardHeader className="px-4 flex gap-5 justify-between font-bold border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-4 items-center">
          <Avatar
            isBordered
            className={avatarVariants({ variant: provider })}
            radius="full"
            size="md"
            src={image}
          />
          <div className="flex flex-col">
            <h2 className="text-lg">{title}</h2>
            <h3 className="text-sm text-gray-400">{subtitle}</h3>
          </div>
        </div>
        {optionsComponent}
      </CardHeader>
      {description && (
        <CardBody>
          <p className="text-center">{description || "Sin descripción"}</p>
        </CardBody>
      )}
      {pageLink && (
        <CardFooter className="relative flex gap-2">
          <Button
            as={Link}
            className="w-full font-bold"
            color="primary"
            href={pageLink}
            target="_blank"
            variant="solid"
          >
            {buttonVariants({ label: provider })}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default ChannelCard;
