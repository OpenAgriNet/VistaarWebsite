import { Puzzle, Scale, Languages, CloudOff, Bot, FileText, Webhook, Mic, Landmark } from 'lucide-react';
import govEmblem from '../../Assets/govEmblem.svg';
import farmer from '../../Assets/farmer.svg';
import farmerBackground from '../../Assets/farmerBackground.svg';
import blueBg from '../../Assets/greenBg.svg';
import farmerBgTwo from "../../Assets/farmerBgTwo.svg";
import learnMore from "../../Assets/learnMore.svg";
import watchVideo from "../../Assets/watchVideo.svg";
import homeIconOne from '../../Assets/icons/homeIconOne.svg';
import homeIconTwo from '../../Assets/icons/homeIconTwo.svg';
import homeIconThree from '../../Assets/icons/wbcThree.svg';
import homeIconFour from '../../Assets/icons/homeIconFour.svg';
import wbcOne from '../../Assets/icons/wbvOne.svg';
import wbcTwo from '../../Assets/icons/wbvTwo.svg';
import wbcThree from '../../Assets/icons/wbcThree.svg';
import wbcFour from '../../Assets/icons/wbcFour.svg';
import wbcFive from '../../Assets/icons/wbcFive.svg';
import wbcSix from '../../Assets/icons/wbcSix.svg';
import SectionWrapper from '../layout/SectionWrapper';

