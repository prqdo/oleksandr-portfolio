import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "./LanguageContext";

export const metadata: Metadata = {
  title: "Oleksandr Sehechenko · Web Developer",
  description: "Portfolio of Oleksandr Sehechenko, a web developer and designer in Flensburg actively seeking a junior role in web development or digital media.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "OS.",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0d0a12",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
