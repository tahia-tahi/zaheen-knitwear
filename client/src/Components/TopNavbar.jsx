import { Facebook, Instagram, LocateIcon, Phone, Twitter, Youtube } from 'lucide-react';
import React from 'react';

const TopNavbar = () => {
    return (
        <div className='bg-secondary w-full'>
            <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-2 px-4 md:px-6 gap-2 md:gap-0'>
                {/* Left section: Contact info */}
                <div className='flex flex-col md:flex-row md:items-center md:gap-6 gap-1 text-white text-sm'>
                    <div className='flex items-center gap-1'>
                        <Phone size={16}/>
                        <span>+880 01713-027875</span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <LocateIcon size={16}/>
                        <span>Kashimpur, Gazipur Sadar / Gazipur</span>
                    </div>
                </div>

                {/* Right section: Social icons */}
                <div className='flex gap-3 mt-2 md:mt-0 bg-white px-3 py-1 rounded'>
                    <Facebook size={20} className='text-primary'/>
                    <Twitter size={20} className='text-primary'/>
                    <Instagram size={20} className='text-primary'/>
                    <Youtube size={20} className='text-primary'/>
                </div>
            </div>
        </div>
    );
};

export default TopNavbar;
