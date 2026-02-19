import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import CourseDetail from './pages/CourseDetail.tsx';
import NewsDetail from './pages/NewsDetail.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
