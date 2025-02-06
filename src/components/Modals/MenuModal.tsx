"use client";
import Close from "@/assets/close.png";
import { useMenu } from "../context/MenuContext";
import { useModal } from "../context/ModalContext";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";

export const Menu = () => {
  
  const { openMenu, toggleMenu } = useMenu(); // Access the context
  const {openModal} = useModal();

 const baseUrl =
   process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/";
  return (
    openMenu && (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 backdrop-blur-xl"
          onClick={toggleMenu}
        ></div>

        {/* Menu */}
        <nav className="fixed top-[2.8rem]   w-full h-[70%] shadow-lg z-50 transform translate-x-0 transition-transform">
          <div className="flex justify-end p-4 pt-7 pr-10">
            <button
              onClick={toggleMenu}
              className=" text-gray-800 focus:outline-none text-xl "
            >
              <Image src={Close} width={23} height={20} alt="close btn" />
            </button>
          </div>
          <ul className="flex flex-col items-center gap-6 p-8 text-gray-800 text-lg">
            <li>
              <Link onClick={toggleMenu} href={baseUrl}>Home</Link>
            </li>
            <li>
              <button
                onClick={() => {
                  openModal(
                    "About",
                    "At Techcom, we are passionate about delivering high-performance, custom-built PCs tailored to meet your specific needs. Whether you're a gamer, content creator, or professional, we provide the perfect machine for you. Founded by Rashid, a tech enthusiast with a deep understanding of computer hardware, we aim to provide expert advice and high-quality builds that bring out the best in your digital experience. Our services include custom PC building, expert advice, and after-sales support, all with the goal of creating machines that work seamlessly for you. 😊"
                  );
                  toggleMenu();
                }}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  openModal(
                    "Contact",
                    "📱+91 7389185159 \n 📩 BuildwithTechcom@gmail.com \n 🗺️Nagar Palika Deori DIST SAGAR (M.P.)"
                  );
                  toggleMenu();
                }}
              >
                Contact
              </button>
            </li>
            <li>
              <a
                href="tel:7389185159"
                onClick={toggleMenu}
                className=" text-gray-800 border border-black px-2 py-1 rounded-lg font-medium inline-flex items-center "
              >
                Get Expert Help
              </a>
            </li>
          </ul>
        </nav>
      </>
    )
  );
};
