import React from "react";

export interface ICard {
  size?: "default" | "sm",
  color?: "default" | "dark";
  className?: string,
  children?: any
}

const Card: React.FC<ICard> = ({ size = "default", color = "default", className = "", children }) => {
  const sizeVariants = {
    default: "rounded-lg p-6 shadow",
    sm: "rounded py-2 px-3 shadow-sm"
  };
  const colorVariants = {
    default: "bg-white",
    dark: "border bg-gray-100 text-gray-500"
  };
  return (
    <div className={`${sizeVariants[size]} ${colorVariants[color]} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
