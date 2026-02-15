import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TranslationLoaderProps {
  isLoading: boolean;
  isComplete: boolean;
  error: string | null;
  languageName: string;
}

const TranslationLoader: React.FC<TranslationLoaderProps> = ({ 
  isLoading, 
  isComplete, 
  error,
  languageName 
}) => {
  return (
    <AnimatePresence>
      {(isLoading || isComplete || error) && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-[10000] bg-white rounded-lg shadow-2xl border border-gray-200 p-4 min-w-[300px] max-w-md"
        >
          {isLoading && (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin text-primary" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Translating to {languageName}</p>
                <p className="text-sm text-gray-500">Please wait...</p>
              </div>
            </div>
          )}
          
          {isComplete && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2 className="text-green-500" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Translation Complete</p>
                <p className="text-sm text-gray-500">Content updated to {languageName}</p>
              </div>
            </motion.div>
          )}
          
          {error && (
            <div className="flex items-center gap-3">
              <XCircle className="text-red-500" size={20} />
              <div>
                <p className="font-semibold text-gray-900">Translation Error</p>
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TranslationLoader;

