import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrdersByUserId, deleteOrderById } from '../../redux/slices/orderSlice';
import LoadingSpinner from '../../sharedComp/LoadingSpinner';

const MyOrder = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrdersByUserId(user._id));
    }
  }, [dispatch, user]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      dispatch(deleteOrderById(orderId));
    }
  };

  const canCancelOrder = (products) => {
    return products.every(product =>
      product.status !== 'delivered' && product.status !== 'cancelled'
    );
  };

  const sortedOrders = orders ? [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

  if (status === 'loading') {
    return <LoadingSpinner fullScreen />;
  }

  if (status === 'failed') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Orders</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (status === 'succeeded' && sortedOrders.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">No Orders Found</h2>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="mt-2 text-gray-600">View and manage your order history</p>
        </div>

        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <div key={order._id} className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.product.some(p => p.status === 'cancelled') ? 'bg-red-100 text-red-800' :
                      order.product.every(p => p.status === 'delivered') ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                  )}`}>
                    {order.product.some(p => p.status === 'cancelled') ? 'Cancelled' :
                      order.product.every(p => p.status === 'delivered') ? 'Delivered' : 'Processing'}
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  {/* Customer Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Customer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center space-x-7">
                        <p className="capitalize"><span className="font-medium">Name:</span> {order.customerName}</p>
                        <p><span className="font-medium">Contact:</span> {order.customerContactNumber}</p>
                      </div>
                      <p><span className="font-medium">Address:</span> {order.address}</p>
                      <p><span className="font-medium">PIN:</span> {order.pinCode}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p className="capitalize"><span className="font-medium">Status:</span> {order.paymentStatus}</p>
                      {order.transactionId && (
                        <p className="break-all"><span className="font-medium">Transaction ID:</span> {order.transactionId}</p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-700 mb-3 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Order Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Items:</span> {order.product.length}</p>
                      <p><span className="font-medium">Total:</span> ₹{order.product.reduce((sum, p) => sum + (p.productPrice * p.quantity), 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-6">
                  <h4 className="font-bold text-lg text-gray-800 mb-4">Products</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.product.map((product, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex">
                          <div className="flex-shrink-0 h-24 w-20 rounded-md overflow-hidden border border-gray-200">
                            <img
                              src={`${import.meta.env.VITE_API_URI}/${product.productImage}`}
                              alt={product.productName}
                              className="w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="ml-4 flex-1">
                            <h5 className="font-medium text-gray-900">{product.productName}</h5>
                            <p className="text-sm text-gray-500">₹{product.productPrice} × {product.quantity}</p>
                            <p className="text-sm text-gray-500">Total: ₹{(product.productPrice * product.quantity).toFixed(2)}</p>
                            <div className="mt-1">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                                {product.status === "true" ? "Pending" : product.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-200">
                  <div className="mb-4 sm:mb-0">
                    {order.product.some(p => p.status === 'cancelled') && (
                      <p className="text-red-600 font-medium">This order has been cancelled.</p>
                    )}
                    {order.product.every(p => p.status === 'delivered') && (
                      <p className="text-green-600 font-medium">This order has been delivered.</p>
                    )}
                  </div>
                  {canCancelOrder(order.product) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;