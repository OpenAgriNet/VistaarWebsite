import { useState } from 'react';
import { X } from 'lucide-react';
import aiChatIcon from '../../Assets/icons/aiChatIcon.png';

const FloatingActions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatbotUrl = import.meta.env.VITE_CHATBOT_WEBSITE_URL || 'https://dev-vistaar.da.gov.in';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-24 cursor-pointer hover:scale-110 transition-transform z-50 bg-transparent border-0 p-0"
        aria-label="Open chatbot"
      >
        {/* Bharti Pill */}
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '-70px',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '100%',
            background: '#FFF3ED',
            border: '1.5px solid #FF671F',
            borderRadius: '100px',
            padding: '6px 14px',
            color: '#FF671F',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          Hi 👋🏻, I’m Bharti
        </div>

        <img
          src={aiChatIcon}
          alt="Chatbot"
          className="w-full h-full"
        />
      </button>

      
      {isOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs border-0 p-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          />
          
          {/* Modal positioned at bottom-right corner */}
          <div className="fixed bottom-24 right-6 z-[101] w-[90%] md:w-[40%] h-[80vh] md:h-[85vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Chatbot</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close chatbot"
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>
            
            {/* Iframe container */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={chatbotUrl}
                className="w-full h-full border-0"
                title="Chatbot"
                allow="fullscreen"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingActions;
