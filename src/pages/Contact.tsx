import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pb-20 pt-32 px-4 bg-mono-950">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* INFO */}
        <div>
          <h1 className="text-5xl font-black text-white mb-6">Let's Talk.</h1>
          <p className="text-xl text-mono-400 mb-8 leading-relaxed">
            Interested in building the next big Roblox experience? 
            Looking for a strategic partnership? We'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-mono-900 p-3 rounded-lg border border-mono-800">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Email Us</h3>
                <a href="mailto:ariel@femy-walsh.com" className="text-mono-400 hover:text-white transition-colors text-lg">
                  ariel@femy-walsh.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-mono-900 p-3 rounded-lg border border-mono-800">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Discord</h3>
                <a href="#" className="text-mono-400 hover:text-white transition-colors text-lg">
                  Join the Community
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-mono-900 p-8 rounded-3xl border border-mono-800 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-mono-400 uppercase">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-mono-400 uppercase">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors" 
                  placeholder="john@company.com" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-mono-400 uppercase">Subject</label>
              <select className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors appearance-none">
                <option>Select a topic...</option>
                <option>Consulting</option>
                <option>Strategy</option>
                <option>Partnership</option>
                <option>Marketing</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-mono-400 uppercase">Message</label>
              <textarea 
                rows={4} 
                className="w-full bg-mono-950 border border-mono-800 rounded-lg p-3 text-white focus:border-white outline-none transition-colors" 
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <button className="w-full bg-white hover:bg-mono-200 text-mono-950 font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-white/20">
              Get in touch!
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}