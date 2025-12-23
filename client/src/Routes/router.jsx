import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/Rootlayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Pages/LogIn";
import SignUp from "../Pages/SignUp";

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
                path : '/auth',
                Component :AuthLayout,
                children : [
                    {
                        path: 'log-in',
                        Component :LogIn
                    },
                    {
                        path : 'sign-up',
                        Component : SignUp
                    }
                ]
            }

        ]
    }

])