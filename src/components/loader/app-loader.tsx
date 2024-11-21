import React from "react";

const AppLoader: React.FC = () => {
  return (
    <div className="relative inline-block w-[35px] h-[35px] animate-spin-slow">
      <div className="absolute w-[30%] h-full bottom-[5%] left-0 transform rotate-[60deg] origin-[50%_85%] animate-wobble1">
        <div className="absolute w-full pb-full bg-[#5D3FD3] rounded-full"></div>
      </div>
      <div className="absolute w-[30%] h-full bottom-[5%] right-0 transform rotate-[-60deg] origin-[50%_85%] animate-wobble2">
        <div className="absolute w-full pb-full bg-[#5D3FD3] rounded-full"></div>
      </div>
      <div className="absolute w-[30%] h-full bottom-[-5%] left-[116.666%]">
        <div className="absolute w-full pb-full bg-[#5D3FD3] rounded-full"></div>
      </div>
    </div>
  );
};

export default AppLoader;
