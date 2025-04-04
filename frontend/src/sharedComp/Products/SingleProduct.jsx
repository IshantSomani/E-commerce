import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productSlice';
import { add } from '../../redux/slices/cartSlice';
import { FiShoppingCart, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import LoadingSpinner from '../LoadingSpinner';

const SingleProduct = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const product = products?.find(product => product._id === productId);
        if (product) {
            setSelectedProduct(product);
        } else if (status !== 'loading') {
            navigate('/');
        }
    }, [products, productId, navigate, status]);

    const handleAddToCart = () => {
        if (selectedProduct) {
            const productWithQuantity = {
                ...selectedProduct,
                quantity: quantity
            };
            dispatch(add(productWithQuantity));
        }
    };
    

    if (status === 'loading') return <LoadingSpinner />;
    if (status === 'error') return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Error loading product</h2>
            <button
                onClick={() => dispatch(fetchProducts())}
                className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
            >
                Try Again
            </button>
        </div>
    );

    if (!selectedProduct) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Product not found</h2>
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
            >
                <FiArrowLeft className="w-4 h-4" />
                Back to Shop
            </button>
        </div>
    );

    return (
        <div className="min-h-screen py-12 bg-gray-50">
            <div className="px-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-neutral-900 transition mb-8"
                >
                    <FiArrowLeft className="w-5 h-5" />
                    Back to Products
                </button>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image */}
                        <div className="md:w-1/2 lg:w-2/5">
                            <div className="h-full w-full aspect-square overflow-hidden">
                                <img
                                    className="w-full object-cover"
                                    src={`${import.meta.env.VITE_API_URI}/${selectedProduct.productImage}`}
                                    alt={selectedProduct.productName}
                                    loading='lazy'

                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="p-8 md:w-1/2 lg:w-3/5">
                            <div className="flex items-center mb-4">
                                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                    {selectedProduct.productCategory}
                                </span>
                                <span className={`ml-3 flex items-center text-sm font-medium ${selectedProduct.status ? 'text-green-500' : 'text-red-500'}`}>
                                    {selectedProduct.status ? (
                                        <>
                                            <FiCheck className="mr-1" /> In Stock
                                        </>
                                    ) : (
                                        <>
                                            <FiX className="mr-1" /> Out of Stock
                                        </>
                                    )}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                                {selectedProduct.productName}
                            </h1>

                            <div className="flex items-center mb-6">
                                <span className="text-3xl font-bold text-neutral-900">
                                    ₹{selectedProduct.productPrice.toLocaleString()}
                                </span>
                                {selectedProduct.originalPrice && (
                                    <span className="ml-2 text-lg text-gray-500 line-through">
                                        ₹{selectedProduct.originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-600 line-clamp-4">
                                    {selectedProduct.productDesc}
                                </p>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center mb-8">
                                <h3 className="text-lg font-semibold text-neutral-900 mr-4">Quantity:</h3>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <span className="px-4 py-1 text-neutral-900 font-medium">
                                        {quantity}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedProduct.status}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${selectedProduct.status
                                    ? 'bg-blue-900 text-white hover:bg-blue-950 shadow hover:shadow-md'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                {selectedProduct.status ? 'Add to Cart' : 'Out of Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;