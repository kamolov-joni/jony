import React, { useState } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && name) {
      const userData = {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ')[1] || '',
        phone: phone
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/');
    } else {
      alert('Iltimos, barcha maydonlarni to\'ldiring');
    }
  };

  return (
    <div className="modal-overlay">
    {/* Left-logo */}
    <div className="left-section">
      <div className="logo-container">
        {/* <img src="./images/signlogo.png" alt="Xumor Somsa Logo" className="main-logo" /> */}
      </div>
    </div>

    {/* Right-login form */}

    <div className="right-section">
      {/* Tab buttons */}
      <div className='back-icon'>
        <Link to={"/"}><i class="fa-solid fa-arrow-left"></i></Link>
     </div>
      {/* Login form */}
      <div className="login-form">
        <h2 className="welcome-title">Xush kelibsiz</h2>
        <p className="subtitle">Davm etish uchun hisobingizni kiriting</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="tel"
              className="form-input"
              placeholder="+998"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-input"
              placeholder="Toliq ismingiz"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Kirish</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignUp