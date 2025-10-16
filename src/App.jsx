import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // <-- Make sure useEffect is imported
import { useSelector, useDispatch } from 'react-redux'; // <-- Import hooks
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { ThemeProvider } from "./ThemeContext";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import CartDrawer from "./components/CartDrawer";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import { getWishlist } from './features/wishlist/wishlistSlice'; // <-- Import the new action
import { getCart } from './features/cart/cartSlice';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch(); // <-- Get the dispatch function
  const { user } = useSelector((state) => state.auth); // <-- Get user from auth state

  // --- ADD THIS ENTIRE useEffect HOOK ---
  useEffect(() => {
    if (user) {
      // If a user is logged in, automatically fetch their wishlist.
      dispatch(getWishlist());
      dispatch(getCart());
    }
  }, [user, dispatch]);
  // ------------------------------------

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <Navbar onMenuClick={handleMenuClick} />
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        <main style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/men" element={<Men/>}/>
            <Route path="/women" element={<Women/>}/>
            <Route path="/kids" element={<Kids/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Wishlist" element={<Wishlist/>}/>
          </Routes>
        </main>
        <CartDrawer/>
      </Router>
    </ThemeProvider>
  );
}

export default App;