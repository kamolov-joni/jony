import React, { useState } from "react";
import "./delivery.css";

export default function DeliveryForm({ onClose, cartItems, onOrderAccepted, updateCartItems }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const BOT_TOKEN = "8337885031:AAEB78QKXexo5I9jB_hU_shV_V0ClLO6TLs";
  const CHAT_ID = "-1003164444807"; // Group ID

  const formatPhoneNumber = (digits) => {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `(${digits.slice(0, 2)})${digits.slice(2)}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)})${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `(${digits.slice(0, 2)})${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7, 9)}`;
  };

  const orderPrice = cartItems ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;
  const deliveryPrice = 5000;
  const totalPrice = orderPrice + deliveryPrice;

  const handleSubmit = async () => {
    let hasError = false;
    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    } else {
      setNameError(false);
    }
    const phoneRegex = /^\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError(true);
      hasError = true;
    } else {
      setPhoneError(false);
    }
    if (address.trim() === "") {
      setAddressError(true);
      hasError = true;
    } else {
      setAddressError(false);
    } 
    if (hasError) return;

    // Xabar tayyorlash
    const orderText = `
📦 Yangi buyurtma!
👤 Ism: ${name}
📞 Telefon: +998${phone}
🏠 Manzil: ${address}

🛒 Mahsulotlar:
${cartItems
  .filter((item) => item.quantity > 0)
  .map((item) => `- ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} UZS`)
  .join("\n")}

🚚 Yetkazib berish: ${deliveryPrice.toLocaleString()} UZS
💰 Jami: ${totalPrice.toLocaleString()} UZS
`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: orderText,
          parse_mode: "HTML",
        }),
      });

      // ✅ Cartni tozalash
      if (updateCartItems) {
        updateCartItems([]);
      }

      // ✅ Buyurtmani tarixga saqlash
      const orderData = {
        id: Date.now(),
        date: new Date().toISOString(),
        name,
        phone: `+998${phone}`,
        address,
        items: cartItems.filter(item => item.quantity > 0),
        orderPrice,
        deliveryPrice,
        totalPrice
      };

      const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orderHistory', JSON.stringify(existingOrders));

      // ✅ Order accepted sahifasiga o'tkazish
      onOrderAccepted();

    } catch (error) {
      console.error("Telegramga yuborishda xatolik:", error);
    }
  };

  return (
    <div className="delivery-modal">
      {/* Header */}
      <div className="delivery-header">
        <h1 className="delivery-title">Yetkazib berish</h1>
        <button className="cart-close" onClick={onClose}>✕</button>
      </div>

      {/* Personal Information */}
      <div className="form-group">
        <label>Shaxsiy ma'lumotlar</label>
        <input
          type="text"
          placeholder="Ismingizni kiriting"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={nameError ? "error" : ""}
          required
        />
      </div>

      {/* Phone */}
      <div className="form-group">
        <label>Telefon raqamingiz</label>
        <input
          type="tel"
          placeholder="(99)123-45-67"
          value={"+998" + formatPhoneNumber(phone)}
          onChange={(e) => {
            const val = e.target.value;
            const digitsOnly = val.replace(/\D/g, "");
            if (digitsOnly.startsWith("998")) {
              setPhone(digitsOnly.slice(3));
            } else {
              setPhone(digitsOnly);
            }
          }}
          className={phoneError ? "error" : ""}
          required
        />
      </div>

      {/* Address */}
      <div className="form-group">
        <label>Manzilingizni kiriting</label>
        <textarea
          placeholder="Manzilingizni batafsil kiriting"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={addressError ? "error" : ""}
          required
        />
      </div>

      {/* Order Box */}
      <div className="order-box">
        <h2 className="order-title">Buyurtmadagi mahsulotlar</h2>
        <div className="order-list">
          {cartItems && cartItems.filter(item => item.quantity > 0).map(item => (
            <div key={item.id} className="order-item">
              <span>{item.name} × {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} UZS</span>
            </div>
          ))}
          <div className="divider"></div>
          <div className="order-item">
            <span>Mahsulotlar jami:</span>
            <span>{orderPrice.toLocaleString()} UZS</span>
          </div>
          <div className="order-item">
            <span>Yetkazib berish:</span>
            <span>{deliveryPrice.toLocaleString()} UZS</span>
          </div>
          <div className="divider"></div>
        </div>
      </div>

      {/* Total */}
      <div className="total">
        <span>Jami to'lov</span>
        <span>{totalPrice.toLocaleString()} UZS</span>
      </div>

      {/* Button */}
      <button className="confirm-btn" onClick={handleSubmit}>Rasmiylashtirish</button>
    </div>
  );
}
