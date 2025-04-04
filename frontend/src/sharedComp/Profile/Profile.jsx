import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineMailOutline, MdPerson, MdVerified, MdEdit } from 'react-icons/md';
import { FiUser, FiShield } from 'react-icons/fi';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="max-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        My Profile
                    </h1>
                    <p className="mt-3 text-lg text-gray-500">
                        Manage your account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow overflow-hidden">
                    <div className="md:flex">
                        {/* Profile Image */}
                        <div className="md:w-1/3 bg-gray-50 flex items-center justify-center p-8">
                            <div className="relative">
                                <img
                                    className="h-48 w-48 rounded-full object-cover border-4 border-white shadow-lg"
                                    src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                                    alt={`${user?.name || user?.FirstName}`}
                                />
                                <button className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md">
                                    <MdEdit className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="md:w-2/3 p-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start">
                                <div className='flex  items-center justify-center gap-4'>
                                    <div className="flex items-center">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {user?.name}
                                        </h2>
                                        {user?.verified && (
                                            <MdVerified className="ml-2 h-6 w-6 text-blue-500" />
                                        )}
                                    </div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                        {user?.role}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                {/* Email Field */}
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                                        <MdOutlineMailOutline className="h-6 w-6 text-indigo-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                        <div className="mt-1 sm:text-lg text-gray-900">
                                            <a href={`mailto:${user?.email}`} className="hover:text-indigo-600 hover:underline">
                                                {user?.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            Change Password
                        </button>
                        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            Upgrade Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;