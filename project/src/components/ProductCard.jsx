import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onCartUpdate }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Get initial quantity from cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === product.id);
    if (item) {
      setQuantity(item.quantity);
    }
  }, [product.id]);

  const updateCart = (newQuantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (newQuantity === 0) {
      // Remove item from cart
      const updatedCart = cart.filter(item => item.id !== product.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Update quantity if item exists
        existingItem.quantity = newQuantity;
      } else {
        // Add new item to cart
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: newQuantity
        });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    setQuantity(newQuantity);
    if (onCartUpdate) {
      onCartUpdate();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-4">₹{product.price}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateCart(Math.max(0, quantity - 1))}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-gray-700 font-medium w-8 text-center">
              {quantity}
            </span>
            <button
              onClick={() => updateCart(quantity + 1)}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
          
          {quantity === 0 ? (
            <button
              onClick={() => updateCart(1)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add to Cart
            </button>
          ) : (
            <button
              onClick={() => updateCart(0)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 