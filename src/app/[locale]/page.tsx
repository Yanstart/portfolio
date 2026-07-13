import Hero from '@/components/Hero';
import SaloonCounters from '@/components/SaloonCounters';
import WantedBoard from '@/components/WantedBoard';
import DuelGame from '@/components/DuelGame';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Activities from '@/components/Activities';
import CV from '@/components/CV';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <SaloonCounters />
      <About />
      <WantedBoard />
      <Skills />
      <Activities />
      <CV />
      <Contact />
      <DuelGame />
    </>
  );
}
