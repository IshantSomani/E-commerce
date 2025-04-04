import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, STATUES } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import { FiShoppingCart, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, status } = useSelector((state) => state.product);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8); 

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(products.length / productsPerPage)));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

    const handleAddToCart = (data) => {
        dispatch(add(data));
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (status === STATUES.LOADING) {
        return <LoadingSpinner />;
    }

    if (status === STATUES.ERROR) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to load products</h2>
                    <button
                        onClick={() => dispatch(fetchProducts())}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="px-8 py-12 bg-gray-50">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-neutral-900 mb-4">Discover Our Collection</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our carefully curated selection of premium products
                </p>
            </div>

            <div className="text-lg font-medium text-gray-700 mb-8">
                Showing <span className="font-bold">{currentProducts.length}</span> of <span className="font-bold">{products.length}</span> products
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentProducts?.map((item, i) => (
                    <div
                        key={item._id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                    >
                        <div className="relative">
                            <div
                                className="aspect-square overflow-hidden cursor-pointer"
                                onClick={() => handleProductClick(item._id)}
                            >
                                <img
                                    src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                    alt={item.productName}
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading='lazy'
                                />
                            </div>
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                <button
                                    onClick={() => handleProductClick(item._id)}
                                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition"
                                    aria-label="Quick view"
                                >
                                    <FiEye className="w-4 h-4 text-gray-700" />
                                </button>
                            </div>
                            {!item.status && (
                                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-br-lg">
                                    Out of Stock
                                </div>
                            )}
                        </div>

                        <div className="p-5">
                            <h3
                                onClick={() => handleProductClick(item._id)}
                                className="text-lg font-semibold text-neutral-900 mb-1 cursor-pointer hover:text-indigo-800 transition line-clamp-1"
                            >
                                {item.productName}
                            </h3>
                            <p className="text-lg font-bold text-neutral-900 mb-4">
                                ₹{item.productPrice.toLocaleString()}
                            </p>

                            <button
                                onClick={() => handleAddToCart(item)}
                                disabled={!item.status}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${item.status
                                    ? 'bg-blue-900 text-white hover:bg-blue-950 shadow hover:shadow-md'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                {item.status ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
                <nav className="flex items-center gap-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>

                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${currentPage === index + 1
                                ? 'bg-blue-900 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(products.length / productsPerPage)}
                        className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Products;