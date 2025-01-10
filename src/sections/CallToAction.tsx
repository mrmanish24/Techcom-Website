import springImage from "@/assets/spring.png"
import startImage from "@/assets/star.png"
import Image from "next/image";
export const CallToAction = () => {
  return (
    <section className="bg-gradient-to-b from-[#ffffff] to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="container">
        <div className="relative">
          <h2 className="heading-color text-5xl text-center">
            Transform Your Vision into Reality!
          </h2>
          <p className="text-center text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            Design the machine you&#39;ve always wanted—whether it&apos;s for gaming,
            work, or creativity. With our easy-to-use builder, your ideal setup
            is just a few steps away. Let&apos;s make it happen!
          </p>
          <Image
            src={startImage}
            alt="start image"
            width={260}
            className="hidden md:block absolute  -left-[200px] -top-[200px]"
          />
          <Image
            src={springImage}
            alt="start image"
            width={260}
            className="hidden md:block absolute -right-[200px] top-[20px]"
          />
        </div>
        <div className="flex justify-center mt-10">
          <a
            href="https://wa.me/917389185159?text=Hi%20there,%20I’m%20excited%20to%20build%20my%20PC%20and%20would%20love%20some%20assistance.%20Please%20give%20me%20a%20callback.%20Thank%20you!%20"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn btn-primary">
              Call Me Now! I&apos;m Interested
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};