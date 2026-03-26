import { JSX } from "react";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { ArrowBigRight, Users } from "lucide-react";
import { Alert } from "@heroui/alert";
import useSWR from "swr";

import { PROVIDER_ACCOUNT_LIST, PROVIDER_ICONS } from "./constants";
import { iconVariants } from "./variants";

import { type StepComponentProps } from "@/components/formStepper/types";
import ChannelCard from "@/components/facebookForm/components/channelCard";

function ConfirmationStep(props: StepComponentProps): JSX.Element {
  const { formData, provider } = props;

  const ProviderIcon = PROVIDER_ICONS[provider];
  const { data, error, isLoading } = useSWR(formData.token, (token: string) =>
    PROVIDER_ACCOUNT_LIST[provider](token),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Alert
        className="mb-10"
        color="warning"
        description="Al confirmar, tu cuenta se vinculará con Creators. Puedes cambiar esta configuración en cualquier momento."
      />
      <div className="flex gap-5 w-full items-center justify-center max-md:flex-col">
        <ChannelCard
          description={data?.description}
          image={data?.image || ""}
          optionsComponent={
            <Tooltip content="Seguidores">
              <div className="flex gap-2 items-center ">
                <p>{data?.optionsComponent || "sin seguidores"}</p>
                <Users className="" />
              </div>
            </Tooltip>
          }
          pageLink={data?.pageLink}
          provider={provider}
          subtitle={
            <ProviderIcon
              isFilled
              className={iconVariants({ variant: provider })}
              size={25}
            />
          }
          title={data?.title || ""}
        />
        <div className="flex justify-center w-1/6 max-md:rotate-90">
          <ArrowBigRight className="text-primary-500 fill-primary-500 w-14 h-14" />
        </div>
        <ChannelCard
          image={formData.image[0].source}
          optionsComponent={
            <Chip color="success" variant="flat">
              Activo
            </Chip>
          }
          provider={provider}
          subtitle={
            <ProviderIcon
              isFilled
              className={iconVariants({ variant: provider })}
              size={25}
            />
          }
          title={formData.name}
        />
      </div>
    </div>
  );
}

export default ConfirmationStep;
