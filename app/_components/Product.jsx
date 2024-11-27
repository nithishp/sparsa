"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
const Product = () => {
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Delay between each child's animation
          },
        },
      };

      // Children animation variants
      const childVariants = {
        hidden: { opacity: 0, y: 20 }, // Fade out and move down
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Fade in and move to original position
      };
  return (
    <section className="w-screen min-h-screen snap-start flex items-center">
      <div className="w-7/12 pl-10 flex flex-col h-screen pt-10  justify-evenly pb-10">
        <div className="flex flex-col gap-4">
          <h4 className="text-gray-500 text-xl uppercase tracking-wider">
            TOP Quality
          </h4>
          <motion.h1
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-extrabold text-foreground text-5xl"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
          </motion.h1>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className="flex flex-col gap-6 mb-10"
        >
          <motion.div variants={childVariants}>
            <motion.h1
              variants={childVariants}
              className="text-4xl font-bold text-[#645344] text-nowrap"
            >
              100% Natural Oleoresins
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-gray-600 max-w-[30vw] mt-1 text-nowrap"
            >
              Crafted for purity and potency, our oleoresins meet the highest
              industry standards.
            </motion.p>
          </motion.div>
          <motion.div variants={childVariants}>
            <motion.h1
              variants={childVariants}
              className="text-4xl font-bold text-[#645344] text-nowrap"
            >
              100% Natural Essential Oils
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-gray-600 max-w-[30vw] mt-1 text-nowrap"
            >
              Experience the essence of nature with oils sourced and distilled
              to perfection.
            </motion.p>
          </motion.div>
          <motion.div variants={childVariants}>
            <motion.h1
              variants={childVariants}
              className="text-4xl font-bold text-[#645344] text-nowrap"
            >
              Sustainable & Ethical
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-gray-600 max-w-[30vw] mt-1 text-nowrap"
            >
              Our 100% natural products are sustainably sourced for a greener
              tomorrow.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.2 }}
        className="w-5/12 bg-foreground bg-[url('/pattern-2.png')]  rounded-full h-full aspect-square flex  "
      >
        <Image
          src="/hero-img.png"
          width={700}
          height={700}
          className="-ml-[200px] object-contain"
        />
      </motion.div>
    </section>
  );
};

export default Product;