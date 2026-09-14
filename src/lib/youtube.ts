// Витягуємо ID відео з будь-якого поширеного формату YouTube-посилання
// і будуємо URL для вбудовування (домен youtube-nocookie — без зайвих куків).

export function getYouTubeEmbedUrl(input: string): string | null {
  if (!input) return null;
  const raw = input.trim();

  // Якщо це вже просто 11-символьний ID.
  if (/^[a-zA-Z0-9_-]{11}$/.test(raw)) {
    return `https://www.youtube-nocookie.com/embed/${raw}`;
  }

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, '');
    let id: string | null = null;

    if (host === 'youtu.be') {
      id = url.pathname.slice(1);
    } else if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      if (url.pathname === '/watch') {
        id = url.searchParams.get('v');
      } else if (url.pathname.startsWith('/embed/')) {
        id = url.pathname.split('/embed/')[1];
      } else if (url.pathname.startsWith('/shorts/')) {
        id = url.pathname.split('/shorts/')[1];
      }
    }

    if (id) {
      id = id.split(/[/?&]/)[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) {
        return `https://www.youtube-nocookie.com/embed/${id}`;
      }
    }
  } catch {
    // Не валідний URL — трейлера просто не буде.
  }

  return null;
}
