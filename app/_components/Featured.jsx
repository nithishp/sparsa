import Image from "next/image";
import React from "react";

const Featured = () => {
  return (
    <section className="min-h-screen h-screen snap-start flex">
      <div className="w-1/3 flex flex-col justify-start pt-20 pl-10">
        <h1 className="font-bold text-4xl text-foreground">Our Products</h1>
        <div className="mt-5 space-y-1">
          <p className="text-foreground font-bold text-3xl ">Clove Oil</p>
          <p className="text-foreground font-semibold text-xl">Cardamon Oil</p>
          <p className="text-foreground font-semibold text-xl">Black pepper Oil</p>
          <p className="text-foreground font-semibold text-xl">Honey</p>
        </div>
      </div>
      <div className="w-1/3 flex flex-col justify-end mt-10 ">
        <h1 className="text-foreground font-extrabold text-5xl">Clove Oil</h1>
        <p className="text-gray-600 mt-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          deleniti maxime commodi rerum obcaecati.
        </p>
        <ul className="list-inside list-disc text-gray-500 space-y-2  mt-4">
          <li className="flex items-start gap-2">
            <span className="mt-[2px]">•</span>{" "}
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-[2px]">•</span>{" "}
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-[2px]">•</span>{" "}
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-[2px]">•</span>{" "}
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </span>
          </li>
        </ul>

        <div className="mt-4 mb-20">
          <h1 className="font-bold text-3xl text-foreground">₹90</h1>
          <button className="px-4 py-2 bg-foreground text-white w-max rounded-full mt-4">
            Enquire Now!
          </button>
        </div>
      </div>
      <div className="w-1/3 bg-foreground bg-[url('/pattern-opacity-30.png')] flex items-center  ">
        <Image
          src="/hero-img.png"
          alt=""
          width={500}
          height={500}
          className="object-contain z-10"
        />
      </div>
    </section>
  );
};

export default Featured;
