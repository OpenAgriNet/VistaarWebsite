
import React from 'react';
import Home from '../components/sections/Home';
import HowItWorks from '../components/sections/HowItWorks';
import Impact from '../components/sections/Impact';
import States from '../components/sections/States';
import Backing from '../components/sections/Backing';

interface HomePageProps {
  onOpenPartnerModal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onOpenPartnerModal }) => {
  return (
    <>
      <Home />
      <HowItWorks />
      <Impact />
      <States onOpenPartnerModal={onOpenPartnerModal} />
      <Backing />
    </>
  );
};

export default HomePage;
