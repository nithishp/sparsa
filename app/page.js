import Hero from "./_components/Hero";
import Product from "./_components/Product";
import Featured from "./_components/Featured";
import Example from "./_components/SwapColumn";
import Footer from "./_components/Footer";
import AccordionSolutions from "./_components/AccordionSolutions";

export default function Home() {
  return (
    <main className="   max-h-screen w-screen overflow-x-hidden">
      <Hero />
      <Product />
      {/* <Featured/> */}
      <Example/>
      <AccordionSolutions/>
      <Footer/>
    </main>
  );
}

// snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth 