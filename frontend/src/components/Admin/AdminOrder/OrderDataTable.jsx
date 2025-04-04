import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderById, fetchAllOrders, updateOrderStatus } from '../../../redux/slices/orderSlice';
import { MdDelete, MdLocalShipping, MdCheckCircle, MdPendingActions } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { CircularProgress, Tooltip, Chip, Button } from '@mui/material';
import { green, blue, orange, red } from '@mui/material/colors';

export default function OrderDataTable({ onSuccess }) {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                await dispatch(fetchAllOrders());
            } catch (error) {
                onSuccess('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [dispatch]);

    useEffect(() => {
        if (orders) {
            const formattedRows = orders.flatMap((order, orderIndex) =>
                order.product.map((product, index) => ({
                    id: `${orderIndex+1}-${index}`,
                    orderId: order._id,
                    productId: product._id,
                    customerName: order.customerName,
                    productName: product.productName,
                    productImage: product.productImage,
                    quantity: product.quantity,
                    price: product.productPrice,
                    totalAmount: product.productPrice * product.quantity,
                    status: product.status || 'pending',
                    paymentStatus: order.paymentStatus || 'pending',
                    orderDate: new Date(order.createdAt).toLocaleDateString(),
                    address: order.address,
                }))
            );
            setRows(formattedRows);
        }
    }, [orders]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await dispatch(deleteOrderById(id));
                onSuccess('Order deleted successfully');
            } catch (error) {
                console.error('Failed to delete order:', error);
            }
        }
    };

    const updateStatus = async (orderId, newStatus) => {
        setUpdating(true);
        try {
            // Optimistic UI update
            setRows(prevRows =>
                prevRows.map(row =>
                    row.orderId === orderId ? { ...row, status: newStatus } : row
                )
            );

            await dispatch(updateOrderStatus({ orderId, status: newStatus }));
            onSuccess(`Order status updated to ${newStatus}`);
        } catch (error) {
            // Revert on error
            setRows(prevRows =>
                prevRows.map(row =>
                    row.orderId === orderId ? { ...row, status: row.status } : row
                )
            );
            console.error('Failed to update order status');
        } finally {
            setUpdating(false);
        }
    };

    const getStatusChip = (status) => {
        const statusConfig = {
            pending: {
                color: 'warning',
                icon: <MdPendingActions style={{ color: orange[500] }} />,
                label: 'Pending'
            },
            processing: {
                color: 'info',
                icon: <CircularProgress size={14} style={{ color: blue[500] }} />,
                label: 'Processing'
            },
            succeeded: {
                color: 'success',
                icon: <MdCheckCircle style={{ color: green[500] }} />,
                label: 'Approved'
            },
            delivered: {
                color: 'primary',
                icon: <MdLocalShipping style={{ color: blue[700] }} />,
                label: 'Delivered'
            },
            cancelled: {
                color: 'error',
                icon: <MdDelete style={{ color: red[500] }} />,
                label: 'Cancelled'
            },
        };

        return (
            <Chip
                icon={statusConfig[status]?.icon}
                label={statusConfig[status]?.label}
                color={statusConfig[status]?.color}
                variant="outlined"
                size="small"
                sx={{ paddingX: 1 }}
            />
        );
    };

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            width: 100
        },
        {
            field: 'productImage',
            headerName: 'Product',
            width: 100,
            renderCell: (params) => (
                <Tooltip title={params.row.productName}>
                    <div className="relative">
                        <img
                            src={`${import.meta.env.VITE_API_URI}/${params.value}`}
                            alt={params.row.productName}
                            className="w-full rounded-md object-cover border border-gray-200 aspect-[3/4]"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/40';
                                e.target.onerror = null;
                            }}
                            loading="lazy"
                        />
                        <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {params.row.quantity}
                        </span>
                    </div>
                </Tooltip>
            ),
        },
        {
            field: 'productName',
            headerName: 'Product',
            width: 200
        },
        {
            field: 'customerName',
            headerName: 'Customer',
            width: 180,
            renderCell: (params) => (
                <div>
                    <p className="font-medium">{params.value}</p>
                </div>
            ),
        },
        {
            field: 'totalAmount',
            headerName: 'Amount',
            width: 120,
            renderCell: (params) => (
                <span className="font-semibold">
                    ₹{params.value.toFixed(2)}
                </span>
            ),
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={params.value === 'succeeded' ? 'success' : 'warning'}
                    size="small"
                    variant="outlined"
                />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 270,
            renderCell: (params) => (
                <div className="flex items-center space-x-4">
                    {params.value !== 'true' && getStatusChip(params.value)}
                    {params.value === 'true' && (
                        <Button
                            variant="contained"
                            size="small"
                            style={{ background: orange[500] }}
                            startIcon={<MdPendingActions style={{ color: 'white' }} />}
                            onClick={() => updateStatus(params.row.orderId, 'pending')}
                            disabled={updating}
                        >
                            Pending
                        </Button>
                    )}
                    {params.value === 'pending' && (
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<FiPackage style={{ color: 'white' }} />}
                            onClick={() => updateStatus(params.row.orderId, 'processing')}
                            disabled={updating}
                        >
                            Process
                        </Button>
                    )}
                    {params.value === 'processing' && (
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            startIcon={<MdCheckCircle />}
                            onClick={() => updateStatus(params.row.orderId, 'succeeded')}
                            disabled={updating}
                        >
                            Approve
                        </Button>
                    )}
                    {params.value === 'succeeded' && (
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            startIcon={<MdLocalShipping />}
                            onClick={() => updateStatus(params.row.orderId, 'delivered')}
                            disabled={updating}
                        >
                            Ship
                        </Button>
                    )}
                </div>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 80,
            renderCell: (params) => (
                <Tooltip title="Delete order">
                    <button
                        onClick={() => handleDelete(params.row.orderId)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        disabled={params.row.status === 'delivered' || updating}
                    >
                        <MdDelete className="text-xl" />
                    </button>
                </Tooltip>
            ),
        },
    ];

    return (
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                disableRowSelectionOnClick
                rowHeight={150}
                autoHeight
                sx={{
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#f8fafc',
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-row': {
                        '&:nth-of-type(even)': {
                            backgroundColor: '#f8fafc',
                        },
                        '&:hover': {
                            backgroundColor: '#f1f5f9',
                        },
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: '#f8fafc',
                    },
                }}
            />
        </div>
    );
}