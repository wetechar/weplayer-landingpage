import HeroMobile from '@/components/HeroMobile';
import HeroBento from '@/components/HeroBento';
import HeroTriptico from '@/components/HeroTriptico';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import About from '@/components/About';
import Services from '@/components/Services';
import Verticals from '@/components/Verticals';
import ContactForm from '@/components/ContactForm';
import ContactCTA from '@/components/ContactCTA';
import HeroBase from '@/components/HeroBase';

export default function Home() {
  return (
    <>
      <HeroBase />
      {/* <HeroBento /> */}
      {/* <HeroTriptico /> */}
      {/* <HeroMobile /> */}
      {/* <Hero /> */}
      <Partners />
      <About />
      <Services />
      <Verticals />
      <ContactForm />
      <ContactCTA />
    </>
  );
}
