import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateHero = () => {
    const [heroData, setHeroData] = useState({
        title: '',
        subtitle: '',
        bgImage: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/api/hero')
            .then(res => {
                if (res.data) {
                    setHeroData(res.data);
                }
            })
            .catch(err => console.error("Error fetching hero data:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeroData({ ...heroData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.put('http://localhost:3000/api/hero', heroData)
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
        <div className="max-w-xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-5 border-b pb-2 text-gray-800">CMS: Update Hero Section</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-600">Main Title</label>
                    <input
                        type="text"
                        name="title"
                        value={heroData.title}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600">Subtitle</label>
                    <textarea
                        name="subtitle"
                        value={heroData.subtitle}
                        onChange={handleChange}
                        rows="4"
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        required
                    ></textarea>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-600">Background Image URL</label>
                    <input
                        type="text"
                        name="backgroundImage"
                        value={heroData.backgroundImage || ""}
                        onChange={handleChange}
                        className="w-full mt-1 p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        required
                    />
                </div>

                {heroData.bgImage && (
                    <div className="mt-2">
                        <img src={heroData.bgImage} alt="Preview" className="w-full h-40 object-cover mt-1 rounded border" />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded font-bold text-white transition ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
                >
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default UpdateHero;