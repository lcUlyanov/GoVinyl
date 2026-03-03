import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке продуктов');
        }
        const data = await response.json();
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesGenre = filter === 'all' || product.genre === filter;
    const matchesSearch = product.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.album.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const genres = ['all', ...new Set(products.map(p => p.genre))];

  if (loading) {
    return <div className="product-list-container"><p>Загрузка...</p></div>;
  }

  if (error) {
    return <div className="product-list-container"><p>Ошибка: {error}</p></div>;
  }

  return (
    <div className="product-list-container">
      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Найти по исполнителю или альбому..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="genre-filters">
          <h3>Жанры:</h3>
          <div className="filter-buttons">
            {genres.map(genre => (
              <button
                key={genre}
                className={`filter-btn ${filter === genre ? 'active' : ''}`}
                onClick={() => setFilter(genre)}
              >
                {genre === 'all' ? 'Все жанры' : genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))
        ) : (
          <div className="no-products">
            <p>Пластинки не найдены. Попробуйте изменить фильтры поиска.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
