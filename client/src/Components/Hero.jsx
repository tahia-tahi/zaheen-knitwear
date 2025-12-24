import React, { useEffect, useState } from "react";
import { typography } from "../style/typoghraphy";
import heroBg from "../assets/bg-video.png";
import Loading from "./Loading";

const Hero = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default content (Design never breaks)
  const defaultHero = {
    title: "High-Quality Garments.\nEthically Made",
    subtitle: "Elevate Your Brand With",
    backgroundImage: heroBg,
    backgroundVideo: null,
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/hero")
      .then((res) => res.json())
      .then((data) => {
        setHero(data || {});
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hero fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loading />
      </div>
    );
  }

  const finalHero = { ...defaultHero, ...hero };

  return (
 <section className="relative min-h-screen w-full overflow-hidden">

  {/* Background */}
  {finalHero.backgroundVideo ? (
    <video
      className="absolute inset-0 w-full h-full object-cover"
      src={finalHero.backgroundVideo}
      autoPlay
      loop
      muted
      playsInline
    />
  ) : (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${finalHero.backgroundImage})`,
      }}
    />
  )}

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 text-white">
    <div className="max-w-2xl space-y-6">

      <p className={typography.pText}>
        {finalHero.subtitle}
      </p>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight whitespace-pre-line">
        {finalHero.title}
      </h1>

      <p className="text-sm md:text-base text-gray-200">
       At  Zaheen Knitwear Ltd., we pride ourselves on being your reliable partner for apparel production. Our commitment to ethical manufacturing ensures that every garment is crafted with care and integrity.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button className={typography.primaryButton}>Contact Us</button>
        <button className={typography.secondaryButton}>Learn More</button>
      </div>

    </div>
  </div>
</section>

  );
};

export default Hero;
