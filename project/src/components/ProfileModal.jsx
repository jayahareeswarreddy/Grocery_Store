import React, { useState, useEffect } from 'react';
import { XMarkIcon, UserIcon, ShoppingBagIcon, MapPinIcon, PhoneIcon, PencilIcon } from '@heroicons/react/24/outline';

function ProfileModal({ isOpen, onClose, user }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editedAddress, setEditedAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    if (isOpen && user) {
      loadOrders();
      if (user.address) {
        setEditedAddress(user.address);
      }
    }
  }, [isOpen, user]);

  const loadOrders = () => {
    const userOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const filteredOrders = userOrders.filter(order => 
      order.userId === user.id || order.userId === user.email
    );
    setOrders(filteredOrders);
    setLoading(false);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveAddress = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => {
      if (u.email === user.email) {
        return {
          ...u,
          address: editedAddress
        };
      }
      return u;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify({
      ...user,
      address: editedAddress
    }));
    setIsEditingAddress(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
      
      <div className="relative min-h-screen md:flex md:items-center md:justify-center">
        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-2xl font-semibold text-emerald-800">My Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-emerald-50 rounded-full">
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'profile'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              <div className="flex items-center justify-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 text-center font-medium ${
                activeTab === 'orders'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              <div className="flex items-center justify-center">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Orders
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                    <UserIcon className="h-10 w-10 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <PhoneIcon className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-gray-800">{user.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPinIcon className="h-5 w-5 text-emerald-600 mt-1" />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Address</p>
                        {!isEditingAddress && (
                          <button
                            onClick={() => setIsEditingAddress(true)}
                            className="p-1 hover:bg-emerald-50 rounded-full"
                          >
                            <PencilIcon className="h-4 w-4 text-emerald-600" />
                          </button>
                        )}
                      </div>
                      {isEditingAddress ? (
                        <div className="space-y-2 mt-2">
                          <input
                            type="text"
                            name="street"
                            value={editedAddress.street}
                            onChange={handleAddressChange}
                            placeholder="Street Address"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              name="city"
                              value={editedAddress.city}
                              onChange={handleAddressChange}
                              placeholder="City"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              name="state"
                              value={editedAddress.state}
                              onChange={handleAddressChange}
                              placeholder="State"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <input
                            type="text"
                            name="pincode"
                            value={editedAddress.pincode}
                            onChange={handleAddressChange}
                            placeholder="Pincode"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setIsEditingAddress(false)}
                              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveAddress}
                              className="px-3 py-1 text-sm bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-800">
                          {user.address ? (
                            <>
                              {user.address.street}<br />
                              {user.address.city}, {user.address.state} - {user.address.pincode}
                            </>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBagIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No orders found</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                              <div>
                                <p className="text-gray-800">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <p className="text-emerald-600 font-medium">₹{item.price * item.quantity}</p>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="text-gray-800 capitalize">{order.paymentMethod}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="text-lg font-semibold text-emerald-600">₹{order.total + 40}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal; 