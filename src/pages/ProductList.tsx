import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartButton from '../components/CartButton';
import ProductsCategories from '../components/Categories';
import * as api from '../services/api';
import AddToCart from '../components/AddToCart';

interface Product {
  id: string
  title: string
  thumbnail: string
  price: number
}

function ProductList() {
  const [query, setQuery] = useState('');
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const getProduct = async (selectedCategory = '') => {
    const response = await api.getProductsFromCategoryAndQuery(
      selectedCategory,
      query,
    );
    setListProducts(response.results);
  };

  const handleSubmit = async () => {
    await getProduct();
  };

  const handleSelectedCategory = async (categoryId: string) => {
    await getProduct(categoryId);
  };

  const handleAddToCart = (product: Product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Lista de produtos</h1>
      <CartButton />
      <ProductsCategories onCategoryClick={ handleSelectedCategory } />
      <div>
        <input
          type="text"
          placeholder="Pesquisa"
          value={ query }
          onChange={ handleQuery }
          data-testid="query-input"
        />
        <button onClick={ handleSubmit } data-testid="query-button">
          Buscar
        </button>
      </div>
      { listProducts.length > 0 ? (
        <ul>
          {listProducts.map((product) => (
            <li key={ product.id }>
              <Link to={ `/items/${product.id}` } data-testid="product-detail-link">
                <div data-testid="product">
                  <h3>{ product.title }</h3>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p>{ `R$ ${product.price}` }</p>
                </div>
              </Link>
              <AddToCart
                product={ product }
                handleAddToCart={ handleAddToCart }
                testId="product-add-to-cart"
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2 data-testid="home-initial-message">
            { query.trim() === ''
              ? 'Digite algum termo de pesquisa ou escolha uma categoria.'
              : 'Nenhum produto foi encontrado' }
          </h2>
        </div>
      )}
    </div>
  );
}

export default ProductList;
