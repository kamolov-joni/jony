import React from 'react'
import "./order-accepted.css"
import { useNavigate } from 'react-router-dom'
const OrderAccepted = ({ onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="order-accepted-wrapper">
      <div className='order-accepted'>
        <button onClick={onClose} className="exit-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div className='order-accepted-circle'>
          <svg xmlns="http://www.w3.org/2000/svg" 
               className="check-icon"
               viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h2 className="order-title">Buyurtma qabul qilindi</h2>
        <p className="order-text">Taomlaringizni tez orada yetkazib</p>
        <p className='edd'>beramiz</p>
        <br />
        {/* <button className='ord-btn' onClick={() => { onClose(); navigate('/'); }}>Bosh sahifaga qaytish</button> */}
        <button
  className='ord-btn'
  onClick={() => {
    onClose();
    navigate('/');
    setTimeout(() => {
      window.location.reload(); // 🔄 sahifani yangilash
    }, 100);
  }}
>
  Bosh sahifaga qaytish
</button>
      </div>
    </div>
  )
}

export default OrderAccepted
