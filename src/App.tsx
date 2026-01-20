import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Games from './pages/Games';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="games" element={<Games />} />
          <Route path="careers" element={<div className="pt-32 text-center text-2xl">Careers Page Coming Soon...</div>} />
          <Route path="contact" element={<div className="pt-32 text-center text-2xl">Contact Page Coming Soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;