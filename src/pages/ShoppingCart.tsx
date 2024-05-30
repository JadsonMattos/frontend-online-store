import React, { useEffect, useState } from 'react';

interface Product {
  id: string
  title: string
  thumbnail: string
  price: number
  quantity: number
}

function ShoppingCart(/* { cartItems }: { cartItems: Product[] } */) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const getProductQuantity = (product: Product) => {
    const count = cartItems.filter((item) => item.id === product.id).length;
    return count;
  };

  const handleIncrease = (product: { id: string; }) => {
    const updatedCart = cartItems.map((cartProduct) => (cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct));
    setCartItems(updatedCart);
  };

  const handleDecrease = (product: { quantity: number; id: string; }) => {
    if (product.quantity === 1) {
      handleRemove(product);
      return;
    }
    const updatedCart = cartItems.map((cartProduct) => (cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct));
    setCartItems(updatedCart);
  };

  const handleRemove = (product: { quantity?: number; id: any; }) => {
    const updatedCart = cartItems.filter(
      (cartProduct) => cartProduct.id !== product.id,
    );
    setCartItems(updatedCart);
  };

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      { cartItems.length === 0 ? (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
      ) : (
        <ul>
          { cartItems.map((cartProduct) => (
            <li key={ cartProduct.id }>
              console.log(cartProduct);
              <h3 data-testid="shopping-cart-product-name">{ cartProduct.title }</h3>
              <p>{ `Preço: R$ ${cartProduct.price}` }</p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade:
                { getProductQuantity(cartProduct) }
              </p>
              <button
                onClick={ () => handleIncrease(cartProduct) }
                data-testid="product-increase-quantity"
              >
                +
              </button>
              <button
                onClick={ () => handleDecrease(cartProduct) }
                data-testid="product-decrease-quantity"
              >
                -
              </button>
              <button
                onClick={ () => handleRemove(cartProduct) }
                data-testid="product-remove-quantity"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ShoppingCart;
