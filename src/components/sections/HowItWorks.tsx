import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import farmer2 from '../../Assets/farmer2.svg';
import farmer3 from '../../Assets/farmer3.svg';
import farmer4 from '../../Assets/farmer4.svg';

const HowItWorks = () => {
  return (
    <SectionWrapper id="how-it-works" className="bg-[#F6F6F6] py-15 md:py-32 overflow-hidden min-h-fit">
      <div className="max-w-7xl mx-auto px-4 pb-12 md:pb-0 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-3">
          <h2 className="text-4xl font-medium text-black tracking-tight">
            How Bharat VISTAAR Works ?
          </h2>
          <p className="text-gray-500 font-medium text-base">
            One Connected Digital Network
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative items-start justify-start">
          {/* Timeline Line */}
          <div className="absolute left-6 md:left-1/2 w-0.5 bg-[#D1D1D1] -translate-x-1/2" style={{ top: 0, bottom: 0 }}></div>

          <div className="space-y-6 md:space-y-12">
            
            {/* Step 1 */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Number Circle */}
              <div className="absolute left-6 md:left-1/2 top-6 md:top-1/4 -translate-x-1/2 md:-translate-y-1/4 w-12 h-12 md:w-16 md:h-16 bg-[#F7E8E1] rounded-full flex items-center justify-center z-20 border-4 border-[#F6F6F6]">
                <span className="text-[#FF671F] text-base md:text-xl font-bold">01</span>
              </div>

              {/* Left: Image (hidden on mobile, or positioned differently) */}
              <div className="hidden md:block px-3 w-fit ml-auto mr-0 z-10 w-full max-w-md">
                 <img src={farmer2} alt="Demand Side" className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] object-cover aspect-[4/3] shadow-md" />
              </div>

              {/* Right/Content: Stepper Content */}
              <div className="pl-16 md:pl-8 text-left md:translate-y-1/2">
                {/* Mobile Image */}
                <div className="md:hidden mb-6">
                   <img src={farmer2} alt="Demand Side" className="w-full h-auto rounded-[1.5rem] object-cover aspect-[16/9] shadow-md" />
                </div>
                
                <h3 className="text-xl font-medium text-black mb-4">Demand Side</h3>
                <p className="text-gray-500 text-base font-regular leading-relaxed max-w-md mx-auto md:mx-0">
                  Farmers and extension workers access services through web, mobile, assisted centres, and voice-based systems in local languages.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              {/* Number Circle */}
              <div className="absolute left-6 md:left-1/2 top-6 md:top-1/4 -translate-x-1/2 md:-translate-y-1/4 w-12 h-12 md:w-16 md:h-16 bg-[#F7E8E1] rounded-full flex items-center justify-center z-20 border-4 border-[#F6F6F6]">
                <span className="text-[#FF671F] text-base md:text-xl font-bold">02</span>
              </div>

              {/* Content Container */}
              <div className="pl-16 md:pl-0 md:pr-8 text-left md:text-right md:translate-y-1/2 order-2 md:order-1">
                {/* Mobile Image */}
                <div className="md:hidden mb-6">
                   <img src={farmer3} alt="Network Layer" className="w-full h-auto rounded-[1.5rem] object-cover aspect-[16/9] shadow-md" />
                </div>

                <h3 className="text-xl font-medium text-black mb-4">VISTAAR Network Layer</h3>
                <p className="text-gray-500 text-base font-regular leading-relaxed max-w-md mx-auto md:ml-auto md:mr-0">
                  A federated DPI containing a Central Node and State Nodes, facilitating secure data exchange and AI-driven insights through open protocols.
                </p>
              </div>

              {/* Right: Image (Desktop only) */}
              <div className="hidden md:block px-3 w-fit mr-auto ml-0 z-10 order-1 md:order-2 w-full max-w-md">
                 <img src={farmer3} alt="Network Layer" className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] object-cover aspect-[4/3] shadow-md" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start">
               {/* Number Circle */}
              <div className="absolute left-6 md:left-1/2 top-6 md:top-1/4 -translate-x-1/2 md:-translate-y-1/4 w-12 h-12 md:w-16 md:h-16 bg-[#F7E8E1] rounded-full flex items-center justify-center z-20 border-4 border-[#F6F6F6]">
                <span className="text-[#FF671F] text-base md:text-xl font-bold">03</span>
              </div>

              {/* Left: Image (Desktop only) */}
              <div className="hidden md:block px-3 w-fit ml-auto mr-0 z-10 w-full max-w-md">
                 <img src={farmer4} alt="Supply Side" className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] object-cover aspect-[4/3] shadow-md" />
              </div>

              {/* Right: Content */}
              <div className="pl-16 md:pl-8 text-left md:translate-y-1/2">
                {/* Mobile Image */}
                <div className="md:hidden mb-6">
                   <img src={farmer4} alt="Supply Side" className="w-full h-auto rounded-[1.5rem] object-cover aspect-[16/9] shadow-md" />
                </div>
                <h3 className="text-xl font-medium text-black mb-4">Supply Side</h3>
                <p className="text-gray-500 text-base font-regular leading-relaxed max-w-md mx-auto md:mx-0">
                  Seamless integration with ICAR Research, IMD Weather, AgrMarknet Prices and various State-level Agriculture portals.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HowItWorks;
