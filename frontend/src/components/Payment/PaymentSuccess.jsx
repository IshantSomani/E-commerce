import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import { FiCheckCircle, FiShoppingBag, FiHome, FiClock } from 'react-icons/fi';
import { MdLocalShipping } from 'react-icons/md';

const PaymentSuccess = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearCart());
        
        if (location.state?.order) {
            setOrderDetails(location.state.order);
        }
    }, [dispatch, location.state]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-indigo-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full" >
                <div className="text-center mb-10">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full">
                            <FiCheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Payment Successful!
                    </h1>
                    
                    <p className="text-gray-600 text-lg mb-8">
                        Thank you for your purchase, {user?.name || 'Customer'}! Your order is confirmed and will be processed shortly.
                    </p>
                </div>

                {/* Order Summary */}
                {orderDetails && (
                    <div className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200" >
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <FiShoppingBag className="mr-2 text-indigo-500" />
                            Order Summary
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center">
                                <FiClock className="text-gray-500 mr-2" />
                                <span className="text-gray-700">Order #: <strong>{orderDetails._id.slice(-8).toUpperCase()}</strong></span>
                            </div>
                            <div className="flex items-center">
                                <MdLocalShipping className="text-gray-500 mr-2" />
                                <span className="text-gray-700">Status: <span className="text-green-600 font-medium">Processing</span></span>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-lg font-medium text-gray-800">
                                Total: ₹{orderDetails.totalAmount?.toFixed(2) || '0.00'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Next Steps */}
                <div className="space-y-4">
                    <div>
                        <Link 
                            to="/" 
                            className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            <FiHome className="w-5 h-5" />
                            Back to Home
                        </Link>
                    </div>
                    
                    <div>
                        <Link 
                            to="/myorder" 
                            className="flex items-center justify-center gap-2 w-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            <FiShoppingBag className="w-5 h-5" />
                            View My Orders
                        </Link>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Need help? <Link to="/contact" className="text-indigo-600 hover:underline">Contact our support team</Link></p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;