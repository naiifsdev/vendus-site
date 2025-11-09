import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ModalTrial from './components/ModalTrial';
import ModalAssinar from './components/ModalAssinar';

function App() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [isAssinarModalOpen, setIsAssinarModalOpen] = useState(false);

  const handleFreeTrial = () => {
    setIsTrialModalOpen(true);
  };

  const handleCheckout = () => {
    setIsAssinarModalOpen(true);
  };

  return (
    <div className="min-h-screen dark:bg-[#111115] light:bg-[#F9FAFB] transition-colors duration-300">
      <Header onFreeTrial={handleFreeTrial} onCheckout={handleCheckout} />
      <Hero onFreeTrial={handleFreeTrial} />
      <Features />
      <Calculator />
      <Pricing onFreeTrial={handleFreeTrial} onCheckout={handleCheckout} />
      <Testimonials />
      <Footer />
      <ModalTrial isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} />
      <ModalAssinar isOpen={isAssinarModalOpen} onClose={() => setIsAssinarModalOpen(false)} />
    </div>
  );
}

export default App;
