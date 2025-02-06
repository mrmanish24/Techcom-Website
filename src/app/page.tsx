
import { CallToAction } from "@/sections/CallToAction";
import {Hero} from "@/sections/Hero";
import { LogoTicker } from "@/sections/LogoTicker";
import Mainfunctionality from "@/sections/Mainfun";
import { Testimonials } from "@/sections/Testimonials";


export default function Home() {
  return (
    <>
     
          <Hero />
          <LogoTicker />
          <Mainfunctionality/>
          <Testimonials />
          <CallToAction />
          
    </>
  );
};