const Home = () => {
  return (
    // <div className="flex flex-col w-full items-center justify-center">
    <SectionWrapper id="home" className="bg-[#fcfcfc] overflow-hidden !py-0">
        {/* Background Gradient */}
        {/* <div className="absolute -left-20 bottom-0 w-[600px] h-[600px] bg-[#FEF9C3] blur-[100px] -z-10 opacity-60 rounded-full pointer-events-none"></div> */}

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 px-6 md:px-12 lg:px-16 xl:px-24 pt-8 md:pt-16 pb-8 md:pb-12 items-center">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start space-y-6 md:pr-6 lg:pr-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF671F0D] border border-[#FF671F] rounded-full w-fit mx-auto md:mx-0">
              <img src={govEmblem} alt="Emblem" className="h-6 w-auto" />
              <span className="text-[#FF671F] font-medium text-xs tracking-wider uppercase">Government of India Initiative</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight text-center md:text-left">
                <span className="text-primary">BharatVistaar</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 max-w-xl leading-relaxed text-center md:text-left">
                National Digital Public Infrastructure (DPI) for Agriculture. Empowering farmers with unified, AI-driven digital ecosystems.
              </p>
            </div>

            <div className="flex flex-row items-center justify-center md:justify-start gap-3 pt-2">
              {/* Learn more button - filled blue with shadow */}
              <button className="flex-1 sm:flex-none group relative bg-primary text-white pl-4 pr-1 py-1 rounded-lg font-semibold flex items-center justify-between sm:justify-center gap-3 transition-all duration-300 hover:shadow-[0_12px_32px_-4px_rgba(67,67,255,0.5),0_6px_16px_-2px_rgba(67,67,255,0.4),inset_0_-2px_8px_rgba(0,0,0,0.15)] hover:scale-[1.02]">
                <span className="text-sm sm:text-base font-medium text-center leading-tight">Learn more</span>
                <img 
                  src={learnMore} 
                  alt="Learn more" 
                  className="h-8 sm:h-10 w-auto flex-shrink-0"
                />
              </button>
              
              {/* Watch video button - outlined with shadow */}
              <button className="flex-1 sm:flex-none group relative bg-white text-primary border border-primary pl-1 pr-4 sm:pr-8 py-1 rounded-lg font-semibold flex items-center justify-between sm:justify-center gap-3 transition-all duration-300 hover:bg-secondary hover:shadow-[0_6px_20px_-2px_rgba(67,67,255,0.2),0_3px_10px_-1px_rgba(67,67,255,0.15),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:scale-[1.02]">
                <img 
                  src={watchVideo} 
                  alt="Watch video" 
                  className="h-8 sm:h-10 w-auto flex-shrink-0"
                />
                <span className="text-sm sm:text-base font-medium text-center leading-tight">Watch video</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative mt-8 md:mt-0 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[650px]">
              {/* Background container with responsive sizing */}
              <div className="relative rounded-[2rem] overflow-hidden w-full border-none shadow-none" style={{aspectRatio: '1.5'}}>
                <img 
                  src={farmerBackground} 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
                />
              </div>

              {/* Farmer image - positioned relative to container */}
              <img 
                src={farmer} 
                alt="Farmer" 
                className="absolute bottom-0 right-[-10px] md:right-[-35px] h-[110%] max-h-[400px] md:max-h-[450px] lg:max-h-[600px] w-auto object-contain object-bottom z-10 pointer-events-none"
              />
              
              {/* Stats Card */}
              <div className="absolute top-8 md:top-12 -left-6 md:-left-10 z-20 bg-primary p-5 md:p-6 rounded-3xl shadow-xl min-w-[220px] md:min-w-[240px] max-w-[280px] md:max-w-[300px] border-4 border-white">
                <div className="text-3xl md:text-5xl font-bold font-medium text-[#FFFFFF] mb-1 whitespace-nowrap">140M+</div>
                <div className="text-[#FFFFFF] font-medium text-base md:text-lg break-words">Farmers Connected</div>
              </div>
              
              {/* Circular shapes overlay - farmerBgTwo - positioned below stats card */}
              <img 
                src={farmerBgTwo} 
                alt="Decorative shapes" 
                className="absolute bottom-[-25px] md:bottom-[-40px] h-24 md:h-40 -left-1 md:left-[-15px] object-contain z-15 pointer-events-none"
              />
            </div>
          </div>
        </div>

      {/* Why Bharat VISTAAR? Section */}
      <div className="relative py-2 px-4 md:px-8 overflow-hidden group/bg">
        <div className="absolute inset-0 z-0">
          <img 
            src={blueBg} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#06038D] opacity-70"></div>
        </div>
            <div className="pt-12 md:pt-16 pb-12 md:pb-16 px-4 md:px-16 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold font-medium text-center mb-10 md:mb-16 text-white tracking-tight">
            Why Bharat VISTAAR?
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <div 
              className="bg-transparent p-3 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:scale-105 duration-300"
              style={{
                backgroundColor: "#FFFFFF"
              }}
            >
              <img src={homeIconOne} alt="Integrated systems" className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6" />
              <h3 className="text-base md:text-lg font-semibold text-[#131313] mb-2 md:mb-3">Integrated systems</h3>
              <p className="text-[#4F4F4F] font-normal text-[10px] md:text-base leading-relaxed">
                Solving the challenge of siloed agricultural data across multiple platforms and departments.
              </p>
            </div>

            <div 
              className="bg-transparent p-3 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:scale-105 duration-300"
              style={{
                backgroundColor: "#FFFFFF"
              }}
            >
              <img src={homeIconTwo} alt="Inclusive access" className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6" />
              <h3 className="text-base md:text-lg font-semibold text-[#131313] mb-2 md:mb-3">Inclusive access</h3>
              <p className="text-[#4F4F4F] font-normal text-[10px] md:text-base leading-relaxed">
                Bridging the digital divide in rural areas to ensure every farmer gets equal opportunities.
              </p>
            </div>

            <div 
              className="bg-transparent p-3 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:scale-105 duration-300"
              style={{
                backgroundColor: "#FFFFFF"
              }}
            >
              <img src={homeIconThree} alt="Local language access" className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6" />
              <h3 className="text-base md:text-lg font-semibold text-[#131313] mb-2 md:mb-3">Local language access</h3>
              <p className="text-[#4F4F4F] font-normal text-[10px] md:text-base leading-relaxed">
                Making information accessible in local dialects for seamless understanding and adoption.
              </p>
            </div>

            <div 
              className="bg-transparent p-3 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:scale-105 duration-300"
              style={{
                backgroundColor: "#FFFFFF"
              }}
            >
              <img src={homeIconFour} alt="Interconnected services" className="w-8 h-8 md:w-12 md:h-12 mb-3 md:mb-6" />
              <h3 className="text-base md:text-lg font-semibold text-[#131313] mb-2 md:mb-3">Interconnected services</h3>
              <p className="text-[#4F4F4F] font-normal text-[10px] md:text-base leading-relaxed">
                Creating a unified ecosystem for credit, market access, and technical support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What is Bharat VISTAAR? Section */}
      <div className="py-24 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight">
              What is Bharat VISTAAR?
            </h2>
            <p className="text-gray-500 text-base font-medium max-w-2xl mx-auto">
              A multi-layered digital platform designed to provide end-to-end support to the Indian agricultural community.
            </p>
          </div>

          <div className="relative">
            {/* Tapered Separator Lines */}
            {/* Horizontal Lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[4.5px] bg-gradient-to-r from-transparent via-[#E7E7E7] to-transparent -translate-y-1/2 z-0"></div>
            
            {/* Vertical Lines */}
            <div className="hidden lg:block absolute top-0 left-1/3 w-[4.5px] h-full bg-gradient-to-b from-transparent via-[#E7E7E7] to-transparent z-0"></div>
            <div className="hidden lg:block absolute top-0 left-2/3 w-[4.5px] h-full bg-gradient-to-b from-transparent via-[#E7E7E7] to-transparent z-0"></div>

            <div className="grid grid-cols-2 lg:grid-cols-3 relative z-10">
               {/* Item 1 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcOne} alt="AI Advisories" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">AI Advisories</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Personalised crop health and weather alerts powered by advanced machine learning models.
                  </p>
               </div>
               {/* Item 2 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcTwo} alt="Schemes Info" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">Schemes Info</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Direct access to central and state government benefits through a single digital window.
                  </p>
               </div>
               {/* Item 3 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcThree} alt="Multilingual Support" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">Multilingual Support</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Interface and audio content available in 22+ regional Indian languages.
                  </p>
               </div>
               {/* Item 4 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcFour} alt="Open APIs" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">Open APIs</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Enabling AgTech startups and partners to build innovative solutions on our secure DPI.
                  </p>
               </div>
               {/* Item 5 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcFive} alt="Voice Access" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">Voice Access</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Natural language voice bots for farmers to query information without typing.
                  </p>
               </div>
               {/* Item 6 */}
               <div className="flex flex-col items-center text-center p-8">
                  <img src={wbcSix} alt="State Systems" className="w-10 h-10 mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-3">State Systems</h3>
                  <p className="text-gray-500 text-sm font-normal leading-relaxed max-w-xs">
                     Unified integration with state land records and localised extension services.
                  </p>
               </div>
            </div>
          </div>
      </div>

      </div>

      <div className="px-4 md:px-8 pb-10">
        <div className="max-w-7xl mx-auto relative group">
          
          {/* Main Banner Container */}
          <div className="bg-[#06038D] rounded-[3rem] px-8 py-10 md:px-12 md:py-12 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-white/10">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 relative z-10">
              {/* Item 1 */}
              <div className="flex items-center gap-4 border-white/10 pb-6 md:border-b-0 md:pb-0">
                 <span className="text-[60px] lg:text-[80px] font-semibold text-[#FFFFFF] leading-none select-none">1</span>
                 <div className="space-y-1">
                    <div className="text-[#FF671F] text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">Philosophy</div>
                    <div className="text-white text-lg md:text-xl font-semibold">Farmer-first</div>
                 </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-4 border-white/10 pb-6 md:border-b-0 md:pb-0">
                 <span className="text-[60px] lg:text-[80px] font-semibold text-[#FFFFFF] leading-none select-none">2</span>
                 <div className="space-y-1">
                    <div className="text-[#FF671F] text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">Technology</div>
                    <div className="text-white text-lg md:text-xl font-semibold">AI & Multilingual</div>
                 </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-4 border-white/10 pb-6 md:border-b-0 md:pb-0">
                 <span className="text-[60px] lg:text-[80px] font-semibold text-[#FFFFFF] leading-none select-none">3</span>
                 <div className="space-y-1">
                    <div className="text-[#FF671F] text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">Architecture</div>
                    <div className="text-white text-lg md:text-xl font-semibold">Federated</div>
                 </div>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-4">
                 <span className="text-[60px] lg:text-[80px] font-semibold text-[#FFFFFF] leading-none select-none">4</span>
                 <div className="space-y-1">
                  <div className="text-[#FF671F] text-[10px] md:text-xs tracking-[0.2em] font-medium uppercase">Standard</div>
                    <div className="text-white text-lg md:text-xl font-semibold">Open & Interoperable</div>
                 </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    {/* </div> */}
    </SectionWrapper>
  );
};

export default Home;
