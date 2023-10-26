import React from "react";

export interface ICard {
  className?: string,
  children?: any
}

const Card: React.FC<ICard> = ({ className = "", children }) => (
  <div className={`bg-white rounded-lg dark:bg-gray-800 p-4 ${className}`}>
    {children}
  </div>
);

export default Card;
