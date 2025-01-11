
import Image from "next/image";
import logo from "@/assets/thunder-final.png";
import SocialInsta from "@/assets/social-insta.svg";
import SocialYoutube from "@/assets/social-youtube.svg"
import SocialX from "@/assets/social-x.svg"


export const Footer = () => {

  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex ">
          <Image
            src={logo}
            alt="saas logo"
            width={100}
            className="invert-image h-auto"
          />
        </div>
      </div>
      <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
        <a href="https://www.instagram.com/7echcom?igsh=MWo0dXM1cWg4NmdmZw==">
          Instagram
        </a>
        <a href="">Youtube</a>
      </nav>

      <div className="flex justify-center gap-6 mt-6">
        <SocialInsta />
        <SocialYoutube />
        <SocialX />
      </div>

      <p className="mt-6">&copy; 2025 Techcom, Inc. ALL rights reserved.</p>

      <div className="mt-6  flex justify-center md:justify-end ">
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-1  md:ml-auto md:mr-5">
            <a
              href="https://www.instagram.com/manishxthakur7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>Developed by devxmanish </p>
            </a>

            <a
              href="https://www.instagram.com/manishxthakur7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="">
                <SocialInsta className="" />
              </div>
            </a>
          </div>
          <div className="hidden md:block">
            <p className="mr-6 text-[12px]">Design Frontend Tribe </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
