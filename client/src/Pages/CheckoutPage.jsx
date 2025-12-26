import React, { useState } from 'react';
import { useCart } from '../Provider/CartProvider';
import { useNavigate } from 'react-router';
import { CheckCircle, Truck, MapPin, Phone, User } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [orderSuccess, setOrderSuccess] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

    const handleConfirmOrder = (e) => {
        e.preventDefault();
        // dummy order
        setOrderSuccess(true);
        setTimeout(() => {
            clearCart(); 
        }, 2000);
    };

    if (orderSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center">
                <CheckCircle size={100} className="text-green-500 mb-5 animate-bounce" />
                <h2 className="text-4xl font-bold text-gray-800">Order Confirmed!</h2>
                <p className="text-gray-600 mt-3 text-lg">Thank you for your purchase. Your order is being processed.</p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen">
            <h2 className="text-3xl font-bold mb-10 flex items-center gap-2">
                <Truck className="text-primary" /> Checkout
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping Form */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-bold mb-6">Shipping Information</h3>
                    <form onSubmit={handleConfirmOrder} className="space-y-5">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input type="text" placeholder="Full Name" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input type="tel" placeholder="Phone Number" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <textarea placeholder="Full Shipping Address" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 h-32" />
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 mt-5">
                            <p className="text-blue-700 text-sm font-medium">Payment Method: <strong>Cash on Delivery (Standard)</strong></p>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-xl mt-6 shadow-xl hover:bg-opacity-90 transition-all">
                            Confirm Order (${totalPrice.toFixed(2)})
                        </button>
                    </form>
                </div>

                {/* Order Summary  */}
                <div className="bg-gray-50 p-8 rounded-3xl h-fit border border-gray-100">
                    <h3 className="text-xl font-bold mb-6">In Your Cart ({cart.length})</h3>
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-6">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-100">
                                <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-lg" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">{item.name}</h4>
                                    <p className="text-xs text-gray-500">${item.price} x {item.quantity}</p>
                                </div>
                                <span className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t">
                            <span className="text-xl font-bold">Total</span>
                            <span className="text-2xl font-black text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;