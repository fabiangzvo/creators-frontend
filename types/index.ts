import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version: string;
      }) => void;
      getLoginStatus: (callback: (response: any) => void) => void;
      login: (callback: (response: any) => void, options?: { scope: string , auth_type: string, fields: string}) => void;
      logout: (callback?: (response: any) => void) => void;
      api: (path: string, callback: (response: any) => void) => void;
      // Add other FB methods you use
    };
  }
}