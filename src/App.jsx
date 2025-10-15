import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import { ThemeProvider } from "./ThemeContext";
// import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Collection from "./pages/Collection.jsx";
import Men from "./pages/Men.jsx";
import Women from "./pages/Women.jsx";
import Kids from "./pages/Kids.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import CartDrawer from "./components/CartDrawer";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
// import Toast from "./components/toast/Toast.jsx";
// import backimg from "../public/assets/background/back1.png";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        {/* <Footer /> */}
        <CartDrawer/>
        {/* <Toast/> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
