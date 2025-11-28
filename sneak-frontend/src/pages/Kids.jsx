import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getProductsByCategory, resetCategory } from '../features/products/productSlice'; // <-- Import new actions
import ShowcasePage from '../components/ShowcasePage';
import Loader from '../components/animation/Loader';

export default function Kids() {
  const location = useLocation();
  const dispatch = useDispatch();
  // Read category-specific state and status
  const { categoryProducts, categoryStatus, isError, message } = useSelector((state) => state.products);
  const selectedProductId = location.state?.selectedProductId;

  useEffect(() => {
    // Fetch 'men' products when component mounts
    dispatch(getProductsByCategory('kids'));

    // Cleanup: Reset category state when unmounting
    return () => {
      dispatch(resetCategory());
    };
  }, [dispatch]);

  // --- Render logic using categoryStatus and categoryProducts ---
  if (categoryStatus === 'loading' || categoryStatus === 'idle') {
    return <Loader />;
  }

  if (isError) { // Assuming a shared error state for now
    return <div className="error-message">Error: {message}</div>;
  }

  if (categoryProducts.length === 0 && categoryStatus === 'succeeded') {
    return <div>No products found in the Men's category.</div>;
  }
  // --- End Render Logic ---

  // Pass the fetched categoryProducts to ShowcasePage
  return <ShowcasePage products={categoryProducts} selectedProductId={selectedProductId} title="Kids" />;
}