import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaUser, FaEnvelope, FaLock, FaPhone, FaUpload } from 'react-icons/fa';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({});
    const [fileName, setFileName] = useState('No file chosen');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value });
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFileName(file ? file.name : 'No file chosen');
        handleChange(e);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        try {
            await axios.post(`${import.meta.env.VITE_API_URI}/users/signup`, data);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-blue-950 py-6 px-8 text-center">
                    <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
                    <p className="text-indigo-100 mt-1">Join our community today</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* First Name */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 transition duration-150"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 transition duration-150"
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Contact Number */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaPhone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="tel"
                                name="contactNumber"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 transition duration-150"
                                placeholder="Phone Number"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 transition duration-150"
                                placeholder="Email address"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 transition duration-150"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>

                        {/* Profile Picture Upload */}
                        {/* <div className="relative">
                            <input
                                type="file"
                                name="userImage"
                                id="userImage"
                                className="sr-only"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="userImage"
                                className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition duration-150"
                            >
                                <div className="flex items-center">
                                    <FaUpload className="h-5 w-5 text-gray-400 mr-2" />
                                    <span className="text-gray-700">Profile Picture</span>
                                </div>
                                <span className="text-gray-500 text-sm truncate max-w-[120px]">
                                    {fileName}
                                </span>
                            </label>
                        </div> */}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-950 transition-all duration-300 shadow-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    'Creating account...'
                                ) : (
                                    <>
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <FaArrowRight className="h-5 w-5 text-indigo-200 group-hover:text-indigo-100 transition duration-150" />
                                        </span>
                                        Sign Up
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-900 hover:text-blue-9500 transition-colors duration-200"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signup;