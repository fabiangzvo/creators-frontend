import { JSX } from "react";
import { CircleAlert } from "lucide-react";

export default function ErrorMessage(): JSX.Element {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className="blob h-36 w-36 bg-primary-50 flex justify-center items-center">
        <CircleAlert className="text-primary-500 mb-4 z-10" size={80} />
      </div>
      <h1 className="text-foreground text-xl font-semibold">
        ¡Oops! Algo salió mal
      </h1>
      <p className="text-foreground/50 text-center max-w-2xl">
        Hubo un problema al intentar cargar la información de tus canales. Puede
        ser un problema temporal de red o una interrupción del servicio. Por
        favor, inténtalo de nuevo más tarde.
      </p>
    </div>
  );
}
