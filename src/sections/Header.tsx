
"use client";
import ArrowRight from "@/assets/arrow-right.svg";
import Logo from "@/assets/thunder-final.png";
import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import { useModal } from "@/components/context/ModalContext";
import { useMenu } from "@/components/context/MenuContext";

export const Header = () => {
  const { openModal } = useModal();
  const {toggleMenu,openMenu} = useMenu();

  return (
    <header className="sticky top-0 backdrop-blur-sm z-10">
      {/* Top bar */}
      <div className="flex justify-center items-center bg-black py-3 text-white text-sm gap-2">
        <p className="md:text-white/60">
          Your Perfect PC is Just a Click Away!
        </p>
        <div className="inline-flex gap-1 items-center">
          <a href="/#home/#PCbuilder">
            <p className="text-white hidden md:block">Start Building</p>
          </a>
          <ArrowRight className="h-4 w-4 justify-center" />
        </div>
      </div>

      {/* Logo and Navigation */}
      <div className="py-5">
        <div className=" container mx-auto px-4 flex justify-between items-center">
          <Image src={Logo} alt="Saas logo" height={100} width={100} />

          {/* Hamburger Icon */}
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            {!openMenu && <MenuIcon className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-800 tracking-tight">
            <a href="/" className="hover:text-black">
              Home
            </a>
            <button
              onClick={() =>
                openModal(
                  "About Us",
                  "At Techcom, we are passionate about delivering high-performance, custom-built PCs tailored to meet your specific needs. Whether you're a gamer, content creator, or professional, we provide the perfect machine for you. Founded by Rashid, a tech enthusiast with a deep understanding of computer hardware, we aim to provide expert advice and high-quality builds that bring out the best in your digital experience. Our services include custom PC building, expert advice, and after-sales support, all with the goal of creating machines that work seamlessly for you. 😊"
                )
              }
              className="hover:text-black"
            >
              About
            </button>
            <button
              onClick={() =>
                openModal(
                  "Contact",
                  "📱+91 7389185159 \n 📩 BuildwithTechcom@gmail.com \n 🗺️ Nagar Palika Deori DIST SAGAR (M.P.)"
                )
              }
              className="hover:text-black"
            >
              Contact
            </button>
            <button
              onClick={() =>
                openModal(
                  "Services",
                 "👨‍🔧 PC Building – Built for power, made for you! \n \n🔧 PC Repair – Fix it fast, game on!"
                )
              }
              className="hover:text-black"
            >
              Services
            </button>
            <a
              href="tel:7389185159"
              className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center hover:bg-gray-900"
            >
              Get Expert Help
            </a>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
    </header>
  );
};
