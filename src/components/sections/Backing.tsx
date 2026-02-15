import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { Sparkles } from 'lucide-react';
import client1 from '../../Assets/client1.svg';
import client2 from '../../Assets/client2.svg';
import client3 from '../../Assets/client3.svg';
import client4 from '../../Assets/client4.svg';
import client5 from '../../Assets/client5.svg';
import client6 from '../../Assets/client6.svg';
import aiIcon from '../../Assets/icons/aiIcon.svg';

const Backing = () => {
  const clients = [
    { id: 1, logo: client1, alt: "ICAR" },
    { id: 2, logo: client2, alt: "Government of India" },
    { id: 3, logo: client3, alt: "Agmarknet" },
    { id: 4, logo: client4, alt: "NPSS" },
    { id: 5, logo: client5, alt: "Bhashini" },
    { id: 6, logo: client6, alt: "Partner" },
  ];

  return (
    <SectionWrapper id="backing" className="bg-[#FFFFFF] pt-12 md:pt-15 pb-12 md:pb-15 px-6 md:px-8 min-h-fit">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Pill Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF671F0D] rounded-full border border-[#FF671F] text-[#FF671F] text-sm font-medium tracking-wider mb-8 uppercase">
          <img src={aiIcon} alt="AI" className="w-4 h-4" />
          AI-POWERED
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-medium text-black text-center mb-16 tracking-tight uppercase">
          Backing Science & Data
        </h2>

        {/* Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 w-full">
          {clients.map((client) => (
            <div 
              key={client.id}
              className="bg-white border border-gray-100 rounded-3xl p-3 md:p-6 flex items-center justify-center aspect-[4/3] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <img 
                src={client.logo} 
                alt={client.alt} 
                className="max-w-full max-h-full object-contain transition-all duration-300 opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default Backing;
