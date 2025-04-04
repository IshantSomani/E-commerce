import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CiEdit, CiCircleInfo } from "react-icons/ci";
import { MdDelete, MdUpload } from "react-icons/md";
import { Box, Typography, Tooltip, Modal, Switch, CircularProgress, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../../../redux/slices/productSlice';
import { FiPackage, FiDollarSign, FiTag, FiAlignLeft } from 'react-icons/fi';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

export default function ProductDataTable({ open, setOpen, onSuccess }) {
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productDesc: '',
    status: true
  });
  const [editMode, setEditMode] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const { products, status, isSuccess } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts());
      } catch (error) {
        onSuccess('Failed to fetch products', 'error');
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const formattedRows = products.map((product, index) => ({
        ...product,
        id: index + 1,
        priceDisplay: `₹${product.productPrice}`
      }));
      setRows(formattedRows);
    }
  }, [products]);

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setEditMode(false);
      setFormData({
        productName: '',
        productPrice: '',
        productCategory: '',
        productDesc: '',
        status: true
      });
      setImagePreview(null);
      setImageFile(null);

    }
  }, [isSuccess, setOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      productName: '',
      productPrice: '',
      productCategory: '',
      productDesc: '',
      status: true
    })
    setEditMode(false);
    setImagePreview(null);
    setImagePreview(null);
    setImageFile(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSwitch = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("productName", formData.productName);
      data.append("productPrice", formData.productPrice);
      data.append("productCategory", formData.productCategory);
      data.append("productDesc", formData.productDesc);

      if (imageFile) {
        data.append('productImage', imageFile);
      }

      if (editMode) {
        dispatch(updateProduct({ id: formData._id, updatedProduct: formData }));
        onSuccess('Product updated successfully');
      } else {
        dispatch(createProduct(data));
        onSuccess('Product created successfully');
      }
      handleClose();
    } catch (error) {
      onSuccess('Operation failed', 'error');
      console.error(error);
    }
  };

  const handleEditClick = (data) => {
    setEditMode(true);
    setFormData(data);
    setImagePreview(data.productImage ? `${import.meta.env.VITE_API_URI}/${data.productImage}` : null);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      onSuccess('Product deleted successfully');
    } catch (error) {
      onSuccess('Failed to delete product', 'error');
      console.error(error);
    }
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      headerClassName: 'font-bold'
    },
    {
      field: 'productImage',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <div className="relative">
          <img
            src={`${import.meta.env.VITE_API_URI}/${params.row.productImage}`}
            alt={params.row.productName}
            className="w-full rounded object-cover border border-gray-200 aspect-[3/4]"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/40';
              e.target.onerror = null;
            }}
            loading="lazy"
          />
          <Tooltip title={params.row.id}>
            <CiCircleInfo className="absolute bottom-0 right-0 text-gray-500 bg-white rounded-full p-1 shadow" />
          </Tooltip>
        </div>
      ),
      headerClassName: 'font-bold'
    },
    {
      field: 'productName',
      headerName: 'Name',
      width: 200,
      headerClassName: 'font-bold'
    },
    {
      field: 'priceDisplay',
      headerName: 'Price',
      width: 120,
      headerClassName: 'font-bold'
    },
    {
      field: 'productCategory',
      headerName: 'Category',
      width: 150,
      headerClassName: 'font-bold'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? "In Stock" : "Out of Stock"}
          color={params.value ? "success" : "error"}
          size="small"
          variant="outlined"
        />
      ),
      headerClassName: 'font-bold'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditClick(params.row)}
            className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition-colors"
            aria-label="Edit product"
          >
            <CiEdit className="text-xl" />
          </button>
          <button
            onClick={() => handleDelete(params.row._id)}
            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
            aria-label="Delete product"
          >
            <MdDelete className="text-xl" />
          </button>
        </div>
      ),
      headerClassName: 'font-bold'
    },
  ];

  if (status === 'loading') {
    return (
      <div className="h-64 flex items-center justify-center">
        <CircularProgress />
      </div>

    );
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={status === 'loading'}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
        rowHeight={150}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="mb-4 text-2xl font-bold text-gray-800">
            {editMode ? "Edit Product" : "Add Product"}
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Image Upload */}
            <div className="flex flex-col items-center mb-4">
              <label htmlFor="productImage" className="cursor-pointer">
                <div className="relative">
                  <div className="w-24 aspect-auto rounded bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product Preview"
                        className="w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <FiPackage className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full">
                    <MdUpload className="h-5 w-5" />
                  </div>
                </div>
                <input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Product Name */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPackage className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    name="productName"
                    onChange={handleChange}
                    value={formData.productName}
                    required
                  />
                </div>

                {/* Product Price */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="Price"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    name="productPrice"
                    onChange={handleChange}
                    value={formData.productPrice}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiTag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Category"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  name="productCategory"
                  onChange={handleChange}
                  value={formData.productCategory}
                  required
                />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FiAlignLeft className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  placeholder="Description"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  name="productDesc"
                  onChange={handleChange}
                  value={formData.productDesc}
                  rows="3"
                  required
                />
              </div>
              {editMode && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Product Status</span>
                  <div className="flex items-center">
                    <Switch
                      checked={formData.status}
                      name="status"
                      onChange={handleSwitch}
                      color="primary"
                    />
                    <span className={`ml-2 font-medium ${formData.status ? 'text-green-600' : 'text-red-600'}`}>
                      {formData.status ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-colors duration-300 font-medium text-lg"
            >
              {editMode ? "Update Product" : "Add Product"}
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}