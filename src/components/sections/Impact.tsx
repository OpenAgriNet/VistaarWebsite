import React, { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../layout/SectionWrapper';
import { useInView } from 'framer-motion';
import NumberFlow from '@number-flow/react';

const Counter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      setDisplayValue(value);
    } else {
      setDisplayValue(0);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl font-medium text-[#FF671F] inline-flex items-center whitespace-nowrap">
      <NumberFlow 
        value={displayValue}
        transformTiming={{ duration: 2000, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
      {suffix}
    </div>
  );
};

const Impact = () => {
  return (
    <SectionWrapper id="impact" className="bg-[#06038D] pt-12 md:pt-15 pb-12 md:pb-15 px-6 md:px-12 border-none min-h-fit">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="md:w-1/3 text-center md:text-left space-y-4">
          <h2 className="text-4xl font-medium text-white tracking-tight">
            Our National Impact
          </h2>
          <p className="text-[#E7E7E7] text-base font-medium leading-relaxed max-w-md mx-auto md:mx-0">
            Empowering Indian agriculture through scalable digital infrastructure
          </p>
        </div>

        {/* Right Cards */}
        <div className="md:w-2/3 grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-6 w-full">
          
          {/* Card 1 */}
          <div className="relative bg-[#FFFFFF] border-2 border-b-0 border-[#FFFFFF1A] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col items-center justify-center aspect-square transition-shadow group overflow-hidden">
            {/* Deeper blue overlay */}
            
            <div className="relative z-10 flex flex-col items-center">
              <Counter value={12} suffix="+" />
              <span className="text-[#FF671F] text-[10px] sm:text-sm font-medium tracking-[0.1em] sm:tracking-[0.2em] mt-2 uppercase">Language</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#FFFFFF] border-2 border-t-0 border-[#FFFFFF1A] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col items-center justify-center aspect-square transition-shadow group overflow-hidden">
            {/* Deeper blue overlay */}
            
            <div className="relative z-10 flex flex-col items-center">
              <Counter value={18} />
              <span className="text-[#FF671F] text-[10px] sm:text-sm font-medium tracking-[0.1em] sm:tracking-[0.2em] mt-2 uppercase">State</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative bg-[#FFFFFF] border-2 border-b-0 border-[#FFFFFF1A] rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 flex flex-col items-center justify-center aspect-square transition-shadow group overflow-hidden">
            {/* Deeper blue overlay */}
            
            
            <div className="relative z-10 flex flex-col items-center">
              <Counter value={25} suffix="+" />
              <span className="text-[#FF671F] text-[10px] sm:text-sm font-medium tracking-[0.1em] sm:tracking-[0.2em] mt-2 uppercase">Partners</span>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default Impact;
