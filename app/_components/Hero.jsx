import Image from "next/image";
import { useInView } from "framer-motion";
import AnimateNumber from "./animated-number";
import { Plus } from "lucide-react";
import Header from "./Header";

const Hero = () => {
  return (
    <section className=" h-full w-screen snap-start bg-background relative">
      <Header />
      <div className=" flex flex-shrink flex-col md:flex-row h-full w-full items-center justify-center relative md:px-20">
        <div className="md:w-1/2 w-full px-5 md:px-0 text-center md:text-left mt-20  ">
          <h1 className="text-foreground font-extrabold  leading-none  lg:text-7xl mt-[80px] md:mt-0 text-5xl">
            Oleoresins & Essential Oils
          </h1>
          <p className="mt-7 text-[#5b534e]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. A,
            similique maxime ducimus natus magni dolorum eum optio voluptatibus
            architecto unde?
          </p>

          <button className="px-6 py-4 mt-6  bg-foreground text-background rounded-full">
            Contact Us
          </button>

          <div className=" flex flex-row flex-wrap justify-center md:justify-start items-center gap-14 mt-6">
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                {" "}
                <AnimateNumber endValue={2563} />
                <Plus className="text-foreground" />
              </div>
              <p className="text-[#5b534e] text-xl font-normal text-nowrap">
                Happy Customers
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                {" "}
                <AnimateNumber endValue={15} />
                <Plus className="text-foreground" />
              </div>
              <p className="text-[#5b534e] text-xl font-normal text-nowrap">
                States Supplied
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center justify-start">
                {" "}
                <AnimateNumber endValue={254} />
                <Plus className="text-foreground" />
              </div>
              <p className="text-[#5b534e] text-xl font-normal text-nowrap">
                Distributors
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full md:w-1/2 flex items-center justify-center">
          <Image
            src="/hero-img.png"
            width={500}
            height={500}
            alt="Olive & Clove Resin"
            className="w-full h-auto object-contain "
          />
          {/* <Image
            src="/blob-1.png"
            alt=""
            width={400}
            height={400}
            className="absolute right-7 h-[80vh] opacity-60 w-auto"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
