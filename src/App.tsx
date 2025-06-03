import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}