import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBagIcon, CheckCircleIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline';

function Profile({ user, setUser }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load user's orders
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = allOrders.filter(order => order.userId === (user.id || user.email));
    setOrders(userOrders);
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Review';
      case 'confirmed':
        return 'Order Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="space-y-2">
          <p><span className="font-semibold">Username:</span> {user.username}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Address:</span> {user.address}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <ShoppingBagIcon className="h-6 w-6 mr-2" />
          Order History
        </h3>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold text-lg">Order #{order.id}</p>
                    <p className="text-gray-600">
                      {new Date(order.date).toLocaleDateString()} at{' '}
                      {new Date(order.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`font-medium ${
                      order.status === 'pending' ? 'text-yellow-600' :
                      order.status === 'confirmed' ? 'text-blue-600' :
                      order.status === 'shipped' ? 'text-purple-600' :
                      order.status === 'delivered' ? 'text-green-600' :
                      'text-gray-600'
                    }`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Total Amount:</p>
                    <p className="text-lg font-bold">₹{order.total.toFixed(2)}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold">Payment Method:</p>
                    <p className="capitalize">{order.paymentMethod}</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-semibold">Delivery Address:</p>
                    <p className="text-gray-600">
                      {order.address.fullName}<br />
                      {order.address.street}<br />
                      {order.address.city}, {order.address.state} - {order.address.pincode}<br />
                      Phone: {order.address.phone}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;