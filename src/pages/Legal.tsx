// УВАГА: це загальний шаблон, а не юридично перевірений документ.
// Перед публічним запуском текст має переглянути/замінити юрист.

const CONTACT_EMAIL = 'ariel@femy-walsh.com';
const LAST_UPDATED = 'September 14, 2026';

interface Section {
  heading: string;
  body: string[];
}

const PRIVACY: Section[] = [
  {
    heading: 'What we collect',
    body: [
      'When you send us a message through the contact form, we receive the name, email address, subject and message you provide. We use that information only to respond to your enquiry.',
      'We do not run advertising trackers on this website and we do not sell or rent your data to anyone.',
    ],
  },
  {
    heading: 'In-game data',
    body: [
      'Our experiences run on the Roblox platform. Gameplay data, accounts and moderation there are governed by the Roblox Terms of Use and Privacy Policy, not by this document.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Contact messages are kept for as long as needed to handle your request and any follow-up, and are deleted when they are no longer relevant.',
    ],
  },
  {
    heading: 'Cookies and local storage',
    body: [
      'We use a small amount of essential browser storage to keep the site working — for example, to remember your cookie choice and to keep you signed in to the studio dashboard. These are required for those features and cannot be switched off.',
      'Any optional analytics are used only if you accept them in the cookie banner. You can change your choice at any time via the "Cookie Settings" link in the footer.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      `You can ask us to access, correct or delete the personal data you have sent us. Write to ${CONTACT_EMAIL} and we will respond within a reasonable time.`,
    ],
  },
];

const TERMS: Section[] = [
  {
    heading: 'Using this website',
    body: [
      'This website presents information about Lumenara and the experiences we build. You may browse and share it freely.',
      'You may not attempt to gain unauthorised access to any part of the site, its administration area, or the systems behind it.',
    ],
  },
  {
    heading: 'Our content',
    body: [
      'All text, artwork, logos and game assets shown here belong to Lumenara or its partners, unless stated otherwise. Do not reuse them commercially without written permission.',
    ],
  },
  {
    heading: 'Our games',
    body: [
      'Our experiences are hosted on Roblox and are additionally subject to the Roblox Terms of Use. Features, availability and release dates shown on this website may change.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'This website is provided as is. We do our best to keep it accurate and available, but we cannot guarantee uninterrupted access or that every detail is current.',
    ],
  },
  {
    heading: 'Contact',
    body: [`Questions about these terms can be sent to ${CONTACT_EMAIL}.`],
  },
];

export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';
  const sections = isPrivacy ? PRIVACY : TERMS;

  return (
    <div className="min-h-screen bg-mono-950 pt-32 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 uppercase tracking-tight">{title}</h1>
        <p className="text-mono-500 text-sm mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-white mb-4">{section.heading}</h2>
              {section.body.map((paragraph, idx) => (
                <p key={idx} className="text-mono-400 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
