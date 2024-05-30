import React, { useEffect, useState } from 'react';
import * as api from '../services/api';

interface Category {
  id: string
  name: string
}

interface ProductsCategoriesProps {
  onCategoryClick: (categoryId: string) => void;
}

function ProductsCategories({ onCategoryClick }: ProductsCategoriesProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories() {
      const response = await api.getCategories();
      setCategories(response);
    }
    getCategories();
  }, []);

  return (
    <div>
      <h2>Categorias:</h2>
      <ul>
        { categories.map((category) => (
          <li key={ category.id }>
            <label htmlFor={ category.id }>
              <input
                type="radio"
                data-testid="category"
                id={ category.id }
                name="category"
                value={ category.id }
                onClick={ () => onCategoryClick(category.id) }
              />
              { category.name }
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsCategories;
