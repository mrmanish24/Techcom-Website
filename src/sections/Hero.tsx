"use client"
import ArrowIcon from "@/assets/arrow-right.svg";
import HeroImg from "@/assets/macbook.png";
import CylinderRight from "@/assets/cylinder.png";
import SquareDiamond from "@/assets/28.png";
import {motion, useScroll,useTransform,} from "framer-motion";
import { useRef } from "react";


import Image from "next/image";
export const Hero = () => {
  const heroRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
  })

  const translateY = useTransform(scrollYProgress,[0,1], [150,-150]);
  return (
    <section
      ref={heroRef}
      id="home"
      className="pt-8 pb-8 md:pt-0 md:pb-10 bg-radial-gradient overflow-x-clip"
    >
      <div className=" container md:mycontainer md:mt-6 ">
        {/* container for hero*/}
        <div className="md:flex items-center">
          {/* flex for hero divide image and text section*/}
          <div className="">
            {/* text section for hero*/}
            <div className="inline-flex text-sm border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight ">
              Built for Speed⚡
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6">
              Unstoppable Machines for Unstoppable Minds
            </h1>
            <p className="text-xl text-[#010D3E] tracking-tighter mt-6">
              From gaming rigs to productivity machines, we craft PCs that
              combine cutting-edge technology, stunning design, and unbeatable
              performance
            </p>
            <div className="flex gap-1 items-center mt-[30px]">
              <a href="#PCbuilder">
                <button className="btn btn-primary">Design Now</button>
              </a>
              <a href="tel:7389185159">
                <button className="btn btn-text gap-1">
                  <span>Consult an Expert</span>
                  <ArrowIcon className="h-5 w-5" />
                </button>
              </a>
            </div>
          </div>
          {/* Image section for hero   */}
          {/* className="md:h-full md:w-auto md: max-w-none" saved-- */}
          <div className="mt-20 md:mt-0  md:h-[580px]  flex items-center relative ">
            <motion.img
              src={HeroImg.src}
              alt="hero image"
              animate={{ translateY: [-20, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 10,
                ease: "easeInOut",
              }}
            />
            <motion.img
              src={CylinderRight.src}
              alt="cylinder"
              height={180}
              width={180}
              className="hidden lg:block  absolute xl:-top-8 xl:-left-8  lg:left-10 lg:-top-[60px] "
              style={{
                translateY: translateY,
              }}
            />
            <motion.img
              src={SquareDiamond.src}
              alt="square diamond"
              height={180}
              width={180}
              className="hidden md:block md:absolute md:top-[450px] md:left-[350px] lg:left-[470px] z-0 rotate-[15deg]"
              style={{
                translateY: translateY,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};



// Unstoppable Machines for Unstoppable Minds

// "Blazing Fast ⚡";
// "Next-Gen Ready 🚀";
// "Built for Speed ⚙️";
