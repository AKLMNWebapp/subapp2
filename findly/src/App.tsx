import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import HomePage from './home/HomePage';
import { Container } from 'react-bootstrap';
import NavMenu from './shared/NavMenu';
import ProductListPage from './product/ProductListPage';
import ProductCreatePage from './product/ProductCreatePage';

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
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
