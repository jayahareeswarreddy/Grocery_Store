import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [products, setProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('fruits');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProducts = { ...products };
      const newId = products[selectedCategory].length + 1;
      const productToAdd = {
        id: newId,
        ...newProduct,
        price: parseFloat(newProduct.price)
      };
      
      updatedProducts[selectedCategory] = [...products[selectedCategory], productToAdd];
      
      await axios.put('http://localhost:3001/products', updatedProducts);
      setProducts(updatedProducts);
      setNewProduct({ name: '', price: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdatePrice = async (category, productId, newPrice) => {
    try {
      const updatedProducts = { ...products };
      const productIndex = updatedProducts[category].findIndex(p => p.id === productId);
      updatedProducts[category][productIndex].price = parseFloat(newPrice);
      
      await axios.put('http://localhost:3001/products', updatedProducts);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handleDeleteProduct = async (category, productId) => {
    try {
      const updatedProducts = { ...products };
      updatedProducts[category] = products[category].filter(p => p.id !== productId);
      
      await axios.put('http://localhost:3001/products', updatedProducts);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              {Object.keys(products).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              required
              step="0.01"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              required
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Product
          </button>
        </form>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Manage Products</h3>
        {Object.entries(products).map(([category, categoryProducts]) => (
          <div key={category} className="mb-8">
            <h4 className="text-lg font-medium mb-4 capitalize">{category}</h4>
            <div className="space-y-4">
              {categoryProducts.map(product => (
                <div key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <input
                      type="number"
                      step="0.01"
                      value={product.price}
                      onChange={(e) => handleUpdatePrice(category, product.id, e.target.value)}
                      className="mt-1 w-24 rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(category, product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;