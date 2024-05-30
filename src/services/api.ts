export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await response.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId: string, query: string) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const products = await response.json();
  return products;
}

export async function getProductById(productId: string) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const productDetails = await response.json();
  return productDetails;
}
