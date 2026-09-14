import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';
import Team from './pages/Team';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import PageFallback from './components/PageFallback';

// Адмінка і юридичні сторінки потрібні рідко —
// вантажимо їх окремим чанком, щоб не роздувати основний бандл.
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      {/* reducedMotion="user" — поважаємо системне налаштування «менше руху» */}
      <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="games" element={<Games />} />
            <Route path="team" element={<Team />} />
            <Route path="blog" element={<Blog />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route path="terms" element={<Legal kind="terms" />} />
            <Route path="privacy" element={<Legal kind="privacy" />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App;
