# Lumenara

Сайт-візитівка Roblox-студії Lumenara: вітрина ігор, блог, команда та адмін-панель
для редагування цього контенту без деплою.

**Стек:** React 19 + TypeScript + Vite (rolldown) · Tailwind CSS 3 · React Router 7 ·
Framer Motion · Supabase (база + авторизація) · Vercel (хостинг).

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build -> dist/
npm run lint
```

### Змінні оточення

Створи `.env.local` у корені (він у `.gitignore`, у git не потрапляє):

```
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon key>
```

Ці ж дві змінні треба додати в налаштуваннях проєкту на Vercel,
інакше зібраний сайт не зможе завантажити контент.

## Структура

```
src/
  config/site.ts       ← контакти, соцмережі, метрики студії (єдине місце для правок)
  types/content.ts     ← типи Game / TeamMember / BlogPost + стилі бейджів статусу
  hooks/useSupabaseList.ts ← завантаження таблиці з обробкою помилок
  components/          ← Layout, ProtectedRoute, ContentState, ScrollToTop
  components/admin/    ← форми CRUD для games / team / blog
  pages/               ← Home, Games, Team, Blog, Contact, Login, Admin, Legal, NotFound
public/images/         ← обкладинки ігор і логотип
```

## Контент і адмінка

Сторінки **Games**, **Team** і **Blog** читають дані з Supabase — нічого не захардкоджено.
Головна показує перші три гри з тієї ж таблиці `games`.

Редагування: `/login` → `/admin`. Маршрут `/admin` закритий `ProtectedRoute`,
без активної сесії Supabase він редіректить на `/login`.

> **Спершу треба створити акаунт адміна** — зараз у базі жодного немає, тож увійти неможливо.
> Supabase → Authentication → Users → **Add user** (email + пароль). Реєстрації на сайті немає навмисно.

### Таблиці

| Таблиця | Колонки |
|---|---|
| `games` | `id`, `title`, `genre`, `status`, `statusStyle`, `desc`, `image`, `link`, `trailer` |
| `team`  | `id`, `name`, `role`, `bio`, `img` |
| `blog`  | `id`, `title`, `date`, `cat`, `summary`, `link` |

`statusStyle` заповнюється автоматично з `status` (див. `statusStyleFor` у `types/content.ts`) —
вручну його вводити не треба. `trailer` — YouTube-посилання (будь-який формат) для сторінки гри `/games/:id`.

> **Спершу додай колонку `trailer`**, інакше збереження гри в адмінці впаде з помилкою.
> У Supabase → SQL Editor виконай:
> ```sql
> alter table public.games add column if not exists trailer text not null default '';
> ```

Клік по грі (на сторінці Games чи в прев'ю на головній) веде на `/games/:id` — сторінку
з описом і вбудованим трейлером; кнопка «Play on Roblox» тепер там, а не на картці.

### Безпека бази (RLS)

Фронтенд ходить у базу з публічним `anon` ключем, який видно будь-кому в браузері.
Захист даних тримається виключно на Row Level Security. Політики **вже налаштовані**
(міграція `create_content_tables_with_rls`) на всіх трьох таблицях:

- **SELECT** — дозволено всім (`anon` + `authenticated`): сайт публічний, контент читається без входу;
- **INSERT / UPDATE / DELETE** — тільки для `authenticated` (адмінка після логіну).

Перевірено бойовим тестом: анонімний `INSERT` повертає `42501 row-level security`,
анонімний `DELETE` зачіпає 0 рядків. Тобто напряму через API контент не підмінити.

> Адвайзер Supabase позначає таблиці як «видимі анонім-ключем» — це **навмисно**
> для публічного сайту, не помилка. Забирати `SELECT` у `anon` не можна, інакше сторінки спорожніють.

## Безпека HTTP (заголовки)

`vercel.json` виставляє security-заголовки на всі відповіді:

- **Content-Security-Policy** — дозволяє скрипти лише з власного домену, стилі + шрифти з Google Fonts,
  зображення з будь-якого `https:` (бо адмінка дозволяє вводити довільні URL картинок),
  зʼєднання лише до Supabase (`*.supabase.co` + `wss:` для realtime). `frame-ancestors 'none'` — сайт не можна вбудувати в iframe.
- **Strict-Transport-Security** (HSTS, 2 роки + preload) — браузер завжди ходить через HTTPS.
- **X-Content-Type-Options: nosniff**, **X-Frame-Options: DENY**, **Referrer-Policy**, **Permissions-Policy**
  (камера/мікрофон/геолокація вимкнені).

SSL/TLS-сертифікати видає й оновлює сам Vercel — у коді нічого налаштовувати не треба.
Захист від DDoS забезпечує edge-мережа Vercel.

## Деплой

Vercel збирає `npm run build` і віддає `dist/`. `vercel.json` переписує всі шляхи
на `index.html` — це потрібно, щоб пряме відкриття `/games` не давало 404
(SPA-роутинг на клієнті).

## Дії, які треба зробити в дашбордах (їх не можна закодити)

- **Створити адмін-акаунт** — Supabase → Authentication → Users → Add user. Без нього логін неможливий.
- **Увімкнути Leaked Password Protection** — Supabase → Authentication → Providers/Policies → перевірка
  пароля проти HaveIBeenPwned. Адвайзер зараз позначає це як вимкнене.
- **Додати env-змінні на Vercel** — `VITE_SUPABASE_URL` і `VITE_SUPABASE_ANON_KEY` (Project → Settings → Environment Variables).
- **Free tier Supabase засинає** після ~тижня без запитів — тоді сайт покаже помилку завантаження,
  поки не натиснути Restore у дашборді. Для продакшену — платний план або пінг-крон.

## Що ще не зроблено (контент)

- Реальні цифри метрик на головній — зараз у `config/site.ts` стоять заглушки.
- Посилання на соцмережі — у `config/site.ts` поки `null`, іконки з `null` не рендеряться.
- Форма звʼязку прибрана; на `/contact` лишились email і (коли зʼявиться посилання) Discord.
- Тексти Privacy Policy / Terms of Service — загальний шаблон, потребує юридичної перевірки.
