import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface QA {
  q: string;
  a: string;
}

const FAQS: QA[] = [
  {
    q: 'What platforms do you build for?',
    a: 'We focus entirely on Roblox — from social-deduction and physics games to tactical shooters. Specialising in one platform is what lets us push its limits.',
  },
  {
    q: 'Do you work with brands?',
    a: 'Yes. We turn brand values into playable experiences rather than ads — deep engagement instead of impressions. Reach out and we can talk through the idea.',
  },
  {
    q: 'How long does a project take?',
    a: 'It depends on scope, but most projects move through discovery, production and launch over several weeks to a few months. We scope each one before we start.',
  },
  {
    q: 'Do you support games after launch?',
    a: 'We do. Updates, seasonal events and live-ops keep an experience healthy long after release, and we plan for that from day one.',
  },
  {
    q: 'How do we get started?',
    a: 'Tell us what you have in mind on the Contact page. We reply to serious enquiries within a couple of working days.',
  },
];

function Item({ item, isOpen, onToggle }: { item: QA; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-mono-800 rounded-2xl bg-mono-900/50 overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-white font-bold text-lg">{item.q}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 text-mono-400">
          <Plus className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-mono-400 leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQS.map((item, idx) => (
        <Item
          key={item.q}
          item={item}
          isOpen={openIndex === idx}
          onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
        />
      ))}
    </div>
  );
}
