import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { ThemeProvider } from "./ThemeContext";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Payment from "./pages/Payment/Payment.jsx";
import Login from "./pages/Login.jsx";
// import CartDrawer from "./components/CartDrawer";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import ShowcasePage from "./components/ShowcasePage.jsx";
import ShoppingPanel from "./components/ShoppingPanel.jsx";
import FloatingBagIcon from "./components/FloatingBagIcon.jsx";
import ProfileModal from "./components/ProfileModal.jsx";

// --- Import the necessary actions ---
import { getWishlist } from './features/wishlist/wishlistSlice';
import { getCart } from './features/cart/cartSlice';
// import { getPurchaseCounts } from './features/orders/orderSlice';
import { getProducts } from './features/products/productSlice'; // <-- IMPORT THIS

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.ui);

  // --- ADD THIS useEffect TO FETCH PRODUCTS ON APP LOAD ---
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);
  // --------------------------------------------------------

  useEffect(() => {
    if (user) {
      // These will run when the user logs in
      dispatch(getWishlist());
      dispatch(getCart());
      // dispatch(getPurchaseCounts());
    }
  }, [user, dispatch]);

  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  return (
    <ThemeProvider>
      <Router>
        <Navbar onMenuClick={handleMenuClick} />
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        <ProfileModal />
        <ShoppingPanel />
        <FloatingBagIcon />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            <Route path="/product/:id" element={<ShowcasePage />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;