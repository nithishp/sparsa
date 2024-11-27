'use client'
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";

const Example = () => {
  return (

     
      <SwapColumnFeatures />

  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState(features[0]);

  return (
    <section className="relative mx-auto max-w-[100vw]">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <div className="-mt-[100vh] hidden md:block" />

      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({ featureInView }) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-2/5 rounded-xl py-8 "
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({ setFeatureInView, featureInView }) => {
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
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);
    useEffect(() => {
      if (isInView) {
        setFeatureInView(featureInView);
        // Auto scroll to center the content when it comes into view
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
          variants={containerVariants} // Attach parent variants
          initial="hidden" // Start in hidden state
          whileInView="visible" // Animate to visible state when in view
          viewport={{ amount: 0.1 }} // Trigger when 20% of the element is visible
          className="flex flex-col gap-4 mb-10"
        >
          {featureInView.callout && (
            <motion.h4
            variants={childVariants} // Attach child variants
              className="text-gray-500 text-xl uppercase tracking-wider"
            >
                {featureInView.callout}
            </motion.h4>
            )}

          <motion.h1
            variants={childVariants} // Attach child variants
            className="text-7xl font-bold text-[#645344]"
          >
            {featureInView.title}
          </motion.h1>

          <motion.div variants={childVariants} className="flex gap-2 mt-3">
            <Heart className="text-foreground" />
            <p className="text-gray-500">
              {featureInView.likes} People loved this product.
            </p>
          </motion.div>

          <motion.p
            variants={childVariants}
            className="text-gray-600 max-w-[30vw] mt-5"
          >
            {featureInView.description}
          </motion.p>
          <motion.ul>
            {featureInView.points.map((point) => (
              <motion.li
                variants={childVariants}
                className="flex items-start text-gray-500 gap-2"
              >
                <span className="mt-[2px]">•</span> <span>{point}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div variants={childVariants} className="flex gap-4 mt-2">
            <h1 className="font-semibold text-3xl">₹ 90</h1>
            <button className="px-4 py-2 bg-foreground rounded-full text-white">
              Call Us Now!!
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }) => {
  return (
    <div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ amount: 0.2 }}
      className={`bg-foreground bg-[url('/pattern.png')] h-screen flex ${
        featureInView.contentPosition === "l"
          ? "rounded-l-[40px]" // Apply rounded-left only
          : "rounded-r-[40px]" // Apply rounded-right only
      }`}
    >
      <Image
        src="/hero-img.png"
        width={700}
        height={700}
        className={`object-contain ${
          featureInView.contentPosition === "l"
            ? "-ml-[200px]" // For left-aligned content
            : "ml-[200px]" // For right-aligned content
        }`}
      />
    </div>
  );
};

export default Example;

const features = [
  {
    id: 1,
    callout: "#1 Best seller",
    title: "Clove Oil",
    description:
      "Clove Oil is a popular essential oil known for its soothing properties. It is commonly used for pain relief, as well as for improving digestion and promoting healthy skin.",
    points: [
      "Used for dental care and toothache relief.",
      "Has antiseptic properties that help in skin care.",
      "Known to reduce inflammation and improve circulation.",
    ],
    likes: 275,
    price: 250,
    contentPosition: "r", // Right alignment
  },
  {
    id: 2,
    callout: "20% Discount",
    title: "Cardamom Oil",
    description:
      "Cardamom Oil is an aromatic essential oil, often used in aromatherapy for its calming and uplifting effects. It’s also known for promoting digestive health.",
    points: [
      "Helps to alleviate indigestion and bloating.",
      "Relieves anxiety and stress through its calming properties.",
      "Can be used to improve skin tone and reduce scars.",
    ],
    likes: 154,
    price: 180,
    contentPosition: "l", // Left alignment
  },
  {
    id: 3,
    title: "Black Pepper Oil",
    description:
      "Black Pepper Oil is known for its warming properties. It’s often used in massage oils and is considered an effective remedy for muscle pain and inflammation.",
    points: [
      "Boosts circulation and eases muscle pain.",
      "Rich in antioxidants, helping to fight free radicals.",
      "Aids in digestion and helps detoxify the body.",
    ],
    likes: 117,
    price: 200,
    contentPosition: "r", // Right alignment
  },
  {
    id: 4,
    callout: "Sold Out",
    title: "Honey",
    description:
      "Honey is a natural sweetener with numerous health benefits. It has antibacterial and anti-inflammatory properties and is widely used in skincare, cough remedies, and as an energy booster.",
    points: [
      "Known to promote digestion and soothe sore throats.",
      "Contains antioxidants that help to fight infection.",
      "Used as a natural moisturizer in skincare routines.",
    ],
    likes: 145,
    price: 300,
    contentPosition: "l", // Left alignment
  },
];