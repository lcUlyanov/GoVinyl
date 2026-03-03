import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const apiBase = process.env.REACT_APP_API_BASE || 'http://localhost:8080';
  const normalizePath = (p) => {
    if (!p) return '';
    // strip leading ../ or ./
    let np = p.replace(/^\.\.\//, '').replace(/^\.\//, '');
    // ensure no leading slash when concatenating
    np = np.replace(/^\//, '');
    return np;
  };

  const imageSrc = product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))
    ? product.image
    : product.image
      ? `${apiBase.replace(/\/$/, '')}/${normalizePath(product.image)}`
      : '';

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageSrc} alt={product.album} />
        <div className="overlay">
          <button 
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            В корзину
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="artist">{product.artist}</h3>
        <p className="album">{product.album}</p>
        <p className="genre">{product.genre}</p>
        <p className="year">{product.year}</p>
        <div className="product-footer">
          <span className="price">{product.price} $</span>
          {product.stock > 0 ? (
            <span className="stock">В наличии</span>
          ) : (
            <span className="out-of-stock">Нет в наличии</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
