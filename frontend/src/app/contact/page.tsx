'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, Clock, Globe } from 'lucide-react';

const details = [
  { Icon: Mail, label: 'Email Us', value: 'funmisaesthetics@gmail.com' },
  { Icon: Phone, label: 'WhatsApp', value: '+234 703 711 8627' },
  { Icon: Clock, label: 'Availability', value: '24/7 — we never sleep on your needs' },
  { Icon: Globe, label: 'Global Orders', value: 'We ship and support worldwide' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success("Message sent! We'll reply within 24 hours. 📩");
    setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="pt-[70px]">
      <div className="bg-gradient-to-br from-cream to-mist py-24 text-center border-b border-ink/8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="section-label justify-center">Get in Touch</p>
          <h1 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-light leading-tight mb-5">We&apos;re Here for You</h1>
          <p className="text-[1rem] text-ink-soft">Questions, orders, or just saying hello — our team is ready.</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-[2fr_3fr] gap-12">
            {/* Info card */}
            <div className="bg-charcoal text-warm-white rounded-lg p-12 h-fit">
              <h2 className="font-display text-3xl font-light mb-3">Let&apos;s Talk</h2>
              <p className="text-white/55 text-sm mb-10">Our customer care team is available around the clock.</p>
              <div className="space-y-7">
                {details.map(({ Icon, label, value }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-sm bg-white/8 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-champagne" />
                    </div>
                    <div>
                      <p className="text-warm-white text-sm font-medium mb-0.5">{label}</p>
                      <p className="text-white/50 text-xs">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-cream rounded-lg p-12 border border-ink/8">
              <h2 className="font-display text-2xl font-light mb-8">Send a Message</h2>
              <form onSubmit={submit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-2">First Name</label>
                    <input name="firstName" value={form.firstName} onChange={change} required className="input-field" placeholder="Funmilola" />
                  </div>
                  <div>
                    <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-2">Last Name</label>
                    <input name="lastName" value={form.lastName} onChange={change} required className="input-field" placeholder="Alade" />
                  </div>
                </div>
                <div>
                  <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-2">Email</label>
                  <input name="email" type="email" value={form.email} onChange={change} required className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-2">Subject</label>
                  <input name="subject" value={form.subject} onChange={change} className="input-field" placeholder="Order enquiry, feedback…" />
                </div>
                <div>
                  <label className="block text-[0.72rem] font-medium tracking-wider uppercase text-ink-soft mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={change}
                    required
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell us how we can help you…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center mt-2"
                >
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
