import { Mail, MessageSquare, ArrowUpRight } from 'lucide-react';
import { CONTACT_EMAIL, SOCIALS } from '../config/site';

const discord = SOCIALS.find((s) => s.id === 'discord');

export default function Contact() {
  return (
    <div className="min-h-screen pb-24 pt-32 px-4 bg-mono-950">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Let's Talk.</h1>
        <p className="text-xl text-mono-400 mb-14 leading-relaxed max-w-2xl">
          Interested in building the next big Roblox experience?
          Looking for a strategic partnership? We'd love to hear from you.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">

          {/* EMAIL */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="group bg-mono-900 p-8 rounded-2xl border border-mono-800 hover:border-white/40 transition-colors duration-300"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="bg-mono-950 p-3 rounded-lg border border-mono-800">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-mono-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-white font-bold text-lg mb-2">Email Us</h2>
            <span className="text-mono-400 group-hover:text-white transition-colors break-all">
              {CONTACT_EMAIL}
            </span>
            <p className="text-mono-500 text-sm mt-4 leading-relaxed">
              Business, partnerships and press. We usually reply within a couple of working days.
            </p>
          </a>

          {/* DISCORD — показуємо тільки коли є реальне посилання */}
          {discord?.href && (
            <a
              href={discord.href}
              target="_blank"
              rel="noreferrer"
              className="group bg-mono-900 p-8 rounded-2xl border border-mono-800 hover:border-white/40 transition-colors duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="bg-mono-950 p-3 rounded-lg border border-mono-800">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-mono-600 group-hover:text-white transition-colors" />
              </div>
              <h2 className="text-white font-bold text-lg mb-2">Discord</h2>
              <span className="text-mono-400 group-hover:text-white transition-colors">
                Join the community
              </span>
              <p className="text-mono-500 text-sm mt-4 leading-relaxed">
                Player support, devlogs and early looks at what we're building.
              </p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
