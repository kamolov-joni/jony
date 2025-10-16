import React, { useState } from 'react';
import products from '../../data/products';
import ProductCard from '../ProductCard/ProductCard';
import Card from '../../pages/AddCard/AddCard';
import './menu.css';

export default function Menu({ selectedCategory, addToCart }) {
  const [showCard, setShowCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products
    .filter((item) => item.category === selectedCategory)
    .sort((a, b) => {
      const order = [1, 2, 3, 4]; 
      const aIndex = order.indexOf(a.id);
      const bIndex = order.indexOf(b.id);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.id - b.id;
    });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setSelectedProduct(null);
  };

  return (
    <section className="products" id="menu">
      <div className="container">
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product)}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {showCard && (
        <Card product={selectedProduct} onClose={handleCloseCard} addToCart={addToCart} />
      )}
    </section>
  );
}