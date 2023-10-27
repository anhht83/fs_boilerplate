export interface IH1 {
  className?: string,
  children: any;
}

const H1: React.FC<IH1> = ({ className = "", children }) => {
  return <h1 className={`${className} my-6 text-2xl font-semibold leading-6 text-gray-900`}>{children}</h1>;
};

export default H1;
