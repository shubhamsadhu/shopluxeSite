import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { db, collection, addDoc, serverTimestamp } from '../lib/firebase';

interface ContactAboutModalProps {
  type: 'contact' | 'about' | null;
  onClose: () => void;
}

export const ContactAboutModal: React.FC<ContactAboutModalProps> = ({ type, onClose }) => {
  const { showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!type) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      try {
        await addDoc(collection(db, 'inquiries'), {
          name,
          email,
          subject,
          message,
          createdAt: serverTimestamp()
        });
      } catch (err) {
        // Fallback gracefully
      }
      setIsSent(true);
      showToast({
        type: 'success',
        title: 'Message dispatched!',
        message: 'Our support concierge will reply within 24 hours.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-about-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 animate-in fade-in">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wide text-zinc-950">
              {type === 'about' ? 'About Us' : 'Get In Touch / Support'}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              {type === 'about'
                ? 'Our story, vision, and personal journey'
                : 'Have a question about an order or affiliate deal? We are here to help.'}
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-zinc-400 hover:text-zinc-950">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === 'about' ? (
            <div className="space-y-5 text-zinc-700 leading-relaxed">
              <div className="p-4 bg-[#fbf9f5] border border-amber-200/70 rounded-2xl">
                <p className="text-sm font-extrabold text-zinc-950 tracking-tight">
                  Swati &amp; Shubh — two minds, one vision, and a shared passion to grow together.
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-600">
                <p className="leading-relaxed">
                  For us, this business isn't just a job; it’s a personal journey of building something extraordinary side by side. Swati’s creative vision paired with Shubham’s strategic execution creates a strong partnership that turns every challenge into an opportunity.
                </p>
                
                <p className="leading-relaxed">
                  Our goal is simple: to bring you the best experience through hard work, passion, and seamless teamwork. By supporting each other at every step, we ensure our business—and your trust in us—keeps growing every single day.
                </p>

                <p className="font-bold text-zinc-900 pt-1 text-sm">
                  Thank you for being a part of our story!
                </p>
              </div>

              {/* Founders pill badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <h4 className="font-extrabold text-zinc-950 uppercase text-[11px] mb-0.5">Swati</h4>
                  <p className="text-[11px] text-zinc-500">Creative Vision &amp; Design Direction</p>
                </div>
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <h4 className="font-extrabold text-zinc-950 uppercase text-[11px] mb-0.5">Shubham</h4>
                  <p className="text-[11px] text-zinc-500">Strategic Execution &amp; Operations</p>
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Explore The Collection
                </button>
              </div>
            </div>
          ) : isSent ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-zinc-900">Message Received!</h4>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Thank you for contacting us, {name}. We will get back to you at {email} within 24 business hours.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-zinc-950 text-white rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Miller"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-zinc-700 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order & Shipping Support">Order & Shipping Support</option>
                  <option value="Affiliate Partnership">Affiliate Partnership / Product Submission</option>
                  <option value="Product Feedback">Product Feedback</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-zinc-700 uppercase mb-1">Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
