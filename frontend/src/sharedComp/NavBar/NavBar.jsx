import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { CiBoxes, CiShoppingCart, CiUser } from 'react-icons/ci';
import { MdLogout, MdMenu, MdClose } from 'react-icons/md';
import LOGO from '../../assets/LOGO.png';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { auth, role, user } = useSelector((state) => state.auth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleLogOut = () => {
        localStorage.clear();
        dispatch(logout());
        navigate("/");
    };

    // Active link style for desktop
    const activeDesktopLink = "text-indigo-600 font-semibold border-b-2 border-indigo-500";
    const inactiveDesktopLink = "text-gray-700 hover:text-gray-900";

    // Active link style for mobile
    const activeMobileLink = "bg-indigo-50 text-indigo-600";
    const inactiveMobileLink = "text-gray-700 hover:text-gray-900 hover:bg-gray-50";

    return (
        <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <NavLink to="/" className="flex items-center">
                            <img 
                                src={LOGO} 
                                alt="GLORY" 
                                className="h-10 md:h-12 transition-transform hover:scale-105"
                                style={{ filter: "drop-shadow(0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.3))" }}
                            />
                        </NavLink>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `px-1 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? activeDesktopLink : inactiveDesktopLink}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/products" 
                            className={({ isActive }) => 
                                `px-1 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? activeDesktopLink : inactiveDesktopLink}`
                            }
                        >
                            Shop
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `px-1 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? activeDesktopLink : inactiveDesktopLink}`
                            }
                        >
                            About
                        </NavLink>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-4">
                        {/* Cart Icon */}
                        <div className="relative">
                            <button 
                                onClick={() => navigate("/cart")} 
                                className="p-2 rounded-full text-gray-700 hover:text-neutral-900 hover:bg-gray-100 transition-colors duration-200 relative"
                            >
                                <CiShoppingCart className="w-5 h-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {auth ? (
                            <div className="relative">
                                {/* Profile Avatar */}
                                <button 
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className="flex items-center space-x-1 focus:outline-none"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white font-medium">
                                        {user?.name?.charAt(0) || user?.FirstName?.charAt(0) || 'U'}
                                    </div>
                                </button>

                                {/* Profile Dropdown */}
                                {profileMenuOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div className="py-1">
                                            <div 
                                                onClick={() => { navigate("/profile"); setProfileMenuOpen(false); }}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <CiUser className="mr-2" />
                                                Profile
                                            </div>

                                            {role === "user" ? (
                                                <div 
                                                    onClick={() => { navigate("/myorder"); setProfileMenuOpen(false); }}
                                                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <CiShoppingCart className="mr-2" />
                                                    My Orders
                                                </div>
                                            ) : (
                                                <>
                                                    <div 
                                                        onClick={() => { navigate("/adminuser"); setProfileMenuOpen(false); }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <CiUser className="mr-2" />
                                                        Users
                                                    </div>
                                                    <div 
                                                        onClick={() => { navigate("/adminorder"); setProfileMenuOpen(false); }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <CiShoppingCart className="mr-2" />
                                                        Orders
                                                    </div>
                                                    <div 
                                                        onClick={() => { navigate("/adminproduct"); setProfileMenuOpen(false); }}
                                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <CiBoxes className="mr-2" />
                                                        Products
                                                    </div>
                                                </>
                                            )}

                                            <div 
                                                onClick={handleLogOut}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <MdLogout className="mr-2" />
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden md:flex items-center space-x-3">
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => 
                                        `px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-indigo-600 font-semibold' : 'text-gray-700 hover:text-neutral-900'}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/signup" 
                                    className={({ isActive }) => 
                                        `px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 shadow-sm ${isActive ? 'bg-blue-900 text-white' : 'bg-blue-900 text-white hover:bg-blue-950'}`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-neutral-900 hover:bg-gray-100 focus:outline-none"
                        >
                            {mobileMenuOpen ? (
                                <MdClose className="w-6 h-6" />
                            ) : (
                                <MdMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink 
                            to="/" 
                            end
                            className={({ isActive }) => 
                                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeMobileLink : inactiveMobileLink}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/products" 
                            className={({ isActive }) => 
                                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeMobileLink : inactiveMobileLink}`
                            }
                        >
                            Shop
                        </NavLink>
                        <NavLink 
                            to="/about" 
                            className={({ isActive }) => 
                                `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeMobileLink : inactiveMobileLink}`
                            }
                        >
                            About
                        </NavLink>
                        {!auth && (
                            <>
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${isActive ? activeMobileLink : inactiveMobileLink}`
                                    }
                                >
                                    Login
                                </NavLink>
                                <NavLink 
                                    to="/signup" 
                                    className={({ isActive }) => 
                                        `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-900 text-white' : 'bg-blue-900 text-white hover:bg-blue-950'}`
                                    }
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavBar;