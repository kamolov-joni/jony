import React from 'react';
import "./productcard.css";

export default function ProductCard({ product }) {
  if (!product) return null;

  // Agar rasm bo'lmasa fallback rasm
  const productImage = product.image && product.image.length > 0
    ? product.image[0]
    : '/images/go\'sht-somsa.jpg';

  return (
    <div className={`product-card ${product.category}`}>
      <div className="product-image">
        <img
          src={process.env.PUBLIC_URL + productImage}
          alt={product.name || 'Product'}
        />
      
        <div className="image-overlay">
          <h3 className="product-name">{product.name || ''}</h3>
          <p className="product-description">{product.description || ''}</p>
          <p className="product-price">
            {product.price ? `${product.price} so'm` : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}