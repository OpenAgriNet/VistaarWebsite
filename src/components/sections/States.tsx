import React from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { Server, HandHeart, Laptop, Globe, ArrowUpRight } from 'lucide-react';
import stateOne from '../../Assets/icons/stateOne.svg';
import stateTwo from '../../Assets/icons/stateTwo.svg';
import stateThree from '../../Assets/icons/stateThree.svg';
import stateFour from '../../Assets/icons/stateFour.svg';
import pStateOne from '../../Assets/stateOne.png';
import pStateTwo from '../../Assets/stateTwo.jpeg';
import pStateThree from '../../Assets/stateThree.png';
import whiteTick from '../../Assets/whiteTick.svg';
import ellipse from '../../Assets/Ellipse.svg';
import pStateFour from "../../Assets/bihar.png";

interface StatesProps {
  onOpenPartnerModal: () => void;
}

const States = ({ onOpenPartnerModal }: StatesProps) => {
  return (
    <div className="flex flex-col w-full bg-[#F6F6F6]">
      {/* Part 1: Working with States */}
      <SectionWrapper id="states-info" className="pt-12 md:pt-20 pb-0 px-6 md:px-8 min-h-fit">
        <div className="max-w-7xl mx-auto mb-20">
          
          <h2 className="text-3xl md:text-4xl font-medium text-center text-black mb-16 tracking-tight">
            Working with States & Partners
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20">
            {/* Card 1 */}
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-[#D1D1D1] shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Blue Blur Effect */}
              <div className="bg-[#FF671F]/10 blur-[20px] w-40 h-40 absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-[#FF671F]/40 transition-colors"></div>
              
              <div className="relative z-10">
                <img src={stateOne} alt="Provider Platform" className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
                <h3 className="text-base md:text-xl font-semibold text-black mb-2 md:mb-3">Provider Platform</h3>
                <p className="text-gray-500 text-xs md:text-sm font-regular leading-relaxed">
                  Host and publish services at scale. Share scheme info, advisories, or weather data with farmers across the network.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-[#D1D1D1] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Blue Blur Effect */}
              <div className="bg-[#FF671F]/10 blur-[20px] w-40 h-40 absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-[#FF671F]/40 transition-colors"></div>

              <div className="relative z-10">
                <img src={stateTwo} alt="Provider" className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
                <h3 className="text-base md:text-xl font-semibold text-black mb-2 md:mb-3">Provider</h3>
                <p className="text-gray-500 text-xs md:text-sm font-regular leading-relaxed">
                  Contribute your expertise. Offer specific schemes, data, or advisory services through an existing platform.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-[#D1D1D1] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Blue Blur Effect */}
              <div className="bg-[#FF671F]/10 blur-[20px] w-40 h-40 absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-[#FF671F]/40 transition-colors"></div>

              <div className="relative z-10">
                <img src={stateThree} alt="Seeker Platform" className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
                <h3 className="text-base md:text-xl font-semibold text-black mb-2 md:mb-3">Seeker Platform</h3>
                <p className="text-gray-500 text-xs md:text-sm font-regular leading-relaxed">
                  Enable farmer access. Build apps or platforms that help farmers and field workers discover and access services.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl border border-[#D1D1D1] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative overflow-hidden group">
              {/* Blue Blur Effect */}
              <div className="bg-[#FF671F]/10 blur-[20px] w-40 h-40 absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none group-hover:bg-[#FF671F]/40 transition-colors"></div>

              <div className="relative z-10">
                <img src={stateFour} alt="Seeker" className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
                <h3 className="text-base md:text-xl font-bold text-black mb-2 md:mb-3">Seeker</h3>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                  Consume network services. Access schemes, advisories, and information through any VISTAAR-enabled platform.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#E6E9FF] border-l-4 border-[#06038D] p-6 md:p-8 rounded-r-xl max-w-4xl mx-auto shadow-sm">
            <p className="text-black font-regular text-base leading-relaxed italic">
              <span className="font-medium text-[#06038D] text-base italic">Flexibility by Design:</span> <span className="font-regular text-[#06038D] text-base italic">Organisations can play one or multiple roles enabling collaboration, innovation, and faster scale across the ecosystem.</span>
            </p>
          </div>

        </div>
      </SectionWrapper>

      {/* Part 2: Active State Portals */}
      <div className="relative z-10 overflow-hidden">
          {/* Blue Curved Background Container */}
          <div className="relative bg-primary pt-8 pb-20 md:pt-12 md:pb-24 mt-24 md:mt-32">
              {/* Curve Shape at Top - Flattened to match Figma */}
              <div className="absolute top-0 left-[-10%] right-[-10%] h-24 md:h-36 bg-primary rounded-[50%] -translate-y-1/2 z-0"></div>
              
              <div className="px-4 md:px-8 relative z-10 w-full">
                   <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                      <h2 className="text-3xl md:text-3xl font-medium text-center text-white mb-16 relative z-10">
                          Active State Portals
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8 mb-16 z-10 w-full max-w-5xl mx-auto">
                          {/* Card 1 - Amul AI */}
                          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center h-56 shadow-lg hover:scale-105 transition-transform duration-300 gap-6">
                               <div className="h-28 flex items-center justify-center w-full">
                                 <img src={pStateOne} alt="Amul AI" className="max-w-full max-h-full object-contain" />
                               </div>
                               <span style={{
                                 fontFamily: 'Poppins',
                                 fontWeight: 500,
                                 fontSize: '16px',
                                 lineHeight: '22px',
                                 color: '#131313',
                                 textAlign: 'center'
                               }}>Amul AI</span>
                          </div>

                          {/* Card 2 - MahaVISTAAR */}
                          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center h-56 shadow-lg hover:scale-105 transition-transform duration-300 gap-6">
                               <div className="h-28 flex items-center justify-center w-full">
                                 <img src={pStateTwo} alt="MahaVISTAAR" className="max-w-full max-h-full object-contain" />
                               </div>
                               <span style={{
                                 fontFamily: 'Poppins',
                                 fontWeight: 500,
                                 fontSize: '16px',
                                 lineHeight: '22px',
                                 color: '#131313',
                                 textAlign: 'center'
                               }}>MahaVISTAAR</span>
                          </div>

                          {/* Card 3 - Bihar Krishi */}
                          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center h-56 shadow-lg hover:scale-105 transition-transform duration-300 gap-6">
                               <div className="h-28 flex items-center justify-center w-full">
                                 <img src={pStateFour} alt="Bihar Krishi" className="max-w-full max-h-full object-contain" />
                               </div>
                               <span style={{
                                 fontFamily: 'Poppins',
                                 fontWeight: 500,
                                 fontSize: '16px',
                                 lineHeight: '22px',
                                 color: '#131313',
                                 textAlign: 'center'
                               }}>Bihar Krishi</span>
                          </div>
                      </div>

                      <div className="flex justify-center relative z-10">
                          <button 
                              onClick={onOpenPartnerModal}
                              className="h-12 bg-white text-primary text-base pr-1 pl-4 py-1 rounded-md font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
                          >
                              Partner with Us
                              <div className="bg-primary h-10 w-10 flex items-center justify-center rounded text-white ml-2">
                                  <img src={whiteTick} alt="White Tick" className="h-3" />
                              </div>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default States;
