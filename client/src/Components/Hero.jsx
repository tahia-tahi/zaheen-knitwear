import React from "react";
import { typography } from "../style/typoghraphy";
import heroBg from "../assets/bg-video.png";

const Hero = () => {
  return (
    <section
      className="w-full min-h-screen bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="w-full ">
        <div className="max-w-7xl mx-auto px-4 py-20 text-white">
          
          {/* Content */}
          <div className="max-w-2xl space-y-6">
            <p className={typography.pText}>
              Elevate Your Brand With
            </p>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              High-Quality Garments.
              <br />
              Ethically Made.
            </h1>

            <p className="text-sm md:text-base text-gray-200">
              At Zaheen Knitwear Ltd., we pride ourselves on being your reliable
              partner for apparel production. Our commitment to ethical
              manufacturing ensures that every garment is crafted with care and
              integrity.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className={typography.primaryButton}>
                Contact Us
              </button>
              <button className={typography.secondaryButton}>
                Learn More
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
