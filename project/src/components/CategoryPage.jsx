import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import ProductCard from './ProductCard';
import CartModal from './CartModal';
import ProfileModal from './ProfileModal';

function CategoryPage({ updateCartCount }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = storedProducts.filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
    setProducts(filteredProducts);
    setLoading(false);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    if (updateCartCount) {
      updateCartCount();
    }
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed bottom-4 right-4 bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    successMessage.textContent = `${product.name} added to cart!`;
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
      successMessage.remove();
    }, 2000);
  };

  const filteredAndSortedProducts = [...products]
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-6 capitalize">{category}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 rounded-lg border border-emerald-200 bg-white/80 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Sort by...</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-lg border border-emerald-200 bg-white/80 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600">No products found in this category</h3>
              <p className="text-gray-500 mt-2">Check back later for new products!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-emerald-600 font-bold">₹{parseFloat(product.price).toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-3 w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => {
          setIsCartOpen(false);
          if (updateCartCount) {
            updateCartCount();
          }
        }}
      />
    </div>
  );
}

export default CategoryPage;
