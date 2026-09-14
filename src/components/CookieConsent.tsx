import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { getConsent, setConsent, OPEN_CONSENT_EVENT, type ConsentValue } from '../lib/consent';

export default function CookieConsent() {
  // Показуємо банер, якщо вибір ще не зроблено (читаємо storage один раз при старті).
  const [visible, setVisible] = useState(() => getConsent() === null);

  useEffect(() => {
    // Футер може попросити відкрити банер знову ("Cookie Settings").
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  function choose(value: ConsentValue) {
    setConsent(value);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-mono-900/95 backdrop-blur-lg border border-mono-800 rounded-2xl shadow-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Cookie className="w-5 h-5 text-white" />
                <h2 className="text-white font-bold">Cookies</h2>
              </div>
              <p className="text-mono-400 text-sm leading-relaxed">
                Lumenara uses essential storage to keep the site working and, with your consent,
                analytics to understand how it's used. Read more in our{' '}
                <Link to="/privacy" className="text-white underline underline-offset-2 hover:text-mono-300">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => choose('declined')}
                className="px-5 py-2.5 rounded-lg font-bold text-sm border border-mono-700 text-mono-300 hover:text-white hover:border-mono-500 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => choose('accepted')}
                className="px-5 py-2.5 rounded-lg font-bold text-sm bg-white text-mono-950 hover:bg-mono-200 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
