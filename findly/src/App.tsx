import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './home/HomePage';
import { Container } from 'react-bootstrap';
import NavMenu from './shared/NavMenu';
import ProductListPage from './product/ProductListPage';
import ProductCreatePage from './product/ProductCreatePage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Unauthorized from './userpages/Unauthorized';
import LoginPage from './userpages/LoginPage';
import Dashboard from './userpages/Dashboard';
import AdminPage from './userpages/AdminPage';
import BusinessPage from './userpages/BusinessPage';

const App: React.FC = () => {
  return (
    <Container>
      <NavMenu />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductListPage />} />
          <Route path="/productcreate" element={<ProductCreatePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/business" element={<BusinessPage />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
