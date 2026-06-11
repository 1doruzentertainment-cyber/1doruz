import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Youtube } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const submitContact = useMutation(api.contact.submit);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string || undefined,
      message: formData.get('message') as string,
    };
    try {
      await submitContact(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Contact error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-32">
       <div className="mx-auto max-w-7xl px-6">
         <div className="mb-20">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-gold-500">Get In Touch</span>
           <h1 className="mt-4 font-serif text-5xl sm:text-6xl md:text-8xl font-bold text-white">Contact <span className="text-luxury italic">Us</span></h1>
         </div>

         <div className="grid gap-20 lg:grid-cols-2">
           <div className="space-y-12">
             <div className="space-y-6">
               <h2 className="font-serif text-3xl font-bold text-white">Let's connect</h2>
               <p className="max-w-md text-zinc-400 font-light text-lg">
                 Whether you're looking for distribution, booking information, or have general inquiries, our team is here to help.
               </p>
             </div>

             <div className="space-y-8">
               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-gold-500">
                    <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-2">Our Locations</h4>
                   <p className="text-zinc-500 text-sm">New York City, NY</p>
                   <p className="text-zinc-500 text-sm">London, United Kingdom</p>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-gold-500">
                    <Mail size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-2">Email Us</h4>
                   <p className="text-zinc-500 text-sm">info@1doruz.com</p>
                   <p className="text-zinc-500 text-sm">bookings@1doruz.com</p>
                 </div>
               </div>

               <div className="flex items-start gap-6">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-gold-500">
                    <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-2">Call Us</h4>
                   <p className="text-zinc-500 text-sm">+1 (555) 123-4567</p>
                 </div>
               </div>
             </div>

             <div className="pt-12 border-t border-zinc-900">
               <h4 className="font-bold text-white uppercase text-[10px] tracking-[0.3em] mb-6">Follow the Journey</h4>
               <div className="flex gap-6">
                 <a href="#" className="text-zinc-500 hover:text-gold-500 transition-colors"><Instagram size={24} /></a>
                 <a href="#" className="text-zinc-500 hover:text-gold-500 transition-colors"><Twitter size={24} /></a>
                 <a href="#" className="text-zinc-500 hover:text-gold-500 transition-colors"><Youtube size={24} /></a>
               </div>
             </div>
           </div>

           <div className="luxury-card p-6 sm:p-12 rounded-3xl">
             {submitted ? (
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center h-full flex flex-col justify-center py-12"
               >
                 <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-gold-500 text-zinc-950 mb-6 font-bold">
                    <Send size={32} />
                 </div>
                 <h3 className="font-serif text-3xl font-bold text-white mb-4">Message Sent</h3>
                 <p className="text-zinc-400">Our team will get back to you within 48 hours. Thank you for reaching out.</p>
                 <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-gold-500 font-bold uppercase tracking-widest text-xs hover:text-gold-400"
                 >
                   Send another message
                 </button>
               </motion.div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                   <input
                     required
                     name="name"
                     type="text"
                     placeholder="John Doe"
                     className="w-full bg-zinc-950 border border-zinc-800 px-6 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-xl"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                   <input
                     required
                     name="email"
                     type="email"
                     placeholder="john@example.com"
                     className="w-full bg-zinc-950 border border-zinc-800 px-6 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-xl"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Subject</label>
                   <select name="subject" className="w-full bg-zinc-950 border border-zinc-800 px-6 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-xl appearance-none">
                     <option value="">General Inquiry</option>
                     <option value="booking">Booking Request</option>
                     <option value="distribution">Distribution Inquiry</option>
                     <option value="press">Press & Media</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Message</label>
                   <textarea
                     required
                     name="message"
                     rows={5}
                     placeholder="How can we help you?"
                     className="w-full bg-zinc-950 border border-zinc-800 px-6 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors rounded-xl resize-none"
                   />
                 </div>
                 <button
                   disabled={isSubmitting}
                   className="luxury-button w-full bg-gold-500 text-zinc-950 hover:bg-gold-400 disabled:opacity-50 mt-4 rounded-xl"
                 >
                   <span className="flex items-center justify-center gap-2">
                     {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={18} />
                   </span>
                 </button>
               </form>
             )}
           </div>
         </div>
       </div>
    </div>
  );
}
