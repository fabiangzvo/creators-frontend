import { JSX } from "react";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { ArrowBigRight, Users } from "lucide-react";
import { Alert } from "@heroui/alert";
import useSWR from "swr";

import ChannelCard from "../channelCard";

import { type StepComponentProps } from "@/components/formStepper/types";
import { getPages } from "@/actions/facebook";

function ConfirmationStep(props: StepComponentProps): JSX.Element {
  const { formData } = props;

  const {
    data: [data] = [],
    error,
    isLoading,
  } = useSWR(formData.token, (token: string) => getPages(token));

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
          description={data.about}
          image={data.picture.data.url}
          optionsComponent={
            <Tooltip content="Seguidores">
              <div className="flex gap-2 items-center text-primary-500">
                <p>{data.followers_count || "no hay seguidores"}</p>
                <Users className="text-primary-500" />
              </div>
            </Tooltip>
          }
          pageLink={"https://www.facebook.com/profile.php?id=" + data?.id}
          provider="facebook"
          subtitle="Facebook"
          title={data.name}
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
          provider="facebook"
          subtitle="Facebook"
          title={formData.name}
        />
      </div>
    </div>
  );
}

export default ConfirmationStep;
