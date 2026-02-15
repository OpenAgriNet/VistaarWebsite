import ArrowUpRight from '../../Assets/icons/arrowUpRight.svg';
import govLogo from '../../Assets/govLogo.svg';
import vistaarLogo from '../../Assets/logo.svg';
import icarLogo from '../../Assets/icar.svg';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#home' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Impact', href: '#impact' },
  { name: 'States', href: '#states-info' },
  { name: 'Partners', href: '#backing' },
];

interface NavbarProps {
  onOpenPartnerModal: () => void;
}

const Navbar = ({ onOpenPartnerModal }: NavbarProps) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      let current = activeSection;

      const offsetThreshold = 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is visibly active (top is near top of viewport or inside viewport)
          if (rect.top <= offsetThreshold && rect.bottom >= offsetThreshold) { 
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height approx
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-24 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <img src={govLogo} alt="Government of India" className="h-9 md:h-11 w-auto" />
            <div className="h-7 md:h-9 w-px bg-gray-300"></div>
            <img src={icarLogo} alt="ICAR" className="h-9 md:h-11 w-auto" />
            <div className="h-7 md:h-9 w-px bg-gray-300"></div>
            <img src={vistaarLogo} alt="VISTAAR" className="h-7 md:h-9 w-auto" />
          </div>
          
          {/* Desktop Meru */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-4 xl:gap-6 text-gray-700 font-medium">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`transition-colors text-sm xl:text-base font-regular relative whitespace-nowrap ${
                    activeSection === item.href.substring(1) 
                      ? 'text-primary' 
                      : 'hover:text-primary'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </a>
              ))}
            </div>
            
            <button 
              onClick={onOpenPartnerModal}
              className="bg-primary text-white h-[44px] md:h-[48px] pl-4 pr-1 rounded font-medium flex items-center gap-2 hover:opacity-90 transition-colors"
            >
              <span className="text-sm md:text-base whitespace-nowrap">Partner with Us</span>
              <div className="bg-white h-[36px] md:h-[40px] w-[36px] md:h-[40px] p-2 rounded text-primary flex items-center justify-center">
                <img src={ArrowUpRight} alt="Arrow Up Right" className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl py-6 px-6 space-y-6 z-[100] animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleClick(e, item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg font-medium py-2 border-b border-gray-50 ${
                  activeSection === item.href.substring(1) 
                    ? 'text-primary' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
          <button 
            onClick={() => {
              onOpenPartnerModal();
              setIsMobileMenuOpen(false);
            }}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/30 transition-all"
          >
            <span>Partner with Us</span>
            <img src={ArrowUpRight} alt="Partner" className="h-5 w-5 brightness-0 invert" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
