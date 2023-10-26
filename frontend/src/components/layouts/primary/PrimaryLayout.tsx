import React from "react";

export interface IPrimaryLayout {
  children: any;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => (
  <div className="bg-gray-100 min-h-full">
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
      {children}
    </div>
  </div>
);

export default PrimaryLayout;
