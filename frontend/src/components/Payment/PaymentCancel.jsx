import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHome, FiAlertCircle, FiPhone } from 'react-icons/fi';

const PaymentCancel = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full">
                <div className="text-center mb-10">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center bg-red-100 p-4 rounded-full">
                            <FiAlertCircle className="w-16 h-16 text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                        Payment Cancelled
                    </h1>

                    <p className="text-gray-600 text-lg mb-6">
                        Your payment was not completed. Don't worry - your items are still in your cart.
                    </p>

                    <p className="text-gray-500 mb-8">
                        If this was unexpected, please check your payment details or try another payment method.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8 flex items-center justify-center flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
                    <div>
                        <Link
                            to="/cart"
                            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            <FiShoppingCart className="w-5 h-5" />
                            Return to Cart
                        </Link>
                    </div>

                    <div>
                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            <FiHome className="w-5 h-5" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;