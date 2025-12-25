import React from 'react';
import {
    Scissors,
    Ruler,
    Shirt,
    Activity,
    Flame,
    CheckCircle,
    Package
} from "lucide-react";

const Steps = () => {
    const steps = [
        { serial: "01", icon: Shirt, title: "Dying", description: "Fabric dyeing is performed with precision to ensure consistent color quality and long-lasting durability." },
        { serial: "02", icon: Ruler, title: "Cutting", description: "Accurate cutting processes are followed to match design specifications and minimize fabric waste." },
        { serial: "03", icon: Activity, title: "Swing", description: "Skilled stitching ensures strong seams and perfect construction using advanced sewing techniques." },
        { serial: "04", icon: Scissors, title: "Snipping Of Thread", description: "Excess threads are carefully trimmed to maintain clean finishing and a professional appearance." },
        { serial: "05", icon: Flame, title: "Ironing", description: "Garments are pressed and ironed to remove wrinkles and achieve a smooth, refined look." },
        { serial: "06", icon: CheckCircle, title: "Checking", description: "Each product undergoes strict quality inspection to ensure it meets required standards." },
        { serial: "07", icon: Package, title: "Package", description: "Finished garments are neatly packed and prepared for safe delivery to customers." }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center max-w-7xl mx-auto -mt-20">
            {steps.map((step) => {
                const Icon = step.icon;
                return (
                    <div key={step.serial} className="p-6  rounded-xl flex flex-col shadow items-center bg-white text-center relative">
                        {/* Serial Circle */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg text-black font-bold mb-4 absolute -top-6">
                            {step.serial}
                        </div>

                        <div className='text-left'>
                            {/* Icon */}
                            <Icon className="text-primary mb-4" size={32} />

                            {/* Title */}
                            <h3 className="font-semibold text-lg mb-2">{step.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-gray-700">{step.description}</p>
                        </div>


                    </div>
                );
            })}
        </div>
    );
};

export default Steps;
