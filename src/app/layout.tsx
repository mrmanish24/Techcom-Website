import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Icon from "@/assets/logosaas.png"


const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techcom PC Builder",
  description:
    "Build your dream PC effortlessly with our custom PC builder. Choose high-quality components, personalize your setup, and send your build request with ease. From gaming rigs to productivity machines, we craft PCs tailored to your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <head>
        <link rel="icon" href={Icon.src} type="image/x-icon" />
      </head>
      <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}
