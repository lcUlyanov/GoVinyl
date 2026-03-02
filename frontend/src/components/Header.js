import React from 'react';
import './Header.css';

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🎵 GoVinyl</h1>
          <p className="tagline">Магазин виниловых пластинок</p>
        </div>
        <nav className="nav">
          <button className="nav-link">Главная</button>
          <button className="nav-link">Каталог</button>
          <button className="nav-link">О магазине</button>
          <button className="nav-link">Контакты</button>
        </nav>
        <button className="cart-button" onClick={onCartClick}>
          🛒 Корзина ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;
