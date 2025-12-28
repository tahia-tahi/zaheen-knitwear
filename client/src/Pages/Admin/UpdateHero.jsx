import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Type, AlignLeft, ImageIcon, Save, Loader2, } from 'lucide-react';

const UpdateHero = () => {
    const [heroUpdate, setHeroUpdate] = useState({
        title: '',
        subtitle: '',
        backgroundImage: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/hero`)
            .then(res => {
                if (res.data) {
                    setHeroUpdate(res.data);
                }
            })
            .catch(err => console.error("Error fetching hero data:", err));
    }, []);

    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setHeroUpdate({ ...heroUpdate, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.put(`${import.meta.env.VITE_API_URL}/api/hero`, heroUpdate)
            .then(res => {
                if (res.data.success) {
                    alert('Hero section updated successfully!');
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Failed to update hero content.');
                setLoading(false);
            });
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <Layout size={28} />
                </div>
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Hero Section CMS</h2>
                    <p className="text-gray-500 text-sm">Modify the main banner of your homepage in real-time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form Side */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <SettingsIcon className="w-4 h-4" /> Edit Content
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Main Headline</label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="title"
                                    value={heroUpdate.title}
                                    onChange={handleHeroChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter Hero Title"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sub-headline / Description</label>
                            <div className="relative">
                                <AlignLeft className="absolute left-3 top-3 text-gray-400" size={18} />
                                <textarea
                                    name="subtitle"
                                    value={heroUpdate.subtitle}
                                    onChange={handleHeroChange}
                                    rows="4"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="Enter Subtitle"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Background Image URL</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    name="backgroundImage"
                                    value={heroUpdate.backgroundImage || ""}
                                    onChange={handleHeroChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                    placeholder="https://image-link.com/bg.jpg"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${loading ? 'bg-gray-400' : 'bg-primary hover:shadow-primary/30 active:scale-95'
                                }`}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {loading ? 'Saving Changes...' : 'Publish Update'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const SettingsIcon = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
)

export default UpdateHero;