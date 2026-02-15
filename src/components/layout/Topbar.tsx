import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation, languages } from '../../contexts/TranslationContext';

const Topbar = () => {
  const { currentLanguage, setCurrentLanguage } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState(0); // -1: decreased, 0: normal, 1: increased
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: typeof languages[0]) => {
    setCurrentLanguage(lang);
    setIsDropdownOpen(false);
  };

  const handleFontSizeChange = (direction: 'increase' | 'decrease') => {
    if (direction === 'increase' && fontSize < 1) {
      document.documentElement.style.fontSize = '110%';
      setFontSize(1);
    } else if (direction === 'decrease' && fontSize > -1) {
      document.documentElement.style.fontSize = '90%';
      setFontSize(-1);
    }
  };

  const handleFontSizeReset = () => {
    document.documentElement.style.fontSize = '100%';
    setFontSize(0);
  };

  return (
    <div className="w-full bg-[#1e1b4b] text-white py-2 px-4 md:px-12 flex justify-end items-center text-sm font-medium" data-no-translate>
      <div className="flex items-center gap-6">
        <div className="relative" ref={dropdownRef} data-no-translate>
          <button
            type="button"
            className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors bg-transparent border-0 p-0 text-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Select language"
            aria-expanded={isDropdownOpen}
            data-no-translate
          >
            <span data-no-translate>{currentLanguage.name.split('(')[0].trim()}</span>
            <ChevronDown size={14} className={isDropdownOpen ? 'rotate-180 transition-transform' : ''} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]" data-no-translate>
              <div className="py-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                      currentLanguage.code === lang.code ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-700'
                    }`}
                    data-no-translate
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleFontSizeChange('decrease')}
            disabled={fontSize <= -1}
            className={`cursor-pointer hover:text-gray-300 transition-colors ${
              fontSize <= -1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Decrease font size"
            data-no-translate
          >
            A-
          </button>
          <button
            type="button"
            onClick={handleFontSizeReset}
            className="cursor-pointer hover:text-gray-300 transition-colors"
            aria-label="Reset font size"
            data-no-translate
          >
            A
          </button>
          <button
            type="button"
            onClick={() => handleFontSizeChange('increase')}
            disabled={fontSize >= 1}
            className={`cursor-pointer hover:text-gray-300 transition-colors ${
              fontSize >= 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Increase font size"
            data-no-translate
          >
            A+
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
