import React, { useState, useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((result) => {
        updateUser({ displayName: name }).then(() => {
          const userInfo = {
            name: name,
            email: email,
            photo: result.user?.photoURL || "",
            role: "user",
          };

          axios.post(`${import.meta.env.VITE_API_URL}/api/users`, userInfo).then((res) => {
            if (res.data.insertedId || res.data.message === "User already exists") {
              navigate("/");
            }
          });
        });
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-light via-white to-secondary/20 p-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-secondary/10">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-800 mb-2">Create Account</h2>
          <p className="text-base text-sm">Join Zaheen and start shopping today!</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-base uppercase ml-1 tracking-wider">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-base uppercase ml-1 tracking-wider">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                name="email"
                type="email"
                placeholder="hello@example.com"
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-base uppercase ml-1 tracking-wider">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-secondary transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Primary Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200"
          >
            Create Free Account
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <span className="relative px-4 bg-white text-xs font-bold text-base uppercase tracking-widest">Or Continue With</span>
        </div>

        <button
          onClick={() => googleSignIn().then(() => navigate("/"))}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-100 rounded-2xl py-3.5 font-bold text-gray-700 hover:bg-gray-50 hover:border-secondary/30 transition-all duration-200"
        >
          <FaGoogle className="text-primary" />
          <span>Google</span>
        </button>

        <p className="text-center mt-8 text-sm text-base">
          Already have an account?{" "}
          <button onClick={() => navigate("/auth/log-in")} className="text-secondary font-bold hover:underline">
            Login Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;