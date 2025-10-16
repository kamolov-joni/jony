import React, { useState, useEffect } from "react";

import "./navbar.css";

function Navbar ({ onCartClick, totalPrice }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true);
    }
  }, []);

  

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo"
           onClick={() => window.scrollTo({ top:'0', behavior: "smooth" })}
           style={{ cursor: "pointer" }}>
          <img src="/images/yellow-logo.png" alt="Logo" className="logo-image" />
         </div>

           {/* Navigation */}
           <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
             <a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
             <a href="#menu" className="nav-link" onClick={() => setIsMenuOpen(false)}>Menu</a>
             <a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Kontact</a>
           </nav>

       
          {/* Right side */}
          <div className="header-actions">
        
            {/* User Avatar and Cart Icon */}

            <div className="user-actions">
              <a href="/cart" onClick={(e) => {
                e.preventDefault();
                onCartClick();
              }}>
              <div className="user-status" style={{ cursor: "pointer", position: "relative" }}>
               <i class="fa-solid fa-cart-shopping"></i>
               {totalPrice > 0 && (
                 <span className="cart-total">{totalPrice.toLocaleString()} UZS</span>
               )}
              </div>
              </a>
    
              {/* User Avatar profile */}
              <a href={isLoggedIn ? "/profile" : "/signup"} className="user-avatar-link">
                <div className="user-avatar">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
