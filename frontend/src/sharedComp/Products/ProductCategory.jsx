import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import { FiShoppingCart, FiEye, FiArrowLeft } from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const ProductCategory = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const filteredProducts = products?.filter(
            product => product.productCategory.toLowerCase() === category.toLowerCase()
        );

        if (filteredProducts && filteredProducts.length > 0) {
            setCategoryProducts(filteredProducts);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, category, navigate, status]);

    const handleAddToCart = (product) => {
        dispatch(add(product));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === 'loading') return <LoadingSpinner />;
    if (status === 'error') return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading products</h2>
            <button
                onClick={() => dispatch(fetchProducts())}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
                Try Again
            </button>
        </div>
    );

    if (categoryProducts.length === 0) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">No products found in this category</h2>
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
                <FiArrowLeft className="w-4 h-4" />
                Back to Home
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-8 py-12">
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-neutral-900 transition mb-4"
                    >
                        <FiArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2 text-center">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h1>
                    <div className="text-lg font-medium text-gray-700 mb-8">
                        {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} available
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryProducts.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                        >
                            <div className="relative">
                                <div
                                    className="aspect-square overflow-hidden cursor-pointer"
                                    onClick={() => handleProductClick(product._id)}
                                >
                                    <img
                                        src={`${import.meta.env.VITE_API_URI}/${product.productImage}`}
                                        alt={product.productName}
                                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading='lazy'
                                    />
                                </div>
                                <div className="absolute top-3 right-3 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleProductClick(product._id)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition"
                                        aria-label="Quick view"
                                    >
                                        <FiEye className="w-4 h-4 text-gray-700" />
                                    </button>
                                </div>
                                {!product.status && (
                                    <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                                        Out of Stock
                                    </div>
                                )}
                            </div>

                            <div className="p-5">
                                <h3
                                    onClick={() => handleProductClick(product._id)}
                                    className="text-lg font-semibold text-neutral-900 mb-1 cursor-pointer hover:text-indigo-600 transition line-clamp-1"
                                >
                                    {product.productName}
                                </h3>
                                <p className="text-xl font-bold text-neutral-900 mb-4">
                                    ₹{product.productPrice.toLocaleString()}
                                </p>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    disabled={!product.status}
                                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${product.status
                                        ? 'bg-blue-900 text-white hover:bg-blue-950 shadow hover:shadow-md'
                                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    {product.status ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCategory;