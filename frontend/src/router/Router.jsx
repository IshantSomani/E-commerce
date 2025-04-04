import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoadingSpinner from '../sharedComp/LoadingSpinner'

// Lazy loading components
const Screen = React.lazy(() => import('../sharedComp/Screen/Screen'));
const ProtectedParent = React.lazy(() => import('./ProtectedParent'));
const ProtectedRoutes = React.lazy(() => import('./ProtectedRoutes'));
const UnProtected = React.lazy(() => import('./UnProtected'));
const ProductCategory = React.lazy(() => import('../sharedComp/Products/ProductCategory'));
const SingleProduct = React.lazy(() => import('../sharedComp/Products/SingleProduct'));
const Products = React.lazy(() => import('../sharedComp/Products/Products'));
const Profile = React.lazy(() => import('../sharedComp/Profile/Profile'));
const Home = React.lazy(() => import('../sharedComp/Home/Home'));
const Signup = React.lazy(() => import('../components/Authentication/Signup'));
const Login = React.lazy(() => import('../components/Authentication/Login'));
const Cart = React.lazy(() => import('../components/Cart/Cart'));
const PaymentSuccess = React.lazy(() => import('../components/Payment/PaymentSuccess'));
const PaymentCancel = React.lazy(() => import('../components/Payment/PaymentCancel'));
const Checkout = React.lazy(() => import('../components/User/Checkout'));
const MyOrder = React.lazy(() => import('../components/User/MyOrder'));
const AdminProduct = React.lazy(() => import('../components/Admin/AdminProduct/AdminProduct'));
const AdminOrder = React.lazy(() => import('../components/Admin/AdminOrder/AdminOrder'));
const AdminUser = React.lazy(() => import('../components/Admin/AdminUser/AdminUser'));
const About = React.lazy(() => import('../sharedComp/about/About'));

const Router = createBrowserRouter([
    {
        element: <Suspense fallback={<LoadingSpinner />}><ProtectedParent /></Suspense>,
        children: [
            {
                path: '/',
                element: <Suspense fallback={<LoadingSpinner />}><Screen /></Suspense>,
                children: [
                    {
                        path: "/",
                        element: <Suspense fallback={<LoadingSpinner />}><Home /></Suspense>,
                    },
                    {
                        path: "about/",
                        element: <Suspense fallback={<LoadingSpinner />}><About /></Suspense>,
                    },
                    {
                        path: `/products`,
                        element: <Suspense fallback={<LoadingSpinner />}><Products /></Suspense>,
                    },
                    {
                        path: `/products/:category`,
                        element: <Suspense fallback={<LoadingSpinner />}><ProductCategory /></Suspense>,
                    },
                    {
                        path: `/product/:productId`,
                        element: <Suspense fallback={<LoadingSpinner />}><SingleProduct /></Suspense>
                    },
                    {
                        path: "/cart",
                        element: <Suspense fallback={<LoadingSpinner />}><Cart /></Suspense>
                    },
                ]
            },

            {
                path: "/paymentsuccess",
                element: <Suspense fallback={<LoadingSpinner />}><PaymentSuccess /></Suspense>
            },
            {
                path: "/paymentcancel",
                element: <Suspense fallback={<LoadingSpinner />}><PaymentCancel /></Suspense>
            },
            {
                element: <Suspense fallback={<LoadingSpinner />}><UnProtected /></Suspense>,
                children: [
                    {
                        path: "/login",
                        element: <Suspense fallback={<LoadingSpinner />}><Login /></Suspense>
                    },
                    {
                        path: "/signup",
                        element: <Suspense fallback={<LoadingSpinner />}><Signup /></Suspense>
                    }
                ]
            },
            {
                element: <Suspense fallback={<LoadingSpinner />}><ProtectedRoutes allowedRole={["user", "admin"]} /></Suspense>,
                children: [
                    {
                        path: "/profile",
                        element: <Suspense fallback={<LoadingSpinner />}><Profile /></Suspense>
                    }
                ]
            },
            {
                element: <Suspense fallback={<LoadingSpinner />}><ProtectedRoutes allowedRole={["user"]} /></Suspense>,
                children: [
                    {
                        path: "/myorder",
                        element: <Suspense fallback={<LoadingSpinner />}><MyOrder /></Suspense>
                    },
                    {
                        path: "/checkout",
                        element: <Suspense fallback={<LoadingSpinner />}><Checkout /></Suspense>
                    },
                ]
            },
            {
                element: <Suspense fallback={<LoadingSpinner />}><ProtectedRoutes allowedRole={["admin"]} /></Suspense>,
                children: [
                    {
                        path: "/adminuser",
                        element: <Suspense fallback={<LoadingSpinner />}><AdminUser /></Suspense>
                    },
                    {
                        path: "/adminproduct",
                        element: <Suspense fallback={<LoadingSpinner />}><AdminProduct /></Suspense>
                    },
                    {
                        path: "/adminorder",
                        element: <Suspense fallback={<LoadingSpinner />}><AdminOrder /></Suspense>
                    },
                ]
            },
        ]
    }
]);

export default Router;