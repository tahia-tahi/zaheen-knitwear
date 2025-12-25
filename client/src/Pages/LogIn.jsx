import React, { useState, useContext } from 'react';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";
import axios from 'axios';

const LogIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signIn(email, password)
            .then(result => {
                console.log("Logged In:", result.user);
                navigate("/");
            })
            .catch(error => console.error(error.message));
    };

    const handleGoogle = () => {
        googleSignIn()
            .then((result) => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    photo: result.user?.photoURL,
                    role: 'user'
                };
                axios.post('http://localhost:3000/api/users', userInfo)
                    .then(() => navigate("/"));
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-secondary to-light">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

                <form onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePassword}
                            className="absolute right-3 top-9 text-gray-500 text-sm font-medium"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mb-6">
                        Log In
                    </button>
                </form>

                <div className="flex items-center justify-center space-x-4">
                    <button onClick={() => handleGoogle().then(() => navigate("/"))} className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
                        <FaGoogle className="text-red-500" /> Google
                    </button>
                    <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-100 transition">
                        <FaFacebook className="text-blue-600" /> Facebook
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogIn;