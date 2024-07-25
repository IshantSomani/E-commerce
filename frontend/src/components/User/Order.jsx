import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const heroImage = 'https://img.freepik.com/premium-photo/shopping-online-delivery-concept-3d-rendering_307211-242.jpg?w=826';
const categoryImages = {
  electronics: 'https://img.freepik.com/premium-photo/minimalist-knollingstyle-photograph-object_896360-1930.jpg?w=826',
  clothing: 'https://img.freepik.com/premium-photo/pile-vintage-clothing-flea-market-table-concept-vintage-fashion-flea-market-finds-retro-style-secondhand-treasures-table-display_918839-247580.jpg?w=900',
  beauty: 'https://img.freepik.com/premium-photo/collection-bottles-soaps-lemons-lemons-table_763111-292263.jpg?w=740',
};

const categories = [
  { name: 'Electronics', image: categoryImages.electronics, id: 'electronics' },
  { name: 'Clothing', image: categoryImages.clothing, id: 'clothing' },
  { name: 'Beauty & Personal Care', image: categoryImages.beauty, id: 'beauty' },
];

const CategoryCard = ({ category, onSelect }) => (
  <div onClick={() => onSelect(category.id)} className="cursor-pointer group">
    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <img src={category.image} alt={category.name} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">{category.name}</h3>
        <p className="text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore products</p>
      </div>
    </div>
  </div>
);

const Order = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    console.log(categoryId);
    navigate(`/products/${categoryId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex-grow select-none">
        {/* Hero Section */}
        <div className="relative mb-24 rounded-2xl overflow-hidden shadow-2xl">
          <img src={heroImage} alt="Hero" className="w-full h-[90vh] object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 text-center leading-tight">Welcome to Our Store</h1>
            <p className="text-2xl md:text-3xl mb-12 text-center max-w-3xl font-light">Discover amazing products across all categories</p>
            <Link 
              to="/products" 
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Categories Section */}
        <div className="mb-24">
          <h2 className="text-5xl font-bold mb-12 text-center text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {categories.map((category, index) => (
              <CategoryCard key={index} category={category} onSelect={handleCategorySelect} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;