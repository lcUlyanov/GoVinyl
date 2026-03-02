import React from 'react';
import './Cart.css';

function Cart({ cart, onRemove, onUpdateQuantity }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Корзина</h2>
        <div className="empty-cart">
          <p>🛒 Ваша корзина пуста</p>
          <p className="empty-cart-text">Добавьте пластинки для начала покупок</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Корзина покупок</h2>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.album} className="cart-item-image" />
              <div className="cart-item-info">
                <h4>{item.artist}</h4>
                <p className="album-name">{item.album}</p>
                <p className="genre-info">{item.genre}</p>
              </div>
              <div className="cart-item-price">
                <p className="price-label">{item.price} ₽</p>
              </div>
              <div className="quantity-control">
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span className="qty-display">{item.quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                {item.price * item.quantity} ₽
              </div>
              <button 
                className="remove-btn"
                onClick={() => onRemove(item.id)}
                title="Удалить из корзины"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Итого</h3>
          <div className="summary-row">
            <span>Товаров:</span>
            <span className="summary-value">{cart.length}</span>
          </div>
          <div className="summary-row">
            <span>Количество:</span>
            <span className="summary-value">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total-row">
            <span>Сумма заказа:</span>
            <span className="summary-value total-price">{total.toFixed(2)} ₽</span>
          </div>
          <button className="checkout-btn">Оформить заказ</button>
          <button className="continue-shopping-btn">Продолжить покупки</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
