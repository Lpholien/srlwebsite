import React, { useState } from 'react';
import { Button } from './Button';
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('https://formsubmit.co/ajax/lpholien@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
          _subject: `New inquiry from ${formData.firstName} ${formData.lastName}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 bg-slate-950 relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 relative z-10">

        {/* Contact Information */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/10 w-fit mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">Get in Touch</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collaborate?</span>
          </h2>

          <p className="text-slate-400 mb-12 text-xl leading-relaxed max-w-lg">
            Whether you need a full CSV audit, a LIMS implementation strategy, or want to discuss Pharma 4.0, our team is ready to engage.
          </p>

          <div className="space-y-10">
            <a href="mailto:lpholien@gmail.com" className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/50 transition-all duration-300 shadow-xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-1">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Email Our Strategy Team</h4>
                <p className="text-slate-400 group-hover:text-cyan-400 transition-colors">lpholien@gmail.com</p>
              </div>
            </a>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-blue-500/50 transition-all duration-300 shadow-xl group-hover:shadow-blue-500/10 group-hover:-translate-y-1">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Direct Advisory Line</h4>
                <p className="text-slate-400">+32 468155134</p>
              </div>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-slate-800 group-hover:border-indigo-500/50 transition-all duration-300 shadow-xl group-hover:shadow-indigo-500/10 group-hover:-translate-y-1">
                <MapPin className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Global Headquarters</h4>
                <p className="text-slate-400 leading-relaxed">
                  JB Charlierlaan 63, <br />
                  1560 Hoeilaart, Belgium
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl relative bg-slate-950/40">
            <h3 className="text-2xl font-bold text-white mb-8">Send an Inquiry</h3>

            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Message Sent</h4>
                <p className="text-slate-400 mb-8 max-w-sm">
                  Thank you for reaching out. We'll review your inquiry and respond within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-sm text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-700"
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-700"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-700"
                    placeholder="jane@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Project Details</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 text-white rounded-xl p-4 text-sm focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 focus:outline-none transition-all placeholder:text-slate-700 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <AlertCircle size={16} />
                    Something went wrong. Please try again or email us directly.
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="primary"
                    className="w-full py-4 text-slate-950 font-bold bg-cyan-500 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>Sending... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                    ) : (
                      <>Initialize Engagement <Send className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></>
                    )}
                  </Button>
                </div>

                <p className="text-[10px] text-center text-slate-600 uppercase tracking-widest">
                  Secure Transmission · No Spam
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
