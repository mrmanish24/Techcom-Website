import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Icon from "@/assets/thunder-final.png"
import { MenuProvider } from "@/components/context/MenuContext";
import { Menu } from "@/components/Modals/MenuModal";
import { ModalProvider } from "@/components/context/ModalContext";
import { Modals } from "@/components/Modals/Modals";
import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
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
        <ModalProvider>
          <MenuProvider>
            <Modals />
            <Menu />
            <Header />
            {children}
            <Footer />
          </MenuProvider>
        </ModalProvider>
      </body>
    </html>
  );
}

