export interface IButton {
  color?: "default" | "primary" | "danger";
  children: any,
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  size?: string,
  disabled: boolean
}

const Button: React.FC<IButton> = ({ color = "default", size = "", children, ...rest }) => {
  const bgColorVariants = {
    default: "bg-gray-100  hover:bg-gray-50 border-0",
    primary: "bg-blue-100 hover:bg-blue-500 text-white ",
    danger: "bg-red-100 hover:bg-red-500 text-white ",
    warning: "bg-orange-100 hover:bg-orange-500 text-white "
  };
  return (
    <button
      {...rest}
      className={`${bgColorVariants[color]} font-bold py-2 px-2 ${size} shadow-sm ring-0 sm:mt-0`}
    >
      {children}
    </button>
  );
};

export default Button;
