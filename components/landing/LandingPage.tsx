import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "./Hero";
import Marquee from "./Marquee";
import Stats from "./Stats";
import Atelier from "./Atelier";
import Gallery from "./Gallery";
import Method from "./Method";
import Quote from "./Quote";
import Faq from "./Faq";
import CtaBand from "./CtaBand";

export default function LandingPage() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Stats />
      <Gallery />
      <Atelier />
      <Method />
      <Quote />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
