import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import CartModal from './components/CartModal';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('App mounted, loading initial state...');
    // Load cart count
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Initial cart from localStorage:', cart);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));

    // Load user from currentUser in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log('Current user from localStorage:', currentUser);
    setUser(currentUser);
  }, []);

  const updateCartCount = () => {
    console.log('Updating cart count...');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Cart items for count update:', cart);
    const newCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    console.log('New cart count:', newCount);
    setCartCount(newCount);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          cartCount={cartCount} 
          onCartClick={() => setIsCartOpen(true)} 
          user={user}
          onLogout={handleLogout}
        />
        
        <div className="pt-16"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home updateCartCount={updateCartCount} />} />
            <Route 
              path="/category/:category" 
              element={<CategoryPage updateCartCount={updateCartCount} />} 
            />
            <Route 
              path="/login" 
              element={<Login setUser={setUser} />} 
            />
            <Route 
              path="/signup" 
              element={<Signup setUser={setUser} />} 
            />
            <Route 
              path="/admin" 
              element={<AdminDashboard />} 
            />
          </Routes>
        </div>

        <CartModal 
          isOpen={isCartOpen} 
          onClose={() => {
            setIsCartOpen(false);
            updateCartCount();
          }} 
        />
      </div>
    </Router>
  );
}

export default App;