import React from 'react';
import { Link } from 'react-router-dom';
import govEmblem from '../../Assets/govLogo.svg';
import icarLogo from '../../Assets/icar.svg';
import vistaarLogo from '../../Assets/logo.svg';
import fbIcon from '../../Assets/icons/fb.svg';
import instaIcon from '../../Assets/icons/insta.svg';
import linkdinIcon from '../../Assets/icons/linkedin.svg';
import twitterIcon from '../../Assets/icons/twitter.svg';
import youtubeIcon from '../../Assets/icons/youtube.svg';

const Footer = () => {
  return (
    <footer className="bg-[#f9f9f9] pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">
          
          {/* Left Column */}
          <div className="lg:w-5/12 space-y-8">
            {/* Logos */}
            <div className="flex items-center gap-4 md:gap-6">
              <img src={govEmblem} alt="Government of India" className="h-10 md:h-12" />
              <div className="w-[1px] h-8 md:h-10 bg-gray-300"></div>
              <img src={icarLogo} alt="ICAR" className="h-10 md:h-12" />
              <div className="w-[1px] h-8 md:h-10 bg-gray-300"></div>
              <img src={vistaarLogo} alt="Vistaar" className="h-8 md:h-10" />
            </div>

            <div className="space-y-4">
              <h3 className="text-primary font-medium text-lg">
                National Digital Public Infrastructure
              </h3>
              <p className="text-gray-600 leading-relaxed font-regular text-base">
                A flagship initiative to harmonize the agricultural digital landscape through open protocols, interoperable data exchanges, and AI-enabled extension services for every farmer in India.
              </p>
            </div>
          </div>

          {/* Right Columns */}
          <div className="lg:w-5/12 flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Resources */}
            <div className="space-y-6">
              <h4 className="font-medium text-black text-base">Resources</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">API Explorer</a></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">Success Stories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">FAQs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">Research Papers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h4 className="font-medium text-black text-base">Legal</h4>
              <ul className="space-y-4 text-gray-500">
                <li><Link to="/privacy-policy" target="_blank" className="hover:text-primary transition-colors text-base font-regular">Privacy Policy</Link></li>
                <li><Link to="/terms" target="_blank" className="hover:text-primary transition-colors text-base font-regular">Terms and Conditions</Link></li>
                <li><Link to="/disclaimer" target="_blank" className="hover:text-primary transition-colors text-base font-regular">Disclaimer</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">Data Security</a></li>
                <li><a href="#" className="hover:text-primary transition-colors text-base font-regular">Accessibility</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/agriGoI" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
              <img src={fbIcon} alt="Facebook" />
            </a>
            <a href="https://www.linkedin.com/company/agrigoi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
              <img src={linkdinIcon} alt="Linkedin" />
            </a>
            <a href="https://www.instagram.com/agrigoi/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
              <img src={instaIcon} alt="Instagram" />
            </a>
            <a href="https://x.com/AgriGoI" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://www.youtube.com/@agrigoi" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black hover:bg-gray-50 transition-colors">
              <img src={youtubeIcon} alt="Youtube" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-black font-regular text-base text-center md:text-right">
            Powered by Open Protocols for Agricultural
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
