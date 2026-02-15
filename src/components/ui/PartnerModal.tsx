import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import farmer5 from '../../Assets/farmer5.svg';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  organisationName: string;
  email: string;
  partnershipInterest: string;
  description: string;
}

const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      reset(); // Clear form when modal closes
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, reset]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle submission logic here
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full md:w-[70%] h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row z-10"
        >
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
          >
            <X size={24} className="text-gray-700" />
          </button>

          {/* Left Side - Image */}
          <div className="hidden md:block w-1/2 h-full relative">
            <img 
              src={farmer5} 
              alt="Partner with us" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Optional overlay gradient for text visibility if needed, but per design it's clean image */}
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 h-full bg-white overflow-y-auto">
            <div className="max-w-md mx-auto min-h-full flex flex-col p-6 md:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Inquiry form</h2>
              <p className="text-gray-500 text-sm mb-6">
                Submit your details and our partnership team will get back to you.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Full name</label>
                  <input 
                    {...register("fullName", { required: true })}
                    type="text" 
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                  />
                  {errors.fullName && <span className="text-red-500 text-[10px]">Required</span>}
                </div>

                {/* Organisation Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Organisation name</label>
                  <input 
                    {...register("organisationName", { required: true })}
                    type="text" 
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                  />
                  {errors.organisationName && <span className="text-red-500 text-[10px]">Required</span>}
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Email address</label>
                  <input 
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    type="email" 
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                  />
                  {errors.email && <span className="text-red-500 text-[10px]">Invalid email</span>}
                </div>

                {/* Partnership Interest */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Partnership interest</label>
                  <input 
                    {...register("partnershipInterest", { required: true })}
                    type="text" 
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white"
                  />
                  {errors.partnershipInterest && <span className="text-red-500 text-[10px]">Required</span>}
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="block text-xs font-medium text-gray-700">Brief project description</label>
                  <textarea 
                    {...register("description", { required: true })}
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-white resize-none"
                  />
                  {errors.description && <span className="text-red-500 text-[10px]">Required</span>}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-colors text-base"
                  >
                    Send Inquiry
                  </button>
                </div>

              </form>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PartnerModal;
