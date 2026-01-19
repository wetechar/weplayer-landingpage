import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './components/About';
import Services from './components/Services';
import Verticals from './components/Verticals';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <About />
        <Services />
        <Verticals />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;