import Lenovo from "../assets/logos/lenovo-po.png";
import Ryzen from "../assets/logos/ryzen-p.png";
import Nvidia from "../assets/logos/nvidia-p.png";
import Assus from "../assets/logos/asus logo.png";
import Accer from "../assets/logos/acer-p.png";
import Samsung from "../assets/logos/samsung-p.png";
import Pulse from "../assets/logo-pulse.png"
import Image from "next/image";

export const LogoTicker = () => {
  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="md:mycontainer container">
        <div className=" flex overflow-hidden mask-img">
          <div className="flex gap-14 flex-none ">
            <Image src={Lenovo} alt="Lenovo" className="logo-ticker" />
            <Image src={Ryzen} alt="Ryzen" className="logo-ticker" />
            <Image src={Nvidia} alt="Nvidia" className="logo-ticker" />
            <Image src={Assus} alt="Assus" className="logo-ticker" />
            <Image src={Accer} alt="Accer" className="logo-ticker" />
            <Image src={Samsung} alt="samsung" className="logo-ticker" />
            <Image src={Pulse} alt="Pulse" className="logo-ticker" />
          </div>
        </div>
      </div>
    </div>
  );
};
