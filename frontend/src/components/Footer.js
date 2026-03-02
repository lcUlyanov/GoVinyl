import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>О магазине</h4>
          <p>GoVinyl – лучший выбор виниловых пластинок для любителей качественного звука и аутентичной музыки.</p>
        </div>
        
        <div className="footer-section">
          <h4>Навигация</h4>
          <ul>
            <li><a href="#home">Главная</a></li>
            <li><a href="#catalog">Каталог</a></li>
            <li><a href="#about">О нас</a></li>
            <li><a href="#contact">Контакты</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Контакты</h4>
          <p>📧 Email: info@govinyl.ru</p>
          <p>📞 Телефон: +7 (999) 123-45-67</p>
          <p>📍 Адрес: Москва, ул. Музыкальная, 15</p>
        </div>

        <div className="footer-section">
          <h4>Социальные сети</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 GoVinyl. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
