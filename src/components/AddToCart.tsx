import React from 'react';

interface Product {
  id: string
  title: string
  thumbnail: string
  price: number
}

interface AddToCartProps {
  product: Product;
  handleAddToCart: (product: Product) => void;
  testId: string;
}

function AddToCart({ product, handleAddToCart, testId }: AddToCartProps) {
  const handleClick = () => {
    handleAddToCart(product);
  };

  return (
    <button
      type="button"
      data-testid={ testId }
      onClick={ handleClick }
    >
      Adicionar ao carrinho
    </button>
  );
}

export default AddToCart;
