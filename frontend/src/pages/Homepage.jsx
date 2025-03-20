import React from "react";
import welcome from '../assets/hac-assets/welcome.png'


const Homepage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 w-full h-full overflow-hidden">
      <img
        src={welcome}
        alt="Welcome to SuperMart - Unlocking Insights"
        className="max-w-3xl w-full"
      />
    </div>
  );
};

export default Homepage;
