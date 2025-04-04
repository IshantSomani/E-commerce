import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import UserDataTable from './UserDataTable';
import { FiPlus, FiUsers } from 'react-icons/fi';

const AdminUser = () => {
    const [open, setOpen] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpen = () => setOpen(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };

    const handleSuccess = (message) => {
        setSnackbarMessage(message);
        setOpenSnackBar(true);
    };

    return (
        <div className="min-h-[87vh] bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                            <FiUsers className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                            <p className="text-gray-500">Manage all registered users in the system</p>
                        </div>
                    </div>
                    <button
                        className="flex items-center justify-center px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleOpen}
                    >
                        <FiPlus className="mr-2 h-5 w-5" />
                        Add New User
                    </button>
                </div>

                {/* User Table Section */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <UserDataTable 
                        open={open} 
                        setOpen={setOpen} 
                        onSuccess={handleSuccess} 
                    />
                </div>

                {/* Success Notification */}
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={1000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ 
                            width: '100%',
                            backgroundColor: '#4f46e5', // indigo-600
                            color: 'white',
                            borderRadius: '0.5rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}
                    >
                        {snackbarMessage || "Operation completed successfully"}
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
};

export default AdminUser;