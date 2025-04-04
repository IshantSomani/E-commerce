import React from 'react';
import { remove, increaseQuantity, decreaseQuantity } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { role, auth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    const handleIncrease = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const totalSum = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    const handleCheckout = async () => {
        if (totalSum === 0) {
            alert("Your cart is empty. Add items before checking out.");
            return;
        }

        if (auth) {
            if (role === "admin") {
                return alert("Please Login with Customer Account")
            }
            navigate("/checkout")
        } else {
            alert("Please Login...")
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row justify-center gap-8">
                    {/* Cart Items */}
                    <div className="md:w-2/3">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-2xl font-bold text-gray-900">Your Cart ({cartItems.length})</h1>
                                <button 
                                    onClick={() => navigate(-1)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                >
                                    Continue Shopping
                                </button>
                            </div>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
                                    <p className="mt-1 text-gray-500">Start adding some items to your cart</p>
                                    <div className="mt-6">
                                        <button
                                            onClick={() => navigate(-1)}
                                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <ul className="divide-y divide-gray-200">
                                    {[...cartItems].reverse().map((item) => (
                                        <li key={item._id} className="py-6 flex">
                                            <div className="flex-shrink-0 w-24 h-28 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URI}/${item.productImage}`}
                                                    alt={item.productName}
                                                    className="w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex-1 flex flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3 className="line-clamp-1">{item.productName}</h3>
                                                        <p className="ml-4">₹{item.productPrice}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.productDesc}</p>
                                                    <p className="mt-1 text-xs text-gray-500 capitalize">{item.productCategory}</p>
                                                </div>
                                                <div className="flex-1 flex items-end justify-between text-sm">
                                                    <div className="flex items-center">
                                                        <button 
                                                            onClick={() => handleDecrease(item._id)}
                                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="mx-3 text-gray-700">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => handleIncrease(item._id)}
                                                            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-gray-50 text-gray-600 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            onClick={() => handleRemove(item._id)}
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    {cartItems.length > 0 && (
                        <div className="md:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600">Subtotal</p>
                                        <p className="text-sm font-medium text-gray-900">₹{totalSum.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-600">Shipping</p>
                                        <p className="text-sm font-medium text-gray-900">Free</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                        <p className="text-base font-medium text-gray-900">Order Total</p>
                                        <p className="text-base font-bold text-gray-900">₹{totalSum.toFixed(2)}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className={`mt-6 w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                                        totalSum === 0
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-indigo-600 hover:bg-indigo-700'
                                    }`}
                                    disabled={totalSum === 0}
                                >
                                    Checkout
                                </button>

                                <p className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                    or{' '}
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="ml-1 text-indigo-600 font-medium hover:text-indigo-500"
                                    >
                                        Continue Shopping
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cart;