import React, { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp/SignUp'
import Cart from './pages/Cart/Cart'
import Delivery from './pages/Location/Delivery'
import Profile from './pages/Profile/Profile'
import OrderAccepted from './pages/Order-accepted/Order-accepted'

export default function App() {
  // ✅ Bitta joyda umumiy savat holati
  const [cartItems, setCartItems] = useState([])

  // Savatni yangilash
  const updateCartItems = (items) => {
    setCartItems(items)
  }

  // ✅ Buyurtma tugagach savatni tozalash
  const handleOrderAccepted = () => {
    setCartItems([])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home cartItems={cartItems} updateCartItems={updateCartItems} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Savat page */}
        <Route
          path="/cart"
          element={<Cart cartItems={cartItems} updateCartItems={updateCartItems} />}
        />

        {/* Yetkazib berish page */}
        <Route
          path="/delivery"
          element={
            <Delivery
              cartItems={cartItems}
              updateCartItems={updateCartItems}
              onOrderAccepted={handleOrderAccepted}
            />
          }
        />

        <Route path="/profile" element={<Profile />} />

        {/* Buyurtma qabul qilindi sahifa */}
        <Route
          path="/order-accepted"
          element={<OrderAccepted onClose={handleOrderAccepted} />}
        />
      </Routes>
    </BrowserRouter>
  )
}
