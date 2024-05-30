import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../services/api';
import CartButton from '../components/CartButton';
import AddToCart from '../components/AddToCart';

interface Details {
  id: string
  title: string
  price: number
  thumbnail: string
  available_quantity: number
}

function ProductDetails() {
  const { productId } = useParams<{ productId?: string }>();
  const [productDetails, setProductDetails] = useState<Partial<Details>>({});
  const [cartItems, setCartItems] = useState<Details[]>([]);

  useEffect(() => {
    async function getDetails() {
      if (productId) {
        const response = await api.getProductById(productId);
        setProductDetails(response);
      }
    }
    getDetails();
  }, [productId]);

  const handleAddToCart = (product: Details) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h2 data-testid="product-detail-name">{ productDetails.title }</h2>
      <p data-testid="product-detail-price">{ `R$ ${productDetails.price}` }</p>
      <img
        src={ productDetails?.thumbnail }
        alt={ productDetails?.title }
        data-testid="product-detail-image"
      />
      <p>{ `Quantidade disponível: ${productDetails.available_quantity}` }</p>
      <CartButton />
      <AddToCart
        product={ productDetails as Details }
        handleAddToCart={ handleAddToCart as any }
        testId="product-detail-add-to-cart"
      />
    </div>
  );
}

export default ProductDetails;
