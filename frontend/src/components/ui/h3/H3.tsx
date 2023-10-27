export interface IH3 {
  className?: string,
  children: any;
}

const H3: React.FC<IH3> = ({ className = "", children }) => {
  return <h3 className={`${className} text-lg mb-2 text-gray-500`}>{children}</h3>;
};

export default H3;
