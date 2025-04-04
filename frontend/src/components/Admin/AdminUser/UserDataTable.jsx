import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdOutlineCloudUpload } from "react-icons/md";
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '500px' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "12px",
    outline: 'none'
};


export default function UserDataTable({ open, setOpen, onSuccess}) {

    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleClose = () => {
        setOpen(false);
        setFormData({});
        setEditMode(false);
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URI}/users/getAllUsers`);
            const formattedRows = response.data.data.map((item, index) => ({
                ...item,
                id: index + 1,
                fullName: `${item.firstName} ${item.lastName}`
            }));
            setRows(formattedRows);
        } catch (error) {
            onSuccess('Failed to fetch users');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSwitch = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.checked })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URI}/users/updateUser/${formData._id}`, formData);
            
            
            onSuccess('User updated successfully');
            handleClose();
            fetchData();
        } catch (error) {
            onSuccess(error.response?.data?.message || 'Operation failed');
            console.error(error);
        }
    }

    const handleEditClick = (data) => {
        setEditMode(true)
        setFormData(data);
        setImagePreview(data.userImage ? `${import.meta.env.VITE_API_URI}/${data.userImage}` : null);
        setOpen(true);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URI}/users/deleteUser/${id}`);
            onSuccess('User deleted successfully');
            fetchData();
        } catch (error) {
            onSuccess('Failed to delete user');
            console.error(error);
        }
    }

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'userImage',
            headerName: 'Profile',
            width: 90,
            renderCell: (params) => (
                <div className="flex items-center">
                    <img
                        src={`${import.meta.env.VITE_API_URI}/${params.row.userImage}`}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40';
                        }}
                    />
                </div>
            ),
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'fullName',
            headerName: 'Name',
            width: 180,
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 240,
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'contactNumber',
            headerName: 'Contact',
            width: 140,
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${params.row.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {params.row.status ? "Active" : "Inactive"}
                </div>
            ),
            headerClassName: 'font-bold text-gray-700'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleEditClick(params.row)}
                        className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors duration-200"
                        aria-label="Edit user"
                    >
                        <CiEdit className='text-xl' />
                    </button>
                    <button
                        onClick={() => handleDelete(params.row._id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors duration-200"
                        aria-label="Delete user"
                    >
                        <MdDelete className='text-xl' />
                    </button>
                </div>
            ),
            headerClassName: 'font-bold text-gray-700'
        },
    ];

    if (loading) {
        return (
            <div className='h-[400px] flex justify-center items-center'>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-cell': {
                            borderBottom: 'none',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f8fafc',
                            color: '#334155',
                            fontWeight: '600',
                            fontSize: '0.875rem',
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
                        '& .MuiDataGrid-virtualScroller': {
                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                                height: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#cbd5e1',
                                borderRadius: '3px',
                            },
                        },
                    }}
                />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-modal-title"
                aria-describedby="user-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="user-modal-title" variant="h6" component="h2" className="font-bold text-gray-800 mb-6">
                        {editMode ? "Edit User" : "Create New User"}
                    </Typography>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Profile Image Upload */}
                        <div className="flex flex-col items-center mb-4">
                            <label htmlFor="userImage" className="cursor-pointer">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Profile Preview" 
                                                className="w-full h-full object-cover"
                                                loading='lazy'
                                            />
                                        ) : (
                                            <FiUser className="h-12 w-12 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full">
                                        <MdOutlineCloudUpload className="h-5 w-5" />
                                    </div>
                                </div>
                                {/* <input
                                    id="userImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                /> */}
                            </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="First name"
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                    required
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative sm:col-span-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="relative sm:col-span-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required={!editMode}
                                    disabled={editMode}
                                />
                            </div>

                            {/* Contact Number */}
                            <div className="relative sm:col-span-2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiPhone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Contact Number"
                                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    name="contactNumber"
                                    onChange={handleChange}
                                    value={formData.contactNumber}
                                    required
                                />
                            </div>

                            {/* Status Switch */}
                            <div className="sm:col-span-2 flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-700 font-medium">Account Status</span>
                                <div className="flex items-center">
                                    <Switch
                                        checked={formData.status}
                                        name="status"
                                        onChange={handleSwitch}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'account status' }}
                                    />
                                    <span className={`ml-2 font-medium ${formData.status ? 'text-green-600' : 'text-red-600'}`}>
                                        {formData.status ? "Active" : "Inactive"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            {editMode ? "Update User" : "Create User"}
                        </button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}