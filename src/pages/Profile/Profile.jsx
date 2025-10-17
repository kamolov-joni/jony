import React, { useState, useEffect } from "react";
import "./profile.css";
import Footer from "../../component/Footer/Footer";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("orders");
  const [userData, setUserData] = useState({
    firstName: "Kamolov",
    lastName: "Jonibek",
    gender: "erkak",
    phone: "+998901234567"
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load user data from localStorage if available
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }

    // Load order history from localStorage
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Ma\'lumotlar saqlandi!');
    // Force re-render to update navbar login status
    window.location.reload();
  };

  const renderContent = () => {
    if (activeTab === "orders") {
      return (
        <div className="profile-main">
          <div className="main-tab">
            <button className="tab-btn">Barcha buyurtmalarim</button>
          </div>
          {orders.length === 0 ? (
            <div className="empty-state">
              <h2 className="empty-title">Hech narsa yoʻq</h2>
              <p className="empty-text">
                Sizda faol buyurtma mavjud emas! Barcha kerakli narsalarni topish uchun qidirishdan foydalaning!
              </p>
              <button className="start-btn">Xaridlarni boshlash</button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span className="order-date">{new Date(order.date).toLocaleString('uz-UZ')}</span>
                    <span className="order-total">{order.totalPrice.toLocaleString()} UZS</span>
                  </div>
                  <div className="order-details">
                    <p><strong>Ism:</strong> {order.name}</p>
                    <p><strong>Telefon:</strong> {order.phone}</p>
                    <p><strong>Manzil:</strong> {order.address}</p>
                    <div className="order-items">
                      <strong>Mahsulotlar:</strong>
                      <ul>
                        {order.items.map(item => (
                          <li key={item.id}>{item.name} × {item.quantity} = {(item.price * item.quantity).toLocaleString()} UZS</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else if (activeTab === "profile") {
      return (
        <div className="profile-main">
          <div className="main-tab">
            <button className="tab-btn">Profil ma\'lumotlari</button>
          </div>
          <div className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="firstName">Ism</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Familya</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Jins</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="erkak"
                    checked={userData.gender === "erkak"}
                    onChange={handleInputChange}
                  />
                  Erkak
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="gender"
                    value="ayol"
                    checked={userData.gender === "ayol"}
                    onChange={handleInputChange}
                  />
                  Ayol
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Telefon raqami</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>
            <button onClick={handleSave} className="save-btn">Saqlash</button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-page">
        <div className="profile-container">
          {/* Header */}
          <div className="profile-header">
            <h1 className="profile-title">{userData.firstName} {userData.lastName}</h1>
          </div>

          {/* Navigation and Content */}
          <div className="profile-content">
            {/* Sidebar Navigation */}
            <div className="profile-sidebar">
              <button
                className={`sidebar-btn ${activeTab === "orders" ? "active" : ""}`}
                onClick={() => setActiveTab("orders")}
              >
                Buyurtmalarim
              </button>
              <button
                className={`sidebar-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
            </div>

            {/* Main Content Area */}
            {renderContent()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
