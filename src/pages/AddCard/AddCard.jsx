import React, { useState } from 'react'
import './card.css';

const Card = ({ product, onClose, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = product.price * quantity;

  return (
    <div>
      <div className="addtocard-wrapper">
        <div className="addtocard-container">
          {/* Yopish tugmasi */}
          <div className="addtocard-close">
            <i className="fa-solid fa-circle-xmark" onClick={onClose}></i>
          </div>

          {/* Mahsulot rasmi */}
          <div className="addtocard-image">
            <img src={product.image[0]} alt={product.name} />
          </div>

          {/* Mahsulot nomi */}
          <h2 className="addtocard-title">{product.name}</h2>
  
          {/* Miqdor tanlash */}
          <div className="addtocard-quantity">
            <p>Miqdor</p>
            <div className="quantity-control">
              <button onClick={handleDecrease}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          </div>

          {/* Savatchaga qo‘shish tugmasi */}
          <button className="addtocard-button" onClick={() => {
            addToCart(product, quantity);
            onClose();
          }}>
            Add to Cart
            <span className="dot"></span>
            <span>{totalPrice.toLocaleString()}</span>
            <span>UZS</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
