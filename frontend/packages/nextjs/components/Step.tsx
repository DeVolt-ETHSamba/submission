import React, { ReactNode } from 'react';

interface StepProps {
    children: ReactNode;
    step: string;
    phrase: string;
    isActive: boolean;
}

export const Step: React.FC<StepProps> = ({children, step, phrase, isActive}) => {

    //var background = activate ? "[#37e231]" : "[#37e231]";
    var blur = isActive ? "" : "blur-[1px]";
    var background = isActive ? "bg-[#37e231]" : "bg-[#3c3c3c]";
    var width = isActive ? "w-full scale-[103%] " : "w-3/5 pointer-events-none ";

  return (
      <div className={`${width} ${background} rounded-lg p-8 transition-all duration-500`}>
          <div className={`${blur}`}>
          <p className="text-4xl font-bold text-[#1e1e1e]">#{step} Step</p>
          <p className="text-[#1e1e1e]">{phrase}</p> 
          {children}
          </div>
      </div>
  ); 
};
