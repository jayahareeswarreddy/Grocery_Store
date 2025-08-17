import { Link } from 'react-router-dom';

function Home() {
  const categories = [
    {
      id: 1,
      name: 'Fruits',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format',
      description: 'Fresh and seasonal fruits'
    },
    {
      id: 2,
      name: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=500&auto=format',
      description: 'Organic vegetables'
    },
    {
      id: 3,
      name: 'Dairy',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&auto=format',
      description: 'Fresh dairy products'
    },
    {
      id: 4,
      name: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format',
      description: 'Fresh baked goods'
    },
    {
      id: 5,
      name: 'Beverages',
      image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500&auto=format',
      description: 'Refreshing drinks'
    },
    {
      id: 6,
      name: 'Household',
      image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&auto=format',
      description: 'Essential household items'
    },
    {
      id: 7,
      name: 'Snacks',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format',
      description: 'Tasty snacks'
    },
    {
      id: 8,
      name: 'Personal Care',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format',
      description: 'Personal care products'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-96"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&auto=format")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to Our Grocery Store
              </h1>
              <p className="text-xl mb-8">
                Fresh products, great prices, and convenient shopping experience
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Products</h3>
              <p className="text-gray-600">100% fresh and quality products</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Shopping</h3>
              <p className="text-gray-600">Simple and convenient shopping experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;