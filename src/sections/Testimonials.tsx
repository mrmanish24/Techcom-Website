"use client"
import avatar1 from "@/assets/avatar-6.png";
import avatar2 from "@/assets/final/gyanendra-modified.png";
import avatar3 from "@/assets/final/vaibhav.jpg";
import avatar4 from "@/assets/final/manish-modified.png";
import avatar5 from "@/assets/final/ankit-modified.png";
import avatar6 from "@/assets/final/deepak-modified.png";
import avatar7 from "@/assets/final/luckey-modified.png";
import avatar8 from "@/assets/final/rajul-modified.png";
import avatar9 from "@/assets/final/parag-modified.png";
import Image from "next/image";
import {motion} from "framer-motion"
import React from "react";

const testimonials = [
  {
    text: "The whole process was so simple, and the PC runs like a dream. Highly recommend!.",
    imageSrc: avatar1,
    name: "Ashutosh",
    username: "@ashupandey_7",
  },
  {
    text: "Upgraded my system, and now it’s blazing fast.",
    imageSrc: avatar2,
    name: "Gyanendra",
    username: "@gyanendrasingh30",
  },
  {
    text: "This is the easiest way to get a custom PC. Exceptional service and flawless delivery!",
    imageSrc: avatar3,
    name: "Vaibhav",
    username: "@vaibhav_tiwariiiii",
  },
  {
    text: "This is the easiest way to get a custom PC. Exceptional service and flawless delivery!",
    imageSrc: avatar4,
    name: "Manish",
    username: "@manishxthakur7",
  },
  {
    text: "Fast, professional, and affordable. Couldn’t ask for better service.",
    imageSrc: avatar5,
    name: "Ankit",
    username: "@ankit_n_7",
  },
  {
    text: "Amazing experience! The customization options were fantastic, and the performance is unreal.",
    imageSrc: avatar6,
    name: "Deepak",
    username: "@ydu_deepak_00",
  },
  {
    text: "Top-notch repair service! I’ll definitely come back for any future issues.",
    imageSrc: avatar7,
    name: "Lucky",
    username: "@luckey_nema",
  },
  {
    text: "I wasn’t sure what to pick, but the expert advice made it so easy. Love my new build!",
    imageSrc: avatar8,
    name: "Rajul",
    username: "@mr_rajul_kori_08",
  },
  {
    text: "They explained everything clearly and delivered exactly what I needed..",
    imageSrc: avatar9.src,
    name: "Parag",
    username: "@jain_parag_",
  },
];

const firstColumn = testimonials.slice(0,3);
const secondColumn = testimonials.slice(3,6);
const thridColumn = testimonials.slice(6,9);

const TestimonialColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number | null;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{translateY:"-50%"}}
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: props.duration,
      }}
      className="flex flex-col gap-6 py-2"
    >
      {[...new Array(2)].fill(0).map((ele, index) => (
        <React.Fragment key={index}>
          {props.testimonials.map(({ text, imageSrc, name, username }) => (
            <div className="card-style" key={username}>
              <div>{text}</div>

              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  height={40}
                  width={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5 ">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);


export const Testimonials = () => {
  return (
    <section className="bg-white">
      <div className="container ">
        <div className="flex justify-center">
          <div className="box-style">Testimonials</div>
        </div>

        <div className=" mx-auto mt-5">
          <h2 className="heading-color text-3xl text-center">
            Testimonials That Matter
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            We’re proud to be part of so many incredible journeys. Here’s what
            our customers have to say about their custom-built PCs.
          </p>
        </div>

        <div className="flex justify-center gap-6 mt-10 mask-card max-h-[750px] overflow-hidden ">
          <TestimonialColumn testimonials={firstColumn} duration={10} />
          <TestimonialColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration= {17}
          />
          <TestimonialColumn
            testimonials={thridColumn}
            className="hidden lg:block"
            duration={15}
          />
        </div>
      </div>
    </section>
  );
};
