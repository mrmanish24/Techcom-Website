
import { CallToAction } from "@/sections/CallToAction";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import {Hero} from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import PCBuilder from "@/sections/Pcbuilder";
import { Testimonials } from "@/sections/Testimonials";
import { ModalProvider } from "@/components/context/ModalContext";
import { ADLaM_Display } from "next/font/google";
import {Modals} from "@/components/Modals/Modals";
import { MenuProvider } from "@/components/context/MenuContext";
import {Menu} from "@/components/Modals/MenuModal";

export default function Home() {
  return (
    <>
      <ModalProvider>
        <MenuProvider>
          <Modals />
          <Menu />
          <Header />
          <Hero />
          <LogoTicker />
          <PCBuilder />
          <Testimonials />
          <CallToAction />
          <Footer />
        </MenuProvider>
      </ModalProvider>
    </>
  );
};
