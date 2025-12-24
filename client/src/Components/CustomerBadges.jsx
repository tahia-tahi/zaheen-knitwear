import React from "react";

const badges = [
  "/src/assets/Vector (1).png",
  "/src/assets/Vector (2).png",
  "/src/assets/Vector (3).png",
  "/src/assets/Vector.png",
];

const CustomerBadges = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div className="flex w-max animate-marquee gap-20">
        {[...badges, ...badges].map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Customer Badge"
            className="h-12 object-contain opacity-80 hover:opacity-100 transition"
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerBadges;
