import React, { useState, useEffect } from "react";
import "./cart.css";

function Cart({ onClose, cartItems, updateCartItems, openDelivery }) {
  const [items, setItems] = useState([]);
  const [removingItems, setRemovingItems] = useState([]);

  // 🔹 App dan kelgan cartItems → local items ga sync
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      setItems(
        cartItems
          .filter(item => item.quantity > 0)
          .map(item => ({ ...item, count: item.quantity }))
      );
    } else {
      setItems([]);
    }
  }, [cartItems]);

  // 🔹 Miqdorni o‘zgartirish
  const updateCount = (id, type) => {
    setItems((prev) => {
      let updated;
      if (type === "inc") {
        updated = prev.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        const item = prev.find(item => item.id === id);
        if (item && item.count === 1) {
          // 🔹 animatsiya uchun
          setRemovingItems(prev => [...prev, id]);
          setTimeout(() => {
            setItems((prev2) => {
              const newItems = prev2.filter((i) => i.id !== id);
              updateCartItems(newItems.map(i => ({ ...i, quantity: i.count }))); // ⚡️ App ga sync
              setRemovingItems((p) => p.filter(i => i !== id));
              return newItems;
            });
          }, 300);
          return prev;
        } else {
          updated = prev.map((item) =>
            item.id === id ? { ...item, count: item.count - 1 } : item
          );
        }
      }

      // 🔹 App.jsx dagi cartItems ni ham yangilash
      updateCartItems(updated.map(i => ({ ...i, quantity: i.count })));
      return updated;
    });
  };

  const orderPrice = items.reduce((sum, item) => sum + item.price * item.count, 0);
  const deliveryPrice = 5000;
  const totalPrice = orderPrice + deliveryPrice;

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <button className="cart-close" onClick={onClose}>✕</button>
          <div className="cart-title-section">
            <h2 className="cart-title">Savat</h2>
          </div>
        </div>
        <div className="cart-empty">
          <p>Sizning savatingiz bo'sh</p>
          <button className="cart-return-menu" onClick={onClose}>Menuga qaytish</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="cart-close" onClick={onClose}>✕</button>
        <p className="title-sv">Savat</p>
      </div>

      {/* Mahsulotlar */}
      {items.map((item) => (
        <div key={item.id} className={`cart-item ${removingItems.includes(item.id) ? 'removing' : ''}`}>
          <img src={item.image[0]} alt={item.name} className="cart-item-img" />
          <div className="cart-item-info">
            <p className="cart-item-name">{item.name}</p>
            <p className="cart-item-price">{item.price.toLocaleString()} UZS</p>
          </div>
          <div className="cart-counter">
            <button className="cart-btn" onClick={() => updateCount(item.id, "dec")}>-</button>
            <span className="cart-count">{item.count}</span>
            <button className="cart-btn" onClick={() => updateCount(item.id, "inc")}>+</button>
          </div>
        </div>
      ))}

      {/* Narxlar */}
      <div className="cart-prices">
        <div className="cart-price-row">
          <span>Buyurtma narxi</span>
          <span>{orderPrice.toLocaleString()} UZS</span>
        </div>
        <div className="cart-price-row">
          <span>Yetkazib berish narxi</span>
          <span>{deliveryPrice.toLocaleString()} UZS</span>
        </div>
        <div className="cart-price-row total">
          <span>Jami narx</span>
          <span>{totalPrice.toLocaleString()} UZS</span>
        </div>
      </div>

      {/* Rasmiylashtirish button */}
      <button className="cart-submit" onClick={openDelivery}>Rasmiylashtirish</button>
    </div>
  );
}

export default Cart;
