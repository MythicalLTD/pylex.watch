import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import Nav from '@/components/Nav';

import Full from './pages/Full';
import Genre from '@/pages/Genre';
import Index from '@/pages/Index';
import List from '@/pages/List';
import Search from '@/pages/Search';
import Watch from '@/pages/Watch';
import Footer from './components/Footer';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/list" element={<List />} />

          <Route path="/search" element={<Search />} />

          <Route path="/:type" element={<Full />} />

          <Route path="/:type/:id" element={<Index />} />

          <Route path="/watch/:id" element={<Watch />} />

          <Route path="/genre/:type/:id" element={<Genre />} />
        </Routes>
        <br></br>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
