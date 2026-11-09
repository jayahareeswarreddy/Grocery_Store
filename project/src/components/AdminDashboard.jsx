import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI, ordersAPI } from '../services/api';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock: 0
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.userType !== 'admin') {
      navigate('/login');
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const productsData = await productsAPI.getAll();
      setProducts(productsData);

      // Fetch orders (we'll need to create an admin endpoint for this)
      // For now, we'll use a placeholder
      setOrders([]);

      // Calculate total revenue
      const totalRevenue = 0; // We'll calculate this when we have orders
      setRevenue(totalRevenue);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.create(newProduct);
      setNewProduct({ name: '', price: '', category: '', image: '', description: '', stock: 0 });
      fetchData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.update(editingProduct._id, editingProduct);
      setEditingProduct(null);
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productsAPI.delete(id);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-800">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'products' ? 'bg-emerald-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === 'orders' ? 'bg-emerald-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Orders
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Revenue</h3>
            <p className="text-3xl font-bold text-emerald-600">₹{revenue.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-emerald-600">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Products</h3>
            <p className="text-3xl font-bold text-emerald-600">{products.length}</p>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-emerald-800">Manage Products</h2>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, name: e.target.value })
                    : setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, price: e.target.value })
                    : setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={editingProduct ? editingProduct.category : newProduct.category}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, category: e.target.value })
                    : setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, image: e.target.value })
                    : setNewProduct({ ...newProduct, image: e.target.value })
                }
                className="border rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, description: e.target.value })
                    : setNewProduct({ ...newProduct, description: e.target.value })
                }
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Stock"
                value={editingProduct ? editingProduct.stock : newProduct.stock}
                onChange={(e) =>
                  editingProduct
                    ? setEditingProduct({ ...editingProduct, stock: e.target.value })
                    : setNewProduct({ ...newProduct, stock: e.target.value })
                }
                className="border rounded p-2"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            {editingProduct && (
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="mt-4 ml-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg p-4 bg-white shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
                {product.description && (
                  <p className="text-gray-500 text-sm">{product.description}</p>
                )}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">{order.customerName}</p>
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                      className="border rounded p-2"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold">Items:</h4>
                  <ul className="list-disc list-inside">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} × ₹{item.price}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-semibold">Total: ₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard; 