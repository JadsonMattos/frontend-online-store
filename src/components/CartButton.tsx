import React from 'react';
import { Link } from 'react-router-dom';

function CartButton() {
  return (
    <div>
      <button>
        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho de compras
        </Link>
      </button>
    </div>
  );
}

export default CartButton;
