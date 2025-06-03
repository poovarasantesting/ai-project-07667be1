import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import PropertiesPage from "./pages/properties-page";
import PropertyDetailPage from "./pages/property-detail-page";
import MapViewPage from "./pages/map-view-page";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/map" element={<MapViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}