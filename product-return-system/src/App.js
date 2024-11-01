import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import BasicInfo from './components/BasicInfo';
import ProductDetails from './components/ProductDetails';
import Summary from './components/Summary';

function App() {
  return (
    <div className="container">
      <div className="formulario2">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/basic-info" element={<BasicInfo />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
        </div>
    </div>

  );
  
}

export default App;