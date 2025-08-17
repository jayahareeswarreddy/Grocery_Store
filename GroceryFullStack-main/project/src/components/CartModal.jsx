import React, { useState, useEffect } from 'react';
import { XMarkIcon, CreditCardIcon, BanknotesIcon, QrCodeIcon } from '@heroicons/react/24/outline';

function CartModal({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'payment', 'confirmation'
  const [selectedPayment, setSelectedPayment] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    if (isOpen) {
      loadCartItems();
    }
  }, [isOpen]);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
    calculateTotal(cart);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(sum);
  };

  const updateQuantity = (itemId, change) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    calculateTotal([]);
  };

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const confirmOrder = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      userId: currentUser.id || currentUser.email,
      items: cartItems,
      total: total,
      paymentMethod: selectedPayment,
      address: address,
      date: new Date().toISOString(),
      status: 'pending',
      notification: true
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    const notifications = JSON.parse(localStorage.getItem('adminNotifications')) || [];
    notifications.push({
      id: Date.now(),
      type: 'new_order',
      orderId: newOrder.id,
      userId: currentUser.id || currentUser.email,
      message: `New order #${newOrder.id} placed by ${currentUser.username || currentUser.email}`,
      date: new Date().toISOString(),
      read: false
    });
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));

    clearCart();
    alert('Order placed successfully! Admin will review your order shortly.');
    setCheckoutStep('cart');
    setSelectedPayment('');
    setAddress({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      pincode: '',
    });
    onClose();
  };

  const renderCartItems = () => (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Cart</h3>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setCheckoutStep('payment')}
              className="w-full mt-4 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPaymentMethods = () => (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Payment Method</h3>
      
      <div className="space-y-3">
        <button
          onClick={() => handlePaymentSelection('card')}
          className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
            selectedPayment === 'card'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-emerald-500'
          }`}
        >
          <CreditCardIcon className="h-6 w-6 text-emerald-600 mr-3" />
          <span>Credit/Debit Card</span>
        </button>

        <button
          onClick={() => handlePaymentSelection('cash')}
          className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
            selectedPayment === 'cash'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-emerald-500'
          }`}
        >
          <BanknotesIcon className="h-6 w-6 text-emerald-600 mr-3" />
          <span>Cash on Delivery</span>
        </button>

        <button
          onClick={() => handlePaymentSelection('upi')}
          className={`w-full flex items-center p-4 rounded-lg border-2 transition-colors ${
            selectedPayment === 'upi'
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 hover:border-emerald-500'
          }`}
        >
          <QrCodeIcon className="h-6 w-6 text-emerald-600 mr-3" />
          <span>UPI Payment</span>
        </button>
      </div>

      {selectedPayment && (
        <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
      <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            onChange={handleAddressChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
              placeholder="Street Address"
              className="w-full p-2 border rounded"
            required
          />
        <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
                placeholder="City"
                className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
                placeholder="State"
                className="w-full p-2 border rounded"
              required
            />
          </div>
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleAddressChange}
              placeholder="Pincode"
              className="w-full p-2 border rounded"
            required
          />
        </div>
          <button
            onClick={() => setCheckoutStep('confirmation')}
            className="w-full mt-4 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Review Order
          </button>
      </div>
      )}
    </div>
  );

  const renderOrderConfirmation = () => (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
      
      <div className="bg-emerald-50 p-4 rounded-lg space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Items Total:</span>
          <span className="font-medium">₹{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method:</span>
          <span className="font-medium capitalize">{selectedPayment}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-gray-800 mb-2">Delivery Address:</h4>
        <p className="text-gray-600">
          {address.fullName}<br />
          {address.street}<br />
          {address.city}, {address.state} - {address.pincode}<br />
          Phone: {address.phone}
        </p>
      </div>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setCheckoutStep('payment')}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back
        </button>
        <button
          onClick={confirmOrder}
          className="flex-1 bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
              {checkoutStep === 'cart' && 'Shopping Cart'}
            {checkoutStep === 'payment' && 'Payment & Address'}
            {checkoutStep === 'confirmation' && 'Order Confirmation'}
            </h2>
                            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
                </button>
        </div>

        {checkoutStep === 'cart' && renderCartItems()}
        {checkoutStep === 'payment' && renderPaymentMethods()}
        {checkoutStep === 'confirmation' && renderOrderConfirmation()}
      </div>
    </div>
  );
}

export default CartModal; 