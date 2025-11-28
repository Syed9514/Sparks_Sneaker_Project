import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, reset } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/animation/Loader';
import { FiFilter, FiX } from 'react-icons/fi';
import './Collection.css';

// --- CONFIG: Map specific tags to broad categories ---
const TAG_MAPPING = {
  // Original Tag : Master Category
  "everyday wear": "Everyday",
  "everyday": "Everyday",
  "daily wear": "Everyday",
  "casual": "Lifestyle",
  "streetwear": "Lifestyle",
  "party": "Lifestyle",
  "school": "Everyday",
  "play": "Everyday",
  "playground": "Everyday",
  "travel": "Lifestyle",
  // Sports
  "gym": "Sport",
  "training": "Sport",
  "basketball": "Sport",
  "running": "Sport",
  "trail running": "Sport",
  "hiking": "Sport",
  "tennis": "Sport",
  "sports": "Sport"
};

// The only 3 tags we want to show
const MASTER_TAGS = ["Everyday", "Sport", "Lifestyle"];

export default function Collection() {
  const dispatch = useDispatch();
  const { products, status, message } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(null); // Single select for simplicity

  useEffect(() => {
    dispatch(getProducts());
    return () => { dispatch(reset()); };
  }, [dispatch]);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter(product => {
      if (!product.occasion) return false;
      
      // Check if ANY of the product's tags map to the selected Master Category
      return product.occasion.some(tag => {
        const lowerTag = tag.toLowerCase().trim();
        const mappedCategory = TAG_MAPPING[lowerTag];
        return mappedCategory === selectedCategory;
      });
    });
  }, [products, selectedCategory]);

  let content;
  if (status === 'idle' || status === 'loading') content = <Loader />;
  else if (status === 'failed') content = <div className="error-message">{message}</div>;
  else if (status === 'succeeded') {
    content = filteredProducts.length > 0 ? (
      <div className="product-grid">
        {filteredProducts.map((sneaker) => (
          <ProductCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    ) : (
      <div className="empty-state">
        <p>No shoes found for <strong>{selectedCategory}</strong>.</p>
        <button className="clear-link" onClick={() => setSelectedCategory(null)}>View all shoes</button>
      </div>
    );
  }

  return (
    <div className="collection-page">
      <div className="collection-header">
        <h1 className="collection-title">Our Collection</h1>
        <p className="collection-subtitle">
          {products.length} Exclusive Drops
        </p>
      </div>

      {/* --- NEW: COMPACT FILTER BAR --- */}
      <div className="filter-bar-container">
        <div className="filter-bar">
          
          {/* Left: Icon */}
          <div className="filter-label">
            <FiFilter /> <span>Filter</span>
          </div>

          {/* Center: Pills */}
          <div className="filter-pills">
            <button 
              className={`pill ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {MASTER_TAGS.map(tag => (
              <button
                key={tag}
                className={`pill ${selectedCategory === tag ? 'active' : ''}`}
                onClick={() => setSelectedCategory(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Right: Clear Action (Visible only if filtered) */}
          <div className="filter-actions">
            {selectedCategory && (
              <button className="icon-btn-small" onClick={() => setSelectedCategory(null)}>
                <FiX />
              </button>
            )}
          </div>
        </div>
      </div>

      {content}
    </div>
  );
}