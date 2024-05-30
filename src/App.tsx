import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <Routes>
      <Route path="/" Component={ ProductList } />
      <Route path="/cart" Component={ ShoppingCart } />
      <Route path="/items/:productId" Component={ ProductDetails } />
    </Routes>
  );
}

export default App;
