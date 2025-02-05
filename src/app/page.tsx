
import { CallToAction } from "@/sections/CallToAction";
import {Hero} from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import PCBuilder2 from "@/sections/Pcbuilder2";
import { Testimonials } from "@/sections/Testimonials";
import { ADLaM_Display } from "next/font/google";


export default function Home() {
  return (
    <>
     
          <Hero />
          <LogoTicker />
          <PCBuilder2 />
          <Testimonials />
          <CallToAction />
          
    </>
  );
};