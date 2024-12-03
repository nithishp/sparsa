import Hero from "./_components/Hero";
import Product from "./_components/Product";
import Featured from "./_components/Featured";
import Example from "./_components/SwapColumn";
import Footer from "./_components/Footer";
import AccordionSolutions from "./_components/AccordionSolutions";
import ShiftingContactForm from "./_components/ShiftingContactForm";

export default function Home() {
  return (
    <main className="   max-h-screen w-screen overflow-x-hidden">
      <Hero />
      <Product />
      {/* <Featured/> */}
      <Example/>
      <ShiftingContactForm/>
      {/* <AccordionSolutions/> */}
      <Footer/>
    </main>
  );
}

// snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth 