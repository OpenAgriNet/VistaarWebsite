import { useForm } from 'react-hook-form';
import SectionWrapper from '../layout/SectionWrapper';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    alert('Message sent successfully!');
  };

  return (
    <SectionWrapper id="contact">
      <div className="space-y-8 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-primary">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input 
              {...register('name', { required: true })}
              className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder="Your name"
            />
            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder="Your email"
            />
            {errors.email && <span className="text-red-500 text-xs">Valid email is required</span>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              {...register('message', { required: true })}
              rows={4}
              className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
              placeholder="How can we help?"
            />
            {errors.message && <span className="text-red-500 text-xs">Message is required</span>}
          </div>
          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
