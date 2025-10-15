import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { getTrendingProducts, reset } from '../features/products/productSlice';
import './ProductSlider.css';

// NOTE: The wishlist logic in this component was local. 
// For a full integration, it should also be connected to a global wishlist state/slice.
// We will tackle that in the next step.

export default function ProductSlider() {
  const dispatch = useDispatch();
  const { trendingProducts, isLoading } = useSelector((state) => state.products);
  
  // You would get the wishlist from your global wishlist slice
  // const { wishlist } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getTrendingProducts());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Dummy toggle function for now
  const toggleWishlist = (id) => {
    console.log("Toggling wishlist for:", id);
  }

  return (
    <section className="slider-container">
      <h2 className="slider-title">Trending Now</h2>
      <div className="slider-wrapper">
        <div className="slider-track">
          {isLoading ? <p>Loading...</p> : trendingProducts.map((sneaker) => (
            <Link to={`/${sneaker.category}`} className="slider-card" key={sneaker.id}>
              <div className="card-image-container">
                <img src={sneaker.image} alt={sneaker.name} />
              </div>
              <div className="card-info-container">
                <div className="card-actions">
                  <button className="action-btn" onClick={(e) => { e.preventDefault(); toggleWishlist(sneaker.id); }}>
                    <FiHeart className={"heart-icon"} />
                  </button>
                </div>
                <div className="card-text">
                  <h4>{sneaker.name}</h4>
                  <p>{sneaker.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* The floating view button can be added back with its IntersectionObserver logic if desired */}
      </div>
    </section>
  );
}