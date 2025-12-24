import { ArrowRight, LocateIcon, MailIcon } from "lucide-react";
import React from "react";

const EmailLocation = () => {
  return (
    <section className="relative w-full bg-white max-w-7xl mx-auto">

      {/* Info bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <LocateIcon size={18} className="text-secondary" />
          Kashimpur, Gazipur Sadar / Gazipur
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <MailIcon size={18} className="text-secondary" />
          compliance@danysknitwear.com
        </div>
      </div>

      {/* Cards */}
      <div className="absolute right-8 -top-24 hidden md:flex shadow-xl rounded-lg overflow-hidden">
        
        {/* Orange Card */}
        <div className="bg-primary text-white p-6 w-64">
          <h3 className="font-semibold text-lg mb-2">
            Quality Product
          </h3>
          <p className="text-sm opacity-90 mb-4">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed.
          </p>
          <button className="flex items-center gap-2 text-sm font-medium">
            Read More <ArrowRight size={16} />
          </button>
        </div>

        {/* Teal Card */}
        <div className="bg-secondary text-white p-6 w-64">
          <h3 className="font-semibold text-lg mb-1">
            Project Overview
          </h3>
          <p className="text-2xl font-bold mb-4">
            35 Millions
          </p>
          <button className="flex items-center gap-2 text-sm font-medium">
            Read More <ArrowRight size={16} />
          </button>
        </div>

      </div>

      {/* Mobile cards */}
      <div className="md:hidden grid grid-cols-1 gap-4 px-4 pb-8">
        <div className="bg-primary text-white p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Quality Product</h3>
          <p className="text-sm mb-3">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <span className="flex items-center gap-2">
            Read More <ArrowRight size={16} />
          </span>
        </div>

        <div className="bg-secondary text-white p-6 rounded-lg">
          <h3 className="font-semibold mb-1">Project Overview</h3>
          <p className="text-xl font-bold mb-3">35 Millions</p>
          <span className="flex items-center gap-2">
            Read More <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default EmailLocation;
