import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, reset } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/animation/Loader';
import './Collection.css';

export default function Collection() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector((state) => state.products);

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(getProducts());

    // Reset state on unmount
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading) {
    return <div className="loading-spinner"><Loader/>Loading...</div>;
  }

  if (isError) {
    return <div className="error-message">Error: {message}</div>;
  }

  return (
    <div className="collection-page">
      <h1 className="collection-title">Our Collection</h1>
      <div className="product-grid">
        {products.map((sneaker) => (
          <ProductCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </div>
    </div>
  );
}