import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router зберігає позицію скролу при переході між сторінками.
// Цей компонент скидає її наверх на кожній зміні маршруту.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
