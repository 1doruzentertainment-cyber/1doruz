import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Music4, User, Mail, Link as LinkIcon, FileText, Upload, X, Music } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { cn } from '../lib/utils';

export default function DemoSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const submitDemo = useMutation(api.demos.create);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      await submitDemo({
        artistName: formData.get('artistName') as string,
        email: formData.get('email') as string,
        demoUrl: (formData.get('demoUrl') as string) || undefined,
        bio: formData.get('bio') as string,
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Demo submission error:', error);
    } finally {
      setIsSubmitting(false);
      setFile(null);
    }
  };

  return (
    <div className="pb-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white md:text-7xl">Submit Your <span className="text-luxury">Demo</span></h1>
          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg">
            We are looking for original voices and innovative sounds. Please provide high-quality links (SoundCloud, Dropbox, etc.) and a brief introduction.
          </p>
        </motion.div>

        <div className="mt-20">
          {submitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-zinc-900 border border-gold-500/30 p-12 text-center rounded-2xl"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-zinc-950 mb-6">
                <Send size={32} />
              </div>
              <h2 className="font-serif text-3xl font-bold text-white mb-4">Submission Received</h2>
              <p className="text-zinc-400">
                Our A&R team will carefully review your music. Due to high volumes, we only respond to selected submissions. Keep creating.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-8 text-gold-500 font-bold uppercase tracking-widest text-xs hover:text-gold-400"
              >
                Submit Another Demo
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-8 bg-zinc-900/50 border border-zinc-800 p-6 md:p-12 rounded-2xl backdrop-blur-sm"
            >
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <User size={14} /> Artist / Band Name
                  </label>
                  <input
                    required
                    name="artistName"
                    type="text"
                    placeholder="Enter your artist name"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2 mb-4">
                    <Music size={14} /> Upload Audio File
                  </label>
                  
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-xl p-8 transition-all flex flex-col items-center justify-center cursor-pointer group",
                      isDragging ? "border-gold-500 bg-gold-500/5" : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700",
                      file ? "border-gold-500/50 bg-gold-500/5" : ""
                    )}
                    onClick={() => !file && fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="hidden"
                    />

                    {file ? (
                      <div className="flex items-center gap-4 w-full">
                        <div className="h-12 w-12 rounded-full bg-gold-500 flex items-center justify-center text-zinc-950 shrink-0">
                          <Music4 size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{file.name}</p>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for shipment
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeFile(); }}
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="h-14 w-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-gold-500 group-hover:border-gold-500/50 transition-all mb-4">
                          <Upload size={24} />
                        </div>
                        <p className="text-sm font-bold text-white mb-1 uppercase tracking-tight">Drop your demo here</p>
                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">MP3, WAV, AIFF (MAX 50MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-800/50"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.3em]">
                    <span className="bg-[#050505] px-4 text-zinc-600">OR PROVIDE LINK</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <LinkIcon size={14} /> Streaming Link (Optional)
                  </label>
                  <input
                    name="demoUrl"
                    type="url"
                    placeholder="https://soundcloud.com/you/demo"
                    className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <FileText size={14} /> Brief Biography
                </label>
                <textarea
                  required
                  name="bio"
                  rows={4}
                  placeholder="Tell us about yourself and your musical journey..."
                  className="w-full bg-zinc-950 border border-zinc-800 px-4 py-4 text-white focus:border-gold-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  disabled={isSubmitting}
                  className="luxury-button w-full bg-gold-500 text-zinc-950 hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? 'Processing Submission...' : 'Send Demo'} <Music4 size={18} />
                  </span>
                </button>
              </div>
            </motion.form>
          )}
        </div>

        <div className="mt-20 border-t border-zinc-900 pt-12 text-center">
           <h3 className="font-serif text-2xl text-white mb-4">Submission Guidelines</h3>
           <div className="grid gap-6 md:grid-cols-3 text-sm text-zinc-400">
             <div className="p-4 border border-zinc-800 rounded-lg">
               <span className="text-gold-500 font-bold block mb-2">Originality</span>
               Only submitted original tracks. No remixes or samples unless cleared.
             </div>
             <div className="p-4 border border-zinc-800 rounded-lg">
               <span className="text-gold-500 font-bold block mb-2">Quality</span>
               High quality MP3 (320kbps) or WAV formats only.
             </div>
             <div className="p-4 border border-zinc-800 rounded-lg">
               <span className="text-gold-500 font-bold block mb-2">Unreleased</span>
               We prioritize unreleased material for signing consideration.
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
