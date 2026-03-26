import "@/styles/globals.css";

import { PropsWithChildren, type JSX } from "react";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import dayjs from "dayjs";

import "dayjs/locale/es";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import VerticalSidebar from "@/components/verticalSidebar";

dayjs.locale("es");

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex h-full w-full min-h-screen">
            <VerticalSidebar />
            <div className="flex flex-col min-h-screen w-full">
              <Navbar />
              <main className="w-full h-full flex justify-center">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
