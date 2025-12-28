import React from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import {
    ShoppingBag,
    PlusCircle,
    LogOut,
    ChevronRight,
    UserCircle
} from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const AdminDashboard = () => {
    const location = useLocation();
    const menuItems = [
        { name: 'Manage Products', path: '/admin-dashboard/manage-products', icon: <ShoppingBag size={20} /> },
        { name: 'Update Hero', path: '/admin-dashboard/update-hero', icon: <PlusCircle size={20} /> },
    ];
    const isActive = (path) => location.pathname === path;
    return (
        <div>
            <Navbar />
            <div className="flex h-screen bg-[#F8F9FC]">
                {/* Sidebar */}
                <aside className="w-72 bg-white border-r border-gray-200 flex flex-col transition-all duration-300">
                    <div className="p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                                Z
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Zaheen Admin</h2>
                        </div>

                        <div className="space-y-1">
                            <p className="text-[10px] uppercase font-bold text-gray-400 mb-4 ml-2 tracking-widest">Main Menu</p>
                            {menuItems?.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${isActive(item.path)
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    {isActive(item.path) && <ChevronRight size={16} />}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="mt-auto p-6 space-y-3">
                        <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                <UserCircle className="w-full h-full text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Admin User</p>
                                <p className="text-[10px] text-gray-500 italic">Super Admin</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8F9FC] p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Welcome back, Admin 👋
                            </h1>
                            <p className="text-gray-500 text-sm">Here's what's happening with your store today.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-6 min-h-[calc(100vh-200px)] shadow-sm border border-gray-100">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default AdminDashboard;