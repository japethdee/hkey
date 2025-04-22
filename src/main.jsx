import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import './styles/global.css';
import LandingPage from './pages/LandingPage.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import HomePage from './pages/HomePage.jsx';
import QuotationPage from './pages/QuotationPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import Products from './pages/Products.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/hkey">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/quotations" element={<QuotationPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
