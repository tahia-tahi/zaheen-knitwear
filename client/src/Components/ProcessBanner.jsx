import React from "react";
import processBg from "../assets/process-bg.png";
import dress from "../assets/dress.png";
import { typography } from "../style/typoghraphy";

const ProcessBanner = () => {
  return (
    <div className="w-full bg-light pt-12 pb-30">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-10">
        <div
          className="w-full  bg-cover bg-center rounded-xl p-8"
          style={{ backgroundImage: `url(${processBg})` }}
        >
          <button className={typography.processBadge}>
            Process
          </button>
          <h2 className={`${typography.h2} mt-6`}>
            Do You Want Custom Project With <br /> Textilery? Contact Us Now
          </h2>
          <button className={`${typography.button3} mt-6`}>
            Learn More
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={dress}
            alt="Dress"
            className="max-w-full h-auto"
          />
        </div>

      </div>
    </div>
  );
};


export default ProcessBanner;
