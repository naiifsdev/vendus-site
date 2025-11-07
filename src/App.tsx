import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';

function App() {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  return (
    <div className="min-h-screen dark:bg-[#111115] light:bg-[#F9FAFB] transition-colors duration-300">
      <Header onOpenSignup={() => setIsSignupModalOpen(true)} />
      <Hero onOpenSignup={() => setIsSignupModalOpen(true)} />
      <Features />
      <Calculator />
      <Pricing onOpenSignup={() => setIsSignupModalOpen(true)} />
      <Testimonials />
      <Footer />
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </div>
  );
}

export default App;
