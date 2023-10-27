import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export interface IPrimaryLayout {
  children: any;
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children }) => (
  <div className="bg-gray-100 min-h-full">
    <div className="mx-auto max-w-7xl p-6">
      {children}
    </div>
    <ToastContainer />
  </div>
);

export default PrimaryLayout;
