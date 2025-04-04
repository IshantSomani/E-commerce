import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaPhone, FaAddressCard, FaCity, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const Checkout = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const formRef = useRef(null);

    const formField = [
        { icon: <FaUser className="text-gray-400" />, name: "customerName", placeholder: "Full Name", type: "text" },
        { icon: <FaPhone className="text-gray-400" />, name: "customerContactNumber", placeholder: "Phone Number", type: "tel" },
        { icon: <FaAddressCard className="text-gray-400" />, name: "address", placeholder: "Street Address", type: "text" },
        { icon: <FaCity className="text-gray-400" />, name: "city", placeholder: "City", type: "text" },
        { icon: <FaMapMarkerAlt className="text-gray-400" />, name: "state", placeholder: "State/Province", type: "text" },
        { icon: <FaMapPin className="text-gray-400" />, name: "pinCode", placeholder: "ZIP/Postal Code", type: "text" }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const orderDetails = {
            userId: user._id,
            customerName: formData.get('customerName'),
            customerContactNumber: formData.get('customerContactNumber'),
            address: `${formData.get('address')}, ${formData.get("city")}, ${formData.get("state")}`,
            pinCode: formData.get('pinCode'),
            products: cartItems,
        };
        try {
            const stripe = await loadStripe(`${import.meta.env.VITE_API_PUBLISHABLE_KEY}`);
            const response = await axios.post(`${import.meta.env.VITE_API_URI}/create-checkout-session`, orderDetails);
            await stripe.redirectToCheckout({
                sessionId: response.data.id
            });
        } catch (error) {
            console.error(error);
            alert('Payment failed. Please try again.');
        }
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
            {/* Checkout Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 flex flex-col sm:flex-row justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Checkout</h1>
                <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium text-gray-700">Total: ₹{totalAmount.toFixed(2)}</span>
                    <button
                        onClick={scrollToForm}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Order Summary ({cartItems.length} items)</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {[...cartItems].reverse().map((item, index) => (
                            <div key={index} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-gray-50 transition-colors duration-150">
                                <div className="flex-shrink-0">
                                    <img
                                        src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                        alt={item.productName}
                                        className="w-24 rounded-lg object-cover border border-gray-200"
                                        loading='lazy'
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-medium text-gray-900 truncate">{item.productName}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">Price: ₹{item.productPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex-shrink-0 self-center sm:self-auto">
                                    <p className="text-lg font-semibold text-gray-900">₹{(item.productPrice * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Total */}
                <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Total</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-lg font-bold">₹{totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shipping Form */}
            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Shipping Information</h2>
                </div>

                <div className="p-6">
                    {/* Two-column grid for form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {formField.slice(0, Math.ceil(formField.length / 2)).map((field, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {field.icon}
                                    </div>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        required
                                        placeholder={field.placeholder}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            {formField.slice(Math.ceil(formField.length / 2)).map((field, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        {field.icon}
                                    </div>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        required
                                        placeholder={field.placeholder}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Full-width Payment Button */}
                    <div className="pt-6 mt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            Pay ₹{totalAmount.toFixed(2)}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;