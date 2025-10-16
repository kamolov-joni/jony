import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container">
      {/* Logo and Tagline Section */}
      <div className="footer-logo-section">
        <div className="logo-and-tagline">
          <div className="footer-logo">
            <img src="/images/black-logo.png" alt="Xumor Somsa" />
          </div>
          <p className="footer-tagline">Xumor Somsa — milliy ta'mni sevuvchilar uchun</p>
          <br />xq
          <div className="footer-social">
            <a href="https://www.instagram.com/xumor_somsa/"> <img src="/images/Instagram.png" alt="Instagram" className="instagram-icon" /></a>
         </div>
         </div>
      </div>
      
      {/* Links Section */}
      <div className="footer-links-section">
        <h3 className="footer-section-title">Havolalar</h3>
        <ul className="footer-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#menu">Menu</a>
          </li>
          <li>
            <a href="#contact">Kontact</a>
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="footer-contact-section">
        <h3 className="footer-section-title">Aloqa</h3>
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon location-icon"></div>
            <span>Nihol kalso Kofexona orqa tomonida</span>
          </div>
          <div className="contact-item">
            <i class="fa-solid fa-phone"></i>
            <span>Telefon raqam +998 (94) 321-44-45</span>
          </div>
          <div className="contact-item">
          <i class="fa-solid fa-clock"></i>
            <span>Ish vaqti: Har kuni 8:00 — 15:00</span>
          </div>
        </div>
      </div>

      {/* Social Section */}
   
    </div>

    {/* Copyright */}
    <div className="footer-copyright">
      <p>© 2025 Xumor Somsa. Milliy ta'mni sevuvchilarga!</p>
    </div>
  </footer>
  )
}

export default Footer
