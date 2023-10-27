import React from "react";

export interface ICard {
  size?: "default" | "sm",
  color?: "default" | "dark";
  footer?: any,
  className?: string,
  children?: any
}

const Card: React.FC<ICard> = ({ footer, size = "default", color = "default", className = "", children }) => {
  const sizeVariants = {
    default: "rounded-lg p-6 shadow",
    sm: "rounded py-2 px-3 shadow-sm"
  };
  const colorVariants = {
    default: "bg-white",
    dark: "border bg-gray-100 text-gray-500"
  };

  const withFooterClass = `border-2 border-gray-800 rounded-lg`;
  return (
    <div className={footer ? withFooterClass : `${sizeVariants[size]} ${colorVariants[color]} ${className}`}>
      {!footer && children}
      {footer && (
        <>
          <div className={`${sizeVariants[size]} ${colorVariants[color]} ${className}`}>{children}</div>
          <div className="bg-gray-800 text-white py-1 px-3">{footer}</div>
        </>
      )}
    </div>
  );
};

export default Card;
