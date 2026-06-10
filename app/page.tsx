import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import SuccessCases from '@/components/SuccessCases';
import ContactForm from '@/components/ContactForm';
import ContactCTA from '@/components/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <SuccessCases />
      <ContactCTA />
      <ContactForm />
    </>
  );
}
