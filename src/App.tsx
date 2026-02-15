import Topbar from './components/layout/Topbar';
import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import PartnerModal from './components/ui/PartnerModal';
import TranslationLoader from './components/ui/TranslationLoader';
import { useTranslation } from './contexts/TranslationContext';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Disclaimer from './pages/Disclaimer';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { useEffect } from 'react';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const { isLoading, isComplete, error, currentLanguage } = useTranslation();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground scroll-smooth flex flex-col">
        <ScrollToTop />
        <TranslationLoader 
          isLoading={isLoading}
          isComplete={isComplete}
          error={error}
          languageName={currentLanguage.name.split('(')[0].trim()}
        />
        <Topbar />
        <Navbar onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />
        
        <PartnerModal isOpen={isPartnerModalOpen} onClose={() => setIsPartnerModalOpen(false)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenPartnerModal={() => setIsPartnerModalOpen(true)} />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
      </div>
    </BrowserRouter>
  );
}

export default App;
