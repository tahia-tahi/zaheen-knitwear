import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import UpdateHero from "../Pages/Admin/UpdateHero";
import ManageProducts from "../Pages/Admin/ManageProducts";
import CartPage from "../Pages/CartPage";
import CheckoutPage from "../Pages/CheckoutPage";

export const router = createBrowserRouter([

    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/auth',
                Component: AuthLayout,
                children: [
                    {
                        path: 'log-in',
                        Component: LogIn
                    },
                    {
                        path: 'sign-up',
                        Component: SignUp
                    }
                ]
            },
            {
                path: '/admin-dashboard',
                Component: AdminDashboard,
                children: [
                    {
                        path: 'update-hero',
                        Component: UpdateHero
                    },
                    {
                        path: 'manage-products',
                        Component: ManageProducts
                    },
                ]
            },
            {
                path:'/cart',
                element:<CartPage></CartPage>
            },
            {
                path:'/checkout',
                element:<CheckoutPage></CheckoutPage>
            }

        ]
    }

])