// Керування згодою на cookies (GDPR).
// Вибір зберігаємо в localStorage; усе загорнуто в try/catch,
// бо в приватному режимі доступ до storage може кидати виняток.

export type ConsentValue = 'accepted' | 'declined';

// Версія в ключі: якщо політика зміниться — піднімаємо версію і банер спитає знову.
const STORAGE_KEY = 'lumenara.cookie-consent.v1';

// Подія, якою банер сигналить про зміну вибору,
// а футер — просить відкрити банер знову ("Cookie Settings").
export const CONSENT_CHANGE_EVENT = 'lumenara:consent-change';
export const OPEN_CONSENT_EVENT = 'lumenara:open-consent';

export function getConsent(): ConsentValue | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Ігноруємо: у приватному режимі просто не памʼятаємо вибір між сесіями.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Чи дозволена необовʼязкова аналітика. Використати перед підключенням трекерів. */
export function analyticsAllowed(): boolean {
  return getConsent() === 'accepted';
}

/** Відкрити банер згоди знову (виклик із футера). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
