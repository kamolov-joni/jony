import React, { useState } from 'react';
import Navbar from '../component/Navbar/Navbar';
import Header from '../component/Header/Header';
import Tabs from '../component/Buttons-header/Tabs';
import Menu from '../component/Menu/Menu';
import Footer from '../component/Footer/Footer';
import Cart from './Cart/Cart';
import DeliveryForm from './Location/Delivery';
import OrderAccepted from './Order-accepted/Order-accepted';
import Timer from '../component/Timer/Timer';




export default function Home() {
  // Состояние для открытия/закрытия корзины
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Состояние для модала подтверждения заказа
  const [isOrderAcceptedOpen, setIsOrderAcceptedOpen] = useState(false);

  // Состояние для выбранной категории
  const [selectedCategory, setSelectedCategory] = useState("somsa");

  // Пример данных корзины (в реальном приложении это будет из глобального состояния)
  const [cartItems, setCartItems] = useState([]);

  // Функция для открытия корзины
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Функция для закрытия корзины
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Функция для добавления товара в корзину
  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  // Функция для обновления корзины из Cart компонента
  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems.map(item => ({ ...item, quantity: item.count })));
  };

  // Функция для открытия доставки
  const openDelivery = () => {
    setShowDelivery(true);
  };

  // Функция для открытия модала подтверждения заказа
  const openOrderAccepted = () => {
    setIsOrderAcceptedOpen(true);
    setShowDelivery(false); // Закрыть модал доставки
  };

  // Функция для закрытия модала подтверждения заказа
  const closeOrderAccepted = () => {
    setIsOrderAcceptedOpen(false);
  };

  // Umumiy narxni hisoblash
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showDelivery, setShowDelivery] = useState(false);
  return (
    <div>
      <Navbar onCartClick={openCart} totalPrice={totalPrice} />
      <Timer />
      <Header />
      <Tabs selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <Menu selectedCategory={selectedCategory} addToCart={addToCart} />
      <Footer />
      

      {/* Модальное окно корзины */}
      {isCartOpen && (
        <div className="cart-modal-overlay">
          <Cart onClose={closeCart} cartItems={cartItems} updateCartItems={updateCartItems} openDelivery={openDelivery} />
        </div>
      )}
        {showDelivery && (
            <div className="delivery-modal-overlay">
              <DeliveryForm onClose={() => setShowDelivery(false)} cartItems={cartItems} onOrderAccepted={openOrderAccepted} />
            </div>
          )}

        {/* Модальное окно подтверждения заказа */}
        {isOrderAcceptedOpen && (
          <div className="order-accepted-modal-overlay">
            <OrderAccepted onClose={closeOrderAccepted} />
          </div>
        )}
    </div>
    
  );
}